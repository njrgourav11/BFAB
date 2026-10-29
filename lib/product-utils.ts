import { db } from './firebase';
import { collection, getDocs, doc, getDoc, addDoc, updateDoc, deleteDoc, query, orderBy, writeBatch, setDoc as firebaseSetDoc } from 'firebase/firestore';
import { Product } from './types';
import { k9DemoProduct } from '@/data/k9-demo-product';
import { products as staticProducts } from '@/data/products';

const PRODUCT_COLLECTION = 'products';

const normalizeImages = (images: unknown): string[] => {
    if (!Array.isArray(images)) return [];
    return images
        .filter((img): img is string => typeof img === 'string')
        .map((img) => img.trim())
        .filter((img) => img.length > 0);
};

const normalizeProduct = (id: string, data: unknown): Product => {
    const raw = (data || {}) as any;
    const safePetType = raw.petType === 'dog' || raw.petType === 'cat' || raw.petType === 'both'
        ? raw.petType
        : (raw.petType === 'Canine' ? 'dog' : raw.petType === 'Feline' ? 'cat' : 'both');
    const safePrice = typeof raw.price === 'number' ? raw.price : Number(String(raw.price || 0).replace(/[^0-9.]/g, ''));
    const safeStock = typeof raw.stock === 'number' ? raw.stock : Number(raw.stock ?? (raw.inStock ? 50 : 0));

    return {
        ...raw,
        id: String(id),
        images: normalizeImages(raw.images),
        petType: safePetType,
        price: Number.isFinite(safePrice) ? safePrice : 0,
        originalPrice: raw.originalPrice ? Number(String(raw.originalPrice).replace(/[^0-9.]/g, '')) : undefined,
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

export const getAllProducts = async (): Promise<Product[]> => {
    try {
        const ref = collection(db, PRODUCT_COLLECTION);
        const q = query(ref, orderBy('name'));
        const snapshot = await getDocs(q);
        if (!snapshot.empty) {
            return snapshot.docs.map((docItem) => normalizeProduct(docItem.id, docItem.data()));
        }
    } catch (e) {
        console.warn('Firestore getAllProducts failed or empty, using static fallback:', e);
    }

    // Fallback to static products list
    return staticProducts.map((p) => normalizeProduct(p.id.toString(), p));
};

export const getProductById = async (id: string): Promise<Product | null> => {
    try {
        const docRef = doc(db, PRODUCT_COLLECTION, id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            return normalizeProduct(docSnap.id, docSnap.data());
        }
    } catch (e) {
        console.warn('Firestore getProductById failed, checking static fallback:', e);
    }

    // Static fallback lookup
    const staticItem = staticProducts.find((p) => p.id.toString() === id.toString());
    if (staticItem) {
        return normalizeProduct(staticItem.id.toString(), staticItem);
    }

    if (id === 'k9-demo') {
        return normalizeProduct('k9-demo', k9DemoProduct);
    }

    return null;
};

// Seed the complex K9 Demonstration Product
export const seedK9Product = async () => {
    const docRef = doc(db, PRODUCT_COLLECTION, 'k9-demo');
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { id, ...data } = k9DemoProduct;
    await firebaseSetDoc(docRef, data);
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
    products.forEach((p) => {
        const { id, ...data } = p;
        const ref = doc(db, PRODUCT_COLLECTION, String(id));
        batch.set(ref, sanitizeProductForWrite(data));
    });
    await batch.commit();
};
