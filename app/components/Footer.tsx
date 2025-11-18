'use client';
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';

const Footer = () => {
  const socialLinks = [
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Instagram, href: '#', label: 'Instagram' },
  ];

  return (
    <footer className="bg-gradient-to-b from-gray-900 dark:from-gray-950 to-black dark:to-gray-900 text-white pt-16 pb-8 transition-colors duration-300">
      <div className="container mx-auto px-4 md:px-6">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Section 1: Brand Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center space-x-2 mb-4">
              <Image
                src="/bfab icon.png"
                alt="BFAB Logo"
                width={32}
                height={32}
                className="object-contain"
              />
              <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100">BFAB Pet Food</h2>
            </div>
            <p className="text-gray-400 dark:text-gray-500 text-sm leading-relaxed">
              Dedicated to providing the best nutrition for your beloved pets. We believe in healthy, happy lives for all animals.
            </p>
          </motion.div>

          {/* Section 2: Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h3 className="font-bold text-lg mb-4 text-white dark:text-gray-100">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link href="/about-us" className="text-gray-400 dark:text-gray-500 hover:text-white dark:hover:text-gray-300 transition duration-300">About Us</Link></li>
              <li><Link href="/contact-us" className="text-gray-400 dark:text-gray-500 hover:text-white dark:hover:text-gray-300 transition duration-300">Contact Us</Link></li>
              <li><Link href="/paw-blog" className="text-gray-400 dark:text-gray-500 hover:text-white dark:hover:text-gray-300 transition duration-300">Paw Blog</Link></li>
              {/* <li><Link href="/feeding-guide" className="text-gray-400 dark:text-gray-500 hover:text-white dark:hover:text-gray-300 transition duration-300">Feeding Guide</Link></li> */}
            </ul>
          </motion.div>

          {/* Section 3: Products */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h3 className="font-bold text-lg mb-4 text-white dark:text-gray-100">Products</h3>
            <ul className="space-y-2">
              <li><Link href="/products" className="text-gray-400 dark:text-gray-500 hover:text-white dark:hover:text-gray-300 transition duration-300">All Products</Link></li>
              <li><Link href="/shop-now" className="text-gray-400 dark:text-gray-500 hover:text-white dark:hover:text-gray-300 transition duration-300">Shop Now</Link></li>
              {/* <li><Link href="/ultimate-saver-packs" className="text-gray-400 dark:text-gray-500 hover:text-white dark:hover:text-gray-300 transition duration-300">Saver Packs</Link></li> */}
              {/* <li><Link href="/bfab-cares" className="text-gray-400 dark:text-gray-500 hover:text-white dark:hover:text-gray-300 transition duration-300">BFAB Cares</Link></li> */}
            </ul>
          </motion.div>

          {/* Section 4: Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <h3 className="font-bold text-lg mb-4 text-white dark:text-gray-100">Contact Info</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Mail size={18} className="text-blue-500 dark:text-blue-400" />
                <p className="text-gray-400 dark:text-gray-500">paw.support@begginforabite.in</p>
              </div>
              <div className="flex items-center space-x-2">
                <Phone size={18} className="text-blue-500 dark:text-blue-400" />
                <p className="text-gray-400 dark:text-gray-500">+91 8480-320158</p>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin size={18} className="text-blue-500 dark:text-blue-400" />
                <p className="text-gray-400 dark:text-gray-500">Taksh Apartment, Bhubaneswar, Odisha - 752050</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Social Links */}
        <div className="flex justify-center space-x-6 mb-8">
          {socialLinks.map((social, index) => (
            <motion.a
              key={index}
              href={social.href}
              whileHover={{ scale: 1.2, rotate: 5 }}
              whileTap={{ scale: 0.95 }}
              className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-600 to-blue-700 dark:from-blue-700 dark:to-blue-800 flex items-center justify-center text-white hover:from-blue-700 hover:to-blue-800 dark:hover:from-blue-600 dark:hover:to-blue-700 transition duration-300 shadow-lg"
              aria-label={social.label}
            >
              <social.icon size={20} />
            </motion.a>
          ))}
        </div>

        {/* Divider */}
        <div className="border-t border-gray-800 dark:border-gray-700 pt-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center md:text-left text-sm text-gray-400 dark:text-gray-500 mb-4">
            <p>&copy; {new Date().getFullYear()} BFAB Pet Food Store. All rights reserved.</p>
            <div className="flex justify-center md:justify-center space-x-4">
              <Link href="#" className="hover:text-white dark:hover:text-gray-300 transition duration-300">Privacy Policy</Link>
              <Link href="#" className="hover:text-white dark:hover:text-gray-300 transition duration-300">Terms of Service</Link>
            </div>
            <p className="text-center md:text-right">Made with ❤️ for pet lovers</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;