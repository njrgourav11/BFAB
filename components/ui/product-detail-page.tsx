// components/ui/product-detail-page.tsx
import * as React from "react";
import { ChevronRight, Star, Tag, Share2, ShoppingCart, ShieldCheck, HelpCircle, Check, ChevronDown, Award } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// Define TypeScript interfaces for component props
export interface Product {
    id: string | number;
    name: string;
    price: string | number;
    originalPrice?: string | number;
    shippingCost?: number;
    currency?: string;
    images: string[];
    description: string;
    rating?: number;
    reviewCount?: number;
    tags?: { label: string; icon?: React.ElementType }[];
    features?: string[];
    inStock?: boolean;
    category?: string;
    sku?: string;
    // New detailed fields
    longDescription?: string;
    detailedBenefits?: { title: string; description: string }[];
    ingredients?: { name: string; description: string }[];
    feedGuide?: string[];
    storage?: string[];
    vetApproval?: { quote: string; doctorName: string; qualification: string };
    processSteps?: { title: string; description: string }[];
    whyUnique?: { title: string; points: string[] }[];
    faqs?: { question: string; answer: string }[];
    detailedReviews?: { name: string; rating: number; text: string; date?: string; verified?: boolean }[];
}

export interface Seller {
    name: string;
    avatarUrl: string;
    rating: number;
}

export interface ProductDetailPageProps {
    product: Product;
    seller?: Seller;
    breadcrumbs?: { label: string; href: string }[];
    onAddToCart?: (quantity: number) => void;
}

const StarRating = ({ rating, className }: { rating: number; className?: string }) => (
    <div className={cn("flex items-center gap-0.5", className)}>
        {[...Array(5)].map((_, i) => (
            <Star
                key={i}
                className={cn(
                    "h-4 w-4",
                    i < Math.floor(rating) ? "text-yellow-400 fill-yellow-400" : "text-gray-200 dark:text-gray-700"
                )}
            />
        ))}
        {/* <span className="ml-2 text-sm font-medium text-muted-foreground">{rating.toFixed(1)}</span> */}
    </div>
);

