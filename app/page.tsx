"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import {
  CheckCircle2,
  Leaf,
  ShieldCheck,
  Stethoscope,
  UtensilsCrossed,
  Flame,
  Award,
  Building2,
  Instagram,
  Youtube,
  Linkedin,
  Check,
  Ticket
} from 'lucide-react';
import { useCart } from './components/CartContext';
import { getAllCoupons } from '@/lib/coupon-utils';
import { Coupon } from '@/lib/types';

const TestimonialSlider = dynamic(() => import('@/components/ui/testimonial-slider'), {
  ssr: false,
  loading: () => <div className="h-80 animate-pulse rounded-2xl bg-gray-100 dark:bg-slate-800" />,
});

export default function Home() {
  const { appliedCoupon, applyCoupon } = useCart();
  const [activeCoupons, setActiveCoupons] = useState<Coupon[]>([]);
  const [couponInput, setCouponInput] = useState('');
  const [promoSuccess, setPromoSuccess] = useState<string | null>(null);

  useEffect(() => {
    getAllCoupons().then(list => {
      setActiveCoupons(list.filter(c => c.isActive).slice(0, 4));
    }).catch(err => {
      console.warn("Could not load coupons:", err);
    });
  }, []);

  const handleApplyPromo = async (codeToUse?: string) => {
    const code = (codeToUse || couponInput).trim();
    if (!code) return;
    const res = await applyCoupon(code);
    if (res.success) {
      setPromoSuccess(res.message);
      setCouponInput('');
      setTimeout(() => setPromoSuccess(null), 4000);
    }
  };

  return (
    <div className="bg-white dark:bg-slate-950 text-gray-900 dark:text-gray-100 transition-colors">
      
      {/* Partner Promo Strip (If Coupon is Active or Shared) */}
      {appliedCoupon && (
        <div className="bg-[#FAF7F2] border-b border-orange-200/60 py-2.5 px-4 text-center text-xs sm:text-sm font-semibold text-[#D95D39] flex items-center justify-center gap-2">
          <Ticket size={16} />
          <span>Partner Discount Active: <strong>{appliedCoupon.code}</strong> ({appliedCoupon.discountType === 'percentage' ? `${appliedCoupon.discountValue}% OFF` : `₹${appliedCoupon.discountValue} OFF`}) • {appliedCoupon.groupName}</span>
        </div>
      )}

      {/* 1. HERO SECTION */}
      <section className="relative w-full bg-[#FAF7F2] dark:bg-[#0a1512] overflow-hidden">
        <Link href="/products" className="block w-full cursor-pointer group">
          {/* Desktop Hero - matches hero.svg natural aspect ratio 1440x540 (2.67:1) */}
          <div className="hidden md:block w-full relative aspect-[1440/540] max-w-[1440px] mx-auto">
            <Image
              src="/hero.svg"
              alt="PetCare Prescribed by Vets and Delivered to You"
              fill
              priority
              className="object-contain"
            />
          </div>
          {/* Mobile Hero - matches mobile.png natural aspect ratio 375x540 */}
          <div className="block md:hidden w-full relative aspect-[375/540] max-w-[480px] mx-auto">
            <Image
              src="/images/mobile.png"
              alt="PetCare Prescribed by Vets and Delivered to You"
              fill
              priority
              className="object-contain"
            />
          </div>
        </Link>
      </section>

      {/* 2. SHOP BY CONCERN SECTION */}
      <section className="py-8 sm:py-10 md:py-12 bg-white dark:bg-slate-950 transition-colors">
        <div className="container mx-auto px-4 md:px-6 max-w-7xl">
          <div className="text-center mb-6 sm:mb-8">
            <h2 className="font-fredoka font-black text-3xl sm:text-4xl md:text-5xl text-[#F4623B] mb-2 sm:mb-3 tracking-tight">
              Shop By Concern
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-gray-600 dark:text-gray-400 font-medium">
              Targeted solutions for your pet's specific needs
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-5 sm:gap-6 justify-items-center">
            {[
              { name: 'Dental Health', image: '/category/6.png', href: '/products?category=Dental%20Health' },
              { name: 'Hip & Joint', image: '/category/1.png', href: '/products?category=Hip%20%26%20Joint' },
              { name: 'Gut Health', image: '/category/5.png', href: '/products?category=Gut%20Health' },
              { name: 'Weight Control', image: '/category/2.png', href: '/products?category=Weight%20Control' },
              { name: 'Anxiety & Stress', image: '/category/3.png', href: '/products?category=Anxiety%20Relief' },
              { name: 'Skin & Coat', image: '/category/4.png', href: '/products?category=Skin%20%26%20Coat' }
            ].map((cat, idx) => (
              <Link
                key={idx}
                href={cat.href}
                className="group flex flex-col items-center text-center w-full max-w-[150px] transition-transform duration-300 hover:-translate-y-1.5"
              >
                <div className="relative w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 rounded-full overflow-hidden mb-2.5 shadow-sm group-hover:shadow-md transition-all duration-300 group-hover:scale-105">
                  <Image
                    src={cat.image}
                    alt={cat.name}
                    fill
                    className="object-contain rounded-full"
                  />
                </div>
                <span className="font-fredoka font-bold text-xs sm:text-sm text-gray-800 dark:text-gray-100 group-hover:text-[#F4623B] transition-colors leading-tight">
                  {cat.name}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 4. WE CREATE PET WELLNESS */}
      <section className="py-8 sm:py-10 md:py-12 bg-white dark:bg-slate-950 overflow-hidden">
        <div className="container mx-auto px-4 md:px-8 max-w-6xl">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-10">
            {/* Left Text */}
            <div className="w-full lg:w-5/12 max-w-md lg:pl-6 xl:pl-10">
              <h2 className="font-fredoka font-black text-5xl sm:text-6xl md:text-7xl text-[#F4623B] leading-[0.98] tracking-tight mb-5 sm:mb-6">
                We<br />
                Create<br />
                Pet<br />
                Wellness.
              </h2>
              <div className="text-base sm:text-lg md:text-xl font-bold text-gray-900 dark:text-gray-100 leading-snug">
                <p>
                  Formulate with{' '}
                  <span className="relative inline-block">
                    clinically
                    <svg className="absolute -bottom-1.5 left-0 w-full h-2.5 text-[#F4623B]" viewBox="0 0 120 12" fill="none" preserveAspectRatio="none">
                      <path d="M2 7 C 35 12, 85 2, 118 7" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" />
                    </svg>
                  </span>
                </p>
                <p className="mt-1">
                  supported ingredients{' '}
                  <span className="relative inline-block">
                    to help
                    <svg className="absolute -bottom-1.5 left-0 w-full h-2.5 text-[#F4623B]" viewBox="0 0 90 12" fill="none" preserveAspectRatio="none">
                      <path d="M2 6 C 25 11, 65 3, 88 7" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" />
                    </svg>
                  </span>
                </p>
                <p className="mt-1">
                  <span className="relative inline-block">
                    dogs &amp; cats live healthier, happier
                    <svg className="absolute -bottom-1.5 left-0 w-full h-3 text-[#F4623B]" viewBox="0 0 320 14" fill="none" preserveAspectRatio="none">
                      <path d="M3 8 C 80 14, 240 2, 317 7" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
                    </svg>
                  </span>
                </p>
                <p className="mt-1">lives.</p>
              </div>
            </div>

            {/* Right 3 Product Cards */}
            <div className="w-full lg:w-7/12">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 lg:gap-6 items-end">
                {/* Card 1: Prebiotic ProTopper */}
                <Link
                  href="/products"
                  className="group flex flex-col items-center text-center transition-transform duration-300 hover:-translate-y-2 cursor-pointer"
                >
                  <div className="relative z-20 w-full h-56 sm:h-64 md:h-72 flex items-end justify-center">
                    <Image
                      src="/products-media/pre.svg"
                      alt="Prebiotic ProTopper Supplement"
                      width={220}
                      height={220}
                      className="max-h-full w-auto object-contain drop-shadow-md group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="w-full bg-[#004542] text-white pt-7 sm:pt-8 pb-3.5 px-3 rounded-2xl shadow-sm text-center -mt-2 sm:-mt-2.5 md:-mt-3 relative z-10">
                    <h3 className="font-extrabold text-sm sm:text-base leading-tight">Prebiotic ProTopper</h3>
                    <p className="font-bold text-xs sm:text-sm leading-tight mt-0.5 opacity-95">Supplement</p>
                  </div>
                </Link>

                {/* Card 2: Hip & Joint */}
                <Link
                  href="/products"
                  className="group flex flex-col items-center text-center transition-transform duration-300 hover:-translate-y-2 cursor-pointer"
                >
                  <div className="relative z-20 w-full h-56 sm:h-64 md:h-72 flex items-end justify-center">
                    <Image
                      src="/products-media/hip.svg"
                      alt="Hip & Joint Supplement"
                      width={220}
                      height={220}
                      className="max-h-full w-auto object-contain drop-shadow-md group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="w-full bg-[#3A96BB] text-white pt-7 sm:pt-8 pb-3.5 px-3 rounded-2xl shadow-sm text-center -mt-2 sm:-mt-2.5 md:-mt-3 relative z-10">
                    <h3 className="font-extrabold text-sm sm:text-base leading-tight">Hip & Joint</h3>
                    <p className="font-bold text-xs sm:text-sm leading-tight mt-0.5 opacity-95">Supplement</p>
                  </div>
                </Link>

                {/* Card 3: Anxiety Relief (Hemp Seed Oil) */}
                <Link
                  href="/products"
                  className="group flex flex-col items-center text-center transition-transform duration-300 hover:-translate-y-2 cursor-pointer"
                >
                  <div className="relative z-20 w-full h-56 sm:h-64 md:h-72 flex items-end justify-center">
                    <Image
                      src="/products-media/hemp.svg"
                      alt="Anxiety Relief Supplement"
                      width={220}
                      height={220}
                      className="max-h-full w-auto object-contain drop-shadow-md group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="w-full bg-[#646E39] text-white pt-7 sm:pt-8 pb-3.5 px-3 rounded-2xl shadow-sm text-center -mt-2 sm:-mt-2.5 md:-mt-3 relative z-10">
                    <h3 className="font-extrabold text-sm sm:text-base leading-tight">Anxiety Relief</h3>
                    <p className="font-bold text-xs sm:text-sm leading-tight mt-0.5 opacity-95">Supplement</p>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. TRUST & QUALITY BADGES BAR (INFINITE SCROLL) */}
      <section className="py-3 sm:py-3.5 bg-white dark:bg-slate-900 border-y border-gray-100 dark:border-slate-800 shadow-sm relative z-10 overflow-hidden">
        <div className="flex overflow-hidden whitespace-nowrap select-none">
          <motion.div
            className="flex items-center gap-10 sm:gap-14 md:gap-16 min-w-max pr-10 sm:pr-14 md:pr-16"
            animate={{ x: ["0%", "-50%"] }}
            transition={{
              repeat: Infinity,
              ease: "linear",
              duration: 25,
            }}
          >
            {[
              { icon: '/trust_badge_1.png', text: 'Vet Formulated', w: 24, h: 28 },
              { icon: '/trust_badge_2.png', text: 'All Natural', w: 30, h: 28 },
              { icon: '/trust_badge_3.png', text: 'Made in India (GMP)', w: 28, h: 28 },
              { icon: '/trust_badge_4.png', text: '90-Day Guarantee', w: 23, h: 28 },
              { icon: '/trust_badge_5.png', text: '1K+ Pet Parents', w: 28, h: 28 },
              { icon: '/trust_badge_1.png', text: 'Vet Formulated', w: 24, h: 28 },
              { icon: '/trust_badge_2.png', text: 'All Natural', w: 30, h: 28 },
              { icon: '/trust_badge_3.png', text: 'Made in India (GMP)', w: 28, h: 28 },
              { icon: '/trust_badge_4.png', text: '90-Day Guarantee', w: 23, h: 28 },
              { icon: '/trust_badge_5.png', text: '1K+ Pet Parents', w: 28, h: 28 },
              { icon: '/trust_badge_1.png', text: 'Vet Formulated', w: 24, h: 28 },
              { icon: '/trust_badge_2.png', text: 'All Natural', w: 30, h: 28 },
              { icon: '/trust_badge_3.png', text: 'Made in India (GMP)', w: 28, h: 28 },
              { icon: '/trust_badge_4.png', text: '90-Day Guarantee', w: 23, h: 28 },
              { icon: '/trust_badge_5.png', text: '1K+ Pet Parents', w: 28, h: 28 },
              { icon: '/trust_badge_1.png', text: 'Vet Formulated', w: 24, h: 28 },
              { icon: '/trust_badge_2.png', text: 'All Natural', w: 30, h: 28 },
              { icon: '/trust_badge_3.png', text: 'Made in India (GMP)', w: 28, h: 28 },
              { icon: '/trust_badge_4.png', text: '90-Day Guarantee', w: 23, h: 28 },
              { icon: '/trust_badge_5.png', text: '1K+ Pet Parents', w: 28, h: 28 },
            ].map((item, idx) => (
              <div key={idx} className="flex items-center gap-3 shrink-0">
                <div className="relative w-7 h-7 shrink-0 flex items-center justify-center">
                  <Image
                    src={item.icon}
                    alt={item.text}
                    width={item.w}
                    height={item.h}
                    className="object-contain max-h-7 w-auto"
                  />
                </div>
                <span className="text-sm sm:text-base font-bold text-gray-900 dark:text-gray-100 tracking-tight whitespace-nowrap">
                  {item.text}
                </span>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 5. WE MAKE TREATS THAT CARE */}
      <section className="py-8 sm:py-10 md:py-12 bg-white dark:bg-slate-950 overflow-hidden">
        <div className="container mx-auto px-4 md:px-8 max-w-6xl">
          <div className="flex flex-col-reverse lg:flex-row items-center justify-between gap-8 lg:gap-10">
            {/* Left 3 Treat Cards */}
            <div className="w-full lg:w-7/12">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 lg:gap-6 items-end">
                {/* Treat 1: Chicken Breast Jerky */}
                <Link
                  href="/products"
                  className="group flex flex-col items-center text-center transition-transform duration-300 hover:-translate-y-2 cursor-pointer"
                >
                  <div className="relative z-20 w-full h-56 sm:h-64 md:h-72 flex items-end justify-center">
                    <Image
                      src="/products-media/jerky.svg"
                      alt="Chicken Breast Jerky"
                      width={220}
                      height={220}
                      className="max-h-full w-auto object-contain drop-shadow-md group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="w-full bg-[#00434B] text-white pt-7 sm:pt-8 pb-3.5 px-3 rounded-2xl shadow-sm text-center -mt-2 sm:-mt-2.5 md:-mt-3 relative z-10">
                    <h3 className="font-extrabold text-sm sm:text-base leading-tight">Chicken Breast</h3>
                    <p className="font-bold text-xs sm:text-sm leading-tight mt-0.5 opacity-95">Jerky</p>
                  </div>
                </Link>

                {/* Treat 2: Peanut Butter For Dogs */}
                <Link
                  href="/products"
                  className="group flex flex-col items-center text-center transition-transform duration-300 hover:-translate-y-2 cursor-pointer"
                >
                  <div className="relative z-20 w-full h-56 sm:h-64 md:h-72 flex items-end justify-center">
                    <Image
                      src="/products-media/peanut.svg"
                      alt="Peanut Butter For Dogs"
                      width={220}
                      height={220}
                      className="max-h-full w-auto object-contain drop-shadow-md group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="w-full bg-[#1D3E33] text-white pt-7 sm:pt-8 pb-3.5 px-3 rounded-2xl shadow-sm text-center -mt-2 sm:-mt-2.5 md:-mt-3 relative z-10">
                    <h3 className="font-extrabold text-sm sm:text-base leading-tight">Peanut Butter</h3>
                    <p className="font-bold text-xs sm:text-sm leading-tight mt-0.5 opacity-95">For Dogs</p>
                  </div>
                </Link>

                {/* Treat 3: Nutri-Treats for Pet's */}
                <Link
                  href="/products"
                  className="group flex flex-col items-center text-center transition-transform duration-300 hover:-translate-y-2 cursor-pointer"
                >
                  <div className="relative z-20 w-full h-56 sm:h-64 md:h-72 flex items-end justify-center">
                    <Image
                      src="/products-media/treat.svg"
                      alt="Nutri-Treats for Pet's"
                      width={220}
                      height={220}
                      className="max-h-full w-auto object-contain drop-shadow-md group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="w-full bg-[#656F3D] text-white pt-7 sm:pt-8 pb-3.5 px-3 rounded-2xl shadow-sm text-center -mt-2 sm:-mt-2.5 md:-mt-3 relative z-10">
                    <h3 className="font-extrabold text-sm sm:text-base leading-tight">Nutri–Treats</h3>
                    <p className="font-bold text-xs sm:text-sm leading-tight mt-0.5 opacity-95">for Pet's</p>
                  </div>
                </Link>
              </div>
            </div>

            {/* Right Text */}
            <div className="w-full lg:w-5/12 max-w-md text-left lg:pr-6 xl:pr-10">
              <h2 className="font-fredoka font-black text-5xl sm:text-6xl md:text-7xl text-[#F4623B] leading-[0.98] tracking-tight mb-5 sm:mb-6">
                We Make<br />
                Treats<br />
                That<br />
                Care.
              </h2>
              <div className="text-base sm:text-lg md:text-xl font-bold text-gray-900 dark:text-gray-100 leading-snug">
                <p>
                  Not just{' '}
                  <span className="relative inline-block">
                    Delicious Naturally
                    <svg className="absolute -bottom-1.5 left-0 w-full h-2.5 text-[#F4623B]" viewBox="0 0 170 12" fill="none" preserveAspectRatio="none">
                      <path d="M2 7 C 45 12, 125 2, 168 7" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" />
                    </svg>
                  </span>
                </p>
                <p className="mt-1">
                  Nutritious, made with{' '}
                  <span className="relative inline-block">
                    Real
                    <svg className="absolute -bottom-1.5 left-0 w-full h-2.5 text-[#F4623B]" viewBox="0 0 50 12" fill="none" preserveAspectRatio="none">
                      <path d="M2 7 C 15 11, 35 3, 48 7" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" />
                    </svg>
                  </span>
                </p>
                <p className="mt-1">
                  Ingredients, for{' '}
                  <span className="relative inline-block">
                    Healthier, Happier
                    <svg className="absolute -bottom-1.5 left-0 w-full h-2.5 text-[#F4623B]" viewBox="0 0 170 12" fill="none" preserveAspectRatio="none">
                      <path d="M2 7 C 45 12, 125 2, 168 7" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" />
                    </svg>
                  </span>
                </p>
                <p className="mt-1">
                  <span className="relative inline-block">
                    companions.
                    <svg className="absolute -bottom-1.5 left-0 w-full h-2.5 text-[#F4623B]" viewBox="0 0 120 12" fill="none" preserveAspectRatio="none">
                      <path d="M2 7 C 30 11, 85 3, 118 7" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" />
                    </svg>
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. HEALTHY EATING FEATURE & MEALS */}
      <section className="py-10 sm:py-12 md:py-14 bg-white dark:bg-slate-950 overflow-hidden">
        <div className="container mx-auto px-4 md:px-8 max-w-6xl">
          <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#D95D39] leading-tight mb-3 sm:mb-4 tracking-tight">
              You shouldn't be the only <br className="hidden sm:block" /> one eating healthy
            </h2>
            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 font-medium leading-relaxed mb-5">
              Give your best friend real human-grade meals crafted from wholesome ingredients and packed with nutrients. Because a fresh dog is a happy dog.
            </p>
            <Link
              href="/products"
              className="inline-flex items-center justify-center bg-[#D95D39] hover:bg-[#c44e2c] text-white px-8 py-3 rounded-full font-bold text-xs sm:text-sm tracking-wider uppercase transition-colors shadow-sm"
            >
              OUR MEALS
            </Link>
          </div>

          {/* Center Graphic + 4 Feature Callouts */}
          <div className="grid grid-cols-1 lg:grid-cols-12 items-center gap-8 lg:gap-4 max-w-6xl mx-auto">
            {/* Left 2 Callouts */}
            <div className="lg:col-span-3 flex flex-col justify-around h-full space-y-8 lg:space-y-16 order-2 lg:order-1">
              {/* Feature 1: Real Food */}
              <div className="flex flex-col items-start text-left max-w-xs mx-auto lg:mx-0">
                <div className="flex items-center gap-3 mb-2">
                  <div className="relative w-12 h-12 sm:w-14 sm:h-14 shrink-0">
                    <Image
                      src="/products-media/icon_real_food.svg"
                      alt="Real Food icon"
                      fill
                      className="object-contain"
                    />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-black text-[#D95D39] tracking-tight">Real Food</h3>
                </div>
                <p className="text-xs sm:text-sm text-gray-700 dark:text-gray-300 font-medium leading-relaxed pl-1">
                  Human-grade meat and veggies in simple recipes, made for dogs.
                </p>
              </div>

              {/* Feature 3: Health Focused */}
              <div className="flex flex-col items-start text-left max-w-xs mx-auto lg:mx-0">
                <div className="flex items-center gap-3 mb-2">
                  <div className="relative w-12 h-12 sm:w-14 sm:h-14 shrink-0">
                    <Image
                      src="/products-media/icon_health_focused.svg"
                      alt="Health Focused icon"
                      fill
                      className="object-contain"
                    />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-black text-[#D95D39] tracking-tight">Health Focused</h3>
                </div>
                <p className="text-xs sm:text-sm text-gray-700 dark:text-gray-300 font-medium leading-relaxed pl-1">
                  Our food is custom made to target specific health issues.
                </p>
              </div>
            </div>

            {/* Center Circle Backdrop + Pouches */}
            <div className="lg:col-span-6 flex justify-center order-1 lg:order-2">
              <div className="relative w-80 h-80 sm:w-96 sm:h-96 md:w-[440px] md:h-[440px] flex items-center justify-center">
                {/* Terracotta/coral backdrop circle from bowl.svg */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="relative w-[290px] h-[290px] sm:w-[330px] sm:h-[330px] md:w-[365px] md:h-[365px]">
                    <Image
                      src="/products-media/bowl.svg"
                      alt="Backdrop Circle"
                      fill
                      className="object-contain"
                      priority
                    />
                  </div>
                </div>

                {/* Two large overlapping meal pouches with hover shake */}
                <div className="relative z-10 flex items-center justify-center -space-x-12 sm:-space-x-16 md:-space-x-20">
                  {/* Left: Vegie Meal Bowl */}
                  <motion.div
                    whileHover={{
                      rotate: [0, -4, 4, -3, 3, -1, 0],
                      scale: 1.06,
                      transition: { duration: 0.45, ease: "easeInOut" }
                    }}
                    className="relative w-44 sm:w-52 md:w-60 aspect-[288/351] cursor-pointer"
                  >
                    <Image
                      src="/products-media/vegmeals.svg"
                      alt="No Nonsense Vegie Meal Bowl"
                      fill
                      className="object-contain drop-shadow-2xl"
                    />
                  </motion.div>
                  {/* Right: Non-Veg Meal Bowl (in front) */}
                  <motion.div
                    whileHover={{
                      rotate: [0, 4, -4, 3, -3, 1, 0],
                      scale: 1.06,
                      transition: { duration: 0.45, ease: "easeInOut" }
                    }}
                    className="relative w-44 sm:w-52 md:w-60 aspect-[289/354] z-20 cursor-pointer"
                  >
                    <Image
                      src="/products-media/meat.svg"
                      alt="No Nonsense Non-Veg Meal Bowl"
                      fill
                      className="object-contain drop-shadow-2xl"
                    />
                  </motion.div>
                </div>
              </div>
            </div>

            {/* Right 2 Callouts */}
            <div className="lg:col-span-3 flex flex-col justify-around h-full space-y-8 lg:space-y-16 order-3 lg:order-3">
              {/* Feature 2: Gently Cooked */}
              <div className="flex flex-col items-start text-left max-w-xs mx-auto lg:mx-0">
                <div className="flex items-center gap-3 mb-2">
                  <div className="relative w-12 h-12 sm:w-14 sm:h-14 shrink-0">
                    <Image
                      src="/products-media/icon_gently_cooked.svg"
                      alt="Gently Cooked icon"
                      fill
                      className="object-contain"
                    />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-black text-[#D95D39] tracking-tight">Gently Cooked</h3>
                </div>
                <p className="text-xs sm:text-sm text-gray-700 dark:text-gray-300 font-medium leading-relaxed pl-1">
                  Maintain whole food and nutritional integrity.
                </p>
              </div>

              {/* Feature 4: Professionally Developed */}
              <div className="flex flex-col items-start text-left max-w-xs mx-auto lg:mx-0">
                <div className="flex items-center gap-3 mb-2">
                  <div className="relative w-12 h-12 sm:w-14 sm:h-14 shrink-0">
                    <Image
                      src="/products-media/icon_professionally_developed.svg"
                      alt="Professionally Developed icon"
                      fill
                      className="object-contain"
                    />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-black text-[#D95D39] tracking-tight">Professionally Developed</h3>
                </div>
                <p className="text-xs sm:text-sm text-gray-700 dark:text-gray-300 font-medium leading-relaxed pl-1">
                  Nutrition that exceeds industry standards (AAFCO).
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. FIXING PET FOOD MYTHS */}
      <section className="py-10 sm:py-12 md:py-14 bg-white dark:bg-slate-950 overflow-hidden border-t border-orange-100/60 dark:border-slate-800">
        <div className="container mx-auto px-4 md:px-8 max-w-6xl">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 md:gap-12">
            {/* Left Content */}
            <div className="md:w-5/12 max-w-lg">
              <h2 className="font-fredoka font-black text-5xl sm:text-6xl md:text-7xl text-[#F4623B] leading-[1.0] tracking-tight mb-4 sm:mb-5">
                We're also<br />
                fixing pet<br />
                food myths.
              </h2>
              <p className="text-base sm:text-lg text-gray-900 dark:text-gray-100 font-medium leading-relaxed max-w-md mb-6">
                From healthy eating habits and ingredients to portion sizes, treats, supplements, and everyday nutrition, our blog helps pet parents make better, informed choices for their pets.
              </p>
              <Link
                href="/blogs"
                className="inline-flex items-center justify-center px-11 py-3 rounded-full bg-[#F4623B] hover:bg-[#e0532c] text-white font-fredoka font-black text-sm tracking-widest uppercase border-2 border-black shadow-[0_4px_0_0_#000000] hover:translate-y-0.5 hover:shadow-[0_2px_0_0_#000000] active:translate-y-1 active:shadow-none transition-all"
              >
                BLOG
              </Link>
            </div>

            {/* Right Venn Diagram + Detective Dog */}
            <div className="md:w-7/12 w-full flex justify-center relative">
              <div className="w-full max-w-[500px] aspect-[540/430] relative transition-transform duration-300 hover:scale-[1.02] select-none">
                <Image
                    src="/products-media/venn.svg"
                    alt="Detective dog"
                    fill
                    className="object-contain"
                    priority
                  />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. REAL PEOPLE. REAL LOVE. (TESTIMONIALS) */}
      <TestimonialSlider />

      {/* 9. TRUSTED BY PET PROFESSIONALS */}
      <section className="py-8 sm:py-10 md:py-12 bg-white dark:bg-slate-950 overflow-hidden border-t border-orange-100/60 dark:border-slate-800">
        <div className="container mx-auto px-4 md:px-8 max-w-6xl">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 lg:gap-10">
            {/* Left Text */}
            <div className="md:w-5/12 text-center md:text-left">
              <div className="relative inline-block">
                {/* 5 Radiating Spark Rays */}
                <svg
                  className="absolute -top-6 -left-6 sm:-top-7 sm:-left-7 w-12 h-12 sm:w-14 sm:h-14 pointer-events-none select-none"
                  viewBox="0 0 54 54"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <line x1="33" y1="21" x2="34" y2="7" stroke="#F4623B" strokeWidth="3.5" strokeLinecap="round" />
                  <line x1="23" y1="22" x2="13" y2="10" stroke="#F4623B" strokeWidth="3.5" strokeLinecap="round" />
                  <line x1="17" y1="29" x2="4" y2="27" stroke="#F4623B" strokeWidth="3.5" strokeLinecap="round" />
                  <line x1="18" y1="39" x2="5" y2="44" stroke="#F4623B" strokeWidth="3.5" strokeLinecap="round" />
                  <line x1="43" y1="24" x2="51" y2="19" stroke="#F4623B" strokeWidth="3.5" strokeLinecap="round" />
                </svg>
                <h2 className="font-fredoka font-black text-4xl sm:text-5xl lg:text-[56px] text-[#F4623B] leading-[1.0] tracking-tight mb-3">
                  Trusted By<br />Pet<br />Professionals.
                </h2>
              </div>
              <p className="text-sm sm:text-base font-bold text-gray-900 dark:text-gray-100">
                Together, creating healthier pets.
              </p>
            </div>

            {/* Right 3 Partner Logos */}
            <div className="md:w-7/12 flex items-start justify-center md:justify-end gap-6 sm:gap-8 lg:gap-10">
              {/* Partner 1: MissEvas PetHouse */}
              <div className="flex flex-col items-center text-center w-24 sm:w-28 md:w-32 group">
                <div className="relative w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 rounded-full overflow-hidden mb-2.5 transition-transform duration-300 group-hover:scale-105 shadow-sm">
                  <Image
                    src="/products-media/partner_misseva.png"
                    alt="MissEvas PetHouse"
                    fill
                    className="object-contain"
                  />
                </div>
                <span className="font-fredoka font-medium text-xs sm:text-sm text-gray-900 dark:text-gray-100 leading-tight">
                  MissEvas<br />PetHouse
                </span>
              </div>

              {/* Partner 2: Smith N Paw */}
              <div className="flex flex-col items-center text-center w-24 sm:w-28 md:w-32 group">
                <div className="relative w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 rounded-full overflow-hidden mb-2.5 transition-transform duration-300 group-hover:scale-105 shadow-sm">
                  <Image
                    src="/products-media/partner_smithnpaw.png"
                    alt="Smith N Paw"
                    fill
                    className="object-contain"
                  />
                </div>
                <span className="font-fredoka font-medium text-xs sm:text-sm text-gray-900 dark:text-gray-100 leading-tight">
                  Smith N Paw
                </span>
              </div>

              {/* Partner 3: Pet Parenting */}
              <div className="flex flex-col items-center text-center w-24 sm:w-28 md:w-32 group">
                <div className="relative w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 rounded-full overflow-hidden mb-2.5 transition-transform duration-300 group-hover:scale-105 shadow-sm">
                  <Image
                    src="/products-media/partner_petparenting.png"
                    alt="Pet Parenting"
                    fill
                    className="object-contain"
                  />
                </div>
                <span className="font-fredoka font-medium text-xs sm:text-sm text-gray-900 dark:text-gray-100 leading-tight">
                  Pet Parenting
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 10. COME, JOIN THE FAM! */}
      <section className="py-8 sm:py-10 md:py-12 bg-white dark:bg-slate-950 overflow-hidden border-t border-slate-100 dark:border-slate-800">
        <div className="container mx-auto px-4 md:px-8 max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-8 md:gap-10">
            {/* Left Column: Heading & Social Pill Buttons */}
            <div>
              <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-[#D95D39] leading-tight tracking-tight mb-5 sm:mb-6">
                Come, join<br />the fam!
              </h2>

              <div className="space-y-3 max-w-sm">
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between w-full px-5 py-3 rounded-full border-2 border-[#D95D39] text-[#D95D39] hover:bg-[#D95D39] hover:text-white transition-all text-xs sm:text-sm font-bold shadow-sm"
                >
                  <div className="flex items-center gap-2.5">
                    <Instagram size={18} />
                    <span>Join our Instagram Community</span>
                  </div>
                  <span>→</span>
                </a>

                <div className="grid grid-cols-2 gap-3">
                  <a
                    href="https://youtube.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between px-5 py-3 rounded-full border-2 border-[#D95D39] text-[#D95D39] hover:bg-[#D95D39] hover:text-white transition-all text-xs sm:text-sm font-bold shadow-sm"
                  >
                    <div className="flex items-center gap-2">
                      <Youtube size={18} />
                      <span>YouTube</span>
                    </div>
                    <span>→</span>
                  </a>

                  <a
                    href="https://linkedin.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between px-5 py-3 rounded-full border-2 border-[#D95D39] text-[#D95D39] hover:bg-[#D95D39] hover:text-white transition-all text-xs sm:text-sm font-bold shadow-sm"
                  >
                    <div className="flex items-center gap-2">
                      <Linkedin size={18} />
                      <span>LinkedIn</span>
                    </div>
                    <span>→</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Right Column: Green Hill & Clouds Landscape Illustration */}
            <div className="flex justify-center md:justify-end">
              <div className="relative w-full max-w-[460px] aspect-[4/3] rounded-3xl overflow-hidden shadow-lg border-2 border-orange-100 bg-gradient-to-b from-sky-200 via-sky-100 to-emerald-100">
                <svg viewBox="0 0 400 300" className="w-full h-full" preserveAspectRatio="none">
                  {/* Sky */}
                  <rect width="400" height="300" fill="#BAE6FD" />
                  {/* Sun Glow */}
                  <circle cx="340" cy="60" r="40" fill="#FEF08A" opacity="0.8" />
                  {/* Fluffy Clouds */}
                  <path d="M 120 70 q 15 -20 35 -15 q 20 -15 40 5 q 20 -5 25 15 q 15 15 -5 25 q -10 10 -90 0 q -15 -10 -5 -30 z" fill="#FFFFFF" opacity="0.95" />
                  <path d="M 260 110 q 10 -15 25 -10 q 15 -10 30 5 q 15 -5 20 10 q 10 10 -5 20 q -10 5 -65 0 q -10 -10 -5 -25 z" fill="#FFFFFF" opacity="0.85" />
                  {/* Rolling Green Hills */}
                  <path d="M 0 190 Q 100 150 220 180 T 400 160 L 400 300 L 0 300 Z" fill="#65A30D" />
                  <path d="M 0 210 Q 150 170 280 200 T 400 190 L 400 300 L 0 300 Z" fill="#4D7C0F" />
                  <path d="M 0 240 Q 180 210 320 230 T 400 220 L 400 300 L 0 300 Z" fill="#3F6212" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
