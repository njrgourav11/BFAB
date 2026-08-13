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
              { name: 'Dental Health', image: '/category/6.png', href: '/products' },
              { name: 'Gut Health', image: '/category/5.png', href: '/products' },
              { name: 'Hip & Joint', image: '/category/1.png', href: '/products' },
              { name: 'Weight Control', image: '/category/2.png', href: '/products' },
              { name: 'Anxiety Relief', image: '/category/3.png', href: '/products' },
              { name: 'Skin & Coat', image: '/category/4.png', href: '/products' }
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
                  <div className="relative flex justify-center items-center rounded-full transition-transform duration-500 group-hover:-translate-y-2">
                    <div className="relative overflow-hidden rounded-full w-28 h-28 sm:w-36 sm:h-36 md:w-40 md:h-40 bg-white shadow-md group-hover:shadow-xl transition-shadow duration-500">
                      <Image
                        src={category.image}
                        alt={category.name}
                        fill
                        className="object-cover scale-125 group-hover:scale-[1.35] transition duration-500"
                      />
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
      <section className="py-4 bg-[#0B1120] dark:bg-slate-900 border-y border-[#1E293B] dark:border-slate-800 shadow-sm relative z-10 overflow-hidden">
        <div className="flex overflow-hidden whitespace-nowrap">
          <motion.div
            className="flex items-center gap-x-8 md:gap-x-12 min-w-max pr-8 md:pr-12"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ repeat: Infinity, ease: "linear", duration: 30 }}
          >
            {[
              { icon: Users, text: '1k+ Pet Parents', color: 'text-blue-500' },
              { icon: TrendingUp, text: '9 out of 10 Saw Improvement', color: 'text-green-500' },
              { icon: ShieldCheck, text: 'Vet Formulated', color: 'text-purple-500' },
              { icon: Leaf, text: 'All Natural', color: 'text-emerald-500' },
              { icon: Award, text: 'Made in India (GMP)', color: 'text-orange-500' },
              { icon: RotateCcw, text: '90-Day Guarantee', color: 'text-pink-500' },
              { icon: Users, text: '1k+ Pet Parents', color: 'text-blue-500' },
              { icon: TrendingUp, text: '9 out of 10 Saw Improvement', color: 'text-green-500' },
              { icon: ShieldCheck, text: 'Vet Formulated', color: 'text-purple-500' },
              { icon: Leaf, text: 'All Natural', color: 'text-emerald-500' },
              { icon: Award, text: 'Made in India (GMP)', color: 'text-orange-500' },
              { icon: RotateCcw, text: '90-Day Guarantee', color: 'text-pink-500' },
            ].map((item, idx) => {
              const Icon = item.icon;
              return (
                <div key={idx} className="flex items-center gap-3">
                  <Icon size={18} className={item.color} />
                  <span className="text-sm font-semibold text-gray-100 whitespace-nowrap">{item.text}</span>
                  <span className="text-[#334155] ml-5 md:ml-9">•</span>
                </div>
              )
            })}
          </motion.div>
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
                Formulated with <span className="border-b-4 border-[#8B234D] pb-1">clinically supported </span> ingredients to help dogs & cats <span className="border-b-4 border-[#8B234D] pb-1">live healthier, happier lives.</span>
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
                    const lowerName = product.name.toLowerCase();
                    let color = { bg: 'bg-[#781B43]', hover: 'group-hover:bg-[#5C1533]' }; // Fallback
                    let displayName = product.name;
                    
                    if (lowerName.includes('prebiotic')) {
                      color = { bg: 'bg-[#28676b]', hover: 'group-hover:bg-[#1e5053]' };
                      displayName = 'Prebiotic ProTopper Supplement';
                    } else if (lowerName.includes('hip') || lowerName.includes('joint')) {
                      color = { bg: 'bg-[#459fb9]', hover: 'group-hover:bg-[#337a91]' };
                      displayName = 'Hip & Joint Supplement';
                    } else if (lowerName.includes('hemp') || lowerName.includes('anxiety')) {
                      color = { bg: 'bg-[#b5cb7f]', hover: 'group-hover:bg-[#9db468]' };
                      displayName = 'Hemp Seed Oil Anxiety Supplement';
                    }

                    return (
                      <Link href={`/product/${product.id}`} key={product.id} className="group rounded-xl overflow-hidden bg-[#F8F9FA] dark:bg-slate-900 border border-gray-100 dark:border-slate-800 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col h-full cursor-pointer">
                        <div className="relative p-6 flex-grow flex items-center justify-center min-h-[220px]">
                          <Image src={product.images && product.images.length > 0 ? product.images[0] : '/placeholder.png'} alt={product.name} width={150} height={150} className="object-contain group-hover:scale-105 transition-transform duration-500 drop-shadow-md" />
                        </div>
                        <div className={`${color.bg} text-white p-5 mt-auto flex justify-center items-center ${color.hover} transition-colors`}>
                          <div className="w-full text-center">
                            <h3 className="font-extrabold text-sm sm:text-base leading-tight tracking-wide line-clamp-1">{displayName}</h3>
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
                Not just <span className="border-b-4 border-[#8B234D] pb-1">Delicious</span> <br /> <span className="border-b-4 border-[#8B234D] pb-1">Naturally Nutritious</span> , <br /> made with <span className="border-b-4 border-[#8B234D] pb-1">Real Ingredients</span> , <br />for <span className="border-b-4 border-[#8B234D] pb-1"> Healthier, Happier companions</span> .
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
                    let color = { bg: 'bg-[#5A942F]', hover: 'group-hover:bg-[#487824]' }; // Fallback
                    let displayName = product.name;
                    
                    if (idx === 0) {
                      color = { bg: 'bg-[#ff5757]', hover: 'group-hover:bg-[#e64e4e]' };
                      displayName = 'Chicken Breast Jerky';
                    } else if (idx === 1) {
                      color = { bg: 'bg-[#4c74b1]', hover: 'group-hover:bg-[#3d5d8e]' };
                      displayName = 'Yak-Yak Dental Chews';
                    } else if (idx === 2) {
                      color = { bg: 'bg-[#94463c]', hover: 'group-hover:bg-[#763830]' };
                      displayName = 'Peanut Butter for Dogs';
                    }

                    return (
                      <Link href={`/product/${product.id}`} key={product.id} className="group rounded-xl overflow-hidden bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col h-full cursor-pointer">
                        <div className="relative p-6 flex-grow flex items-center justify-center min-h-[220px]">
                          <Image src={product.images && product.images.length > 0 ? product.images[0] : '/placeholder.png'} alt={product.name} width={150} height={150} className="object-contain group-hover:scale-105 transition-transform duration-500 drop-shadow-md" />
                        </div>
                        <div className={`${color.bg} text-white p-5 mt-auto flex justify-center items-center ${color.hover} transition-colors`}>
                          <div className="w-full text-center">
                            <h3 className="font-extrabold text-sm sm:text-base leading-tight tracking-wide line-clamp-1">{displayName}</h3>
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
            Like you, we love our pets and care about their health. That’s why we created BFAB – a package that delivers freshly custom meals for dogs with balanced recipes, guided by science and driven by love.
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
                We're also<br/>fixing pet<br/>food myths.
              </h2>
              <p className="font-mono text-[15px] sm:text-base text-gray-800 dark:text-gray-300 leading-relaxed max-w-sm mt-2 font-medium tracking-tight">
                From healthy eating habits and ingredients to portion sizes, treats, supplements, and everyday nutrition, our blog helps pet parents make better, informed choices for their pets.
              </p>
              <div className="mt-4">
                <Link href="/blog" className="inline-flex items-center justify-center bg-[#b23261] text-white px-8 py-3 rounded-full font-bold text-lg hover:bg-[#91284f] transition-colors shadow-sm hover:shadow-md">
                  Blog
                </Link>
              </div>
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
                  <text x="180" y="210" fill="currentColor" fontFamily="cursive, 'Comic Sans MS', sans-serif" fontSize="18" fontWeight="bold" textAnchor="middle">What</text>
                  <text x="180" y="240" fill="currentColor" fontFamily="cursive, 'Comic Sans MS', sans-serif" fontSize="18" fontWeight="bold" textAnchor="middle">you feed them</text>

                  <text x="410" y="210" fill="currentColor" fontFamily="cursive, 'Comic Sans MS', sans-serif" fontSize="18" fontWeight="bold" textAnchor="middle">What</text>
                  <text x="410" y="240" fill="currentColor" fontFamily="cursive, 'Comic Sans MS', sans-serif" fontSize="18" fontWeight="bold" textAnchor="middle">they actually need</text>

                  {/* Top Left Text and Arrow */}
                  <text x="110" y="60" fill="currentColor" fontFamily="cursive, 'Comic Sans MS', sans-serif" fontSize="22" fontWeight="bold">We're working on</text>
                  <text x="110" y="90" fill="currentColor" fontFamily="cursive, 'Comic Sans MS', sans-serif" fontSize="22" fontWeight="bold">closing the gap</text>
                  
                  {/* Hand drawn arrow pointing to intersection */}
                  <path d="M 280 85 Q 310 90 295 115" fill="none" stroke="currentColor" strokeWidth="3" markerEnd="url(#arrow-line)" strokeLinecap="round" />


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


      <section className="bg-white dark:bg-slate-800 transition-colors duration-300">
        <TestimonialSlider />
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
              
              <h2 className="text-[2.5rem] md:text-[3.5rem] font-bold text-[#b23261] leading-none z-10 flex flex-col uppercase" style={{ fontFamily: "cursive, 'Comic Sans MS', sans-serif" }}>
                <span>Trusted By Pet</span>
                <span className="flex items-center gap-3">
                  Professionals
                </span>
              </h2>
              <p className="text-[#b23261] text-lg md:text-xl mt-3 font-medium z-10" style={{ fontFamily: "cursive, 'Comic Sans MS', sans-serif" }}>
                Together, creating healthier pets.
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
