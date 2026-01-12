'use client';

import { Link, usePathname, useRouter } from '@/i18n/routing';
import { useTranslations, useLocale } from 'next-intl';
import Image from 'next/image';
import { useState, useTransition, useEffect } from 'react';
import { Globe, Plus } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

import styles from './Header.module.scss';

export default function Header() {
    const t = useTranslations('Navigation');
    const pathname = usePathname();
    const router = useRouter();
    const [isOpen, setIsOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [activeSection, setActiveSection] = useState('home');

    const navLinks = [
        { key: 'home', href: '/' },
        { key: 'about', href: '/#about' },
        { key: 'services', href: '/services' },
        { key: 'contact', href: '/contact' },
    ];

    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY;
            setIsScrolled(scrollPosition > 50);

            // Active section logic
            const aboutSection = document.getElementById('about');
            if (aboutSection) {
                const aboutOffset = aboutSection.offsetTop - 150; // Offset for header
                if (scrollPosition >= aboutOffset) {
                    setActiveSection('about');
                } else {
                    setActiveSection('home');
                }
            }
        };

        window.addEventListener('scroll', handleScroll);
        // Trigger once on mount to set initial state
        handleScroll();

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <header className={`${styles.header} ${isScrolled ? styles.scrolled : styles.transparent} ${isOpen ? styles.open : ''}`}>
            <nav className="navbar navbar-expand-lg navbar-light py-3">
                <div className="container">
                    <Link href="/" className={`navbar-brand d-flex align-items-center gap-2 ${styles.logoLink}`} onClick={() => setIsOpen(false)}>
                        <Image
                            src="/images/fayed-logo_bg_removed.png.png"
                            alt="Fayed Clinic Logo"
                            width={0}
                            height={0}
                            sizes="100vw"
                            className={styles.logo}
                        />
                    </Link>

                    <button
                        className={`navbar-toggler border-0 p-0 ${styles.menuToggle}`}
                        type="button"
                        onClick={() => setIsOpen(!isOpen)}
                        aria-label="Toggle navigation"
                    >
                        <motion.div
                            animate={isOpen ? "open" : "closed"}
                            className="d-flex flex-column justify-content-center align-items-center"
                            style={{ width: '100%', height: '100%' }}
                        >
                            <svg width="23" height="23" viewBox="0 0 23 23">
                                <motion.path
                                    fill="transparent"
                                    strokeLinecap="round"
                                    variants={{
                                        closed: { d: "M 2 2.5 L 20 2.5" },
                                        open: { d: "M 3 16.5 L 17 2.5" }
                                    }}
                                />
                                <motion.path
                                    fill="transparent"
                                    strokeLinecap="round"
                                    d="M 2 9.423 L 20 9.423"
                                    variants={{
                                        closed: { opacity: 1 },
                                        open: { opacity: 0 }
                                    }}
                                    transition={{ duration: 0.1 }}
                                />
                                <motion.path
                                    fill="transparent"
                                    strokeLinecap="round"
                                    variants={{
                                        closed: { d: "M 2 16.346 L 20 16.346" },
                                        open: { d: "M 3 2.5 L 17 16.346" }
                                    }}
                                />
                            </svg>
                        </motion.div>
                    </button>

                    <div className="collapse navbar-collapse justify-content-end d-none d-lg-flex">
                        <ul className="navbar-nav align-items-center gap-4 mb-0">
                            {navLinks.map((link) => (
                                <li className="nav-item" key={link.key}>
                                    <Link
                                        href={link.key === 'about' ? '/#' : (link.href as any)}
                                        className={`nav-link ${styles.navLink} ${activeSection === link.key ? styles.activeLink : ''}`}
                                        onClick={(e) => {
                                            if (link.key === 'home') {
                                                e.preventDefault();
                                                if (pathname === '/') {
                                                    window.scrollTo({ top: 0, behavior: 'smooth' });
                                                } else {
                                                    router.push('/');
                                                }
                                            } else if (link.key === 'about') {
                                                e.preventDefault();
                                                const aboutSection = document.getElementById('about');
                                                if (aboutSection) {
                                                    aboutSection.scrollIntoView({ behavior: 'smooth' });
                                                } else {
                                                    router.push('/?target=about');
                                                }
                                            }
                                        }}
                                    >
                                        {t(link.key)}
                                    </Link>
                                </li>
                            ))}
                        </ul>

                        <div className={`d-flex align-items-center gap-3 ${styles.actionsContainer}`}>
                            <LanguageSwitcher />
                            <Link href="/appointment" className={`${styles.appointmentBtn} fw-bold shadow-sm`}>
                                <Plus size={18} strokeWidth={3} />
                                {t('appointment')}
                            </Link>
                        </div>
                    </div>
                </div>
            </nav>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                        className={`d-lg-none ${styles.mobileMenu}`}
                    >
                        <div className="container py-4">
                            <ul className="navbar-nav gap-3 mb-4">
                                {navLinks.map((link) => (
                                    <li className="nav-item" key={link.key}>
                                        <div
                                            className={`nav-link fw-bold fs-5 ${activeSection === link.key ? styles.activeMobile : 'text-dark'}`}
                                            role="button"
                                            style={{ cursor: 'pointer' }}
                                            onClick={(e) => {
                                                e.preventDefault();
                                                e.stopPropagation();

                                                setIsOpen(false);

                                                setTimeout(() => {
                                                    if (link.key === 'home') {
                                                        if (pathname === '/') {
                                                            window.scrollTo({ top: 0, behavior: 'smooth' });
                                                        } else {
                                                            router.push('/');
                                                        }
                                                    } else if (link.key === 'about') {
                                                        const aboutSection = document.getElementById('about');
                                                        if (aboutSection) {
                                                            aboutSection.scrollIntoView({ behavior: 'smooth' });
                                                        } else {
                                                            router.push('/?target=about');
                                                        }
                                                    } else {
                                                        router.push(link.href as any);
                                                    }
                                                }, 350); // Wait for menu close animation
                                            }}
                                        >
                                            {t(link.key)}
                                        </div>
                                    </li>
                                ))}
                            </ul>
                            <div className="d-flex flex-column gap-3">
                                <div className="d-flex justify-content-between align-items-center">
                                    <span className="fw-bold text-primary">Language</span>
                                    <LanguageSwitcher />
                                </div>
                                <div
                                    className={`${styles.appointmentBtn} fw-bold w-100 shadow-sm`}
                                    role="button"
                                    style={{ cursor: 'pointer' }}
                                    onClick={() => {
                                        router.push('/appointment');
                                        setIsOpen(false);
                                    }}
                                >
                                    <Plus size={18} strokeWidth={3} />
                                    {t('appointment')}
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header >
    );
}

function LanguageSwitcher() {
    const router = useRouter();
    const pathname = usePathname();
    const [isPending, startTransition] = useTransition();
    const locale = useLocale();

    const toggle = () => {
        const nextLocale = locale === 'en' ? 'ar' : 'en';
        startTransition(() => {
            router.replace(pathname, { locale: nextLocale });
        });
    };

    return (
        <button
            onClick={toggle}
            disabled={isPending}
            className="btn btn-link text-primary p-0 d-flex align-items-center gap-1 text-decoration-none fw-bold"
            style={{ minWidth: '45px' }}
        >
            {isPending ? (
                <span className="spinner-border spinner-border-sm text-secondary" role="status" aria-hidden="true"></span>
            ) : (
                <Globe size={18} />
            )}
            <span>{locale === 'en' ? 'AR' : 'EN'}</span>
        </button>
    );
}
