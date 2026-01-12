import { useTranslations } from 'next-intl';
import Hero from '@/components/sections/Hero';
import About from '@/components/sections/About';
import ScrollToSection from '@/components/layout/ScrollToSection';

export default function HomePage() {
  const t = useTranslations('HomePage');
  return (
    <main>
      <ScrollToSection />
      <Hero />
      <About />
      <div className="container py-5">
      </div>
    </main>
  );
}
