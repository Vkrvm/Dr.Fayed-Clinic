import { useTranslations } from 'next-intl';
import Hero from '@/components/sections/Hero';
import About from '@/components/sections/About';
import ServicesSection from '@/components/sections/ServicesSection';
import OurValues from '@/components/sections/OurValues';
import OurDoctors from '@/components/sections/OurDoctors';
import FAQ from '@/components/sections/FAQ';
import OurTools from '@/components/sections/OurTools';
import ScrollToSection from '@/components/layout/ScrollToSection';
import ScrollToTop from '@/components/ui/ScrollToTop';

export default function HomePage() {
  const t = useTranslations('HomePage');
  return (
    <main>
      <ScrollToSection />
      <ScrollToTop />
      <Hero />
      <About />
      <ServicesSection />
      <OurValues />
      <OurDoctors />
      <FAQ />
      <OurTools />
    </main>
  );
}
