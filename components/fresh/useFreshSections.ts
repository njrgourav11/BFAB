'use client';

import type React from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import { useGSAP } from '@gsap/react';
import { drawPaths, fx } from '@/components/home/useHomeSections';

gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP);

/**
 * Section-by-section choreography for the Fresh Meals page.
 * Sections: `data-fr="<name>"`, roles inside: `data-f="<role>"`.
 */
export function useFreshSections(scope: React.RefObject<HTMLElement | null>) {
  useGSAP(
    () => {
      const root = scope.current;
      if (!root || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
      const sec = (n: string) => root.querySelector<HTMLElement>(`[data-fr="${n}"]`);
      const all = (el: Element | null, r: string) => (el ? Array.from(el.querySelectorAll<HTMLElement>(`[data-f="${r}"]`)) : []);
      const one = (el: Element | null, r: string) => all(el, r)[0];
      const splits: SplitText[] = [];
      const lines = (el?: Element) => {
        if (!el) return [] as Element[];
        const s = SplitText.create(el, { type: 'lines', mask: 'lines' });
        splits.push(s);
        return s.lines;
      };
      const scrub = (trigger: Element) => ({ trigger, start: 'top bottom', end: 'bottom top', scrub: true });

      // ── 1. Hero: headline rises line by line, then each industry myth gets crossed out in turn
      const hero = sec('hero');
      if (hero) {
        const tl = gsap.timeline({ delay: 0.5 });
        tl.fromTo(lines(one(hero, 'title')), ...fx({ yPercent: 110, duration: 1, stagger: 0.12, ease: 'expo.out' }))
          .fromTo(one(hero, 'lead'), ...fx({ y: 24, opacity: 0, duration: 0.8 }), '-=0.5');
        all(hero, 'myth').forEach((m, i) => {
          const at = 0.9 + i * 0.45;
          tl.fromTo(m.querySelector('[data-f="myth-title"]'), ...fx({ x: 40, opacity: 0, duration: 0.6, ease: 'power3.out' }), at)
            .fromTo(m.querySelector('[data-f="strike"]'), { scaleX: 0, transformOrigin: '0% 50%' }, { scaleX: 1, duration: 0.45, ease: 'power2.inOut' }, at + 0.35)
            .fromTo(m.querySelector('[data-f="myth-copy"]'), ...fx({ y: 14, opacity: 0, duration: 0.5 }), at + 0.5);
        });
        gsap.to(one(hero, 'ring'), { rotate: 90, scale: 1.2, ease: 'none', scrollTrigger: { trigger: hero, start: 'top top', end: 'bottom top', scrub: true } });
        gsap.to(one(hero, 'glow'), { yPercent: -40, ease: 'none', scrollTrigger: { trigger: hero, start: 'top top', end: 'bottom top', scrub: true } });
      }

      // ── 2. Pouches + "how we make it healthy": plate spins up, pouches drop on, the big bowl floats in
      const make = sec('make');
      if (make) {
        const pouchTl = gsap.timeline({ scrollTrigger: { trigger: make, start: 'top 90%', once: true } });
        pouchTl
          .fromTo(one(make, 'disc'), ...fx({ scale: 0, rotate: -180, duration: 1.2, ease: 'expo.out' }))
          .fromTo(all(make, 'pouch'), ...fx({ y: -140, rotate: (i: number) => (i ? 18 : -18), opacity: 0, duration: 1, stagger: 0.15, ease: 'bounce.out' }), 0.2);
        gsap.to(one(make, 'pouches'), { y: -40, ease: 'none', scrollTrigger: scrub(make) });

        const copy = one(make, 'plans');
        gsap.timeline({ scrollTrigger: { trigger: copy, start: 'top 82%', once: true } })
          .fromTo(copy?.children ? Array.from(copy.children) : [], ...fx({ x: -50, opacity: 0, duration: 0.8, stagger: 0.12, ease: 'power3.out' }));

        const better = one(make, 'better');
        gsap.timeline({ scrollTrigger: { trigger: better, start: 'top 80%', once: true } })
          .fromTo(lines(better), ...fx({ yPercent: 110, duration: 0.9, stagger: 0.1, ease: 'expo.out' }))
          .fromTo(one(make, 'better-copy'), ...fx({ y: 20, opacity: 0, duration: 0.6 }), '-=0.4');

        const how = one(make, 'how');
        gsap.timeline({ scrollTrigger: { trigger: how, start: 'top 80%', once: true } })
          .fromTo(lines(how), ...fx({ xPercent: 30, opacity: 0, duration: 0.9, stagger: 0.1, ease: 'expo.out' }));

        const plate = one(make, 'plate');
        gsap.fromTo(plate, ...fx({ scale: 0.6, rotate: -25, opacity: 0, duration: 1.4, ease: 'elastic.out(1, 0.7)', scrollTrigger: { trigger: plate, start: 'top 80%', once: true } }));
        gsap.fromTo(plate, { y: 60 }, { y: -60, ease: 'none', scrollTrigger: scrub(plate) });

        const feat = one(make, 'features');
        gsap.timeline({ scrollTrigger: { trigger: feat, start: 'top 88%', once: true } })
          .fromTo(one(make, 'track'), { scaleX: 0, transformOrigin: '0% 50%' }, { scaleX: 1, duration: 0.9, ease: 'power2.inOut' })
          .fromTo(all(make, 'feature'), ...fx({ y: 20, opacity: 0, stagger: 0.1, duration: 0.5 }), '-=0.4');
      }

      // ── 3. How your plan works: numbers pop, arrows draw between them, copy follows
      const plan = sec('plan');
      if (plan) {
        gsap.timeline({ scrollTrigger: { trigger: plan, start: 'top 75%', once: true } })
          .fromTo(one(plan, 'title'), ...fx({ y: 40, opacity: 0, duration: 0.8, ease: 'expo.out' }))
          .fromTo(all(plan, 'num'), ...fx({ scale: 0, rotate: -120, duration: 0.8, stagger: 0.35, ease: 'back.out(2.2)' }), '-=0.3')
          .add(drawPaths(all(plan, 'arrow'), { duration: 0.5, stagger: 0.35 }), '-=0.9')
          .fromTo(all(plan, 'step-copy'), ...fx({ y: 24, opacity: 0, duration: 0.6, stagger: 0.35 }), '<-0.4');
        gsap.to(all(plan, 'num'), { y: -6, duration: 1.6, ease: 'sine.inOut', yoyo: true, repeat: -1, stagger: 0.3, delay: 2.4 });
      }

      // ── 4. 1 tonne delivered: headline scales up, ticks draw themselves, button bounces in
      const tonne = sec('tonne');
      if (tonne) {
        const ticks = all(tonne, 'tick');
        gsap.timeline({ scrollTrigger: { trigger: tonne, start: 'top 75%', once: true } })
          .fromTo(one(tonne, 'title'), ...fx({ scale: 0.7, opacity: 0, duration: 1, ease: 'back.out(1.6)' }))
          .add(drawPaths(ticks, { duration: 0.5, stagger: 0.18 }), '-=0.3')
          .fromTo(all(tonne, 'benefit'), ...fx({ y: 16, opacity: 0, duration: 0.5, stagger: 0.18 }), '<')
          .fromTo(one(tonne, 'cta'), ...fx({ y: 30, scale: 0.8, opacity: 0, duration: 0.8, ease: 'back.out(2.5)' }), '-=0.2');
      }

      return () => splits.forEach((s) => s.revert());
    },
    { scope }
  );
}
