import React from 'react';
import { Check } from 'lucide-react';

interface PricingProps {
  theme: string;
}

const Pricing: React.FC<PricingProps> = ({ theme }) => {
  const plans = [
    {
      name: "Starter",
      price: "Free",
      description: "Perfect for personal projects",
      features: [
        "1 website",
        "Basic AI templates",
        "Community support",
        "Basic analytics",
      ],
    },
    {
      name: "Pro",
      price: "$29",
      description: "For professional creators",
      features: [
        "10 websites",
        "Advanced AI features",
        "Priority support",
        "Custom domains",
        "Advanced analytics",
        "Remove branding",
      ],
      popular: true,
    },
    {
      name: "Enterprise",
      price: "Custom",
      description: "For large organizations",
      features: [
        "Unlimited websites",
        "Custom AI training",
        "24/7 dedicated support",
        "Custom integrations",
        "Advanced security",
        "SLA guarantee",
      ],
    },
  ];

  return (
    <section className="py-20">
      <div className="container mx-auto px-6">
        <h2 className={`text-4xl font-bold text-center mb-16 ${
          theme === 'dark' ? 'text-blue-400' : 'text-blue-600'
        }`}>
          Choose Your Plan
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative p-8 rounded-xl ${
                theme === 'dark'
                  ? 'bg-gray-800/50 backdrop-blur-lg border border-gray-700'
                  : 'bg-white border border-gray-200'
              } ${plan.popular ? 'transform scale-105' : ''}`}
            >
              {plan.popular && (
                <div className={`absolute top-0 right-0 -translate-y-1/2 px-4 py-1 rounded-full text-sm font-semibold ${
                  theme === 'dark' ? 'bg-blue-500 text-white' : 'bg-blue-600 text-white'
                }`}>
                  Most Popular
                </div>
              )}
              <h3 className={`text-2xl font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                {plan.name}
              </h3>
              <div className="mb-4">
                <span className={`text-4xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  {plan.price}
                </span>
                {plan.price !== "Custom" && (
                  <span className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>/month</span>
                )}
              </div>
              <p className={`mb-6 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                {plan.description}
              </p>
              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center">
                    <Check className={`w-5 h-5 mr-2 ${
                      theme === 'dark' ? 'text-blue-400' : 'text-blue-600'
                    }`} />
                    <span className={theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}>
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>
              <button className={`w-full py-3 rounded-full font-semibold transition-colors ${
                plan.popular
                  ? theme === 'dark'
                    ? 'bg-blue-600 hover:bg-blue-500 text-white'
                    : 'bg-blue-600 hover:bg-blue-700 text-white'
                  : theme === 'dark'
                    ? 'bg-gray-700 hover:bg-gray-600 text-white'
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-900'
              }`}>
                Get Started
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;