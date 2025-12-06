"use client";
import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, Star, Filter, Grid3x3, LayoutList, Search, ChevronDown, SlidersHorizontal, X } from 'lucide-react';
import { products } from '../data/products';
import ProductImageCarousel from '../components/ProductImageCarousel';
import { useCart } from '../components/CartContext';
import { ProductRevealCard } from '@/components/ui/product-reveal-card';

const categories = [
  { id: 'all', name: 'All Products' },
  { id: 'Treats', name: 'Treats' },
  { id: 'Food', name: 'Food' },
  { id: 'Supplements', name: 'Supplements' },
  { id: 'Grooming', name: 'Grooming' },
];

const petTypes = [
  { id: 'all', name: 'All Pets' },
  { id: 'Canine', name: 'Dogs' },
  { id: 'Feline', name: 'Cats' },
];

const sortOptions = [
  { id: 'popular', name: 'Most Popular' },
  { id: 'newest', name: 'Newest Arrivals' },
  { id: 'price-low', name: 'Price: Low to High' },
  { id: 'price-high', name: 'Price: High to Low' },
  { id: 'rating', name: 'Top Rated' },
];

const ShopNowPage = () => {
  const { addToCart } = useCart();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedPetType, setSelectedPetType] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('popular');
  const [searchQuery, setSearchQuery] = useState('');
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  // Filter and Sort Logic
  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Search Filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(p =>
        p.name.toLowerCase().includes(query) ||
        p.description.toLowerCase().includes(query)
      );
    }

    // Category Filter
    if (selectedCategory !== 'all') {
      result = result.filter(p => p.productCategory === selectedCategory);
    }

    // Pet Type Filter
    if (selectedPetType !== 'all') {
      result = result.filter(p => p.petType === selectedPetType || p.petType === 'Both');
    }

    // Sorting
    switch (sortBy) {
      case 'price-low':
        result.sort((a, b) => parseFloat(a.price.replace(/[^0-9.]/g, '')) - parseFloat(b.price.replace(/[^0-9.]/g, '')));
        break;
      case 'price-high':
        result.sort((a, b) => parseFloat(b.price.replace(/[^0-9.]/g, '')) - parseFloat(a.price.replace(/[^0-9.]/g, '')));
        break;
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
      case 'newest':
        result.sort((a, b) => b.id - a.id); // Assuming higher ID is newer
        break;
      default: // popular
        result.sort((a, b) => b.reviews - a.reviews);
    }

    return result;
  }, [products, selectedCategory, selectedPetType, sortBy, searchQuery]);

  return (
    <div className="bg-gray-50 dark:bg-slate-950 min-h-screen transition-colors duration-300 font-sans">

      {/* Hero Section */}
      <section className="relative bg-slate-900 text-white py-20 sm:py-24 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>

        <div className="container mx-auto px-4 relative z-10 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-6 tracking-tight"
          >
            Premium Pet <span className="text-blue-400">Essentials</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed"
          >
            Curated nutrition and care products for your furry companions. Science-backed, vet-approved, and loved by pets.
          </motion.p>
        </div>
      </section>

      {/* Main Content Area */}
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col lg:flex-row gap-8">

          {/* Sidebar Filters (Desktop) */}
          <aside className="hidden lg:block w-64 flex-shrink-0 space-y-8">
            {/* Search */}
            <div className="relative">
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all shadow-sm"
              />
              <Search className="absolute left-3 top-3.5 text-gray-400" size={18} />
            </div>

            {/* Categories */}
            <div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Categories</h3>
              <div className="space-y-2">
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`w-full text-left px-4 py-2.5 rounded-lg transition-all duration-200 flex items-center justify-between group ${selectedCategory === cat.id
                      ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-md'
                      : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-slate-800'
                      }`}
                  >
                    <span>{cat.name}</span>
                    {selectedCategory === cat.id && <motion.div layoutId="activeDot" className="w-1.5 h-1.5 bg-white rounded-full" />}
                  </button>
                ))}
              </div>
            </div>

            {/* Pet Type */}
            <div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Pet Type</h3>
              <div className="space-y-2">
                {petTypes.map((type) => (
                  <button
                    key={type.id}
                    onClick={() => setSelectedPetType(type.id)}
                    className={`w-full text-left px-4 py-2.5 rounded-lg transition-all duration-200 flex items-center justify-between ${selectedPetType === type.id
                      ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-md'
                      : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-slate-800'
                      }`}
                  >
                    <span>{type.name}</span>
                    {selectedPetType === type.id && <div className="w-1.5 h-1.5 bg-white rounded-full" />}
                  </button>
                ))}
              </div>
            </div>
          </aside>

          {/* Mobile Filter Toggle */}
          <div className="lg:hidden mb-6 flex gap-4">
            <button
              onClick={() => setIsMobileFilterOpen(true)}
              className="flex-1 flex items-center justify-center gap-2 bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 py-3 rounded-xl font-medium text-gray-700 dark:text-gray-200 shadow-sm"
            >
              <SlidersHorizontal size={18} />
              Filters
            </button>
            <div className="flex-1 relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full appearance-none bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 py-3 pl-4 pr-10 rounded-xl font-medium text-gray-700 dark:text-gray-200 shadow-sm focus:outline-none"
              >
                {sortOptions.map(opt => (
                  <option key={opt.id} value={opt.id}>{opt.name}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-4 top-3.5 text-gray-400 pointer-events-none" size={18} />
            </div>
          </div>

          {/* Mobile Filter Drawer */}
          <AnimatePresence>
            {isMobileFilterOpen && (
              <>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setIsMobileFilterOpen(false)}
                  className="fixed inset-0 bg-black/50 z-40 lg:hidden backdrop-blur-sm"
                />
                <motion.div
                  initial={{ x: '100%' }}
                  animate={{ x: 0 }}
                  exit={{ x: '100%' }}
                  transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                  className="fixed inset-y-0 right-0 w-80 bg-white dark:bg-slate-900 z-50 p-6 shadow-2xl lg:hidden overflow-y-auto"
                >
                  <div className="flex justify-between items-center mb-8">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Filters</h2>
                    <button onClick={() => setIsMobileFilterOpen(false)} className="p-2 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-full transition-colors">
                      <X size={24} className="text-gray-500" />
                    </button>
                  </div>

                  <div className="space-y-8">
                    {/* Search in Mobile */}
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="Search products..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-slate-800 border-none rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                      />
                      <Search className="absolute left-3 top-3.5 text-gray-400" size={18} />
                    </div>

                    <div>
                      <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Categories</h3>
                      <div className="space-y-2">
                        {categories.map((cat) => (
                          <button
                            key={cat.id}
                            onClick={() => setSelectedCategory(cat.id)}
                            className={`w-full text-left px-4 py-3 rounded-xl transition-all ${selectedCategory === cat.id
                              ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900'
                              : 'bg-gray-50 dark:bg-slate-800 text-gray-700 dark:text-gray-300'
                              }`}
                          >
                            {cat.name}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Pet Type</h3>
                      <div className="space-y-2">
                        {petTypes.map((type) => (
                          <button
                            key={type.id}
                            onClick={() => setSelectedPetType(type.id)}
                            className={`w-full text-left px-4 py-3 rounded-xl transition-all ${selectedPetType === type.id
                              ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900'
                              : 'bg-gray-50 dark:bg-slate-800 text-gray-700 dark:text-gray-300'
                              }`}
                          >
                            {type.name}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 pt-6 border-t border-gray-100 dark:border-slate-800">
                    <button
                      onClick={() => setIsMobileFilterOpen(false)}
                      className="w-full bg-gray-900 dark:bg-white text-white dark:text-gray-900 py-4 rounded-xl font-bold text-lg"
                    >
                      Show Results
                    </button>
                  </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>

          {/* Product Grid Area */}
          <div className="flex-1">
            {/* Top Bar */}
            <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
              <p className="text-gray-600 dark:text-gray-400 font-medium">
                Showing <span className="text-gray-900 dark:text-white font-bold">{filteredProducts.length}</span> results
              </p>

              <div className="flex items-center gap-4 w-full sm:w-auto">
                {/* View Toggle */}
                <div className="bg-white dark:bg-slate-900 p-1 rounded-lg border border-gray-200 dark:border-slate-800 flex items-center">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 rounded-md transition-all ${viewMode === 'grid' ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900' : 'text-gray-400 hover:text-gray-600 dark:hover:text-gray-300'}`}
                  >
                    <Grid3x3 size={20} />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 rounded-md transition-all ${viewMode === 'list' ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900' : 'text-gray-400 hover:text-gray-600 dark:hover:text-gray-300'}`}
                  >
                    <LayoutList size={20} />
                  </button>
                </div>

                {/* Desktop Sort */}
                <div className="hidden lg:block relative min-w-[200px]">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="w-full appearance-none bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 py-2.5 pl-4 pr-10 rounded-lg font-medium text-gray-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 cursor-pointer"
                  >
                    {sortOptions.map(opt => (
                      <option key={opt.id} value={opt.id}>{opt.name}</option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-3 text-gray-400 pointer-events-none" size={16} />
                </div>
              </div>
            </div>

            {/* Products Grid */}
            {filteredProducts.length > 0 ? (
              <motion.div
                layout
                className={`grid gap-6 ${viewMode === 'grid'
                  ? 'grid-cols-1 sm:grid-cols-2 xl:grid-cols-3'
                  : 'grid-cols-1'
                  }`}
              >
                <AnimatePresence>
                  {filteredProducts.map((product) => (
                    viewMode === 'grid' ? (
                      <motion.div
                        layout
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ duration: 0.3 }}
                        key={product.id}
                        className="flex flex-col"
                      >
                        <ProductRevealCard
                          name={product.name}
                          price={product.price}
                          originalPrice={`₹${(parseFloat(product.price.replace(/[^0-9.]/g, '')) * 1.2).toFixed(0)}`}
                          image={product.images[0]}
                          description={product.description}
                          rating={product.rating}
                          reviewCount={product.reviews}
                          features={product.benefits}
                          onAdd={() => addToCart({
                            id: product.id,
                            name: product.name,
                            price: product.price,
                            image: product.images[0],
                            petType: product.petType,
                            productCategory: product.productCategory
                          })}
                          className="w-full"
                        />
                      </motion.div>
                    ) : (
                      <motion.div
                        layout
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ duration: 0.3 }}
                        key={product.id}
                        className={`group bg-white dark:bg-slate-900 rounded-2xl border border-gray-100 dark:border-slate-800 overflow-hidden hover:shadow-2xl hover:border-blue-100 dark:hover:border-blue-900/30 transition-all duration-300 flex flex-row items-center p-4 gap-6`}
                      >
                        {/* Image Container */}
                        <div className={`relative overflow-hidden bg-gray-50 dark:bg-slate-800 w-48 h-48 rounded-xl flex-shrink-0`}>
                          <ProductImageCarousel
                            images={product.images}
                            alt={product.name}
                            className="w-full h-full"
                            imageClassName="object-contain p-6 group-hover:scale-105 transition-transform duration-500"
                          />

                          {/* Badges */}
                          <div className="absolute top-3 left-3 flex flex-col gap-2">
                            {product.rating >= 4.8 && (
                              <span className="bg-amber-400 text-amber-900 text-xs font-bold px-2.5 py-1 rounded-lg shadow-sm">
                                Bestseller
                              </span>
                            )}
                            {product.petType === 'Both' && (
                              <span className="bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-xs font-bold px-2.5 py-1 rounded-lg shadow-sm">
                                For All Pets
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Content */}
                        <div className={`flex flex-col flex-grow py-2 pr-4`}>
                          <div className="mb-2">
                            <span className="text-xs font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
                              {product.productCategory}
                            </span>
                          </div>

                          <Link href={`/products/${product.id}`} className="group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                            <h3 className={`font-bold text-gray-900 dark:text-white mb-2 leading-tight text-xl`}>
                              {product.name}
                            </h3>
                          </Link>

                          {/* Rating */}
                          <div className="flex items-center mb-4">
                            <div className="flex text-yellow-400 gap-0.5">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  size={14}
                                  fill={i < Math.floor(product.rating) ? "currentColor" : "none"}
                                  className={i < Math.floor(product.rating) ? "" : "text-gray-300 dark:text-gray-600"}
                                />
                              ))}
                            </div>
                            <span className="ml-2 text-xs font-medium text-gray-500 dark:text-gray-400">
                              ({product.reviews} reviews)
                            </span>
                          </div>

                          {/* Price & Action */}
                          <div className={`mt-auto flex items-center justify-between gap-4 justify-start`}>
                            <div className="flex flex-col">
                              <span className="text-xs text-gray-400 line-through">₹{parseFloat(product.price.replace(/[^0-9.]/g, '')) * 1.2}</span>
                              <span className="text-xl sm:text-2xl font-extrabold text-gray-900 dark:text-white">
                                {product.price}
                              </span>
                            </div>

                            <button
                              onClick={(e) => {
                                e.preventDefault();
                                addToCart({
                                  id: product.id,
                                  name: product.name,
                                  price: product.price,
                                  image: product.images[0],
                                  petType: product.petType,
                                  productCategory: product.productCategory
                                });
                              }}
                              className={`bg-gray-900 dark:bg-white text-white dark:text-gray-900 hover:bg-blue-600 dark:hover:bg-blue-400 hover:text-white dark:hover:text-white transition-all duration-300 font-bold rounded-xl flex items-center justify-center gap-2 shadow-lg hover:shadow-blue-500/25 px-6 py-3`}
                              aria-label="Add to cart"
                            >
                              <ShoppingCart size={20} />
                              <span>Add to Cart</span>
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    )
                  ))}
                </AnimatePresence>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-20"
              >
                <div className="bg-gray-100 dark:bg-slate-800 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Filter size={40} className="text-gray-400" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">No products found</h3>
                <p className="text-gray-500 dark:text-gray-400 max-w-md mx-auto">
                  Try adjusting your filters or search query to find what you're looking for.
                </p>
                <button
                  onClick={() => {
                    setSelectedCategory('all');
                    setSelectedPetType('all');
                    setSearchQuery('');
                  }}
                  className="mt-6 text-blue-600 font-semibold hover:underline"
                >
                  Clear all filters
                </button>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopNowPage;