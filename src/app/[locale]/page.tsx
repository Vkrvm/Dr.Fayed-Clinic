import { useTranslations } from 'next-intl';
import Hero from '@/components/sections/Hero';
import About from '@/components/sections/About';
import ServicesSection from '@/components/sections/ServicesSection';
import ScrollToSection from '@/components/layout/ScrollToSection';

export default function HomePage() {
  const t = useTranslations('HomePage');
  return (
    <main>
      <ScrollToSection />
      <Hero />
      <About />
      <ServicesSection />
    </main>
  );
}
