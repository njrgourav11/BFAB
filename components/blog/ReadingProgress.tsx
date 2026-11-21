'use client';

import { useEffect, useState } from 'react';

/** Thin bar under the navbar that fills as the reader moves through the article. */
export default function ReadingProgress({ targetId }: { targetId: string }) {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const target = document.getElementById(targetId);
        if (!target) return;
        let frame = 0;
        const update = () => {
            frame = 0;
            const rect = target.getBoundingClientRect();
            const total = rect.height - window.innerHeight * 0.6;
            const read = Math.min(Math.max(-rect.top + window.innerHeight * 0.2, 0), Math.max(total, 1));
            setProgress(total > 0 ? read / total : 1);
        };
        const onScroll = () => {
            if (!frame) frame = requestAnimationFrame(update);
        };
        update();
        window.addEventListener('scroll', onScroll, { passive: true });
        window.addEventListener('resize', onScroll);
        return () => {
            window.removeEventListener('scroll', onScroll);
            window.removeEventListener('resize', onScroll);
            cancelAnimationFrame(frame);
        };
    }, [targetId]);

    return (
        <div className="fixed inset-x-0 top-0 z-[60] h-[3px] bg-transparent" aria-hidden>
            <div
                className="h-full origin-left bg-[#F4623B] transition-transform duration-100 ease-linear"
                style={{ transform: `scaleX(${progress})` }}
            />
        </div>
    );
}
