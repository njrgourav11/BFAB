"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X, Search, ShoppingCart, User, Moon, Sun } from 'lucide-react';
import { motion } from 'framer-motion';

interface NavbarProps {
  isDark: boolean;
  toggleTheme: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ isDark, toggleTheme }) => {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { label: 'Home', href: '/' },
    { label: 'Shop Now', href: '/shop-now' },
    { label: 'Saver Packs', href: '/ultimate-saver-packs' },
    { label: 'Feeding Guide', href: '/feeding-guide' },
    { label: 'BFAB Cares', href: '/bfab-cares' },
    { label: 'Paw Blog', href: '/paw-blog' },
    { label: 'About Us', href: '/about-us' },
    { label: 'Contact Us', href: '/contact-us' },
  ];

  return (
    <nav className="bg-gradient-to-r from-orange-400 to-orange-500 dark:from-blue-950 dark:to-blue-900 shadow-lg sticky top-0 z-50 transition-colors duration-300 border-b border-orange-600 dark:border-blue-800">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 hover:opacity-90 transition-opacity duration-200 flex-shrink-0">
            <motion.div 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex-shrink-0"
            >
              <Image
                src="/cat.svg"
                alt="BFAB Logo"
                width={48}
                height={48}
                className="object-contain"
              />
            </motion.div>
            <span className="text-white dark:text-gray-50 font-bold text-lg hidden sm:inline-block transition-colors duration-200">BFAB</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center justify-center space-x-1">
            {menuItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-white dark:text-gray-200 hover:bg-blue-500 dark:hover:bg-blue-800 px-3 py-2 rounded-md text-sm font-medium transition duration-200 hover:text-white dark:hover:text-gray-50 whitespace-nowrap"
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Right Section - Desktop */}
          <div className="hidden md:flex items-center space-x-2 lg:space-x-3">
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="text-white dark:text-gray-300 hover:bg-blue-500 dark:hover:bg-blue-800 p-2 rounded-full transition duration-200"
              aria-label="Search"
            >
              <Search size={20} />
            </motion.button>
            
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={toggleTheme}
              className="text-white dark:text-gray-300 hover:bg-blue-500 dark:hover:bg-blue-800 p-2 rounded-full transition duration-200"
              aria-label="Toggle dark mode"
            >
              {isDark ? <Sun size={20} className="text-yellow-300" /> : <Moon size={20} />}
            </motion.button>

            <Link href="/login" className="text-white dark:text-gray-300 hover:bg-blue-500 dark:hover:bg-blue-800 p-2 rounded-full transition duration-200 flex items-center justify-center">
              <User size={20} />
            </Link>

            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link href="/cart" className="flex items-center space-x-2 bg-yellow-300 dark:bg-yellow-400 text-blue-700 dark:text-blue-900 px-5 py-2 rounded-full font-semibold hover:bg-yellow-200 dark:hover:bg-yellow-300 transition duration-200 shadow-md hover:shadow-lg whitespace-nowrap">
                <ShoppingCart size={20} />
                <span>Cart</span>
              </Link>
            </motion.div>
          </div>

          {/* Mobile Menu Button + Theme Toggle */}
          <div className="lg:hidden flex items-center space-x-1">
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={toggleTheme}
              className="md:hidden text-white dark:text-gray-300 p-2 rounded-full hover:bg-blue-500 dark:hover:bg-blue-800 transition duration-200"
              aria-label="Toggle dark mode"
            >
              {isDark ? <Sun size={20} className="text-yellow-300" /> : <Moon size={20} />}
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsOpen(!isOpen)}
              className="text-white dark:text-gray-300 p-2 rounded-full hover:bg-blue-500 dark:hover:bg-blue-800 transition duration-200"
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.2 }}
          className="lg:hidden bg-blue-700 dark:bg-blue-900 border-t border-blue-600 dark:border-blue-800 transition-colors duration-200"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-2 pb-4 space-y-1">
            {menuItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="block px-4 py-3 rounded-md text-white dark:text-gray-200 hover:bg-blue-600 dark:hover:bg-blue-800 transition duration-200 font-medium text-base"
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <div className="border-t border-blue-600 dark:border-blue-800 pt-3 mt-3 space-y-1">
              <Link href="/login" className="flex items-center space-x-2 px-4 py-3 rounded-md text-white dark:text-gray-200 hover:bg-blue-600 dark:hover:bg-blue-800 transition duration-200 font-medium">
                <User size={18} />
                <span>Login</span>
              </Link>
              <Link href="/cart" className="flex items-center space-x-2 px-4 py-3 rounded-md text-white dark:text-gray-200 hover:bg-blue-600 dark:hover:bg-blue-800 transition duration-200 font-medium">
                <ShoppingCart size={18} />
                <span>Cart</span>
              </Link>
            </div>
          </div>
        </motion.div>
      )}
    </nav>
  );
};

export default Navbar;