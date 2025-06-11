import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { 
  Trophy, 
  TrendingUp, 
  Clock, 
  Users, 
  Play, 
  Target,
  Calendar,
  BarChart3,
  Zap,
  Filter,
  Bot,
  Sparkles,
  Activity
} from 'lucide-react';
import SportsAI from '../components/AI/SportsAI';
import SportsPredictor from '../components/AI/SportsPredictor';
import SportsAnalytics from '../components/AI/SportsAnalytics';

const SportsCenter: React.FC = () => {
  const [selectedSport, setSelectedSport] = useState('all');
  const [activeAITool, setActiveAITool] = useState<string | null>(null);

  const liveMatches = [
    {
      id: '1',
      sport: 'cricket',
      teams: { home: 'India', away: 'Australia' },
      score: { home: '287/4', away: '312/8' },
      status: 'Live - 45th Over',
      viewers: 12500,
      aiAnalysis: true,
      thumbnail: 'https://images.pexels.com/photos/1661950/pexels-photo-1661950.jpeg?auto=compress&cs=tinysrgb&w=400&h=200&dpr=2',
    },
    {
      id: '2',
      sport: 'football',
      teams: { home: 'Manchester United', away: 'Liverpool' },
      score: { home: '2', away: '1' },
      status: 'Live - 73rd Minute',
      viewers: 8900,
      aiAnalysis: true,
      thumbnail: 'https://images.pexels.com/photos/114296/pexels-photo-114296.jpeg?auto=compress&cs=tinysrgb&w=400&h=200&dpr=2',
    },
    {
      id: '3',
      sport: 'basketball',
      teams: { home: 'Lakers', away: 'Warriors' },
      score: { home: '98', away: '102' },
      status: 'Live - Q4 8:42',
      viewers: 6700,
      aiAnalysis: false,
      thumbnail: 'https://images.pexels.com/photos/358042/pexels-photo-358042.jpeg?auto=compress&cs=tinysrgb&w=400&h=200&dpr=2',
    },
  ];

  const upcomingMatches = [
    { teams: 'England vs Pakistan', time: '2:30 PM', sport: 'Cricket' },
    { teams: 'Real Madrid vs Barcelona', time: '5:00 PM', sport: 'Football' },
    { teams: 'Celtics vs Nets', time: '8:30 PM', sport: 'Basketball' },
  ];

  const topPlayers = [
    { name: 'Virat Kohli', sport: 'Cricket', rating: 9.4, stats: '12,344 runs' },
    { name: 'Lionel Messi', sport: 'Football', rating: 9.6, stats: '800+ goals' },
    { name: 'LeBron James', sport: 'Basketball', rating: 9.3, stats: '38,000+ points' },
  ];

  const sportsCategories = [
    { id: 'all', name: 'All Sports', count: 12 },
    { id: 'cricket', name: 'Cricket', count: 4 },
    { id: 'football', name: 'Football', count: 3 },
    { id: 'basketball', name: 'Basketball', count: 2 },
    { id: 'tennis', name: 'Tennis', count: 2 },
    { id: 'baseball', name: 'Baseball', count: 1 },
  ];

  const aiTools = [
    {
      id: 'sports-knowledge',
      name: 'Sports Knowledge Base',
      description: 'Get comprehensive information about players, teams, and matches',
      icon: Trophy,
      color: 'from-green-500 to-emerald-500',
      component: SportsAI
    },
    {
      id: 'predictions',
      name: 'Match Predictor',
      description: 'AI-powered match predictions and betting insights',
      icon: TrendingUp,
      color: 'from-blue-500 to-cyan-500',
      component: SportsPredictor
    },
    {
      id: 'analytics',
      name: 'Performance Analytics',
      description: 'Advanced sports analytics and performance metrics',
      icon: BarChart3,
      color: 'from-purple-500 to-pink-500',
      component: SportsAnalytics
    }
  ];

  const filteredMatches = selectedSport === 'all' 
    ? liveMatches 
    : liveMatches.filter(match => match.sport === selectedSport);

  const ActiveAIComponent = activeAITool ? aiTools.find(tool => tool.id === activeAITool)?.component : null;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Sports Center</h1>
          <p className="text-gray-600 dark:text-gray-400">Live matches, stats, and AI-powered sports analysis</p>
        </div>
        <div className="flex items-center space-x-2">
          <Filter className="w-4 h-4 text-gray-400" />
          <select
            className="border border-gray-300 dark:border-dark-600 rounded-lg bg-white dark:bg-dark-800 text-gray-900 dark:text-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            value={selectedSport}
            onChange={(e) => setSelectedSport(e.target.value)}
          >
            {sportsCategories.map(category => (
              <option key={category.id} value={category.id}>
                {category.name} ({category.count})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* AI Sports Tools Section */}
      <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/10 dark:to-emerald-900/10 rounded-2xl p-6 border border-green-200 dark:border-green-800">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
              <Bot className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">AI Sports Assistant</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Comprehensive sports knowledge and advanced analytics</p>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {aiTools.map((tool) => (
            <button
              key={tool.id}
              onClick={() => setActiveAITool(activeAITool === tool.id ? null : tool.id)}
              className={`p-4 rounded-xl border-2 transition-all text-left ${
                activeAITool === tool.id
                  ? 'border-green-500 bg-white dark:bg-dark-800 shadow-md'
                  : 'border-transparent bg-white/50 dark:bg-dark-800/50 hover:bg-white dark:hover:bg-dark-800'
              }`}
            >
              <div className="flex items-center space-x-3 mb-2">
                <div className={`w-8 h-8 bg-gradient-to-r ${tool.color} rounded-lg flex items-center justify-center`}>
                  <tool.icon className="w-4 h-4 text-white" />
                </div>
                <h4 className="font-medium text-gray-900 dark:text-white">{tool.name}</h4>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">{tool.description}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Active AI Tool */}
      {ActiveAIComponent && (
        <div className="animate-fade-in">
          <ActiveAIComponent onClose={() => setActiveAITool(null)} />
        </div>
      )}

      {/* Live Matches */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
            <div className="w-2 h-2 bg-red-500 rounded-full mr-2 animate-pulse" />
            Live Matches
          </h2>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            {filteredMatches.length} live now
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredMatches.map((match) => (
            <div
              key={match.id}
              className="bg-white dark:bg-dark-800 rounded-xl shadow-sm border border-gray-200 dark:border-dark-700 overflow-hidden hover:shadow-md transition-shadow"
            >
              <div className="relative h-32 overflow-hidden">
                <img
                  src={match.thumbnail}
                  alt={`${match.teams.home} vs ${match.teams.away}`}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute top-3 left-3 px-2 py-1 bg-red-500 text-white text-xs font-medium rounded-full flex items-center">
                  <div className="w-2 h-2 bg-white rounded-full mr-1 animate-pulse" />
                  LIVE
                </div>
                {match.aiAnalysis && (
                  <div className="absolute top-3 right-3 p-1.5 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg">
                    <Zap className="w-3 h-3 text-white" />
                  </div>
                )}
                <div className="absolute bottom-3 left-3 right-3">
                  <p className="text-white text-sm font-medium">{match.status}</p>
                </div>
              </div>

              <div className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="text-center flex-1">
                    <p className="font-semibold text-gray-900 dark:text-white text-sm">{match.teams.home}</p>
                    <p className="text-lg font-bold text-green-600 dark:text-green-400">{match.score.home}</p>
                  </div>
                  <div className="px-2">
                    <span className="text-gray-400 text-sm">vs</span>
                  </div>
                  <div className="text-center flex-1">
                    <p className="font-semibold text-gray-900 dark:text-white text-sm">{match.teams.away}</p>
                    <p className="text-lg font-bold text-green-600 dark:text-green-400">{match.score.away}</p>
                  </div>
                </div>

                <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                  <div className="flex items-center">
                    <Users className="w-4 h-4 mr-1" />
                    {match.viewers.toLocaleString()} viewers
                  </div>
                  <button className="px-3 py-1.5 bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-300 text-sm font-medium rounded-lg hover:bg-green-200 dark:hover:bg-green-900/30 transition-colors">
                    Watch Live
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Stats Dashboard */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Upcoming Matches */}
        <div className="bg-white dark:bg-dark-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-dark-700">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-900 dark:text-white">Upcoming Matches</h3>
            <Calendar className="w-4 h-4 text-gray-400" />
          </div>
          <div className="space-y-3">
            {upcomingMatches.map((match, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-dark-700 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900 dark:text-white text-sm">{match.teams}</p>
                  <p className="text-gray-500 dark:text-gray-400 text-xs">{match.sport}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{match.time}</p>
                  <div className="flex items-center">
                    <Clock className="w-3 h-3 text-gray-400 mr-1" />
                    <span className="text-xs text-gray-500 dark:text-gray-400">Today</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Players */}
        <div className="bg-white dark:bg-dark-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-dark-700">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-900 dark:text-white">Top Players</h3>
            <Target className="w-4 h-4 text-gray-400" />
          </div>
          <div className="space-y-4">
            {topPlayers.map((player, index) => (
              <div key={index} className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                  {index + 1}
                </div>
                <div className="flex-1">
                  <p className="font-medium text-gray-900 dark:text-white text-sm">{player.name}</p>
                  <p className="text-gray-500 dark:text-gray-400 text-xs">{player.sport} • {player.stats}</p>
                </div>
                <div className="text-right">
                  <div className="flex items-center">
                    <Trophy className="w-3 h-3 text-yellow-500 mr-1" />
                    <span className="text-sm font-medium text-gray-600 dark:text-gray-400">{player.rating}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* AI Sports Analytics */}
        <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/10 dark:to-emerald-900/10 rounded-xl p-6 border border-green-200 dark:border-green-800">
          <div className="text-center">
            <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center mx-auto mb-3">
              <BarChart3 className="w-6 h-6 text-white" />
            </div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">AI Sports Analytics</h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
              Get real-time insights, match predictions, and player performance analysis powered by AI.
            </p>
            <div className="space-y-2 text-xs">
              <div className="flex items-center justify-center space-x-2 text-green-700 dark:text-green-300">
                <div className="w-2 h-2 bg-green-500 rounded-full" />
                <span>Real-time match analysis</span>
              </div>
              <div className="flex items-center justify-center space-x-2 text-green-700 dark:text-green-300">
                <div className="w-2 h-2 bg-green-500 rounded-full" />
                <span>Performance predictions</span>
              </div>
              <div className="flex items-center justify-center space-x-2 text-green-700 dark:text-green-300">
                <div className="w-2 h-2 bg-green-500 rounded-full" />
                <span>Historical data insights</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Live Chat Rooms */}
      <div className="bg-white dark:bg-dark-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-dark-700">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-gray-900 dark:text-white">Active Sports Chat Rooms</h3>
          <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
            <Users className="w-4 h-4 mr-1" />
            2,547 active users
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="p-4 bg-gray-50 dark:bg-dark-700 rounded-lg hover:bg-gray-100 dark:hover:bg-dark-600 transition-colors cursor-pointer">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-medium text-gray-900 dark:text-white">Cricket Discussion</h4>
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            </div>
            <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">India vs Australia analysis</p>
            <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
              <Users className="w-3 h-3 mr-1" />
              847 members
            </div>
          </div>
          
          <div className="p-4 bg-gray-50 dark:bg-dark-700 rounded-lg hover:bg-gray-100 dark:hover:bg-dark-600 transition-colors cursor-pointer">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-medium text-gray-900 dark:text-white">Football Fans</h4>
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            </div>
            <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">Premier League talk</p>
            <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
              <Users className="w-3 h-3 mr-1" />
              623 members
            </div>
          </div>
          
          <div className="p-4 bg-gray-50 dark:bg-dark-700 rounded-lg hover:bg-gray-100 dark:hover:bg-dark-600 transition-colors cursor-pointer">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-medium text-gray-900 dark:text-white">NBA Central</h4>
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            </div>
            <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">Season highlights</p>
            <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
              <Users className="w-3 h-3 mr-1" />
              412 members
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Sports: React.FC = () => {
  return (
    <Routes>
      <Route index element={<SportsCenter />} />
      <Route path="match/:id" element={<div>Live Match Page</div>} />
      <Route path="player/:id" element={<div>Player Profile Page</div>} />
    </Routes>
  );
};

export default Sports;