'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Plus, Edit, Trash2 } from 'lucide-react';
import { servicesData as initialServices } from '@/lib/mock-data';
import styles from './ServicesPage.module.scss';

const STORAGE_KEY = 'fayed_clinic_services';

export default function ServicesManagementPage() {
    const [services, setServices] = useState(initialServices);
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

    const handleDelete = (id: string) => {
        if (confirm('Are you sure you want to delete this service?')) {
            setServices(services.filter(service => service.id !== id));
            alert('Service deleted successfully!');
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <div>
                    <h1 className={styles.title}>Services Management</h1>
                    <p className={styles.subtitle}>Manage all medical services</p>
                </div>
                <Link href="/en/dashboard/services/new" className={styles.addBtn}>
                    <Plus size={20} />
                    Add New Service
                </Link>
            </div>

            <div className={styles.tableContainer}>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th>Title (English)</th>
                            <th>Title (Arabic)</th>
                            <th>Icon</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {services.map((service) => (
                            <tr key={service.id}>
                                <td>{service.title_en}</td>
                                <td>{service.title_ar}</td>
                                <td>
                                    <span className={styles.iconBadge}>{service.icon}</span>
                                </td>
                                <td>
                                    <div className={styles.actions}>
                                        <Link
                                            href={`/en/dashboard/services/${service.id}/edit`}
                                            className={styles.editBtn}
                                        >
                                            <Edit size={16} />
                                            Edit
                                        </Link>
                                        <button
                                            className={styles.deleteBtn}
                                            onClick={() => handleDelete(service.id)}
                                        >
                                            <Trash2 size={16} />
                                            Delete
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
