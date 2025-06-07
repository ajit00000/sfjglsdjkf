import React from 'react';
import { motion } from 'framer-motion';
import { Zap, Menu, X } from 'lucide-react';

interface HeaderProps {
  onNavigate: (page: 'home' | 'privacy') => void;
  currentPage: 'home' | 'privacy';
}

const Header: React.FC<HeaderProps> = ({ onNavigate, currentPage }) => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-white/95 backdrop-blur-md border-b border-gray-200/50 sticky top-0 z-50 shadow-sm"
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-3 cursor-pointer"
            onClick={() => onNavigate('home')}
          >
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-xl shadow-lg">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              SpeedTest Pro
            </span>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => onNavigate('home')}
              className={`text-gray-700 hover:text-blue-600 transition-colors font-medium ${
                currentPage === 'home' ? 'text-blue-600' : ''
              }`}
            >
              Home
            </button>
            <button
              onClick={() => onNavigate('privacy')}
              className={`text-gray-700 hover:text-blue-600 transition-colors font-medium ${
                currentPage === 'privacy' ? 'text-blue-600' : ''
              }`}
            >
              Privacy
            </button>
            <a
              href="mailto:contact@speedtestpro.com"
              className="text-gray-700 hover:text-blue-600 transition-colors font-medium"
            >
              Contact
            </a>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <motion.nav
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden mt-4 pb-4 border-t border-gray-200 pt-4"
          >
            <div className="flex flex-col space-y-4">
              <button
                onClick={() => {
                  onNavigate('home');
                  setIsMenuOpen(false);
                }}
                className={`text-left text-gray-700 hover:text-blue-600 transition-colors py-2 font-medium ${
                  currentPage === 'home' ? 'text-blue-600' : ''
                }`}
              >
                Home
              </button>
              <button
                onClick={() => {
                  onNavigate('privacy');
                  setIsMenuOpen(false);
                }}
                className={`text-left text-gray-700 hover:text-blue-600 transition-colors py-2 font-medium ${
                  currentPage === 'privacy' ? 'text-blue-600' : ''
                }`}
              >
                Privacy
              </button>
              <a
                href="mailto:contact@speedtestpro.com"
                className="text-gray-700 hover:text-blue-600 transition-colors py-2 font-medium"
              >
                Contact
              </a>
            </div>
          </motion.nav>
        )}
      </div>
    </motion.header>
  );
};

export default Header;