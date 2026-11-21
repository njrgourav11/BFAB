'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Search, X } from 'lucide-react';
import { getAllBlogs } from '@/lib/blog-utils';
import { BlogPost } from '@/lib/types';
import { autoExcerpt } from '@/lib/blog-content';
import { Skeleton } from '@/components/ui/skeleton';
import BlogCard, { CategoryTag, PostMeta } from '@/components/blog/BlogCard';
import BlogCover from '@/components/blog/BlogCover';
import { cn } from '@/lib/utils';

const PAGE_SIZE = 9;
const byNewest = (a: BlogPost, b: BlogPost) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();

/* ---------- pieces ---------- */

function FeaturedPost({ post }: { post: BlogPost }) {
    const excerpt = post.excerpt || autoExcerpt(post.content || '', 220);
    return (
        <article className="group relative grid items-center gap-8 md:grid-cols-2 lg:gap-14">
            <BlogCover
                src={post.coverImage}
                priority
                sizes="(min-width: 768px) 50vw, 100vw"
                className="aspect-[4/3] rounded-2xl"
            />
            <div>
                <div className="flex items-center gap-3">
                    <span className="text-xs font-bold uppercase tracking-[0.14em] text-[#c2410c] dark:text-[#fb8a5f]">Featured</span>
                    <span className="h-px w-8 bg-stone-300 dark:bg-stone-700" aria-hidden />
                    <CategoryTag>{post.category}</CategoryTag>
                </div>
                <h2 className="mt-5 font-display text-3xl sm:text-4xl lg:text-[2.75rem] font-semibold leading-[1.15] tracking-tight text-stone-900 dark:text-white text-balance">
                    <Link
                        href={`/blogs/${post.slug}`}
                        className="focus-visible:outline-none after:absolute after:inset-0 after:rounded-2xl focus-visible:after:ring-2 focus-visible:after:ring-[#F4623B] focus-visible:after:ring-offset-4"
                    >
                        {post.title}
                    </Link>
                </h2>
                {excerpt && (
                    <p className="mt-4 text-lg leading-relaxed text-stone-600 dark:text-stone-400 line-clamp-4">{excerpt}</p>
                )}
                <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
                    <div className="text-sm">
                        <p className="font-semibold text-stone-900 dark:text-white">{post.author || 'BFAB Team'}</p>
                        <PostMeta post={post} className="mt-0.5" />
                    </div>
                    <span className="inline-flex items-center gap-2 text-sm font-semibold text-stone-900 dark:text-white">
                        Read article
                        <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" aria-hidden />
                    </span>
                </div>
            </div>
        </article>
    );
}

