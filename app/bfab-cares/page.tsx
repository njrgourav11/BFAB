"use client";
import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Heart, Users, Home, BookOpen, Award, DollarSign, Handshake, Mail, Phone, ExternalLink, CheckCircle, Target, TrendingUp } from 'lucide-react';

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
      icon: <BookOpen size={28} />,
      title: 'Education Initiative',
      description: 'Free workshops and resources on pet care, nutrition, and responsible ownership',
      amount: '100+ workshops yearly',
    },
    {
      icon: <Award size={28} />,
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-rose-50 to-red-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-red-600 via-pink-600 to-rose-600 text-white py-12 sm:py-16 md:py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-40 h-40 sm:w-56 sm:h-56 md:w-72 md:h-72 bg-white rounded-full mix-blend-multiply filter blur-2xl sm:blur-3xl animate-pulse"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="inline-block mb-4 sm:mb-6"
            >
              <Heart size={40} className="sm:w-12 sm:h-12 fill-current" />
            </motion.div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-3 sm:mb-4">BFAB Cares</h1>
            <p className="text-base sm:text-lg md:text-xl text-rose-100 max-w-2xl mx-auto leading-relaxed px-2">
              Dedicated to improving the lives of animals through compassion, support, and action
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="py-12 sm:py-16 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto text-center"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4 sm:mb-6">Our Mission</h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-700 leading-relaxed mb-6 sm:mb-8 px-2">
              At BFAB, we believe that every pet deserves a loving home and proper nutrition. Our mission is to support animal welfare organizations and promote responsible pet ownership. We are committed to making a positive impact on the lives of pets in our community and beyond.
            </p>
            <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-3 sm:gap-4">
              <div className="bg-gradient-to-br from-red-50 to-pink-50 rounded-lg p-4 sm:p-6 border border-red-200 flex-1 min-w-full sm:min-w-52">
                <TrendingUp className="text-red-600 mx-auto mb-3" size={28} />
                <p className="font-bold text-gray-800 text-sm sm:text-base">50+ Partners</p>
                <p className="text-xs sm:text-sm text-gray-600">Active partnerships</p>
              </div>
              <div className="bg-gradient-to-br from-pink-50 to-rose-50 rounded-lg p-4 sm:p-6 border border-pink-200 flex-1 min-w-full sm:min-w-52">
                <Heart className="text-pink-600 mx-auto mb-3" size={28} />
                <p className="font-bold text-gray-800 text-sm sm:text-base">150K+ Animals</p>
                <p className="text-xs sm:text-sm text-gray-600">Helped and supported</p>
              </div>
              <div className="bg-gradient-to-br from-rose-50 to-red-50 rounded-lg p-4 sm:p-6 border border-rose-200 flex-1 min-w-full sm:min-w-52">
                <DollarSign className="text-rose-600 mx-auto mb-3" size={28} />
                <p className="font-bold text-gray-800 text-sm sm:text-base">$500K+</p>
                <p className="text-xs sm:text-sm text-gray-600">Donated annually</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Initiatives Section */}
      <section className="py-12 sm:py-16 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-8 sm:mb-12"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-3 sm:mb-4">Our Initiatives</h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-600">Making a real difference in animal welfare</p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {initiatives.map((initiative, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl p-4 sm:p-6 shadow-sm hover:shadow-lg transition border border-gray-100"
              >
                <div className="text-red-600 mb-4 text-2xl sm:text-3xl">{initiative.icon}</div>
                <h3 className="text-base sm:text-lg md:text-xl font-bold text-gray-800 mb-3">{initiative.title}</h3>
                <p className="text-gray-600 mb-4 text-xs sm:text-sm leading-relaxed">{initiative.description}</p>
                <p className="font-bold text-red-600 text-xs sm:text-sm">{initiative.amount}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Partnerships Section */}
      <section className="py-12 sm:py-16 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-8 sm:mb-12"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-3 sm:mb-4">Our Partnerships</h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-600">Working with amazing organizations</p>
          </motion.div>

          {/* Tab Navigation */}
          <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-2 sm:gap-3 md:gap-4 mb-8 sm:mb-12">
            {[
              { id: 'shelters', label: '🏠 Animal Shelters' },
              { id: 'rescue', label: '🦮 Rescue Organizations' },
              { id: 'community', label: '🤝 Community Programs' },
            ].map((tab) => (
              <motion.button
                key={tab.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedTab(tab.id as any)}
                className={`px-4 sm:px-6 py-2 sm:py-3 rounded-full font-semibold transition text-xs sm:text-sm md:text-base ${
                  selectedTab === tab.id
                    ? 'bg-gradient-to-r from-red-600 to-pink-600 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {tab.label}
              </motion.button>
            ))}
          </div>

          {/* Partnership Cards */}
          <motion.div
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"
          >
            {filteredPartnerships.map((partnership, index) => (
              <motion.div
                key={partnership.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="bg-gradient-to-br from-gray-50 to-white rounded-xl p-4 sm:p-6 shadow-sm hover:shadow-lg transition border border-gray-100 hover:border-red-200"
              >
                <div className="text-4xl sm:text-5xl mb-3 sm:mb-4">{partnership.logo}</div>
                <h3 className="text-lg sm:text-2xl font-bold text-gray-800 mb-2">{partnership.name}</h3>
                <p className="text-gray-600 mb-4 text-xs sm:text-sm leading-relaxed">{partnership.description}</p>
                
                <div className="bg-red-50 rounded-lg p-2 sm:p-3 mb-4 border border-red-200">
                  <p className="text-xs sm:text-sm font-semibold text-red-700 flex items-center gap-2">
                    <CheckCircle size={14} className="sm:w-4 sm:h-4 flex-shrink-0" />
                    {partnership.impact}
                  </p>
                </div>

                <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-600 overflow-x-auto">
                  <Mail size={14} className="sm:w-4 sm:h-4 flex-shrink-0" />
                  <a href={`mailto:${partnership.contact}`} className="hover:text-red-600 transition break-all">
                    {partnership.contact}
                  </a>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Ways to Help Section */}
      <section className="py-12 sm:py-16 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-8 sm:mb-12"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-3 sm:mb-4">Ways to Help</h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-600">Get involved and make a difference</p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {wayToHelp.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="relative group"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-red-600 to-pink-600 rounded-xl blur-lg opacity-0 group-hover:opacity-100 transition duration-300"></div>
                <div className="relative bg-white rounded-xl p-4 sm:p-6 md:p-8 shadow-sm group-hover:shadow-xl transition h-full flex flex-col">
                  <div className="text-4xl sm:text-5xl font-bold text-red-600/20 mb-3 sm:mb-4">{item.number}</div>
                  <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-800 mb-2 sm:mb-3">{item.title}</h3>
                  <p className="text-gray-600 mb-4 sm:mb-6 flex-1 text-xs sm:text-sm">{item.description}</p>
                  <Link
                    href={item.link}
                    className="inline-flex items-center gap-2 text-red-600 font-semibold hover:text-red-700 transition group/link text-xs sm:text-sm"
                  >
                    {item.action}
                    <ExternalLink size={14} className="sm:w-4 sm:h-4 group-hover/link:translate-x-1 transition" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-12 sm:py-16 bg-gradient-to-r from-red-600 via-pink-600 to-rose-600 text-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center max-w-2xl mx-auto px-2"
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 sm:mb-6">Ready to Make a Difference?</h2>
            <p className="text-base sm:text-lg md:text-xl text-rose-100 mb-6 sm:mb-8 leading-relaxed">
              Join us in our mission to improve the lives of animals everywhere. Whether you shop, donate, volunteer, or adopt, your support matters.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                  href="/shop-now"
                  className="inline-block bg-white text-red-600 px-6 sm:px-8 py-2.5 sm:py-3 rounded-lg font-bold hover:bg-rose-50 transition shadow-lg text-sm sm:text-base"
                >
                  Shop Now
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                  href="/contact-us"
                  className="inline-block border-2 border-white text-white px-6 sm:px-8 py-2.5 sm:py-3 rounded-lg font-bold hover:bg-white/10 transition text-sm sm:text-base"
                >
                  Get in Touch
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact Info */}
      <section className="py-8 sm:py-12 bg-white border-t border-gray-100">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 text-center">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0 }}
              viewport={{ once: true }}
            >
              <Mail className="text-red-600 mx-auto mb-3" size={28} />
              <p className="text-xs sm:text-sm text-gray-600">Email us</p>
              <a href="mailto:cares@bfab.com" className="font-bold text-gray-800 hover:text-red-600 transition text-xs sm:text-sm break-all">
                cares@bfab.com
              </a>
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
              viewport={{ once: true }}
            >
              <Phone className="text-red-600 mx-auto mb-3" size={28} />
              <p className="text-xs sm:text-sm text-gray-600">Call us</p>
              <a href="tel:+1-800-BFAB-CARES" className="font-bold text-gray-800 hover:text-red-600 transition text-xs sm:text-sm">
                1-800-BFAB-CARES
              </a>
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              viewport={{ once: true }}
            >
              <Heart className="text-red-600 mx-auto mb-3" size={28} />
              <p className="text-xs sm:text-sm text-gray-600">Follow us</p>
              <p className="font-bold text-gray-800 text-xs sm:text-sm">@BFABCares</p>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BFABCaresPage;