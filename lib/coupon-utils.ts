import { db } from './firebase';
import {
    collection,
    getDocs,
    doc,
    getDoc,
    addDoc,
    updateDoc,
    deleteDoc,
    query,
    where,
    orderBy,
    serverTimestamp,
    increment,
    setDoc
} from 'firebase/firestore';
import { Coupon, Order, AppliedCoupon } from './types';

const COUPON_COLLECTION = 'coupons';

/**
 * Removes any undefined fields to prevent Firestore serialization errors
 */
export const sanitizeCouponForFirestore = (data: Record<string, any>): Record<string, any> => {
    const clean: Record<string, any> = {};
    for (const [key, val] of Object.entries(data)) {
        if (val !== undefined) {
            clean[key] = val;
        }
    }
    return clean;
};

const normalizeCoupon = (id: string, data: any): Coupon => {
    return {
        id,
        code: (data.code || '').toUpperCase().trim(),
        groupName: data.groupName || 'General Sales Group',
        discountType: data.discountType === 'fixed' ? 'fixed' : 'percentage',
        discountValue: Number(data.discountValue) || 0,
        minOrderValue: data.minOrderValue ? Number(data.minOrderValue) : 0,
        maxDiscount: data.maxDiscount ? Number(data.maxDiscount) : undefined,
        usageLimit: data.usageLimit ? Number(data.usageLimit) : undefined,
        usedCount: Number(data.usedCount) || 0,
        totalSalesAmount: Number(data.totalSalesAmount) || 0,
        totalUnitsSold: Number(data.totalUnitsSold) || 0,
        isActive: data.isActive !== false,
        expiresAt: data.expiresAt || null,
        createdAt: data.createdAt || new Date().toISOString(),
        description: data.description || '',
        contactPerson: data.contactPerson || '',
        contactPhone: data.contactPhone || '',
        contactEmail: data.contactEmail || ''
    };
};

/**
 * Fetch all coupons from Firestore (production ready, strictly real data)
 */
export const getAllCoupons = async (): Promise<Coupon[]> => {
    try {
        const ref = collection(db, COUPON_COLLECTION);
        const snapshot = await getDocs(ref);

        if (snapshot.empty) {
            return [];
        }

        return snapshot.docs.map(d => normalizeCoupon(d.id, d.data()));
    } catch (error) {
        console.error('Error fetching coupons from Firestore:', error);
        return [];
    }
};

/**
 * Fetch a coupon by exact code (case-insensitive)
 */
export const getCouponByCode = async (code: string): Promise<Coupon | null> => {
    if (!code) return null;
    const cleanCode = code.toUpperCase().trim();

    try {
        // Direct doc lookup by code ID
        const docRef = doc(db, COUPON_COLLECTION, cleanCode);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            return normalizeCoupon(docSnap.id, docSnap.data());
        }

        // Secondary search by field
        const q = query(collection(db, COUPON_COLLECTION), where('code', '==', cleanCode));
        const qSnap = await getDocs(q);
        if (!qSnap.empty) {
            const first = qSnap.docs[0];
            return normalizeCoupon(first.id, first.data());
        }
    } catch (error) {
        console.error('Firestore coupon search error:', error);
    }

    return null;
};

/**
 * Create a new coupon in Firestore (doc ID = uppercase code)
 */
export const createCoupon = async (data: Omit<Coupon, 'id' | 'usedCount' | 'totalSalesAmount' | 'totalUnitsSold' | 'createdAt'>): Promise<string> => {
    const code = data.code.toUpperCase().trim();
    const docRef = doc(db, COUPON_COLLECTION, code);

    const payload: Record<string, any> = {
        code,
        groupName: data.groupName.trim(),
        discountType: data.discountType === 'fixed' ? 'fixed' : 'percentage',
        discountValue: Number(data.discountValue) || 0,
        minOrderValue: Number(data.minOrderValue) || 0,
        usedCount: 0,
        totalSalesAmount: 0,
        totalUnitsSold: 0,
        createdAt: serverTimestamp(),
        isActive: data.isActive !== false,
        expiresAt: data.expiresAt || null,
        description: data.description || '',
        contactPerson: data.contactPerson || '',
        contactEmail: data.contactEmail || '',
        contactPhone: data.contactPhone || ''
    };

    if (data.maxDiscount !== undefined && data.maxDiscount !== null && !isNaN(Number(data.maxDiscount)) && Number(data.maxDiscount) > 0) {
        payload.maxDiscount = Number(data.maxDiscount);
    }

    if (data.usageLimit !== undefined && data.usageLimit !== null && !isNaN(Number(data.usageLimit)) && Number(data.usageLimit) > 0) {
        payload.usageLimit = Number(data.usageLimit);
    }

    const cleanPayload = sanitizeCouponForFirestore(payload);
    await setDoc(docRef, cleanPayload);
    return code;
};

