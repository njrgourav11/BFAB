"use client";
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import Image from 'next/image';

interface ClientLogo {
  id: number;
  name: string;
  logo: string;
}

interface ClientCarouselProps {
  clients?: ClientLogo[];
}

const defaultClients: ClientLogo[] = [
  { id: 1, name: 'PetCare Plus', logo: '/next.svg' },
  { id: 2, name: 'Happy Paws', logo: '/globe.svg' },
  { id: 3, name: 'Furry Friends', logo: '/file.svg' },
  { id: 4, name: 'Pet Paradise', logo: '/window.svg' },
  { id: 5, name: 'Animal Lovers', logo: '/vercel.svg' },
  { id: 6, name: 'Pet Wellness', logo: '/next.svg' },
];

export default function ClientCarousel({ clients = defaultClients }: ClientCarouselProps) {
  const [current, setCurrent] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const [itemsToShow, setItemsToShow] = useState(4);

  useEffect(() => {
    if (!isAutoPlay) return;

    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % clients.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlay, clients.length]);

  useEffect(() => {
    const updateItemsToShow = () => {
      if (window.innerWidth < 640) {
        setItemsToShow(2);
      } else if (window.innerWidth < 1024) {
        setItemsToShow(3);
      } else {
        setItemsToShow(4);
      }
    };

    updateItemsToShow();
    window.addEventListener('resize', updateItemsToShow);
    return () => window.removeEventListener('resize', updateItemsToShow);
  }, []);

  const displayedClients = [...clients, ...clients].slice(current, current + itemsToShow);

  return (
    <div className="relative w-full py-12 md:py-16 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 rounded-xl shadow-lg transition-all duration-500 border border-gray-100 dark:border-gray-700 overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-5 dark:opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 25% 25%, rgba(59, 130, 246, 0.1) 0%, transparent 50%),
                           radial-gradient(circle at 75% 75%, rgba(147, 51, 234, 0.1) 0%, transparent 50%)`,
          backgroundSize: '60px 60px'
        }}></div>
      </div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 md:mb-12">
          <h3 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-gray-100 mb-2">As Promoted On</h3>
        </div>

        <div
          className="flex justify-center items-center gap-4 md:gap-6 px-2 md:px-4 overflow-hidden relative"
          onMouseEnter={() => setIsAutoPlay(false)}
          onMouseLeave={() => setIsAutoPlay(true)}
        >
        {displayedClients.map((client, index) => (
          <motion.div
            key={`${client.id}-${index}`}
            initial={{ opacity: 0, x: 50, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -50, scale: 0.9 }}
            transition={{
              duration: 0.6,
              delay: index * 0.1,
              ease: [0.25, 0.46, 0.45, 0.94]
            }}
            whileHover={{
              scale: 1.05,
              y: -5,
              transition: { duration: 0.2 }
            }}
            className="flex-shrink-0 w-28 h-20 md:w-36 md:h-24 flex items-center justify-center bg-white dark:bg-gray-700 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-3 md:p-4 border border-gray-200 dark:border-gray-600 backdrop-blur-sm"
          >
            <Image 
              src={client.logo} 
              alt={client.name}
              width={80}
              height={60}
              className="object-contain"
            />
          </motion.div>
        ))}
        </div>

        {/* Indicator dots */}
        <div className="flex justify-center gap-2 mt-8 md:mt-10">
          {clients.map((_, index) => (
            <motion.button
              key={index}
              onClick={() => setCurrent(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === current % clients.length
                  ? 'bg-blue-600 dark:bg-blue-400 w-6'
                  : 'bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500'
              }`}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        <div className="flex justify-center gap-4 mt-6 md:mt-8">
          <motion.button
            whileHover={{ scale: 1.05, x: -2 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setCurrent((prev) => (prev - 1 + clients.length) % clients.length)}
            className="group p-3 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 dark:from-blue-600 dark:to-blue-700 dark:hover:from-blue-700 dark:hover:to-blue-800 text-white shadow-lg hover:shadow-xl transition-all duration-300 border border-blue-400 dark:border-blue-500"
            aria-label="Previous clients"
          >
            <svg className="w-5 h-5 group-hover:-translate-x-0.5 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05, x: 2 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setCurrent((prev) => (prev + 1) % clients.length)}
            className="group p-3 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 dark:from-blue-600 dark:to-blue-700 dark:hover:from-blue-700 dark:hover:to-blue-800 text-white shadow-lg hover:shadow-xl transition-all duration-300 border border-blue-400 dark:border-blue-500"
            aria-label="Next clients"
          >
            <svg className="w-5 h-5 group-hover:translate-x-0.5 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </motion.button>
        </div>
      </div>
    </div>
  );
}