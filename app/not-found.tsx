import Link from 'next/link';
import { Home, ArrowLeft } from 'lucide-react';

export default function NotFound() {
    return (
        <div className="min-h-screen bg-[#fef6eb] dark:bg-slate-950 flex flex-col items-center justify-center p-4 text-center">
            <div className="relative w-64 h-64 sm:w-80 sm:h-80 mb-8 flex items-center justify-center text-9xl">
                {/* Simple fallback since image might also be missing */}
                🐶
            </div>

            <div className="max-w-md mx-auto space-y-6">
                <h1 className="text-4xl sm:text-6xl font-extrabold text-gray-900 dark:text-white tracking-tight">
                    Paw-don Me!
                </h1>
                <h2 className="text-2xl font-semibold text-orange-500">
                    404 - Page Not Found
                </h2>
                <p className="text-lg text-gray-600 dark:text-gray-400">
                    We dug everywhere, but we couldn't find the page you're looking for. It might have been buried in the backyard.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                    <Link
                        href="/"
                        className="inline-flex items-center justify-center gap-2 px-8 py-3 bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-bold rounded-full hover:scale-105 transition-transform shadow-lg"
                    >
                        <Home size={20} />
                        Go Home
                    </Link>
                    {/* Back button logic requires client side, so we use a simple link to products or similar, or just omit default back if strict server */}
                    <Link
                        href="/products"
                        className="inline-flex items-center justify-center gap-2 px-8 py-3 bg-white dark:bg-slate-800 text-gray-900 dark:text-white font-bold rounded-full border border-gray-200 dark:border-slate-700 hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors shadow-sm"
                    >
                        <ArrowLeft size={20} />
                        Browse Shop
                    </Link>
                </div>
            </div>
        </div>
    );
}
