'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { ArrowLeft, CreditCard, Truck, ShieldCheck, CheckCircle, User, Loader2 } from 'lucide-react';
import { useCart } from '../components/CartContext';
import { auth, db } from '@/lib/firebase'; // Ensure db is exported from firebase config
import { onAuthStateChanged } from 'firebase/auth';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

declare global {
  interface Window {
    Razorpay: any;
  }
}

const CheckoutPage = () => {
  const { cartItems, getTotalPrice, clearCart } = useCart();
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [authLoading, setAuthLoading] = useState(true);

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

  const [paymentMethod, setPaymentMethod] = useState('razorpay'); // Default to Razorpay
  const [processing, setProcessing] = useState(false);

  // Auth Check
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (!currentUser) {
        router.push('/login?redirect=/checkout');
      } else {
        setUser(currentUser);
        // Pre-fill email/name if available?
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
    const loadScript = () => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.async = true;
      document.body.appendChild(script);
    };
    loadScript();
  }, []);

  // Calculate totals
  const subtotal = getTotalPrice();
  const shipping = subtotal > 0 && subtotal < 1000 ? 100 : 0;
  const convenienceFee = subtotal * 0.03;
  const tax = subtotal * 0.18;
  const total = subtotal + shipping + tax + convenienceFee;

  const handleBillingChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setBillingInfo({ ...billingInfo, [e.target.name]: e.target.value });
  };

  const handleShippingChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setShippingInfo({ ...shippingInfo, [e.target.name]: e.target.value });
  };

  const saveOrder = async (paymentId: string, orderId: string, status: 'paid' | 'pending' | 'cod') => {
    try {
      const orderData = {
        userId: user?.uid,
        userEmail: user?.email,
        items: cartItems,
        amount: total,
        billingInfo,
        shippingInfo: shippingInfo.sameAsBilling ? billingInfo : shippingInfo,
        paymentMethod,
        paymentId,
        orderId, // Razorpay Order ID
        status: status === 'paid' ? 'Paid' : 'Pending', // Status
        createdAt: serverTimestamp(),
      };

      await addDoc(collection(db, 'orders'), orderData);
      clearCart();
      router.push('/order-confirmation'); // Need to create this page or redirect to orders?
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
      // Handle COD
      await saveOrder('COD', `ORD-${Date.now()}`, 'cod');
      setProcessing(false);
      return;
    }

    // Razorpay Flow
    try {
      // 1. Create Order
      const res = await fetch('/api/create-order', {
        method: 'POST',
        body: JSON.stringify({ amount: total, currency: 'INR' }),
      });
      const order = await res.json();

      if (order.error) {
        alert('Order creation failed');
        setProcessing(false);
        return;
      }

      // 2. Open Razorpay
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: order.currency,
        name: 'BFAB Pet Store',
        description: 'Order Payment',
        order_id: order.id,
        handler: async function (response: any) {
          // Payment Success
          await saveOrder(response.razorpay_payment_id, response.razorpay_order_id, 'paid');
        },
        prefill: {
          name: `${billingInfo.firstName} ${billingInfo.lastName}`,
          email: billingInfo.email,
          contact: billingInfo.phone,
        },
        theme: {
          color: '#3B82F6',
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

  if (authLoading) return <div className="min-h-screen flex items-center justify-center"><Loader2 className="animate-spin" /></div>;

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-[#fff4e8] dark:bg-slate-950 flex items-center justify-center p-4">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">Your cart is empty</h1>
          <Link
            href="/products"
            className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors inline-block"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fff4e8] dark:bg-slate-950 relative">
      <div className="bg-white dark:bg-slate-900 border-b border-gray-200 dark:border-slate-700">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Link
              href="/cart"
              className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              <ArrowLeft size={20} />
              Back to Cart
            </Link>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Checkout</h1>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Billing Information */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-sm dark:shadow-lg dark:shadow-black/30"
            >
              <div className="flex items-center gap-3 mb-6">
                <User size={24} className="text-blue-600 dark:text-blue-400" />
                <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">Billing Information</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">First Name</label>
                  <input
                    type="text"
                    name="firstName"
                    value={billingInfo.firstName}
                    onChange={handleBillingChange}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Last Name</label>
                  <input
                    type="text"
                    name="lastName"
                    value={billingInfo.lastName}
                    onChange={handleBillingChange}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={billingInfo.email}
                    onChange={handleBillingChange}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Phone</label>
                  <input
                    type="tel"
                    name="phone"
                    value={billingInfo.phone}
                    onChange={handleBillingChange}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
                    required
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Address</label>
                  <input
                    type="text"
                    name="address"
                    value={billingInfo.address}
                    onChange={handleBillingChange}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">City</label>
                  <input
                    type="text"
                    name="city"
                    value={billingInfo.city}
                    onChange={handleBillingChange}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">State</label>
                  <input
                    type="text"
                    name="state"
                    value={billingInfo.state}
                    onChange={handleBillingChange}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">ZIP Code</label>
                  <input
                    type="text"
                    name="zipCode"
                    value={billingInfo.zipCode}
                    onChange={handleBillingChange}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Country</label>
                  <select
                    name="country"
                    value={billingInfo.country}
                    onChange={handleBillingChange}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
                  >
                    <option value="India">India</option>
                  </select>
                </div>
              </div>
            </motion.div>

            {/* Shipping Information */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-sm dark:shadow-lg dark:shadow-black/30"
            >
              <div className="flex items-center gap-3 mb-6">
                <Truck size={24} className="text-blue-600 dark:text-blue-400" />
                <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">Shipping Information</h2>
              </div>

              <div className="mb-4">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={shippingInfo.sameAsBilling}
                    onChange={(e) => setShippingInfo({ ...shippingInfo, sameAsBilling: e.target.checked })}
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <span className="text-sm text-gray-700 dark:text-gray-300">Same as billing address</span>
                </label>
              </div>

              {!shippingInfo.sameAsBilling && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">First Name</label>
                    <input
                      type="text"
                      name="firstName"
                      value={shippingInfo.firstName}
                      onChange={handleShippingChange}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
                      required
                    />
                  </div>
                  {/* ... other shipping fields ... */}
                  {/* For brevity, omitting mapped fields, user can implement full if needed or I can copy from billing logic. I'll just put a placeholder for full fields if needed, but existing code had them. I'll include them. */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Last Name</label>
                    <input type="text" name="lastName" value={shippingInfo.lastName} onChange={handleShippingChange} className="w-full px-4 py-3 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-gray-900 dark:text-gray-100" required />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Address</label>
                    <input type="text" name="address" value={shippingInfo.address} onChange={handleShippingChange} className="w-full px-4 py-3 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-gray-900 dark:text-gray-100" required />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">City</label>
                    <input type="text" name="city" value={shippingInfo.city} onChange={handleShippingChange} className="w-full px-4 py-3 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-gray-900 dark:text-gray-100" required />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">State</label>
                    <input type="text" name="state" value={shippingInfo.state} onChange={handleShippingChange} className="w-full px-4 py-3 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-gray-900 dark:text-gray-100" required />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">ZIP Code</label>
                    <input type="text" name="zipCode" value={shippingInfo.zipCode} onChange={handleShippingChange} className="w-full px-4 py-3 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-gray-900 dark:text-gray-100" required />
                  </div>
                </div>
              )}
            </motion.div>

            {/* Payment Method */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-sm dark:shadow-lg dark:shadow-black/30"
            >
              <div className="flex items-center gap-3 mb-6">
                <CreditCard size={24} className="text-blue-600 dark:text-blue-400" />
                <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">Payment Method</h2>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <input
                    type="radio"
                    id="razorpay" // Changed id
                    name="paymentMethod"
                    value="razorpay"
                    checked={paymentMethod === 'razorpay'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label htmlFor="razorpay" className="flex items-center gap-2 text-gray-900 dark:text-gray-100">
                    <CreditCard size={20} />
                    Pay Online (Credit/Debit/UPI)
                  </label>
                </div>

                <div className="flex items-center gap-4">
                  <input
                    type="radio"
                    id="cod"
                    name="paymentMethod"
                    value="cod"
                    checked={paymentMethod === 'cod'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label htmlFor="cod" className="text-gray-900 dark:text-gray-100">Cash on Delivery</label>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-sm dark:shadow-lg dark:shadow-black/30 sticky top-4"
            >
              <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-6">Order Summary</h3>

              {/* Order Items */}
              <div className="space-y-4 mb-6">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex items-center gap-3">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-12 h-12 rounded-lg object-cover"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">{item.name}</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Qty: {item.quantity}</p>
                    </div>
                    <p className="text-sm font-bold text-gray-900 dark:text-gray-100">
                      ₹{(parseFloat(item.price.replace(/[^0-9.]/g, '')) * item.quantity).toFixed(2)}
                    </p>
                  </div>
                ))}
              </div>

              <div className="border-t border-gray-200 dark:border-slate-700 pt-4 space-y-2">
                <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
                  <span>Subtotal</span>
                  <span>₹{subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
                  <span>Shipping</span>
                  <span>{shipping === 0 ? 'Free' : `₹${shipping.toFixed(2)}`}</span>
                </div>
                <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
                  <span>Convenience Fee (3%)</span>
                  <span>₹{convenienceFee.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
                  <span>Tax (18% GST)</span>
                  <span>₹{tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-lg font-bold text-gray-900 dark:text-gray-100 pt-2 border-t border-gray-200 dark:border-slate-700">
                  <span>Total</span>
                  <span>₹{total.toFixed(2)}</span>
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit" // Form submit
                disabled={processing}
                className="w-full bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white py-4 px-6 rounded-lg font-semibold mt-6 transition-colors flex items-center justify-center gap-2 disabled:opacity-70"
              >
                {processing ? <Loader2 className="animate-spin" /> : <ShieldCheck size={20} />}
                {processing ? 'Processing...' : 'Place Order'}
              </motion.button>

              <div className="mt-4 text-xs text-gray-500 dark:text-gray-400 text-center">
                Your payment information is secure and encrypted
              </div>
            </motion.div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CheckoutPage;