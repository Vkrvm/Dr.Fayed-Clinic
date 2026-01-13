
'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import styles from './ServicesSection.module.scss';
import ServiceCard from '../ui/ServiceCard';
import { useServices } from '@/hooks/useServices';

export default function ServicesSection() {
    const t = useTranslations('Services');
    const { services, isLoaded } = useServices();

    // Show featured services first, sorted by displayOrder
    // If no featured services, fall back to newest 3
    const featuredServices = services.filter(s => s.isFeatured).length > 0
        ? [...services].filter(s => s.isFeatured).sort((a, b) => (a.displayOrder ?? 0) - (b.displayOrder ?? 0))
        : [...services].reverse().slice(0, 3);

    return (
        <section className={styles.section} id="services">
            <div className="container">
                <div className={styles.header}>
                    <span className={styles.subtitle}>{t('subtitle')}</span>
                    <h2 className={styles.heading}>{t('heading')}</h2>
                </div>

                <div className="row gy-4">
                    {featuredServices.map((service) => (
                        <div key={service.id} className="col-lg-4 col-md-6">
                            <ServiceCard service={service} />
                        </div>
                    ))}
                </div>

                <div className={styles.footer}>
                    <div className={styles.viewAllContainer}>
                        <p>{t('discoverFullRange')}</p>
                        <Link href="/services" className={styles.viewAllLink}>
                            {t('viewAllServices')}
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}
