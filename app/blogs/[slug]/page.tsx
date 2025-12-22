import { getBlogBySlug } from '@/lib/blog-utils';
import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Calendar, User, Tag } from 'lucide-react';
import { notFound } from 'next/navigation';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;
    const blog = await getBlogBySlug(slug);

    if (!blog) return { title: 'Blog Not Found' };

    return {
        title: blog.seoTitle || blog.title,
        description: blog.seoDescription || blog.excerpt,
        keywords: blog.seoKeywords,
    };
}

export default async function BlogDetail({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const blog = await getBlogBySlug(slug);

    if (!blog) {
        notFound();
    }

    return (
        <div className="min-h-screen pt-24 pb-20 bg-white dark:bg-slate-950">
            <div className="container mx-auto px-4 max-w-4xl">
                <Link href="/blogs" className="inline-flex items-center gap-2 text-slate-500 hover:text-blue-600 transition-colors mb-8">
                    <ArrowLeft size={20} />
                    Back to Blog
                </Link>

                {/* Header */}
                <div className="mb-10 text-center">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 text-sm font-bold mb-6">
                        <Tag size={14} />
                        {blog.category}
                    </div>
                    <h1 className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white mb-6 leading-tight">
                        {blog.title}
                    </h1>
                    <div className="flex items-center justify-center gap-6 text-slate-500 dark:text-slate-400 text-sm">
                        <span className="flex items-center gap-2">
                            <Calendar size={16} />
                            {new Date(blog.createdAt).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}
                        </span>
                        <span className="flex items-center gap-2">
                            <User size={16} />
                            {blog.author}
                        </span>
                    </div>
                </div>

                {/* Featured Image */}
                {blog.coverImage && (
                    <div className="relative aspect-video rounded-3xl overflow-hidden shadow-2xl mb-12">
                        <Image src={blog.coverImage} alt={blog.title} fill className="object-cover" priority />
                    </div>
                )}

                {/* Content */}
                <article className="prose prose-lg dark:prose-invert max-w-none prose-img:rounded-2xl prose-headings:font-bold prose-a:text-blue-600 hover:prose-a:text-blue-500">
                    <div dangerouslySetInnerHTML={{ __html: blog.content }} />
                </article>

                {/* Tags */}
                {blog.seoKeywords && blog.seoKeywords.length > 0 && (
                    <div className="mt-16 pt-8 border-t border-slate-200 dark:border-slate-800">
                        <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500 mb-4">Tags</h3>
                        <div className="flex flex-wrap gap-2">
                            {blog.seoKeywords.map((keyword, i) => (
                                <span key={i} className="px-3 py-1 bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-400 rounded-full text-sm">
                                    #{keyword}
                                </span>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
