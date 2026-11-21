"use client";
import React, { useMemo, useState } from 'react';
import Link from 'next/link';
import { Mail, Phone, MapPin, Clock, MessageCircle, Plus, Minus, Search, ChevronRight } from 'lucide-react';

type Faq = { q: string; a: string };
type Category = { id: string; label: string; faqs: Faq[] };

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
  },
  {
    icon: MessageCircle,
    title: 'WhatsApp us',
    lines: [SUPPORT_PHONE, 'Quick replies during business hours'],
    href: `https://wa.me/${SUPPORT_PHONE_RAW}`,
    cta: 'Chat on WhatsApp',
  },
  {
    icon: Mail,
    title: 'Write to us',
    lines: [SUPPORT_EMAIL, 'We reply within 24 hours'],
    href: `mailto:${SUPPORT_EMAIL}`,
    cta: 'Send an email',
  },
];

const ContactUsPage = () => {
  const [activeCategory, setActiveCategory] = useState(categories[0].id);
  const [openKey, setOpenKey] = useState<string | null>(`${categories[0].id}-0`);
  const [query, setQuery] = useState('');

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

  return (
    <div className="min-h-screen bg-white font-sans text-gray-900">
      {/* Breadcrumb */}
      <div className="border-b border-gray-100">
        <nav className="container mx-auto px-4 py-3 text-sm text-gray-500 flex items-center gap-1">
          <Link href="/" className="hover:text-gray-900">Home</Link>
          <ChevronRight size={14} />
          <span className="text-gray-900">FAQs &amp; Contact</span>
        </nav>
      </div>

      {/* Header */}
      <section className="bg-paper">
        <div className="container mx-auto px-4 py-10 md:py-14 text-center">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight">Frequently Asked Questions</h1>
          <p className="mt-3 text-gray-600 max-w-xl mx-auto">
            Have a question? We&apos;re here to help. Browse the topics below or search for an answer.
          </p>
          <div className="mt-6 max-w-xl mx-auto relative">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search your question"
              aria-label="Search FAQs"
              className="w-full rounded-full border border-gray-200 bg-white py-3 pl-11 pr-4 text-sm outline-none focus:border-gray-900"
            />
          </div>
        </div>
      </section>

      {/* FAQ body */}
      <section className="container mx-auto px-4 py-10 md:py-14">
        {/* Mobile category pills */}
        <div className="md:hidden -mx-4 px-4 mb-6 flex gap-2 overflow-x-auto pb-2">
          {categories.map((c) => (
            <button
              key={c.id}
              onClick={() => selectCategory(c.id)}
              className={`shrink-0 rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
                !searchResults && activeCategory === c.id
                  ? 'border-gray-900 bg-gray-900 text-white'
                  : 'border-gray-200 bg-white text-gray-700'
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-[240px_1fr] gap-8 lg:gap-12">
          {/* Desktop sidebar */}
          <aside className="hidden md:block">
            <div className="sticky top-24 rounded-xl border border-gray-200 overflow-hidden">
              <p className="px-5 py-4 text-xs font-semibold uppercase tracking-wider text-gray-500 bg-gray-50 border-b border-gray-200">
                Topics
              </p>
              <ul>
                {categories.map((c) => {
                  const active = !searchResults && activeCategory === c.id;
                  return (
                    <li key={c.id}>
                      <button
                        onClick={() => selectCategory(c.id)}
                        className={`w-full flex items-center justify-between px-5 py-3.5 text-left text-sm border-l-4 transition-colors ${
                          active
                            ? 'border-marigold bg-paper font-semibold text-gray-900'
                            : 'border-transparent text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                        }`}
                      >
                        {c.label}
                        <ChevronRight size={16} className={active ? 'text-gray-900' : 'text-gray-300'} />
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          </aside>

          {/* Accordion */}
          <div>
            <h2 className="text-xl md:text-2xl font-bold mb-4">
              {searchResults ? `Results for “${query.trim()}”` : current.label}
            </h2>

            {visible.length === 0 ? (
              <p className="py-10 text-center text-gray-500">
                No matching questions found. Try a different search or reach out to us below.
              </p>
            ) : (
              <div className="divide-y divide-gray-200 border-y border-gray-200">
                {visible.map((item) => {
                  const open = openKey === item.key;
                  return (
                    <div key={item.key}>
                      <button
                        onClick={() => setOpenKey(open ? null : item.key)}
                        aria-expanded={open}
                        className="w-full flex items-start justify-between gap-6 py-5 text-left"
                      >
                        <span className="font-medium md:text-lg">
                          {item.q}
                          {searchResults && (
                            <span className="block mt-1 text-xs font-normal text-gray-400">{item.category}</span>
                          )}
                        </span>
                        <span className="mt-0.5 shrink-0 flex h-7 w-7 items-center justify-center rounded-full border border-gray-300">
                          {open ? <Minus size={16} /> : <Plus size={16} />}
                        </span>
                      </button>
                      <div
                        className={`grid transition-all duration-300 ease-out ${
                          open ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                        }`}
                      >
                        <div className="overflow-hidden">
                          <p className="pb-5 pr-12 text-gray-600 leading-relaxed">{item.a}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Still need help */}
      <section className="bg-paper">
        <div className="container mx-auto px-4 py-12 md:py-16">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold">Still need help?</h2>
            <p className="mt-2 text-gray-600">Couldn&apos;t find what you were looking for? Our team is happy to help.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-5xl mx-auto">
            {contactCards.map(({ icon: Icon, title, lines, href, cta }) => (
              <a
                key={title}
                href={href}
                target={href.startsWith('http') ? '_blank' : undefined}
                rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                className="group rounded-2xl bg-white border border-gray-200 p-6 text-center hover:shadow-md transition-shadow"
              >
                <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-marigold/15 text-gray-900">
                  <Icon size={22} />
                </span>
                <h3 className="mt-4 font-semibold text-lg">{title}</h3>
                <p className="mt-1 text-sm text-gray-900 font-medium break-all">{lines[0]}</p>
                <p className="text-sm text-gray-500">{lines[1]}</p>
                <span className="mt-4 inline-block text-sm font-semibold underline underline-offset-4 group-hover:text-marigold">
                  {cta}
                </span>
              </a>
            ))}
          </div>

          <div className="mt-8 max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="flex items-start gap-4 rounded-2xl bg-white border border-gray-200 p-6">
              <MapPin size={22} className="shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold">Registered Office</h3>
                <p className="text-sm text-gray-600 mt-1">Taksh Apartment, Bhubaneswar, Odisha - 752050</p>
              </div>
            </div>
            <div className="flex items-start gap-4 rounded-2xl bg-white border border-gray-200 p-6">
              <Clock size={22} className="shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold">Customer Care Hours</h3>
                <p className="text-sm text-gray-600 mt-1">Monday – Saturday: 9 AM – 6 PM IST</p>
                <p className="text-sm text-gray-600">Sunday: Closed</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactUsPage;
