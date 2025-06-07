import React from 'react';

interface SpeedGaugeProps {
  speed: number;
  maxSpeed: number;
  label: string;
  unit: string;
  color: string;
}

const SpeedGauge: React.FC<SpeedGaugeProps> = ({ 
  speed, 
  maxSpeed, 
  label, 
  unit, 
  color 
}) => {
  const percentage = Math.min((speed / maxSpeed) * 100, 100);
  const circumference = 2 * Math.PI * 45;
  const strokeDasharray = circumference;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-32 h-32">
        <svg className="w-full h-full transform -rotate-90\" viewBox="0 0 100 100">
          {/* Background circle */}
          <circle
            cx="50"
            cy="50" 
            r="45"
            stroke="currentColor"
            strokeWidth="8"
            fill="none"
            className="text-gray-200"
          />
          {/* Progress circle */}
          <circle
            cx="50"
            cy="50"
            r="45"
            stroke={color}
            strokeWidth="8"
            fill="none"
            strokeLinecap="round"
            strokeDasharray={strokeDasharray}
            strokeDashoffset={strokeDashoffset}
            className="transition-all duration-300 ease-out drop-shadow-sm"
          />
        </svg>
        
        {/* Center content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-2xl font-bold text-gray-800">
            {speed.toFixed(1)}
          </span>
          <span className="text-sm text-gray-600 font-medium">{unit}</span>
        </div>
      </div>
      
      <span className="text-sm font-medium text-gray-700 mt-2">{label}</span>
    </div>
  );
};

export default SpeedGauge;