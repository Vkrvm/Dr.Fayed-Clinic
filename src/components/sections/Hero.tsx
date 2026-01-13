'use client';

import { Link } from '@/i18n/routing';
import { useTranslations, useLocale } from 'next-intl';
import Image from 'next/image';
import { Clock, MapPin, Plus } from 'lucide-react';
import styles from './Hero.module.scss';
import { motion, useInView, useSpring, useTransform } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { getSiteSettings } from '@/lib/actions/settings';

function Counter({ value, suffix = "" }: { value: number; suffix?: string }) {
    const ref = useRef<HTMLSpanElement>(null);
    const inView = useInView(ref, { once: true, margin: "-100px" });

    const spring = useSpring(0, { mass: 0.8, stiffness: 75, damping: 15 });
    const display = useTransform(spring, (current) =>
        (Number.isInteger(value) ? Math.round(current) : current.toFixed(1)) + suffix
    );

    useEffect(() => {
        if (inView) {
            spring.set(value);
        }
    }, [spring, value, inView]);

    return <motion.span ref={ref}>{display}</motion.span>;
}

export default function Hero() {
    const t = useTranslations('Hero');
    const locale = useLocale();
    const [heroImage, setHeroImage] = useState('/images/hero-1-v2.webp');

    useEffect(() => {
        const loadSettings = async () => {
            const settings = await getSiteSettings();
            if (settings) {
                setHeroImage(locale === 'ar' ? settings.heroImage_ar : settings.heroImage_en);
            }
        };
        loadSettings();
    }, [locale]);

    return (
        <section className={styles.heroSection} id="home">
            <div className={`container ${styles.container}`}>
                <div className="row align-items-center">
                    <div className="col-lg-6 mb-5 mb-lg-0">
                        <motion.h1
                            className={styles.heading}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            {t('heading')}
                        </motion.h1>
                        <motion.p
                            className={styles.subheading}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                        >
                            {t('subheading')}
                        </motion.p>

                        <motion.div
                            className={styles.statsContainer}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.5, delay: 0.4 }}
                        >
                            <div className={styles.statItem}>
                                <div className={styles.statNumber}>
                                    <Counter value={60} suffix="+" />
                                </div>
                                <div className={styles.statLabel}>{t('professionalStaff')}</div>
                            </div>
                            <div className={styles.statItem}>
                                <div className={styles.statNumber}>
                                    <Counter value={35} suffix="+" />
                                </div>
                                <div className={styles.statLabel}>{t('branchClinic')}</div>
                            </div>
                            <div className={styles.statItem}>
                                <div className={styles.statNumber}>
                                    <Counter value={7.3} suffix="k+" />
                                </div>
                                <div className={styles.statLabel}>{t('satisfiedClient')}</div>
                            </div>
                        </motion.div>
                    </div>

                    <div className="col-lg-6">
                        <motion.div
                            className={styles.imagesColumn}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                        >
                            <div className={styles.largeImageWrapper}>
                                <Image
                                    src={heroImage}
                                    alt="Chiropractic Treatment"
                                    fill
                                    sizes="(max-width: 768px) 100vw, 50vw"
                                    priority
                                />
                            </div>
                        </motion.div>
                    </div>
                </div>

                <motion.div
                    className={styles.floatingCard}
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.8 }}
                >
                    <div className={styles.cardItem}>
                        <div className={styles.iconBox}>
                            <Clock size={24} />
                        </div>
                        <div>
                            <h4>{t('openingHours')}</h4>
                            <p>{t('openingHoursDetails')}</p>
                        </div>
                    </div>

                    <div className={styles.cardItem}>
                        <div className={styles.iconBox}>
                            <MapPin size={24} />
                        </div>
                        <div>
                            <h4>{t('ourLocation')}</h4>
                            <p>{t('ourLocationValue')}</p>
                        </div>
                    </div>

                </motion.div>
            </div>
        </section>
    );
}
