import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import AdvancedSpeedTest from './components/AdvancedSpeedTest';
import PrivacyPage from './components/PrivacyPage';
import Footer from './components/Footer';

function App() {
  const [currentPage, setCurrentPage] = useState<'home' | 'privacy'>('home');

  return (
    <div className="min-h-screen">
      <Header onNavigate={setCurrentPage} currentPage={currentPage} />
      
      <AnimatePresence mode="wait">
        {currentPage === 'home' ? (
          <motion.div
            key="home"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <HeroSection />
            <AdvancedSpeedTest />
          </motion.div>
        ) : (
          <motion.div
            key="privacy"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <PrivacyPage />
          </motion.div>
        )}
      </AnimatePresence>
      
      <Footer onNavigate={setCurrentPage} />
    </div>
  );
}

export default App;