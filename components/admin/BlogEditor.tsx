'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import {
    AlertCircle,
    ArrowLeft,
    Eye,
    ExternalLink,
    ImagePlus,
    Loader2,
    PenLine,
    RefreshCw,
    Star,
    X,
} from 'lucide-react';
import type ReactQuillType from 'react-quill-new';
import { BlogPost } from '@/lib/types';
import { createBlog, updateBlog } from '@/lib/blog-utils';
import { autoExcerpt, formatDate, normalizeBlogHtml, prepareBlogHtml, readingTime, wordCount } from '@/lib/blog-content';
import BlogContent from '@/components/blog/BlogContent';
import { cn } from '@/lib/utils';
import 'react-quill-new/dist/quill.snow.css';

/* ------------------------------------------------------------------ */
/* Quill is browser-only. Wrap it so we can still hold a ref to it.   */
/* ------------------------------------------------------------------ */
type QuillProps = React.ComponentProps<typeof ReactQuillType> & { forwardedRef?: React.Ref<ReactQuillType> };

const ReactQuill = dynamic(
    async () => {
        const { default: RQ } = await import('react-quill-new');
        function QuillWithRef({ forwardedRef, ...props }: QuillProps) {
            return <RQ ref={forwardedRef} {...props} />;
        }
        return QuillWithRef;
    },
    {
        ssr: false,
        loading: () => <div className="h-[580px] animate-pulse rounded-xl bg-slate-100 dark:bg-slate-900" />,
    }
);

/* ------------------------------------------------------------------ */
/* helpers                                                            */
/* ------------------------------------------------------------------ */

// Posts (including images) are stored in a single Firestore document, which is capped at 1 MB.
const FIRESTORE_SOFT_LIMIT = 900 * 1024;

const slugify = (val: string) =>
    val
        .toLowerCase()
        .normalize('NFKD')
        .replace(/[̀-ͯ]/g, '')
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)+/g, '');

/** Resize + re-encode an image in the browser so it fits comfortably in Firestore. */
async function compressImage(file: File, maxWidth: number, quality: number): Promise<string> {
    const dataUrl = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
    if (file.type === 'image/svg+xml' || file.type === 'image/gif') return dataUrl;

    const img = await new Promise<HTMLImageElement>((resolve, reject) => {
        const el = new window.Image();
        el.onload = () => resolve(el);
        el.onerror = reject;
        el.src = dataUrl;
    });
    const scale = Math.min(1, maxWidth / img.width);
    const canvas = document.createElement('canvas');
    canvas.width = Math.round(img.width * scale);
    canvas.height = Math.round(img.height * scale);
    const ctx = canvas.getContext('2d');
    if (!ctx) return dataUrl;
    ctx.fillStyle = '#ffffff'; // transparent PNGs → white, not black
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    const out = canvas.toDataURL('image/jpeg', quality);
    return out.length < dataUrl.length ? out : dataUrl;
}

const kb = (bytes: number) => (bytes > 1024 * 1024 ? `${(bytes / 1024 / 1024).toFixed(2)} MB` : `${Math.round(bytes / 1024)} KB`);

const inputClass =
    'w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-2 text-sm text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-500/15';

function Field({
    label,
    hint,
    counter,
    over,
    children,
}: {
    label: string;
    hint?: React.ReactNode;
    counter?: string;
    over?: boolean;
    children: React.ReactNode;
}) {
    return (
        <label className="block">
            <span className="mb-1.5 flex items-baseline justify-between gap-2 text-sm font-medium text-slate-700 dark:text-slate-300">
                {label}
                {counter && (
                    <span className={cn('text-xs font-normal tabular-nums', over ? 'text-amber-600' : 'text-slate-400')}>{counter}</span>
                )}
            </span>
            {children}
            {hint && <span className="mt-1.5 block text-xs leading-relaxed text-slate-500 dark:text-slate-400">{hint}</span>}
        </label>
    );
}

function Panel({ title, children, action }: { title: string; children: React.ReactNode; action?: React.ReactNode }) {
    return (
        <section className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 px-5 py-3">
                <h2 className="text-sm font-semibold text-slate-900 dark:text-slate-100">{title}</h2>
                {action}
            </div>
            <div className="space-y-4 p-5">{children}</div>
        </section>
    );
}

/* ------------------------------------------------------------------ */
/* Editor                                                             */
/* ------------------------------------------------------------------ */

interface BlogEditorProps {
    initialData?: BlogPost;
    isEditing?: boolean;
}

