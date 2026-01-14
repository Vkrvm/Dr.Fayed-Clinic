
import { getLocale } from 'next-intl/server';
import { getSiteSettings } from '@/lib/actions/settings';
import Hero from '@/components/sections/Hero';
import About from '@/components/sections/About';
import ServicesSection from '@/components/sections/ServicesSection';
import OurValues from '@/components/sections/OurValues';
import OurDoctors from '@/components/sections/OurDoctors';
import FAQ from '@/components/sections/FAQ';
import OurTools from '@/components/sections/OurTools';
import ScrollToSection from '@/components/layout/ScrollToSection';
import ScrollToTop from '@/components/ui/ScrollToTop';

export default async function HomePage() {
  const locale = await getLocale();
  const settings = await getSiteSettings();
  const heroImage = settings
    ? (locale === 'ar' ? settings.heroImage_ar : settings.heroImage_en) || '/images/hero-1-v2.webp'
    : '/images/hero-1-v2.webp';

  return (
    <main>
      <ScrollToSection />
      <ScrollToTop />
      <Hero initialHeroImage={heroImage} />
      <About />
      <ServicesSection />
      <OurValues />
      <OurDoctors />
      <FAQ />
      <OurTools />
    </main>
  );
}
