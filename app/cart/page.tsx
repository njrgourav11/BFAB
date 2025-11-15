"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Trash2, Plus, Minus, ShoppingCart, Truck, Lock, Gift, ArrowRight, Tag, AlertCircle } from 'lucide-react';

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
  originalPrice?: number;
}

const CartPage = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: 1,
      name: 'Premium Dog Food',
      price: 59.99,
      originalPrice: 79.99,
      quantity: 1,
      image: '/globe.svg',
    },
    {
      id: 2,
      name: 'Organic Cat Food',
      price: 49.99,
      originalPrice: 64.99,
      quantity: 2,
      image: '/globe.svg',
    },
    {
      id: 3,
      name: 'Pet Training Treats',
      price: 24.99,
      quantity: 1,
      image: '/globe.svg',
    },
  ]);

  const [discountCode, setDiscountCode] = useState('');
  const [discountApplied, setDiscountApplied] = useState(false);
  const [shippingOption, setShippingOption] = useState('standard');

  // Calculate totals
  const subtotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  const originalTotal = cartItems.reduce((total, item) => total + (item.originalPrice || item.price) * item.quantity, 0);
  const savings = originalTotal - subtotal;

  const shippingCosts: Record<string, number> = {
    standard: 9.99,
    express: 24.99,
    overnight: 49.99,
  };

  const shipping = shippingCosts[shippingOption];
  const discountAmount = discountApplied ? subtotal * 0.15 : 0; // 15% discount
  const tax = (subtotal - discountAmount) * 0.1;
  const total = subtotal - discountAmount + tax + shipping;

  // Update quantity
  const updateQuantity = (id: number, quantity: number) => {
    if (quantity <= 0) {
      removeItem(id);
    } else {
      setCartItems(cartItems.map(item => 
        item.id === id ? { ...item, quantity } : item
      ));
    }
  };

  // Remove item
  const removeItem = (id: number) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  // Apply discount code
  const applyDiscount = () => {
    if (discountCode.trim().toUpperCase() === 'SAVE15') {
      setDiscountApplied(true);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-cyan-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 via-blue-700 to-cyan-800 text-white py-8 sm:py-12">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-2 sm:gap-3 mb-4">
            <ShoppingCart size={28} className="sm:w-8 sm:h-8" />
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold">Shopping Cart</h1>
          </div>
          <p className="text-sm sm:text-base text-blue-100">Review and manage your items</p>
        </div>
      </div>

      {/* Progress Indicator */}
      <div className="bg-white border-b sticky top-0 z-40">
        <div className="container mx-auto px-4 py-3 sm:py-4">
          <div className="flex items-center justify-between gap-2 sm:gap-4 overflow-x-auto">
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              className="flex items-center gap-2"
            >
              <div className="w-10 h-10 rounded-full bg-green-500 text-white flex items-center justify-center font-bold">✓</div>
              <span className="text-sm font-semibold text-gray-700">Cart</span>
            </motion.div>
            <div className="flex-1 h-1 bg-gray-200 mx-4">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: '100%' }}
                transition={{ duration: 0.8 }}
                className="h-full bg-blue-500"
              />
            </div>
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3 }}
              className="flex items-center gap-2"
            >
              <div className="w-10 h-10 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold">2</div>
              <span className="text-sm font-semibold text-gray-700">Checkout</span>
            </motion.div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 sm:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
          {/* Cart Items Section */}
          <div className="lg:col-span-2 w-full">
            <AnimatePresence>
              {cartItems.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="text-center py-16 bg-white rounded-2xl shadow-sm"
                >
                  <ShoppingCart size={64} className="mx-auto text-gray-300 mb-4" />
                  <h3 className="text-2xl font-bold text-gray-700 mb-2">Your cart is empty</h3>
                  <p className="text-gray-600 mb-6">Looks like you haven't added any items yet.</p>
                  <Link
                    href="/shop-now"
                    className="inline-block bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition"
                  >
                    Continue Shopping
                  </Link>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="space-y-4"
                >
                  <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-6">Items ({cartItems.length})</h2>
                  {cartItems.map((item, index) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-white rounded-2xl p-4 sm:p-6 shadow-sm hover:shadow-md transition border border-gray-100"
                    >
                      <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
                        {/* Product Image */}
                        <motion.div
                          whileHover={{ scale: 1.05 }}
                          className="w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 bg-gradient-to-br from-blue-100 to-cyan-100 rounded-lg flex items-center justify-center flex-shrink-0 overflow-hidden"
                        >
                          <Image
                            src={item.image}
                            alt={item.name}
                            width={120}
                            height={120}
                            className="w-full h-full object-cover"
                          />
                        </motion.div>

                        {/* Product Details */}
                        <div className="flex-1 min-w-0">
                          <h3 className="text-base sm:text-lg md:text-xl font-bold text-gray-800 mb-2 truncate">{item.name}</h3>
                          <div className="flex items-baseline gap-2 mb-4">
                            <span className="text-2xl font-bold text-blue-600">${item.price.toFixed(2)}</span>
                            {item.originalPrice && (
                              <>
                                <span className="text-lg text-gray-400 line-through">${item.originalPrice.toFixed(2)}</span>
                                <span className="text-sm font-bold text-green-600 bg-green-50 px-3 py-1 rounded-full">
                                  Save {Math.round(((item.originalPrice - item.price) / item.originalPrice) * 100)}%
                                </span>
                              </>
                            )}
                          </div>

                          {/* Quantity Controls */}
                          <div className="flex flex-wrap items-center gap-2 sm:gap-4">
                            <div className="flex items-center border-2 border-gray-200 rounded-lg">
                              <motion.button
                                whileHover={{ backgroundColor: '#f3f4f6' }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                className="p-2 transition"
                              >
                                <Minus size={16} className="sm:w-5 sm:h-5 text-gray-600" />
                              </motion.button>
                              <span className="px-4 sm:px-6 py-2 font-bold text-gray-800 bg-gray-50 min-w-12 text-center text-sm sm:text-base">
                                {item.quantity}
                              </span>
                              <motion.button
                                whileHover={{ backgroundColor: '#f3f4f6' }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                className="p-2 transition"
                              >
                                <Plus size={16} className="sm:w-5 sm:h-5 text-gray-600" />
                              </motion.button>
                            </div>

                            {/* Remove Button */}
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => removeItem(item.id)}
                              className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition"
                            >
                              <Trash2 size={18} className="sm:w-5 sm:h-5" />
                            </motion.button>
                          </div>
                        </div>

                        {/* Total Price */}
                        <div className="text-right sm:text-right flex-shrink-0">
                          <p className="text-xs sm:text-sm text-gray-600 mb-2">Subtotal</p>
                          <p className="text-xl sm:text-2xl md:text-3xl font-bold text-blue-600">
                            ${(item.price * item.quantity).toFixed(2)}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Continue Shopping Link */}
            {cartItems.length > 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="mt-6"
              >
                <Link
                  href="/shop-now"
                  className="inline-flex items-center gap-2 text-blue-600 font-semibold hover:text-blue-700 transition"
                >
                  ← Continue Shopping
                </Link>
              </motion.div>
            )}
          </div>

          {/* Order Summary Section */}
          {cartItems.length > 0 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="lg:col-span-1"
            >
              {/* Savings Alert */}
              {savings > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-gradient-to-r from-green-50 to-emerald-50 border-l-4 border-green-500 p-4 rounded-lg mb-6"
                >
                  <div className="flex items-start gap-3">
                    <Tag size={20} className="text-green-600 flex-shrink-0 mt-1" />
                    <div>
                      <p className="font-bold text-green-800 text-lg">${savings.toFixed(2)}</p>
                      <p className="text-sm text-green-700">You're saving on this order!</p>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Discount Code Section */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-6"
              >
                <label className="block text-sm font-bold text-gray-700 mb-3">Have a discount code?</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Enter code (Try: SAVE15)"
                    value={discountCode}
                    onChange={(e) => setDiscountCode(e.target.value)}
                    className="flex-1 px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 transition"
                  />
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={applyDiscount}
                    disabled={discountApplied}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition disabled:bg-gray-400"
                  >
                    Apply
                  </motion.button>
                </div>
                {discountApplied && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-green-600 text-sm font-semibold mt-2"
                  >
                    ✓ Discount applied!
                  </motion.p>
                )}
              </motion.div>

              {/* Shipping Options */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-white rounded-2xl p-4 sm:p-6 shadow-sm border border-gray-100 mb-6"
              >
                <label className="block text-xs sm:text-sm font-bold text-gray-700 mb-4">Shipping Method</label>
                <div className="space-y-2 sm:space-y-3">
                  {[
                    { id: 'standard', label: 'Standard (5-7 days)', price: 9.99 },
                    { id: 'express', label: 'Express (2-3 days)', price: 24.99 },
                    { id: 'overnight', label: 'Overnight', price: 49.99 },
                  ].map((option) => (
                    <motion.label
                      key={option.id}
                      whileHover={{ backgroundColor: '#f9fafb' }}
                      className="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 border-2 rounded-lg cursor-pointer transition"
                      style={{
                        borderColor: shippingOption === option.id ? '#3b82f6' : '#e5e7eb',
                        backgroundColor: shippingOption === option.id ? '#eff6ff' : 'transparent',
                      }}
                    >
                      <input
                        type="radio"
                        name="shipping"
                        value={option.id}
                        checked={shippingOption === option.id}
                        onChange={(e) => setShippingOption(e.target.value)}
                        className="w-4 h-4 flex-shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-gray-800 text-xs sm:text-sm">{option.label}</p>
                      </div>
                      <p className="font-bold text-blue-600 text-xs sm:text-base flex-shrink-0">${option.price.toFixed(2)}</p>
                    </motion.label>
                  ))}
                </div>
              </motion.div>

              {/* Order Summary */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-4 sm:p-6 shadow-sm border border-blue-200 mb-6"
              >
                <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-6">Order Summary</h3>
                <div className="space-y-2 sm:space-y-3 mb-6 pb-6 border-b border-blue-200">
                  <div className="flex justify-between text-gray-700 text-xs sm:text-sm">
                    <span>Subtotal</span>
                    <span className="font-semibold">${subtotal.toFixed(2)}</span>
                  </div>
                  {discountApplied && (
                    <div className="flex justify-between text-green-700 text-xs sm:text-sm">
                      <span className="font-semibold">Discount (15%)</span>
                      <span className="font-bold">-${discountAmount.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-gray-700 text-xs sm:text-sm">
                    <span>Shipping</span>
                    <span className="font-semibold">${shipping.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-700 text-xs sm:text-sm">
                    <span>Tax (10%)</span>
                    <span className="font-semibold">${tax.toFixed(2)}</span>
                  </div>
                </div>

                <div className="flex justify-between items-center mb-6">
                  <span className="text-lg sm:text-xl font-bold text-gray-800">Total</span>
                  <motion.span
                    initial={{ scale: 0.8 }}
                    animate={{ scale: 1 }}
                    className="text-3xl font-bold text-blue-600"
                  >
                    ${total.toFixed(2)}
                  </motion.span>
                </div>

                {/* Checkout Button */}
                <motion.button
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-bold py-3 sm:py-4 px-4 sm:px-6 rounded-xl transition flex items-center justify-center gap-2 shadow-lg hover:shadow-xl text-sm sm:text-base"
                >
                  Proceed to Checkout
                  <ArrowRight size={18} className="sm:w-5 sm:h-5" />
                </motion.button>
              </motion.div>

              {/* Trust Badges */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="grid grid-cols-2 gap-2 sm:gap-3"
              >
                <div className="text-center p-2 sm:p-3 bg-white rounded-lg border border-gray-100">
                  <Lock size={18} className="sm:w-5 sm:h-5 mx-auto text-blue-600 mb-1" />
                  <p className="text-xs font-semibold text-gray-700">Secure Payment</p>
                </div>
                <div className="text-center p-2 sm:p-3 bg-white rounded-lg border border-gray-100">
                  <Truck size={18} className="sm:w-5 sm:h-5 mx-auto text-blue-600 mb-1" />
                  <p className="text-xs font-semibold text-gray-700">Fast Shipping</p>
                </div>
              </motion.div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CartPage;