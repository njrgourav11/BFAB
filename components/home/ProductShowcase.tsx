'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { ArrowRight, Check, Plus, Star } from 'lucide-react';
import { useCart } from '@/app/components/CartContext';
import type { ShowcaseProduct } from './useShowcaseProducts';

gsap.registerPlugin(ScrollTrigger, useGSAP);

const pad = (n: number) => String(n).padStart(2, '0');
const petLabel = (p: string) => (p === 'dog' ? 'For dogs' : p === 'cat' ? 'For cats' : 'Dogs & cats');

function AddButton({ product }: { product: ShowcaseProduct }) {
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);
  return (
    <button
      type="button"
      onClick={() => {
        addToCart({
          id: product.id,
          name: product.name,
          price: String(product.price),
          image: product.image,
          petType: product.petType,
          productCategory: product.productCategory,
        });
        setAdded(true);
        window.setTimeout(() => setAdded(false), 1600);
      }}
      className="inline-flex items-center gap-2 rounded-full px-6 py-3.5 text-sm font-semibold text-white transition-transform duration-300 hover:scale-[1.04] active:scale-95"
      style={{ backgroundColor: product.accent }}
    >
      {added ? <Check size={17} /> : <Plus size={17} />}
      {added ? 'Added' : 'Add to cart'}
    </button>
  );
}

function ProductPanel({ p, i, total }: { p: ShowcaseProduct; i: number; total: number }) {
  const off = p.originalPrice && p.originalPrice > p.price ? Math.round((1 - p.price / p.originalPrice) * 100) : 0;
  return (
    <article
      data-panel
      data-accent={p.accent}
      className="relative flex w-full shrink-0 flex-col overflow-hidden rounded-[32px] bg-[#FAF7F2] text-[#241F1B] shadow-[0_50px_100px_-40px_rgba(0,0,0,0.8)] lg:h-[min(76vh,640px)] lg:w-[min(78vw,1040px)] lg:flex-row"
    >
      {/* Visual */}
      <div
        className="relative aspect-square w-full overflow-hidden sm:aspect-[16/11] lg:aspect-auto lg:h-full lg:w-[46%]"
        style={{ backgroundColor: p.accent }}
      >
        <div data-panel-img className="absolute inset-0 will-change-transform">
          <Image
            src={p.image}
            alt={p.name}
            fill
            sizes="(max-width: 1024px) 92vw, 480px"
            className="object-cover"
          />
        </div>
        <span className="absolute left-5 top-5 rounded-full bg-white/90 px-3 py-1 text-xs font-bold uppercase tracking-[0.14em] text-[#241F1B] backdrop-blur">
          {pad(i + 1)} / {pad(total)}
        </span>
        {off > 0 && (
          <span className="absolute right-5 top-5 rounded-full bg-[#241F1B] px-3 py-1 text-xs font-bold text-white">
            Save {off}%
          </span>
        )}
      </div>

      {/* Copy */}
      <div className="flex flex-1 flex-col justify-between gap-8 p-7 sm:p-10 lg:p-12">
        <div>
          <p data-panel-line className="mb-4 flex items-center gap-3 text-xs font-bold uppercase tracking-[0.2em]" style={{ color: p.accent }}>
            <span className="h-px w-8" style={{ backgroundColor: p.accent }} />
            {p.productCategory || 'Wellness'} · {petLabel(p.petType)}
          </p>
          <h3 data-panel-line className="font-fredoka text-[clamp(1.9rem,3.4vw,3.1rem)] font-bold leading-[1.02] tracking-[-0.02em]">
            {p.name}
          </h3>
          <p data-panel-line className="mt-5 line-clamp-3 max-w-lg text-[15px] leading-relaxed text-[#241F1B]/70">
            {p.description}
          </p>
          {p.highlights.length > 0 && (
            <ul data-panel-line className="mt-6 flex flex-wrap gap-2">
              {p.highlights.map((h) => (
                <li
                  key={h}
                  className="rounded-full border px-3.5 py-1.5 text-[13px] font-medium"
                  style={{ borderColor: `${p.accent}55`, backgroundColor: `${p.accent}12` }}
                >
                  {h}
                </li>
              ))}
            </ul>
          )}
        </div>

        <div data-panel-line className="flex flex-wrap items-end justify-between gap-5 border-t border-[#241F1B]/10 pt-6">
          <div>
            <div className="mb-1 flex items-center gap-1.5 text-[13px] text-[#241F1B]/60">
              <Star size={14} fill="#E3A438" strokeWidth={0} />
              <strong className="text-[#241F1B]">{p.rating.toFixed(1)}</strong>
              {p.reviews > 0 && <span>({p.reviews.toLocaleString('en-IN')} reviews)</span>}
            </div>
            <p className="font-fredoka text-3xl font-bold">
              ₹{p.price.toLocaleString('en-IN')}
              {off > 0 && (
                <span className="ml-2 text-base font-medium text-[#241F1B]/40 line-through">
                  ₹{p.originalPrice?.toLocaleString('en-IN')}
                </span>
              )}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Link
              href={`/products/${p.id}`}
              aria-label={`View ${p.name}`}
              className="grid h-12 w-12 place-items-center rounded-full border border-[#241F1B]/15 transition-colors hover:bg-[#241F1B] hover:text-white"
            >
              <ArrowRight size={18} />
            </Link>
            <AddButton product={p} />
          </div>
        </div>
      </div>
    </article>
  );
}

