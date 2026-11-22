"use client";

import React from 'react';
import { useCart } from '../../components/CartContext';
import ProductExperience from '@/components/product/ProductExperience';
import { Product } from '@/lib/types';

interface ProductDetailClientProps {
    product: Product;
}

export default function ProductDetailClient({ product }: ProductDetailClientProps) {
    const { addToCart } = useCart();

    return (
        <ProductExperience
            product={{
                ...product,
                images: product.images?.length ? product.images : ['/bfab icon.png'],
                rating: product.rating || 5,
                reviews: product.reviews || 0,
            }}
            onAddToCart={(quantity, variant, unitPrice) => {
                const resolvedUnitPrice = typeof unitPrice === 'number'
                    ? unitPrice
                    : (variant ? variant.price : Number(product.price));
                for (let i = 0; i < quantity; i++) {
                    addToCart({
                        id: variant ? `${product.id}-${variant.label}` : product.id,
                        name: variant ? `${product.name} - ${variant.label}` : product.name,
                        price: resolvedUnitPrice.toString(),
                        image: product.images && product.images[0] ? product.images[0] : '/bfab icon.png',
                        petType: product.petType,
                        productCategory: product.productCategory
                    });
                }
            }}
        />
    );
}
