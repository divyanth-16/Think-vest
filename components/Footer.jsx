'use client';
import React from "react";
import { motion } from "framer-motion";

const Footer = () => {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="bg-gradient-to-r from-[#434343] via-[#222222] to-[#434343] text-white py-10 px-6"
    >
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center md:items-start gap-8 text-center md:text-left">
        {/* Brand Info */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h2 className="text-2xl font-extrabold mb-2">
            FinTrack<span className="text-gray-400">.</span>
          </h2>
          <p className="text-sm text-gray-300 max-w-xs">
            Your intelligent partner in smart financial planning and expense management.
          </p>
        </motion.div>

        {/* Contact Info */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <h3 className="text-lg font-semibold mb-3 text-gray-400">Contact Us</h3>
          <p className="text-sm text-gray-300">support@fintrack.ai</p>
          <p className="text-sm text-gray-300">+91 98765 43210</p>
        </motion.div>
      </div>

      {/* Bottom Line */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.8 }}
        className="mt-10 text-center text-xs text-gray-400"
      >
        © {new Date().getFullYear()} FinTrack. All rights reserved.
      </motion.div>
    </motion.footer>
  );
};

export default Footer;
