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
  { id: 1, name: 'Client 1', logo: '/carousel/1.svg' },
  { id: 2, name: 'Client 2', logo: '/carousel/2.svg' },
  { id: 3, name: 'Client 3', logo: '/carousel/3.svg' },
  { id: 4, name: 'Client 4', logo: '/carousel/4.svg' },
  { id: 5, name: 'Client 5', logo: '/carousel/5.svg' },
  { id: 6, name: 'Client 6', logo: '/carousel/6.svg' },
];

export default function ClientCarousel({ clients = defaultClients }: ClientCarouselProps) {
  const [current, setCurrent] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const [itemsToShow, setItemsToShow] = useState(4);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  useEffect(() => {
    if (!isAutoPlay) return;

    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % clients.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlay, clients.length]);

  useEffect(() => {
    const updateItemsToShow = () => {
      const width = window.innerWidth;
      if (width < 480) {
        setItemsToShow(1); // Very small screens
      } else if (width < 768) {
        setItemsToShow(2); // Mobile
      } else if (width < 1024) {
        setItemsToShow(3); // Tablet
      } else {
        setItemsToShow(4); // Desktop
      }
    };

    updateItemsToShow();
    window.addEventListener('resize', updateItemsToShow);
    return () => window.removeEventListener('resize', updateItemsToShow);
  }, []);

  // Touch gesture handlers
  const minSwipeDistance = 50;

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      setCurrent((prev) => (prev + 1) % clients.length);
    } else if (isRightSwipe) {
      setCurrent((prev) => (prev - 1 + clients.length) % clients.length);
    }
  };

  const displayedClients = [];
  for (let i = 0; i < itemsToShow; i++) {
    const index = (current + i) % clients.length;
    displayedClients.push(clients[index]);
  }

  return (

      <div className="container mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-6 sm:mb-8 md:mb-12 lg:mb-16"
        >
          <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 dark:text-gray-100 mb-3 sm:mb-4">As Promoted On</h3>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto px-2">Trusted by leading brands and media outlets</p>
        </motion.div>

        <div
          className="flex justify-center items-center gap-3 sm:gap-4 md:gap-6 lg:gap-8 xl:gap-10 px-2 sm:px-4 md:px-6 overflow-hidden relative py-6 sm:py-8 md:py-10 cursor-grab active:cursor-grabbing"
          onMouseEnter={() => setIsAutoPlay(false)}
          onMouseLeave={() => setIsAutoPlay(true)}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
        {displayedClients.map((client, index) => (
          <motion.div
            key={`${client.id}-${index}`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}

            className="flex-shrink-0 w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 lg:w-32 lg:h-32 flex items-center justify-center rounded-full transition-all duration-300 p-2 sm:p-3 md:p-4 lg:p-5 overflow-hidden"
          >
            <Image
              src={client.logo}
              alt={client.name}
              width={80}
              height={80}
              className="object-cover w-full h-full filter grayscale hover:grayscale-0 transition-all duration-300 rounded-full"
            />
          </motion.div>
        ))}
        </div>

        {/* Indicator dots - Hidden on very small screens */}
        <div className="hidden sm:flex justify-center gap-2 sm:gap-3 mt-6 sm:mt-8 md:mt-10 lg:mt-12">
          {clients.map((_, index) => (
            <motion.button
              key={index}
              onClick={() => setCurrent(index)}
              className={`h-2 sm:h-3 rounded-full transition-all duration-300 ${
                index === current % clients.length
                  ? 'bg-blue-600 w-6 sm:w-8'
                  : 'bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500 w-2 sm:w-3'
              }`}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        {/* Navigation buttons - Smaller on mobile */}
        <div className="flex justify-center gap-4 sm:gap-6 mt-4 sm:mt-6 md:mt-8 lg:mt-10">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setCurrent((prev) => (prev - 1 + clients.length) % clients.length)}
            className="group p-3 sm:p-4 rounded-full bg-blue-600 hover:bg-blue-700 text-white transition-colors duration-300 shadow-lg"
            aria-label="Previous clients"
          >
            <svg className="w-4 h-4 sm:w-6 sm:h-6 group-hover:-translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
            </svg>
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setCurrent((prev) => (prev + 1) % clients.length)}
            className="group p-3 sm:p-4 rounded-full bg-blue-600 hover:bg-blue-700 text-white transition-colors duration-300 shadow-lg"
            aria-label="Next clients"
          >
            <svg className="w-4 h-4 sm:w-6 sm:h-6 group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
            </svg>
          </motion.button>
        </div>
      </div>
  );
}