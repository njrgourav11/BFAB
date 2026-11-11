"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import dynamic from 'next/dynamic';
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
      <section className="py-12 sm:py-16 md:py-20 bg-white dark:bg-slate-950 transition-colors">
        <div className="container mx-auto px-4 md:px-6 max-w-7xl">
          <div className="text-center mb-10 sm:mb-14">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#D95D39] mb-3 tracking-tight">
              Shop By Concern
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-gray-600 dark:text-gray-400 font-medium">
              Targeted solutions for your pet's specific needs
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6 sm:gap-8 justify-items-center">
            {[
              { name: 'Dental Health', image: '/category/10.svg', href: '/products?category=Dental%20Health' },
              { name: 'Hip & Joint', image: '/category/12.svg', href: '/products?category=Hip%20%26%20Joint' },
              { name: 'Gut Health', image: '/category/11.svg', href: '/products?category=Gut%20Health' },
              { name: 'Weight Control', image: '/category/13.svg', href: '/products?category=Weight%20Control' },
              { name: 'Anxiety & Stress', image: '/category/14.svg', href: '/products?category=Anxiety%20Relief' },
              { name: 'Skin & Coat', image: '/category/15.svg', href: '/products?category=Skin%20%26%20Coat' }
            ].map((cat, idx) => (
              <Link
                key={idx}
                href={cat.href}
                className="group flex flex-col items-center text-center w-full max-w-[150px] transition-transform duration-300 hover:-translate-y-1.5"
              >
                <div className="relative w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 mb-3 drop-shadow-sm group-hover:drop-shadow-md transition-all">
                  <Image
                    src={cat.image}
                    alt={cat.name}
                    fill
                    className="object-contain"
                  />
                </div>
                <span className="text-xs sm:text-sm font-bold text-gray-800 dark:text-gray-100 group-hover:text-[#D95D39] transition-colors leading-tight">
                  {cat.name}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 3. TRUST & QUALITY BADGES BAR */}
      <section className="py-5 bg-[#FAF7F2] dark:bg-slate-900 border-y border-orange-100/80 dark:border-slate-800">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="flex flex-wrap items-center justify-center md:justify-between gap-6 md:gap-4 text-xs sm:text-sm font-bold text-gray-800 dark:text-gray-200">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-[#D95D39]" />
              <span>100% Formulation</span>
            </div>
            <div className="flex items-center gap-2">
              <Leaf className="w-5 h-5 text-emerald-600" />
              <span>All Natural</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-base">🇮🇳</span>
              <span>Proudly Made in India</span>
            </div>
            <div className="flex items-center gap-2">
              <Stethoscope className="w-5 h-5 text-[#D95D39]" />
              <span>In-house vet crafted</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-blue-600" />
              <span>Non-GMO verified</span>
            </div>
          </div>
        </div>
      </section>

      {/* 4. WE CREATE PET WELLNESS */}
      <section className="py-16 md:py-24 bg-white dark:bg-slate-950 overflow-hidden">
        <div className="container mx-auto px-4 md:px-8 max-w-7xl">
          <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-14">
            {/* Left Text */}
            <div className="w-full lg:w-5/12">
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#D95D39] leading-[1.05] tracking-tight mb-6">
                We<br />Create<br />Pet<br />Wellness.
              </h2>
              <p className="text-base sm:text-lg text-gray-700 dark:text-gray-300 font-medium leading-relaxed max-w-md">
                Formulated with <span className="border-b-2 border-[#D95D39] pb-0.5">clinically supported</span> ingredients to help dogs & cats <span className="border-b-2 border-[#D95D39] pb-0.5">live healthier, happier lives.</span>
              </p>
            </div>

            {/* Right 3 Product Cards */}
            <div className="w-full lg:w-7/12">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                {/* Card 1: Prebiotic ProTopper */}
                <Link href="/products" className="group rounded-2xl overflow-hidden bg-[#FAF7F2] dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-md transition-all flex flex-col h-full">
                  <div className="relative p-6 flex-grow flex items-center justify-center min-h-[200px] bg-white dark:bg-slate-900">
                    <Image src="/products/1/20.png" alt="Prebiotic ProTopper Supplement" width={160} height={160} className="object-contain group-hover:scale-105 transition-transform duration-300" />
                  </div>
                  <div className="bg-[#28676b] text-white p-4 text-center mt-auto">
                    <h3 className="font-extrabold text-xs sm:text-sm line-clamp-1">Pyrodex Probiotics Supplement</h3>
                  </div>
                </Link>

                {/* Card 2: Hip & Joint */}
                <Link href="/products" className="group rounded-2xl overflow-hidden bg-[#FAF7F2] dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-md transition-all flex flex-col h-full">
                  <div className="relative p-6 flex-grow flex items-center justify-center min-h-[200px] bg-white dark:bg-slate-900">
                    <Image src="/products/1/21.png" alt="Hip & Joint Supplement" width={160} height={160} className="object-contain group-hover:scale-105 transition-transform duration-300" />
                  </div>
                  <div className="bg-[#459fb9] text-white p-4 text-center mt-auto">
                    <h3 className="font-extrabold text-xs sm:text-sm line-clamp-1">Hip & Joint Supplement</h3>
                  </div>
                </Link>

                {/* Card 3: Recovery / Relief */}
                <Link href="/products" className="group rounded-2xl overflow-hidden bg-[#FAF7F2] dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-md transition-all flex flex-col h-full">
                  <div className="relative p-6 flex-grow flex items-center justify-center min-h-[200px] bg-white dark:bg-slate-900">
                    <Image src="/products/1/22.png" alt="Recovery/Relief Supplement" width={160} height={160} className="object-contain group-hover:scale-105 transition-transform duration-300" />
                  </div>
                  <div className="bg-[#6b8e4e] text-white p-4 text-center mt-auto">
                    <h3 className="font-extrabold text-xs sm:text-sm line-clamp-1">Recovery/Relief Supplement</h3>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. WE MAKE TREATS THAT CARE */}
      <section className="py-16 md:py-24 bg-[#FAF7F2]/60 dark:bg-slate-900/40 overflow-hidden">
        <div className="container mx-auto px-4 md:px-8 max-w-7xl">
          <div className="flex flex-col-reverse lg:flex-row items-center gap-10 lg:gap-14">
            {/* Left 3 Treat Cards */}
            <div className="w-full lg:w-7/12">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                {/* Treat 1: Chicken Breast Jerky */}
                <Link href="/products" className="group rounded-2xl overflow-hidden bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-md transition-all flex flex-col h-full">
                  <div className="relative p-6 flex-grow flex items-center justify-center min-h-[200px]">
                    <Image src="/products/2/3.png" alt="Chicken Breast Jerky" width={150} height={150} className="object-contain group-hover:scale-105 transition-transform duration-300" />
                  </div>
                  <div className="bg-[#1d5b54] text-white p-4 text-center mt-auto">
                    <h3 className="font-extrabold text-xs sm:text-sm line-clamp-1">Chicken Breast Jerky</h3>
                  </div>
                </Link>

                {/* Treat 2: Peanut Butter For Dogs */}
                <Link href="/products" className="group rounded-2xl overflow-hidden bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-md transition-all flex flex-col h-full">
                  <div className="relative p-6 flex-grow flex items-center justify-center min-h-[200px]">
                    <Image src="/products/2/4.png" alt="Peanut Butter For Dogs" width={150} height={150} className="object-contain group-hover:scale-105 transition-transform duration-300" />
                  </div>
                  <div className="bg-[#1f4863] text-white p-4 text-center mt-auto">
                    <h3 className="font-extrabold text-xs sm:text-sm line-clamp-1">Peanut Butter For Dogs</h3>
                  </div>
                </Link>

                {/* Treat 3: Real Treat Sausages */}
                <Link href="/products" className="group rounded-2xl overflow-hidden bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-md transition-all flex flex-col h-full">
                  <div className="relative p-6 flex-grow flex items-center justify-center min-h-[200px]">
                    <Image src="/products/2/5.png" alt="Real Treat Sausages" width={150} height={150} className="object-contain group-hover:scale-105 transition-transform duration-300" />
                  </div>
                  <div className="bg-[#3d5e32] text-white p-4 text-center mt-auto">
                    <h3 className="font-extrabold text-xs sm:text-sm line-clamp-1">Real Treat Sausages</h3>
                  </div>
                </Link>
              </div>
            </div>

            {/* Right Text */}
            <div className="w-full lg:w-5/12 text-left">
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#D95D39] leading-[1.05] tracking-tight mb-6">
                We Make<br />Treats<br />That<br />Care.
              </h2>
              <p className="text-base sm:text-lg text-gray-700 dark:text-gray-300 font-medium leading-relaxed max-w-md">
                Not just delicious naturally nutritious: made with real ingredients, no nasties, veggies & superfoods.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. HEALTHY EATING FEATURE & MEALS */}
      <section className="py-20 md:py-28 bg-white dark:bg-slate-950 overflow-hidden">
        <div className="container mx-auto px-4 md:px-8 max-w-6xl">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#D95D39] leading-tight mb-4 tracking-tight">
              You shouldn't be the only <br className="hidden sm:block" /> one eating healthy
            </h2>
            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 font-medium leading-relaxed mb-6">
              Give your best friend real human-grade meals crafted from wholesome ingredients and packed with nutrients. Because a fresh dog is a happy dog.
            </p>
            <Link
              href="/products"
              className="inline-flex items-center justify-center bg-[#D95D39] hover:bg-[#c44e2c] text-white px-8 py-3 rounded-full font-bold text-xs sm:text-sm tracking-wider uppercase transition-colors shadow-sm"
            >
              OUR MEALS
            </Link>
          </div>

          {/* Center Circle with Pouches + 4 Callouts */}
          <div className="grid grid-cols-1 md:grid-cols-3 items-center gap-8 md:gap-4 max-w-5xl mx-auto">
            {/* Left 2 Callouts */}
            <div className="space-y-12 text-center md:text-right order-2 md:order-1">
              <div>
                <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-orange-50 text-[#D95D39] mb-3">
                  <UtensilsCrossed size={20} />
                </div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">Real food</h3>
                <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">Human-grade meat and veggies in simple recipes, made for dogs</p>
              </div>
              <div>
                <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-orange-50 text-[#D95D39] mb-3">
                  <ShieldCheck size={20} />
                </div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">Health focused</h3>
                <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">Crafted by veterinary nutritionists for targeted health benefits</p>
              </div>
            </div>

            {/* Center Image with Terracotta Circle */}
            <div className="flex justify-center order-1 md:order-2">
              <div className="relative w-72 h-72 sm:w-80 sm:h-80 md:w-96 md:h-96 flex items-center justify-center">
                {/* Terracotta circle backdrop */}
                <div className="absolute inset-4 rounded-full bg-[#E0653B]/20 dark:bg-[#E0653B]/10 blur-xl"></div>
                <div className="absolute inset-8 rounded-full bg-[#E0653B] opacity-90 shadow-lg"></div>
                {/* Two meal pouches */}
                <div className="relative z-10 flex items-center justify-center -space-x-8 sm:-space-x-12">
                  <div className="relative w-36 h-48 sm:w-44 sm:h-56 transform -rotate-6 transition-transform hover:rotate-0 duration-300">
                    <Image src="/products/1/20.png" alt="Fresh Dog Meal 1" fill className="object-contain drop-shadow-xl" />
                  </div>
                  <div className="relative w-36 h-48 sm:w-44 sm:h-56 transform rotate-6 transition-transform hover:rotate-0 duration-300">
                    <Image src="/products/1/21.png" alt="Fresh Dog Meal 2" fill className="object-contain drop-shadow-xl" />
                  </div>
                </div>
              </div>
            </div>

            {/* Right 2 Callouts */}
            <div className="space-y-12 text-center md:text-left order-3 md:order-3">
              <div>
                <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-orange-50 text-[#D95D39] mb-3">
                  <Flame size={20} />
                </div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">Gently cooked</h3>
                <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">Retains nutrition, aroma and natural flavor</p>
              </div>
              <div>
                <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-orange-50 text-[#D95D39] mb-3">
                  <Stethoscope size={20} />
                </div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">Professionally developed</h3>
                <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">Formulated to meet nutritional requirements</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. FIXING PET FOOD MYTHS */}
      <section className="py-20 md:py-28 bg-[#FAF7F2]/60 dark:bg-slate-900/40 overflow-hidden border-t border-orange-100/60 dark:border-slate-800">
        <div className="container mx-auto px-4 md:px-8 max-w-6xl">
          <div className="flex flex-col md:flex-row items-center justify-between gap-12">
            {/* Left Content */}
            <div className="md:w-5/12">
              <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-[#D95D39] leading-[1.05] tracking-tight mb-4">
                We're also<br />fixing pet<br />food myths.
              </h2>
              <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 font-medium leading-relaxed max-w-sm mb-6">
                From mystery fillers to confusing labels, we tackle pet food misconceptions. Read our blog for honest, evidence-backed advice.
              </p>
              <Link
                href="/blogs"
                className="inline-flex items-center justify-center bg-[#D95D39] hover:bg-[#c44e2c] text-white px-8 py-3 rounded-full font-bold text-xs sm:text-sm tracking-wider uppercase transition-colors"
              >
                BLOG
              </Link>
            </div>

            {/* Right Venn Diagram SVG */}
            <div className="md:w-7/12 w-full flex justify-center relative">
              <div className="w-full max-w-[560px] aspect-[4/3] relative">
                <svg viewBox="0 0 600 400" className="w-full h-full text-[#D95D39]">
                  <defs>
                    <clipPath id="venn-intersect">
                      <circle cx="230" cy="220" r="115" />
                    </clipPath>
                    <marker id="arrow-line" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
                      <path d="M 0 2 L 8 5 L 0 8" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                    </marker>
                  </defs>

                  {/* Overlapping intersection */}
                  <circle cx="360" cy="220" r="115" fill="currentColor" opacity="0.85" clipPath="url(#venn-intersect)" />

                  {/* Left and Right Circles */}
                  <circle cx="230" cy="220" r="115" fill="none" stroke="currentColor" strokeWidth="3" />
                  <circle cx="360" cy="220" r="115" fill="none" stroke="currentColor" strokeWidth="3" />

                  {/* Text inside circles */}
                  <text x="180" y="215" fill="currentColor" fontFamily="sans-serif" fontSize="16" fontWeight="bold" textAnchor="middle">What you</text>
                  <text x="180" y="240" fill="currentColor" fontFamily="sans-serif" fontSize="16" fontWeight="bold" textAnchor="middle">think they need</text>

                  <text x="410" y="215" fill="currentColor" fontFamily="sans-serif" fontSize="16" fontWeight="bold" textAnchor="middle">What your pet</text>
                  <text x="410" y="240" fill="currentColor" fontFamily="sans-serif" fontSize="16" fontWeight="bold" textAnchor="middle">actually need</text>

                  {/* Top Text & Arrow */}
                  <text x="120" y="70" fill="currentColor" fontFamily="sans-serif" fontSize="18" fontWeight="bold">And we're working on</text>
                  <text x="120" y="95" fill="currentColor" fontFamily="sans-serif" fontSize="18" fontWeight="bold">closing the gap</text>
                  <path d="M 290 90 Q 320 95 300 120" fill="none" stroke="currentColor" strokeWidth="2.5" markerEnd="url(#arrow-line)" strokeLinecap="round" />
                </svg>

                {/* Cartoon Detective Dog */}
                <div className="absolute right-4 bottom-2 w-20 h-24 sm:w-28 sm:h-32">
                  <Image src="/dog.svg" alt="Detective Dog" fill className="object-contain" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. REAL PEOPLE. REAL LOVE. (TESTIMONIALS) */}
      <TestimonialSlider />

      {/* 9. TRUSTED BY PET PROFESSIONALS */}
      <section className="py-16 md:py-24 bg-[#FAF7F2]/60 dark:bg-slate-900/40 border-t border-orange-100/60 dark:border-slate-800 overflow-hidden">
        <div className="container mx-auto px-4 md:px-8 max-w-6xl">
          <div className="flex flex-col md:flex-row items-center justify-between gap-10">
            {/* Left Text */}
            <div className="md:w-5/12 text-center md:text-left">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#D95D39] leading-tight tracking-tight mb-3">
                Trusted By<br />Pet<br />Professionals.
              </h2>
              <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 font-medium">
                Together, elevating the standard of pet nutrition & care.
              </p>
            </div>

            {/* Right 3 Trust Seals */}
            <div className="md:w-7/12 flex flex-wrap items-center justify-center md:justify-end gap-6 sm:gap-10">
              {/* Seal 1 */}
              <div className="flex flex-col items-center text-center">
                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full border-2 border-amber-600/60 bg-amber-50/60 dark:bg-slate-800 flex items-center justify-center p-3 mb-2 shadow-sm">
                  <Building2 className="w-10 h-10 text-amber-700 dark:text-amber-400" />
                </div>
                <span className="text-[11px] sm:text-xs font-bold text-gray-700 dark:text-gray-300">In-House Formulated</span>
              </div>

              {/* Seal 2 */}
              <div className="flex flex-col items-center text-center">
                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full border-2 border-yellow-500 bg-yellow-50 dark:bg-slate-800 flex items-center justify-center p-3 mb-2 shadow-sm">
                  <Award className="w-10 h-10 text-yellow-600 dark:text-yellow-400" />
                </div>
                <span className="text-[11px] sm:text-xs font-bold text-gray-700 dark:text-gray-300">Vet Approved</span>
              </div>

              {/* Seal 3 */}
              <div className="flex flex-col items-center text-center">
                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full border-2 border-orange-500 bg-orange-50 dark:bg-slate-800 flex items-center justify-center p-3 mb-2 shadow-sm">
                  <ShieldCheck className="w-10 h-10 text-orange-600 dark:text-orange-400" />
                </div>
                <span className="text-[11px] sm:text-xs font-bold text-gray-700 dark:text-gray-300">100% Pet Safe</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 10. COME, JOIN THE FAM! */}
      <section className="py-16 md:py-24 bg-white dark:bg-slate-950 overflow-hidden border-t border-slate-100 dark:border-slate-800">
        <div className="container mx-auto px-4 md:px-8 max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-10">
            {/* Left Column: Heading & Social Pill Buttons */}
            <div>
              <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-[#D95D39] leading-tight tracking-tight mb-8">
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

      {/* Partner Promo Code Bottom Box */}
      <section className="py-8 bg-[#FAF7F2] border-t border-orange-100 dark:border-slate-800">
        <div className="container mx-auto px-4 max-w-3xl text-center">
          <p className="text-xs uppercase font-bold tracking-wider text-[#D95D39] mb-1">Got a Partner or Team Code?</p>
          <div className="flex gap-2 max-w-md mx-auto mt-2">
            <input
              type="text"
              placeholder="ENTER PROMO CODE"
              value={couponInput}
              onChange={(e) => setCouponInput(e.target.value.toUpperCase())}
              className="flex-1 px-4 py-2.5 text-xs uppercase font-mono font-bold tracking-wider border border-orange-200 rounded-xl bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#D95D39]"
            />
            <button
              onClick={() => handleApplyPromo()}
              disabled={!couponInput.trim()}
              className="px-5 py-2.5 bg-[#D95D39] hover:bg-[#c44e2c] disabled:opacity-50 text-white rounded-xl text-xs font-bold transition-colors"
            >
              Apply
            </button>
          </div>
          {promoSuccess && (
            <p className="text-xs text-emerald-600 font-bold mt-2 flex items-center justify-center gap-1">
              <Check size={14} /> {promoSuccess}
            </p>
          )}
          {activeCoupons.length > 0 && (
            <div className="flex flex-wrap items-center justify-center gap-2 mt-3">
              <span className="text-[11px] text-gray-500 font-medium">Active Partner Codes:</span>
              {activeCoupons.map(c => (
                <button
                  key={c.code}
                  onClick={() => handleApplyPromo(c.code)}
                  className="px-2.5 py-0.5 rounded-full text-[11px] font-bold font-mono bg-white border border-orange-200 text-[#D95D39] hover:bg-orange-50 transition-colors"
                >
                  {c.code}
                </button>
              ))}
            </div>
          )}
        </div>
      </section>

    </div>
  );
}