function PageSkeleton() {
    return (
        <div aria-busy="true" aria-label="Loading articles">
            <div className="bg-[#fef6eb] dark:bg-stone-900/60">
                <div className="mx-auto max-w-6xl px-4 sm:px-6 py-14 sm:py-20 space-y-4">
                    <Skeleton className="h-4 w-32" />
                    <Skeleton className="h-12 w-full max-w-xl" />
                    <Skeleton className="h-5 w-full max-w-md" />
                    <Skeleton className="h-12 w-full max-w-md rounded-full" />
                </div>
            </div>
            <div className="mx-auto max-w-6xl px-4 sm:px-6 py-14">
                <div className="grid gap-10 md:grid-cols-2">
                    <Skeleton className="aspect-[4/3] w-full rounded-2xl" />
                    <div className="space-y-4 self-center">
                        <Skeleton className="h-5 w-40" />
                        <Skeleton className="h-10 w-full" />
                        <Skeleton className="h-10 w-3/4" />
                        <Skeleton className="h-20 w-full" />
                    </div>
                </div>
                <div className="mt-20 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="space-y-3">
                            <Skeleton className="aspect-[16/10] w-full rounded-xl" />
                            <Skeleton className="h-5 w-20 rounded-full" />
                            <Skeleton className="h-6 w-full" />
                            <Skeleton className="h-4 w-2/3" />
                        </div>
                    ))}
                </div>
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
        // Deep link from the article breadcrumb: /blogs?category=Nutrition
        const fromUrl = new URLSearchParams(window.location.search).get('category');
        if (fromUrl) setSelectedCategory(fromUrl);

        (async () => {
            try {
                setBlogs((await getAllBlogs(true)).sort(byNewest));
            } catch {
                setError(true);
            } finally {
                setLoading(false);
            }
        })();
    }, []);

    const updateSearch = (value: string) => {
        setSearchTerm(value);
        setVisibleCount(PAGE_SIZE);
    };

    const selectCategory = (category: string) => {
        setSelectedCategory(category);
        setVisibleCount(PAGE_SIZE);
        const url = category === 'All' ? '/blogs' : `/blogs?category=${encodeURIComponent(category)}`;
        window.history.replaceState(null, '', url);
    };

    const categories = useMemo(() => {
        const counts = new Map<string, number>();
        blogs.forEach((b) => b.category && counts.set(b.category, (counts.get(b.category) ?? 0) + 1));
        return [
            { name: 'All', count: blogs.length },
            ...Array.from(counts, ([name, count]) => ({ name, count })).sort((a, b) => a.name.localeCompare(b.name)),
        ];
    }, [blogs]);

    const query = searchTerm.trim().toLowerCase();
    const isFiltering = query !== '' || selectedCategory !== 'All';

    const filtered = useMemo(
        () =>
            blogs.filter((b) => {
                const matchesCategory = selectedCategory === 'All' || b.category === selectedCategory;
                const haystack = `${b.title} ${b.excerpt ?? ''} ${b.category ?? ''} ${(b.seoKeywords ?? []).join(' ')}`.toLowerCase();
                return matchesCategory && (!query || haystack.includes(query));
            }),
        [blogs, query, selectedCategory]
    );

    const featured = blogs.find((b) => b.featured) ?? blogs[0];
    const gridSource = isFiltering ? filtered : blogs.filter((b) => b.id !== featured?.id);
    const visible = gridSource.slice(0, visibleCount);

    const clearFilters = () => {
        updateSearch('');
        selectCategory('All');
    };

    if (loading) return <PageSkeleton />;

    return (
        <div className="bg-white dark:bg-stone-950 text-stone-900 dark:text-stone-100">
            {/* ---------- Hero ---------- */}
            <header className="bg-[#fef6eb] dark:bg-stone-900/60">
                <div className="mx-auto max-w-6xl px-4 sm:px-6 py-14 sm:py-20">
                    <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#c2410c] dark:text-[#fb8a5f]">The BFAB Journal</p>
                    <h1 className="mt-4 max-w-3xl font-display text-4xl sm:text-5xl lg:text-6xl font-semibold leading-[1.08] tracking-tight text-stone-900 dark:text-white text-balance">
                        Better food, happier pets.
                    </h1>
                    <p className="mt-5 max-w-xl text-lg leading-relaxed text-stone-600 dark:text-stone-300">
                        Honest guides on nutrition, ingredients, portions and everyday care, written to help you make
                        informed choices for your dog or cat.
                    </p>

                    <div className="relative mt-8 max-w-md">
                        <Search className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-stone-400" size={18} aria-hidden />
                        <input
                            type="search"
                            aria-label="Search articles"
                            placeholder="Search articles, e.g. “portion size”"
                            value={searchTerm}
                            onChange={(e) => updateSearch(e.target.value)}
                            className="w-full rounded-full border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-900 py-3.5 pl-11 pr-11 text-[15px] shadow-sm placeholder:text-stone-400 focus:border-[#F4623B] focus:outline-none focus:ring-4 focus:ring-[#F4623B]/15 [&::-webkit-search-cancel-button]:hidden"
                        />
                        {searchTerm && (
                            <button
                                type="button"
                                onClick={() => updateSearch('')}
                                aria-label="Clear search"
                                className="absolute right-2 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full text-stone-400 hover:bg-stone-100 hover:text-stone-700 dark:hover:bg-stone-800"
                            >
                                <X size={16} />
                            </button>
                        )}
                    </div>
                </div>
            </header>

            {/* ---------- Category bar ---------- */}
            {categories.length > 2 && (
                <div className="sticky top-16 z-30 border-b border-stone-200 dark:border-stone-800 bg-white/95 dark:bg-stone-950/95 backdrop-blur">
                    <nav aria-label="Categories" className="mx-auto max-w-6xl px-4 sm:px-6">
                        <ul className="no-scrollbar -mx-1 flex gap-2 overflow-x-auto py-3">
                            {categories.map(({ name, count }) => {
                                const active = selectedCategory === name;
                                return (
                                    <li key={name} className="flex-shrink-0 px-1">
                                        <button
                                            type="button"
                                            onClick={() => selectCategory(name)}
                                            aria-pressed={active}
                                            className={cn(
                                                'inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F4623B]',
                                                active
                                                    ? 'border-stone-900 bg-stone-900 text-white dark:border-white dark:bg-white dark:text-stone-900'
                                                    : 'border-stone-200 text-stone-600 hover:border-stone-400 hover:text-stone-900 dark:border-stone-700 dark:text-stone-300 dark:hover:text-white'
                                            )}
                                        >
                                            {name}
                                            <span className={cn('text-xs', active ? 'opacity-70' : 'text-stone-400')}>{count}</span>
                                        </button>
                                    </li>
                                );
                            })}
                        </ul>
                    </nav>
                </div>
            )}

            <main className="mx-auto max-w-6xl px-4 sm:px-6 py-14 sm:py-16">
                {error && (
                    <div role="alert" className="rounded-2xl border border-red-200 dark:border-red-900 bg-red-50 dark:bg-red-950/40 p-8 text-center">
                        <p className="font-semibold text-red-800 dark:text-red-300">We couldn’t load the articles.</p>
                        <button
                            type="button"
                            onClick={() => window.location.reload()}
                            className="mt-3 text-sm font-semibold text-[#c2410c] underline underline-offset-4"
                        >
                            Try again
                        </button>
                    </div>
                )}

                {!error && !isFiltering && featured && (
                    <section aria-label="Featured article" className="pb-16 mb-16 border-b border-stone-200 dark:border-stone-800">
                        <FeaturedPost post={featured} />
                    </section>
                )}

                {!error && (
                    <section aria-labelledby="articles-heading">
                        <div className="mb-10 flex flex-wrap items-end justify-between gap-3">
                            <h2 id="articles-heading" className="font-display text-2xl sm:text-3xl font-semibold tracking-tight">
                                {query
                                    ? `Results for “${searchTerm.trim()}”`
                                    : selectedCategory === 'All'
                                    ? 'Latest articles'
                                    : selectedCategory}
                            </h2>
                            {isFiltering && (
                                <p className="text-sm text-stone-500 dark:text-stone-400" aria-live="polite">
                                    {filtered.length} {filtered.length === 1 ? 'article' : 'articles'}
                                    <button
                                        type="button"
                                        onClick={clearFilters}
                                        className="ml-3 font-semibold text-[#c2410c] dark:text-[#fb8a5f] hover:underline underline-offset-4"
                                    >
                                        Clear
                                    </button>
                                </p>
                            )}
                        </div>

                        {gridSource.length === 0 ? (
                            <div className="rounded-2xl border border-dashed border-stone-300 dark:border-stone-700 py-20 text-center">
                                <p className="font-display text-2xl font-semibold">
                                    {isFiltering ? 'No articles match your search' : 'More articles are on the way'}
                                </p>
                                <p className="mt-2 text-stone-500 dark:text-stone-400">
                                    {isFiltering ? 'Try another keyword or category.' : 'Check back soon for new guides.'}
                                </p>
                                {isFiltering && (
                                    <button
                                        type="button"
                                        onClick={clearFilters}
                                        className="mt-6 rounded-full bg-stone-900 dark:bg-white px-5 py-2.5 text-sm font-semibold text-white dark:text-stone-900 hover:opacity-90"
                                    >
                                        Show all articles
                                    </button>
                                )}
                            </div>
                        ) : (
                            <>
                                <div className="grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
                                    {visible.map((post) => (
                                        <BlogCard key={post.id} post={post} />
                                    ))}
                                </div>

                                {visibleCount < gridSource.length && (
                                    <div className="mt-16 flex flex-col items-center gap-3">
                                        <button
                                            type="button"
                                            onClick={() => setVisibleCount((c) => c + PAGE_SIZE)}
                                            className="rounded-full border border-stone-900 dark:border-stone-200 px-7 py-3 text-sm font-semibold transition-colors hover:bg-stone-900 hover:text-white dark:hover:bg-white dark:hover:text-stone-900"
                                        >
                                            Load more articles
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

            {/* ---------- CTA ---------- */}
            <section className="mx-auto max-w-6xl px-4 sm:px-6 pb-20">
                <div className="flex flex-col items-start justify-between gap-6 rounded-3xl bg-[#1F3D2B] px-8 py-10 sm:px-12 sm:py-12 md:flex-row md:items-center">
                    <div>
                        <h2 className="font-display text-2xl sm:text-3xl font-semibold text-white">Put it into practice</h2>
                        <p className="mt-2 max-w-lg text-white/75">
                            Fresh, balanced meals made with real ingredients, portioned for your pet.
                        </p>
                    </div>
                    <Link
                        href="/products"
                        className="inline-flex flex-shrink-0 items-center gap-2 rounded-full bg-[#F4623B] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#e0532c]"
                    >
                        Shop fresh food <ArrowRight size={16} aria-hidden />
                    </Link>
                </div>
            </section>
        </div>
    );
}
