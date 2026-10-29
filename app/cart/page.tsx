"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Trash2, Plus, Minus, ShoppingCart, ArrowRight, Lock, ShieldCheck, Ticket, Check, X, Tag, Sparkles, Loader2 } from 'lucide-react';
import { useCart } from '../components/CartContext';

const CartPage = () => {
  const {
    cartItems,
    updateQuantity,
    removeFromCart,
    appliedCoupon,
    couponError,
    applyCoupon,
    removeCoupon,
    getDiscountAmount,
    getDiscountedSubtotal
  } = useCart();

  const [inputCoupon, setInputCoupon] = useState('');
  const [applying, setApplying] = useState(false);
  const [applySuccess, setApplySuccess] = useState<string | null>(null);

  // Calculate totals
  const subtotal = cartItems.reduce((total, item) => total + parseFloat(item.price.replace(/[^0-9.]/g, '')) * item.quantity, 0);
  const discount = getDiscountAmount();
  const discountedSubtotal = Math.max(0, subtotal - discount);

  const shipping = discountedSubtotal > 0 && discountedSubtotal < 1000 ? 100 : 0;
  const convenienceFee = discountedSubtotal * 0.03;
  const tax = discountedSubtotal * 0.18; // 18% GST

  const total = discountedSubtotal + tax + shipping + convenienceFee;

  const handleApplyCoupon = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputCoupon.trim()) return;

    setApplying(true);
    setApplySuccess(null);
    const res = await applyCoupon(inputCoupon);
    setApplying(false);

    if (res.success) {
      setApplySuccess(res.message);
      setInputCoupon('');
      setTimeout(() => setApplySuccess(null), 4000);
    }
  };

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

      <div className="container mx-auto px-4 py-8 lg:py-12">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 dark:text-white tracking-tight">
              Shopping Cart <span className="text-slate-400 dark:text-slate-600 font-normal text-xl sm:text-2xl ml-2">({cartItems.length} items)</span>
            </h1>
            {appliedCoupon && (
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 rounded-full text-emerald-800 dark:text-emerald-300 text-xs sm:text-sm font-medium">
                <Sparkles size={14} className="text-emerald-500" />
                <span>Team coupon applied: <strong>{appliedCoupon.code}</strong> ({appliedCoupon.groupName})</span>
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">

            {/* Cart Items List */}
            <div className="lg:col-span-8 w-full">
              <AnimatePresence mode='popLayout'>
                {cartItems.length === 0 ? (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="text-center py-20 bg-white dark:bg-slate-900/50 rounded-3xl border border-dashed border-slate-200 dark:border-slate-800"
                  >
                    <div className="w-20 h-20 bg-slate-50 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-6 text-slate-300 dark:text-slate-600">
                      <ShoppingCart size={40} strokeWidth={1.5} />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Your cart is empty</h3>
                    <p className="text-slate-500 dark:text-slate-400 mb-8 max-w-sm mx-auto">Explore our fresh vet-formulated nutrition and treats for your pets.</p>
                    <Link
                      href="/products"
                      className="inline-flex items-center justify-center px-8 py-3 bg-slate-900 dark:bg-white text-white dark:text-black font-bold rounded-full hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
                    >
                      Start Shopping
                    </Link>
                  </motion.div>
                ) : (
                  <div className="space-y-4">
                    {cartItems.map((item, index) => (
                      <motion.div
                        layout
                        key={item.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ delay: index * 0.05 }}
                        className="group bg-white dark:bg-slate-900 rounded-2xl p-4 sm:p-5 border border-slate-100 dark:border-slate-800 shadow-sm hover:border-slate-200 dark:hover:border-slate-700 transition-colors"
                      >
                        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 items-center sm:items-stretch">
                          {/* Image */}
                          <div className="w-24 h-24 sm:w-28 sm:h-28 bg-slate-50 dark:bg-slate-800/50 rounded-xl flex-shrink-0 relative overflow-hidden">
                            <Image
                              src={item.image}
                              alt={item.name}
                              fill
                              className="object-contain p-2 group-hover:scale-105 transition-transform duration-500"
                            />
                          </div>

                          {/* Content */}
                          <div className="flex-1 flex flex-col justify-between w-full text-center sm:text-left">
                            <div>
                              <div className="flex flex-col sm:flex-row justify-between items-start gap-2 mb-2">
                                <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white leading-tight">
                                  {item.name}
                                </h3>
                                <p className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                                  ₹{parseFloat(item.price.replace(/[^0-9.]/g, '')).toFixed(2)}
                                </p>
                              </div>
                              <div className="flex flex-wrap gap-2 justify-center sm:justify-start mb-4">
                                <span className="px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-xs font-semibold uppercase tracking-wider">
                                  {item.petType}
                                </span>
                                <span className="px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-xs font-semibold uppercase tracking-wider">
                                  {item.productCategory}
                                </span>
                              </div>
                            </div>

                            <div className="flex items-center justify-between gap-4 pt-2 border-t border-slate-100 dark:border-slate-800 sm:border-0 sm:pt-0">
                              {/* Quantity */}
                              <div className="flex items-center gap-2 bg-slate-50 dark:bg-slate-800 rounded-full p-1 pl-3 border border-slate-200 dark:border-slate-700">
                                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Qty</span>
                                <div className="flex items-center gap-1">
                                  <button
                                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                    className="w-7 h-7 flex items-center justify-center rounded-full bg-white dark:bg-slate-700 text-slate-600 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-600 transition-colors shadow-sm"
                                  >
                                    <Minus size={12} />
                                  </button>
                                  <span className="w-6 text-center font-bold text-slate-900 dark:text-white text-sm">
                                    {item.quantity}
                                  </span>
                                  <button
                                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                    className="w-7 h-7 flex items-center justify-center rounded-full bg-white dark:bg-slate-700 text-slate-600 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-600 transition-colors shadow-sm"
                                  >
                                    <Plus size={12} />
                                  </button>
                                </div>
                              </div>

                              {/* Remove */}
                              <button
                                onClick={() => removeFromCart(item.id)}
                                className="text-slate-400 hover:text-red-500 transition-colors p-2 text-sm flex items-center gap-1"
                                aria-label="Remove item"
                              >
                                <Trash2 size={16} />
                                <span className="hidden sm:inline text-xs">Remove</span>
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
                <div className="mt-8 flex justify-between items-center">
                  <Link
                    href="/products"
                    className="inline-flex items-center gap-2 text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white font-medium transition-colors group text-sm"
                  >
                    <ArrowRight size={16} className="rotate-180 group-hover:-translate-x-1 transition-transform" />
                    Continue Shopping
                  </Link>
                </div>
              )}
            </div>

            {/* Order Summary & Coupon Section */}
            {cartItems.length > 0 && (
              <div className="lg:col-span-4">
                <div className="sticky top-28 space-y-6">

                  {/* Coupon Box Card */}
                  <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 sm:p-6 border border-slate-200 dark:border-slate-800 shadow-sm">
                    <div className="flex items-center gap-2 mb-3">
                      <Ticket className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                      <h3 className="font-bold text-slate-900 dark:text-white text-base">Have a Group / Partner Coupon?</h3>
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
                      Enter the coupon code shared by your campus rep, clinic, or ambassador team.
                    </p>

                    {appliedCoupon ? (
                      <div className="bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 rounded-2xl p-4">
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex items-center gap-2">
                            <Tag className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="font-mono font-bold text-emerald-900 dark:text-emerald-200 text-sm tracking-wide">
                                  {appliedCoupon.code}
                                </span>
                                <span className="bg-emerald-200/60 dark:bg-emerald-800/60 text-emerald-800 dark:text-emerald-100 text-[10px] font-bold px-2 py-0.5 rounded-full">
                                  {appliedCoupon.discountType === 'percentage' ? `${appliedCoupon.discountValue}% OFF` : `₹${appliedCoupon.discountValue} OFF`}
                                </span>
                              </div>
                              <p className="text-xs text-emerald-700 dark:text-emerald-300 mt-0.5 font-medium">
                                Team: {appliedCoupon.groupName}
                              </p>
                              {discount > 0 ? (
                                <p className="text-xs font-bold text-emerald-800 dark:text-emerald-200 mt-1">
                                  You save ₹{discount.toFixed(2)} on this order!
                                </p>
                              ) : (
                                <p className="text-xs text-amber-600 dark:text-amber-400 mt-1">
                                  Add items worth ₹{((appliedCoupon.minOrderValue || 0) - subtotal).toFixed(2)} more to activate discount.
                                </p>
                              )}
                            </div>
                          </div>
                          <button
                            onClick={removeCoupon}
                            className="text-slate-400 hover:text-red-500 transition-colors p-1"
                            title="Remove coupon"
                          >
                            <X size={16} />
                          </button>
                        </div>
                      </div>
                    ) : (
                      <form onSubmit={handleApplyCoupon} className="space-y-2">
                        <div className="flex gap-2">
                          <input
                            type="text"
                            placeholder="ENTER COUPON CODE"
                            value={inputCoupon}
                            onChange={(e) => setInputCoupon(e.target.value.toUpperCase())}
                            className="flex-1 px-3.5 py-2.5 text-sm uppercase font-mono tracking-wider border border-slate-300 dark:border-slate-700 rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white placeholder:normal-case placeholder:font-sans focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                          <button
                            type="submit"
                            disabled={applying || !inputCoupon.trim()}
                            className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white rounded-xl text-sm font-semibold transition-colors flex items-center justify-center min-w-[70px]"
                          >
                            {applying ? <Loader2 size={16} className="animate-spin" /> : 'Apply'}
                          </button>
                        </div>
                        {couponError && (
                          <p className="text-xs text-red-600 dark:text-red-400 mt-1.5 flex items-center gap-1">
                            <span>⚠</span> {couponError}
                          </p>
                        )}
                        {applySuccess && (
                          <p className="text-xs text-emerald-600 dark:text-emerald-400 mt-1.5 flex items-center gap-1 font-medium">
                            <Check size={14} /> {applySuccess}
                          </p>
                        )}
                      </form>
                    )}
                  </div>

                  {/* Summary Card */}
                  <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 lg:p-7 border border-slate-200 dark:border-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-none">
                    <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-5">Order Summary</h2>

                    <div className="space-y-3.5 mb-6 text-sm">
                      <div className="flex justify-between text-slate-600 dark:text-slate-400">
                        <span>Subtotal</span>
                        <span className="font-semibold text-slate-900 dark:text-white">₹{subtotal.toFixed(2)}</span>
                      </div>

                      {discount > 0 && (
                        <div className="flex justify-between text-emerald-600 dark:text-emerald-400 font-medium">
                          <span className="flex items-center gap-1">
                            <Tag size={13} />
                            <span>Coupon Discount ({appliedCoupon?.code})</span>
                          </span>
                          <span className="font-bold">-₹{discount.toFixed(2)}</span>
                        </div>
                      )}

                      <div className="flex justify-between text-slate-600 dark:text-slate-400">
                        <span>Shipping</span>
                        <span className={shipping === 0 ? "font-semibold text-green-600 dark:text-green-400" : "font-semibold text-slate-900 dark:text-white"}>
                          {shipping === 0 ? 'Free' : `₹${shipping.toFixed(2)}`}
                        </span>
                      </div>

                      <div className="flex justify-between text-slate-600 dark:text-slate-400">
                        <span>GST (18%)</span>
                        <span className="font-semibold text-slate-900 dark:text-white">₹{tax.toFixed(2)}</span>
                      </div>

                      <div className="flex justify-between text-slate-600 dark:text-slate-400">
                        <span>Convenience Fee (3%)</span>
                        <span className="font-semibold text-slate-900 dark:text-white">₹{convenienceFee.toFixed(2)}</span>
                      </div>

                      <div className="pt-3 border-t border-dashed border-slate-200 dark:border-slate-700">
                        <div className="flex justify-between items-end">
                          <span className="text-base font-bold text-slate-900 dark:text-white">Total</span>
                          <div className="text-right">
                            <span className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
                              ₹{total.toFixed(2)}
                            </span>
                            {discount > 0 && (
                              <p className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold">
                                Total savings: ₹{discount.toFixed(2)}
                              </p>
                            )}
                          </div>
                        </div>
                        <p className="text-xs text-slate-400 text-right mt-1">Including all taxes & discounts</p>
                      </div>
                    </div>

                    <Link href="/checkout" className="block w-full">
                      <button className="w-full py-3.5 bg-slate-900 dark:bg-white text-white dark:text-black rounded-xl font-bold text-base hover:shadow-lg hover:scale-[1.01] transition-all duration-300 flex items-center justify-center gap-2 group">
                        Proceed to Checkout
                        <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                      </button>
                    </Link>

                    <div className="mt-5 space-y-2">
                      <div className="flex items-center justify-center gap-2 text-xs font-semibold text-slate-400 uppercase tracking-widest">
                        <Lock size={12} /> 256-bit Secure Checkout
                      </div>
                    </div>
                  </div>

                  <div className="bg-blue-50 dark:bg-blue-900/10 rounded-2xl p-4 flex items-start gap-3 border border-blue-100 dark:border-blue-900/30">
                    <ShieldCheck className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs font-bold text-blue-900 dark:text-blue-200">Vet Quality Guarantee</p>
                      <p className="text-[11px] text-blue-700 dark:text-blue-400/80 mt-0.5">
                        100% human-grade, fresh formulation with clinical backing. 90-day happiness guarantee.
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
