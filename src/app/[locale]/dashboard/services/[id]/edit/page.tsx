'use client';

import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import ServiceForm from '@/components/dashboard/ServiceForm';
import { useServices } from '@/hooks/useServices';
import styles from '../../new/NewServicePage.module.scss';

export default function EditServicePage() {
    const params = useParams();
    const serviceId = params.id as string;
    const { services, isLoaded, getService } = useServices();
    const [service, setService] = useState<any>(null);

    useEffect(() => {
        if (isLoaded) {
            const found = services.find(s => s.id === serviceId);
            setService(found || null);
        }
    }, [isLoaded, services, serviceId]);

    if (!isLoaded) {
        return (
            <div className={styles.container}>
                <p>Loading...</p>
            </div>
        );
    }

    if (!service) {
        return (
            <div className={styles.container}>
                <Link href="/en/dashboard/services" className={styles.backBtn}>
                    <ArrowLeft size={20} />
                    Back to Services
                </Link>
                <h1>Service not found</h1>
                <p>The service with ID "{serviceId}" doesn't exist.</p>
            </div>
        );
    }

    return (
        <div className={styles.container}>
            <Link href="/en/dashboard/services" className={styles.backBtn}>
                <ArrowLeft size={20} />
                Back to Services
            </Link>

            <div className={styles.header}>
                <h1 className={styles.title}>Edit Service</h1>
                <p className={styles.subtitle}>Update service details</p>
            </div>

            <ServiceForm initialData={service} isEditing={true} serviceId={serviceId} />
        </div>
    );
}
