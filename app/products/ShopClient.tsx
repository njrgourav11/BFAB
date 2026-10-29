"use client";
import React, { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Instrument_Serif, Hanken_Grotesk } from 'next/font/google';
import { Search, SlidersHorizontal, X, ChevronDown, Grid2x2, Rows3, Star, Plus } from 'lucide-react';
import { useCart } from '../components/CartContext';
import { Product } from '@/lib/types';

const serif = Instrument_Serif({ subsets: ['latin'], weight: '400', style: ['normal', 'italic'], variable: '--f-serif', display: 'swap' });
const sans = Hanken_Grotesk({ subsets: ['latin'], variable: '--f-sans', display: 'swap' });
const S = 'font-[family-name:var(--f-serif)] font-normal';

const categories = [
  { id: 'all', name: 'All products' },
  { id: 'treats', name: 'Treats' },
  { id: 'food', name: 'Meals' },
  { id: 'supplements', name: 'Supplements' },
];

const petTypes = [
  { id: 'all', name: 'All pets' },
  { id: 'dog', name: 'Dogs' },
  { id: 'cat', name: 'Cats' },
];

const sortOptions = [
  { id: 'popular', name: 'Most popular' },
  { id: 'newest', name: 'Newest arrivals' },
  { id: 'price-low', name: 'Price: low to high' },
  { id: 'price-high', name: 'Price: high to low' },
  { id: 'rating', name: 'Top rated' },
];

const toNum = (v: unknown) => (typeof v === 'number' ? v : parseFloat(String(v ?? '').replace(/[^0-9.]/g, '')) || 0);
const inr = (n: number) => '₹' + n.toLocaleString('en-IN', { maximumFractionDigits: 2 });

function FilterGroup<T extends { id: string; name: string }>({
  title,
  items,
  value,
  onChange,
}: {
  title: string;
  items: T[];
  value: string;
  onChange: (id: string) => void;
}) {
  return (
    <fieldset>
      <legend className="mb-3 text-sm font-semibold">{title}</legend>
      <div className="space-y-1">
        {items.map((it) => {
          const active = value === it.id;
          return (
            <button
              key={it.id}
              type="button"
              aria-pressed={active}
              onClick={() => onChange(it.id)}
              className={`flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-left text-[15px] transition-colors ${
                active
                  ? 'bg-[#0B1F3A] font-semibold text-white dark:bg-white dark:text-[#0B1F3A]'
                  : 'text-[#0B1F3A]/75 hover:bg-[#F4F6F9] dark:text-white/75 dark:hover:bg-white/5'
              }`}
            >
              {it.name}
              {active && <span className="h-1.5 w-1.5 rounded-full bg-[#B8893B]" />}
            </button>
          );
        })}
      </div>
    </fieldset>
  );
}

