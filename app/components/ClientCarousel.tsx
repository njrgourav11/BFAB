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

  const displayedClients = [];
  for (let i = 0; i < itemsToShow; i++) {
    const index = (current + i) % clients.length;
    displayedClients.push(clients[index]);
  }

  return (

      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-10 md:mb-16"
        >
          <h3 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800 dark:text-gray-100 mb-4">As Promoted On</h3>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-400">Trusted by leading brands and media outlets</p>
        </motion.div>

        <div
          className="flex justify-center items-center gap-6 md:gap-8 lg:gap-10 px-4 md:px-6 overflow-hidden relative py-4"
          onMouseEnter={() => setIsAutoPlay(false)}
          onMouseLeave={() => setIsAutoPlay(true)}
        >
        {displayedClients.map((client, index) => (
          <motion.div
            key={`${client.id}-${index}`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}

            className="flex-shrink-0 w-24 h-24 md:w-28 md:h-28 lg:w-32 lg:h-32 flex items-center justify-center rounded-full transition-all duration-300 p-3 md:p-4 lg:p-5 overflow-hidden"
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

        {/* Indicator dots */}
        <div className="flex justify-center gap-3 mt-10 md:mt-12">
          {clients.map((_, index) => (
            <motion.button
              key={index}
              onClick={() => setCurrent(index)}
              className={`h-3 rounded-full transition-all duration-300 ${
                index === current % clients.length
                  ? 'bg-blue-600 w-8'
                  : 'bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500 w-3'
              }`}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        <div className="flex justify-center gap-6 mt-8 md:mt-10">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setCurrent((prev) => (prev - 1 + clients.length) % clients.length)}
            className="group p-4 rounded-full bg-blue-600 hover:bg-blue-700 text-white transition-colors duration-300"
            aria-label="Previous clients"
          >
            <svg className="w-6 h-6 group-hover:-translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
            </svg>
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setCurrent((prev) => (prev + 1) % clients.length)}
            className="group p-4 rounded-full bg-blue-600 hover:bg-blue-700 text-white transition-colors duration-300"
            aria-label="Next clients"
          >
            <svg className="w-6 h-6 group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
            </svg>
          </motion.button>
        </div>
      </div>
  );
}