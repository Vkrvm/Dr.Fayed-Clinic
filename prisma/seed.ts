
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    const services = [
        {
            title_en: 'Chiropractic Adjustments',
            title_ar: 'تقويم العمود الفقري',
            description_en: 'Expert spinal adjustments to alleviate pain, improve mobility, and restore your body’s natural balance.',
            description_ar: 'تعديلات خبيرة للعمود الفقري لتخفيف الألم وتحسين الحركة واستعادة التوازن الطبيعي للجسم.',
            imageUrl: '/images/hero-1-v2.webp', // Using existing image as placeholder
            icon: 'Activity'
        },
        {
            title_en: 'Physiotherapy Sessions',
            title_ar: 'جلسات العلاج الطبيعي',
            description_en: 'Personalized rehabilitation programs designed to treat injuries, reduce pain, and enhance physical strength.',
            description_ar: 'برامج إعادة تأهيل مخصصة مصممة لعلاج الإصابات وتقليل الألم وتعزيز القوة البدنية.',
            imageUrl: '/images/hero-1-v2.webp',
            icon: 'Stethoscope'
        },
        {
            title_en: 'Posture Correction',
            title_ar: 'تصحيح القوام',
            description_en: 'Corrective techniques and exercises to align your spine and prevent long-term musculoskeletal issues.',
            description_ar: 'تقنيات وتمارين تصحيحية لمحاذاة العمود الفقري ومنع مشاكل العضلات والعظام على المدى الطويل.',
            imageUrl: '/images/hero-1-v2.webp',
            icon: 'UserCheck'
        },
        {
            title_en: 'Sports Injury Rehabilitation',
            title_ar: 'تأهيل إصابات الملاعب',
            description_en: 'Specialized care for athletes to recover faster and get back to peak performance safely.',
            description_ar: 'رعاية متخصصة للرياضيين للتعافي بشكل أسرع والعودة إلى قمة الأداء بأمان.',
            imageUrl: '/images/hero-1-v2.webp',
            icon: 'Dumbbell'
        },
        {
            title_en: 'Chronic Pain Management',
            title_ar: 'علاج الألم المزمن',
            description_en: 'Holistic approaches to manage and reduce chronic pain conditions for a better quality of life.',
            description_ar: 'نهج شامل لإدارة وتقليل حالات الألم المزمن لتحسين جودة الحياة.',
            imageUrl: '/images/hero-1-v2.webp',
            icon: 'HeartPulse'
        },
        {
            title_en: 'Massage Therapy',
            title_ar: 'العلاج بالتدليك',
            description_en: 'Therapeutic massage to relieve muscle tension, reduce stress, and promote overall relaxation.',
            description_ar: 'تدليك علاجي لتخفيف توتر العضلات وتقليل الإجهاد وتعزيز الاسترخاء العام.',
            imageUrl: '/images/hero-1-v2.webp',
            icon: 'Smile'
        }
    ];

    console.log('Seeding services...');

    for (const service of services) {
        await prisma.medicalService.create({
            data: service
        });
    }

    console.log('Seeding completed.');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
