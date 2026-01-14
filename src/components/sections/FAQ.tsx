'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import styles from './FAQ.module.scss';

export default function FAQ() {
    const t = useTranslations('FAQ');
    const [openIndex, setOpenIndex] = useState<number | null>(0); // First item open by default or null

    const questions = ['q1', 'q2', 'q3', 'q4', 'q5', 'q6'];

    const toggleItem = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section className={styles.section} id="faq">
            <div className={`container ${styles.container}`}>
                {/* Left Side: Header */}
                <motion.div
                    className={styles.header}
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                >
                    <span className={styles.label}>{t('label')}</span>
                    <h2 className={styles.heading}>{t('heading')}</h2>
                </motion.div>

                {/* Right Side: Accordion */}
                <div className={styles.accordion}>
                    {questions.map((qKey, index) => {
                        const isOpen = openIndex === index;
                        return (
                            <motion.div
                                key={qKey}
                                className={`${styles.item} ${isOpen ? styles.active : ''}`}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                            >
                                <button
                                    className={styles.question}
                                    onClick={() => toggleItem(index)}
                                    aria-expanded={isOpen}
                                >
                                    <span>{t(`items.${qKey}.question`)}</span>
                                    <span className={styles.icon}>
                                        <ChevronDown size={20} />
                                    </span>
                                </button>
                                <AnimatePresence>
                                    {isOpen && (
                                        <motion.div
                                            className={styles.answerContent}
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: 'auto', opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.3, ease: 'easeInOut' }}
                                        >
                                            <p className={styles.answer}>
                                                {t(`items.${qKey}.answer`)}
                                            </p>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
