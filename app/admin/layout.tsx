'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { onAuthStateChanged, type User } from 'firebase/auth';
import { AnimatePresence, motion } from 'framer-motion';
import { BookOpen, ChevronRight, ExternalLink, LayoutDashboard, LogOut, Menu, Package, Plus, ShoppingCart, Ticket, X } from 'lucide-react';
import { auth } from '@/lib/firebase';
import { getUserRole } from '@/lib/auth-utils';
import { adminEase } from '@/components/admin/ui';

const NAV = [
  { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  { name: 'Orders', href: '/admin/orders', icon: ShoppingCart },
  { name: 'Products', href: '/admin/products', icon: Package },
  { name: 'Coupons & teams', href: '/admin/coupons', icon: Ticket },
  { name: 'Blog', href: '/admin/blogs', icon: BookOpen },
];

const isActive = (pathname: string, href: string) => (href === '/admin' ? pathname === '/admin' : pathname.startsWith(href));

function crumbs(pathname: string) {
  const parts = pathname.split('/').filter(Boolean).slice(1);
  const out: { label: string; href: string }[] = [{ label: 'Admin', href: '/admin' }];
  let acc = '/admin';
  parts.forEach((p) => {
    acc += `/${p}`;
    const nav = NAV.find((n) => n.href === acc);
    out.push({ label: nav?.name ?? (p === 'new' ? 'New' : p.length > 14 ? 'Edit' : p), href: acc });
  });
  return out;
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [authorized, setAuthorized] = useState(false);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname() || '/admin';

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (u) => {
      if (u) {
        const role = await getUserRole(u.uid);
        if (role === 'admin') {
          setAuthorized(true);
          setUser(u);
        } else router.push('/');
      } else router.push('/login');
      setLoading(false);
    });
    return () => unsubscribe();
  }, [router]);

  // Close the mobile drawer on navigation (adjusting state during render)
  const [navPath, setNavPath] = useState(pathname);
  if (navPath !== pathname) {
    setNavPath(pathname);
    setOpen(false);
  }

  if (loading) {
    return (
      <div className="grid min-h-screen place-items-center bg-[#FAF7F2] dark:bg-[#0F0C0A]">
        <div className="flex flex-col items-center gap-4">
          <motion.span
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 1.1, ease: 'linear' }}
            className="h-12 w-12 rounded-full border-4 border-[#F4623B]/20 border-t-[#F4623B]"
          />
          <p className="font-fredoka text-sm font-semibold text-[#241F1B]/60 dark:text-white/60">Opening the admin kennel…</p>
        </div>
      </div>
    );
  }

  if (!authorized) return null;

  const trail = crumbs(pathname);
  const initial = (user?.displayName?.[0] || user?.email?.[0] || 'A').toUpperCase();

  const sidebar = (
    <div className="flex h-full flex-col">
      <div className="flex items-center justify-between px-5 pb-6 pt-6">
        <Link href="/admin" className="flex items-center gap-3">
          <span className="relative h-10 aspect-[1400/993] rounded-xl bg-[#FAF7F2] p-1">
            <Image src="/1.svg" alt="Beggin For A Bite" fill className="object-contain p-1" />
          </span>
          <span className="font-fredoka text-lg font-semibold leading-none text-white">
            Admin
            <span className="block text-[11px] font-normal tracking-wide text-white/45">Beggin For A Bite</span>
          </span>
        </Link>
        <button type="button" aria-label="Close menu" onClick={() => setOpen(false)} className="grid h-9 w-9 place-items-center rounded-full text-white/70 hover:bg-white/10 lg:hidden">
          <X size={18} />
        </button>
      </div>

      <p className="px-6 pb-2 text-[10px] font-bold uppercase tracking-[0.25em] text-white/35">Manage</p>
      <nav className="flex-1 space-y-1 px-3" aria-label="Admin">
        {NAV.map((item, i) => {
          const active = isActive(pathname, item.href);
          return (
            <motion.div key={item.href} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 + i * 0.05, duration: 0.5, ease: adminEase }}>
              <Link
                href={item.href}
                className={`group relative flex items-center gap-3 rounded-2xl px-3.5 py-3 text-sm font-semibold transition-colors ${active ? 'text-white' : 'text-white/60 hover:text-white'}`}
              >
                {active && <motion.span layoutId="admin-nav" className="absolute inset-0 rounded-2xl bg-[#F4623B]" transition={{ type: 'spring', stiffness: 380, damping: 32 }} />}
                <span className={`relative grid h-8 w-8 place-items-center rounded-xl transition-colors ${active ? 'bg-white/20' : 'bg-white/[0.06] group-hover:bg-white/10'}`}>
                  <item.icon size={17} />
                </span>
                <span className="relative">{item.name}</span>
                <ChevronRight size={15} className={`relative ml-auto transition-all ${active ? 'opacity-80' : '-translate-x-1 opacity-0 group-hover:translate-x-0 group-hover:opacity-60'}`} />
              </Link>
            </motion.div>
          );
        })}
      </nav>

      <div className="m-3 rounded-2xl bg-white/[0.06] p-4">
        <div className="flex items-center gap-3">
          <span className="grid h-10 w-10 shrink-0 place-items-center overflow-hidden rounded-full bg-[#F4623B] font-fredoka font-bold text-white">
            {user?.photoURL ? <Image src={user.photoURL} alt="" width={40} height={40} className="h-full w-full object-cover" /> : initial}
          </span>
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-white">{user?.displayName || 'Admin'}</p>
            <p className="truncate text-[11px] text-white/45">{user?.email}</p>
          </div>
        </div>
        <div className="mt-4 grid grid-cols-2 gap-2">
          <Link href="/" className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-white/[0.08] py-2 text-xs font-semibold text-white/80 hover:bg-white/15">
            <ExternalLink size={13} /> Store
          </Link>
          <button type="button" onClick={() => auth.signOut()} className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-white/[0.08] py-2 text-xs font-semibold text-red-300 hover:bg-red-500/20">
            <LogOut size={13} /> Sign out
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div data-admin className="flex min-h-screen bg-[#F6F2EB] text-[#241F1B] dark:bg-[#0F0C0A] dark:text-white">
      {/* Desktop sidebar */}
      <aside className="sticky top-0 hidden h-screen w-72 shrink-0 overflow-y-auto bg-[#14100D] lg:block">{sidebar}</aside>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setOpen(false)} className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden" />
            <motion.aside
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ duration: 0.45, ease: adminEase }}
              className="fixed inset-y-0 left-0 z-50 w-72 overflow-y-auto bg-[#14100D] lg:hidden"
              data-lenis-prevent
            >
              {sidebar}
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      <div className="flex min-w-0 flex-1 flex-col">
        {/* Topbar */}
        <header className="sticky top-0 z-30 border-b border-[#241F1B]/[0.07] bg-[#F6F2EB]/85 backdrop-blur-xl dark:border-white/10 dark:bg-[#0F0C0A]/85">
          <div className="mx-auto flex h-16 max-w-7xl items-center gap-3 px-4 sm:px-6 lg:px-8">
            <button type="button" aria-label="Open menu" onClick={() => setOpen(true)} className="grid h-10 w-10 place-items-center rounded-full hover:bg-black/5 dark:hover:bg-white/10 lg:hidden">
              <Menu size={20} />
            </button>
            <nav aria-label="Breadcrumb" className="flex min-w-0 items-center gap-1.5 text-sm">
              {trail.map((c, i) => (
                <span key={c.href} className="flex min-w-0 items-center gap-1.5">
                  {i > 0 && <ChevronRight size={14} className="shrink-0 text-[#241F1B]/30 dark:text-white/30" />}
                  {i === trail.length - 1 ? (
                    <span className="truncate font-semibold">{c.label}</span>
                  ) : (
                    <Link href={c.href} className="truncate text-[#241F1B]/50 hover:text-[#F4623B] dark:text-white/45">{c.label}</Link>
                  )}
                </span>
              ))}
            </nav>
            <div className="ml-auto flex items-center gap-2">
              <Link href="/admin/products/new" className="hidden items-center gap-1.5 rounded-full border border-[#241F1B]/15 bg-white px-3.5 py-2 text-xs font-semibold transition-colors hover:border-[#F4623B] hover:text-[#F4623B] sm:inline-flex dark:border-white/15 dark:bg-white/5">
                <Plus size={14} /> Product
              </Link>
              <Link href="/admin/blogs/new" className="hidden items-center gap-1.5 rounded-full border border-[#241F1B]/15 bg-white px-3.5 py-2 text-xs font-semibold transition-colors hover:border-[#F4623B] hover:text-[#F4623B] sm:inline-flex dark:border-white/15 dark:bg-white/5">
                <Plus size={14} /> Post
              </Link>
              <Link href="/" className="inline-flex items-center gap-1.5 rounded-full bg-[#241F1B] px-3.5 py-2 text-xs font-semibold text-white hover:bg-black dark:bg-white dark:text-[#241F1B]">
                <ExternalLink size={14} /> View store
              </Link>
            </div>
          </div>
        </header>

        <div className="mx-auto w-full max-w-7xl flex-1 px-4 py-8 sm:px-6 lg:px-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={pathname}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.35, ease: adminEase }}
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
