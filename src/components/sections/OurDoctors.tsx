'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { motion } from 'framer-motion';
import styles from './OurDoctors.module.scss';

export default function OurDoctors() {
    const t = useTranslations('OurDoctors');

    const doctors = [
        {
            key: 'fayed',
            image: '/images/doctors/Dr.Fayed.jpeg'
        },
        {
            key: 'anas',
            image: '/images/doctors/Dr.Anas.jpeg'
        }
    ];

    return (
        <section className={styles.section} id="doctors">
            <div className={`container ${styles.container}`}>
                {/* Left Side: Content */}
                <motion.div
                    className={styles.content}
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <span className={styles.label}>{t('label')}</span>
                    <h2 className={styles.heading}>{t('heading')}</h2>
                    <p className={styles.description}>{t('description')}</p>
                </motion.div>

                {/* Right Side: Doctor Cards */}
                <div className={styles.cardsContainer}>
                    {doctors.map((doctor, index) => (
                        <motion.div
                            key={doctor.key}
                            className={styles.card}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: index * 0.2 }}
                        >
                            <div className={styles.imageContainer}>
                                <Image
                                    src={doctor.image}
                                    alt={t(`doctors.${doctor.key}.name`)}
                                    fill
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                                />
                            </div>
                            <div className={styles.info}>
                                <h3 className={styles.name}>{t(`doctors.${doctor.key}.name`)}</h3>
                                <p className={styles.role}>{t(`doctors.${doctor.key}.role`)}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
