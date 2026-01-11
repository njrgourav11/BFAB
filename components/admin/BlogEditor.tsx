'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import { BlogPost } from '@/lib/types';
import { createBlog, updateBlog } from '@/lib/blog-utils';
import { ArrowLeft, Upload, Loader2, Save } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import 'react-quill-new/dist/quill.snow.css';

// Dynamic import for ReactQuill to avoid SSR issues
// Dynamic import for ReactQuill to avoid SSR issues
const ReactQuill = dynamic(
    () => {
        return import('react-quill-new').then(mod => mod.default || mod);
    },
    { ssr: false }
) as any;

interface BlogEditorProps {
    initialData?: BlogPost;
    isEditing?: boolean;
}

export default function BlogEditor({ initialData, isEditing = false }: BlogEditorProps) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [uploading, setUploading] = useState(false);

    // Form State
    const [title, setTitle] = useState(initialData?.title || '');
    const [slug, setSlug] = useState(initialData?.slug || '');
    const [category, setCategory] = useState(initialData?.category || '');
    const [excerpt, setExcerpt] = useState(initialData?.excerpt || '');
    const [content, setContent] = useState(initialData?.content || '');
    const [coverImage, setCoverImage] = useState(initialData?.coverImage || '');
    const [published, setPublished] = useState(initialData?.published ?? false); // Default false
    const [seoTitle, setSeoTitle] = useState(initialData?.seoTitle || '');
    const [seoDescription, setSeoDescription] = useState(initialData?.seoDescription || '');
    const [seoKeywords, setSeoKeywords] = useState(initialData?.seoKeywords?.join(', ') || '');

    const generateSlug = (val: string) => {
        return val
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)+/g, '');
    };

    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value);
        if (!isEditing) {
            setSlug(generateSlug(e.target.value));
        }
    };

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        // Check file size (limit to 1MB approx to be safe for Firestore)
        if (file.size > 1024 * 1024) {
            alert("File size is too large. Please select an image under 1MB.");
            return;
        }

        setUploading(true);
        const reader = new FileReader();
        reader.onloadend = () => {
            setCoverImage(reader.result as string);
            setUploading(false);
        };
        reader.onerror = () => {
            console.error("Failed to read file");
            alert("Failed to read file");
            setUploading(false);
        };
        reader.readAsDataURL(file);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        const blogData = {
            title,
            slug,
            category,
            excerpt,
            content,
            coverImage,
            published,
            author: 'Admin', // Hardcoded for now
            seoTitle,
            seoDescription,
            seoKeywords: seoKeywords.split(',').map(k => k.trim()).filter(k => k),
        };

        try {
            if (isEditing && initialData?.id) {
                await updateBlog(initialData.id, blogData);
            } else {
                await createBlog(blogData);
            }
            router.push('/admin/blogs');
        } catch (error) {
            console.error('Error saving blog:', error);
            alert('Failed to save blog post');
        }
        setLoading(false);
    };

    return (
        <div className="max-w-5xl mx-auto pb-20">
            <div className="flex items-center justify-between mb-8">
                <Link
                    href="/admin/blogs"
                    className="flex items-center gap-2 text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors"
                >
                    <ArrowLeft size={20} />
                    Back to Blogs
                </Link>
                <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
                    {isEditing ? 'Edit Blog Post' : 'Create New Post'}
                </h1>
            </div>

            <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Content (Left, 2 cols) */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-4">
                        <div>
                            <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Title</label>
                            <input
                                type="text"
                                required
                                value={title}
                                onChange={handleTitleChange}
                                className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                                placeholder="Enter post title"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Slug</label>
                            <input
                                type="text"
                                required
                                value={slug}
                                onChange={(e) => setSlug(e.target.value)}
                                className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all text-sm font-mono text-slate-500"
                                placeholder="post-url-slug"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Excerpt (Short Summary)</label>
                            <textarea
                                rows={3}
                                value={excerpt}
                                onChange={(e) => setExcerpt(e.target.value)}
                                className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                                placeholder="Brief description for listing pages..."
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Content</label>
                            <div className="prose-editor text-black">
                                {/* Ensure text is visible in dark mode by forcing black/appropriate color if Quills CSS messes up */}
                                <ReactQuill
                                    theme="snow"
                                    value={content}
                                    onChange={setContent}
                                    className="h-96 mb-12"
                                    modules={{
                                        toolbar: [
                                            [{ 'header': [1, 2, 3, false] }],
                                            ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                                            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
                                            ['link', 'image'],
                                            ['clean']
                                        ]
                                    }}
                                />
                            </div>
                        </div>
                    </div>

                    {/* SEO Section */}
                    <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-4">
                        <h3 className="text-xl font-bold text-slate-900 dark:text-white">SEO Settings</h3>
                        <div>
                            <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Meta Title</label>
                            <input type="text" value={seoTitle} onChange={e => setSeoTitle(e.target.value)} className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl" />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Meta Description</label>
                            <textarea rows={2} value={seoDescription} onChange={e => setSeoDescription(e.target.value)} className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl" />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Keywords (comma separated)</label>
                            <input type="text" value={seoKeywords} onChange={e => setSeoKeywords(e.target.value)} className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl" placeholder="dogs, food, health" />
                        </div>
                    </div>
                </div>

                {/* Sidebar (Right, 1 col) */}
                <div className="space-y-6">
                    {/* Publish Card */}
                    <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-6">
                        <div className="flex items-center justify-between">
                            <span className="font-bold text-slate-700 dark:text-slate-300">Published</span>
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input type="checkbox" checked={published} onChange={e => setPublished(e.target.checked)} className="sr-only peer" />
                                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                            </label>
                        </div>

                        <button
                            onClick={handleSubmit}
                            disabled={loading}
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-all disabled:opacity-70"
                        >
                            {loading ? <Loader2 className="animate-spin" /> : <Save size={20} />}
                            {isEditing ? 'Update Post' : 'Create Post'}
                        </button>
                    </div>

                    {/* Category */}
                    <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800">
                        <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Category</label>
                        <input
                            type="text"
                            required
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl"
                            placeholder="e.g. Dog Food"
                        />
                    </div>

                    {/* Featured Image */}
                    <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-4">
                        <label className="block text-sm font-bold text-slate-700 dark:text-slate-300">Featured Image</label>

                        {coverImage ? (
                            <div className="relative aspect-video rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800">
                                <Image src={coverImage} alt="Cover" fill className="object-cover" />
                                <button
                                    onClick={() => setCoverImage('')}
                                    type="button"
                                    className="absolute top-2 right-2 bg-red-600 text-white p-1 rounded-full hover:bg-red-700 transition-colors"
                                >
                                    <Loader2 size={16} className={uploading ? 'animate-spin' : 'hidden'} />
                                    {!uploading && "X"}
                                </button>
                            </div>
                        ) : (
                            <div className="border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-xl p-8 flex flex-col items-center justify-center text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors cursor-pointer relative">
                                {uploading ? (
                                    <Loader2 className="animate-spin mb-2" />
                                ) : (
                                    <Upload size={32} className="mb-2" />
                                )}
                                <p className="text-sm">{uploading ? 'Uploading...' : 'Click to upload'}</p>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageUpload}
                                    disabled={uploading}
                                    className="absolute inset-0 opacity-0 cursor-pointer"
                                />
                            </div>
                        )}
                    </div>
                </div>
            </form>
        </div>
    );
}
