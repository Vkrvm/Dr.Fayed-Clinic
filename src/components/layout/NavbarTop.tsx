import { Phone, Facebook, Instagram } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import styles from './NavbarTop.module.scss';

export default function NavbarTop() {
    const t = useTranslations('TopBar');

    return (
        <div className={styles.navbarTop}>
            <div className={`container ${styles.content}`}>
                <div className={styles.contactInfo}>
                    <Phone size={16} />
                    <span className="fw-medium">{t('callUs')} – +20 10 26170990</span>
                </div>

                <div className={styles.socialIcons}>
                    <a href="https://www.facebook.com/profile.php?id=61583335516641" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                        <Facebook size={18} />
                    </a>
                    <a href="https://www.instagram.com/harakaphysio/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                        <Instagram size={18} />
                    </a>
                    <a href="https://wa.me/201026170990" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
                        <FontAwesomeIcon icon={faWhatsapp} size="lg" />
                    </a>
                </div>
            </div>
        </div>
    );
}
