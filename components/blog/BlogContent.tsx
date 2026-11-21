import { cn } from '@/lib/utils';

/**
 * Renders article HTML that has already been passed through prepareBlogHtml()/normalizeBlogHtml().
 * Typography lives in globals.css under `.blog-content`.
 */
export default function BlogContent({ html, className }: { html: string; className?: string }) {
    return <div className={cn('blog-content', className)} dangerouslySetInnerHTML={{ __html: html }} />;
}
