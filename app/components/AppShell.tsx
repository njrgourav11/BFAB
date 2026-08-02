'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import { CartProvider } from './CartContext';

const Navbar = dynamic(() => import('./Navbar'));
const Footer = dynamic(() => import('./Footer'));

function InitialLoader() {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#fef6eb] dark:bg-slate-950">
      <div className="relative flex flex-col items-center gap-5">
        <div className="relative h-16 w-16">
          <span className="absolute inset-0 animate-ping rounded-full bg-emerald-400/40" />
          <span className="absolute inset-1 animate-spin rounded-full border-4 border-emerald-500 border-t-transparent" />
          <span className="absolute inset-[18px] rounded-full bg-emerald-500" />
        </div>
        <p className="text-sm font-semibold tracking-wide text-gray-700 dark:text-gray-200">
          Preparing BFAB...
        </p>
      </div>
    </div>
  );
}

export default function AppShell({ children }: { children: React.ReactNode }) {
  const [isDark, setIsDark] = React.useState(false);
  const [showLoader, setShowLoader] = React.useState(true);

  React.useEffect(() => {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const storedTheme = localStorage.getItem('theme');
    const darkEnabled = storedTheme ? storedTheme === 'dark' : prefersDark;
    document.documentElement.classList.toggle('dark', darkEnabled);
    setIsDark(darkEnabled);

    const timer = window.setTimeout(() => setShowLoader(false), 550);
    return () => {
      window.clearTimeout(timer);
    };
  }, []);

  const toggleTheme = React.useCallback(() => {
    const nextDark = !isDark;
    setIsDark(nextDark);
    document.documentElement.classList.toggle('dark', nextDark);
    localStorage.setItem('theme', nextDark ? 'dark' : 'light');
  }, [isDark]);

  return (
    <CartProvider>
      {showLoader ? <InitialLoader /> : null}
      <main className="flex-grow">{children}</main>
    </CartProvider>
  );
}
