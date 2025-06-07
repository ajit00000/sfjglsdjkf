import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Share2, RotateCcw, Award, TrendingUp, Clock, MapPin } from 'lucide-react';
import { SpeedTestResult } from '../types/speedTest';
import SpeedGauge from './SpeedGauge';
import ShareModal from './ShareModal';
import ReportGenerator from './ReportGenerator';
import TestHistory from './TestHistory';

interface EnhancedResultsDisplayProps {
  result: SpeedTestResult;
  onNewTest: () => void;
}

const EnhancedResultsDisplay: React.FC<EnhancedResultsDisplayProps> = ({ result, onNewTest }) => {
  const [showShareModal, setShowShareModal] = useState(false);
  const [activeTab, setActiveTab] = useState<'results' | 'history' | 'reports'>('results');

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleString();
  };

  const getPerformanceGrade = () => {
    const downloadScore = Math.min(result.downloadSpeed / 100, 1) * 40;
    const uploadScore = Math.min(result.uploadSpeed / 50, 1) * 30;
    const pingScore = Math.max(0, (100 - result.ping) / 100) * 30;
    const totalScore = downloadScore + uploadScore + pingScore;

    if (totalScore >= 90) return { grade: 'A+', color: 'text-green-600', bg: 'bg-green-100' };
    if (totalScore >= 80) return { grade: 'A', color: 'text-green-600', bg: 'bg-green-100' };
    if (totalScore >= 70) return { grade: 'B', color: 'text-blue-600', bg: 'bg-blue-100' };
    if (totalScore >= 60) return { grade: 'C', color: 'text-yellow-600', bg: 'bg-yellow-100' };
    return { grade: 'D', color: 'text-red-600', bg: 'bg-red-100' };
  };

  const performance = getPerformanceGrade();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
      <div className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-6xl mx-auto"
        >
          {/* Header */}
          <div className="text-center mb-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className={`inline-flex items-center gap-3 px-6 py-3 ${performance.bg} rounded-full mb-4`}
            >
              <Award className={`w-6 h-6 ${performance.color}`} />
              <span className={`text-xl font-bold ${performance.color}`}>
                Grade {performance.grade}
              </span>
            </motion.div>
            
            <h1 className="text-4xl font-bold text-gray-800 mb-2">Test Complete!</h1>
            <div className="flex items-center justify-center gap-4 text-gray-600">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>{formatDate(result.timestamp)}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                <span>{result.serverLocation}</span>
              </div>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="flex justify-center mb-8">
            <div className="bg-white rounded-xl p-1 shadow-lg border border-gray-200">
              {[
                { id: 'results', label: 'Results', icon: TrendingUp },
                { id: 'history', label: 'History', icon: Clock },
                { id: 'reports', label: 'Reports', icon: Share2 }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                    activeTab === tab.id
                      ? 'bg-blue-600 text-white shadow-md'
                      : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'
                  }`}
                >
                  <tab.icon className="w-4 h-4" />
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Tab Content */}
          {activeTab === 'results' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-8"
            >
              {/* Speed Gauges */}
              <div className="bg-white rounded-2xl p-8 shadow-xl border border-gray-100">
                <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Performance Metrics</h2>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                  <SpeedGauge
                    speed={result.downloadSpeed}
                    maxSpeed={200}
                    label="Download"
                    unit="Mbps"
                    color="#10B981"
                  />
                  <SpeedGauge
                    speed={result.uploadSpeed}
                    maxSpeed={100}
                    label="Upload"
                    unit="Mbps"
                    color="#3B82F6"
                  />
                  <SpeedGauge
                    speed={result.ping}
                    maxSpeed={100}
                    label="Ping"
                    unit="ms"
                    color="#F59E0B"
                  />
                  <SpeedGauge
                    speed={result.jitter}
                    maxSpeed={20}
                    label="Jitter"
                    unit="ms"
                    color="#8B5CF6"
                  />
                </div>
              </div>

              {/* Detailed Analysis */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
                  <h3 className="text-xl font-semibold text-gray-800 mb-4">Performance Analysis</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <span className="text-gray-600">Download Quality</span>
                      <span className={`font-semibold ${result.downloadSpeed > 25 ? 'text-green-600' : result.downloadSpeed > 10 ? 'text-yellow-600' : 'text-red-600'}`}>
                        {result.downloadSpeed > 25 ? 'Excellent' : result.downloadSpeed > 10 ? 'Good' : 'Poor'}
                      </span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <span className="text-gray-600">Upload Quality</span>
                      <span className={`font-semibold ${result.uploadSpeed > 10 ? 'text-green-600' : result.uploadSpeed > 5 ? 'text-yellow-600' : 'text-red-600'}`}>
                        {result.uploadSpeed > 10 ? 'Excellent' : result.uploadSpeed > 5 ? 'Good' : 'Poor'}
                      </span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <span className="text-gray-600">Gaming Performance</span>
                      <span className={`font-semibold ${result.ping < 20 ? 'text-green-600' : result.ping < 50 ? 'text-yellow-600' : 'text-red-600'}`}>
                        {result.ping < 20 ? 'Excellent' : result.ping < 50 ? 'Good' : 'Poor'}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Bufferbloat Results */}
                {result.bufferbloat && (
                  <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
                    <h3 className="text-xl font-semibold text-gray-800 mb-4">Bufferbloat Analysis</h3>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Overall Rating</span>
                        <div className={`px-3 py-1 rounded-full font-semibold ${
                          result.bufferbloat.rating === 'A' ? 'bg-green-100 text-green-700' :
                          result.bufferbloat.rating === 'B' ? 'bg-blue-100 text-blue-700' :
                          result.bufferbloat.rating === 'C' ? 'bg-yellow-100 text-yellow-700' :
                          'bg-red-100 text-red-700'
                        }`}>
                          {result.bufferbloat.rating}
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Latency Increase</span>
                        <span className="font-semibold text-gray-800">+{result.bufferbloat.latencyIncrease}ms</span>
                      </div>
                      <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
                        {result.bufferbloat.rating === 'A' || result.bufferbloat.rating === 'B' 
                          ? 'Your network shows minimal bufferbloat. Great for real-time applications!'
                          : 'Some bufferbloat detected. This may affect gaming and video calls during heavy usage.'
                        }
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          )}

          {activeTab === 'history' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <TestHistory currentResult={result} />
            </motion.div>
          )}

          {activeTab === 'reports' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <ReportGenerator result={result} />
            </motion.div>
          )}

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mt-8"
          >
            <button
              onClick={onNewTest}
              className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl flex items-center gap-3 justify-center"
            >
              <RotateCcw className="w-5 h-5" />
              Run New Test
            </button>
            <button
              onClick={() => setShowShareModal(true)}
              className="px-8 py-4 bg-white text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-colors duration-200 shadow-lg border border-gray-200 flex items-center gap-3 justify-center"
            >
              <Share2 className="w-5 h-5" />
              Share Results
            </button>
          </motion.div>

          {/* Share Modal */}
          {showShareModal && (
            <ShareModal
              result={result}
              onClose={() => setShowShareModal(false)}
            />
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default EnhancedResultsDisplay;