
'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { motion } from 'framer-motion';
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
                <motion.div
                    className={styles.header}
                    initial={{ opacity: 0, y: -30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                >
                    <span className={styles.subtitle}>{t('subtitle')}</span>
                    <h2 className={styles.heading}>{t('heading')}</h2>
                </motion.div>

                <div className="row gy-4">
                    {featuredServices.map((service, index) => (
                        <motion.div
                            key={service.id}
                            className="col-lg-4 col-md-6"
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.15 }}
                            viewport={{ once: true }}
                        >
                            <ServiceCard service={service} />
                        </motion.div>
                    ))}
                </div>

                <motion.div
                    className={styles.footer}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    viewport={{ once: true }}
                >
                    <div className={styles.viewAllContainer}>
                        <p>{t('discoverFullRange')}</p>
                        <Link href="/services" className={styles.viewAllLink}>
                            {t('viewAllServices')}
                        </Link>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
