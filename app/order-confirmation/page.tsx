'use client';

import React, { Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { CheckCircle, Home, ShoppingBag, Sparkles, Tag } from 'lucide-react';
import { motion } from 'framer-motion';

function ConfirmationContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get('orderId') || `ORD-${Date.now().toString().slice(-6)}`;
  const amount = searchParams.get('amount');
  const coupon = searchParams.get('coupon');

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-lg w-full bg-white dark:bg-slate-900 rounded-3xl p-8 text-center shadow-xl border border-gray-100 dark:border-slate-800"
      >
        <div className="w-20 h-20 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center mx-auto mb-6 text-emerald-600 dark:text-emerald-400">
          <CheckCircle className="w-10 h-10" />
        </div>

        <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white mb-2">Order Confirmed!</h1>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
          Thank you for choosing BFAB. Your pet's nutrition is being freshly packed and prepared.
        </p>

        <div className="bg-slate-50 dark:bg-slate-800/50 rounded-2xl p-4 text-left space-y-2 mb-6 border border-slate-100 dark:border-slate-800 text-xs sm:text-sm">
          <div className="flex justify-between text-slate-600 dark:text-slate-400">
            <span>Order Reference:</span>
            <span className="font-mono font-bold text-slate-900 dark:text-white">{orderId}</span>
          </div>
          {amount && (
            <div className="flex justify-between text-slate-600 dark:text-slate-400">
              <span>Amount Paid / Payable:</span>
              <span className="font-bold text-slate-900 dark:text-white">₹{parseFloat(amount).toFixed(2)}</span>
            </div>
          )}
          {coupon && (
            <div className="flex justify-between items-center text-emerald-600 dark:text-emerald-400 font-semibold pt-2 border-t border-slate-200 dark:border-slate-700">
              <span className="flex items-center gap-1">
                <Tag size={14} /> Partner Coupon Applied:
              </span>
              <span className="font-mono font-bold">{coupon}</span>
            </div>
          )}
        </div>

        {coupon && (
          <div className="mb-6 p-3 bg-emerald-50 dark:bg-emerald-950/40 rounded-xl border border-emerald-200 dark:border-emerald-800 flex items-center justify-center gap-2 text-xs text-emerald-800 dark:text-emerald-200 font-medium">
            <Sparkles size={14} className="text-emerald-500" />
            <span>Thank you for supporting our partner group with your purchase!</span>
          </div>
        )}

        <div className="space-y-3">
          <Link
            href="/products"
            className="block w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 rounded-xl transition-colors flex items-center justify-center gap-2 text-sm shadow-md shadow-blue-600/20"
          >
            <ShoppingBag size={18} />
            Explore More Products
          </Link>
          <Link
            href="/"
            className="block w-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-gray-900 dark:text-white font-bold py-3 rounded-xl transition-colors border border-gray-200 dark:border-slate-700 flex items-center justify-center gap-2 text-sm"
          >
            <Home size={18} />
            Back to Home
          </Link>
        </div>
      </motion.div>
    </div>
  );
}

export default function OrderConfirmationPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <ConfirmationContent />
    </Suspense>
  );
}
