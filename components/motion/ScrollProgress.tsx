'use client';

import { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { usePathname } from 'next/navigation';

gsap.registerPlugin(ScrollTrigger, useGSAP);

/** Thin brand-coloured bar at the very top that tracks page scroll. */
export default function ScrollProgress() {
  const bar = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useGSAP(
    () => {
      if (!bar.current) return;
      gsap.set(bar.current, { scaleX: 0 });
      gsap.to(bar.current, {
        scaleX: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: document.documentElement,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.3,
        },
      });
    },
    { dependencies: [pathname], revertOnUpdate: true }
  );

  if (pathname?.startsWith('/admin')) return null;

  return (
    <div className="pointer-events-none fixed inset-x-0 top-0 z-[70] h-[3px]" aria-hidden>
      <div
        ref={bar}
        className="h-full origin-left bg-gradient-to-r from-[#F4623B] via-[#E3A438] to-[#2bbf85]"
      />
    </div>
  );
}
