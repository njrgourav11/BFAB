'use client';
/* eslint-disable @next/next/no-img-element -- product images can live on any CMS host */

import { useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  ArrowRight,
  Award,
  Check,
  ChevronDown,
  ChevronRight,
  Minus,
  Plus,
  Quote,
  RefreshCw,
  ShieldCheck,
  Snowflake,
  Star,
  Truck,
  Zap,
} from 'lucide-react';
import type { Product } from '@/lib/types';
import SplitText from '@/components/reactbits/SplitText';
import ScrollVelocity from '@/components/reactbits/ScrollVelocity';
import ScrollReveal from '@/components/reactbits/ScrollReveal';
import Magnet from '@/components/reactbits/Magnet';
import { accentFor, useShowcaseProducts } from '@/components/home/useShowcaseProducts';

gsap.registerPlugin(ScrollTrigger, useGSAP);

export interface ProductExperienceProps {
  product: Product & { storage?: string[]; benefits?: string[] };
  onAddToCart: (quantity: number, variant?: { label: string; price: number }, unitPrice?: number) => void;
}

const inr = (n: number) => '₹' + Math.round(n).toLocaleString('en-IN');
const pad = (n: number) => String(n).padStart(2, '0');
const petLabel = (p?: string) => (p === 'dog' ? 'For dogs' : p === 'cat' ? 'For cats' : 'For dogs & cats');

function Stars({ rating, size = 16 }: { rating: number; size?: number }) {
  return (
    <span className="inline-flex gap-0.5 text-[#E3A438]">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} size={size} fill={i < Math.round(rating) ? 'currentColor' : 'none'} strokeWidth={i < Math.round(rating) ? 0 : 1.5} />
      ))}
    </span>
  );
}

