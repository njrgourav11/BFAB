"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Instrument_Serif, Hanken_Grotesk } from 'next/font/google';
import { ArrowRight, Check, Minus, Star, Leaf, FlaskConical, Flame, ShieldCheck } from 'lucide-react';
import { useCart } from './components/CartContext';
import { Product } from '@/lib/types';
import { getAllProducts } from '@/lib/product-utils';

const serif = Instrument_Serif({ subsets: ['latin'], weight: '400', style: ['normal', 'italic'], variable: '--f-serif', display: 'swap' });
const sans = Hanken_Grotesk({ subsets: ['latin'], variable: '--f-sans', display: 'swap' });

const S = 'font-[family-name:var(--f-serif)] font-normal';

const pillars = [
  { icon: Leaf, title: 'Whole ingredients', text: 'Real muscle meat, organs and fruit.' },
  { icon: Flame, title: 'Gently cooked', text: 'Low heat keeps nutrients intact.' },
  { icon: FlaskConical, title: 'Vet formulated', text: 'Meets AAFCO and FEDIAF profiles.' },
  { icon: ShieldCheck, title: 'Nothing artificial', text: 'No dyes, fillers or by-products.' },
];

const concerns = [
  { name: 'Gut & digestion', image: '/category/5.png', desc: 'Prebiotics and gentle fibre' },
  { name: 'Hip & joint', image: '/category/1.png', desc: 'Glucosamine and chondroitin' },
  { name: 'Skin & coat', image: '/category/4.png', desc: 'Omega-3s and coconut oil' },
  { name: 'Calm & anxiety', image: '/category/3.png', desc: 'Hemp seed and chamomile' },
  { name: 'Dental care', image: '/category/6.png', desc: 'Yak milk tartar defence' },
  { name: 'Weight & energy', image: '/category/2.png', desc: 'Lean human-grade protein' },
];

const compareRows = [
  { topic: 'Protein', bfab: 'Whole muscle meat and organs', usual: 'Rendered meal, unnamed sources' },
  { topic: 'Cooking', bfab: 'Low-temperature, slow cooked', usual: 'High-heat extrusion above 200°C' },
  { topic: 'Gut support', bfab: 'Prebiotic FOS included', usual: 'Starch-heavy fillers' },
  { topic: 'Formulation', bfab: 'Written by vets and nutritionists', usual: 'Vague proprietary blends' },
  { topic: 'Additives', bfab: 'None. No dyes or stabilisers', usual: 'Synthetic colours and preservatives' },
];

const reviews = [
  { pet: 'Simba, Golden Retriever', parent: 'Ananya S., Bangalore', text: 'Simba had sensitive skin and scratched constantly. Two weeks into the Prebiotic Topper his coat turned silky and the scratching stopped.' },
  { pet: 'Rocky, German Shepherd', parent: 'Karan M., Mumbai', text: 'He was stiff in his back legs after walks. After switching to the Hip & Joint formula he is chasing tennis balls again.' },
  { pet: 'Milo & Cleo, Indie cats', parent: 'Pooja V., Delhi', text: 'Fussy eaters who refused every other topper. Now they lick the bowl clean, and their energy is through the roof.' },
];

const inr = (n: number) => '₹' + n.toLocaleString('en-IN', { maximumFractionDigits: 2 });

const container = 'mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-10';

