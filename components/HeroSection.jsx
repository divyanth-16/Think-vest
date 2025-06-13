import React from 'react';

const HeroSection = () => {
  return (
    <section className="flex flex-col md:flex-row items-center justify-between px-8 py-20 gap-10 bg-gradient-to-r from-[#f5f3ff] to-[#e0e7ff] text-gray-900">
      {/* Left Content */}
      <div className="flex-1 space-y-6 text-center md:text-left">
        <h1 className="text-5xl font-extrabold leading-tight tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-purple-700 to-indigo-500">
          Take Control of Your Finances<br />with Smart AI
        </h1>
        <p className="text-lg text-gray-700 max-w-xl mx-auto md:mx-0">
          A next-generation personal finance assistant that uses intelligent algorithms to track
          your expenses, analyze spending, and provide real-time smart financial advice.
        </p>
        <button className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-full text-lg font-medium shadow-md hover:shadow-xl transition-all duration-300 w-fit mx-auto md:mx-0">
          Get Started
        </button>
      </div>

      {/* Right Placeholder */}
      <div className="flex-1 flex items-center justify-center">
        <div className="w-full max-w-md h-60 bg-white rounded-2xl shadow-lg flex items-center justify-center text-center px-4 text-gray-500 text-lg">
          I WILL ADD<br />SOME PICTURES HERE<br />SO LEAVE SOME SPACE
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
