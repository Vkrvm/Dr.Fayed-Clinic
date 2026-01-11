import { Phone, Facebook, Instagram } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';

export default function NavbarTop() {
    const t = useTranslations('TopBar');

    return (
        <div className="bg-light py-2 border-bottom d-none d-md-block">
            <div className="container d-flex justify-content-between align-items-center">
                {/* Left Side: Contact Info */}
                <div className="d-flex align-items-center gap-2">
                    <Phone size={16} className="text-secondary" />
                    <span className="small fw-medium text-secondary">{t('callUs')} – (+62) 987 654 3219</span>
                </div>

                {/* Right Side: Social Media */}
                <div className="d-flex align-items-center gap-3">
                    <a href="#" className="text-secondary text-decoration-none transition-hover scale-hover">
                        <Facebook size={18} />
                    </a>
                    <a href="#" className="text-secondary text-decoration-none transition-hover scale-hover">
                        <Instagram size={18} />
                    </a>
                    <a href="#" className="text-secondary text-decoration-none transition-hover scale-hover">
                        <FontAwesomeIcon icon={faWhatsapp} size="lg" />
                    </a>
                </div>
            </div>
        </div>
    );
}
