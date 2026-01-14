'use client';

import { useRef, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { motion, useAnimation, useMotionValue } from 'framer-motion';
import styles from './OurTools.module.scss';

export default function OurTools() {
    const t = useTranslations('OurTools');
    const containerRef = useRef<HTMLDivElement>(null);
    const controls = useAnimation();
    const xParams = useMotionValue(0);

    const images = [
        '/images/tools/tool-1.webp',
        '/images/tools/tool-2.webp',
        '/images/tools/tool-3.webp',
        '/images/tools/tool-4.webp',
        '/images/tools/tool-5.webp',
        '/images/tools/tool-6.webp',
        '/images/tools/tool-7.webp',
    ];

    // Double the images for seamless infinite loop
    const displayImages = [...images, ...images];

    useEffect(() => {
        let controls: any;
        const animate = async () => {
            // We can use a simpler CSS animation or Framer Motion 'animate'
            // But for drag + autoplay, it's tricky.
            // Let's stick to a pure Marquee auto-scroll that pauses on hover/drag?
            // Or simpler: Just a continuous CSS animation that users can't drag (like many partner logos).
            // User said "slider", but "play auto" usually implies marquee for "tools".
            // Let's try continuous marquee with framer motion.
        };
    }, []);

    return (
        <section className={styles.section} id="tools">
            <div className="container" style={{ overflow: 'hidden' }}>
                <motion.div
                    className={styles.header}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <span className={styles.label}>{t('label')}</span>
                    <h2 className={styles.heading}>{t('heading')}</h2>
                </motion.div>

                {/* Centered Slider Container */}
                <div className={styles.sliderWrapper}>
                    <motion.div
                        className={styles.sliderTrack}
                        animate={{
                            x: [0, -1000], // Adjust based on total width 
                        }}
                        transition={{
                            x: {
                                repeat: Infinity,
                                repeatType: "loop",
                                duration: 20, // Slow speed
                                ease: "linear",
                            },
                        }}
                    >
                        {/* Repeat enough times to fill screen and loop */}
                        {[...images, ...images, ...images].map((src, index) => (
                            <div key={index} className={styles.card}>
                                <Image
                                    src={src}
                                    alt={`Clinic Tool ${index}`}
                                    fill
                                    className={styles.image}
                                    sizes="(max-width: 768px) 280px, 350px"
                                />
                            </div>
                        ))}
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
