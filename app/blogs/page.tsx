"use client";

import { useEffect, useState } from 'react';
import { getAllBlogs } from '@/lib/blog-utils';
import { BlogPost } from '@/lib/types';
import Link from 'next/link';
import { Search, Sparkles, Clock, User, ArrowRight, Heart, MessageCircle } from 'lucide-react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Skeleton } from '@/components/ui/skeleton';

export default function BlogsPage() {
    const [blogs, setBlogs] = useState<BlogPost[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');

    useEffect(() => {
        const fetchBlogs = async () => {
            const data = await getAllBlogs(true); // Only published
            setBlogs(data);
            setLoading(false);
        };
        fetchBlogs();
    }, []);

    // Extract categories
    const categories = ['All', ...Array.from(new Set(blogs.map(b => b.category).filter(Boolean)))];

    const filteredBlogs = blogs.filter((blog) => {
        const matchesSearch = blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            blog.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategory === 'All' || blog.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    const featuredBlogs = blogs.filter(b => b.featured).slice(0, 3);

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 dark:bg-slate-950 font-sans">
                {/* Hero Skeleton */}
                <section className="bg-slate-900 py-24 relative overflow-hidden">
                    <div className="container mx-auto px-4 relative z-10 text-center">
                        <Skeleton className="h-16 w-1/2 mx-auto bg-slate-800 mb-6" />
                        <Skeleton className="h-6 w-1/3 mx-auto bg-slate-800" />
                    </div>
                </section>

                {/* Content Skeleton */}
                <div className="container mx-auto px-4 py-12">
                    <div className="flex flex-col md:flex-row gap-6 mb-12">
                        <Skeleton className="h-12 w-full md:w-1/3" />
                        <div className="flex gap-2 w-full overflow-hidden">
                            {[1, 2, 3, 4].map(i => <Skeleton key={i} className="h-10 w-24 rounded-lg flex-shrink-0" />)}
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[1, 2, 3, 4, 5, 6].map((i) => (
                            <div key={i} className="bg-white dark:bg-slate-900 rounded-2xl overflow-hidden border border-gray-100 dark:border-slate-800 space-y-4">
                                <Skeleton className="h-56 w-full" />
                                <div className="p-6 space-y-4">
                                    <div className="flex justify-between">
                                        <Skeleton className="h-4 w-20" />
                                        <Skeleton className="h-4 w-20" />
                                    </div>
                                    <Skeleton className="h-8 w-full" />
                                    <Skeleton className="h-4 w-full" />
                                    <Skeleton className="h-4 w-2/3" />
                                    <div className="pt-4 flex justify-between">
                                        <Skeleton className="h-4 w-16" />
                                        <Skeleton className="h-4 w-16" />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-slate-950 transition-colors duration-300 font-sans">
            {/* Hero Section */}
            <section className="bg-slate-900 text-white py-24 relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>
                <div className="container mx-auto px-4 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-center max-w-3xl mx-auto"
                    >
                        <h1 className="text-5xl md:text-6xl font-bold mb-6 tracking-tight">Our Blog</h1>
                        <p className="text-xl text-gray-400 leading-relaxed">
                            Expert advice, nutrition tips, and health guides to help you give your pet the best life possible.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Search & Filters */}
            <section className="sticky top-0 z-30 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-gray-200 dark:border-slate-800 py-6">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col md:flex-row gap-6 items-center justify-between">
                        {/* Categories */}
                        <div className="flex overflow-x-auto pb-2 md:pb-0 gap-2 w-full md:w-auto no-scrollbar">
                            {categories.map((category) => (
                                <button
                                    key={category}
                                    onClick={() => setSelectedCategory(category)}
                                    className={`px-4 py-2 rounded-lg text-sm font-semibold whitespace-nowrap transition-all duration-300 ${selectedCategory === category
                                        ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900'
                                        : 'bg-gray-100 dark:bg-slate-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-slate-700'
                                        }`}
                                >
                                    {category}
                                </button>
                            ))}
                        </div>

                        {/* Search */}
                        <div className="relative w-full md:w-80">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                            <input
                                type="text"
                                placeholder="Search articles..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-11 pr-4 py-2.5 bg-gray-100 dark:bg-slate-800 border-none rounded-xl text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Featured Section (if any and filtering is clear) */}
            {featuredBlogs.length > 0 && selectedCategory === 'All' && !searchTerm && (
                <section className="py-16 border-b border-gray-200 dark:border-slate-800">
                    <div className="container mx-auto px-4">
                        <div className="flex items-center gap-3 mb-10">
                            <Sparkles className="text-yellow-500" size={24} />
                            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Featured Stories</h2>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {featuredBlogs.map((blog, index) => (
                                <Link href={`/blogs/${blog.slug}`} key={blog.id}>
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.5, delay: index * 0.1 }}
                                        viewport={{ once: true }}
                                        className="group cursor-pointer"
                                    >
                                        <div className="relative h-64 rounded-2xl overflow-hidden mb-6">
                                            <Image
                                                src={blog.coverImage || '/placeholder.svg'}
                                                alt={blog.title}
                                                fill
                                                className="object-cover group-hover:scale-105 transition-transform duration-500"
                                            />
                                            <div className="absolute top-4 left-4 bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm px-3 py-1 rounded-lg text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white">
                                                {blog.category}
                                            </div>
                                        </div>
                                        <div className="space-y-3">
                                            <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                                                <span className="flex items-center gap-1"><Clock size={14} /> {new Date(blog.createdAt).toLocaleDateString()}</span>
                                                <span className="flex items-center gap-1"><User size={14} /> {blog.author}</span>
                                            </div>
                                            <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                                {blog.title}
                                            </h3>
                                            <p className="text-gray-600 dark:text-gray-400 line-clamp-2">
                                                {blog.excerpt}
                                            </p>
                                            <span className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 font-semibold hover:gap-3 transition-all">
                                                Read Article <ArrowRight size={16} />
                                            </span>
                                        </div>
                                    </motion.div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* All Posts Grid */}
            <section className="py-16">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold mb-10 text-gray-900 dark:text-white">
                        {selectedCategory === 'All' ? 'Latest Articles' : `${selectedCategory} Articles`}
                    </h2>

                    {filteredBlogs.length === 0 ? (
                        <div className="text-center py-20 bg-white dark:bg-slate-900 rounded-2xl border border-gray-100 dark:border-slate-800">
                            <div className="inline-flex p-4 bg-gray-100 dark:bg-slate-800 rounded-full mb-4">
                                <Search size={32} className="text-gray-400" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">No articles found</h3>
                            <p className="text-gray-500 dark:text-gray-400">Try adjusting your filters.</p>
                            <button
                                onClick={() => { setSearchTerm(''); setSelectedCategory('All'); }}
                                className="mt-6 text-blue-600 dark:text-blue-400 font-semibold hover:underline"
                            >
                                Clear all filters
                            </button>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {filteredBlogs.map((blog, index) => (
                                <Link href={`/blogs/${blog.slug}`} key={blog.id}>
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.5, delay: index * 0.1 }}
                                        viewport={{ once: true }}
                                        className="bg-white dark:bg-slate-900 rounded-2xl overflow-hidden shadow-sm border border-gray-100 dark:border-slate-800 hover:shadow-md transition-all group flex flex-col h-full"
                                    >
                                        <div className="relative h-48 overflow-hidden bg-gray-100 dark:bg-slate-800">
                                            <Image
                                                src={blog.coverImage || '/placeholder.svg'}
                                                alt={blog.title}
                                                fill
                                                className="object-cover group-hover:scale-105 transition-transform duration-500"
                                            />
                                        </div>
                                        <div className="p-6 flex flex-col flex-grow">
                                            <div className="flex items-center justify-between mb-4">
                                                <span className="text-xs font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 px-3 py-1 rounded-full">
                                                    {blog.category}
                                                </span>
                                                <span className="text-xs text-gray-500 dark:text-gray-400">
                                                    {new Date(blog.createdAt).toLocaleDateString()}
                                                </span>
                                            </div>
                                            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3 line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                                {blog.title}
                                            </h3>
                                            <p className="text-gray-600 dark:text-gray-400 text-sm mb-6 line-clamp-3 flex-grow">
                                                {blog.excerpt}
                                            </p>
                                            <div className="pt-6 border-t border-gray-100 dark:border-slate-800 flex items-center justify-between mt-auto">
                                                <div className="flex items-center gap-4 text-gray-500 dark:text-gray-400 text-sm">
                                                    {/* Placeholders for likes/comments if not available in data */}
                                                    <span className="flex items-center gap-1.5"><Heart size={16} /> 24</span>
                                                    <span className="flex items-center gap-1.5"><MessageCircle size={16} /> 5</span>
                                                </div>
                                                <span className="text-slate-900 dark:text-white font-semibold text-sm hover:underline">
                                                    Read More
                                                </span>
                                            </div>
                                        </div>
                                    </motion.div>
                                </Link>
                            ))}
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
}
