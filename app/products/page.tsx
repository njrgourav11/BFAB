import React from 'react';
import { getAllProducts } from '@/lib/product-utils';
import ShopClient from './ShopClient';

export const metadata = {
  title: 'Shop All Products - BFAB',
  description: 'Shop our range of vet-formulated pet supplements and nutrition for dogs and cats.',
};

export default async function ProductsPage() {
  const products = await getAllProducts();

  return <ShopClient initialProducts={products} />;
}
