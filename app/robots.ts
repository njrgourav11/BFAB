import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
    return {
        rules: {
            userAgent: '*',
            allow: '/',
            disallow: ['/admin/', '/profile/', '/cart/', '/checkout/', '/confirmation/', '/order-confirmation/'],
        },
        sitemap: 'https://www.begginforabite.in/sitemap.xml',
    };
}
