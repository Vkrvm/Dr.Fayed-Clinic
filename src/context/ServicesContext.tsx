'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { Service } from '@/hooks/useServices';
import { servicesData as initialServices } from '@/lib/mock-data';
import { getServices, createService, updateServiceAction, deleteServiceAction } from '@/lib/actions/services';

interface ServicesContextType {
    services: Service[];
    isLoaded: boolean;
    addService: (service: Omit<Service, 'id'>) => Promise<Service>;
    updateService: (id: string, data: Partial<Service>) => Promise<void>;
    deleteService: (id: string) => Promise<void>;
    refreshServices: () => Promise<void>;
}

const ServicesContext = createContext<ServicesContextType | undefined>(undefined);

export function ServicesProvider({ children }: { children: React.ReactNode }) {
    const [services, setServices] = useState<Service[]>(initialServices);
    const [isLoaded, setIsLoaded] = useState(false);

    const load = useCallback(async () => {
        try {
            const data = await getServices();
            if (data && data.length > 0) {
                console.log(`[ServicesContext] Loaded ${data.length} services from Supabase`);
                setServices(data as Service[]);
            } else {
                console.log('[ServicesContext] Supabase empty, using mock data');
                setServices(initialServices);
            }
        } catch (error) {
            console.error('[ServicesContext] Error loading from cloud:', error);
            setServices(initialServices);
        } finally {
            setIsLoaded(true);
        }
    }, []);

    useEffect(() => {
        load();
    }, [load]);

    const addService = async (service: Omit<Service, 'id'>) => {
        const result = await createService(service);
        if (result.success && result.service) {
            await load();
            return result.service as Service;
        } else {
            throw new Error(result.error);
        }
    };

    const updateService = async (id: string, data: Partial<Service>) => {
        const result = await updateServiceAction(id, data);
        if (result.success) {
            await load();
        } else {
            throw new Error(result.error);
        }
    };

    const deleteService = async (id: string) => {
        const result = await deleteServiceAction(id);
        if (result.success) {
            await load();
        } else {
            throw new Error(result.error);
        }
    };

    const refreshServices = async () => {
        await load();
    };

    return (
        <ServicesContext.Provider value={{
            services,
            isLoaded,
            addService,
            updateService,
            deleteService,
            refreshServices
        }}>
            {children}
        </ServicesContext.Provider>
    );
}

export function useServicesContext() {
    const context = useContext(ServicesContext);
    if (context === undefined) {
        throw new Error('useServicesContext must be used within a ServicesProvider');
    }
    return context;
}
