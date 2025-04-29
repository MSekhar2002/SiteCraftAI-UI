import React from 'react';

interface TestimonialsProps {
  theme: string;
}

const Testimonials: React.FC<TestimonialsProps> = ({ theme }) => {
  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "CEO, TechStart",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&h=150&q=80",
      quote: "SiteCraft AI transformed our web development process. What used to take weeks now takes hours, with even better results.",
    },
    {
      name: "Michael Chen",
      role: "Founder, DesignLab",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&h=150&q=80",
      quote: "The AI-powered features are mind-blowing. It's like having a team of expert developers at your fingertips.",
    },
    {
      name: "Emily Rodriguez",
      role: "Marketing Director",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=150&h=150&q=80",
      quote: "Our website conversion rate increased by 150% after switching to SiteCraft AI. The results speak for themselves.",
    }
  ];

  return (
    <section className="py-20">
      <div className="container mx-auto px-6">
        <h2 className={`text-4xl font-bold text-center mb-16 ${
          theme === 'dark' ? 'text-blue-400' : 'text-blue-600'
        }`}>
          What Our Users Say
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className={`p-8 rounded-xl transform hover:scale-105 transition-all duration-300 ${
                theme === 'dark'
                  ? 'bg-gray-800/50 hover:bg-gray-800 backdrop-blur-lg border border-gray-700'
                  : 'bg-white hover:shadow-xl border border-gray-200'
              }`}
            >
              <div className="flex items-center mb-6">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-16 h-16 rounded-full object-cover mr-4"
                />
                <div>
                  <h3 className={`font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                    {testimonial.name}
                  </h3>
                  <p className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
                    {testimonial.role}
                  </p>
                </div>
              </div>
              <blockquote className={`text-lg italic ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                "{testimonial.quote}"
              </blockquote>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;