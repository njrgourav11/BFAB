'use client';
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import FloatingProducts from '@/components/motion/FloatingProducts';

export default function FreshMealPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 text-gray-900 dark:text-gray-100 overflow-hidden">
      
      {/* 1. HERO SECTION (Dark Green Background) */}
      <section className="bg-[#14100D] text-white pt-16 sm:pt-20 md:pt-24 pb-28 sm:pb-36 lg:pb-40 relative isolate overflow-hidden">
        <div aria-hidden className="absolute -right-40 -top-40 -z-10 h-[560px] w-[560px] rounded-full border-[70px] border-[#F4623B]/15" />
        <div aria-hidden className="absolute -bottom-40 left-1/3 -z-10 h-[420px] w-[420px] rounded-full bg-[#F4623B]/20 blur-3xl" />
        <FloatingProducts
          className="-z-[1] opacity-30 lg:opacity-100"
          items={[
            { name: 'meat', className: 'right-[3%] bottom-[6%] w-[11vw] max-w-[170px] min-w-[90px]', rotate: 10, depth: 0.4 },
            { name: 'vegmeals', className: 'left-[44%] bottom-[-4%] w-[9vw] max-w-[140px] min-w-[80px] hidden md:block', rotate: -9, depth: 0.7 },
          ]}
        />
        <div className="container mx-auto px-4 md:px-8 max-w-6xl relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
            
            {/* Left Column: Headline & Subtitle */}
            <div className="lg:col-span-7">
              <h1 className="font-fredoka font-black text-4xl sm:text-5xl md:text-6xl lg:text-[68px] text-white leading-[1.05] tracking-tight mb-6 sm:mb-8">
                It's time<br />
                for a fresh<br />
                approach<br />
                to pet food
              </h1>
              <p className="text-sm sm:text-base md:text-lg font-medium text-[#F4623B] leading-relaxed max-w-xl">
                By bringing fresh, wholesome food to your pet’s bowl, we’re making everyday nutrition better. Made with carefully selected ingredients and prepared with your pet’s health in mind, our fresh meals are packed with goodness, flavour, and real nourishment.
              </p>
            </div>

            {/* Right Column: 3 Struck-Through Pain Points */}
            <div className="lg:col-span-5 flex flex-col gap-8 sm:gap-10 lg:pt-4">
              
              {/* Point 1: "MYSTERY MEAT" */}
              <div>
                <div className="inline-block relative mb-2.5">
                  <h3 className="font-serif font-black text-2xl sm:text-3xl text-white tracking-wide">
                    &ldquo;MYSTERY MEAT&rdquo;
                  </h3>
                  <div className="absolute top-1/2 left-[-8%] w-[116%] h-[2.5px] sm:h-[3px] bg-[#F4623B] transform -translate-y-1/2 -rotate-1 rounded-full pointer-events-none" />
                </div>
                <p className="text-xs sm:text-sm md:text-base font-medium text-[#F4623B] leading-relaxed max-w-md">
                  Some pet foods use vague ingredient terms like &ldquo;meat meal&rdquo; or &ldquo;animal meal,&rdquo; making it harder for pet parents to know exactly what goes into the bowl.
                </p>
              </div>

              {/* Point 2: Brown Pellets */}
              <div>
                <div className="inline-block relative mb-2.5">
                  <h3 className="font-serif font-black text-2xl sm:text-3xl text-white tracking-wide">
                    Brown Pellets
                  </h3>
                  <div className="absolute top-1/2 left-[-8%] w-[116%] h-[2.5px] sm:h-[3px] bg-[#F4623B] transform -translate-y-1/2 -rotate-1 rounded-full pointer-events-none" />
                </div>
                <p className="text-xs sm:text-sm md:text-base font-medium text-[#F4623B] leading-relaxed max-w-md">
                  Kibble is extremely processed regardless of the ingredient claims (or pictures).
                </p>
              </div>

              {/* Point 3: Label Tricks */}
              <div>
                <div className="inline-block relative mb-2.5">
                  <h3 className="font-serif font-black text-2xl sm:text-3xl text-white tracking-wide">
                    Label Tricks
                  </h3>
                  <div className="absolute top-1/2 left-[-8%] w-[116%] h-[2.5px] sm:h-[3px] bg-[#F4623B] transform -translate-y-1/2 -rotate-2 rounded-full pointer-events-none" />
                </div>
                <p className="text-xs sm:text-sm md:text-base font-medium text-[#F4623B] leading-relaxed max-w-md">
                  Food can hide behind misleading bags. &ldquo;Made with Chicken&rdquo; can mean just 3% chicken.
                </p>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* 2. OVERLAPPING POUCHES & HOW WE MAKE PET FOOD HEALTHY */}
      <section className="bg-white dark:bg-slate-950 relative pt-0 pb-12 sm:pb-16 md:pb-20">
        <div className="container mx-auto px-4 md:px-8 max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 xl:gap-16 items-start">
            
            {/* Left Column: Overlapping Pouches + Personalized Plans + Better For Them */}
            <div className="lg:col-span-6 flex flex-col">
              
              {/* Overlapping Pouches Graphic (Bridges dark hero and white section) */}
              <div className="-mt-20 sm:-mt-28 md:-mt-32 lg:-mt-36 mb-6 sm:mb-8 relative z-20 flex justify-center lg:justify-start">
                <div className="relative w-72 h-72 sm:w-80 sm:h-80 md:w-88 md:h-88 flex items-center justify-center">
                  
                  {/* Terracotta/coral backdrop circle */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="relative w-[240px] h-[240px] sm:w-[280px] sm:h-[280px] md:w-[310px] md:h-[310px]">
                      <Image
                        src="/products-media/bowl.svg"
                        alt="Backdrop Circle"
                        fill
                        className="object-contain"
                        priority
                      />
                    </div>
                  </div>

                  {/* Overlapping Retort Pouches */}
                  <div className="relative z-10 flex items-center justify-center -space-x-12 sm:-space-x-14">
                    {/* Left: Vegie Meal Bowl */}
                    <motion.div
                      whileHover={{ scale: 1.05, rotate: -2 }}
                      transition={{ duration: 0.3 }}
                      className="relative w-36 sm:w-44 md:w-48 aspect-[288/351] cursor-pointer"
                    >
                      <Image
                        src="/products-media/vegmeals.svg"
                        alt="No Nonsense Vegie Meal Bowl"
                        fill
                        className="object-contain drop-shadow-xl"
                        priority
                      />
                    </motion.div>

                    {/* Right: Non-Veg Meal Bowl (in front) */}
                    <motion.div
                      whileHover={{ scale: 1.05, rotate: 2 }}
                      transition={{ duration: 0.3 }}
                      className="relative w-36 sm:w-44 md:w-48 aspect-[289/354] z-20 cursor-pointer"
                    >
                      <Image
                        src="/products-media/meat.svg"
                        alt="No Nonsense Non-Veg Meal Bowl"
                        fill
                        className="object-contain drop-shadow-xl"
                        priority
                      />
                    </motion.div>
                  </div>
                </div>
              </div>

              {/* Personalized plans copy */}
              <div className="max-w-md lg:pr-2">
                <h3 className="font-serif font-black text-xl sm:text-2xl text-gray-900 dark:text-white mb-2.5">
                  Personalized plans
                </h3>
                <p className="text-xs sm:text-sm font-medium text-[#F4623B] leading-relaxed mb-3">
                  A pet-centric meal plan is customized to meet your dog’s individual nutritional and dietary requirements. Meals are pre-prepared and portioned according to their specific calorie needs, based on the details provided about your dog.
                </p>
                <p className="text-xs sm:text-sm font-medium text-[#F4623B] leading-relaxed mb-10 sm:mb-14">
                  Our retort-packed meals lock in freshness and nutrition, offering a convenient, shelf-stable way to serve wholesome, ready-to-serve food your pet will love.
                </p>

                {/* Better for them. Easier for you. (Left Column Headline) */}
                <div className="pt-2 sm:pt-4">
                  <h2 className="font-fredoka font-black text-4xl sm:text-5xl lg:text-[56px] text-[#F4623B] leading-[1.0] tracking-tight mb-4 sm:mb-5">
                    Better for<br />
                    them.<br />
                    Easier for<br />
                    you.
                  </h2>
                  <p className="text-xs sm:text-sm md:text-base font-bold text-gray-900 dark:text-gray-100 leading-relaxed max-w-sm">
                    Our vet-developed plans guide you to the best diet, while perfectly-timed deliveries make sure you never run out.
                  </p>
                </div>
              </div>

            </div>

            {/* Right Column: "How we make pet food healthy:" + BIG Plate Image + Plan features */}
            <div className="lg:col-span-6 flex flex-col pt-4 sm:pt-8 lg:pt-10 items-end">
              
              {/* Heading - Right Aligned matching reference design */}
              <h2 className="font-fredoka font-black text-4xl sm:text-5xl lg:text-[56px] xl:text-[62px] text-[#52231A] dark:text-orange-400 leading-[1.05] tracking-tight mb-6 sm:mb-8 text-right self-end">
                How we<br />
                make<br />
                pet food<br />
                healthy:
              </h2>

              {/* Large plate image with flying fresh ingredients */}
              <div className="relative w-full max-w-[520px] sm:max-w-[560px] lg:max-w-[620px] aspect-[1278/1230] ml-auto mb-6 sm:mb-8">
                <Image
                  src="/products-media/food.png"
                  alt="Fresh food bowl with wholesome ingredients"
                  fill
                  className="object-contain"
                  priority
                />
              </div>

              {/* Plan features horizontal timeline track - matches width of plate */}
              <div className="w-full max-w-[520px] sm:max-w-[560px] lg:max-w-[620px] ml-auto mt-2">
                <h4 className="font-serif font-black text-base sm:text-lg text-gray-900 dark:text-white mb-2 text-left">
                  Plan features
                </h4>
                
                {/* Line with circle endpoints */}
                <div className="relative flex items-center w-full my-2.5">
                  <div className="w-2.5 h-2.5 rounded-full border-2 border-gray-900 dark:border-white bg-white dark:bg-slate-900 shrink-0" />
                  <div className="flex-1 h-[1.5px] bg-gray-900 dark:bg-white" />
                  <div className="w-2.5 h-2.5 rounded-full border-2 border-gray-900 dark:border-white bg-white dark:bg-slate-900 shrink-0" />
                </div>

                {/* 4 Feature Columns */}
                <div className="grid grid-cols-4 gap-2 sm:gap-3 text-left pt-1">
                  <div className="font-bold text-[10px] sm:text-xs text-gray-900 dark:text-gray-100 leading-tight">
                    Free &amp; flexible<br />deliveries
                  </div>
                  <div className="font-bold text-[10px] sm:text-xs text-gray-900 dark:text-gray-100 leading-tight">
                    Pan India<br />shipping
                  </div>
                  <div className="font-bold text-[10px] sm:text-xs text-gray-900 dark:text-gray-100 leading-tight">
                    Retort technology<br />packaging
                  </div>
                  <div className="font-bold text-[10px] sm:text-xs text-gray-900 dark:text-gray-100 leading-tight">
                    24-hour<br />customer service
                  </div>
                </div>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* 3. HOW YOUR PLAN WORKS */}
      <section className="py-12 sm:py-16 md:py-20 bg-white dark:bg-slate-950 border-t border-gray-100 dark:border-slate-800">
        <div className="container mx-auto px-4 max-w-5xl">
          
          <h2 className="font-fredoka font-black text-3xl sm:text-4xl md:text-5xl text-[#F4623B] text-center tracking-tight mb-12 sm:mb-16">
            How your plan works
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-6 relative">
            
            {/* Step 1 */}
            <div className="flex flex-col items-center text-center px-2">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#F4623B] text-white flex items-center justify-center font-serif font-black text-2xl sm:text-3xl shadow-sm mb-4">
                1
              </div>
              <h3 className="font-fredoka font-bold text-lg sm:text-xl text-[#F4623B] mb-2.5">
                Build your plan
              </h3>
              <p className="text-xs sm:text-sm text-gray-800 dark:text-gray-200 font-medium leading-relaxed max-w-xs">
                Simply tell us a little bit about your dog, and we'll create a plan with personalized portions to meet their unique nutritional and caloric needs.
              </p>
            </div>

            {/* Desktop Connecting Arrow 1 -> 2 */}
            <div className="hidden md:flex absolute top-8 left-[30%] w-[8%] items-center justify-center pointer-events-none text-[#F4623B]">
              <svg viewBox="0 0 40 12" className="w-full" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M0 6 H35 M28 1 L36 6 L28 11" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>

            {/* Step 2 */}
            <div className="flex flex-col items-center text-center px-2">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#F4623B] text-white flex items-center justify-center font-serif font-black text-2xl sm:text-3xl shadow-sm mb-4">
                2
              </div>
              <h3 className="font-fredoka font-bold text-lg sm:text-xl text-[#F4623B] mb-2.5">
                Try it out
              </h3>
              <p className="text-xs sm:text-sm text-gray-800 dark:text-gray-200 font-medium leading-relaxed max-w-xs">
                To start, you'll get your first box with up to two weeks of freshly made food – perfect for your dog to get a taste.
              </p>
            </div>

            {/* Desktop Connecting Arrow 2 -> 3 */}
            <div className="hidden md:flex absolute top-8 left-[64%] w-[8%] items-center justify-center pointer-events-none text-[#F4623B]">
              <svg viewBox="0 0 40 12" className="w-full" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M0 6 H35 M28 1 L36 6 L28 11" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>

            {/* Step 3 */}
            <div className="flex flex-col items-center text-center px-2">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#F4623B] text-white flex items-center justify-center font-serif font-black text-2xl sm:text-3xl shadow-sm mb-4">
                3
              </div>
              <h3 className="font-fredoka font-bold text-lg sm:text-xl text-[#F4623B] mb-2.5">
                Fall in love
              </h3>
              <p className="text-xs sm:text-sm text-gray-800 dark:text-gray-200 font-medium leading-relaxed max-w-xs">
                If you and your dog love it – we think you will! – you're all set. You'll start receiving boxes of food automatically whenever you're running low.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* 4. OVER 1 TONNE MEALS DELIVERED */}
      <section className="py-12 sm:py-16 md:py-20 bg-white dark:bg-slate-950 border-t border-gray-100 dark:border-slate-800">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          
          <h2 className="font-fredoka font-black text-3xl sm:text-4xl md:text-5xl lg:text-[56px] text-[#F4623B] leading-tight tracking-tight mb-8 sm:mb-12">
            Over 1 Tonne Meals<br />
            <span>Delivered</span>
          </h2>

          {/* 4 Benefits with green checkmarks */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 max-w-3xl mx-auto mb-10 sm:mb-14">
            <div className="flex flex-col items-center">
              <svg className="w-5 h-5 sm:w-6 sm:h-6 text-[#2E7D32] mb-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
              <span className="font-serif font-bold text-sm sm:text-base md:text-lg text-[#F4623B] leading-tight">
                Increased<br />vitality
              </span>
            </div>

            <div className="flex flex-col items-center">
              <svg className="w-5 h-5 sm:w-6 sm:h-6 text-[#2E7D32] mb-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
              <span className="font-serif font-bold text-sm sm:text-base md:text-lg text-[#F4623B] leading-tight">
                Clear skin &amp;<br />shiny coat
              </span>
            </div>

            <div className="flex flex-col items-center">
              <svg className="w-5 h-5 sm:w-6 sm:h-6 text-[#2E7D32] mb-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
              <span className="font-serif font-bold text-sm sm:text-base md:text-lg text-[#F4623B] leading-tight">
                Less<br />'dog odor'
              </span>
            </div>

            <div className="flex flex-col items-center">
              <svg className="w-5 h-5 sm:w-6 sm:h-6 text-[#2E7D32] mb-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
              <span className="font-serif font-bold text-sm sm:text-base md:text-lg text-[#F4623B] leading-tight">
                Better<br />#2
              </span>
            </div>
          </div>

          {/* Brutalist Button: Build Your Plan */}
          <Link
            href="/products"
            className="inline-flex items-center justify-center px-10 sm:px-12 py-3.5 rounded-full bg-[#F4623B] hover:bg-[#e0532c] text-white font-fredoka font-black text-sm sm:text-base tracking-wider uppercase border-2 border-black shadow-[0_4px_0_0_#000000] hover:translate-y-0.5 hover:shadow-[0_2px_0_0_#000000] active:translate-y-1 active:shadow-none transition-all"
          >
            Build Your Plan
          </Link>

        </div>
      </section>

    </div>
  );
}
