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
    { label: 'Contact Us', href: '/contact-us' },
    { label: 'Paw Blog', href: '/blogs' },
    { label: 'Feeding Guide', href: '/feeding-guide' },
    { label: 'About Us', href: '/about-us' },
  ];

  const productLinks = [
    { label: 'All Products', href: '/products' },
    { label: 'Fresh Meals', href: '/products' },
    { label: 'Pet Wellness', href: '/products' },
    { label: 'Saver Packs', href: '/ultimate-saver-packs' },
  ];

  const legalLinks = [
    { label: 'Privacy Policy', href: '#' },
    { label: 'Terms of Service', href: '#' },
    { label: 'Shipping Policy', href: '#' },
    { label: 'Return Policy', href: '#' },
  ];

  return (
    <footer className="bg-[#FA6338] text-white pt-16 pb-8 border-t border-[#e2552d]">
      <div className="container mx-auto px-4 md:px-8 max-w-7xl">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">

          {/* Brand Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="lg:col-span-2"
          >
            <Link href="/" className="inline-block mb-4 group" aria-label="Beggin For A Bite Home">
              <div className="relative w-44 sm:w-52 aspect-[1400/993] transition-transform duration-300 group-hover:scale-105">
                <Image
                  src="/1.svg"
                  alt="Beggin For A Bite"
                  fill
                  className="object-contain object-left"
                />
              </div>
            </Link>
            <p className="text-white/90 leading-relaxed mb-6 max-w-md text-sm sm:text-base font-medium">
              Dedicated to providing the best nutrition and wellness solutions to help every pet live a healthy, happy life from first bite to forever.
            </p>

            {/* Social Links */}
            <div className="flex gap-3">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-10 h-10 rounded-xl bg-white/20 hover:bg-white text-white hover:text-[#FA6338] flex items-center justify-center transition-all shadow-sm"
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
            <h3 className="font-extrabold text-base uppercase tracking-wider mb-4 text-white">Quick Links</h3>
            <ul className="space-y-2.5">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.href}
                    className="text-white/80 hover:text-white transition-colors inline-flex items-center gap-2 text-sm font-medium group"
                  >
                    <ArrowRight size={14} className="opacity-0 group-hover:opacity-100 -ml-4 group-hover:ml-0 transition-all" />
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
            <h3 className="font-extrabold text-base uppercase tracking-wider mb-4 text-white">Products</h3>
            <ul className="space-y-2.5">
              {productLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.href}
                    className="text-white/80 hover:text-white transition-colors inline-flex items-center gap-2 text-sm font-medium group"
                  >
                    <ArrowRight size={14} className="opacity-0 group-hover:opacity-100 -ml-4 group-hover:ml-0 transition-all" />
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
            <h3 className="font-extrabold text-base uppercase tracking-wider mb-4 text-white">Contact Us</h3>
            <div className="space-y-3 text-sm">
              <a
                href="mailto:paw.support@begginforabite.in"
                className="flex items-start gap-3 text-white/80 hover:text-white transition-colors group"
              >
                <Mail size={18} className="text-white mt-0.5 flex-shrink-0" />
                <span>paw.support@begginforabite.in</span>
              </a>
              <a
                href="tel:+918480320158"
                className="flex items-start gap-3 text-white/80 hover:text-white transition-colors group"
              >
                <Phone size={18} className="text-white mt-0.5 flex-shrink-0" />
                <span>+91 8480-320158</span>
              </a>
              <div className="flex items-start gap-3 text-white/80">
                <MapPin size={18} className="text-white mt-0.5 flex-shrink-0" />
                <span>Taksh Apartment, Bhubaneswar, Odisha - 752050</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/20 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm font-medium text-white/80">
            <p className="text-center md:text-left">
              © {new Date().getFullYear()} Beggin For A Bite (BFAB). All rights reserved.
            </p>

            <div className="flex flex-wrap justify-center gap-5">
              {legalLinks.map((link, index) => (
                <Link
                  key={index}
                  href={link.href}
                  className="hover:text-white transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>

            <p className="flex items-center gap-1.5">
              Made with <Heart size={14} className="text-white fill-current" /> for pet lovers
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
