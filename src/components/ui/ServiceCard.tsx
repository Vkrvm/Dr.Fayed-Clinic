
'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import styles from './ServiceCard.module.scss';
import { useLocale } from 'next-intl';

interface ServiceCardProps {
    service: {
        id: string;
        title_en: string;
        title_ar: string;
        description_en: string | null;
        description_ar: string | null;
        imageUrl_en: string | null;
        imageUrl_ar: string | null;
        icon?: string | null;
    };
}

export default function ServiceCard({ service }: ServiceCardProps) {
    const t = useTranslations('Services');
    const locale = useLocale();
    const isRtl = locale === 'ar';

    const title = isRtl ? service.title_ar : service.title_en;
    const description = isRtl ? service.description_ar : service.description_en;
    const imageUrl = isRtl ? service.imageUrl_ar : service.imageUrl_en;

    return (
        <div className={styles.card}>
            <div className={styles.imageContainer}>
                <Image
                    src={imageUrl || '/images/hero-1-v2.webp'}
                    alt={title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
            </div>
            <div className={styles.content}>
                <h3 className={styles.title}>{title}</h3>
                <p className={styles.description}>{description}</p>
            </div>
        </div>
    );
}

