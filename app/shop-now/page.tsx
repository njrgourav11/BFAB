"use client";
import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ShoppingCart, Star, Filter, Grid3x3, LayoutList, Smile, Pill, Sparkles, Activity, Cookie, Dog, Cat } from 'lucide-react';

const shopCategories = [
  { id: 1, name: 'Dental Health', icon: Smile, color: 'from-blue-400 to-blue-600' },
  { id: 2, name: 'Gut Health', icon: Pill, color: 'from-green-400 to-green-600' },
  { id: 3, name: 'Skin & Coat Health', icon: Sparkles, color: 'from-pink-400 to-pink-600' },
  { id: 4, name: 'Hip & Joint Health', icon: Activity, color: 'from-yellow-400 to-yellow-600' },
  { id: 5, name: 'Treats', icon: Cookie, color: 'from-orange-400 to-orange-600' },
  { id: 6, name: 'Canine', icon: Dog, color: 'from-amber-400 to-amber-600' },
  { id: 7, name: 'Feline', icon: Cat, color: 'from-purple-400 to-purple-600' },
];

const products = [
  {
    id: 1,
    name: 'Premium Dog Food',
    price: '₹59.99',
    image: '/globe.svg',
    rating: 4.9,
    reviews: 328,
    category: 'Canine',
    productCategory: 'Dental Health',
  },
  {
    id: 2,
    name: 'Organic Cat Food',
    price: '₹49.99',
    image: '/globe.svg',
    rating: 4.8,
    reviews: 245,
    category: 'Feline',
    productCategory: 'Gut Health',
  },
  {
    id: 3,
    name: 'Grain-Free Puppy Food',
    price: '₹69.99',
    image: '/globe.svg',
    rating: 5.0,
    reviews: 512,
    category: 'Canine',
    productCategory: 'Skin & Coat Health',
  },
  {
    id: 4,
    name: 'Senior Dog Nutrition',
    price: '₹55.99',
    image: '/globe.svg',
    rating: 4.7,
    reviews: 189,
    category: 'Canine',
    productCategory: 'Hip & Joint Health',
  },
  {
    id: 5,
    name: 'Kitten Growth Formula',
    price: '₹65.99',
    image: '/globe.svg',
    rating: 4.9,
    reviews: 276,
    category: 'Feline',
    productCategory: 'Gut Health',
  },
  {
    id: 6,
    name: 'Weight Management Dog Food',
    price: '₹62.99',
    image: '/globe.svg',
    rating: 4.6,
    reviews: 143,
    category: 'Canine',
    productCategory: 'Hip & Joint Health',
  },
  {
    id: 7,
    name: 'Fish-Based Cat Formula',
    price: '₹54.99',
    image: '/globe.svg',
    rating: 4.8,
    reviews: 198,
    category: 'Feline',
    productCategory: 'Dental Health',
  },
  {
    id: 8,
    name: 'Allergy-Free Dog Food',
    price: '₹72.99',
    image: '/globe.svg',
    rating: 4.9,
    reviews: 421,
    category: 'Canine',
    productCategory: 'Skin & Coat Health',
  },
  {
    id: 9,
    name: 'Delicious Dog Treats',
    price: '₹24.99',
    image: '/globe.svg',
    rating: 4.7,
    reviews: 342,
    category: 'Canine',
    productCategory: 'Treats',
  },
  {
    id: 10,
    name: 'Gourmet Cat Treats',
    price: '₹18.99',
    image: '/globe.svg',
    rating: 4.9,
    reviews: 215,
    category: 'Feline',
    productCategory: 'Treats',
  },
];

