import { db } from './firebase';
import { User } from 'firebase/auth';
import { getDoc, doc, setDoc, updateDoc, collection, query, where, getDocs } from 'firebase/firestore';

export type UserRole = 'admin' | 'user';

export interface UserProfile {
    uid: string;
    email: string | null;
    displayName: string | null;
    phoneNumber: string | null;
    role: UserRole;
    createdAt: string;
}

export const createUserProfile = async (user: User, additionalData?: Partial<UserProfile>) => {
    if (!user) return;

    const userRef = doc(db, 'users', user.uid);
    const userSnap = await getDoc(userRef);

    if (!userSnap.exists()) {
        const { email, displayName, phoneNumber } = user;
        const createdAt = new Date().toISOString();

        // Check if user is the hardcoded admin
        let role: UserRole = 'user';
        if (email === 'njrgourav@gmail.com') {
            role = 'admin';
        }

        const newProfile: UserProfile = {
            uid: user.uid,
            email,
            displayName,
            phoneNumber,
            role,
            createdAt,
            ...additionalData,
        };

        try {
            await setDoc(userRef, newProfile);
        } catch (error) {
            console.error('Error creating user profile', error);
        }
    }
};

export const getUserRole = async (uid: string): Promise<UserRole | null> => {
    if (!uid) return null;
    try {
        const userRef = doc(db, 'users', uid);
        const userSnap = await getDoc(userRef);
        if (userSnap.exists()) {
            return userSnap.data().role as UserRole;
        }
    } catch (error) {
        console.error('Error fetching user role', error);
    }
    return null;
};

// Function to manually ensure admin privileges (for seeding)
export const ensureAdminPrivileges = async (email: string) => {
    try {
        const q = query(collection(db, 'users'), where('email', '==', email));
        const querySnapshot = await getDocs(q);

        if (querySnapshot.empty) {
            console.log(`User ${email} not found in DB. They must login first.`);
            return false;
        }

        const userDoc = querySnapshot.docs[0];
        if (userDoc.data().role !== 'admin') {
            await updateDoc(doc(db, 'users', userDoc.id), { role: 'admin' });
            console.log(`User ${email} promoted to admin.`);
            return true;
        } else {
            console.log(`User ${email} is already an admin.`);
            return true;
        }
    } catch (error) {
        console.error('Error ensuring admin privileges:', error);
        return false;
    }
};
