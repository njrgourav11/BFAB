import { getAllProducts } from '@/lib/product-utils';
import { getAllBlogs } from '@/lib/blog-utils';
import { MetadataRoute } from 'next';

const BASE_URL = 'https://www.begginforabite.in';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const products = await getAllProducts();
    const blogs = await getAllBlogs(true);

    const productEntries: MetadataRoute.Sitemap = products.map((product) => ({
        url: `${BASE_URL}/products/${product.id}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.8,
    }));

    const blogEntries: MetadataRoute.Sitemap = blogs.map((blog) => ({
        url: `${BASE_URL}/blogs/${blog.slug}`,
        lastModified: new Date(blog.updatedAt),
        changeFrequency: 'monthly',
        priority: 0.7,
    }));

    return [
        {
            url: BASE_URL,
            lastModified: new Date(),
            changeFrequency: 'yearly',
            priority: 1,
        },
        {
            url: `${BASE_URL}/products`,
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 0.9,
        },
        {
            url: `${BASE_URL}/blogs`,
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 0.9,
        },
        {
            url: `${BASE_URL}/about-us`,
            lastModified: new Date(),
            changeFrequency: 'yearly',
            priority: 0.5,
        },
        {
            url: `${BASE_URL}/contact-us`,
            lastModified: new Date(),
            changeFrequency: 'yearly',
            priority: 0.5,
        },
        ...productEntries,
        ...blogEntries,
    ];
}
