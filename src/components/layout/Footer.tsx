'use client';

import { useTranslations } from 'next-intl';
import { Link, usePathname, useRouter } from '@/i18n/routing';
import Image from 'next/image';
import { Facebook, Instagram, Twitter, Linkedin, Mail, Phone, MapPin } from 'lucide-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import styles from './Footer.module.scss';

export default function Footer() {
    const t = useTranslations('Footer');
    const tNav = useTranslations('Navigation');
    const currentYear = new Date().getFullYear();
    const router = useRouter();

    const handleSectionClick = (e: React.MouseEvent, id: string) => {
        e.preventDefault();
        // If we are on the homepage, scroll smooth
        // If not, navigate to homepage with hash
        const isHomePage = window.location.pathname === '/en' || window.location.pathname === '/ar' || window.location.pathname === '/';

        if (isHomePage) {
            const section = document.getElementById(id);
            if (section) {
                section.scrollIntoView({ behavior: 'smooth' });
            }
        } else {
            router.push(`/?target=${id}`);
        }
    };

    return (
        <footer className={`text-white pt-5 pb-3 mt-auto ${styles.footer}`}>
            <div className="container">
                <div className="row gy-4 justify-content-between">
                    <div className="col-lg-4 col-md-6">
                        <div className={styles.logoContainer}>
                            <Image
                                src="/images/fayed-logo_bg_removed.png.png"
                                alt="Dr. Fayed Logo"
                                width={200}
                                height={200}
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
                            <a href="tel:+201026170990" className={styles.contactLink}>
                                <Phone size={16} /> +20 10 26170990
                            </a>
                            <div className={styles.contactLink}>
                                <MapPin size={16} />
                                <span>{t('ourLocationValue')}</span>
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-2 col-md-6">
                        <h5 className={styles.heading}>{t('quickLinks')}</h5>
                        <ul className={styles.linkList}>
                            <li><a href="/#about" className={styles.linkItem} onClick={(e) => handleSectionClick(e, 'about')}>{tNav('about')}</a></li>
                            <li><a href="/#services" className={styles.linkItem} onClick={(e) => handleSectionClick(e, 'services')}>{tNav('services')}</a></li>
                            <li><a href="/#values" className={styles.linkItem} onClick={(e) => handleSectionClick(e, 'values')}>{tNav('values')}</a></li>
                            <li><a href="/#doctors" className={styles.linkItem} onClick={(e) => handleSectionClick(e, 'doctors')}>{tNav('doctors')}</a></li>
                            <li><a href="/#faq" className={styles.linkItem} onClick={(e) => handleSectionClick(e, 'faq')}>{tNav('faq')}</a></li>
                            <li><a href="/#tools" className={styles.linkItem} onClick={(e) => handleSectionClick(e, 'tools')}>{tNav('tools')}</a></li>
                        </ul>
                    </div>

                    <div className="col-lg-2 col-md-6">
                        <h5 className={styles.heading}>{t('socials')}</h5>
                        <ul className={styles.linkList}>
                            <li><a href="https://www.facebook.com/profile.php?id=61583335516641" target="_blank" rel="noopener noreferrer" className={styles.linkItem}><Facebook size={16} /> {t('socialNetworks.facebook')}</a></li>
                            <li><a href="https://wa.me/201026170990" target="_blank" rel="noopener noreferrer" className={styles.linkItem}><FontAwesomeIcon icon={faWhatsapp} style={{ width: 16, height: 16 }} /> {t('socialNetworks.whatsapp')}</a></li>
                            <li><a href="https://www.instagram.com/harakaphysio/" target="_blank" rel="noopener noreferrer" className={styles.linkItem}><Instagram size={16} /> {t('socialNetworks.instagram')}</a></li>
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
                        <small className="opacity-50">{t('designedFor')}</small>
                    </div>
                </div>
            </div>
        </footer>
    );
}
