"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { ArrowRight, LayoutDashboard, LogOut, Menu, Moon, Search, ShoppingBag, Sun, User, X } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { getUserRole } from '@/lib/auth-utils';
import FloatingProducts from '@/components/motion/FloatingProducts';
import { useCart } from './CartContext';

interface NavbarProps {
  isDark: boolean;
  toggleTheme: () => void;
}

const MENU = [
  { label: 'Home', href: '/' },
  { label: 'Shop', href: '/products' },
  { label: 'Fresh Meals', href: '/fresh' },
  { label: 'Saver Packs', href: '/ultimate-saver-packs' },
  { label: 'Paw Blog', href: '/blogs' },
  { label: 'About', href: '/about-us' },
  { label: 'Contact', href: '/contact-us' },
];

const QUICK = [
  { label: 'Dental Health', href: '/products?category=Dental%20Health' },
  { label: 'Hip & Joint', href: '/products?category=Hip%20%26%20Joint' },
  { label: 'Gut Health', href: '/products?category=Gut%20Health' },
  { label: 'Treats', href: '/products?type=treats' },
  { label: 'Feeding Guide', href: '/feeding-guide' },
];

const isActive = (pathname: string, href: string) =>
  href === '/' ? pathname === '/' : pathname === href || pathname.startsWith(href + '/');

