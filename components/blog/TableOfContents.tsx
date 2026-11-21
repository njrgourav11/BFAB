'use client';

import { useEffect, useState } from 'react';
import { BlogHeading } from '@/lib/blog-content';
import { cn } from '@/lib/utils';

/** "On this page" list with the current section highlighted. */
export default function TableOfContents({ headings }: { headings: BlogHeading[] }) {
    const [active, setActive] = useState(headings[0]?.id);

    useEffect(() => {
        const elements = headings.map((h) => document.getElementById(h.id)).filter(Boolean) as HTMLElement[];
        if (!elements.length) return;
        const observer = new IntersectionObserver(
            (entries) => {
                const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
                if (visible[0]) setActive(visible[0].target.id);
            },
            { rootMargin: '-90px 0px -65% 0px' }
        );
        elements.forEach((el) => observer.observe(el));
        return () => observer.disconnect();
    }, [headings]);

    if (headings.length < 2) return null;

    return (
        <nav aria-label="On this page">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.12em] text-stone-500 dark:text-stone-400">On this page</p>
            <ul className="space-y-1 border-l border-stone-200 dark:border-stone-800">
                {headings.map((h) => (
                    <li key={h.id}>
                        <a
                            href={`#${h.id}`}
                            className={cn(
                                '-ml-px block border-l-2 py-1.5 text-sm leading-snug transition-colors',
                                h.level === 3 ? 'pl-7' : 'pl-4',
                                active === h.id
                                    ? 'border-[#F4623B] font-medium text-stone-900 dark:text-white'
                                    : 'border-transparent text-stone-500 hover:text-stone-900 dark:text-stone-400 dark:hover:text-white'
                            )}
                        >
                            {h.text}
                        </a>
                    </li>
                ))}
            </ul>
        </nav>
    );
}
