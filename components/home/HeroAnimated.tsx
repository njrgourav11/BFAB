'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { ArrowDownRight, ArrowRight, ShieldCheck, Star } from 'lucide-react';
import SplitText from '@/components/reactbits/SplitText';
import ShinyText from '@/components/reactbits/ShinyText';
import Magnet from '@/components/reactbits/Magnet';
import type { ShowcaseProduct } from './useShowcaseProducts';

gsap.registerPlugin(ScrollTrigger, useGSAP);

const FAN = [
  { rotate: -14, x: '-58%', y: '8%', z: 1 },
  { rotate: 0, x: '0%', y: '-4%', z: 3 },
  { rotate: 13, x: '58%', y: '10%', z: 2 },
];

export default function HeroAnimated({ products }: { products: ShowcaseProduct[] }) {
  const root = useRef<HTMLElement>(null);
  // Lock the three cards in on first render (static catalogue, local packshots) so a later
  // Firestore refresh — whose images may all be remote — can't empty or re-deal the hand.
  const [picks] = useState<ShowcaseProduct[]>(() => {
    const withImage = products.filter((p) => p.image && !p.image.endsWith('bfab icon.png'));
    const local = withImage.filter((p) => p.image.startsWith('/'));
    return [...local, ...withImage.filter((p) => !p.image.startsWith('/'))].slice(0, 3);
  });

  useGSAP(
    () => {
      const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      const q = gsap.utils.selector(root);

      if (reduce) return;

      // Intro: cards deal in like a hand of cards, chrome fades up
      const intro = gsap.timeline({ defaults: { ease: 'power4.out' }, delay: 0.55 });
      intro
        .from(q('[data-hero-card]'), {
          y: 260,
          scale: 0.7,
          opacity: 0,
          duration: 1.4,
          stagger: 0.12,
        })
        .from(q('[data-hero-fade]'), { y: 24, opacity: 0, duration: 0.9, stagger: 0.08 }, 0.35)
        .from(q('[data-hero-blob]'), { scale: 0, opacity: 0, duration: 1.6, stagger: 0.15, ease: 'expo.out' }, 0);

      // Idle float on each card (on the inner wrapper so it doesn't fight scroll tweens)
      q('[data-hero-float]').forEach((el: Element, i: number) => {
        gsap.to(el, {
          y: i % 2 ? 14 : -14,
          rotate: i % 2 ? 1.5 : -1.5,
          duration: 3 + i * 0.4,
          ease: 'sine.inOut',
          yoyo: true,
          repeat: -1,
        });
      });

      // Scroll-out: copy lifts away, the hand of cards fans wider and sinks
      const out = gsap.timeline({
        scrollTrigger: { trigger: root.current, start: 'top top', end: 'bottom top', scrub: 0.6 },
      });
      out
        .to(q('[data-hero-copy]'), { yPercent: -30, opacity: 0, ease: 'none' }, 0)
        .to(q('[data-hero-scroll="0"]'), { xPercent: -40, rotate: -26, ease: 'none' }, 0)
        .to(q('[data-hero-scroll="1"]'), { yPercent: 18, scale: 1.08, ease: 'none' }, 0)
        .to(q('[data-hero-scroll="2"]'), { xPercent: 40, rotate: 26, ease: 'none' }, 0)
        .to(q('[data-hero-blob]'), { yPercent: -60, ease: 'none' }, 0);
    },
    { scope: root }
  );

  return (
    <section
      ref={root}
      className="relative isolate overflow-hidden bg-[#FAF7F2] text-[#241F1B] dark:bg-[#0F0C0A] dark:text-[#FAF7F2]"
    >
      {/* Soft colour fields */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div data-hero-blob className="absolute -left-32 top-10 h-[420px] w-[420px] rounded-full bg-[#F4623B]/20 blur-3xl dark:bg-[#F4623B]/15" />
        <div data-hero-blob className="absolute right-[-10%] top-[30%] h-[520px] w-[520px] rounded-full bg-[#E3A438]/25 blur-3xl dark:bg-[#E3A438]/10" />
        <div data-hero-blob className="absolute bottom-[-20%] left-[30%] h-[380px] w-[380px] rounded-full bg-[#2bbf85]/15 blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(36,31,27,0.07)_1px,transparent_0)] [background-size:22px_22px] dark:bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.05)_1px,transparent_0)]" />
      </div>

      <div className="mx-auto grid min-h-[calc(100svh-4rem)] max-w-7xl grid-cols-1 items-center gap-10 px-5 pb-16 pt-10 sm:px-8 lg:grid-cols-[1.25fr_1fr] lg:gap-6 lg:px-10 lg:pb-10 lg:pt-0">
        {/* Copy */}
        <div data-hero-copy className="relative z-10 text-center lg:text-left">
          <div data-hero-fade className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#241F1B]/10 bg-white/70 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] backdrop-blur dark:border-white/10 dark:bg-white/5">
            <span className="h-1.5 w-1.5 rounded-full bg-[#2bbf85]" />
            <ShinyText
              text="Vet formulated · Made in India"
              color="#8a7f75"
              shineColor="#F4623B"
              speed={3}
            />
          </div>

          <h1 className="font-fredoka text-[clamp(3rem,6vw,5.6rem)] font-bold leading-[0.92] tracking-[-0.03em]">
            <SplitText
              text="Real food."
              tag="span"
              className="block"
              textAlign="inherit"
              splitType="chars"
              mask
              trigger="load"
              delay={35}
              duration={1.1}
            />
            <SplitText
              text="Real care."
              tag="span"
              className="block text-[#F4623B]"
              textAlign="inherit"
              splitType="chars"
              mask
              trigger="load"
              delay={35}
              duration={1.1}
            />
            <SplitText
              text="Real tail wags."
              tag="span"
              className="block"
              textAlign="inherit"
              splitType="chars"
              mask
              trigger="load"
              delay={35}
              duration={1.1}
              hoverEffect="wave"
            />
          </h1>

          <p data-hero-fade className="mx-auto mt-6 max-w-md text-base leading-relaxed text-[#241F1B]/70 sm:text-lg lg:mx-0 dark:text-white/65">
            Clean treats, meals and supplements crafted with vets — so every bite your dog or cat
            begs for is one that&apos;s good for them.
          </p>

          <div data-hero-fade className="mt-9 flex flex-col items-center gap-4 sm:flex-row sm:justify-center lg:justify-start">
            <Magnet padding={60} magnetStrength={3}>
              <Link
                href="/products"
                className="group inline-flex items-center gap-3 rounded-full bg-[#241F1B] py-4 pl-7 pr-4 text-[15px] font-semibold text-white shadow-[0_20px_40px_-15px_rgba(36,31,27,0.6)] transition-colors hover:bg-[#F4623B] dark:bg-[#F4623B] dark:hover:bg-white dark:hover:text-[#241F1B]"
              >
                Shop the range
                <span className="grid h-8 w-8 place-items-center rounded-full bg-white/15 transition-transform duration-300 group-hover:rotate-[-45deg]">
                  <ArrowRight size={16} />
                </span>
              </Link>
            </Magnet>
            <a
              href="#collection"
              className="group inline-flex items-center gap-2 px-3 py-3 text-[15px] font-semibold underline-offset-8 hover:underline"
            >
              Explore the collection
              <ArrowDownRight size={18} className="transition-transform group-hover:translate-x-0.5 group-hover:translate-y-0.5" />
            </a>
          </div>

          <div data-hero-fade className="mt-10 flex flex-wrap items-center justify-center gap-x-7 gap-y-3 text-sm text-[#241F1B]/70 lg:justify-start dark:text-white/60">
            <span className="inline-flex items-center gap-1.5">
              <span className="flex text-[#E3A438]">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={14} fill="currentColor" strokeWidth={0} />
                ))}
              </span>
              Loved by <strong className="font-semibold text-[#241F1B] dark:text-white">1K+</strong> pet parents
            </span>
            <span className="inline-flex items-center gap-1.5">
              <ShieldCheck size={16} className="text-[#2bbf85]" /> No preservatives. Ever.
            </span>
          </div>
        </div>

        {/* Hand of product cards */}
        <div className="relative mx-auto h-[380px] w-full max-w-[560px] sm:h-[480px] lg:h-[600px]">
          {picks.map((p, i) => (
            <div
              key={p.id}
              className="absolute left-1/2 top-1/2 w-[46%] sm:w-[42%]"
              style={{
                zIndex: FAN[i].z,
                transform: `translate(-50%, -50%) translate(${FAN[i].x}, ${FAN[i].y}) rotate(${FAN[i].rotate}deg)`,
              }}
            >
              {/* layers: scroll-out → intro → idle float, so tweens never fight */}
              <div data-hero-scroll={i}>
              <div data-hero-card={i}>
              <div data-hero-float>
                <Link
                  href={`/products/${p.id}`}
                  className="group block overflow-hidden rounded-[28px] bg-white p-2 shadow-[0_40px_80px_-30px_rgba(36,31,27,0.55)] ring-1 ring-black/5 transition-transform duration-500 hover:-translate-y-3 dark:bg-white/10 dark:ring-white/10"
                >
                  <div className="relative aspect-[4/5] overflow-hidden rounded-[22px]" style={{ backgroundColor: p.accent }}>
                    <Image
                      src={p.image}
                      unoptimized={!p.image.startsWith('/')}
                      alt={p.name}
                      fill
                      priority={i === 1}
                      sizes="(max-width: 1024px) 45vw, 260px"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <div className="flex items-center justify-between gap-2 px-2 pb-1 pt-3">
                    <span className="line-clamp-1 text-[13px] font-semibold text-[#241F1B] dark:text-white">{p.name}</span>
                    <span className="shrink-0 text-[13px] font-bold" style={{ color: p.accent }}>
                      ₹{p.price}
                    </span>
                  </div>
                </Link>
              </div>
              </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll cue */}
      <div data-hero-fade className="pointer-events-none absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.25em] text-[#241F1B]/50 lg:flex dark:text-white/40">
        Scroll
        <span className="relative h-10 w-px overflow-hidden bg-[#241F1B]/15 dark:bg-white/15">
          <span className="absolute inset-x-0 top-0 h-1/2 animate-[scrollcue_1.6s_ease-in-out_infinite] bg-current" />
        </span>
      </div>
    </section>
  );
}
