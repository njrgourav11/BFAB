'use client';

import { useEffect, useLayoutEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';

gsap.registerPlugin(ScrollTrigger, SplitText);

const useIsoLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;

/**
 * Site-wide motion layer. On every route it:
 *  1. wipes a brand curtain off the new page (skipped on first load, which has its own loader)
 *  2. scans <main> and animates what it finds — headings split & rise, images clip-reveal
 *     with a parallax drift, grid/list children stagger in, the first section parallaxes out.
 *
 * Pages with hand-built choreography opt out with `data-page-animate="off"` on a wrapper.
 * Anything framer-motion already controls (inline opacity/transform) is left alone so the
 * two libraries never fight over the same element.
 */
export default function PageAnimator() {
  const pathname = usePathname() || '/';
  const curtain = useRef<HTMLDivElement>(null);
  const first = useRef(true);
  const skip = pathname.startsWith('/admin');

  // 1. Curtain — positioned over the page before paint, then swept away
  useIsoLayoutEffect(() => {
    const el = curtain.current;
    if (!el) return;
    if (first.current || skip || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      first.current = false;
      gsap.set(el, { autoAlpha: 0 });
      return;
    }
    const tl = gsap.timeline();
    tl.set(el, { autoAlpha: 1, yPercent: 0 })
      .fromTo(el.querySelector('[data-curtain-mark]'), { scale: 0.6, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.35, ease: 'back.out(2)' })
      .to(el, { yPercent: -100, duration: 0.85, ease: 'expo.inOut' }, '+=0.1')
      .set(el, { autoAlpha: 0 });
    return () => {
      tl.kill();
    };
  }, [pathname, skip]);

  // 2. Auto choreography
  useEffect(() => {
    if (skip) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const splits: SplitText[] = [];
    let ctx: gsap.Context | null = null;

    const run = () => {
      const main = document.querySelector('main');
      if (!main) return;

      const free = (el: Element) =>
        !el.closest('[data-page-animate="off"], [data-auto-animated], header, nav, footer, [role="dialog"]') &&
        !el.closest('[style*="opacity"], [style*="transform"]');

      ctx = gsap.context(() => {
        const vh = window.innerHeight;
        const firstSection = main.querySelector<HTMLElement>(':scope section, :scope > div > section');

        // Headings: masked word-rise
        main.querySelectorAll<HTMLElement>('h1, h2').forEach((h) => {
          if (!free(h) || !h.textContent?.trim()) return;
          h.setAttribute('data-auto-animated', '');
          const isH1 = h.tagName === 'H1';
          const split = SplitText.create(h, { type: 'lines,words', mask: 'lines', linesClass: 'pa-line' });
          splits.push(split);
          const inView = h.getBoundingClientRect().top < vh;
          gsap.from(split.words, {
            yPercent: 110,
            duration: isH1 ? 1.2 : 1,
            ease: 'expo.out',
            stagger: isH1 ? 0.06 : 0.035,
            delay: inView ? 0.45 : 0,
            scrollTrigger: inView ? undefined : { trigger: h, start: 'top 88%', once: true },
          });
        });

        // Lead paragraphs right after a heading
        main.querySelectorAll<HTMLElement>('h1 + p, h2 + p, h1 + div > p:first-child').forEach((p) => {
          if (!free(p)) return;
          p.setAttribute('data-auto-animated', '');
          const inView = p.getBoundingClientRect().top < vh;
          gsap.from(p, {
            y: 24,
            opacity: 0,
            duration: 0.9,
            ease: 'power3.out',
            delay: inView ? 0.7 : 0.1,
            scrollTrigger: inView ? undefined : { trigger: p, start: 'top 90%', once: true },
          });
        });

        // Images: clip-path reveal, plus parallax drift for large ones inside a clipping frame
        main.querySelectorAll<HTMLImageElement>('img').forEach((img) => {
          if (!free(img)) return;
          const r = img.getBoundingClientRect();
          if (r.width < 160 || r.height < 120) return;
          img.setAttribute('data-auto-animated', '');
          const frame = img.parentElement;
          const clips = frame && getComputedStyle(frame).overflow !== 'visible';
          const big = r.width > window.innerWidth * 0.3;

          gsap.from(img, {
            clipPath: 'inset(100% 0% 0% 0%)',
            duration: 1.3,
            ease: 'power4.out',
            clearProps: 'clipPath',
            scrollTrigger: { trigger: img, start: 'top 90%', once: true },
          });
          if (big && clips) {
            gsap.fromTo(
              img,
              { yPercent: -6, scale: 1.14 },
              {
                yPercent: 6,
                scale: 1.14,
                ease: 'none',
                scrollTrigger: { trigger: frame, start: 'top bottom', end: 'bottom top', scrub: true },
              }
            );
          }
        });

        // Card grids & lists: children rise in sequence
        main.querySelectorAll<HTMLElement>('.grid, ul, ol').forEach((g) => {
          if (!free(g) || g.children.length < 2) return;
          if (g.closest('form')) return;
          const kids = Array.from(g.children).filter((c) => free(c) && !c.hasAttribute('data-auto-animated'));
          if (kids.length < 2) return;
          g.setAttribute('data-auto-animated', '');
          gsap.from(kids, {
            y: 50,
            opacity: 0,
            duration: 0.9,
            stagger: 0.08,
            ease: 'power3.out',
            scrollTrigger: { trigger: g, start: 'top 88%', once: true },
          });
        });

        // First section: content drifts up & fades as it scrolls away (parallax hero)
        if (
          firstSection &&
          free(firstSection) &&
          getComputedStyle(firstSection).position !== 'sticky' &&
          firstSection.offsetHeight > vh * 0.45
        ) {
          const inner = firstSection.firstElementChild as HTMLElement | null;
          if (inner) {
            gsap.to(inner, {
              yPercent: 18,
              opacity: 0.3,
              ease: 'none',
              scrollTrigger: { trigger: firstSection, start: 'top top', end: 'bottom top', scrub: true },
            });
          }
        }

        // Explicit parallax hooks anywhere: data-speed="0.3"
        main.querySelectorAll<HTMLElement>('[data-speed]').forEach((el) => {
          const speed = Number(el.dataset.speed) || 0.2;
          gsap.fromTo(
            el,
            { yPercent: speed * 60 },
            {
              yPercent: -speed * 60,
              ease: 'none',
              scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: true },
            }
          );
        });
      }, main);

      ScrollTrigger.refresh();
    };

    // Let the route's content (and web fonts) settle before measuring
    let raf = 0;
    const timer = window.setTimeout(() => {
      document.fonts.ready.then(() => {
        raf = requestAnimationFrame(run);
      });
    }, 60);

    const onLoad = () => ScrollTrigger.refresh();
    window.addEventListener('load', onLoad);

    // Async content (Firestore lists, images) changes page height: re-measure triggers
    let resizeTimer = 0;
    let lastHeight = 0;
    const ro = new ResizeObserver(() => {
      const h = document.body.scrollHeight;
      if (Math.abs(h - lastHeight) < 40) return;
      lastHeight = h;
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(() => ScrollTrigger.refresh(), 200);
    });
    const mainEl = document.querySelector('main');
    if (mainEl) ro.observe(mainEl);

    return () => {
      window.clearTimeout(timer);
      cancelAnimationFrame(raf);
      window.removeEventListener('load', onLoad);
      ro.disconnect();
      window.clearTimeout(resizeTimer);
      ctx?.revert();
      splits.forEach((s) => s.revert());
      document.querySelectorAll('[data-auto-animated]').forEach((el) => el.removeAttribute('data-auto-animated'));
    };
  }, [pathname, skip]);

  return (
    <div
      ref={curtain}
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[90] grid place-items-center bg-[#F4623B]"
      style={{ visibility: 'hidden' }}
    >
      <div data-curtain-mark className="flex flex-col items-center gap-3 text-white">
        <svg width="56" height="56" viewBox="0 0 64 64" fill="currentColor" aria-hidden>
          <ellipse cx="32" cy="42" rx="14" ry="11" />
          <ellipse cx="15" cy="27" rx="6" ry="8" />
          <ellipse cx="26" cy="17" rx="6" ry="8" />
          <ellipse cx="38" cy="17" rx="6" ry="8" />
          <ellipse cx="49" cy="27" rx="6" ry="8" />
        </svg>
        <span className="font-fredoka text-lg font-semibold tracking-wide">Beggin For A Bite</span>
      </div>
    </div>
  );
}
