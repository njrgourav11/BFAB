"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Trash2, Plus, Minus, ShoppingCart, Truck, Lock, ArrowRight, Tag, Check } from 'lucide-react';
import { useCart } from '../components/CartContext';

const CartPage = () => {
  const { cartItems, updateQuantity, removeFromCart } = useCart();

  const [discountCode, setDiscountCode] = useState('');
  const [discountApplied, setDiscountApplied] = useState(false);
  const [shippingOption, setShippingOption] = useState('standard');

  // Calculate totals
  const subtotal = cartItems.reduce((total, item) => total + parseFloat(item.price.slice(1)) * item.quantity, 0);
  const savings = 0;

  const shippingCosts: Record<string, number> = {
    standard: 9.99,
    express: 24.99,
    overnight: 49.99,
  };

  const shipping = shippingCosts[shippingOption];
  const discountAmount = discountApplied ? subtotal * 0.15 : 0; // 15% discount
  const tax = (subtotal - discountAmount) * 0.1;
  const total = subtotal - discountAmount + tax + shipping;

  // Apply discount code
  const applyDiscount = () => {
    if (discountCode.trim().toUpperCase() === 'SAVE15') {
      setDiscountApplied(true);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-950 transition-colors duration-300 font-sans">
      {/* Header */}
      <div className="bg-slate-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-3 mb-2">
            <ShoppingCart size={32} className="text-blue-400" />
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight">Shopping Cart</h1>
          </div>
          <p className="text-gray-400 ml-11">Review and manage your items</p>
        </div>
      </div>

      {/* Progress Indicator */}
      <div className="bg-white dark:bg-slate-900 border-b border-gray-200 dark:border-slate-800 sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-center max-w-2xl mx-auto">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-sm">1</div>
              <span className="text-sm font-semibold text-gray-900 dark:text-white">Cart</span>
            </div>
            <div className="w-24 h-0.5 bg-gray-200 dark:bg-slate-700 mx-4"></div>
            <div className="flex items-center gap-3 opacity-50">
              <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-slate-800 text-gray-500 dark:text-gray-400 flex items-center justify-center font-bold text-sm">2</div>
              <span className="text-sm font-semibold text-gray-500 dark:text-gray-400">Checkout</span>
            </div>
            <div className="w-24 h-0.5 bg-gray-200 dark:bg-slate-700 mx-4"></div>
            <div className="flex items-center gap-3 opacity-50">
              <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-slate-800 text-gray-500 dark:text-gray-400 flex items-center justify-center font-bold text-sm">3</div>
              <span className="text-sm font-semibold text-gray-500 dark:text-gray-400">Confirmation</span>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items Section */}
          <div className="lg:col-span-2 w-full">
            <AnimatePresence>
              {cartItems.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="text-center py-20 bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-800"
                >
                  <div className="w-20 h-20 bg-gray-100 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-6">
                    <ShoppingCart size={40} className="text-gray-400" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Your cart is empty</h3>
                  <p className="text-gray-500 dark:text-gray-400 mb-8">Looks like you haven't added any items yet.</p>
                  <Link
                    href="/products"
                    className="inline-block bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-8 py-4 rounded-xl font-bold hover:shadow-lg transition-all"
                  >
                    Start Shopping
                  </Link>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="space-y-6"
                >
                  {cartItems.map((item, index) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ delay: index * 0.05 }}
                      className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-slate-800 flex flex-col sm:flex-row gap-6 items-center sm:items-start"
                    >
                      {/* Product Image */}
                      <div className="w-28 h-28 sm:w-36 sm:h-36 bg-gray-50 dark:bg-slate-800 rounded-2xl flex-shrink-0 overflow-hidden relative group">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-contain p-3 group-hover:scale-110 transition-transform duration-300"
                        />
                      </div>

                      {/* Product Details */}
                      <div className="flex-1 w-full text-center sm:text-left">
                        <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-4">
                          <div className="flex-1">
                            <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-2 leading-tight">{item.name}</h3>
                            <div className="flex items-center gap-2 justify-center sm:justify-start">
                              <span className="inline-flex items-center px-2.5 py-1 rounded-lg bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 text-xs font-semibold">
                                {item.productCategory}
                              </span>
                              <span className="inline-flex items-center px-2.5 py-1 rounded-lg bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300 text-xs font-semibold">
                                {item.petType}
                              </span>
                            </div>
                          </div>
                          <div className="flex flex-col items-center sm:items-end">
                            <div className="text-2xl font-bold text-gray-900 dark:text-white">
                              ₹{parseFloat(item.price.slice(1)).toFixed(2)}
                            </div>
                            <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                              ₹{(parseFloat(item.price.slice(1)) * item.quantity).toFixed(2)} total
                            </div>
                          </div>
                        </div>

                        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-gray-100 dark:border-slate-800">
                          {/* Quantity Controls */}
                          <div className="flex items-center gap-2">
                            <span className="text-sm text-gray-600 dark:text-gray-400 font-medium mr-2">Quantity:</span>
                            <div className="flex items-center gap-1 bg-gray-100 dark:bg-slate-800 rounded-xl p-1 border border-gray-200 dark:border-slate-700">
                              <button
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                className="p-2 hover:bg-white dark:hover:bg-slate-700 rounded-lg transition-all text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                              >
                                <Minus size={16} />
                              </button>
                              <span className="w-12 text-center font-bold text-gray-900 dark:text-white text-lg">{item.quantity}</span>
                              <button
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                className="p-2 hover:bg-white dark:hover:bg-slate-700 rounded-lg transition-all text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                              >
                                <Plus size={16} />
                              </button>
                            </div>
                          </div>

                          {/* Remove Button */}
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="flex items-center gap-2 px-4 py-2 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/30 rounded-lg text-sm font-semibold transition-all"
                          >
                            <Trash2 size={16} />
                            Remove
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Continue Shopping Link */}
            {cartItems.length > 0 && (
              <div className="mt-8">
                <Link
                  href="/products"
                  className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 font-medium hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  <ArrowRight size={16} className="rotate-180" />
                  Continue Shopping
                </Link>
              </div>
            )}
          </div>

          {/* Order Summary Section */}
          {cartItems.length > 0 && (
            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-6">
                {/* Discount Code Section */}
                <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-slate-800">
                  <label className="block text-sm font-bold text-gray-900 dark:text-white mb-3">Discount Code</label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Enter code"
                      value={discountCode}
                      onChange={(e) => setDiscountCode(e.target.value)}
                      className="flex-1 px-4 py-2.5 bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all text-sm"
                    />
                    <button
                      onClick={applyDiscount}
                      disabled={discountApplied || !discountCode}
                      className="px-4 py-2.5 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-xl font-bold text-sm hover:opacity-90 transition disabled:opacity-50"
                    >
                      Apply
                    </button>
                  </div>
                  {discountApplied && (
                    <div className="flex items-center gap-2 mt-3 text-green-600 dark:text-green-400 text-sm font-medium">
                      <Check size={16} />
                      <span>Code SAVE15 applied successfully!</span>
                    </div>
                  )}
                </div>

                {/* Shipping Options */}
                <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-slate-800">
                  <div className="flex items-center gap-2 mb-4">
                    <Truck size={18} className="text-blue-600 dark:text-blue-400" />
                    <label className="text-sm font-bold text-gray-900 dark:text-white">Shipping Method</label>
                  </div>
                  <div className="space-y-2">
                    {[
                      { id: 'standard', label: 'Standard', days: '5-7 days', price: 9.99, icon: '📦' },
                      { id: 'express', label: 'Express', days: '2-3 days', price: 24.99, icon: '⚡' },
                      { id: 'overnight', label: 'Overnight', days: 'Next day', price: 49.99, icon: '🚀' },
                    ].map((option) => (
                      <label
                        key={option.id}
                        className={`flex items-center justify-between p-4 rounded-xl border-2 cursor-pointer transition-all ${shippingOption === option.id
                          ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 shadow-sm'
                          : 'border-gray-200 dark:border-slate-700 hover:border-blue-300 dark:hover:border-blue-700'
                          }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${shippingOption === option.id ? 'border-blue-500' : 'border-gray-300 dark:border-slate-600'}`}>
                            {shippingOption === option.id && <div className="w-2.5 h-2.5 rounded-full bg-blue-500"></div>}
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="text-lg">{option.icon}</span>
                              <span className="text-sm font-bold text-gray-900 dark:text-white">{option.label}</span>
                            </div>
                            <span className="text-xs text-gray-500 dark:text-gray-400 ml-8">{option.days}</span>
                          </div>
                        </div>
                        <span className="text-sm font-bold text-gray-900 dark:text-white">₹{option.price.toFixed(2)}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Order Summary */}
                <div className="bg-gradient-to-br from-slate-900 to-slate-800 dark:from-slate-900 dark:to-black rounded-2xl p-6 shadow-lg border border-slate-700">
                  <h3 className="text-lg font-bold text-white mb-6">Order Summary</h3>
                  <div className="space-y-4 mb-6 pb-6 border-b border-slate-700">
                    <div className="flex justify-between text-gray-300 text-sm">
                      <span>Subtotal ({cartItems.length} {cartItems.length === 1 ? 'item' : 'items'})</span>
                      <span className="font-semibold text-white">₹{subtotal.toFixed(2)}</span>
                    </div>
                    {discountApplied && (
                      <div className="flex justify-between text-green-400 text-sm">
                        <span className="flex items-center gap-1">
                          <Tag size={14} />
                          Discount (15%)
                        </span>
                        <span className="font-bold">-₹{discountAmount.toFixed(2)}</span>
                      </div>
                    )}
                    <div className="flex justify-between text-gray-300 text-sm">
                      <span>Shipping</span>
                      <span className="font-semibold text-white">₹{shipping.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-gray-300 text-sm">
                      <span>Tax (10%)</span>
                      <span className="font-semibold text-white">₹{tax.toFixed(2)}</span>
                    </div>
                  </div>

                  {discountApplied && (
                    <div className="bg-green-500/20 border border-green-500/30 rounded-xl p-3 mb-6">
                      <div className="flex items-center gap-2 text-green-400 text-sm font-semibold">
                        <Check size={16} />
                        <span>You're saving ₹{discountAmount.toFixed(2)}!</span>
                      </div>
                    </div>
                  )}

                  <div className="flex justify-between items-center mb-6 p-4 bg-white/5 rounded-xl">
                    <span className="text-lg font-bold text-white">Total</span>
                    <span className="text-3xl font-bold text-white">
                      ₹{total.toFixed(2)}
                    </span>
                  </div>

                  <Link href="/checkout" className="block">
                    <button className="w-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold py-4 px-6 rounded-xl hover:shadow-lg transition-all flex items-center justify-center gap-2">
                      Proceed to Checkout
                      <ArrowRight size={20} />
                    </button>
                  </Link>

                  <div className="mt-6 flex items-center justify-center gap-4 text-gray-400 dark:text-gray-500">
                    <div className="flex items-center gap-1.5 text-xs font-medium">
                      <Lock size={14} />
                      Secure Checkout
                    </div>
                    <div className="flex items-center gap-1.5 text-xs font-medium">
                      <Truck size={14} />
                      Fast Shipping
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CartPage;