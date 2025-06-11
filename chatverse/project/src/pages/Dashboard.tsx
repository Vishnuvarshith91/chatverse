import React from 'react';
import { Link } from 'react-router-dom';
import { 
  BookOpen, 
  Film, 
  Trophy, 
  Users, 
  TrendingUp, 
  Clock, 
  MessageSquare,
  Zap,
  Star,
  PlayCircle
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useSocket } from '../contexts/SocketContext';

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const { onlineUsers } = useSocket();

  const stats = [
    { name: 'Study Sessions', value: '12', icon: BookOpen, color: 'bg-blue-500' },
    { name: 'Movies Discussed', value: '8', icon: Film, color: 'bg-purple-500' },
    { name: 'Sports Watched', value: '5', icon: Trophy, color: 'bg-green-500' },
    { name: 'AI Interactions', value: '24', icon: Zap, color: 'bg-yellow-500' },
  ];

  const recentActivity = [
    { type: 'study', title: 'AI in Healthcare - Mind Map Created', time: '2 hours ago', icon: BookOpen },
    { type: 'entertainment', title: 'Discussed "Inception" with AI moderator', time: '4 hours ago', icon: Film },
    { type: 'sports', title: 'Watched India vs Australia highlights', time: '6 hours ago', icon: Trophy },
    { type: 'chat', title: 'Joined Study Room: Advanced Physics', time: '1 day ago', icon: MessageSquare },
  ];

  const quickActions = [
    { name: 'Start Study Session', href: '/study-rooms', icon: BookOpen, color: 'from-blue-500 to-blue-600' },
    { name: 'Movie Discussion', href: '/entertainment', icon: Film, color: 'from-purple-500 to-purple-600' },
    { name: 'Live Sports', href: '/sports', icon: Trophy, color: 'from-green-500 to-green-600' },
    { name: 'AI Assistant', href: '/study-rooms/ai-chat', icon: Zap, color: 'from-yellow-500 to-yellow-600' },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-white dark:bg-dark-800 rounded-2xl p-6 shadow-sm border border-gray-200 dark:border-dark-700">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Welcome back, {user?.username}! 👋
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              Ready to learn, discuss, and explore today?
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="text-right">
              <p className="text-sm text-gray-500 dark:text-gray-400">Online Users</p>
              <p className="text-2xl font-bold text-primary-600">{onlineUsers.length}</p>
            </div>
            <div className="flex -space-x-2">
              {onlineUsers.slice(0, 3).map((userId, index) => (
                <div
                  key={userId}
                  className="w-10 h-10 bg-gradient-to-br from-primary-400 to-secondary-400 rounded-full border-2 border-white dark:border-dark-800 flex items-center justify-center text-white font-semibold text-sm"
                >
                  {userId.charAt(0).toUpperCase()}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div
            key={stat.name}
            className="bg-white dark:bg-dark-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-dark-700 hover:shadow-md transition-shadow"
          >
            <div className="flex items-center">
              <div className={`${stat.color} rounded-lg p-3`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{stat.name}</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="bg-white dark:bg-dark-800 rounded-2xl p-6 shadow-sm border border-gray-200 dark:border-dark-700">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickActions.map((action) => (
            <Link
              key={action.name}
              to={action.href}
              className="group relative overflow-hidden rounded-xl p-6 text-white transition-transform hover:scale-105"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${action.color}`} />
              <div className="relative">
                <action.icon className="w-8 h-8 mb-3" />
                <h3 className="font-semibold">{action.name}</h3>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Recent Activity & Trending */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <div className="bg-white dark:bg-dark-800 rounded-2xl p-6 shadow-sm border border-gray-200 dark:border-dark-700">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Recent Activity</h2>
            <Clock className="w-5 h-5 text-gray-400" />
          </div>
          <div className="space-y-4">
            {recentActivity.map((activity, index) => (
              <div key={index} className="flex items-start space-x-3">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-gray-100 dark:bg-dark-700 rounded-lg flex items-center justify-center">
                    <activity.icon className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">{activity.title}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Trending Content */}
        <div className="bg-white dark:bg-dark-800 rounded-2xl p-6 shadow-sm border border-gray-200 dark:border-dark-700">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Trending Today</h2>
            <TrendingUp className="w-5 h-5 text-gray-400" />
          </div>
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-red-100 dark:bg-red-900/20 rounded-lg flex items-center justify-center">
                  <PlayCircle className="w-4 h-4 text-red-600 dark:text-red-400" />
                </div>
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900 dark:text-white">Quantum Physics Discussion</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">52 participants</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center">
                  <Film className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                </div>
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900 dark:text-white">Marvel Movie Marathon</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">38 viewers</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-green-100 dark:bg-green-900/20 rounded-lg flex items-center justify-center">
                  <Trophy className="w-4 h-4 text-green-600 dark:text-green-400" />
                </div>
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900 dark:text-white">Cricket World Cup</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">Live match</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* AI Insights */}
      <div className="bg-gradient-to-r from-primary-50 to-secondary-50 dark:from-primary-900/10 dark:to-secondary-900/10 rounded-2xl p-6 border border-primary-200 dark:border-primary-800">
        <div className="flex items-start space-x-4">
          <div className="flex-shrink-0">
            <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-xl flex items-center justify-center">
              <Zap className="w-6 h-6 text-white" />
            </div>
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">AI Insights for You</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Based on your activity, here are some personalized recommendations to enhance your learning experience.
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary-100 dark:bg-primary-900/20 text-primary-800 dark:text-primary-300">
                <Star className="w-3 h-3 mr-1" />
                Try AI Mind Mapping
              </span>
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-secondary-100 dark:bg-secondary-900/20 text-secondary-800 dark:text-secondary-300">
                <Film className="w-3 h-3 mr-1" />
                Join Movie Analysis
              </span>
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-300">
                <Trophy className="w-3 h-3 mr-1" />
                Follow Live Sports
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;