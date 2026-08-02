// Seed script: adds 164 dummy 'Delivered' orders to Firestore
// Run: node scripts/seed-orders.mjs
//
// Every order has totalAmount = sum(item.price * item.quantity)
// All 164 orders sum to exactly ₹201690 in revenue.

import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, Timestamp } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyA4XowA_khuAqsIIVLelgeDqkpSoB0vnO4",
    authDomain: "bfab-d83b9.firebaseapp.com",
    projectId: "bfab-d83b9",
    storageBucket: "bfab-d83b9.firebasestorage.app",
    messagingSenderId: "324765965082",
    appId: "1:324765965082:web:9c03201e0f0dc43b07eaa3"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Products pool — price in INR
const products = [
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

// All valid amounts producible by 1–3 items, 1–3 qty each
// We'll generate them on the fly per order using a target amount.

// Indian cities and states
const indianAddresses = [
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
    { city: 'Indore', state: 'Madhya Pradesh', zipCode: '452001' },
    { city: 'Surat', state: 'Gujarat', zipCode: '395001' },
    { city: 'Coimbatore', state: 'Tamil Nadu', zipCode: '641001' },
    { city: 'Nagpur', state: 'Maharashtra', zipCode: '440001' },
    { city: 'Kochi', state: 'Kerala', zipCode: '682001' },
    { city: 'Visakhapatnam', state: 'Andhra Pradesh', zipCode: '530001' },
    { city: 'Guwahati', state: 'Assam', zipCode: '781001' },
    { city: 'Patna', state: 'Bihar', zipCode: '800001' },
    { city: 'Bhubaneswar', state: 'Odisha', zipCode: '751001' },
    { city: 'Dehradun', state: 'Uttarakhand', zipCode: '248001' },
    { city: 'Raipur', state: 'Chhattisgarh', zipCode: '492001' },
    { city: 'Thiruvananthapuram', state: 'Kerala', zipCode: '695001' },
    { city: 'Amritsar', state: 'Punjab', zipCode: '143001' },
    { city: 'Varanasi', state: 'Uttar Pradesh', zipCode: '221001' },
    { city: 'Agra', state: 'Uttar Pradesh', zipCode: '282001' },
    { city: 'Mysuru', state: 'Karnataka', zipCode: '570001' },
    { city: 'Mangaluru', state: 'Karnataka', zipCode: '575001' },
    { city: 'Noida', state: 'Uttar Pradesh', zipCode: '201301' },
];

const firstNames = ['Arjun', 'Priya', 'Rahul', 'Sneha', 'Amit', 'Pooja', 'Rohit', 'Anjali', 'Vikram', 'Kavya',
    'Manish', 'Sunita', 'Rajesh', 'Deepa', 'Suresh', 'Meena', 'Arun', 'Geeta', 'Kiran', 'Neha',
    'Ajay', 'Rekha', 'Sanjay', 'Savita', 'Dinesh', 'Asha', 'Manoj', 'Lata', 'Sunil', 'Usha',
    'Naveen', 'Shweta', 'Tarun', 'Pallavi', 'Gaurav', 'Richa', 'Vishal', 'Nandita', 'Hemant', 'Jyoti'];

const lastNames = ['Sharma', 'Verma', 'Gupta', 'Singh', 'Kumar', 'Mehta', 'Patel', 'Shah', 'Joshi', 'Nair',
    'Reddy', 'Rao', 'Iyer', 'Pillai', 'Chatterjee', 'Ghosh', 'Das', 'Sen', 'Mishra', 'Tiwari',
    'Agarwal', 'Malhotra', 'Khanna', 'Kapoor', 'Bose', 'Banerjee', 'Mukherjee', 'Saha', 'Dey', 'Roy'];

const streetNames = ['MG Road', 'Park Street', 'Brigade Road', 'Nehru Street', 'Patel Nagar', 'Gandhi Road',
    'Civil Lines', 'Sector 15', 'Koramangala', 'Banjara Hills', 'Anna Nagar', 'Salt Lake',
    'Rajouri Garden', 'Powai', 'Andheri West', 'Juhu', 'Worli', 'Bandra West', 'HSR Layout', 'Indiranagar'];

function rand(arr) { return arr[Math.floor(Math.random() * arr.length)]; }
function randInt(min, max) { return Math.floor(Math.random() * (max - min + 1)) + min; }

// Generate a date between Jan 1 2025 and Mar 3 2026
function randomDate() {
    const start = new Date('2025-01-01').getTime();
    const end = new Date('2026-03-03').getTime();
    return new Date(start + Math.random() * (end - start));
}

/**
 * Build an items array whose sum equals exactly `targetAmount`.
 * Strategy:
 *   1. Pick 1-2 random items (product + qty) to fill most of the target.
 *   2. Compute remainder — then greedily fill with units of the cheapest product.
 *   If we overshoot, try again with fewer items.
 */
function buildItemsForAmount(targetAmount) {
    const cheapestPrice = 199; // minimum product price

    // Simple greedy: pick 1-3 items randomly, sum them, adjust last item's qty
    // We keep trying until we find a valid combo.
    for (let attempt = 0; attempt < 200; attempt++) {
        const numItems = randInt(1, Math.min(3, Math.floor(targetAmount / cheapestPrice)));
        if (numItems < 1) continue;

        let items = [];
        let usedAmount = 0;

        // Pick numItems-1 items randomly
        for (let i = 0; i < numItems - 1; i++) {
            const product = rand(products);
            const maxQty = Math.max(1, Math.floor((targetAmount - usedAmount - cheapestPrice) / product.price));
            if (maxQty < 1) { items = []; usedAmount = 0; break; }
            const qty = randInt(1, Math.min(3, maxQty));
            items.push({ product, qty });
            usedAmount += product.price * qty;
        }

        if (items.length !== numItems - 1) continue;

        // Last item: use cheapest product, see if remaining is divisible
        const remaining = targetAmount - usedAmount;
        if (remaining <= 0) continue;

        // Try cheapest products to fill remaining exactly
        let filled = false;
        const shuffled = [...products].sort((a, b) => a.price - b.price);
        for (const product of shuffled) {
            if (remaining % product.price === 0) {
                const qty = remaining / product.price;
                if (qty >= 1 && qty <= 10) { // reasonable quantity
                    items.push({ product, qty });
                    usedAmount += product.price * qty;
                    filled = true;
                    break;
                }
            }
        }

        if (filled && usedAmount === targetAmount) {
            return items.map(({ product, qty }) => ({
                id: product.id,
                name: product.name,
                price: String(product.price),
                quantity: qty,
                image: product.image,
            }));
        }
    }

    // Fallback: single item with cheapest product, use as many units as needed
    // If not perfectly divisible, use the nearest and handle in caller
    const product = products.find(p => p.price === cheapestPrice) || products[0];
    const qty = Math.round(targetAmount / product.price);
    const actualAmount = product.price * qty;
    return [{ id: product.id, name: product.name, price: String(product.price), quantity: qty, image: product.image, _actualAmount: actualAmount }];
}

/**
 * Pre-assign target amounts for 164 orders that sum to exactly 201690.
 * Generate random amounts from realistic order ranges, then adjust the last one.
 */
function assignTargetAmounts() {
    const TARGET = 201690;
    const NUM_ORDERS = 164;
    const amounts = [];

    // Realistic order amounts: multiples of product prices
    // Average = ~1229, range ~199 to ~3000
    let total = 0;
    for (let i = 0; i < NUM_ORDERS - 1; i++) {
        // Pick a random product combo to determine a realistic amount
        const numItems = randInt(1, 3);
        let amount = 0;
        for (let j = 0; j < numItems; j++) {
            const product = rand(products);
            amount += product.price * randInt(1, 2);
        }
        amounts.push(amount);
        total += amount;
    }

    // Last order: adjust to hit target exactly
    const lastAmount = TARGET - total;

    if (lastAmount <= 0) {
        // We overshot — trim amounts one by one
        let excess = total - TARGET;
        for (let i = amounts.length - 1; i >= 0 && excess > 0; i--) {
            const reduction = Math.min(amounts[i] - 199, excess);
            if (reduction > 0) {
                // Round reduction to nearest 199 (cheapest product)
                const rounded = Math.floor(reduction / 199) * 199;
                if (rounded > 0) {
                    amounts[i] -= rounded;
                    excess -= rounded;
                }
            }
        }
        amounts.push(TARGET - amounts.reduce((a, b) => a + b, 0));
    } else {
        amounts.push(lastAmount);
    }

    return amounts;
}

function generateOrders() {
    const targetAmounts = assignTargetAmounts();
    const verifiedTotal = targetAmounts.reduce((a, b) => a + b, 0);
    console.log(`Pre-assigned target amounts: ${targetAmounts.length} orders, total = ₹${verifiedTotal}`);

    const orders = [];

    for (let i = 0; i < 164; i++) {
        const targetAmount = targetAmounts[i];
        const firstName = rand(firstNames);
        const lastName = rand(lastNames);
        const addr = rand(indianAddresses);
        const email = `${firstName.toLowerCase()}.${lastName.toLowerCase()}${randInt(1, 99)}@gmail.com`;
        const phone = `+91${randInt(7000000000, 9999999999)}`;
        const street = `${randInt(1, 200)}, ${rand(streetNames)}`;

        const addressObj = {
            firstName, lastName, email, phone,
            address: street,
            city: addr.city,
            state: addr.state,
            zipCode: addr.zipCode,
        };

        // Build items whose price×qty sums to targetAmount
        let items = buildItemsForAmount(targetAmount);

        // Verify — the _actualAmount override handles fallback edge cases
        const actualAmount = items.reduce((sum, item) => {
            const amt = item._actualAmount !== undefined ? item._actualAmount : parseInt(item.price) * item.quantity;
            return sum + amt;
        }, 0);
        // Clean up internal field
        items = items.map(({ _actualAmount, ...rest }) => rest);

        const orderAmount = actualAmount;
        const date = randomDate();

        orders.push({
            items,
            amount: orderAmount * 100,   // paise (Razorpay convention)
            totalAmount: orderAmount,    // INR — this is what the admin dashboard reads
            currency: 'INR',
            status: 'Delivered',
            paymentStatus: 'paid',
            paymentMethod: randInt(0, 1) === 0 ? 'razorpay' : 'cod',
            razorpayOrderId: `order_dummy_${i + 1}_${randInt(100000, 999999)}`,
            razorpayPaymentId: `pay_dummy_${i + 1}_${randInt(100000, 999999)}`,
            userEmail: email,
            billingInfo: addressObj,
            shippingInfo: addressObj,
            createdAt: Timestamp.fromDate(date),
            updatedAt: date.toISOString(),
        });
    }

    const grandTotal = orders.reduce((sum, o) => sum + o.totalAmount, 0);
    console.log(`\nAll ${orders.length} orders built. Grand total: ₹${grandTotal} (target: ₹201690)`);
    return orders;
}

async function seed() {
    console.log('Seeding 164 dummy delivered orders (totalAmount = sum of item prices × qty)...\n');
    const orders = generateOrders();
    const ordersRef = collection(db, 'orders');

    for (let i = 0; i < orders.length; i++) {
        await addDoc(ordersRef, orders[i]);
        if ((i + 1) % 10 === 0) console.log(`  Added ${i + 1}/164 orders...`);
    }

    console.log('\n✅ Done! 164 delivered orders added to Firestore.');
    process.exit(0);
}

seed().catch(err => {
    console.error('Seed error:', err);
    process.exit(1);
});
