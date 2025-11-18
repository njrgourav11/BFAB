"use client";
import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ShoppingCart, Star, Filter, Grid3x3, LayoutList, Smile, Pill, Sparkles, Activity, Cookie, Dog, Cat } from 'lucide-react';
import { products } from '../data/products';
import ProductsCarousel from '../components/ProductsCarousel';
import ProductImageCarousel from '../components/ProductImageCarousel';
import { useCart } from '../components/CartContext';

const shopCategories = [
  { id: 1, name: 'Treats', icon: Cookie, color: 'from-orange-400 to-orange-600' },
  { id: 2, name: 'Cat Food', icon: Cat, color: 'from-purple-400 to-purple-600' },
  { id: 3, name: 'Supplements', icon: Pill, color: 'from-green-400 to-green-600' },
  { id: 4, name: 'Canine', icon: Dog, color: 'from-amber-400 to-amber-600' },
  { id: 5, name: 'Feline', icon: Cat, color: 'from-purple-400 to-purple-600' },
];



const ShopNowPage = () => {
  const { addToCart } = useCart();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedProductCategory, setSelectedProductCategory] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<string>('popular');

  const categories = ['Canine', 'Feline', 'Both'];

  const filteredProducts = products.filter((p) => {
    if (selectedProductCategory && p.productCategory !== selectedProductCategory) return false;
    if (selectedCategory && p.petType !== selectedCategory) return false;
    return true;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'price-low') return parseFloat(a.price.slice(1)) - parseFloat(b.price.slice(1));
    if (sortBy === 'price-high') return parseFloat(b.price.slice(1)) - parseFloat(a.price.slice(1));
    if (sortBy === 'rating') return b.rating - a.rating;
    return 0;
  });

  return (
    <div className="bg-gray-50 dark:bg-slate-900 min-h-screen transition-colors duration-300">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 via-blue-700 to-purple-700 text-white py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="container mx-auto px-4 md:px-6 relative">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-5xl md:text-6xl font-extrabold mb-6 bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">Our Products</h1>
            <p className="text-xl md:text-2xl text-blue-100 max-w-2xl mx-auto leading-relaxed">Discover premium nutrition crafted with love for your beloved pets</p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="container mx-auto px-4 md:px-6 py-16 transition-colors duration-300 min-h-screen">
        {/* Products Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          {/* Products Header */}
          <div className="text-center mb-12">
            <p className="text-2xl font-bold text-gray-800 dark:text-gray-200">
              Showing {products.length} products
            </p>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg hover:shadow-xl transition duration-300 hover:scale-105 overflow-hidden group flex flex-col"
              >
                <div className="relative h-64 bg-gray-100 dark:bg-slate-700 overflow-hidden">
                  <ProductImageCarousel
                    images={product.images}
                    alt={product.name}
                    className="h-64 bg-gray-100 dark:bg-slate-700"
                  />
                </div>
                <Link href={`/products/${product.id}`} className="block flex-1">
                  <div className="p-6 flex flex-col flex-grow">
                    <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-2 line-clamp-2">{product.name}</h3>
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
                      className="bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 px-6 rounded-xl hover:from-blue-700 hover:to-blue-800 transition duration-300 font-semibold flex items-center justify-center gap-2 mt-auto"
                    >
                      <ShoppingCart size={18} />
                      Add to Cart
                    </button>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default ShopNowPage;