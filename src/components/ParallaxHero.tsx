import React, { useEffect, useState } from 'react';

interface ParallaxHeroProps {
  theme: string;
}

const ParallaxHero: React.FC<ParallaxHeroProps> = ({ theme }) => {
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setOffset(window.pageYOffset);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="relative h-screen overflow-hidden">
      {/* Background Grid */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `linear-gradient(to right, ${
            theme === 'dark' ? '#1f2937 1px, transparent' : '#e5e7eb 1px, transparent'
          } 1px)`,
          backgroundSize: '50px 50px',
          transform: `translateY(${offset * 0.5}px)`,
        }}
      />

      {/* Glowing Orbs */}
      <div
        className="absolute w-64 h-64 rounded-full blur-3xl opacity-30"
        style={{
          background: theme === 'dark' ? '#3b82f6' : '#60a5fa',
          top: '20%',
          left: '20%',
          transform: `translate(${offset * -0.2}px, ${offset * 0.1}px)`,
        }}
      />
      <div
        className="absolute w-96 h-96 rounded-full blur-3xl opacity-20"
        style={{
          background: theme === 'dark' ? '#8b5cf6' : '#a78bfa',
          top: '40%',
          right: '10%',
          transform: `translate(${offset * 0.2}px, ${offset * 0.1}px)`,
        }}
      />

      {/* Content */}
      <div className="relative container mx-auto px-6 h-full flex items-center">
        <div className="max-w-3xl">
          <h1 className={`text-6xl font-bold mb-6 ${
            theme === 'dark' ? 'text-white' : 'text-gray-900'
          }`}>
            Create Stunning Websites with{' '}
            <span className={`${
              theme === 'dark' ? 'text-blue-400' : 'text-blue-600'
            }`}>
              AI Power
            </span>
          </h1>
          <p className={`text-xl mb-8 ${
            theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
          }`}>
            Transform your ideas into beautiful, responsive websites using natural language. 
            Let AI handle the design while you focus on what matters most.
          </p>
          <div className="space-x-4">
            <button className={`
              px-8 py-4 rounded-full text-xl font-bold
              transition-all duration-300 transform hover:scale-105
              ${theme === 'dark' 
                ? 'bg-blue-600 hover:bg-blue-500 text-white shadow-[0_0_20px_rgba(37,99,235,0.5)]' 
                : 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg'
              }
            `}>
              Get Started Free
            </button>
            <button className={`
              px-8 py-4 rounded-full text-xl font-bold
              transition-all duration-300
              ${theme === 'dark'
                ? 'bg-gray-800 hover:bg-gray-700 text-white'
                : 'bg-gray-100 hover:bg-gray-200 text-gray-900'
              }
            `}>
              Learn More
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ParallaxHero;