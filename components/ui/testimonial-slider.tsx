import Image from 'next/image';

export default function TestimonialSlider() {
  return (
    <section className="py-10 sm:py-12 md:py-14 bg-white dark:bg-[#0a1512] overflow-hidden border-t border-gray-100 dark:border-transparent">
      <div className="container mx-auto px-4 md:px-8 max-w-[1300px]">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-10 gap-6 md:gap-8">
          <div className="relative md:w-3/4">
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-[#D95D39] leading-[1.05] tracking-tight flex flex-wrap items-baseline gap-x-4">
              <span>Real people.</span>
              <span className="relative inline-block">
                Real love.
                {/* 226K tooltip */}
                <div className="absolute -top-10 right-0 bg-white border-2 border-[#D95D39] text-[#D95D39] text-sm font-bold py-1 px-3 rounded-xl transform rotate-3 shadow-sm flex items-center justify-center gap-1 min-w-[75px]">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" className="mt-0.5"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
                  226K
                  <div className="absolute -bottom-1.5 left-5 w-2.5 h-2.5 bg-white border-b-2 border-r-2 border-[#D95D39] transform rotate-45"></div>
                </div>
              </span>
            </h2>
          </div>
          
          <div className="flex flex-col text-gray-700 dark:text-gray-300 font-mono text-sm leading-relaxed tracking-tight relative pr-10 pb-2 md:w-1/4 max-w-[200px]">
            <span>We're blessed! Because</span>
            <span>we have you</span>
            <div className="absolute right-0 bottom-2 text-[#D95D39]">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transform -rotate-12"><path d="M20.8 4.6a5.5 5.5 0 0 0-7.7 0l-1.1 1-1.1-1a5.5 5.5 0 0 0-7.8 7.8l1 1 7.9 7.9 7.9-7.9 1-1a5.5 5.5 0 0 0 0-7.8z"/></svg>
            </div>
          </div>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 xl:gap-8">
          
          {/* Card 1 */}
          <div className="border-2 border-[#D95D39] rounded-2xl p-6 flex flex-col justify-between min-h-[420px] bg-white dark:bg-slate-900 shadow-sm hover:shadow-md transition-shadow">
            <h3 className="text-sm md:text-base font-medium text-[#11241f] dark:text-gray-200 leading-[1.4] tracking-tight overflow-y-auto max-h-[220px]">
              "After using Beggin For A Bite’s Hip & Joint Supplement, I’ve seen such a positive difference in my dog. He’s moving easier, seems more comfortable and is back to enjoying playtime again."
            </h3>
            <div className="mt-6 rounded-xl overflow-hidden h-44 bg-gray-50 relative">
               <Image src="/review/Golden-Retriever.webp" alt="Golden Retriever Review" fill className="object-cover" />
            </div>
          </div>

          {/* Card 2 */}
          <div className="border-2 border-[#D95D39] rounded-2xl p-6 flex flex-col justify-between min-h-[420px] bg-white dark:bg-slate-900 shadow-sm hover:shadow-md transition-shadow">
            <h3 className="text-sm md:text-base font-medium text-[#11241f] dark:text-gray-200 leading-[1.4] tracking-tight overflow-y-auto max-h-[220px]">
              "After starting Beggin For A Bite’s Prebiotic ProTopper, I noticed a big change in my dogs. They’ve stopped the constant paw licking, and their appetite has improved so much!"
            </h3>
            <div className="mt-6 rounded-xl overflow-hidden h-44 bg-gray-50 relative">
               <Image src="/review/2.svg" alt="Pet Supplement Review" fill className="object-cover" />
            </div>
          </div>

          {/* Card 3 */}
          <div className="border-2 border-[#D95D39] rounded-2xl p-6 flex flex-col justify-between min-h-[420px] bg-white dark:bg-slate-900 shadow-sm hover:shadow-md transition-shadow">
            <h3 className="text-xs md:text-sm font-medium text-[#11241f] dark:text-gray-200 leading-[1.4] tracking-tight overflow-y-auto max-h-[220px]">
              "Food with Hemp Seed Oil drops, ever since I started using Hemp Seed Oil of Beggin For A Bite, Noah’s appetite has noticeably increased! A small addition with big benefits - healthy and happy."
            </h3>
            <div className="mt-6 rounded-xl overflow-hidden h-44 bg-gray-50 relative">
               <Image src="/review/3.svg" alt="Hemp Seed Oil Pet Review" fill className="object-cover" />
            </div>
          </div>

          {/* Card 4 */}
          <div className="border-2 border-[#D95D39] rounded-2xl p-6 flex flex-col justify-between min-h-[420px] bg-white dark:bg-slate-900 shadow-sm hover:shadow-md transition-shadow">
            <h3 className="text-sm md:text-base font-medium text-[#11241f] dark:text-gray-200 leading-[1.4] tracking-tight overflow-y-auto max-h-[220px]">
              "After using Beggin For A Bite, our fur baby is thriving! Wholesome ingredients, zero fillers, and a taste that has them licking the bowl clean every single meal."
            </h3>
            <div className="mt-6 rounded-xl overflow-hidden h-44 bg-gray-50 relative">
               <Image src="/products/1/24.png" alt="Healthy Pet Food Pouches" fill className="object-cover" />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
