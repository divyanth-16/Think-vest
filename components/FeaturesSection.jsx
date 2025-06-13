'use client';
gggimport React, { useState } from 'react';
import { Sparkles, Receipt, Wallet, CreditCard, Globe, Lightbulb } from 'lucide-react';

const features = [
  {
    title: "Deep Financial Insights",
    description: "Get AI-generated summaries and patterns of your spending habits.",
    icon: <Sparkles className="h-8 w-8 text-purple-700 z-10" />,
    bg: "from-purple-100 to-purple-300",
  },
  {
    title: "Intelligent Receipt Scanner",
    description: "Scan receipts with your camera and auto-track purchases.",
    icon: <Receipt className="h-8 w-8 text-pink-700 z-10" />,
    bg: "from-pink-100 to-pink-300",
  },
  {
    title: "Smart Budgeting Assistant",
    description: "Create smart budgets with AI based on your goals.",
    icon: <Wallet className="h-8 w-8 text-blue-700 z-10" />,
    bg: "from-blue-100 to-blue-300",
  },
  {
    title: "Unified Account Access",
    description: "View all your accounts in one secure dashboard.",
    icon: <CreditCard className="h-8 w-8 text-green-700 z-10" />,
    bg: "from-green-100 to-green-300",
  },
  {
    title: "Global Currency Support",
    description: "Handle multiple currencies seamlessly in one place.",
    icon: <Globe className="h-8 w-8 text-yellow-700 z-10" />,
    bg: "from-yellow-100 to-yellow-300",
  },
  {
    title: "Proactive AI Tips",
    description: "Get smart, proactive tips to optimize your money usage.",
    icon: <Lightbulb className="h-8 w-8 text-orange-700 z-10" />,
    bg: "from-orange-100 to-orange-300",
  },
];

const FeaturesSection = () => {
  return (
    <section className="bg-gradient-to-br from-[#f5f3ff] to-[#e0e7ff] py-24 px-6 text-center text-gray-800">
      <h2 className="text-4xl md:text-5xl font-extrabold mb-14 tracking-tight bg-gradient-to-r from-purple-700 to-indigo-500 text-transparent bg-clip-text">
        Everything You Need to Master Your Money
      </h2>

      <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
        {features.map((feat, idx) => (
          <div
            key={idx}
            className="relative group bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all transform hover:-translate-y-1 hover:scale-105 duration-300 overflow-hidden"
          >
            {/* Background blob */}
            <div
              className={`absolute top-0 left-0 w-full h-full bg-gradient-to-br ${feat.bg} opacity-20 blur-2xl rounded-3xl z-0`}
            />

            {/* Icon */}
            <div className="relative z-10 mb-4 flex items-center justify-center">
              <div className="bg-white p-4 rounded-full shadow-md">
                {feat.icon}
              </div>
            </div>

            {/* Title */}
            <h3 className="relative z-10 text-xl font-semibold">{feat.title}</h3>

            {/* Popup on hover */}
            <div className="absolute inset-x-4 bottom-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 bg-white text-sm text-gray-600 p-3 rounded-xl shadow-md">
              {feat.description}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturesSection;
