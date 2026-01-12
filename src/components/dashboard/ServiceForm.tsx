'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Save } from 'lucide-react';
import styles from './ServiceForm.module.scss';
import { STORAGE_KEY, Service } from '@/hooks/useServices';
import { servicesData as initialServices } from '@/lib/mock-data';

interface ServiceFormProps {
    initialData?: {
        id?: string;
        title_en: string;
        title_ar: string;
        description_en: string;
        description_ar: string;
        imageUrl: string;
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
    const [loading, setLoading] = useState(false);
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string>(initialData?.imageUrl || '');
    const [formData, setFormData] = useState({
        title_en: initialData?.title_en || '',
        title_ar: initialData?.title_ar || '',
        description_en: initialData?.description_en || '',
        description_ar: initialData?.description_ar || '',
        icon: initialData?.icon || 'Activity',
    });

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setImageFile(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            // Get current services from localStorage
            const stored = localStorage.getItem(STORAGE_KEY);
            let services: Service[] = stored ? JSON.parse(stored) : initialServices;

            const newService: Service = {
                id: initialData?.id || `service-${Date.now()}`,
                title_en: formData.title_en,
                title_ar: formData.title_ar,
                description_en: formData.description_en,
                description_ar: formData.description_ar,
                imageUrl: imagePreview || '/images/hero-1-v2.webp',
                icon: formData.icon,
            };

            if (initialData?.id) {
                // Update existing service
                services = services.map(s => s.id === initialData.id ? newService : s);
                alert('Service updated successfully!');
            } else {
                // Add new service
                services.push(newService);
                alert('Service created successfully!');
            }

            // Save to localStorage
            localStorage.setItem(STORAGE_KEY, JSON.stringify(services));

            setLoading(false);
            router.push('/en/dashboard/services');
        } catch (error) {
            console.error('Error saving service:', error);
            alert('Error saving service. Please try again.');
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
                </div>

                <div className={styles.divider} />

                {/* Media & Settings Section */}
                <div className={styles.section}>
                    <h2 className={styles.sectionTitle}>Media & Settings</h2>

                    <div className={styles.row}>
                        <div className={styles.formGroup}>
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

                        <div className={styles.formGroup}>
                            <label htmlFor="image" className={styles.label}>
                                Service Image
                            </label>
                            <input
                                id="image"
                                type="file"
                                accept="image/*"
                                className={styles.input}
                                onChange={handleImageChange}
                            />
                            {imagePreview && (
                                <div className={styles.imagePreview}>
                                    <img src={imagePreview} alt="Preview" />
                                </div>
                            )}
                        </div>
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
