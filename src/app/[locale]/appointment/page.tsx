import { getTranslations } from 'next-intl/server';
import AppointmentForm from '@/components/forms/AppointmentForm';
import prisma from '@/lib/prisma';
import { useLocale } from 'next-intl';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'AppointmentPage' });

    return {
        title: t('title'),
        description: t('description')
    };
}

// Fetch services from DB
async function getServices(locale: string) {
    try {
        const services = await prisma.medicalService.findMany({
            orderBy: { displayOrder: 'asc' },
            select: {
                id: true,
                title_en: true,
                title_ar: true,
            }
        });

        return services.map(s => ({
            id: s.id,
            title: locale === 'ar' ? s.title_ar : s.title_en
        }));
    } catch (error) {
        console.error('Failed to fetch services:', error);
        return [];
    }
}

import styles from './AppointmentPage.module.scss';

export default async function AppointmentPage({
    params
}: {
    params: Promise<{ locale: string }>;
}) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'AppointmentPage' });
    const services = await getServices(locale);

    return (
        <main className={styles.main}>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-lg-8 col-xl-6">
                        <div className="text-center mb-5">
                            <h1 className="display-5 fw-bold text-primary mb-3">{t('heading')}</h1>
                            <p className="lead text-muted">{t('subheading')}</p>
                        </div>

                        <AppointmentForm services={services} />
                    </div>
                </div>
            </div>
        </main>
    );
}
