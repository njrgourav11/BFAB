// components/ui/product-detail-page.tsx
import * as React from "react";
import { ChevronRight, Star, ShieldCheck, HelpCircle, Check, ChevronDown, Award, RefreshCw, Truck, Zap } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

// Define TypeScript interfaces for component props
import { Product } from "@/lib/types";

// Removed local Product interface definition to use the shared one from @/lib/types


export interface Seller {
    name: string;
    avatarUrl: string;
    rating: number;
}

export interface ProductDetailPageProps {
    product: Product;
    seller?: Seller;
    breadcrumbs?: { label: string; href: string }[];
    onAddToCart?: (quantity: number, variant?: { label: string; price: number }) => void;
}

const StarRating = ({ rating, className }: { rating: number; className?: string }) => (
    <div className={cn("flex items-center gap-0.5", className)}>
        {[...Array(5)].map((_, i) => (
            <Star
                key={i}
                className={cn(
                    "h-4 w-4",
                    i < Math.floor(rating) ? "text-[#2bbf85] fill-[#2bbf85]" : "text-gray-200 dark:text-gray-700"
                )}
            />
        ))}
    </div>
);

const AccordionItem = ({ title, content }: { title: string; content: string }) => {
    const [isOpen, setIsOpen] = React.useState(false);
    return (
        <div className="border-b border-gray-100 dark:border-slate-800 last:border-0">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex justify-between items-center py-4 text-left font-medium text-gray-900 dark:text-gray-100 hover:text-[#0b1e47] dark:hover:text-blue-400 transition-colors"
            >
                {title}
                <ChevronDown className={cn("h-5 w-5 transition-transform duration-300", isOpen ? "transform rotate-180" : "")} />
            </button>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                    >
                        <p className="pb-4 text-gray-600 dark:text-gray-400 text-sm leading-relaxed">{content}</p>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export const ProductDetailPage: React.FC<ProductDetailPageProps> = ({ product, breadcrumbs, onAddToCart }) => {
    const [currentImageIndex, setCurrentImageIndex] = React.useState(0);
    const [quantity, setQuantity] = React.useState(1);
    const [selectedPackIndex, setSelectedPackIndex] = React.useState<number | null>(null);
    const [isSubscribe, setIsSubscribe] = React.useState(false);

    React.useEffect(() => {
        if (product.packOptions && product.packOptions.length > 0 && selectedPackIndex === null) {
            setSelectedPackIndex(0);
        }
    }, [product.packOptions]);

    const activeOption = selectedPackIndex !== null && product.packOptions && product.packOptions[selectedPackIndex]
        ? product.packOptions[selectedPackIndex]
        : null;

    const combinedPrice = activeOption ? activeOption.price : Number(product.price);
    const finalPrice = isSubscribe ? Math.round(combinedPrice * 0.9) : combinedPrice;

    const isInStock = activeOption ? (activeOption.stock ?? 0) > 0 : (product.stock > 0);

    return (
        <div className="w-full bg-white dark:bg-slate-950 transition-colors duration-300 font-sans">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
                {/* Breadcrumbs */}
                {breadcrumbs && (
                    <nav aria-label="Breadcrumb" className="flex items-center text-sm text-muted-foreground mb-6 overflow-x-auto whitespace-nowrap pb-2">
                        {breadcrumbs.map((item, index) => (
                            <React.Fragment key={index}>
                                <a href={item.href} className="hover:text-[#0b1e47] transition-colors">{item.label}</a>
                                {index < breadcrumbs.length - 1 && <ChevronRight className="h-4 w-4 mx-1 flex-shrink-0" />}
                            </React.Fragment>
                        ))}
                    </nav>
                )}

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
                    {/* Image Gallery */}
                    <div className="flex flex-col gap-4">
                        <div className="relative aspect-square w-full rounded-3xl overflow-hidden bg-gray-50 dark:bg-slate-900 border border-gray-100 dark:border-slate-800">
                            <AnimatePresence mode="wait">
                                <motion.img
                                    key={currentImageIndex}
                                    src={product.images[currentImageIndex] || '/placeholder.jpg'}
                                    alt={product.name}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.3 }}
                                    className="object-contain w-full h-full p-8"
                                />
                            </AnimatePresence>
                            {/* Bestseller Badge */}
                            <div className="absolute top-4 left-4 bg-[#ff5500] text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg flex items-center gap-1">
                                <Star size={12} className="fill-white text-white" /> BESTSELLER
                            </div>
                        </div>
                        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
                            {product.images.map((img, index) => (
                                <button
                                    key={index}
                                    onClick={() => setCurrentImageIndex(index)}
                                    className={cn(
                                        "relative w-20 h-20 rounded-xl overflow-hidden border-2 transition-all flex-shrink-0 bg-gray-50 dark:bg-slate-900",
                                        currentImageIndex === index ? "border-[#0b1e47] shadow-md scale-105" : "border-transparent border-gray-100 dark:border-slate-800 hover:border-blue-200"
                                    )}
                                >
                                    <img src={img} alt={`Thumb ${index}`} className="w-full h-full object-contain p-2" />
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Product Info - Right Column */}
                    <div className="flex flex-col">
                        <div className="flex items-center gap-2 mb-2">
                            <StarRating rating={product.rating || 5} />
                            <span className="text-sm text-[#2bbf85] font-semibold">{product.reviews} reviews</span>
                            <span className="text-xs text-gray-400">Verified by Judge.me</span>
                        </div>

                        <h1 className="text-3xl lg:text-4xl font-extrabold text-[#0b1e47] dark:text-white tracking-tight mb-4">
                            {product.name}
                        </h1>

                        <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
                            {product.description}
                        </p>

                        {/* Size Selection */}
                        {product.packOptions && product.packOptions.length > 0 && (
                            <div className="mb-6">
                                <label className="block text-sm font-bold text-[#0b1e47] dark:text-gray-300 mb-2">Size</label>
                                <div className="space-y-3">
                                    {product.packOptions.map((option, idx) => (
                                        <button
                                            key={idx}
                                            onClick={() => setSelectedPackIndex(idx)}
                                            className={cn(
                                                "w-full flex items-center justify-between px-6 py-4 rounded-xl border-2 text-sm font-bold transition-all",
                                                selectedPackIndex === idx
                                                    ? "bg-white border-[#0b1e47] text-[#0b1e47] shadow-sm"
                                                    : "bg-white border-gray-100 text-gray-600 hover:border-blue-100"
                                            )}
                                        >
                                            <span>{option.label}</span>
                                            <div className="flex items-center gap-3">
                                                {idx === 1 && <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">Most Popular</span>}
                                                {idx === 2 && <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">Maximum Savings</span>}
                                                {idx > 0 && (
                                                    <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">
                                                        Save ₹{Math.round((product.packOptions?.[0].price || 0) * (parseInt(option.label) / 120) - option.price)}
                                                    </span>
                                                )}
                                            </div>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Quantity Selector */}
                        <div className="mb-4">
                            <label className="block text-sm font-bold text-[#0b1e47] mb-2">Quantity</label>
                            <div className="inline-flex items-center border border-gray-300 rounded-lg bg-white">
                                <button
                                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                    className="px-4 py-2 text-gray-600 hover:bg-gray-50"
                                >-</button>
                                <span className="px-4 font-bold text-[#0b1e47]">{quantity}</span>
                                <button
                                    onClick={() => setQuantity(quantity + 1)}
                                    className="px-4 py-2 text-gray-600 hover:bg-gray-50"
                                >+</button>
                            </div>
                        </div>

                        {/* Add to Cart Button */}
                        <Button
                            size="lg"
                            className="w-full bg-[#ff5500] hover:bg-[#e64d00] text-white rounded-xl py-6 text-xl font-bold uppercase shadow-xl shadow-orange-500/20 mb-6"
                            onClick={() => onAddToCart && onAddToCart(quantity, activeOption ? { label: activeOption.label, price: finalPrice } : undefined)}
                            disabled={!isInStock}
                        >
                            {!isInStock ? 'Out of Stock' : (isSubscribe ? `Subscribe - ₹{finalPrice}` : `Add to Cart - ₹${finalPrice}`)}
                        </Button>

                        {/* Subscription Widget */}
                        <div className="border border-blue-100 rounded-xl bg-blue-50/50 p-4 mb-8">
                            <div className="flex items-center gap-3 mb-3 cursor-pointer" onClick={() => setIsSubscribe(false)}>
                                <div className={cn("w-5 h-5 rounded-full border-2 flex items-center justify-center", !isSubscribe ? "border-[#0b1e47]" : "border-gray-300")}>
                                    {!isSubscribe && <div className="w-2.5 h-2.5 rounded-full bg-[#0b1e47]" />}
                                </div>
                                <span className={cn("font-bold flex-1", !isSubscribe ? "text-[#0b1e47]" : "text-gray-600")}>One-Time Purchase</span>
                                <span className="font-bold">₹{combinedPrice}</span>
                            </div>
                            <div className="flex items-center gap-3 cursor-pointer" onClick={() => setIsSubscribe(true)}>
                                <div className={cn("w-5 h-5 rounded-full border-2 flex items-center justify-center", isSubscribe ? "border-[#0b1e47]" : "border-gray-300")}>
                                    {isSubscribe && <div className="w-2.5 h-2.5 rounded-full bg-[#0b1e47]" />}
                                </div>
                                <span className={cn("font-bold flex-1", isSubscribe ? "text-[#0b1e47]" : "text-gray-600")}>Subscribe & Save <span className="bg-[#2bbf85] text-white text-[10px] px-1.5 py-0.5 rounded ml-1">10% OFF</span></span>
                                <span className="font-bold">₹{Math.round(combinedPrice * 0.9)}</span>
                            </div>
                        </div>

                        {/* Guarantee / Shipping */}
                        <div className="flex items-center gap-4 text-xs font-medium text-gray-500 justify-center border-t pt-4">
                            <span className="flex items-center gap-1"><RefreshCw size={14} /> 30-Day Returns</span>
                            <span className="flex items-center gap-1"><Truck size={14} /> Free Shipping</span>
                            <span className="flex items-center gap-1"><ShieldCheck size={14} /> Secure Checkout</span>
                        </div>
                    </div>
                </div>

                {/* --- Certifications Row --- */}
                <div className="mt-20 py-12 border-t border-b border-gray-100 flex flex-wrap justify-between gap-8 text-center max-w-4xl mx-auto">
                    {[
                        { label: 'VET APPROVED', icon: Award },
                        { label: 'ISO CERTIFIED', icon: ShieldCheck },
                        { label: 'GMP CERTIFIED', icon: Check },
                        { label: 'HACCP CERTIFIED', icon: Zap } // Using Zap as placeholder for HACCP
                    ].map((cert, i) => (
                        <div key={i} className="flex flex-col items-center gap-3 flex-1 min-w-[150px]">
                            <div className="w-16 h-16 rounded-full bg-[#0b1e47] text-white flex items-center justify-center">
                                <cert.icon size={32} strokeWidth={1.5} />
                            </div>
                            <span className="font-bold text-[#0b1e47] text-sm tracking-wide">{cert.label}</span>
                        </div>
                    ))}
                </div>

                {/* --- Content Sections --- */}

                {/* 1. Value Proposition (Image Left, Text Right) - "Made for everyday dogs" */}
                <div className="mt-20 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                    <div className="rounded-3xl overflow-hidden shadow-2xl">
                        <img src="https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&q=80&w=1000" alt="Dog enjoying life" className="w-full h-full object-cover" />
                    </div>
                    <div>
                        <h2 className="text-3xl font-bold text-[#0b1e47] mb-6">Made for everyday dogs with everyday gut ups and downs</h2>
                        <p className="text-gray-600 mb-6">Not everyone has "serious issues". Most dogs just get inconsistent sometimes. This is for keeping things steady.</p>
                        <ul className="space-y-4">
                            {[
                                "On and off skin or paw attention linked to internal balance",
                                "Random soft stools that come and go",
                                "Food changes causing 'off' days",
                                "Picky appetite some days, fine other days",
                                "Stress travel routine shifts affecting digestion"
                            ].map((item, i) => (
                                <li key={i} className="flex items-start gap-3">
                                    <span className="mt-1 text-[#2bbf85]"><Check size={20} /></span>
                                    <span className="text-gray-700 font-medium">{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* 2. Key Benefits Grid */}
                {product.detailedBenefits && (
                    <div className="mt-20">
                        <h2 className="text-3xl font-bold text-center text-[#0b1e47] mb-12">What most pet parents notice with consistent use</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                            {product.detailedBenefits.map((benefit, i) => (
                                <div key={i} className="text-center p-6 bg-blue-50/30 rounded-2xl border border-blue-50">
                                    {/* Icon placeholder - would need actual SVGs from design */}
                                    <div className="w-16 h-16 mx-auto mb-4 bg-white rounded-full flex items-center justify-center text-[#0b1e47] shadow-sm">
                                        <ShieldCheck size={32} />
                                    </div>
                                    <h3 className="font-bold text-[#0b1e47] mb-2">{benefit.title}</h3>
                                    <p className="text-sm text-gray-600">{benefit.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}


                {/* 3. Vet Reviews - "Reviewed by Veterinarians" */}
                {product.vetApproval && (
                    <div className="mt-20 bg-blue-50/50 rounded-[40px] p-8 md:p-16">
                        <h2 className="text-2xl md:text-3xl font-bold text-center text-[#0b1e47] mb-12">Reviewed by Veterinarians for Daily, Long-Term Use</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                            {/* Card 1 - Dr. Deepanshi */}
                            <div className="bg-white p-8 rounded-3xl shadow-sm border border-blue-100 flex flex-col items-center text-center">
                                <div className="w-24 h-24 rounded-full overflow-hidden mb-6 border-4 border-blue-50">
                                    {/* Placeholder Vet Image */}
                                    <img src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=300" alt="Vet" className="w-full h-full object-cover" />
                                </div>
                                <blockquote className="text-gray-700 italic mb-6">"{product.vetApproval.quote}"</blockquote>
                                <div>
                                    <div className="font-bold text-[#0b1e47]">{product.vetApproval.doctorName}</div>
                                    <div className="text-xs text-secondary-foreground font-semibold uppercase tracking-wide text-gray-500">{product.vetApproval.qualification}</div>
                                </div>
                            </div>
                            {/* Card 2 - Dr. Jasleen (Hardcoded from mock data logic plan) */}
                            <div className="bg-white p-8 rounded-3xl shadow-sm border border-blue-100 flex flex-col items-center text-center">
                                <div className="w-24 h-24 rounded-full overflow-hidden mb-6 border-4 border-blue-50">
                                    <img src="https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=300" alt="Vet" className="w-full h-full object-cover" />
                                </div>
                                <blockquote className="text-gray-700 italic mb-6">"Palatability and acceptance were excellent — dogs finished their meals without resistance. Results weren't overnight, but within 20–30 days, stool quality and consistency improved."</blockquote>
                                <div>
                                    <div className="font-bold text-[#0b1e47]">Dr. Jasleen Kaur</div>
                                    <div className="text-xs text-secondary-foreground font-semibold uppercase tracking-wide text-gray-500">Veterinary Surgeon (12+ years)</div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Comparison & USPs Section */}
                {(product.comparisonTable || product.uniqueSellingPoints) && (
                    <div className="mt-20 grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                        {/* Comparison Table */}
                        {product.comparisonTable && (
                            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
                                <div className="overflow-x-auto">
                                    <table className="w-full text-sm text-left">
                                        <thead>
                                            <tr className="bg-white border-b border-gray-100">
                                                <th className="p-4 font-bold text-[#0b1e47]">Feature</th>
                                                <th className="p-4 font-bold text-white bg-[#0b1e47]">Beggin for a bite</th>
                                                <th className="p-4 font-bold text-gray-500">Other Brands</th>
                                                <th className="p-4 font-bold text-gray-500">Curd</th>
                                                <th className="p-4 font-bold text-gray-500">Existing Medicines</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-100">
                                            {product.comparisonTable.map((row, i) => (
                                                <tr key={i}>
                                                    <td className="p-4 font-bold text-[#0b1e47]">{row.feature}</td>
                                                    <td className="p-4 bg-blue-50/30 font-medium text-[#0b1e47]">
                                                        {row.us === true ? <Check className="text-[#2bbf85]" size={20} /> : row.us === false ? <span className="text-red-500 font-bold">✕</span> : row.us}
                                                    </td>
                                                    <td className="p-4 text-gray-600">
                                                        {row.others === true ? <Check className="text-[#2bbf85]" size={20} /> : row.others === false ? <span className="text-red-500 font-bold">✕</span> : row.others}
                                                    </td>
                                                    <td className="p-4 text-gray-600">
                                                        {row.curd === true ? <Check className="text-[#2bbf85]" size={20} /> : row.curd === false ? <span className="text-red-500 font-bold">✕</span> : row.curd}
                                                    </td>
                                                    <td className="p-4 text-gray-600">
                                                        {row.medicine === true ? <Check className="text-[#2bbf85]" size={20} /> : row.medicine === false ? <span className="text-red-500 font-bold">✕</span> : row.medicine}
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        )}

                        {/* USPs - "What Makes Us Truly Different" */}
                        {product.uniqueSellingPoints && (
                            <div>
                                <h2 className="text-3xl font-bold text-[#0b1e47] mb-8">What Makes Us Truly Different</h2>
                                <div className="space-y-6">
                                    {product.uniqueSellingPoints.map((usp, i) => (
                                        <div key={i} className="flex gap-4">
                                            <div className="text-2xl pt-1">{usp.icon}</div>
                                            <div>
                                                <h3 className="font-bold text-[#0b1e47] text-lg">
                                                    {usp.title} <span className="font-normal text-gray-600">– {usp.description}</span>
                                                </h3>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                )}

                {/* 4. Ingredients */}
                {product.ingredients && (
                    <div className="mt-20">
                        <h2 className="text-3xl font-bold mb-12 text-center text-[#0b1e47]">Power-Packed Ingredients</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {product.ingredients.map((ing, i) => (
                                <div key={i} className="p-6 rounded-2xl bg-white border border-gray-100 hover:shadow-lg transition-shadow text-center">
                                    <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-amber-50 flex items-center justify-center text-amber-500">
                                        <Zap size={32} />
                                    </div>
                                    <h3 className="font-bold text-lg text-[#0b1e47] mb-3">{ing.name}</h3>
                                    <p className="text-sm text-gray-600 leading-relaxed">{ing.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* FAQ Section */}
                {product.faqs && (
                    <div className="mt-20 max-w-3xl mx-auto">
                        <h2 className="text-2xl font-bold mb-8 text-center text-[#0b1e47]">Frequently Asked Questions</h2>
                        <div className="space-y-4">
                            {product.faqs.map((faq, i) => (
                                <AccordionItem key={i} title={faq.question} content={faq.answer} />
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

