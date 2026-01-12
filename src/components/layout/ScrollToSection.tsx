'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

export default function ScrollToSection() {
    const searchParams = useSearchParams();

    useEffect(() => {
        const target = searchParams.get('target');
        if (target) {
            const element = document.getElementById(target);
            if (element) {
                setTimeout(() => {
                    element.scrollIntoView({ behavior: 'smooth' });
                }, 500);

                // Clean up URL without refresh
                const url = new URL(window.location.href);
                url.searchParams.delete('target');
                window.history.replaceState({}, '', url.toString());
            }
        }
    }, [searchParams]);

    return null;
}
