import Image from 'next/image';
import { PawPrint } from 'lucide-react';
import { cn } from '@/lib/utils';

/** Cover image with a branded fallback when a post has no image. */
export default function BlogCover({
    src,
    alt = '',
    sizes,
    priority,
    className,
    zoom = true,
}: {
    src?: string;
    alt?: string;
    sizes: string;
    priority?: boolean;
    className?: string;
    zoom?: boolean;
}) {
    return (
        <div className={cn('relative overflow-hidden bg-[#fde9dc] dark:bg-stone-800', className)}>
            {src ? (
                <Image
                    src={src}
                    alt={alt}
                    fill
                    priority={priority}
                    sizes={sizes}
                    className={cn(
                        'object-cover',
                        zoom &&
                            'transition-transform duration-700 ease-out group-hover:scale-[1.04] motion-reduce:transition-none motion-reduce:group-hover:scale-100'
                    )}
                />
            ) : (
                <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-[#fde9dc] via-[#fef6eb] to-[#fbd5c2] dark:from-stone-800 dark:via-stone-900 dark:to-stone-800">
                    <PawPrint className="h-1/4 w-1/4 max-h-16 max-w-16 text-[#F4623B]/40" aria-hidden />
                </div>
            )}
        </div>
    );
}
