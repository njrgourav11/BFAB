"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Phone, MapPin, Clock, MessageCircle, ChevronDown, Send, CheckCircle2 } from 'lucide-react';

const ContactUsPage = () => {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [expandedFaq, setExpandedFaq] = useState<number | null>(0);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setFormData({ name: '', email: '', subject: '', message: '' });
      setSubmitted(false);
    }, 3000);
  };

  const contactMethods = [
    {
      icon: <Mail size={28} />,
      title: 'Email',
      description: 'We reply within 24 hours',
      details: 'paw.support@begginforabite.in',
      color: 'text-blue-500',
      bg: 'bg-blue-50 dark:bg-blue-900/20'
    },
    {
      icon: <Phone size={28} />,
      title: 'Phone',
      description: '24/7 Customer Support',
      details: '+91 8480-320158',
      color: 'text-green-500',
      bg: 'bg-green-50 dark:bg-green-900/20'
    },
    {
      icon: <MessageCircle size={28} />,
      title: 'Live Chat',
      description: 'Chat with our team',
      details: 'Available 9 AM - 9 PM EST',
      color: 'text-purple-500',
      bg: 'bg-purple-50 dark:bg-purple-900/20'
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
    address: 'Taksh Apartment, Bhubaneswar, Odisha - 752050',
    hours: {
      'Monday - Friday': '9 AM - 6 PM EST',
      'Saturday': '10 AM - 4 PM EST',
      'Sunday': 'Closed',
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 transition-colors duration-300 font-sans">

      {/* Hero Section */}
      <section className="bg-slate-900 text-white py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/hero-pattern.svg')] opacity-5"></div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <span className="text-blue-400 font-semibold tracking-wider uppercase text-sm mb-4 block">Contact Us</span>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 tracking-tight">We're Here to Help</h1>
            <p className="text-xl text-gray-400 leading-relaxed">
              Have questions about our products or your order? Reach out to our friendly team.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-12 -mt-16 relative z-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {contactMethods.map((method, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -5 }}
                className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl p-8 text-center border border-gray-100 dark:border-slate-800"
              >
                <div className={`w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-6 ${method.bg} ${method.color}`}>
                  {method.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{method.title}</h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm mb-4">{method.description}</p>
                <p className="text-lg font-semibold text-gray-900 dark:text-white">{method.details}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Main Contact Section */}
      <section className="py-16 bg-gray-50 dark:bg-slate-950">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-2 bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-800 p-8 md:p-10"
            >
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Send us a Message</h2>

              <AnimatePresence>
                {submitted && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mb-8 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl flex items-center gap-3 text-green-800 dark:text-green-300"
                  >
                    <CheckCircle2 size={24} />
                    <span className="font-medium">Thank you! We've received your message and will get back to you soon.</span>
                  </motion.div>
                )}
              </AnimatePresence>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-gray-900 dark:text-white placeholder-gray-400"
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-gray-900 dark:text-white placeholder-gray-400"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-gray-900 dark:text-white placeholder-gray-400"
                    placeholder="How can we help?"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-gray-900 dark:text-white placeholder-gray-400 resize-none"
                    placeholder="Tell us more..."
                  />
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="w-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold py-4 px-8 rounded-xl transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                >
                  <Send size={20} />
                  Send Message
                </motion.button>
              </form>
            </motion.div>

            {/* Office Info & Hours */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-800 p-8">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
                  <MapPin className="text-blue-600 dark:text-blue-400" size={24} />
                  Visit Us
                </h3>
                <div className="mb-8">
                  <p className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-2 uppercase tracking-wider">Location</p>
                  <p className="text-gray-900 dark:text-white font-medium leading-relaxed">{officeInfo.address}</p>
                </div>

                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
                  <Clock className="text-green-600 dark:text-green-400" size={24} />
                  Business Hours
                </h3>
                <div className="space-y-3">
                  {Object.entries(officeInfo.hours).map(([day, time]) => (
                    <div key={day} className="flex justify-between items-center text-sm">
                      <span className="text-gray-500 dark:text-gray-400 font-medium">{day}</span>
                      <span className="text-gray-900 dark:text-white font-semibold">{time}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Trust Badge */}
              <div className="bg-blue-50 dark:bg-slate-900 rounded-2xl p-8 text-center border border-blue-100 dark:border-slate-800">
                <div className="text-4xl mb-4">🏆</div>
                <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Award Winning Service</h4>
                <p className="text-gray-600 dark:text-gray-400 text-sm">Trusted by 50,000+ pet owners for our exceptional support.</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 bg-white dark:bg-slate-950">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">Frequently Asked Questions</h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">Find answers to common questions about shipping, returns, and our products.</p>
          </motion.div>

          <div className="max-w-3xl mx-auto space-y-4">
            {faqItems.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                viewport={{ once: true }}
                className="border border-gray-200 dark:border-slate-800 rounded-xl overflow-hidden bg-gray-50 dark:bg-slate-900"
              >
                <button
                  onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                  className="w-full flex items-center justify-between p-6 hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors text-left"
                >
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white pr-8">{item.question}</h3>
                  <motion.div
                    animate={{ rotate: expandedFaq === index ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ChevronDown size={20} className="text-gray-400" />
                  </motion.div>
                </button>

                <AnimatePresence>
                  {expandedFaq === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="px-6 pb-6 pt-0 text-gray-600 dark:text-gray-400 leading-relaxed">
                        {item.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactUsPage;