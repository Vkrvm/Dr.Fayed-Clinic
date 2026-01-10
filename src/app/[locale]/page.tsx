import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';

export default function HomePage() {
  const t = useTranslations('HomePage');
  return (
    <div className="container py-5">
      <h1>{t('title')}</h1>
      <p className="lead">{t('welcome')}</p>
      <div className="mt-4">
        <Link href="/" locale="en" className="btn btn-primary me-2">English</Link>
        <Link href="/" locale="ar" className="btn btn-secondary">العربية</Link>
      </div>
    </div>
  );
}
