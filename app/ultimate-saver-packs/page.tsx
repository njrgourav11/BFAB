"use client";
import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ShoppingCart, Star, ChevronLeft, ChevronRight, CheckCircle } from 'lucide-react';

const saverPacks = [
  {
    id: 1,
    name: 'Dog Starter Pack',
    price: '₹99.99',
    originalPrice: '₹129.99',
    savings: 'Save ₹30',
    description: 'Perfect for new dog parents!',
    items: ['Premium Dog Food (2 bags)', 'Dog Treats (2 bags)', 'Toy Bundle', 'Food Bowl Set'],
    image: '/window.svg',
    rating: 4.9,
    reviews: 328,
    badge: 'Bestseller',
  },
  {
    id: 2,
    name: 'Cat Starter Pack',
    price: '₹89.99',
    originalPrice: '₹119.99',
    savings: 'Save ₹30',
    description: 'Everything your cat needs!',
    items: ['Organic Cat Food (2 bags)', 'Cat Treats (2 bags)', 'Toy Variety', 'Litter Box Essentials'],
    image: '/window.svg',
    rating: 4.8,
    reviews: 245,
    badge: 'Popular',
  },
  {
    id: 3,
    name: 'Puppy Growth Pack',
    price: '₹119.99',
    originalPrice: '₹159.99',
    savings: 'Save ₹40',
    description: 'Optimal nutrition for growing puppies',
    items: ['Grain-Free Puppy Food (3 bags)', 'Puppy Treats', 'Chew Toys', 'Training Pads'],
    image: '/window.svg',
    rating: 5.0,
    reviews: 512,
    badge: '#1 Rated',
  },
  {
    id: 4,
    name: 'Senior Pet Pack',
    price: '₹109.99',
    originalPrice: '₹149.99',
    savings: 'Save ₹40',
    description: 'Specially formulated for senior pets',
    items: ['Senior Dog Food (2 bags)', 'Joint Support Treats', 'Wellness Supplements', 'Comfort Bed'],
    image: '/window.svg',
    rating: 4.7,
    reviews: 189,
    badge: 'New',
  },
  {
    id: 5,
    name: 'Multi-Pet Bundle',
    price: '₹149.99',
    originalPrice: '₹199.99',
    savings: 'Save ₹50',
    description: 'For households with multiple pets',
    items: ['Dog & Cat Food Mix', 'Mixed Treats Bundle', 'Toy Variety Pack', 'Accessory Bundle'],
    image: '/window.svg',
    rating: 4.9,
    reviews: 421,
    badge: 'Best Value',
  },
];

