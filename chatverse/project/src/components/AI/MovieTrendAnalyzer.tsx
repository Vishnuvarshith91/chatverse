import React, { useState, useEffect } from 'react';
import { 
  TrendingUp, 
  BarChart3, 
  Calendar, 
  Globe, 
  Award,
  Users,
  DollarSign,
  Star,
  Film
} from 'lucide-react';

interface MovieTrendAnalyzerProps {
  onClose?: () => void;
}

interface TrendData {
  category: string;
  movies: {
    title: string;
    value: string;
    change: number;
    trend: 'up' | 'down' | 'stable';
  }[];
}

const MovieTrendAnalyzer: React.FC<MovieTrendAnalyzerProps> = ({ onClose }) => {
  const [activeCategory, setActiveCategory] = useState('box-office');
  const [timeframe, setTimeframe] = useState('week');
  const [trendData, setTrendData] = useState<TrendData[]>([]);

  const categories = [
    { id: 'box-office', name: 'Box Office', icon: DollarSign },
    { id: 'ratings', name: 'Ratings', icon: Star },
    { id: 'popularity', name: 'Popularity', icon: TrendingUp },
    { id: 'awards', name: 'Awards Season', icon: Award },
    { id: 'streaming', name: 'Streaming', icon: Film }
  ];

  const timeframes = [
    { id: 'week', name: 'This Week' },
    { id: 'month', name: 'This Month' },
    { id: 'year', name: 'This Year' },
    { id: 'all-time', name: 'All Time' }
  ];

  useEffect(() => {
    // Simulate loading trend data
    const mockTrendData: TrendData[] = [
      {
        category: 'box-office',
        movies: [
          { title: 'Avatar: The Way of Water', value: '$2.32B', change: 15.2, trend: 'up' },
          { title: 'Top Gun: Maverick', value: '$1.49B', change: 8.7, trend: 'up' },
          { title: 'Black Panther: Wakanda Forever', value: '$859M', change: -2.1, trend: 'down' },
          { title: 'Jurassic World Dominion', value: '$1.00B', change: 5.3, trend: 'up' },
          { title: 'Doctor Strange 2', value: '$956M', change: -1.8, trend: 'down' }
        ]
      },
      {
        category: 'ratings',
        movies: [
          { title: 'Everything Everywhere All at Once', value: '8.1/10', change: 12.5, trend: 'up' },
          { title: 'The Banshees of Inisherin', value: '7.8/10', change: 9.2, trend: 'up' },
          { title: 'Tár', value: '7.4/10', change: 6.8, trend: 'up' },
          { title: 'The Fabelmans', value: '7.5/10', change: 4.3, trend: 'up' },
          { title: 'Glass Onion', value: '7.2/10', change: 3.1, trend: 'up' }
        ]
      },
      {
        category: 'popularity',
        movies: [
          { title: 'Wednesday (Netflix)', value: '1.7B hours', change: 45.2, trend: 'up' },
          { title: 'Stranger Things 4', value: '1.4B hours', change: 23.8, trend: 'up' },
          { title: 'The Crown S5', value: '849M hours', change: 18.5, trend: 'up' },
          { title: 'Dahmer', value: '824M hours', change: 67.3, trend: 'up' },
          { title: 'Ozark S4', value: '491M hours', change: -12.4, trend: 'down' }
        ]
      }
    ];
    
    setTrendData(mockTrendData);
  }, [activeCategory, timeframe]);

  const getCurrentData = () => {
    return trendData.find(data => data.category === activeCategory)?.movies || [];
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
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
            <BarChart3 className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Movie Trend Analyzer</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">Real-time insights into movie industry trends</p>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        {/* Category Selection */}
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Category
          </label>
          <div className="grid grid-cols-3 gap-2">
            {categories.slice(0, 3).map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`flex items-center space-x-2 p-2 rounded-lg text-sm font-medium transition-colors ${
                  activeCategory === category.id
                    ? 'bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 border-2 border-blue-500'
                    : 'bg-gray-100 dark:bg-dark-700 text-gray-600 dark:text-gray-400 border-2 border-transparent hover:bg-gray-200 dark:hover:bg-dark-600'
                }`}
              >
                <category.icon className="w-4 h-4" />
                <span>{category.name}</span>
              </button>
            ))}
          </div>
          <div className="grid grid-cols-2 gap-2 mt-2">
            {categories.slice(3).map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`flex items-center space-x-2 p-2 rounded-lg text-sm font-medium transition-colors ${
                  activeCategory === category.id
                    ? 'bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 border-2 border-blue-500'
                    : 'bg-gray-100 dark:bg-dark-700 text-gray-600 dark:text-gray-400 border-2 border-transparent hover:bg-gray-200 dark:hover:bg-dark-600'
                }`}
              >
                <category.icon className="w-4 h-4" />
                <span>{category.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Timeframe Selection */}
        <div className="sm:w-48">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Timeframe
          </label>
          <select
            value={timeframe}
            onChange={(e) => setTimeframe(e.target.value)}
            className="w-full p-2 border border-gray-300 dark:border-dark-600 rounded-lg bg-gray-50 dark:bg-dark-700 text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {timeframes.map((tf) => (
              <option key={tf.id} value={tf.id}>{tf.name}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Trend Data */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h4 className="font-medium text-gray-900 dark:text-white">
            {categories.find(c => c.id === activeCategory)?.name} Trends
          </h4>
          <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
            <Calendar className="w-4 h-4" />
            <span>{timeframes.find(tf => tf.id === timeframe)?.name}</span>
          </div>
        </div>

        <div className="space-y-3">
          {getCurrentData().map((movie, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-dark-700 rounded-lg hover:bg-gray-100 dark:hover:bg-dark-600 transition-colors">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-cyan-400 rounded-lg flex items-center justify-center text-white font-semibold text-sm">
                  {index + 1}
                </div>
                <div>
                  <h5 className="font-medium text-gray-900 dark:text-white">{movie.title}</h5>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{movie.value}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                {getTrendIcon(movie.trend)}
                <span className={`text-sm font-medium ${getTrendColor(movie.trend)}`}>
                  {movie.change > 0 ? '+' : ''}{movie.change}%
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Insights */}
      <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/10 dark:to-cyan-900/10 rounded-lg border border-blue-200 dark:border-blue-800">
        <h5 className="font-semibold text-gray-900 dark:text-white mb-2 flex items-center">
          <BarChart3 className="w-4 h-4 mr-2 text-blue-600" />
          AI Insights
        </h5>
        <div className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
          <p>• Streaming content is showing unprecedented growth with 45% increase in viewership</p>
          <p>• Independent films are gaining more recognition in awards season</p>
          <p>• Superhero movies continue to dominate box office despite market saturation</p>
          <p>• International content is breaking into mainstream popularity</p>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="mt-6 grid grid-cols-3 gap-4">
        <div className="text-center p-3 bg-gray-50 dark:bg-dark-700 rounded-lg">
          <div className="flex items-center justify-center space-x-1 mb-1">
            <Globe className="w-4 h-4 text-blue-500" />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Global Revenue</span>
          </div>
          <p className="text-lg font-bold text-gray-900 dark:text-white">$42.5B</p>
          <p className="text-xs text-green-600 dark:text-green-400">+8.2% YoY</p>
        </div>
        
        <div className="text-center p-3 bg-gray-50 dark:bg-dark-700 rounded-lg">
          <div className="flex items-center justify-center space-x-1 mb-1">
            <Users className="w-4 h-4 text-purple-500" />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Active Viewers</span>
          </div>
          <p className="text-lg font-bold text-gray-900 dark:text-white">2.8B</p>
          <p className="text-xs text-green-600 dark:text-green-400">+12.5% YoY</p>
        </div>
        
        <div className="text-center p-3 bg-gray-50 dark:bg-dark-700 rounded-lg">
          <div className="flex items-center justify-center space-x-1 mb-1">
            <Film className="w-4 h-4 text-red-500" />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">New Releases</span>
          </div>
          <p className="text-lg font-bold text-gray-900 dark:text-white">1,247</p>
          <p className="text-xs text-blue-600 dark:text-blue-400">This month</p>
        </div>
      </div>
    </div>
  );
};

export default MovieTrendAnalyzer;