'use client';
/* eslint-disable @next/next/no-img-element */

import { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger, useGSAP);

/** Transparent product cutouts rasterised from /public/products-media */
export const CUTOUTS = {
  peanut: { src: '/products-media/cutouts/peanut.webp', alt: 'Peanut butter for dogs' },
  jerky: { src: '/products-media/cutouts/jerky.webp', alt: 'Chicken breast jerky' },
  meat: { src: '/products-media/cutouts/meat.webp', alt: 'Non-veg meal bowl' },
  vegmeals: { src: '/products-media/cutouts/vegmeals.webp', alt: 'Vegie meal bowl' },
  hip: { src: '/products-media/cutouts/hip.webp', alt: 'Hip & joint supplement' },
  hemp: { src: '/products-media/cutouts/hemp.webp', alt: 'Hemp seed oil' },
  pre: { src: '/products-media/cutouts/pre.webp', alt: 'Prebiotic ProTopper' },
  treat: { src: '/products-media/cutouts/treat.webp', alt: 'Nutri-treats' },
  food: { src: '/products-media/cutouts/food.webp', alt: 'Fresh food bowl' },
} as const;

export type CutoutName = keyof typeof CUTOUTS;

export interface FloatItem {
  name: CutoutName;
  /** Tailwind positioning + width classes, e.g. "right-[6%] top-[12%] w-40" */
  className: string;
  /** Scroll parallax depth: higher drifts further */
  depth?: number;
  rotate?: number;
}

/**
 * Products that bob gently up and down (GSAP yoyo) and drift at different depths
 * as the page scrolls. Purely decorative: aria-hidden, pointer-events none.
 */
export default function FloatingProducts({
  items,
  className = '',
  shadow = true,
}: {
  items: FloatItem[];
  className?: string;
  shadow?: boolean;
}) {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      const layers = gsap.utils.toArray<HTMLElement>('[data-float-layer]', root.current);
      layers.forEach((layer, i) => {
        const bob = layer.querySelector('[data-float-bob]');
        const depth = Number(layer.dataset.depth) || 0.4;
        gsap.from(layer, { y: 120, opacity: 0, scale: 0.7, duration: 1.4, delay: 0.4 + i * 0.12, ease: 'expo.out' });
        if (reduce) return;
        gsap.to(bob, {
          y: i % 2 ? 18 : -18,
          rotate: `+=${i % 2 ? 4 : -4}`,
          duration: 2.6 + (i % 3) * 0.5,
          ease: 'sine.inOut',
          yoyo: true,
          repeat: -1,
          delay: i * 0.2,
        });
        gsap.to(layer, {
          yPercent: -depth * 90,
          ease: 'none',
          scrollTrigger: { trigger: root.current, start: 'top bottom', end: 'bottom top', scrub: true },
        });
      });
    },
    { scope: root }
  );

  return (
    <div ref={root} aria-hidden className={`pointer-events-none absolute inset-0 ${className}`}>
      {items.map((it, i) => (
        <div key={it.name + i} data-float-layer data-depth={it.depth ?? 0.3 + (i % 3) * 0.25} className={`absolute ${it.className}`}>
          <div data-float-bob style={{ transform: `rotate(${it.rotate ?? 0}deg)` }}>
            <img
              src={CUTOUTS[it.name].src}
              alt=""
              loading="lazy"
              className={`h-auto w-full select-none ${shadow ? 'drop-shadow-[0_30px_30px_rgba(36,31,27,0.28)]' : ''}`}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
