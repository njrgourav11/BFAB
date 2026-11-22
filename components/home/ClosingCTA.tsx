'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import ScrollFloat from '@/components/reactbits/ScrollFloat';
import Magnet from '@/components/reactbits/Magnet';
import Reveal from '@/components/motion/Reveal';

export default function ClosingCTA() {
  return (
    <section className="relative overflow-hidden bg-[#14100D] py-24 text-white sm:py-32">
      <div aria-hidden className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full bg-[#F4623B]/35 blur-3xl" />
      <div aria-hidden className="pointer-events-none absolute -bottom-32 -left-16 h-96 w-96 rounded-full bg-[#E3A438]/20 blur-3xl" />
      <div className="relative mx-auto max-w-6xl px-5 text-center sm:px-8">
        <p className="mb-2 text-xs font-bold uppercase tracking-[0.25em] text-[#F4623B]">Beggin For A Bite</p>
        <ScrollFloat
          containerClassName="!my-0"
          textClassName="font-fredoka !text-[clamp(2.6rem,9vw,7.5rem)] !leading-[1] tracking-[-0.03em]"
          animationDuration={1}
          ease="back.inOut(2)"
          scrollStart="center bottom+=50%"
          scrollEnd="bottom bottom-=40%"
          stagger={0.03}
        >
          Worth begging for.
        </ScrollFloat>
        <Reveal delay={0.1} className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-white/70 sm:text-lg">
          Join 1,000+ pet parents feeding cleaner, smarter and tastier — backed by our 90-day guarantee.
        </Reveal>
        <Reveal delay={0.2} className="mt-10 flex justify-center">
          <Magnet padding={80} magnetStrength={2.5}>
            <Link
              href="/products"
              className="group inline-flex items-center gap-3 rounded-full bg-[#F4623B] py-4 pl-8 pr-4 text-base font-semibold text-white shadow-[0_25px_50px_-20px_rgba(244,98,59,0.7)] transition-colors hover:bg-white hover:text-[#241F1B]"
            >
              Start shopping
              <span className="grid h-9 w-9 place-items-center rounded-full bg-white/20 transition-transform duration-300 group-hover:rotate-[-45deg]">
                <ArrowRight size={18} />
              </span>
            </Link>
          </Magnet>
        </Reveal>
      </div>
    </section>
  );
}
