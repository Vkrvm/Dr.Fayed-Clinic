'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import styles from './OurValues.module.scss';

const values = [
    { number: '01', key: 'personalizedTreatment' },
    { number: '02', key: 'experiencedProfessionals' },
    { number: '03', key: 'comprehensiveServices' },
    { number: '04', key: 'holisticApproach' },
];

export default function OurValues() {
    const t = useTranslations('OurValues');

    return (
        <section className={styles.valuesSection} id="values">
            <div className="container">
                {/* Mobile Header */}
                <div className={styles.mobileHeader}>
                    <span className={styles.label}>{t('label')}</span>
                    <h2 className={styles.heading}>{t('heading')}</h2>
                </div>

                <div className={styles.valuesGrid}>
                    {/* Values List */}
                    <div className={styles.valuesListContainer}>
                        {values.map((value, index) => (
                            <motion.div
                                key={value.key}
                                className={styles.valueCard}
                                initial={{ opacity: 0, x: -30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                viewport={{ once: true }}
                            >
                                <span className={styles.valueNumber}>{value.number}</span>
                                <div className={styles.valueContent}>
                                    <h4>{t(`values.${value.key}.title`)}</h4>
                                    <p>{t(`values.${value.key}.description`)}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Right Content - Hidden on mobile */}
                    <motion.div
                        className={styles.contentContainer}
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        viewport={{ once: true }}
                    >
                        <span className={styles.label}>{t('label')}</span>
                        <h2 className={styles.heading}>{t('heading')}</h2>
                        <div className={styles.imageContainer}>
                            <img
                                src="/images/our-values-img.jpg"
                                alt={t('imageAlt')}
                            />
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
