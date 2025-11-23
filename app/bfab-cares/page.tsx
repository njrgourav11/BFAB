"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Heart, Users, DollarSign, Mail, Phone, ExternalLink, CheckCircle, TrendingUp, Handshake, ArrowRight } from 'lucide-react';

const BFABCaresPage = () => {
  const [selectedTab, setSelectedTab] = useState<'shelters' | 'rescue' | 'community'>('shelters');

  const partnerships = [
    {
      id: 1,
      name: 'Pawsitive Futures',
      category: 'shelters',
      description: 'A dedicated animal shelter providing safe haven for abandoned pets',
      impact: '5,000+ animals helped',
      logo: '🏠',
      contact: 'pawsitive@example.com',
    },
    {
      id: 2,
      name: 'Hope Rescue Network',
      category: 'rescue',
      description: 'National rescue organization specializing in breed-specific adoptions',
      impact: '10,000+ animals adopted',
      logo: '🦮',
      contact: 'hope@example.com',
    },
    {
      id: 3,
      name: 'City Animal Welfare',
      category: 'shelters',
      description: 'Urban shelter dedicated to finding forever homes for street animals',
      impact: '3,000+ successful adoptions',
      logo: '🏘️',
      contact: 'caw@example.com',
    },
    {
      id: 4,
      name: 'Special Needs Paws',
      category: 'rescue',
      description: 'Rescue organization focusing on disabled and chronically ill animals',
      impact: '1,500+ special needs animals',
      logo: '💪',
      contact: 'specialneedspaws@example.com',
    },
    {
      id: 5,
      name: 'Community Pet Alliance',
      category: 'community',
      description: 'Community-driven initiative promoting responsible pet ownership',
      impact: '50,000+ community members',
      logo: '🤝',
      contact: 'alliance@example.com',
    },
    {
      id: 6,
      name: 'Foster First Program',
      category: 'community',
      description: 'Supporting foster families providing temporary homes for animals',
      impact: '2,000+ foster homes',
      logo: '❤️',
      contact: 'foster@example.com',
    },
  ];

  const initiatives = [
    {
      icon: <DollarSign size={28} />,
      title: 'Donation Program',
      description: 'Every purchase contributes to supporting animal shelters and rescue organizations',
      amount: '$500K+ donated annually',
    },
    {
      icon: <Users size={28} />,
      title: 'Volunteer Network',
      description: 'Join our community of passionate animal lovers making a real difference',
      amount: '1,000+ active volunteers',
    },
    {
      icon: <Handshake size={28} />,
      title: 'Education Initiative',
      description: 'Free workshops and resources on pet care, nutrition, and responsible ownership',
      amount: '100+ workshops yearly',
    },
    {
      icon: <TrendingUp size={28} />,
      title: 'Scholarship Program',
      description: 'Supporting students pursuing careers in animal nutrition and welfare',
      amount: '$100K+ in scholarships',
    },
  ];

  const wayToHelp = [
    {
      number: '01',
      title: 'Shop with Purpose',
      description: 'Every purchase directly supports our partner shelters and rescue organizations',
      action: 'Start Shopping',
      link: '/shop-now',
    },
    {
      number: '02',
      title: 'Donate Directly',
      description: 'Make a one-time or monthly donation to support animal welfare',
      action: 'Donate Now',
      link: '#',
    },
    {
      number: '03',
      title: 'Volunteer',
      description: 'Join our volunteer network and help animals in need in your community',
      action: 'Get Involved',
      link: '#',
    },
    {
      number: '04',
      title: 'Adopt',
      description: 'Browse available pets from our partner rescues and shelters',
      action: 'View Pets',
      link: '#',
    },
  ];

  const filteredPartnerships = partnerships.filter(p => p.category === selectedTab);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-950 transition-colors duration-300 font-sans">
      {/* Hero Section */}
      <section className="bg-slate-900 text-white py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="inline-flex p-4 bg-rose-500/20 rounded-full mb-6 text-rose-500"
            >
              <Heart size={48} className="fill-current" />
            </motion.div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 tracking-tight">BFAB Cares</h1>
            <p className="text-xl text-gray-400 leading-relaxed">
              Dedicated to improving the lives of animals through compassion, support, and action.
              Together, we can make a difference.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="py-16 bg-white dark:bg-slate-900 border-b border-gray-100 dark:border-slate-800">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto text-center"
          >
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Our Mission</h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed mb-12">
              At BFAB, we believe that every pet deserves a loving home and proper nutrition. Our mission is to support animal welfare organizations and promote responsible pet ownership. We are committed to making a positive impact on the lives of pets in our community and beyond.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-gray-50 dark:bg-slate-800 rounded-2xl p-8 border border-gray-100 dark:border-slate-700">
                <TrendingUp className="text-rose-500 mx-auto mb-4" size={32} />
                <p className="text-2xl font-bold text-gray-900 dark:text-white mb-1">50+ Partners</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">Active partnerships</p>
              </div>
              <div className="bg-gray-50 dark:bg-slate-800 rounded-2xl p-8 border border-gray-100 dark:border-slate-700">
                <Heart className="text-rose-500 mx-auto mb-4" size={32} />
                <p className="text-2xl font-bold text-gray-900 dark:text-white mb-1">150K+ Animals</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">Helped and supported</p>
              </div>
              <div className="bg-gray-50 dark:bg-slate-800 rounded-2xl p-8 border border-gray-100 dark:border-slate-700">
                <DollarSign className="text-rose-500 mx-auto mb-4" size={32} />
                <p className="text-2xl font-bold text-gray-900 dark:text-white mb-1">$500K+</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">Donated annually</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Initiatives Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Our Initiatives</h2>
            <p className="text-gray-600 dark:text-gray-400">Making a real difference in animal welfare</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {initiatives.map((initiative, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-slate-800 hover:shadow-md transition-all group"
              >
                <div className="w-12 h-12 bg-rose-50 dark:bg-rose-900/20 rounded-xl flex items-center justify-center text-rose-500 mb-6 group-hover:scale-110 transition-transform">
                  {initiative.icon}
                </div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3">{initiative.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 leading-relaxed">{initiative.description}</p>
                <p className="font-bold text-rose-500 text-sm">{initiative.amount}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Partnerships Section */}
      <section className="py-16 bg-white dark:bg-slate-900 border-y border-gray-100 dark:border-slate-800">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Our Partnerships</h2>
            <p className="text-gray-600 dark:text-gray-400">Working with amazing organizations</p>
          </motion.div>

          {/* Tab Navigation */}
          <div className="flex justify-center mb-12">
            <div className="flex p-1 bg-gray-100 dark:bg-slate-800 rounded-xl">
              {[
                { id: 'shelters', label: 'Animal Shelters' },
                { id: 'rescue', label: 'Rescue Orgs' },
                { id: 'community', label: 'Community' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setSelectedTab(tab.id as any)}
                  className={`px-6 py-2.5 rounded-lg font-semibold text-sm transition-all ${selectedTab === tab.id
                      ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm'
                      : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
                    }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Partnership Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPartnerships.map((partnership, index) => (
              <motion.div
                key={partnership.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="bg-gray-50 dark:bg-slate-800 rounded-2xl p-6 border border-gray-100 dark:border-slate-700 hover:border-rose-200 dark:hover:border-rose-800 transition-colors"
              >
                <div className="text-4xl mb-4">{partnership.logo}</div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{partnership.name}</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-6 leading-relaxed">{partnership.description}</p>

                <div className="flex items-center justify-between pt-6 border-t border-gray-200 dark:border-slate-700">
                  <div className="flex items-center gap-2 text-rose-600 dark:text-rose-400 text-sm font-medium">
                    <CheckCircle size={16} />
                    {partnership.impact}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Ways to Help Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Ways to Help</h2>
            <p className="text-gray-600 dark:text-gray-400">Get involved and make a difference</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {wayToHelp.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white dark:bg-slate-900 rounded-2xl p-8 shadow-sm border border-gray-100 dark:border-slate-800 hover:shadow-md transition-all group relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 p-4 opacity-10 font-bold text-6xl text-gray-900 dark:text-white select-none">
                  {item.number}
                </div>
                <div className="relative z-10 h-full flex flex-col">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 mt-4">{item.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-6 flex-grow">{item.description}</p>
                  <Link
                    href={item.link}
                    className="inline-flex items-center gap-2 text-rose-600 dark:text-rose-400 font-semibold text-sm hover:gap-3 transition-all"
                  >
                    {item.action}
                    <ArrowRight size={16} />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-slate-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-10"></div>
        <div className="container mx-auto px-4 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Make a Difference?</h2>
            <p className="text-lg text-gray-400 mb-8 leading-relaxed">
              Join us in our mission to improve the lives of animals everywhere. Whether you shop, donate, volunteer, or adopt, your support matters.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/shop-now"
                className="bg-white text-slate-900 px-8 py-3 rounded-xl font-bold hover:bg-gray-100 transition shadow-lg"
              >
                Shop Now
              </Link>
              <Link
                href="/contact-us"
                className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-xl font-bold hover:bg-white/10 transition"
              >
                Get in Touch
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact Info */}
      <section className="py-12 bg-gray-50 dark:bg-slate-950 border-t border-gray-200 dark:border-slate-800">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <Mail className="text-rose-500 mx-auto mb-3" size={24} />
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Email us</p>
              <a href="mailto:cares@bfab.com" className="font-bold text-gray-900 dark:text-white hover:text-rose-500 transition">
                cares@bfab.com
              </a>
            </div>
            <div>
              <Phone className="text-rose-500 mx-auto mb-3" size={24} />
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Call us</p>
              <a href="tel:+1-800-BFAB-CARES" className="font-bold text-gray-900 dark:text-white hover:text-rose-500 transition">
                1-800-BFAB-CARES
              </a>
            </div>
            <div>
              <Heart className="text-rose-500 mx-auto mb-3" size={24} />
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Follow us</p>
              <p className="font-bold text-gray-900 dark:text-white">@BFABCares</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BFABCaresPage;