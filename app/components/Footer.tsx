'use client';
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin, Heart, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const Footer = () => {
  const socialLinks = [
    { icon: Facebook, href: '#', label: 'Facebook', color: 'hover:bg-blue-600' },
    { icon: Twitter, href: '#', label: 'Twitter', color: 'hover:bg-sky-500' },
    { icon: Instagram, href: '#', label: 'Instagram', color: 'hover:bg-pink-600' },
  ];

  const quickLinks = [
    // { label: 'About Us', href: '/about-us' },
    { label: 'Contact Us', href: '/contact-us' },
    { label: 'Paw Blog', href: '/paw-blog' },
    { label: 'Feeding Guide', href: '/feeding-guide' },
  ];

  const productLinks = [
    { label: 'All Products', href: '/products' },
    { label: 'Shop Now', href: '/products' },
    { label: 'Saver Packs', href: '/ultimate-saver-packs' },
    { label: 'BFAB Cares', href: '/bfab-cares' },
  ];

  const legalLinks = [
    { label: 'Privacy Policy', href: '#' },
    { label: 'Terms of Service', href: '#' },
    { label: 'Shipping Policy', href: '#' },
    { label: 'Return Policy', href: '#' },
  ];

  return (
    <footer className="bg-slate-900 text-white pt-16 pb-8 border-t border-slate-800">
      <div className="container mx-auto px-4">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">

          {/* Brand Section - Takes 2 columns on large screens */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="lg:col-span-2"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="relative w-10 h-10">
                <Image
                  src="/cat.svg"
                  alt="BFAB Logo"
                  fill
                  className="object-contain"
                />
              </div>
              <h2 className="text-2xl font-bold">BFAB Pet Food</h2>
            </div>
            <p className="text-gray-400 leading-relaxed mb-6 max-w-md">
              Dedicated to providing the best nutrition for your beloved pets. We believe in healthy, happy lives for all animals.
            </p>

            {/* Social Links */}
            <div className="flex gap-3">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className={`w-10 h-10 rounded-lg bg-slate-800 flex items-center justify-center text-gray-400 ${social.color} hover:text-white transition-all`}
                  aria-label={social.label}
                >
                  <social.icon size={18} />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h3 className="font-bold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors inline-flex items-center gap-2 group"
                  >
                    <ArrowRight size={14} className="opacity-0 group-hover:opacity-100 -ml-5 group-hover:ml-0 transition-all" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Products */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h3 className="font-bold text-lg mb-4">Products</h3>
            <ul className="space-y-2">
              {productLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors inline-flex items-center gap-2 group"
                  >
                    <ArrowRight size={14} className="opacity-0 group-hover:opacity-100 -ml-5 group-hover:ml-0 transition-all" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <h3 className="font-bold text-lg mb-4">Contact Info</h3>
            <div className="space-y-3">
              <a
                href="mailto:paw.support@begginforabite.in"
                className="flex items-start gap-3 text-gray-400 hover:text-white transition-colors group"
              >
                <Mail size={18} className="text-blue-400 mt-0.5 flex-shrink-0" />
                <span className="text-sm">paw.support@begginforabite.in</span>
              </a>
              <a
                href="tel:+918480320158"
                className="flex items-start gap-3 text-gray-400 hover:text-white transition-colors group"
              >
                <Phone size={18} className="text-green-400 mt-0.5 flex-shrink-0" />
                <span className="text-sm">+91 8480-320158</span>
              </a>
              <div className="flex items-start gap-3 text-gray-400">
                <MapPin size={18} className="text-red-400 mt-0.5 flex-shrink-0" />
                <span className="text-sm">Taksh Apartment, Bhubaneswar, Odisha - 752050</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Newsletter Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-slate-800 rounded-2xl p-8 mb-12"
        >
          <div className="max-w-2xl mx-auto text-center">
            <h3 className="text-2xl font-bold mb-2">Stay Updated</h3>
            <p className="text-gray-400 mb-6">Subscribe to our newsletter for pet care tips and exclusive offers</p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 bg-slate-900 border border-slate-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors whitespace-nowrap">
                Subscribe
              </button>
            </div>
          </div>
        </motion.div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm text-center md:text-left">
              © {new Date().getFullYear()} BFAB Pet Food Store. All rights reserved.
            </p>

            <div className="flex flex-wrap justify-center gap-4 text-sm">
              {legalLinks.map((link, index) => (
                <Link
                  key={index}
                  href={link.href}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>

            <p className="text-gray-400 text-sm flex items-center gap-2">
              Made with <Heart size={14} className="text-red-500 fill-current" /> for pet lovers
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
