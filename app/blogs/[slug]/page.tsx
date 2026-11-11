import { getAllBlogs, getBlogBySlug } from '@/lib/blog-utils';
import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronRight, Clock } from 'lucide-react';
import { notFound } from 'next/navigation';
import { Newsreader } from 'next/font/google';

import 'react-quill-new/dist/quill.snow.css';

const serif = Newsreader({ subsets: ['latin'], display: 'swap' });

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;
    const blog = await getBlogBySlug(slug);

    if (!blog) return { title: 'Blog Not Found' };

    return {
        title: blog.seoTitle || blog.title,
        description: blog.seoDescription || blog.excerpt,
        keywords: blog.seoKeywords,
        openGraph: {
            title: blog.seoTitle || blog.title,
            description: blog.seoDescription || blog.excerpt,
            images: blog.coverImage ? [blog.coverImage] : undefined,
            type: 'article',
        },
    };
}

const formatDate = (value: string | number | Date) =>
    new Date(value).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

const readingTime = (html: string) => {
    const words = (html || '').replace(/<[^>]+>/g, ' ').trim().split(/\s+/).filter(Boolean).length;
    return Math.max(1, Math.round(words / 220));
};

export default async function BlogDetail({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const blog = await getBlogBySlug(slug);

    if (!blog) {
        notFound();
    }

    // Related articles: same category first, then latest. Never blocks the page if it fails.
    let related: Awaited<ReturnType<typeof getAllBlogs>> = [];
    try {
        const all = await getAllBlogs(true);
        const others = all
            .filter((b) => b.id !== blog.id)
            .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        related = [
            ...others.filter((b) => b.category === blog.category),
            ...others.filter((b) => b.category !== blog.category),
        ].slice(0, 3);
    } catch {
        related = [];
    }

    return (
        <div className="min-h-screen pt-24 pb-24 bg-[#F7F8F5] dark:bg-[#0E1412] text-stone-900 dark:text-stone-100">
            <article>
                {/* ---------- Header ---------- */}
                <header className="mx-auto max-w-3xl px-4 sm:px-6">
                    <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-sm text-stone-500 dark:text-stone-400 mb-8">
                        <Link href="/blogs" className="hover:text-emerald-700 dark:hover:text-emerald-400 underline-offset-4 hover:underline">
                            Blog
                        </Link>
                        {blog.category && (
                            <>
                                <ChevronRight size={14} aria-hidden />
                                <span>{blog.category}</span>
                            </>
                        )}
                    </nav>

                    <h1 className={`${serif.className} text-4xl sm:text-5xl lg:text-[56px] font-semibold leading-[1.1] tracking-tight`}>
                        {blog.title}
                    </h1>

                    {blog.excerpt && (
                        <p className="mt-6 text-xl leading-relaxed text-stone-600 dark:text-stone-400">{blog.excerpt}</p>
                    )}

                    <div className="mt-8 flex flex-wrap items-center gap-x-4 gap-y-2 border-y border-stone-200 dark:border-stone-800 py-4 text-sm text-stone-500 dark:text-stone-400">
                        <span className="font-semibold text-stone-800 dark:text-stone-200">{blog.author}</span>
                        <time dateTime={new Date(blog.createdAt).toISOString()}>{formatDate(blog.createdAt)}</time>
                        <span className="inline-flex items-center gap-1.5">
                            <Clock size={14} aria-hidden /> {readingTime(blog.content)} min read
                        </span>
                    </div>
                </header>

                {/* ---------- Cover (wider than the text column) ---------- */}
                {blog.coverImage && (
                    <div className="mx-auto max-w-5xl px-4 sm:px-6 mt-10">
                        <div className="relative aspect-[16/9] overflow-hidden rounded-md bg-stone-200 dark:bg-stone-800">
                            <Image
                                src={blog.coverImage}
                                alt={blog.title}
                                fill
                                priority
                                sizes="(min-width: 1024px) 960px, 100vw"
                                className="object-cover"
                            />
                        </div>
                    </div>
                )}

                {/* ---------- Body ---------- */}
                <div className="mx-auto max-w-3xl px-4 sm:px-6 mt-12">
                    <div className="ql-snow">
                        <div
                            className={`ql-editor ${serif.className} prose prose-lg dark:prose-invert max-w-none
                                !h-auto !overflow-visible !p-0 !whitespace-normal
                                text-stone-800 dark:text-stone-200
                                prose-p:leading-[1.8] prose-p:text-[19px]
                                prose-headings:font-semibold prose-headings:tracking-tight prose-headings:text-stone-900 dark:prose-headings:text-white
                                prose-h2:mt-12 prose-h2:mb-4 prose-h3:mt-8
                                prose-a:text-emerald-700 dark:prose-a:text-emerald-400 prose-a:underline-offset-4
                                prose-blockquote:border-l-emerald-700 prose-blockquote:font-medium prose-blockquote:not-italic
                                prose-img:rounded-md
                                [&_p]:min-h-[1em]`}
                            dangerouslySetInnerHTML={{ __html: blog.content }}
                        />
                    </div>

                    {/* ---------- Tags ---------- */}
                    {blog.seoKeywords && blog.seoKeywords.length > 0 && (
                        <div className="mt-14 pt-6 border-t border-stone-200 dark:border-stone-800">
                            <p className="text-sm font-semibold text-stone-500 dark:text-stone-400 mb-3">Topics</p>
                            <ul className="flex flex-wrap gap-2">
                                {blog.seoKeywords.map((keyword, i) => (
                                    <li
                                        key={i}
                                        className="rounded-md border border-stone-300 dark:border-stone-700 px-3 py-1 text-sm text-stone-700 dark:text-stone-300"
                                    >
                                        {keyword}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {/* ---------- Author ---------- */}
                    <div className="mt-10 rounded-md bg-stone-100 dark:bg-stone-900 p-6">
                        <p className="text-sm text-stone-500 dark:text-stone-400">Written by</p>
                        <p className={`${serif.className} text-xl font-semibold mt-0.5`}>{blog.author}</p>
                    </div>
                </div>
            </article>

            {/* ---------- Related articles ---------- */}
            {related.length > 0 && (
                <section aria-label="Related articles" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-24 pt-12 border-t border-stone-200 dark:border-stone-800">
                    <div className="flex items-baseline justify-between mb-8">
                        <h2 className={`${serif.className} text-2xl sm:text-3xl font-semibold`}>Keep reading</h2>
                        <Link href="/blogs" className="text-sm font-semibold text-emerald-700 dark:text-emerald-400 underline-offset-4 hover:underline">
                            All articles
                        </Link>
                    </div>
                    <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
                        {related.map((post) => (
                            <li key={post.id}>
                                <Link href={`/blogs/${post.slug}`} className="group block">
                                    <div className="relative aspect-[3/2] overflow-hidden rounded-md bg-stone-200 dark:bg-stone-800 mb-4">
                                        <Image
                                            src={post.coverImage || '/placeholder.svg'}
                                            alt=""
                                            fill
                                            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                                            className="object-cover transition-transform duration-500 group-hover:scale-[1.03] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
                                        />
                                    </div>
                                    {post.category && (
                                        <span className="text-sm font-semibold text-emerald-700 dark:text-emerald-400">{post.category}</span>
                                    )}
                                    <h3 className={`${serif.className} mt-1 text-xl font-semibold leading-snug line-clamp-2 group-hover:underline decoration-2 underline-offset-4 decoration-emerald-700/60`}>
                                        {post.title}
                                    </h3>
                                    <p className="mt-2 text-sm text-stone-500 dark:text-stone-400">
                                        {formatDate(post.createdAt)}
                                    </p>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </section>
            )}
        </div>
    );
}