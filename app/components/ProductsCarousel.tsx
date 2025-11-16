"use client";
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Star, ShoppingCart } from 'lucide-react';
import ProductImageCarousel from './ProductImageCarousel';

interface Product {
  id: number;
  name: string;
  price: string;
  originalPrice?: string;
  image: string;
  images: string[];
  rating: number;
  reviews: number;
  category: string;
  productCategory: string;
  description: string;
}

interface ProductsCarouselProps {
  products?: Product[];
  title?: string;
}

const defaultProducts: Product[] = [
  {
    id: 1,
    name: 'BFAB Peanut Butter for Dogs - 500g',
    price: '₹349',
    originalPrice: '₹399',
    image: '/products/1/20.png',
    images: ['/products/1/20.png', '/products/1/21.png', '/products/1/22.png', '/products/1/23.png', '/products/1/24.png'],
    rating: 4.9,
    reviews: 328,
    category: 'Canine',
    productCategory: 'Treats',
    description: 'All-Natural, xylitol-Free | Protein-Rich Treat with Zero preservatives'
  },
  {
    id: 2,
    name: 'BFAB Oven Baked Kitten Kibble Dry Cat Food - 1Kg',
    price: '₹599',
    originalPrice: '₹799',
    image: '/products/2/3.png',
    images: ['/products/2/3.png', '/products/2/4.png', '/products/2/5.png', '/products/2/6.png', '/products/2/7.png'],
    rating: 4.8,
    reviews: 245,
    category: 'Feline',
    productCategory: 'Cat Food',
    description: 'Chicken & Ocean Fish | Promotes Brain & Vision Development'
  },
  {
    id: 3,
    name: 'BFAB Natural Frozen Dog Treats – Alphonso Mango & Peanut Butter',
    price: '₹99',
    originalPrice: '₹199',
    image: '/products/3/9.png',
    images: ['/products/3/9.png', '/products/3/12.png', '/products/3/14.png', '/products/3/16.png', '/products/3/18.png'],
    rating: 5.0,
    reviews: 512,
    category: 'Canine',
    productCategory: 'Treats',
    description: 'Healthy Dog Treats | No Colour & Flavours | Made with Oat & Coconut Milk'
  },
  {
    id: 4,
    name: 'BFAB Chicken Broth for Cats & Dogs',
    price: '₹349',
    originalPrice: '₹399',
    image: '/products/4/12.png',
    images: ['/products/4/12.png', '/products/4/13.png', '/products/4/15.png', '/products/4/17.png', '/products/4/19.png'],
    rating: 4.9,
    reviews: 187,
    category: 'Both',
    productCategory: 'Supplements',
    description: 'Zero Preservatives | Aids Joint Health and Digestion | Collagen Rich'
  },
  {
    id: 5,
    name: 'BFAB Dehydrated Crunchy Claws - Chicken Claws for Dogs',
    price: '₹249',
    originalPrice: '₹299',
    image: '/products/5/WhatsApp Image 2025-11-16 at 1.39.05 PM.jpeg',
    images: ['/products/5/WhatsApp Image 2025-11-16 at 1.39.05 PM.jpeg', '/products/5/WhatsApp Image 2025-11-16 at 1.39.04 PM.jpeg', '/products/5/WhatsApp Image 2025-11-16 at 1.39.05 PM (1).jpeg', '/products/5/WhatsApp Image 2025-11-16 at 1.39.05 PM (2).jpeg', '/products/5/WhatsApp Image 2025-11-16 at 1.39.06 PM (1).jpeg'],
    rating: 4.7,
    reviews: 150,
    category: 'Canine',
    productCategory: 'Treats',
    description: 'Natural Ingredients, Maximum Flavor | Crafted from 100% natural chicken claws'
  }
];

export default function ProductsCarousel({ products = defaultProducts, title = "Featured Products" }: ProductsCarouselProps) {
  const [current, setCurrent] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);

  useEffect(() => {
    if (!isAutoPlay) return;

    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % Math.max(1, products.length - 3));
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlay, products.length]);

  const displayedProducts = products.slice(current, current + 4);

  return (
    <div className="w-full py-12 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-900 rounded-lg transition-colors duration-300">
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100">{title}</h3>
        <p className="text-gray-600 dark:text-gray-400 mt-2">Discover our most popular products</p>
      </div>

      <div
        className="flex justify-center items-stretch gap-6 px-4 overflow-hidden"
        onMouseEnter={() => setIsAutoPlay(false)}
        onMouseLeave={() => setIsAutoPlay(true)}
      >
        {displayedProducts.map((product, index) => (
          <motion.div
            key={`${product.id}-${index}`}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.5 }}
            className="flex-shrink-0 w-72 bg-white dark:bg-gray-700 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-600 overflow-hidden group"
          >
            <Link href={`/products/${product.id}`} className="block">
              <div className="relative h-48 bg-gray-100 dark:bg-gray-600">
                <ProductImageCarousel
                  images={product.images}
                  alt={product.name}
                  className="h-48 bg-gray-100 dark:bg-gray-600"
                />
                {product.originalPrice && (
                  <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-semibold z-10">
                    SALE
                  </div>
                )}
              </div>
              <div className="p-4">
                <h4 className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-2 line-clamp-2">{product.name}</h4>
                <div className="flex items-center mb-2">
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={12} fill="currentColor" />
                    ))}
                  </div>
                  <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">
                    {product.rating} ({product.reviews})
                  </span>
                </div>
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xl font-bold text-blue-600 dark:text-blue-400">{product.price}</span>
                  {product.originalPrice && (
                    <span className="text-sm text-gray-500 dark:text-gray-400 line-through">{product.originalPrice}</span>
                  )}
                </div>
                <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white py-2 px-4 rounded-full hover:from-blue-700 hover:to-blue-800 transition duration-300 font-semibold flex items-center justify-center gap-2 text-sm">
                  <ShoppingCart size={16} />
                  Add to Cart
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>

      {products.length > 4 && (
        <div className="flex justify-center gap-2 mt-8">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setCurrent((prev) => Math.max(0, prev - 1))}
            disabled={current === 0}
            className="p-2 rounded-full bg-blue-600 dark:bg-blue-700 text-white hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            ←
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setCurrent((prev) => Math.min(products.length - 4, prev + 1))}
            disabled={current >= products.length - 4}
            className="p-2 rounded-full bg-blue-600 dark:bg-blue-700 text-white hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            →
          </motion.button>
        </div>
      )}
    </div>
  );
}