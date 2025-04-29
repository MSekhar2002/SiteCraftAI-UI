import { useState, useEffect } from 'react';
import { Bot, Laptop2, Rocket, Zap, Layout, Globe } from 'lucide-react';
import ChatInterface from './components/ChatInterface';
import ThemeToggle from './components/ThemeToggle';
import { useTheme } from './hooks/useTheme';
import WebsiteCarousel from './components/WebsiteCarousel';
import FeatureCard from './components/FeatureCard';
import ParallaxHero from './components/ParallaxHero';
import Testimonials from './components/Testimonials';
import Pricing from './components/Pricing';
import Footer from './components/Footer';

function App() {
  const { theme, toggleTheme } = useTheme();
  const [showChat, setShowChat] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (showChat) {
    return <ChatInterface onBack={() => setShowChat(false)} />;
  }

  return (
    <div className={`min-h-screen transition-colors duration-300 ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`}>
      {/* Navbar */}
      <nav className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled 
          ? `${theme === 'dark' ? 'bg-gray-900/80' : 'bg-white/80'} backdrop-blur-lg shadow-lg` 
          : 'bg-transparent'
      }`}>
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Bot className={`w-8 h-8 ${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'}`} />
              <span className="text-xl font-bold">SiteCraft AI</span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className={`hover:text-blue-500 transition-colors ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>Features</a>
              <a href="#showcase" className={`hover:text-blue-500 transition-colors ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>Showcase</a>
              <a href="#pricing" className={`hover:text-blue-500 transition-colors ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>Pricing</a>
              <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <ParallaxHero theme={theme} />

      {/* Main Content */}
      <main className="container mx-auto px-6 py-20">
        {/* Features Grid */}
        <section id="features" className="mb-32">
          <h2 className={`text-4xl font-bold text-center mb-16 ${
            theme === 'dark' ? 'text-blue-400' : 'text-blue-600'
          }`}>
            Powerful Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard
              icon={<Laptop2 />}
              title="Natural Language to Code"
              description="Transform your ideas into stunning websites using simple English prompts"
              theme={theme}
            />
            <FeatureCard
              icon={<Rocket />}
              title="Instant Deployment"
              description="Deploy your website instantly with one click to our global CDN"
              theme={theme}
            />
            <FeatureCard
              icon={<Layout />}
              title="Responsive Design"
              description="Your website looks perfect on all devices, automatically"
              theme={theme}
            />
            <FeatureCard
              icon={<Zap />}
              title="Lightning Fast"
              description="Optimized performance with next-gen image formats and caching"
              theme={theme}
            />
            <FeatureCard
              icon={<Globe />}
              title="SEO Optimized"
              description="Built-in SEO best practices for better visibility"
              theme={theme}
            />
            <FeatureCard
              icon={<Bot />}
              title="AI-Powered"
              description="Smart suggestions and optimizations powered by AI"
              theme={theme}
            />
          </div>
        </section>

        {/* Website Carousel */}
        <section id="showcase">
          <WebsiteCarousel theme={theme} />
        </section>

        {/* Testimonials */}
        <Testimonials theme={theme} />

        {/* Pricing */}
        <section id="pricing">
          <Pricing theme={theme} />
        </section>

        {/* CTA Section */}
        <section className="text-center py-20">
          <h2 className={`text-4xl font-bold mb-8 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            Ready to Build Your Dream Website?
          </h2>
          <p className={`text-xl mb-12 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
            Join thousands of creators who trust SiteCraft AI to bring their vision to life.
          </p>
          <button
            onClick={() => setShowChat(true)}
            className={`
              px-8 py-4 rounded-full text-xl font-bold
              transition-all duration-300 transform hover:scale-105
              ${theme === 'dark' 
                ? 'bg-blue-600 hover:bg-blue-500 text-white shadow-[0_0_20px_rgba(37,99,235,0.5)]' 
                : 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg'
              }
            `}
          >
            Build with AI Now
          </button>
        </section>
      </main>

      {/* Footer */}
      <Footer theme={theme} />
    </div>
  );
}

export default App;