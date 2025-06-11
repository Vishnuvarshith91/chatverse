import React, { useState, useEffect } from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  Trophy, 
  Target,
  Calendar,
  Activity,
  Award,
  Clock,
  Zap
} from 'lucide-react';

interface SportsAnalyticsProps {
  onClose?: () => void;
}

interface AnalyticsData {
  sport: string;
  metrics: {
    totalMatches: number;
    avgScore: string;
    topPerformer: string;
    winRate: number;
  };
  trends: {
    period: string;
    value: number;
    change: number;
  }[];
  playerStats: {
    name: string;
    performance: number;
    trend: 'up' | 'down' | 'stable';
  }[];
}

const SportsAnalytics: React.FC<SportsAnalyticsProps> = ({ onClose }) => {
  const [selectedSport, setSelectedSport] = useState('cricket');
  const [timeframe, setTimeframe] = useState('month');
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const sports = [
    { id: 'cricket', name: 'Cricket' },
    { id: 'football', name: 'Football' },
    { id: 'basketball', name: 'Basketball' },
    { id: 'tennis', name: 'Tennis' }
  ];

  const timeframes = [
    { id: 'week', name: 'This Week' },
    { id: 'month', name: 'This Month' },
    { id: 'quarter', name: 'This Quarter' },
    { id: 'year', name: 'This Year' }
  ];

  useEffect(() => {
    generateAnalytics();
  }, [selectedSport, timeframe]);

  const generateAnalytics = async () => {
    setIsLoading(true);
    
    // Simulate AI analytics generation
    setTimeout(() => {
      const mockAnalytics: AnalyticsData = {
        sport: selectedSport,
        metrics: {
          totalMatches: selectedSport === 'cricket' ? 45 : selectedSport === 'football' ? 38 : 52,
          avgScore: selectedSport === 'cricket' ? '285/7' : selectedSport === 'football' ? '2.3' : '108.5',
          topPerformer: selectedSport === 'cricket' ? 'Virat Kohli' : selectedSport === 'football' ? 'Lionel Messi' : 'LeBron James',
          winRate: Math.floor(Math.random() * 30) + 60
        },
        trends: [
          { period: 'Week 1', value: 75, change: 5.2 },
          { period: 'Week 2', value: 82, change: 9.3 },
          { period: 'Week 3', value: 78, change: -4.9 },
          { period: 'Week 4', value: 89, change: 14.1 },
          { period: 'Week 5', value: 85, change: -4.5 }
        ],
        playerStats: [
          { name: 'Virat Kohli', performance: 94, trend: 'up' },
          { name: 'Rohit Sharma', performance: 87, trend: 'up' },
          { name: 'KL Rahul', performance: 82, trend: 'stable' },
          { name: 'Hardik Pandya', performance: 79, trend: 'down' },
          { name: 'Jasprit Bumrah', performance: 91, trend: 'up' }
        ]
      };
      
      setAnalyticsData(mockAnalytics);
      setIsLoading(false);
    }, 1500);
  };

  const getTrendIcon = (trend: 'up' | 'down' | 'stable') => {
    switch (trend) {
      case 'up':
        return <TrendingUp className="w-4 h-4 text-green-500" />;
      case 'down':
        return <TrendingUp className="w-4 h-4 text-red-500 rotate-180" />;
      default:
        return <div className="w-4 h-4 bg-gray-400 rounded-full" />;
    }
  };

  const getTrendColor = (trend: 'up' | 'down' | 'stable') => {
    switch (trend) {
      case 'up':
        return 'text-green-600 dark:text-green-400';
      case 'down':
        return 'text-red-600 dark:text-red-400';
      default:
        return 'text-gray-600 dark:text-gray-400';
    }
  };

  return (
    <div className="bg-white dark:bg-dark-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-dark-700">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
            <BarChart3 className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Sports Analytics Dashboard</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">Advanced performance metrics and insights</p>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Sport
          </label>
          <select
            value={selectedSport}
            onChange={(e) => setSelectedSport(e.target.value)}
            className="w-full p-2 border border-gray-300 dark:border-dark-600 rounded-lg bg-gray-50 dark:bg-dark-700 text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            {sports.map((sport) => (
              <option key={sport.id} value={sport.id}>{sport.name}</option>
            ))}
          </select>
        </div>
        
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Timeframe
          </label>
          <select
            value={timeframe}
            onChange={(e) => setTimeframe(e.target.value)}
            className="w-full p-2 border border-gray-300 dark:border-dark-600 rounded-lg bg-gray-50 dark:bg-dark-700 text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            {timeframes.map((tf) => (
              <option key={tf.id} value={tf.id}>{tf.name}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Loading State */}
      {isLoading && (
        <div className="text-center py-8">
          <div className="w-12 h-12 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600 dark:text-gray-400">Analyzing sports data...</p>
          <p className="text-sm text-gray-500 dark:text-gray-500 mt-1">Processing performance metrics</p>
        </div>
      )}

      {/* Analytics Display */}
      {analyticsData && (
        <div className="space-y-6">
          {/* Key Metrics */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/10 dark:to-cyan-900/10 rounded-lg border border-blue-200 dark:border-blue-800">
              <div className="flex items-center space-x-2 mb-2">
                <Activity className="w-4 h-4 text-blue-600" />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Total Matches</span>
              </div>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{analyticsData.metrics.totalMatches}</p>
              <p className="text-xs text-blue-600 dark:text-blue-400">+12% from last period</p>
            </div>
            
            <div className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/10 dark:to-emerald-900/10 rounded-lg border border-green-200 dark:border-green-800">
              <div className="flex items-center space-x-2 mb-2">
                <Target className="w-4 h-4 text-green-600" />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Avg Score</span>
              </div>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{analyticsData.metrics.avgScore}</p>
              <p className="text-xs text-green-600 dark:text-green-400">+8.5% improvement</p>
            </div>
            
            <div className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/10 dark:to-pink-900/10 rounded-lg border border-purple-200 dark:border-purple-800">
              <div className="flex items-center space-x-2 mb-2">
                <Award className="w-4 h-4 text-purple-600" />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Top Performer</span>
              </div>
              <p className="text-lg font-bold text-gray-900 dark:text-white">{analyticsData.metrics.topPerformer}</p>
              <p className="text-xs text-purple-600 dark:text-purple-400">Leading scorer</p>
            </div>
            
            <div className="p-4 bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/10 dark:to-orange-900/10 rounded-lg border border-yellow-200 dark:border-yellow-800">
              <div className="flex items-center space-x-2 mb-2">
                <Trophy className="w-4 h-4 text-yellow-600" />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Win Rate</span>
              </div>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{analyticsData.metrics.winRate}%</p>
              <p className="text-xs text-yellow-600 dark:text-yellow-400">Above average</p>
            </div>
          </div>

          {/* Performance Trends */}
          <div className="bg-gray-50 dark:bg-dark-700 rounded-lg p-4">
            <h5 className="font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
              <TrendingUp className="w-4 h-4 mr-2" />
              Performance Trends
            </h5>
            <div className="space-y-3">
              {analyticsData.trends.map((trend, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-white dark:bg-dark-800 rounded border border-gray-200 dark:border-dark-600">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-purple-100 dark:bg-purple-900/20 rounded-lg flex items-center justify-center">
                      <span className="text-xs font-medium text-purple-700 dark:text-purple-300">{index + 1}</span>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white text-sm">{trend.period}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Performance Score</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <div className="text-right">
                      <p className="font-semibold text-gray-900 dark:text-white">{trend.value}</p>
                      <p className={`text-xs ${trend.change > 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                        {trend.change > 0 ? '+' : ''}{trend.change}%
                      </p>
                    </div>
                    <div className="w-16 bg-gray-200 dark:bg-dark-600 rounded-full h-2">
                      <div 
                        className="bg-purple-500 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${(trend.value / 100) * 100}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Player Performance */}
          <div className="bg-gray-50 dark:bg-dark-700 rounded-lg p-4">
            <h5 className="font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
              <Users className="w-4 h-4 mr-2" />
              Top Player Performance
            </h5>
            <div className="space-y-3">
              {analyticsData.playerStats.map((player, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-white dark:bg-dark-800 rounded border border-gray-200 dark:border-dark-600">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                      {index + 1}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white text-sm">{player.name}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Performance Rating</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <div className="text-right">
                      <p className="font-semibold text-gray-900 dark:text-white">{player.performance}</p>
                      <p className={`text-xs ${getTrendColor(player.trend)}`}>
                        {player.trend === 'up' ? 'Improving' : player.trend === 'down' ? 'Declining' : 'Stable'}
                      </p>
                    </div>
                    {getTrendIcon(player.trend)}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* AI Insights */}
          <div className="p-4 bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/20 dark:to-pink-900/20 rounded-lg border border-purple-200 dark:border-purple-800">
            <h5 className="font-semibold text-gray-900 dark:text-white mb-2 flex items-center">
              <Zap className="w-4 h-4 mr-2 text-purple-600" />
              AI Analytics Insights
            </h5>
            <div className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
              <p>• Performance metrics show consistent improvement over the selected timeframe</p>
              <p>• Top performers are maintaining excellent form with upward trends</p>
              <p>• Team coordination and strategy execution have improved by 15% this period</p>
              <p>• Predictive models suggest continued strong performance in upcoming matches</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SportsAnalytics;