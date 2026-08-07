"use client";
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import { ShieldCheck, Truck, Phone, RotateCcw, Users, TrendingUp, Leaf, Award } from 'lucide-react';
import { ProductRevealCard } from '@/components/ui/product-reveal-card';

import { useCart } from './components/CartContext';
import { Product } from '@/lib/types';
import { useEffect, useState } from 'react';

const ClientCarousel = dynamic(() => import('./components/ClientCarousel'), {
  ssr: false,
  loading: () => <div className="h-40 animate-pulse rounded-2xl bg-gray-100 dark:bg-slate-800" />,
});

const TestimonialSlider = dynamic(() => import('@/components/ui/testimonial-slider'), {
  ssr: false,
  loading: () => <div className="h-80 animate-pulse rounded-2xl bg-gray-100 dark:bg-slate-800" />,
});

export default function Home() {
  const { addToCart } = useCart();
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    const fetchProducts = async () => {
      try {
        const { getAllProducts } = await import('@/lib/product-utils');
        const data = await getAllProducts();
        if (mounted) {
          setFeaturedProducts(data.slice(0, 4));
        }
      } catch (error) {
        console.error("Failed to fetch products", error);
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    fetchProducts();

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <div>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center text-white overflow-hidden">
        <Link href="/products" className="absolute inset-0 block cursor-pointer z-0">
          {/* Mobile Background */}
          <div className="absolute inset-0 bg-cover bg-center bg-no-repeat md:hidden" style={{ backgroundImage: 'url("/images/mobile.png")' }}></div>
          {/* Desktop Background */}
          <div className="absolute inset-0 bg-cover bg-center bg-no-repeat hidden md:block" style={{ backgroundImage: 'url("/hero.svg")' }}></div>
        </Link>
        {/* Overlay for better text readability */}

        {/* Animated Background Elements - Optimized for Mobile */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-10 left-10 w-40 h-40 sm:w-56 sm:h-56 md:w-72 md:h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-2xl sm:blur-3xl opacity-20 animate-pulse dark:opacity-10"></div>
          <div className="absolute top-20 right-10 w-40 h-40 sm:w-56 sm:h-56 md:w-72 md:h-72 bg-purple-400 rounded-full mix-blend-multiply filter blur-2xl sm:blur-3xl opacity-20 animate-pulse dark:opacity-10" style={{ animationDelay: '2s' }}></div>
          <div className="hidden sm:block absolute bottom-10 left-40 w-40 h-40 sm:w-56 sm:h-56 md:w-72 md:h-72 bg-pink-400 rounded-full mix-blend-multiply filter blur-2xl sm:blur-3xl opacity-20 animate-pulse dark:opacity-10" style={{ animationDelay: '4s' }}></div>
        </div>


      </section>

      {/* Shop by Category Section */}
      <section className="py-12 sm:py-16 md:py-20 bg-gradient-to-b from-blue-50 to-purple-50 dark:from-slate-900 dark:to-slate-900 transition-colors duration-300 relative overflow-hidden">
        {/* Background Decorative Elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-10 left-10 w-64 h-64 bg-blue-200/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-64 h-64 bg-purple-200/20 rounded-full blur-3xl"></div>
        </div>

        <div className="container mx-auto px-4 md:px-6 relative">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800 dark:text-gray-100 mb-4">Shop by Concern</h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-400">Targeted solutions for your pet's specific needs</p>
          </motion.div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 sm:gap-8">
            {[
              { name: 'Dental Health', image: '/category/10.svg', href: '/products' },
              { name: 'Gut Health', image: '/category/11.svg', href: '/products' },
              { name: 'Hip & Joint', image: '/category/12.svg', href: '/products' },
              { name: 'Weight Control', image: '/category/13.svg', href: '/products' },
              { name: 'Anxiety Relief', image: '/category/14.svg', href: '/products' },
              { name: 'Skin & Coat', image: '/category/15.svg', href: '/products' }
            ].map((category, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group"
              >
                <Link href={category.href} className="block flex flex-col items-center">
                  <div className="relative p-1 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 dark:from-slate-800 dark:to-slate-700 group-hover:from-blue-400 group-hover:to-purple-500 transition-all duration-500 shadow-lg group-hover:shadow-2xl">
                    <div className="relative overflow-hidden rounded-full w-28 h-28 sm:w-36 sm:h-36 md:w-40 md:h-40 border-4 border-white dark:border-slate-900 bg-white dark:bg-slate-800">
                      <Image
                        src={category.image}
                        alt={category.name}
                        fill
                        className="object-cover group-hover:scale-110 transition duration-700"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300"></div>
                    </div>
                  </div>

                  <div className="mt-4 text-center">
                    <h3 className="text-sm sm:text-base font-bold text-gray-800 dark:text-gray-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                      {category.name}
                    </h3>
                    <div className="h-1 w-0 bg-blue-500 mx-auto mt-1 group-hover:w-1/2 transition-all duration-300 rounded-full"></div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust & Results Banner Section */}
      <section className="py-4 bg-white dark:bg-slate-900 border-y border-gray-200 dark:border-slate-800 shadow-sm relative z-10 overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center items-center gap-x-6 md:gap-x-8 gap-y-3">
            {[
              { icon: Users, text: '1k+ Pet Parents', color: 'text-blue-500' },
              { icon: TrendingUp, text: '9 out of 10 Saw Improvement', color: 'text-green-500' },
              { icon: ShieldCheck, text: 'Vet Formulated', color: 'text-purple-500' },
              { icon: Leaf, text: 'All Natural', color: 'text-emerald-500' },
              { icon: Award, text: 'Made in India (GMP)', color: 'text-orange-500' },
              { icon: RotateCcw, text: '90-Day Guarantee', color: 'text-pink-500' },
            ].map((item, idx) => {
              const Icon = item.icon;
              return (
                <div key={idx} className="flex items-center gap-2">
                  <Icon size={16} className={item.color} />
                  <span className="text-xs sm:text-sm font-semibold text-gray-700 dark:text-gray-300 whitespace-nowrap">{item.text}</span>
                  {idx < 5 && <span className="hidden lg:inline-block text-gray-300 dark:text-gray-600 ml-4 lg:ml-6">•</span>}
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Wellness Products Showcase */}
      <section className="py-16 md:py-24 bg-white dark:bg-slate-950 overflow-hidden relative">
        <div className="container mx-auto px-4 md:px-8 max-w-7xl">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">

            {/* Left Content */}
            <div className="w-full lg:w-1/3 pr-0 lg:pr-4">
              <h2 className="text-5xl sm:text-6xl lg:text-[5rem] font-extrabold text-[#11241f] dark:text-white leading-[1] tracking-tight mb-8">
                We create <br /> pet wellness.
              </h2>
              <div className="text-lg sm:text-xl text-[#2D3748] dark:text-gray-300 leading-relaxed font-semibold">
                Formulated with clinically supported ingredients to help dogs & cats <span className="border-b-4 border-[#8B234D] pb-1">live healthier, happier lives.</span>
              </div>
            </div>

            {/* Right Content - Cards */}
            <div className="w-full lg:w-2/3 relative">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
                {loading ? (
                  [1, 2, 3].map((item) => (
                    <div key={item} className="h-[280px] animate-pulse rounded-xl bg-gray-100 dark:bg-slate-800" />
                  ))
                ) : (
                  featuredProducts.slice(0, 3).map((product, idx) => {
                    const colors = [
                      { bg: 'bg-[#781B43]', hover: 'group-hover:bg-[#5C1533]' },
                      { bg: 'bg-[#4F46E5]', hover: 'group-hover:bg-[#4338CA]' },
                      { bg: 'bg-[#5A942F]', hover: 'group-hover:bg-[#487824]' }
                    ];
                    const color = colors[idx % colors.length];

                    return (
                      <Link href={`/product/${product.id}`} key={product.id} className="group rounded-xl overflow-hidden bg-[#F8F9FA] dark:bg-slate-900 border border-gray-100 dark:border-slate-800 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col h-full cursor-pointer">
                        <div className="relative p-6 flex-grow flex items-center justify-center min-h-[220px]">
                          <Image src={product.images && product.images.length > 0 ? product.images[0] : '/placeholder.png'} alt={product.name} width={150} height={150} className="object-contain group-hover:scale-105 transition-transform duration-500 drop-shadow-md" />
                        </div>
                        <div className={`${color.bg} text-white p-5 mt-auto flex justify-center items-center ${color.hover} transition-colors`}>
                          <div className="w-full text-center">
                            <h3 className="font-extrabold text-sm sm:text-base leading-tight tracking-wide line-clamp-1">{product.name}</h3>
                            <p className="text-xs opacity-90 mt-1 font-medium line-clamp-1">{product.productCategory || 'Wellness Supplement'}</p>
                          </div>
                        </div>
                      </Link>
                    );
                  })
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Wellness Products Showcase 2 (Flipped) */}
      <section className="py-16 md:py-24 bg-gray-50 dark:bg-slate-900 overflow-hidden relative">
        <div className="container mx-auto px-4 md:px-8 max-w-7xl">
          <div className="flex flex-col lg:flex-row-reverse items-center gap-12 lg:gap-16">

            {/* Right Content (Text) */}
            <div className="w-full lg:w-1/3 pl-0 lg:pl-4">
              <h2 className="text-5xl sm:text-6xl lg:text-[5rem] font-extrabold text-[#11241f] dark:text-emerald-100 font-serif leading-[1] tracking-tight mb-8">
                We make <br /> treats that care.
              </h2>
              <div className="text-lg sm:text-xl text-[#11241f]/90 dark:text-emerald-50/80 leading-relaxed font-medium">
                Not just Delicious . <br /> Naturally Nutritious , <br /> made with Real Ingredients , <br /> for Healthier, Happier companions .
              </div>
            </div>

            {/* Left Content - Cards */}
            <div className="w-full lg:w-2/3 relative">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
                {loading ? (
                  [1, 2, 3].map((item) => (
                    <div key={item} className="h-[280px] animate-pulse rounded-xl bg-gray-100 dark:bg-slate-800" />
                  ))
                ) : (
                  featuredProducts.slice(1, 4).map((product, idx) => {
                    const colors = [
                      { bg: 'bg-[#5A942F]', hover: 'group-hover:bg-[#487824]' },
                      { bg: 'bg-[#781B43]', hover: 'group-hover:bg-[#5C1533]' },
                      { bg: 'bg-[#4F46E5]', hover: 'group-hover:bg-[#4338CA]' }
                    ];
                    const color = colors[idx % colors.length];

                    return (
                      <Link href={`/product/${product.id}`} key={product.id} className="group rounded-xl overflow-hidden bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col h-full cursor-pointer">
                        <div className="relative p-6 flex-grow flex items-center justify-center min-h-[220px]">
                          <Image src={product.images && product.images.length > 0 ? product.images[0] : '/placeholder.png'} alt={product.name} width={150} height={150} className="object-contain group-hover:scale-105 transition-transform duration-500 drop-shadow-md" />
                        </div>
                        <div className={`${color.bg} text-white p-5 mt-auto flex justify-center items-center ${color.hover} transition-colors`}>
                          <div className="w-full text-center">
                            <h3 className="font-extrabold text-sm sm:text-base leading-tight tracking-wide line-clamp-1">{product.name}</h3>
                            <p className="text-xs opacity-90 mt-1 font-medium line-clamp-1">{product.productCategory || 'Wellness Supplement'}</p>
                          </div>
                        </div>
                      </Link>
                    );
                  })
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Healthy Eating Banner Section */}
      <section className="py-20 md:py-28 bg-[#fef6eb] dark:bg-[#11241f] overflow-hidden text-center border-y border-gray-100 dark:border-transparent">
        <div className="container mx-auto px-4 md:px-8 max-w-4xl flex flex-col items-center">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-[#11241f] dark:text-emerald-50 font-serif leading-[1.15] tracking-tight mb-6">
            You shouldn’t be the only <br className="hidden sm:block" /> one eating healthy
          </h2>
          <p className="text-lg sm:text-xl text-[#11241f] dark:text-emerald-100/90 leading-relaxed max-w-3xl mb-10 font-medium">
            Like you, we love our pets and care about their health. That’s why we created BFAB – a service that delivers freshly made pet food with balanced recipes, guided by science, and driven by love.
          </p>
          <Link href="/products" className="inline-flex items-center justify-center bg-[#3B6B5A] text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-[#2C5244] dark:bg-[#2C5244] dark:hover:bg-[#3B6B5A] transition-colors shadow-sm hover:shadow-md">
            Build personalized plan
          </Link>
        </div>
      </section>

      {/* Product Feature Showcase Section */}
      <section className="py-24 md:py-32 bg-[#fef6eb] dark:bg-[#0a1512] overflow-hidden">
        <div className="container mx-auto px-4 md:px-8 max-w-[1200px]">
          <div className="flex flex-col md:flex-row items-center justify-between gap-16 md:gap-8">
            
            {/* Left Features */}
            <div className="flex flex-col gap-16 md:w-[28%] order-2 md:order-1 md:mt-8">
              <div className="flex items-start gap-4">
                <div className="relative text-[#11241f] dark:text-emerald-400 shrink-0 mt-1">
                  <div className="absolute -top-1 -left-1 w-2.5 h-2.5 bg-orange-500 rounded-full opacity-80"></div>
                  <div className="absolute -bottom-1 -right-2 w-1.5 h-1.5 bg-orange-400 rounded-full opacity-60"></div>
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="relative z-10"><path d="M17 10c.7-.7 1.69 0 2.5 0a2.5 2.5 0 1 0 0-5 .5.5 0 0 1-.5-.5 2.5 2.5 0 1 0-5 0c0 .81.7 1.8 0 2.5l-4.6 4.6c-.7.7-1.69 0-2.5 0a2.5 2.5 0 1 0 0 5 .5.5 0 0 1 .5.5 2.5 2.5 0 1 0 5 0c0-.81-.7-1.8 0-2.5Z"/></svg>
                </div>
                <div>
                  <h3 className="text-[22px] font-bold text-[#11241f] dark:text-white tracking-tight mb-2">Real food</h3>
                  <p className="text-[#11241f]/80 dark:text-gray-300 text-base leading-relaxed">Human-grade meat and veggies in simple recipes, made for dogs</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="relative text-[#11241f] dark:text-emerald-400 shrink-0 mt-1">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><path d="m9 11 3 3L22 4"/></svg>
                  <div className="absolute top-0 right-0 w-8 h-8 rounded-full border border-orange-500/30 scale-125"></div>
                </div>
                <div>
                  <h3 className="text-[22px] font-bold text-[#11241f] dark:text-white tracking-tight mb-2">Human grade safety</h3>
                  <p className="text-[#11241f]/80 dark:text-gray-300 text-base leading-relaxed">Our food is made to human-grade safety and quality standards</p>
                </div>
              </div>
            </div>

            {/* Center Image */}
            <div className="md:w-[44%] flex justify-center order-1 md:order-2 relative">
              <div className="w-[300px] h-[300px] md:w-[450px] md:h-[450px] bg-white dark:bg-slate-800 rounded-full shadow-[0_20px_50px_rgba(0,0,0,0.05)] flex items-center justify-center relative overflow-hidden group">
                <div className="absolute inset-2 md:inset-4 rounded-full border-[1px] border-gray-200 dark:border-slate-700 z-20 pointer-events-none"></div>
                <Image src="/products/1/20.png" alt="Product Pack" fill className="object-cover z-10 group-hover:scale-105 transition-transform duration-700" />
              </div>
            </div>

            {/* Right Features */}
            <div className="flex flex-col gap-16 md:w-[28%] order-3 md:order-3 md:mt-8">
              <div className="flex items-start gap-4">
                <div className="relative text-[#11241f] dark:text-emerald-400 shrink-0 mt-1">
                  <div className="absolute -top-2 left-2 w-1.5 h-1.5 bg-orange-400 rounded-full opacity-60"></div>
                  <div className="absolute -top-3 left-4 w-2 h-2 bg-orange-500 rounded-sm opacity-80 rotate-45"></div>
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="relative z-10"><path d="M2 12h20"/><path d="M20 12v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-8"/><path d="m4 8 16-4"/><path d="m8.86 6.78-.45-1.81a2 2 0 0 1 1.45-2.43l1.94-.48a2 2 0 0 1 2.43 1.46l.45 1.8"/></svg>
                </div>
                <div>
                  <h3 className="text-[22px] font-bold text-[#11241f] dark:text-white tracking-tight mb-2">Gently cooked</h3>
                  <p className="text-[#11241f]/80 dark:text-gray-300 text-base leading-relaxed">Maintain whole food and nutritional integrity</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="relative text-[#11241f] dark:text-emerald-400 shrink-0 mt-1">
                  <div className="absolute top-2 -right-3 w-4 h-4 bg-orange-100 dark:bg-orange-900/30 rounded-full z-0"></div>
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="relative z-10"><path d="M4.8 2.3A.3.3 0 1 0 5 2H4a2 2 0 0 0-2 2v5a6 6 0 0 0 6 6v0a6 6 0 0 0 6-6V4a2 2 0 0 0-2-2h-1a.2.2 0 1 0 .3.3"/><path d="M8 15v1a6 6 0 0 0 6 6v0a6 6 0 0 0 6-6v-4"/><circle cx="20" cy="10" r="2"/></svg>
                </div>
                <div>
                  <h3 className="text-[22px] font-bold text-[#11241f] dark:text-white tracking-tight mb-2">Vet developed</h3>
                  <p className="text-[#11241f]/80 dark:text-gray-300 text-base leading-relaxed">Nutrition that exceeds industry standards (AAFCO)</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Food Journalism Section */}
      <section className="py-24 md:py-32 bg-white dark:bg-[#0a1512] overflow-hidden border-t border-gray-100 dark:border-transparent">
        <div className="container mx-auto px-4 md:px-8 max-w-6xl">
          <div className="flex flex-col md:flex-row items-center justify-between gap-12 md:gap-4">
            
            {/* Left Content */}
            <div className="md:w-5/12 flex flex-col gap-6 pt-4">
              <h2 className="text-[3.5rem] sm:text-6xl md:text-[4.5rem] font-extrabold text-[#11241f] dark:text-emerald-50 leading-[0.95] tracking-tight">
                We're also<br/>fixing food<br/>journalism.
              </h2>
              <p className="font-mono text-[15px] sm:text-base text-gray-800 dark:text-gray-300 leading-relaxed max-w-sm mt-2 font-medium tracking-tight">
                We can't fix food without fixing food journalism. Because what you read and believe is what you eat and repeat. We're on it.
              </p>
            </div>
            
            {/* Right Venn Diagram SVG */}
            <div className="md:w-7/12 w-full flex justify-center">
              <div className="w-full max-w-[600px] aspect-[4/3] relative">
                <svg viewBox="0 0 600 400" className="w-full h-full text-[#b23261]">
                  <defs>
                    <clipPath id="venn-intersect">
                      <circle cx="230" cy="220" r="115" />
                    </clipPath>
                    <marker id="arrow-line" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
                      <path d="M 0 2 L 8 5 L 0 8" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                    </marker>
                    <marker id="arrow-line-start" viewBox="0 0 10 10" refX="1" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
                      <path d="M 10 2 L 2 5 L 10 8" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                    </marker>
                  </defs>

                  {/* Intersection Fill */}
                  <circle cx="360" cy="220" r="115" fill="currentColor" clipPath="url(#venn-intersect)" />
                  
                  {/* Left Circle Outline */}
                  <circle cx="230" cy="220" r="115" fill="none" stroke="currentColor" strokeWidth="4" />
                  
                  {/* Right Circle Outline */}
                  <circle cx="360" cy="220" r="115" fill="none" stroke="currentColor" strokeWidth="4" />

                  {/* Text inside circles */}
                  <text x="170" y="210" fill="currentColor" fontFamily="cursive, 'Comic Sans MS', sans-serif" fontSize="18" fontWeight="bold" textAnchor="middle">What</text>
                  <text x="170" y="240" fill="currentColor" fontFamily="cursive, 'Comic Sans MS', sans-serif" fontSize="18" fontWeight="bold" textAnchor="middle">you eat</text>

                  <text x="420" y="210" fill="currentColor" fontFamily="cursive, 'Comic Sans MS', sans-serif" fontSize="18" fontWeight="bold" textAnchor="middle">What</text>
                  <text x="420" y="240" fill="currentColor" fontFamily="cursive, 'Comic Sans MS', sans-serif" fontSize="18" fontWeight="bold" textAnchor="middle">you know</text>

                  {/* Top Left Text and Arrow */}
                  <text x="130" y="70" fill="currentColor" fontFamily="cursive, 'Comic Sans MS', sans-serif" fontSize="20" fontWeight="bold">We're working on</text>
                  <text x="130" y="100" fill="currentColor" fontFamily="cursive, 'Comic Sans MS', sans-serif" fontSize="20" fontWeight="bold">closing the gap</text>
                  
                  {/* Hand drawn arrow pointing to intersection */}
                  <path d="M 280 90 Q 315 90 295 130" fill="none" stroke="currentColor" strokeWidth="3" markerEnd="url(#arrow-line)" strokeLinecap="round" />

                  {/* Little Barry Doodle */}
                  <g transform="translate(480, 230) rotate(15) scale(0.9)">
                    {/* Jagged body */}
                    <path d="M 0 0 L 10 -25 L 25 -10 L 40 -35 L 50 -10 L 65 -30 L 70 30 L 50 20 L 45 40 L 25 30 L 15 45 L 0 30 Z" fill="none" stroke="currentColor" strokeWidth="3" strokeLinejoin="round" />
                    {/* Face */}
                    <path d="M 20 -2 M 22 -2 L 23 -2" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
                    <path d="M 40 -2 M 42 -2 L 43 -2" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
                    <path d="M 32 5 L 32 12 L 38 12" fill="none" stroke="currentColor" strokeWidth="3" strokeLinejoin="round" />
                    <path d="M 25 20 Q 32 25 40 20" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                    {/* Little hand grabbing the circle */}
                    <path d="M -5 10 Q -25 10 -10 30" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                  </g>

                  {/* Bottom Right Text and Arrow */}
                  <text x="500" y="370" fill="currentColor" fontFamily="cursive, 'Comic Sans MS', sans-serif" fontSize="18" fontWeight="bold" textAnchor="middle">So is Barry!</text>
                  {/* Arrow pointing to Barry */}
                  <path d="M 460 340 Q 470 310 490 310" fill="none" stroke="currentColor" strokeWidth="3" markerStart="url(#arrow-line-start)" strokeLinecap="round" />
                </svg>
              </div>
            </div>

          </div>
        </div>
      </section>



      {/* <section className="py-12 sm:py-16 md:py-20 bg-[#fef6eb] dark:bg-slate-950 transition-colors duration-300">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800 dark:text-gray-100 mb-4">Featured Products</h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-400">Our bestsellers loved by pet owners everywhere</p>
          </motion.div>

          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
              {[1, 2, 3, 4].map((item) => (
                <div key={item} className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                  <div className="mb-4 h-48 animate-pulse rounded-xl bg-gray-200 dark:bg-slate-700" />
                  <div className="mb-2 h-4 w-2/3 animate-pulse rounded bg-gray-200 dark:bg-slate-700" />
                  <div className="h-4 w-1/2 animate-pulse rounded bg-gray-200 dark:bg-slate-700" />
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
              {featuredProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.15 }}
                  viewport={{ once: true }}
                  className="group flex justify-center"
                >
                  <ProductRevealCard
                    id={product.id}
                    name={product.name}
                    price={String(product.price)} // Ensure string
                    originalPrice={product.originalPrice ? String(product.originalPrice) : undefined}
                    image={product.images && product.images.length > 0 ? product.images[0] : '/placeholder.png'}
                    description={product.description ? (product.description.length > 100 ? product.description.substring(0, 100) + '...' : product.description) : ''}
                    rating={product.rating || 0}
                    reviewCount={product.reviews || 0}
                    onAdd={() => addToCart({
                      id: product.id,
                      name: product.name,
                      price: String(product.price), // Cart expects string
                      image: product.images && product.images.length > 0 ? product.images[0] : '/placeholder.png',
                      petType: product.petType,
                      productCategory: product.productCategory
                    })}
                    className="w-full max-w-[320px]"
                  />
                </motion.div>
              ))}
            </div>
          )}

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <Link
              href="/products"
              className="bg-gray-800 dark:bg-gray-700 hover:bg-gray-900 dark:hover:bg-gray-600 text-white py-3 px-8 rounded-full font-semibold transition duration-300 inline-block"
            >
              View All Products
            </Link>
          </motion.div>
        </div>
      </section> */}



      <section className="relative py-24 bg-gradient-to-b from-orange-50 via-yellow-50 to-orange-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 overflow-hidden">

        {/* Floating Paws */}
        <div className="pointer-events-none absolute inset-0 opacity-[0.07]">
          <div className="absolute top-20 left-20 text-7xl animate-[float_6s_infinite_ease-in-out]">🐾</div>
          <div className="absolute bottom-10 right-32 text-7xl animate-[float_7s_infinite_ease-in-out]">🦴</div>
        </div>

        <div className="container mx-auto px-6 relative">

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-4xl mx-auto px-4"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-800 dark:text-gray-100 leading-tight">
              Why <span className="text-green-600">BFAB</span> is the Best Choice for Your Pet .
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-400 mt-3 sm:mt-4 leading-relaxed">
              A clean, science-backed and pet-approved supplement vs mass-market shortcuts.
            </p>
          </motion.div>


          {/* Split Cards */}
          <div className="mt-12 sm:mt-16 md:mt-20 grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12">

            {/* BFAB Block */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative p-6 sm:p-8 lg:p-10 bg-gradient-to-br from-green-50 to-blue-50 dark:from-green-900/30 dark:to-blue-900/20 rounded-2xl sm:rounded-3xl shadow-xl border-2 sm:border-4 border-green-300 dark:border-green-700"
            >
              <div className="absolute -top-3 sm:-top-4 lg:-top-6 left-4 sm:left-6 bg-green-500 text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-full font-semibold text-xs sm:text-sm shadow">
                🏆 BFAB Advantage
              </div>

              <div className="text-center mb-4 sm:mb-6 mt-4 sm:mt-6">
                {/* Responsive Image */}
                <div className="mx-auto rounded-xl sm:rounded-2xl overflow-hidden shadow-lg sm:shadow-xl border-2 border-green-400 bg-white dark:bg-slate-800 w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 lg:w-48 lg:h-48 xl:w-52 xl:h-52 transition-all duration-300 hover:scale-105">
                  <Image
                    src="/other/2.png"
                    alt="BFAB Product"
                    width={500}
                    height={500}
                    className="object-cover w-full h-full"
                  />
                </div>

                <p className="mt-2 sm:mt-3 text-sm sm:text-base text-green-700 font-semibold dark:text-green-300">
                  Premium Pet Nutrition
                </p>
              </div>

            </motion.div>

            {/* Other Brand Block */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative p-6 sm:p-8 lg:p-10 bg-gradient-to-br from-red-50 to-orange-50 dark:from-red-900/30 dark:to-orange-900/20 rounded-2xl sm:rounded-3xl shadow-xl border-2 sm:border-4 border-red-300 dark:border-red-700"
            >
              <div className="absolute -top-3 sm:-top-4 lg:-top-6 right-4 sm:right-6 bg-red-500 text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-full font-semibold text-xs sm:text-sm shadow">
                ⚠️ Common Issues
              </div>

              <div className="text-center mb-4 sm:mb-6 mt-4 sm:mt-6">
                {/* Responsive Image */}
                <div className="mx-auto rounded-xl sm:rounded-2xl overflow-hidden shadow-lg sm:shadow-xl border-2 border-red-400 bg-white dark:bg-slate-800 w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 lg:w-48 lg:h-48 xl:w-52 xl:h-52 opacity-95 transition-all duration-300 hover:scale-105">
                  <Image
                    src="/other/1.png"
                    alt="Other Brand Product"
                    width={500}
                    height={500}
                    className="object-cover w-full h-full"
                  />
                </div>

                <p className="mt-2 sm:mt-3 text-sm sm:text-base text-red-600 font-semibold dark:text-red-400">
                  Mass Market Brands
                </p>
              </div>

            </motion.div>

          </div>



          {/* Responsive Comparison Table */}
          <div className="mt-16 sm:mt-20 md:mt-24 bg-white dark:bg-slate-800 rounded-3xl shadow-2xl overflow-hidden border border-gray-100 dark:border-slate-700">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[600px] text-left border-collapse">
                <thead>
                  <tr className="bg-gradient-to-r from-gray-900 to-gray-800 dark:from-slate-950 dark:to-slate-900 text-white">
                    <th className="py-5 sm:py-6 px-6 sm:px-8 text-left font-bold text-sm sm:text-base tracking-wide uppercase">Features</th>
                    <th className="py-5 sm:py-6 px-6 sm:px-8 text-center font-bold text-green-400 text-sm sm:text-base tracking-wide uppercase bg-green-900/20">BFAB 🐾</th>
                    <th className="py-5 sm:py-6 px-6 sm:px-8 text-center font-bold text-red-400 text-sm sm:text-base tracking-wide uppercase">Others ❌</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-slate-700">
                  {[
                    { label: "Human-Grade, Natural Ingredients", bfab: "✔️", other: "✗" },
                    { label: "Vet-Approved & Certified (HACCP, ISO, GMP)", bfab: "✔️", other: "✗" },
                    { label: "Zero Fillers or Artificial Additives", bfab: "✔️", other: "✗" },
                    { label: "High-Potency Functional Blends", bfab: "✔️", other: "⚠️ Inconsistent" },
                    { label: "Targeted Relief for Real Conditions", bfab: "✔️", other: "⚠️ Symptom-Based Only" },
                    { label: "Backed by Research & Evidence", bfab: "✔️", other: "✗ Outdated Formulas" }
                  ].map((row, i) => (
                    <tr key={i} className="group hover:bg-gray-50 dark:hover:bg-slate-700/30 transition-colors duration-200">
                      <td className="py-4 sm:py-5 px-6 sm:px-8 font-medium text-gray-700 dark:text-gray-200 text-sm sm:text-base group-hover:text-gray-900 dark:group-hover:text-white transition-colors">{row.label}</td>
                      <td className="py-4 sm:py-5 px-6 sm:px-8 text-center text-lg sm:text-xl font-bold text-green-600 dark:text-green-400 bg-green-50/50 dark:bg-green-900/10 group-hover:bg-green-100/50 dark:group-hover:bg-green-900/20 transition-colors">{row.bfab}</td>
                      <td className="py-4 sm:py-5 px-6 sm:px-8 text-center text-sm sm:text-base font-semibold text-red-500 dark:text-red-400 opacity-80">{row.other}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>


          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mt-12 sm:mt-16 lg:mt-20 text-center px-4"
          >
            <Link
              href="/products"
              className="inline-block bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700 text-white font-bold text-sm sm:text-base lg:text-lg py-3 sm:py-4 px-6 sm:px-8 lg:px-10 rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
            >
              Shop BFAB Now – Give Your Pet the Best!
            </Link>
          </motion.div>

        </div>
      </section>

      {/* Vet Reviewed Section */}
      <section className="relative py-16 sm:py-20 md:py-24 lg:py-28 bg-white dark:bg-slate-900 overflow-hidden">

        {/* Background Accents */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-10 left-10 w-56 h-56 bg-blue-400/10 rounded-3xl blur-3xl"></div>
          <div className="absolute bottom-0 right-10 w-72 h-72 bg-purple-300/10 rounded-3xl blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto px-6 lg:px-10 relative">

          {/* Section Heading */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-center mb-20"
          >
            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-gray-100 tracking-tight">
              Recommended & Trusted By
              <span className="ml-2 text-green-600 dark:text-green-400">Veterinary Experts</span>
            </h2>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Backed by clinical evaluation, expert certification, and strict ingredient quality checks.
            </p>
          </motion.div>

          {/* Main Content Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

            {/* Left: Improved Circular Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="flex justify-center"
            >
              <div className="relative w-[260px] h-[260px] md:w-[340px] md:h-[340px] flex items-center justify-center">

                {/* Glow Halo */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-br 
            from-green-400/20 via-emerald-400/10 to-teal-300/20 blur-3xl">
                </div>

                {/* Outer Gradient Ring */}
                <div className="relative w-full h-full rounded-full p-[6px] 
            bg-gradient-to-br from-green-500 to-emerald-500 shadow-xl">

                  {/* Glass Inner Middle Ring */}
                  <div className="w-full h-full rounded-full backdrop-blur-xl bg-white/20 dark:bg-white/5 p-[6px]">

                    {/* INNER IMAGE CIRCLE */}
                    <div className="w-full h-full rounded-full overflow-hidden relative border-4 
                border-white/60 dark:border-slate-800 shadow-lg">

                      <Image
                        src="/vet.png"
                        alt="Veterinarian"
                        fill
                        sizes="(max-width: 768px) 260px, 340px"
                        className="object-cover object-[center_40%]  rounded-full"
                      />
                    </div>
                  </div>
                </div>

                {/* Verified Badge */}
                <div className="absolute -bottom-3 right-2 bg-green-600 text-white p-3 rounded-full shadow-lg">
                  <ShieldCheck size={28} />
                </div>

              </div>
            </motion.div>

            {/* Right: Testimonial */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <div className="relative bg-white/70 dark:bg-white/5 backdrop-blur-xl rounded-3xl shadow-xl p-10 
          border border-white/50 dark:border-white/10">

                {/* Accent Line */}
                <div className="absolute left-0 top-8 w-1 h-24 bg-gradient-to-b from-green-500 to-emerald-500 rounded-full"></div>

                <div className="ml-6">
                  <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-800 dark:text-gray-200 italic leading-relaxed font-medium">
                    “As an experienced veterinarian, I confidently recommend Beggin For A Bite products. Every formula is thoroughly assessed and certified, ensuring only the finest-quality ingredients are used. These supplements provide excellent support for improving and maintaining your dog’s or cat’s health, especially when they begin to show signs of decline.”
                  </p>

                  <div className="mt-6 pt-4 border-t border-gray-200/40 dark:border-gray-700/60">
                    <p className="text-lg font-bold text-green-700 dark:text-green-400">
                      Dr. Lokhnath Mishra
                    </p>
                    <p className="text-sm text-green-600 dark:text-green-500">
                      MVSc — Veterinary Consultant
                    </p>
                  </div>
                </div>

              </div>
            </motion.div>

          </div>
        </div>
      </section>

      <section className="bg-white dark:bg-slate-800 transition-colors duration-300">
        <TestimonialSlider />
      </section>

      <section className="py-12 bg-white dark:bg-slate-900 border-y border-gray-100 dark:border-slate-800 text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-gray-100 flex items-center justify-center gap-3">
            <span className="text-yellow-400">★★★★★</span>
            Rated 4.8 by Verified Buyers
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Trusted by pet parents everywhere for vet-formulated, zero-filler nutrition.
          </p>
        </div>
      </section>

      {/* Trust Guarantees Section */}
      <section className="py-12 sm:py-16 md:py-20 bg-[#fef6eb] dark:bg-slate-950 transition-colors duration-300">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-gray-100 mb-4">Why Shop With Confidence</h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">We&apos;ve got you covered every step of the way</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Truck,
                title: '🚚 Free Shipping',
                description: 'Free delivery on all orders over ₹999. Fast and secure shipping to your doorstep.',
                color: 'from-blue-500 to-blue-600',
              },
              {
                icon: Phone,
                title: '📞 24/7 Customer Support',
                description: 'Our dedicated team is here to help. Get expert advice and quick responses anytime.',
                color: 'from-green-500 to-green-600',
              },
              {
                icon: RotateCcw,
                title: '✅ 90-Day Money Back Guarantee',
                description: 'Not satisfied? Get a full refund within 90 days. We want you and your pet 100% happy.',
                color: 'from-purple-500 to-purple-600',
              },
            ].map((guarantee, index) => {
              const IconComponent = guarantee.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="text-center p-8 rounded-2xl bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group"
                >
                  <div className={`bg-gradient-to-br ${guarantee.color} text-white w-16 h-16 rounded-2xl rotate-3 group-hover:rotate-6 transition-transform duration-300 flex items-center justify-center mx-auto mb-6 shadow-lg`}>
                    <IconComponent size={32} />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-3">{guarantee.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-sm sm:text-base">{guarantee.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Partner/Stars Section */}
      <section className="py-16 md:py-24 bg-white dark:bg-slate-900 border-t border-gray-100 dark:border-slate-800 overflow-hidden">
        <div className="container mx-auto px-4 md:px-6 max-w-[1300px]">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
            
            {/* Left side: Typography & Graphics */}
            <div className="lg:w-1/3 flex flex-col items-center lg:items-start text-center lg:text-left relative">
              {/* Burst lines SVG */}
              <div className="absolute -top-6 -left-6 lg:-left-12 w-48 h-48 pointer-events-none text-[#b23261] opacity-80">
                <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                  <path d="M20 20 L30 30" />
                  <path d="M10 50 L25 50" />
                  <path d="M20 80 L30 70" />
                  <path d="M80 20 L70 30" />
                  <path d="M90 50 L75 50" />
                  <path d="M80 80 L70 70" />
                </svg>
              </div>
              
              <h2 className="text-[3.5rem] md:text-[4.5rem] font-bold text-[#b23261] leading-none z-10 flex flex-col uppercase" style={{ fontFamily: "cursive, 'Comic Sans MS', sans-serif" }}>
                <span>Stars</span>
                <span className="flex items-center gap-3">
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="mt-1"><path d="M20.8 4.6a5.5 5.5 0 0 0-7.7 0l-1.1 1-1.1-1a5.5 5.5 0 0 0-7.8 7.8l1 1 7.9 7.9 7.9-7.9 1-1a5.5 5.5 0 0 0 0-7.8z"/></svg>
                  Us!
                </span>
              </h2>
              <p className="text-[#b23261] text-lg md:text-xl mt-3 font-medium z-10" style={{ fontFamily: "cursive, 'Comic Sans MS', sans-serif" }}>
                (and we didn't even<br/>have to pay for it)
              </p>
            </div>

            {/* Right side: Scrolling Avatars */}
            <div className="lg:w-2/3 w-full overflow-hidden">
              {/* Using a horizontal scrolling flex container hiding the scrollbar */}
              <div className="flex gap-4 md:gap-6 overflow-x-auto pb-6 pt-4 scrollbar-hide snap-x" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                {[
                  { name: "Sara Ali Khan", img: "/products/1/20.png" },
                  { name: "Kajal Aggarwal", img: "/products/1/21.png" },
                  { name: "Soha Ali Khan", img: "/products/1/22.png" },
                  { name: "Kalki Koechlin", img: "/products/1/24.png" },
                  { name: "Arjun Kapoor", img: "/products/1/20.png" },
                  { name: "Malaika Arora", img: "/products/1/21.png" },
                  { name: "Sophie C...", img: "/products/1/22.png" },
                ].map((partner, idx) => (
                  <div key={idx} className="flex flex-col items-center gap-3 snap-start min-w-[120px] md:min-w-[140px]">
                    <div className="rounded-full p-1 border-[2.5px] border-[#b23261] hover:scale-105 transition-transform duration-300">
                      <div className="w-24 h-24 md:w-28 md:h-28 rounded-full overflow-hidden relative bg-gray-100">
                        <Image src={partner.img} alt={partner.name} fill className="object-cover" />
                      </div>
                    </div>
                    <span className="text-[13px] md:text-[15px] font-bold text-[#11241f] dark:text-gray-200 tracking-tight text-center">{partner.name}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Community / Join the Fam Section */}
      <section className="py-16 md:py-24 bg-white dark:bg-[#0a1512] overflow-hidden">
        <div className="container mx-auto px-4 md:px-8 max-w-[1200px]">
          <div className="flex flex-col md:flex-row items-center gap-12 lg:gap-24">
            
            {/* Left Side: Typography and Social Buttons */}
            <div className="w-full md:w-1/2 flex flex-col justify-center relative">
              
              {/* Heading */}
              <div className="relative inline-block mb-12">
                <h2 className="text-[4rem] sm:text-[5rem] lg:text-[6rem] font-bold text-[#11241f] dark:text-emerald-50 leading-[0.95] tracking-tight flex flex-col">
                  <span>Come, join</span>
                  <span className="relative inline-block pb-2">
                    the fam!
                    {/* Underline for 'the fam!' */}
                    <svg className="absolute bottom-0 left-0 w-full" height="8" viewBox="0 0 200 8" fill="none" preserveAspectRatio="none">
                      <path d="M2 6 Q 100 2 198 4" stroke="#b23261" strokeWidth="4" strokeLinecap="round" />
                    </svg>
                  </span>
                </h2>
                
                {/* Tilted 'GO TRUTH SEEKERS!' text */}
                <div 
                  className="absolute -right-8 sm:-right-24 top-16 sm:top-20 transform -rotate-12 text-[#b23261] font-bold text-3xl sm:text-4xl leading-tight uppercase flex flex-col items-center"
                  style={{ fontFamily: "cursive, 'Comic Sans MS', sans-serif" }}
                >
                  <span>GO</span>
                  <span>TRUTH</span>
                  <span>SEEKERS!</span>
                </div>
              </div>

              {/* Social Buttons */}
              <div className="flex flex-col gap-4 max-w-[400px]">
                {/* Instagram */}
                <Link href="#" className="flex items-center gap-3 w-full py-3 px-6 rounded-full border-[2.5px] border-[#b23261] text-[#b23261] hover:bg-[#b23261] hover:text-white transition-colors duration-300 group">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
                  <span className="font-semibold text-[17px] font-mono">Join our Instagram Community <span className="ml-2">→</span></span>
                </Link>

                <div className="flex gap-4">
                  {/* YouTube */}
                  <Link href="#" className="flex items-center justify-center gap-2 flex-1 py-3 px-4 rounded-full border-[2.5px] border-[#b23261] text-[#b23261] hover:bg-[#b23261] hover:text-white transition-colors duration-300">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33 2.78 2.78 0 0 0 1.94 2c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.33 29 29 0 0 0-.46-5.33z"/><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"/></svg>
                    <span className="font-semibold text-[17px] font-mono">YouTube <span className="ml-1">→</span></span>
                  </Link>

                  {/* LinkedIn */}
                  <Link href="#" className="flex items-center justify-center gap-2 flex-1 py-3 px-4 rounded-full border-[2.5px] border-[#b23261] text-[#b23261] hover:bg-[#b23261] hover:text-white transition-colors duration-300">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
                    <span className="font-semibold text-[17px] font-mono">LinkedIn <span className="ml-1">→</span></span>
                  </Link>
                </div>
              </div>

            </div>

            {/* Right Side: Image */}
            <div className="w-full md:w-1/2 flex justify-center md:justify-end mt-12 md:mt-0">
              <div className="relative w-full max-w-[500px] aspect-[4/3] rounded-3xl overflow-hidden shadow-xl bg-gray-100">
                <Image 
                  src="/products/1/20.png" 
                  alt="Community Member" 
                  fill 
                  className="object-cover" 
                />
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
