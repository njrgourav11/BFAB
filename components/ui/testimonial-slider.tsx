import Image from 'next/image';

export default function TestimonialSlider() {
  return (
    <section className="py-24 md:py-32 bg-white dark:bg-[#0a1512] overflow-hidden border-t border-gray-100 dark:border-transparent">
      <div className="container mx-auto px-4 md:px-8 max-w-[1300px]">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <div className="relative md:w-3/4">
            <h2 className="text-[3.5rem] sm:text-6xl md:text-[5.5rem] font-bold text-[#11241f] dark:text-emerald-50 leading-[1.05] tracking-tight flex flex-wrap items-baseline gap-x-4">
              <span>Real people.</span>
              <span className="relative inline-block">
                Real love.
                {/* 226K tooltip */}
                <div className="absolute -top-10 right-0 bg-white border-[2.5px] border-[#b23261] text-[#b23261] text-[17px] font-bold py-1 px-3 rounded-xl transform rotate-3 shadow-sm flex items-center justify-center gap-1 min-w-[80px]">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" className="mt-0.5"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
                  226K
                  {/* Tooltip tail */}
                  <div className="absolute -bottom-2 left-6 w-3 h-3 bg-white border-b-[2.5px] border-r-[2.5px] border-[#b23261] transform rotate-45"></div>
                </div>
              </span>
            </h2>
          </div>
          
          <div className="flex flex-col text-gray-800 dark:text-gray-300 font-mono text-[15px] leading-loose tracking-tight relative pr-12 pb-2 md:w-1/4 max-w-[200px]">
            <span>We're blessed! Because</span>
            <span>we have you</span>
            <div className="absolute right-0 bottom-3 text-[#b23261]">
              {/* Hand drawn style heart */}
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transform -rotate-12"><path d="M20.8 4.6a5.5 5.5 0 0 0-7.7 0l-1.1 1-1.1-1a5.5 5.5 0 0 0-7.8 7.8l1 1 7.9 7.9 7.9-7.9 1-1a5.5 5.5 0 0 0 0-7.8z"/></svg>
            </div>
          </div>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 xl:gap-8">
          
          {/* Card 1 */}
          <div className="border-[3px] border-[#b23261] rounded-[1.25rem] p-6 flex flex-col justify-between min-h-[420px] bg-white shadow-sm hover:shadow-md transition-shadow">
            <h3 className="text-xl md:text-[22px] font-bold text-[#11241f] leading-[1.3] tracking-tight">"Finally a truly delicious and quality protein powder."</h3>
            <div className="mt-8 rounded-[0.8rem] overflow-hidden h-44 bg-gray-100 relative">
               <Image src="/products/1/20.png" alt="Review" fill className="object-cover" />
            </div>
          </div>
          {/* Card 2 */}
          <div className="border-[3px] border-[#b23261] rounded-[1.25rem] p-6 flex flex-col justify-between min-h-[420px] bg-white shadow-sm hover:shadow-md transition-shadow">
            <h3 className="text-xl md:text-[22px] font-bold text-[#11241f] leading-[1.3] tracking-tight">"It's so tasty, I didn't even feel like I was having a protein shake"</h3>
            <div className="mt-8 rounded-[0.8rem] overflow-hidden h-44 bg-gray-100 relative">
               <Image src="/products/1/21.png" alt="Review" fill className="object-cover" />
            </div>
          </div>
          {/* Card 3 */}
          <div className="border-[3px] border-[#b23261] rounded-[1.25rem] p-6 flex flex-col justify-between min-h-[420px] bg-white shadow-sm hover:shadow-md transition-shadow">
            <h3 className="text-xl md:text-[22px] font-bold text-[#11241f] leading-[1.3] tracking-tight">"Found my go-to Muesli"</h3>
            <div className="mt-8 rounded-[0.8rem] overflow-hidden h-44 bg-gray-100 relative">
               <Image src="/products/1/22.png" alt="Review" fill className="object-cover" />
            </div>
          </div>
          {/* Card 4 */}
          <div className="border-[3px] border-[#b23261] rounded-[1.25rem] p-6 flex flex-col justify-between min-h-[420px] bg-white shadow-sm hover:shadow-md transition-shadow">
            <h3 className="text-xl md:text-[22px] font-bold text-[#11241f] leading-[1.3] tracking-tight">"Tastes like it's been freshly squeezed"</h3>
            <div className="mt-8 rounded-[0.8rem] overflow-hidden h-44 bg-gray-100 relative">
               <Image src="/products/1/24.png" alt="Review" fill className="object-cover" />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
