"use client";
import ParallaxHero from '@/components/motion/ParallaxHero';
import FloatingProducts from '@/components/motion/FloatingProducts';
import React, { useMemo, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  Mail, Phone, MapPin, Clock, MessageCircle, Plus, Search, ArrowUpRight, Send, CheckCircle2,
  ShoppingBag, Truck, RotateCcw, CreditCard, Leaf, UserRound, type LucideIcon,
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger, useGSAP);

type Faq = { q: string; a: string };
type Category = { id: string; label: string; faqs: Faq[] };

const categoryIcons: Record<string, LucideIcon> = {
  orders: ShoppingBag,
  shipping: Truck,
  returns: RotateCcw,
  payments: CreditCard,
  products: Leaf,
  account: UserRound,
};

const SUPPORT_EMAIL = 'paw.support@begginforabite.in';
const SUPPORT_PHONE = '+91 8480-320158';
const SUPPORT_PHONE_RAW = '918480320158';

// NOTE: Review these answers against your actual store policies before going live.
const categories: Category[] = [
  {
    id: 'orders',
    label: 'Orders',
    faqs: [
      {
        q: 'How do I place an order?',
        a: 'Browse our products, add the items you like to your cart and proceed to checkout. Enter your delivery address, choose a payment method and confirm your order. You will receive an order confirmation by email.',
      },
      {
        q: 'Can I change or cancel my order after placing it?',
        a: `Orders can be modified or cancelled before they are dispatched. Write to us at ${SUPPORT_EMAIL} or call ${SUPPORT_PHONE} with your order ID as soon as possible and we will help you out.`,
      },
      {
        q: 'How can I check the status of my order?',
        a: 'Log in and visit the Orders section of your profile to see the latest status. Once your order ships, we also share tracking details over email.',
      },
      {
        q: 'Do I need an account to place an order?',
        a: 'Creating an account lets you track orders, save addresses and check out faster. Sign up takes less than a minute.',
      },
    ],
  },
  {
    id: 'shipping',
    label: 'Shipping & Delivery',
    faqs: [
      {
        q: 'Where do you deliver?',
        a: 'We deliver across India. Enter your pincode at checkout to confirm delivery to your location.',
      },
      {
        q: 'How long will it take to receive my order?',
        a: 'Orders are usually processed within 24 hours. Delivery typically takes 3–7 business days depending on your location.',
      },
      {
        q: 'Are there any shipping charges?',
        a: 'Shipping charges, if any, are shown at checkout before you pay. Look out for free-shipping offers on eligible orders.',
      },
      {
        q: 'How are fresh meals packed and shipped?',
        a: 'Fresh meals are packed in insulated, food-safe packaging to keep them at the right temperature until they reach your doorstep. Please refrigerate them as soon as they arrive.',
      },
    ],
  },
  {
    id: 'returns',
    label: 'Returns & Refunds',
    faqs: [
      {
        q: 'What is your return policy?',
        a: `If you receive a damaged, defective or incorrect product, write to us at ${SUPPORT_EMAIL} within 48 hours of delivery with your order ID and photos, and we will arrange a replacement or refund.`,
      },
      {
        q: 'Can I return fresh food items?',
        a: 'For hygiene and safety reasons, fresh and perishable items cannot be returned once delivered, unless they arrive damaged or spoiled.',
      },
      {
        q: 'When will I receive my refund?',
        a: 'Once approved, refunds are processed to your original payment method within 5–7 business days. The time taken to reflect in your account depends on your bank.',
      },
    ],
  },
  {
    id: 'payments',
    label: 'Payments',
    faqs: [
      {
        q: 'What payment methods do you accept?',
        a: 'We accept UPI, debit and credit cards, net banking and popular wallets through our secure payment partner Razorpay.',
      },
      {
        q: 'Is it safe to pay on your website?',
        a: 'Yes. All payments are processed through Razorpay over an encrypted connection. We never store your card details.',
      },
      {
        q: 'My payment failed but money was deducted. What should I do?',
        a: 'Failed transactions are usually reversed automatically by your bank within 5–7 business days. If it does not reflect, contact us with the transaction details and we will help.',
      },
      {
        q: 'How do I apply a coupon code?',
        a: 'Enter your coupon code in the cart or at checkout and tap Apply. The discount will be reflected in your order total if the coupon is valid.',
      },
    ],
  },
  {
    id: 'products',
    label: 'Products & Nutrition',
    faqs: [
      {
        q: 'Are your products suitable for dogs with allergies?',
        a: 'Many of our recipes are made with limited, wholesome ingredients. Check the ingredient list on each product page and consult your veterinarian for pets with specific allergies.',
      },
      {
        q: 'How much should I feed my pet?',
        a: 'Portions depend on your pet’s age, weight and activity level. Use our Feeding Guide for a recommended daily amount and adjust as needed.',
      },
      {
        q: 'How should I store the food?',
        a: 'Store fresh meals in the refrigerator and consume within the period mentioned on the pack, or freeze for longer storage. Dry treats should be kept in a cool, dry place in an airtight container.',
      },
      {
        q: 'How do I switch my pet to a new food?',
        a: 'Transition gradually over 7–10 days by mixing increasing amounts of the new food with the old food. This helps avoid tummy upsets.',
      },
    ],
  },
  {
    id: 'account',
    label: 'My Account',
    faqs: [
      {
        q: 'How do I create an account?',
        a: 'Click Sign Up, enter your details and verify your email. You can then manage your profile, addresses and orders from one place.',
      },
      {
        q: 'I forgot my password. What should I do?',
        a: 'Click “Forgot password” on the login page and follow the instructions sent to your registered email to reset it.',
      },
      {
        q: 'How do I update my address or contact details?',
        a: 'Log in and go to your Profile to edit your saved addresses, phone number and other details.',
      },
    ],
  },
];