export default function ProductShowcase({ products }: { products: ShowcaseProduct[] }) {
  const section = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const glow = useRef<HTMLDivElement>(null);
  const bar = useRef<HTMLDivElement>(null);
  const counter = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (reduce || !section.current || !track.current) return;
      const panels = gsap.utils.toArray<HTMLElement>('[data-panel]', section.current);
      const mm = gsap.matchMedia();

      // Desktop: pin the section and translate the track sideways as you scroll down
      mm.add('(min-width: 1024px)', () => {
        const el = track.current!;
        const distance = () => el.scrollWidth - window.innerWidth;

        const horizontal = gsap.to(el, {
          x: () => -distance(),
          ease: 'none',
          scrollTrigger: {
            trigger: section.current,
            start: 'top top',
            end: () => `+=${distance()}`,
            pin: true,
            scrub: 1,
            invalidateOnRefresh: true,
            anticipatePin: 1,
            onUpdate: (self) => {
              if (bar.current) gsap.set(bar.current, { scaleX: self.progress });
              if (counter.current) {
                const idx = Math.min(panels.length, Math.max(1, Math.round(self.progress * (panels.length - 1)) + 1));
                counter.current.textContent = pad(idx);
              }
            },
          },
        });

        panels.forEach((panel) => {
          const img = panel.querySelector('[data-panel-img]');
          const lines = panel.querySelectorAll('[data-panel-line]');

          // Packshot drifts inside its frame (horizontal parallax)
          if (img) {
            gsap.fromTo(
              img,
              { xPercent: -12, scale: 1.25 },
              {
                xPercent: 12,
                scale: 1.05,
                ease: 'none',
                scrollTrigger: {
                  trigger: panel,
                  containerAnimation: horizontal,
                  start: 'left right',
                  end: 'right left',
                  scrub: true,
                },
              }
            );
          }

          // Card tilts up into place as it slides in
          gsap.from(panel, {
            rotate: 4,
            scale: 0.88,
            opacity: 0.4,
            ease: 'none',
            scrollTrigger: {
              trigger: panel,
              containerAnimation: horizontal,
              start: 'left right',
              end: 'left 45%',
              scrub: true,
            },
          });

          gsap.from(lines, {
            y: 40,
            opacity: 0,
            stagger: 0.08,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: panel,
              containerAnimation: horizontal,
              start: 'left 70%',
              toggleActions: 'play none none reverse',
            },
          });

          // Ambient glow follows the product in view
          ScrollTrigger.create({
            trigger: panel,
            containerAnimation: horizontal,
            start: 'left center',
            end: 'right center',
            onToggle: (self) => {
              if (self.isActive && glow.current) {
                gsap.to(glow.current, { backgroundColor: panel.dataset.accent, duration: 0.8, ease: 'power2.out' });
              }
            },
          });
        });
      });

      // Mobile / tablet: vertical list, each card rises in with its packshot drifting
      mm.add('(max-width: 1023px)', () => {
        panels.forEach((panel) => {
          const img = panel.querySelector('[data-panel-img]');
          gsap.from(panel, {
            y: 90,
            scale: 0.94,
            opacity: 0,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: { trigger: panel, start: 'top 92%', once: true },
          });
          if (img) {
            gsap.fromTo(
              img,
              { yPercent: -8, scale: 1.18 },
              {
                yPercent: 8,
                scale: 1.05,
                ease: 'none',
                scrollTrigger: { trigger: panel, start: 'top bottom', end: 'bottom top', scrub: true },
              }
            );
          }
          gsap.from(panel.querySelectorAll('[data-panel-line]'), {
            y: 30,
            opacity: 0,
            stagger: 0.07,
            duration: 0.7,
            ease: 'power3.out',
            scrollTrigger: { trigger: panel, start: 'top 60%', once: true },
          });
        });
      });

      return () => mm.revert();
    },
    { scope: section, dependencies: [products.map((p) => p.id).join()], revertOnUpdate: true }
  );

  return (
    <section
      id="collection"
      ref={section}
      className="relative overflow-hidden bg-[#14100D] text-white lg:h-screen"
    >
      <div
        ref={glow}
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 h-[70vh] w-[70vw] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#F4623B] opacity-25 blur-[140px]"
      />

      <div
        ref={track}
        className="relative flex flex-col gap-6 px-5 py-20 sm:px-8 lg:h-full lg:w-max lg:flex-row lg:items-center lg:gap-10 lg:px-[6vw] lg:py-0"
      >
        {/* Intro panel */}
        <div className="flex shrink-0 flex-col justify-center pb-6 lg:w-[34vw] lg:pb-0 lg:pr-6">
          <p className="mb-5 text-xs font-bold uppercase tracking-[0.25em] text-[#E3A438]">The collection</p>
          <h2 className="font-fredoka text-[clamp(2.6rem,5.4vw,5.2rem)] font-bold leading-[0.95] tracking-[-0.03em]">
            Every bite,
            <br />
            <span className="text-[#F4623B]">vet-approved.</span>
          </h2>
          <p className="mt-6 max-w-sm text-[15px] leading-relaxed text-white/60">
            {products.length} products. Zero nasties. Scroll through the full range — from gut-friendly
            frozen treats to joint support and slow-dried chews.
          </p>
          <div className="mt-10 hidden items-center gap-4 text-sm text-white/50 lg:flex">
            <span className="font-fredoka text-2xl font-bold text-white">
              <span ref={counter}>01</span>
              <span className="text-white/30"> / {pad(products.length)}</span>
            </span>
            <span className="relative h-[2px] w-40 overflow-hidden rounded bg-white/15">
              <span ref={bar} className="absolute inset-0 origin-left scale-x-0 bg-[#F4623B]" />
            </span>
          </div>
        </div>

        {products.map((p, i) => (
          <ProductPanel key={p.id} p={p} i={i} total={products.length} />
        ))}

        {/* Outro panel */}
        <div className="flex shrink-0 flex-col items-start justify-center gap-6 pt-6 lg:w-[30vw] lg:pt-0">
          <h3 className="font-fredoka text-[clamp(2rem,3.6vw,3.4rem)] font-bold leading-[1] tracking-[-0.02em]">
            Find their
            <br />
            new favourite.
          </h3>
          <Link
            href="/products"
            className="group inline-flex items-center gap-3 rounded-full bg-white py-4 pl-7 pr-4 text-[15px] font-semibold text-[#14100D] transition-colors hover:bg-[#F4623B] hover:text-white"
          >
            Shop all products
            <span className="grid h-8 w-8 place-items-center rounded-full bg-[#14100D]/10 transition-transform duration-300 group-hover:rotate-[-45deg]">
              <ArrowRight size={16} />
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