const UltimateSaverPacksPage = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % saverPacks.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + saverPacks.length) % saverPacks.length);
  };

  const getVisiblePacks = () => {
    const visible = [];
    for (let i = 0; i < 3; i++) {
      visible.push(saverPacks[(currentSlide + i) % saverPacks.length]);
    }
    return visible;
  };

  return (
    <div className="min-h-screen bg-white dark:bg-black">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-purple-600 to-indigo-700 dark:from-purple-900 dark:via-indigo-900 dark:to-black text-white py-20">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <span className="bg-yellow-300 text-purple-900 dark:bg-yellow-400 dark:text-black px-6 py-2 rounded-full text-sm font-bold inline-block mb-4">
              💰 SAVE UP TO 50%
            </span>
            <h1 className="text-5xl md:text-6xl font-bold mb-4 text-white dark:text-yellow-300">Ultimate Saver Packs</h1>
            <p className="text-xl text-purple-100 dark:text-yellow-200">Unbeatable value bundles for every pet and budget</p>
          </motion.div>
        </div>
      </section>

      {/* Featured Slider Section */}
      <section className="py-20 bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-gray-950 dark:to-black">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="relative"
          >
            {/* Slider Container */}
            <div className="flex items-center gap-4">
              {/* Previous Button */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={prevSlide}
                className="bg-white text-purple-600 dark:bg-purple-700 dark:text-yellow-300 hover:bg-purple-100 dark:hover:bg-purple-600 rounded-full p-3 shadow-lg dark:shadow-purple-900/50 transition duration-300 z-10"
              >
                <ChevronLeft size={24} />
              </motion.button>

              {/* Featured Pack Display */}
              <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-6">
                {getVisiblePacks().map((pack, index) => (
                  <motion.div
                    key={pack.id}
                    initial={{ opacity: 0, x: index === 1 ? 0 : 100 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className={`relative rounded-2xl overflow-hidden shadow-xl transition-all duration-300 ${
                      index === 1 ? 'ring-4 ring-yellow-400 md:scale-105' : 'opacity-50 md:opacity-100'
                    }`}
                  >
                    <div className="bg-white dark:bg-gray-900 p-8 h-full flex flex-col">
                      {/* Badge */}
                      <div className="absolute top-4 right-4">
                        <div className="bg-gradient-to-r from-orange-400 to-red-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                          {pack.badge}
                        </div>
                      </div>

                      {/* Image */}
                      <div className="relative h-40 mb-6 rounded-lg bg-gray-100 dark:bg-gray-800 flex items-center justify-center overflow-hidden">
                        <Image
                          src={pack.image}
                          alt={pack.name}
                          width={120}
                          height={120}
                          className="object-cover"
                        />
                      </div>

                      {/* Title and Description */}
                      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">{pack.name}</h3>
                      <p className="text-gray-600 dark:text-gray-200 text-sm mb-4">{pack.description}</p>

                      {/* Rating */}
                      <div className="flex items-center gap-2 mb-4">
                        <div className="flex gap-0.5">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} size={14} fill="#fbbf24" stroke="#fbbf24" />
                          ))}
                        </div>
                        <span className="text-xs text-gray-600 dark:text-gray-300">
                          {pack.rating} ({pack.reviews})
                        </span>
                      </div>

                      {/* Pricing */}
                      <div className="mb-4">
                        <div className="flex items-center gap-2">
                          <p className="text-3xl font-bold text-purple-600 dark:text-yellow-300">{pack.price}</p>
                          <p className="text-lg text-gray-400 dark:text-gray-400 line-through">{pack.originalPrice}</p>
                        </div>
                        <p className="text-sm font-semibold text-green-600 dark:text-green-300">{pack.savings}</p>
                      </div>

                      {/* Items List */}
                      <div className="space-y-2 mb-6 flex-grow">
                        {pack.items.map((item, i) => (
                          <div key={i} className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-100">
                            <CheckCircle size={16} className="text-green-500 dark:text-green-300 flex-shrink-0" />
                            {item}
                          </div>
                        ))}
                      </div>

                      {/* CTA Buttons */}
                      <button className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 dark:from-purple-600 dark:to-pink-600 text-white hover:from-purple-700 hover:to-indigo-700 dark:hover:from-purple-500 dark:hover:to-pink-500 font-bold py-3 rounded-full transition duration-300 flex items-center justify-center gap-2 mb-2 shadow-md dark:shadow-lg dark:shadow-purple-900/50">
                        <ShoppingCart size={20} />
                        Add to Cart
                      </button>
                      <button className="w-full border-2 border-purple-600 dark:border-yellow-400 text-purple-600 dark:text-yellow-300 hover:bg-purple-50 dark:hover:bg-gray-800 font-semibold py-2 rounded-full transition duration-300">
                        Learn More
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Next Button */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={nextSlide}
                className="bg-white text-purple-600 dark:bg-purple-700 dark:text-yellow-300 hover:bg-purple-100 dark:hover:bg-purple-600 rounded-full p-3 shadow-lg dark:shadow-purple-900/50 transition duration-300 z-10"
              >
                <ChevronRight size={24} />
              </motion.button>
            </div>

            {/* Dots Navigation */}
            <div className="flex justify-center gap-2 mt-8">
              {saverPacks.map((_, index) => (
                <motion.button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  animate={{
                    scale: index === currentSlide ? 1.3 : 1,
                    backgroundColor: index === currentSlide ? '#a855f7' : '#ddd5ff',
                  }}
                  className="w-3 h-3 rounded-full transition duration-300 dark:bg-gray-600 dark:animate-pulse"
                  style={{
                    backgroundColor: index === currentSlide ? '#a855f7' : '#e9d5ff',
                  }}
                />
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* All Packs Grid */}
      <section className="py-20 bg-white dark:bg-black">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 dark:text-yellow-300 mb-4">Browse All Packs</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">Find the perfect bundle for your pet</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {saverPacks.map((pack, index) => (
              <motion.div
                key={pack.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl dark:shadow-lg dark:hover:shadow-purple-900/50 transition duration-300 border border-gray-200 dark:border-purple-700 flex flex-col"
              >
                {/* Badge */}
                <div className="absolute top-4 right-4 z-10">
                  <div className="bg-gradient-to-r from-orange-400 to-red-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                    {pack.badge}
                  </div>
                </div>

                {/* Image */}
                <div className="relative h-48 bg-gray-200 dark:bg-gray-800 flex items-center justify-center overflow-hidden">
                  <Image
                    src={pack.image}
                    alt={pack.name}
                    width={150}
                    height={150}
                    className="object-cover hover:scale-110 transition duration-300"
                  />
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{pack.name}</h3>
                  <p className="text-gray-600 dark:text-gray-200 mb-4 text-sm flex-grow">{pack.description}</p>

                  {/* Rating */}
                  <div className="flex items-center gap-2 mb-4">
                    <div className="flex gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={14} fill="#fbbf24" stroke="#fbbf24" />
                      ))}
                    </div>
                    <span className="text-xs text-gray-600 dark:text-gray-300">
                      {pack.rating} ({pack.reviews})
                    </span>
                  </div>

                  {/* Pricing */}
                  <div className="mb-4 pb-4 border-b border-gray-300 dark:border-purple-700">
                    <div className="flex items-center gap-2">
                      <p className="text-2xl font-bold text-purple-600 dark:text-yellow-300">{pack.price}</p>
                      <p className="text-gray-400 dark:text-gray-400 line-through">{pack.originalPrice}</p>
                    </div>
                    <p className="text-sm font-semibold text-green-600 dark:text-green-300">{pack.savings}</p>
                  </div>

                  {/* Items List */}
                  <div className="space-y-1 mb-6">
                    {pack.items.slice(0, 3).map((item, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs text-gray-700 dark:text-gray-100">
                        <CheckCircle size={14} className="text-green-500 dark:text-green-300 flex-shrink-0" />
                        {item}
                      </div>
                    ))}
                    {pack.items.length > 3 && (
                      <p className="text-xs text-gray-500 dark:text-gray-400 ml-6">+ {pack.items.length - 3} more items</p>
                    )}
                  </div>

                  {/* Button */}
                  <button className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 dark:from-purple-600 dark:to-pink-600 text-white hover:from-purple-700 hover:to-indigo-700 dark:hover:from-purple-500 dark:hover:to-pink-500 font-bold py-3 rounded-full transition duration-300 flex items-center justify-center gap-2 shadow-md dark:shadow-lg dark:shadow-purple-900/50">
                    <ShoppingCart size={18} />
                    Add to Cart
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-gradient-to-r from-purple-50 to-indigo-50 dark:from-gray-950 dark:to-black">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 dark:text-yellow-300">Why Choose Our Bundles?</h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: '🎯 Tailor-Made', desc: 'Carefully curated packs for every pet type and age' },
              { title: '💰 Maximum Savings', desc: 'Save up to 50% compared to buying items separately' },
              { title: '✅ Quality Guaranteed', desc: 'All products vet-approved and backed by warranty' },
            ].map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center p-6 bg-white dark:bg-gray-900 rounded-lg shadow-md dark:shadow-lg dark:shadow-purple-900/50 border border-gray-200 dark:border-purple-700"
              >
                <h3 className="text-xl font-bold text-gray-900 dark:text-yellow-300 mb-2">{benefit.title}</h3>
                <p className="text-gray-700 dark:text-gray-200">{benefit.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default UltimateSaverPacksPage;