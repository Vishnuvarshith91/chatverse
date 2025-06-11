import React, { useState } from 'react';
import { 
  Film, 
  Star, 
  Calendar, 
  Users, 
  Award, 
  TrendingUp,
  Search,
  Sparkles,
  BarChart3,
  Clock,
  Globe,
  DollarSign
} from 'lucide-react';

interface MovieAIProps {
  onClose?: () => void;
}

interface MovieData {
  title: string;
  year: number;
  rating: number;
  genre: string[];
  director: string;
  cast: string[];
  plot: string;
  boxOffice: string;
  runtime: string;
  awards: string[];
  trivia: string[];
  similarMovies: string[];
  criticsScore: number;
  audienceScore: number;
  poster: string;
}

const MovieAI: React.FC<MovieAIProps> = ({ onClose }) => {
  const [query, setQuery] = useState('');
  const [movieData, setMovieData] = useState<MovieData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'info' | 'stats' | 'analysis' | 'trivia'>('info');

  const handleSearch = async () => {
    if (!query.trim()) return;
    
    setIsLoading(true);
    
    // Simulate AI movie data retrieval
    setTimeout(() => {
      const mockMovieData: MovieData = {
        title: query.includes('inception') ? 'Inception' : query.includes('avengers') ? 'Avengers: Endgame' : 'The Dark Knight',
        year: 2010,
        rating: 8.8,
        genre: ['Sci-Fi', 'Thriller', 'Action'],
        director: 'Christopher Nolan',
        cast: ['Leonardo DiCaprio', 'Marion Cotillard', 'Tom Hardy', 'Ellen Page'],
        plot: 'A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.',
        boxOffice: '$836.8 million',
        runtime: '148 minutes',
        awards: ['Academy Award for Best Cinematography', 'Academy Award for Best Sound Editing', 'Academy Award for Best Sound Mixing', 'Academy Award for Best Visual Effects'],
        trivia: [
          'The hallway fight scene was filmed in a rotating corridor built like a ferris wheel',
          'The movie took 10 years to write and was inspired by lucid dreaming',
          'Marion Cotillard learned to speak with an American accent for her role',
          'The spinning top was not the original totem in the script'
        ],
        similarMovies: ['The Matrix', 'Shutter Island', 'Interstellar', 'Memento'],
        criticsScore: 87,
        audienceScore: 91,
        poster: 'https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=300&h=450&dpr=2'
      };
      
      setMovieData(mockMovieData);
      setIsLoading(false);
    }, 2000);
  };

  const tabs = [
    { id: 'info', name: 'Movie Info', icon: Film },
    { id: 'stats', name: 'Stats & Ratings', icon: BarChart3 },
    { id: 'analysis', name: 'AI Analysis', icon: Sparkles },
    { id: 'trivia', name: 'Trivia & Facts', icon: Award }
  ];

  return (
    <div className="bg-white dark:bg-dark-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-dark-700">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
            <Film className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">AI Movie Assistant</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">Get comprehensive movie information and insights</p>
          </div>
        </div>
      </div>

      {/* Search Input */}
      <div className="mb-6">
        <div className="flex space-x-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              placeholder="Search for any movie (e.g., Inception, Avengers, The Dark Knight)..."
              className="w-full pl-10 pr-3 py-3 border border-gray-300 dark:border-dark-600 rounded-lg bg-gray-50 dark:bg-dark-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
          <button
            onClick={handleSearch}
            disabled={isLoading || !query.trim()}
            className="px-4 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            {isLoading ? (
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <Sparkles className="w-4 h-4" />
            )}
          </button>
        </div>
      </div>

      {/* Loading State */}
      {isLoading && (
        <div className="text-center py-12">
          <div className="w-12 h-12 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600 dark:text-gray-400">Analyzing movie data...</p>
          <p className="text-sm text-gray-500 dark:text-gray-500 mt-1">Gathering comprehensive information</p>
        </div>
      )}

      {/* Movie Data Display */}
      {movieData && (
        <div className="space-y-6">
          {/* Movie Header */}
          <div className="flex space-x-4 p-4 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/10 dark:to-pink-900/10 rounded-lg">
            <img
              src={movieData.poster}
              alt={movieData.title}
              className="w-24 h-36 object-cover rounded-lg shadow-md"
            />
            <div className="flex-1">
              <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{movieData.title}</h4>
              <div className="flex items-center space-x-4 mb-3">
                <div className="flex items-center space-x-1">
                  <Star className="w-4 h-4 text-yellow-500 fill-current" />
                  <span className="font-semibold text-gray-900 dark:text-white">{movieData.rating}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Calendar className="w-4 h-4 text-gray-500" />
                  <span className="text-gray-600 dark:text-gray-400">{movieData.year}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Clock className="w-4 h-4 text-gray-500" />
                  <span className="text-gray-600 dark:text-gray-400">{movieData.runtime}</span>
                </div>
              </div>
              <div className="flex flex-wrap gap-2 mb-3">
                {movieData.genre.map((genre, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-purple-100 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300 text-sm rounded-full"
                  >
                    {genre}
                  </span>
                ))}
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Directed by {movieData.director}</p>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex space-x-1 bg-gray-100 dark:bg-dark-700 rounded-lg p-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors flex-1 justify-center ${
                  activeTab === tab.id
                    ? 'bg-white dark:bg-dark-800 text-purple-700 dark:text-purple-300 shadow-sm'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                <span>{tab.name}</span>
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="bg-gray-50 dark:bg-dark-700 rounded-lg p-4">
            {activeTab === 'info' && (
              <div className="space-y-4">
                <div>
                  <h5 className="font-semibold text-gray-900 dark:text-white mb-2">Plot Summary</h5>
                  <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">{movieData.plot}</p>
                </div>
                <div>
                  <h5 className="font-semibold text-gray-900 dark:text-white mb-2">Main Cast</h5>
                  <div className="flex flex-wrap gap-2">
                    {movieData.cast.map((actor, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-white dark:bg-dark-800 text-gray-700 dark:text-gray-300 text-sm rounded-lg border border-gray-200 dark:border-dark-600"
                      >
                        {actor}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <h5 className="font-semibold text-gray-900 dark:text-white mb-2">Similar Movies</h5>
                  <div className="grid grid-cols-2 gap-2">
                    {movieData.similarMovies.map((movie, index) => (
                      <div key={index} className="p-2 bg-white dark:bg-dark-800 rounded border border-gray-200 dark:border-dark-600">
                        <span className="text-sm text-gray-700 dark:text-gray-300">{movie}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'stats' && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-3 bg-white dark:bg-dark-800 rounded-lg border border-gray-200 dark:border-dark-600">
                    <div className="flex items-center space-x-2 mb-1">
                      <DollarSign className="w-4 h-4 text-green-500" />
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Box Office</span>
                    </div>
                    <p className="text-lg font-bold text-gray-900 dark:text-white">{movieData.boxOffice}</p>
                  </div>
                  <div className="p-3 bg-white dark:bg-dark-800 rounded-lg border border-gray-200 dark:border-dark-600">
                    <div className="flex items-center space-x-2 mb-1">
                      <Star className="w-4 h-4 text-yellow-500" />
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">IMDb Rating</span>
                    </div>
                    <p className="text-lg font-bold text-gray-900 dark:text-white">{movieData.rating}/10</p>
                  </div>
                </div>
                
                <div>
                  <h5 className="font-semibold text-gray-900 dark:text-white mb-3">Audience vs Critics</h5>
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-600 dark:text-gray-400">Critics Score</span>
                        <span className="font-medium text-gray-900 dark:text-white">{movieData.criticsScore}%</span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-dark-600 rounded-full h-2">
                        <div 
                          className="bg-red-500 h-2 rounded-full transition-all duration-500"
                          style={{ width: `${movieData.criticsScore}%` }}
                        />
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-600 dark:text-gray-400">Audience Score</span>
                        <span className="font-medium text-gray-900 dark:text-white">{movieData.audienceScore}%</span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-dark-600 rounded-full h-2">
                        <div 
                          className="bg-green-500 h-2 rounded-full transition-all duration-500"
                          style={{ width: `${movieData.audienceScore}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'analysis' && (
              <div className="space-y-4">
                <div className="p-4 bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/20 dark:to-pink-900/20 rounded-lg border border-purple-200 dark:border-purple-800">
                  <h5 className="font-semibold text-gray-900 dark:text-white mb-2 flex items-center">
                    <Sparkles className="w-4 h-4 mr-2 text-purple-600" />
                    AI Analysis
                  </h5>
                  <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                    This film demonstrates exceptional cinematography and innovative storytelling techniques. The complex narrative structure 
                    challenges viewers while maintaining emotional engagement. The visual effects seamlessly blend with practical elements, 
                    creating a immersive experience that has influenced modern cinema significantly.
                  </p>
                </div>
                
                <div>
                  <h5 className="font-semibold text-gray-900 dark:text-white mb-3">Strengths & Highlights</h5>
                  <div className="space-y-2">
                    <div className="flex items-start space-x-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full mt-2" />
                      <span className="text-sm text-gray-700 dark:text-gray-300">Outstanding visual effects and cinematography</span>
                    </div>
                    <div className="flex items-start space-x-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full mt-2" />
                      <span className="text-sm text-gray-700 dark:text-gray-300">Complex but coherent narrative structure</span>
                    </div>
                    <div className="flex items-start space-x-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full mt-2" />
                      <span className="text-sm text-gray-700 dark:text-gray-300">Exceptional performances from lead actors</span>
                    </div>
                    <div className="flex items-start space-x-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full mt-2" />
                      <span className="text-sm text-gray-700 dark:text-gray-300">Innovative approach to genre conventions</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'trivia' && (
              <div className="space-y-4">
                <div>
                  <h5 className="font-semibold text-gray-900 dark:text-white mb-3">Awards & Recognition</h5>
                  <div className="space-y-2">
                    {movieData.awards.map((award, index) => (
                      <div key={index} className="flex items-center space-x-2 p-2 bg-white dark:bg-dark-800 rounded border border-gray-200 dark:border-dark-600">
                        <Award className="w-4 h-4 text-yellow-500" />
                        <span className="text-sm text-gray-700 dark:text-gray-300">{award}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h5 className="font-semibold text-gray-900 dark:text-white mb-3">Fun Facts & Trivia</h5>
                  <div className="space-y-3">
                    {movieData.trivia.map((fact, index) => (
                      <div key={index} className="p-3 bg-white dark:bg-dark-800 rounded-lg border border-gray-200 dark:border-dark-600">
                        <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">{fact}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default MovieAI;