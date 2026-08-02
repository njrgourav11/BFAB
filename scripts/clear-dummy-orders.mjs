// Clear all dummy orders from Firestore
// Run: node scripts/clear-dummy-orders.mjs

import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, deleteDoc, doc } from 'firebase/firestore';

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

async function clearOrders() {
    console.log('Fetching all orders...');
    const ordersRef = collection(db, 'orders');
    const snapshot = await getDocs(ordersRef);

    console.log(`Found ${snapshot.size} orders. Deleting...`);
    let count = 0;
    for (const docSnap of snapshot.docs) {
        await deleteDoc(doc(db, 'orders', docSnap.id));
        count++;
        if (count % 10 === 0) console.log(`  Deleted ${count}/${snapshot.size}...`);
    }

    console.log(`✅ Done! Deleted ${count} orders.`);
    process.exit(0);
}

clearOrders().catch(err => {
    console.error('Error:', err);
    process.exit(1);
});
