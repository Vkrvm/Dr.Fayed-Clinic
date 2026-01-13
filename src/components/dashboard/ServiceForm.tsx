'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Save } from 'lucide-react';
import { useServices } from '@/hooks/useServices';
import styles from './ServiceForm.module.scss';

interface ServiceFormProps {
    initialData?: {
        id?: string;
        title_en: string;
        title_ar: string;
        description_en: string;
        description_ar: string;
        imageUrl_en: string;
        imageUrl_ar: string;
        icon: string;
    };
}

const iconOptions = [
    'Activity',
    'Stethoscope',
    'UserCheck',
    'Dumbbell',
    'HeartPulse',
    'Smile',
];

export default function ServiceForm({ initialData }: ServiceFormProps) {
    const router = useRouter();
    const { addService, updateService } = useServices();
    const [loading, setLoading] = useState(false);

    const [imageFile_en, setImageFile_en] = useState<File | null>(null);
    const [imagePreview_en, setImagePreview_en] = useState<string>(initialData?.imageUrl_en || '');

    const [imageFile_ar, setImageFile_ar] = useState<File | null>(null);
    const [imagePreview_ar, setImagePreview_ar] = useState<string>(initialData?.imageUrl_ar || '');

    const [formData, setFormData] = useState({
        title_en: initialData?.title_en || '',
        title_ar: initialData?.title_ar || '',
        description_en: initialData?.description_en || '',
        description_ar: initialData?.description_ar || '',
        icon: initialData?.icon || 'Activity',
    });

    const compressImage = (base64Str: string, maxWidth = 800, maxHeight = 600): Promise<string> => {
        return new Promise((resolve) => {
            const img = new Image();
            img.src = base64Str;
            img.onload = () => {
                const canvas = document.createElement('canvas');
                let width = img.width;
                let height = img.height;

                if (width > height) {
                    if (width > maxWidth) {
                        height *= maxWidth / width;
                        width = maxWidth;
                    }
                } else {
                    if (height > maxHeight) {
                        width *= maxHeight / height;
                        height = maxHeight;
                    }
                }
                canvas.width = width;
                canvas.height = height;
                const ctx = canvas.getContext('2d');
                ctx?.drawImage(img, 0, 0, width, height);
                resolve(canvas.toDataURL('image/jpeg', 0.7)); // 0.7 quality
            };
        });
    };

    const handleImageChange_en = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setImageFile_en(file);
            const reader = new FileReader();
            reader.onloadend = async () => {
                const compressed = await compressImage(reader.result as string);
                setImagePreview_en(compressed);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleImageChange_ar = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setImageFile_ar(file);
            const reader = new FileReader();
            reader.onloadend = async () => {
                const compressed = await compressImage(reader.result as string);
                setImagePreview_ar(compressed);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const serviceData = {
                title_en: formData.title_en,
                title_ar: formData.title_ar,
                description_en: formData.description_en,
                description_ar: formData.description_ar,
                imageUrl_en: imagePreview_en || '/images/hero-1-v2.webp',
                imageUrl_ar: imagePreview_ar || '/images/hero-1-v2.webp',
                icon: formData.icon,
            };

            if (initialData?.id) {
                await updateService(initialData.id, serviceData);
                alert('Service updated successfully!');
            } else {
                await addService(serviceData);
                alert('Service created successfully!');
            }

            setLoading(false);
            router.push('/en/dashboard/services');
        } catch (error) {
            console.error('Error saving service:', error);
            alert('Error saving service. The image might be too large even for IndexedDB, or there was a system error.');
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.card}>
                {/* English Content Section */}
                <div className={styles.section}>
                    <h2 className={styles.sectionTitle}>
                        <span className={styles.flag}>🇬🇧</span>
                        English Content
                    </h2>

                    <div className={styles.formGroup}>
                        <label htmlFor="title_en" className={styles.label}>
                            Title (English) <span className={styles.required}>*</span>
                        </label>
                        <input
                            id="title_en"
                            type="text"
                            required
                            className={styles.input}
                            value={formData.title_en}
                            onChange={(e) => setFormData({ ...formData, title_en: e.target.value })}
                            placeholder="e.g., Chiropractic Adjustments"
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <label htmlFor="description_en" className={styles.label}>
                            Description (English) <span className={styles.required}>*</span>
                        </label>
                        <textarea
                            id="description_en"
                            required
                            className={styles.textarea}
                            rows={4}
                            value={formData.description_en}
                            onChange={(e) => setFormData({ ...formData, description_en: e.target.value })}
                            placeholder="Describe the service in English..."
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <label htmlFor="image_en" className={styles.label}>
                            Service Image (English)
                        </label>
                        <input
                            id="image_en"
                            type="file"
                            accept="image/*"
                            className={styles.input}
                            onChange={handleImageChange_en}
                        />
                        {imagePreview_en && (
                            <div className={styles.imagePreview}>
                                <img src={imagePreview_en} alt="Preview" />
                            </div>
                        )}
                    </div>
                </div>

                <div className={styles.divider} />

                {/* Arabic Content Section */}
                <div className={styles.section}>
                    <h2 className={styles.sectionTitle}>
                        <span className={styles.flag}>🇸🇦</span>
                        Arabic Content / المحتوى العربي
                    </h2>

                    <div className={styles.formGroup}>
                        <label htmlFor="title_ar" className={styles.label}>
                            Title (Arabic) / العنوان <span className={styles.required}>*</span>
                        </label>
                        <input
                            id="title_ar"
                            type="text"
                            required
                            dir="rtl"
                            className={styles.input}
                            value={formData.title_ar}
                            onChange={(e) => setFormData({ ...formData, title_ar: e.target.value })}
                            placeholder="مثال: تقويم العمود الفقري"
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <label htmlFor="description_ar" className={styles.label}>
                            Description (Arabic) / الوصف <span className={styles.required}>*</span>
                        </label>
                        <textarea
                            id="description_ar"
                            required
                            dir="rtl"
                            className={styles.textarea}
                            rows={4}
                            value={formData.description_ar}
                            onChange={(e) => setFormData({ ...formData, description_ar: e.target.value })}
                            placeholder="وصف الخدمة بالعربية..."
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <label htmlFor="image_ar" className={styles.label}>
                            Service Image (Arabic) / صورة الخدمة
                        </label>
                        <input
                            id="image_ar"
                            type="file"
                            accept="image/*"
                            className={styles.input}
                            onChange={handleImageChange_ar}
                        />
                        {imagePreview_ar && (
                            <div className={styles.imagePreview}>
                                <img src={imagePreview_ar} alt="Preview" />
                            </div>
                        )}
                    </div>
                </div>

                <div className={styles.divider} />

                {/* Media & Settings Section */}
                <div className={styles.section}>
                    <h2 className={styles.sectionTitle}>Global Settings</h2>

                    <div className={styles.formGroup} style={{ maxWidth: '300px' }}>
                        <label htmlFor="icon" className={styles.label}>
                            Icon
                        </label>
                        <select
                            id="icon"
                            className={styles.select}
                            value={formData.icon}
                            onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                        >
                            {iconOptions.map((icon) => (
                                <option key={icon} value={icon}>
                                    {icon}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>

            <div className={styles.actions}>
                <button
                    type="button"
                    onClick={() => router.back()}
                    className={styles.cancelBtn}
                    disabled={loading}
                >
                    Cancel
                </button>
                <button type="submit" className={styles.submitBtn} disabled={loading}>
                    <Save size={20} />
                    {loading ? 'Saving...' : 'Save Service'}
                </button>
            </div>
        </form>
    );
}
