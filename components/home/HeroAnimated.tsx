'use client';

import { useRef } from 'react';
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

// Product cutouts from /public/products-media (rasterised to /cutouts), arranged on the orange plate
const STACK = [
  { key: 'pre', src: '/products-media/cutouts/pre.webp', match: /prebiotic|topper/i, label: 'Prebiotic ProTopper',
    pos: 'left-[0%] top-[18%] w-[28%]', rotate: -10, z: 1, out: { xPercent: -45, rotate: -24 } },
  { key: 'jerky', src: '/products-media/cutouts/jerky.webp', match: /jerky/i, label: 'Chicken Breast Jerky',
    pos: 'right-[-2%] top-[10%] w-[30%]', rotate: 10, z: 1, out: { xPercent: 45, rotate: 24 } },
  { key: 'peanut', src: '/products-media/cutouts/peanut.webp', match: /peanut/i, label: 'Peanut Butter for Dogs',
    pos: 'left-[34%] top-[20%] w-[32%]', rotate: 0, z: 3, out: { yPercent: 14, scale: 1.12 } },
  { key: 'hemp', src: '/products-media/cutouts/hemp.webp', match: /hemp/i, label: 'Hemp Seed Oil',
    pos: 'left-[14%] bottom-[4%] w-[14%]', rotate: -14, z: 4, out: { yPercent: -60, xPercent: -30, rotate: -30 } },
  { key: 'hip', src: '/products-media/cutouts/hip.webp', match: /hip|joint/i, label: 'Hip & Joint Care',
    pos: 'right-[12%] bottom-[2%] w-[24%]', rotate: 8, z: 4, out: { yPercent: -50, xPercent: 30, rotate: 22 } },
] as const;

export default function HeroAnimated({ products }: { products: ShowcaseProduct[] }) {
  const root = useRef<HTMLElement>(null);
  // Link each cutout to its live product (falls back to the shop if it isn't in the catalogue)
  const items = STACK.map((it) => {
    const p = products.find((x) => it.match.test(x.name));
    return { ...it, href: p ? `/products/${p.id}` : '/products', price: p?.price };
  });

  useGSAP(
    () => {
      const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      const q = gsap.utils.selector(root);

      if (reduce) return;

      // Intro: plate spins in, products drop onto it one after another, chrome fades up
      const intro = gsap.timeline({ defaults: { ease: 'power4.out' }, delay: 0.55 });
      intro
        .from(q('[data-hero-plate]'), { scale: 0.4, rotate: -90, opacity: 0, duration: 1.6, ease: 'expo.out' }, 0)
        .from(q('[data-hero-card]'), {
          y: -220,
          scale: 0.6,
          opacity: 0,
          duration: 1.3,
          stagger: 0.1,
          ease: 'back.out(1.4)',
        }, 0.2)
        .from(q('[data-hero-chip]'), { scale: 0, opacity: 0, duration: 0.7, ease: 'back.out(2)' }, 1.2)
        .from(q('[data-hero-fade]'), { y: 24, opacity: 0, duration: 0.9, stagger: 0.08 }, 0.35)
        .from(q('[data-hero-blob]'), { scale: 0, opacity: 0, duration: 1.6, stagger: 0.15, ease: 'expo.out' }, 0);

      // Idle float on each card (on the inner wrapper so it doesn't fight scroll tweens)
      q('[data-hero-float]').forEach((el: Element, i: number) => {
        gsap.to(el, {
          y: i % 2 ? 16 : -16,
          rotate: i % 2 ? 3 : -3,
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
        .to(q('[data-hero-plate]'), { scale: 1.15, rotate: 25, ease: 'none' }, 0)
        .to(q('[data-hero-blob]'), { yPercent: -60, ease: 'none' }, 0);
      STACK.forEach((it) => out.to(q(`[data-hero-scroll="${it.key}"]`), { ...it.out, ease: 'none' }, 0));
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

        {/* Product cutouts on the brand plate */}
        <div className="relative mx-auto aspect-square w-full max-w-[400px] sm:max-w-[520px] lg:max-w-[600px]">
          <div data-hero-plate aria-hidden className="absolute left-1/2 top-1/2 h-[82%] w-[82%] -translate-x-1/2 -translate-y-1/2">
            <Image src="/products-media/bowl.svg" alt="" fill priority className="object-contain" />
            <div className="absolute inset-[16%] rounded-full border-2 border-dashed border-white/40" />
          </div>
          {items.map((it, i) => (
            <div key={it.key} className={`absolute ${it.pos}`} style={{ zIndex: it.z }}>
              {/* layers: scroll-out → intro → idle bob, so tweens never fight */}
              <div data-hero-scroll={it.key}>
                <div data-hero-card>
                  <div data-hero-float style={{ transform: `rotate(${it.rotate}deg)` }}>
                    <Link href={it.href} aria-label={it.label} className="group block">
                      <Image
                        src={it.src}
                        alt={it.label}
                        width={640}
                        height={640}
                        priority={it.key === 'peanut'}
                        sizes="(max-width: 1024px) 40vw, 240px"
                        className="h-auto w-full drop-shadow-[0_30px_30px_rgba(36,31,27,0.35)] transition-transform duration-500 group-hover:-translate-y-2 group-hover:scale-105"
                      />
                    </Link>
                  </div>
                </div>
              </div>
              {it.key === 'peanut' && (
                <Link
                  href={it.href}
                  data-hero-chip
                  className="absolute -right-[42%] top-[8%] hidden whitespace-nowrap rounded-full bg-white/95 px-4 py-2 text-[13px] font-semibold text-[#241F1B] shadow-[0_15px_30px_-15px_rgba(36,31,27,0.5)] backdrop-blur transition-colors hover:bg-[#241F1B] hover:text-white sm:inline-flex sm:items-center sm:gap-2"
                  style={{ zIndex: 5 }}
                >
                  <span className="h-2 w-2 rounded-full bg-[#2bbf85]" />
                  {it.label}
                  {it.price ? <span className="text-[#F4623B]">₹{it.price}</span> : null}
                </Link>
              )}
              {i === 4 && (
                <span data-hero-chip aria-hidden className="absolute -right-[20%] bottom-[-8%] hidden rotate-[-8deg] rounded-full bg-[#241F1B] px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.14em] text-white sm:inline-block">
                  Vet formulated
                </span>
              )}
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
