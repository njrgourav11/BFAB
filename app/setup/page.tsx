'use client';

import { useState, useEffect } from 'react';
import { seedProducts } from '@/lib/product-utils';
import { products as staticProducts } from '@/data/products';
import { auth, db } from '@/lib/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { Loader2, CheckCircle, AlertTriangle } from 'lucide-react';
import { UserProfile } from '@/lib/auth-utils';
import Link from 'next/link';

export default function SetupPage() {
    const [user, setUser] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [processing, setProcessing] = useState(false);
    const [status, setStatus] = useState<string>('');
    const [error, setError] = useState<string>('');

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (u) => {
            setUser(u);
            setLoading(false);
        });
        return () => unsubscribe();
    }, []);

    const handleSetup = async () => {
        if (!user) return;
        setProcessing(true);
        setStatus('Starting setup...');
        setError('');

        try {
            // 1. Promote User to Admin
            setStatus('Promoting user to Admin...');
            const userRef = doc(db, 'users', user.uid);
            const userSnap = await getDoc(userRef);

            if (userSnap.exists()) {
                await setDoc(userRef, { role: 'admin' }, { merge: true });
            } else {
                // If user doc doesn't exist yet, create it
                const newProfile: UserProfile = {
                    uid: user.uid,
                    email: user.email,
                    displayName: user.displayName,
                    role: 'admin',
                    createdAt: new Date().toISOString()
                };
                await setDoc(userRef, newProfile);
            }
            setStatus('User promoted to Admin.');

            // 2. Seed Products
            setStatus('Seeding Products...');
            await seedProducts(staticProducts);
            setStatus('Products seeded successfully.');

            setProcessing(false);
            setStatus('Setup Complete! You are now an Admin.');
        } catch (err: any) {
            console.error(err);
            setError(err.message || 'An error occurred. Check Firestore Rules.');
            setProcessing(false);
        }
    };

    if (loading) return <div className="min-h-screen flex items-center justify-center"><Loader2 className="animate-spin" /></div>;

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col items-center justify-center p-4">
            <div className="max-w-md w-full bg-white dark:bg-slate-900 p-8 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-800 text-center">
                <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Initial Setup</h1>
                <p className="text-slate-600 dark:text-slate-400 mb-8">
                    Use this page to initialize your database and grant yourself Admin privileges.
                </p>

                {user ? (
                    <div className="space-y-6">
                        <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-xl text-blue-800 dark:text-blue-300 text-sm">
                            Logged in as: <strong>{user.email}</strong>
                        </div>

                        {error && (
                            <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-xl text-red-600 dark:text-red-300 text-sm flex items-center gap-2 text-left">
                                <AlertTriangle size={18} className="flex-shrink-0" />
                                <span>{error}</span>
                            </div>
                        )}

                        {status && !error && (
                            <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-xl text-green-700 dark:text-green-300 text-sm flex items-center gap-2">
                                <CheckCircle size={18} />
                                <span>{status}</span>
                            </div>
                        )}

                        {!status.includes('Complete') ? (
                            <button
                                onClick={handleSetup}
                                disabled={processing}
                                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-xl transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                            >
                                {processing ? <Loader2 className="animate-spin" /> : 'Run Setup & Make Me Admin'}
                            </button>
                        ) : (
                            <Link href="/admin" className="block w-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold py-3 px-4 rounded-xl transition-all">
                                Go to Admin Panel
                            </Link>
                        )}

                    </div>
                ) : (
                    <div className="text-center">
                        <p className="mb-4 text-slate-600 dark:text-slate-400">You must login to run the setup.</p>
                        <Link href="/login?redirect=/setup" className="inline-block bg-blue-600 text-white px-6 py-3 rounded-xl font-bold">
                            Login First
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
}
