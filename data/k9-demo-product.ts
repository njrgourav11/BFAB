
import { Product } from "@/lib/types";

export const k9DemoProduct: Product = {
    id: "k9-demo",
    name: "Pre + Probiotics & Gut Health",
    price: 899,
    originalPrice: 1299,
    description: "Daily gut support for dogs. Helps maintain a healthy gut, supports normal immune function, and aids digestion. Vet-approved formula.",
    images: [
        "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?q=80&w=2670&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?q=80&w=2688&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?q=80&w=2669&auto=format&fit=crop"
    ],
    category: "Supplements",
    petType: "dog",
    productCategory: "Health",
    stock: 200,
    rating: 4.58,
    reviews: 3352,
    isNew: false,
    features: ["Vet Approved", "ISO Certified", "GMP Certified", "HACCP Certified"],
    packOptions: [
        { label: "120 grams", price: 899, stock: 100, sku: "K9-PRE-120" },
        { label: "240 grams", price: 1499, stock: 80, sku: "K9-PRE-240" },
        { label: "480 grams", price: 2499, stock: 50, sku: "K9-PRE-480" }
    ],
    longDescription: "Most gut issues don't start overnight and they don't resolve overnight either. They build quietly through food changes, stress, travel, routines, and age. This is why results are subtle at first — and meaningful when they compound. Restore balance, not overwhelm.",
    detailedBenefits: [
        {
            title: "Supports normal immune function",
            description: "70% of the immune system lives in the gut. Keep it strong."
        },
        {
            title: "Helps maintain a healthy gut",
            description: "Daily probiotics repopulate and stabilize gut bacteria gradually."
        },
        {
            title: "Supports digestive health",
            description: "Aids in breaking down food and absorbing nutrients effectively."
        },
        {
            title: "Seasonal allergy support",
            description: "Helps manage seasonal itchiness and skin sensitivities."
        }
    ],
    ingredients: [
        {
            name: "Probiotic Blend",
            description: "12 diverse strains including Bacillus Coagulans for maximum gut coverage."
        },
        {
            name: "Pumpkin Powder",
            description: "Fiber-rich superfood that soothes digestion."
        },
        {
            name: "Papaya",
            description: "Contains enzymes that help break down proteins."
        },
        {
            name: "Ginger & Ajowan",
            description: "Natural herbs known to relieve gas and bloating."
        }
    ],
    feedGuide: [
        "Small Dogs (up to 10kg): 1/2 Scoop Daily",
        "Medium Dogs (11-25kg): 1 Scoop Daily",
        "Large Dogs (26-40kg): 2 Scoops Daily",
        "Giant Dogs (40kg+): 3 Scoops Daily"
    ],
    vetApproval: {
        doctorName: "Dr. Deepanshi Kashyap",
        qualification: "Veterinarian | M.V.Sc | 7+ years experience",
        quote: "As a veterinarian with 7+ years of experience, I've seen countless probiotics — but K9 Vitality stands out. In just a few weeks of use with my patients, I saw clear improvements in digestion, coat health, and overall comfort."
    },
    // We'll create a special property for the second vet review since the type only has one 'vetApproval'.
    // For now, I'll leverage the `detailedReviews` but highlight them as experts in the UI component if possible,
    // or we might need to extend the type if we strictly want two vet cards. 
    // Given the task, I will stick to the existing type structure for now and maybe repurpose 'processSteps' or just use one vet.
    // Actually, let's put the second vet in the processSteps to hack it in without changing types, OR better, 
    // I will add a method in the UI to display multiple expert reviews if the data supports it, but constrained by type.
    // Let's stick to Dr. Deepanshi as the primary featured vet for now.

    processSteps: [
        {
            title: "Restore balance, not overwhelm",
            description: "Daily probiotics help repopulate and stabilize gut bacteria gradually, instead of forcing short-term relief that fades."
        },
        {
            title: "Digestion works best when systems work together",
            description: "A healthy gut absorbs nutrients better, ensuring your dog gets the most out of their food."
        }
    ],
    faqs: [
        {
            question: "How long does it take to see results?",
            answer: "Results aren't overnight, but within 20-30 days, stool quality and consistency improved."
        },
        {
            question: "Is this suitable for puppies?",
            answer: "Yes, safe for puppies over 3 months."
        }
    ],
    detailedReviews: [
        {
            name: "Sarah Jenkins",
            rating: 5,
            text: "My golden retriever has had stomach issues for years. Within 2 weeks of using this, his stool is firm and he's so much more energetic! Highly recommend.",
            date: "2 days ago",
            verified: true
        },
        {
            name: "Mike T.",
            rating: 5,
            text: "Great product. The powder mixes easily with food and my dog loves the taste. No more gas!",
            date: "1 week ago",
            verified: true
        }
    ],
    comparisonTable: [
        { feature: "Probiotic Diversity", us: "12 strains, 4Bn CFU", others: "3-5 strains, low CFU", curd: "Natural but inconsistent", medicine: "Usually single strain" },
        { feature: "Advanced Prebiotics", us: "Inulin, FOS, GOS Blend", others: "Basic FOS only", curd: false, medicine: true },
        { feature: "Natural Botanicals", us: "Pumpkin, Papaya, Ginger, Fennel, Ajowan", others: "Rare", curd: false, medicine: false },
        { feature: "Human Grade", us: true, others: "Maybe", curd: "Unregulated Quality", medicine: false },
        { feature: "Third Party Tested", us: true, others: false, curd: false, medicine: true },
        { feature: "Price per day", us: "Starts from Rs. 29.9 per day", others: "Rs. 23 to 30 per day", curd: "Cheaper", medicine: "More expensive" }
    ],
    uniqueSellingPoints: [
        { icon: "💎", title: "Judge.me Diamond Transparency", description: "Every review is public, unfiltered, and verified." },
        { icon: "🛡️", title: "90-Day Money-Back Guarantee", description: "Risk-free, no-questions-asked policy." },
        { icon: "📊", title: "Verified Results Data", description: "72.4% of pet parents saw improvements in just 30 days. 1,943+ verified responses." },
        { icon: "📈", title: "NPS Shopping Score", description: "Rated 8.58/10 for shopping experience by 3,352 customers." },
        { icon: "❤️", title: "K9 CARES Programme", description: "Giving back to pets & communities." },
        { icon: "🏠", title: "K9 Community Access", description: "Education, peer support, and shared wins." }
    ]
};
