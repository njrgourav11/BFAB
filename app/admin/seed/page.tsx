'use client';

import { useState } from 'react';
import { db, auth } from '@/lib/firebase';
import { collection, addDoc, Timestamp } from 'firebase/firestore';

// ─── Data ─────────────────────────────────────────────────────────────────────
const PRODUCTS = [
    { id: '1', name: 'Peanut Butter for Dogs', price: 349, image: '/products/1/20.png' },
    { id: '3', name: 'Natural Ice-Cream Mix + Prebiotic Goodness', price: 199, image: '/products/2/3.png' },
    { id: '2', name: 'Oven Baked Kitten Kibbles', price: 199, image: '/products/3/12.png' },
    { id: '4', name: 'Chicken Bone Broth', price: 399, image: '/products/4/12.png' },
    { id: '5', name: 'Dehydrated Crunchy Claws', price: 799, image: '/products/5/1.jpeg' },
    { id: '6', name: 'Hemp Seed Oil', price: 349, image: '/products/6/1.png' },
    { id: '7', name: 'Yak-Yak Himalayan Dental Chews', price: 549, image: '/products/7/1.jpg' },
    { id: '8', name: 'Hip & Joint Care Supplement', price: 599, image: '/products/8/1.jpg' },
    { id: '9', name: 'Prebiotic ProTopper', price: 599, image: '/products/9/1.jpg' },
    { id: '10', name: 'Dehydrated Chicken Breast Jerky', price: 799, image: '/products/10/1.jpg' },
];

const ADDRESSES = [
    { city: 'Mumbai', state: 'Maharashtra', zipCode: '400001' },
    { city: 'Delhi', state: 'Delhi', zipCode: '110001' },
    { city: 'Bengaluru', state: 'Karnataka', zipCode: '560001' },
    { city: 'Chennai', state: 'Tamil Nadu', zipCode: '600001' },
    { city: 'Hyderabad', state: 'Telangana', zipCode: '500001' },
    { city: 'Kolkata', state: 'West Bengal', zipCode: '700001' },
    { city: 'Pune', state: 'Maharashtra', zipCode: '411001' },
    { city: 'Ahmedabad', state: 'Gujarat', zipCode: '380001' },
    { city: 'Jaipur', state: 'Rajasthan', zipCode: '302001' },
    { city: 'Lucknow', state: 'Uttar Pradesh', zipCode: '226001' },
    { city: 'Chandigarh', state: 'Punjab', zipCode: '160001' },
    { city: 'Bhopal', state: 'Madhya Pradesh', zipCode: '462001' },
    { city: 'Surat', state: 'Gujarat', zipCode: '395001' },
    { city: 'Coimbatore', state: 'Tamil Nadu', zipCode: '641001' },
    { city: 'Nagpur', state: 'Maharashtra', zipCode: '440001' },
    { city: 'Kochi', state: 'Kerala', zipCode: '682001' },
    { city: 'Visakhapatnam', state: 'Andhra Pradesh', zipCode: '530001' },
    { city: 'Guwahati', state: 'Assam', zipCode: '781001' },
    { city: 'Noida', state: 'Uttar Pradesh', zipCode: '201301' },
    { city: 'Mysuru', state: 'Karnataka', zipCode: '570001' },
];

const FIRST_NAMES = ['Arjun', 'Priya', 'Rahul', 'Sneha', 'Amit', 'Pooja', 'Rohit', 'Anjali', 'Vikram', 'Kavya',
    'Manish', 'Sunita', 'Rajesh', 'Deepa', 'Suresh', 'Meena', 'Arun', 'Geeta', 'Kiran', 'Neha',
    'Ajay', 'Rekha', 'Sanjay', 'Savita', 'Dinesh', 'Asha', 'Manoj', 'Lata', 'Sunil', 'Usha'];

const LAST_NAMES = ['Sharma', 'Verma', 'Gupta', 'Singh', 'Kumar', 'Mehta', 'Patel', 'Shah', 'Joshi', 'Nair',
    'Reddy', 'Rao', 'Iyer', 'Pillai', 'Chatterjee', 'Ghosh', 'Das', 'Sen', 'Mishra', 'Tiwari'];

const STREETS = ['MG Road', 'Park Street', 'Brigade Road', 'Nehru Street', 'Patel Nagar', 'Gandhi Road',
    'Civil Lines', 'Koramangala', 'Banjara Hills', 'Anna Nagar', 'Salt Lake',
    'Rajouri Garden', 'Powai', 'Andheri West', 'Juhu', 'Bandra West', 'HSR Layout', 'Indiranagar'];

// ─── Helpers ──────────────────────────────────────────────────────────────────
function pick<T>(arr: T[]): T { return arr[Math.floor(Math.random() * arr.length)]; }
function ri(min: number, max: number) { return Math.floor(Math.random() * (max - min + 1)) + min; }
function randomDate() {
    return new Date(new Date('2025-01-01').getTime() + Math.random() * (new Date('2026-03-03').getTime() - new Date('2025-01-01').getTime()));
}

