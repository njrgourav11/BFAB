import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import AppShell from "./components/AppShell";
import type { ReactNode } from "react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-screen text-gray-900 dark:text-gray-100 transition-colors duration-300`}
        style={{ backgroundColor: '#fef6eb' }}
      >
        <AppShell>{children}</AppShell>
        <Analytics />
      </body>
    </html>
  );
}
