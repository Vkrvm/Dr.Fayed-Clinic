import { useTranslations } from 'next-intl';
import Hero from '@/components/sections/Hero';

export default function HomePage() {
  const t = useTranslations('HomePage');
  return (
    <main>
      <Hero />
      {/* Rest of the page content will go here */}
      <div className="container py-5">
        {/* Temporary placeholder for next sections */}
      </div>
    </main>
  );
}
