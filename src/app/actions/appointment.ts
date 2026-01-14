'use server';

import { z } from 'zod';
import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

const schema = z.object({
    name: z.string().min(2, 'Name is required'),
    phone: z.string().min(5, 'Valid phone number is required'),
    serviceType: z.string().min(1, 'Please select a service'),
    notes: z.string().optional(),
});

export type AppointmentState = {
    success?: boolean;
    errors?: {
        name?: string[];
        phone?: string[];
        serviceType?: string[];
        notes?: string[];
        _form?: string[];
    };
    message?: string;
};

export async function createAppointmentRequest(
    prevState: AppointmentState,
    formData: FormData
): Promise<AppointmentState> {
    const validatedFields = schema.safeParse({
        name: formData.get('name'),
        phone: formData.get('phone'),
        serviceType: formData.get('serviceType'),
        notes: formData.get('notes'),
    });

    if (!validatedFields.success) {
        return {
            success: false,
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Please fill in all required fields correctly.',
        };
    }

    const { name, phone, serviceType, notes } = validatedFields.data;

    try {
        await prisma.appointmentRequest.create({
            data: {
                name,
                phone,
                serviceType,
                notes,
            },
        });

        revalidatePath('/dashboard/appointments'); // Revalidate admin dashboard if it exists (future proofing)
        return {
            success: true,
            message: 'Appointment request submitted successfully!',
        };
    } catch (error) {
        console.error('Detailed Submission Error:', {
            name: (error as Error).name,
            message: (error as Error).message,
            stack: (error as Error).stack,
            raw: error
        });
        return {
            success: false,
            message: 'Failed to submit appointment request. Please try again.',
            errors: { _form: ['Database error occurred.'] },
        };
    }
}

export async function updateAppointmentStatus(id: string, newStatus: string) {
    try {
        await prisma.appointmentRequest.update({
            where: { id },
            data: { status: newStatus },
        });
        revalidatePath('/dashboard/appointments');
        return { success: true, message: 'Status updated successfully' };
    } catch (error) {
        console.error('Failed to update status:', error);
        return { success: false, message: 'Failed to update status' };
    }
}
