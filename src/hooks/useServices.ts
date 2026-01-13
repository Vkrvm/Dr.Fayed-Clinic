'use client';

import { useServicesContext } from '@/context/ServicesContext';
import { servicesData as initialServices } from '@/lib/mock-data';

export const STORAGE_KEY = 'fayed_clinic_services';

export interface Service {
    id: string;
    title_en: string;
    title_ar: string;
    description_en: string;
    description_ar: string;
    imageUrl_en: string;
    imageUrl_ar: string;
    icon: string;
    isFeatured?: boolean;
    displayOrder?: number;
}

export function useServices() {
    try {
        const context = useServicesContext();
        return {
            services: context.services,
            isLoaded: context.isLoaded,
            addService: context.addService,
            updateService: context.updateService,
            deleteService: context.deleteService,
            getService: (id: string) => context.services.find(s => s.id === id),
            refreshServices: context.refreshServices
        };
    } catch (error) {
        // Fallback for cases outside Provider (e.g. initial server render checks)
        return {
            services: initialServices,
            isLoaded: false,
            addService: async () => ({} as any),
            updateService: async () => { },
            deleteService: async () => { },
            getService: (id: string) => initialServices.find(s => s.id === id),
            refreshServices: async () => { }
        };
    }
}

// For server components - get initial data
export function getInitialServices(): Service[] {
    return initialServices;
}
