import Link from 'next/link';
import { BlogPost } from '@/lib/types';
import { formatDate, readingTime, autoExcerpt } from '@/lib/blog-content';
import { cn } from '@/lib/utils';
import BlogCover from './BlogCover';

export function CategoryTag({ children, className }: { children?: React.ReactNode; className?: string }) {
    if (!children) return null;
    return (
        <span
            className={cn(
                'inline-block rounded-full bg-[#fff1ea] dark:bg-[#F4623B]/15 px-2.5 py-0.5 text-xs font-semibold tracking-wide text-[#c2410c] dark:text-[#fb8a5f]',
                className
            )}
        >
            {children}
        </span>
    );
}

export function PostMeta({ post, className }: { post: BlogPost; className?: string }) {
    return (
        <p className={cn('flex flex-wrap items-center gap-x-2 text-sm text-stone-500 dark:text-stone-400', className)}>
            <time dateTime={post.createdAt}>{formatDate(post.createdAt, 'short')}</time>
            <span aria-hidden>·</span>
            <span>{readingTime(post.content || post.excerpt)} min read</span>
        </p>
    );
}

/** Standard article card used on the blog index and "Keep reading". */
export default function BlogCard({ post, className }: { post: BlogPost; className?: string }) {
    const excerpt = post.excerpt || autoExcerpt(post.content || '');
    return (
        <article className={cn('group relative flex h-full flex-col', className)}>
            <BlogCover
                src={post.coverImage}
                sizes="(min-width: 1024px) 380px, (min-width: 640px) 50vw, 100vw"
                className="aspect-[16/10] rounded-xl"
            />
            <div className="mt-5 flex flex-1 flex-col">
                <CategoryTag className="self-start">{post.category}</CategoryTag>
                <h3 className="mt-3 font-display text-xl font-semibold leading-snug tracking-tight text-stone-900 dark:text-white line-clamp-2">
                    <Link
                        href={`/blogs/${post.slug}`}
                        className="bg-[length:0%_1px] bg-left-bottom bg-no-repeat bg-gradient-to-r from-current to-current transition-[background-size] duration-300 group-hover:bg-[length:100%_1px] focus-visible:outline-none after:absolute after:inset-0 after:rounded-xl focus-visible:after:ring-2 focus-visible:after:ring-[#F4623B] focus-visible:after:ring-offset-4"
                    >
                        {post.title}
                    </Link>
                </h3>
                {excerpt && (
                    <p className="mt-2 flex-1 text-[15px] leading-relaxed text-stone-600 dark:text-stone-400 line-clamp-3">{excerpt}</p>
                )}
                <PostMeta post={post} className="mt-4" />
            </div>
        </article>
    );
}
