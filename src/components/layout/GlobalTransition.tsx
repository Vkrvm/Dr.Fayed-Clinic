'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';

export default function GlobalTransition({
    children,
    locale
}: {
    children: React.ReactNode;
    locale: string;
}) {
    const pathname = usePathname();

    return (
        // AnimatePresence mode="wait" ensures the old component fully exists before new one enters
        // Keying by 'locale' ensures the entire layout (including direction changes) is treated as a fresh mount
        <AnimatePresence mode="wait">
            <motion.div
                key={locale} // Crucial: triggers animation on locale change
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="d-flex flex-column min-vh-100" // Ensure it takes full height
            >
                {children}
            </motion.div>
        </AnimatePresence>

        /* 
           Note: If we also want route transitions within the same locale to be smooth, 
           we might need nested motion divs or let template.tsx handle the inner page.
           But user asked for "everything" to be smooth including navbar on language change.
           This wrapper handles the Global Layout transition.
        */
    );
}