/**
 * Build items whose (price × qty) sums to exactly targetAmount.
 * Uses only real product prices — never a fake price.
 */
function buildItemsForAmount(targetAmount: number) {
    for (let attempt = 0; attempt < 300; attempt++) {
        const slots = ri(1, Math.min(3, Math.floor(targetAmount / 199)));
        let remaining = targetAmount;
        const items: { id: string; name: string; price: string; quantity: number; image: string }[] = [];
        let ok = true;

        for (let s = 0; s < slots - 1; s++) {
            const p = pick(PRODUCTS);
            const maxQty = Math.max(1, Math.floor((remaining - 199) / p.price));
            if (maxQty < 1) { ok = false; break; }
            const qty = ri(1, Math.min(3, maxQty));
            items.push({ id: p.id, name: p.name, price: String(p.price), quantity: qty, image: p.image });
            remaining -= p.price * qty;
        }

        if (!ok || remaining <= 0) continue;

        // Fill remaining with a product whose price divides it evenly
        const sorted = [...PRODUCTS].sort((a, b) => a.price - b.price);
        for (const p of sorted) {
            if (remaining % p.price === 0) {
                const qty = remaining / p.price;
                if (qty >= 1 && qty <= 12) {
                    items.push({ id: p.id, name: p.name, price: String(p.price), quantity: qty, image: p.image });
                    return items;
                }
            }
        }
    }

    // Absolute fallback
    const p = PRODUCTS.find(x => x.price === 199)!;
    return [{ id: p.id, name: p.name, price: String(p.price), quantity: Math.round(targetAmount / p.price), image: p.image }];
}

const TARGET_TOTAL = 201690;
const NUM_ORDERS = 164;

