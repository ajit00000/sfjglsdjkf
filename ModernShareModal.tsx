import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Copy, Check, QrCode, MessageCircle, Mail, Linkedin } from 'lucide-react';
import { SpeedTestResult } from '../types/speedTest';
import QRCode from 'qrcode';

interface ModernShareModalProps {
  result: SpeedTestResult;
  onClose: () => void;
}

const ModernShareModal: React.FC<ModernShareModalProps> = ({ result, onClose }) => {
  const [copied, setCopied] = useState(false);
  const [qrCodeUrl, setQrCodeUrl] = useState<string>('');
  
  const shareUrl = `${window.location.origin}/results/${result.id}`;
  const shareText = `🚀 My internet speed test results:\n📥 ${result.downloadSpeed.toFixed(1)} Mbps download\n📤 ${result.uploadSpeed.toFixed(1)} Mbps upload\n⚡ ${result.ping.toFixed(0)}ms ping\n\nTest your speed at SpeedTest Pro!`;
  
  useEffect(() => {
    const generateQR = async () => {
      try {
        const url = await QRCode.toDataURL(shareUrl, {
          width: 200,
          margin: 2,
          color: {
            dark: '#1F2937',
            light: '#FFFFFF'
          }
        });
        setQrCodeUrl(url);
      } catch (error) {
        console.error('Error generating QR code:', error);
      }
    };

    generateQR();
  }, [shareUrl]);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(`${shareText}\n\n${shareUrl}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy to clipboard:', error);
    }
  };

  const shareOnPlatform = (platform: string) => {
    const encodedText = encodeURIComponent(shareText);
    const encodedUrl = encodeURIComponent(shareUrl);
    
    const urls = {
      whatsapp: `https://wa.me/?text=${encodedText}%0A%0A${encodedUrl}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
      twitter: `https://twitter.com/intent/tweet?text=${encodedText}&url=${encodedUrl}`,
      email: `mailto:?subject=My Internet Speed Test Results&body=${encodedText}%0A%0A${encodedUrl}`
    };
    
    if (platform === 'email') {
      window.location.href = urls[platform as keyof typeof urls];
    } else {
      window.open(urls[platform as keyof typeof urls], '_blank', 'width=550,height=420');
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="bg-white rounded-2xl max-w-md w-full p-6 relative shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 transition-colors rounded-lg hover:bg-gray-100"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="mb-6">
            <h3 className="text-2xl font-bold text-gray-800 mb-2">Share Your Results</h3>
            <p className="text-gray-600">Show off your internet speed!</p>
          </div>

          {/* Results Summary */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-4 mb-6 border border-blue-100"
          >
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-blue-600">
                  {result.downloadSpeed.toFixed(1)}
                </div>
                <div className="text-xs text-gray-600 font-medium">Mbps Down</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-purple-600">
                  {result.uploadSpeed.toFixed(1)}
                </div>
                <div className="text-xs text-gray-600 font-medium">Mbps Up</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-orange-600">
                  {result.ping.toFixed(0)}
                </div>
                <div className="text-xs text-gray-600 font-medium">ms Ping</div>
              </div>
            </div>
          </motion.div>

          {/* Share Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-4"
          >
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => shareOnPlatform('whatsapp')}
                className="flex items-center justify-center gap-3 px-4 py-3 bg-green-500 text-white rounded-xl hover:bg-green-600 transition-colors font-medium"
              >
                <MessageCircle className="w-5 h-5" />
                WhatsApp
              </button>
              
              <button
                onClick={() => shareOnPlatform('linkedin')}
                className="flex items-center justify-center gap-3 px-4 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors font-medium"
              >
                <Linkedin className="w-5 h-5" />
                LinkedIn
              </button>
              
              <button
                onClick={() => shareOnPlatform('twitter')}
                className="flex items-center justify-center gap-3 px-4 py-3 bg-sky-500 text-white rounded-xl hover:bg-sky-600 transition-colors font-medium"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
                X (Twitter)
              </button>
              
              <button
                onClick={() => shareOnPlatform('email')}
                className="flex items-center justify-center gap-3 px-4 py-3 bg-gray-600 text-white rounded-xl hover:bg-gray-700 transition-colors font-medium"
              >
                <Mail className="w-5 h-5" />
                Email
              </button>
            </div>

            {/* Copy Link */}
            <button
              onClick={copyToClipboard}
              className="w-full flex items-center justify-center gap-3 px-4 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors font-medium"
            >
              {copied ? (
                <>
                  <Check className="w-5 h-5 text-green-600" />
                  <span className="text-green-600">Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-5 h-5" />
                  Copy Link & Results
                </>
              )}
            </button>
          </motion.div>

          {/* QR Code */}
          {qrCodeUrl && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mt-6 text-center"
            >
              <div className="flex items-center justify-center gap-2 mb-3">
                <QrCode className="w-4 h-4 text-gray-500" />
                <span className="text-sm font-medium text-gray-700">QR Code</span>
              </div>
              <div className="inline-block p-3 bg-white border border-gray-200 rounded-xl">
                <img
                  src={qrCodeUrl}
                  alt="QR Code for sharing results"
                  className="w-32 h-32"
                />
              </div>
              <p className="text-xs text-gray-500 mt-2">Scan to view results</p>
            </motion.div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ModernShareModal;