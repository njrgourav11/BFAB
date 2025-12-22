'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { db } from '@/lib/firebase';
import { collection, getDocs, query, orderBy, limit } from 'firebase/firestore';
import { Order, Product, BlogPost } from '@/lib/types';
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer
} from 'recharts';
import {
    ShoppingBag,
    Package,
    FileText,
    IndianRupee,
    ArrowUpRight,
    Calendar
} from 'lucide-react'; // Note: check specific icons availability
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
        totalBlogs: 0
    });
    const [recentOrders, setRecentOrders] = useState<Order[]>([]);
    const [salesData, setSalesData] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // 1. Fetch Orders
                const ordersRef = collection(db, 'orders');
                const ordersSnapshot = await getDocs(query(ordersRef, orderBy('createdAt', 'desc')));
                const ordersList = ordersSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Order));

                // Calculate Revenue & Order Count
                let revenue = 0;
                ordersList.forEach(order => {
                    // Use totalAmount if available, else amount/100 (Razorpay stores in paise)
                    const amount = order.totalAmount || (order.amount ? order.amount / 100 : 0);
                    // Only count valid orders for revenue (e.g., exclude cancelled if needed, but for now sum all)
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

                // Convert map to array and sort by date 
                // Note: Simple sorting by string might not be enough if format changes, 
                // but standard Date format usually works for rough sorting or we rely on the fetching order if dense enough.
                // Better: Create keys as YYYY-MM-DD for sorting then display formats.
                // Let's re-map with standard sorting.

                const chartData = Array.from(salesMap.entries()).map(([date, sales]) => ({
                    date,
                    sales
                })).reverse(); // Reverse because ordersList is desc, so map iterates desc, we want asc for chart? 
                // modifying: Map iteration order is insertion order usually. 
                // Let's just sort strictly.

                chartData.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

                // Take last 7-14 days or all data? Let's take last 7 data points for clarity or all if small
                const finalChartData = chartData.slice(-14);

                // 2. Fetch Products Count
                const productsSnapshot = await getDocs(collection(db, 'products'));

                // 3. Fetch Blogs Count
                const blogsSnapshot = await getDocs(collection(db, 'blogs'));

                setStats({
                    totalRevenue: revenue,
                    totalOrders: ordersList.length,
                    totalProducts: productsSnapshot.size,
                    totalBlogs: blogsSnapshot.size
                });

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
            color: 'emerald'
        },
        {
            label: 'Total Orders',
            value: stats.totalOrders.toString(),
            icon: ShoppingBag,
            color: 'blue'
        },
        {
            label: 'Products',
            value: stats.totalProducts.toString(),
            icon: Package,
            color: 'purple'
        },
        {
            label: 'Active Blogs',
            value: stats.totalBlogs.toString(),
            icon: FileText,
            color: 'orange'
        },
    ];

    if (loading) {
        return (
            <div className="space-y-6 animate-pulse">
                <div className="h-8 w-1/3 bg-slate-200 dark:bg-slate-800 rounded"></div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {[1, 2, 3, 4].map(i => (
                        <div key={i} className="h-32 bg-slate-200 dark:bg-slate-800 rounded-2xl"></div>
                    ))}
                </div>
                <div className="h-96 bg-slate-200 dark:bg-slate-800 rounded-2xl"></div>
            </div>
        );
    }

    return (
        <div className="space-y-8">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Dashboard</h1>
                <p className="text-slate-500 dark:text-slate-400">Overview of your store performance.</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {statCards.map((stat, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-start justify-between"
                    >
                        <div>
                            <p className="text-sm font-medium text-slate-500 dark:text-slate-400">{stat.label}</p>
                            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-2">{stat.value}</h3>
                        </div>
                        <div className={`p-3 rounded-xl bg-${stat.color}-100 dark:bg-${stat.color}-900/20 text-${stat.color}-600 dark:text-${stat.color}-400`}>
                            <stat.icon className="w-6 h-6" />
                        </div>
                    </motion.div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Sales Chart */}
                <div className="lg:col-span-2 bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-lg font-bold text-slate-900 dark:text-white">Sales Overview</h2>
                    </div>
                    <div className="h-80">
                        {salesData.length > 0 ? (
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={salesData}>
                                    <defs>
                                        <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.1} />
                                            <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                                    <XAxis
                                        dataKey="date"
                                        stroke="#94a3b8"
                                        fontSize={12}
                                        tickLine={false}
                                        axisLine={false}
                                    />
                                    <YAxis
                                        stroke="#94a3b8"
                                        fontSize={12}
                                        tickLine={false}
                                        axisLine={false}
                                        tickFormatter={(value) => `₹${value}`}
                                    />
                                    <Tooltip
                                        contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', border: '1px solid #e2e8f0' }}
                                        formatter={(value: number | undefined) => [`₹${value ?? 0}`, 'Sales']}
                                    />
                                    <Area
                                        type="monotone"
                                        dataKey="sales"
                                        stroke="#3b82f6"
                                        strokeWidth={2}
                                        fillOpacity={1}
                                        fill="url(#colorSales)"
                                    />
                                </AreaChart>
                            </ResponsiveContainer>
                        ) : (
                            <div className="h-full flex items-center justify-center text-slate-400">
                                No sales data available yet
                            </div>
                        )}
                    </div>
                </div>

                {/* Recent Orders */}
                <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-lg font-bold text-slate-900 dark:text-white">Recent Orders</h2>
                        <Link href="/admin/orders" className="text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1">
                            View All <ArrowUpRight className="w-4 h-4" />
                        </Link>
                    </div>
                    <div className="space-y-4">
                        {recentOrders.map((order) => (
                            <div key={order.id} className="flex items-center justify-between p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/20 flex items-center justify-center text-blue-600 dark:text-blue-400">
                                        <ShoppingBag className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <p className="font-medium text-slate-900 dark:text-white">
                                            #{order.id.slice(0, 6)}...
                                        </p>
                                        <p className="text-xs text-slate-500">
                                            {order.items.length} items • {order.status}
                                        </p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="font-bold text-slate-900 dark:text-white">
                                        {formatCurrency(order.totalAmount || (order.amount ? order.amount / 100 : 0))}
                                    </p>
                                    <p className="text-xs text-slate-500">
                                        {order.createdAt && typeof order.createdAt === 'object' && 'seconds' in order.createdAt
                                            ? new Date(order.createdAt.seconds * 1000).toLocaleDateString()
                                            : new Date(order.createdAt as string).toLocaleDateString()
                                        }
                                    </p>
                                </div>
                            </div>
                        ))}
                        {recentOrders.length === 0 && (
                            <div className="text-center text-slate-500 py-4">
                                No orders yet
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
