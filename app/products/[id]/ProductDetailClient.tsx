"use client";

import React, { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { useCart } from '../../components/CartContext';
import { ProductDetailPage } from '@/components/ui/product-detail-page';
import { Product } from '@/lib/types';

gsap.registerPlugin(ScrollTrigger, useGSAP);

interface ProductDetailClientProps {
    product: Product;
}

export default function ProductDetailClient({ product }: ProductDetailClientProps) {
    const { addToCart } = useCart();
    const rootRef = useRef<HTMLDivElement>(null);

    // Page choreography: gallery + buy box glide in, then every section below
    // the fold reveals its heading and cards as it scrolls into view.
    useGSAP(
        () => {
            const root = rootRef.current;
            if (!root || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
            const [hero, ...grids] = Array.from(root.querySelectorAll<HTMLElement>('.grid'));

            if (hero) {
                gsap.from(hero.children, {
                    y: 50,
                    opacity: 0,
                    duration: 1.1,
                    stagger: 0.15,
                    delay: 0.45,
                    ease: 'power3.out',
                });
            }

            root.querySelectorAll<HTMLElement>('h2').forEach((h) => {
                gsap.from(h, {
                    y: 40,
                    opacity: 0,
                    filter: 'blur(8px)',
                    duration: 1,
                    ease: 'power3.out',
                    clearProps: 'filter',
                    scrollTrigger: { trigger: h, start: 'top 88%', once: true },
                });
            });

            grids
                .filter((g) => !hero?.contains(g))
                .forEach((g) => {
                    gsap.from(g.children, {
                        y: 60,
                        opacity: 0,
                        scale: 0.96,
                        duration: 0.9,
                        stagger: 0.1,
                        ease: 'power3.out',
                        scrollTrigger: { trigger: g, start: 'top 85%', once: true },
                    });
                });
        },
        { scope: rootRef, dependencies: [product.id] }
    );

    return (
        <div ref={rootRef}>
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
        </div>
    );
}
