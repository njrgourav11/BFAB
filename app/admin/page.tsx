'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { db } from '@/lib/firebase';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { Order, Product, BlogPost, Coupon } from '@/lib/types';
import { getAllCoupons, computeGroupAnalytics } from '@/lib/coupon-utils';
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from 'recharts';
import { ShoppingBag, Package, IndianRupee, Ticket, Award, Plus, PenLine, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import FloatingProducts from '@/components/motion/FloatingProducts';
import { AdminButton, Panel, PanelHead, Row, SkeletonBlock, StatCard, StatusPill, Empty, th, adminEase } from '@/components/admin/ui';

export default function AdminDashboard() {
    const [stats, setStats] = useState({
        totalRevenue: 0,
        totalOrders: 0,
        totalProducts: 0,
        totalBlogs: 0,
        groupSalesRevenue: 0,
        groupUnitsSold: 0
    });
    const [recentOrders, setRecentOrders] = useState<Order[]>([]);
    const [salesData, setSalesData] = useState<any[]>([]);
    const [topGroups, setTopGroups] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // 1. Fetch Orders & Coupons in parallel
                const [ordersSnapshot, productsSnapshot, blogsSnapshot, couponsList] = await Promise.all([
                    getDocs(query(collection(db, 'orders'), orderBy('createdAt', 'desc'))),
                    getDocs(collection(db, 'products')),
                    getDocs(collection(db, 'blogs')),
                    getAllCoupons()
                ]);

                const ordersList = ordersSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Order));

                // Calculate Revenue & Order Count
                let revenue = 0;
                ordersList.forEach(order => {
                    const amount = order.totalAmount || (order.amount ? order.amount / 100 : 0);
                    if (order.status !== 'Cancelled') {
                        revenue += amount;
                    }
                });

                // Prepare Chart Data (Group by Date)
                const salesMap = new Map<string, number>();
                ordersList.forEach(order => {
                    if (order.status === 'Cancelled') return;

                    let dateStr = '';
                    if (order.createdAt && typeof order.createdAt === 'object' && 'seconds' in order.createdAt) {
                        dateStr = new Date(order.createdAt.seconds * 1000).toLocaleDateString();
                    } else if (typeof order.createdAt === 'string') {
                        dateStr = new Date(order.createdAt).toLocaleDateString();
                    } else if (order.createdAt instanceof Date) {
                        dateStr = order.createdAt.toLocaleDateString();
                    }

                    const amount = order.totalAmount || (order.amount ? order.amount / 100 : 0);
                    salesMap.set(dateStr, (salesMap.get(dateStr) || 0) + amount);
                });

                const chartData = Array.from(salesMap.entries()).map(([date, sales]) => ({
                    date,
                    sales
                }));

                chartData.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
                const finalChartData = chartData.slice(-14);

                // Group coupon analytics
                const groupAnalytics = computeGroupAnalytics(ordersList, couponsList);

                setStats({
                    totalRevenue: revenue,
                    totalOrders: ordersList.length,
                    totalProducts: productsSnapshot.size,
                    totalBlogs: blogsSnapshot.size,
                    groupSalesRevenue: groupAnalytics.totalCouponRevenue,
                    groupUnitsSold: groupAnalytics.totalUnitsSoldViaCoupons
                });

                setTopGroups(groupAnalytics.groups.slice(0, 4));
                setRecentOrders(ordersList.slice(0, 5));
                setSalesData(finalChartData);

            } catch (error) {
                console.error("Error fetching dashboard data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const hour = new Date().getHours();
    const greeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening';
    const orderAmount = (o: Order) => o.totalAmount || (o.amount ? o.amount / 100 : 0);

    if (loading) {
        return (
            <div className="space-y-6">
                <SkeletonBlock className="h-44" />
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
                    {[0, 1, 2, 3].map((i) => <SkeletonBlock key={i} className="h-44" />)}
                </div>
                <div className="grid gap-5 lg:grid-cols-12">
                    <SkeletonBlock className="h-80 lg:col-span-8" />
                    <SkeletonBlock className="h-80 lg:col-span-4" />
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Greeting banner */}
            <motion.section
                initial={{ opacity: 0, y: 20, clipPath: 'inset(0% 0% 100% 0% round 28px)' }}
                animate={{ opacity: 1, y: 0, clipPath: 'inset(0% 0% 0% 0% round 28px)' }}
                transition={{ duration: 0.9, ease: adminEase }}
                className="relative isolate overflow-hidden rounded-[28px] bg-[#14100D] px-7 py-9 text-white sm:px-10"
            >
                <div aria-hidden className="absolute -left-20 -top-24 -z-10 h-72 w-72 rounded-full bg-[#F4623B]/40 blur-3xl" />
                <div aria-hidden className="absolute -right-24 -bottom-32 -z-10 h-80 w-80 rounded-full border-[50px] border-[#F4623B]/15" />
                <FloatingProducts
                    className="-z-[1] hidden md:block"
                    items={[
                        { name: 'peanut', className: 'right-[6%] top-[12%] w-24', rotate: 10, depth: 0.1 },
                        { name: 'jerky', className: 'right-[18%] bottom-[-10%] w-24', rotate: -8, depth: 0.15 },
                        { name: 'hemp', className: 'right-[28%] top-[14%] w-10', rotate: 14, depth: 0.2 },
                    ]}
                />
                <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#E3A438]">{greeting}</p>
                <h1 className="mt-2 max-w-xl font-fredoka text-[clamp(2rem,3.6vw,3rem)] font-bold leading-[1] tracking-[-0.02em]">
                    Here&apos;s how the pack is doing today.
                </h1>
                <p className="mt-3 max-w-lg text-sm text-white/60">Live sales, team coupon conversions and store health — all in one place.</p>
                <div className="mt-6 flex flex-wrap gap-2.5">
                    <AdminButton href="/admin/products/new" icon={Plus}>Add product</AdminButton>
                    <Link href="/admin/blogs/new" className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-white/20">
                        <PenLine size={16} /> Write a post
                    </Link>
                    <Link href="/admin/coupons" className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-white/20">
                        <Ticket size={16} /> Coupons
                    </Link>
                </div>
            </motion.section>

            {/* Stats */}
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
                <StatCard index={0} label="Total revenue" value={Math.round(stats.totalRevenue)} prefix="₹" icon={IndianRupee} tone="orange" href="/admin/orders" />
                <StatCard index={1} label="Team coupon sales" value={Math.round(stats.groupSalesRevenue)} prefix="₹" icon={Ticket} tone="marigold" href="/admin/coupons" note={`${stats.groupUnitsSold} units via coupons`} />
                <StatCard index={2} label="Orders" value={stats.totalOrders} icon={ShoppingBag} tone="ink" href="/admin/orders" />
                <StatCard index={3} label="Products" value={stats.totalProducts} icon={Package} tone="mint" href="/admin/products" note={`${stats.totalBlogs} blog posts live`} />
            </div>

            {/* Chart + teams */}
            <div className="grid grid-cols-1 gap-5 lg:grid-cols-12">
                <Panel className="lg:col-span-8" delay={0.25}>
                    <PanelHead title="Revenue timeline" subtitle="Daily gross sales, last 14 days with orders" />
                    <div className="h-72 px-3 pb-4 pt-5">
                        {salesData.length === 0 ? (
                            <Empty title="No sales yet" hint="Revenue will chart here as orders come in." />
                        ) : (
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={salesData} margin={{ top: 10, right: 12, left: 0, bottom: 0 }}>
                                    <defs>
                                        <linearGradient id="bfabSales" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="0%" stopColor="#F4623B" stopOpacity={0.35} />
                                            <stop offset="100%" stopColor="#F4623B" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#241F1B" opacity={0.08} vertical={false} />
                                    <XAxis dataKey="date" tick={{ fontSize: 11, fill: '#857A6D' }} axisLine={false} tickLine={false} />
                                    <YAxis tick={{ fontSize: 11, fill: '#857A6D' }} axisLine={false} tickLine={false} tickFormatter={(v) => `₹${v}`} width={60} />
                                    <Tooltip
                                        cursor={{ stroke: '#F4623B', strokeWidth: 1, strokeDasharray: '4 4' }}
                                        formatter={(value: any) => [`₹${Number(value).toLocaleString('en-IN')}`, 'Sales']}
                                        contentStyle={{ backgroundColor: '#14100D', border: 'none', color: '#fff', borderRadius: 14, fontSize: 12 }}
                                    />
                                    <Area type="monotone" dataKey="sales" stroke="#F4623B" strokeWidth={3} fill="url(#bfabSales)" animationDuration={1400} dot={{ r: 3, fill: '#F4623B', strokeWidth: 0 }} activeDot={{ r: 6, fill: '#F4623B', stroke: '#fff', strokeWidth: 2 }} />
                                </AreaChart>
                            </ResponsiveContainer>
                        )}
                    </div>
                </Panel>

                <Panel className="flex flex-col lg:col-span-4" delay={0.32}>
                    <PanelHead
                        title="Top sales teams"
                        subtitle="Ranked by units sold"
                        action={<Link href="/admin/coupons" className="text-xs font-semibold text-[#F4623B] hover:underline">View all</Link>}
                    />
                    <div className="flex-1 space-y-2.5 p-4">
                        {topGroups.length === 0 ? (
                            <Empty title="No team sales yet" hint="Coupon-driven sales show up here." />
                        ) : (
                            topGroups.map((group, idx) => {
                                const max = topGroups[0]?.totalUnitsSold || 1;
                                return (
                                    <motion.div
                                        key={group.groupName}
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.4 + idx * 0.08, duration: 0.5, ease: adminEase }}
                                        className="rounded-2xl bg-[#F6F2EB] p-3.5 dark:bg-white/[0.04]"
                                    >
                                        <div className="flex items-center gap-3">
                                            <span className={`grid h-8 w-8 shrink-0 place-items-center rounded-full font-fredoka text-sm font-bold ${idx === 0 ? 'bg-[#E3A438] text-[#241F1B]' : 'bg-[#241F1B] text-white dark:bg-white/15'}`}>
                                                {idx === 0 ? <Award size={15} /> : idx + 1}
                                            </span>
                                            <div className="min-w-0 flex-1">
                                                <p className="truncate text-sm font-semibold">{group.groupName}</p>
                                                <p className="font-mono text-[10px] text-[#F4623B]">{group.coupons[0] || 'NO CODE'}</p>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-sm font-bold">{group.totalUnitsSold} units</p>
                                                <p className="text-[11px] text-[#241F1B]/50 dark:text-white/45">₹{group.netSales.toLocaleString('en-IN')}</p>
                                            </div>
                                        </div>
                                        <div className="mt-2.5 h-1.5 overflow-hidden rounded-full bg-[#241F1B]/[0.07] dark:bg-white/10">
                                            <motion.div
                                                initial={{ width: 0 }}
                                                animate={{ width: `${(group.totalUnitsSold / max) * 100}%` }}
                                                transition={{ delay: 0.6 + idx * 0.08, duration: 1, ease: adminEase }}
                                                className="h-full rounded-full bg-[#F4623B]"
                                            />
                                        </div>
                                    </motion.div>
                                );
                            })
                        )}
                    </div>
                    <div className="p-4 pt-0">
                        <Link href="/admin/coupons" className="group flex items-center justify-center gap-2 rounded-2xl bg-[#241F1B] py-3 text-sm font-semibold text-white hover:bg-black dark:bg-white dark:text-[#241F1B]">
                            Manage teams & coupons <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
                        </Link>
                    </div>
                </Panel>
            </div>

            {/* Recent orders */}
            <Panel delay={0.4}>
                <PanelHead
                    title="Recent orders"
                    subtitle="Latest transactions and their attribution"
                    action={<Link href="/admin/orders" className="text-xs font-semibold text-[#F4623B] hover:underline">All orders →</Link>}
                />
                {recentOrders.length === 0 ? (
                    <Empty title="No orders yet" hint="New orders will appear here the moment they're placed." />
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full min-w-[640px] text-left text-sm">
                            <thead>
                                <tr>
                                    <th className={th}>Order</th>
                                    <th className={th}>Customer</th>
                                    <th className={th}>Coupon / team</th>
                                    <th className={`${th} text-right`}>Amount</th>
                                    <th className={`${th} text-center`}>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {recentOrders.map((order, i) => (
                                    <Row key={order.id} i={i}>
                                        <td className="px-6 py-4">
                                            <Link href={`/admin/orders/${order.id}`} className="font-mono text-xs font-semibold hover:text-[#F4623B]">#{order.id.slice(0, 8)}</Link>
                                        </td>
                                        <td className="px-6 py-4">
                                            <p className="font-semibold">{order.billingInfo?.firstName} {order.billingInfo?.lastName}</p>
                                            <p className="text-[11px] text-[#241F1B]/50 dark:text-white/45">{order.billingInfo?.city || order.userEmail}</p>
                                        </td>
                                        <td className="px-6 py-4">
                                            {order.couponCode ? (
                                                <>
                                                    <span className="rounded-md bg-[#F4623B]/10 px-2 py-0.5 font-mono text-xs font-bold text-[#D9502C]">{order.couponCode}</span>
                                                    <span className="mt-0.5 block text-[11px] text-[#241F1B]/50 dark:text-white/45">{order.groupName || 'Partner'}</span>
                                                </>
                                            ) : (
                                                <span className="text-xs italic text-[#241F1B]/40 dark:text-white/35">Direct</span>
                                            )}
                                        </td>
                                        <td className="px-6 py-4 text-right font-fredoka text-base font-semibold">₹{orderAmount(order).toLocaleString('en-IN', { maximumFractionDigits: 2 })}</td>
                                        <td className="px-6 py-4 text-center"><StatusPill status={order.status} /></td>
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
