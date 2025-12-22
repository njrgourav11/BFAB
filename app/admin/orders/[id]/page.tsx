'use client';

import { useEffect, useState, use } from 'react';
import { db } from '@/lib/firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore'; // handling status update
import Link from 'next/link';
import { ArrowLeft, Loader2, MapPin, User, CreditCard, Package } from 'lucide-react';
import Image from 'next/image';

export default function OrderDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const [order, setOrder] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOrder = async () => {
            if (!id) return;
            try {
                const docRef = doc(db, 'orders', id);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    setOrder({ id: docSnap.id, ...docSnap.data() });
                }
            } catch (e) {
                console.error(e);
            }
            setLoading(false);
        };
        fetchOrder();
    }, [id]);

    if (loading) return <div className="p-8 text-center flex justify-center"><Loader2 className="animate-spin" /></div>;
    if (!order) return <div className="p-8 text-center">Order not found</div>;

    const handleStatusUpdate = async (newStatus: string) => {
        try {
            const docRef = doc(db, 'orders', order.id);
            await updateDoc(docRef, { status: newStatus });
            setOrder((prev: any) => ({ ...prev, status: newStatus }));
            alert('Order status updated successfully!');
        } catch (error) {
            console.error("Error updating status:", error);
            alert('Failed to update status.');
        }
    };

    return (
        <div className="max-w-5xl mx-auto pb-12">
            <div className="flex items-center justify-between mb-8">
                <Link href="/admin/orders" className="flex items-center gap-2 text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors">
                    <ArrowLeft size={20} /> Back to Orders
                </Link>
                <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Order Details</h1>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Info */}
                <div className="lg:col-span-2 space-y-8">
                    {/* Items */}
                    <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800">
                        <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                            <Package className="text-blue-600" /> Order Items
                        </h2>
                        <div className="space-y-4">
                            {order.items?.map((item: any, i: number) => (
                                <div key={i} className="flex items-center gap-4 py-2 border-b border-slate-100 dark:border-slate-800 last:border-0">
                                    <div className="w-16 h-16 relative bg-slate-100 rounded-lg overflow-hidden flex-shrink-0">
                                        <Image src={item.image || '/placeholder.jpg'} alt={item.name} fill className="object-cover" />
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="font-medium text-slate-900 dark:text-white">{item.name}</h3>
                                        <p className="text-sm text-slate-500">Qty: {item.quantity}</p>
                                    </div>
                                    <div className="font-bold text-slate-900 dark:text-white">
                                        ₹{(parseFloat(item.price.replace(/[^0-9.]/g, '')) * item.quantity).toFixed(2)}
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-800 flex justify-between items-center">
                            <span className="font-medium text-slate-600 dark:text-slate-400">Total Amount</span>
                            <span className="text-2xl font-bold text-slate-900 dark:text-white">₹{order.amount.toFixed(2)}</span>
                        </div>
                    </div>

                    {/* Addresses */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800">
                            <h3 className="font-bold text-slate-900 dark:text-white mb-3 flex items-center gap-2"><MapPin size={18} className="text-gray-400" /> Billing Address</h3>
                            <div className="text-sm text-slate-600 dark:text-slate-400 space-y-1">
                                <p className="font-medium text-slate-900 dark:text-white">{order.billingInfo?.firstName} {order.billingInfo?.lastName}</p>
                                <p>{order.billingInfo?.email}</p>
                                <p>{order.billingInfo?.phone}</p>
                                <p>{order.billingInfo?.address}</p>
                                <p>{order.billingInfo?.city}, {order.billingInfo?.state} {order.billingInfo?.zipCode}</p>
                                <p>{order.billingInfo?.country}</p>
                            </div>
                        </div>
                        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800">
                            <h3 className="font-bold text-slate-900 dark:text-white mb-3 flex items-center gap-2"><MapPin size={18} className="text-gray-400" /> Shipping Address</h3>
                            <div className="text-sm text-slate-600 dark:text-slate-400 space-y-1">
                                <p className="font-medium text-slate-900 dark:text-white">{order.shippingInfo?.firstName} {order.shippingInfo?.lastName}</p>
                                <p>{order.shippingInfo?.address}</p>
                                <p>{order.shippingInfo?.city}, {order.shippingInfo?.state} {order.shippingInfo?.zipCode}</p>
                                <p>{order.shippingInfo?.country}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Sidebar Details */}
                <div className="space-y-6">
                    <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800">
                        <h3 className="font-bold text-slate-900 dark:text-white mb-4">Order Status</h3>
                        <div className="space-y-4">
                            <div className="flex flex-col gap-2">
                                <span className="text-slate-500">Current Status:</span>
                                <span className="font-bold text-slate-900 dark:text-white text-lg capitalize">{order.status}</span>
                            </div>

                            <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
                                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Update Status</label>
                                <select
                                    value={order.status}
                                    onChange={(e) => handleStatusUpdate(e.target.value)}
                                    className="w-full p-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    <option value="Pending">Pending</option>
                                    <option value="Processing">Processing</option>
                                    <option value="Shipped">Shipped</option>
                                    <option value="Delivered">Delivered</option>
                                    <option value="Cancelled">Cancelled</option>
                                </select>
                            </div>

                            <div className="flex justify-between pt-2">
                                <span className="text-slate-500">Date</span>
                                <span className="font-medium text-slate-900 dark:text-white">
                                    {order.createdAt?.seconds ? new Date(order.createdAt.seconds * 1000).toLocaleDateString() : 'N/A'}
                                </span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-slate-500">Order ID (Ref)</span>
                                <span className="font-mono text-xs text-slate-900 dark:text-white">{order.id}</span>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800">
                        <h3 className="font-bold text-slate-900 dark:text-white mb-4">Payment Info</h3>
                        <div className="space-y-4">
                            <div className="flex justify-between">
                                <span className="text-slate-500">Method</span>
                                <span className="font-bold text-slate-900 dark:text-white uppercase">{order.paymentMethod}</span>
                            </div>
                            {order.paymentId && (
                                <div className="flex justify-between">
                                    <span className="text-slate-500">Payment ID</span>
                                    <span className="font-mono text-xs text-slate-900 dark:text-white">{order.paymentId}</span>
                                </div>
                            )}
                            {order.orderId && (
                                <div className="flex justify-between">
                                    <span className="text-slate-500">Razorpay Order</span>
                                    <span className="font-mono text-xs text-slate-900 dark:text-white">{order.orderId}</span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
