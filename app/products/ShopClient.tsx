"use client";
/* eslint-disable @next/next/no-img-element -- catalogue images can live on any CMS host */
import React, { useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, Check, ChevronDown, Plus, Search, Star, X } from 'lucide-react';
import { useCart } from '../components/CartContext';
import ParallaxHero from '@/components/motion/ParallaxHero';
import FloatingProducts from '@/components/motion/FloatingProducts';
import { accentFor } from '@/components/home/useShowcaseProducts';
import { Product } from '@/lib/types';

gsap.registerPlugin(ScrollTrigger, useGSAP);

const CATEGORIES = [
  { id: 'all', name: 'All', match: /./ },
  { id: 'treats', name: 'Treats', match: /treat/i },
  { id: 'food', name: 'Meals', match: /food|meal/i },
  { id: 'supplements', name: 'Supplements', match: /supplement/i },
];

const PETS = [
  { id: 'all', name: 'All pets' },
  { id: 'dog', name: 'Dogs' },
  { id: 'cat', name: 'Cats' },
];

const SORTS = [
  { id: 'popular', name: 'Most popular' },
  { id: 'rating', name: 'Top rated' },
  { id: 'price-low', name: 'Price: low to high' },
  { id: 'price-high', name: 'Price: high to low' },
  { id: 'newest', name: 'Newest' },
];

const toNum = (v: unknown) => (typeof v === 'number' ? v : parseFloat(String(v ?? '').replace(/[^0-9.]/g, '')) || 0);
const inr = (n: number) => '₹' + Math.round(n).toLocaleString('en-IN');
const petLabel = (p?: string) => (p === 'dog' ? 'Dogs' : p === 'cat' ? 'Cats' : 'Dogs & cats');

/* ───────────────────────────── Product card ───────────────────────────── */

