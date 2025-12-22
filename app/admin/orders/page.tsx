'use client';

import { useEffect, useState } from 'react';
import { db } from '@/lib/firebase';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import Link from 'next/link';
import { Eye, Loader2, Package, CheckCircle, Clock } from 'lucide-react';

interface Order {
    id: string;
    items: any[];
    amount: number;
    status: string;
    userEmail: string;
    createdAt: any;
    paymentMethod: string;
}

export default function AdminOrdersPage() {
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const q = query(collection(db, 'orders'), orderBy('createdAt', 'desc'));
                const snapshot = await getDocs(q);
                setOrders(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Order)));
            } catch (e) {
                console.error("Error fetching orders:", e);
            }
            setLoading(false);
        };
        fetchOrders();
    }, []);

    if (loading) return <div className="p-8 text-center flex justify-center"><Loader2 className="animate-spin" /></div>;

    return (
        <div>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-6">Orders</h1>

            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-50 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700">
                                <th className="p-4 font-semibold text-slate-600 dark:text-slate-300">Order ID</th>
                                <th className="p-4 font-semibold text-slate-600 dark:text-slate-300">Customer</th>
                                <th className="p-4 font-semibold text-slate-600 dark:text-slate-300">Date</th>
                                <th className="p-4 font-semibold text-slate-600 dark:text-slate-300">Amount</th>
                                <th className="p-4 font-semibold text-slate-600 dark:text-slate-300">Status</th>
                                <th className="p-4 font-semibold text-slate-600 dark:text-slate-300 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.length === 0 ? (
                                <tr><td colSpan={6} className="p-8 text-center text-slate-500">No orders found.</td></tr>
                            ) : (
                                orders.map(order => (
                                    <tr key={order.id} className="border-b border-slate-200 dark:border-slate-800 last:border-0 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                                        <td className="p-4 font-mono text-sm text-slate-500">{order.id.slice(0, 8)}...</td>
                                        <td className="p-4 font-medium text-slate-900 dark:text-white">{order.userEmail}</td>
                                        <td className="p-4 text-slate-600 dark:text-slate-400">
                                            {order.createdAt?.seconds ? new Date(order.createdAt.seconds * 1000).toLocaleDateString() : 'N/A'}
                                        </td>
                                        <td className="p-4 font-bold text-slate-900 dark:text-white">₹{order.amount.toFixed(2)}</td>
                                        <td className="p-4">
                                            <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold ${order.status === 'Paid'
                                                    ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                                                    : 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400'
                                                }`}>
                                                {order.status === 'Paid' ? <CheckCircle size={12} /> : <Clock size={12} />}
                                                {order.status}
                                            </span>
                                        </td>
                                        <td className="p-4 text-right">
                                            <Link
                                                href={`/admin/orders/${order.id}`}
                                                className="inline-flex items-center gap-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 px-3 py-1.5 rounded-lg transition-colors text-sm font-medium"
                                            >
                                                <Eye size={16} /> View
                                            </Link>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
