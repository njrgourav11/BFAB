"use client";
import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Heart, Target, Award, Handshake, Leaf, Zap, Globe } from 'lucide-react';

const teamMembers = [
  {
    id: 1,
    name: 'John Doe',
    role: 'Founder & CEO',
    avatar: '/vet.png',
    bio: 'Passionate about pet nutrition with 15+ years of industry experience',
  },
  {
    id: 2,
    name: 'Jane Smith',
    role: 'Head of Nutrition',
    avatar: '/review/Golden-Retriever.webp',
    bio: 'Certified animal nutritionist with multiple published research papers',
  },
  {
    id: 3,
    name: 'Peter Jones',
    role: 'Lead Veterinarian',
    avatar: '/cat.svg',
    bio: 'DVM with specialization in nutritional medicine for companion animals',
  },
];

const AboutUsPage = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-black transition-colors duration-300">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-700 text-white py-20">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6">About BFAB</h1>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto">
              Dedicated to revolutionizing pet nutrition with science-backed formulas and unwavering commitment to quality
            </p>
          </motion.div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-bold text-gray-800 dark:text-white mb-6">Our Story</h2>
              <p className="text-lg text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
                BFAB Pet Food Store was founded in 2023 with a simple yet powerful mission: to provide pet owners with the highest quality, most nutritious pet food on the market.
              </p>
              <p className="text-lg text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
                Our founder, John Doe, was inspired by his own beloved dog, Buddy, who struggled with food allergies and sensitivities. After years of research and consultation with leading veterinarians and animal nutritionists, John developed a line of pet food that is both delicious and nutritionally superior.
              </p>
              <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                Today, BFAB serves thousands of happy pets across the country, backed by a team of experts dedicated to pet health and wellness.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="relative h-96 rounded-xl overflow-hidden shadow-xl"
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
      <section className="py-20 bg-white dark:bg-gray-950 transition-colors duration-300">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-800 dark:text-white">Our Core Values</h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Mission */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900 rounded-xl p-8 border-2 border-blue-200 dark:border-blue-800 hover:shadow-lg transition duration-300"
            >
              <div className="flex items-center gap-3 mb-4">
                <Target className="text-blue-600 dark:text-blue-400" size={32} />
                <h3 className="text-2xl font-bold text-gray-800 dark:text-white">Our Mission</h3>
              </div>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                To improve the lives of pets and their owners by providing superior nutrition backed by science. We're committed to using only the finest ingredients and sustainable, ethical manufacturing practices.
              </p>
            </motion.div>

            {/* Vision */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950 dark:to-purple-900 rounded-xl p-8 border-2 border-purple-200 dark:border-purple-800 hover:shadow-lg transition duration-300"
            >
              <div className="flex items-center gap-3 mb-4">
                <Zap className="text-purple-600 dark:text-purple-400" size={32} />
                <h3 className="text-2xl font-bold text-gray-800 dark:text-white">Our Vision</h3>
              </div>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                To be the world's most trusted pet food brand, recognized for innovation, quality, and our unwavering commitment to pet health. We envision a world where every pet has access to premium nutrition.
              </p>
            </motion.div>

            {/* Guaranteed Excellence */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950 dark:to-green-900 rounded-xl p-8 border-2 border-green-200 dark:border-green-800 hover:shadow-lg transition duration-300"
            >
              <div className="flex items-center gap-3 mb-4">
                <Award className="text-green-600 dark:text-green-400" size={32} />
                <h3 className="text-2xl font-bold text-gray-800 dark:text-white">Guaranteed Excellence</h3>
              </div>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                Every product is rigorously tested and veterinarian-approved. We back our products with a 90-day money-back guarantee because we're confident in the quality and your pet's satisfaction.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Philanthropy Section */}
      <section className="py-20 bg-gradient-to-r from-pink-50 to-rose-50 dark:from-pink-950 dark:to-rose-950 border-y-2 border-pink-200 dark:border-pink-800 transition-colors duration-300">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="relative h-96 rounded-xl overflow-hidden shadow-xl"
            >
              <Image
                src="/collage.svg"
                alt="Philanthropy"
                fill
                className="object-cover"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center gap-3 mb-6">
                <Handshake className="text-pink-600 dark:text-pink-400" size={36} />
                <h2 className="text-4xl font-bold text-gray-800 dark:text-white">Philanthropy & Community</h2>
              </div>
              <p className="text-lg text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
                We believe in giving back. For every product sold, BFAB donates meals to animal shelters and rescue organizations nationwide.
              </p>
              <ul className="space-y-3 mb-6">
                <li className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
                  <Heart className="text-red-500" size={20} />
                  <span>Partnerships with 50+ animal shelters</span>
                </li>
                <li className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
                  <Heart className="text-red-500" size={20} />
                  <span>Over 100,000 meals donated to rescue animals</span>
                </li>
                <li className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
                  <Heart className="text-red-500" size={20} />
                  <span>Annual scholarship program for animal nutrition students</span>
                </li>
                <li className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
                  <Heart className="text-red-500" size={20} />
                  <span>100% sustainable packaging materials</span>
                </li>
              </ul>
              <p className="text-gray-700 dark:text-gray-300 italic">
                "Every pet deserves to thrive, regardless of circumstance. We're committed to making premium nutrition accessible to all."
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Our Team Section */}
      <section className="py-20 bg-white dark:bg-gray-900 transition-colors duration-300">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-800 dark:text-white mb-4">Meet Our Expert Team</h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">Passionate professionals dedicated to pet wellness</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700 rounded-xl p-8 text-center shadow-lg hover:shadow-xl transition duration-300 border border-gray-200 dark:border-gray-700"
              >
                <Image
                  src={member.avatar}
                  alt={member.name}
                  width={120}
                  height={120}
                  className="mx-auto rounded-full mb-6 border-4 border-blue-400 shadow-md"
                />
                <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">{member.name}</h3>
                <p className="text-lg font-semibold text-blue-600 dark:text-blue-400 mb-3">{member.role}</p>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{member.bio}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Sustainability Section */}
      <section className="py-20 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950 dark:to-emerald-950 transition-colors duration-300">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <div className="flex items-center justify-center gap-3 mb-6">
              <Leaf className="text-green-600 dark:text-green-400" size={36} />
              <h2 className="text-4xl font-bold text-gray-800 dark:text-white">Sustainability Commitment</h2>
            </div>
            <p className="text-lg text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
              We're dedicated to environmental responsibility and ethical practices
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md border-l-4 border-green-500 dark:border-green-400 transition-colors duration-300"
              >
                <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-2">{item.title}</h3>
                <p className="text-gray-700 dark:text-gray-300">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUsPage;