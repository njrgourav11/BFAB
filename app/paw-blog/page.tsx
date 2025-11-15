"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Search, Heart, MessageCircle, Share2, Dog, Cat, Pill, Sparkles, Clock, User } from 'lucide-react';

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
    <div className="min-h-screen bg-white dark:bg-black transition-colors duration-300">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 dark:from-amber-700 dark:via-orange-700 dark:to-red-700 text-white py-16 transition-colors duration-300">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-4">🐾 Paw Blog</h1>
            <p className="text-xl text-orange-100 dark:text-orange-200">Expert tips and guides for happy, healthy pets</p>
          </motion.div>
        </div>
      </section>

      {/* Search Section */}
      <section className="py-8 bg-gray-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 transition-colors duration-300">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="relative mb-8">
              <Search className="absolute left-4 top-3.5 text-gray-400 dark:text-gray-600 transition-colors duration-300" size={20} />
              <input
                type="text"
                placeholder="Search articles, tags..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border-2 border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-800 dark:text-white rounded-full focus:outline-none focus:border-amber-500 dark:focus:border-amber-400 transition-colors duration-300 placeholder-gray-400 dark:placeholder-gray-600"
              />
            </div>

            {/* Category Filters */}
            <div className="flex flex-wrap gap-3">
              {categories.map((category) => (
                <motion.button
                  key={category}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-6 py-2 rounded-full font-semibold transition-all duration-300 ${
                    selectedCategory === category
                      ? 'bg-gradient-to-r from-amber-500 to-orange-500 dark:from-amber-600 dark:to-orange-600 text-white'
                      : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                  }`}
                >
                  {category}
                </motion.button>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Posts Section */}
      {filteredPosts.length > 0 && (
        <section className="py-16 bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
          <div className="container mx-auto px-4">
            <motion.h2
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-4xl font-bold mb-12 text-gray-800 dark:text-white transition-colors duration-300"
            >
              ⭐ Featured Articles
            </motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
              {featuredPosts.filter(post => 
                filteredPosts.some(fp => fp.id === post.id)
              ).map((post, index) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="group bg-gradient-to-br from-amber-50 dark:from-amber-900/20 to-orange-50 dark:to-orange-900/20 rounded-lg overflow-hidden shadow-lg dark:shadow-lg dark:shadow-black/30 hover:shadow-2xl dark:hover:shadow-2xl dark:hover:shadow-black/50 transition-all duration-300 border border-amber-200 dark:border-amber-800 relative"
                >
                  {/* Featured Badge */}
                  <div className="absolute top-4 right-4 bg-gradient-to-r from-amber-400 to-orange-400 dark:from-amber-500 dark:to-orange-500 text-white px-4 py-2 rounded-full text-sm font-bold z-10 transition-colors duration-300">
                    ⭐ Featured
                  </div>

                  {/* Image */}
                  <div className="relative h-48 overflow-hidden bg-gray-200 dark:bg-gray-700 transition-colors duration-300">
                    <Image
                      src={post.image}
                      alt={post.title}
                      width={400}
                      height={200}
                      className="w-full h-full object-cover group-hover:scale-110 transition duration-300"
                    />
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="inline-block bg-gradient-to-r from-amber-500 to-orange-500 dark:from-amber-600 dark:to-orange-600 text-white px-3 py-1 rounded-full text-xs font-semibold transition-colors duration-300">
                        {post.category}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-3 line-clamp-2 group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors duration-300">
                      {post.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2 transition-colors duration-300">{post.excerpt}</p>

                    {/* Meta Info */}
                    <div className="flex flex-wrap gap-4 text-xs text-gray-600 dark:text-gray-400 mb-4 pb-4 border-b border-gray-200 dark:border-gray-700 transition-colors duration-300">
                      <div className="flex items-center gap-1">
                        <User size={14} />
                        {post.author}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock size={14} />
                        {post.readTime}
                      </div>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {post.tags.slice(0, 2).map((tag) => (
                        <span key={tag} className="text-xs bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-2 py-1 rounded transition-colors duration-300">
                          #{tag}
                        </span>
                      ))}
                    </div>

                    {/* Read More Link */}
                    <Link
                      href={`/paw-blog/${post.slug}`}
                      className="inline-block bg-gradient-to-r from-amber-500 to-orange-500 dark:from-amber-600 dark:to-orange-600 text-white px-4 py-2 rounded-full font-semibold hover:shadow-lg dark:hover:shadow-lg dark:hover:shadow-amber-900/50 transition-all duration-300"
                    >
                      Read Article →
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* All Posts Grid */}
      <section className="py-16 bg-white dark:bg-black transition-colors duration-300">
        <div className="container mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-4xl font-bold mb-12 text-gray-800 dark:text-white transition-colors duration-300"
          >
            {selectedCategory === 'All' ? 'All Articles' : `${selectedCategory} Articles`}
          </motion.h2>

          {filteredPosts.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <p className="text-xl text-gray-600 dark:text-gray-400 transition-colors duration-300">No articles found. Try a different search or category.</p>
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map((post, index) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="group bg-white dark:bg-gray-900 rounded-lg overflow-hidden shadow-lg dark:shadow-lg dark:shadow-black/30 hover:shadow-2xl dark:hover:shadow-2xl dark:hover:shadow-black/50 transition-all duration-300 transform hover:scale-105 border border-gray-200 dark:border-gray-700"
                >
                  {/* Image */}
                  <div className="relative h-48 overflow-hidden bg-gray-200 dark:bg-gray-700 transition-colors duration-300">
                    <Image
                      src={post.image}
                      alt={post.title}
                      width={400}
                      height={200}
                      className="w-full h-full object-cover group-hover:scale-110 transition duration-300"
                    />
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <span className="inline-block bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 px-3 py-1 rounded-full text-xs font-semibold transition-colors duration-300">
                        {post.category}
                      </span>
                      <span className="text-xs text-gray-500 dark:text-gray-400 transition-colors duration-300">{post.date}</span>
                    </div>

                    <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-2 line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                      {post.title}
                    </h3>

                    <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2 transition-colors duration-300">{post.excerpt}</p>

                    {/* Meta Info */}
                    <div className="flex flex-wrap gap-3 text-xs text-gray-600 dark:text-gray-400 mb-4 pb-4 border-b border-gray-200 dark:border-gray-700 transition-colors duration-300">
                      <div className="flex items-center gap-1">
                        <User size={14} />
                        {post.author}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock size={14} />
                        {post.readTime}
                      </div>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {post.tags.map((tag) => (
                        <span key={tag} className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-2 py-1 rounded transition-colors duration-300">
                          #{tag}
                        </span>
                      ))}
                    </div>

                    {/* Engagement & CTA */}
                    <div className="flex items-center justify-between">
                      <div className="flex gap-4 text-gray-600 dark:text-gray-400 transition-colors duration-300">
                        <button className="flex items-center gap-1 hover:text-red-500 dark:hover:text-red-400 transition transition-colors duration-300">
                          <Heart size={16} />
                          <span className="text-xs">{post.likes}</span>
                        </button>
                        <button className="flex items-center gap-1 hover:text-blue-500 dark:hover:text-blue-400 transition transition-colors duration-300">
                          <MessageCircle size={16} />
                          <span className="text-xs">{post.comments}</span>
                        </button>
                        <button className="flex items-center gap-1 hover:text-green-500 dark:hover:text-green-400 transition transition-colors duration-300">
                          <Share2 size={16} />
                        </button>
                      </div>
                      <Link
                        href={`/paw-blog/${post.slug}`}
                        className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-semibold text-sm transition-colors duration-300"
                      >
                        Read →
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