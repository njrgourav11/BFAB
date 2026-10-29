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
    BarChart,
    Bar
} from 'recharts';
import {
    ShoppingBag,
    Package,
    FileText,
    IndianRupee,
    ArrowUpRight,
    Calendar,
    Ticket,
    Users,
    TrendingUp,
    Award
} from 'lucide-react';
import Link from 'next/link';

// Helper to format currency
const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        maximumFractionDigits: 0
    }).format(amount);
};

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

    const statCards = [
        {
            label: 'Total Revenue',
            value: formatCurrency(stats.totalRevenue),
            icon: IndianRupee,
            color: 'emerald',
            href: '/admin/orders'
        },
        {
            label: 'Team Coupon Sales',
            value: formatCurrency(stats.groupSalesRevenue),
            icon: Ticket,
            color: 'blue',
            badge: `${stats.groupUnitsSold} units sold`,
            href: '/admin/coupons'
        },
        {
            label: 'Total Orders',
            value: stats.totalOrders.toString(),
            icon: ShoppingBag,
            color: 'indigo',
            href: '/admin/orders'
        },
        {
            label: 'Catalog Products',
            value: stats.totalProducts.toString(),
            icon: Package,
            color: 'purple',
            href: '/admin/products'
        },
    ];

    if (loading) {
        return (
            <div className="space-y-6 animate-pulse">
                <div className="h-8 bg-slate-200 dark:bg-slate-800 rounded w-1/4"></div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {[1, 2, 3, 4].map((i) => (
                        <div key={i} className="h-32 bg-slate-200 dark:bg-slate-800 rounded-2xl"></div>
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                        Executive Overview
                    </h1>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                        Live monitoring of sales, team coupon conversions, and store health.
                    </p>
                </div>
                <div className="flex items-center gap-3">
                    <Link
                        href="/admin/coupons"
                        className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-bold shadow-md shadow-blue-600/20 transition-all"
                    >
                        <Ticket size={16} />
                        Group Sales Dashboard
                    </Link>
                </div>
            </div>

            {/* Stat Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                {statCards.map((card, index) => {
                    const Icon = card.icon;
                    return (
                        <Link href={card.href} key={index}>
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.08 }}
                                className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md hover:border-blue-400 dark:hover:border-blue-500 transition-all cursor-pointer h-full flex flex-col justify-between"
                            >
                                <div>
                                    <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 mb-2">
                                        <span className="text-xs font-semibold uppercase tracking-wider">{card.label}</span>
                                        <span className="p-2 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-xl">
                                            <Icon size={18} />
                                        </span>
                                    </div>
                                    <div className="text-2xl font-black text-slate-900 dark:text-white">
                                        {card.value}
                                    </div>
                                </div>
                                {card.badge ? (
                                    <span className="mt-3 inline-flex items-center gap-1 text-xs font-bold text-emerald-600 dark:text-emerald-400">
                                        <TrendingUp size={12} /> {card.badge}
                                    </span>
                                ) : (
                                    <span className="mt-3 text-xs text-blue-600 dark:text-blue-400 font-medium flex items-center gap-1">
                                        View details <ArrowUpRight size={12} />
                                    </span>
                                )}
                            </motion.div>
                        </Link>
                    );
                })}
            </div>

            {/* Sales Chart & Top Selling Groups Section */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

                {/* Sales Chart */}
                <div className="lg:col-span-8 bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm">
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h2 className="text-lg font-bold text-slate-900 dark:text-white">Revenue Timeline</h2>
                            <p className="text-xs text-slate-500 dark:text-slate-400">Daily gross orders trajectory</p>
                        </div>
                    </div>
                    <div className="h-72 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={salesData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                                <defs>
                                    <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#2563EB" stopOpacity={0.25} />
                                        <stop offset="95%" stopColor="#2563EB" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" opacity={0.15} />
                                <XAxis dataKey="date" tick={{ fontSize: 11 }} />
                                <YAxis tick={{ fontSize: 11 }} tickFormatter={(val) => `₹${val}`} />
                                <Tooltip
                                    formatter={(value: any) => [`₹${Number(value).toLocaleString('en-IN')}`, 'Sales']}
                                    contentStyle={{ backgroundColor: '#1E293B', borderColor: '#334155', color: '#fff', borderRadius: '12px' }}
                                />
                                <Area type="monotone" dataKey="sales" stroke="#2563EB" strokeWidth={2.5} fillOpacity={1} fill="url(#colorSales)" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Top Performing Teams Widget */}
                <div className="lg:col-span-4 bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between">
                    <div>
                        <div className="flex items-center justify-between mb-4">
                            <div>
                                <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                                    <Award className="text-amber-500" size={18} />
                                    Top Sales Teams
                                </h2>
                                <p className="text-xs text-slate-500 dark:text-slate-400">Ranked by products sold</p>
                            </div>
                            <Link href="/admin/coupons" className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline">
                                View All
                            </Link>
                        </div>

                        <div className="space-y-3">
                            {topGroups.length === 0 ? (
                                <div className="py-8 text-center text-slate-400 text-xs">
                                    No sales groups or coupon sales recorded yet.
                                </div>
                            ) : (
                                topGroups.map((group, idx) => (
                                    <div
                                        key={group.groupName}
                                        className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-slate-800 flex items-center justify-between"
                                    >
                                        <div className="flex items-center gap-2.5 min-w-0">
                                            <span className="w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 font-extrabold text-xs flex items-center justify-center shrink-0">
                                                {idx + 1}
                                            </span>
                                            <div className="min-w-0">
                                                <p className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white truncate">
                                                    {group.groupName}
                                                </p>
                                                <span className="font-mono text-[10px] text-blue-600 dark:text-blue-400 font-semibold">
                                                    Code: {group.coupons[0] || 'NONE'}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="text-right shrink-0">
                                            <div className="text-xs font-black text-slate-900 dark:text-white">
                                                {group.totalUnitsSold} units
                                            </div>
                                            <div className="text-[10px] text-slate-500 dark:text-slate-400">
                                                ₹{group.netSales.toLocaleString('en-IN')}
                                            </div>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>

                    <Link
                        href="/admin/coupons"
                        className="mt-4 block w-full text-center py-2.5 bg-blue-50 dark:bg-blue-950/40 hover:bg-blue-100 dark:hover:bg-blue-900/50 text-blue-600 dark:text-blue-300 rounded-xl text-xs font-bold transition-colors"
                    >
                        Manage Teams & Coupons →
                    </Link>
                </div>
            </div>

            {/* Recent Orders Table */}
            <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
                <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center">
                    <div>
                        <h2 className="text-lg font-bold text-slate-900 dark:text-white">Recent Orders</h2>
                        <p className="text-xs text-slate-500 dark:text-slate-400">Latest customer transactions and attribution</p>
                    </div>
                    <Link href="/admin/orders" className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline">
                        View All Orders →
                    </Link>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-slate-50 dark:bg-slate-800/60 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                            <tr>
                                <th className="py-3.5 px-6">Order ID</th>
                                <th className="py-3.5 px-6">Customer</th>
                                <th className="py-3.5 px-6">Coupon / Team</th>
                                <th className="py-3.5 px-6 text-right">Amount</th>
                                <th className="py-3.5 px-6 text-center">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                            {recentOrders.map((order) => (
                                <tr key={order.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                                    <td className="py-4 px-6 font-mono font-medium text-slate-900 dark:text-white text-xs">
                                        <Link href={`/admin/orders/${order.id}`} className="hover:text-blue-600">
                                            #{order.id.slice(0, 8)}...
                                        </Link>
                                    </td>
                                    <td className="py-4 px-6">
                                        <div className="font-semibold text-slate-900 dark:text-white text-xs sm:text-sm">
                                            {order.billingInfo?.firstName} {order.billingInfo?.lastName}
                                        </div>
                                        <div className="text-[11px] text-slate-500 dark:text-slate-400">
                                            {order.billingInfo?.city || order.userEmail}
                                        </div>
                                    </td>
                                    <td className="py-4 px-6">
                                        {order.couponCode ? (
                                            <div>
                                                <span className="font-mono text-xs font-extrabold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/60 px-2 py-0.5 rounded">
                                                    {order.couponCode}
                                                </span>
                                                <span className="text-[11px] text-slate-500 block mt-0.5">
                                                    {order.groupName || 'Partner'}
                                                </span>
                                            </div>
                                        ) : (
                                            <span className="text-xs text-slate-400 italic">Direct / Organic</span>
                                        )}
                                    </td>
                                    <td className="py-4 px-6 text-right font-bold text-slate-900 dark:text-white">
                                        ₹{(order.totalAmount || (order.amount ? order.amount / 100 : 0)).toFixed(2)}
                                    </td>
                                    <td className="py-4 px-6 text-center">
                                        <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                                            order.status === 'Paid'
                                                ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/50 dark:text-emerald-300'
                                                : order.status === 'Cancelled'
                                                ? 'bg-red-100 text-red-800 dark:bg-red-950/50 dark:text-red-300'
                                                : 'bg-amber-100 text-amber-800 dark:bg-amber-950/50 dark:text-amber-300'
                                        }`}>
                                            {order.status || 'Pending'}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
