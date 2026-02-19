"use client";
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import { ShieldCheck, Truck, Phone, RotateCcw } from 'lucide-react';
import { ProductRevealCard } from '@/components/ui/product-reveal-card';
import { ProfileCard } from '@/components/ui/profile-card';
import { useCart } from './components/CartContext';
import { Product } from '@/lib/types';
import { useEffect, useState } from 'react';

const ClientCarousel = dynamic(() => import('./components/ClientCarousel'), {
  ssr: false,
  loading: () => <div className="h-40 animate-pulse rounded-2xl bg-gray-100 dark:bg-slate-800" />,
});

const TestimonialSlider = dynamic(() => import('@/components/ui/testimonial-slider'), {
  ssr: false,
  loading: () => <div className="h-80 animate-pulse rounded-2xl bg-gray-100 dark:bg-slate-800" />,
});

export default function Home() {
  const { addToCart } = useCart();
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    const fetchProducts = async () => {
      try {
        const { getAllProducts } = await import('@/lib/product-utils');
        const data = await getAllProducts();
        if (mounted) {
          setFeaturedProducts(data.slice(0, 4));
        }
      } catch (error) {
        console.error("Failed to fetch products", error);
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    fetchProducts();

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <div>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center text-white overflow-hidden">
        <Link href="/products" className="absolute inset-0 block cursor-pointer z-0">
          {/* Mobile Background */}
          <div className="absolute inset-0 bg-cover bg-center bg-no-repeat md:hidden" style={{ backgroundImage: 'url("/images/mobile.png")' }}></div>
          {/* Desktop Background */}
          <div className="absolute inset-0 bg-cover bg-center bg-no-repeat hidden md:block" style={{ backgroundImage: 'url("/hero.svg")' }}></div>
        </Link>
        {/* Overlay for better text readability */}

        {/* Animated Background Elements - Optimized for Mobile */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-10 left-10 w-40 h-40 sm:w-56 sm:h-56 md:w-72 md:h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-2xl sm:blur-3xl opacity-20 animate-pulse dark:opacity-10"></div>
          <div className="absolute top-20 right-10 w-40 h-40 sm:w-56 sm:h-56 md:w-72 md:h-72 bg-purple-400 rounded-full mix-blend-multiply filter blur-2xl sm:blur-3xl opacity-20 animate-pulse dark:opacity-10" style={{ animationDelay: '2s' }}></div>
          <div className="hidden sm:block absolute bottom-10 left-40 w-40 h-40 sm:w-56 sm:h-56 md:w-72 md:h-72 bg-pink-400 rounded-full mix-blend-multiply filter blur-2xl sm:blur-3xl opacity-20 animate-pulse dark:opacity-10" style={{ animationDelay: '4s' }}></div>
        </div>


      </section>

      <section className="py-12 sm:py-16 md:py-20 bg-gray-50 dark:bg-slate-950 transition-colors duration-300">
        <ClientCarousel />
      </section>

      {/* Featured Products Section */}
      <section className="py-12 sm:py-16 md:py-20 bg-[#fef6eb] dark:bg-slate-950 transition-colors duration-300">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800 dark:text-gray-100 mb-4">Featured Products</h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-400">Our bestsellers loved by pet owners everywhere</p>
          </motion.div>

          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
              {[1, 2, 3, 4].map((item) => (
                <div key={item} className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                  <div className="mb-4 h-48 animate-pulse rounded-xl bg-gray-200 dark:bg-slate-700" />
                  <div className="mb-2 h-4 w-2/3 animate-pulse rounded bg-gray-200 dark:bg-slate-700" />
                  <div className="h-4 w-1/2 animate-pulse rounded bg-gray-200 dark:bg-slate-700" />
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
              {featuredProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.15 }}
                  viewport={{ once: true }}
                  className="group flex justify-center"
                >
                  <ProductRevealCard
                    id={product.id}
                    name={product.name}
                    price={String(product.price)} // Ensure string
                    originalPrice={product.originalPrice ? String(product.originalPrice) : undefined}
                    image={product.images && product.images.length > 0 ? product.images[0] : '/placeholder.png'}
                    description={product.description ? (product.description.length > 100 ? product.description.substring(0, 100) + '...' : product.description) : ''}
                    rating={product.rating || 0}
                    reviewCount={product.reviews || 0}
                    onAdd={() => addToCart({
                      id: product.id,
                      name: product.name,
                      price: String(product.price), // Cart expects string
                      image: product.images && product.images.length > 0 ? product.images[0] : '/placeholder.png',
                      petType: product.petType,
                      productCategory: product.productCategory
                    })}
                    className="w-full max-w-[320px]"
                  />
                </motion.div>
              ))}
            </div>
          )}

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <Link
              href="/products"
              className="bg-gray-800 dark:bg-gray-700 hover:bg-gray-900 dark:hover:bg-gray-600 text-white py-3 px-8 rounded-full font-semibold transition duration-300 inline-block"
            >
              View All Products
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Shop by Category Section */}
      <section className="py-12 sm:py-16 md:py-20 bg-gradient-to-b from-blue-50 to-purple-50 dark:from-slate-900 dark:to-slate-900 transition-colors duration-300 relative overflow-hidden">
        {/* Background Decorative Elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-10 left-10 w-64 h-64 bg-blue-200/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-64 h-64 bg-purple-200/20 rounded-full blur-3xl"></div>
        </div>

        <div className="container mx-auto px-4 md:px-6 relative">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800 dark:text-gray-100 mb-4">Shop by Concern</h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-400">Targeted solutions for your pet's specific needs</p>
          </motion.div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 sm:gap-8">
            {[
              { name: 'Dental Health', image: '/category/10.svg', href: '/products' },
              { name: 'Gut Health', image: '/category/11.svg', href: '/products' },
              { name: 'Hip & Joint', image: '/category/12.svg', href: '/products' },
              { name: 'Weight Control', image: '/category/13.svg', href: '/products' },
              { name: 'Anxiety Relief', image: '/category/14.svg', href: '/products' },
              { name: 'Skin & Coat', image: '/category/15.svg', href: '/products' }
            ].map((category, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group"
              >
                <Link href={category.href} className="block flex flex-col items-center">
                  <div className="relative p-1 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 dark:from-slate-800 dark:to-slate-700 group-hover:from-blue-400 group-hover:to-purple-500 transition-all duration-500 shadow-lg group-hover:shadow-2xl">
                    <div className="relative overflow-hidden rounded-full w-28 h-28 sm:w-36 sm:h-36 md:w-40 md:h-40 border-4 border-white dark:border-slate-900 bg-white dark:bg-slate-800">
                      <Image
                        src={category.image}
                        alt={category.name}
                        fill
                        className="object-cover group-hover:scale-110 transition duration-700"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300"></div>
                    </div>
                  </div>

                  <div className="mt-4 text-center">
                    <h3 className="text-sm sm:text-base font-bold text-gray-800 dark:text-gray-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                      {category.name}
                    </h3>
                    <div className="h-1 w-0 bg-blue-500 mx-auto mt-1 group-hover:w-1/2 transition-all duration-300 rounded-full"></div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative py-24 bg-gradient-to-b from-orange-50 via-yellow-50 to-orange-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 overflow-hidden">

        {/* Floating Paws */}
        <div className="pointer-events-none absolute inset-0 opacity-[0.07]">
          <div className="absolute top-20 left-20 text-7xl animate-[float_6s_infinite_ease-in-out]">🐾</div>
          <div className="absolute bottom-10 right-32 text-7xl animate-[float_7s_infinite_ease-in-out]">🦴</div>
        </div>

        <div className="container mx-auto px-6 relative">

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-4xl mx-auto px-4"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-800 dark:text-gray-100 leading-tight">
              Why <span className="text-green-600">BFAB</span> is the Best Choice for Your Pet .
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-400 mt-3 sm:mt-4 leading-relaxed">
              A clean, science-backed and pet-approved supplement vs mass-market shortcuts.
            </p>
          </motion.div>


          {/* Split Cards */}
          <div className="mt-12 sm:mt-16 md:mt-20 grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12">

            {/* BFAB Block */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative p-6 sm:p-8 lg:p-10 bg-gradient-to-br from-green-50 to-blue-50 dark:from-green-900/30 dark:to-blue-900/20 rounded-2xl sm:rounded-3xl shadow-xl border-2 sm:border-4 border-green-300 dark:border-green-700"
            >
              <div className="absolute -top-3 sm:-top-4 lg:-top-6 left-4 sm:left-6 bg-green-500 text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-full font-semibold text-xs sm:text-sm shadow">
                🏆 BFAB Advantage
              </div>

              <div className="text-center mb-4 sm:mb-6 mt-4 sm:mt-6">
                {/* Responsive Image */}
                <div className="mx-auto rounded-xl sm:rounded-2xl overflow-hidden shadow-lg sm:shadow-xl border-2 border-green-400 bg-white dark:bg-slate-800 w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 lg:w-48 lg:h-48 xl:w-52 xl:h-52 transition-all duration-300 hover:scale-105">
                  <Image
                    src="/other/2.png"
                    alt="BFAB Product"
                    width={500}
                    height={500}
                    className="object-cover w-full h-full"
                  />
                </div>

                <p className="mt-2 sm:mt-3 text-sm sm:text-base text-green-700 font-semibold dark:text-green-300">
                  Premium Pet Nutrition
                </p>
              </div>

            </motion.div>

            {/* Other Brand Block */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative p-6 sm:p-8 lg:p-10 bg-gradient-to-br from-red-50 to-orange-50 dark:from-red-900/30 dark:to-orange-900/20 rounded-2xl sm:rounded-3xl shadow-xl border-2 sm:border-4 border-red-300 dark:border-red-700"
            >
              <div className="absolute -top-3 sm:-top-4 lg:-top-6 right-4 sm:right-6 bg-red-500 text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-full font-semibold text-xs sm:text-sm shadow">
                ⚠️ Common Issues
              </div>

              <div className="text-center mb-4 sm:mb-6 mt-4 sm:mt-6">
                {/* Responsive Image */}
                <div className="mx-auto rounded-xl sm:rounded-2xl overflow-hidden shadow-lg sm:shadow-xl border-2 border-red-400 bg-white dark:bg-slate-800 w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 lg:w-48 lg:h-48 xl:w-52 xl:h-52 opacity-95 transition-all duration-300 hover:scale-105">
                  <Image
                    src="/other/1.png"
                    alt="Other Brand Product"
                    width={500}
                    height={500}
                    className="object-cover w-full h-full"
                  />
                </div>

                <p className="mt-2 sm:mt-3 text-sm sm:text-base text-red-600 font-semibold dark:text-red-400">
                  Mass Market Brands
                </p>
              </div>

            </motion.div>

          </div>



          {/* Responsive Comparison Table */}
          <div className="mt-16 sm:mt-20 md:mt-24 bg-white dark:bg-slate-800 rounded-3xl shadow-2xl overflow-hidden border border-gray-100 dark:border-slate-700">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[600px] text-left border-collapse">
                <thead>
                  <tr className="bg-gradient-to-r from-gray-900 to-gray-800 dark:from-slate-950 dark:to-slate-900 text-white">
                    <th className="py-5 sm:py-6 px-6 sm:px-8 text-left font-bold text-sm sm:text-base tracking-wide uppercase">Features</th>
                    <th className="py-5 sm:py-6 px-6 sm:px-8 text-center font-bold text-green-400 text-sm sm:text-base tracking-wide uppercase bg-green-900/20">BFAB 🐾</th>
                    <th className="py-5 sm:py-6 px-6 sm:px-8 text-center font-bold text-red-400 text-sm sm:text-base tracking-wide uppercase">Others ❌</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-slate-700">
                  {[
                    { label: "Human-Grade, Natural Ingredients", bfab: "✔️", other: "✗" },
                    { label: "Vet-Approved & Certified (HACCP, ISO, GMP)", bfab: "✔️", other: "✗" },
                    { label: "Zero Fillers or Artificial Additives", bfab: "✔️", other: "✗" },
                    { label: "High-Potency Functional Blends", bfab: "✔️", other: "⚠️ Inconsistent" },
                    { label: "Targeted Relief for Real Conditions", bfab: "✔️", other: "⚠️ Symptom-Based Only" },
                    { label: "Backed by Research & Evidence", bfab: "✔️", other: "✗ Outdated Formulas" }
                  ].map((row, i) => (
                    <tr key={i} className="group hover:bg-gray-50 dark:hover:bg-slate-700/30 transition-colors duration-200">
                      <td className="py-4 sm:py-5 px-6 sm:px-8 font-medium text-gray-700 dark:text-gray-200 text-sm sm:text-base group-hover:text-gray-900 dark:group-hover:text-white transition-colors">{row.label}</td>
                      <td className="py-4 sm:py-5 px-6 sm:px-8 text-center text-lg sm:text-xl font-bold text-green-600 dark:text-green-400 bg-green-50/50 dark:bg-green-900/10 group-hover:bg-green-100/50 dark:group-hover:bg-green-900/20 transition-colors">{row.bfab}</td>
                      <td className="py-4 sm:py-5 px-6 sm:px-8 text-center text-sm sm:text-base font-semibold text-red-500 dark:text-red-400 opacity-80">{row.other}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>


          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mt-12 sm:mt-16 lg:mt-20 text-center px-4"
          >
            <Link
              href="/products"
              className="inline-block bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700 text-white font-bold text-sm sm:text-base lg:text-lg py-3 sm:py-4 px-6 sm:px-8 lg:px-10 rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
            >
              Shop BFAB Now – Give Your Pet the Best!
            </Link>
          </motion.div>

        </div>
      </section>

      {/* Vet Reviewed Section */}
      <section className="relative py-16 sm:py-20 md:py-24 lg:py-28 bg-white dark:bg-slate-900 overflow-hidden">

        {/* Background Accents */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-10 left-10 w-56 h-56 bg-blue-400/10 rounded-3xl blur-3xl"></div>
          <div className="absolute bottom-0 right-10 w-72 h-72 bg-purple-300/10 rounded-3xl blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto px-6 lg:px-10 relative">

          {/* Section Heading */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-center mb-20"
          >
            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-gray-100 tracking-tight">
              Recommended & Trusted By
              <span className="ml-2 text-green-600 dark:text-green-400">Veterinary Experts</span>
            </h2>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Backed by clinical evaluation, expert certification, and strict ingredient quality checks.
            </p>
          </motion.div>

          {/* Main Content Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

            {/* Left: Improved Circular Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="flex justify-center"
            >
              <div className="relative w-[260px] h-[260px] md:w-[340px] md:h-[340px] flex items-center justify-center">

                {/* Glow Halo */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-br 
            from-green-400/20 via-emerald-400/10 to-teal-300/20 blur-3xl">
                </div>

                {/* Outer Gradient Ring */}
                <div className="relative w-full h-full rounded-full p-[6px] 
            bg-gradient-to-br from-green-500 to-emerald-500 shadow-xl">

                  {/* Glass Inner Middle Ring */}
                  <div className="w-full h-full rounded-full backdrop-blur-xl bg-white/20 dark:bg-white/5 p-[6px]">

                    {/* INNER IMAGE CIRCLE */}
                    <div className="w-full h-full rounded-full overflow-hidden relative border-4 
                border-white/60 dark:border-slate-800 shadow-lg">

                      <Image
                        src="/vet.png"
                        alt="Veterinarian"
                        fill
                        sizes="(max-width: 768px) 260px, 340px"
                        className="object-cover object-[center_40%]  rounded-full"
                      />
                    </div>
                  </div>
                </div>

                {/* Verified Badge */}
                <div className="absolute -bottom-3 right-2 bg-green-600 text-white p-3 rounded-full shadow-lg">
                  <ShieldCheck size={28} />
                </div>

              </div>
            </motion.div>

            {/* Right: Testimonial */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <div className="relative bg-white/70 dark:bg-white/5 backdrop-blur-xl rounded-3xl shadow-xl p-10 
          border border-white/50 dark:border-white/10">

                {/* Accent Line */}
                <div className="absolute left-0 top-8 w-1 h-24 bg-gradient-to-b from-green-500 to-emerald-500 rounded-full"></div>

                <div className="ml-6">
                  <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-800 dark:text-gray-200 italic leading-relaxed font-medium">
                    “As an experienced veterinarian, I confidently recommend Beggin For A Bite products. Every formula is thoroughly assessed and certified, ensuring only the finest-quality ingredients are used. These supplements provide excellent support for improving and maintaining your dog’s or cat’s health, especially when they begin to show signs of decline.”
                  </p>

                  <div className="mt-6 pt-4 border-t border-gray-200/40 dark:border-gray-700/60">
                    <p className="text-lg font-bold text-green-700 dark:text-green-400">
                      Dr. Lokhnath Mishra
                    </p>
                    <p className="text-sm text-green-600 dark:text-green-500">
                      MVSc — Veterinary Consultant
                    </p>
                  </div>
                </div>

              </div>
            </motion.div>

          </div>
        </div>
      </section>

      <section className="bg-white dark:bg-slate-800 transition-colors duration-300">
        <TestimonialSlider />
      </section>

      <section className="py-12 sm:py-16 md:py-20 bg-gradient-to-br from-pink-50/50 via-white to-purple-50/50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 relative overflow-hidden">
        {/* Abstract Background Shapes */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-24 -left-24 w-96 h-96 bg-pink-200/20 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-purple-200/20 rounded-full blur-3xl"></div>
        </div>

        <div className="container mx-auto px-4 md:px-6 relative">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800 dark:text-gray-100 mb-4">
              Want to Get Featured?
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Share your pet's BFAB journey and get featured on our page! Follow these amazing pets already loving BFAB
            </p>
          </motion.div>

          {/* Scrollable Pet Gallery */}
          <div className="relative mt-12">
            {/* Profile Card Grid */}
            <div className="flex flex-row overflow-x-auto pb-8 gap-6 px-4 snap-x snap-mandatory scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600">
              {[
                {
                  name: "Buddy",
                  breed: "Golden Retriever • 50k",
                  followers: 50400,
                  following: 120,
                  image: "https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&q=80&w=800",
                  isVerified: true
                },
                {
                  name: "Luna",
                  breed: "Husky • 32k",
                  followers: 32100,
                  following: 450,
                  image: "https://images.unsplash.com/photo-1537151608828-ea2b11777ee8?auto=format&fit=crop&q=80&w=800",
                  isVerified: true
                },
                {
                  name: "Charlie",
                  breed: "Poodle • 28k",
                  followers: 28900,
                  following: 89,
                  image: "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&q=80&w=800",
                  isVerified: false
                },
                {
                  name: "Max",
                  breed: "Beagle • 45k",
                  followers: 45200,
                  following: 230,
                  image: "https://images.unsplash.com/photo-1537151625747-768eb6cf92b2?auto=format&fit=crop&q=80&w=800",
                  isVerified: true
                },
                {
                  name: "Daisy",
                  breed: "Border Collie • 12k",
                  followers: 12500,
                  following: 56,
                  image: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&q=80&w=800",
                  isVerified: false
                },
                {
                  name: "Rocky",
                  breed: "German Shepherd • 67k",
                  followers: 67800,
                  following: 112,
                  image: "https://images.unsplash.com/photo-1589941013453-ec89f33b5e95?auto=format&fit=crop&q=80&w=800",
                  isVerified: true
                },
                {
                  name: "Milo",
                  breed: "French Bulldog • 89k",
                  followers: 89200,
                  following: 15,
                  image: "https://images.unsplash.com/photo-1583512603805-3cc6b41f3edb?auto=format&fit=crop&q=80&w=800",
                  isVerified: true
                },
                {
                  name: "Bella",
                  breed: "Labrador • 34k",
                  followers: 34500,
                  following: 340,
                  image: "https://images.unsplash.com/photo-1591769225440-811ad7d6eca6?auto=format&fit=crop&q=80&w=800",
                  isVerified: false
                }
              ].map((pet, index) => (
                <div
                  key={index}
                  className="flex-shrink-0 snap-center"
                >
                  <ProfileCard
                    name={pet.name}
                    description={pet.breed}
                    image={pet.image}
                    isVerified={pet.isVerified}
                    followers={pet.followers}
                    following={pet.following}
                    className=""
                  />
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* Trust Guarantees Section */}
      <section className="py-12 sm:py-16 md:py-20 bg-[#fef6eb] dark:bg-slate-950 transition-colors duration-300">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-gray-100 mb-4">Why Shop With Confidence</h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">We&apos;ve got you covered every step of the way</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Truck,
                title: '🚚 Free Shipping',
                description: 'Free delivery on all orders over ₹999. Fast and secure shipping to your doorstep.',
                color: 'from-blue-500 to-blue-600',
              },
              {
                icon: Phone,
                title: '📞 24/7 Customer Support',
                description: 'Our dedicated team is here to help. Get expert advice and quick responses anytime.',
                color: 'from-green-500 to-green-600',
              },
              {
                icon: RotateCcw,
                title: '✅ 90-Day Money Back Guarantee',
                description: 'Not satisfied? Get a full refund within 90 days. We want you and your pet 100% happy.',
                color: 'from-purple-500 to-purple-600',
              },
            ].map((guarantee, index) => {
              const IconComponent = guarantee.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="text-center p-8 rounded-2xl bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group"
                >
                  <div className={`bg-gradient-to-br ${guarantee.color} text-white w-16 h-16 rounded-2xl rotate-3 group-hover:rotate-6 transition-transform duration-300 flex items-center justify-center mx-auto mb-6 shadow-lg`}>
                    <IconComponent size={32} />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-3">{guarantee.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-sm sm:text-base">{guarantee.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="relative py-20 sm:py-24 md:py-32 bg-[#fef6eb] dark:bg-slate-950 transition-colors duration-300 overflow-hidden">

        {/* Decorative Background Elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-full opacity-30 dark:opacity-10"
            style={{ backgroundImage: 'radial-gradient(#cbd5e1 1px, transparent 1px)', backgroundSize: '30px 30px' }}>
          </div>
          <div className="absolute -top-20 -right-20 w-96 h-96 bg-yellow-300/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-orange-300/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        </div>

        <div className="container mx-auto px-4 md:px-6 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-gray-900 dark:text-white mb-6 tracking-tight">
              Ready to Transform Your <br className="hidden sm:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-yellow-500">
                Pet&apos;s Health?
              </span>
            </h2>

            <p className="text-lg sm:text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-10 max-w-2xl mx-auto leading-relaxed">
              Join thousands of happy pet owners who have already made the switch to premium, science-backed nutrition.
            </p>

            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                href="/products"
                className="inline-flex items-center gap-2 bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-bold py-4 px-10 rounded-full text-lg sm:text-xl shadow-2xl hover:shadow-orange-500/20 transition-all duration-300"
              >
                Start Shopping Now
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
