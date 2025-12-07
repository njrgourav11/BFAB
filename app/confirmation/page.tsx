"use client";
import React, { useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { CheckCircle, Package, Truck, Mail, Phone, MapPin, Download, ArrowRight, Home, ShoppingBag } from 'lucide-react';
import { useCart } from '../components/CartContext';

const ConfirmationPage = () => {
    const { cartItems, clearCart } = useCart();
    const orderNumber = `BFAB-${Date.now().toString().slice(-8)}`;
    const orderDate = new Date().toLocaleDateString('en-IN', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    useEffect(() => {
        // Clear cart after order is placed
        // Uncomment this in production
        // clearCart();
    }, []);

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-slate-950 font-sans">
            {/* Success Header */}
            <div className="bg-gradient-to-br from-green-500 to-emerald-600 text-white py-16">
                <div className="container mx-auto px-4 text-center">
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", duration: 0.6 }}
                        className="inline-flex w-24 h-24 bg-white/20 backdrop-blur-sm rounded-full items-center justify-center mb-6"
                    >
                        <CheckCircle size={48} className="text-white" />
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-4xl md:text-5xl font-bold mb-4"
                    >
                        Order Confirmed!
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="text-xl text-green-50 max-w-2xl mx-auto"
                    >
                        Thank you for your purchase! Your order has been successfully placed.
                    </motion.p>
                </div>
            </div>

            <div className="container mx-auto px-4 py-12">
                <div className="max-w-4xl mx-auto">
                    {/* Order Details Card */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-800 p-8 mb-8"
                    >
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8 pb-8 border-b border-gray-100 dark:border-slate-800">
                            <div>
                                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Order #{orderNumber}</h2>
                                <p className="text-gray-500 dark:text-gray-400">Placed on {orderDate}</p>
                            </div>
                            <button className="flex items-center gap-2 bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-6 py-3 rounded-xl font-semibold hover:opacity-90 transition-all">
                                <Download size={18} />
                                Download Invoice
                            </button>
                        </div>

                        {/* Order Status Timeline */}
                        <div className="mb-8">
                            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6">Order Status</h3>
                            <div className="relative">
                                <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-200 dark:bg-slate-700"></div>

                                {[
                                    { icon: CheckCircle, label: 'Order Confirmed', status: 'completed', time: 'Just now' },
                                    { icon: Package, label: 'Processing', status: 'current', time: 'In progress' },
                                    { icon: Truck, label: 'Shipped', status: 'pending', time: 'Pending' },
                                    { icon: CheckCircle, label: 'Delivered', status: 'pending', time: 'Pending' },
                                ].map((step, index) => (
                                    <div key={index} className="relative flex items-start gap-4 mb-8 last:mb-0">
                                        <div className={`relative z-10 w-8 h-8 rounded-full flex items-center justify-center ${step.status === 'completed' ? 'bg-green-500 text-white' :
                                            step.status === 'current' ? 'bg-blue-500 text-white' :
                                                'bg-gray-200 dark:bg-slate-700 text-gray-400'
                                            }`}>
                                            <step.icon size={16} />
                                        </div>
                                        <div className="flex-1 pt-0.5">
                                            <p className={`font-semibold ${step.status === 'pending' ? 'text-gray-400 dark:text-gray-500' : 'text-gray-900 dark:text-white'
                                                }`}>
                                                {step.label}
                                            </p>
                                            <p className="text-sm text-gray-500 dark:text-gray-400">{step.time}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Delivery Information */}
                        <div className="bg-gray-50 dark:bg-slate-800 rounded-xl p-6">
                            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Delivery Information</h3>
                            <div className="space-y-3 text-gray-600 dark:text-gray-400">
                                <div className="flex items-start gap-3">
                                    <MapPin size={18} className="text-blue-500 mt-0.5 flex-shrink-0" />
                                    <div>
                                        <p className="font-medium text-gray-900 dark:text-white">Shipping Address</p>
                                        <p className="text-sm">123 Pet Street, Bhubaneswar, Odisha - 752050</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <Truck size={18} className="text-green-500 mt-0.5 flex-shrink-0" />
                                    <div>
                                        <p className="font-medium text-gray-900 dark:text-white">Estimated Delivery</p>
                                        <p className="text-sm">3-5 business days</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Order Items */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-800 p-8 mb-8"
                    >
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6">Order Items</h3>
                        <div className="space-y-4">
                            {cartItems.map((item) => (
                                <div key={item.id} className="flex gap-4 pb-4 border-b border-gray-100 dark:border-slate-800 last:border-0 last:pb-0">
                                    <div className="w-20 h-20 bg-gray-50 dark:bg-slate-800 rounded-lg flex-shrink-0 overflow-hidden">
                                        <img src={item.image} alt={item.name} className="w-full h-full object-contain p-2" />
                                    </div>
                                    <div className="flex-1">
                                        <h4 className="font-semibold text-gray-900 dark:text-white mb-1">{item.name}</h4>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">Quantity: {item.quantity}</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="font-bold text-gray-900 dark:text-white">{item.price}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Contact Support */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 }}
                        className="bg-blue-50 dark:bg-blue-900/10 rounded-2xl p-8 border border-blue-100 dark:border-blue-900/30 mb-8"
                    >
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Need Help?</h3>
                        <p className="text-gray-600 dark:text-gray-400 mb-6">
                            If you have any questions about your order, our support team is here to help.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <a href="mailto:paw.support@begginforabite.in" className="flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:underline">
                                <Mail size={18} />
                                paw.support@begginforabite.in
                            </a>
                            <a href="tel:+918480320158" className="flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:underline">
                                <Phone size={18} />
                                +91 8480-320158
                            </a>
                        </div>
                    </motion.div>

                    {/* Action Buttons */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.7 }}
                        className="flex flex-col sm:flex-row gap-4"
                    >
                        <Link
                            href="/"
                            className="flex-1 flex items-center justify-center gap-2 bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-6 py-4 rounded-xl font-bold hover:opacity-90 transition-all"
                        >
                            <Home size={20} />
                            Back to Home
                        </Link>
                        <Link
                            href="/products"
                            className="flex-1 flex items-center justify-center gap-2 bg-white dark:bg-slate-900 text-slate-900 dark:text-white border-2 border-slate-900 dark:border-white px-6 py-4 rounded-xl font-bold hover:bg-gray-50 dark:hover:bg-slate-800 transition-all"
                        >
                            <ShoppingBag size={20} />
                            Continue Shopping
                        </Link>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default ConfirmationPage;
