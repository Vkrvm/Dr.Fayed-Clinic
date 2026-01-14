'use client';

import { useTranslations } from 'next-intl';
import { Phone } from 'lucide-react';
import { motion } from 'framer-motion';
import styles from './About.module.scss';

export default function About() {
    const t = useTranslations('About');

    return (
        <section className={styles.aboutSection} id="about">
            <div className="container">
                <div className="d-lg-none mb-4 text-center">
                    <span className={styles.label}>{t('label')}</span>
                    <h2 className={styles.heading}>{t('heading')}</h2>
                    <p className={styles.description}>
                        {t('description')}
                    </p>
                </div>

                <div className="row align-items-center">
                    <div className="col-lg-6">
                        <motion.div
                            className={styles.videoContainer}
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6 }}
                            viewport={{ once: true }}
                        >
                            <video
                                controls
                                playsInline
                                preload="none"
                                poster="/images/video-thumb-v2.webp" // Fallback
                            >
                                <source src="/videos/aboutus-vid.mp4" type="video/mp4" />
                                Your browser does not support the video tag.
                            </video>
                        </motion.div>
                    </div>

                    <div className="col-lg-6">
                        <motion.div
                            className={styles.contentContainer}
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            viewport={{ once: true }}
                        >
                            <div className="d-none d-lg-block">
                                <span className={styles.label}>{t('label')}</span>
                                <h2 className={styles.heading}>{t('heading')}</h2>
                                <p className={styles.description}>
                                    {t('description')}
                                </p>
                            </div>

                            <div className={styles.missionVisionBox}>
                                <div className="row gy-4">
                                    <div className="col-md-6">
                                        <div className={styles.missionItem}>
                                            <h3>{t('missionTitle')}</h3>
                                            <p>{t('missionText')}</p>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className={styles.missionItem}>
                                            <h3>{t('visionTitle')}</h3>
                                            <p>{t('visionText')}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className={styles.actions}>
                                <div className={styles.callUs}>
                                    <div className={styles.iconBox}>
                                        <Phone size={24} />
                                    </div>
                                    <div className={styles.text}>
                                        <span>{t('callUsAnytime')}</span>
                                        <a href="tel:+201026170990" className={styles.phone}>
                                            +20 10 26170990
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
}
