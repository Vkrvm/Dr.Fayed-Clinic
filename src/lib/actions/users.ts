'use server';

import prisma from '@/lib/prisma';
import { hash } from 'bcryptjs';
import { revalidatePath } from 'next/cache';

export async function getUsers() {
    try {
        return await prisma.user.findMany({
            orderBy: { createdAt: 'desc' },
            select: {
                id: true,
                email: true,
                name: true,
                role: true,
                isActive: true,
                createdAt: true,
            }
        });
    } catch (error) {
        console.error('Error fetching users:', error);
        return [];
    }
}

export async function createUser(data: {
    email: string;
    password: string;
    name: string;
    role?: string;
}) {
    try {
        // Check if email already exists
        const existing = await prisma.user.findUnique({ where: { email: data.email } });
        if (existing) {
            return { success: false, error: 'Email already exists' };
        }

        const hashedPassword = await hash(data.password, 12);

        const user = await prisma.user.create({
            data: {
                email: data.email,
                password: hashedPassword,
                name: data.name,
                role: data.role || 'admin',
            }
        });

        revalidatePath('/[locale]/dashboard/users', 'page');
        return { success: true, user: { id: user.id, email: user.email, name: user.name } };
    } catch (error) {
        console.error('Error creating user:', error);
        return { success: false, error: 'Failed to create user' };
    }
}

export async function updateUser(id: string, data: { name?: string; role?: string }) {
    try {
        await prisma.user.update({
            where: { id },
            data: {
                ...(data.name && { name: data.name }),
                ...(data.role && { role: data.role }),
            }
        });
        revalidatePath('/[locale]/dashboard/users', 'page');
        return { success: true };
    } catch (error) {
        console.error('Error updating user:', error);
        return { success: false, error: 'Failed to update user' };
    }
}

export async function deleteUser(id: string) {
    try {
        await prisma.user.delete({ where: { id } });
        revalidatePath('/[locale]/dashboard/users', 'page');
        return { success: true };
    } catch (error) {
        console.error('Error deleting user:', error);
        return { success: false, error: 'Failed to delete user' };
    }
}

export async function toggleUserActive(id: string) {
    try {
        const user = await prisma.user.findUnique({ where: { id } });
        if (!user) return { success: false, error: 'User not found' };

        await prisma.user.update({
            where: { id },
            data: { isActive: !user.isActive }
        });
        revalidatePath('/[locale]/dashboard/users', 'page');
        return { success: true, isActive: !user.isActive };
    } catch (error) {
        console.error('Error toggling user status:', error);
        return { success: false, error: 'Failed to update user status' };
    }
}

export async function changePassword(id: string, newPassword: string) {
    try {
        const hashedPassword = await hash(newPassword, 12);
        await prisma.user.update({
            where: { id },
            data: { password: hashedPassword }
        });
        revalidatePath('/[locale]/dashboard/users', 'page');
        return { success: true };
    } catch (error) {
        console.error('Error changing password:', error);
        return { success: false, error: 'Failed to change password' };
    }
}

// Seed default admin if no users exist
export async function seedDefaultAdmin() {
    try {
        const userCount = await prisma.user.count();
        if (userCount === 0) {
            const hashedPassword = await hash('Admin123!', 12);
            await prisma.user.create({
                data: {
                    email: 'admin@fayedclinic.com',
                    password: hashedPassword,
                    name: 'Admin',
                    role: 'admin',
                }
            });
            console.log('Default admin user created');
            return { success: true, seeded: true };
        }
        return { success: true, seeded: false };
    } catch (error) {
        console.error('Error seeding admin:', error);
        return { success: false, error: 'Failed to seed admin' };
    }
}
