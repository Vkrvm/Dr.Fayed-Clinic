import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL?.includes('localhost')
        ? 'https://haraka-physical-therapy-center.vercel.app'
        : (process.env.NEXT_PUBLIC_APP_URL || 'https://haraka-physical-therapy-center.vercel.app');

    const routes = [
        '',
        '/about',
        '/services',
        '/appointment',
        '/contact',
    ];

    const locales = ['en', 'ar'];

    const sitemapEntries: MetadataRoute.Sitemap = [];

    routes.forEach((route) => {
        locales.forEach((locale) => {
            sitemapEntries.push({
                url: `${baseUrl}/${locale}${route}`,
                lastModified: new Date(),
                changeFrequency: 'weekly',
                priority: route === '' ? 1 : 0.8,
            });
        });
    });

    return sitemapEntries;
}
