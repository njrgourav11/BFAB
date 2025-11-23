"use client";
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import 'swiper/css';
import { Star, ShieldCheck, Truck, Phone, RotateCcw, CheckCircle } from 'lucide-react';
import ClientCarousel from './components/ClientCarousel';



// Sample data for featured products
const featuredProducts = [
  {
    id: 1,
    name: 'BFAB Peanut Butter for Dogs - 500g',
    price: '₹349',
    originalPrice: '₹399',
    images: ['/products/1/20.png', '/products/1/21.png', '/products/1/22.png', '/products/1/23.png', '/products/1/24.png', '/products/1/26.png'],
    rating: 4.9,
    reviews: 328,
    description: 'All-Natural, xylitol-Free | Protein-Rich Treat with Zero preservatives | Perfect for Training, Grooming, Rewards & Snacking',
  },
  {
    id: 2,
    name: 'BFAB Oven Baked Kitten Kibble Dry Cat Food - 1Kg',
    price: '₹599',
    originalPrice: '₹799',
    images: ['/products/3/12.png', '/products/3/14.png', '/products/3/16.png', '/products/3/18.png', '/products/3/9.png'],
    rating: 4.8,
    reviews: 245,
    description: 'Chicken & Ocean Fish | Promotes Brain & Vision Development | Enhances Immunity | Improves Digestive Health',
  },
  {
    id: 3,
    name: 'BFAB Natural Frozen Dog Treats - 2 x 40gm',
    price: '₹99',
    originalPrice: '₹199',
    images: ['/products/2/3.png', '/products/2/4.png', '/products/2/5.png', '/products/2/6.png', '/products/2/7.png', '/products/2/8.png'],
    rating: 5.0,
    reviews: 512,
    description: 'Alphonso Mango & Peanut Butter + Banana | Healthy Dog Treats | No Colour & Flavours | Made with Oat & Coconut Milk',
  },
  {
    id: 4,
    name: 'BFAB Chicken Broth for Cats & Dogs | Zero Preservatives',
    price: '₹349',
    originalPrice: '₹399',
    images: ['/products/4/12.png', '/products/4/13.png', '/products/4/15.png', '/products/4/17.png', '/products/4/19.png'],
    rating: 4.9,
    reviews: 187,
    description: 'Zero Preservatives | Aids Joint Health and Digestion | Collagen Rich | Human Grade, Natural Wet Dog Food | Bone Broth',
  },
];



// Sample data for testimonials/reviews
const testimonials = [
  {
    id: 1,
    name: 'Noah the beagle',
    comment: 'Food with Hemp oil drops, ever since I started using Hemp seed oil of @begginforabite Noah\'s appetite has noticeably increased! She now enjoys her meals with excitement, making mealtime a happy and satisfying moment for both of us. A small addition with big benefits, healthy, happy, and always ready for her next bite! This is not a paid promotion or collaboration just my genuine review after using Hemp seed oil of Beggin For A Bite for Noah. I\'ve noticed a real difference in her appetite, and it\'s been amazing to see her enjoy her meals more.',
    avatar: '/review/3.svg',
    pet: 'Beagle',
    rating: 5,
    verified: true,
  },
  {
    id: 2,
    name: 'Binit Soreng',
    comment: "My pup Berry's overall health and skin condition improved drastically after using this supplement for just 5 weeks. Earlier, he struggled with ticks, dry skin, and excessive hair fall. But after starting this Ashwagandha + Hemp Protein supplement, his coat became healthier, his skin improved, and the shedding reduced a lot. This has now become Berry's everyday supplement, and I couldn't be happier with the results! I highly recommend it to all pet parents looking for natural health solutions. Definitely worth giving a try!",
    avatar: '/review/Golden-Retriever.webp',
    pet: 'Dog',
    rating: 5,
    verified: true,
  },
  {
    id: 3,
    name: 'Sudeshna Jena',
    comment: 'I honestly didn\'t expect such a big difference, but these supplements have been a blessing for my pet. What I love the most is how clean and natural the ingredients are, it gives me peace of mind every time I use it. And the best part? My pupper actually enjoys it! No more forcing or mixing tricks… he happily finishes every meal when this is added on top. It\'s super easy to use and fits perfectly into our daily routine. Truly worth it. I\'d happily recommend it to any pet parent who wants real, visible improvements.',
    avatar: '/review/2.svg',
    pet: 'Dog',
    rating: 5,
    verified: true,
  },
];