function ProductCard({ product, index, onAdd }: { product: Product; index: number; onAdd: (p: Product) => void }) {
  const card = useRef<HTMLElement>(null);
  const [added, setAdded] = useState(false);
  const accent = accentFor(product.name, index);
  const price = toNum(product.price);
  const orig = toNum(product.originalPrice);
  const off = orig > price && price > 0 ? Math.round((1 - price / orig) * 100) : 0;
  const img = product.images?.[0] || '/bfab icon.png';
  const alt = product.images?.[1];
  const rating = product.rating || 5;

  // Pointer-driven 3D tilt with a light glare that follows the cursor
  useGSAP(
    () => {
      const el = card.current;
      if (!el || window.matchMedia('(hover: none), (prefers-reduced-motion: reduce)').matches) return;
      const media = el.querySelector('[data-tilt]') as HTMLElement;
      const glare = el.querySelector('[data-glare]') as HTMLElement;
      const rx = gsap.quickTo(media, 'rotationX', { duration: 0.5, ease: 'power3.out' });
      const ry = gsap.quickTo(media, 'rotationY', { duration: 0.5, ease: 'power3.out' });
      gsap.set(media, { transformPerspective: 900 });
      const move = (e: PointerEvent) => {
        const r = media.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width - 0.5;
        const py = (e.clientY - r.top) / r.height - 0.5;
        rx(-py * 10);
        ry(px * 12);
        gsap.set(glare, { background: `radial-gradient(circle at ${(px + 0.5) * 100}% ${(py + 0.5) * 100}%, rgba(255,255,255,0.35), transparent 55%)` });
      };
      const leave = () => {
        rx(0);
        ry(0);
      };
      media.addEventListener('pointermove', move);
      media.addEventListener('pointerleave', leave);
      return () => {
        media.removeEventListener('pointermove', move);
        media.removeEventListener('pointerleave', leave);
      };
    },
    { scope: card }
  );

  const add = () => {
    onAdd(product);
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1500);
  };

  return (
    <article ref={card} data-shop-card className="group relative flex flex-col">
      <div data-tilt className="relative will-change-transform [transform-style:preserve-3d]">
        <Link
          href={`/products/${product.id}`}
          data-shop-media
          className="relative block aspect-[4/5] overflow-hidden rounded-[28px]"
          style={{ backgroundColor: accent }}
          aria-label={product.name}
        >
          <img
            src={img}
            alt={product.name}
            loading={index < 4 ? 'eager' : 'lazy'}
            className={`absolute inset-0 h-full w-full object-cover text-transparent transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.06] ${alt ? 'group-hover:opacity-0' : ''}`}
          />
          {alt && (
            <img
              src={alt}
              alt=""
              loading="lazy"
              className="absolute inset-0 h-full w-full scale-110 object-cover text-transparent opacity-0 transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-100 group-hover:opacity-100"
            />
          )}
          <span data-glare className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

          <div className="absolute left-4 top-4 flex flex-col items-start gap-2">
            {off > 0 && <span className="rounded-full bg-[#241F1B] px-3 py-1 text-[11px] font-bold text-white">−{off}%</span>}
            {rating >= 4.8 && (
              <span className="rounded-full bg-white/95 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.12em] text-[#241F1B]">Bestseller</span>
            )}
          </div>
          <span className="absolute right-4 top-4 rounded-full bg-white/90 px-2.5 py-1 text-[11px] font-semibold text-[#241F1B] backdrop-blur">
            {petLabel(product.petType)}
          </span>
        </Link>

        {/* Quick add: a round button that stretches into a label on hover */}
        <button
          type="button"
          onClick={add}
          aria-label={`Add ${product.name} to cart`}
          className="absolute bottom-4 right-4 flex h-12 items-center gap-2 overflow-hidden rounded-full bg-white pl-3.5 pr-3.5 text-sm font-semibold text-[#241F1B] shadow-[0_15px_30px_-12px_rgba(0,0,0,0.45)] transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:bg-[#241F1B] hover:text-white [transform:translateZ(40px)]"
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.span key={added ? 'y' : 'n'} initial={{ scale: 0, rotate: -90 }} animate={{ scale: 1, rotate: 0 }} exit={{ scale: 0 }} className="grid place-items-center">
              {added ? <Check size={18} /> : <Plus size={18} />}
            </motion.span>
          </AnimatePresence>
          <span className="max-w-0 whitespace-nowrap opacity-0 transition-all duration-500 group-hover:max-w-[7rem] group-hover:opacity-100">
            {added ? 'Added' : 'Add to cart'}
          </span>
        </button>
      </div>

      <div data-shop-body className="mt-4 flex items-start justify-between gap-4 px-1">
        <div className="min-w-0">
          <p className="text-[11px] font-bold uppercase tracking-[0.16em]" style={{ color: accent }}>
            {product.productCategory || product.category}
          </p>
          <Link href={`/products/${product.id}`} className="mt-1 block font-fredoka text-lg font-semibold leading-snug text-[#241F1B] transition-colors hover:text-[#F4623B] dark:text-white">
            {product.name}
          </Link>
          <p className="mt-1.5 flex items-center gap-1.5 text-[13px] text-[#241F1B]/60 dark:text-white/55">
            <Star size={13} fill="#E3A438" strokeWidth={0} />
            <strong className="font-semibold text-[#241F1B] dark:text-white">{rating.toFixed(1)}</strong>
            {!!product.reviews && <span>· {product.reviews.toLocaleString('en-IN')} reviews</span>}
          </p>
        </div>
        <div className="shrink-0 text-right">
          <p className="font-fredoka text-xl font-bold text-[#241F1B] dark:text-white">{inr(price)}</p>
          {off > 0 && <p className="text-[13px] text-[#241F1B]/40 line-through dark:text-white/35">{inr(orig)}</p>}
        </div>
      </div>
    </article>
  );
}

/* ───────────────────────────── Promo tile ───────────────────────────── */

