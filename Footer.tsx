import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Heart, Zap } from 'lucide-react';

interface FooterProps {
  onNavigate: (page: 'home' | 'privacy') => void;
}

const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.3 }}
      className="bg-gray-900 text-white"
    >
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-lg">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold">SpeedTest Pro</span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Next-generation internet speed testing with AI-powered insights, 
              real-time analytics, and complete privacy protection.
            </p>
          </div>

          {/* Features */}
          <div className="space-y-4">
            <h4 className="font-semibold text-gray-200">Features</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>• Auto-starting speed tests</li>
              <li>• Bufferbloat analysis</li>
              <li>• Network stability monitoring</li>
              <li>• Downloadable reports</li>
              <li>• Complete privacy protection</li>
            </ul>
          </div>

          {/* Legal & Contact */}
          <div className="space-y-4">
            <h4 className="font-semibold text-gray-200">Legal & Contact</h4>
            <ul className="space-y-2 text-sm">
              <button
                onClick={() => onNavigate('privacy')}
                className="text-gray-400 hover:text-white transition-colors flex items-center gap-2"
              >
                <Shield className="w-4 h-4" />
                Privacy Policy
              </button>
              <a
                href="mailto:contact@speedtestpro.com"
                className="text-gray-400 hover:text-white transition-colors block"
              >
                Contact Support
              </a>
            </ul>
            
            <div className="pt-4">
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <span>Made with</span>
                <Heart className="w-4 h-4 text-red-500" />
                <span>for fast internet</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
            <p>&copy; 2024 SpeedTest Pro. All rights reserved.</p>
            <p className="mt-2 md:mt-0">
              GDPR & CCPA Compliant • Zero Data Collection • Privacy-First
            </p>
          </div>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;