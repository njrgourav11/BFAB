"use client";
import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ShoppingCart, Star, ChevronLeft, ChevronRight, CheckCircle, Package, ArrowRight } from 'lucide-react';

const saverPacks = [
  {
    id: 1,
    name: 'Dog Starter Pack',
    price: '₹99.99',
    originalPrice: '₹129.99',
    savings: 'Save ₹30',
    description: 'Perfect for new dog parents!',
    items: ['Premium Dog Food (2 bags)', 'Dog Treats (2 bags)', 'Toy Bundle', 'Food Bowl Set'],
    image: '/images/20.png',
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
    image: '/images/21.png',
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
    image: '/images/22.png',
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
    image: '/images/23.png',
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
    image: '/images/24.png',
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
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-yellow-400/20 text-yellow-400 rounded-full text-sm font-bold mb-6 border border-yellow-400/30"
            >
              <Star size={16} className="fill-current" />
              SAVE UP TO 50%
            </motion.div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 tracking-tight">Ultimate Saver Packs</h1>
            <p className="text-xl text-gray-400 leading-relaxed">
              Unbeatable value bundles curated for every pet and budget.
              Get more of what they love for less.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Featured Slider Section */}
      <section className="py-20 bg-white dark:bg-slate-900 border-b border-gray-100 dark:border-slate-800">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="flex items-center justify-between mb-12">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Featured Bundles</h2>
              <div className="flex gap-2">
                <button
                  onClick={prevSlide}
                  className="p-3 rounded-full bg-gray-100 dark:bg-slate-800 text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-slate-700 transition-colors"
                >
                  <ChevronLeft size={24} />
                </button>
                <button
                  onClick={nextSlide}
                  className="p-3 rounded-full bg-gray-100 dark:bg-slate-800 text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-slate-700 transition-colors"
                >
                  <ChevronRight size={24} />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {getVisiblePacks().map((pack, index) => (
                <motion.div
                  key={`${pack.id}-${index}`}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className={`relative bg-white dark:bg-slate-900 rounded-2xl border ${index === 1
                      ? 'border-blue-500 dark:border-blue-500 shadow-xl scale-105 z-10'
                      : 'border-gray-100 dark:border-slate-800 shadow-sm'
                    } overflow-hidden flex flex-col h-full`}
                >
                  {/* Badge */}
                  <div className="absolute top-4 right-4 z-20">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold text-white ${index === 1 ? 'bg-blue-600' : 'bg-slate-900 dark:bg-slate-700'
                      }`}>
                      {pack.badge}
                    </span>
                  </div>

                  {/* Image */}
                  <div className="relative h-48 bg-gray-50 dark:bg-slate-800 p-6 flex items-center justify-center">
                    <Image
                      src={pack.image}
                      alt={pack.name}
                      width={160}
                      height={160}
                      className="object-contain drop-shadow-xl"
                    />
                  </div>

                  {/* Content */}
                  <div className="p-6 flex flex-col flex-grow">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white">{pack.name}</h3>
                    </div>

                    <div className="flex items-center gap-2 mb-4">
                      <div className="flex text-yellow-400">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} size={14} fill="currentColor" />
                        ))}
                      </div>
                      <span className="text-xs text-gray-500 dark:text-gray-400">({pack.reviews})</span>
                    </div>

                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">{pack.description}</p>

                    <div className="space-y-2 mb-6 flex-grow">
                      {pack.items.slice(0, 3).map((item, i) => (
                        <div key={i} className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                          <CheckCircle size={14} className="text-green-500 flex-shrink-0" />
                          <span className="truncate">{item}</span>
                        </div>
                      ))}
                    </div>

                    <div className="pt-6 border-t border-gray-100 dark:border-slate-800 mt-auto">
                      <div className="flex items-end gap-2 mb-4">
                        <span className="text-3xl font-bold text-gray-900 dark:text-white">{pack.price}</span>
                        <span className="text-sm text-gray-400 line-through mb-1">{pack.originalPrice}</span>
                        <span className="text-sm font-bold text-green-600 dark:text-green-400 mb-1 ml-auto">{pack.savings}</span>
                      </div>

                      <button className={`w-full py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-all ${index === 1
                          ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-lg shadow-blue-200 dark:shadow-none'
                          : 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:opacity-90'
                        }`}>
                        <ShoppingCart size={18} />
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* All Packs Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Browse All Packs</h2>
            <p className="text-gray-600 dark:text-gray-400">Find the perfect bundle for your pet</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {saverPacks.map((pack, index) => (
              <motion.div
                key={pack.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white dark:bg-slate-900 rounded-2xl overflow-hidden shadow-sm border border-gray-100 dark:border-slate-800 hover:shadow-lg transition-all group flex flex-col"
              >
                {/* Image */}
                <div className="relative h-56 bg-gray-50 dark:bg-slate-800 p-8 flex items-center justify-center group-hover:bg-gray-100 dark:group-hover:bg-slate-700/50 transition-colors">
                  <div className="absolute top-4 right-4 z-10">
                    <span className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white px-3 py-1 rounded-full text-xs font-bold shadow-sm border border-gray-100 dark:border-slate-700">
                      {pack.badge}
                    </span>
                  </div>
                  <Image
                    src={pack.image}
                    alt={pack.name}
                    width={180}
                    height={180}
                    className="object-contain group-hover:scale-110 transition-transform duration-500"
                  />
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{pack.name}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">{pack.description}</p>

                  <div className="flex items-center gap-2 mb-6">
                    <div className="flex text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={14} fill="currentColor" />
                      ))}
                    </div>
                    <span className="text-xs text-gray-500 dark:text-gray-400">({pack.reviews} reviews)</span>
                  </div>

                  <div className="space-y-2 mb-6 flex-grow">
                    {pack.items.slice(0, 3).map((item, i) => (
                      <div key={i} className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                        <CheckCircle size={14} className="text-green-500 flex-shrink-0" />
                        <span className="truncate">{item}</span>
                      </div>
                    ))}
                    {pack.items.length > 3 && (
                      <p className="text-xs text-gray-400 pl-6">+ {pack.items.length - 3} more items</p>
                    )}
                  </div>

                  <div className="pt-6 border-t border-gray-100 dark:border-slate-800 mt-auto">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <span className="text-2xl font-bold text-gray-900 dark:text-white block">{pack.price}</span>
                        <span className="text-xs text-gray-400 line-through">{pack.originalPrice}</span>
                      </div>
                      <span className="text-sm font-bold text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20 px-2 py-1 rounded-lg">
                        {pack.savings}
                      </span>
                    </div>

                    <button className="w-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold py-3 rounded-xl hover:opacity-90 transition-all flex items-center justify-center gap-2">
                      <ShoppingCart size={18} />
                      Add to Cart
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-gray-50 dark:bg-slate-950 border-t border-gray-200 dark:border-slate-800">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Why Choose Our Bundles?</h2>
            <p className="text-gray-600 dark:text-gray-400">Designed for convenience and savings</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: 'Tailor-Made', desc: 'Carefully curated packs for every pet type and age', icon: <Package size={32} /> },
              { title: 'Maximum Savings', desc: 'Save up to 50% compared to buying items separately', icon: <ArrowRight size={32} /> }, // Using ArrowRight as a placeholder for a "Savings" icon if DollarSign isn't preferred, or just reuse DollarSign
              { title: 'Quality Guaranteed', desc: 'All products vet-approved and backed by warranty', icon: <CheckCircle size={32} /> },
            ].map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white dark:bg-slate-900 p-8 rounded-2xl text-center shadow-sm border border-gray-100 dark:border-slate-800"
              >
                <div className="w-16 h-16 bg-blue-50 dark:bg-blue-900/20 rounded-full flex items-center justify-center text-blue-600 dark:text-blue-400 mx-auto mb-6">
                  {benefit.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">{benefit.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{benefit.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default UltimateSaverPacksPage;