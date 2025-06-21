'use client';

import React from 'react';
import { motion } from 'framer-motion';

const HeroSection = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#434343] to-[#000000] text-white flex items-center px-8 md:px-20 relative overflow-hidden">
      {/* Stars background */}
      <div className="absolute inset-0 bg-[url('/stars.png')] bg-cover opacity-10 pointer-events-none"></div>

      <div className="z-10 grid grid-cols-1 md:grid-cols-2 items-center gap-10 w-full">
        {/* Left Text Content */}
        <motion.div
          className="space-y-6 max-w-xl"
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold leading-tight text-white">
            Take Control of Your Finances with Smart AI
          </h1>
          <p className="text-lg text-gray-300">
            A next-generation personal finance assistant that uses intelligent algorithms to track your expenses,
            analyze spending, and provide real-time smart financial advice.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="mt-4 px-6 py-3 rounded-full bg-white text-gray-900 font-semibold hover:bg-gray-200 transition"
          >
            Get Started
          </motion.button>
        </motion.div>

        {/* Right Graph Section */}
        <motion.div
          className="flex justify-center"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          <div className="w-[340px] h-[240px] md:w-[420px] md:h-[280px] bg-gradient-to-br from-gray-700 to-gray-900 rounded-3xl p-6 shadow-2xl border border-gray-500/20">
            <div className="w-full h-full bg-transparent rounded-xl border border-gray-300/30 grid grid-rows-3 grid-cols-6 items-end p-2">
              <motion.svg
                className="w-full h-full col-span-6 row-span-3"
                viewBox="0 0 100 40"
                preserveAspectRatio="none"
              >
                <motion.polyline
                  fill="none"
                  stroke="#4FD1C5"
                  strokeWidth="2"
                  points="0,30 20,35 40,20 60,25 80,10 100,5"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 2, ease: 'easeInOut' }}
                />
              </motion.svg>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default HeroSection;