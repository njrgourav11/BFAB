import { db } from './firebase';
import { collection, getDocs, doc, getDoc, addDoc, updateDoc, deleteDoc, query, orderBy, writeBatch, setDoc as firebaseSetDoc } from 'firebase/firestore';
import { Product } from './types';
import { k9DemoProduct } from '@/data/k9-demo-product';

const PRODUCT_COLLECTION = 'products';

const normalizeImages = (images: unknown): string[] => {
    if (!Array.isArray(images)) return [];
    return images
        .filter((img): img is string => typeof img === 'string')
        .map((img) => img.trim())
        .filter((img) => img.length > 0);
};

const normalizeProduct = (id: string, data: unknown): Product => {
    const raw = (data || {}) as Partial<Product>;
    const safePetType = raw.petType === 'dog' || raw.petType === 'cat' || raw.petType === 'both'
        ? raw.petType
        : 'both';
    const safePrice = typeof raw.price === 'number' ? raw.price : Number(raw.price ?? 0);
    const safeStock = typeof raw.stock === 'number' ? raw.stock : Number(raw.stock ?? 0);

    return {
        ...raw,
        id,
        images: normalizeImages(raw.images),
        petType: safePetType,
        price: Number.isFinite(safePrice) ? safePrice : 0,
        stock: Number.isFinite(safeStock) ? safeStock : 0,
        category: typeof raw.category === 'string' ? raw.category : '',
        productCategory: typeof raw.productCategory === 'string' ? raw.productCategory : '',
    } as Product;
};

const sanitizeProductForWrite = (data: Partial<Product>) => {
    const payload: Partial<Product> = { ...data };

    if ('images' in payload) {
        payload.images = Array.from(new Set(normalizeImages(payload.images)));
    }

    if (typeof payload.price !== 'undefined') {
        const safePrice = typeof payload.price === 'number' ? payload.price : Number(payload.price);
        payload.price = Number.isFinite(safePrice) ? safePrice : 0;
    }

    if (typeof payload.stock !== 'undefined') {
        const safeStock = typeof payload.stock === 'number' ? payload.stock : Number(payload.stock);
        payload.stock = Number.isFinite(safeStock) ? safeStock : 0;
    }

    return payload;
};

export const getAllProducts = async () => {
    const ref = collection(db, PRODUCT_COLLECTION);
    const q = query(ref, orderBy('name'));
    const snapshot = await getDocs(q);
    return snapshot.docs.map((docItem) => normalizeProduct(docItem.id, docItem.data()));
};

export const getProductById = async (id: string) => {
    const docRef = doc(db, PRODUCT_COLLECTION, id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
        return normalizeProduct(docSnap.id, docSnap.data());
    }
    return null;
};

// Seed the complex K9 Demonstration Product
export const seedK9Product = async () => {
    // We use a specific ID so we can find it easily, or let Firestore generate one. 
    // To match the URL /products/k9-demo, we should try to set the ID to 'k9-demo'.
    const docRef = doc(db, PRODUCT_COLLECTION, 'k9-demo');
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { id, ...data } = k9DemoProduct;
    await firebaseSetDoc(docRef, data); // We need to import setDoc as firebaseSetDoc to avoid conflict if any
};


export const createProduct = async (data: Omit<Product, 'id'>) => {
    const docRef = await addDoc(collection(db, PRODUCT_COLLECTION), sanitizeProductForWrite(data));
    return docRef.id;
};

export const updateProduct = async (id: string, data: Partial<Product>) => {
    const docRef = doc(db, PRODUCT_COLLECTION, id);
    await updateDoc(docRef, sanitizeProductForWrite(data));
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
