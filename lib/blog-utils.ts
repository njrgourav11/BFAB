import { db } from './firebase';
import { collection, getDocs, doc, getDoc, addDoc, updateDoc, deleteDoc, query, where, orderBy } from 'firebase/firestore';
import { BlogPost } from './types';

const BLOG_COLLECTION = 'blogs';

export const getAllBlogs = async (onlyPublished = false) => {
    const blogsRef = collection(db, BLOG_COLLECTION);
    let q = query(blogsRef, orderBy('createdAt', 'desc'));

    if (onlyPublished) {
        q = query(blogsRef, where('published', '==', true), orderBy('createdAt', 'desc'));
    }

    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as BlogPost));
};

export const getBlogById = async (id: string) => {
    const docRef = doc(db, BLOG_COLLECTION, id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
        return { id: docSnap.id, ...docSnap.data() } as BlogPost;
    }
    return null;
};

export const createBlog = async (data: Omit<BlogPost, 'id' | 'createdAt' | 'updatedAt'>) => {
    const docRef = await addDoc(collection(db, BLOG_COLLECTION), {
        ...data,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    });
    return docRef.id;
};

export const updateBlog = async (id: string, data: Partial<BlogPost>) => {
    const docRef = doc(db, BLOG_COLLECTION, id);
    await updateDoc(docRef, {
        ...data,
        updatedAt: new Date().toISOString(),
    });
};

export const getBlogBySlug = async (slug: string) => {
    const blogsRef = collection(db, BLOG_COLLECTION);
    const q = query(blogsRef, where('slug', '==', slug), where('published', '==', true));
    const snapshot = await getDocs(q);

    if (!snapshot.empty) {
        const doc = snapshot.docs[0];
        return { id: doc.id, ...doc.data() } as BlogPost;
    }
    return null;
};

export const deleteBlog = async (id: string) => {
    const docRef = doc(db, BLOG_COLLECTION, id);
    await deleteDoc(docRef);
};
