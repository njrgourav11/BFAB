import ParallaxHero from '@/components/motion/ParallaxHero';
import Link from 'next/link';
import { ShoppingCart } from 'lucide-react';

export default function VetProfessionalsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F2] dark:bg-slate-950">
      
      <ParallaxHero
        eyebrow="For vet professionals"
        title="Pet care, prescribed"
        highlight="by vets."
        subtitle="100% natural, vet-approved treats and supplements for real results. Trusted by experts, loved by pets."
        products={['hip', 'pre', 'hemp', 'peanut']}
        align="center"
      >
        <Link href="/products" className="inline-flex items-center justify-center gap-3 rounded-full bg-[#F4623B] px-8 py-4 text-base font-semibold text-white shadow-[0_20px_40px_-20px_rgba(244,98,59,0.9)] transition-colors hover:bg-[#241F1B]">
          <ShoppingCart size={20} />
          Shop the range
        </Link>
      </ParallaxHero>

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
