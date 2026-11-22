import FloatingProducts from '@/components/motion/FloatingProducts';
import Link from 'next/link';
import { Home, ArrowLeft } from 'lucide-react';

export default function NotFound() {
    return (
        <div className="relative isolate min-h-[calc(100vh-4rem)] overflow-hidden bg-[#FAF7F2] dark:bg-slate-950 flex flex-col items-center justify-center p-4 text-center">
            <FloatingProducts
                className="-z-10"
                items={[
                    { name: 'peanut', className: 'left-[8%] top-[12%] w-24 sm:w-40', rotate: -12 },
                    { name: 'jerky', className: 'right-[8%] top-[18%] w-24 sm:w-40', rotate: 10 },
                    { name: 'hemp', className: 'left-[18%] bottom-[8%] w-14 sm:w-20 hidden sm:block', rotate: 14 },
                    { name: 'treat', className: 'right-[14%] bottom-[10%] w-32 sm:w-52 hidden sm:block', rotate: -6 },
                ]}
            />
            <p className="mb-6 font-fredoka text-[clamp(6rem,22vw,14rem)] font-bold leading-none tracking-[-0.05em] text-[#F4623B]">404</p>

            <div className="max-w-md mx-auto space-y-6">
                <h1 className="text-4xl sm:text-6xl font-extrabold text-gray-900 dark:text-white tracking-tight">
                    Paw-don Me!
                </h1>
                <h2 className="text-2xl font-semibold text-orange-500">
                    Page not found
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
