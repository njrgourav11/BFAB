'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { auth, db } from '@/lib/firebase';
import { onAuthStateChanged, updateProfile, signOut } from 'firebase/auth';
import { collection, query, where, getDocs, orderBy, doc, updateDoc } from 'firebase/firestore';
import { User, MapPin, Package, LogOut, Loader2, Download, Settings, ChevronRight } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { Order } from '@/lib/types'; // Uses shared types
import { generateInvoice } from '@/lib/invoice-utils';
import Image from 'next/image';

interface UserProfile {
    uid: string;
    email: string | null;
    displayName: string | null;
    photoURL: string | null;
    phoneNumber: string | null;
}

const ProfilePage = () => {
    const router = useRouter();
    const [user, setUser] = useState<UserProfile | null>(null);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState<'profile' | 'orders' | 'address'>('profile');
    const [editMode, setEditMode] = useState(false);
    const [editName, setEditName] = useState('');
    const [editPhone, setEditPhone] = useState('');
    const [orders, setOrders] = useState<Order[]>([]);
    const [ordersLoading, setOrdersLoading] = useState(false);

    // Auth Listener
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            if (!currentUser) {
                router.push('/login');
            } else {
                setUser({
                    uid: currentUser.uid,
                    email: currentUser.email,
                    displayName: currentUser.displayName,
                    photoURL: currentUser.photoURL,
                    phoneNumber: currentUser.phoneNumber
                });
                fetchOrders(currentUser.uid);
            }
            setLoading(false);
        });
        return () => unsubscribe();
    }, [router]);

    const fetchOrders = async (uid: string) => {
        setOrdersLoading(true);
        try {
            // Create a query against the collection.
            // Note: 'userId' field in Firestore matches the 'uid' we are passing.
            // Adjust index requirement might appear in console.
            const q = query(
                collection(db, 'orders'),
                where('userId', '==', uid),
                orderBy('createdAt', 'desc')
            );
            const querySnapshot = await getDocs(q);
            const fetchedOrders: Order[] = [];
            querySnapshot.forEach((doc) => {
                fetchedOrders.push({ id: doc.id, ...doc.data() } as Order);
            });
            setOrders(fetchedOrders);
        } catch (error) {
            console.error("Error fetching orders:", error);
        } finally {
            setOrdersLoading(false);
        }
    };

    const handleLogout = async () => {
        await signOut(auth);
        router.push('/login');
    };

    const handleUpdateProfile = async () => {
        if (!user) return;
        try {
            setLoading(true);
            const userRef = doc(db, 'users', user.uid);
            // Update Firestore
            await updateDoc(userRef, {
                displayName: editName,
                phoneNumber: editPhone
            });
            // Update Auth Profile (DisplayName only)
            if (auth.currentUser) {
                await updateProfile(auth.currentUser, {
                    displayName: editName
                });
            }
            // Update Local State
            setUser(prev => prev ? { ...prev, displayName: editName, phoneNumber: editPhone } : null);
            setEditMode(false);
        } catch (error) {
            console.error("Error updating profile:", error);
            alert("Failed to update profile.");
        } finally {
            setLoading(false);
        }
    };

    // Initialize edit state when user loads
    useEffect(() => {
        if (user) {
            setEditName(user.displayName || '');
            setEditPhone(user.phoneNumber || '');
        }
    }, [user]);

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 dark:bg-slate-950 py-12 px-4">
                <div className="container mx-auto max-w-5xl">
                    <Skeleton className="h-10 w-48 mb-8" />
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        {/* Sidebar Skeleton */}
                        <div className="md:col-span-1 space-y-6">
                            <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 space-y-4">
                                <Skeleton className="w-20 h-20 rounded-full mx-auto" />
                                <div className="space-y-2">
                                    <Skeleton className="h-6 w-3/4 mx-auto" />
                                    <Skeleton className="h-4 w-1/2 mx-auto" />
                                </div>
                                <div className="space-y-2 pt-4">
                                    <Skeleton className="h-10 w-full rounded-xl" />
                                    <Skeleton className="h-10 w-full rounded-xl" />
                                    <Skeleton className="h-10 w-full rounded-xl" />
                                </div>
                            </div>
                        </div>
                        {/* Content Skeleton */}
                        <div className="md:col-span-3">
                            <div className="bg-white dark:bg-slate-900 rounded-2xl p-8 space-y-6">
                                <Skeleton className="h-8 w-1/3 mb-6" />
                                <div className="space-y-6">
                                    <div className="space-y-2">
                                        <Skeleton className="h-4 w-24" />
                                        <Skeleton className="h-12 w-full rounded-xl" />
                                    </div>
                                    <div className="space-y-2">
                                        <Skeleton className="h-4 w-24" />
                                        <Skeleton className="h-12 w-full rounded-xl" />
                                    </div>
                                    <div className="space-y-2">
                                        <Skeleton className="h-4 w-24" />
                                        <Skeleton className="h-12 w-full rounded-xl" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (!user) return null;

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-slate-950 py-12 px-4 transition-colors duration-300">
            <div className="container mx-auto max-w-5xl">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-8">My Account</h1>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Sidebar */}
                    <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm p-6 h-fit md:col-span-1">
                        <div className="flex flex-col items-center mb-6">
                            <div className="w-20 h-20 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400 font-bold text-2xl mb-3 overflow-hidden">
                                {user.photoURL ? <Image src={user.photoURL} alt="Profile" width={80} height={80} className="object-cover w-full h-full" /> : (user.displayName?.[0] || 'U')}
                            </div>
                            <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 text-center">{user.displayName || 'User'}</h2>
                            <p className="text-sm text-gray-500 dark:text-gray-400 text-center break-all">{user.email}</p>
                        </div>

                        <nav className="space-y-2">
                            <button
                                onClick={() => setActiveTab('profile')}
                                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'profile' ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 font-bold' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-slate-800'}`}
                            >
                                <User size={20} /> Profile
                            </button>
                            <button
                                onClick={() => setActiveTab('orders')}
                                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'orders' ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 font-bold' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-slate-800'}`}
                            >
                                <Package size={20} /> Orders
                            </button>
                            {/* Address Tab Placeholder if needed in future */}
                            <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-600 hover:bg-red-50 dark:hover:bg-red-900/10 transition-all">
                                <LogOut size={20} /> Logout
                            </button>
                        </nav>
                    </div>

                    {/* Content Area */}
                    <div className="md:col-span-3">
                        {activeTab === 'profile' && (
                            <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm p-8">
                                <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6 flex items-center gap-2">
                                    <Settings className="text-blue-600" /> Profile Details
                                </h2>
                                <div className="space-y-6">
                                    <div className="flex justify-between items-center">
                                        {/* Phone number logic */}
                                    </div>
                                    <div className="grid gap-6">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Full Name</label>
                                            {editMode ? (
                                                <input
                                                    type="text"
                                                    value={editName}
                                                    onChange={(e) => setEditName(e.target.value)}
                                                    className="w-full p-3 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                                                />
                                            ) : (
                                                <div className="text-lg font-medium text-gray-900 dark:text-gray-100 p-3 bg-gray-50 dark:bg-slate-800 rounded-lg">{user.displayName || 'N/A'}</div>
                                            )}
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Email Address</label>
                                            <div className="text-lg font-medium text-gray-900 dark:text-gray-100 p-3 bg-gray-50 dark:bg-slate-800 rounded-lg opacity-70 cursor-not-allowed">{user.email}</div>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Phone Number</label>
                                            {editMode ? (
                                                <input
                                                    type="tel"
                                                    value={editPhone}
                                                    onChange={(e) => setEditPhone(e.target.value)}
                                                    placeholder="Add phone number"
                                                    className="w-full p-3 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                                                />
                                            ) : (
                                                <div className="text-lg font-medium text-gray-900 dark:text-gray-100 p-3 bg-gray-50 dark:bg-slate-800 rounded-lg flex justify-between items-center">
                                                    {user.phoneNumber || <span className="text-gray-400 italic">No phone added</span>}
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    <div className="mt-6 flex justify-end">
                                        {editMode ? (
                                            <div className="flex gap-3">
                                                <button
                                                    onClick={() => setEditMode(false)}
                                                    className="px-4 py-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
                                                >
                                                    Cancel
                                                </button>
                                                <button
                                                    onClick={handleUpdateProfile}
                                                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium shadow-sm"
                                                >
                                                    Save Changes
                                                </button>
                                            </div>
                                        ) : (
                                            <button
                                                onClick={() => setEditMode(true)}
                                                className="px-4 py-2 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-lg hover:opacity-90 transition-opacity font-medium shadow-sm flex items-center gap-2"
                                            >
                                                <Settings size={16} /> Edit Profile
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === 'orders' && (
                            <div className="space-y-6">
                                {ordersLoading ? (
                                    <div className="text-center py-12"><Loader2 className="animate-spin mx-auto text-blue-600" size={32} /></div>
                                ) : orders.length === 0 ? (
                                    <div className="bg-white dark:bg-slate-900 rounded-2xl p-12 text-center">
                                        <Package size={48} className="mx-auto text-gray-300 dark:text-slate-700 mb-4" />
                                        <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100">No orders yet</h3>
                                        <p className="text-gray-500 dark:text-gray-400 mt-2">Looks like you haven't placed any orders yet.</p>
                                    </div>
                                ) : (
                                    orders.map((order) => (
                                        <div key={order.id} className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm overflow-hidden border border-gray-100 dark:border-slate-800">
                                            <div className="p-6 border-b border-gray-100 dark:border-slate-800 flex flex-wrap gap-4 justify-between items-center bg-gray-50/50 dark:bg-slate-800/50">
                                                <div>
                                                    <p className="text-sm text-gray-500 dark:text-gray-400">Order ID</p>
                                                    <p className="font-mono font-bold text-gray-900 dark:text-gray-100">#{order.id.slice(0, 8).toUpperCase()}</p>
                                                </div>
                                                <div>
                                                    <p className="text-sm text-gray-500 dark:text-gray-400">Date</p>
                                                    <p className="font-medium text-gray-900 dark:text-gray-100">
                                                        {order.createdAt?.seconds ? new Date(order.createdAt.seconds * 1000).toLocaleDateString() : 'N/A'}
                                                    </p>
                                                </div>
                                                <div>
                                                    <p className="text-sm text-gray-500 dark:text-gray-400">Status</p>
                                                    <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold ${order.status === 'Paid' || order.status === 'Delivered'
                                                        ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                                                        : 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400'
                                                        }`}>
                                                        {order.status}
                                                    </span>
                                                </div>
                                                <div>
                                                    <p className="text-sm text-gray-500 dark:text-gray-400">Total Amount</p>
                                                    <p className="font-bold text-gray-900 dark:text-gray-100">Rs. {order.totalAmount || order.amount}</p>
                                                </div>
                                                <button
                                                    onClick={() => generateInvoice(order)}
                                                    className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-700 border border-gray-200 dark:border-slate-600 rounded-lg hover:bg-gray-50 dark:hover:bg-slate-600 transition-all text-sm font-medium text-gray-700 dark:text-gray-200"
                                                >
                                                    <Download size={16} /> Invoice
                                                </button>
                                            </div>
                                            <div className="p-6">
                                                <div className="space-y-4">
                                                    {order.items.map((item, idx) => (
                                                        <div key={idx} className="flex items-center gap-4">
                                                            <div className="w-16 h-16 bg-gray-100 dark:bg-slate-800 rounded-lg overflow-hidden relative flex-shrink-0">
                                                                {/* Use a placeholder if image missing */}
                                                                <img src={item.image || '/placeholder.png'} alt={item.name} className="object-cover w-full h-full" />
                                                            </div>
                                                            <div className="flex-1">
                                                                <p className="font-semibold text-gray-900 dark:text-gray-100">{item.name}</p>
                                                                <p className="text-sm text-gray-500 dark:text-gray-400">Qty: {item.quantity} x Rs. {item.price}</p>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;
