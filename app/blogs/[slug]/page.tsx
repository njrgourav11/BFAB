import { cache } from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, ArrowRight, ChevronRight, Clock, CalendarDays } from 'lucide-react';
import { getAllBlogs, getBlogBySlug } from '@/lib/blog-utils';
import { autoExcerpt, formatDate, prepareBlogHtml, readingTime } from '@/lib/blog-content';
import BlogContent from '@/components/blog/BlogContent';
import BlogCover from '@/components/blog/BlogCover';
import BlogCard, { CategoryTag } from '@/components/blog/BlogCard';
import ReadingProgress from '@/components/blog/ReadingProgress';
import ShareButtons from '@/components/blog/ShareButtons';
import TableOfContents from '@/components/blog/TableOfContents';

// metadata + page share one Firestore read per request
const getPost = cache(getBlogBySlug);

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;
    const blog = await getPost(slug);
    if (!blog) return { title: 'Article not found' };

    const title = blog.seoTitle || blog.title;
    const description = blog.seoDescription || blog.excerpt || autoExcerpt(blog.content);
    const isUrlImage = blog.coverImage?.startsWith('http');

    return {
        title,
        description,
        keywords: blog.seoKeywords,
        alternates: { canonical: `/blogs/${blog.slug}` },
        openGraph: {
            title,
            description,
            type: 'article',
            publishedTime: blog.createdAt,
            modifiedTime: blog.updatedAt,
            authors: [blog.author],
            images: isUrlImage ? [blog.coverImage] : undefined,
        },
        twitter: { card: isUrlImage ? 'summary_large_image' : 'summary', title, description },
    };
}

function AuthorAvatar({ name, size = 'md' }: { name: string; size?: 'md' | 'lg' }) {
    const initials = (name || 'B')
        .split(/\s+/)
        .map((p) => p[0])
        .join('')
        .slice(0, 2)
        .toUpperCase();
    return (
        <span
            aria-hidden
            className={`inline-flex flex-shrink-0 items-center justify-center rounded-full bg-[#F4623B] font-semibold text-white ${
                size === 'lg' ? 'h-14 w-14 text-lg' : 'h-10 w-10 text-sm'
            }`}
        >
            {initials}
        </span>
    );
}

