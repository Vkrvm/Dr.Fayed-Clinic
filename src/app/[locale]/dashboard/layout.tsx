import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import DashboardNav from '@/components/dashboard/DashboardNav';
import styles from './Dashboard.module.scss';
import AuthProvider from '@/components/auth/AuthProvider';

export default async function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const session = await auth();

    if (!session?.user) {
        redirect('/en/auth/signin');
    }

    return (
        <AuthProvider>
            <div className={styles.dashboardContainer}>
                <DashboardNav user={session.user} />
                <main className={styles.main}>
                    {children}
                </main>
            </div>
        </AuthProvider>
    );
}
