import React from 'react';

interface DashboardCardProps {
  title: string;
  value: string | number;
  icon?: string;
  trend?: string;
  trendDirection?: 'up' | 'down' | 'neutral';
  color?: string;
  description?: string;
}

const DashboardCard = ({ 
  title, 
  value, 
  icon = '📊', 
  trend, 
  trendDirection = 'neutral', 
  color = 'from-purple-500 to-pink-500',
  description 
}: DashboardCardProps) => {
  const getTrendIcon = () => {
    switch (trendDirection) {
      case 'up': return '📈';
      case 'down': return '📉';
      default: return '➡️';
    }
  };

  const getTrendColor = () => {
    switch (trendDirection) {
      case 'up': return 'text-green-600';
      case 'down': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group">
      <div className={`h-1 bg-gradient-to-r ${color}`}></div>
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${color} flex items-center justify-center text-white text-xl shadow-lg`}>
            {icon}
          </div>
          {trend && (
            <div className={`flex items-center space-x-1 text-sm ${getTrendColor()}`}>
              <span className="text-xs">{getTrendIcon()}</span>
              <span className="font-medium">{trend}</span>
            </div>
          )}
        </div>
        
        <div className="space-y-2">
          <h3 className="text-gray-600 text-sm font-medium uppercase tracking-wide">{title}</h3>
          <div className="flex items-end space-x-2">
            <span className="text-3xl font-bold text-gray-800 group-hover:text-purple-600 transition-colors">
              {value}
            </span>
          </div>
          {description && (
            <p className="text-gray-500 text-sm">{description}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardCard;