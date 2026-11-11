"use client";

import { useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Search, X, Clock } from 'lucide-react';
import { Newsreader } from 'next/font/google';
import { getAllBlogs } from '@/lib/blog-utils';
import { BlogPost } from '@/lib/types';
import { Skeleton } from '@/components/ui/skeleton';

// Serif for headlines (editorial feel), your site's sans for everything else.
const serif = Newsreader({ subsets: ['latin'], display: 'swap' });

const PAGE_SIZE = 9;

/* ---------- helpers ---------- */

const formatDate = (value: string | number | Date) =>
    new Date(value).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

// Uses `content` if your BlogPost has it; otherwise falls back to the excerpt.
const readingTime = (blog: BlogPost) => {
    const text = (blog as BlogPost & { content?: string }).content ?? blog.excerpt ?? '';
    const words = text.replace(/<[^>]+>/g, ' ').trim().split(/\s+/).filter(Boolean).length;
    return Math.max(1, Math.round(words / 220));
};

/* ---------- small pieces ---------- */

function Meta({ blog, className = '' }: { blog: BlogPost; className?: string }) {
    return (
        <p className={`flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-stone-500 dark:text-stone-400 ${className}`}>
            <span className="font-medium text-stone-700 dark:text-stone-300">{blog.author}</span>
            <time dateTime={new Date(blog.createdAt).toISOString()}>{formatDate(blog.createdAt)}</time>
            <span className="inline-flex items-center gap-1">
                <Clock size={13} aria-hidden /> {readingTime(blog)} min read
            </span>
        </p>
    );
}

function Cover({ blog, sizes, className = '' }: { blog: BlogPost; sizes: string; className?: string }) {
    return (
        <div className={`relative overflow-hidden rounded-md bg-stone-200 dark:bg-stone-800 ${className}`}>
            <Image
                src={blog.coverImage || '/placeholder.svg'}
                alt=""
                fill
                sizes={sizes}
                className="object-cover transition-transform duration-500 group-hover:scale-[1.03] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
            />
        </div>
    );
}

function Category({ children }: { children: React.ReactNode }) {
    if (!children) return null;
    return <span className="text-sm font-semibold text-emerald-700 dark:text-emerald-400">{children}</span>;
}

/* ---------- loading skeleton (mirrors the real layout) ---------- */

function PageSkeleton() {
    return (
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
            <Skeleton className="h-12 w-72 mb-3" />
            <Skeleton className="h-5 w-96 max-w-full mb-12" />
            <div className="grid lg:grid-cols-3 gap-10 mb-16">
                <div className="lg:col-span-2 space-y-4">
                    <Skeleton className="aspect-[16/9] w-full" />
                    <Skeleton className="h-9 w-3/4" />
                    <Skeleton className="h-5 w-full" />
                </div>
                <div className="space-y-6">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="flex gap-4">
                            <Skeleton className="h-24 w-28 flex-shrink-0" />
                            <div className="flex-1 space-y-2">
                                <Skeleton className="h-4 w-20" />
                                <Skeleton className="h-5 w-full" />
                                <Skeleton className="h-4 w-2/3" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
                {[1, 2, 3].map((i) => (
                    <div key={i} className="space-y-3">
                        <Skeleton className="aspect-[3/2] w-full" />
                        <Skeleton className="h-4 w-20" />
                        <Skeleton className="h-6 w-full" />
                        <Skeleton className="h-4 w-2/3" />
                    </div>
                ))}
            </div>
        </div>
    );
}

/* ---------- page ---------- */

export default function BlogsPage() {
    const [blogs, setBlogs] = useState<BlogPost[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

    useEffect(() => {
        (async () => {
            try {
                const data = await getAllBlogs(true); // published only
                setBlogs(data);
            } catch {
                setError(true);
            } finally {
                setLoading(false);
            }
        })();
    }, []);

    // Reset pagination whenever the filters change
    useEffect(() => {
        setVisibleCount(PAGE_SIZE);
    }, [searchTerm, selectedCategory]);

    const sorted = useMemo(
        () => [...blogs].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()),
        [blogs]
    );

    const categories = useMemo(
        () => ['All', ...Array.from(new Set(blogs.map((b) => b.category).filter(Boolean))).sort()],
        [blogs]
    );

    const query = searchTerm.trim().toLowerCase();
    const isFiltering = query !== '' || selectedCategory !== 'All';

    const filtered = useMemo(
        () =>
            sorted.filter((b) => {
                const matchesSearch =
                    !query || b.title.toLowerCase().includes(query) || (b.excerpt ?? '').toLowerCase().includes(query);
                const matchesCategory = selectedCategory === 'All' || b.category === selectedCategory;
                return matchesSearch && matchesCategory;
            }),
        [sorted, query, selectedCategory]
    );

    // Lead story + side stories (only on the unfiltered view)
    const lead = sorted.find((b) => b.featured) ?? sorted[0];
    const side = useMemo(() => {
        if (!lead) return [];
        const rest = sorted.filter((b) => b.id !== lead.id);
        return [...rest.filter((b) => b.featured), ...rest.filter((b) => !b.featured)].slice(0, 3);
    }, [sorted, lead]);

    const gridSource = isFiltering
        ? filtered
        : sorted.filter((b) => b.id !== lead?.id && !side.some((s) => s.id === b.id));
    const visible = gridSource.slice(0, visibleCount);

    const clearFilters = () => {
        setSearchTerm('');
        setSelectedCategory('All');
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-[#F7F8F5] dark:bg-[#0E1412]">
                <PageSkeleton />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#F7F8F5] dark:bg-[#0E1412] text-stone-900 dark:text-stone-100">
            {/* ---------- Masthead ---------- */}
            <header className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-14 pb-10">
                <h1 className={`${serif.className} text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight`}>
                    The pet care journal
                </h1>
                <p className="mt-4 max-w-xl text-lg leading-relaxed text-stone-600 dark:text-stone-400">
                    Vet-reviewed advice on nutrition, health and everyday life with your pet.
                </p>
            </header>

            {/* ---------- Sticky filter bar ---------- */}
            <div className="sticky top-0 z-30 border-y border-stone-200 dark:border-stone-800 bg-[#F7F8F5]/90 dark:bg-[#0E1412]/90 backdrop-blur">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row md:items-center gap-3 md:gap-8">
                    <nav aria-label="Categories" className="flex-1 min-w-0">
                        <ul className="flex gap-6 overflow-x-auto no-scrollbar">
                            {categories.map((category) => {
                                const active = selectedCategory === category;
                                return (
                                    <li key={category} className="flex-shrink-0">
                                        <button
                                            onClick={() => setSelectedCategory(category)}
                                            aria-pressed={active}
                                            className={`relative py-4 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:text-emerald-700 ${
                                                active
                                                    ? 'text-stone-900 dark:text-white'
                                                    : 'text-stone-500 hover:text-stone-900 dark:text-stone-400 dark:hover:text-white'
                                            }`}
                                        >
                                            {category}
                                            {active && (
                                                <span className="absolute inset-x-0 -bottom-px h-0.5 bg-emerald-700 dark:bg-emerald-400" />
                                            )}
                                        </button>
                                    </li>
                                );
                            })}
                        </ul>
                    </nav>

                    <div className="relative w-full md:w-72 pb-3 md:pb-0">
                        <Search
                            className="pointer-events-none absolute left-3 top-[calc(50%-6px)] md:top-1/2 -translate-y-1/2 text-stone-400"
                            size={16}
                            aria-hidden
                        />
                        <input
                            type="search"
                            aria-label="Search articles"
                            placeholder="Search articles"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full rounded-md border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 py-2 pl-9 pr-9 text-sm placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-emerald-600"
                        />
                        {searchTerm && (
                            <button
                                onClick={() => setSearchTerm('')}
                                aria-label="Clear search"
                                className="absolute right-2 top-[calc(50%-6px)] md:top-1/2 -translate-y-1/2 p-1 text-stone-400 hover:text-stone-700 dark:hover:text-stone-200"
                            >
                                <X size={14} />
                            </button>
                        )}
                    </div>
                </div>
            </div>

            <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
                {error && (
                    <div role="alert" className="rounded-md border border-red-200 dark:border-red-900 bg-red-50 dark:bg-red-950/40 p-6 text-center">
                        <p className="font-semibold">We couldn’t load the articles.</p>
                        <button
                            onClick={() => window.location.reload()}
                            className="mt-3 text-sm font-semibold text-emerald-700 dark:text-emerald-400 underline underline-offset-4"
                        >
                            Reload the page
                        </button>
                    </div>
                )}

                {/* ---------- Lead story + side stories ---------- */}
                {!error && !isFiltering && lead && (
                    <section aria-label="Top stories" className="grid lg:grid-cols-3 gap-10 lg:gap-12 pb-14 mb-14 border-b border-stone-200 dark:border-stone-800">
                        <Link href={`/blogs/${lead.slug}`} className="group lg:col-span-2 block">
                            <Cover blog={lead} sizes="(min-width: 1024px) 66vw, 100vw" className="aspect-[16/9] mb-6" />
                            <Category>{lead.category}</Category>
                            <h2 className={`${serif.className} mt-2 text-3xl sm:text-4xl font-semibold leading-tight tracking-tight group-hover:underline decoration-2 underline-offset-4 decoration-emerald-700/60`}>
                                {lead.title}
                            </h2>
                            <p className="mt-3 max-w-2xl text-lg leading-relaxed text-stone-600 dark:text-stone-400 line-clamp-3">
                                {lead.excerpt}
                            </p>
                            <Meta blog={lead} className="mt-4" />
                        </Link>

                        {side.length > 0 && (
                            <div>
                                <h2 className="text-sm font-semibold text-stone-500 dark:text-stone-400 pb-3 mb-6 border-b border-stone-200 dark:border-stone-800">
                                    More to read
                                </h2>
                                <ul className="space-y-7">
                                    {side.map((blog) => (
                                        <li key={blog.id}>
                                            <Link href={`/blogs/${blog.slug}`} className="group flex gap-4">
                                                <Cover blog={blog} sizes="120px" className="h-24 w-28 flex-shrink-0" />
                                                <div className="min-w-0">
                                                    <Category>{blog.category}</Category>
                                                    <h3 className={`${serif.className} mt-0.5 text-lg font-semibold leading-snug line-clamp-3 group-hover:underline underline-offset-4`}>
                                                        {blog.title}
                                                    </h3>
                                                    <p className="mt-1 text-xs text-stone-500 dark:text-stone-400">
                                                        {formatDate(blog.createdAt)} · {readingTime(blog)} min read
                                                    </p>
                                                </div>
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </section>
                )}

                {/* ---------- Article grid ---------- */}
                {!error && (
                    <section aria-label="Articles">
                        <div className="flex items-baseline justify-between mb-8">
                            <h2 className={`${serif.className} text-2xl sm:text-3xl font-semibold`}>
                                {query
                                    ? `Results for “${searchTerm.trim()}”`
                                    : selectedCategory === 'All'
                                    ? 'Latest articles'
                                    : selectedCategory}
                            </h2>
                            {isFiltering && (
                                <p className="text-sm text-stone-500 dark:text-stone-400" aria-live="polite">
                                    {filtered.length} {filtered.length === 1 ? 'article' : 'articles'}
                                </p>
                            )}
                        </div>

                        {gridSource.length === 0 ? (
                            <div className="py-20 text-center">
                                <p className={`${serif.className} text-2xl font-semibold`}>
                                    {isFiltering ? 'No articles match your search' : 'No articles yet'}
                                </p>
                                {isFiltering && (
                                    <>
                                        <p className="mt-2 text-stone-500 dark:text-stone-400">
                                            Try a different keyword or pick another category.
                                        </p>
                                        <button
                                            onClick={clearFilters}
                                            className="mt-5 rounded-md bg-stone-900 dark:bg-white px-4 py-2 text-sm font-semibold text-white dark:text-stone-900 hover:opacity-90"
                                        >
                                            Clear filters
                                        </button>
                                    </>
                                )}
                            </div>
                        ) : (
                            <>
                                <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-14">
                                    {visible.map((blog) => (
                                        <li key={blog.id}>
                                            <Link href={`/blogs/${blog.slug}`} className="group flex h-full flex-col">
                                                <Cover blog={blog} sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" className="aspect-[3/2] mb-5" />
                                                <Category>{blog.category}</Category>
                                                <h3 className={`${serif.className} mt-1.5 text-xl sm:text-[22px] font-semibold leading-snug line-clamp-2 group-hover:underline decoration-2 underline-offset-4 decoration-emerald-700/60`}>
                                                    {blog.title}
                                                </h3>
                                                <p className="mt-2 text-[15px] leading-relaxed text-stone-600 dark:text-stone-400 line-clamp-3 flex-grow">
                                                    {blog.excerpt}
                                                </p>
                                                <Meta blog={blog} className="mt-4" />
                                            </Link>
                                        </li>
                                    ))}
                                </ul>

                                {visibleCount < gridSource.length && (
                                    <div className="mt-16 flex flex-col items-center gap-2">
                                        <button
                                            onClick={() => setVisibleCount((c) => c + PAGE_SIZE)}
                                            className="rounded-md border border-stone-900 dark:border-stone-200 px-6 py-2.5 text-sm font-semibold hover:bg-stone-900 hover:text-white dark:hover:bg-white dark:hover:text-stone-900 transition-colors"
                                        >
                                            Show more articles
                                        </button>
                                        <p className="text-xs text-stone-500 dark:text-stone-400">
                                            Showing {visible.length} of {gridSource.length}
                                        </p>
                                    </div>
                                )}
                            </>
                        )}
                    </section>
                )}
            </main>
        </div>
    );
}