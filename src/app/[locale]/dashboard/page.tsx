import Link from 'next/link';
import { Briefcase, Plus } from 'lucide-react';
import styles from './DashboardHome.module.scss';

export default function DashboardHome() {
    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Dashboard</h1>
            <p className={styles.subtitle}>Manage your clinic's content</p>

            <div className={styles.grid}>
                <Link href="/en/dashboard/services" className={styles.card}>
                    <div className={styles.cardIcon}>
                        <Briefcase size={32} />
                    </div>
                    <h2>Services</h2>
                    <p>Manage your medical services</p>
                    <div className={styles.cardAction}>
                        View All →
                    </div>
                </Link>

                <Link href="/en/dashboard/services/new" className={`${styles.card} ${styles.cardAction}`}>
                    <div className={styles.cardIcon}>
                        <Plus size={32} />
                    </div>
                    <h2>Add New Service</h2>
                    <p>Create a new service offering</p>
                </Link>
            </div>
        </div>
    );
}