function PromoTile() {
  return (
    <Link
      href="/ultimate-saver-packs"
      data-shop-card
      className="group relative isolate flex aspect-[4/5] flex-col justify-between overflow-hidden rounded-[28px] bg-[#241F1B] p-7 text-white sm:col-span-2 sm:aspect-auto lg:col-span-1 lg:aspect-[4/5]"
    >
      <div aria-hidden className="absolute -right-24 -top-24 -z-10 h-72 w-72 rounded-full bg-[#F4623B]/40 blur-3xl" />
      <FloatingProducts
        className="-z-[1]"
        items={[
          { name: 'meat', className: 'right-[-6%] bottom-[8%] w-[46%]', rotate: 10, depth: 0.2 },
          { name: 'peanut', className: 'right-[30%] bottom-[-4%] w-[28%]', rotate: -8, depth: 0.35 },
        ]}
      />
      <div>
        <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#E3A438]">Saver packs</p>
        <h3 className="mt-3 max-w-[12rem] font-fredoka text-3xl font-bold leading-[1]">Stock up. Save more.</h3>
        <p className="mt-3 max-w-[14rem] text-sm text-white/65">Bundled favourites at better prices.</p>
      </div>
      <span className="inline-flex w-fit items-center gap-2 rounded-full bg-[#F4623B] px-5 py-3 text-sm font-semibold transition-colors group-hover:bg-white group-hover:text-[#241F1B]">
        Shop bundles <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
      </span>
    </Link>
  );
}

/* ───────────────────────────── Page ───────────────────────────── */

