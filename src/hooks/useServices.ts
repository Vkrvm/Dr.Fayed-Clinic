'use client';

import { useState, useEffect } from 'react';
import { servicesData as initialServices } from '@/lib/mock-data';

export const STORAGE_KEY = 'fayed_clinic_services';

export interface Service {
    id: string;
    title_en: string;
    title_ar: string;
    description_en: string;
    description_ar: string;
    imageUrl: string;
    icon: string;
}

export function useServices() {
    const [services, setServices] = useState<Service[]>(initialServices);
    const [isLoaded, setIsLoaded] = useState(false);

    // Load services from localStorage on mount
    useEffect(() => {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
            try {
                setServices(JSON.parse(stored));
            } catch {
                setServices(initialServices);
            }
        }
        setIsLoaded(true);
    }, []);

    // Save to localStorage whenever services change
    useEffect(() => {
        if (isLoaded) {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(services));
        }
    }, [services, isLoaded]);

    const addService = (service: Omit<Service, 'id'>) => {
        const newService = {
            ...service,
            id: `service-${Date.now()}`,
        };
        setServices([...services, newService]);
        return newService;
    };

    const updateService = (id: string, data: Partial<Service>) => {
        setServices(services.map(s => s.id === id ? { ...s, ...data } : s));
    };

    const deleteService = (id: string) => {
        setServices(services.filter(s => s.id !== id));
    };

    const getService = (id: string) => {
        return services.find(s => s.id === id);
    };

    return {
        services,
        isLoaded,
        addService,
        updateService,
        deleteService,
        getService,
    };
}

// For server components - get initial data
export function getInitialServices(): Service[] {
    return initialServices;
}
