export interface BlogPost {
    id: string;
    title: string;
    slug: string;
    excerpt: string;
    content: string; // Rich text HTML or localized content
    coverImage: string;
    category: string;
    author: string;
    createdAt: string; // ISO String
    updatedAt: string; // ISO String
    published: boolean;
    seoTitle?: string;
    seoDescription?: string;
    seoKeywords?: string[];
    featured?: boolean;
}

export interface Product {
    id: string; // Changed from number to string for Firestore compatibility (legacy IDs can be strings too)
    name: string;
    price: number;
    originalPrice?: number;
    description: string;
    images: string[];
    category: string;
    petType: 'dog' | 'cat' | 'both';
    productCategory: string;
    stock: number;
    features?: string[];
    isNew?: boolean;
    rating?: number;
    reviews?: number;
    packOptions?: {
        label: string; // e.g. "Pack of 1", "Pack of 2"
        price: number;
        stock?: number;
        sku?: string;
    }[];
    // New detailed fields
    longDescription?: string;
    detailedBenefits?: { title: string; description: string }[];
    ingredients?: { name: string; description: string }[];
    feedGuide?: string[];
    vetApproval?: { quote: string; doctorName: string; qualification: string };
    processSteps?: { title: string; description: string }[];
    whyUnique?: { title: string; points: string[] }[];
    faqs?: { question: string; answer: string }[];
    detailedReviews?: { name: string; rating: number; text: string; date?: string; verified?: boolean }[];
    comparisonTable?: {
        feature: string;
        us: string | boolean;
        others: string | boolean;
        curd: string | boolean;
        medicine: string | boolean;
    }[];
    uniqueSellingPoints?: {
        icon: string; // Emoji character or Lucide icon name
        title: string;
        description: string;
    }[];
}

export interface Address {
    firstName: string;
    lastName: string;
    email?: string;
    phone?: string;
    address: string; // Matches 'address' field in checkout form
    city: string;
    state: string;
    zipCode: string;
}

export interface OrderItem {
    id: string | number;
    name: string;
    price: string;
    quantity: number;
    image?: string;
}

export interface Order {
    id: string;
    userId?: string;
    items: OrderItem[];
    amount: number; // Razorpay amount (in paise)
    totalAmount?: number; // Display amount (in rupees) if separate, otherwise use amount/100
    currency?: string;
    status: 'Pending' | 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled' | 'Paid'; // Match Firestore values (Capitalized?)
    paymentStatus?: 'pending' | 'paid' | 'failed';
    paymentMethod: 'razorpay' | 'cod';
    razorpayOrderId?: string;
    razorpayPaymentId?: string;
    billingInfo: Address;
    shippingInfo: Address;
    createdAt: { seconds: number; nanoseconds: number } | string | Date; // Firestore Timestamp or ISO string
    updatedAt?: string;
}
