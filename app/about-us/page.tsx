"use client";
import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Heart, Target, Award, Handshake, Leaf, Zap, Globe, Users } from 'lucide-react';

const teamMembers = [
  {
    id: 1,
    name: 'John Doe',
    role: 'Founder & CEO',
    avatar: '/vet.png',
    bio: 'Passionate about pet nutrition with 15+ years of industry experience.',
  },
  {
    id: 2,
    name: 'Jane Smith',
    role: 'Head of Nutrition',
    avatar: '/review/Golden-Retriever.webp',
    bio: 'Certified animal nutritionist with multiple published research papers.',
  },
  {
    id: 3,
    name: 'Peter Jones',
    role: 'Lead Veterinarian',
    avatar: '/cat.svg',
    bio: 'DVM with specialization in nutritional medicine for companion animals.',
  },
];

const AboutUsPage = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 transition-colors duration-300 font-sans">

      {/* Hero Section */}
      <section className="bg-slate-900 text-white py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/hero-pattern.svg')] opacity-5"></div>
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto"
          >
            <span className="text-blue-400 font-semibold tracking-wider uppercase text-sm mb-4 block">Our Story</span>
            <h1 className="text-5xl md:text-7xl font-bold mb-8 tracking-tight leading-tight">
              Revolutionizing <br /> Pet Nutrition
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 leading-relaxed font-light">
              Science-backed formulas, unwavering commitment to quality, and a deep love for every pet.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-24 bg-white dark:bg-slate-950">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">The BFAB Journey</h2>
              <div className="space-y-6 text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                <p>
                  BFAB Pet Food Store was founded in 2023 with a simple yet powerful mission: to provide pet owners with the highest quality, most nutritious pet food on the market.
                </p>
                <p>
                  Our founder, John Doe, was inspired by his own beloved dog, Buddy, who struggled with food allergies and sensitivities. After years of research and consultation with leading veterinarians and animal nutritionists, John developed a line of pet food that is both delicious and nutritionally superior.
                </p>
                <p>
                  Today, BFAB serves thousands of happy pets across the country, backed by a team of experts dedicated to pet health and wellness.
                </p>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="relative h-[500px] rounded-2xl overflow-hidden shadow-2xl bg-gray-100 dark:bg-slate-900"
            >
              <Image
                src="/dog.svg"
                alt="Our Story"
                fill
                className="object-cover"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission, Vision, Values Grid */}
      <section className="py-24 bg-gray-50 dark:bg-slate-900">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">Our Core Values</h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">The principles that guide everything we do.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Target,
                title: "Our Mission",
                desc: "To improve the lives of pets and their owners by providing superior nutrition backed by science.",
                color: "text-blue-600 dark:text-blue-400"
              },
              {
                icon: Zap,
                title: "Our Vision",
                desc: "To be the world's most trusted pet food brand, recognized for innovation and quality.",
                color: "text-purple-600 dark:text-purple-400"
              },
              {
                icon: Award,
                title: "Excellence",
                desc: "Every product is rigorously tested and veterinarian-approved for your peace of mind.",
                color: "text-green-600 dark:text-green-400"
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white dark:bg-slate-950 rounded-2xl p-8 shadow-sm border border-gray-100 dark:border-slate-800 hover:shadow-xl transition-all duration-300"
              >
                <div className={`mb-6 ${item.color}`}>
                  <item.icon size={40} strokeWidth={1.5} />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">{item.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Philanthropy Section */}
      <section className="py-24 bg-white dark:bg-slate-950 border-y border-gray-100 dark:border-slate-900">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative h-[400px] lg:h-[500px] rounded-2xl overflow-hidden shadow-2xl bg-gray-100 dark:bg-slate-900 order-2 lg:order-1"
            >
              <Image
                src="/collage.svg"
                alt="Philanthropy"
                fill
                className="object-cover"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="order-1 lg:order-2"
            >
              <div className="flex items-center gap-3 mb-6">
                <Handshake className="text-pink-600 dark:text-pink-400" size={32} />
                <h2 className="text-4xl font-bold text-gray-900 dark:text-white">Giving Back</h2>
              </div>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
                We believe in giving back. For every product sold, BFAB donates meals to animal shelters and rescue organizations nationwide.
              </p>
              <ul className="space-y-4 mb-8">
                {[
                  "Partnerships with 50+ animal shelters",
                  "Over 100,000 meals donated to rescue animals",
                  "Annual scholarship program for students",
                  "100% sustainable packaging materials"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-4 text-gray-700 dark:text-gray-300">
                    <div className="bg-pink-100 dark:bg-pink-900/30 p-2 rounded-full">
                      <Heart className="text-pink-600 dark:text-pink-400" size={16} fill="currentColor" />
                    </div>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Our Team Section */}
      <section className="py-24 bg-gray-50 dark:bg-slate-900">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Meet The Experts</h2>
            <p className="text-gray-600 dark:text-gray-400">Passionate professionals dedicated to pet wellness</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white dark:bg-slate-950 rounded-2xl p-8 text-center shadow-sm border border-gray-100 dark:border-slate-800 hover:shadow-xl transition-all duration-300 group"
              >
                <div className="relative w-32 h-32 mx-auto mb-6">
                  <Image
                    src={member.avatar}
                    alt={member.name}
                    fill
                    className="rounded-full object-cover border-4 border-gray-50 dark:border-slate-900 group-hover:border-blue-100 dark:group-hover:border-blue-900/30 transition-colors"
                  />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{member.name}</h3>
                <p className="text-sm font-semibold text-blue-600 dark:text-blue-400 mb-4 uppercase tracking-wide">{member.role}</p>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-sm">{member.bio}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Sustainability Section */}
      <section className="py-24 bg-slate-900 text-white">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <Leaf className="text-green-400 mx-auto mb-6" size={48} />
            <h2 className="text-4xl font-bold mb-6">Committed to Sustainability</h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto font-light">
              We're dedicated to environmental responsibility and ethical practices in every step of our process.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { title: 'Eco-Friendly Packaging', desc: '100% recyclable and biodegradable materials' },
              { title: 'Sustainable Sourcing', desc: 'Ethically sourced ingredients from certified suppliers' },
              { title: 'Carbon Neutral', desc: 'All operations offset carbon footprint' },
              { title: 'Community Support', desc: 'Gives back to animal shelters and rescues' },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-slate-800/50 rounded-xl p-6 border border-slate-700 hover:bg-slate-800 transition-colors"
              >
                <h3 className="text-lg font-bold text-white mb-3">{item.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUsPage;