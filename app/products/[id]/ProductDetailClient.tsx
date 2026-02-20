"use client";

import React from 'react';
import { useCart } from '../../components/CartContext';
import { ProductDetailPage } from '@/components/ui/product-detail-page';
import { Product } from '@/lib/types';

interface ProductDetailClientProps {
    product: Product;
}

export default function ProductDetailClient({ product }: ProductDetailClientProps) {
    const { addToCart } = useCart();

    return (
        <ProductDetailPage
            product={{
                ...product,
                sku: `BFAB-${product.id.toString().padStart(3, '0')}`,
                images: product.images || ['/placeholder.jpg'],
                features: product.features || [],
                rating: product.rating || 0,
                reviewCount: product.reviews || 0,
                inStock: (product.stock ?? 0) > 0,
                originalPrice: (typeof product.price === 'string' ? parseFloat(product.price) * 1.2 : product.price * 1.2).toFixed(2)
            }}
            breadcrumbs={[
                { label: 'Home', href: '/' },
                { label: 'Shop', href: '/products' },
                { label: product.name, href: '#' },
            ]}
            onAddToCart={(quantity, variant, unitPrice) => {
                const resolvedUnitPrice = typeof unitPrice === 'number'
                    ? unitPrice
                    : (variant ? variant.price : Number(product.price));
                for (let i = 0; i < quantity; i++) {
                    addToCart({
                        id: variant ? `${product.id}-${variant.label}` : product.id,
                        name: variant ? `${product.name} - ${variant.label}` : product.name,
                        price: resolvedUnitPrice.toString(),
                        image: product.images && product.images[0] ? product.images[0] : '/placeholder.jpg',
                        petType: product.petType,
                        productCategory: product.productCategory
                    });
                }
            }}
        />
    );
}
