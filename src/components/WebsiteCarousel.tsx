import React, { useState, useEffect } from 'react';

interface WebsiteCarouselProps {
  theme: string;
}

const WebsiteCarousel: React.FC<WebsiteCarouselProps> = ({ theme }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const websites = [
    {
      title: "E-Commerce Platform",
      image: "https://images.unsplash.com/photo-1607082349566-187342175e2f?auto=format&fit=crop&w=2340&q=80",
      description: "AI-generated e-commerce solution with advanced features"
    },
    {
      title: "Portfolio Website",
      image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=2340&q=80",
      description: "Creative portfolio showcase with dynamic animations"
    },
    {
      title: "Blog Platform",
      image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=2340&q=80",
      description: "Modern blog platform with advanced content management"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % websites.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="mb-32">
      <h2 className={`text-4xl font-bold text-center mb-16 ${
        theme === 'dark' ? 'text-blue-400' : 'text-blue-600'
      }`}>
        AI-Generated Websites
      </h2>
      <div className="relative h-[600px] overflow-hidden rounded-2xl">
        {websites.map((website, index) => (
          <div
            key={index}
            className={`absolute w-full h-full transition-all duration-700 transform ${
              index === currentSlide ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-full'
            }`}
          >
            <img
              src={website.image}
              alt={website.title}
              className="w-full h-full object-cover"
            />
            <div className={`absolute bottom-0 left-0 right-0 p-8 ${
              theme === 'dark'
                ? 'bg-gradient-to-t from-gray-900 to-transparent'
                : 'bg-gradient-to-t from-white to-transparent'
            }`}>
              <h3 className="text-2xl font-bold mb-2">{website.title}</h3>
              <p className={theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}>
                {website.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default WebsiteCarousel;