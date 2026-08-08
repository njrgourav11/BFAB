import Image from 'next/image';
import Link from 'next/link';
import { ShoppingCart } from 'lucide-react';

export default function VetProfessionalsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-r from-pink-50/50 via-[#fcf6ee] to-[#fcf6ee] dark:bg-slate-950">
      
      {/* Hero Section */}
      <section className="w-full max-w-[1500px] mx-auto px-4 md:px-8 py-12 md:py-20 flex justify-between items-center gap-8 relative overflow-hidden">
        
        {/* Left Column (Images) */}
        <div className="hidden lg:flex flex-col gap-6 w-1/4 max-w-[320px]">
          <div className="w-full aspect-[4/4.5] relative rounded-2xl overflow-hidden shadow-xl border-4 border-white dark:border-slate-800">
            <Image src="/products/1/20.png" alt="Cat eating product" fill className="object-cover" />
          </div>
          <div className="w-full aspect-square relative rounded-2xl overflow-hidden shadow-xl border-4 border-white dark:border-slate-800">
            <Image src="/products/1/20.png" alt="Hemp Seed Oil" fill className="object-cover" />
          </div>
        </div>

        {/* Center Column (Text Content) */}
        <div className="w-full lg:w-1/2 flex flex-col items-center text-center z-10 px-2 md:px-6">
          <h1 className="text-[3.5rem] md:text-[5rem] lg:text-[5.5rem] font-serif font-bold text-[#11241f] dark:text-white leading-[1.1] mb-8">
            Pet{' '}
            <span className="relative inline-block mx-1">
              <span className="text-[#e63946] relative z-10">Care</span>
              {/* Hand-drawn Purple Circle & Arrows */}
              <svg className="absolute -inset-4 w-[130%] h-[150%] text-[#5a4fcf] -z-10" fill="none" viewBox="0 0 100 100" preserveAspectRatio="none">
                <path d="M50 15 C 10 15, 0 45, 10 75 C 20 95, 80 95, 95 70 C 110 40, 85 15, 50 15" stroke="currentColor" strokeWidth="4" strokeLinecap="round" vectorEffect="non-scaling-stroke"/>
                <path d="M45 22 C 15 22, 5 45, 15 70 C 25 90, 75 90, 90 65 C 105 40, 80 22, 45 22" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" vectorEffect="non-scaling-stroke" opacity="0.6" />
                {/* Arrows */}
                <path d="M40 -15 L45 5 M32 -5 L45 5" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" vectorEffect="non-scaling-stroke" />
                <path d="M55 -25 L50 -2 M68 -15 L50 -2" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" vectorEffect="non-scaling-stroke" />
                <path d="M68 -30 L55 -8" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" vectorEffect="non-scaling-stroke" />
              </svg>
            </span>
            , Prescribed by{' '}
            <span className="text-[#ff7f2a]">Vets</span> and{' '}
            <span className="text-[#ff7f2a] relative inline-block mx-1">
              Delivered
              {/* Hand-drawn Red Underline */}
              <svg className="absolute -bottom-4 left-0 w-[110%] -ml-[5%] h-6 text-[#e63946]" fill="none" viewBox="0 0 100 20" preserveAspectRatio="none">
                <path d="M0 10 Q 50 12 100 8" stroke="currentColor" strokeWidth="5" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
                <path d="M10 18 Q 50 19 80 15" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
              </svg>
            </span>{' '}
            to You.
          </h1>
          
          <p className="text-[19px] md:text-[22px] text-[#11241f] dark:text-gray-200 font-medium max-w-2xl mx-auto mb-12 leading-snug mt-6">
            100% natural, vet-approved treats and supplements for real results. Trusted by experts, loved by pets — because your furball deserves the best!
          </p>

          <Link href="/products" className="inline-flex items-center justify-center gap-3 bg-[#ff7f2a] text-black border-[4px] border-black px-12 py-4 rounded-[50px] font-display font-bold text-[28px] hover:bg-[#ff934d] transition-transform hover:-translate-y-1 transform shadow-[6px_6px_0_0_#000]">
            <ShoppingCart size={32} strokeWidth={2.5} />
            BUY NOW
          </Link>
        </div>

        {/* Right Column (Images) */}
        <div className="hidden lg:flex flex-col gap-6 w-1/4 max-w-[320px]">
          <div className="w-full aspect-[4/4.5] relative rounded-2xl overflow-hidden shadow-xl border-4 border-white dark:border-slate-800">
            <Image src="/products/1/20.png" alt="Crunchy Claws treats" fill className="object-cover" />
          </div>
          <div className="w-full aspect-square relative rounded-2xl overflow-hidden shadow-xl border-4 border-white dark:border-slate-800">
            <Image src="/products/1/20.png" alt="Colorful chews" fill className="object-cover" />
          </div>
        </div>
        
      </section>

      {/* The Coming Soon Placeholder (Moved Below Hero) */}
      <section className="py-20 flex-grow flex items-center justify-center">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-2xl mx-auto bg-white/50 backdrop-blur-sm dark:bg-slate-900/50 rounded-3xl p-12 border border-gray-200 dark:border-slate-800 shadow-sm">
            <span className="text-6xl mb-6 block">🩺</span>
            <h2 className="text-3xl font-bold text-[#11241f] dark:text-white mb-6">More coming soon!</h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 font-medium">
              We are building out dedicated resources, research, and partnership tools for veterinary professionals. Check back soon.
            </p>
          </div>
        </div>
      </section>

    </div>
  );
}