const Navbar: React.FC<NavbarProps> = ({ isDark, toggleTheme }) => {
  const pathname = usePathname() || '/';
  const router = useRouter();
  const { cartItems } = useCart();
  const [user, setUser] = useState<any>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [hovered, setHovered] = useState<string | null>(null);
  const [query, setQuery] = useState('');
  const lastY = useRef(0);
  const searchInput = useRef<HTMLInputElement>(null);

  const cartCount = cartItems.reduce((t, i) => t + i.quantity, 0);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (u) => {
      if (u) setUser({ ...u, role: await getUserRole(u.uid) });
      else setUser(null);
    });
    return () => unsub();
  }, []);

  // Glass on scroll; tuck away while scrolling down, return on the way up
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 12);
      if (Math.abs(y - lastY.current) > 6) {
        setHidden(y > lastY.current && y > 320);
        lastY.current = y;
      }
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Let sticky sub-bars (shop filters, blog categories) follow the navbar as it hides/returns
  useEffect(() => {
    document.documentElement.style.setProperty('--nav-offset', hidden && !menuOpen ? '0px' : '4rem');
  }, [hidden, menuOpen]);

  // Close overlays on navigation (adjusting state during render, per React docs)
  const [navPath, setNavPath] = useState(pathname);
  if (navPath !== pathname) {
    setNavPath(pathname);
    setMenuOpen(false);
    setSearchOpen(false);
    setProfileOpen(false);
  }

  // Lock page scroll behind overlays (SmoothScroll pauses Lenis on overflow:hidden)
  useEffect(() => {
    document.body.style.overflow = menuOpen || searchOpen ? 'hidden' : '';
    if (searchOpen) window.setTimeout(() => searchInput.current?.focus(), 80);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMenuOpen(false);
        setSearchOpen(false);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [menuOpen, searchOpen]);

  const submitSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const q = query.trim();
    router.push(q ? `/products?q=${encodeURIComponent(q)}` : '/products');
    setSearchOpen(false);
  };

  const iconBtn =
    'grid h-10 w-10 place-items-center rounded-full text-[#241F1B] transition-colors hover:bg-[#241F1B]/[0.06] dark:text-white dark:hover:bg-white/10';

  return (
    <>
      <header
        className={`sticky top-0 z-50 h-16 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          hidden && !menuOpen ? '-translate-y-full' : 'translate-y-0'
        }`}
      >
        <div
          className={`h-full border-b transition-all duration-500 ${
            scrolled
              ? 'border-[#241F1B]/10 bg-[#FAF7F2]/85 shadow-[0_10px_30px_-20px_rgba(36,31,27,0.35)] backdrop-blur-xl dark:border-white/10 dark:bg-[#0F0C0A]/85'
              : 'border-transparent bg-[#FAF7F2] dark:bg-[#0F0C0A]'
          }`}
        >
          <nav className="mx-auto flex h-full max-w-7xl items-center justify-between gap-3 px-4 sm:px-6 lg:px-8" aria-label="Main">
            <Link href="/" aria-label="Beggin For A Bite home" className="group relative h-11 shrink-0 aspect-[1400/993] rounded-xl sm:h-12 dark:bg-[#FAF7F2]">
              <Image src="/1.svg" alt="Beggin For A Bite" fill priority className="object-contain transition-transform duration-500 group-hover:scale-105 group-hover:-rotate-2" />
            </Link>

            {/* Desktop links with a pill that follows the pointer */}
            <ul className="hidden items-center gap-0.5 rounded-full border border-[#241F1B]/10 bg-white/60 p-1 dark:border-white/10 dark:bg-white/5 xl:flex" onMouseLeave={() => setHovered(null)}>
              {MENU.map((item) => {
                const active = isActive(pathname, item.href);
                const lit = hovered ? hovered === item.href : active;
                return (
                  <li key={item.href} className="relative">
                    {lit && (
                      <motion.span
                        layoutId="nav-pill"
                        className={`absolute inset-0 rounded-full ${active && !hovered ? 'bg-[#241F1B] dark:bg-white' : 'bg-[#F4623B]/12'}`}
                        transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                      />
                    )}
                    <Link
                      href={item.href}
                      onMouseEnter={() => setHovered(item.href)}
                      className={`relative z-10 block rounded-full px-4 py-2 text-[14px] font-semibold transition-colors ${
                        active && !hovered
                          ? 'text-white dark:text-[#241F1B]'
                          : lit
                            ? 'text-[#F4623B]'
                            : 'text-[#241F1B]/75 hover:text-[#241F1B] dark:text-white/70 dark:hover:text-white'
                      }`}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>

            <div className="flex items-center gap-1 sm:gap-1.5">
              <button type="button" aria-label="Search products" onClick={() => setSearchOpen(true)} className={iconBtn}>
                <Search size={19} />
              </button>
              <button type="button" aria-label="Toggle dark mode" onClick={toggleTheme} className={`${iconBtn} hidden sm:grid`}>
                <AnimatePresence mode="wait" initial={false}>
                  <motion.span key={isDark ? 'sun' : 'moon'} initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.25 }}>
                    {isDark ? <Sun size={19} className="text-[#E3A438]" /> : <Moon size={19} />}
                  </motion.span>
                </AnimatePresence>
              </button>

              {/* Account */}
              <div className="relative hidden lg:block">
                {user ? (
                  <>
                    <button type="button" onClick={() => setProfileOpen(!profileOpen)} aria-label="Account menu" className="grid h-10 w-10 place-items-center overflow-hidden rounded-full bg-[#F4623B]/12 font-bold text-[#F4623B] ring-2 ring-transparent transition hover:ring-[#F4623B]/40">
                      {user.photoURL ? (
                        <Image src={user.photoURL} alt="" width={40} height={40} className="h-full w-full object-cover" />
                      ) : (
                        (user.displayName?.[0] || user.email?.[0] || 'U').toUpperCase()
                      )}
                    </button>
                    <AnimatePresence>
                      {profileOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 8, scale: 0.97 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 8, scale: 0.97 }}
                          transition={{ duration: 0.18 }}
                          className="absolute right-0 mt-3 w-60 origin-top-right overflow-hidden rounded-2xl border border-[#241F1B]/10 bg-white py-1.5 shadow-[0_30px_60px_-20px_rgba(36,31,27,0.35)] dark:border-white/10 dark:bg-[#1E1813]"
                        >
                          <div className="border-b border-[#241F1B]/10 px-4 py-3 dark:border-white/10">
                            <p className="truncate text-sm font-bold">{user.displayName || 'Pet parent'}</p>
                            <p className="truncate text-xs text-[#241F1B]/55 dark:text-white/50">{user.email}</p>
                          </div>
                          <Link href="/profile" className="flex items-center gap-2.5 px-4 py-2.5 text-sm hover:bg-[#F4623B]/10"><User size={16} /> Profile</Link>
                          {user.role === 'admin' && (
                            <Link href="/admin" className="flex items-center gap-2.5 px-4 py-2.5 text-sm hover:bg-[#F4623B]/10"><LayoutDashboard size={16} /> Admin dashboard</Link>
                          )}
                          <button type="button" onClick={() => auth.signOut()} className="flex w-full items-center gap-2.5 px-4 py-2.5 text-left text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-500/10">
                            <LogOut size={16} /> Log out
                          </button>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </>
                ) : (
                  <Link href="/login" className="rounded-full px-4 py-2 text-[14px] font-semibold text-[#241F1B] transition-colors hover:text-[#F4623B] dark:text-white">
                    Log in
                  </Link>
                )}
              </div>

              {/* Cart */}
              <Link
                href="/cart"
                aria-label={`Cart, ${cartCount} items`}
                className="group relative inline-flex h-10 items-center gap-2 rounded-full bg-[#F4623B] pl-3 pr-3 text-[14px] font-semibold text-white shadow-[0_12px_24px_-12px_rgba(244,98,59,0.9)] transition-colors hover:bg-[#241F1B] sm:pl-4 sm:pr-2 dark:hover:bg-white dark:hover:text-[#241F1B]"
              >
                <ShoppingBag size={18} className="transition-transform duration-300 group-hover:-rotate-12" />
                <span className="hidden sm:inline">Cart</span>
                <motion.span
                  key={cartCount}
                  initial={{ scale: 0.4 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 500, damping: 14 }}
                  className="grid h-6 min-w-6 place-items-center rounded-full bg-white px-1.5 text-[12px] font-bold text-[#F4623B]"
                >
                  {cartCount}
                </motion.span>
              </Link>

              <button type="button" aria-label="Open menu" aria-expanded={menuOpen} onClick={() => setMenuOpen(true)} className={`${iconBtn} xl:hidden`}>
                <Menu size={22} />
              </button>
            </div>
          </nav>
        </div>
      </header>

      {/* ── Full-screen menu ── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
            initial={{ clipPath: 'circle(0% at calc(100% - 40px) 32px)' }}
            animate={{ clipPath: 'circle(150% at calc(100% - 40px) 32px)' }}
            exit={{ clipPath: 'circle(0% at calc(100% - 40px) 32px)' }}
            transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-[80] overflow-y-auto bg-[#F4623B] text-white"
          >
            <FloatingProducts
              items={[
                { name: 'peanut', className: 'right-[8%] top-[18%] w-28 sm:w-40', rotate: 10 },
                { name: 'jerky', className: 'right-[30%] bottom-[10%] w-24 sm:w-36', rotate: -8 },
                { name: 'hemp', className: 'right-[4%] bottom-[22%] w-16 sm:w-24', rotate: 14 },
              ]}
              className="opacity-40 md:opacity-100"
            />
            <div className="relative mx-auto flex min-h-full max-w-7xl flex-col px-5 pb-10 sm:px-8">
              <div className="flex h-16 items-center justify-between">
                <span className="font-fredoka text-lg font-semibold">Beggin For A Bite</span>
                <button type="button" aria-label="Close menu" onClick={() => setMenuOpen(false)} className="grid h-11 w-11 place-items-center rounded-full bg-white/15 transition hover:rotate-90 hover:bg-white/25">
                  <X size={22} />
                </button>
              </div>
              <ul className="mt-8 flex flex-col gap-1">
                {MENU.map((item, i) => (
                  <motion.li
                    key={item.href}
                    initial={{ y: 60, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.25 + i * 0.05, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <Link href={item.href} className="group flex items-baseline gap-4 py-1.5 font-fredoka text-[clamp(2.2rem,8vw,4.2rem)] font-bold leading-[1.05]">
                      <span className="font-mono text-xs text-white/60">0{i + 1}</span>
                      <span className={`transition-transform duration-300 group-hover:translate-x-3 ${isActive(pathname, item.href) ? 'text-[#241F1B]' : ''}`}>{item.label}</span>
                    </Link>
                  </motion.li>
                ))}
              </ul>
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }} className="mt-auto flex flex-wrap items-center gap-3 pt-10">
                {user ? (
                  <>
                    <Link href="/profile" className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-[#F4623B]">My profile</Link>
                    {user.role === 'admin' && <Link href="/admin" className="rounded-full border border-white/50 px-6 py-3 text-sm font-semibold">Admin</Link>}
                    <button type="button" onClick={() => auth.signOut()} className="rounded-full border border-white/50 px-6 py-3 text-sm font-semibold">Log out</button>
                  </>
                ) : (
                  <>
                    <Link href="/login" className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-[#F4623B]">Log in</Link>
                    <Link href="/signup" className="rounded-full border border-white/50 px-6 py-3 text-sm font-semibold">Create account</Link>
                  </>
                )}
                <button type="button" onClick={toggleTheme} className="inline-flex items-center gap-2 rounded-full border border-white/50 px-5 py-3 text-sm font-semibold sm:ml-auto">
                  {isDark ? <Sun size={16} /> : <Moon size={16} />} {isDark ? 'Light' : 'Dark'} mode
                </button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Search overlay ── */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Search"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[80] bg-[#241F1B]/50 backdrop-blur-md"
            onClick={() => setSearchOpen(false)}
          >
            <motion.div
              initial={{ y: -40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -40, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="mx-auto mt-20 w-[calc(100%-2rem)] max-w-2xl rounded-[28px] bg-[#FAF7F2] p-6 shadow-2xl sm:p-8 dark:bg-[#1E1813]"
            >
              <form onSubmit={submitSearch} className="flex items-center gap-3 border-b-2 border-[#241F1B]/15 pb-3 focus-within:border-[#F4623B] dark:border-white/15">
                <Search size={24} className="text-[#F4623B]" />
                <input
                  ref={searchInput}
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search treats, meals, supplements…"
                  aria-label="Search products"
                  className="w-full bg-transparent font-fredoka text-2xl font-semibold outline-none placeholder:text-[#241F1B]/30 dark:placeholder:text-white/30"
                />
                <button type="submit" aria-label="Search" className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-[#F4623B] text-white">
                  <ArrowRight size={18} />
                </button>
              </form>
              <p className="mb-3 mt-6 text-xs font-bold uppercase tracking-[0.2em] text-[#241F1B]/50 dark:text-white/40">Popular</p>
              <div className="flex flex-wrap gap-2">
                {QUICK.map((q) => (
                  <Link key={q.href} href={q.href} className="rounded-full border border-[#241F1B]/15 px-4 py-2 text-sm font-medium transition-colors hover:border-[#F4623B] hover:bg-[#F4623B] hover:text-white dark:border-white/15">
                    {q.label}
                  </Link>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
