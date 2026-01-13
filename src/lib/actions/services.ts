'use server';

import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export async function getServices() {
    try {
        return await prisma.medicalService.findMany({
            orderBy: {
                createdAt: 'desc'
            }
        });
    } catch (error) {
        console.error('Error fetching services:', error);
        return [];
    }
}

export async function getServiceById(id: string) {
    try {
        return await prisma.medicalService.findUnique({
            where: { id }
        });
    } catch (error) {
        console.error(`Error fetching service ${id}:`, error);
        return null;
    }
}

export async function createService(data: any) {
    try {
        const service = await prisma.medicalService.create({
            data: {
                title_en: data.title_en,
                title_ar: data.title_ar,
                description_en: data.description_en,
                description_ar: data.description_ar,
                imageUrl_en: data.imageUrl_en,
                imageUrl_ar: data.imageUrl_ar,
                icon: data.icon,
            }
        });
        revalidatePath('/[locale]', 'layout');
        return { success: true, service };
    } catch (error) {
        console.error('Error creating service:', error);
        return { success: false, error: 'Failed to create service' };
    }
}

export async function updateServiceAction(id: string, data: any) {
    try {
        const service = await prisma.medicalService.update({
            where: { id },
            data: {
                title_en: data.title_en,
                title_ar: data.title_ar,
                description_en: data.description_en,
                description_ar: data.description_ar,
                imageUrl_en: data.imageUrl_en,
                imageUrl_ar: data.imageUrl_ar,
                icon: data.icon,
            }
        });
        revalidatePath('/[locale]', 'layout');
        return { success: true, service };
    } catch (error) {
        console.error('Error updating service:', error);
        return { success: false, error: 'Failed to update service' };
    }
}

export async function deleteServiceAction(id: string) {
    try {
        await prisma.medicalService.delete({
            where: { id }
        });
        revalidatePath('/[locale]', 'layout');
        return { success: true };
    } catch (error) {
        console.error('Error deleting service:', error);
        return { success: false, error: 'Failed to delete service' };
    }
}

export async function toggleFeatured(id: string) {
    try {
        const service = await prisma.medicalService.findUnique({ where: { id } });
        if (!service) return { success: false, error: 'Service not found' };

        // If trying to feature, check if already 3 featured
        if (!service.isFeatured) {
            const featuredCount = await prisma.medicalService.count({ where: { isFeatured: true } });
            if (featuredCount >= 3) {
                return { success: false, error: 'Maximum 3 featured services allowed' };
            }
        }

        await prisma.medicalService.update({
            where: { id },
            data: { isFeatured: !service.isFeatured }
        });
        revalidatePath('/[locale]', 'layout');
        return { success: true };
    } catch (error) {
        console.error('Error toggling featured:', error);
        return { success: false, error: 'Failed to update featured status' };
    }
}

export async function updateDisplayOrder(orderedIds: string[]) {
    try {
        const updates = orderedIds.map((id, index) =>
            prisma.medicalService.update({
                where: { id },
                data: { displayOrder: index }
            })
        );
        await prisma.$transaction(updates);
        revalidatePath('/[locale]', 'layout');
        return { success: true };
    } catch (error) {
        console.error('Error updating order:', error);
        return { success: false, error: 'Failed to update order' };
    }
}

export async function getFeaturedServices() {
    try {
        return await prisma.medicalService.findMany({
            where: { isFeatured: true },
            orderBy: { displayOrder: 'asc' }
        });
    } catch (error) {
        console.error('Error fetching featured services:', error);
        return [];
    }
}
