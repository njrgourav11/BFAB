'use client';

import { type ReactNode } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowUpRight, type LucideIcon } from 'lucide-react';
import CountUp from '@/components/reactbits/CountUp';

/** Shared building blocks for the admin screens, in the Beggin For A Bite palette. */

export const adminEase = [0.22, 1, 0.36, 1] as const;

export function AdminHeader({
  eyebrow,
  title,
  description,
  actions,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  actions?: ReactNode;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: adminEase }}
      className="mb-8 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between"
    >
      <div>
        {eyebrow && <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.25em] text-[#F4623B]">{eyebrow}</p>}
        <h1 className="font-fredoka text-[clamp(2rem,3.4vw,2.8rem)] font-bold leading-[1] tracking-[-0.02em] text-[#241F1B] dark:text-white">{title}</h1>
        {description && <p className="mt-2 max-w-xl text-sm text-[#241F1B]/60 dark:text-white/55">{description}</p>}
      </div>
      {actions && <div className="flex flex-wrap items-center gap-2.5">{actions}</div>}
    </motion.div>
  );
}

export function AdminButton({
  href,
  onClick,
  children,
  variant = 'primary',
  icon: Icon,
  disabled,
  type = 'button',
}: {
  href?: string;
  onClick?: () => void;
  children: ReactNode;
  variant?: 'primary' | 'dark' | 'ghost';
  icon?: LucideIcon;
  disabled?: boolean;
  type?: 'button' | 'submit';
}) {
  const cls = {
    primary: 'bg-[#F4623B] text-white shadow-[0_14px_28px_-14px_rgba(244,98,59,0.9)] hover:bg-[#E14E27]',
    dark: 'bg-[#241F1B] text-white hover:bg-black dark:bg-white dark:text-[#241F1B]',
    ghost: 'border border-[#241F1B]/15 bg-white text-[#241F1B] hover:border-[#241F1B]/30 dark:border-white/15 dark:bg-white/5 dark:text-white',
  }[variant];
  const inner = (
    <>
      {Icon && <Icon size={16} />}
      {children}
    </>
  );
  const base = `inline-flex items-center gap-2 rounded-full px-4 py-2.5 text-sm font-semibold transition-all active:scale-[0.97] disabled:cursor-not-allowed disabled:opacity-60 ${cls}`;
  return href ? (
    <Link href={href} className={base}>{inner}</Link>
  ) : (
    <button type={type} onClick={onClick} disabled={disabled} className={base}>{inner}</button>
  );
}

export function Panel({ children, className = '', delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay, ease: adminEase }}
      className={`rounded-[24px] border border-[#241F1B]/[0.08] bg-white shadow-[0_20px_50px_-40px_rgba(36,31,27,0.5)] dark:border-white/10 dark:bg-[#1A1511] ${className}`}
    >
      {children}
    </motion.section>
  );
}

export function PanelHead({ title, subtitle, action }: { title: string; subtitle?: string; action?: ReactNode }) {
  return (
    <div className="flex items-center justify-between gap-4 border-b border-[#241F1B]/[0.07] px-6 py-5 dark:border-white/10">
      <div>
        <h2 className="font-fredoka text-lg font-semibold text-[#241F1B] dark:text-white">{title}</h2>
        {subtitle && <p className="text-xs text-[#241F1B]/50 dark:text-white/45">{subtitle}</p>}
      </div>
      {action}
    </div>
  );
}

const TONES: Record<string, { bg: string; fg: string }> = {
  orange: { bg: '#F4623B', fg: '#fff' },
  ink: { bg: '#241F1B', fg: '#fff' },
  marigold: { bg: '#E3A438', fg: '#241F1B' },
  mint: { bg: '#2bbf85', fg: '#fff' },
};

