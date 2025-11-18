"use client";
import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Star, ShoppingCart, Heart, Share2, Truck, ShieldCheck, RotateCcw, ChevronLeft, ChevronRight, Minus, Plus } from 'lucide-react';
import { useParams } from 'next/navigation';
import { products } from '../../data/products';
import { useCart } from '../../components/CartContext';

export default function ProductDetail() {
  const params = useParams();
  const productId = parseInt(params.id as string);
  const product = products.find(p => p.id === productId);
  const { addToCart } = useCart();

  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Product Not Found</h1>
          <Link href="/shop-now" className="text-blue-600 hover:text-blue-800">
            ← Back to Shop
          </Link>
        </div>
      </div>
    );
  }

  const nextImage = () => {
    setSelectedImage((prev) => (prev + 1) % product.images.length);
  };

  const prevImage = () => {
    setSelectedImage((prev) => (prev - 1 + product.images.length) % product.images.length);
  };

  return (
    <div className="min-h-screen bg-[#fff4e8] dark:bg-slate-950">
      {/* Breadcrumb */}
      <div className="bg-white dark:bg-slate-900 border-b border-gray-200 dark:border-slate-700">
        <div className="container mx-auto px-4 py-4">
          <nav className="flex items-center space-x-2 text-sm">
            <Link href="/" className="text-gray-600 dark:text-gray-400 hover:text-blue-600">Home</Link>
            <span className="text-gray-400">/</span>
            <Link href="/shop-now" className="text-gray-600 dark:text-gray-400 hover:text-blue-600">Shop</Link>
            <span className="text-gray-400">/</span>
            <span className="text-gray-800 dark:text-gray-200">{product.name}</span>
          </nav>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="relative aspect-square bg-white dark:bg-slate-800 rounded-lg overflow-hidden shadow-lg">
              <Image
                src={product.images[selectedImage]}
                alt={product.name}
                fill
                className="object-cover"
                priority
              />
              {/* Navigation Arrows */}
              <button
                onClick={prevImage}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 dark:bg-slate-700/80 hover:bg-white dark:hover:bg-slate-700 p-2 rounded-full shadow-lg transition-colors"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 dark:bg-slate-700/80 hover:bg-white dark:hover:bg-slate-700 p-2 rounded-full shadow-lg transition-colors"
              >
                <ChevronRight size={20} />
              </button>
            </div>

            {/* Thumbnail Images */}
            <div className="flex space-x-2 overflow-x-auto">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ${
                    selectedImage === index
                      ? 'border-blue-500'
                      : 'border-gray-200 dark:border-slate-700 hover:border-gray-300 dark:hover:border-slate-600'
                  }`}
                >
                  <Image
                    src={image}
                    alt={`${product.name} ${index + 1}`}
                    width={80}
                    height={80}
                    className="object-cover w-full h-full"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                {product.name}
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-400 mb-4">
                {product.description}
              </p>

              {/* Rating */}
              <div className="flex items-center space-x-2 mb-4">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={20}
                      className={i < Math.floor(product.rating) ? "text-yellow-400 fill-current" : "text-gray-300"}
                    />
                  ))}
                </div>
                <span className="text-gray-600 dark:text-gray-400">
                  {product.rating} ({product.reviews} reviews)
                </span>
              </div>

              {/* Price */}
              <div className="flex items-center space-x-3 mb-6">
                <span className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                  {product.price}
                </span>
                <span className="text-lg text-gray-500 dark:text-gray-500 line-through">
                  {product.originalPrice}
                </span>
                <span className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-400 px-2 py-1 rounded text-sm font-semibold">
                  Save ₹{(parseInt(product.originalPrice.replace('₹', '')) - parseInt(product.price.replace('₹', '')))}
                </span>
              </div>

              {/* Stock Status */}
              <div className="flex items-center space-x-2 mb-6">
                <div className={`w-3 h-3 rounded-full ${product.inStock ? 'bg-green-500' : 'bg-red-500'}`}></div>
                <span className={`font-semibold ${product.inStock ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                  {product.inStock ? 'In Stock' : 'Out of Stock'}
                </span>
              </div>
            </div>

            {/* Quantity Selector */}
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <span className="font-semibold text-gray-900 dark:text-gray-100">Quantity:</span>
                <div className="flex items-center border border-gray-300 dark:border-slate-600 rounded-lg">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-2 hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors"
                  >
                    <Minus size={16} />
                  </button>
                  <span className="px-4 py-2 font-semibold">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-2 hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors"
                  >
                    <Plus size={16} />
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => addToCart({
                    id: product.id,
                    name: product.name,
                    price: product.price,
                    image: product.images[0],
                    petType: product.petType,
                    productCategory: product.productCategory
                  })}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white py-4 px-6 rounded-lg font-semibold flex items-center justify-center space-x-2 transition-colors"
                >
                  <ShoppingCart size={20} />
                  <span>Add to Cart</span>
                </motion.button>

                <div className="flex gap-4">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setIsWishlisted(!isWishlisted)}
                    className={`p-4 rounded-lg border-2 transition-colors ${
                      isWishlisted
                        ? 'border-red-500 bg-red-50 dark:bg-red-900/20 text-red-500'
                        : 'border-gray-300 dark:border-slate-600 hover:border-red-500 text-gray-600 dark:text-gray-400 hover:text-red-500'
                    }`}
                  >
                    <Heart size={20} className={isWishlisted ? 'fill-current' : ''} />
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="p-4 rounded-lg border-2 border-gray-300 dark:border-slate-600 hover:border-blue-500 text-gray-600 dark:text-gray-400 hover:text-blue-500 transition-colors"
                  >
                    <Share2 size={20} />
                  </motion.button>
                </div>
              </div>
            </div>

            {/* Product Details */}
            <div className="border-t border-gray-200 dark:border-slate-700 pt-6">
              <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">Product Details</h3>
              <div className="space-y-2 text-gray-600 dark:text-gray-400">
                <p><strong>Category:</strong> {product.category}</p>
                <p><strong>Weight:</strong> {product.weight}</p>
                <p><strong>Rating:</strong> {product.rating}/5 ({product.reviews} reviews)</p>
              </div>
            </div>

            {/* Benefits */}
            <div className="border-t border-gray-200 dark:border-slate-700 pt-6">
              <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">Key Benefits</h3>
              <ul className="space-y-3">
                {product.benefits.map((benefit, index) => (
                  <li key={index} className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-gray-600 dark:text-gray-400">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Trust Badges */}
            <div className="border-t border-gray-200 dark:border-slate-700 pt-6">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                  <Truck size={16} />
                  <span>Free Shipping</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                  <ShieldCheck size={16} />
                  <span>Vet Approved</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                  <RotateCcw size={16} />
                  <span>90-Day Guarantee</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}