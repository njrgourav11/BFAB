"use client";
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Trash2, Plus, Minus, ShoppingCart, ArrowRight, Lock, Truck, ShieldCheck } from 'lucide-react';
import { useCart } from '../components/CartContext';

const CartPage = () => {
  const { cartItems, updateQuantity, removeFromCart } = useCart();

  // Calculate totals
  // Calculate totals
  const subtotal = cartItems.reduce((total, item) => total + parseFloat(item.price.replace(/[^0-9.]/g, '')) * item.quantity, 0);

  const shipping = subtotal > 0 && subtotal < 1000 ? 100 : 0;
  const convenienceFee = subtotal * 0.03;
  const tax = subtotal * 0.18; // 18% GST

  const total = subtotal + tax + shipping + convenienceFee;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-black transition-colors duration-300 font-sans selection:bg-blue-100 dark:selection:bg-blue-900">

      {/* Progress Header */}
      <div className="bg-white dark:bg-black border-b border-slate-200 dark:border-slate-800 sticky top-0 z-40 supports-[backdrop-filter]:bg-white/80 dark:supports-[backdrop-filter]:bg-black/80 backdrop-blur-md">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-center max-w-xl mx-auto">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-slate-900 dark:bg-white text-white dark:text-black flex items-center justify-center font-bold text-xs ring-4 ring-slate-100 dark:ring-slate-900">1</div>
              <span className="text-sm font-bold text-slate-900 dark:text-white">Cart</span>
            </div>
            <div className="flex-1 h-px bg-slate-200 dark:bg-slate-800 mx-4"></div>
            <div className="flex items-center gap-2 opacity-40">
              <div className="w-6 h-6 rounded-full bg-slate-200 dark:bg-slate-800 text-slate-500 dark:text-slate-400 flex items-center justify-center font-bold text-xs">2</div>
              <span className="text-sm font-medium text-slate-500 dark:text-slate-400">Checkout</span>
            </div>
            <div className="flex-1 h-px bg-slate-200 dark:bg-slate-800 mx-4"></div>
            <div className="flex items-center gap-2 opacity-40">
              <div className="w-6 h-6 rounded-full bg-slate-200 dark:bg-slate-800 text-slate-500 dark:text-slate-400 flex items-center justify-center font-bold text-xs">3</div>
              <span className="text-sm font-medium text-slate-500 dark:text-slate-400">Done</span>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 lg:py-16">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-8 tracking-tight">
            Shopping Cart <span className="text-slate-400 dark:text-slate-600 font-normal text-2xl ml-2">({cartItems.length})</span>
          </h1>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">

            {/* Cart Items List */}
            <div className="lg:col-span-8 w-full">
              <AnimatePresence mode='popLayout'>
                {cartItems.length === 0 ? (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="text-center py-24 bg-white dark:bg-slate-900/50 rounded-3xl border border-dashed border-slate-200 dark:border-slate-800"
                  >
                    <div className="w-24 h-24 bg-slate-50 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-6 text-slate-300 dark:text-slate-600">
                      <ShoppingCart size={48} strokeWidth={1.5} />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Your cart is empty</h3>
                    <p className="text-slate-500 dark:text-slate-400 mb-8 max-w-sm mx-auto">Looks like you haven't discovered our premium treats yet.</p>
                    <Link
                      href="/products"
                      className="inline-flex items-center justify-center px-8 py-3 bg-slate-900 dark:bg-white text-white dark:text-black font-bold rounded-full hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
                    >
                      Start Shopping
                    </Link>
                  </motion.div>
                ) : (
                  <div className="space-y-6">
                    {cartItems.map((item, index) => (
                      <motion.div
                        layout
                        key={item.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ delay: index * 0.05 }}
                        className="group bg-white dark:bg-slate-900 rounded-3xl p-4 sm:p-6 border border-slate-100 dark:border-slate-800 shadow-sm hover:border-slate-200 dark:hover:border-slate-700 transition-colors"
                      >
                        <div className="flex flex-col sm:flex-row gap-6 items-center sm:items-stretch">
                          {/* Image */}
                          <div className="w-32 h-32 sm:w-40 sm:h-40 bg-slate-50 dark:bg-slate-800/50 rounded-2xl flex-shrink-0 relative overflow-hidden">
                            <Image
                              src={item.image}
                              alt={item.name}
                              fill
                              className="object-contain p-4 group-hover:scale-105 transition-transform duration-500"
                            />
                          </div>

                          {/* Content */}
                          <div className="flex-1 flex flex-col justify-between w-full text-center sm:text-left">
                            <div>
                              <div className="flex flex-col sm:flex-row justify-between items-start gap-2 mb-2">
                                <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white leading-tight">
                                  {item.name}
                                </h3>
                                <p className="text-lg font-bold text-slate-900 dark:text-white">
                                  ₹{parseFloat(item.price.replace(/[^0-9.]/g, '')).toFixed(2)}
                                </p>
                              </div>
                              <div className="flex flex-wrap gap-2 justify-center sm:justify-start mb-4">
                                <span className="px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-xs font-semibold uppercase tracking-wider">
                                  {item.petType}
                                </span>
                                <span className="px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-xs font-semibold uppercase tracking-wider">
                                  {item.productCategory}
                                </span>
                              </div>
                            </div>

                            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                              {/* Quantity */}
                              <div className="flex items-center gap-3 bg-slate-50 dark:bg-slate-800 rounded-full p-1 pl-4 border border-slate-200 dark:border-slate-700">
                                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Qty</span>
                                <div className="flex items-center gap-1">
                                  <button
                                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                    className="w-8 h-8 flex items-center justify-center rounded-full bg-white dark:bg-slate-700 text-slate-600 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-600 transition-colors shadow-sm"
                                  >
                                    <Minus size={14} />
                                  </button>
                                  <span className="w-8 text-center font-bold text-slate-900 dark:text-white">
                                    {item.quantity}
                                  </span>
                                  <button
                                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                    className="w-8 h-8 flex items-center justify-center rounded-full bg-white dark:bg-slate-700 text-slate-600 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-600 transition-colors shadow-sm"
                                  >
                                    <Plus size={14} />
                                  </button>
                                </div>
                              </div>

                              {/* Remove */}
                              <button
                                onClick={() => removeFromCart(item.id)}
                                className="text-slate-400 hover:text-red-500 transition-colors p-2"
                                aria-label="Remove item"
                              >
                                <Trash2 size={20} />
                              </button>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </AnimatePresence>

              {cartItems.length > 0 && (
                <div className="mt-8">
                  <Link
                    href="/products"
                    className="inline-flex items-center gap-2 text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white font-medium transition-colors group"
                  >
                    <ArrowRight size={18} className="rotate-180 group-hover:-translate-x-1 transition-transform" />
                    Continue Shopping
                  </Link>
                </div>
              )}
            </div>

            {/* Order Summary */}
            {cartItems.length > 0 && (
              <div className="lg:col-span-4">
                <div className="sticky top-28">
                  <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 lg:p-8 border border-slate-200 dark:border-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-none">
                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Order Summary</h2>

                    <div className="space-y-4 mb-8">
                      <div className="flex justify-between text-slate-600 dark:text-slate-400">
                        <span>Subtotal</span>
                        <span className="font-semibold text-slate-900 dark:text-white">₹{subtotal.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between text-slate-600 dark:text-slate-400">
                        <span>Shipping</span>
                        <span className={shipping === 0 ? "font-semibold text-green-600 dark:text-green-400" : "font-semibold text-slate-900 dark:text-white"}>
                          {shipping === 0 ? 'Free' : `₹${shipping.toFixed(2)}`}
                        </span>
                      </div>
                      <div className="flex justify-between text-slate-600 dark:text-slate-400">
                        <span>Convenience Fee (3%)</span>
                        <span className="font-semibold text-slate-900 dark:text-white">₹{convenienceFee.toFixed(2)}</span>
                      </div>
                      <div className="pt-4 border-t border-dashed border-slate-200 dark:border-slate-700">
                        <div className="flex justify-between items-end">
                          <span className="text-base font-bold text-slate-900 dark:text-white">Total</span>
                          <span className="text-3xl font-bold text-slate-900 dark:text-white">
                            ₹{total.toFixed(2)}
                          </span>
                        </div>
                        <p className="text-xs text-slate-400 text-right mt-1">Including all taxes</p>
                      </div>
                    </div>

                    <Link href="/checkout" className="block w-full">
                      <button className="w-full py-4 bg-slate-900 dark:bg-white text-white dark:text-black rounded-xl font-bold text-lg hover:shadow-lg hover:scale-[1.02] transition-all duration-300 flex items-center justify-center gap-2 group">
                        Checkout
                        <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                      </button>
                    </Link>

                    <div className="mt-6 space-y-3">
                      <div className="flex items-center justify-center gap-2 text-xs font-semibold text-slate-400 uppercase tracking-widest">
                        <Lock size={12} /> Secure Checkout
                      </div>
                      <div className="flex justify-center gap-4 opacity-50 grayscale">
                        {/* Payment Icons handled elsewhere or can be added as SVGs here if needed for trust signals */}
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 bg-blue-50 dark:bg-blue-900/10 rounded-2xl p-4 flex items-start gap-3 border border-blue-100 dark:border-blue-900/30">
                    <ShieldCheck className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-bold text-blue-900 dark:text-blue-200">Buyer Protection</p>
                      <p className="text-xs text-blue-700 dark:text-blue-400/80 mt-1">
                        Your purchase is secured. We ensure genuine products and safe delivery for your pets.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;