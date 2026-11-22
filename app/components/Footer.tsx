'use client';
import React, { useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { ArrowRight, ArrowUpRight, Facebook, Heart, Instagram, Mail, MapPin, Phone, Twitter } from 'lucide-react';
import FloatingProducts from '@/components/motion/FloatingProducts';
import Magnet from '@/components/reactbits/Magnet';

gsap.registerPlugin(ScrollTrigger, useGSAP);

const COLUMNS = [
  {
    title: 'Shop',
    links: [
      { label: 'All products', href: '/products' },
      { label: 'Fresh meals', href: '/fresh' },
      { label: 'Saver packs', href: '/ultimate-saver-packs' },
      { label: 'Feeding guide', href: '/feeding-guide' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About us', href: '/about-us' },
      { label: 'BFAB Cares', href: '/bfab-cares' },
      { label: 'Vet professionals', href: '/vet-professionals' },
      { label: 'Paw blog', href: '/blogs' },
    ],
  },
  {
    title: 'Help',
    links: [
      { label: 'Contact us', href: '/contact-us' },
      { label: 'My account', href: '/profile' },
      { label: 'Cart', href: '/cart' },
    ],
  },
];

const SOCIAL = [
  { icon: Instagram, href: '#', label: 'Instagram' },
  { icon: Facebook, href: '#', label: 'Facebook' },
  { icon: Twitter, href: '#', label: 'Twitter' },
];

const LEGAL = ['Privacy Policy', 'Terms of Service', 'Shipping Policy', 'Return Policy'];

// Pages where a "shop now" band would interrupt a task in progress
const NO_CTA = ['/admin', '/cart', '/checkout', '/login', '/signup', '/register', '/forgot-password', '/confirmation', '/order-confirmation'];

const Footer = () => {
  const pathname = usePathname() || '/';
  const root = useRef<HTMLElement>(null);
  const showCta = !NO_CTA.some((p) => pathname.startsWith(p));

  useGSAP(
    () => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
      const q = gsap.utils.selector(root);
      gsap.fromTo(
        q('[data-ft-word]'),
        { xPercent: 8 },
        { xPercent: -18, ease: 'none', scrollTrigger: { trigger: root.current, start: 'top bottom', end: 'bottom bottom', scrub: true } }
      );
      gsap.from(q('[data-ft-col]'), {
        y: 40,
        opacity: 0,
        stagger: 0.08,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: { trigger: q('[data-ft-cols]')[0], start: 'top 92%', once: true },
      });
      if (q('[data-ft-cta-title]').length) {
        gsap.from(q('[data-ft-cta-title]'), {
          yPercent: 40,
          opacity: 0,
          duration: 1.1,
          ease: 'expo.out',
          scrollTrigger: { trigger: q('[data-ft-cta]')[0], start: 'top 80%', once: true },
        });
      }
    },
    { scope: root, dependencies: [showCta], revertOnUpdate: true }
  );

  return (
    <footer ref={root} data-page-animate="off" className="relative overflow-hidden">
      {showCta && (
        <section data-ft-cta className="relative isolate overflow-hidden bg-[#F4623B] text-white">
          <div aria-hidden className="absolute -left-20 -top-28 -z-10 h-80 w-80 rounded-full bg-[#E3A438]/40 blur-3xl" />
          <FloatingProducts
            className="-z-[1]"
            items={[
              { name: 'peanut', className: 'right-[6%] top-[14%] w-[10vw] max-w-[150px] min-w-[70px]', rotate: 10, depth: 0.3 },
              { name: 'jerky', className: 'right-[22%] bottom-[-6%] w-[10vw] max-w-[150px] min-w-[70px] hidden sm:block', rotate: -8, depth: 0.6 },
              { name: 'hemp', className: 'left-[4%] bottom-[10%] w-[6vw] max-w-[90px] min-w-[46px] hidden md:block', rotate: -12, depth: 0.5 },
              { name: 'pre', className: 'left-[40%] top-[-6%] w-[6vw] max-w-[90px] min-w-[46px] hidden lg:block', rotate: 14, depth: 0.8 },
            ]}
          />
          <div className="mx-auto flex max-w-7xl flex-col items-start gap-8 px-5 py-20 sm:px-8 sm:py-24 lg:px-10">
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-white/75">Beggin For A Bite</p>
            <h2 data-ft-cta-title className="max-w-3xl font-fredoka text-[clamp(2.6rem,7vw,6rem)] font-bold leading-[0.95] tracking-[-0.03em]">
              A bite worth
              <br />
              begging for.
            </h2>
            <Magnet padding={70} magnetStrength={3}>
              <Link
                href="/products"
                className="group inline-flex items-center gap-3 rounded-full bg-[#241F1B] py-4 pl-7 pr-4 text-base font-semibold text-white shadow-[0_25px_50px_-20px_rgba(36,31,27,0.7)] transition-colors hover:bg-white hover:text-[#241F1B]"
              >
                Shop the range
                <span className="grid h-9 w-9 place-items-center rounded-full bg-[#F4623B] text-white transition-transform duration-300 group-hover:-rotate-45">
                  <ArrowRight size={18} />
                </span>
              </Link>
            </Magnet>
          </div>
        </section>
      )}

      <div className="relative bg-[#14100D] text-white">
        <div className="mx-auto max-w-7xl px-5 pb-10 pt-20 sm:px-8 lg:px-10">
          <div data-ft-cols className="grid grid-cols-2 gap-10 md:grid-cols-[1.6fr_1fr_1fr_1fr]">
            <div data-ft-col className="col-span-2 md:col-span-1">
              <Link href="/" aria-label="Beggin For A Bite home" className="relative mb-6 block w-40 aspect-[1400/993] rounded-2xl bg-[#FAF7F2] p-2">
                <Image src="/1.svg" alt="Beggin For A Bite" fill className="object-contain p-2" />
              </Link>
              <p className="max-w-sm text-[15px] leading-relaxed text-white/60">
                Vet-formulated nutrition and wellness that helps every pet live a healthy, happy life — from first bite to forever.
              </p>
              <ul className="mt-6 space-y-3 text-[14px] text-white/70">
                <li>
                  <a href="mailto:paw.support@begginforabite.in" className="inline-flex items-center gap-3 transition-colors hover:text-[#F4623B]">
                    <Mail size={16} className="text-[#F4623B]" /> paw.support@begginforabite.in
                  </a>
                </li>
                <li>
                  <a href="tel:+918480320158" className="inline-flex items-center gap-3 transition-colors hover:text-[#F4623B]">
                    <Phone size={16} className="text-[#F4623B]" /> +91 8480-320158
                  </a>
                </li>
                <li className="flex items-start gap-3">
                  <MapPin size={16} className="mt-0.5 shrink-0 text-[#F4623B]" /> Taksh Apartment, Bhubaneswar, Odisha - 752050
                </li>
              </ul>
            </div>

            {COLUMNS.map((col) => (
              <div data-ft-col key={col.title}>
                <p className="mb-5 text-xs font-bold uppercase tracking-[0.2em] text-[#E3A438]">{col.title}</p>
                <ul className="space-y-3">
                  {col.links.map((l) => (
                    <li key={l.href}>
                      <Link href={l.href} className="group inline-flex items-center gap-1 text-[15px] text-white/70 transition-colors hover:text-white">
                        {l.label}
                        <ArrowUpRight size={14} className="-translate-x-1 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-14 flex flex-wrap items-center gap-3">
            {SOCIAL.map((s) => (
              <a
                key={s.label}
                href={s.href}
                aria-label={s.label}
                className="grid h-11 w-11 place-items-center rounded-full border border-white/15 text-white/80 transition-all duration-300 hover:-translate-y-1 hover:border-[#F4623B] hover:bg-[#F4623B] hover:text-white"
              >
                <s.icon size={18} />
              </a>
            ))}
          </div>
        </div>

        {/* Oversized wordmark that slides with scroll */}
        <div aria-hidden className="select-none overflow-hidden whitespace-nowrap border-y border-white/10 py-4">
          <p data-ft-word className="font-fredoka text-[clamp(4rem,14vw,13rem)] font-bold leading-none tracking-[-0.04em] text-transparent [-webkit-text-stroke:1.5px_rgba(244,98,59,0.55)]">
            Beggin For A Bite ✦ Beggin For A Bite
          </p>
        </div>

        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-5 py-8 text-[13px] text-white/50 sm:px-8 md:flex-row md:items-center md:justify-between lg:px-10">
          <p>© {new Date().getFullYear()} Beggin For A Bite (BFAB). All rights reserved.</p>
          <ul className="flex flex-wrap gap-x-5 gap-y-2">
            {LEGAL.map((l) => (
              <li key={l}><a href="#" className="hover:text-white">{l}</a></li>
            ))}
          </ul>
          <p className="inline-flex items-center gap-1.5">
            Made with <Heart size={13} className="fill-[#F4623B] text-[#F4623B]" /> for pet lovers
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
