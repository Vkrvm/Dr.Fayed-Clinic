'use client';

import { useState, useEffect, useRef } from 'react';
import { Save, ImageIcon, Upload, Loader2 } from 'lucide-react';
import { getSiteSettings, updateHeroImages } from '@/lib/actions/settings';
import styles from './SettingsPage.module.scss';

export default function SettingsPage() {
    const [heroImageEn, setHeroImageEn] = useState('/images/hero-1-v2.webp');
    const [heroImageAr, setHeroImageAr] = useState('/images/hero-1-v2.webp');
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [uploadingEn, setUploadingEn] = useState(false);
    const [uploadingAr, setUploadingAr] = useState(false);
    const fileInputEnRef = useRef<HTMLInputElement>(null);
    const fileInputArRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        const loadSettings = async () => {
            const settings = await getSiteSettings();
            if (settings) {
                setHeroImageEn(settings.heroImage_en);
                setHeroImageAr(settings.heroImage_ar);
            }
            setIsLoading(false);
        };
        loadSettings();
    }, []);

    const handleUpload = async (file: File, locale: 'en' | 'ar') => {
        const setUploading = locale === 'en' ? setUploadingEn : setUploadingAr;
        const setImage = locale === 'en' ? setHeroImageEn : setHeroImageAr;

        setUploading(true);
        try {
            const formData = new FormData();
            formData.append('file', file);

            const response = await fetch('/api/upload', {
                method: 'POST',
                body: formData,
            });

            const result = await response.json();

            if (result.success && result.url) {
                setImage(result.url);
            } else {
                alert(result.error || 'Upload failed');
            }
        } catch (error: any) {
            alert('Upload error: ' + error.message);
        } finally {
            setUploading(false);
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, locale: 'en' | 'ar') => {
        const file = e.target.files?.[0];
        if (file) {
            handleUpload(file, locale);
        }
    };

    const handleSave = async () => {
        setIsSaving(true);
        const result = await updateHeroImages({
            heroImage_en: heroImageEn,
            heroImage_ar: heroImageAr,
        });
        if (result.success) {
            alert('Hero images updated successfully!');
        } else {
            alert(result.error);
        }
        setIsSaving(false);
    };

    if (isLoading) {
        return <div className={styles.container}>Loading settings...</div>;
    }

    return (
        <div className={styles.main}>
            <div className={styles.container}>
                <div className={styles.header}>
                    <div>
                        <h1 className={styles.title}>Site Settings</h1>
                        <p className={styles.subtitle}>Manage website content</p>
                    </div>
                    <button onClick={handleSave} disabled={isSaving} className={styles.saveBtn}>
                        <Save size={20} />
                        {isSaving ? 'Saving...' : 'Save Changes'}
                    </button>
                </div>

                <div className={styles.section}>
                    <h2 className={styles.sectionTitle}>
                        <ImageIcon size={24} />
                        Hero Section Images
                    </h2>
                    <p className={styles.sectionDescription}>
                        Upload different images for English and Arabic versions of the homepage hero section.
                    </p>

                    <div className={styles.imageGrid}>
                        <div className={styles.imageCard}>
                            <h3>English Hero Image</h3>
                            <div className={styles.preview}>
                                <img src={heroImageEn} alt="English Hero Preview" />
                            </div>
                            <input
                                type="file"
                                ref={fileInputEnRef}
                                onChange={(e) => handleFileChange(e, 'en')}
                                accept="image/*"
                                style={{ display: 'none' }}
                            />
                            <button
                                className={styles.uploadBtn}
                                onClick={() => fileInputEnRef.current?.click()}
                                disabled={uploadingEn}
                            >
                                {uploadingEn ? (
                                    <><Loader2 size={18} className={styles.spin} /> Uploading...</>
                                ) : (
                                    <><Upload size={18} /> Upload Image</>
                                )}
                            </button>
                        </div>

                        <div className={styles.imageCard}>
                            <h3>Arabic Hero Image</h3>
                            <div className={styles.preview}>
                                <img src={heroImageAr} alt="Arabic Hero Preview" />
                            </div>
                            <input
                                type="file"
                                ref={fileInputArRef}
                                onChange={(e) => handleFileChange(e, 'ar')}
                                accept="image/*"
                                style={{ display: 'none' }}
                            />
                            <button
                                className={styles.uploadBtn}
                                onClick={() => fileInputArRef.current?.click()}
                                disabled={uploadingAr}
                            >
                                {uploadingAr ? (
                                    <><Loader2 size={18} className={styles.spin} /> Uploading...</>
                                ) : (
                                    <><Upload size={18} /> Upload Image</>
                                )}
                            </button>
                        </div>
                    </div>

                    <p className={styles.hint}>
                        💡 Upload JPG, PNG, or WebP images. After uploading, click "Save Changes" to apply.
                    </p>
                </div>
            </div>
        </div>
    );
}
