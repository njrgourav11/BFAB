"use client";
import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Star, ShoppingCart, Heart, Share2, Truck, ShieldCheck, RotateCcw, ChevronLeft, ChevronRight, Minus, Plus, ArrowLeft } from 'lucide-react';
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

  const nextImage = () => {
    setSelectedImage((prev) => (prev + 1) % product.images.length);
  };

  const prevImage = () => {
    setSelectedImage((prev) => (prev - 1 + product.images.length) % product.images.length);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-950 font-sans">
      {/* Breadcrumb */}
      <div className="bg-white dark:bg-slate-900 border-b border-gray-200 dark:border-slate-800 sticky top-0 z-30">
        <div className="container mx-auto px-4 py-4">
          <nav className="flex items-center space-x-2 text-sm">
            <Link href="/" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Home</Link>
            <span className="text-gray-400">/</span>
            <Link href="/shop-now" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Shop</Link>
            <span className="text-gray-400">/</span>
            <span className="text-gray-900 dark:text-white font-medium">{product.name}</span>
          </nav>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            {/* Main Image */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="relative aspect-square bg-white dark:bg-slate-900 rounded-2xl overflow-hidden shadow-sm border border-gray-100 dark:border-slate-800"
            >
              <Image
                src={product.images[selectedImage]}
                alt={product.name}
                fill
                className="object-contain p-8"
                priority
              />
              {/* Navigation Arrows */}
              {product.images.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-white dark:bg-slate-800 hover:bg-gray-100 dark:hover:bg-slate-700 p-3 rounded-full shadow-lg transition-colors"
                  >
                    <ChevronLeft size={20} className="text-gray-900 dark:text-white" />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-white dark:bg-slate-800 hover:bg-gray-100 dark:hover:bg-slate-700 p-3 rounded-full shadow-lg transition-colors"
                  >
                    <ChevronRight size={20} className="text-gray-900 dark:text-white" />
                  </button>
                </>
              )}
            </motion.div>

            {/* Thumbnail Images */}
            {product.images.length > 1 && (
              <div className="flex space-x-3 overflow-x-auto pb-2">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`flex-shrink-0 w-20 h-20 rounded-xl overflow-hidden border-2 transition-all ${selectedImage === index
                        ? 'border-blue-500 shadow-md'
                        : 'border-gray-200 dark:border-slate-700 hover:border-gray-300 dark:hover:border-slate-600'
                      }`}
                  >
                    <Image
                      src={image}
                      alt={`${product.name} ${index + 1}`}
                      width={80}
                      height={80}
                      className="object-contain w-full h-full p-2 bg-white dark:bg-slate-900"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-6"
          >
            <div>
              <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                {product.name}
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Rating */}
            <div className="flex items-center space-x-3">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={20}
                    className={i < Math.floor(product.rating) ? "text-yellow-400 fill-current" : "text-gray-300 dark:text-gray-600"}
                  />
                ))}
              </div>
              <span className="text-gray-600 dark:text-gray-400 font-medium">
                {product.rating} ({product.reviews} reviews)
              </span>
            </div>

            {/* Price */}
            <div className="bg-gray-50 dark:bg-slate-900 rounded-2xl p-6 border border-gray-100 dark:border-slate-800">
              <div className="flex items-center gap-4 mb-2">
                <span className="text-4xl font-bold text-gray-900 dark:text-white">
                  {product.price}
                </span>
                <span className="text-xl text-gray-400 line-through">
                  {product.originalPrice}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 px-3 py-1 rounded-lg text-sm font-bold">
                  Save ₹{(parseInt(product.originalPrice.replace('₹', '')) - parseInt(product.price.replace('₹', '')))}
                </span>
                <div className={`flex items-center gap-2 text-sm font-semibold ${product.inStock ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                  <div className={`w-2 h-2 rounded-full ${product.inStock ? 'bg-green-500' : 'bg-red-500'}`}></div>
                  {product.inStock ? 'In Stock' : 'Out of Stock'}
                </div>
              </div>
            </div>

            {/* Quantity Selector */}
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <span className="font-semibold text-gray-900 dark:text-white">Quantity:</span>
                <div className="flex items-center bg-gray-100 dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-3 hover:bg-gray-200 dark:hover:bg-slate-700 transition-colors rounded-l-xl"
                  >
                    <Minus size={16} className="text-gray-900 dark:text-white" />
                  </button>
                  <span className="px-6 py-3 font-bold text-gray-900 dark:text-white">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-3 hover:bg-gray-200 dark:hover:bg-slate-700 transition-colors rounded-r-xl"
                  >
                    <Plus size={16} className="text-gray-900 dark:text-white" />
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
                  disabled={!product.inStock}
                  className="flex-1 bg-slate-900 dark:bg-white hover:bg-slate-800 dark:hover:bg-gray-100 disabled:bg-gray-300 dark:disabled:bg-gray-700 disabled:cursor-not-allowed text-white dark:text-slate-900 py-4 px-6 rounded-xl font-bold flex items-center justify-center gap-2 transition-all shadow-lg"
                >
                  <ShoppingCart size={20} />
                  <span>{product.inStock ? 'Add to Cart' : 'Out of Stock'}</span>
                </motion.button>

                <div className="flex gap-3">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setIsWishlisted(!isWishlisted)}
                    className={`p-4 rounded-xl border-2 transition-all ${isWishlisted
                        ? 'border-red-500 bg-red-50 dark:bg-red-900/20 text-red-500'
                        : 'border-gray-200 dark:border-slate-700 hover:border-red-500 text-gray-600 dark:text-gray-400 hover:text-red-500'
                      }`}
                  >
                    <Heart size={20} className={isWishlisted ? 'fill-current' : ''} />
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="p-4 rounded-xl border-2 border-gray-200 dark:border-slate-700 hover:border-blue-500 text-gray-600 dark:text-gray-400 hover:text-blue-500 transition-all"
                  >
                    <Share2 size={20} />
                  </motion.button>
                </div>
              </div>
            </div>

            {/* Product Details */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-gray-100 dark:border-slate-800">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Product Details</h3>
              <div className="space-y-3 text-gray-600 dark:text-gray-400">
                <div className="flex justify-between py-2 border-b border-gray-100 dark:border-slate-800">
                  <span className="font-medium">Category</span>
                  <span>{product.category}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-100 dark:border-slate-800">
                  <span className="font-medium">Weight</span>
                  <span>{product.weight}</span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="font-medium">Rating</span>
                  <span>{product.rating}/5 ({product.reviews} reviews)</span>
                </div>
              </div>
            </div>

            {/* Benefits */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-gray-100 dark:border-slate-800">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Key Benefits</h3>
              <ul className="space-y-3">
                {product.benefits.map((benefit, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    </div>
                    <span className="text-gray-600 dark:text-gray-400 leading-relaxed">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="flex items-center gap-3 bg-gray-50 dark:bg-slate-900 p-4 rounded-xl border border-gray-100 dark:border-slate-800">
                <Truck size={20} className="text-blue-600 dark:text-blue-400" />
                <span className="text-sm font-medium text-gray-900 dark:text-white">Free Shipping</span>
              </div>
              <div className="flex items-center gap-3 bg-gray-50 dark:bg-slate-900 p-4 rounded-xl border border-gray-100 dark:border-slate-800">
                <ShieldCheck size={20} className="text-green-600 dark:text-green-400" />
                <span className="text-sm font-medium text-gray-900 dark:text-white">Vet Approved</span>
              </div>
              <div className="flex items-center gap-3 bg-gray-50 dark:bg-slate-900 p-4 rounded-xl border border-gray-100 dark:border-slate-800">
                <RotateCcw size={20} className="text-purple-600 dark:text-purple-400" />
                <span className="text-sm font-medium text-gray-900 dark:text-white">90-Day Guarantee</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}