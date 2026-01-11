'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import Image from 'next/image';
import { Facebook, Instagram, Twitter, Linkedin, Mail, Phone } from 'lucide-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import styles from './Footer.module.scss';

export default function Footer() {
    const t = useTranslations('Footer');
    const tNav = useTranslations('Navigation');
    const currentYear = new Date().getFullYear();

    return (
        <footer className={`text-white pt-5 pb-3 mt-auto ${styles.footer}`}>
            <div className="container">
                <div className="row gy-4 justify-content-between">
                    {/* Column 1: Info */}
                    <div className="col-lg-4 col-md-6">
                        <div className={styles.logoContainer}>
                            <Image
                                src="/images/fayed-logo_bg_removed.png.png"
                                alt="Dr. Fayed Logo"
                                width={200} // High resolution intrinsic width
                                height={200} // High resolution intrinsic height
                                className={styles.logo}
                            />
                        </div>
                        <p className={styles.description}>
                            {t('description')}
                        </p>
                        <div className="d-flex flex-column gap-2">
                            <a href="mailto:support@fayedclinic.com" className={styles.contactLink}>
                                <Mail size={16} /> support@fayedclinic.com
                            </a>
                            <a href="tel:+629876543219" className={styles.contactLink}>
                                <Phone size={16} /> (+20) 123 456 789
                            </a>
                        </div>
                    </div>

                    {/* Column 2: Quick Links */}
                    <div className="col-lg-2 col-md-6">
                        <h5 className={styles.heading}>{t('quickLinks')}</h5>
                        <ul className={styles.linkList}>
                            <li><Link href="/" className={styles.linkItem}>{tNav('home')}</Link></li>
                            <li><Link href="/about" className={styles.linkItem}>{tNav('about')}</Link></li>
                            <li><Link href="/appointment" className={styles.linkItem}>{tNav('appointment')}</Link></li>
                            <li><Link href="/services" className={styles.linkItem}>{tNav('services')}</Link></li>
                        </ul>
                    </div>

                    {/* Column 3: Socials */}
                    <div className="col-lg-2 col-md-6">
                        <h5 className={styles.heading}>{t('socials')}</h5>
                        <ul className={styles.linkList}>
                            <li><a href="#" className={styles.linkItem}><Facebook size={16} /> {t('socialNetworks.facebook')}</a></li>
                            <li><a href="#" className={styles.linkItem}><FontAwesomeIcon icon={faWhatsapp} style={{ width: 16, height: 16 }} /> {t('socialNetworks.whatsapp')}</a></li>
                            <li><a href="#" className={styles.linkItem}><Instagram size={16} /> {t('socialNetworks.instagram')}</a></li>
                        </ul>
                    </div>

                    {/* Column 4: Our Services (Static for now) */}
                    <div className="col-lg-3 col-md-6">
                        <h5 className={styles.heading}>{t('services')}</h5>
                        <ul className={styles.linkList}>
                            <li className={styles.linkItem}><span className="me-1">•</span> {t('serviceList.chiropractic')}</li>
                            <li className={styles.linkItem}><span className="me-1">•</span> {t('serviceList.physiotherapy')}</li>
                            <li className={styles.linkItem}><span className="me-1">•</span> {t('serviceList.posture')}</li>
                            <li className={styles.linkItem}><span className="me-1">•</span> {t('serviceList.massage')}</li>
                        </ul>
                    </div>
                </div>

                <hr className={styles.divider} />

                <div className="row align-items-center">
                    <div className="col-md-6 text-center text-md-start">
                        <p className={styles.copyright}>
                            {t('copyright', { year: currentYear })}
                        </p>
                    </div>
                    <div className="col-md-6 text-center text-md-end mt-2 mt-md-0">
                        <small className="opacity-50">Designed for Fayed Clinic</small>
                    </div>
                </div>
            </div>
        </footer>
    );
}
