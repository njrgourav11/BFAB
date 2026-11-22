'use client';

import { useEffect, useState } from 'react';
import { products as staticProducts } from '@/data/products';
import { getAllProducts } from '@/lib/product-utils';

export interface ShowcaseProduct {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  images: string[];
  description: string;
  highlights: string[];
  rating: number;
  reviews: number;
  petType: string;
  productCategory: string;
  accent: string;
}

const toNum = (v: unknown) =>
  typeof v === 'number' ? v : parseFloat(String(v ?? '').replace(/[^0-9.]/g, '')) || 0;

/** Brand colour lifted from each product's own packshot background */
const ACCENTS: [RegExp, string][] = [
  [/peanut/i, '#9C5B4C'],
  [/ice-?cream/i, '#F2A81D'],
  [/kibble|kitten/i, '#1F7A52'],
  [/broth/i, '#F06A3C'],
  [/claw/i, '#3F8F8A'],
  [/hemp/i, '#C8453A'],
  [/yak|dental/i, '#6B4E9B'],
  [/hip|joint/i, '#2D6CB5'],
  [/prebiotic|topper/i, '#5E8C31'],
  [/jerky/i, '#B3552B'],
];
const FALLBACK = ['#F4623B', '#1F7A52', '#E3A438', '#2D6CB5', '#C8453A', '#3F8F8A'];

export const accentFor = (name: string, i: number) =>
  ACCENTS.find(([re]) => re.test(name))?.[1] ?? FALLBACK[i % FALLBACK.length];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const normalize = (raw: any, i: number): ShowcaseProduct => {
  const images: string[] = Array.isArray(raw.images) ? raw.images.filter(Boolean) : [];
  const petRaw = String(raw.petType ?? '').toLowerCase();
  const petType = petRaw === 'canine' ? 'dog' : petRaw === 'feline' ? 'cat' : petRaw || 'both';
  const highlights: string[] = (
    raw.benefits ??
    raw.features ??
    (raw.detailedBenefits ?? []).map((b: { title: string }) => b.title)
  ).slice(0, 3);
  return {
    id: String(raw.id),
    name: raw.name,
    price: toNum(raw.price),
    originalPrice: raw.originalPrice ? toNum(raw.originalPrice) : undefined,
    image: images[0] ?? '/bfab icon.png',
    images,
    description: raw.longDescription || raw.description || '',
    highlights,
    rating: Number(raw.rating ?? 5),
    reviews: Number(raw.reviews ?? 0),
    petType,
    productCategory: raw.productCategory || raw.category || '',
    accent: accentFor(raw.name ?? '', i),
  };
};

/** Products with local packshots first: they carry the strongest visuals */
const sortForShowcase = (list: ShowcaseProduct[]) =>
  [...list].sort((a, b) => Number(b.image.startsWith('/')) - Number(a.image.startsWith('/')));

export function useShowcaseProducts() {
  const [items, setItems] = useState<ShowcaseProduct[]>(() =>
    sortForShowcase(staticProducts.map(normalize))
  );

  useEffect(() => {
    let alive = true;
    getAllProducts()
      .then((list) => {
        if (alive && list.length) setItems(sortForShowcase(list.map(normalize)));
      })
      .catch(() => {});
    return () => {
      alive = false;
    };
  }, []);

  return items;
}
