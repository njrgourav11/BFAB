'use client';
/* eslint-disable @next/next/no-img-element */

import { useRef, type ReactNode } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import SplitText from '@/components/reactbits/SplitText';

gsap.registerPlugin(ScrollTrigger, useGSAP);

export interface ParallaxHeroProps {
  eyebrow: string;
  title: string;
  /** Second line of the title, drawn in the accent colour */
  highlight?: string;
  subtitle?: string;
  accent?: string;
  /** Up to three floating visuals, each drifting at its own speed */
  images?: { src: string; alt?: string }[];
  dark?: boolean;
  children?: ReactNode;
}

const SLOTS = [
  'right-[4%] top-[14%] w-[34%] max-w-[360px] rotate-[6deg]',
  'right-[30%] bottom-[6%] w-[22%] max-w-[230px] -rotate-[8deg]',
  'left-[62%] top-[6%] w-[16%] max-w-[170px] rotate-[12deg]',
];
const SPEEDS = [0.35, 0.8, 1.2];

/** Layered parallax page hero: copy splits in, visuals drift at different depths. */
export default function ParallaxHero({
  eyebrow,
  title,
  highlight,
  subtitle,
  accent = '#F4623B',
  images = [],
  dark = false,
  children,
}: ParallaxHeroProps) {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
      const q = gsap.utils.selector(root);
      gsap.from(q('[data-ph-fade]'), { y: 24, opacity: 0, duration: 0.9, stagger: 0.1, delay: 0.7, ease: 'power3.out' });
      gsap.from(q('[data-ph-img]'), { y: 120, opacity: 0, rotate: 0, scale: 0.8, duration: 1.4, stagger: 0.12, delay: 0.5, ease: 'expo.out' });
      gsap.from(q('[data-ph-ring]'), { scale: 0, duration: 1.8, ease: 'expo.out', stagger: 0.15, delay: 0.3 });

      const st = { trigger: root.current, start: 'top top', end: 'bottom top', scrub: true };
      gsap.to(q('[data-ph-copy]'), { yPercent: 35, opacity: 0, ease: 'none', scrollTrigger: st });
      q('[data-ph-layer]').forEach((el: HTMLElement, i: number) => {
        gsap.to(el, { yPercent: -SPEEDS[i % SPEEDS.length] * 60, ease: 'none', scrollTrigger: st });
      });
      gsap.to(q('[data-ph-ring]'), { scale: 1.4, opacity: 0, ease: 'none', scrollTrigger: st });
    },
    { scope: root }
  );

  return (
    <section
      ref={root}
      data-page-animate="off"
      className={`relative isolate overflow-hidden ${dark ? 'bg-[#14100D] text-white' : 'bg-[#FAF7F2] text-[#241F1B] dark:bg-[#0F0C0A] dark:text-[#FAF7F2]'}`}
    >
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div data-ph-ring className="absolute -right-40 -top-40 h-[620px] w-[620px] rounded-full border-[60px] opacity-[0.12]" style={{ borderColor: accent }} />
        <div data-ph-ring className="absolute -left-32 bottom-[-30%] h-[420px] w-[420px] rounded-full opacity-20 blur-3xl" style={{ backgroundColor: accent }} />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(36,31,27,0.07)_1px,transparent_0)] [background-size:22px_22px] dark:bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.05)_1px,transparent_0)]" />
      </div>

      {images.slice(0, 3).map((img, i) => (
        <div key={img.src} data-ph-layer className={`pointer-events-none absolute hidden md:block ${SLOTS[i]}`}>
          <div data-ph-img className="overflow-hidden rounded-[28px] shadow-[0_40px_80px_-30px_rgba(0,0,0,0.5)]" style={{ backgroundColor: accent }}>
            <img src={img.src} alt={img.alt ?? ''} className="aspect-[4/5] w-full object-cover" />
          </div>
        </div>
      ))}

      <div data-ph-copy className="relative mx-auto flex min-h-[68vh] max-w-7xl flex-col justify-center px-5 py-24 sm:px-8 lg:px-10">
        <p data-ph-fade className="mb-6 inline-flex items-center gap-3 text-xs font-bold uppercase tracking-[0.25em]" style={{ color: accent }}>
          <span className="h-px w-10" style={{ backgroundColor: accent }} />
          {eyebrow}
        </p>
        <h1 className="max-w-3xl font-fredoka text-[clamp(2.8rem,7vw,6.2rem)] font-bold leading-[0.95] tracking-[-0.03em]">
          <SplitText text={title} tag="span" className="block" textAlign="inherit" splitType="chars" mask trigger="load" delay={30} duration={1.1} />
          {highlight && (
            <span className="block" style={{ color: accent }}>
              <SplitText text={highlight} tag="span" className="block" textAlign="inherit" splitType="chars" mask trigger="load" delay={30} duration={1.1} />
            </span>
          )}
        </h1>
        {subtitle && (
          <p data-ph-fade className={`mt-7 max-w-xl text-lg leading-relaxed ${dark ? 'text-white/65' : 'text-[#241F1B]/65 dark:text-white/60'}`}>
            {subtitle}
          </p>
        )}
        {children && <div data-ph-fade className="mt-9">{children}</div>}
      </div>
    </section>
  );
}
