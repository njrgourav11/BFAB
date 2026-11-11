'use client';

import { useMemo, useState } from 'react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Upload, Loader2, X, AlertCircle } from 'lucide-react';
import { BlogPost } from '@/lib/types';
import { createBlog, updateBlog } from '@/lib/blog-utils';
import 'react-quill-new/dist/quill.snow.css';

// Quill touches `document`, so it must be client-only
const ReactQuill = dynamic(() => import('react-quill-new').then((mod) => mod.default || mod), {
    ssr: false,
    loading: () => <div className="h-[480px] animate-pulse rounded-md bg-stone-100 dark:bg-stone-900" />,
}) as any;

interface BlogEditorProps {
    initialData?: BlogPost;
    isEditing?: boolean;
}

const MAX_IMAGE_BYTES = 1024 * 1024; // images are stored in Firestore as base64, so keep them small

const slugify = (val: string) =>
    val
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)+/g, '');

const inputClass =
    'w-full rounded-md border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 px-3 py-2 text-sm text-stone-900 dark:text-stone-100 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-emerald-600';

function Field({
    label,
    hint,
    counter,
    children,
}: {
    label: string;
    hint?: string;
    counter?: React.ReactNode;
    children: React.ReactNode;
}) {
    return (
        <label className="block">
            <span className="mb-1.5 flex items-baseline justify-between text-sm font-medium text-stone-700 dark:text-stone-300">
                {label}
                {counter && <span className="text-xs font-normal text-stone-500 dark:text-stone-400">{counter}</span>}
            </span>
            {children}
            {hint && <span className="mt-1.5 block text-xs text-stone-500 dark:text-stone-400">{hint}</span>}
        </label>
    );
}

function Panel({ title, children }: { title: string; children: React.ReactNode }) {
    return (
        <section className="rounded-md border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-950">
            <h2 className="border-b border-stone-200 dark:border-stone-800 px-5 py-3 text-sm font-semibold text-stone-900 dark:text-stone-100">
                {title}
            </h2>
            <div className="space-y-4 p-5">{children}</div>
        </section>
    );
}