/**
 * Update an existing coupon
 */
export const updateCoupon = async (id: string, data: Partial<Coupon>): Promise<void> => {
    const docRef = doc(db, COUPON_COLLECTION, id);
    const payload = sanitizeCouponForFirestore({ ...data });
    if (payload.code) {
        payload.code = payload.code.toUpperCase().trim();
    }
    await updateDoc(docRef, payload);
};

/**
 * Delete a coupon
 */
export const deleteCoupon = async (id: string): Promise<void> => {
    const docRef = doc(db, COUPON_COLLECTION, id);
    await deleteDoc(docRef);
};

/**
 * Toggle active status
 */
export const toggleCouponStatus = async (id: string, currentStatus: boolean): Promise<void> => {
    const docRef = doc(db, COUPON_COLLECTION, id);
    await updateDoc(docRef, { isActive: !currentStatus });
};

export interface CouponValidationResult {
    valid: boolean;
    message: string;
    coupon?: Coupon;
    discountAmount: number;
}

/**
 * Validate coupon code against order subtotal
 */
export const validateCouponCode = async (
    code: string,
    currentSubtotal: number
): Promise<CouponValidationResult> => {
    if (!code || !code.trim()) {
        return { valid: false, message: 'Please enter a coupon code', discountAmount: 0 };
    }

    const coupon = await getCouponByCode(code);
    if (!coupon) {
        return { valid: false, message: 'Invalid coupon code. Please verify the code.', discountAmount: 0 };
    }

    if (!coupon.isActive) {
        return { valid: false, message: 'This coupon is currently inactive.', discountAmount: 0 };
    }

    if (coupon.expiresAt) {
        const expiryDate = new Date(coupon.expiresAt);
        expiryDate.setHours(23, 59, 59, 999);
        if (new Date() > expiryDate) {
            return { valid: false, message: `This coupon expired on ${new Date(coupon.expiresAt).toLocaleDateString()}.`, discountAmount: 0 };
        }
    }

    if (coupon.usageLimit && coupon.usageLimit > 0 && coupon.usedCount >= coupon.usageLimit) {
        return { valid: false, message: 'This coupon has reached its maximum usage limit.', discountAmount: 0 };
    }

    if (coupon.minOrderValue && coupon.minOrderValue > 0 && currentSubtotal < coupon.minOrderValue) {
        return {
            valid: false,
            message: `Minimum order value of ₹${coupon.minOrderValue.toFixed(2)} is required for this coupon. Add ₹${(coupon.minOrderValue - currentSubtotal).toFixed(2)} more to apply!`,
            discountAmount: 0
        };
    }

    // Calculate discount
    let discount = 0;
    if (coupon.discountType === 'percentage') {
        discount = (currentSubtotal * coupon.discountValue) / 100;
        if (coupon.maxDiscount && coupon.maxDiscount > 0) {
            discount = Math.min(discount, coupon.maxDiscount);
        }
    } else {
        discount = coupon.discountValue;
    }

    // Discount cannot exceed subtotal
    discount = Math.min(discount, currentSubtotal);

    return {
        valid: true,
        message: `Success! ${coupon.discountType === 'percentage' ? `${coupon.discountValue}%` : `₹${coupon.discountValue}`} discount applied (${coupon.groupName}).`,
        coupon,
        discountAmount: Math.round(discount * 100) / 100
    };
};

/**
 * Record coupon usage when order is completed
 */
export const recordCouponUsage = async (
    couponCode: string,
    orderAmount: number,
    totalUnits: number
): Promise<void> => {
    if (!couponCode) return;
    const cleanCode = couponCode.toUpperCase().trim();

    try {
        const docRef = doc(db, COUPON_COLLECTION, cleanCode);
        await updateDoc(docRef, {
            usedCount: increment(1),
            totalSalesAmount: increment(orderAmount),
            totalUnitsSold: increment(totalUnits)
        });
    } catch (e) {
        try {
            const q = query(collection(db, COUPON_COLLECTION), where('code', '==', cleanCode));
            const qSnap = await getDocs(q);
            if (!qSnap.empty) {
                await updateDoc(qSnap.docs[0].ref, {
                    usedCount: increment(1),
                    totalSalesAmount: increment(orderAmount),
                    totalUnitsSold: increment(totalUnits)
                });
            }
        } catch (innerError) {
            console.error('Failed to record coupon sale:', innerError);
        }
    }
};

export interface GroupAnalytics {
    groupName: string;
    coupons: string[];
    totalOrders: number;
    totalUnitsSold: number;
    grossSales: number;
    totalDiscounts: number;
    netSales: number;
    averageOrderValue: number;
    topProducts: { name: string; quantity: number; revenue: number }[];
    recentOrders: Order[];
}

/**
 * Compute team/group sales analytics strictly from real orders and coupons
 */
