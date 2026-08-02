"use client";
import React from 'react';
import { motion } from 'framer-motion';

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-[100px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-emerald-500/10 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '4s' }} />
      </div>

      <div className="z-10 text-center px-4 w-full max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <div className="mb-8 inline-flex items-center justify-center px-4 py-1.5 rounded-full border border-gray-700 bg-gray-800/50 backdrop-blur-sm">
            <span className="text-sm font-medium text-emerald-400 uppercase tracking-widest">
              Something new is brewing
            </span>
          </div>
          
          <h1 className="text-5xl sm:text-6xl md:text-8xl font-extrabold text-white mb-6 tracking-tight leading-tight">
            We are <br className="hidden sm:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-blue-500 to-purple-600">
              Coming Soon
            </span>
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <p className="text-lg sm:text-xl md:text-2xl text-gray-400 mb-12 max-w-2xl mx-auto leading-relaxed">
            We're building a premium, science-backed nutrition experience for your pets. Get ready for a revolution in pet care.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 1 }}
        >
          <div className="flex items-center justify-center space-x-6">
            <div className="h-[2px] w-12 sm:w-24 bg-gradient-to-r from-transparent to-emerald-500 rounded-full" />
            <span className="text-lg sm:text-xl font-bold tracking-[0.3em] text-white uppercase">BFAB</span>
            <div className="h-[2px] w-12 sm:w-24 bg-gradient-to-l from-transparent to-purple-500 rounded-full" />
          </div>
        </motion.div>
      </div>
    </div>
  );
}
