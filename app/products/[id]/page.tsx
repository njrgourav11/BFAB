"use client";
import React from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { useParams } from 'next/navigation';
import { products } from '../../data/products';
import { useCart } from '../../components/CartContext';
import { ProductDetailPage } from '@/components/ui/product-detail-page';

export default function ProductDetail() {
  const params = useParams();
  const productId = parseInt(params.id as string);
  const product = products.find(p => p.id === productId);
  const { addToCart } = useCart();

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-slate-950 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Product Not Found</h1>
          <Link href="/shop-now" className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:underline">
            <ArrowLeft size={16} />
            Back to Shop
          </Link>
        </div>
      </div>
    );
  }

  // Map data/products format to ProductDetailPage props
  // The interface in ProductDetailPage has been updated to accept these new fields directly
  return (
    <ProductDetailPage
      product={{
        ...product, // Spread all properties including new detailed ones
        sku: `BFAB-${product.id.toString().padStart(3, '0')}`,
      }}
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Shop', href: '/products' },
        { label: product.name, href: '#' },
      ]}
      onAddToCart={(quantity) => {
        // Add multiple items based on quantity
        for (let i = 0; i < quantity; i++) {
          addToCart({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.images[0],
            petType: product.petType,
            productCategory: product.productCategory
          });
        }
      }}
    />
  );
}