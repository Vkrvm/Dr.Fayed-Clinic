'use server';

import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

const SETTINGS_ID = 'main';

export async function getSiteSettings() {
    try {
        let settings = await prisma.siteSettings.findUnique({
            where: { id: SETTINGS_ID }
        });

        // Create default settings if not exists
        if (!settings) {
            settings = await prisma.siteSettings.create({
                data: {
                    id: SETTINGS_ID,
                    heroImage_en: '/images/hero-1-v2.webp',
                    heroImage_ar: '/images/hero-1-v2.webp',
                }
            });
        }

        return settings;
    } catch (error) {
        console.error('Error fetching site settings:', error);
        return {
            id: SETTINGS_ID,
            heroImage_en: '/images/hero-1-v2.webp',
            heroImage_ar: '/images/hero-1-v2.webp',
        };
    }
}

export async function updateHeroImages(data: { heroImage_en: string; heroImage_ar: string }) {
    try {
        await prisma.siteSettings.upsert({
            where: { id: SETTINGS_ID },
            update: {
                heroImage_en: data.heroImage_en,
                heroImage_ar: data.heroImage_ar,
            },
            create: {
                id: SETTINGS_ID,
                heroImage_en: data.heroImage_en,
                heroImage_ar: data.heroImage_ar,
            }
        });
        revalidatePath('/[locale]', 'layout');
        return { success: true };
    } catch (error) {
        console.error('Error updating hero images:', error);
        return { success: false, error: 'Failed to update hero images' };
    }
}
