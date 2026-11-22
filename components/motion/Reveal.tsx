'use client';
import type React from 'react';

import { useRef, type ElementType, type ReactNode, type ComponentPropsWithoutRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger, useGSAP);

type RevealVariant = 'up' | 'down' | 'left' | 'right' | 'scale' | 'blur' | 'clip';

const VARIANTS: Record<RevealVariant, gsap.TweenVars> = {
  up: { y: 60, opacity: 0 },
  down: { y: -60, opacity: 0 },
  left: { x: -80, opacity: 0 },
  right: { x: 80, opacity: 0 },
  scale: { scale: 0.85, opacity: 0 },
  blur: { y: 30, opacity: 0, filter: 'blur(12px)' },
  clip: { clipPath: 'inset(100% 0% 0% 0%)', y: 40 },
};

type RevealProps<T extends ElementType> = {
  as?: T;
  children: ReactNode;
  variant?: RevealVariant;
  /** Animate each `[data-reveal]` descendant (or direct children when none) in sequence */
  stagger?: number;
  delay?: number;
  duration?: number;
  start?: string;
  className?: string;
} & Omit<ComponentPropsWithoutRef<T>, 'children' | 'className'>;

/**
 * Scroll-triggered entrance built on GSAP ScrollTrigger. Content is visible
 * by default (no flash for no-JS / reduced-motion); GSAP hides it only once it
 * knows it can animate it back in.
 */
export default function Reveal<T extends ElementType = 'div'>({
  as,
  children,
  variant = 'up',
  stagger = 0,
  delay = 0,
  duration = 1,
  start = 'top 85%',
  className,
  ...rest
}: RevealProps<T>) {
  const Tag = (as || 'div') as ElementType;
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

      let targets: Element[] = [el];
      if (stagger > 0) {
        const marked = Array.from(el.querySelectorAll('[data-reveal]'));
        targets = marked.length ? marked : Array.from(el.children);
      }

      gsap.from(targets, {
        ...VARIANTS[variant],
        duration,
        delay,
        stagger,
        ease: variant === 'clip' ? 'power4.out' : 'power3.out',
        clearProps: 'filter,clipPath',
        scrollTrigger: { trigger: el, start, once: true },
      });
    },
    { scope: ref }
  );

  return (
    <Tag ref={ref} className={className} {...rest}>
      {children}
    </Tag>
  );
}

/**
 * Attribute-driven reveals for long pages:
 *   data-animate="up|left|right|scale|blur|clip"  → element animates in on scroll
 *   data-animate-stagger                           → its direct children animate in sequence instead
 */
export function useAutoReveal(scope: React.RefObject<HTMLElement | null>, deps: unknown[] = []) {
  useGSAP(
    () => {
      const root = scope.current;
      if (!root) return;
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

      root.querySelectorAll<HTMLElement>('[data-animate]').forEach((el) => {
        const variant = (el.dataset.animate as RevealVariant) || 'up';
        const vars = VARIANTS[variant] ?? VARIANTS.up;
        const targets = el.hasAttribute('data-animate-stagger') ? Array.from(el.children) : [el];
        gsap.from(targets, {
          ...vars,
          duration: 1,
          stagger: 0.1,
          ease: 'power3.out',
          clearProps: 'filter,clipPath',
          scrollTrigger: { trigger: el, start: 'top 85%', once: true },
        });
      });
    },
    { scope, dependencies: deps }
  );
}
