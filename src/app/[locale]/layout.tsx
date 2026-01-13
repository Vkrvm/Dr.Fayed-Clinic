import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import { Montserrat, Outfit } from "next/font/google";
import "@/styles/globals.scss";
import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';
config.autoAddCss = false;
import NavbarTop from "@/components/layout/NavbarTop";
import Header from "@/components/layout/Header";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

export const metadata = {
  title: "Fayed Clinic",
  description: "Medical Center Portfolio",
};

import GlobalTransition from "@/components/layout/GlobalTransition";

import Footer from "@/components/layout/Footer";
import AuthProvider from "@/components/auth/AuthProvider";
import { ServicesProvider } from "@/context/ServicesContext";
import ConditionalLayout from "@/components/layout/ConditionalLayout";

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  // Ensure that the incoming `locale` is valid
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();

  return (
    <html lang={locale} dir={locale === 'ar' ? 'rtl' : 'ltr'}>
      <body className={`${montserrat.variable} ${outfit.variable}`}>
        <AuthProvider>
          <ServicesProvider>
            <NextIntlClientProvider messages={messages}>
              <ConditionalLayout locale={locale}>
                {children}
              </ConditionalLayout>
            </NextIntlClientProvider>
          </ServicesProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
