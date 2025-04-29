import React from 'react';
import { Github, Twitter, Linkedin, Mail, Heart, Code, Coffee } from 'lucide-react';

interface FooterProps {
  theme: string;
}

const Footer: React.FC<FooterProps> = ({ theme }) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={`w-full py-12 ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Company Info */}
          <div>
            <h3 className={`text-xl font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              SiteCraft AI
            </h3>
            <p className={`mb-4 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
              Revolutionizing web development with AI-powered solutions that transform ideas into stunning websites.
            </p>
            <div className="flex space-x-4">
              <a href="#" className={`hover:text-blue-500 transition-colors ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                <Github className="w-5 h-5" />
              </a>
              <a href="#" className={`hover:text-blue-500 transition-colors ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className={`hover:text-blue-500 transition-colors ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Products */}
          <div>
            <h3 className={`text-xl font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              Products
            </h3>
            <ul className={`space-y-2 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
              <li><a href="#" className="hover:text-blue-500 transition-colors">Website Builder</a></li>
              <li><a href="#" className="hover:text-blue-500 transition-colors">AI Templates</a></li>
              <li><a href="#" className="hover:text-blue-500 transition-colors">Custom Domains</a></li>
              <li><a href="#" className="hover:text-blue-500 transition-colors">Analytics</a></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className={`text-xl font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              Resources
            </h3>
            <ul className={`space-y-2 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
              <li><a href="#" className="hover:text-blue-500 transition-colors">Documentation</a></li>
              <li><a href="#" className="hover:text-blue-500 transition-colors">API Reference</a></li>
              <li><a href="#" className="hover:text-blue-500 transition-colors">Blog</a></li>
              <li><a href="#" className="hover:text-blue-500 transition-colors">Community</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className={`text-xl font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              Contact
            </h3>
            <ul className={`space-y-2 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
              <li className="flex items-center space-x-2">
                <Mail className="w-4 h-4" />
                <span>support@sitecraft.ai</span>
              </li>
              <li>
                <button className={`mt-4 px-6 py-2 rounded-full ${
                  theme === 'dark'
                    ? 'bg-blue-600 hover:bg-blue-500 text-white'
                    : 'bg-blue-600 hover:bg-blue-700 text-white'
                } transition-colors`}>
                  Contact Us
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className={`pt-8 border-t ${theme === 'dark' ? 'border-gray-800' : 'border-gray-200'}`}>
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
              © {currentYear} SiteCraft AI. All rights reserved.
            </div>
            <div className="flex items-center space-x-4 mt-4 md:mt-0">
              <span className={`flex items-center text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                Made with <Heart className="w-4 h-4 mx-1 text-red-500" /> and <Coffee className="w-4 h-4 mx-1 text-amber-500" />
              </span>
              <a href="#" className={`text-sm hover:text-blue-500 transition-colors ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>Privacy Policy</a>
              <a href="#" className={`text-sm hover:text-blue-500 transition-colors ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>Terms of Service</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;