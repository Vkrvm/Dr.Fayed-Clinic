'use client';

import { usePathname } from 'next/navigation';
import { ReactNode } from 'react';
import NavbarTop from './NavbarTop';
import Header from './Header';
import Footer from './Footer';
import GlobalTransition from './GlobalTransition';

interface ConditionalLayoutProps {
    children: ReactNode;
    locale: string;
}

export default function ConditionalLayout({ children, locale }: ConditionalLayoutProps) {
    const pathname = usePathname();
    const isDashboardOrAuth = pathname.includes('/dashboard') || pathname.includes('/auth');

    if (isDashboardOrAuth) {
        // Dashboard and auth pages - no public layout
        return <>{children}</>;
    }

    // Public pages - include header and footer
    return (
        <GlobalTransition locale={locale}>
            <NavbarTop />
            <Header />
            <main className="flex-grow-1">
                {children}
            </main>
            <Footer />
        </GlobalTransition>
    );
}
