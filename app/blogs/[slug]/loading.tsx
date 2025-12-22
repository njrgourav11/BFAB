import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
    return (
        <div className="min-h-screen pt-24 pb-20 bg-white dark:bg-slate-950">
            <div className="container mx-auto px-4 max-w-4xl">
                {/* Back Link Skeleton */}
                <Skeleton className="h-6 w-32 mb-8" />

                {/* Header Skeleton */}
                <div className="mb-10 text-center space-y-6">
                    <Skeleton className="h-6 w-24 mx-auto rounded-full" />
                    <Skeleton className="h-12 w-3/4 mx-auto" />
                    <div className="flex justify-center gap-6">
                        <Skeleton className="h-4 w-32" />
                        <Skeleton className="h-4 w-32" />
                    </div>
                </div>

                {/* Featured Image Skeleton */}
                <Skeleton className="aspect-video w-full rounded-3xl mb-12 shadow-2xl" />

                {/* Content Skeleton */}
                <div className="space-y-6">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-5/6" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-32 w-full rounded-xl" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full" />
                </div>
            </div>
        </div>
    );
}
