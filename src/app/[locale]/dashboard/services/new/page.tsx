'use client';

import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import ServiceForm from '@/components/dashboard/ServiceForm';
import styles from './NewServicePage.module.scss';

export default function NewServicePage() {
    return (
        <div className={styles.container}>
            <Link href="/en/dashboard/services" className={styles.backBtn}>
                <ArrowLeft size={20} />
                Back to Services
            </Link>

            <div className={styles.header}>
                <h1 className={styles.title}>Add New Service</h1>
                <p className={styles.subtitle}>Create a new medical service offering</p>
            </div>

            <ServiceForm />
        </div>
    );
}
