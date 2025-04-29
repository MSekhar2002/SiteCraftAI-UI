import React from 'react';

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  theme: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description, theme }) => {
  return (
    <div className={`
      p-6 rounded-xl transition-all duration-300 transform hover:scale-105
      ${theme === 'dark'
        ? 'bg-gray-800/50 hover:bg-gray-800 backdrop-blur-lg border border-gray-700'
        : 'bg-white hover:shadow-xl border border-gray-200'
      }
    `}>
      <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-4 ${
        theme === 'dark' ? 'bg-blue-500/20 text-blue-400' : 'bg-blue-100 text-blue-600'
      }`}>
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
        {description}
      </p>
    </div>
  );
};

export default FeatureCard;