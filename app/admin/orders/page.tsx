'use client';

import { useEffect, useState } from 'react';
import { db } from '@/lib/firebase';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import Link from 'next/link';
import { Eye, Search } from 'lucide-react';
import { motion } from 'framer-motion';
import { AdminHeader, Empty, Panel, Row, SkeletonBlock, StatusPill, th } from '@/components/admin/ui';

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

    const [filter, setFilter] = useState<'all' | 'paid' | 'pending'>('all');
    const [search, setSearch] = useState('');
    const amountOf = (o: Order) => o.amount ?? 0;
    const visible = orders.filter((o) => {
        const st = (o.status || 'pending').toLowerCase();
        if (filter === 'paid' && st !== 'paid') return false;
        if (filter === 'pending' && st === 'paid') return false;
        const q = search.trim().toLowerCase();
        return !q || o.id.toLowerCase().includes(q) || (o.userEmail || '').toLowerCase().includes(q);
    });
    const paidTotal = orders.filter((o) => o.status === 'Paid').reduce((t, o) => t + amountOf(o), 0);

    return (
        <div>
            <AdminHeader eyebrow="Sales" title="Orders" description="Every order placed in the store, newest first." />

            <div className="mb-5 grid grid-cols-2 gap-3 sm:max-w-md">
                <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="rounded-2xl bg-[#14100D] px-4 py-3 text-white">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-white/50">Orders</p>
                    <p className="font-fredoka text-2xl font-bold">{orders.length}</p>
                </motion.div>
                <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.06 }} className="rounded-2xl bg-[#F4623B] px-4 py-3 text-white">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-white/70">Paid value</p>
                    <p className="font-fredoka text-2xl font-bold">₹{paidTotal.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</p>
                </motion.div>
            </div>

            <Panel delay={0.12}>
                <div className="flex flex-col gap-3 border-b border-[#241F1B]/[0.07] px-5 py-4 sm:flex-row sm:items-center dark:border-white/10">
                    <div className="flex rounded-full bg-[#F6F2EB] p-1 dark:bg-white/5">
                        {(['all', 'paid', 'pending'] as const).map((f) => (
                            <button key={f} type="button" onClick={() => setFilter(f)} className={`relative rounded-full px-4 py-1.5 text-xs font-semibold capitalize ${filter === f ? 'text-white' : 'text-[#241F1B]/60 dark:text-white/55'}`}>
                                {filter === f && <motion.span layoutId="orders-filter" className="absolute inset-0 rounded-full bg-[#241F1B] dark:bg-[#F4623B]" transition={{ type: 'spring', stiffness: 400, damping: 32 }} />}
                                <span className="relative">{f}</span>
                            </button>
                        ))}
                    </div>
                    <div className="flex flex-1 items-center gap-2 sm:justify-end">
                        <Search size={16} className="text-[#241F1B]/40 dark:text-white/40" />
                        <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search by order ID or email" aria-label="Search orders" className="w-full bg-transparent text-sm outline-none placeholder:text-[#241F1B]/35 sm:max-w-xs dark:placeholder:text-white/35" />
                    </div>
                </div>
                {loading ? (
                    <div className="space-y-3 p-5">{[0, 1, 2, 3].map((i) => <SkeletonBlock key={i} className="h-12" />)}</div>
                ) : visible.length === 0 ? (
                    <Empty title={orders.length ? 'No matching orders' : 'No orders yet'} hint={orders.length ? 'Try another filter or search.' : 'Orders appear here as soon as customers check out.'} />
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full min-w-[720px] text-left text-sm">
                            <thead>
                                <tr>
                                    <th className={th}>Order</th>
                                    <th className={th}>Customer</th>
                                    <th className={th}>Date</th>
                                    <th className={th}>Amount</th>
                                    <th className={th}>Status</th>
                                    <th className={`${th} text-right`} />
                                </tr>
                            </thead>
                            <tbody>
                                {visible.map((order, i) => (
                                    <Row key={order.id} i={i} className="group">
                                        <td className="px-6 py-4 font-mono text-xs font-semibold">#{order.id.slice(0, 8)}</td>
                                        <td className="px-6 py-4 font-medium">{order.userEmail}</td>
                                        <td className="px-6 py-4 text-[#241F1B]/60 dark:text-white/55">
                                            {order.createdAt?.seconds ? new Date(order.createdAt.seconds * 1000).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }) : '—'}
                                        </td>
                                        <td className="px-6 py-4 font-fredoka text-base font-semibold">₹{amountOf(order).toFixed(2)}</td>
                                        <td className="px-6 py-4"><StatusPill status={order.status} /></td>
                                        <td className="px-6 py-4 text-right">
                                            <Link href={`/admin/orders/${order.id}`} className="inline-flex items-center gap-1.5 rounded-full border border-[#241F1B]/15 px-3.5 py-1.5 text-xs font-semibold transition-colors group-hover:border-[#F4623B] group-hover:bg-[#F4623B] group-hover:text-white dark:border-white/15">
                                                <Eye size={14} /> View
                                            </Link>
                                        </td>
                                    </Row>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </Panel>
        </div>
    );
}