export default function Home() {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center text-white overflow-hidden">
        {/* Mobile Background */}
        <div className="absolute inset-0 bg-cover bg-center bg-no-repeat md:hidden" style={{ backgroundImage: 'url("/images/mobile.png")' }}></div>
        {/* Desktop Background */}
        <div className="absolute inset-0 bg-cover bg-center bg-no-repeat hidden md:block" style={{ backgroundImage: 'url("/hero.svg")' }}></div>
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

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
            {featuredProducts.slice(0, 4).map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                viewport={{ once: true }}
                className="group"
              >
                <Link href={`/products/${product.id}`} className="block h-full">
                  <div className="rounded-2xl p-4 sm:p-6 text-center bg-white dark:bg-slate-900 h-full flex flex-col hover:-translate-y-2 hover:shadow-2xl transition-all duration-300 cursor-pointer border border-transparent hover:border-gray-100 dark:hover:border-slate-800">
                    <div className="relative mb-4 overflow-hidden rounded-xl bg-gray-50 dark:bg-slate-800 aspect-square group-hover:shadow-inner transition-all duration-300">
                      <Image
                        src={product.images[0]}
                        alt={product.name}
                        fill
                        className="object-contain p-4 group-hover:scale-110 transition duration-500"
                      />

                      {/* Quick Add Overlay (Optional Idea) */}
                      <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                    </div>

                    <h3 className="text-lg sm:text-xl font-bold text-gray-800 dark:text-gray-100 mb-2 line-clamp-2">{product.name}</h3>

                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-4 line-clamp-2">{product.description}</p>

                    {/* Rating */}
                    <div className="flex items-center justify-center mb-4">
                      <div className="flex text-yellow-400 gap-0.5">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} size={14} fill="currentColor" />
                        ))}
                      </div>
                      <span className="ml-2 text-xs font-medium text-gray-500 dark:text-gray-400">
                        ({product.reviews} reviews)
                      </span>
                    </div>

                    <div className="mt-auto">
                      <div className="flex items-center justify-center gap-3 mb-4">
                        <p className="text-sm text-gray-400 dark:text-gray-500 line-through">₹{product.originalPrice}</p>
                        <p className="text-2xl font-extrabold text-gray-900 dark:text-white">{product.price}</p>
                      </div>

                      <div className="w-full bg-gray-900 dark:bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-gray-800 dark:hover:bg-blue-700 transition-colors duration-300 shadow-md">
                        View Details
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <Link
              href="/shop-now"
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
              { name: 'Dental Health', image: '/category/10.svg', href: '/shop-now' },
              { name: 'Gut Health', image: '/category/11.svg', href: '/shop-now' },
              { name: 'Hip & Joint', image: '/category/12.svg', href: '/shop-now' },
              { name: 'Weight Control', image: '/category/13.svg', href: '/shop-now' },
              { name: 'Anxiety Relief', image: '/category/14.svg', href: '/shop-now' },
              { name: 'Skin & Coat', image: '/category/15.svg', href: '/shop-now' }
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
              href="/shop-now"
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

      <section className="py-12 sm:py-16 md:py-20 bg-white dark:bg-slate-800 transition-colors duration-300">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-gray-100 mb-4">Real Pets, Real Transformations!</h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">Join thousands of happy pet parents</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {testimonials.slice(0, 3).map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="flex flex-col items-center"
              >
                {/* Review Card */}
                <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 dark:border-slate-800 w-full mb-8 min-h-[280px] sm:min-h-[320px] flex flex-col relative group">

                  {/* Decorative Quote Icon */}
                  <div className="absolute top-4 right-6 text-6xl text-gray-100 dark:text-slate-800 font-serif opacity-50 group-hover:opacity-100 transition-opacity duration-300">
                    &rdquo;
                  </div>

                  {/* Stars in Card */}
                  <div className="p-6 pb-0 flex justify-center">
                    <div className="flex gap-1 bg-yellow-50 dark:bg-yellow-900/20 px-4 py-2 rounded-full">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={16} fill="#fbbf24" stroke="#fbbf24" />
                      ))}
                    </div>
                  </div>

                  {/* Review Comment */}
                  <div className="p-6 sm:p-8 flex-1 flex items-center justify-center">
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed italic text-center text-base sm:text-lg font-medium">
                      &ldquo;{testimonial.comment}&rdquo;
                    </p>
                  </div>
                </div>

                {/* Separated Round Avatar Below */}
                <div className="relative">
                  {/* Pointer Arrow */}
                  <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-b-8 border-transparent border-b-yellow-300 dark:border-b-yellow-400"></div>

                  <div className="w-20 h-20 rounded-full border-4 border-yellow-300 dark:border-yellow-400 shadow-lg overflow-hidden bg-white dark:bg-slate-800">
                    <Image
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      width={80}
                      height={80}
                      className="w-full h-full object-cover scale-150"
                    />
                  </div>

                  {/* User Name and Info Below Avatar */}
                  <div className="text-center mt-3">
                    <p className="font-bold text-gray-800 dark:text-gray-100 text-sm">{testimonial.name}</p>
                    <p className="text-xs text-gray-600 dark:text-gray-400 flex items-center justify-center gap-1 mb-2">
                    </p>
                    {testimonial.verified && (
                      <div className="flex items-center justify-center gap-1 bg-green-100 dark:bg-green-900 px-3 py-1 rounded-full">
                        <CheckCircle size={12} className="text-green-600 dark:text-green-400" />
                        <span className="text-xs font-semibold text-green-600 dark:text-green-400">Verified</span>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* View All Reviews Button */}
          {/* <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <Link
              href="#"
              className="bg-gradient-to-r from-blue-600 to-blue-700 dark:from-blue-700 dark:to-blue-800 hover:from-blue-700 hover:to-blue-800 dark:hover:from-blue-600 dark:hover:to-blue-700 text-white py-3 px-10 rounded-full font-semibold transition duration-300 inline-block shadow-lg hover:shadow-xl"
            >
              View All Reviews (3,100+)
            </Link>
          </motion.div> */}
        </div>
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
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="overflow-x-auto pb-4">
              <div className="flex gap-4 sm:gap-6 w-max">
                {[
                  { name: "Buddy", instagram: "@buddy_the_golden", breed: "Golden Retriever" },
                  { name: "Luna", instagram: "@luna_loves_bfab", breed: "Husky" },
                  { name: "Max", instagram: "@max_the_beagle", breed: "Beagle" },
                  { name: "Bella", instagram: "@bella_bfab_fan", breed: "Labrador" },
                  { name: "Charlie", instagram: "@charlie_healthy_pup", breed: "Poodle" },
                  { name: "Daisy", instagram: "@daisy_nutrition", breed: "Border Collie" },
                  { name: "Rocky", instagram: "@rocky_strong_dog", breed: "German Shepherd" },
                  { name: "Milo", instagram: "@milo_bfab_journey", breed: "French Bulldog" }
                ].map((pet, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex-shrink-0 group cursor-pointer"
                  >
                    <a
                      href={`https://instagram.com/${pet.instagram.replace('@', '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block"
                    >
                      <div className="relative bg-white dark:bg-slate-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 p-4 border-2 border-transparent hover:border-pink-300 dark:hover:border-pink-600 group-hover:scale-105">
                        {/* Pet Image */}
                        <div className="relative w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 rounded-xl overflow-hidden bg-gradient-to-br from-pink-100 to-purple-100 dark:from-pink-900/30 dark:to-purple-900/30">
                          <div className="w-full h-full bg-gradient-to-br from-pink-200 to-purple-200 dark:from-pink-800 dark:to-purple-800 flex items-center justify-center text-4xl sm:text-5xl md:text-6xl">
                            🐶
                          </div>
                          {/* Instagram Icon Overlay */}
                          <div className="absolute top-2 right-2 bg-gradient-to-r from-pink-500 to-purple-600 text-white p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                            </svg>
                          </div>
                        </div>

                        {/* Pet Info */}
                        <div className="mt-3 text-center">
                          <h3 className="font-bold text-gray-800 dark:text-gray-100 text-sm sm:text-base">{pet.name}</h3>
                          <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mb-1">{pet.breed}</p>
                          <p className="text-xs sm:text-sm font-semibold text-pink-600 dark:text-pink-400 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                            {pet.instagram}
                          </p>
                        </div>

                        {/* Hover Effect */}
                        <div className="absolute inset-0 bg-gradient-to-t from-pink-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>
                      </div>
                    </a>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Scroll Indicators */}
            <div className="flex justify-center mt-6 gap-2">
              <div className="text-gray-400 dark:text-gray-600 text-sm flex items-center gap-2">
                <span>←</span>
                <span>Scroll to see more pets</span>
                <span>→</span>
              </div>
            </div>
          </motion.div>

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
                href="/shop-now"
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
