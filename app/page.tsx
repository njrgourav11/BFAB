"use client";
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import 'swiper/css';
import { Globe, Star, Gift, Beaker, Award, Heart, ShieldCheck, Leaf, Truck, Phone, RotateCcw, CheckCircle } from 'lucide-react';
import FeatureCard from './components/FeatureCard';
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
    images: ['/products/2/3.png', '/products/2/4.png', '/products/2/5.png', '/products/2/6.png', '/products/2/7.png', '/products/2/8.png'],
    rating: 4.8,
    reviews: 245,
    description: 'Chicken & Ocean Fish | Promotes Brain & Vision Development | Enhances Immunity | Improves Digestive Health',
  },
  {
    id: 3,
    name: 'BFAB Natural Frozen Dog Treats - 2 x 40gm',
    price: '₹99',
    originalPrice: '₹199',
    images: ['/products/3/12.png', '/products/3/14.png', '/products/3/16.png', '/products/3/18.png', '/products/3/9.png'],
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

// Featured Pets Gallery
const featuredPets = [
  {
    id: 1,
    name: 'Max',
    breed: 'Golden Retriever',
    image: 'https://images.unsplash.com/photo-1552053831-71594a27632d?w=300&h=300&fit=crop',
    testimonial: 'Thriving on Premium Dog Food',
  },
  {
    id: 2,
    name: 'Luna',
    breed: 'Persian Cat',
    image: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=300&h=300&fit=crop',
    testimonial: 'Loves the Organic Cat Food',
  },
  {
    id: 3,
    name: 'Charlie',
    breed: 'Labrador Puppy',
    image: 'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=300&h=300&fit=crop',
    testimonial: 'Growing Strong & Healthy',
  },
  {
    id: 4,
    name: 'Bella',
    breed: 'Siamese Cat',
    image: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=300&h=300&fit=crop',
    testimonial: 'Happy & Full of Energy',
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
    avatar: '/review/golden-retriever.webp',
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

// Hero features
const heroFeatures = [
  {
    icon: <Globe size={28} />,
    title: 'Globally Sourced',
    description: 'Premium ingredients from trusted suppliers worldwide',
  },
  {
    icon: <Star size={28} />,
    title: '3100+ 5-Star Reviews',
    description: 'Loved by pet owners everywhere',
  },
  {
    icon: <Gift size={28} />,
    title: 'Subscribe & Save',
    description: 'Get 15% off on recurring orders',
  },
  {
    icon: <Beaker size={28} />,
    title: 'Formulated by Pet Scientists',
    description: 'Researched and tested for optimal nutrition',
  },
];

export default function Home() {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center text-white overflow-hidden bg-cover bg-center bg-no-repeat" style={{ backgroundImage: 'url("/hero.svg")' }}>
        <div className="absolute inset-0 bg-cover bg-center bg-no-repeat hidden md:block" style={{ backgroundImage: 'url("/images/Untitled design (24).png")' }}></div>
        {/* Overlay for better text readability */}

        {/* Animated Background Elements - Optimized for Mobile */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-10 left-10 w-40 h-40 sm:w-56 sm:h-56 md:w-72 md:h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-2xl sm:blur-3xl opacity-20 animate-pulse dark:opacity-10"></div>
          <div className="absolute top-20 right-10 w-40 h-40 sm:w-56 sm:h-56 md:w-72 md:h-72 bg-purple-400 rounded-full mix-blend-multiply filter blur-2xl sm:blur-3xl opacity-20 animate-pulse dark:opacity-10" style={{ animationDelay: '2s' }}></div>
          <div className="hidden sm:block absolute bottom-10 left-40 w-40 h-40 sm:w-56 sm:h-56 md:w-72 md:h-72 bg-pink-400 rounded-full mix-blend-multiply filter blur-2xl sm:blur-3xl opacity-20 animate-pulse dark:opacity-10" style={{ animationDelay: '4s' }}></div>
        </div>
      </section>

      {/* Hero Features Section */}
      <section className="py-16 bg-[#fef6eb] dark:bg-slate-900 transition-colors duration-300">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {heroFeatures.map((feature, index) => (
              <FeatureCard
                key={index}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
                delay={index * 0.1}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-20 bg-[#fef6eb] dark:bg-slate-950 transition-colors duration-300">
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
                  <div className="border border-gray-200 dark:border-slate-700 rounded-lg p-4 sm:p-6 text-center shadow-lg hover:shadow-2xl transition duration-300 bg-white dark:bg-slate-900 h-full flex flex-col hover:scale-105 cursor-pointer">
                    <div className="relative mb-4 overflow-hidden rounded-lg bg-gray-100 dark:bg-slate-800 h-48 sm:h-56">
                      <Image
                        src={product.images[0]}
                        alt={product.name}
                        fill
                        className="object-cover group-hover:scale-110 transition duration-300"
                      />
                    </div>
                    <h3 className="text-lg sm:text-2xl font-bold text-gray-800 dark:text-gray-100 mb-2">{product.name}</h3>

                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 line-clamp-2">{product.description}</p>

                    {/* Rating */}
                    <div className="flex items-center justify-center mb-3">
                      <div className="flex text-yellow-400">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} size={16} fill="currentColor" />
                        ))}
                      </div>
                      <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">
                        {product.rating} ({product.reviews} reviews)
                      </span>
                    </div>

                    <div className="mb-4">
                      <p className="text-sm text-gray-500 dark:text-gray-500 line-through">MRP: {product.originalPrice}</p>
                      <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">{product.price}</p>
                    </div>
                    <div className="bg-gradient-to-r from-blue-600 to-blue-700 dark:from-blue-500 dark:to-blue-600 text-white py-3 px-6 rounded-full mt-auto hover:from-blue-700 hover:to-blue-800 dark:hover:from-blue-600 dark:hover:to-blue-700 transition duration-300 font-semibold">
                      View Details
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

      {/* Testimonials Section - Enhanced Reviews */}
      <section className="py-20 bg-white dark:bg-slate-800 transition-colors duration-300">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-gray-100 mb-4">⭐ Real Pets, Real Transformations!</h2>
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
                <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg hover:shadow-2xl transition duration-300 overflow-hidden border border-yellow-100 dark:border-slate-700 w-full mb-4 h-[500px] flex flex-col">
                  {/* Stars in Card */}
                  <div className="bg-gradient-to-r from-yellow-200 to-amber-50 dark:from-slate-700 dark:to-slate-800 p-4 border-b border-yellow-100 dark:border-slate-700">
                    <div className="flex items-center justify-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={18} fill="#fbbf24" stroke="#fbbf24" />
                      ))}
                    </div>
                  </div>

                  {/* Review Comment */}
                  <div className="p-8 flex-1 flex items-center justify-center">
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed italic text-center">"{testimonial.comment}"</p>
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

      {/* Ultimate Saver Packs Section */}
      <section className="py-20 bg-gradient-to-r from-purple-600 via-purple-700 to-indigo-800 dark:from-slate-800 dark:via-slate-900 dark:to-slate-900 text-white transition-colors duration-300">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <motion.div
              initial={{ scale: 0.8 }}
              whileInView={{ scale: 1 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="inline-block mb-4"
            >
              <span className="bg-yellow-300 dark:bg-yellow-400 text-purple-800 dark:text-gray-900 px-6 py-2 rounded-full text-sm font-bold shadow-lg">💰 SAVE UP TO 30%</span>
            </motion.div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-white">Ultimate Saver Packs</h2>
            <p className="text-base sm:text-lg md:text-xl text-purple-100 dark:text-purple-200 mb-8">Get everything your pet needs at unbeatable prices</p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8 mb-12">
            {[
              { name: 'Dog Bundle', value: '₹99.99', savings: 'Save ₹25', items: ['Premium Dog Food', 'Dog Treats', 'Toy', 'Food Bowl'] },
              { name: 'Cat Bundle', value: '₹89.99', savings: 'Save ₹20', items: ['Organic Cat Food', 'Cat Treats', 'Toy', 'Litter'] },
              { name: 'Multi-Pet Bundle', value: '₹149.99', savings: 'Save ₹40', items: ['Dog & Cat Food', 'Mixed Treats', 'Toys', 'Accessories'] },
            ].map((pack, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white/10 dark:bg-gray-800/50 backdrop-blur-md rounded-xl p-4 sm:p-6 md:p-8 border border-white/20 dark:border-gray-700/50 hover:bg-white/20 dark:hover:bg-gray-700/50 transition duration-300 transform hover:scale-105"
              >
                <div className="bg-yellow-300 dark:bg-yellow-400 text-purple-800 dark:text-gray-900 inline-block px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-bold mb-4 shadow-md">
                  {pack.savings}
                </div>
                <h3 className="text-lg sm:text-2xl font-bold mb-4 text-white">{pack.name}</h3>
                <ul className="space-y-2 mb-6 text-purple-100 dark:text-purple-200">
                  {pack.items.map((item, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <CheckCircle size={18} />
                      {item}
                    </li>
                  ))}
                </ul>
                <p className="text-3xl font-bold mb-4 text-yellow-300 dark:text-yellow-400">{pack.value}</p>
                <button className="w-full bg-yellow-300 dark:bg-yellow-400 text-purple-800 dark:text-gray-900 hover:bg-yellow-400 dark:hover:bg-yellow-300 font-bold py-3 px-6 rounded-full transition duration-300 shadow-lg hover:shadow-xl">
                  Add to Cart
                </button>
              </motion.div>
            ))}
          </div>

          {/* View All Packs Button */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <Link
              href="/ultimate-saver-packs"
              className="inline-block bg-white dark:bg-yellow-400 text-purple-700 dark:text-gray-900 hover:bg-gray-100 dark:hover:bg-yellow-300 font-bold py-3 px-10 rounded-full transition duration-300 shadow-lg hover:shadow-xl"
            >
              Explore All Saver Packs →
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Shop by Category Section */}
      <section className="py-20 bg-gradient-to-b from-blue-50 to-purple-50 dark:from-slate-900 dark:to-slate-900 transition-colors duration-300">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800 dark:text-gray-100 mb-4">Shop by Concern</h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-400">Find the perfect products for your furry friends</p>
          </motion.div>

          <div className="grid grid-cols-6 gap-4">
            {[
              { name: 'Dental Health', image: '/category/10.svg', description: 'Keep teeth clean & breath fresh', href: '/category/dental-health' },
              { name: 'Gut Health', image: '/category/11.svg', description: 'Support digestive wellness', href: '/category/gut-health' },
              { name: 'Hip & Joint Health', image: '/category/12.svg', description: 'Strengthen joints & bones', href: '/category/bone-health' },
              { name: 'Weight Management', image: '/category/13.svg', description: 'Maintain healthy weight', href: '/category/weight-management' },
              { name: 'Anxiety & Calming', image: '/category/14.svg', description: 'Reduce stress & promote calm', href: '/category/anxiety-calming' },
              { name: 'Skin & Coat Health', image: '/category/15.svg', description: 'Healthy skin & shiny coat', href: '/category/skin-coat-health' }
            ].map((category, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group"
              >
                <Link href={category.href} className="">
                  <div className="relative overflow-hidden rounded-full mx-auto mt-6 w-40 h-40">
                    <Image
                      src={category.image}
                      alt={category.name}
                      fill
                      className="object-cover scale-125 group-hover:scale-125 transition duration-300 rounded-full"
                    />
                  </div>
                  <div className="p-6 text-center">
                    <h3 className="text-sm font-extrabold text-gray-800 dark:text-gray-100 mb-2 uppercase tracking-wider">{category.name}</h3>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Vet Reviewed Section */}
      <section className="relative py-28 bg-white dark:bg-slate-900 overflow-hidden">

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
                  <p className="text-xl md:text-2xl text-gray-800 dark:text-gray-200 italic leading-relaxed font-medium">
                    “As a practicing veterinarian, I confidently recommend Beggin For A Bite.
                    Each formula undergoes thorough evaluation, ensuring pets receive only safe
                    and superior-quality nutrition.”
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



      {/* Client Carousel Section */}
      <section className="py-20 dark:bg-slate-900 transition-colors duration-300" style={{ backgroundColor: '#fef6eb' }}>
        <div className="container mx-auto px-4 md:px-6">
          <ClientCarousel />
        </div>
      </section>



      {/* Trust Guarantees Section */}
      <section className="py-20 bg-[#fef6eb] dark:bg-slate-950 transition-colors duration-300">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-gray-100 mb-4">Why Shop With Confidence</h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">We've got you covered every step of the way</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Truck,
                title: '🚚 Free Shipping',
                description: 'Free delivery on all orders over ₹50. Fast and secure shipping to your doorstep.',
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
                  className="text-center p-8 rounded-xl bg-gradient-to-br from-gray-50 to-gray-100 dark:from-slate-800 dark:to-slate-900 border border-gray-200 dark:border-slate-700 hover:shadow-lg transition duration-300"
                >
                  <div className={`bg-gradient-to-br ${guarantee.color} text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg`}>
                    <IconComponent size={32} />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-3">{guarantee.title}</h3>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{guarantee.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-blue-700 dark:from-blue-950 dark:to-slate-900 text-white transition-colors duration-300">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Why Choose BFAB?</h2>
            <p className="text-xl text-blue-100 dark:text-blue-200">The trusted choice for discerning pet parents</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: <Award size={32} />, title: 'Premium Quality', description: 'Best ingredients sourced globally' },
              { icon: <ShieldCheck size={32} />, title: 'Vet Approved', description: 'Formulated by veterinary experts' },
              { icon: <Leaf size={32} />, title: 'Natural & Organic', description: 'No artificial additives or fillers' },
              { icon: <Heart size={32} />, title: 'Health Guarantee', description: 'Healthier pets or your money back' },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="w-16 h-16 mx-auto mb-4 bg-white bg-opacity-20 dark:bg-blue-900 dark:bg-opacity-40 rounded-full flex items-center justify-center">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-2 text-white">{feature.title}</h3>
                <p className="text-blue-100 dark:text-blue-200">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-20 bg-[#fef6eb] dark:bg-slate-950 transition-colors duration-300">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-gray-100 mb-6">Ready to Transform Your Pet's Health?</h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
              Join thousands of happy pet owners who have already made the switch to premium nutrition.
            </p>
            <Link
              href="/shop-now"
              className="bg-gradient-to-r from-blue-600 to-blue-700 dark:from-blue-700 dark:to-blue-800 hover:from-blue-700 hover:to-blue-800 dark:hover:from-blue-600 dark:hover:to-blue-700 text-white font-bold py-4 px-8 rounded-full text-lg transition duration-300 inline-block shadow-lg hover:shadow-xl"
            >
              Start Shopping Now
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
