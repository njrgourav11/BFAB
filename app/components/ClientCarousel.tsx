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

  useEffect(() => {
    if (!isAutoPlay) return;
    
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % clients.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [isAutoPlay, clients.length]);

  const displayedClients = [...clients, ...clients].slice(current, current + 4);

  return (
    <div className="w-full py-12 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-900 rounded-lg transition-colors duration-300">
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100">Trusted by Thousands of Pet Lovers</h3>
      </div>
      
      <div 
        className="flex justify-center items-center gap-8 px-4 overflow-hidden"
        onMouseEnter={() => setIsAutoPlay(false)}
        onMouseLeave={() => setIsAutoPlay(true)}
      >
        {displayedClients.map((client, index) => (
          <motion.div
            key={`${client.id}-${index}`}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.5 }}
            className="flex-shrink-0 w-32 h-20 flex items-center justify-center bg-white dark:bg-gray-700 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 p-4 border border-gray-100 dark:border-gray-600"
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

      <div className="flex justify-center gap-2 mt-8">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setCurrent((prev) => (prev - 1 + clients.length) % clients.length)}
          className="p-2 rounded-full bg-blue-600 dark:bg-blue-700 text-white hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors"
        >
          ←
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setCurrent((prev) => (prev + 1) % clients.length)}
          className="p-2 rounded-full bg-blue-600 dark:bg-blue-700 text-white hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors"
        >
          →
        </motion.button>
      </div>
    </div>
  );
}