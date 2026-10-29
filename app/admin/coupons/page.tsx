'use client';

import { useEffect, useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { db } from '@/lib/firebase';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { Coupon, Order } from '@/lib/types';
import {
    getAllCoupons,
    createCoupon,
    updateCoupon,
    deleteCoupon,
    toggleCouponStatus,
    computeGroupAnalytics,
    GroupAnalytics
} from '@/lib/coupon-utils';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
    Legend
} from 'recharts';
import {
    Ticket,
    Users,
    Package,
    IndianRupee,
    Plus,
    Copy,
    Check,
    Trash2,
    Share2,
    Calendar,
    ArrowUpRight,
    TrendingUp,
    Download,
    Search,
    Filter,
    X,
    Sparkles,
    Award,
    CheckCircle2,
    AlertCircle,
    Loader2
} from 'lucide-react';

const COLORS = ['#2563EB', '#10B981', '#8B5CF6', '#F59E0B', '#EC4899', '#06B6D4', '#64748B'];

export default function AdminCouponsPage() {
    const [coupons, setCoupons] = useState<Coupon[]>([]);
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState<'analytics' | 'coupons'>('analytics');
    const [selectedGroupFilter, setSelectedGroupFilter] = useState<string>('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [copiedCode, setCopiedCode] = useState<string | null>(null);

    // Modal state for coupon generator
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [creating, setCreating] = useState(false);
    const [formData, setFormData] = useState({
        code: '',
        groupName: '',
        discountType: 'percentage' as 'percentage' | 'fixed',
        discountValue: 20,
        minOrderValue: 499,
        maxDiscount: 500,
        usageLimit: 0,
        expiresAt: '',
        description: '',
        contactPerson: '',
        contactEmail: '',
        contactPhone: ''
    });

    const fetchData = async () => {
        setLoading(true);
        try {
            const [fetchedCoupons, ordersSnapshot] = await Promise.all([
                getAllCoupons(),
                getDocs(query(collection(db, 'orders'), orderBy('createdAt', 'desc')))
            ]);

            const fetchedOrders = ordersSnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            } as Order));

            setCoupons(fetchedCoupons);
            setOrders(fetchedOrders);
        } catch (error) {
            console.error('Error loading coupon admin data:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    // Analytics computation
    const analytics = useMemo(() => {
        return computeGroupAnalytics(orders, coupons);
    }, [orders, coupons]);

    const handleCopy = (text: string, id: string) => {
        navigator.clipboard.writeText(text);
        setCopiedCode(id);
        setTimeout(() => setCopiedCode(null), 2500);
    };

    const handleCopyShareLink = (code: string) => {
        const origin = typeof window !== 'undefined' ? window.location.origin : '';
        const shareUrl = `${origin}/?coupon=${encodeURIComponent(code)}`;
        navigator.clipboard.writeText(shareUrl);
        setCopiedCode(`link-${code}`);
        setTimeout(() => setCopiedCode(null), 2500);
    };

    const handleGenerateRandomCode = () => {
        const prefix = formData.groupName ? formData.groupName.replace(/[^A-Za-z]/g, '').slice(0, 4).toUpperCase() : 'BFAB';
        const randomNum = Math.floor(10 + Math.random() * 90);
        const discountPart = formData.discountValue ? formData.discountValue : '20';
        setFormData(prev => ({
            ...prev,
            code: `${prefix || 'BFAB'}${discountPart}_${randomNum}`
        }));
    };

    const handleCreateCoupon = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.code || !formData.groupName) {
            alert('Please provide both Coupon Code and Group/Team Name');
            return;
        }

        setCreating(true);
        try {
            const couponPayload: any = {
                code: formData.code.toUpperCase().trim(),
                groupName: formData.groupName.trim(),
                discountType: formData.discountType,
                discountValue: Number(formData.discountValue),
                minOrderValue: Number(formData.minOrderValue) || 0,
                isActive: true,
                expiresAt: formData.expiresAt || null,
                description: formData.description || '',
                contactPerson: formData.contactPerson || '',
                contactEmail: formData.contactEmail || '',
                contactPhone: formData.contactPhone || ''
            };

            if (formData.discountType === 'percentage' && formData.maxDiscount && Number(formData.maxDiscount) > 0) {
                couponPayload.maxDiscount = Number(formData.maxDiscount);
            }

            if (formData.usageLimit && Number(formData.usageLimit) > 0) {
                couponPayload.usageLimit = Number(formData.usageLimit);
            }

            await createCoupon(couponPayload);

            setIsCreateModalOpen(false);
            setFormData({
                code: '',
                groupName: '',
                discountType: 'percentage',
                discountValue: 20,
                minOrderValue: 499,
                maxDiscount: 500,
                usageLimit: 0,
                expiresAt: '',
                description: '',
                contactPerson: '',
                contactEmail: '',
                contactPhone: ''
            });
            await fetchData();
        } catch (error) {
            console.error('Error creating coupon:', error);
            alert('Failed to create coupon. Make sure code is unique.');
        } finally {
            setCreating(false);
        }
    };

    const handleToggleStatus = async (coupon: Coupon) => {
        try {
            await toggleCouponStatus(coupon.id, coupon.isActive);
            setCoupons(prev => prev.map(c => c.id === coupon.id ? { ...c, isActive: !c.isActive } : c));
        } catch (error) {
            console.error('Error toggling coupon status:', error);
        }
    };

    const handleDeleteCoupon = async (id: string) => {
        if (!confirm('Are you sure you want to delete this coupon? Past order analytics will remain preserved.')) return;
        try {
            await deleteCoupon(id);
            setCoupons(prev => prev.filter(c => c.id !== id));
        } catch (error) {
            console.error('Error deleting coupon:', error);
            alert('Error deleting coupon');
        }
    };

    const handleExportCSV = () => {
        const headers = ['Group Name', 'Assigned Coupons', 'Total Orders', 'Products/Units Sold', 'Gross Sales (INR)', 'Discounts (INR)', 'Net Sales (INR)', 'AOV (INR)'];
        const rows = analytics.groups.map(g => [
            `"${g.groupName}"`,
            `"${g.coupons.join(', ')}"`,
            g.totalOrders,
            g.totalUnitsSold,
            g.grossSales.toFixed(2),
            g.totalDiscounts.toFixed(2),
            g.netSales.toFixed(2),
            g.averageOrderValue.toFixed(2)
        ]);

        const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
        const encodedUri = encodeURI(csvContent);
        const link = document.createElement('a');
        link.setAttribute('href', encodedUri);
        link.setAttribute('download', `BFAB_Group_Sales_Report_${new Date().toISOString().split('T')[0]}.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    // Filtered lists
    const filteredCoupons = useMemo(() => {
        return coupons.filter(c => {
            const matchesSearch = c.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
                c.groupName.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesGroup = selectedGroupFilter === 'all' || c.groupName === selectedGroupFilter;
            return matchesSearch && matchesGroup;
        });
    }, [coupons, searchQuery, selectedGroupFilter]);

    const allGroupNames = useMemo(() => {
        return Array.from(new Set(coupons.map(c => c.groupName))).filter(Boolean);
    }, [coupons]);

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[500px]">
                <Loader2 className="w-10 h-10 animate-spin text-blue-600 mb-3" />
                <p className="text-sm font-semibold text-slate-500">Loading coupon sales analytics...</p>
            </div>
        );
    }

    return (
        <div className="space-y-6 pb-12">

            {/* Header & Quick Actions */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <div className="flex items-center gap-2">
                        <span className="p-2 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-xl">
                            <Ticket size={24} />
                        </span>
                        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                            Coupons & Group Sales Tracking
                        </h1>
                    </div>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-2xl">
                        Issue branded coupons to sales teams, ambassadors, or clinics and track real-time revenue and unit sales per group.
                    </p>
                </div>

                <div className="flex flex-wrap items-center gap-2.5">
                    <button
                        onClick={handleExportCSV}
                        className="inline-flex items-center gap-2 px-4 py-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 rounded-xl text-xs sm:text-sm font-semibold hover:bg-slate-50 dark:hover:bg-slate-700/60 transition-colors shadow-sm"
                    >
                        <Download size={16} />
                        Export Group Report
                    </button>
                    <button
                        onClick={() => setIsCreateModalOpen(true)}
                        className="inline-flex items-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs sm:text-sm font-bold shadow-md shadow-blue-600/20 transition-all hover:scale-[1.02]"
                    >
                        <Plus size={18} />
                        Generate Coupon
                    </button>
                </div>
            </div>

            {/* Top KPI Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                <div className="bg-white dark:bg-slate-900 p-4 sm:p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
                    <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 mb-2">
                        <span className="text-xs font-semibold uppercase tracking-wider">Group Sales Revenue</span>
                        <span className="p-1.5 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 rounded-lg">
                            <IndianRupee size={16} />
                        </span>
                    </div>
                    <div className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
                        ₹{analytics.totalCouponRevenue.toLocaleString('en-IN')}
                    </div>
                    <p className="text-[11px] text-emerald-600 dark:text-emerald-400 font-medium mt-1 flex items-center gap-1">
                        <TrendingUp size={12} /> From partner & team coupons
                    </p>
                </div>

                <div className="bg-white dark:bg-slate-900 p-4 sm:p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
                    <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 mb-2">
                        <span className="text-xs font-semibold uppercase tracking-wider">Units / Products Sold</span>
                        <span className="p-1.5 bg-blue-100 dark:bg-blue-900/30 text-blue-600 rounded-lg">
                            <Package size={16} />
                        </span>
                    </div>
                    <div className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
                        {analytics.totalUnitsSoldViaCoupons.toLocaleString('en-IN')} units
                    </div>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                        Total items sold across groups
                    </p>
                </div>

                <div className="bg-white dark:bg-slate-900 p-4 sm:p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
                    <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 mb-2">
                        <span className="text-xs font-semibold uppercase tracking-wider">Group Orders</span>
                        <span className="p-1.5 bg-purple-100 dark:bg-purple-900/30 text-purple-600 rounded-lg">
                            <Users size={16} />
                        </span>
                    </div>
                    <div className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
                        {analytics.totalCouponOrders} orders
                    </div>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                        Converted through team coupons
                    </p>
                </div>

                <div className="bg-white dark:bg-slate-900 p-4 sm:p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
                    <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 mb-2">
                        <span className="text-xs font-semibold uppercase tracking-wider">Active Teams</span>
                        <span className="p-1.5 bg-amber-100 dark:bg-amber-900/30 text-amber-600 rounded-lg">
                            <Award size={16} />
                        </span>
                    </div>
                    <div className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
                        {analytics.groups.length} Groups
                    </div>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                        {coupons.filter(c => c.isActive).length} active coupon codes
                    </p>
                </div>
            </div>

            {/* Navigation Tabs */}
            <div className="flex border-b border-slate-200 dark:border-slate-800">
                <button
                    onClick={() => setActiveTab('analytics')}
                    className={`pb-3 px-4 font-bold text-sm transition-all border-b-2 flex items-center gap-2 ${
                        activeTab === 'analytics'
                            ? 'border-blue-600 text-blue-600 dark:text-blue-400'
                            : 'border-transparent text-slate-500 hover:text-slate-800 dark:text-slate-400'
                    }`}
                >
                    <TrendingUp size={16} />
                    Team Sales & Product Analytics
                </button>
                <button
                    onClick={() => setActiveTab('coupons')}
                    className={`pb-3 px-4 font-bold text-sm transition-all border-b-2 flex items-center gap-2 ${
                        activeTab === 'coupons'
                            ? 'border-blue-600 text-blue-600 dark:text-blue-400'
                            : 'border-transparent text-slate-500 hover:text-slate-800 dark:text-slate-400'
                    }`}
                >
                    <Ticket size={16} />
                    Coupon Management ({coupons.length})
                </button>
            </div>

            {/* TAB 1: TEAM ANALYTICS */}
            {activeTab === 'analytics' && (
                <div className="space-y-6">

                    {/* Leaderboard & Ranking Cards */}
                    <div>
                        <div className="flex items-center justify-between mb-4">
                            <div>
                                <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                                    Team Performance & Leaderboard
                                </h2>
                                <p className="text-xs text-slate-500 dark:text-slate-400">
                                    Ranking of sales groups by total products sold and generated revenue
                                </p>
                            </div>
                        </div>

                        {analytics.groups.length === 0 ? (
                            <div className="bg-white dark:bg-slate-900 rounded-2xl p-8 border border-dashed border-slate-200 dark:border-slate-800 text-center">
                                <Ticket className="w-10 h-10 text-slate-400 mx-auto mb-3" />
                                <h3 className="text-base font-bold text-slate-800 dark:text-white">No Sales Groups Active Yet</h3>
                                <p className="text-xs text-slate-500 max-w-sm mx-auto mt-1 mb-4">
                                    Generate your first team coupon to start tracking group-wise sales and products sold.
                                </p>
                                <button
                                    onClick={() => setIsCreateModalOpen(true)}
                                    className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition-colors"
                                >
                                    <Plus size={14} /> Generate First Coupon
                                </button>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                                {analytics.groups.map((group, index) => {
                                    const rankIcons = ['🥇', '🥈', '🥉', `#${index + 1}`];
                                    const badgeColor = index === 0
                                        ? 'bg-amber-100 text-amber-800 border-amber-300 dark:bg-amber-950/40 dark:text-amber-300 dark:border-amber-700'
                                        : index === 1
                                        ? 'bg-slate-100 text-slate-800 border-slate-300 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-600'
                                        : 'bg-orange-50 text-orange-800 border-orange-200 dark:bg-orange-950/30 dark:text-orange-300 dark:border-orange-800';

                                    return (
                                        <div
                                            key={group.groupName}
                                            className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between hover:border-blue-500/40 transition-colors"
                                        >
                                            <div>
                                                <div className="flex items-start justify-between gap-2 mb-3">
                                                    <span className={`px-2.5 py-1 rounded-xl text-xs font-bold border flex items-center gap-1.5 ${badgeColor}`}>
                                                        <span>{rankIcons[index] || `#${index + 1}`}</span>
                                                        <span>{index === 0 ? 'Top Selling Team' : `Rank ${index + 1}`}</span>
                                                    </span>
                                                    <span className="text-xs font-mono font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/50 px-2 py-0.5 rounded-md">
                                                        {group.coupons[0] || 'CODE'}
                                                    </span>
                                                </div>

                                                <h3 className="font-extrabold text-base text-slate-900 dark:text-white leading-tight mb-3">
                                                    {group.groupName}
                                                </h3>

                                                <div className="space-y-2 text-xs py-3 border-y border-slate-100 dark:border-slate-800">
                                                    <div className="flex justify-between">
                                                        <span className="text-slate-500">Products / Units Sold:</span>
                                                        <span className="font-extrabold text-blue-600 dark:text-blue-400">{group.totalUnitsSold} units</span>
                                                    </div>
                                                    <div className="flex justify-between">
                                                        <span className="text-slate-500">Gross Sales:</span>
                                                        <span className="font-bold text-slate-900 dark:text-white">₹{group.grossSales.toLocaleString('en-IN')}</span>
                                                    </div>
                                                    <div className="flex justify-between">
                                                        <span className="text-slate-500">Total Orders:</span>
                                                        <span className="font-bold text-slate-900 dark:text-white">{group.totalOrders}</span>
                                                    </div>
                                                    <div className="flex justify-between">
                                                        <span className="text-slate-500">Average Order Value:</span>
                                                        <span className="font-bold text-slate-900 dark:text-white">₹{group.averageOrderValue.toLocaleString('en-IN')}</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="mt-3 pt-2">
                                                {group.topProducts && group.topProducts.length > 0 ? (
                                                    <div>
                                                        <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Top Selling Items</span>
                                                        <div className="flex flex-wrap gap-1">
                                                            {group.topProducts.slice(0, 2).map((p, idx) => (
                                                                <span key={idx} className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-[11px] px-2 py-0.5 rounded-md truncate max-w-full">
                                                                    {p.quantity}x {p.name}
                                                                </span>
                                                            ))}
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <div className="text-[11px] text-slate-400 italic">No sales recorded yet</div>
                                                )}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </div>

                    {/* Visual Charts (Recharts) */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

                        {/* Revenue by Group Bar Chart */}
                        <div className="lg:col-span-8 bg-white dark:bg-slate-900 p-5 sm:p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
                            <h3 className="font-bold text-base text-slate-900 dark:text-white mb-1">
                                Revenue by Sales Group (₹ INR)
                            </h3>
                            <p className="text-xs text-slate-500 dark:text-slate-400 mb-6">
                                Comparison of gross sales volume driven by each team
                            </p>
                            <div className="h-64 sm:h-72 w-full">
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={analytics.chartRevenueByGroup} margin={{ top: 10, right: 10, left: 0, bottom: 20 }}>
                                        <CartesianGrid strokeDasharray="3 3" opacity={0.15} />
                                        <XAxis dataKey="group" tick={{ fontSize: 11 }} interval={0} angle={-15} textAnchor="end" />
                                        <YAxis tick={{ fontSize: 11 }} />
                                        <Tooltip
                                            formatter={(value: any) => [`₹${Number(value).toLocaleString('en-IN')}`, 'Sales']}
                                            contentStyle={{ backgroundColor: '#1E293B', borderColor: '#334155', color: '#fff', borderRadius: '12px' }}
                                        />
                                        <Bar dataKey="revenue" fill="#2563EB" radius={[6, 6, 0, 0]} />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </div>

                        {/* Share of Products Sold (Pie Chart) */}
                        <div className="lg:col-span-4 bg-white dark:bg-slate-900 p-5 sm:p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between">
                            <div>
                                <h3 className="font-bold text-base text-slate-900 dark:text-white mb-1">
                                    Units Sold Share
                                </h3>
                                <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
                                    Product volume distribution by team
                                </p>
                                <div className="h-56 w-full flex items-center justify-center">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <PieChart>
                                            <Pie
                                                data={analytics.chartRevenueByGroup}
                                                dataKey="units"
                                                nameKey="group"
                                                cx="50%"
                                                cy="50%"
                                                innerRadius={45}
                                                outerRadius={75}
                                                paddingAngle={4}
                                            >
                                                {analytics.chartRevenueByGroup.map((entry, index) => (
                                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                                ))}
                                            </Pie>
                                            <Tooltip formatter={(value: any) => [`${value} units`, 'Sold']} />
                                        </PieChart>
                                    </ResponsiveContainer>
                                </div>
                            </div>

                            <div className="space-y-1.5 pt-2 border-t border-slate-100 dark:border-slate-800">
                                {analytics.chartRevenueByGroup.map((entry, idx) => (
                                    <div key={idx} className="flex items-center justify-between text-xs">
                                        <div className="flex items-center gap-2">
                                            <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: COLORS[idx % COLORS.length] }} />
                                            <span className="text-slate-700 dark:text-slate-300 truncate max-w-[140px]">{entry.group}</span>
                                        </div>
                                        <span className="font-bold text-slate-900 dark:text-white">{entry.units} units</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                    </div>

                    {/* Detailed Team Breakdown Table */}
                    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
                        <div className="p-4 sm:p-5 border-b border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                            <div>
                                <h3 className="font-bold text-base text-slate-900 dark:text-white">
                                    Group Sales Ledger & Units Breakdown
                                </h3>
                                <p className="text-xs text-slate-500 dark:text-slate-400">
                                    Comprehensive breakdown of how many products each group sold and total commission/sales value
                                </p>
                            </div>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="w-full text-left text-sm">
                                <thead className="bg-slate-50 dark:bg-slate-800/60 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                                    <tr>
                                        <th className="py-3 px-4">Rank / Group</th>
                                        <th className="py-3 px-4">Coupons</th>
                                        <th className="py-3 px-4 text-center">Orders</th>
                                        <th className="py-3 px-4 text-center">Products Sold</th>
                                        <th className="py-3 px-4 text-right">Gross Sales</th>
                                        <th className="py-3 px-4 text-right">Discounts</th>
                                        <th className="py-3 px-4 text-right">Net Sales</th>
                                        <th className="py-3 px-4 text-right">AOV</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                                    {analytics.groups.map((group, index) => (
                                        <tr key={group.groupName} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                                            <td className="py-3.5 px-4">
                                                <div className="flex items-center gap-2">
                                                    <span className="font-bold text-xs w-6 h-6 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-300">
                                                        {index + 1}
                                                    </span>
                                                    <span className="font-bold text-slate-900 dark:text-white">{group.groupName}</span>
                                                </div>
                                            </td>
                                            <td className="py-3.5 px-4 font-mono text-xs">
                                                {group.coupons.map(c => (
                                                    <span key={c} className="inline-block mr-1.5 px-2 py-0.5 bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-300 rounded font-semibold">
                                                        {c}
                                                    </span>
                                                ))}
                                            </td>
                                            <td className="py-3.5 px-4 text-center font-semibold text-slate-700 dark:text-slate-300">
                                                {group.totalOrders}
                                            </td>
                                            <td className="py-3.5 px-4 text-center">
                                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-extrabold bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300">
                                                    {group.totalUnitsSold} units
                                                </span>
                                            </td>
                                            <td className="py-3.5 px-4 text-right font-medium text-slate-600 dark:text-slate-400">
                                                ₹{group.grossSales.toLocaleString('en-IN')}
                                            </td>
                                            <td className="py-3.5 px-4 text-right font-medium text-emerald-600 dark:text-emerald-400">
                                                -₹{group.totalDiscounts.toLocaleString('en-IN')}
                                            </td>
                                            <td className="py-3.5 px-4 text-right font-extrabold text-slate-900 dark:text-white">
                                                ₹{group.netSales.toLocaleString('en-IN')}
                                            </td>
                                            <td className="py-3.5 px-4 text-right font-semibold text-slate-600 dark:text-slate-400">
                                                ₹{group.averageOrderValue.toLocaleString('en-IN')}
                                            </td>
                                        </tr>
                                    ))}
                                    {analytics.groups.length === 0 && (
                                        <tr>
                                            <td colSpan={8} className="py-12 text-center text-slate-400">
                                                No group sales recorded yet. Once orders are placed with team coupons, attribution data will appear here in real time.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>

                </div>
            )}

            {/* TAB 2: COUPON GENERATION & DIRECTORY */}
            {activeTab === 'coupons' && (
                <div className="space-y-6">

                    {/* Filter & Search Bar */}
                    <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-3">
                        <div className="relative w-full sm:w-80">
                            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                            <input
                                type="text"
                                placeholder="Search by Code or Group..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-9 pr-4 py-2 text-xs sm:text-sm border border-slate-200 dark:border-slate-700 rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        <div className="flex items-center gap-2 w-full sm:w-auto">
                            <Filter size={16} className="text-slate-400" />
                            <select
                                value={selectedGroupFilter}
                                onChange={(e) => setSelectedGroupFilter(e.target.value)}
                                className="px-3 py-2 text-xs sm:text-sm border border-slate-200 dark:border-slate-700 rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="all">All Groups ({coupons.length})</option>
                                {allGroupNames.map(name => (
                                    <option key={name} value={name}>{name}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {/* Coupons List Cards (Mobile) & Table (Desktop) */}
                    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left text-sm">
                                <thead className="bg-slate-50 dark:bg-slate-800/60 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                                    <tr>
                                        <th className="py-3 px-4">Coupon Code</th>
                                        <th className="py-3 px-4">Assigned Group</th>
                                        <th className="py-3 px-4">Discount</th>
                                        <th className="py-3 px-4">Min. Order</th>
                                        <th className="py-3 px-4 text-center">Usage</th>
                                        <th className="py-3 px-4 text-right">Revenue</th>
                                        <th className="py-3 px-4 text-center">Status</th>
                                        <th className="py-3 px-4 text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                                    {filteredCoupons.map((coupon) => (
                                        <tr key={coupon.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                                            <td className="py-3.5 px-4">
                                                <div className="flex items-center gap-2">
                                                    <span className="font-mono font-extrabold text-sm text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/60 px-2.5 py-1 rounded-lg">
                                                        {coupon.code}
                                                    </span>
                                                    <button
                                                        onClick={() => handleCopy(coupon.code, coupon.id)}
                                                        className="text-slate-400 hover:text-blue-600 p-1"
                                                        title="Copy Code"
                                                    >
                                                        {copiedCode === coupon.id ? <Check size={14} className="text-emerald-500" /> : <Copy size={14} />}
                                                    </button>
                                                </div>
                                            </td>

                                            <td className="py-3.5 px-4 font-semibold text-slate-800 dark:text-slate-200">
                                                <div>{coupon.groupName}</div>
                                                {coupon.contactPerson && (
                                                    <span className="text-[11px] text-slate-400 block font-normal">
                                                        Rep: {coupon.contactPerson}
                                                    </span>
                                                )}
                                            </td>

                                            <td className="py-3.5 px-4">
                                                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-bold bg-emerald-100 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300">
                                                    {coupon.discountType === 'percentage' ? `${coupon.discountValue}% OFF` : `₹${coupon.discountValue} OFF`}
                                                </span>
                                            </td>

                                            <td className="py-3.5 px-4 text-slate-600 dark:text-slate-400 text-xs">
                                                {coupon.minOrderValue ? `₹${coupon.minOrderValue}` : 'None'}
                                            </td>

                                            <td className="py-3.5 px-4 text-center">
                                                <span className="font-bold text-slate-900 dark:text-white">
                                                    {coupon.usedCount}
                                                </span>
                                                <span className="text-slate-400 text-xs">
                                                    {coupon.usageLimit ? ` / ${coupon.usageLimit}` : ' / ∞'}
                                                </span>
                                            </td>

                                            <td className="py-3.5 px-4 text-right font-extrabold text-slate-900 dark:text-white">
                                                ₹{(coupon.totalSalesAmount || 0).toLocaleString('en-IN')}
                                            </td>

                                            <td className="py-3.5 px-4 text-center">
                                                <button
                                                    onClick={() => handleToggleStatus(coupon)}
                                                    className={`px-2.5 py-0.5 text-xs font-bold rounded-full transition-colors ${
                                                        coupon.isActive
                                                            ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300'
                                                            : 'bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400'
                                                    }`}
                                                >
                                                    {coupon.isActive ? 'Active' : 'Paused'}
                                                </button>
                                            </td>

                                            <td className="py-3.5 px-4 text-right">
                                                <div className="flex items-center justify-end gap-1.5">
                                                    <button
                                                        onClick={() => handleCopyShareLink(coupon.code)}
                                                        className="p-1.5 text-slate-500 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-lg transition-colors"
                                                        title="Copy Share Link with Auto-Applied Coupon"
                                                    >
                                                        {copiedCode === `link-${coupon.code}` ? (
                                                            <Check size={16} className="text-emerald-500" />
                                                        ) : (
                                                            <Share2 size={16} />
                                                        )}
                                                    </button>
                                                    <button
                                                        onClick={() => handleDeleteCoupon(coupon.id)}
                                                        className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-lg transition-colors"
                                                        title="Delete coupon"
                                                    >
                                                        <Trash2 size={16} />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                    {filteredCoupons.length === 0 && (
                                        <tr>
                                            <td colSpan={8} className="py-12 text-center text-slate-400">
                                                No coupons found. Click &apos;Generate Coupon&apos; to create your first partner coupon.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>

                </div>
            )}

            {/* CREATE COUPON MODAL */}
            <AnimatePresence>
                {isCreateModalOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 15 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 15 }}
                            className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-7 max-w-lg w-full border border-slate-200 dark:border-slate-800 shadow-2xl relative my-8"
                        >
                            <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800 mb-5">
                                <div className="flex items-center gap-2.5">
                                    <div className="p-2 bg-blue-100 dark:bg-blue-900/40 text-blue-600 rounded-xl">
                                        <Sparkles size={20} />
                                    </div>
                                    <div>
                                        <h3 className="font-extrabold text-lg text-slate-900 dark:text-white">
                                            Generate Team Coupon
                                        </h3>
                                        <p className="text-xs text-slate-500 dark:text-slate-400">
                                            Create coupon code and link it to a sales team
                                        </p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => setIsCreateModalOpen(false)}
                                    className="p-1.5 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
                                >
                                    <X size={20} />
                                </button>
                            </div>

                            <form onSubmit={handleCreateCoupon} className="space-y-4">
                                <div>
                                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                                        Group / Team / Ambassador Name *
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="e.g. Team Alpha - Bangalore, Dr. Roy Clinic"
                                        value={formData.groupName}
                                        onChange={(e) => setFormData({ ...formData, groupName: e.target.value })}
                                        className="w-full px-3.5 py-2.5 text-sm border border-slate-300 dark:border-slate-700 rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        required
                                    />
                                </div>

                                <div>
                                    <div className="flex justify-between items-center mb-1">
                                        <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                                            Coupon Code *
                                        </label>
                                        <button
                                            type="button"
                                            onClick={handleGenerateRandomCode}
                                            className="text-xs text-blue-600 dark:text-blue-400 font-semibold hover:underline"
                                        >
                                            Generate Suggestion
                                        </button>
                                    </div>
                                    <input
                                        type="text"
                                        placeholder="e.g. ALPHA20, VETCARE15"
                                        value={formData.code}
                                        onChange={(e) => setFormData({ ...formData, code: e.target.value.toUpperCase() })}
                                        className="w-full px-3.5 py-2.5 text-sm uppercase font-mono tracking-wider border border-slate-300 dark:border-slate-700 rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        required
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-3">
                                    <div>
                                        <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                                            Discount Type
                                        </label>
                                        <select
                                            value={formData.discountType}
                                            onChange={(e) => setFormData({ ...formData, discountType: e.target.value as any })}
                                            className="w-full px-3 py-2 text-sm border border-slate-300 dark:border-slate-700 rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        >
                                            <option value="percentage">Percentage (%)</option>
                                            <option value="fixed">Flat Amount (₹)</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                                            Discount Value *
                                        </label>
                                        <input
                                            type="number"
                                            min="1"
                                            value={formData.discountValue}
                                            onChange={(e) => setFormData({ ...formData, discountValue: Number(e.target.value) })}
                                            className="w-full px-3 py-2 text-sm border border-slate-300 dark:border-slate-700 rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-3">
                                    <div>
                                        <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                                            Min. Order Value (₹)
                                        </label>
                                        <input
                                            type="number"
                                            min="0"
                                            value={formData.minOrderValue}
                                            onChange={(e) => setFormData({ ...formData, minOrderValue: Number(e.target.value) })}
                                            className="w-full px-3 py-2 text-sm border border-slate-300 dark:border-slate-700 rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                                            Max Cap / Limit (₹)
                                        </label>
                                        <input
                                            type="number"
                                            min="0"
                                            placeholder="Optional"
                                            value={formData.maxDiscount}
                                            onChange={(e) => setFormData({ ...formData, maxDiscount: Number(e.target.value) })}
                                            className="w-full px-3 py-2 text-sm border border-slate-300 dark:border-slate-700 rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-3">
                                    <div>
                                        <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                                            Usage Limit
                                        </label>
                                        <input
                                            type="number"
                                            min="0"
                                            placeholder="0 = Unlimited"
                                            value={formData.usageLimit}
                                            onChange={(e) => setFormData({ ...formData, usageLimit: Number(e.target.value) })}
                                            className="w-full px-3 py-2 text-sm border border-slate-300 dark:border-slate-700 rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                                            Expiry Date
                                        </label>
                                        <input
                                            type="date"
                                            value={formData.expiresAt}
                                            onChange={(e) => setFormData({ ...formData, expiresAt: e.target.value })}
                                            className="w-full px-3 py-2 text-sm border border-slate-300 dark:border-slate-700 rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                                        Group Contact / Lead Name (Optional)
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="e.g. Rahul Sharma"
                                        value={formData.contactPerson}
                                        onChange={(e) => setFormData({ ...formData, contactPerson: e.target.value })}
                                        className="w-full px-3 py-2 text-sm border border-slate-300 dark:border-slate-700 rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>

                                <div className="pt-3 flex gap-3">
                                    <button
                                        type="button"
                                        onClick={() => setIsCreateModalOpen(false)}
                                        className="flex-1 py-3 border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 rounded-xl font-bold text-sm hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={creating}
                                        className="flex-1 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold text-sm transition-colors flex items-center justify-center gap-2 shadow-lg shadow-blue-600/20 disabled:opacity-50"
                                    >
                                        {creating ? <Loader2 size={16} className="animate-spin" /> : 'Create Coupon'}
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

        </div>
    );
}