export default async function BlogDetail({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const blog = await getPost(slug);
    if (!blog) notFound();

    const { html, headings } = prepareBlogHtml(blog.content);
    const minutes = readingTime(blog.content);
    const author = blog.author || 'BFAB Team';
    const wasUpdated =
        blog.updatedAt && new Date(blog.updatedAt).getTime() - new Date(blog.createdAt).getTime() > 1000 * 60 * 60 * 24;

    // Related: same category first, then newest. Never blocks the page.
    let related: Awaited<ReturnType<typeof getAllBlogs>> = [];
    let newer: (typeof related)[number] | undefined;
    let older: (typeof related)[number] | undefined;
    try {
        const all = (await getAllBlogs(true)).sort(
            (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        const index = all.findIndex((b) => b.id === blog.id);
        newer = index > 0 ? all[index - 1] : undefined;
        older = index >= 0 ? all[index + 1] : undefined;
        const others = all.filter((b) => b.id !== blog.id);
        related = [
            ...others.filter((b) => b.category === blog.category),
            ...others.filter((b) => b.category !== blog.category),
        ].slice(0, 3);
    } catch {
        related = [];
    }

    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline: blog.title,
        description: blog.seoDescription || blog.excerpt,
        datePublished: blog.createdAt,
        dateModified: blog.updatedAt || blog.createdAt,
        author: { '@type': 'Person', name: author },
        image: blog.coverImage?.startsWith('http') ? blog.coverImage : undefined,
        keywords: blog.seoKeywords?.join(', '),
    };

    return (
        <div className="bg-white dark:bg-stone-950 text-stone-900 dark:text-stone-100">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
            <ReadingProgress targetId="article-body" />

            <article>
                {/* ---------- Header ---------- */}
                <header className="bg-[#fef6eb] dark:bg-stone-900/60 border-b border-[#f3e6d3] dark:border-stone-800">
                    <div className="mx-auto max-w-3xl px-4 sm:px-6 pt-8 sm:pt-12 pb-10 sm:pb-14">
                        <nav aria-label="Breadcrumb">
                            <ol className="flex flex-wrap items-center gap-1.5 text-sm text-stone-500 dark:text-stone-400">
                                <li>
                                    <Link href="/" className="hover:text-stone-900 dark:hover:text-white">
                                        Home
                                    </Link>
                                </li>
                                <li aria-hidden>
                                    <ChevronRight size={14} />
                                </li>
                                <li>
                                    <Link href="/blogs" className="hover:text-stone-900 dark:hover:text-white">
                                        Blog
                                    </Link>
                                </li>
                                {blog.category && (
                                    <>
                                        <li aria-hidden>
                                            <ChevronRight size={14} />
                                        </li>
                                        <li>
                                            <Link
                                                href={`/blogs?category=${encodeURIComponent(blog.category)}`}
                                                className="hover:text-stone-900 dark:hover:text-white"
                                            >
                                                {blog.category}
                                            </Link>
                                        </li>
                                    </>
                                )}
                            </ol>
                        </nav>

                        <CategoryTag className="mt-8">{blog.category}</CategoryTag>

                        <h1 className="mt-4 font-display text-[2rem] sm:text-5xl lg:text-[3.25rem] font-semibold leading-[1.12] tracking-tight text-stone-900 dark:text-white text-balance">
                            {blog.title}
                        </h1>

                        {blog.excerpt && (
                            <p className="mt-5 text-lg sm:text-xl leading-relaxed text-stone-600 dark:text-stone-300">{blog.excerpt}</p>
                        )}

                        <div className="mt-8 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                            <div className="flex items-center gap-3">
                                <AuthorAvatar name={author} />
                                <div className="text-sm">
                                    <p className="font-semibold text-stone-900 dark:text-white">{author}</p>
                                    <p className="mt-0.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-stone-500 dark:text-stone-400">
                                        <span className="inline-flex items-center gap-1.5">
                                            <CalendarDays size={14} aria-hidden />
                                            <time dateTime={blog.createdAt}>{formatDate(blog.createdAt)}</time>
                                        </span>
                                        <span className="inline-flex items-center gap-1.5">
                                            <Clock size={14} aria-hidden /> {minutes} min read
                                        </span>
                                    </p>
                                </div>
                            </div>
                            <ShareButtons title={blog.title} path={`/blogs/${blog.slug}`} />
                        </div>
                    </div>
                </header>

                {/* ---------- Cover ---------- */}
                {blog.coverImage && (
                    <div className="mx-auto max-w-5xl px-4 sm:px-6 -mb-2 mt-8 sm:mt-12">
                        <BlogCover
                            src={blog.coverImage}
                            alt={blog.title}
                            priority
                            zoom={false}
                            sizes="(min-width: 1024px) 1024px, 100vw"
                            className="aspect-[16/9] rounded-2xl shadow-sm"
                        />
                    </div>
                )}

                {/* ---------- Body + sidebar ---------- */}
                <div className="mx-auto max-w-6xl px-4 sm:px-6 py-12 sm:py-16 lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(0,720px)_minmax(0,1fr)] lg:gap-10">
                    <div className="hidden lg:block" aria-hidden />

                    <div id="article-body" className="min-w-0">
                        {headings.length > 1 && (
                            <details className="group mb-10 rounded-xl border border-stone-200 dark:border-stone-800 lg:hidden">
                                <summary className="flex cursor-pointer list-none items-center justify-between px-5 py-4 text-sm font-semibold [&::-webkit-details-marker]:hidden">
                                    In this article
                                    <ChevronRight size={16} className="transition-transform group-open:rotate-90" aria-hidden />
                                </summary>
                                <ul className="space-y-2 border-t border-stone-200 dark:border-stone-800 px-5 py-4 text-sm">
                                    {headings.map((h) => (
                                        <li key={h.id} className={h.level === 3 ? 'pl-4' : ''}>
                                            <a href={`#${h.id}`} className="text-stone-600 hover:text-[#c2410c] dark:text-stone-300">
                                                {h.text}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </details>
                        )}

                        <BlogContent html={html} />

                        {wasUpdated && (
                            <p className="mt-10 text-sm italic text-stone-500 dark:text-stone-400">
                                Last updated on {formatDate(blog.updatedAt)}
                            </p>
                        )}

                        {/* Tags */}
                        {blog.seoKeywords && blog.seoKeywords.length > 0 && (
                            <div className="mt-12 flex flex-wrap items-center gap-2">
                                <span className="mr-1 text-sm font-semibold text-stone-700 dark:text-stone-300">Topics:</span>
                                {blog.seoKeywords.map((keyword) => (
                                    <span
                                        key={keyword}
                                        className="rounded-full border border-stone-200 dark:border-stone-700 px-3 py-1 text-sm text-stone-600 dark:text-stone-300"
                                    >
                                        {keyword}
                                    </span>
                                ))}
                            </div>
                        )}

                        {/* Share + author */}
                        <div className="mt-10 flex flex-col gap-4 border-y border-stone-200 dark:border-stone-800 py-6 sm:flex-row sm:items-center sm:justify-between">
                            <p className="font-semibold text-stone-900 dark:text-white">Found this useful? Share it.</p>
                            <ShareButtons title={blog.title} path={`/blogs/${blog.slug}`} />
                        </div>

                        <div className="mt-10 flex items-start gap-4 rounded-2xl bg-[#fef6eb] dark:bg-stone-900 p-6">
                            <AuthorAvatar name={author} size="lg" />
                            <div>
                                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-stone-500 dark:text-stone-400">Written by</p>
                                <p className="mt-1 font-display text-xl font-semibold text-stone-900 dark:text-white">{author}</p>
                                <p className="mt-1 text-sm leading-relaxed text-stone-600 dark:text-stone-400">
                                    Practical, honest advice from the Beggin for a Bite team to help you feed and care for your pet better.
                                </p>
                            </div>
                        </div>

                        {/* Previous / next */}
                        {(newer || older) && (
                            <nav aria-label="More articles" className="mt-10 grid gap-4 sm:grid-cols-2">
                                {older ? (
                                    <Link
                                        href={`/blogs/${older.slug}`}
                                        className="group rounded-xl border border-stone-200 dark:border-stone-800 p-5 transition-colors hover:border-[#F4623B]"
                                    >
                                        <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-stone-500">
                                            <ArrowLeft size={14} aria-hidden /> Previous
                                        </span>
                                        <span className="mt-2 block font-display font-semibold leading-snug line-clamp-2 group-hover:text-[#c2410c] dark:group-hover:text-[#fb8a5f]">
                                            {older.title}
                                        </span>
                                    </Link>
                                ) : (
                                    <span className="hidden sm:block" />
                                )}
                                {newer && (
                                    <Link
                                        href={`/blogs/${newer.slug}`}
                                        className="group rounded-xl border border-stone-200 dark:border-stone-800 p-5 text-right transition-colors hover:border-[#F4623B]"
                                    >
                                        <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-stone-500">
                                            Next <ArrowRight size={14} aria-hidden />
                                        </span>
                                        <span className="mt-2 block font-display font-semibold leading-snug line-clamp-2 group-hover:text-[#c2410c] dark:group-hover:text-[#fb8a5f]">
                                            {newer.title}
                                        </span>
                                    </Link>
                                )}
                            </nav>
                        )}
                    </div>

                    {/* Sticky table of contents (desktop) */}
                    <aside className="hidden lg:block">
                        <div className="sticky top-28">
                            <TableOfContents headings={headings} />
                        </div>
                    </aside>
                </div>
            </article>

            {/* ---------- Related ---------- */}
            {related.length > 0 && (
                <section aria-labelledby="related-heading" className="bg-[#fef6eb] dark:bg-stone-900/60 border-t border-[#f3e6d3] dark:border-stone-800">
                    <div className="mx-auto max-w-6xl px-4 sm:px-6 py-16 sm:py-20">
                        <div className="mb-10 flex items-end justify-between gap-4">
                            <h2 id="related-heading" className="font-display text-2xl sm:text-3xl font-semibold tracking-tight">
                                Keep reading
                            </h2>
                            <Link
                                href="/blogs"
                                className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#c2410c] dark:text-[#fb8a5f] hover:underline underline-offset-4"
                            >
                                All articles <ArrowRight size={16} aria-hidden />
                            </Link>
                        </div>
                        <div className="grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
                            {related.map((post) => (
                                <BlogCard key={post.id} post={post} />
                            ))}
                        </div>
                    </div>
                </section>
            )}
        </div>
    );
}