export function StatCard({
  label,
  value,
  prefix = '',
  icon: Icon,
  tone = 'orange',
  href,
  note,
  index = 0,
}: {
  label: string;
  value: number;
  prefix?: string;
  icon: LucideIcon;
  tone?: keyof typeof TONES;
  href: string;
  note?: string;
  index?: number;
}) {
  const t = TONES[tone];
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, rotate: index % 2 ? 1.5 : -1.5 }}
      animate={{ opacity: 1, y: 0, rotate: 0 }}
      transition={{ duration: 0.7, delay: 0.1 + index * 0.08, ease: adminEase }}
      className="h-full"
    >
      <Link
        href={href}
        className="group relative block h-full overflow-hidden rounded-[24px] border border-[#241F1B]/[0.08] bg-white p-6 transition-shadow duration-300 hover:shadow-[0_30px_60px_-35px_rgba(36,31,27,0.55)] dark:border-white/10 dark:bg-[#1A1511]"
      >
        <span aria-hidden className="absolute -right-10 -top-10 h-32 w-32 rounded-full opacity-[0.12] transition-transform duration-700 group-hover:scale-150" style={{ backgroundColor: t.bg }} />
        <div className="flex items-start justify-between">
          <span className="grid h-11 w-11 place-items-center rounded-2xl transition-transform duration-500 group-hover:-rotate-12" style={{ backgroundColor: t.bg, color: t.fg }}>
            <Icon size={20} />
          </span>
          <ArrowUpRight size={18} className="text-[#241F1B]/30 transition-all duration-300 group-hover:rotate-45 group-hover:text-[#F4623B] dark:text-white/30" />
        </div>
        <p className="mt-5 text-xs font-semibold uppercase tracking-[0.14em] text-[#241F1B]/50 dark:text-white/45">{label}</p>
        <p className="mt-1 font-fredoka text-3xl font-bold tracking-tight text-[#241F1B] dark:text-white">
          {prefix}
          <CountUp to={value} separator="," duration={1.6} />
        </p>
        {note && <p className="mt-2 text-xs font-semibold text-[#2bbf85]">{note}</p>}
      </Link>
    </motion.div>
  );
}

export function StatusPill({ status }: { status?: string }) {
  const s = (status || 'Pending').toLowerCase();
  const tone =
    s === 'paid' || s === 'delivered' || s === 'published'
      ? 'bg-[#2bbf85]/12 text-[#1d8a5f] dark:text-[#5fe0ad]'
      : s === 'cancelled' || s === 'failed'
        ? 'bg-red-500/10 text-red-600 dark:text-red-400'
        : s === 'shipped'
          ? 'bg-[#F4623B]/12 text-[#D9502C] dark:text-[#ff8a66]'
          : 'bg-[#E3A438]/15 text-[#9a6a12] dark:text-[#f0c46b]';
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-bold ${tone}`}>
      <span className="h-1.5 w-1.5 rounded-full bg-current" />
      {status || 'Pending'}
    </span>
  );
}

/** Table row that slides in with a small stagger */
export function Row({ children, i, className = '' }: { children: ReactNode; i: number; className?: string }) {
  return (
    <motion.tr
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: Math.min(i, 12) * 0.035, ease: adminEase }}
      className={`border-b border-[#241F1B]/[0.06] transition-colors last:border-0 hover:bg-[#F4623B]/[0.04] dark:border-white/[0.06] dark:hover:bg-white/[0.03] ${className}`}
    >
      {children}
    </motion.tr>
  );
}

export const th = 'px-6 py-3.5 text-[11px] font-bold uppercase tracking-[0.14em] text-[#241F1B]/45 dark:text-white/40';

export function Empty({ title, hint, action }: { title: string; hint?: string; action?: ReactNode }) {
  return (
    <div className="flex flex-col items-center justify-center px-6 py-16 text-center">
      <span className="mb-4 grid h-14 w-14 place-items-center rounded-full bg-[#F4623B]/10 text-2xl">🐾</span>
      <p className="font-fredoka text-xl font-semibold text-[#241F1B] dark:text-white">{title}</p>
      {hint && <p className="mt-1 max-w-sm text-sm text-[#241F1B]/55 dark:text-white/50">{hint}</p>}
      {action && <div className="mt-5">{action}</div>}
    </div>
  );
}

export function SkeletonBlock({ className = '' }: { className?: string }) {
  return <div className={`animate-pulse rounded-[24px] bg-[#241F1B]/[0.06] dark:bg-white/[0.06] ${className}`} />;
}
