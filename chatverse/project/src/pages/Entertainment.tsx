import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { 
  Film, 
  Star, 
  Play, 
  MessageCircle, 
  TrendingUp, 
  Search,
  Calendar,
  Users,
  Bot,
  Sparkles,
  BarChart3,
  Award
} from 'lucide-react';
import MovieAI from '../components/AI/MovieAI';
import MovieRecommendations from '../components/AI/MovieRecommendations';
import MovieTrendAnalyzer from '../components/AI/MovieTrendAnalyzer';

const EntertainmentHub: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('all');
  const [activeAITool, setActiveAITool] = useState<string | null>(null);

  const movieRooms = [
    {
      id: '1',
      title: 'Inception Discussion',
      movie: 'Inception (2010)',
      description: 'Deep dive into the layers of dreams and reality',
      participants: 24,
      rating: 4.8,
      genre: 'sci-fi',
      aiModerator: true,
      isLive: true,
      thumbnail: 'https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=2',
      tags: ['Mind-bending', 'Christopher Nolan', 'Dreams'],
    },
    {
      id: '2',
      title: 'Marvel Marathon',
      movie: 'Avengers: Endgame',
      description: 'Discussing the epic conclusion of the Infinity Saga',
      participants: 18,
      rating: 4.9,
      genre: 'action',
      aiModerator: true,
      isLive: false,
      thumbnail: 'https://images.pexels.com/photos/7991678/pexels-photo-7991678.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=2',
      tags: ['Superhero', 'MCU', 'Epic'],
    },
    {
      id: '3',
      title: 'Horror Movie Night',
      movie: 'The Conjuring',
      description: 'Analyzing horror cinematography and storytelling',
      participants: 12,
      rating: 4.6,
      genre: 'horror',
      aiModerator: false,
      isLive: true,
      thumbnail: 'https://images.pexels.com/photos/33129/popcorn-movie-party-entertainment.jpg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=2',
      tags: ['Horror', 'Supernatural', 'Thriller'],
    },
  ];

  const genres = [
    { id: 'all', name: 'All Genres' },
    { id: 'action', name: 'Action' },
    { id: 'sci-fi', name: 'Sci-Fi' },
    { id: 'horror', name: 'Horror' },
    { id: 'drama', name: 'Drama' },
    { id: 'comedy', name: 'Comedy' },
  ];

  const trendingMovies = [
    { title: 'Oppenheimer', discussions: 156, rating: 4.7 },
    { title: 'Barbie', discussions: 142, rating: 4.5 },
    { title: 'Spider-Man: No Way Home', discussions: 189, rating: 4.8 },
    { title: 'Top Gun: Maverick', discussions: 134, rating: 4.6 },
  ];

  const aiTools = [
    {
      id: 'movie-search',
      name: 'Movie Knowledge Base',
      description: 'Get comprehensive information about any movie',
      icon: Film,
      color: 'from-purple-500 to-pink-500',
      component: MovieAI
    },
    {
      id: 'recommendations',
      name: 'Smart Recommendations',
      description: 'AI-powered personalized movie suggestions',
      icon: Sparkles,
      color: 'from-pink-500 to-red-500',
      component: MovieRecommendations
    },
    {
      id: 'trends',
      name: 'Industry Trends',
      description: 'Real-time movie industry analytics and trends',
      icon: BarChart3,
      color: 'from-blue-500 to-cyan-500',
      component: MovieTrendAnalyzer
    }
  ];

  const filteredRooms = movieRooms.filter(room => {
    const matchesSearch = room.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         room.movie.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesGenre = selectedGenre === 'all' || room.genre === selectedGenre;
    return matchesSearch && matchesGenre;
  });

  const ActiveAIComponent = activeAITool ? aiTools.find(tool => tool.id === activeAITool)?.component : null;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Entertainment Hub</h1>
          <p className="text-gray-600 dark:text-gray-400">Discuss movies, shows, and entertainment with AI-powered insights</p>
        </div>
        <button className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all">
          <Film className="w-4 h-4 mr-2" />
          Create Discussion
        </button>
      </div>

      {/* AI Movie Tools Section */}
      <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/10 dark:to-pink-900/10 rounded-2xl p-6 border border-purple-200 dark:border-purple-800">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
              <Bot className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">AI Movie Assistant</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Comprehensive movie knowledge and entertainment insights</p>
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
                  ? 'border-purple-500 bg-white dark:bg-dark-800 shadow-md'
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

      {/* Search and Filters */}
      <div className="bg-white dark:bg-dark-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-dark-700">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search movies, shows, or discussions..."
                className="w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-dark-600 rounded-lg bg-gray-50 dark:bg-dark-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <select
            className="border border-gray-300 dark:border-dark-600 rounded-lg bg-gray-50 dark:bg-dark-700 text-gray-900 dark:text-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
            value={selectedGenre}
            onChange={(e) => setSelectedGenre(e.target.value)}
          >
            {genres.map(genre => (
              <option key={genre.id} value={genre.id}>
                {genre.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Movie Discussion Rooms */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredRooms.map((room) => (
              <div
                key={room.id}
                className="bg-white dark:bg-dark-800 rounded-xl shadow-sm border border-gray-200 dark:border-dark-700 overflow-hidden hover:shadow-md transition-shadow group"
              >
                <div className="relative h-40 overflow-hidden">
                  <img
                    src={room.thumbnail}
                    alt={room.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {room.isLive && (
                    <div className="absolute top-3 left-3 px-2 py-1 bg-red-500 text-white text-xs font-medium rounded-full flex items-center">
                      <div className="w-2 h-2 bg-white rounded-full mr-1 animate-pulse" />
                      LIVE
                    </div>
                  )}
                  {room.aiModerator && (
                    <div className="absolute top-3 right-3 p-1.5 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg">
                      <Bot className="w-3 h-3 text-white" />
                    </div>
                  )}
                  <div className="absolute bottom-3 left-3 flex items-center space-x-1">
                    <Star className="w-3 h-3 text-yellow-400 fill-current" />
                    <span className="text-white text-xs font-medium">{room.rating}</span>
                  </div>
                </div>

                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-1">{room.title}</h3>
                  <p className="text-purple-600 dark:text-purple-400 text-sm font-medium mb-2">{room.movie}</p>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-3 line-clamp-2">
                    {room.description}
                  </p>

                  <div className="flex flex-wrap gap-1 mb-3">
                    {room.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-purple-100 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300 text-xs rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
                      <div className="flex items-center">
                        <Users className="w-4 h-4 mr-1" />
                        {room.participants}
                      </div>
                      <div className="flex items-center">
                        <MessageCircle className="w-4 h-4 mr-1" />
                        Active
                      </div>
                    </div>
                    <button className="px-3 py-1.5 bg-purple-100 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300 text-sm font-medium rounded-lg hover:bg-purple-200 dark:hover:bg-purple-900/30 transition-colors">
                      Join Discussion
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Trending Movies */}
          <div className="bg-white dark:bg-dark-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-dark-700">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-900 dark:text-white">Trending Movies</h3>
              <TrendingUp className="w-4 h-4 text-gray-400" />
            </div>
            <div className="space-y-3">
              {trendingMovies.map((movie, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-dark-700 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white text-sm">{movie.title}</p>
                    <p className="text-gray-500 dark:text-gray-400 text-xs">{movie.discussions} discussions</p>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Star className="w-3 h-3 text-yellow-400 fill-current" />
                    <span className="text-xs font-medium text-gray-600 dark:text-gray-400">{movie.rating}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* AI Features */}
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/10 dark:to-pink-900/10 rounded-xl p-6 border border-purple-200 dark:border-purple-800">
            <div className="text-center">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mx-auto mb-3">
                <Bot className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">AI Movie Expert</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                Get instant access to comprehensive movie information, personalized recommendations, and industry insights.
              </p>
              <div className="space-y-2 text-xs">
                <div className="flex items-center justify-center space-x-2 text-purple-700 dark:text-purple-300">
                  <div className="w-2 h-2 bg-purple-500 rounded-full" />
                  <span>Complete movie database</span>
                </div>
                <div className="flex items-center justify-center space-x-2 text-purple-700 dark:text-purple-300">
                  <div className="w-2 h-2 bg-purple-500 rounded-full" />
                  <span>Smart recommendations</span>
                </div>
                <div className="flex items-center justify-center space-x-2 text-purple-700 dark:text-purple-300">
                  <div className="w-2 h-2 bg-purple-500 rounded-full" />
                  <span>Industry trend analysis</span>
                </div>
              </div>
            </div>
          </div>

          {/* Upcoming Releases */}
          <div className="bg-white dark:bg-dark-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-dark-700">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-900 dark:text-white">Upcoming Releases</h3>
              <Calendar className="w-4 h-4 text-gray-400" />
            </div>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-green-500 rounded-full" />
                <div>
                  <p className="font-medium text-gray-900 dark:text-white text-sm">Dune: Part Two</p>
                  <p className="text-gray-500 dark:text-gray-400 text-xs">March 1, 2024</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full" />
                <div>
                  <p className="font-medium text-gray-900 dark:text-white text-sm">Deadpool 3</p>
                  <p className="text-gray-500 dark:text-gray-400 text-xs">July 26, 2024</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Entertainment: React.FC = () => {
  return (
    <Routes>
      <Route index element={<EntertainmentHub />} />
      <Route path="room/:id" element={<div>Movie Discussion Room</div>} />
    </Routes>
  );
};

export default Entertainment;