function FaqItem({ q, a, accent, i }: { q: string; a: string; accent: string; i: number }) {
  const [open, setOpen] = useState(i === 0);
  return (
    <div data-pdp-faq className="border-b border-[#241F1B]/10 dark:border-white/10">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        className="flex w-full items-center justify-between gap-6 py-6 text-left"
      >
        <span className="flex items-baseline gap-4">
          <span className="font-mono text-xs" style={{ color: accent }}>{pad(i + 1)}</span>
          <span className="font-fredoka text-lg font-semibold sm:text-xl">{q}</span>
        </span>
        <span
          className="grid h-9 w-9 shrink-0 place-items-center rounded-full border transition-all duration-300"
          style={{ borderColor: `${accent}55`, backgroundColor: open ? accent : 'transparent', color: open ? '#fff' : accent }}
        >
          <ChevronDown size={18} className={`transition-transform duration-300 ${open ? 'rotate-180' : ''}`} />
        </span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <p className="max-w-2xl pb-6 pl-9 text-[15px] leading-relaxed text-[#241F1B]/70 dark:text-white/65">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function ProductExperience({ product, onAddToCart }: ProductExperienceProps) {
  const root = useRef<HTMLDivElement>(null);
  const buyRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [qty, setQty] = useState(1);
  const [pack, setPack] = useState(0);
  const [subscribe, setSubscribe] = useState(false);
  const [added, setAdded] = useState(false);
  const [showBar, setShowBar] = useState(false);

  const accent = accentFor(product.name, 0);
  const images = product.images?.length ? product.images : ['/bfab icon.png'];
  const packs = product.packOptions ?? [];
  const hasPacks = packs.length > 0;
  const activePack = hasPacks ? packs[pack] : null;
  const basePrice = activePack ? activePack.price : Number(product.price);
  const unitPrice = !hasPacks && subscribe ? Math.round(basePrice * 0.9) : basePrice;
  const orig = Number(product.originalPrice ?? 0);
  const off = !activePack && orig > basePrice ? Math.round((1 - basePrice / orig) * 100) : 0;
  const inStock = activePack ? (activePack.stock ?? 1) > 0 : (product.stock ?? 0) > 0;
  const rating = product.rating || 5;
  const story = product.longDescription || product.description;
  const highlights = (
    product.benefits ??
    product.features ??
    product.detailedBenefits?.map((b) => b.title) ??
    []
  ).slice(0, 6);

  const related = useShowcaseProducts().filter((p) => p.id !== String(product.id)).slice(0, 8);

  const marquee = useMemo(() => {
    const words = highlights.length ? highlights : ['Vet formulated', 'All natural', 'Made in India', 'No nasties'];
    const half = Math.ceil(words.length / 2);
    return [
      words.slice(0, half).join(' ✦ ') + ' ✦ ',
      (words.slice(half).length ? words.slice(half) : ['Vet formulated', 'All natural', 'Made in India']).join(' ✦ ') + ' ✦ ',
    ];
  }, [highlights]);

  const add = () => {
    onAddToCart(qty, activePack ? { label: activePack.label, price: basePrice } : undefined, unitPrice);
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1800);
  };

  useGSAP(
    () => {
      const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      const q = gsap.utils.selector(root);

      // Sticky mobile buy bar once the main CTA leaves the screen
      ScrollTrigger.create({
        trigger: buyRef.current,
        start: 'bottom top+=64',
        onEnter: () => setShowBar(true),
        onLeaveBack: () => setShowBar(false),
      });

      if (reduce) return;

      // ── Hero intro
      const intro = gsap.timeline({ delay: 0.5, defaults: { ease: 'power4.out' } });
      intro
        .from(q('[data-pdp-frame]'), { clipPath: 'inset(12% 12% 12% 12% round 40px)', scale: 0.92, duration: 1.4 })
        .from(q('[data-pdp-media]'), { scale: 1.35, duration: 1.8 }, 0)
        .from(q('[data-pdp-thumb]'), { y: 30, opacity: 0, stagger: 0.06, duration: 0.8 }, 0.4)
        .from(q('[data-pdp-in]'), { y: 28, opacity: 0, stagger: 0.07, duration: 0.9 }, 0.3)
        .from(q('[data-pdp-blob]'), { scale: 0, opacity: 0, duration: 1.8, ease: 'expo.out', stagger: 0.2 }, 0);

      // Hero gallery parallax: image drifts and the frame eases back as you scroll on
      gsap.to(q('[data-pdp-media]'), {
        yPercent: 8,
        ease: 'none',
        scrollTrigger: { trigger: q('[data-pdp-hero]')[0], start: 'top top', end: 'bottom top', scrub: true },
      });
      gsap.to(q('[data-pdp-blob]'), {
        yPercent: -80,
        ease: 'none',
        scrollTrigger: { trigger: q('[data-pdp-hero]')[0], start: 'top top', end: 'bottom top', scrub: true },
      });

      // ── Zoom story: the packshot grows from a card to full-bleed while pinned
      const zoom = q('[data-pdp-zoom]')[0];
      if (zoom) {
        const tl = gsap.timeline({
          scrollTrigger: { trigger: zoom, start: 'top top', end: '+=140%', pin: true, scrub: 1, anticipatePin: 1 },
        });
        tl.fromTo(
          q('[data-pdp-zoom-media]'),
          { clipPath: 'inset(22% 30% 22% 30% round 36px)' },
          { clipPath: 'inset(0% 0% 0% 0% round 0px)', ease: 'none' }
        )
          .fromTo(q('[data-pdp-zoom-media] img'), { scale: 1.5 }, { scale: 1, ease: 'none' }, 0)
          .fromTo(q('[data-pdp-zoom-shade]'), { opacity: 0 }, { opacity: 1, ease: 'none' }, 0.35)
          .fromTo(q('[data-pdp-zoom-copy]'), { y: 80, opacity: 0 }, { y: 0, opacity: 1, ease: 'power2.out' }, 0.5)
          .to(q('[data-pdp-zoom-label]'), { opacity: 0, y: -40, ease: 'none' }, 0);
      }

      // ── Generic section reveals
      q('[data-pdp-reveal]').forEach((el: HTMLElement) => {
        gsap.from(el, {
          y: 60,
          opacity: 0,
          filter: 'blur(8px)',
          duration: 1.1,
          ease: 'power3.out',
          clearProps: 'filter',
          scrollTrigger: { trigger: el, start: 'top 86%', once: true },
        });
      });
      q('[data-pdp-stagger]').forEach((el: HTMLElement) => {
        gsap.from(el.children, {
          y: 70,
          opacity: 0,
          rotate: 1.5,
          duration: 1,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 82%', once: true },
        });
      });

      // ── Ingredients: stacked sticky cards that recede as the next one lands
      const cards = q('[data-pdp-ing]') as HTMLElement[];
      cards.forEach((card, i) => {
        const next = cards[i + 1];
        if (!next) return;
        gsap.to(card, {
          scale: 0.9 + i * 0.01,
          opacity: 0.45,
          filter: 'blur(2px)',
          ease: 'none',
          scrollTrigger: { trigger: next, start: 'top 85%', end: 'top 30%', scrub: true },
        });
      });

      // ── How-to timeline: line draws as you scroll, steps pop when reached
      const steps = q('[data-pdp-steps]')[0];
      if (steps) {
        gsap.fromTo(
          q('[data-pdp-line]'),
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: 'none',
            scrollTrigger: { trigger: steps, start: 'top 65%', end: 'bottom 65%', scrub: true },
          }
        );
        q('[data-pdp-step]').forEach((s: HTMLElement) => {
          gsap.from(s.querySelector('[data-pdp-dot]'), {
            scale: 0,
            duration: 0.6,
            ease: 'back.out(3)',
            scrollTrigger: { trigger: s, start: 'top 65%', toggleActions: 'play none none reverse' },
          });
          gsap.from(s.querySelector('[data-pdp-step-body]'), {
            x: 60,
            opacity: 0,
            duration: 0.9,
            ease: 'power3.out',
            scrollTrigger: { trigger: s, start: 'top 70%', toggleActions: 'play none none reverse' },
          });
        });
      }

      // ── Parallax decorations sprinkled through the page
      q('[data-pdp-speed]').forEach((el: HTMLElement) => {
        const speed = Number(el.dataset.pdpSpeed) || 0.2;
        gsap.fromTo(
          el,
          { yPercent: speed * 60 },
          {
            yPercent: -speed * 60,
            ease: 'none',
            scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: true },
          }
        );
      });

      // FAQ rows
      gsap.from(q('[data-pdp-faq]'), {
        y: 30,
        opacity: 0,
        stagger: 0.08,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: { trigger: q('[data-pdp-faqs]')[0], start: 'top 80%', once: true },
      });
    },
    { scope: root, dependencies: [product.id] }
  );

  return (
    <div
      ref={root}
      data-page-animate="off"
      className="relative overflow-x-clip bg-[#FAF7F2] text-[#241F1B] dark:bg-[#0F0C0A] dark:text-[#FAF7F2]"
      style={{ ['--accent' as string]: accent }}
    >
      {/* ═════════ HERO ═════════ */}
      <section data-pdp-hero className="relative isolate">
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
          <div data-pdp-blob className="absolute -left-40 top-0 h-[520px] w-[520px] rounded-full opacity-25 blur-3xl" style={{ backgroundColor: accent }} />
          <div data-pdp-blob className="absolute -right-32 top-1/3 h-[440px] w-[440px] rounded-full bg-[#E3A438]/25 blur-3xl" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(36,31,27,0.07)_1px,transparent_0)] [background-size:22px_22px] dark:bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.05)_1px,transparent_0)]" />
        </div>

        <div className="mx-auto max-w-7xl px-5 pb-20 pt-6 sm:px-8 lg:px-10">
          <nav data-pdp-in aria-label="Breadcrumb" className="mb-6 flex items-center gap-1 overflow-x-auto whitespace-nowrap text-[13px] text-[#241F1B]/55 dark:text-white/50">
            <Link href="/" className="hover:text-[#241F1B] dark:hover:text-white">Home</Link>
            <ChevronRight size={14} />
            <Link href="/products" className="hover:text-[#241F1B] dark:hover:text-white">Shop</Link>
            <ChevronRight size={14} />
            <span className="truncate text-[#241F1B] dark:text-white">{product.name}</span>
          </nav>

          <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
            {/* Gallery (sticky on desktop) */}
            <div className="lg:sticky lg:top-24 lg:self-start">
              <div className="flex flex-col-reverse gap-4 sm:flex-row">
                <div className="flex gap-3 overflow-x-auto pb-1 sm:flex-col sm:overflow-visible" data-lenis-prevent>
                  {images.map((img, i) => (
                    <button
                      key={img + i}
                      data-pdp-thumb
                      type="button"
                      aria-label={`Show image ${i + 1}`}
                      onClick={() => setActive(i)}
                      className="relative h-20 w-16 shrink-0 overflow-hidden rounded-2xl ring-2 ring-offset-2 ring-offset-[#FAF7F2] transition-all duration-300 dark:ring-offset-[#0F0C0A]"
                      style={{ ['--tw-ring-color' as string]: i === active ? accent : 'transparent', opacity: i === active ? 1 : 0.6 }}
                    >
                      <img src={img} alt="" className="h-full w-full object-cover" />
                    </button>
                  ))}
                </div>

                <div
                  data-pdp-frame
                  className="relative aspect-[4/5] flex-1 overflow-hidden rounded-[32px] shadow-[0_50px_100px_-40px_rgba(36,31,27,0.55)]"
                  style={{ backgroundColor: accent }}
                >
                  <div data-pdp-media className="absolute inset-0 will-change-transform">
                  <AnimatePresence mode="popLayout" initial={false}>
                    <motion.img
                      key={images[active]}
                      src={images[active]}
                      alt={product.name}
                      initial={{ opacity: 0, scale: 1.08 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                      className="absolute inset-0 h-full w-full object-cover"
                    />
                  </AnimatePresence>
                  </div>
                  <span className="absolute left-5 top-5 inline-flex items-center gap-1.5 rounded-full bg-white/90 px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.14em] text-[#241F1B] backdrop-blur">
                    <Star size={12} fill="currentColor" strokeWidth={0} /> Bestseller
                  </span>
                  {off > 0 && (
                    <span className="absolute right-5 top-5 rounded-full bg-[#241F1B] px-3 py-1.5 text-[11px] font-bold text-white">
                      Save {off}%
                    </span>
                  )}
                  <span className="absolute bottom-5 right-5 rounded-full bg-black/35 px-3 py-1 font-mono text-[11px] text-white backdrop-blur">
                    {pad(active + 1)} / {pad(images.length)}
                  </span>
                </div>
              </div>
            </div>

            {/* Buy box */}
            <div className="flex flex-col lg:pt-4">
              <p data-pdp-in className="mb-4 inline-flex items-center gap-3 text-xs font-bold uppercase tracking-[0.2em]" style={{ color: accent }}>
                <span className="h-px w-8" style={{ backgroundColor: accent }} />
                {product.productCategory || product.category} · {petLabel(product.petType)}
              </p>

              <h1 className="font-fredoka text-[clamp(2.3rem,4.6vw,4rem)] font-bold leading-[1] tracking-[-0.025em]">
                <SplitText
                  key={product.id}
                  text={product.name}
                  tag="span"
                  className="block"
                  textAlign="inherit"
                  splitType="words"
                  mask
                  trigger="load"
                  delay={70}
                  duration={1.1}
                />
              </h1>

              <div data-pdp-in className="mt-5 flex flex-wrap items-center gap-3 text-sm">
                <Stars rating={rating} />
                <strong>{rating.toFixed(1)}</strong>
                {!!product.reviews && <span className="text-[#241F1B]/55 dark:text-white/50">{product.reviews.toLocaleString('en-IN')} reviews</span>}
              </div>

              <div data-pdp-in className="mt-6 flex items-end gap-3">
                <span className="font-fredoka text-5xl font-bold tracking-tight">{inr(unitPrice)}</span>
                {off > 0 && <span className="pb-1.5 text-lg text-[#241F1B]/40 line-through dark:text-white/35">{inr(orig)}</span>}
                {!hasPacks && subscribe && (
                  <span className="mb-2 rounded-full px-2.5 py-1 text-xs font-bold text-white" style={{ backgroundColor: accent }}>10% off</span>
                )}
              </div>

              <p data-pdp-in className="mt-5 max-w-xl text-[16px] leading-relaxed text-[#241F1B]/70 dark:text-white/65">
                {product.description}
              </p>

              {highlights.length > 0 && (
                <ul data-pdp-in className="mt-6 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                  {highlights.map((h) => (
                    <li key={h} className="flex items-center gap-2.5 text-[14px] font-medium">
                      <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full text-white" style={{ backgroundColor: accent }}>
                        <Check size={13} strokeWidth={3} />
                      </span>
                      {h}
                    </li>
                  ))}
                </ul>
              )}

              {/* Pack options */}
              {hasPacks && (
                <div data-pdp-in className="mt-8">
                  <p className="mb-3 text-sm font-semibold">Choose your pack</p>
                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                    {packs.map((o, i) => (
                      <button
                        key={o.label}
                        type="button"
                        onClick={() => setPack(i)}
                        className="relative rounded-2xl border-2 bg-white p-4 text-left transition-all duration-300 hover:-translate-y-0.5 dark:bg-white/5"
                        style={{ borderColor: pack === i ? accent : 'rgba(36,31,27,0.1)' }}
                      >
                        {i === 1 && (
                          <span className="absolute -top-2.5 left-4 rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white" style={{ backgroundColor: accent }}>
                            Popular
                          </span>
                        )}
                        <span className="block text-sm font-semibold">{o.label}</span>
                        <span className="mt-1 block font-fredoka text-xl font-bold">{inr(o.price)}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Subscribe toggle */}
              {!hasPacks && (
                <div data-pdp-in className="mt-8 grid grid-cols-2 gap-3">
                  {[
                    { on: false, title: 'One-time', price: basePrice },
                    { on: true, title: 'Subscribe & save 10%', price: Math.round(basePrice * 0.9) },
                  ].map((o) => (
                    <button
                      key={o.title}
                      type="button"
                      onClick={() => setSubscribe(o.on)}
                      className="rounded-2xl border-2 bg-white p-4 text-left transition-all duration-300 dark:bg-white/5"
                      style={{ borderColor: subscribe === o.on ? accent : 'rgba(36,31,27,0.1)' }}
                    >
                      <span className="flex items-center gap-2 text-sm font-semibold">
                        <span className="grid h-4 w-4 place-items-center rounded-full border-2" style={{ borderColor: subscribe === o.on ? accent : '#c9c2ba' }}>
                          {subscribe === o.on && <span className="h-2 w-2 rounded-full" style={{ backgroundColor: accent }} />}
                        </span>
                        {o.title}
                      </span>
                      <span className="mt-1 block pl-6 font-fredoka text-xl font-bold">{inr(o.price)}</span>
                    </button>
                  ))}
                </div>
              )}

              {/* Qty + CTA */}
              <div ref={buyRef} data-pdp-in className="mt-6 flex flex-col gap-3 sm:flex-row">
                <div className="inline-flex h-[60px] items-center justify-between rounded-full border border-[#241F1B]/15 bg-white px-2 dark:border-white/15 dark:bg-white/5 sm:w-40">
                  <button type="button" aria-label="Decrease quantity" onClick={() => setQty(Math.max(1, qty - 1))} className="grid h-11 w-11 place-items-center rounded-full hover:bg-black/5 dark:hover:bg-white/10">
                    <Minus size={16} />
                  </button>
                  <span className="font-fredoka text-lg font-bold tabular-nums">{qty}</span>
                  <button type="button" aria-label="Increase quantity" onClick={() => setQty(qty + 1)} className="grid h-11 w-11 place-items-center rounded-full hover:bg-black/5 dark:hover:bg-white/10">
                    <Plus size={16} />
                  </button>
                </div>
                <Magnet padding={40} magnetStrength={4} wrapperClassName="flex-1" innerClassName="w-full">
                  <button
                    type="button"
                    onClick={add}
                    disabled={!inStock}
                    className="group relative inline-flex h-[60px] w-full items-center justify-center gap-3 overflow-hidden rounded-full text-base font-semibold text-white shadow-[0_25px_50px_-20px_var(--accent)] transition-transform active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50"
                    style={{ backgroundColor: accent }}
                  >
                    <span className="absolute inset-0 -translate-x-full bg-white/20 transition-transform duration-700 group-hover:translate-x-full" />
                    {added ? <Check size={20} /> : <Plus size={20} />}
                    {!inStock ? 'Out of stock' : added ? 'Added to cart' : `${subscribe && !hasPacks ? 'Subscribe' : 'Add to cart'} · ${inr(unitPrice * qty)}`}
                  </button>
                </Magnet>
              </div>

              <div data-pdp-in className="mt-6 grid grid-cols-3 gap-2 border-t border-[#241F1B]/10 pt-6 text-center text-[12px] font-medium text-[#241F1B]/65 dark:border-white/10 dark:text-white/55">
                <span className="flex flex-col items-center gap-1.5"><RefreshCw size={18} style={{ color: accent }} /> 30-day returns</span>
                <span className="flex flex-col items-center gap-1.5"><Truck size={18} style={{ color: accent }} /> Free shipping</span>
                <span className="flex flex-col items-center gap-1.5"><ShieldCheck size={18} style={{ color: accent }} /> Secure checkout</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═════════ MARQUEE ═════════ */}
      <section className="overflow-hidden py-6 text-white sm:py-8" style={{ backgroundColor: accent }}>
        <ScrollVelocity
          texts={marquee}
          velocity={40}
          numCopies={4}
          outlineAlternate
          fadeEdges
          skewWithVelocity={5}
          className="font-fredoka !text-[clamp(2rem,5vw,4.2rem)] !leading-[1.15] px-4"
        />
      </section>

      {/* ═════════ ZOOM STORY (pinned) ═════════ */}
      <section data-pdp-zoom className="relative h-screen overflow-hidden bg-[#14100D] text-white">
        <div data-pdp-zoom-label className="absolute inset-x-0 top-16 z-10 px-5 text-center sm:top-20">
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-white/50">The story</p>
          <p className="mt-3 font-fredoka text-[clamp(1.8rem,4vw,3.4rem)] font-bold leading-tight">Made with intent.</p>
        </div>
        <div data-pdp-zoom-media className="absolute inset-0" style={{ backgroundColor: accent }}>
          <img src={images[1] ?? images[0]} alt="" className="h-full w-full object-cover" />
        </div>
        <div data-pdp-zoom-shade className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/10" />
        <div data-pdp-zoom-copy className="absolute inset-x-0 bottom-0 mx-auto max-w-5xl px-5 pb-16 sm:px-8 sm:pb-24">
          <p className="mb-4 text-xs font-bold uppercase tracking-[0.25em]" style={{ color: accent }}>Why it works</p>
          <p className="font-fredoka text-[clamp(1.6rem,3.6vw,3rem)] font-semibold leading-[1.2]">{story}</p>
        </div>
      </section>

      {/* ═════════ CERTIFICATIONS ═════════ */}
      <section className="mx-auto max-w-6xl px-5 py-20 sm:px-8">
        <div data-pdp-stagger className="grid grid-cols-2 gap-6 md:grid-cols-4">
          {[
            { label: 'Vet approved', icon: Award },
            { label: 'ISO certified', icon: ShieldCheck },
            { label: 'GMP certified', icon: Check },
            { label: 'HACCP certified', icon: Zap },
          ].map((c) => (
            <div key={c.label} className="flex flex-col items-center gap-3 rounded-3xl border border-[#241F1B]/10 bg-white/60 p-6 text-center dark:border-white/10 dark:bg-white/5">
              <span className="grid h-14 w-14 place-items-center rounded-full text-white" style={{ backgroundColor: accent }}>
                <c.icon size={26} strokeWidth={1.6} />
              </span>
              <span className="text-sm font-bold uppercase tracking-[0.12em]">{c.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ═════════ BENEFITS ═════════ */}
      {product.detailedBenefits && product.detailedBenefits.length > 0 && (
        <section className="relative mx-auto max-w-7xl px-5 pb-24 sm:px-8 lg:px-10">
          <div className="grid gap-12 lg:grid-cols-[0.9fr_1.4fr] lg:gap-20">
            <div className="lg:sticky lg:top-28 lg:self-start">
              <p data-pdp-reveal className="mb-4 text-xs font-bold uppercase tracking-[0.25em]" style={{ color: accent }}>Benefits</p>
              <h2 data-pdp-reveal className="font-fredoka text-[clamp(2.2rem,4.5vw,3.8rem)] font-bold leading-[1] tracking-[-0.02em]">
                What pet parents notice.
              </h2>
              <div data-pdp-speed="0.4" className="mt-10 hidden overflow-hidden rounded-[28px] lg:block" style={{ backgroundColor: accent }}>
                <img src={images[2] ?? images[0]} alt="" className="aspect-[4/3] w-full object-cover" />
              </div>
            </div>
            <div data-pdp-stagger className="grid gap-4 sm:grid-cols-2">
              {product.detailedBenefits.map((b, i) => (
                <article
                  key={b.title}
                  className="group relative overflow-hidden rounded-[28px] border border-[#241F1B]/10 bg-white p-7 transition-transform duration-500 hover:-translate-y-1.5 dark:border-white/10 dark:bg-white/5"
                >
                  <span
                    className="absolute -right-4 -top-6 font-fredoka text-[7rem] font-bold leading-none opacity-[0.08] transition-transform duration-700 group-hover:scale-110"
                    style={{ color: accent }}
                  >
                    {pad(i + 1)}
                  </span>
                  <span className="mb-5 grid h-11 w-11 place-items-center rounded-2xl text-white" style={{ backgroundColor: accent }}>
                    <Check size={20} strokeWidth={3} />
                  </span>
                  <h3 className="font-fredoka text-xl font-bold">{b.title}</h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-[#241F1B]/65 dark:text-white/60">{b.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ═════════ INGREDIENTS (stacked cards) ═════════ */}
      {product.ingredients && product.ingredients.length > 0 && (
        <section className="relative bg-[#14100D] py-24 text-white">
          <div aria-hidden data-pdp-speed="0.5" className="pointer-events-none absolute right-[-10%] top-20 h-[460px] w-[460px] rounded-full opacity-30 blur-[120px]" style={{ backgroundColor: accent }} />
          <div className="relative mx-auto max-w-5xl px-5 sm:px-8">
            <p data-pdp-reveal className="mb-4 text-xs font-bold uppercase tracking-[0.25em]" style={{ color: accent }}>What&apos;s inside</p>
            <h2 data-pdp-reveal className="max-w-3xl font-fredoka text-[clamp(2.2rem,5vw,4.4rem)] font-bold leading-[1] tracking-[-0.02em]">
              {product.ingredients.length === 1 ? 'One honest ingredient.' : `${product.ingredients.length} honest ingredients.`}
              <span className="text-white/40"> Nothing else.</span>
            </h2>

            <div className="mt-14 flex flex-col gap-6">
              {product.ingredients.map((ing, i) => (
                <article
                  key={ing.name}
                  data-pdp-ing
                  className="sticky flex origin-top flex-col gap-6 rounded-[32px] border border-white/10 bg-[#1E1813] p-8 shadow-[0_-20px_60px_-30px_rgba(0,0,0,0.9)] sm:flex-row sm:items-center sm:p-10"
                  style={{ top: `calc(6rem + ${i * 14}px)` }}
                >
                  <span
                    className="grid h-20 w-20 shrink-0 place-items-center rounded-3xl font-fredoka text-3xl font-bold text-white"
                    style={{ backgroundColor: accent }}
                  >
                    {pad(i + 1)}
                  </span>
                  <div>
                    <h3 className="font-fredoka text-2xl font-bold sm:text-3xl">{ing.name}</h3>
                    <p className="mt-2 max-w-2xl text-[15px] leading-relaxed text-white/65">{ing.description}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ═════════ HOW TO USE (scroll-drawn timeline) ═════════ */}
      {product.feedGuide && product.feedGuide.length > 0 && (
        <section className="mx-auto max-w-6xl px-5 py-24 sm:px-8">
          <div className="grid gap-12 lg:grid-cols-[1fr_1.3fr] lg:gap-20">
            <div className="lg:sticky lg:top-28 lg:self-start">
              <p data-pdp-reveal className="mb-4 text-xs font-bold uppercase tracking-[0.25em]" style={{ color: accent }}>How to serve</p>
              <h2 data-pdp-reveal className="font-fredoka text-[clamp(2.2rem,4.5vw,3.8rem)] font-bold leading-[1] tracking-[-0.02em]">
                Simple as {product.feedGuide.length === 1 ? 'one step' : `${product.feedGuide.length} steps`}.
              </h2>
              {product.storage && product.storage.length > 0 && (
                <div data-pdp-reveal className="mt-8 rounded-3xl border border-[#241F1B]/10 bg-white p-6 dark:border-white/10 dark:bg-white/5">
                  <p className="mb-3 flex items-center gap-2 text-sm font-bold"><Snowflake size={16} style={{ color: accent }} /> Storage</p>
                  <ul className="space-y-2 text-[14px] text-[#241F1B]/65 dark:text-white/60">
                    {product.storage.map((s) => <li key={s}>{s}</li>)}
                  </ul>
                </div>
              )}
            </div>
            <ol data-pdp-steps className="relative">
              <span aria-hidden className="absolute bottom-6 left-[23px] top-6 w-[2px] bg-[#241F1B]/10 dark:bg-white/10" />
              <span aria-hidden data-pdp-line className="absolute bottom-6 left-[23px] top-6 w-[2px] origin-top" style={{ backgroundColor: accent }} />
              {product.feedGuide.map((step, i) => (
                <li key={step} data-pdp-step className="relative flex gap-6 pb-12 last:pb-0">
                  <span data-pdp-dot className="relative z-10 grid h-12 w-12 shrink-0 place-items-center rounded-full font-fredoka text-lg font-bold text-white ring-8 ring-[#FAF7F2] dark:ring-[#0F0C0A]" style={{ backgroundColor: accent }}>
                    {i + 1}
                  </span>
                  <div data-pdp-step-body className="pt-2.5">
                    <p className="text-lg font-medium leading-relaxed">{step}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>
      )}

      {/* ═════════ VET QUOTE ═════════ */}
      {product.vetApproval && (
        <section className="relative overflow-hidden py-24 sm:py-32" style={{ backgroundColor: `${accent}14` }}>
          <Quote aria-hidden data-pdp-speed="0.6" size={220} className="pointer-events-none absolute -left-6 top-6 opacity-10" style={{ color: accent }} />
          <div className="relative mx-auto max-w-5xl px-5 sm:px-8">
            <p className="mb-6 text-xs font-bold uppercase tracking-[0.25em]" style={{ color: accent }}>Reviewed by veterinarians</p>
            <ScrollReveal
              baseOpacity={0.12}
              enableBlur
              blurStrength={5}
              baseRotation={1.5}
              highlightColor={accent}
              containerClassName="!my-0"
              textClassName="font-fredoka !text-[clamp(1.6rem,3.6vw,2.9rem)] !leading-[1.25] !font-semibold"
            >
              {`“${product.vetApproval.quote}”`}
            </ScrollReveal>
            <div data-pdp-reveal className="mt-10 flex items-center gap-4">
              <span className="grid h-14 w-14 place-items-center rounded-full font-fredoka text-lg font-bold text-white" style={{ backgroundColor: accent }}>
                {product.vetApproval.doctorName.replace(/^Dr\.?\s*/i, '').split(' ').map((w) => w[0]).slice(0, 2).join('')}
              </span>
              <div>
                <p className="font-bold">{product.vetApproval.doctorName}</p>
                <p className="text-sm text-[#241F1B]/60 dark:text-white/55">{product.vetApproval.qualification}</p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ═════════ WHY UNIQUE / PROCESS ═════════ */}
      {(product.whyUnique?.length || product.processSteps?.length || product.uniqueSellingPoints?.length) ? (
        <section className="mx-auto max-w-7xl px-5 py-24 sm:px-8 lg:px-10">
          <p data-pdp-reveal className="mb-4 text-xs font-bold uppercase tracking-[0.25em]" style={{ color: accent }}>The difference</p>
          <h2 data-pdp-reveal className="max-w-3xl font-fredoka text-[clamp(2.2rem,4.5vw,3.8rem)] font-bold leading-[1] tracking-[-0.02em]">
            What makes it truly different.
          </h2>
          <div data-pdp-stagger className="mt-12 grid gap-5 md:grid-cols-3">
            {[
              ...(product.whyUnique ?? []).flatMap((w) => w.points.map((p, i) => ({ t: i === 0 ? w.title : '', d: p }))),
              ...(product.processSteps ?? []).map((s) => ({ t: s.title, d: s.description })),
              ...(product.uniqueSellingPoints ?? []).map((u) => ({ t: `${u.icon} ${u.title}`, d: u.description })),
            ].map((item, i) => (
              <article key={i} className="rounded-[28px] border border-[#241F1B]/10 bg-white p-7 dark:border-white/10 dark:bg-white/5">
                <span className="font-mono text-xs" style={{ color: accent }}>{pad(i + 1)}</span>
                {item.t && <h3 className="mt-3 font-fredoka text-lg font-bold uppercase tracking-wide">{item.t}</h3>}
                <p className="mt-3 text-[15px] leading-relaxed text-[#241F1B]/70 dark:text-white/65">{item.d}</p>
              </article>
            ))}
          </div>
        </section>
      ) : null}

      {/* ═════════ COMPARISON ═════════ */}
      {product.comparisonTable && product.comparisonTable.length > 0 && (
        <section className="mx-auto max-w-6xl px-5 pb-24 sm:px-8">
          <h2 data-pdp-reveal className="mb-10 font-fredoka text-[clamp(2rem,4vw,3.2rem)] font-bold tracking-[-0.02em]">How we compare</h2>
          <div data-pdp-reveal className="overflow-x-auto rounded-[28px] border border-[#241F1B]/10 bg-white dark:border-white/10 dark:bg-white/5" data-lenis-prevent>
            <table className="w-full min-w-[640px] text-left text-sm">
              <thead>
                <tr>
                  <th className="p-5 font-bold">Feature</th>
                  <th className="p-5 font-bold text-white" style={{ backgroundColor: accent }}>Beggin For A Bite</th>
                  <th className="p-5 font-semibold text-[#241F1B]/55 dark:text-white/50">Other brands</th>
                  <th className="p-5 font-semibold text-[#241F1B]/55 dark:text-white/50">Curd</th>
                  <th className="p-5 font-semibold text-[#241F1B]/55 dark:text-white/50">Medicines</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#241F1B]/10 dark:divide-white/10">
                {product.comparisonTable.map((row) => (
                  <tr key={row.feature}>
                    <td className="p-5 font-semibold">{row.feature}</td>
                    {[row.us, row.others, row.curd, row.medicine].map((v, i) => (
                      <td key={i} className="p-5" style={i === 0 ? { backgroundColor: `${accent}12` } : undefined}>
                        {v === true ? <Check size={20} style={{ color: '#2bbf85' }} /> : v === false ? <span className="font-bold text-red-500">✕</span> : v}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {/* ═════════ REVIEWS ═════════ */}
      {product.detailedReviews && product.detailedReviews.length > 0 && (
        <section className="overflow-hidden bg-white py-24 dark:bg-[#14100D]">
          <div className="mx-auto mb-12 flex max-w-7xl flex-wrap items-end justify-between gap-6 px-5 sm:px-8 lg:px-10">
            <div>
              <p data-pdp-reveal className="mb-4 text-xs font-bold uppercase tracking-[0.25em]" style={{ color: accent }}>Reviews</p>
              <h2 data-pdp-reveal className="font-fredoka text-[clamp(2.2rem,4.5vw,3.8rem)] font-bold leading-[1] tracking-[-0.02em]">Tails are wagging.</h2>
            </div>
            <div data-pdp-reveal className="flex items-center gap-3">
              <span className="font-fredoka text-5xl font-bold">{rating.toFixed(1)}</span>
              <div>
                <Stars rating={rating} />
                {!!product.reviews && <p className="text-sm text-[#241F1B]/55 dark:text-white/50">{product.reviews.toLocaleString('en-IN')} reviews</p>}
              </div>
            </div>
          </div>
          <div data-pdp-stagger className="mx-auto grid max-w-7xl gap-5 px-5 sm:grid-cols-2 sm:px-8 lg:grid-cols-3 lg:px-10">
            {product.detailedReviews.map((r, i) => (
              <figure
                key={r.name + i}
                className="flex flex-col justify-between gap-6 rounded-[28px] border border-[#241F1B]/10 bg-[#FAF7F2] p-7 dark:border-white/10 dark:bg-white/5"
                style={{ transform: `rotate(${i % 2 ? 0.6 : -0.6}deg)` }}
              >
                <div>
                  <Stars rating={r.rating} size={14} />
                  <blockquote className="mt-4 text-[16px] leading-relaxed">“{r.text}”</blockquote>
                </div>
                <figcaption className="flex items-center gap-3">
                  <span className="grid h-10 w-10 place-items-center rounded-full font-bold text-white" style={{ backgroundColor: accent }}>{r.name[0]}</span>
                  <span className="text-sm font-semibold">{r.name}</span>
                  {r.verified !== false && <span className="ml-auto text-xs text-[#2bbf85]">Verified</span>}
                </figcaption>
              </figure>
            ))}
          </div>
        </section>
      )}

      {/* ═════════ FAQ ═════════ */}
      {product.faqs && product.faqs.length > 0 && (
        <section className="mx-auto max-w-4xl px-5 py-24 sm:px-8">
          <h2 data-pdp-reveal className="mb-8 font-fredoka text-[clamp(2.2rem,4.5vw,3.8rem)] font-bold leading-[1] tracking-[-0.02em]">Questions, answered.</h2>
          <div data-pdp-faqs>
            {product.faqs.map((f, i) => (
              <FaqItem key={f.question} q={f.question} a={f.answer} accent={accent} i={i} />
            ))}
          </div>
        </section>
      )}

      {/* ═════════ RELATED ═════════ */}
      {related.length > 0 && (
        <section className="border-t border-[#241F1B]/10 py-24 dark:border-white/10">
          <div className="mx-auto mb-10 flex max-w-7xl items-end justify-between gap-6 px-5 sm:px-8 lg:px-10">
            <h2 data-pdp-reveal className="font-fredoka text-[clamp(2rem,4vw,3.2rem)] font-bold leading-[1] tracking-[-0.02em]">
              They&apos;ll beg for these too.
            </h2>
            <Link href="/products" className="hidden items-center gap-2 text-sm font-semibold underline-offset-4 hover:underline sm:inline-flex">
              Shop all <ArrowRight size={16} />
            </Link>
          </div>
          <div data-pdp-stagger data-lenis-prevent className="flex snap-x gap-5 overflow-x-auto px-5 pb-4 sm:px-8 lg:px-10 [scrollbar-width:none]">
            {related.map((p) => (
              <Link
                key={p.id}
                href={`/products/${p.id}`}
                className="group w-[260px] shrink-0 snap-start sm:w-[300px]"
              >
                <div className="relative aspect-[4/5] overflow-hidden rounded-[24px]" style={{ backgroundColor: p.accent }}>
                  <img src={p.image} alt={p.name} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
                </div>
                <div className="mt-4 flex items-start justify-between gap-3">
                  <p className="font-semibold leading-snug">{p.name}</p>
                  <p className="shrink-0 font-fredoka font-bold" style={{ color: p.accent }}>{inr(p.price)}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* ═════════ STICKY BUY BAR ═════════ */}
      <AnimatePresence>
        {showBar && (
          <motion.div
            initial={{ y: 120 }}
            animate={{ y: 0 }}
            exit={{ y: 120 }}
            transition={{ type: 'spring', damping: 28, stiffness: 260 }}
            className="fixed inset-x-3 bottom-3 z-40 mx-auto flex max-w-3xl items-center gap-3 rounded-full border border-black/5 bg-white/90 p-2 pl-2 shadow-[0_20px_50px_-15px_rgba(0,0,0,0.45)] backdrop-blur-xl dark:border-white/10 dark:bg-[#1E1813]/90"
          >
            <img src={images[0]} alt="" className="h-12 w-12 rounded-full object-cover" />
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold">{product.name}</p>
              <p className="font-fredoka text-sm font-bold" style={{ color: accent }}>{inr(unitPrice)}</p>
            </div>
            <button
              type="button"
              onClick={add}
              disabled={!inStock}
              className="inline-flex h-12 items-center gap-2 rounded-full px-5 text-sm font-semibold text-white disabled:opacity-50"
              style={{ backgroundColor: accent }}
            >
              {added ? <Check size={17} /> : <Plus size={17} />}
              {added ? 'Added' : 'Add'}
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