const ShopNowPage = () => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedProductCategory, setSelectedProductCategory] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<string>('popular');

  const categories = ['Canine', 'Feline'];

  const filteredProducts = products.filter((p) => {
    if (selectedProductCategory && p.productCategory !== selectedProductCategory) return false;
    if (selectedCategory && p.category !== selectedCategory) return false;
    return true;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'price-low') return parseFloat(a.price.slice(1)) - parseFloat(b.price.slice(1));
    if (sortBy === 'price-high') return parseFloat(b.price.slice(1)) - parseFloat(a.price.slice(1));
    if (sortBy === 'rating') return b.rating - a.rating;
    return 0;
  });

  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen transition-colors duration-300">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-700 text-white py-12">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Products</h1>
            <p className="text-xl text-blue-100">Discover premium nutrition for your beloved pets</p>
          </motion.div>
        </div>
      </section>

      {/* Shop by Category Section */}
      <section className="bg-white dark:bg-gray-800 py-12 border-b border-gray-200 dark:border-gray-700 transition-colors duration-300">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-8"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-gray-100 mb-2">Shop by Category</h2>
            <p className="text-gray-600 dark:text-gray-400">Browse our products by health benefits and pet type</p>
          </motion.div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4">
            {shopCategories.map((cat, index) => {
              const IconComponent = cat.icon;
              const isSelected = selectedProductCategory === cat.name;
              return (
                <motion.button
                  key={cat.id}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  viewport={{ once: true }}
                  onClick={() => setSelectedProductCategory(isSelected ? null : cat.name)}
                  className={`flex flex-col items-center gap-2 p-4 rounded-xl transition duration-300 transform ${
                    isSelected
                      ? `bg-gradient-to-br ₹{cat.color} text-white shadow-lg scale-105 hover:scale-110`
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 hover:scale-105'
                  }`}
                >
                  <IconComponent size={28} />
                  <span className="text-xs font-semibold text-center leading-tight line-clamp-2">
                    {cat.name}
                  </span>
                </motion.button>
              );
            })}
          </div>

          {selectedProductCategory && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="text-center mt-6"
            >
              <p className="text-gray-700 dark:text-gray-300">
                Showing products for: <span className="font-bold text-blue-600 dark:text-blue-400">{selectedProductCategory}</span>
              </p>
              <button
                onClick={() => setSelectedProductCategory(null)}
                className="mt-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 text-sm font-semibold underline transition duration-200"
              >
                Clear filter
              </button>
            </motion.div>
          )}
        </div>
      </section>

      {/* Main Content */}
      <section className="container mx-auto px-4 md:px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar - Filters */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="lg:col-span-1"
          >
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg sticky top-24 transition-colors duration-300">
              <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-6 flex items-center">
                <Filter size={20} className="mr-2 text-blue-600 dark:text-blue-400" />
                Filters
              </h3>

              {/* Pet Type Filter */}
              <div className="mb-6">
                <h4 className="font-semibold text-gray-700 dark:text-gray-300 mb-3">Pet Type</h4>
                <div className="space-y-2">
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="radio"
                      checked={selectedCategory === null}
                      onChange={() => setSelectedCategory(null)}
                      className="w-4 h-4 text-blue-600 dark:text-blue-400 cursor-pointer"
                    />
                    <span className="ml-2 text-gray-700 dark:text-gray-300">All Pets</span>
                  </label>
                  {categories.map((cat) => (
                    <label key={cat} className="flex items-center cursor-pointer">
                      <input
                        type="radio"
                        checked={selectedCategory === cat}
                        onChange={() => setSelectedCategory(cat)}
                        className="w-4 h-4 text-blue-600 dark:text-blue-400 cursor-pointer"
                      />
                      <span className="ml-2 text-gray-700 dark:text-gray-300">{cat}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Health Benefit Filter */}
              <div className="mb-6">
                <h4 className="font-semibold text-gray-700 dark:text-gray-300 mb-3">Health Benefits</h4>
                <div className="space-y-2">
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="radio"
                      checked={selectedProductCategory === null}
                      onChange={() => setSelectedProductCategory(null)}
                      className="w-4 h-4 text-blue-600 dark:text-blue-400 cursor-pointer"
                    />
                    <span className="ml-2 text-gray-700 dark:text-gray-300">All Benefits</span>
                  </label>
                  {shopCategories.map((cat) => (
                    <label key={cat.id} className="flex items-center cursor-pointer">
                      <input
                        type="radio"
                        checked={selectedProductCategory === cat.name}
                        onChange={() => setSelectedProductCategory(cat.name)}
                        className="w-4 h-4 text-blue-600 dark:text-blue-400 cursor-pointer"
                      />
                      <span className="ml-2 text-gray-700 dark:text-gray-300 text-sm">{cat.name}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Sort Filter */}
              <div>
                <h4 className="font-semibold text-gray-700 dark:text-gray-300 mb-3">Sort By</h4>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 focus:outline-none focus:border-blue-600 dark:focus:border-blue-400 transition-colors duration-300"
                >
                  <option value="popular">Most Popular</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                </select>
              </div>
            </div>
          </motion.div>

          {/* Products Section */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="lg:col-span-3"
          >
            {/* View Mode Toggle */}
            <div className="flex justify-between items-center mb-8">
              <p className="text-gray-700 dark:text-gray-300 font-semibold">
                Showing {sortedProducts.length} products
              </p>
              <div className="flex gap-2">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-lg transition duration-300 ₹{
                    viewMode === 'grid'
                      ? 'bg-blue-600 text-white'
                      : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600'
                  }`}
                >
                  <Grid3x3 size={20} />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-lg transition duration-300 ₹{
                    viewMode === 'list'
                      ? 'bg-blue-600 text-white'
                      : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600'
                  }`}
                >
                  <LayoutList size={20} />
                </button>
              </div>
            </div>

            {/* Products Grid */}
            <div
              className={
                viewMode === 'grid'
                  ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6'
                  : 'space-y-4'
              }
            >
              {sortedProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className={
                    viewMode === 'grid'
                      ? 'bg-white dark:bg-gray-800 rounded-lg shadow-lg hover:shadow-xl transition duration-300 hover:scale-105 overflow-hidden group'
                      : 'bg-white dark:bg-gray-800 rounded-lg shadow-lg hover:shadow-xl transition duration-300 p-6 flex gap-6 items-center'
                  }
                >
                  {viewMode === 'grid' ? (
                    <>
                      <div className="relative h-48 bg-gray-100 dark:bg-gray-700 overflow-hidden flex items-center justify-center">
                        <Image
                          src={product.image}
                          alt={product.name}
                          width={150}
                          height={150}
                          className="group-hover:scale-110 transition duration-300"
                        />
                      </div>
                      <div className="p-6 flex flex-col flex-grow">
                        <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-2">{product.name}</h3>
                        <div className="flex items-center mb-3">
                          <div className="flex text-yellow-400">
                            {[...Array(5)].map((_, i) => (
                              <Star key={i} size={14} fill="currentColor" />
                            ))}
                          </div>
                          <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">
                            {product.rating} ({product.reviews})
                          </span>
                        </div>
                        <p className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-4">{product.price}</p>
                        <button className="bg-gradient-to-r from-blue-600 to-blue-700 text-white py-2 px-4 rounded-full hover:from-blue-700 hover:to-blue-800 transition duration-300 font-semibold flex items-center justify-center gap-2 mt-auto">
                          <ShoppingCart size={18} />
                          Add to Cart
                        </button>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="relative w-32 h-32 bg-gray-100 dark:bg-gray-700 rounded-lg overflow-hidden flex-shrink-0 flex items-center justify-center">
                        <Image
                          src={product.image}
                          alt={product.name}
                          width={120}
                          height={120}
                          className="object-contain"
                        />
                      </div>
                      <div className="flex-grow">
                        <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-2">{product.name}</h3>
                        <div className="flex items-center mb-2">
                          <div className="flex text-yellow-400">
                            {[...Array(5)].map((_, i) => (
                              <Star key={i} size={14} fill="currentColor" />
                            ))}
                          </div>
                          <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">
                            {product.rating} ({product.reviews})
                          </span>
                        </div>
                        <p className="text-gray-700 dark:text-gray-300 mb-2">{product.category}</p>
                        <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">{product.price}</p>
                      </div>
                      <button className="bg-gradient-to-r from-blue-600 to-blue-700 text-white py-2 px-6 rounded-full hover:from-blue-700 hover:to-blue-800 transition duration-300 font-semibold flex items-center gap-2 whitespace-nowrap">
                        <ShoppingCart size={18} />
                        Add
                      </button>
                    </>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default ShopNowPage;