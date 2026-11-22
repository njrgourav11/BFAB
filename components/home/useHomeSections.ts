'use client';

import type React from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP);


const TIMING = new Set(['duration', 'delay', 'stagger', 'ease', 'transformOrigin', 'transformPerspective', 'scrollTrigger']);
const REST: Record<string, gsap.TweenValue> = {
  x: 0, y: 0, xPercent: 0, yPercent: 0, rotate: 0, rotateY: 0, skewX: 0, scale: 1, scaleX: 1, opacity: 1, filter: 'blur(0px)',
};
/**
 * Turn "from" vars into an explicit [from, to] pair. Plain from() tweens read their end
 * state from the DOM, which breaks if the element is already hidden (e.g. React's dev
 * double-mount); explicit end values make every entrance land correctly.
 */
export const fx = (vars: gsap.TweenVars): [gsap.TweenVars, gsap.TweenVars] => {
  const from: gsap.TweenVars = {};
  const to: gsap.TweenVars = {};
  Object.entries(vars).forEach(([k, v]) => {
    if (TIMING.has(k)) {
      if (k === 'transformOrigin' || k === 'transformPerspective') from[k] = v;
      to[k] = v;
    } else {
      from[k] = v;
      to[k] = REST[k] ?? v;
    }
  });
  return [from, to];
};

/** Draw an SVG stroke from nothing to full length. */
export const drawPaths = (paths: Element[], vars: gsap.TweenVars = {}) => {
  paths.forEach((p) => {
    const el = p as SVGGeometryElement;
    const len = el.getTotalLength?.() ?? 300;
    gsap.set(el, { strokeDasharray: len, strokeDashoffset: len });
  });
  return gsap.to(paths, { strokeDashoffset: 0, duration: 0.9, ease: 'power2.inOut', stagger: 0.15, ...vars });
};

/**
 * Bespoke scroll choreography for each home-page section. Sections are found by
 * `data-home="<name>"`; elements inside are tagged with `data-h="<role>"`.
 */
