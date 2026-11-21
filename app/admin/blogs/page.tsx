'use client';

import { useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Edit3, ExternalLink, FileText, Loader2, Plus, Search, Star, Trash2 } from 'lucide-react';
import { deleteBlog, getAllBlogs } from '@/lib/blog-utils';
import { BlogPost } from '@/lib/types';
import { formatDate, readingTime } from '@/lib/blog-content';
import { cn } from '@/lib/utils';

type StatusFilter = 'all' | 'published' | 'draft';

export default function AdminBlogsPage() {
    const [blogs, setBlogs] = useState<BlogPost[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [deleting, setDeleting] = useState<string | null>(null);
    const [status, setStatus] = useState<StatusFilter>('all');
    const [search, setSearch] = useState('');

    const fetchBlogs = async () => {
        try {
            setBlogs(await getAllBlogs());
            setError('');
        } catch (err) {
            console.error(err);
            setError('We couldn’t load the posts. Refresh to try again.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBlogs();
    }, []);

    const handleDelete = async (blog: BlogPost) => {
        if (!confirm(`Delete “${blog.title}”? This can’t be undone.`)) return;
        setDeleting(blog.id);
        try {
            await deleteBlog(blog.id);
            setBlogs((prev) => prev.filter((b) => b.id !== blog.id));
        } catch {
            setError('We couldn’t delete that post. Try again.');
        } finally {
            setDeleting(null);
        }
    };

    const counts = useMemo(
        () => ({
            all: blogs.length,
            published: blogs.filter((b) => b.published).length,
            draft: blogs.filter((b) => !b.published).length,
        }),
        [blogs]
    );

    const visible = useMemo(() => {
        const q = search.trim().toLowerCase();
        return blogs
            .filter((b) => (status === 'all' ? true : status === 'published' ? b.published : !b.published))
            .filter((b) => !q || `${b.title} ${b.category} ${b.slug}`.toLowerCase().includes(q))
            .sort((a, b) => new Date(b.updatedAt || b.createdAt).getTime() - new Date(a.updatedAt || a.createdAt).getTime());
    }, [blogs, status, search]);

    const tabs: { key: StatusFilter; label: string }[] = [
        { key: 'all', label: 'All' },
        { key: 'published', label: 'Published' },
        { key: 'draft', label: 'Drafts' },
    ];

    return (
        <div className="mx-auto max-w-7xl">
            {/* Header */}
            <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                <div>
                    <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white">Blog posts</h1>
                    <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Write, edit and publish articles for the BFAB Journal.</p>
                </div>
                <div className="flex gap-2">
                    <a
                        href="/blogs"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-4 py-2.5 text-sm font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800"
                    >
                        View blog <ExternalLink size={15} />
                    </a>
                    <Link
                        href="/admin/blogs/new"
                        className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-700"
                    >
                        <Plus size={18} /> New post
                    </Link>
                </div>
            </div>

            {/* Stats */}
            <div className="mb-6 grid grid-cols-3 gap-3 sm:gap-4">
                {[
                    { label: 'Total posts', value: counts.all, dot: 'bg-slate-400' },
                    { label: 'Published', value: counts.published, dot: 'bg-emerald-500' },
                    { label: 'Drafts', value: counts.draft, dot: 'bg-amber-500' },
                ].map((s) => (
                    <div key={s.label} className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 sm:p-5">
                        <p className="flex items-center gap-2 text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                            <span className={cn('h-2 w-2 rounded-full', s.dot)} aria-hidden /> {s.label}
                        </p>
                        <p className="mt-2 text-2xl sm:text-3xl font-bold tabular-nums text-slate-900 dark:text-white">
                            {loading ? '–' : s.value}
                        </p>
                    </div>
                ))}
            </div>

            <div className="overflow-hidden rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
                {/* Toolbar */}
                <div className="flex flex-col gap-3 border-b border-slate-200 dark:border-slate-800 p-3 sm:flex-row sm:items-center sm:justify-between">
                    <div role="tablist" aria-label="Filter by status" className="inline-flex rounded-lg bg-slate-100 dark:bg-slate-800 p-1">
                        {tabs.map((t) => (
                            <button
                                key={t.key}
                                role="tab"
                                aria-selected={status === t.key}
                                onClick={() => setStatus(t.key)}
                                className={cn(
                                    'rounded-md px-3 py-1.5 text-sm font-medium transition-colors',
                                    status === t.key
                                        ? 'bg-white text-slate-900 shadow-sm dark:bg-slate-950 dark:text-white'
                                        : 'text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
                                )}
                            >
                                {t.label} <span className="ml-1 text-xs text-slate-400 tabular-nums">{counts[t.key]}</span>
                            </button>
                        ))}
                    </div>
                    <div className="relative sm:w-72">
                        <Search size={16} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" aria-hidden />
                        <input
                            type="search"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search posts"
                            aria-label="Search posts"
                            className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 py-2 pl-9 pr-3 text-sm placeholder:text-slate-400 focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-500/15"
                        />
                    </div>
                </div>

                {error && <p className="border-b border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-900 dark:bg-red-950/40 dark:text-red-300">{error}</p>}

                {loading ? (
                    <div className="flex items-center justify-center gap-2 py-20 text-sm text-slate-500">
                        <Loader2 size={18} className="animate-spin" /> Loading posts…
                    </div>
                ) : visible.length === 0 ? (
                    <div className="flex flex-col items-center py-20 text-center">
                        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500">
                            <FileText size={22} />
                        </span>
                        <p className="mt-4 font-semibold text-slate-900 dark:text-white">
                            {blogs.length === 0 ? 'No posts yet' : 'No posts match'}
                        </p>
                        <p className="mt-1 text-sm text-slate-500">
                            {blogs.length === 0 ? 'Write your first article to get started.' : 'Try a different search or filter.'}
                        </p>
                        {blogs.length === 0 && (
                            <Link
                                href="/admin/blogs/new"
                                className="mt-5 inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
                            >
                                <Plus size={16} /> New post
                            </Link>
                        )}
                    </div>
                ) : (
                    <ul className="divide-y divide-slate-200 dark:divide-slate-800">
                        {visible.map((blog) => (
                            <li key={blog.id} className="group flex items-center gap-4 p-4 transition-colors hover:bg-slate-50 dark:hover:bg-slate-800/40">
                                <Link
                                    href={`/admin/blogs/${blog.id}`}
                                    className="relative hidden h-16 w-24 flex-shrink-0 overflow-hidden rounded-lg bg-slate-100 dark:bg-slate-800 sm:block"
                                    tabIndex={-1}
                                    aria-hidden
                                >
                                    {blog.coverImage ? (
                                        <Image src={blog.coverImage} alt="" fill sizes="96px" className="object-cover" />
                                    ) : (
                                        <FileText size={20} className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-slate-400" />
                                    )}
                                </Link>

                                <div className="min-w-0 flex-1">
                                    <div className="flex flex-wrap items-center gap-2">
                                        <span
                                            className={cn(
                                                'inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-xs font-semibold',
                                                blog.published
                                                    ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400'
                                                    : 'bg-amber-50 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400'
                                            )}
                                        >
                                            <span className={cn('h-1.5 w-1.5 rounded-full', blog.published ? 'bg-emerald-500' : 'bg-amber-500')} />
                                            {blog.published ? 'Published' : 'Draft'}
                                        </span>
                                        {blog.featured && (
                                            <span className="inline-flex items-center gap-1 text-xs font-medium text-amber-600">
                                                <Star size={12} className="fill-amber-400 text-amber-400" /> Featured
                                            </span>
                                        )}
                                        {blog.category && <span className="text-xs text-slate-500 dark:text-slate-400">{blog.category}</span>}
                                    </div>
                                    <Link
                                        href={`/admin/blogs/${blog.id}`}
                                        className="mt-1 block truncate font-semibold text-slate-900 hover:text-blue-600 dark:text-white dark:hover:text-blue-400"
                                    >
                                        {blog.title || 'Untitled post'}
                                    </Link>
                                    <p className="mt-0.5 truncate text-xs text-slate-500 dark:text-slate-400">
                                        Updated {formatDate(blog.updatedAt || blog.createdAt, 'short')} · {readingTime(blog.content)} min read ·{' '}
                                        <span className="font-mono">/blogs/{blog.slug}</span>
                                    </p>
                                </div>

                                <div className="flex flex-shrink-0 items-center gap-1">
                                    {blog.published && (
                                        <a
                                            href={`/blogs/${blog.slug}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            title="View live"
                                            aria-label={`View “${blog.title}” on the site`}
                                            className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-900 dark:hover:bg-slate-800 dark:hover:text-white"
                                        >
                                            <ExternalLink size={17} />
                                        </a>
                                    )}
                                    <Link
                                        href={`/admin/blogs/${blog.id}`}
                                        title="Edit"
                                        aria-label={`Edit “${blog.title}”`}
                                        className="rounded-lg p-2 text-slate-500 hover:bg-blue-50 hover:text-blue-600 dark:hover:bg-blue-900/20"
                                    >
                                        <Edit3 size={17} />
                                    </Link>
                                    <button
                                        type="button"
                                        onClick={() => handleDelete(blog)}
                                        disabled={deleting === blog.id}
                                        title="Delete"
                                        aria-label={`Delete “${blog.title}”`}
                                        className="rounded-lg p-2 text-slate-500 hover:bg-red-50 hover:text-red-600 disabled:opacity-50 dark:hover:bg-red-900/20"
                                    >
                                        {deleting === blog.id ? <Loader2 size={17} className="animate-spin" /> : <Trash2 size={17} />}
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
}