const ShopClient = ({ initialProducts }: { initialProducts: Product[] }) => {
  const { addToCart } = useCart();
  const [category, setCategory] = useState('all');
  const [pet, setPet] = useState('all');
  const [sort, setSort] = useState('popular');
  const [query, setQuery] = useState('');
  const rootRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  // Deep links from navbar search and the home "shop by concern" tiles
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const q = params.get('q') || params.get('category');
    const type = params.get('type');
    // eslint-disable-next-line react-hooks/set-state-in-effect -- one-time sync from the URL
    if (q) setQuery(q);
    if (type && CATEGORIES.some((c) => c.id === type)) setCategory(type);
  }, []);

  const products = useMemo(() => {
    const term = query.trim().toLowerCase();
    const cat = CATEGORIES.find((c) => c.id === category)!;
    const list = initialProducts.filter((p) => {
      const catText = `${p.productCategory ?? ''} ${p.category ?? ''}`;
      if (category !== 'all' && !cat.match.test(catText)) return false;
      if (pet !== 'all' && p.petType !== pet && p.petType !== 'both') return false;
      if (!term) return true;
      return [p.name, p.description, p.category, p.productCategory, p.longDescription]
        .filter(Boolean)
        .some((f) => String(f).toLowerCase().includes(term));
    });
    const sorted = [...list];
    if (sort === 'price-low') sorted.sort((a, b) => toNum(a.price) - toNum(b.price));
    else if (sort === 'price-high') sorted.sort((a, b) => toNum(b.price) - toNum(a.price));
    else if (sort === 'rating') sorted.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    else if (sort === 'newest') sorted.sort((a, b) => b.id.localeCompare(a.id));
    else sorted.sort((a, b) => (b.reviews || 0) - (a.reviews || 0));
    return sorted;
  }, [initialProducts, category, pet, sort, query]);

  const counts = useMemo(
    () =>
      Object.fromEntries(
        CATEGORIES.map((c) => [
          c.id,
          c.id === 'all' ? initialProducts.length : initialProducts.filter((p) => c.match.test(`${p.productCategory ?? ''} ${p.category ?? ''}`)).length,
        ])
      ),
    [initialProducts]
  );

  const onAdd = (p: Product) =>
    addToCart({
      id: p.id,
      name: p.name,
      price: String(toNum(p.price)),
      image: p.images?.[0] || '/bfab icon.png',
      petType: p.petType,
      productCategory: p.productCategory,
    });

  const filtered = category !== 'all' || pet !== 'all' || query.trim() !== '';
  const reset = () => {
    setCategory('all');
    setPet('all');
    setQuery('');
  };

  // Filter bar slides down once; every (re)render of the grid wipes cards in with a stagger
  useGSAP(
    () => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
      gsap.fromTo('[data-shop-bar]', { y: -30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.9, delay: 0.6, ease: 'power3.out' });
    },
    { scope: rootRef }
  );

  useGSAP(
    () => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
      const cards = gsap.utils.toArray<HTMLElement>('[data-shop-card]', gridRef.current);
      gsap.set(cards, { opacity: 0, y: 60 });
      ScrollTrigger.batch(cards, {
        start: 'top 92%',
        once: true,
        onEnter: (batch) => {
          gsap.to(batch, { opacity: 1, y: 0, duration: 0.9, stagger: 0.09, ease: 'power3.out', overwrite: true });
          batch.forEach((c) => {
            const media = c.querySelector('[data-shop-media]');
            if (media)
              gsap.fromTo(media, { clipPath: 'inset(18% 10% 18% 10% round 28px)' }, { clipPath: 'inset(0% 0% 0% 0% round 28px)', duration: 1.1, ease: 'expo.out', clearProps: 'clipPath' });
          });
        },
      });
      ScrollTrigger.refresh();
    },
    { scope: gridRef, dependencies: [products], revertOnUpdate: true }
  );

  // Promo tile sits after the 4th product when browsing everything
  const withPromo = !filtered && products.length > 4;

  return (
    <div ref={rootRef} data-page-animate="off" className="min-h-screen bg-[#FAF7F2] text-[#241F1B] dark:bg-[#0F0C0A] dark:text-[#FAF7F2]">
      <ParallaxHero
        eyebrow="Shop all"
        title="The full"
        highlight="range."
        subtitle="Vet-formulated treats, meals and supplements for dogs and cats. No nasties, ever."
        products={['peanut', 'pre', 'hip', 'jerky']}
        size="compact"
      />

      {/* ── Sticky filter bar ── */}
      <div data-shop-bar className="sticky top-[var(--nav-offset,4rem)] z-30 transition-[top] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] border-y border-[#241F1B]/10 bg-[#FAF7F2]/85 backdrop-blur-xl dark:border-white/10 dark:bg-[#0F0C0A]/85">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-5 py-3 sm:px-8 lg:flex-row lg:items-center lg:gap-6 lg:px-10">
          <div className="no-scrollbar -mx-1 flex gap-1 overflow-x-auto px-1" role="tablist" aria-label="Category">
            {CATEGORIES.map((c) => {
              const active = category === c.id;
              return (
                <button
                  key={c.id}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => setCategory(c.id)}
                  className={`relative shrink-0 rounded-full px-4 py-2 text-sm font-semibold transition-colors ${active ? 'text-white' : 'text-[#241F1B]/70 hover:text-[#241F1B] dark:text-white/65 dark:hover:text-white'}`}
                >
                  {active && <motion.span layoutId="shop-cat" className="absolute inset-0 rounded-full bg-[#F4623B]" transition={{ type: 'spring', stiffness: 400, damping: 32 }} />}
                  <span className="relative">
                    {c.name}
                    <span className={`ml-1.5 text-xs ${active ? 'text-white/75' : 'text-[#241F1B]/40 dark:text-white/35'}`}>{counts[c.id]}</span>
                  </span>
                </button>
              );
            })}
          </div>

          <div className="flex rounded-full border border-[#241F1B]/15 p-1 dark:border-white/15" role="tablist" aria-label="Pet">
            {PETS.map((p) => {
              const active = pet === p.id;
              return (
                <button
                  key={p.id}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => setPet(p.id)}
                  className={`relative flex-1 whitespace-nowrap rounded-full px-3.5 py-1.5 text-[13px] font-semibold transition-colors ${active ? 'text-white dark:text-[#241F1B]' : 'text-[#241F1B]/65 dark:text-white/60'}`}
                >
                  {active && <motion.span layoutId="shop-pet" className="absolute inset-0 rounded-full bg-[#241F1B] dark:bg-white" transition={{ type: 'spring', stiffness: 400, damping: 32 }} />}
                  <span className="relative">{p.name}</span>
                </button>
              );
            })}
          </div>

          <div className="flex flex-1 items-center gap-3 lg:justify-end">
            <label className="relative flex-1 lg:max-w-xs">
              <span className="sr-only">Search products</span>
              <Search size={17} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#241F1B]/40 dark:text-white/40" />
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search the range"
                className="w-full rounded-full border border-[#241F1B]/15 bg-white py-2.5 pl-10 pr-9 text-sm outline-none transition focus:border-[#F4623B] focus:ring-4 focus:ring-[#F4623B]/15 dark:border-white/15 dark:bg-white/5 [&::-webkit-search-cancel-button]:hidden"
              />
              {query && (
                <button type="button" aria-label="Clear search" onClick={() => setQuery('')} className="absolute right-2 top-1/2 grid h-7 w-7 -translate-y-1/2 place-items-center rounded-full hover:bg-black/5 dark:hover:bg-white/10">
                  <X size={14} />
                </button>
              )}
            </label>
            <label className="relative shrink-0">
              <span className="sr-only">Sort products</span>
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="cursor-pointer appearance-none rounded-full border border-[#241F1B]/15 bg-white py-2.5 pl-4 pr-9 text-sm font-medium outline-none focus:border-[#F4623B] dark:border-white/15 dark:bg-[#1E1813]"
              >
                {SORTS.map((o) => (
                  <option key={o.id} value={o.id}>{o.name}</option>
                ))}
              </select>
              <ChevronDown size={15} className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#241F1B]/50 dark:text-white/50" />
            </label>
          </div>
        </div>
      </div>

      {/* ── Results ── */}
      <section className="mx-auto max-w-7xl px-5 pb-24 pt-10 sm:px-8 lg:px-10">
        <div className="mb-8 flex flex-wrap items-baseline justify-between gap-3">
          <p className="font-fredoka text-2xl font-semibold">
            <motion.span key={products.length} initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="inline-block text-[#F4623B]">
              {products.length}
            </motion.span>{' '}
            {products.length === 1 ? 'product' : 'products'}
            {query.trim() && <span className="text-[#241F1B]/50 dark:text-white/45"> for “{query.trim()}”</span>}
          </p>
          {filtered && (
            <button type="button" onClick={reset} className="text-sm font-semibold underline underline-offset-4 hover:text-[#F4623B]">
              Clear filters
            </button>
          )}
        </div>

        {products.length > 0 ? (
          <div ref={gridRef} className="grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {products.map((p, i) => (
              <React.Fragment key={p.id}>
                {withPromo && i === 4 && <PromoTile />}
                <ProductCard product={p} index={i} onAdd={onAdd} />
              </React.Fragment>
            ))}
          </div>
        ) : (
          <div className="relative isolate overflow-hidden rounded-[32px] border border-dashed border-[#241F1B]/20 py-24 text-center dark:border-white/15">
            <FloatingProducts
              className="-z-10 opacity-60"
              items={[
                { name: 'peanut', className: 'left-[8%] top-[20%] w-20', rotate: -12 },
                { name: 'jerky', className: 'right-[8%] top-[16%] w-20', rotate: 10 },
              ]}
            />
            <h3 className="font-fredoka text-4xl font-bold">Nothing sniffed out yet</h3>
            <p className="mx-auto mt-3 max-w-sm text-[16px] leading-relaxed text-[#241F1B]/65 dark:text-white/60">
              Try a different search or clear a filter to see more of the range.
            </p>
            <button type="button" onClick={reset} className="mt-7 rounded-full bg-[#F4623B] px-7 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#241F1B]">
              Clear all filters
            </button>
          </div>
        )}
      </section>
    </div>
  );
};

export default ShopClient;
