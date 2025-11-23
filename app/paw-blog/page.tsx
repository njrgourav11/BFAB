"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Search, Heart, MessageCircle, Share2, Dog, Cat, Pill, Sparkles, Clock, User, ArrowRight, Tag } from 'lucide-react';

const blogPosts = [
  {
    id: 1,
    title: 'The Best Diet for Your Senior Dog',
    excerpt: 'As your dog gets older, their nutritional needs change. In this article, we explore the best diets for senior dogs to keep them healthy and active.',
    slug: 'senior-dog-diet',
    category: 'Senior Care',
    author: 'Dr. Sarah Johnson',
    date: 'Mar 15, 2024',
    readTime: '5 min read',
    image: '/globe.svg',
    likes: 234,
    comments: 18,
    featured: true,
    tags: ['Senior Dogs', 'Nutrition', 'Health'],
  },
  {
    id: 2,
    title: 'Choosing the Right Food for Your Kitten',
    excerpt: 'Kittens have unique dietary requirements to support their growth and development. Learn how to choose the right food for your new furry friend.',
    slug: 'kitten-food-guide',
    category: 'Kittens',
    author: 'Jane Smith',
    date: 'Mar 10, 2024',
    readTime: '4 min read',
    image: '/next.svg',
    likes: 189,
    comments: 12,
    featured: false,
    tags: ['Kittens', 'Growth', 'Nutrition'],
  },
  {
    id: 3,
    title: 'The Benefits of Grain-Free Pet Food',
    excerpt: 'Grain-free pet food has become increasingly popular in recent years. Discover the benefits of a grain-free diet for your pet and find out if it\'s the right choice for them.',
    slug: 'grain-free-benefits',
    category: 'Nutrition Tips',
    author: 'Dr. John Doe',
    date: 'Mar 8, 2024',
    readTime: '6 min read',
    image: '/file.svg',
    likes: 456,
    comments: 34,
    featured: true,
    tags: ['Grain-Free', 'Diet', 'Wellness'],
  },
  {
    id: 4,
    title: 'Skin & Coat Health: A Complete Guide',
    excerpt: 'Learn how proper nutrition impacts your pet\'s skin and coat health. We explore the best ingredients and supplements for a shiny, healthy coat.',
    slug: 'skin-coat-guide',
    category: 'Health Benefits',
    author: 'Emily Watson',
    date: 'Mar 5, 2024',
    readTime: '7 min read',
    image: '/globe.svg',
    likes: 312,
    comments: 28,
    featured: false,
    tags: ['Skin Health', 'Coat Care', 'Supplements'],
  },
  {
    id: 5,
    title: 'Puppy Nutrition 101: First Year Essentials',
    excerpt: 'Everything new puppy parents need to know about feeding their puppies for optimal growth and development.',
    slug: 'puppy-nutrition',
    category: 'Puppies',
    author: 'Dr. Sarah Johnson',
    date: 'Feb 28, 2024',
    readTime: '5 min read',
    image: '/next.svg',
    likes: 523,
    comments: 41,
    featured: true,
    tags: ['Puppies', 'Growth', 'First Year'],
  },
  {
    id: 6,
    title: 'Joint Health for Active Pets',
    excerpt: 'Active dogs need proper joint support. Discover the best foods and supplements to keep your pet mobile and pain-free.',
    slug: 'joint-health',
    category: 'Senior Care',
    author: 'Dr. Peter Jones',
    date: 'Feb 25, 2024',
    readTime: '5 min read',
    image: '/file.svg',
    likes: 267,
    comments: 19,
    featured: false,
    tags: ['Joint Health', 'Active Dogs', 'Wellness'],
  },
];

const categories = ['All', 'Senior Care', 'Kittens', 'Puppies', 'Nutrition Tips', 'Health Benefits'];

const PawBlogPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredPosts = blogPosts.filter((post) => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const featuredPosts = blogPosts.filter(post => post.featured);

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
            <h1 className="text-5xl md:text-6xl font-bold mb-6 tracking-tight">Paw Blog</h1>
            <p className="text-xl text-gray-400 leading-relaxed">
              Expert advice, nutrition tips, and health guides to help you give your pet the best life possible.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Search Section */}
      <section className="sticky top-0 z-30 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-gray-200 dark:border-slate-800 py-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-6 items-center justify-between">
            {/* Category Filters */}
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

            {/* Search Bar */}
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

      {/* Featured Posts Section */}
      {filteredPosts.length > 0 && selectedCategory === 'All' && !searchTerm && (
        <section className="py-16 border-b border-gray-200 dark:border-slate-800">
          <div className="container mx-auto px-4">
            <div className="flex items-center gap-3 mb-10">
              <Sparkles className="text-yellow-500" size={24} />
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Featured Stories</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredPosts.map((post, index) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="group cursor-pointer"
                >
                  <div className="relative h-64 rounded-2xl overflow-hidden mb-6">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-4 left-4 bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm px-3 py-1 rounded-lg text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white">
                      {post.category}
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                      <span className="flex items-center gap-1"><Clock size={14} /> {post.readTime}</span>
                      <span className="flex items-center gap-1"><User size={14} /> {post.author}</span>
                    </div>

                    <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {post.title}
                    </h3>

                    <p className="text-gray-600 dark:text-gray-400 line-clamp-2">
                      {post.excerpt}
                    </p>

                    <Link href={`/paw-blog/${post.slug}`} className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 font-semibold hover:gap-3 transition-all">
                      Read Article <ArrowRight size={16} />
                    </Link>
                  </div>
                </motion.div>
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

          {filteredPosts.length === 0 ? (
            <div className="text-center py-20 bg-white dark:bg-slate-900 rounded-2xl border border-gray-100 dark:border-slate-800">
              <div className="inline-flex p-4 bg-gray-100 dark:bg-slate-800 rounded-full mb-4">
                <Search size={32} className="text-gray-400" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">No articles found</h3>
              <p className="text-gray-500 dark:text-gray-400">Try adjusting your search or filter to find what you're looking for.</p>
              <button
                onClick={() => { setSearchTerm(''); setSelectedCategory('All'); }}
                className="mt-6 text-blue-600 dark:text-blue-400 font-semibold hover:underline"
              >
                Clear all filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map((post, index) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white dark:bg-slate-900 rounded-2xl overflow-hidden shadow-sm border border-gray-100 dark:border-slate-800 hover:shadow-md transition-all group flex flex-col h-full"
                >
                  <div className="relative h-48 overflow-hidden bg-gray-100 dark:bg-slate-800">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>

                  <div className="p-6 flex flex-col flex-grow">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-xs font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 px-3 py-1 rounded-full">
                        {post.category}
                      </span>
                      <span className="text-xs text-gray-500 dark:text-gray-400">{post.date}</span>
                    </div>

                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3 line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {post.title}
                    </h3>

                    <p className="text-gray-600 dark:text-gray-400 text-sm mb-6 line-clamp-3 flex-grow">
                      {post.excerpt}
                    </p>

                    <div className="pt-6 border-t border-gray-100 dark:border-slate-800 flex items-center justify-between mt-auto">
                      <div className="flex items-center gap-4 text-gray-500 dark:text-gray-400 text-sm">
                        <button className="flex items-center gap-1.5 hover:text-red-500 transition-colors">
                          <Heart size={16} />
                          <span>{post.likes}</span>
                        </button>
                        <button className="flex items-center gap-1.5 hover:text-blue-500 transition-colors">
                          <MessageCircle size={16} />
                          <span>{post.comments}</span>
                        </button>
                      </div>
                      <Link href={`/paw-blog/${post.slug}`} className="text-slate-900 dark:text-white font-semibold text-sm hover:underline">
                        Read More
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default PawBlogPage;