export default function BlogEditor({ initialData, isEditing = false }: BlogEditorProps) {
    const router = useRouter();
    const quillRef = useRef<ReactQuillType>(null);

    const [saving, setSaving] = useState<null | 'draft' | 'publish'>(null);
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState('');
    const [mode, setMode] = useState<'write' | 'preview'>('write');
    const [dirty, setDirty] = useState(false);

    // Form state – content is normalised on load so old posts (plain text / &nbsp; soup) open cleanly
    const [title, setTitle] = useState(initialData?.title || '');
    const [slug, setSlug] = useState(initialData?.slug || '');
    const [slugTouched, setSlugTouched] = useState(isEditing);
    const [category, setCategory] = useState(initialData?.category || '');
    const [author, setAuthor] = useState(initialData?.author || 'BFAB Team');
    const [excerpt, setExcerpt] = useState(initialData?.excerpt || '');
    const [content, setContent] = useState(() => normalizeBlogHtml(initialData?.content || ''));
    const [coverImage, setCoverImage] = useState(initialData?.coverImage || '');
    const [featured, setFeatured] = useState(Boolean(initialData?.featured));
    const [seoTitle, setSeoTitle] = useState(initialData?.seoTitle || '');
    const [seoDescription, setSeoDescription] = useState(initialData?.seoDescription || '');
    const [seoKeywords, setSeoKeywords] = useState(initialData?.seoKeywords?.join(', ') || '');

    const wasPublished = Boolean(initialData?.published);

    const touch = <T,>(setter: (v: T) => void) => (v: T) => {
        setter(v);
        setDirty(true);
    };

    // Warn before leaving with unsaved changes
    useEffect(() => {
        if (!dirty) return;
        const handler = (e: BeforeUnloadEvent) => {
            e.preventDefault();
            e.returnValue = '';
        };
        window.addEventListener('beforeunload', handler);
        return () => window.removeEventListener('beforeunload', handler);
    }, [dirty]);

    // Toolbar "image" button: compress, then insert at the cursor
    const insertImage = useCallback(() => {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'image/*';
        input.onchange = async () => {
            const file = input.files?.[0];
            const editor = quillRef.current?.getEditor();
            if (!file || !editor) return;
            try {
                const src = await compressImage(file, 1200, 0.78);
                const range = editor.getSelection(true);
                const index = range ? range.index : editor.getLength();
                editor.insertEmbed(index, 'image', src, 'user');
                editor.setSelection(index + 1, 0, 'silent');
            } catch {
                setError('We couldn’t read that image. Try a JPG or PNG.');
            }
        };
        input.click();
    }, []);

    // Stable object so Quill doesn't rebuild on every keystroke
    const modules = useMemo(
        () => ({
            toolbar: {
                container: [
                    [{ header: [2, 3, false] }],
                    ['bold', 'italic', 'underline', 'strike'],
                    [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
                    ['blockquote', 'code-block', 'link'],
                    [{ align: [] }],
                    ['image', 'video'],
                    ['clean'],
                ],
                handlers: { image: insertImage },
            },
            clipboard: { matchVisual: false },
            history: { delay: 1000, maxStack: 200, userOnly: true },
        }),
        [insertImage]
    );

    const formats = useMemo(
        () => ['header', 'bold', 'italic', 'underline', 'strike', 'list', 'indent', 'blockquote', 'code-block', 'link', 'align', 'image', 'video'],
        []
    );

    const words = useMemo(() => wordCount(content), [content]);
    const minutes = readingTime(content);
    const preview = useMemo(() => (mode === 'preview' ? prepareBlogHtml(content).html : ''), [mode, content]);
    const docBytes = content.length + coverImage.length;
    const tooBig = docBytes > FIRESTORE_SOFT_LIMIT;

    const handleTitleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const value = e.target.value.replace(/\n/g, ' ');
        setTitle(value);
        setDirty(true);
        if (!slugTouched) setSlug(slugify(value));
    };

    const handleCoverUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        e.target.value = '';
        if (!file) return;
        setError('');
        setUploading(true);
        try {
            setCoverImage(await compressImage(file, 1600, 0.82));
            setDirty(true);
        } catch {
            setError('We couldn’t read that image. Try a JPG or PNG.');
        } finally {
            setUploading(false);
        }
    };

    // Both buttons are type="submit", so native validation runs and the post saves once.
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const action = ((e.nativeEvent as SubmitEvent).submitter as HTMLButtonElement | null)?.value;
        const publish = action === 'publish';
        const clean = normalizeBlogHtml(content);

        if (!wordCount(clean) && !/<img/i.test(clean)) {
            setError('Write some content before saving.');
            return;
        }
        if (tooBig) {
            setError(`This post is ${kb(docBytes)}. Posts must be under ${kb(FIRESTORE_SOFT_LIMIT)} — remove or replace a large image.`);
            return;
        }

        setError('');
        setSaving(publish ? 'publish' : 'draft');

        const blogData = {
            title: title.trim(),
            slug: slug.trim(),
            category: category.trim(),
            excerpt: excerpt.trim() || autoExcerpt(clean),
            content: clean,
            coverImage,
            featured,
            published: publish,
            author: author.trim() || 'BFAB Team',
            seoTitle: seoTitle.trim(),
            seoDescription: seoDescription.trim(),
            seoKeywords: seoKeywords
                .split(',')
                .map((k) => k.trim())
                .filter(Boolean),
        };

        try {
            if (isEditing && initialData?.id) {
                await updateBlog(initialData.id, blogData);
            } else {
                await createBlog(blogData);
            }
            setDirty(false);
            router.push('/admin/blogs');
        } catch (err) {
            console.error('Error saving blog:', err);
            setError('We couldn’t save this post. Check your connection and try again.');
            setSaving(null);
        }
    };

    const busy = saving !== null;
    const secondaryLabel = wasPublished ? 'Unpublish' : 'Save draft';
    const primaryLabel = wasPublished ? 'Update' : 'Publish';

    return (
        <form onSubmit={handleSubmit} className="mx-auto max-w-7xl pb-24">
            {/* ---------- Top bar ---------- */}
            <div className="sticky top-[71px] lg:top-0 z-20 -mx-4 sm:-mx-6 lg:-mx-8 mb-6 flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-slate-950/95 px-4 sm:px-6 lg:px-8 py-3 backdrop-blur">
                <div className="flex min-w-0 items-center gap-4">
                    <Link
                        href="/admin/blogs"
                        className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-500 hover:text-slate-900 dark:hover:text-white"
                    >
                        <ArrowLeft size={16} /> All posts
                    </Link>
                    <span className="hidden h-5 w-px bg-slate-200 dark:bg-slate-800 sm:block" aria-hidden />
                    <span className="hidden sm:inline-flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
                        <span className={cn('h-2 w-2 rounded-full', wasPublished ? 'bg-emerald-500' : 'bg-amber-500')} aria-hidden />
                        {isEditing ? (wasPublished ? 'Published' : 'Draft') : 'New post'}
                        {dirty && <span className="text-slate-400">· Unsaved changes</span>}
                    </span>
                </div>

                <div className="flex items-center gap-2">
                    {isEditing && wasPublished && (
                        <a
                            href={`/blogs/${initialData?.slug}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hidden md:inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
                        >
                            View live <ExternalLink size={14} />
                        </a>
                    )}
                    <button
                        type="submit"
                        value="draft"
                        disabled={busy}
                        className="inline-flex min-w-[104px] items-center justify-center rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-4 py-2 text-sm font-semibold text-slate-800 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 disabled:opacity-60"
                    >
                        {saving === 'draft' ? <Loader2 size={16} className="animate-spin" /> : secondaryLabel}
                    </button>
                    <button
                        type="submit"
                        value="publish"
                        disabled={busy}
                        className="inline-flex min-w-[96px] items-center justify-center rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 disabled:opacity-60"
                    >
                        {saving === 'publish' ? <Loader2 size={16} className="animate-spin" /> : primaryLabel}
                    </button>
                </div>
            </div>

            {error && (
                <div
                    role="alert"
                    className="mb-6 flex items-start gap-3 rounded-xl border border-red-200 dark:border-red-900 bg-red-50 dark:bg-red-950/40 p-4 text-sm text-red-800 dark:text-red-300"
                >
                    <AlertCircle size={18} className="mt-0.5 flex-shrink-0" />
                    <p className="flex-1">{error}</p>
                    <button type="button" onClick={() => setError('')} aria-label="Dismiss" className="opacity-70 hover:opacity-100">
                        <X size={16} />
                    </button>
                </div>
            )}

            <div className="grid grid-cols-1 gap-8 xl:grid-cols-[minmax(0,1fr)_340px]">
                {/* ---------- Writing area ---------- */}
                <div className="min-w-0">
                    {/* Write / Preview tabs */}
                    <div className="mb-4 flex items-center justify-between gap-4">
                        <div role="tablist" aria-label="Editor mode" className="inline-flex rounded-lg bg-slate-100 dark:bg-slate-900 p-1">
                            {(
                                [
                                    ['write', 'Write', PenLine],
                                    ['preview', 'Preview', Eye],
                                ] as const
                            ).map(([value, label, Icon]) => (
                                <button
                                    key={value}
                                    type="button"
                                    role="tab"
                                    aria-selected={mode === value}
                                    onClick={() => setMode(value)}
                                    className={cn(
                                        'inline-flex items-center gap-1.5 rounded-md px-3.5 py-1.5 text-sm font-medium transition-colors',
                                        mode === value
                                            ? 'bg-white text-slate-900 shadow-sm dark:bg-slate-800 dark:text-white'
                                            : 'text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
                                    )}
                                >
                                    <Icon size={15} /> {label}
                                </button>
                            ))}
                        </div>
                        <p className="text-sm tabular-nums text-slate-500 dark:text-slate-400">
                            {words.toLocaleString()} {words === 1 ? 'word' : 'words'} · {minutes} min read
                        </p>
                    </div>

                    {/* Write mode stays mounted (hidden) so Quill keeps its undo history */}
                    <div className={cn('rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950', mode !== 'write' && 'hidden')}>
                        <div className="px-6 sm:px-8 pt-8 pb-2">
                            <textarea
                                required
                                rows={1}
                                value={title}
                                onChange={handleTitleChange}
                                aria-label="Post title"
                                placeholder="Add a title"
                                className="w-full resize-none overflow-hidden border-0 bg-transparent p-0 font-display text-3xl sm:text-4xl font-semibold leading-tight tracking-tight text-slate-900 dark:text-white placeholder:text-slate-300 dark:placeholder:text-slate-700 focus:outline-none focus:ring-0 [field-sizing:content]"
                            />
                            <textarea
                                rows={2}
                                value={excerpt}
                                onChange={(e) => touch(setExcerpt)(e.target.value)}
                                aria-label="Summary"
                                placeholder="Write a short summary (shown under the title and on the blog page)…"
                                className="mt-3 w-full resize-none border-0 bg-transparent p-0 text-lg leading-relaxed text-slate-600 dark:text-slate-300 placeholder:text-slate-400 focus:outline-none focus:ring-0 [field-sizing:content]"
                            />
                            <p className={cn('mt-1 text-xs tabular-nums', excerpt.length > 160 ? 'text-amber-600' : 'text-slate-400')}>
                                {excerpt.length}/160 {excerpt.length > 160 && '· shorter summaries read better in cards'}
                            </p>
                        </div>

                        <div className="blog-editor border-t border-slate-100 dark:border-slate-800 [&_.ql-toolbar.ql-snow]:rounded-none [&_.ql-toolbar.ql-snow]:border-x-0 [&_.ql-container.ql-snow]:rounded-b-xl [&_.ql-container.ql-snow]:border-0">
                            <ReactQuill
                                forwardedRef={quillRef}
                                theme="snow"
                                value={content}
                                onChange={(html: string, _delta: unknown, source: string) => {
                                    setContent(html);
                                    if (source === 'user') setDirty(true);
                                }}
                                modules={modules}
                                formats={formats}
                                placeholder="Tell your story… Use Heading / Subheading from the toolbar to structure the article."
                            />
                        </div>
                    </div>

                    {mode === 'preview' && (
                        <div className="overflow-hidden rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-stone-950">
                            <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 px-4 py-2 text-xs text-slate-500">
                                <span className="h-2.5 w-2.5 rounded-full bg-slate-300 dark:bg-slate-700" />
                                <span className="h-2.5 w-2.5 rounded-full bg-slate-300 dark:bg-slate-700" />
                                <span className="h-2.5 w-2.5 rounded-full bg-slate-300 dark:bg-slate-700" />
                                <span className="ml-2 truncate font-mono">/blogs/{slug || 'your-post'}</span>
                            </div>
                            <div className="bg-[#fef6eb] dark:bg-stone-900/60 px-6 sm:px-12 py-10">
                                <div className="mx-auto max-w-[680px]">
                                    {category && (
                                        <span className="inline-block rounded-full bg-[#fff1ea] dark:bg-[#F4623B]/15 px-2.5 py-0.5 text-xs font-semibold text-[#c2410c] dark:text-[#fb8a5f]">
                                            {category}
                                        </span>
                                    )}
                                    <h1 className="mt-4 font-display text-3xl sm:text-[2.5rem] font-semibold leading-tight tracking-tight text-stone-900 dark:text-white">
                                        {title || 'Untitled post'}
                                    </h1>
                                    {excerpt && <p className="mt-4 text-lg leading-relaxed text-stone-600 dark:text-stone-300">{excerpt}</p>}
                                    <p className="mt-6 text-sm text-stone-500">
                                        <span className="font-semibold text-stone-800 dark:text-stone-200">{author || 'BFAB Team'}</span> ·{' '}
                                        {formatDate(initialData?.createdAt || new Date())} · {minutes} min read
                                    </p>
                                </div>
                            </div>
                            {coverImage && (
                                <div className="px-6 sm:px-12 pt-8">
                                    <div className="relative mx-auto aspect-[16/9] max-w-[760px] overflow-hidden rounded-xl bg-slate-100 dark:bg-slate-800">
                                        <Image src={coverImage} alt="" fill sizes="760px" className="object-cover" />
                                    </div>
                                </div>
                            )}
                            <div className="px-6 sm:px-12 py-10">
                                {preview ? (
                                    <BlogContent html={preview} className="mx-auto max-w-[680px]" />
                                ) : (
                                    <p className="text-center text-slate-400">Nothing to preview yet.</p>
                                )}
                            </div>
                        </div>
                    )}

                    <p className="mt-3 text-xs text-slate-500 dark:text-slate-400">
                        Tip: press <kbd className="rounded border border-slate-300 dark:border-slate-700 px-1">Enter</kbd> once for a new
                        paragraph — spacing between paragraphs is added automatically, so there’s no need for blank lines.
                    </p>
                </div>

                {/* ---------- Settings sidebar ---------- */}
                <aside className="space-y-6 xl:sticky xl:top-20 xl:self-start">
                    <Panel title="Post details">
                        <Field label="Category" hint="Becomes a filter on the blog page. Reuse the exact name to group posts.">
                            <input
                                type="text"
                                required
                                list="blog-category-suggestions"
                                value={category}
                                onChange={(e) => touch(setCategory)(e.target.value)}
                                className={inputClass}
                                placeholder="e.g. Nutrition"
                            />
                            <datalist id="blog-category-suggestions">
                                {['Nutrition', 'Health', 'Ingredients', 'Feeding guide', 'Training', 'Lifestyle'].map((c) => (
                                    <option key={c} value={c} />
                                ))}
                            </datalist>
                        </Field>

                        <Field label="Author">
                            <input type="text" value={author} onChange={(e) => touch(setAuthor)(e.target.value)} className={inputClass} />
                        </Field>

                        <Field
                            label="URL slug"
                            hint={
                                <span className="font-mono">
                                    /blogs/<span className="text-slate-700 dark:text-slate-300">{slug || 'your-post-title'}</span>
                                </span>
                            }
                        >
                            <div className="flex gap-2">
                                <input
                                    type="text"
                                    required
                                    value={slug}
                                    onChange={(e) => {
                                        setSlugTouched(true);
                                        touch(setSlug)(slugify(e.target.value));
                                    }}
                                    className={`${inputClass} font-mono`}
                                    placeholder="post-url-slug"
                                />
                                <button
                                    type="button"
                                    onClick={() => {
                                        setSlug(slugify(title));
                                        setDirty(true);
                                    }}
                                    title="Generate from title"
                                    aria-label="Generate slug from title"
                                    className="flex-shrink-0 rounded-lg border border-slate-300 dark:border-slate-700 px-2.5 text-slate-500 hover:bg-slate-50 hover:text-slate-900 dark:hover:bg-slate-800"
                                >
                                    <RefreshCw size={15} />
                                </button>
                            </div>
                        </Field>

                        <div className="flex items-start justify-between gap-4 rounded-lg bg-slate-50 dark:bg-slate-800/50 p-3">
                            <div>
                                <p className="flex items-center gap-1.5 text-sm font-medium text-slate-700 dark:text-slate-300" id="featured-label">
                                    <Star size={14} className={featured ? 'fill-amber-400 text-amber-400' : ''} /> Feature this post
                                </p>
                                <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">Shown large at the top of the blog page.</p>
                            </div>
                            <button
                                type="button"
                                role="switch"
                                aria-checked={featured}
                                aria-labelledby="featured-label"
                                onClick={() => touch(setFeatured)(!featured)}
                                className={cn(
                                    'relative mt-0.5 h-6 w-11 flex-shrink-0 rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2',
                                    featured ? 'bg-blue-600' : 'bg-slate-300 dark:bg-slate-700'
                                )}
                            >
                                <span
                                    className={cn(
                                        'absolute left-0.5 top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform motion-reduce:transition-none',
                                        featured && 'translate-x-5'
                                    )}
                                />
                            </button>
                        </div>
                    </Panel>

                    <Panel
                        title="Cover image"
                        action={
                            coverImage ? (
                                <button
                                    type="button"
                                    onClick={() => {
                                        setCoverImage('');
                                        setDirty(true);
                                    }}
                                    className="text-xs font-medium text-red-600 hover:underline"
                                >
                                    Remove
                                </button>
                            ) : undefined
                        }
                    >
                        <div
                            className={cn(
                                'group relative aspect-[16/9] overflow-hidden rounded-lg',
                                coverImage
                                    ? 'border border-slate-200 dark:border-slate-800'
                                    : 'flex flex-col items-center justify-center border-2 border-dashed border-slate-300 dark:border-slate-700 text-center text-slate-500 hover:border-blue-400 hover:bg-blue-50/50 dark:hover:bg-slate-800'
                            )}
                        >
                            {coverImage ? (
                                <>
                                    <Image src={coverImage} alt="Cover preview" fill sizes="340px" className="object-cover" />
                                    <span className="absolute inset-0 flex items-center justify-center bg-slate-900/50 text-sm font-medium text-white opacity-0 transition-opacity group-hover:opacity-100">
                                        {uploading ? <Loader2 className="animate-spin" /> : 'Replace image'}
                                    </span>
                                </>
                            ) : (
                                <>
                                    {uploading ? <Loader2 className="mb-2 animate-spin" /> : <ImagePlus size={26} className="mb-2" />}
                                    <p className="text-sm font-medium">{uploading ? 'Optimising image…' : 'Upload cover image'}</p>
                                    <p className="mt-1 text-xs">JPG or PNG · 16:9 works best</p>
                                </>
                            )}
                            <input
                                type="file"
                                accept="image/*"
                                aria-label="Upload cover image"
                                onChange={handleCoverUpload}
                                disabled={uploading}
                                className="absolute inset-0 cursor-pointer opacity-0"
                            />
                        </div>
                        <p className="text-xs text-slate-500 dark:text-slate-400">
                            Images are resized and compressed automatically. Post size:{' '}
                            <span className={cn('font-medium tabular-nums', tooBig ? 'text-red-600' : 'text-slate-700 dark:text-slate-300')}>
                                {kb(docBytes)}
                            </span>{' '}
                            / {kb(FIRESTORE_SOFT_LIMIT)}
                        </p>
                    </Panel>

                    <Panel title="Search engine listing">
                        <div className="rounded-lg border border-slate-200 dark:border-slate-800 p-3">
                            <p className="truncate text-xs text-slate-500 dark:text-slate-400">bfab.in › blogs › {slug || 'your-post-title'}</p>
                            <p className="mt-1 line-clamp-2 text-[17px] leading-snug text-[#1a0dab] dark:text-blue-400">
                                {seoTitle || title || 'Post title'}
                            </p>
                            <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-slate-600 dark:text-slate-400">
                                {seoDescription || excerpt || autoExcerpt(content) || 'The summary or meta description appears here.'}
                            </p>
                        </div>

                        <Field label="Meta title" counter={`${seoTitle.length}/60`} over={seoTitle.length > 60} hint="Leave empty to use the post title.">
                            <input type="text" value={seoTitle} onChange={(e) => touch(setSeoTitle)(e.target.value)} className={inputClass} />
                        </Field>
                        <Field
                            label="Meta description"
                            counter={`${seoDescription.length}/160`}
                            over={seoDescription.length > 160}
                            hint="Leave empty to use the summary."
                        >
                            <textarea
                                rows={3}
                                value={seoDescription}
                                onChange={(e) => touch(setSeoDescription)(e.target.value)}
                                className={inputClass}
                            />
                        </Field>
                        <Field label="Topics / keywords" hint="Separate with commas. Shown as topics at the end of the post.">
                            <input
                                type="text"
                                value={seoKeywords}
                                onChange={(e) => touch(setSeoKeywords)(e.target.value)}
                                className={inputClass}
                                placeholder="dog food, nutrition, puppies"
                            />
                        </Field>
                    </Panel>
                </aside>
            </div>
        </form>
    );
}
