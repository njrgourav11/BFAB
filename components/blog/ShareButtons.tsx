'use client';

import { useState } from 'react';
import { Check, Link2, Facebook, Linkedin, Twitter, MessageCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function ShareButtons({ title, path, className }: { title: string; path: string; className?: string }) {
    const [copied, setCopied] = useState(false);

    const enc = encodeURIComponent;
    const pageUrl = () => window.location.origin + path;
    const links = [
        { label: 'Share on WhatsApp', icon: MessageCircle, build: (url: string) => `https://wa.me/?text=${enc(`${title} ${url}`)}` },
        { label: 'Share on X', icon: Twitter, build: (url: string) => `https://twitter.com/intent/tweet?text=${enc(title)}&url=${enc(url)}` },
        { label: 'Share on Facebook', icon: Facebook, build: (url: string) => `https://www.facebook.com/sharer/sharer.php?u=${enc(url)}` },
        { label: 'Share on LinkedIn', icon: Linkedin, build: (url: string) => `https://www.linkedin.com/sharing/share-offsite/?url=${enc(url)}` },
    ];

    const copy = async () => {
        try {
            await navigator.clipboard.writeText(pageUrl());
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch {
            /* clipboard blocked – nothing to do */
        }
    };

    const btn =
        'inline-flex h-9 w-9 items-center justify-center rounded-full border border-stone-200 dark:border-stone-700 text-stone-600 dark:text-stone-300 transition-colors hover:border-[#F4623B] hover:text-[#c2410c] dark:hover:text-[#fb8a5f] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F4623B]';

    return (
        <div className={cn('flex items-center gap-2', className)}>
            {links.map(({ label, icon: Icon, build }) => (
                <button
                    key={label}
                    type="button"
                    onClick={() => window.open(build(pageUrl()), '_blank', 'noopener,noreferrer,width=640,height=560')}
                    aria-label={label}
                    title={label}
                    className={btn}
                >
                    <Icon size={16} aria-hidden />
                </button>
            ))}
            <button type="button" onClick={copy} aria-label="Copy link" title={copied ? 'Copied!' : 'Copy link'} className={btn}>
                {copied ? <Check size={16} className="text-emerald-600" aria-hidden /> : <Link2 size={16} aria-hidden />}
            </button>
            <span className="sr-only" aria-live="polite">
                {copied ? 'Link copied' : ''}
            </span>
        </div>
    );
}
