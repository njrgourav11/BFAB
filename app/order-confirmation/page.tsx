'use client';
import Link from 'next/link';
import { CheckCircle, Home, ShoppingBag } from 'lucide-react';
import { motion } from 'framer-motion';

export default function OrderConfirmationPage() {
    return (
        <div className="min-h-screen bg-white dark:bg-slate-950 flex items-center justify-center p-4">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="max-w-md w-full bg-gray-50 dark:bg-slate-900 rounded-3xl p-8 text-center shadow-2xl border border-gray-100 dark:border-slate-800"
            >
                <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle className="w-10 h-10 text-green-600 dark:text-green-500" />
                </div>

                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Order Confirmed!</h1>
                <p className="text-gray-600 dark:text-gray-400 mb-8">
                    Thank you for your purchase. We have received your order and will begin processing it shortly.
                </p>

                <div className="space-y-3">
                    <Link
                        href="/products"
                        className="block w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl transition-colors flex items-center justify-center gap-2"
                    >
                        <ShoppingBag size={20} />
                        Continue Shopping
                    </Link>
                    <Link
                        href="/"
                        className="block w-full bg-white dark:bg-slate-800 hover:bg-gray-50 dark:hover:bg-slate-700 text-gray-900 dark:text-white font-bold py-3 rounded-xl transition-colors border border-gray-200 dark:border-slate-700 flex items-center justify-center gap-2"
                    >
                        <Home size={20} />
                        Back to Home
                    </Link>
                </div>
            </motion.div>
        </div>
    );
}
