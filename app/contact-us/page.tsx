"use client";
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Clock, MessageCircle, ChevronDown, Send } from 'lucide-react';

const ContactUsPage = () => {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [expandedFaq, setExpandedFaq] = useState(0);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setFormData({ name: '', email: '', subject: '', message: '' });
      setSubmitted(false);
    }, 3000);
  };

  const contactMethods = [
    {
      icon: <Mail size={32} className="text-blue-500" />,
      title: 'Email',
      description: 'We reply within 24 hours',
      details: 'info@bfab.com',
      color: 'blue',
    },
    {
      icon: <Phone size={32} className="text-green-500" />,
      title: 'Phone',
      description: '24/7 Customer Support',
      details: '+1 (123) 456-7890',
      color: 'green',
    },
    {
      icon: <MessageCircle size={32} className="text-purple-500" />,
      title: 'Live Chat',
      description: 'Chat with our team',
      details: 'Available 9 AM - 9 PM EST',
      color: 'purple',
    },
  ];

  const faqItems = [
    {
      question: 'How quickly do you process orders?',
      answer: 'Most orders are processed within 24 hours. You\'ll receive a shipping confirmation email with tracking information. Standard shipping typically takes 5-7 business days.'
    },
    {
      question: 'What is your return policy?',
      answer: 'We offer a 90-day money-back guarantee on all products. If you\'re not completely satisfied, contact us for a full refund or exchange at no additional cost.'
    },
    {
      question: 'Do you offer international shipping?',
      answer: 'Currently, we ship to all US states and selected Canadian regions. International shipping is coming soon! Sign up for our newsletter to be notified.'
    },
    {
      question: 'Can I change my order after placing it?',
      answer: 'Orders placed within the last 2 hours can be modified or cancelled. Contact our support team immediately and we\'ll help you out!'
    },
    {
      question: 'Are your products suitable for dogs with allergies?',
      answer: 'Many of our products are grain-free and hypoallergenic. We recommend consulting with your veterinarian to find the perfect formula for your pet\'s specific needs.'
    },
    {
      question: 'How can I track my order?',
      answer: 'You\'ll receive a tracking number via email after your order ships. You can use this number to monitor your shipment status at any time.'
    },
  ];

  const officeInfo = {
    address: '123 Pet Paradise Way, Denver, CO 80202',
    hours: {
      'Monday - Friday': '9 AM - 6 PM EST',
      'Saturday': '10 AM - 4 PM EST',
      'Sunday': 'Closed',
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-black transition-colors duration-300">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 dark:from-blue-800 dark:via-purple-800 dark:to-pink-800 text-white py-16 transition-colors duration-300">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-4">📞 Get In Touch</h1>
            <p className="text-xl text-blue-100 dark:text-purple-100">We're here to help! Reach out to us anytime</p>
          </motion.div>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-16 bg-white dark:bg-gray-900 transition-colors duration-300">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16"
          >
            {contactMethods.map((method, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-lg dark:shadow-2xl dark:shadow-black/50 p-8 text-center hover:shadow-2xl dark:hover:shadow-2xl dark:hover:shadow-blue-900/50 transition-all duration-300 border border-gray-200 dark:border-gray-700"
              >
                <div className="flex justify-center mb-4">{method.icon}</div>
                <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">{method.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">{method.description}</p>
                <p className="text-lg font-semibold text-blue-600 dark:text-blue-400">{method.details}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* Main Contact Section */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-lg shadow-lg dark:shadow-2xl dark:shadow-black/50 p-8 border border-gray-200 dark:border-gray-700 transition-colors duration-300"
            >
              <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">✉️ Send us a Message</h2>
              {submitted && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="mb-6 p-4 bg-green-100 dark:bg-green-900/30 border-l-4 border-green-500 text-green-700 dark:text-green-300 rounded-lg transition-colors duration-300"
                >
                  ✅ Thank you! We've received your message and will get back to you soon.
                </motion.div>
              )}
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-gray-700 dark:text-gray-300 font-semibold mb-2 transition-colors duration-300">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-white rounded-lg focus:outline-none focus:border-blue-500 dark:focus:border-blue-400 transition-colors duration-300 placeholder-gray-400 dark:placeholder-gray-500"
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-gray-700 dark:text-gray-300 font-semibold mb-2 transition-colors duration-300">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-white rounded-lg focus:outline-none focus:border-blue-500 dark:focus:border-blue-400 transition-colors duration-300 placeholder-gray-400 dark:placeholder-gray-500"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-gray-700 dark:text-gray-300 font-semibold mb-2 transition-colors duration-300">
                    Subject *
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-white rounded-lg focus:outline-none focus:border-blue-500 dark:focus:border-blue-400 transition-colors duration-300 placeholder-gray-400 dark:placeholder-gray-500"
                    placeholder="How can we help?"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-gray-700 dark:text-gray-300 font-semibold mb-2 transition-colors duration-300">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-white rounded-lg focus:outline-none focus:border-blue-500 dark:focus:border-blue-400 transition-colors duration-300 placeholder-gray-400 dark:placeholder-gray-500"
                    placeholder="Tell us more..."
                  />
                </div>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 dark:from-blue-700 dark:to-purple-700 dark:hover:from-blue-800 dark:hover:to-purple-800 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <Send size={20} />
                  Send Message
                </motion.button>
              </form>
            </motion.div>

            {/* Office Info & Hours */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <div className="bg-blue-50 dark:bg-gradient-to-br dark:from-blue-900/30 dark:to-purple-900/30 rounded-lg shadow-lg dark:shadow-2xl dark:shadow-black/50 p-8 mb-6 border border-blue-200 dark:border-blue-800 transition-colors duration-300">
                <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 flex items-center gap-2 transition-colors duration-300">
                  <MapPin size={28} className="text-blue-600 dark:text-blue-400" />
                  Visit Us
                </h3>
                <div className="mb-6">
                  <p className="text-gray-700 dark:text-gray-300 font-semibold mb-2 transition-colors duration-300">Location:</p>
                  <p className="text-gray-600 dark:text-gray-400 transition-colors duration-300">{officeInfo.address}</p>
                </div>

                <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4 flex items-center gap-2 transition-colors duration-300">
                  <Clock size={24} className="text-green-600 dark:text-green-400" />
                  Business Hours
                </h3>
                <div className="space-y-2">
                  {Object.entries(officeInfo.hours).map(([day, time]) => (
                    <div key={day} className="flex justify-between text-gray-700 dark:text-gray-300 transition-colors duration-300">
                      <span className="font-semibold">{day}:</span>
                      <span>{time}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Trust Badge */}
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-lg dark:shadow-2xl dark:shadow-black/50 p-6 text-center border border-gray-200 dark:border-gray-700 transition-colors duration-300"
              >
                <p className="text-4xl mb-2">🏆</p>
                <h4 className="text-lg font-bold text-gray-800 dark:text-white mb-2 transition-colors duration-300">Award Winning</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400 transition-colors duration-300">Trusted by 50,000+ pet owners</p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-gray-800 dark:text-white mb-4 transition-colors duration-300">❓ Frequently Asked Questions</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 transition-colors duration-300">Find answers to common questions below</p>
          </motion.div>

          <div className="max-w-3xl mx-auto space-y-4">
            {faqItems.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                viewport={{ once: true }}
                className="border-2 border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden bg-white dark:bg-gray-800 transition-colors duration-300"
              >
                <button
                  onClick={() => setExpandedFaq(expandedFaq === index ? -1 : index)}
                  className="w-full flex items-center justify-between p-5 hover:bg-blue-50 dark:hover:bg-gray-700 transition-colors duration-300"
                >
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-white text-left transition-colors duration-300">{item.question}</h3>
                  <motion.div
                    animate={{ rotate: expandedFaq === index ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ChevronDown size={24} className="text-blue-600 dark:text-blue-400" />
                  </motion.div>
                </button>

                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{
                    height: expandedFaq === index ? 'auto' : 0,
                    opacity: expandedFaq === index ? 1 : 0,
                  }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="p-5 bg-blue-50 dark:bg-gray-700 border-t-2 border-gray-200 dark:border-gray-600 transition-colors duration-300">
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed transition-colors duration-300">{item.answer}</p>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactUsPage;