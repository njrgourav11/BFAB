'use client';

import { useRef, type ReactNode } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import SplitText from '@/components/reactbits/SplitText';
import FloatingProducts, { type CutoutName, type FloatItem } from './FloatingProducts';

gsap.registerPlugin(ScrollTrigger, useGSAP);

export interface ParallaxHeroProps {
  eyebrow: string;
  title: string;
  /** Second line of the title, drawn in the accent colour */
  highlight?: string;
  subtitle?: string;
  accent?: string;
  /** Product cutouts (from /products-media) that float around the copy */
  products?: CutoutName[];
  size?: 'full' | 'compact';
  align?: 'left' | 'center';
  children?: ReactNode;
}

// Slots keep the right half busy and leave the copy column clear
const FULL_SLOTS = [
  'right-[6%] top-[14%] w-[15vw] max-w-[220px] min-w-[120px]',
  'right-[26%] bottom-[8%] w-[11vw] max-w-[160px] min-w-[90px]',
  'right-[30%] top-[10%] w-[8vw] max-w-[120px] min-w-[70px]',
  'right-[2%] bottom-[4%] w-[12vw] max-w-[180px] min-w-[100px]',
];
const COMPACT_SLOTS = [
  'right-[5%] top-[18%] w-[9vw] max-w-[130px] min-w-[80px]',
  'right-[20%] bottom-[10%] w-[7vw] max-w-[100px] min-w-[64px]',
  'right-[38%] top-[14%] w-[5vw] max-w-[80px] min-w-[52px] hidden lg:block',
];
const CENTER_SLOTS = [
  'left-[5%] top-[18%] w-[10vw] max-w-[150px] min-w-[80px]',
  'right-[5%] top-[14%] w-[11vw] max-w-[160px] min-w-[86px]',
  'left-[14%] bottom-[6%] w-[7vw] max-w-[110px] min-w-[64px]',
  'right-[15%] bottom-[8%] w-[8vw] max-w-[120px] min-w-[70px]',
];
const TILTS = [8, -10, 14, -6];

/**
 * The shared page hero: Fredoka headline split into letters, brand accent line,
 * product cutouts bobbing at different parallax depths, copy that eases away on scroll.
 */
export default function ParallaxHero({
  eyebrow,
  title,
  highlight,
  subtitle,
  accent = '#F4623B',
  products = ['peanut', 'pre', 'jerky', 'hemp'],
  size = 'full',
  align = 'left',
  children,
}: ParallaxHeroProps) {
  const root = useRef<HTMLElement>(null);
  const compact = size === 'compact';
  const centered = align === 'center';
  const slots = centered ? CENTER_SLOTS : compact ? COMPACT_SLOTS : FULL_SLOTS;

  const floats: FloatItem[] = products.slice(0, slots.length).map((name, i) => ({
    name,
    className: `${slots[i]} ${i > 1 ? 'hidden sm:block' : ''}`,
    rotate: TILTS[i],
    depth: 0.3 + i * 0.22,
  }));

  useGSAP(
    () => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
      const q = gsap.utils.selector(root);
      gsap.from(q('[data-ph-fade]'), { y: 24, opacity: 0, duration: 0.9, stagger: 0.1, delay: 0.7, ease: 'power3.out' });
      gsap.from(q('[data-ph-ring]'), { scale: 0, duration: 1.8, ease: 'expo.out', stagger: 0.15, delay: 0.3 });
      const st = { trigger: root.current, start: 'top top', end: 'bottom top', scrub: true };
      gsap.to(q('[data-ph-copy]'), { yPercent: 30, opacity: 0, ease: 'none', scrollTrigger: st });
      gsap.to(q('[data-ph-ring]'), { scale: 1.35, opacity: 0, ease: 'none', scrollTrigger: st });
    },
    { scope: root }
  );

  return (
    <section
      ref={root}
      data-page-animate="off"
      className="relative isolate overflow-hidden bg-[#FAF7F2] text-[#241F1B] dark:bg-[#0F0C0A] dark:text-[#FAF7F2]"
    >
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div data-ph-ring className="absolute -right-48 -top-48 h-[640px] w-[640px] rounded-full border-[70px] opacity-[0.1]" style={{ borderColor: accent }} />
        <div data-ph-ring className="absolute -left-32 bottom-[-35%] h-[440px] w-[440px] rounded-full opacity-20 blur-3xl" style={{ backgroundColor: accent }} />
        <div data-ph-ring className="absolute right-[18%] top-[30%] h-[300px] w-[300px] rounded-full bg-[#E3A438]/20 blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(36,31,27,0.07)_1px,transparent_0)] [background-size:22px_22px] dark:bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.05)_1px,transparent_0)]" />
      </div>

      <FloatingProducts items={floats} className="-z-[1] opacity-35 md:opacity-100" />

      <div
        data-ph-copy
        className={`relative mx-auto flex max-w-7xl flex-col justify-center px-5 sm:px-8 lg:px-10 ${
          compact ? 'min-h-[38vh] py-16 sm:py-20' : 'min-h-[66vh] py-24'
        } ${centered ? 'items-center text-center' : ''}`}
      >
        <p data-ph-fade className="mb-5 inline-flex items-center gap-3 text-xs font-bold uppercase tracking-[0.25em]" style={{ color: accent }}>
          <span className="h-px w-10" style={{ backgroundColor: accent }} />
          {eyebrow}
          {centered && <span className="h-px w-10" style={{ backgroundColor: accent }} />}
        </p>
        <h1
          className={`font-fredoka font-bold leading-[0.95] tracking-[-0.03em] ${
            compact ? 'max-w-2xl text-[clamp(2.4rem,5.4vw,4.4rem)]' : 'max-w-3xl text-[clamp(2.8rem,7vw,6.2rem)]'
          }`}
        >
          <SplitText text={title} tag="span" className="block" textAlign="inherit" splitType="chars" mask trigger="load" delay={28} duration={1.1} />
          {highlight && (
            <span className="block" style={{ color: accent }}>
              <SplitText text={highlight} tag="span" className="block" textAlign="inherit" splitType="chars" mask trigger="load" delay={28} duration={1.1} />
            </span>
          )}
        </h1>
        {subtitle && (
          <p data-ph-fade className={`mt-6 max-w-xl leading-relaxed text-[#241F1B]/65 dark:text-white/60 ${compact ? 'text-base sm:text-lg' : 'text-lg'}`}>
            {subtitle}
          </p>
        )}
        {children && <div data-ph-fade className={`mt-8 w-full ${centered ? 'max-w-xl' : 'max-w-xl'}`}>{children}</div>}
      </div>
    </section>
  );
}