const contactCards = [
  {
    icon: Phone,
    title: 'Call us',
    lines: [SUPPORT_PHONE, 'Mon – Sat, 9 AM – 6 PM'],
    href: `tel:+${SUPPORT_PHONE_RAW}`,
    cta: 'Call now',
    tone: '#F4623B',
  },
  {
    icon: MessageCircle,
    title: 'WhatsApp us',
    lines: [SUPPORT_PHONE, 'Quick replies during business hours'],
    href: `https://wa.me/${SUPPORT_PHONE_RAW}`,
    cta: 'Chat on WhatsApp',
    tone: '#2bbf85',
  },
  {
    icon: Mail,
    title: 'Write to us',
    lines: [SUPPORT_EMAIL, 'We reply within 24 hours'],
    href: `mailto:${SUPPORT_EMAIL}`,
    cta: 'Send an email',
    tone: '#E3A438',
  },
];

const ContactUsPage = () => {
  const root = useRef<HTMLDivElement>(null);
  const [activeCategory, setActiveCategory] = useState(categories[0].id);
  const [openKey, setOpenKey] = useState<string | null>(`${categories[0].id}-0`);
  const [query, setQuery] = useState('');
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', order: '', topic: categories[0].label, message: '' });

  const searchResults = useMemo(() => {
    const term = query.trim().toLowerCase();
    if (!term) return null;
    return categories.flatMap((c) =>
      c.faqs
        .map((f, i) => ({ ...f, key: `${c.id}-${i}`, category: c.label }))
        .filter((f) => f.q.toLowerCase().includes(term) || f.a.toLowerCase().includes(term)),
    );
  }, [query]);

  const current = categories.find((c) => c.id === activeCategory)!;
  const visible = searchResults ?? current.faqs.map((f, i) => ({ ...f, key: `${current.id}-${i}`, category: current.label }));

  const selectCategory = (id: string) => {
    setActiveCategory(id);
    setQuery('');
    setOpenKey(`${id}-0`);
  };

  // No backend mailer yet: compose the message in the visitor's own email app
  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = `[${form.topic}] ${form.order ? `Order ${form.order} – ` : ''}Message from ${form.name}`;
    const bodyText = `${form.message}\n\n— ${form.name}\n${form.email}${form.order ? `\nOrder ID: ${form.order}` : ''}`;
    window.location.href = `mailto:${SUPPORT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(bodyText)}`;
    setSent(true);
  };

  useGSAP(
    () => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
      const q = gsap.utils.selector(root);
      gsap.fromTo(q('[data-ct-channel]'), { y: 80, opacity: 0, rotate: (i: number) => (i - 1) * 4 }, { y: 0, opacity: 1, rotate: 0, duration: 1, stagger: 0.12, ease: 'back.out(1.4)', delay: 0.9 });
      const help = q('[data-ct-help]')[0];
      gsap.timeline({ scrollTrigger: { trigger: help, start: 'top 75%', once: true } })
        .fromTo(q('[data-ct-help-title]'), { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: 'expo.out' })
        .fromTo(q('[data-ct-topic]'), { x: -40, opacity: 0 }, { x: 0, opacity: 1, duration: 0.6, stagger: 0.07, ease: 'power3.out' }, '-=0.4')
        .fromTo(q('[data-ct-faqs]'), { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' }, '-=0.5');
      const msg = q('[data-ct-message]')[0];
      gsap.timeline({ scrollTrigger: { trigger: msg, start: 'top 75%', once: true } })
        .fromTo(q('[data-ct-info]'), { xPercent: -12, opacity: 0, clipPath: 'inset(0% 100% 0% 0% round 32px)' }, { xPercent: 0, opacity: 1, clipPath: 'inset(0% 0% 0% 0% round 32px)', duration: 1.2, ease: 'expo.out' })
        .fromTo(q('[data-ct-info-row]'), { y: 20, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.1, duration: 0.6 }, '-=0.6')
        .fromTo(q('[data-ct-field]'), { y: 30, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.08, duration: 0.7, ease: 'power3.out' }, 0.2);
    },
    { scope: root }
  );

  const field =
    'w-full rounded-2xl border border-[#241F1B]/15 bg-white px-4 py-3.5 text-[15px] outline-none transition placeholder:text-[#241F1B]/35 focus:border-[#F4623B] focus:ring-4 focus:ring-[#F4623B]/15 dark:border-white/15 dark:bg-white/5 dark:placeholder:text-white/35';

  return (
    <div ref={root} data-page-animate="off" className="min-h-screen bg-[#FAF7F2] font-sans text-[#241F1B] dark:bg-[#0F0C0A] dark:text-[#FAF7F2]">
      <ParallaxHero
        eyebrow="Help centre"
        title="We're all ears"
        highlight="(and paws)."
        subtitle="Search our answers, browse by topic, or reach the team directly — we usually reply within a day."
        products={['treat', 'peanut', 'hemp', 'meat']}
        size="compact"
      >
        <div className="relative w-full max-w-xl">
          <Search size={18} className="absolute left-5 top-1/2 -translate-y-1/2 text-[#241F1B]/40" aria-hidden />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search e.g. “refund”, “delivery time”"
            aria-label="Search FAQs"
            className="w-full rounded-full border border-[#241F1B]/15 bg-white py-4 pl-12 pr-4 text-[15px] text-[#241F1B] shadow-[0_20px_40px_-25px_rgba(36,31,27,0.5)] outline-none focus:border-[#F4623B] focus:ring-4 focus:ring-[#F4623B]/20"
          />
        </div>
      </ParallaxHero>

      {/* ── Contact channels ── */}
      <section className="relative z-10 mx-auto -mt-6 max-w-6xl px-5 sm:px-8">
        <div className="grid gap-4 md:grid-cols-3">
          {contactCards.map(({ icon: Icon, title, lines, href, cta, tone }) => (
            <a
              key={title}
              data-ct-channel
              href={href}
              target={href.startsWith('http') ? '_blank' : undefined}
              rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
              className="group relative overflow-hidden rounded-[28px] border border-[#241F1B]/10 bg-white p-6 shadow-[0_30px_60px_-40px_rgba(36,31,27,0.5)] transition-[box-shadow,border-color] duration-300 hover:border-transparent hover:shadow-[0_40px_70px_-35px_rgba(36,31,27,0.55)] dark:border-white/10 dark:bg-[#1E1813]"
            >
              <span aria-hidden className="absolute -right-10 -top-10 h-32 w-32 rounded-full opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-40" style={{ backgroundColor: tone }} />
              <div className="flex items-start justify-between">
                <span className="grid h-12 w-12 place-items-center rounded-2xl text-white transition-transform duration-500 group-hover:-rotate-12 group-hover:scale-110" style={{ backgroundColor: tone }}>
                  <Icon size={22} />
                </span>
                <span className="grid h-10 w-10 place-items-center rounded-full border border-[#241F1B]/10 transition-all duration-300 group-hover:rotate-45 group-hover:bg-[#241F1B] group-hover:text-white dark:border-white/15">
                  <ArrowUpRight size={18} />
                </span>
              </div>
              <h3 className="mt-6 font-fredoka text-2xl font-bold">{title}</h3>
              <p className="mt-1 break-all text-[15px] font-semibold">{lines[0]}</p>
              <p className="text-sm text-[#241F1B]/55 dark:text-white/50">{lines[1]}</p>
              <span className="mt-5 inline-block text-sm font-semibold" style={{ color: tone }}>{cta} →</span>
            </a>
          ))}
        </div>
      </section>

      {/* ── Help centre ── */}
      <section data-ct-help className="mx-auto max-w-6xl px-5 py-24 sm:px-8">
        <div data-ct-help-title className="mb-12 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.25em] text-[#F4623B]">FAQs</p>
            <h2 className="font-fredoka text-[clamp(2.2rem,4.5vw,3.6rem)] font-bold leading-[1] tracking-[-0.02em]">Answers, fetched.</h2>
          </div>
          {searchResults && (
            <button type="button" onClick={() => setQuery('')} className="text-sm font-semibold underline underline-offset-4 hover:text-[#F4623B]">
              Clear search
            </button>
          )}
        </div>

        <div className="grid gap-10 lg:grid-cols-[280px_1fr] lg:gap-14">
          {/* Topic rail */}
          <nav aria-label="FAQ topics" className="lg:sticky lg:top-28 lg:self-start">
            <ul className="no-scrollbar -mx-1 flex gap-2 overflow-x-auto px-1 pb-2 lg:flex-col lg:overflow-visible">
              {categories.map((c) => {
                const Icon = categoryIcons[c.id] ?? MessageCircle;
                const active = !searchResults && activeCategory === c.id;
                return (
                  <li key={c.id} data-ct-topic className="shrink-0">
                    <button
                      type="button"
                      onClick={() => selectCategory(c.id)}
                      aria-pressed={active}
                      className={`relative flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-left text-[15px] font-semibold transition-colors ${active ? 'text-white' : 'text-[#241F1B]/70 hover:bg-[#241F1B]/[0.04] dark:text-white/65 dark:hover:bg-white/5'}`}
                    >
                      {active && <motion.span layoutId="ct-topic" className="absolute inset-0 rounded-2xl bg-[#241F1B] dark:bg-[#F4623B]" transition={{ type: 'spring', stiffness: 380, damping: 32 }} />}
                      <span className={`relative grid h-9 w-9 shrink-0 place-items-center rounded-xl ${active ? 'bg-[#F4623B] text-white dark:bg-white dark:text-[#F4623B]' : 'bg-[#F4623B]/12 text-[#F4623B]'}`}>
                        <Icon size={17} aria-hidden />
                      </span>
                      <span className="relative whitespace-nowrap">{c.label}</span>
                      <span className={`relative ml-auto hidden text-xs lg:inline ${active ? 'text-white/60' : 'text-[#241F1B]/35 dark:text-white/30'}`}>{c.faqs.length}</span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Accordion */}
          <div data-ct-faqs>
            <AnimatePresence mode="wait">
              <motion.div
                key={searchResults ? `search-${query}` : activeCategory}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              >
                <h3 className="mb-4 font-fredoka text-2xl font-semibold">
                  {searchResults ? `Results for “${query.trim()}”` : current.label}
                </h3>
                {visible.length === 0 ? (
                  <p className="rounded-3xl border border-dashed border-[#241F1B]/20 py-12 text-center text-[#241F1B]/55 dark:border-white/15 dark:text-white/50">
                    No matching questions. Try another word, or message us below.
                  </p>
                ) : (
                  <ul className="space-y-3">
                    {visible.map((item, i) => {
                      const open = openKey === item.key;
                      return (
                        <motion.li
                          key={item.key}
                          initial={{ opacity: 0, y: 16 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: i * 0.05, duration: 0.4 }}
                          className={`overflow-hidden rounded-3xl border transition-colors duration-300 ${open ? 'border-[#F4623B]/40 bg-white shadow-[0_20px_40px_-30px_rgba(244,98,59,0.6)] dark:bg-[#1E1813]' : 'border-[#241F1B]/10 bg-white/60 hover:bg-white dark:border-white/10 dark:bg-white/[0.03]'}`}
                        >
                          <button type="button" onClick={() => setOpenKey(open ? null : item.key)} aria-expanded={open} className="flex w-full items-start gap-4 px-6 py-5 text-left">
                            <span className="mt-0.5 font-mono text-xs text-[#F4623B]">{String(i + 1).padStart(2, '0')}</span>
                            <span className="flex-1 font-semibold md:text-lg">
                              {item.q}
                              {searchResults && <span className="mt-1 block text-xs font-normal text-[#241F1B]/45 dark:text-white/40">{item.category}</span>}
                            </span>
                            <motion.span animate={{ rotate: open ? 45 : 0 }} className={`grid h-8 w-8 shrink-0 place-items-center rounded-full ${open ? 'bg-[#F4623B] text-white' : 'border border-[#241F1B]/15 dark:border-white/20'}`}>
                              <Plus size={16} />
                            </motion.span>
                          </button>
                          <AnimatePresence initial={false}>
                            {open && (
                              <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}>
                                <p className="px-6 pb-6 pl-[3.25rem] leading-relaxed text-[#241F1B]/70 dark:text-white/65">{item.a}</p>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </motion.li>
                      );
                    })}
                  </ul>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* ── Message us ── */}
      <section data-ct-message className="mx-auto max-w-6xl px-5 pb-24 sm:px-8">
        <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <aside data-ct-info className="relative isolate overflow-hidden rounded-[32px] bg-[#241F1B] p-8 text-white sm:p-10">
            <div aria-hidden className="absolute -left-20 -top-20 -z-10 h-72 w-72 rounded-full bg-[#F4623B]/35 blur-3xl" />
            <FloatingProducts
              className="-z-[1]"
              items={[
                { name: 'peanut', className: 'right-[6%] bottom-[6%] w-[28%] max-w-[150px]', rotate: 10, depth: 0.2 },
                { name: 'hemp', className: 'right-[34%] bottom-[2%] w-[12%] max-w-[64px]', rotate: -12, depth: 0.4 },
              ]}
            />
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#E3A438]">Still need help?</p>
            <h2 className="mt-3 font-fredoka text-[clamp(2rem,3.6vw,3rem)] font-bold leading-[1]">Drop us a line.</h2>
            <p className="mt-4 max-w-sm text-white/65">Tell us what&apos;s up and include your order ID if it&apos;s about a delivery — it helps us help you faster.</p>
            <ul className="mt-10 space-y-6 pb-28 sm:pb-20">
              <li data-ct-info-row className="flex gap-4">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-white/10 text-[#F4623B]"><MapPin size={20} /></span>
                <div>
                  <p className="font-semibold">Registered office</p>
                  <p className="text-sm text-white/60">Taksh Apartment, Bhubaneswar, Odisha - 752050</p>
                </div>
              </li>
              <li data-ct-info-row className="flex gap-4">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-white/10 text-[#F4623B]"><Clock size={20} /></span>
                <div>
                  <p className="font-semibold">Customer care hours</p>
                  <p className="text-sm text-white/60">Monday – Saturday: 9 AM – 6 PM IST</p>
                  <p className="text-sm text-white/60">Sunday: Closed</p>
                </div>
              </li>
              <li data-ct-info-row className="flex gap-4">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-white/10 text-[#F4623B]"><Mail size={20} /></span>
                <div>
                  <p className="font-semibold">Email</p>
                  <a href={`mailto:${SUPPORT_EMAIL}`} className="break-all text-sm text-white/60 hover:text-white">{SUPPORT_EMAIL}</a>
                </div>
              </li>
            </ul>
          </aside>

          <form onSubmit={submit} className="rounded-[32px] border border-[#241F1B]/10 bg-white p-8 sm:p-10 dark:border-white/10 dark:bg-[#1E1813]">
            <AnimatePresence mode="wait">
              {sent ? (
                <motion.div key="sent" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="flex h-full min-h-[420px] flex-col items-center justify-center text-center">
                  <motion.span initial={{ scale: 0, rotate: -90 }} animate={{ scale: 1, rotate: 0 }} transition={{ type: 'spring', stiffness: 260, damping: 14 }} className="grid h-20 w-20 place-items-center rounded-full bg-[#2bbf85] text-white">
                    <CheckCircle2 size={40} />
                  </motion.span>
                  <h3 className="mt-6 font-fredoka text-3xl font-bold">Almost there!</h3>
                  <p className="mt-3 max-w-sm text-[#241F1B]/65 dark:text-white/60">
                    Your email app should have opened with the message ready. Hit send there and we&apos;ll reply within 24 hours.
                  </p>
                  <button type="button" onClick={() => setSent(false)} className="mt-8 text-sm font-semibold underline underline-offset-4 hover:text-[#F4623B]">
                    Write another message
                  </button>
                </motion.div>
              ) : (
                <motion.div key="form" exit={{ opacity: 0, y: -10 }} className="grid gap-5 sm:grid-cols-2">
                  <label data-ct-field className="block">
                    <span className="mb-2 block text-sm font-semibold">Your name</span>
                    <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Ananya Sharma" className={field} />
                  </label>
                  <label data-ct-field className="block">
                    <span className="mb-2 block text-sm font-semibold">Email</span>
                    <input required type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="you@example.com" className={field} />
                  </label>
                  <label data-ct-field className="block">
                    <span className="mb-2 block text-sm font-semibold">Topic</span>
                    <select value={form.topic} onChange={(e) => setForm({ ...form, topic: e.target.value })} className={`${field} cursor-pointer`}>
                      {categories.map((c) => (
                        <option key={c.id}>{c.label}</option>
                      ))}
                      <option>Something else</option>
                    </select>
                  </label>
                  <label data-ct-field className="block">
                    <span className="mb-2 block text-sm font-semibold">Order ID <span className="font-normal text-[#241F1B]/45 dark:text-white/40">(optional)</span></span>
                    <input value={form.order} onChange={(e) => setForm({ ...form, order: e.target.value })} placeholder="BFAB-1234" className={field} />
                  </label>
                  <label data-ct-field className="block sm:col-span-2">
                    <span className="mb-2 block text-sm font-semibold">Message</span>
                    <textarea required rows={6} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} placeholder="How can we help?" className={`${field} resize-none`} />
                  </label>
                  <div data-ct-field className="flex flex-wrap items-center justify-between gap-4 sm:col-span-2">
                    <p className="text-xs text-[#241F1B]/50 dark:text-white/45">Opens your email app with everything filled in.</p>
                    <button type="submit" className="group inline-flex items-center gap-3 rounded-full bg-[#F4623B] py-3.5 pl-6 pr-3.5 font-semibold text-white shadow-[0_20px_40px_-20px_rgba(244,98,59,0.9)] transition-colors hover:bg-[#241F1B]">
                      Send message
                      <span className="grid h-8 w-8 place-items-center rounded-full bg-white/20 transition-transform duration-300 group-hover:translate-x-1 group-hover:-rotate-12">
                        <Send size={15} />
                      </span>
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </form>
        </div>
      </section>
    </div>
  );
};

export default ContactUsPage;