export function useHomeSections(scope: React.RefObject<HTMLElement | null>) {
  useGSAP(
    () => {
      const root = scope.current;
      if (!root || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

      const sec = (name: string) => root.querySelector<HTMLElement>(`[data-home="${name}"]`);
      const all = (el: Element | null, role: string) =>
        el ? Array.from(el.querySelectorAll<HTMLElement>(`[data-h="${role}"]`)) : [];
      const one = (el: Element | null, role: string) => all(el, role)[0];
      const splits: SplitText[] = [];
      const split = (el: Element | undefined, type: 'chars' | 'words' | 'lines' = 'chars') => {
        if (!el) return [] as Element[];
        const s = SplitText.create(el, { type: type === 'chars' ? 'words,chars' : type, mask: type === 'lines' ? 'lines' : undefined });
        splits.push(s);
        return type === 'chars' ? s.chars : type === 'words' ? s.words : s.lines;
      };
      const enter = (trigger: Element, start = 'top 78%') =>
        gsap.timeline({ scrollTrigger: { trigger, start, once: true } });

      // ── 1. Shop by concern: letters hop in, icons spin-pop from the centre, then float apart on scroll
      const concern = sec('concern');
      if (concern) {
        const tl = enter(concern, 'top 80%');
        tl.fromTo(split(one(concern, 'title')), ...fx({ yPercent: 120, rotate: 12, opacity: 0, stagger: 0.025, duration: 0.8, ease: 'back.out(2)' }))
          .fromTo(one(concern, 'sub'), ...fx({ y: 20, opacity: 0, duration: 0.6 }), '-=0.4')
          .fromTo(all(concern, 'icon'), ...fx({ scale: 0, rotate: -200, duration: 1, stagger: { each: 0.08, from: 'center' }, ease: 'back.out(1.8)' }), '-=0.3')
          .fromTo(all(concern, 'label'), ...fx({ y: 16, opacity: 0, stagger: { each: 0.06, from: 'center' }, duration: 0.5 }), '-=0.6');
        all(concern, 'tile').forEach((t, i) => {
          gsap.to(t, {
            y: i % 2 ? 28 : -28,
            ease: 'none',
            scrollTrigger: { trigger: concern, start: 'top bottom', end: 'bottom top', scrub: true },
          });
        });
      }

      // ── 2. We create pet wellness: lines slide in skewed, underlines are hand-drawn, products drop onto their plinths
      const wellness = sec('wellness');
      if (wellness) {
        const tl = enter(wellness);
        tl.fromTo(split(one(wellness, 'title'), 'lines'), ...fx({ xPercent: -40, skewX: 18, opacity: 0, duration: 0.9, stagger: 0.12, ease: 'expo.out' }))
          .fromTo(all(wellness, 'copy'), ...fx({ y: 20, opacity: 0, stagger: 0.1, duration: 0.6 }), '-=0.5')
          .add(drawPaths(all(wellness, 'underline')), '-=0.2')
          .fromTo(all(wellness, 'plinth'), ...fx({ yPercent: 120, opacity: 0, duration: 0.8, stagger: 0.12, ease: 'power3.out' }), 0.2)
          .fromTo(all(wellness, 'product'), ...fx({ y: -160, rotate: (i) => (i - 1) * 20, opacity: 0, duration: 1.1, stagger: 0.14, ease: 'bounce.out' }), 0.5);
        all(wellness, 'card').forEach((c, i) => {
          gsap.fromTo(c, { y: 40 + i * 25 }, { y: -(40 + i * 25), ease: 'none', scrollTrigger: { trigger: wellness, start: 'top bottom', end: 'bottom top', scrub: true } });
        });
      }

      // ── 3. Trust bar: unrolls from the middle
      const badges = sec('badges');
      if (badges) {
        gsap.fromTo(badges, ...fx({ scaleX: 0, transformOrigin: '50% 50%', duration: 1.1, ease: 'expo.inOut', scrollTrigger: { trigger: badges, start: 'top 92%', once: true } }));
      }

      // ── 4. Treats that care: mirror of wellness — cards tumble in from the left, copy from the right
      const treats = sec('treats');
      if (treats) {
        const tl = enter(treats);
        tl.fromTo(all(treats, 'card'), ...fx({ x: -140, rotate: -14, opacity: 0, duration: 1, stagger: 0.12, ease: 'back.out(1.4)' }))
          .fromTo(split(one(treats, 'title'), 'lines'), ...fx({ xPercent: 40, skewX: -18, opacity: 0, duration: 0.9, stagger: 0.12, ease: 'expo.out' }), 0.1)
          .fromTo(all(treats, 'copy'), ...fx({ y: 20, opacity: 0, stagger: 0.1, duration: 0.6 }), '-=0.4')
          .add(drawPaths(all(treats, 'underline')), '-=0.2');
        all(treats, 'product').forEach((p, i) => {
          gsap.to(p, { y: -12, rotate: i % 2 ? 3 : -3, duration: 2.2 + i * 0.3, ease: 'sine.inOut', yoyo: true, repeat: -1 });
        });
      }

      // ── 5. Healthy meals: plate spins up, pouches slide in from both sides, callouts flank them
      const meals = sec('meals');
      if (meals) {
        const tl = enter(meals, 'top 75%');
        tl.fromTo(split(one(meals, 'title'), 'words'), ...fx({ y: 40, opacity: 0, filter: 'blur(10px)', stagger: 0.05, duration: 0.8 }))
          .fromTo(all(meals, 'copy'), ...fx({ y: 20, opacity: 0, duration: 0.6, stagger: 0.1 }), '-=0.4')
          .fromTo(one(meals, 'plate'), ...fx({ scale: 0, rotate: -270, duration: 1.4, ease: 'expo.out' }), 0.3)
          .fromTo(one(meals, 'veg'), ...fx({ xPercent: -160, rotate: -30, opacity: 0, duration: 1.1, ease: 'back.out(1.2)' }), 0.6)
          .fromTo(one(meals, 'meat'), ...fx({ xPercent: 160, rotate: 30, opacity: 0, duration: 1.1, ease: 'back.out(1.2)' }), 0.7)
          .fromTo(all(meals, 'callout-l'), ...fx({ x: -80, opacity: 0, stagger: 0.15, duration: 0.8 }), 0.9)
          .fromTo(all(meals, 'callout-r'), ...fx({ x: 80, opacity: 0, stagger: 0.15, duration: 0.8 }), 0.9)
          .fromTo(all(meals, 'icon'), ...fx({ scale: 0, rotate: 90, stagger: 0.1, duration: 0.6, ease: 'back.out(2.5)' }), 1.1);
        gsap.to(one(meals, 'plate'), { rotate: 120, ease: 'none', scrollTrigger: { trigger: meals, start: 'top bottom', end: 'bottom top', scrub: true } });
        gsap.to(one(meals, 'veg'), { y: -30, ease: 'none', scrollTrigger: { trigger: meals, start: 'top bottom', end: 'bottom top', scrub: true } });
        gsap.to(one(meals, 'meat'), { y: 30, ease: 'none', scrollTrigger: { trigger: meals, start: 'top bottom', end: 'bottom top', scrub: true } });
      }

      // ── 6. Myths: headline types on, the venn zooms in with a wobble, then idles like it's being investigated
      const myths = sec('myths');
      if (myths) {
        const tl = enter(myths);
        tl.fromTo(split(one(myths, 'title')), ...fx({ opacity: 0, y: 10, stagger: 0.03, duration: 0.3, ease: 'none' }))
          .fromTo(one(myths, 'copy'), ...fx({ y: 20, opacity: 0, duration: 0.6 }), '-=0.2')
          .fromTo(one(myths, 'cta'), ...fx({ scale: 0, rotate: -12, duration: 0.7, ease: 'back.out(3)' }), '-=0.2')
          .fromTo(one(myths, 'venn'), ...fx({ scale: 0.4, rotate: -25, opacity: 0, duration: 1.4, ease: 'elastic.out(1, 0.6)' }), 0.2);
        gsap.to(one(myths, 'venn'), { rotate: 2, y: -10, duration: 2.6, ease: 'sine.inOut', yoyo: true, repeat: -1, delay: 1.6 });
      }

      // ── 7. Testimonials: lazily mounted, so look the cards up when the section scrolls in
      const reviews = sec('testimonials');
      if (reviews) {
        ScrollTrigger.create({
          trigger: reviews,
          start: 'top 85%',
          once: true,
          onEnter: () => {
            const h = reviews.querySelector('h2');
            const cards = Array.from(reviews.querySelectorAll('.grid > div'));
            const tl = gsap.timeline();
            if (h) tl.fromTo(h, ...fx({ y: 60, opacity: 0, duration: 0.9, ease: 'expo.out' }));
            if (cards.length)
              tl.fromTo(cards, ...fx({ y: 90, rotate: (i: number) => (i % 2 ? 5 : -5), opacity: 0, stagger: 0.12, duration: 1, ease: 'back.out(1.4)' }), '-=0.6');
          },
        });
      }

      // ── 8. Trusted by professionals: spark rays draw and keep twinkling, partner logos flip in
      const pros = sec('pros');
      if (pros) {
        const rays = all(pros, 'ray');
        const tl = enter(pros);
        tl.add(drawPaths(rays, { duration: 0.5, stagger: 0.08 }))
          .fromTo(split(one(pros, 'title'), 'lines'), ...fx({ yPercent: 100, duration: 0.9, stagger: 0.1, ease: 'expo.out' }), 0)
          .fromTo(one(pros, 'copy'), ...fx({ y: 16, opacity: 0, duration: 0.6 }), '-=0.4')
          .fromTo(all(pros, 'partner'), ...fx({ rotateY: 90, opacity: 0, transformPerspective: 600, stagger: 0.15, duration: 0.9, ease: 'back.out(1.6)' }), 0.3);
        gsap.to(rays, { scale: 1.25, transformOrigin: '100% 100%', opacity: 0.6, duration: 0.8, ease: 'sine.inOut', yoyo: true, repeat: -1, stagger: 0.1, delay: 1.5 });
      }

      // ── 9. Join the fam: pills slide in, the landscape builds itself — hills rise, sun glows, clouds drift
      const fam = sec('fam');
      if (fam) {
        const tl = enter(fam);
        tl.fromTo(split(one(fam, 'title'), 'lines'), ...fx({ yPercent: 100, duration: 0.9, stagger: 0.1, ease: 'expo.out' }))
          .fromTo(all(fam, 'pill'), ...fx({ x: -60, opacity: 0, stagger: 0.1, duration: 0.7, ease: 'power3.out' }), 0.2)
          .fromTo(one(fam, 'scene'), ...fx({ scale: 0.9, opacity: 0, duration: 0.8 }), 0)
          .fromTo(all(fam, 'hill'), ...fx({ y: 120, stagger: 0.12, duration: 1, ease: 'power3.out' }), 0.3)
          .fromTo(one(fam, 'sun'), ...fx({ scale: 0, transformOrigin: '50% 50%', duration: 1, ease: 'back.out(2)' }), 0.5)
          .fromTo(all(fam, 'cloud'), ...fx({ x: -200, opacity: 0, stagger: 0.2, duration: 1.2, ease: 'power2.out' }), 0.5);
        all(fam, 'cloud').forEach((c, i) => gsap.to(c, { x: i ? -30 : 40, duration: 5 + i * 2, ease: 'sine.inOut', yoyo: true, repeat: -1, delay: 1.8 }));
        gsap.to(one(fam, 'sun'), { scale: 1.12, transformOrigin: '50% 50%', duration: 2, ease: 'sine.inOut', yoyo: true, repeat: -1, delay: 1.5 });
      }

      return () => splits.forEach((s) => s.revert());
    },
    { scope }
  );
}
