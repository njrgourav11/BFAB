import { db } from './firebase';
import { collection, getDocs, doc, getDoc, addDoc, updateDoc, deleteDoc, query, orderBy, writeBatch } from 'firebase/firestore';
import { Product } from './types';

const PRODUCT_COLLECTION = 'products';

export const getAllProducts = async () => {
    const ref = collection(db, PRODUCT_COLLECTION);
    const q = query(ref, orderBy('name'));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Product));
};

export const getProductById = async (id: string) => {
    const docRef = doc(db, PRODUCT_COLLECTION, id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
        return { id: docSnap.id, ...docSnap.data() } as Product;
    }
    return null;
};

export const createProduct = async (data: Omit<Product, 'id'>) => {
    const docRef = await addDoc(collection(db, PRODUCT_COLLECTION), data);
    return docRef.id;
};

export const updateProduct = async (id: string, data: Partial<Product>) => {
    const docRef = doc(db, PRODUCT_COLLECTION, id);
    await updateDoc(docRef, data);
};

export const deleteProduct = async (id: string) => {
    const docRef = doc(db, PRODUCT_COLLECTION, id);
    await deleteDoc(docRef);
};

// Seeding function (client-side only usage)
export const seedProducts = async (products: (Omit<Product, 'id'> & { id: string | number })[]) => {
    const batch = writeBatch(db);
    const ref = collection(db, PRODUCT_COLLECTION);

    products.forEach(p => {
        // Remove ID if present in static data to let Firestore generate one, 
        // OR use the static ID as document ID.
        // Using static ID as doc ID is safer for continuity if possible, but Firestore IDs are strings.
        // If static IDs are numbers, we convert to string.

        // p.id is number in static file likely.
        const docRef = doc(ref, p.id.toString());
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { id, ...data } = p;
        batch.set(docRef, data);
    });

    await batch.commit();
};