export const computeGroupAnalytics = (
    orders: Order[],
    coupons: Coupon[]
): {
    groups: GroupAnalytics[];
    totalCouponRevenue: number;
    totalUnitsSoldViaCoupons: number;
    totalCouponOrders: number;
    chartRevenueByGroup: { group: string; revenue: number; units: number }[];
    topPerformingGroup: GroupAnalytics | null;
} => {
    const groupMap = new Map<string, GroupAnalytics>();

    // Initialize all existing coupons' groups
    coupons.forEach(c => {
        const groupName = c.groupName || 'Unassigned';
        if (!groupMap.has(groupName)) {
            groupMap.set(groupName, {
                groupName,
                coupons: [c.code],
                totalOrders: 0,
                totalUnitsSold: 0,
                grossSales: 0,
                totalDiscounts: 0,
                netSales: 0,
                averageOrderValue: 0,
                topProducts: [],
                recentOrders: []
            });
        } else {
            const existing = groupMap.get(groupName)!;
            if (!existing.coupons.includes(c.code)) {
                existing.coupons.push(c.code);
            }
        }
    });

    const productMap = new Map<string, Map<string, { quantity: number; revenue: number }>>();

    let totalCouponRevenue = 0;
    let totalUnitsSoldViaCoupons = 0;
    let totalCouponOrders = 0;

    // Process actual orders from Firestore
    orders.forEach(order => {
        if (order.status === 'Cancelled') return;

        // Determine if order used a coupon
        const orderCoupon = order.couponCode ? order.couponCode.toUpperCase().trim() : '';
        let matchedGroup = order.groupName;

        if (!matchedGroup && orderCoupon) {
            const foundCoupon = coupons.find(c => c.code.toUpperCase() === orderCoupon);
            if (foundCoupon) {
                matchedGroup = foundCoupon.groupName;
            }
        }

        if (orderCoupon || matchedGroup) {
            const groupName = matchedGroup || 'Other Groups';
            totalCouponOrders += 1;

            if (!groupMap.has(groupName)) {
                groupMap.set(groupName, {
                    groupName,
                    coupons: orderCoupon ? [orderCoupon] : [],
                    totalOrders: 0,
                    totalUnitsSold: 0,
                    grossSales: 0,
                    totalDiscounts: 0,
                    netSales: 0,
                    averageOrderValue: 0,
                    topProducts: [],
                    recentOrders: []
                });
            }

            const stats = groupMap.get(groupName)!;
            stats.totalOrders += 1;

            const orderAmount = order.totalAmount || (order.amount ? order.amount / 100 : 0);
            const discount = order.discountAmount || 0;
            const gross = order.subtotal || (orderAmount + discount);

            stats.grossSales += gross;
            stats.totalDiscounts += discount;
            stats.netSales += orderAmount;
            totalCouponRevenue += orderAmount;

            let unitsInThisOrder = 0;
            if (!productMap.has(groupName)) {
                productMap.set(groupName, new Map());
            }
            const groupProducts = productMap.get(groupName)!;

            if (order.items && Array.isArray(order.items)) {
                order.items.forEach(item => {
                    const qty = Number(item.quantity) || 1;
                    unitsInThisOrder += qty;
                    const itemPrice = parseFloat(String(item.price).replace(/[^0-9.]/g, '')) || 0;
                    const prev = groupProducts.get(item.name) || { quantity: 0, revenue: 0 };
                    groupProducts.set(item.name, {
                        quantity: prev.quantity + qty,
                        revenue: prev.revenue + (itemPrice * qty)
                    });
                });
            }

            stats.totalUnitsSold += unitsInThisOrder;
            totalUnitsSoldViaCoupons += unitsInThisOrder;

            stats.recentOrders.push(order);
        }
    });

    // Finalize averages and product lists strictly from real data
    const groups = Array.from(groupMap.values()).map(g => {
        g.averageOrderValue = g.totalOrders > 0 ? Math.round(g.netSales / g.totalOrders) : 0;
        
        const gProds = productMap.get(g.groupName);
        if (gProds) {
            g.topProducts = Array.from(gProds.entries())
                .map(([name, data]) => ({ name, quantity: data.quantity, revenue: data.revenue }))
                .sort((a, b) => b.quantity - a.quantity);
        }

        return g;
    });

    // Sort by highest revenue
    groups.sort((a, b) => b.netSales - a.netSales);

    const chartRevenueByGroup = groups.map(g => ({
        group: g.groupName.length > 15 ? g.groupName.substring(0, 15) + '...' : g.groupName,
        revenue: Math.round(g.netSales),
        units: g.totalUnitsSold
    }));

    return {
        groups,
        totalCouponRevenue,
        totalUnitsSoldViaCoupons,
        totalCouponOrders,
        chartRevenueByGroup,
        topPerformingGroup: groups.length > 0 && groups[0].netSales > 0 ? groups[0] : null
    };
};
