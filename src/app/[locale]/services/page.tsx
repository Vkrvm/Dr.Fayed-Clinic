
'use client';

import { useTranslations } from 'next-intl';
import styles from './Services.module.scss';
import ServiceCard from '@/components/ui/ServiceCard';
import { useServices } from '@/hooks/useServices';

export default function ServicesPage() {
    const t = useTranslations('Services');
    const { services, isLoaded } = useServices();

    if (!isLoaded) {
        return (
            <main className={styles.servicesPage}>
                <section>
                    <div className="container text-center py-5">
                        <p>Loading services...</p>
                    </div>
                </section>
            </main>
        );
    }

    return (
        <main className={styles.servicesPage}>
            <section>
                <div className="container">
                    <div className={styles.header}>
                        <span className={styles.subtitle}>{t('whatWeOffer')}</span>
                        <h2 className={styles.heading}>{t('pageHeading')}</h2>
                    </div>

                    <div className="row gy-4">
                        {[...services]
                            .sort((a, b) => (a.displayOrder ?? 999) - (b.displayOrder ?? 999))
                            .map((service) => (
                                <div key={service.id} className="col-lg-4 col-md-6">
                                    <ServiceCard service={service} />
                                </div>
                            ))}
                    </div>
                </div>
            </section>
        </main>
    );
}