export default function BlogEditor({ initialData, isEditing = false }: BlogEditorProps) {
    const router = useRouter();
    const [saving, setSaving] = useState<null | 'draft' | 'publish'>(null);
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState('');

    // Form state
    const [title, setTitle] = useState(initialData?.title || '');
    const [slug, setSlug] = useState(initialData?.slug || '');
    const [slugTouched, setSlugTouched] = useState(isEditing);
    const [category, setCategory] = useState(initialData?.category || '');
    const [excerpt, setExcerpt] = useState(initialData?.excerpt || '');
    const [content, setContent] = useState(initialData?.content || '');
    const [coverImage, setCoverImage] = useState(initialData?.coverImage || '');
    const [featured, setFeatured] = useState(Boolean((initialData as any)?.featured));
    const [seoTitle, setSeoTitle] = useState(initialData?.seoTitle || '');
    const [seoDescription, setSeoDescription] = useState(initialData?.seoDescription || '');
    const [seoKeywords, setSeoKeywords] = useState(initialData?.seoKeywords?.join(', ') || '');

    const wasPublished = Boolean(initialData?.published);

    // Stable object so Quill doesn't rebuild its toolbar on every keystroke
    const modules = useMemo(
        () => ({
            toolbar: [
                [{ header: [2, 3, false] }],
                ['bold', 'italic', 'underline', 'blockquote'],
                [{ list: 'ordered' }, { list: 'bullet' }],
                ['link', 'image'],
                ['clean'],
            ],
        }),
        []
    );

    const words = useMemo(
        () => content.replace(/<[^>]+>/g, ' ').trim().split(/\s+/).filter(Boolean).length,
        [content]
    );

    const handleTitleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const value = e.target.value.replace(/\n/g, ' ');
        setTitle(value);
        if (!slugTouched) setSlug(slugify(value));
    };

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        setError('');

        if (file.size > MAX_IMAGE_BYTES) {
            setError('That image is over 1 MB. Choose a smaller file or compress it first.');
            e.target.value = '';
            return;
        }

        setUploading(true);
        const reader = new FileReader();
        reader.onloadend = () => {
            setCoverImage(reader.result as string);
            setUploading(false);
        };
        reader.onerror = () => {
            setError('We couldn’t read that image. Try a different file.');
            setUploading(false);
        };
        reader.readAsDataURL(file);
    };

    // One submit path: both buttons are type="submit", so native validation runs and the post saves once.
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const action = ((e.nativeEvent as SubmitEvent).submitter as HTMLButtonElement | null)?.value as
            | 'draft'
            | 'publish'
            | undefined;
        const publish = action === 'publish';

        if (!content.replace(/<[^>]+>/g, '').trim()) {
            setError('Write some content before saving.');
            return;
        }

        setError('');
        setSaving(publish ? 'publish' : 'draft');

        const blogData = {
            title: title.trim(),
            slug: slug.trim(),
            category: category.trim(),
            excerpt,
            content,
            coverImage,
            featured,
            published: publish,
            author: initialData?.author || 'Admin', // TODO: use the signed-in user
            seoTitle,
            seoDescription,
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
        <form onSubmit={handleSubmit} className="mx-auto max-w-6xl pb-24">
            {/* ---------- Top bar ---------- */}
            <div className="sticky top-0 z-20 -mx-4 mb-8 flex items-center justify-between gap-4 border-b border-stone-200 dark:border-stone-800 bg-white/90 dark:bg-stone-950/90 px-4 py-3 backdrop-blur">
                <div className="flex min-w-0 items-center gap-4">
                    <Link
                        href="/admin/blogs"
                        className="inline-flex items-center gap-1.5 text-sm text-stone-500 hover:text-stone-900 dark:hover:text-white"
                    >
                        <ArrowLeft size={16} /> Posts
                    </Link>
                    <span className="hidden sm:inline-flex items-center gap-2 text-sm text-stone-500 dark:text-stone-400">
                        <span
                            className={`h-2 w-2 rounded-full ${wasPublished ? 'bg-emerald-600' : 'bg-amber-500'}`}
                            aria-hidden
                        />
                        {isEditing ? (wasPublished ? 'Published' : 'Draft') : 'New post'}
                        <span aria-hidden>·</span>
                        {words} {words === 1 ? 'word' : 'words'}
                    </span>
                </div>

                <div className="flex items-center gap-2">
                    <button
                        type="submit"
                        value="draft"
                        disabled={busy}
                        className="rounded-md border border-stone-300 dark:border-stone-700 px-4 py-2 text-sm font-semibold text-stone-800 dark:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-900 disabled:opacity-60"
                    >
                        {saving === 'draft' ? <Loader2 size={16} className="animate-spin" /> : secondaryLabel}
                    </button>
                    <button
                        type="submit"
                        value="publish"
                        disabled={busy}
                        className="inline-flex min-w-[96px] items-center justify-center rounded-md bg-emerald-700 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-800 disabled:opacity-60"
                    >
                        {saving === 'publish' ? <Loader2 size={16} className="animate-spin" /> : primaryLabel}
                    </button>
                </div>
            </div>

            {error && (
                <div
                    role="alert"
                    className="mb-6 flex items-start gap-3 rounded-md border border-red-200 dark:border-red-900 bg-red-50 dark:bg-red-950/40 p-4 text-sm text-red-800 dark:text-red-300"
                >
                    <AlertCircle size={18} className="mt-0.5 flex-shrink-0" />
                    <p className="flex-1">{error}</p>
                    <button type="button" onClick={() => setError('')} aria-label="Dismiss" className="opacity-70 hover:opacity-100">
                        <X size={16} />
                    </button>
                </div>
            )}

            <div className="grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,1fr)_320px]">
                {/* ---------- Writing area ---------- */}
                <div className="min-w-0 space-y-6">
                    <textarea
                        required
                        rows={2}
                        value={title}
                        onChange={handleTitleChange}
                        aria-label="Post title"
                        placeholder="Post title"
                        className="w-full resize-none border-0 bg-transparent p-0 text-4xl font-semibold leading-tight tracking-tight text-stone-900 dark:text-white placeholder:text-stone-300 dark:placeholder:text-stone-700 focus:outline-none focus:ring-0"
                    />

                    <Field label="Summary" counter={`${excerpt.length}/160`} hint="Shown on the blog page and under the headline on the post.">
                        <textarea
                            rows={2}
                            value={excerpt}
                            onChange={(e) => setExcerpt(e.target.value)}
                            className={inputClass}
                            placeholder="One or two sentences that tell readers what they’ll learn"
                        />
                    </Field>

                    <div
                        className="
                            [&_.ql-toolbar]:rounded-t-md [&_.ql-toolbar]:border-stone-300 dark:[&_.ql-toolbar]:border-stone-700 dark:[&_.ql-toolbar]:bg-stone-900
                            [&_.ql-container]:rounded-b-md [&_.ql-container]:border-stone-300 dark:[&_.ql-container]:border-stone-700 [&_.ql-container]:bg-white dark:[&_.ql-container]:bg-stone-950
                            [&_.ql-editor]:min-h-[480px] [&_.ql-editor]:px-5 [&_.ql-editor]:py-4 [&_.ql-editor]:text-[17px] [&_.ql-editor]:leading-relaxed
                            [&_.ql-editor]:text-stone-900 dark:[&_.ql-editor]:text-stone-100
                            dark:[&_.ql-editor.ql-blank::before]:text-stone-600
                            dark:[&_.ql-stroke]:!stroke-stone-300 dark:[&_.ql-fill]:!fill-stone-300 dark:[&_.ql-picker]:!text-stone-300
                            dark:[&_.ql-picker-options]:!bg-stone-900 dark:[&_.ql-picker-options]:!border-stone-700
                        "
                    >
                        <ReactQuill
                            theme="snow"
                            value={content}
                            onChange={setContent}
                            modules={modules}
                            placeholder="Start writing…"
                        />
                    </div>
                </div>

                {/* ---------- Settings sidebar ---------- */}
                <aside className="space-y-6">
                    <Panel title="Post settings">
                        <Field label="Category" hint="Becomes a filter tab on the blog page. Reuse the exact name to group posts.">
                            <input
                                type="text"
                                required
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                                className={inputClass}
                                placeholder="e.g. Dog food"
                            />
                        </Field>

                        <Field label="URL slug" hint={`/blogs/${slug || 'your-post-title'}`}>
                            <input
                                type="text"
                                required
                                value={slug}
                                onChange={(e) => {
                                    setSlugTouched(true);
                                    setSlug(slugify(e.target.value));
                                }}
                                className={`${inputClass} font-mono`}
                                placeholder="post-url-slug"
                            />
                        </Field>

                        <div className="flex items-start justify-between gap-4">
                            <div>
                                <p className="text-sm font-medium text-stone-700 dark:text-stone-300" id="featured-label">
                                    Feature this post
                                </p>
                                <p className="mt-1 text-xs text-stone-500 dark:text-stone-400">
                                    The newest featured post leads the blog page.
                                </p>
                            </div>
                            <button
                                type="button"
                                role="switch"
                                aria-checked={featured}
                                aria-labelledby="featured-label"
                                onClick={() => setFeatured((v) => !v)}
                                className={`relative mt-0.5 h-6 w-11 flex-shrink-0 rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 focus-visible:ring-offset-2 ${
                                    featured ? 'bg-emerald-700' : 'bg-stone-300 dark:bg-stone-700'
                                }`}
                            >
                                <span
                                    className={`absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white transition-transform motion-reduce:transition-none ${
                                        featured ? 'translate-x-5' : ''
                                    }`}
                                />
                            </button>
                        </div>
                    </Panel>

                    <Panel title="Cover image">
                        {coverImage ? (
                            <div className="relative aspect-video overflow-hidden rounded-md border border-stone-200 dark:border-stone-800">
                                <Image src={coverImage} alt="Cover preview" fill sizes="320px" className="object-cover" />
                                <button
                                    type="button"
                                    onClick={() => setCoverImage('')}
                                    aria-label="Remove cover image"
                                    className="absolute right-2 top-2 rounded-md bg-stone-900/80 p-1.5 text-white hover:bg-stone-900"
                                >
                                    <X size={14} />
                                </button>
                            </div>
                        ) : (
                            <div className="relative flex flex-col items-center justify-center rounded-md border border-dashed border-stone-300 dark:border-stone-700 p-8 text-center text-stone-500 hover:bg-stone-50 dark:hover:bg-stone-900">
                                {uploading ? <Loader2 className="mb-2 animate-spin" /> : <Upload size={24} className="mb-2" />}
                                <p className="text-sm font-medium">{uploading ? 'Reading image…' : 'Upload an image'}</p>
                                <p className="mt-1 text-xs">JPG or PNG, up to 1 MB. 16:9 works best.</p>
                                <input
                                    type="file"
                                    accept="image/*"
                                    aria-label="Upload cover image"
                                    onChange={handleImageUpload}
                                    disabled={uploading}
                                    className="absolute inset-0 cursor-pointer opacity-0"
                                />
                            </div>
                        )}
                    </Panel>

                    <Panel title="Search appearance">
                        {/* Live preview of how the post may look in search results */}
                        <div className="rounded-md bg-stone-50 dark:bg-stone-900 p-3">
                            <p className="truncate text-xs text-stone-500 dark:text-stone-400">/blogs/{slug || 'your-post-title'}</p>
                            <p className="mt-0.5 line-clamp-2 text-base text-blue-700 dark:text-blue-400">
                                {seoTitle || title || 'Post title'}
                            </p>
                            <p className="mt-0.5 line-clamp-2 text-xs text-stone-600 dark:text-stone-400">
                                {seoDescription || excerpt || 'The summary or meta description appears here.'}
                            </p>
                        </div>

                        <Field label="Meta title" counter={`${seoTitle.length}/60`} hint="Leave empty to use the post title.">
                            <input type="text" value={seoTitle} onChange={(e) => setSeoTitle(e.target.value)} className={inputClass} />
                        </Field>
                        <Field label="Meta description" counter={`${seoDescription.length}/160`} hint="Leave empty to use the summary.">
                            <textarea rows={3} value={seoDescription} onChange={(e) => setSeoDescription(e.target.value)} className={inputClass} />
                        </Field>
                        <Field label="Keywords" hint="Separate with commas. Shown as topics at the end of the post.">
                            <input
                                type="text"
                                value={seoKeywords}
                                onChange={(e) => setSeoKeywords(e.target.value)}
                                className={inputClass}
                                placeholder="dogs, food, health"
                            />
                        </Field>
                    </Panel>
                </aside>
            </div>
        </form>
    );
}