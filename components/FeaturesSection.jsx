"use client";

import React from "react";
import { Sparkles, Receipt, Wallet, CreditCard, Globe, Lightbulb } from "lucide-react";
import { motion as fm } from "framer-motion";

const features = [
  {
    title: "Deep Financial Insights",
    icon: <Sparkles size={28} className="text-black" />,
    description: "Get AI-driven breakdowns of where your money goes and uncover hidden trends in your expenses.",
  },
  {
    title: "Intelligent Receipt Scanner",
    icon: <Receipt size={28} className="text-black" />,
    description: "Snap a photo and let the AI auto-capture and categorize your receipts in seconds.",
  },
  {
    title: "Smart Budgeting Assistant",
    icon: <Wallet size={28} className="text-black" />,
    description: "Design and monitor custom budgets with personalized, adaptive suggestions.",
  },
  {
    title: "Unified Account Access",
    icon: <CreditCard size={28} className="text-black" />,
    description: "Link and manage multiple banks and cards from one secure dashboard.",
  },
  {
    title: "Global Currency Support",
    icon: <Globe size={28} className="text-black" />,
    description: "Seamlessly manage finances across different countries and currencies.",
  },
  {
    title: "Proactive AI Tips",
    icon: <Lightbulb size={28} className="text-black" />,
    description: "Receive actionable tips and financial nudges to keep your goals on track.",
  },
];

const FeaturesSection = () => {
  return (
    <section className="bg-gradient-to-b from-[#434343] to-[#000000] py-20 px-6">
      <div className="max-w-7xl mx-auto text-center mb-14">
        <fm.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl font-bold mb-4 text-white"
        >
          Everything You Need to Master Your Money
        </fm.h2>
      </div>

      <div className="max-w-6xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-10">
        {features.map((feature, idx) => (
          <fm.div
            key={idx}
            className="bg-white p-6 rounded-2xl shadow-xl hover:shadow-gray-500/40 transition duration-300"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: idx * 0.1 }}
          >
            <div className="mb-4">{feature.icon}</div>
            <h3 className="text-xl font-semibold mb-2 text-black">{feature.title}</h3>
            <p className="text-sm text-gray-800">{feature.description}</p>
          </fm.div>
        ))}
      </div>
    </section>
  );
};

export default FeaturesSection;