'use client';

import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { useParams } from 'next/navigation';
import ServiceForm from '@/components/dashboard/ServiceForm';
import { servicesData } from '@/lib/mock-data';
import styles from '../../new/NewServicePage.module.scss';

export default function EditServicePage() {
    const params = useParams();
    const serviceId = params.id as string;

    // Find the service by ID
    const service = servicesData.find(s => s.id === serviceId);

    if (!service) {
        return (
            <div className={styles.container}>
                <Link href="/en/dashboard/services" className={styles.backBtn}>
                    <ArrowLeft size={20} />
                    Back to Services
                </Link>
                <h1>Service not found</h1>
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

            <ServiceForm initialData={service} />
        </div>
    );
}
