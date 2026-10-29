'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { ArrowLeft, CreditCard, ShieldCheck, User, Loader2, Tag, Ticket, Check, X, Sparkles } from 'lucide-react';
import { useCart } from '../components/CartContext';
import { auth, db } from '@/lib/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { recordCouponUsage } from '@/lib/coupon-utils';

declare global {
  interface Window {
    Razorpay: any;
  }
}

const CheckoutPage = () => {
  const {
    cartItems,
    getTotalPrice,
    clearCart,
    appliedCoupon,
    couponError,
    applyCoupon,
    removeCoupon,
    getDiscountAmount
  } = useCart();

  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [authLoading, setAuthLoading] = useState(true);

  const [inputCoupon, setInputCoupon] = useState('');
  const [applyingCoupon, setApplyingCoupon] = useState(false);
  const [couponFeedback, setCouponFeedback] = useState<string | null>(null);

  const [billingInfo, setBillingInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'India'
  });

  const [shippingInfo, setShippingInfo] = useState({
    sameAsBilling: true,
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'India'
  });

  const [paymentMethod, setPaymentMethod] = useState('razorpay');
  const [processing, setProcessing] = useState(false);

  // Auth Check
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (!currentUser) {
        router.push('/login?redirect=/checkout');
      } else {
        setUser(currentUser);
        if (currentUser.email) setBillingInfo(prev => ({ ...prev, email: currentUser.email! }));
        if (currentUser.displayName) {
          const parts = currentUser.displayName.split(' ');
          setBillingInfo(prev => ({ ...prev, firstName: parts[0], lastName: parts.slice(1).join(' ') }));
        }
      }
      setAuthLoading(false);
    });
    return () => unsubscribe();
  }, [router]);

  // Load Razorpay Script
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    document.body.appendChild(script);
  }, []);

  // Calculate totals
  const subtotal = getTotalPrice();
  const discount = getDiscountAmount();
  const discountedSubtotal = Math.max(0, subtotal - discount);

  const shipping = discountedSubtotal > 0 && discountedSubtotal < 1000 ? 100 : 0;
  const convenienceFee = discountedSubtotal * 0.03;
  const tax = discountedSubtotal * 0.18;
  const total = discountedSubtotal + shipping + tax + convenienceFee;

  const handleBillingChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setBillingInfo({ ...billingInfo, [e.target.name]: e.target.value });
  };

  const handleShippingChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setShippingInfo({ ...shippingInfo, [e.target.name]: e.target.value });
  };

  const handleApplyCoupon = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputCoupon.trim()) return;

    setApplyingCoupon(true);
    setCouponFeedback(null);
    const res = await applyCoupon(inputCoupon);
    setApplyingCoupon(false);

    if (res.success) {
      setCouponFeedback(res.message);
      setInputCoupon('');
      setTimeout(() => setCouponFeedback(null), 4000);
    }
  };

  const saveOrder = async (paymentId: string, orderId: string, status: 'paid' | 'pending' | 'cod') => {
    try {
      const unitsCount = cartItems.reduce((acc, it) => acc + (it.quantity || 1), 0);

      const orderData = {
        userId: user?.uid || 'guest',
        userEmail: user?.email || billingInfo.email || '',
        items: cartItems,
        amount: Math.round(total * 100), // in paise
        totalAmount: total,
        subtotal: subtotal,
        discountAmount: discount,
        couponCode: appliedCoupon?.code || null,
        groupName: appliedCoupon?.groupName || null,
        billingInfo,
        shippingInfo: shippingInfo.sameAsBilling ? billingInfo : shippingInfo,
        paymentMethod,
        paymentId: paymentId || '',
        orderId: orderId || `ORD-${Date.now()}`,
        status: status === 'paid' ? 'Paid' : 'Pending',
        createdAt: serverTimestamp(),
      };

      await addDoc(collection(db, 'orders'), orderData);

      // Record coupon sale in analytics (safely so order confirmation is never interrupted)
      if (appliedCoupon?.code) {
        try {
          await recordCouponUsage(appliedCoupon.code, total, unitsCount);
        } catch (couponRecordError) {
          console.warn("Could not record coupon increment, order still saved successfully:", couponRecordError);
        }
      }

      clearCart();
      router.push(`/order-confirmation?orderId=${orderId}&amount=${total}&coupon=${appliedCoupon?.code || ''}`);
    } catch (error) {
      console.error("Error saving order: ", error);
      alert('Error saving order details. Please contact support if payment was deducted.');
    }
  };

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    setProcessing(true);

    if (paymentMethod === 'cod') {
      await saveOrder('COD', `ORD-${Date.now()}`, 'cod');
      setProcessing(false);
      return;
    }

    // Razorpay Flow
    try {
      const res = await fetch('/api/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: total, currency: 'INR' }),
      });
      const order = await res.json();

      if (order.error) {
        alert('Order creation failed');
        setProcessing(false);
        return;
      }

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: order.currency,
        name: 'BFAB Pet Store',
        description: `Order Payment ${appliedCoupon ? `(Coupon: ${appliedCoupon.code})` : ''}`,
        order_id: order.id,
        handler: async function (response: any) {
          await saveOrder(response.razorpay_payment_id, response.razorpay_order_id, 'paid');
        },
        prefill: {
          name: `${billingInfo.firstName} ${billingInfo.lastName}`,
          email: billingInfo.email,
          contact: billingInfo.phone,
        },
        theme: {
          color: '#2563EB',
        },
      };

      const rzp1 = new window.Razorpay(options);
      rzp1.open();

      rzp1.on('payment.failed', function (response: any) {
        alert(response.error.description);
        setProcessing(false);
      });

    } catch (error) {
      console.error(error);
      alert('Payment initialization failed');
      setProcessing(false);
    }
  };

  if (authLoading) return <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950"><Loader2 className="animate-spin text-blue-600" /></div>;

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center p-4">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">Your cart is empty</h1>
          <Link
            href="/products"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold transition-colors inline-block"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 relative py-6">
      <div className="container mx-auto px-4 max-w-6xl">

        <div className="flex items-center gap-4 mb-6">
          <Link
            href="/cart"
            className="inline-flex items-center gap-2 text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors text-sm font-medium"
          >
            <ArrowLeft size={18} />
            Back to Cart
          </Link>
          <span className="text-slate-300 dark:text-slate-700">/</span>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Secure Checkout</h1>
        </div>

        <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-8">

          {/* Form Columns */}
          <div className="lg:col-span-7 space-y-6">

            {/* Billing Information */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-7 shadow-sm border border-slate-200 dark:border-slate-800"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400">
                  <User size={20} />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100">Shipping & Billing Address</h2>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Where should we deliver your pet's wellness package?</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5 uppercase tracking-wider">First Name</label>
                  <input
                    type="text"
                    name="firstName"
                    value={billingInfo.firstName}
                    onChange={handleBillingChange}
                    className="w-full px-3.5 py-2.5 text-sm border border-gray-300 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5 uppercase tracking-wider">Last Name</label>
                  <input
                    type="text"
                    name="lastName"
                    value={billingInfo.lastName}
                    onChange={handleBillingChange}
                    className="w-full px-3.5 py-2.5 text-sm border border-gray-300 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5 uppercase tracking-wider">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    value={billingInfo.email}
                    onChange={handleBillingChange}
                    className="w-full px-3.5 py-2.5 text-sm border border-gray-300 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5 uppercase tracking-wider">Phone Number</label>
                  <input
                    type="tel"
                    name="phone"
                    value={billingInfo.phone}
                    onChange={handleBillingChange}
                    placeholder="+91"
                    className="w-full px-3.5 py-2.5 text-sm border border-gray-300 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5 uppercase tracking-wider">Street Address</label>
                  <input
                    type="text"
                    name="address"
                    value={billingInfo.address}
                    onChange={handleBillingChange}
                    placeholder="House/Flat No., Street, Landmark"
                    className="w-full px-3.5 py-2.5 text-sm border border-gray-300 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5 uppercase tracking-wider">City</label>
                  <input
                    type="text"
                    name="city"
                    value={billingInfo.city}
                    onChange={handleBillingChange}
                    className="w-full px-3.5 py-2.5 text-sm border border-gray-300 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5 uppercase tracking-wider">State</label>
                  <input
                    type="text"
                    name="state"
                    value={billingInfo.state}
                    onChange={handleBillingChange}
                    className="w-full px-3.5 py-2.5 text-sm border border-gray-300 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5 uppercase tracking-wider">PIN Code</label>
                  <input
                    type="text"
                    name="zipCode"
                    value={billingInfo.zipCode}
                    onChange={handleBillingChange}
                    className="w-full px-3.5 py-2.5 text-sm border border-gray-300 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5 uppercase tracking-wider">Country</label>
                  <input
                    type="text"
                    name="country"
                    value={billingInfo.country}
                    readOnly
                    className="w-full px-3.5 py-2.5 text-sm border border-gray-300 dark:border-slate-700 rounded-xl bg-slate-100 dark:bg-slate-800/60 text-gray-700 dark:text-gray-300"
                  />
                </div>
              </div>
            </motion.div>

            {/* Payment Method */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-7 shadow-sm border border-slate-200 dark:border-slate-800"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-emerald-50 dark:bg-emerald-900/30 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
                  <CreditCard size={20} />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100">Payment Option</h2>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Fast, encrypted and safe payment processing</p>
                </div>
              </div>

              <div className="space-y-3">
                <label
                  htmlFor="razorpay"
                  className={`flex items-center justify-between p-4 rounded-2xl border cursor-pointer transition-all ${
                    paymentMethod === 'razorpay'
                      ? 'border-blue-600 bg-blue-50/50 dark:bg-blue-900/20 dark:border-blue-500'
                      : 'border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800/40'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      id="razorpay"
                      name="paymentMethod"
                      value="razorpay"
                      checked={paymentMethod === 'razorpay'}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="w-4 h-4 text-blue-600"
                    />
                    <div>
                      <p className="text-sm font-bold text-gray-900 dark:text-gray-100">UPI, Cards, NetBanking (Razorpay)</p>
                      <p className="text-xs text-slate-500 dark:text-slate-400">Instant confirmation via Google Pay, PhonePe, Paytm, or Credit/Debit card</p>
                    </div>
                  </div>
                  <span className="text-xs font-semibold px-2.5 py-1 bg-blue-100 dark:bg-blue-900/60 text-blue-700 dark:text-blue-200 rounded-lg">Recommended</span>
                </label>

                <label
                  htmlFor="cod"
                  className={`flex items-center justify-between p-4 rounded-2xl border cursor-pointer transition-all ${
                    paymentMethod === 'cod'
                      ? 'border-blue-600 bg-blue-50/50 dark:bg-blue-900/20 dark:border-blue-500'
                      : 'border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800/40'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      id="cod"
                      name="paymentMethod"
                      value="cod"
                      checked={paymentMethod === 'cod'}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="w-4 h-4 text-blue-600"
                    />
                    <div>
                      <p className="text-sm font-bold text-gray-900 dark:text-gray-100">Cash on Delivery (COD)</p>
                      <p className="text-xs text-slate-500 dark:text-slate-400">Pay cash upon package arrival at your doorstep</p>
                    </div>
                  </div>
                </label>
              </div>
            </motion.div>
          </div>

          {/* Order Summary & Coupon Breakdown */}
          <div className="lg:col-span-5">
            <div className="sticky top-24 space-y-5">

              {/* Coupon Box in Checkout */}
              <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 sm:p-6 border border-slate-200 dark:border-slate-800 shadow-sm">
                <div className="flex items-center gap-2 mb-2">
                  <Ticket className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                  <h3 className="font-bold text-slate-900 dark:text-white text-sm">Coupon & Group Offer</h3>
                </div>

                {appliedCoupon ? (
                  <div className="bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 rounded-2xl p-3.5">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <Tag className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-mono font-bold text-emerald-900 dark:text-emerald-200 text-sm">
                              {appliedCoupon.code}
                            </span>
                            <span className="bg-emerald-200/60 dark:bg-emerald-800/60 text-emerald-800 dark:text-emerald-100 text-[10px] font-bold px-2 py-0.5 rounded-full">
                              {appliedCoupon.discountType === 'percentage' ? `${appliedCoupon.discountValue}% OFF` : `₹${appliedCoupon.discountValue} OFF`}
                            </span>
                          </div>
                          <p className="text-xs text-emerald-700 dark:text-emerald-300 font-medium mt-0.5">
                            Team: {appliedCoupon.groupName}
                          </p>
                          {discount > 0 && (
                            <p className="text-xs font-bold text-emerald-800 dark:text-emerald-200 mt-1">
                              Saving ₹{discount.toFixed(2)} on this order
                            </p>
                          )}
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={removeCoupon}
                        className="text-slate-400 hover:text-red-500 transition-colors p-1"
                        title="Remove coupon"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <div className="flex gap-2">
                      <input
                        type="text"
                        placeholder="ENTER COUPON CODE"
                        value={inputCoupon}
                        onChange={(e) => setInputCoupon(e.target.value.toUpperCase())}
                        className="flex-1 px-3 py-2 text-xs uppercase font-mono tracking-wider border border-slate-300 dark:border-slate-700 rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white placeholder:normal-case placeholder:font-sans focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <button
                        type="button"
                        onClick={handleApplyCoupon}
                        disabled={applyingCoupon || !inputCoupon.trim()}
                        className="px-3 py-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white rounded-xl text-xs font-semibold transition-colors flex items-center justify-center min-w-[60px]"
                      >
                        {applyingCoupon ? <Loader2 size={14} className="animate-spin" /> : 'Apply'}
                      </button>
                    </div>
                    {couponError && (
                      <p className="text-xs text-red-600 dark:text-red-400">⚠ {couponError}</p>
                    )}
                    {couponFeedback && (
                      <p className="text-xs text-emerald-600 dark:text-emerald-400 flex items-center gap-1 font-medium">
                        <Check size={12} /> {couponFeedback}
                      </p>
                    )}
                  </div>
                )}
              </div>

              {/* Order Summary Card */}
              <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-sm border border-slate-200 dark:border-slate-800">
                <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-4">Order Items ({cartItems.length})</h3>

                <div className="space-y-3 max-h-60 overflow-y-auto pr-1 mb-5">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex items-center gap-3 py-2 border-b border-slate-100 dark:border-slate-800 last:border-0">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-12 h-12 rounded-xl object-contain bg-slate-50 dark:bg-slate-800 p-1"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="text-xs font-semibold text-gray-900 dark:text-gray-100 truncate">{item.name}</h4>
                        <p className="text-[11px] text-gray-500 dark:text-gray-400">Qty: {item.quantity}</p>
                      </div>
                      <p className="text-xs font-bold text-gray-900 dark:text-gray-100">
                        ₹{(parseFloat(item.price.replace(/[^0-9.]/g, '')) * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="border-t border-slate-200 dark:border-slate-700 pt-4 space-y-2.5 text-xs sm:text-sm">
                  <div className="flex justify-between text-gray-600 dark:text-gray-400">
                    <span>Subtotal</span>
                    <span>₹{subtotal.toFixed(2)}</span>
                  </div>

                  {discount > 0 && (
                    <div className="flex justify-between text-emerald-600 dark:text-emerald-400 font-semibold">
                      <span className="flex items-center gap-1">
                        <Tag size={12} />
                        <span>Discount ({appliedCoupon?.code})</span>
                      </span>
                      <span>-₹{discount.toFixed(2)}</span>
                    </div>
                  )}

                  <div className="flex justify-between text-gray-600 dark:text-gray-400">
                    <span>Shipping</span>
                    <span className={shipping === 0 ? "font-semibold text-green-600 dark:text-green-400" : ""}>
                      {shipping === 0 ? 'Free' : `₹${shipping.toFixed(2)}`}
                    </span>
                  </div>

                  <div className="flex justify-between text-gray-600 dark:text-gray-400">
                    <span>GST (18%)</span>
                    <span>₹{tax.toFixed(2)}</span>
                  </div>

                  <div className="flex justify-between text-gray-600 dark:text-gray-400">
                    <span>Convenience Fee (3%)</span>
                    <span>₹{convenienceFee.toFixed(2)}</span>
                  </div>

                  <div className="flex justify-between text-base font-extrabold text-gray-900 dark:text-gray-100 pt-3 border-t border-slate-200 dark:border-slate-700">
                    <span>Total Payable</span>
                    <div className="text-right">
                      <span>₹{total.toFixed(2)}</span>
                      {discount > 0 && (
                        <p className="text-[10px] text-emerald-600 font-bold">Total Savings: ₹{discount.toFixed(2)}</p>
                      )}
                    </div>
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  type="submit"
                  disabled={processing}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3.5 px-6 rounded-xl font-bold mt-6 transition-colors flex items-center justify-center gap-2 disabled:opacity-70 shadow-lg shadow-blue-600/20"
                >
                  {processing ? <Loader2 className="animate-spin" size={18} /> : <ShieldCheck size={18} />}
                  {processing ? 'Processing Payment...' : paymentMethod === 'cod' ? 'Confirm Cash on Delivery Order' : `Pay ₹${total.toFixed(2)} with Razorpay`}
                </motion.button>

                <div className="mt-4 text-[11px] text-gray-500 dark:text-gray-400 text-center flex items-center justify-center gap-1.5">
                  <ShieldCheck size={13} className="text-emerald-500" />
                  Your payment information is 100% encrypted & secure
                </div>
              </div>
            </div>
          </div>

        </form>
      </div>
    </div>
  );
};

export default CheckoutPage;