export default function Home() {
  const { addToCart, cartItems } = useCart();
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const [calcPet, setCalcPet] = useState<'dog' | 'cat'>('dog');
  const [calcWeight, setCalcWeight] = useState<number>(12);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const data = await getAllProducts();
        if (mounted) setFeaturedProducts(data.slice(0, 6));
      } catch (error) {
        console.error('Failed to fetch products', error);
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  const totalCartCount = cartItems.reduce((acc, it) => acc + (it.quantity || 1), 0);
  const portion = calcPet === 'dog' ? Math.round(calcWeight * 2.5) : Math.round(calcWeight * 2);

  return (
    <div
      className={`${serif.variable} ${sans.variable} min-h-screen overflow-x-clip bg-white pb-20 font-[family-name:var(--f-sans)] text-[#0B1F3A] antialiased selection:bg-[#0B1F3A] selection:text-white sm:pb-0 dark:bg-[#0A1220] dark:text-[#EEF1F6]`}
    >
      {/* HERO */}
      <section className="bg-[#F4F6F9] dark:bg-[#0D1626]">
        <div className={`${container} grid items-center gap-10 py-12 sm:py-16 lg:grid-cols-12 lg:gap-12 lg:py-24`}>
          <div className="lg:col-span-6">
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="mb-6 text-sm font-medium text-[#0B1F3A]/70 dark:text-white/70"
            >
              Human-grade nutrition for dogs and cats
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.2, 0.7, 0.2, 1] }}
              className={`${S} text-[clamp(2.9rem,8vw,6rem)] leading-[0.98] tracking-[-0.02em]`}
            >
              Food your pet deserves, <em className="italic">written by vets.</em>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.25 }}
              className="mt-6 max-w-md text-[17px] leading-relaxed text-[#0B1F3A]/75 dark:text-white/75"
            >
              Slow-cooked whole meats, real fruit and prebiotic fibre. No mystery meal and no artificial preservatives.
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mt-9 flex flex-col gap-3 sm:flex-row"
            >
              <Link
                href="/products"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#0B1F3A] px-8 py-4 text-[15px] font-semibold text-white transition-colors hover:bg-[#16345F] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#0B1F3A] dark:bg-white dark:text-[#0B1F3A] dark:hover:bg-white/90"
              >
                Shop best sellers <ArrowRight size={17} />
              </Link>
              <a
                href="#calculator"
                className="inline-flex items-center justify-center rounded-full border border-[#0B1F3A]/25 px-8 py-4 text-[15px] font-semibold transition-colors hover:border-[#0B1F3A] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#0B1F3A] dark:border-white/30 dark:hover:border-white"
              >
                Find the right portion
              </a>
            </motion.div>

            <dl className="mt-12 grid max-w-md grid-cols-3 gap-4 border-t border-[#0B1F3A]/15 pt-6 dark:border-white/15">
              <div>
                <dd className={`${S} text-4xl`}>15,000+</dd>
                <dt className="mt-0.5 text-[13px] text-[#0B1F3A]/65 dark:text-white/65">pets fed</dt>
              </div>
              <div>
                <dd className={`${S} flex items-center gap-1 text-4xl`}>
                  4.9 <Star size={18} className="fill-[#B8893B] text-[#B8893B]" />
                </dd>
                <dt className="mt-0.5 text-[13px] text-[#0B1F3A]/65 dark:text-white/65">verified reviews</dt>
              </div>
              <div>
                <dd className={`${S} text-4xl`}>14 days</dd>
                <dt className="mt-0.5 text-[13px] text-[#0B1F3A]/65 dark:text-white/65">to see a change</dt>
              </div>
            </dl>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, ease: [0.2, 0.7, 0.2, 1] }}
            className="lg:col-span-6"
          >
            <div className="relative mx-auto aspect-[5/6] w-full max-w-[560px] overflow-hidden rounded-[2rem] bg-white shadow-[0_30px_80px_-30px_rgba(11,31,58,0.35)] dark:bg-[#15213A]">
              <Image
                src="/products/1/20.png"
                alt="BFAB vet-formulated pet nutrition"
                fill
                priority
                sizes="(max-width: 1024px) 92vw, 45vw"
                className="object-contain p-8 sm:p-12"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* PILLARS */}
      <section className="border-b border-[#0B1F3A]/10 dark:border-white/10">
        <div className={`${container} grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4`}>
          {pillars.map(({ icon: Icon, title, text }, i) => (
            <div
              key={title}
              className={`flex items-start gap-4 py-7 sm:py-9 ${i > 0 ? 'border-t border-[#0B1F3A]/10 sm:border-t-0 dark:border-white/10' : ''} ${i % 2 === 1 ? 'sm:border-l sm:border-[#0B1F3A]/10 dark:sm:border-white/10' : ''} ${i >= 2 ? 'sm:border-t sm:border-[#0B1F3A]/10 lg:border-t-0 dark:sm:border-white/10' : ''} ${i > 0 ? 'lg:border-l lg:border-[#0B1F3A]/10 dark:lg:border-white/10' : ''} sm:px-6 lg:px-8 ${i === 0 ? 'lg:pl-0' : ''}`}
            >
              <Icon size={24} strokeWidth={1.5} className="mt-0.5 shrink-0 text-[#B8893B]" />
              <div>
                <h3 className="text-base font-semibold">{title}</h3>
                <p className="mt-1 text-[15px] leading-snug text-[#0B1F3A]/70 dark:text-white/70">{text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SHOP BY CONCERN */}
      <section className="py-16 sm:py-24">
        <div className={container}>
          <div className="mb-10 flex items-end justify-between gap-6">
            <h2 className={`${S} text-4xl leading-[1.02] tracking-[-0.01em] sm:text-6xl`}>Shop by concern</h2>
            <Link href="/products" className="hidden items-center gap-1.5 text-[15px] font-semibold underline-offset-4 hover:underline sm:inline-flex">
              View all products <ArrowRight size={16} />
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-6">
            {concerns.map((cat) => (
              <Link key={cat.name} href="/products" className="group block">
                <div className="relative aspect-square overflow-hidden rounded-2xl bg-[#F4F6F9] dark:bg-[#15213A]">
                  <Image
                    src={cat.image}
                    alt=""
                    fill
                    sizes="(max-width: 640px) 45vw, (max-width: 1024px) 30vw, 16vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <h3 className="mt-3 text-[15px] font-semibold">{cat.name}</h3>
                <p className="text-[13px] leading-snug text-[#0B1F3A]/65 dark:text-white/65">{cat.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* BEST SELLERS */}
      <section className="bg-[#F4F6F9] py-16 sm:py-24 dark:bg-[#0D1626]">
        <div className={container}>
          <div className="mb-12 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <h2 className={`${S} text-4xl leading-[1.02] tracking-[-0.01em] sm:text-6xl`}>Best sellers</h2>
            <p className="max-w-sm text-[17px] leading-relaxed text-[#0B1F3A]/70 dark:text-white/70">
              The first things most new customers try.
            </p>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="aspect-[4/5] animate-pulse rounded-2xl bg-white dark:bg-[#15213A]" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
              {featuredProducts.slice(0, 6).map((product) => {
                const priceNum = typeof product.price === 'number' ? product.price : parseFloat(String(product.price).replace(/[^0-9.]/g, '')) || 299;
                const originalPriceNum = product.originalPrice
                  ? typeof product.originalPrice === 'number'
                    ? product.originalPrice
                    : parseFloat(String(product.originalPrice).replace(/[^0-9.]/g, ''))
                  : Math.round(priceNum * 1.25);
                const discountPercent = Math.round(((originalPriceNum - priceNum) / originalPriceNum) * 100);
                const img = product.images && product.images[0] ? product.images[0] : '/placeholder.png';

                return (
                  <article key={product.id} className="group flex flex-col">
                    <Link
                      href={`/products/${product.id}`}
                      className="relative block aspect-[4/5] overflow-hidden rounded-2xl bg-white dark:bg-[#15213A]"
                    >
                      {discountPercent > 0 && (
                        <span className="absolute left-4 top-4 z-10 rounded-full bg-[#0B1F3A] px-3 py-1 text-xs font-semibold text-white">
                          {discountPercent}% off
                        </span>
                      )}
                      <Image
                        src={img}
                        alt={product.name}
                        fill
                        sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 30vw"
                        className="object-contain p-8 transition-transform duration-700 group-hover:scale-105"
                      />
                    </Link>

                    <div className="mt-5 flex items-start justify-between gap-4">
                      <div className="min-w-0">
                        <p className="text-[13px] capitalize text-[#0B1F3A]/60 dark:text-white/60">{product.petType}</p>
                        <Link href={`/products/${product.id}`}>
                          <h3 className="mt-0.5 text-lg font-semibold leading-snug hover:underline">{product.name}</h3>
                        </Link>
                      </div>
                      <div className="shrink-0 text-right">
                        <div className="text-lg font-semibold">{inr(priceNum)}</div>
                        {originalPriceNum > priceNum && (
                          <div className="text-[13px] text-[#0B1F3A]/45 line-through dark:text-white/45">{inr(originalPriceNum)}</div>
                        )}
                      </div>
                    </div>

                    <div className="mt-2 flex items-center gap-1.5 text-[13px] text-[#0B1F3A]/65 dark:text-white/65">
                      <Star size={13} className="fill-[#B8893B] text-[#B8893B]" />
                      {product.reviews || 120}+ reviews
                    </div>

                    <p className="mt-3 line-clamp-2 text-[15px] leading-relaxed text-[#0B1F3A]/70 dark:text-white/70">{product.description}</p>

                    <div className="mt-5 grid grid-cols-2 gap-3">
                      <Link
                        href={`/products/${product.id}`}
                        className="rounded-full border border-[#0B1F3A]/25 py-3 text-center text-[15px] font-semibold transition-colors hover:border-[#0B1F3A] dark:border-white/30 dark:hover:border-white"
                      >
                        Details
                      </Link>
                      <button
                        onClick={() =>
                          addToCart({
                            id: product.id,
                            name: product.name,
                            price: String(priceNum),
                            image: img,
                            petType: product.petType,
                            productCategory: product.productCategory || 'Treats',
                          })
                        }
                        className="rounded-full bg-[#0B1F3A] py-3 text-[15px] font-semibold text-white transition-colors hover:bg-[#16345F] active:scale-[0.98] dark:bg-white dark:text-[#0B1F3A]"
                      >
                        Add to cart
                      </button>
                    </div>
                  </article>
                );
              })}
            </div>
          )}

          <div className="mt-14 text-center">
            <Link
              href="/products"
              className="inline-flex items-center gap-2 rounded-full border border-[#0B1F3A] px-8 py-3.5 text-[15px] font-semibold transition-colors hover:bg-[#0B1F3A] hover:text-white dark:border-white dark:hover:bg-white dark:hover:text-[#0B1F3A]"
            >
              Browse the full range <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* COMPARISON */}
      <section className="py-16 sm:py-24">
        <div className={`${container} grid gap-10 lg:grid-cols-12 lg:gap-16`}>
          <div className="lg:col-span-4">
            <h2 className={`${S} text-4xl leading-[1.02] tracking-[-0.01em] sm:text-6xl`}>How we compare</h2>
            <p className="mt-5 max-w-sm text-[17px] leading-relaxed text-[#0B1F3A]/70 dark:text-white/70">
              Most commercial pet food is heavily processed. BFAB is made from fresh whole food and guided by veterinary science.
            </p>
          </div>

          <div className="lg:col-span-8">
            <div className="hidden grid-cols-12 gap-6 border-b border-[#0B1F3A] pb-3 text-sm font-semibold sm:grid dark:border-white">
              <div className="col-span-3" />
              <div className="col-span-5">BFAB</div>
              <div className="col-span-4 text-[#0B1F3A]/55 dark:text-white/55">Typical commercial food</div>
            </div>
            {compareRows.map((r) => (
              <div key={r.topic} className="grid grid-cols-1 gap-2 border-b border-[#0B1F3A]/12 py-5 sm:grid-cols-12 sm:gap-6 dark:border-white/15">
                <h3 className="text-[15px] font-semibold sm:col-span-3">{r.topic}</h3>
                <p className="flex gap-2.5 text-[15px] leading-snug sm:col-span-5">
                  <Check size={18} strokeWidth={2.5} className="mt-px shrink-0 text-[#1E7A5A]" />
                  {r.bfab}
                </p>
                <p className="flex gap-2.5 text-[15px] leading-snug text-[#0B1F3A]/55 sm:col-span-4 dark:text-white/55">
                  <Minus size={18} className="mt-px shrink-0" />
                  {r.usual}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CALCULATOR */}
      <section id="calculator" className="scroll-mt-24 bg-[#0B1F3A] py-16 text-white sm:py-24">
        <div className={`${container} grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-20`}>
          <div>
            <h2 className={`${S} text-4xl leading-[1.02] tracking-[-0.01em] sm:text-6xl`}>How much should they eat?</h2>
            <p className="mt-5 max-w-md text-[17px] leading-relaxed text-white/75">
              Choose your pet and set their weight for a suggested daily topper portion. This is a guide only, so ask your vet about specific dietary needs.
            </p>

            <div className="mt-9 space-y-8">
              <div role="group" aria-label="Pet type" className="inline-flex rounded-full border border-white/25 p-1">
                {(['dog', 'cat'] as const).map((p) => (
                  <button
                    key={p}
                    type="button"
                    aria-pressed={calcPet === p}
                    onClick={() => {
                      setCalcPet(p);
                      setCalcWeight((w) => Math.min(w, p === 'cat' ? 15 : 60));
                    }}
                    className={`rounded-full px-8 py-2.5 text-[15px] font-semibold transition-colors ${
                      calcPet === p ? 'bg-white text-[#0B1F3A]' : 'text-white/80 hover:text-white'
                    }`}
                  >
                    {p === 'dog' ? 'Dog' : 'Cat'}
                  </button>
                ))}
              </div>

              <div>
                <div className="mb-3 flex items-baseline justify-between">
                  <label htmlFor="weight" className="text-[15px] font-medium">Weight</label>
                  <span className={`${S} text-3xl`}>{calcWeight} kg</span>
                </div>
                <input
                  id="weight"
                  type="range"
                  min={1}
                  max={calcPet === 'dog' ? 60 : 15}
                  value={calcWeight}
                  onChange={(e) => setCalcWeight(Number(e.target.value))}
                  className="h-2 w-full cursor-pointer accent-[#B8893B]"
                />
                <div className="mt-1.5 flex justify-between text-xs text-white/55">
                  <span>1 kg</span>
                  <span>{calcPet === 'dog' ? '60 kg' : '15 kg'}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-[2rem] bg-white p-7 text-[#0B1F3A] sm:p-10">
            <p className="text-sm text-[#0B1F3A]/65">Suggested daily portion</p>
            <p className={`${S} mt-1 text-[clamp(4.5rem,15vw,8rem)] leading-none`}>
              {portion}
              <span className="ml-2 text-4xl text-[#B8893B]">g</span>
            </p>
            <dl className="mt-7 space-y-3 border-t border-[#0B1F3A]/12 pt-6 text-[15px]">
              <div className="flex justify-between gap-4">
                <dt className="text-[#0B1F3A]/65">Start with</dt>
                <dd className="text-right font-semibold">{calcWeight > 20 ? 'Hip & Joint Pro Formula' : 'Natural Prebiotic ProTopper'}</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-[#0B1F3A]/65">You may notice</dt>
                <dd className="text-right font-semibold">Firmer stool, glossier coat</dd>
              </div>
            </dl>
            <Link
              href="/products"
              className="mt-8 flex w-full items-center justify-center gap-2 rounded-full bg-[#0B1F3A] py-3.5 text-[15px] font-semibold text-white transition-colors hover:bg-[#16345F]"
            >
              See products for your {calcPet} <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* VET */}
      <section className="py-16 sm:py-28">
        <div className={`${container} grid items-center gap-10 md:grid-cols-12 md:gap-16`}>
          <div className="md:col-span-4">
            <div className="relative mx-auto aspect-[4/5] w-56 overflow-hidden rounded-2xl bg-[#F4F6F9] md:w-full dark:bg-[#15213A]">
              <Image src="/vet.png" alt="Dr. Arvind Rao, veterinary nutrition consultant" fill sizes="(max-width: 768px) 224px, 30vw" className="object-cover" />
            </div>
          </div>
          <figure className="md:col-span-8">
            <blockquote className={`${S} text-[clamp(1.75rem,4vw,3rem)] leading-[1.15] tracking-[-0.01em]`}>
              “Most canine and feline health starts in the gut. Remove inflammatory meat meals, feed whole meats with prebiotic fibre, and you help prevent chronic allergies.”
            </blockquote>
            <figcaption className="mt-7 border-t border-[#0B1F3A]/15 pt-5 dark:border-white/15">
              <p className="text-base font-semibold">Dr. Arvind Rao, BVSc & AH, MVSc</p>
              <p className="text-[15px] text-[#0B1F3A]/65 dark:text-white/65">Senior veterinary nutrition consultant, 14+ years in clinical practice</p>
            </figcaption>
          </figure>
        </div>
      </section>

      {/* REVIEWS */}
      <section className="bg-[#F4F6F9] py-16 sm:py-24 dark:bg-[#0D1626]">
        <div className={container}>
          <h2 className={`${S} max-w-2xl text-4xl leading-[1.02] tracking-[-0.01em] sm:text-6xl`}>Loved by pet families</h2>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {reviews.map((r) => (
              <figure key={r.pet} className="flex flex-col justify-between rounded-2xl bg-white p-7 dark:bg-[#15213A]">
                <div>
                  <div className="mb-4 flex gap-0.5" role="img" aria-label="5 out of 5 stars">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={15} className="fill-[#B8893B] text-[#B8893B]" />
                    ))}
                  </div>
                  <blockquote className="text-[16px] leading-relaxed">{r.text}</blockquote>
                </div>
                <figcaption className="mt-6 border-t border-[#0B1F3A]/10 pt-4 dark:border-white/10">
                  <p className="text-[15px] font-semibold">{r.pet}</p>
                  <p className="text-[13px] text-[#0B1F3A]/60 dark:text-white/60">{r.parent}</p>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* CLOSING CTA */}
      <section className="py-20 sm:py-32">
        <div className={`${container} text-center`}>
          <h2 className={`${S} mx-auto max-w-4xl text-[clamp(2.8rem,8vw,6.5rem)] leading-[0.98] tracking-[-0.02em]`}>
            Give them <em className="italic">better</em> every day.
          </h2>
          <p className="mx-auto mt-6 max-w-md text-[17px] leading-relaxed text-[#0B1F3A]/70 dark:text-white/70">
            Real ingredients, formulated by vets, delivered to your door.
          </p>
          <Link
            href="/products"
            className="mt-9 inline-flex items-center gap-2 rounded-full bg-[#0B1F3A] px-9 py-4 text-[15px] font-semibold text-white transition-colors hover:bg-[#16345F] dark:bg-white dark:text-[#0B1F3A]"
          >
            Shop all products <ArrowRight size={17} />
          </Link>
        </div>
      </section>

      {/* MOBILE ACTION BAR */}
      <div className="fixed inset-x-0 bottom-0 z-40 flex items-center gap-3 border-t border-[#0B1F3A]/10 bg-white/95 p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] backdrop-blur-md sm:hidden dark:border-white/10 dark:bg-[#0A1220]/95">
        <Link href="/products" className="flex-1 rounded-full bg-[#0B1F3A] py-3.5 text-center text-sm font-semibold text-white dark:bg-white dark:text-[#0B1F3A]">
          Shop now
        </Link>
        <Link href="/cart" className="flex items-center gap-2 rounded-full border border-[#0B1F3A]/30 px-5 py-3 text-sm font-semibold dark:border-white/30">
          Cart
          {totalCartCount > 0 && (
            <span className="grid h-5 min-w-5 place-items-center rounded-full bg-[#B8893B] px-1 text-[11px] font-bold text-white">
              {totalCartCount}
            </span>
          )}
        </Link>
      </div>
    </div>
  );
}