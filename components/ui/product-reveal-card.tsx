"use client"

import { cn } from "@/lib/utils"
import Link from "next/link"

interface ProductRevealCardProps {
    id?: string | number
    name?: string
    price?: string
    originalPrice?: string
    image?: string
    description?: string
    rating?: number
    reviewCount?: number
    onAdd?: () => void
    enableAnimations?: boolean
    features?: string[]
    className?: string
}

export function ProductRevealCard({
    id,
    name = "Product Name",
    price = "₹899",
    originalPrice,
    image = "/placeholder.png",
    description = "Restores gut health from the inside out",
    rating = 5,
    reviewCount = 0,
    onAdd,
    className,
}: ProductRevealCardProps) {
    return (
        <Link
            href={id ? `/products/${id}` : '#'}
            className={cn(
                "group flex flex-col bg-white dark:bg-slate-900 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-gray-100 dark:border-slate-800 h-full",
                className
            )}
        >
            <div className="relative w-full h-[260px] bg-[#F5F5F5] dark:bg-slate-800 flex items-center justify-center overflow-hidden p-6">
                <img
                    src={image}
                    alt={name}
                    className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500 drop-shadow-sm mix-blend-multiply dark:mix-blend-normal"
                />
            </div>
            <div className="p-5 flex flex-col flex-grow">
                <h3 className="font-bold text-lg md:text-xl leading-tight text-[#0B1527] dark:text-white mb-2 line-clamp-2">{name}</h3>
                <div className="flex items-center mb-3 gap-0.5">
                    {[1, 2, 3, 4, 5].map((star) => (
                        <svg key={star} className="w-5 h-5 text-emerald-500 fill-current" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" /></svg>
                    ))}
                </div>
                <p className="text-gray-600 dark:text-gray-400 text-sm md:text-base mb-6 line-clamp-2">{description || 'Premium wellness supplement for your pet. Formulated by vets for real results.'}</p>
                <hr className="border-gray-100 dark:border-slate-800 mb-4 mt-auto" />
                <div className="flex flex-col gap-3">
                    <div className="text-gray-500 dark:text-gray-400 text-sm">
                        From <span className="text-[#0B1527] dark:text-white font-bold text-lg md:text-xl">{price}</span>
                    </div>
                    <div className="inline-flex items-center text-[#0B1527] dark:text-white font-bold text-sm tracking-wide relative w-max mt-1 group-hover:text-emerald-600 transition-colors">
                        <span className="pb-1">Shop Now</span> <span className="ml-1 group-hover:translate-x-1 transition-transform">→</span>
                        <div className="absolute bottom-0 left-0 w-[65px] h-[2px] bg-emerald-500"></div>
                    </div>
                </div>
            </div>
        </Link>
    )
}