function buildOrders(userId: string) {
    const amounts: number[] = [];
    let cumulative = 0;

    for (let i = 0; i < NUM_ORDERS - 1; i++) {
        let a = 0;
        for (let s = 0; s < ri(1, 3); s++) a += pick(PRODUCTS).price * ri(1, 2);
        amounts.push(a);
        cumulative += a;
    }

    // Adjust last to hit exact target
    let lastAmount = TARGET_TOTAL - cumulative;
    if (lastAmount < 199) {
        for (let i = amounts.length - 1; i >= 0 && lastAmount < 199; i--) {
            const cut = Math.floor((199 - lastAmount) / 199) * 199;
            if (cut > 0 && amounts[i] - cut >= 199) { amounts[i] -= cut; lastAmount += cut; }
        }
    }
    amounts.push(Math.max(199, TARGET_TOTAL - amounts.reduce((a, b) => a + b, 0)));

    return amounts.map((targetAmount, i) => {
        const firstName = pick(FIRST_NAMES);
        const lastName = pick(LAST_NAMES);
        const addr = pick(ADDRESSES);
        const addrObj = {
            firstName, lastName,
            email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}${ri(1, 99)}@gmail.com`,
            phone: `+91${ri(7000000000, 9999999999)}`,
            address: `${ri(1, 200)}, ${pick(STREETS)}`,
            ...addr,
        };

        const items = buildItemsForAmount(targetAmount);
        const totalAmount = items.reduce((s, it) => s + parseInt(it.price) * it.quantity, 0);
        const date = randomDate();

        return {
            userId,
            items,
            amount: totalAmount * 100,
            totalAmount,
            currency: 'INR',
            status: 'Delivered',
            paymentStatus: 'paid',
            paymentMethod: ri(0, 1) === 0 ? 'razorpay' : 'cod',
            razorpayOrderId: `order_seed_${i + 1}_${ri(100000, 999999)}`,
            razorpayPaymentId: `pay_seed_${i + 1}_${ri(100000, 999999)}`,
            userEmail: addrObj.email,
            billingInfo: addrObj,
            shippingInfo: addrObj,
            createdAt: Timestamp.fromDate(date),
            updatedAt: date.toISOString(),
        };
    });
}

// ─── Component ────────────────────────────────────────────────────────────────
type Phase = 'idle' | 'clearing' | 'seeding' | 'done' | 'error';

export default function SeedOrdersPage() {
    const [phase, setPhase] = useState<Phase>('idle');
    const [progress, setProgress] = useState(0);
    const [log, setLog] = useState<string[]>([]);

    const append = (msg: string) => setLog(prev => [...prev, msg]);

    const getIdToken = async (): Promise<string | null> => {
        const user = auth.currentUser;
        if (!user) { append('❌ Not logged in. Please log in as admin first.'); return null; }
        append(`👤 Logged in as: ${user.email}`);
        return user.getIdToken();
    };

    // ── Clear all orders via server API (bypasses client-side rules) ───────
    const clearOrders = async (idToken: string) => {
        append('🗑️  Clearing all existing orders via API…');
        const res = await fetch('/api/admin/reset-orders', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ idToken }),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error ?? 'Reset API failed');
        append(`✅ Deleted ${data.deleted} orders.`);
    };

    // ── Seed 164 fresh orders ─────────────────────────────────────────────
    const seedOrders = async (userId: string) => {
        const orders = buildOrders(userId);
        const grandTotal = orders.reduce((s, o) => s + o.totalAmount, 0);
        append(`\n📦 Built ${orders.length} orders — Revenue: ₹${grandTotal.toLocaleString('en-IN')}`);

        const ref = collection(db, 'orders');
        for (let i = 0; i < orders.length; i++) {
            await addDoc(ref, orders[i]);
            setProgress(i + 1);
            if ((i + 1) % 20 === 0 || i === orders.length - 1)
                append(`   Added ${i + 1}/${orders.length} orders…`);
        }
        append(`🎉 Done! Revenue = ₹${grandTotal.toLocaleString('en-IN')}`);
    };

    // ── Handlers ──────────────────────────────────────────────────────────
    const handleClearAndSeed = async () => {
        setPhase('clearing'); setProgress(0); setLog([]);
        try {
            const idToken = await getIdToken();
            if (!idToken) { setPhase('error'); return; }
            await clearOrders(idToken);
            setPhase('seeding');
            await seedOrders(auth.currentUser!.uid);
            setPhase('done');
        } catch (err: any) {
            append(`❌ Error: ${err?.message ?? String(err)}`);
            setPhase('error');
        }
    };

    const handleSeedOnly = async () => {
        setPhase('seeding'); setProgress(0); setLog([]);
        try {
            const idToken = await getIdToken();
            if (!idToken) { setPhase('error'); return; }
            await seedOrders(auth.currentUser!.uid);
            setPhase('done');
        } catch (err: any) {
            append(`❌ Error: ${err?.message ?? String(err)}`);
            setPhase('error');
        }
    };

    const isRunning = phase === 'clearing' || phase === 'seeding';

    return (
        <div className="max-w-2xl mx-auto py-10 space-y-6">
            <div>
                <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Seed Orders</h1>
                <p className="text-slate-500 dark:text-slate-400 mt-1">
                    Creates <strong>164 dummy Delivered orders</strong> across Indian addresses.<br />
                    Every order&apos;s <code>totalAmount</code> = real item&nbsp;prices&nbsp;×&nbsp;quantities.<br />
                    Grand total = <strong>₹2,01,690</strong>.
                </p>
            </div>

            <div className="flex flex-wrap gap-3">
                {/* Clear + Reseed */}
                <button
                    id="btn-clear-seed"
                    onClick={handleClearAndSeed}
                    disabled={isRunning || phase === 'done'}
                    className="px-5 py-3 bg-red-600 hover:bg-red-700 disabled:bg-slate-400 text-white font-semibold rounded-xl transition-colors flex items-center gap-2"
                >
                    {phase === 'clearing' ? <><Spinner /> Clearing…</> : '🗑️ Clear All & Re-seed'}
                </button>

                {/* Seed only */}
                <button
                    id="btn-seed-only"
                    onClick={handleSeedOnly}
                    disabled={isRunning || phase === 'done'}
                    className="px-5 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-400 text-white font-semibold rounded-xl transition-colors flex items-center gap-2"
                >
                    {phase === 'seeding' ? <><Spinner /> Seeding… {progress}/{NUM_ORDERS}</> : phase === 'done' ? '✅ Done!' : '🚀 Seed Only'}
                </button>

                {(phase === 'done' || phase === 'error') && (
                    <button
                        id="btn-reset"
                        onClick={() => { setPhase('idle'); setLog([]); setProgress(0); }}
                        className="px-5 py-3 bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-800 dark:text-white font-semibold rounded-xl transition-colors"
                    >
                        ↺ Reset
                    </button>
                )}
            </div>

            {/* Progress bar (seeding phase) */}
            {phase === 'seeding' && (
                <div className="space-y-1">
                    <div className="text-sm text-slate-500">{progress} / {NUM_ORDERS} orders added</div>
                    <div className="w-full bg-slate-200 dark:bg-slate-800 rounded-full h-3">
                        <div className="bg-blue-600 h-3 rounded-full transition-all duration-200"
                            style={{ width: `${(progress / NUM_ORDERS) * 100}%` }} />
                    </div>
                </div>
            )}

            {/* Log */}
            {log.length > 0 && (
                <div className="bg-slate-900 rounded-xl p-4 font-mono text-sm text-green-400 space-y-1 max-h-80 overflow-y-auto">
                    {log.map((line, i) => <div key={i}>{line}</div>)}
                </div>
            )}

            {/* Success */}
            {phase === 'done' && (
                <div className="p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl text-green-700 dark:text-green-400">
                    All done! <a href="/admin" className="underline font-semibold">Go to Admin Dashboard →</a>
                </div>
            )}
        </div>
    );
}

function Spinner() {
    return (
        <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
        </svg>
    );
}