const ShopClient = ({ initialProducts }: { initialProducts: Product[] }) => {
  const { addToCart } = useCart();
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedPetType, setSelectedPetType] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('popular');
  const [searchQuery, setSearchQuery] = useState('');
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  useEffect(() => {
    setProducts(initialProducts);
  }, [initialProducts]);

  useEffect(() => {
    document.body.style.overflow = isMobileFilterOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileFilterOpen]);

  const filteredProducts = useMemo(() => {
    let result = [...products];

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (p) => p.name.toLowerCase().includes(query) || p.description.toLowerCase().includes(query)
      );
    }
    if (selectedCategory !== 'all') {
      result = result.filter((p) => p.productCategory?.toLowerCase() === selectedCategory.toLowerCase());
    }
    if (selectedPetType !== 'all') {
      result = result.filter((p) => p.petType === selectedPetType || p.petType === 'both');
    }

    switch (sortBy) {
      case 'price-low':
        result.sort((a, b) => toNum(a.price) - toNum(b.price));
        break;
      case 'price-high':
        result.sort((a, b) => toNum(b.price) - toNum(a.price));
        break;
      case 'rating':
        result.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        break;
      case 'newest':
        result.sort((a, b) => b.id.localeCompare(a.id));
        break;
      default:
        result.sort((a, b) => (b.reviews || 0) - (a.reviews || 0));
    }
    return result;
  }, [products, selectedCategory, selectedPetType, sortBy, searchQuery]);

  const activeFilterCount = (selectedCategory !== 'all' ? 1 : 0) + (selectedPetType !== 'all' ? 1 : 0);
  const clearAll = () => {
    setSelectedCategory('all');
    setSelectedPetType('all');
    setSearchQuery('');
  };

  const searchBox = (
    <div className="relative">
      <label htmlFor="shop-search" className="sr-only">Search products</label>
      <Search className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#0B1F3A]/45 dark:text-white/45" size={18} />
      <input
        id="shop-search"
        type="search"
        placeholder="Search products"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="w-full rounded-full border border-[#0B1F3A]/20 bg-white py-3 pl-11 pr-4 text-[15px] outline-none transition-colors placeholder:text-[#0B1F3A]/45 focus:border-[#0B1F3A] dark:border-white/20 dark:bg-[#0D1626] dark:placeholder:text-white/45 dark:focus:border-white"
      />
    </div>
  );

  const sortSelect = (
    <div className="relative">
      <label htmlFor="shop-sort" className="sr-only">Sort products</label>
      <select
        id="shop-sort"
        value={sortBy}
        onChange={(e) => setSortBy(e.target.value)}
        className="w-full cursor-pointer appearance-none rounded-full border border-[#0B1F3A]/20 bg-white py-3 pl-5 pr-11 text-[15px] font-medium outline-none focus:border-[#0B1F3A] dark:border-white/20 dark:bg-[#0D1626] dark:focus:border-white"
      >
        {sortOptions.map((o) => (
          <option key={o.id} value={o.id}>{o.name}</option>
        ))}
      </select>
      <ChevronDown className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[#0B1F3A]/50 dark:text-white/50" size={16} />
    </div>
  );

  const handleAdd = (product: Product, price: number, image: string) =>
    addToCart({
      id: product.id,
      name: product.name,
      price: String(price),
      image,
      petType: product.petType,
      productCategory: product.productCategory,
    });

  return (
    <div
      className={`${serif.variable} ${sans.variable} min-h-screen overflow-x-clip bg-white font-[family-name:var(--f-sans)] text-[#0B1F3A] antialiased dark:bg-[#0A1220] dark:text-[#EEF1F6]`}
    >
      {/* Page header */}
      <header className="border-b border-[#0B1F3A]/10 bg-[#F4F6F9] dark:border-white/10 dark:bg-[#0D1626]">
        <div className="mx-auto max-w-7xl px-5 py-12 sm:px-8 sm:py-16 lg:px-10">
          <h1 className={`${S} text-[clamp(2.8rem,7vw,5rem)] leading-[1] tracking-[-0.02em]`}>
            The <em className="italic">full</em> range
          </h1>
          <p className="mt-4 max-w-xl text-[17px] leading-relaxed text-[#0B1F3A]/70 dark:text-white/70">
            Vet-formulated nutrition and supplements for dogs and cats.
          </p>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-5 py-8 sm:px-8 sm:py-12 lg:px-10">
        <div className="flex flex-col gap-10 lg:flex-row lg:gap-14">
          {/* Desktop sidebar */}
          <aside className="hidden w-60 shrink-0 lg:block">
            <div className="sticky top-24 space-y-8">
              {searchBox}
              <FilterGroup title="Category" items={categories} value={selectedCategory} onChange={setSelectedCategory} />
              <FilterGroup title="Pet" items={petTypes} value={selectedPetType} onChange={setSelectedPetType} />
              {(activeFilterCount > 0 || searchQuery) && (
                <button onClick={clearAll} className="text-sm font-semibold underline underline-offset-4">
                  Clear all
                </button>
              )}
            </div>
          </aside>

          {/* Mobile controls */}
          <div className="grid grid-cols-2 gap-3 lg:hidden">
            <button
              onClick={() => setIsMobileFilterOpen(true)}
              className="flex items-center justify-center gap-2 rounded-full border border-[#0B1F3A]/20 py-3 text-[15px] font-medium dark:border-white/20"
            >
              <SlidersHorizontal size={17} />
              Filters
              {activeFilterCount > 0 && (
                <span className="grid h-5 min-w-5 place-items-center rounded-full bg-[#0B1F3A] px-1 text-[11px] font-bold text-white dark:bg-white dark:text-[#0B1F3A]">
                  {activeFilterCount}
                </span>
              )}
            </button>
            {sortSelect}
          </div>

          {/* Results */}
          <div className="min-w-0 flex-1">
            <div className="mb-8 flex items-center justify-between gap-4">
              <p className="text-[15px] text-[#0B1F3A]/70 dark:text-white/70">
                <span className="font-semibold text-[#0B1F3A] dark:text-white">{filteredProducts.length}</span>{' '}
                {filteredProducts.length === 1 ? 'product' : 'products'}
              </p>

              <div className="flex items-center gap-3">
                <div className="hidden w-52 lg:block">{sortSelect}</div>
                <div className="flex rounded-full border border-[#0B1F3A]/20 p-1 dark:border-white/20" role="group" aria-label="View">
                  <button
                    onClick={() => setViewMode('grid')}
                    aria-pressed={viewMode === 'grid'}
                    aria-label="Grid view"
                    className={`rounded-full p-2 transition-colors ${viewMode === 'grid' ? 'bg-[#0B1F3A] text-white dark:bg-white dark:text-[#0B1F3A]' : 'text-[#0B1F3A]/55 dark:text-white/55'}`}
                  >
                    <Grid2x2 size={18} />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    aria-pressed={viewMode === 'list'}
                    aria-label="List view"
                    className={`rounded-full p-2 transition-colors ${viewMode === 'list' ? 'bg-[#0B1F3A] text-white dark:bg-white dark:text-[#0B1F3A]' : 'text-[#0B1F3A]/55 dark:text-white/55'}`}
                  >
                    <Rows3 size={18} />
                  </button>
                </div>
              </div>
            </div>

            {filteredProducts.length > 0 ? (
              <div
                className={
                  viewMode === 'grid'
                    ? 'grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 xl:grid-cols-3'
                    : 'divide-y divide-[#0B1F3A]/10 border-y border-[#0B1F3A]/10 dark:divide-white/10 dark:border-white/10'
                }
              >
                <AnimatePresence mode="popLayout">
                  {filteredProducts.map((product) => {
                    const priceNum = toNum(product.price);
                    const origNum = product.originalPrice ? toNum(product.originalPrice) : 0;
                    const hasDiscount = origNum > priceNum && priceNum > 0;
                    const discountPercent = hasDiscount ? Math.round(((origNum - priceNum) / origNum) * 100) : 0;
                    const img = product.images && product.images[0] ? product.images[0] : '/placeholder.png';
                    const bestseller = (product.rating || 0) >= 4.8;

                    if (viewMode === 'list') {
                      return (
                        <motion.article
                          layout
                          key={product.id}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="flex flex-col gap-5 py-6 sm:flex-row sm:items-center sm:gap-8"
                        >
                          <Link
                            href={`/products/${product.id}`}
                            className="relative block aspect-square w-full shrink-0 overflow-hidden rounded-2xl bg-[#F4F6F9] sm:w-44 dark:bg-[#15213A]"
                          >
                            <Image src={img} alt={product.name} fill sizes="(max-width: 640px) 90vw, 176px" className="object-contain p-5" />
                          </Link>

                          <div className="flex min-w-0 flex-1 flex-col gap-3">
                            <div>
                              <p className="text-[13px] capitalize text-[#0B1F3A]/60 dark:text-white/60">
                                {product.productCategory}
                                {product.petType === 'both' ? ' · all pets' : ''}
                              </p>
                              <Link href={`/products/${product.id}`}>
                                <h3 className="mt-0.5 text-xl font-semibold leading-snug hover:underline">{product.name}</h3>
                              </Link>
                            </div>
                            <p className="line-clamp-2 text-[15px] leading-relaxed text-[#0B1F3A]/70 dark:text-white/70">{product.description}</p>
                            <div className="flex items-center gap-1.5 text-[13px] text-[#0B1F3A]/65 dark:text-white/65">
                              <Star size={13} className="fill-[#B8893B] text-[#B8893B]" />
                              {(product.rating || 0).toFixed(1)} · {product.reviews || 0} reviews
                            </div>
                          </div>

                          <div className="flex items-center justify-between gap-4 sm:flex-col sm:items-end sm:gap-3">
                            <div className="sm:text-right">
                              <div className="text-xl font-semibold">{inr(priceNum)}</div>
                              {hasDiscount && <div className="text-[13px] text-[#0B1F3A]/45 line-through dark:text-white/45">{inr(origNum)}</div>}
                            </div>
                            <button
                              onClick={() => handleAdd(product, priceNum, img)}
                              className="inline-flex items-center gap-2 rounded-full bg-[#0B1F3A] px-6 py-3 text-[15px] font-semibold text-white transition-colors hover:bg-[#16345F] active:scale-[0.98] dark:bg-white dark:text-[#0B1F3A]"
                            >
                              <Plus size={17} /> Add to cart
                            </button>
                          </div>
                        </motion.article>
                      );
                    }

                    return (
                      <motion.article
                        layout
                        key={product.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="group flex flex-col"
                      >
                        <Link
                          href={`/products/${product.id}`}
                          className="relative block aspect-[4/5] overflow-hidden rounded-2xl bg-[#F4F6F9] dark:bg-[#15213A]"
                        >
                          <div className="absolute left-4 top-4 z-10 flex flex-col items-start gap-2">
                            {hasDiscount && (
                              <span className="rounded-full bg-[#0B1F3A] px-3 py-1 text-xs font-semibold text-white">{discountPercent}% off</span>
                            )}
                            {bestseller && (
                              <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-[#0B1F3A] shadow-sm">Bestseller</span>
                            )}
                          </div>
                          <Image
                            src={img}
                            alt={product.name}
                            fill
                            sizes="(max-width: 640px) 90vw, (max-width: 1280px) 45vw, 30vw"
                            className="object-contain p-8 transition-transform duration-700 group-hover:scale-105"
                          />
                        </Link>

                        <div className="mt-5 flex items-start justify-between gap-4">
                          <div className="min-w-0">
                            <p className="text-[13px] capitalize text-[#0B1F3A]/60 dark:text-white/60">
                              {product.productCategory}
                              {product.petType === 'both' ? ' · all pets' : ''}
                            </p>
                            <Link href={`/products/${product.id}`}>
                              <h3 className="mt-0.5 text-lg font-semibold leading-snug hover:underline">{product.name}</h3>
                            </Link>
                          </div>
                          <div className="shrink-0 text-right">
                            <div className="text-lg font-semibold">{inr(priceNum)}</div>
                            {hasDiscount && <div className="text-[13px] text-[#0B1F3A]/45 line-through dark:text-white/45">{inr(origNum)}</div>}
                          </div>
                        </div>

                        <div className="mt-2 flex items-center gap-1.5 text-[13px] text-[#0B1F3A]/65 dark:text-white/65">
                          <Star size={13} className="fill-[#B8893B] text-[#B8893B]" />
                          {(product.rating || 0).toFixed(1)} · {product.reviews || 0} reviews
                        </div>

                        <p className="mt-3 line-clamp-2 text-[15px] leading-relaxed text-[#0B1F3A]/70 dark:text-white/70">{product.description}</p>

                        <button
                          onClick={() => handleAdd(product, priceNum, img)}
                          className="mt-5 inline-flex items-center justify-center gap-2 rounded-full bg-[#0B1F3A] py-3.5 text-[15px] font-semibold text-white transition-colors hover:bg-[#16345F] active:scale-[0.98] dark:bg-white dark:text-[#0B1F3A]"
                        >
                          <Plus size={17} /> Add to cart
                        </button>
                      </motion.article>
                    );
                  })}
                </AnimatePresence>
              </div>
            ) : (
              <div className="py-20 text-center">
                <h3 className={`${S} text-4xl`}>Nothing matches yet</h3>
                <p className="mx-auto mt-3 max-w-sm text-[17px] leading-relaxed text-[#0B1F3A]/70 dark:text-white/70">
                  Try a different search or remove a filter to see more products.
                </p>
                <button
                  onClick={clearAll}
                  className="mt-7 rounded-full border border-[#0B1F3A] px-7 py-3 text-[15px] font-semibold transition-colors hover:bg-[#0B1F3A] hover:text-white dark:border-white dark:hover:bg-white dark:hover:text-[#0B1F3A]"
                >
                  Clear all filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile filter sheet */}
      <AnimatePresence>
        {isMobileFilterOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileFilterOpen(false)}
              className="fixed inset-0 z-40 bg-[#0B1F3A]/50 backdrop-blur-sm lg:hidden"
            />
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label="Filters"
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 32, stiffness: 320 }}
              className="fixed inset-x-0 bottom-0 z-50 flex max-h-[88vh] flex-col rounded-t-3xl bg-white lg:hidden dark:bg-[#0A1220]"
            >
              <div className="flex items-center justify-between px-5 pb-3 pt-5">
                <h2 className={`${S} text-3xl`}>Filters</h2>
                <button onClick={() => setIsMobileFilterOpen(false)} aria-label="Close filters" className="rounded-full p-2 hover:bg-[#F4F6F9] dark:hover:bg-white/10">
                  <X size={22} />
                </button>
              </div>

              <div className="flex-1 space-y-8 overflow-y-auto px-5 py-4">
                {searchBox}
                <FilterGroup title="Category" items={categories} value={selectedCategory} onChange={setSelectedCategory} />
                <FilterGroup title="Pet" items={petTypes} value={selectedPetType} onChange={setSelectedPetType} />
              </div>

              <div className="flex gap-3 border-t border-[#0B1F3A]/10 p-4 pb-[max(1rem,env(safe-area-inset-bottom))] dark:border-white/10">
                <button onClick={clearAll} className="rounded-full border border-[#0B1F3A]/25 px-6 py-3.5 text-[15px] font-semibold dark:border-white/30">
                  Clear
                </button>
                <button
                  onClick={() => setIsMobileFilterOpen(false)}
                  className="flex-1 rounded-full bg-[#0B1F3A] py-3.5 text-[15px] font-semibold text-white dark:bg-white dark:text-[#0B1F3A]"
                >
                  Show {filteredProducts.length} {filteredProducts.length === 1 ? 'result' : 'results'}
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ShopClient;