const AccordionItem = ({ title, content }: { title: string; content: string }) => {
    const [isOpen, setIsOpen] = React.useState(false);
    return (
        <div className="border-b border-gray-100 dark:border-slate-800 last:border-0">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex justify-between items-center py-4 text-left font-medium text-gray-900 dark:text-gray-100 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
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

export const ProductDetailPage: React.FC<ProductDetailPageProps> = ({ product, seller, breadcrumbs, onAddToCart }) => {
    const [currentImageIndex, setCurrentImageIndex] = React.useState(0);
    const [quantity, setQuantity] = React.useState(1);

    return (
        <div className="w-full bg-white dark:bg-slate-950 transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
                {/* Breadcrumbs */}
                {breadcrumbs && (
                    <nav aria-label="Breadcrumb" className="flex items-center text-sm text-muted-foreground mb-6 overflow-x-auto whitespace-nowrap pb-2">
                        {breadcrumbs.map((item, index) => (
                            <React.Fragment key={index}>
                                <a href={item.href} className="hover:text-blue-600 transition-colors">{item.label}</a>
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
                                    src={product.images[currentImageIndex]}
                                    alt={product.name}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.3 }}
                                    className="object-contain w-full h-full p-8"
                                />
                            </AnimatePresence>
                            {product.rating && product.rating >= 4.8 && (
                                <div className="absolute top-4 left-4 bg-amber-400 text-amber-950 text-xs font-bold px-3 py-1.5 rounded-full shadow-lg flex items-center gap-1">
                                    <Award size={14} /> Bestseller
                                </div>
                            )}
                        </div>
                        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
                            {product.images.map((img, index) => (
                                <button
                                    key={index}
                                    onClick={() => setCurrentImageIndex(index)}
                                    className={cn(
                                        "relative w-20 h-20 rounded-xl overflow-hidden border-2 transition-all flex-shrink-0 bg-gray-50 dark:bg-slate-900",
                                        currentImageIndex === index ? "border-blue-500 shadow-md scale-105" : "border-transparent border-gray-100 dark:border-slate-800 hover:border-blue-200"
                                    )}
                                >
                                    <img src={img} alt={`Thumb ${index}`} className="w-full h-full object-contain p-2" />
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Product Info */}
                    <div className="flex flex-col">
                        <div className="mb-2">
                            {product.category && (
                                <span className="text-blue-600 dark:text-blue-400 font-semibold text-sm uppercase tracking-wider">
                                    {product.category}
                                </span>
                            )}
                        </div>
                        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 dark:text-white tracking-tight mb-4">
                            {product.name}
                        </h1>

                        <div className="flex items-center gap-4 mb-6">
                            {product.rating !== undefined && (
                                <div className="flex items-center gap-2 bg-gray-50 dark:bg-slate-900 px-3 py-1.5 rounded-full border border-gray-100 dark:border-slate-800">
                                    <span className="font-bold text-gray-900 dark:text-white">{product.rating}</span>
                                    <StarRating rating={product.rating} />
                                    {product.reviewCount !== undefined && (
                                        <span className="text-sm text-gray-500 border-l pl-2 border-gray-300 dark:border-slate-700">{product.reviewCount} reviews</span>
                                    )}
                                </div>
                            )}
                            {product.inStock ? (
                                <span className="text-green-600 dark:text-green-400 text-sm font-medium flex items-center gap-1">
                                    <Check size={16} /> In Stock
                                </span>
                            ) : (
                                <span className="text-red-500 text-sm font-medium">Out of Stock</span>
                            )}
                        </div>

                        <div className="flex items-baseline gap-4 mb-8">
                            <span className="text-4xl sm:text-5xl font-black text-gray-900 dark:text-white">
                                {product.currency || ''}{product.price}
                            </span>
                            {product.originalPrice && (
                                <span className="text-xl text-gray-400 line-through font-medium">
                                    {product.currency || ''}{product.originalPrice}
                                </span>
                            )}
                            {product.originalPrice && product.price && (
                                <span className="text-green-600 dark:text-green-400 font-bold bg-green-50 dark:bg-green-900/20 px-2 py-1 rounded-md text-sm">
                                    SAVE {Math.round((1 - parseFloat(product.price.toString().replace(/[^0-9.]/g, '')) / parseFloat(product.originalPrice.toString().replace(/[^0-9.]/g, ''))) * 100)}%
                                </span>
                            )}
                        </div>

                        <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed mb-8">
                            {product.description}
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 mb-8">
                            <div className="flex items-center border border-gray-200 dark:border-slate-800 rounded-xl">
                                <button
                                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                    className="px-4 py-3 hover:bg-gray-50 dark:hover:bg-slate-900 rounded-l-xl transition-colors"
                                >-</button>
                                <span className="px-4 font-bold min-w-[3rem] text-center">{quantity}</span>
                                <button
                                    onClick={() => setQuantity(quantity + 1)}
                                    className="px-4 py-3 hover:bg-gray-50 dark:hover:bg-slate-900 rounded-r-xl transition-colors"
                                >+</button>
                            </div>
                            <Button
                                size="lg"
                                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white rounded-xl h-auto py-4 text-lg font-bold shadow-xl shadow-blue-500/20"
                                onClick={() => onAddToCart && onAddToCart(quantity)}
                                disabled={product.inStock === false}
                            >
                                <ShoppingCart className="mr-2 h-5 w-5" />
                                {product.inStock === false ? 'Out of Stock' : 'Add to Cart'}
                            </Button>
                        </div>

                        {/* Key Features / Badges */}
                        <div className="grid grid-cols-2 gap-4">
                            {['Vet Approved', 'Natural Ingredients', 'No Preservatives', 'FSSAI Certified'].map((badge, i) => (
                                <div key={i} className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-slate-900 p-3 rounded-lg border border-gray-100 dark:border-slate-800">
                                    <ShieldCheck className="h-4 w-4 text-green-500" /> {badge}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* --- Extended Details Sections --- */}

                {/* 1. Long Description & Benefits */}
                <div className="mt-20 grid grid-cols-1 lg:grid-cols-3 gap-12">
                    <div className="lg:col-span-2">
                        {product.longDescription && (
                            <div className="mb-12">
                                <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Description</h2>
                                <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-lg">
                                    {product.longDescription}
                                </p>
                            </div>
                        )}

                        {product.detailedBenefits && (
                            <div className="mb-12">
                                <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Benefits</h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {product.detailedBenefits.map((benefit, i) => (
                                        <div key={i} className="flex gap-4 p-5 rounded-2xl bg-blue-50/50 dark:bg-slate-900/50 border border-blue-100 dark:border-slate-800">
                                            <div className="flex-shrink-0 mt-1">
                                                <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400 font-bold text-sm">
                                                    {i + 1}
                                                </div>
                                            </div>
                                            <div>
                                                <h3 className="font-bold text-gray-900 dark:text-white mb-2">{benefit.title}</h3>
                                                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{benefit.description}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Process Steps */}
                        {product.processSteps && (
                            <div className="mb-12">
                                <h2 className="text-2xl font-bold mb-8 text-gray-900 dark:text-white">How We Reach Perfection</h2>
                                <div className="relative border-l-2 border-gray-200 dark:border-slate-800 ml-4 space-y-10">
                                    {product.processSteps.map((step, i) => (
                                        <div key={i} className="relative pl-8">
                                            <span className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-green-500 border-4 border-white dark:border-slate-950"></span>
                                            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{step.title}</h3>
                                            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{step.description}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="lg:col-span-1 space-y-8">
                        {/* Vet Approval Card */}
                        {product.vetApproval && (
                            <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-gray-100 dark:border-slate-800 shadow-xl shadow-gray-200/50 dark:shadow-none">
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                                        {/* Placeholder for Vet Image if not provided, or use generic */}
                                        <ShieldCheck size={32} />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-gray-900 dark:text-white">{product.vetApproval.doctorName}</h3>
                                        <p className="text-xs text-green-600 uppercase tracking-wide font-semibold">{product.vetApproval.qualification}</p>
                                    </div>
                                </div>
                                <blockquote className="text-gray-600 dark:text-gray-300 italic mb-4 relative z-10">
                                    "{product.vetApproval.quote}"
                                </blockquote>
                                <div className="text-right">
                                    <span className="inline-block bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300 text-xs font-bold px-3 py-1 rounded-full">
                                        Vet Approved
                                    </span>
                                </div>
                            </div>
                        )}

                        {/* Feed Guide Summary */}
                        {product.feedGuide && (
                            <div className="bg-gray-50 dark:bg-slate-900 p-6 rounded-3xl border border-gray-100 dark:border-slate-800">
                                <h3 className="font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                                    <HelpCircle className="h-5 w-5 text-blue-500" /> Feeding Guide
                                </h3>
                                <ul className="space-y-3">
                                    {product.feedGuide.slice(0, 3).map((guide, i) => (
                                        <li key={i} className="text-sm text-gray-600 dark:text-gray-400 flex gap-3">
                                            <span className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-2 flex-shrink-0"></span>
                                            {guide}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                </div>

                {/* Ingredients Section */}
                {product.ingredients && (
                    <div className="mt-20">
                        <h2 className="text-2xl font-bold mb-8 text-center text-gray-900 dark:text-white">Premium Ingredients</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {product.ingredients.map((ing, i) => (
                                <div key={i} className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 hover:shadow-lg transition-shadow">
                                    <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-3">{ing.name}</h3>
                                    <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{ing.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* FAQ Section */}
                {product.faqs && (
                    <div className="mt-20 max-w-3xl mx-auto">
                        <h2 className="text-2xl font-bold mb-8 text-center text-gray-900 dark:text-white">Frequently Asked Questions</h2>
                        <div className="space-y-4">
                            {product.faqs.map((faq, i) => (
                                <AccordionItem key={i} title={faq.question} content={faq.answer} />
                            ))}
                        </div>
                    </div>
                )}

                {/* Reviews Section */}
                {product.detailedReviews && (
                    <div className="mt-20 bg-gray-50 dark:bg-slate-900/50 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8 py-16">
                        <div className="max-w-7xl mx-auto">
                            <div className="text-center mb-12">
                                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Loved by Pet Parents</h2>
                                <div className="flex items-center justify-center gap-2">
                                    <div className="flex text-yellow-400">
                                        {[...Array(5)].map((_, i) => <Star key={i} className="fill-current w-5 h-5" />)}
                                    </div>
                                    <span className="text-lg font-medium text-gray-700 dark:text-gray-300">Based on {product.reviewCount}+ reviews</span>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {product.detailedReviews.slice(0, 6).map((review, i) => (
                                    <div key={i} className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-800">
                                        <div className="flex items-center justify-between mb-4">
                                            <div className="flex items-center gap-3">
                                                <Avatar className="h-10 w-10 bg-blue-100 text-blue-600">
                                                    <AvatarFallback>{review.name.charAt(0)}</AvatarFallback>
                                                </Avatar>
                                                <div>
                                                    <h4 className="font-bold text-gray-900 dark:text-white text-sm">{review.name}</h4>
                                                    {review.verified && <span className="text-green-500 text-xs flex items-center gap-0.5"><ShieldCheck size={10} /> Verified Buyer</span>}
                                                </div>
                                            </div>
                                            <StarRating rating={review.rating} />
                                        </div>
                                        <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed italic">"{review.text}"</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

            </div>
        </div>
    );
};
