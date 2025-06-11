import React, { useState } from 'react';
import { 
  Sparkles, 
  ThumbsUp, 
  Star, 
  TrendingUp, 
  Users,
  Calendar,
  Filter,
  RefreshCw
} from 'lucide-react';

interface MovieRecommendationsProps {
  onClose?: () => void;
}

interface RecommendedMovie {
  id: string;
  title: string;
  year: number;
  rating: number;
  genre: string[];
  reason: string;
  matchScore: number;
  poster: string;
  popularity: number;
}

const MovieRecommendations: React.FC<MovieRecommendationsProps> = ({ onClose }) => {
  const [preferences, setPreferences] = useState({
    genres: [] as string[],
    mood: '',
    era: '',
    rating: 7.0
  });
  const [recommendations, setRecommendations] = useState<RecommendedMovie[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const genres = [
    'Action', 'Comedy', 'Drama', 'Horror', 'Sci-Fi', 'Romance', 
    'Thriller', 'Adventure', 'Animation', 'Documentary'
  ];

  const moods = [
    { id: 'feel-good', name: 'Feel Good', emoji: '😊' },
    { id: 'intense', name: 'Intense', emoji: '🔥' },
    { id: 'thoughtful', name: 'Thoughtful', emoji: '🤔' },
    { id: 'nostalgic', name: 'Nostalgic', emoji: '✨' },
    { id: 'adventurous', name: 'Adventurous', emoji: '🗺️' }
  ];

  const eras = [
    { id: 'classic', name: 'Classic (Before 1980)' },
    { id: '80s-90s', name: '80s-90s' },
    { id: '2000s', name: '2000s' },
    { id: '2010s', name: '2010s' },
    { id: 'recent', name: 'Recent (2020+)' }
  ];

  const handleGenreToggle = (genre: string) => {
    setPreferences(prev => ({
      ...prev,
      genres: prev.genres.includes(genre)
        ? prev.genres.filter(g => g !== genre)
        : [...prev.genres, genre]
    }));
  };

  const generateRecommendations = async () => {
    setIsLoading(true);
    
    // Simulate AI recommendation generation
    setTimeout(() => {
      const mockRecommendations: RecommendedMovie[] = [
        {
          id: '1',
          title: 'The Grand Budapest Hotel',
          year: 2014,
          rating: 8.1,
          genre: ['Comedy', 'Drama'],
          reason: 'Perfect blend of whimsical storytelling and visual aesthetics that matches your feel-good mood preference',
          matchScore: 95,
          poster: 'https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=200&h=300&dpr=2',
          popularity: 87
        },
        {
          id: '2',
          title: 'Blade Runner 2049',
          year: 2017,
          rating: 8.0,
          genre: ['Sci-Fi', 'Thriller'],
          reason: 'Stunning visuals and thought-provoking themes align with your preference for thoughtful sci-fi',
          matchScore: 92,
          poster: 'https://images.pexels.com/photos/7991678/pexels-photo-7991678.jpeg?auto=compress&cs=tinysrgb&w=200&h=300&dpr=2',
          popularity: 91
        },
        {
          id: '3',
          title: 'Parasite',
          year: 2019,
          rating: 8.6,
          genre: ['Thriller', 'Drama'],
          reason: 'Award-winning masterpiece with intense social commentary that matches your thriller preferences',
          matchScore: 89,
          poster: 'https://images.pexels.com/photos/33129/popcorn-movie-party-entertainment.jpg?auto=compress&cs=tinysrgb&w=200&h=300&dpr=2',
          popularity: 94
        },
        {
          id: '4',
          title: 'Spider-Man: Into the Spider-Verse',
          year: 2018,
          rating: 8.4,
          genre: ['Animation', 'Action'],
          reason: 'Revolutionary animation style and feel-good superhero story perfect for your mood',
          matchScore: 88,
          poster: 'https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=200&h=300&dpr=2',
          popularity: 89
        }
      ];
      
      setRecommendations(mockRecommendations);
      setIsLoading(false);
    }, 2000);
  };

  return (
    <div className="bg-white dark:bg-dark-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-dark-700">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-pink-500 to-purple-500 rounded-lg flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">AI Movie Recommendations</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">Get personalized movie suggestions based on your preferences</p>
          </div>
        </div>
      </div>

      {/* Preferences */}
      <div className="space-y-6 mb-6">
        {/* Genres */}
        <div>
          <h4 className="font-medium text-gray-900 dark:text-white mb-3">Favorite Genres</h4>
          <div className="flex flex-wrap gap-2">
            {genres.map((genre) => (
              <button
                key={genre}
                onClick={() => handleGenreToggle(genre)}
                className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                  preferences.genres.includes(genre)
                    ? 'bg-purple-100 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300 border-2 border-purple-500'
                    : 'bg-gray-100 dark:bg-dark-700 text-gray-600 dark:text-gray-400 border-2 border-transparent hover:bg-gray-200 dark:hover:bg-dark-600'
                }`}
              >
                {genre}
              </button>
            ))}
          </div>
        </div>

        {/* Mood */}
        <div>
          <h4 className="font-medium text-gray-900 dark:text-white mb-3">Current Mood</h4>
          <div className="grid grid-cols-3 gap-2">
            {moods.map((mood) => (
              <button
                key={mood.id}
                onClick={() => setPreferences(prev => ({ ...prev, mood: mood.id }))}
                className={`p-3 rounded-lg text-sm font-medium transition-colors ${
                  preferences.mood === mood.id
                    ? 'bg-purple-100 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300 border-2 border-purple-500'
                    : 'bg-gray-100 dark:bg-dark-700 text-gray-600 dark:text-gray-400 border-2 border-transparent hover:bg-gray-200 dark:hover:bg-dark-600'
                }`}
              >
                <div className="text-lg mb-1">{mood.emoji}</div>
                {mood.name}
              </button>
            ))}
          </div>
        </div>

        {/* Era & Rating */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <h4 className="font-medium text-gray-900 dark:text-white mb-2">Era Preference</h4>
            <select
              value={preferences.era}
              onChange={(e) => setPreferences(prev => ({ ...prev, era: e.target.value }))}
              className="w-full p-2 border border-gray-300 dark:border-dark-600 rounded-lg bg-gray-50 dark:bg-dark-700 text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="">Any Era</option>
              {eras.map((era) => (
                <option key={era.id} value={era.id}>{era.name}</option>
              ))}
            </select>
          </div>
          <div>
            <h4 className="font-medium text-gray-900 dark:text-white mb-2">Minimum Rating</h4>
            <div className="flex items-center space-x-2">
              <input
                type="range"
                min="5.0"
                max="9.5"
                step="0.5"
                value={preferences.rating}
                onChange={(e) => setPreferences(prev => ({ ...prev, rating: parseFloat(e.target.value) }))}
                className="flex-1"
              />
              <span className="text-sm font-medium text-gray-900 dark:text-white w-8">{preferences.rating}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Generate Button */}
      <button
        onClick={generateRecommendations}
        disabled={isLoading}
        className="w-full flex items-center justify-center space-x-2 py-3 bg-gradient-to-r from-pink-600 to-purple-600 text-white rounded-lg hover:from-pink-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all mb-6"
      >
        {isLoading ? (
          <>
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            <span>Generating Recommendations...</span>
          </>
        ) : (
          <>
            <RefreshCw className="w-4 h-4" />
            <span>Get AI Recommendations</span>
          </>
        )}
      </button>

      {/* Loading State */}
      {isLoading && (
        <div className="text-center py-8">
          <div className="w-12 h-12 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600 dark:text-gray-400">Analyzing your preferences...</p>
          <p className="text-sm text-gray-500 dark:text-gray-500 mt-1">Finding perfect matches for you</p>
        </div>
      )}

      {/* Recommendations */}
      {recommendations.length > 0 && (
        <div className="space-y-4">
          <h4 className="font-medium text-gray-900 dark:text-white">Recommended for You</h4>
          <div className="space-y-4">
            {recommendations.map((movie) => (
              <div key={movie.id} className="flex space-x-4 p-4 bg-gray-50 dark:bg-dark-700 rounded-lg hover:bg-gray-100 dark:hover:bg-dark-600 transition-colors">
                <img
                  src={movie.poster}
                  alt={movie.title}
                  className="w-16 h-24 object-cover rounded"
                />
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h5 className="font-semibold text-gray-900 dark:text-white">{movie.title}</h5>
                      <div className="flex items-center space-x-3 text-sm text-gray-500 dark:text-gray-400">
                        <span>{movie.year}</span>
                        <div className="flex items-center space-x-1">
                          <Star className="w-3 h-3 text-yellow-500 fill-current" />
                          <span>{movie.rating}</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center space-x-1 mb-1">
                        <TrendingUp className="w-3 h-3 text-green-500" />
                        <span className="text-sm font-medium text-green-600 dark:text-green-400">{movie.matchScore}% match</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Users className="w-3 h-3 text-gray-400" />
                        <span className="text-xs text-gray-500 dark:text-gray-400">{movie.popularity}% popularity</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-1 mb-2">
                    {movie.genre.map((genre, index) => (
                      <span
                        key={index}
                        className="px-2 py-0.5 bg-purple-100 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300 text-xs rounded-full"
                      >
                        {genre}
                      </span>
                    ))}
                  </div>
                  
                  <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{movie.reason}</p>
                  
                  <div className="flex items-center justify-between mt-3">
                    <button className="flex items-center space-x-1 text-sm text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300">
                      <ThumbsUp className="w-3 h-3" />
                      <span>Add to Watchlist</span>
                    </button>
                    <button className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300">
                      More Info
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MovieRecommendations;