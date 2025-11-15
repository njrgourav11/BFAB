"use client";
import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Star, ShoppingCart, Award, TrendingUp } from 'lucide-react';

const ProductsPage = () => {
  const featuredProducts = [
    {
      id: 1,
      name: 'Premium Dog Food',
      description: 'High-quality ingredients for adult dogs. Packed with nutrients for optimal health.',
      price: '₹49.99',
      image: '/globe.svg',
      rating: 4.9,
      reviews: 328,
      badge: 'Best Seller',
      benefits: ['Rich in Protein', 'Grain-Free', 'Vet Approved'],
    },
    {
      id: 2,
      name: 'Organic Cat Kibble',
      description: 'Nutritious and delicious for all cat breeds. Made with organic ingredients.',
      price: '₹34.50',
      image: '/globe.svg',
      rating: 4.8,
      reviews: 245,
      badge: 'Popular',
      benefits: ['Natural Ingredients', 'Digestive Health', 'Hypoallergenic'],
    },
    {
      id: 3,
      name: 'Bird Seed Mix',
      description: 'A balanced diet for various bird species. Specially formulated for nutrition.',
      price: '₹12.75',
      image: '/globe.svg',
      rating: 4.7,
      reviews: 156,
      badge: 'New',
      benefits: ['Multi-Species', 'Vitamin Rich', 'Natural'],
    },
  ];

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-700 text-white py-16">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-4">Our Products</h1>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto">
              Explore our wide range of high-quality pet food products carefully formulated for your beloved pets.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Info Section */}
      <section className="bg-white py-12 border-b border-gray-200">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <Award size={32} className="text-blue-600" />,
                title: 'Premium Quality',
                description: 'Sourced from the best suppliers globally',
              },
              {
                icon: <TrendingUp size={32} className="text-blue-600" />,
                title: 'Growing Trust',
                description: '10,000+ satisfied customers worldwide',
              },
              {
                icon: <Star size={32} className="text-blue-600" />,
                title: 'Highly Rated',
                description: 'Average rating of 4.8 out of 5 stars',
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="flex flex-col items-center text-center"
              >
                <div className="mb-4 p-4 bg-blue-50 rounded-full">
                  {item.icon}
                </div>
                <h3 className="text-lg font-bold text-gray-800 mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">Featured Products</h2>
            <p className="text-xl text-gray-600">Discover our most popular and highly-rated pet food options</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                viewport={{ once: true }}
                className="group bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition duration-300 hover:scale-105 flex flex-col"
              >
                {/* Image Container */}
                <div className="relative overflow-hidden bg-gray-100 h-64 flex items-center justify-center">
                  <div className="absolute top-4 right-4 bg-yellow-400 text-yellow-900 px-3 py-1 rounded-full text-sm font-semibold z-10">
                    {product.badge}
                  </div>
                  <Image
                    src={product.image}
                    alt={product.name}
                    width={200}
                    height={200}
                    className="group-hover:scale-110 transition duration-300 object-contain"
                  />
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">{product.name}</h3>

                  {/* Rating */}
                  <div className="flex items-center mb-3">
                    <div className="flex text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={16} fill="currentColor" />
                      ))}
                    </div>
                    <span className="ml-2 text-sm text-gray-600">
                      {product.rating} ({product.reviews} reviews)
                    </span>
                  </div>

                  {/* Description */}
                  <p className="text-gray-600 text-sm mb-4 flex-grow">{product.description}</p>

                  {/* Benefits */}
                  <div className="mb-4 flex flex-wrap gap-2">
                    {product.benefits.map((benefit, idx) => (
                      <span key={idx} className="bg-blue-50 text-blue-700 text-xs font-semibold px-3 py-1 rounded-full">
                        {benefit}
                      </span>
                    ))}
                  </div>

                  {/* Price and Button */}
                  <div className="flex items-center justify-between mt-auto">
                    <p className="text-3xl font-bold text-blue-600">{product.price}</p>
                    <button className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-3 rounded-full hover:from-blue-700 hover:to-blue-800 transition duration-300 flex items-center gap-2 font-semibold group-hover:scale-110">
                      <ShoppingCart size={18} />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Our Products Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-700 text-white py-20">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Why Choose Our Products?</h2>
            <p className="text-xl text-blue-100">Backed by science and loved by pets everywhere</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                title: '100% Natural Ingredients',
                description: 'No artificial flavors, colors, or preservatives. Only the finest natural ingredients.',
                icon: '🌿',
              },
              {
                title: 'Veterinarian Approved',
                description: 'Formulated with guidance from leading veterinary nutritionists.',
                icon: '🏥',
              },
              {
                title: 'Money-Back Guarantee',
                description: 'Not satisfied? We offer a full refund within 30 days.',
                icon: '💰',
              },
              {
                title: 'Fast & Free Shipping',
                description: 'Orders over ₹50 ship free. Standard delivery in 3-5 business days.',
                icon: '🚚',
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white bg-opacity-10 backdrop-blur-md rounded-lg p-8 border border-white border-opacity-20"
              >
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="text-2xl font-bold mb-2">{item.title}</h3>
                <p className="text-blue-100">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-gray-800 mb-6">Ready to Try Our Products?</h2>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Join thousands of happy pet owners who have made the switch to premium nutrition.
            </p>
            <button className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold py-4 px-8 rounded-full text-lg transition duration-300 inline-flex items-center gap-2 shadow-lg hover:shadow-xl">
              <ShoppingCart size={20} />
              Shop Now
            </button>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default ProductsPage;