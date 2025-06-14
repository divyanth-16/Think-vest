import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Receipt, Wallet, CreditCard, Globe, Lightbulb } from 'lucide-react';

const features = [
  {
    title: "Deep Financial Insights",
    icon: <Sparkles className="h-8 w-8 text-purple-700 z-10" />,
    bg: "from-purple-100 to-purple-300",
  },
  {
    title: "Intelligent Receipt Scanner",
    icon: <Receipt className="h-8 w-8 text-pink-700 z-10" />,
    bg: "from-pink-100 to-pink-300",
  },
  {
    title: "Smart Budgeting Assistant",
    icon: <Wallet className="h-8 w-8 text-blue-700 z-10" />,
    bg: "from-blue-100 to-blue-300",
  },
  {
    title: "Unified Account Access",
    icon: <CreditCard className="h-8 w-8 text-green-700 z-10" />,
    bg: "from-green-100 to-green-300",
  },
  {
    title: "Global Currency Support",
    icon: <Globe className="h-8 w-8 text-yellow-700 z-10" />,
    bg: "from-yellow-100 to-yellow-300",
  },
  {
    title: "Proactive AI Tips",
    icon: <Lightbulb className="h-8 w-8 text-orange-700 z-10" />,
    bg: "from-orange-100 to-orange-300",
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' },
  },
};

const FeaturesSection = () => {
  return (
    <section className="bg-gradient-to-br from-[#f5f3ff] to-[#e0e7ff] py-24 px-6 text-center text-gray-800">
      <motion.h2
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
        className="text-4xl md:text-5xl font-extrabold mb-14 tracking-tight bg-gradient-to-r from-purple-700 to-indigo-500 text-transparent bg-clip-text"
      >
        Everything You Need to Master Your Money
      </motion.h2>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto"
      >
        {features.map((feat, idx) => (
          <motion.div
            key={idx}
            variants={itemVariants}
            whileHover={{ scale: 1.05 }}
            className="relative bg-white rounded-3xl p-8 shadow-xl transition-transform duration-300 overflow-hidden cursor-default"
          >
            {/* Gradient blob bg */}
            <div className={`absolute top-0 left-0 w-full h-full bg-gradient-to-br ${feat.bg} opacity-20 blur-2xl rounded-3xl z-0`} />

            {/* Icon */}
            <div className="relative z-10 mb-4 flex items-center justify-center">
              <div className="bg-white p-4 rounded-full shadow-md">
                {feat.icon}
              </div>
            </div>

            {/* Title */}
            <h3 className="relative z-10 text-xl font-semibold">{feat.title}</h3>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default FeaturesSection;
