import { Skeleton } from '@/components/ui/skeleton';

export default function Loading() {
    return (
        <div className="bg-white dark:bg-stone-950" aria-busy="true" aria-label="Loading article">
            <div className="bg-[#fef6eb] dark:bg-stone-900/60">
                <div className="mx-auto max-w-3xl px-4 sm:px-6 pt-12 pb-14 space-y-5">
                    <Skeleton className="h-4 w-40" />
                    <Skeleton className="h-6 w-24 rounded-full" />
                    <Skeleton className="h-12 w-full" />
                    <Skeleton className="h-12 w-2/3" />
                    <Skeleton className="h-5 w-full" />
                    <div className="flex items-center gap-3 pt-3">
                        <Skeleton className="h-10 w-10 rounded-full" />
                        <div className="space-y-2">
                            <Skeleton className="h-4 w-28" />
                            <Skeleton className="h-3 w-40" />
                        </div>
                    </div>
                </div>
            </div>
            <div className="mx-auto max-w-5xl px-4 sm:px-6 mt-12">
                <Skeleton className="aspect-[16/9] w-full rounded-2xl" />
            </div>
            <div className="mx-auto max-w-[720px] px-4 sm:px-6 py-16 space-y-4">
                {[100, 95, 98, 70, 0, 100, 92, 85].map((w, i) =>
                    w ? <Skeleton key={i} className="h-4" style={{ width: `${w}%` }} /> : <div key={i} className="h-4" />
                )}
            </div>
        </div>
    );
}
