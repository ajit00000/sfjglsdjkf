import React from 'react';

interface HeroSectionProps {
  onStartTest?: () => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ onStartTest }) => {
  return (
    <section className="bg-gradient-to-br from-blue-600 to-purple-700 text-white py-20">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-5xl font-bold mb-6">
          Test Your Internet Speed
        </h1>
        <p className="text-xl mb-8 max-w-2xl mx-auto">
          Get accurate measurements of your download and upload speeds, 
          plus detailed network diagnostics in seconds.
        </p>
        <button
          onClick={onStartTest}
          className="bg-white text-blue-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-colors duration-200 shadow-lg"
        >
          Start Speed Test
        </button>
      </div>
    </section>
  );
};

export default HeroSection;