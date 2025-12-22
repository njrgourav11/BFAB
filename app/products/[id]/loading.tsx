import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
    return (
        <div className="min-h-screen bg-gray-50 dark:bg-slate-950 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                {/* Breadcrumb Skeleton */}
                <div className="flex gap-2 mb-8">
                    <Skeleton className="h-4 w-16" />
                    <Skeleton className="h-4 w-4" />
                    <Skeleton className="h-4 w-16" />
                    <Skeleton className="h-4 w-4" />
                    <Skeleton className="h-4 w-24" />
                </div>

                <div className="lg:grid lg:grid-cols-2 lg:gap-x-12 xl:gap-x-16">
                    {/* Image Gallery Skeleton */}
                    <div className="space-y-4">
                        <Skeleton className="aspect-square w-full rounded-2xl" />
                        <div className="grid grid-cols-4 gap-4">
                            {[1, 2, 3, 4].map((i) => (
                                <Skeleton key={i} className="aspect-square rounded-xl" />
                            ))}
                        </div>
                    </div>

                    {/* Product Info Skeleton */}
                    <div className="mt-10 lg:mt-0 space-y-8">
                        <div className="space-y-4">
                            <Skeleton className="h-10 w-3/4" />
                            <div className="flex items-center gap-4">
                                <Skeleton className="h-8 w-24" />
                                <Skeleton className="h-6 w-32" />
                            </div>
                        </div>

                        <Skeleton className="h-24 w-full" />

                        <div className="space-y-4">
                            <Skeleton className="h-12 w-full rounded-full" />
                            <Skeleton className="h-12 w-full rounded-full" />
                        </div>

                        <div className="pt-8 border-t border-gray-200 dark:border-slate-800 space-y-4">
                            <Skeleton className="h-6 w-1/3" />
                            <div className="space-y-2">
                                <Skeleton className="h-4 w-full" />
                                <Skeleton className="h-4 w-full" />
                                <Skeleton className="h-4 w-2/3" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
