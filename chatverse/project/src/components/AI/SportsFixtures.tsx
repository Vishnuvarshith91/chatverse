import React, { useState, useEffect } from 'react';
import { 
  Calendar, 
  Clock, 
  MapPin, 
  Trophy, 
  Users,
  Bell,
  Filter,
  Search,
  Star,
  Activity,
  Zap
} from 'lucide-react';

interface SportsFixturesProps {
  onClose?: () => void;
}

interface Fixture {
  id: string;
  sport: string;
  competition: string;
  homeTeam: string;
  awayTeam: string;
  date: string;
  time: string;
  venue: string;
  status: 'upcoming' | 'live' | 'completed';
  importance: 'high' | 'medium' | 'low';
  tvChannel?: string;
  homeScore?: number;
  awayScore?: number;
}

const SportsFixtures: React.FC<SportsFixturesProps> = ({ onClose }) => {
  const [selectedSport, setSelectedSport] = useState('all');
  const [selectedDate, setSelectedDate] = useState('today');
  const [fixtures, setFixtures] = useState<Fixture[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const sports = [
    { id: 'all', name: 'All Sports' },
    { id: 'cricket', name: 'Cricket' },
    { id: 'football', name: 'Football' },
    { id: 'basketball', name: 'Basketball' },
    { id: 'tennis', name: 'Tennis' }
  ];

  const dateFilters = [
    { id: 'today', name: 'Today' },
    { id: 'tomorrow', name: 'Tomorrow' },
    { id: 'week', name: 'This Week' },
    { id: 'month', name: 'This Month' }
  ];

  useEffect(() => {
    loadFixtures();
  }, [selectedSport, selectedDate]);

  const loadFixtures = async () => {
    setIsLoading(true);
    
    // Simulate AI fixture data loading
    setTimeout(() => {
      const mockFixtures: Fixture[] = [
        {
          id: '1',
          sport: 'cricket',
          competition: 'ICC World Cup',
          homeTeam: 'India',
          awayTeam: 'Australia',
          date: 'Today',
          time: '2:30 PM',
          venue: 'Wankhede Stadium, Mumbai',
          status: 'upcoming',
          importance: 'high',
          tvChannel: 'Star Sports'
        },
        {
          id: '2',
          sport: 'football',
          competition: 'Premier League',
          homeTeam: 'Manchester United',
          awayTeam: 'Liverpool',
          date: 'Today',
          time: '5:30 PM',
          venue: 'Old Trafford, Manchester',
          status: 'live',
          importance: 'high',
          tvChannel: 'Sky Sports',
          homeScore: 2,
          awayScore: 1
        },
        {
          id: '3',
          sport: 'basketball',
          competition: 'NBA',
          homeTeam: 'Lakers',
          awayTeam: 'Warriors',
          date: 'Tomorrow',
          time: '8:00 PM',
          venue: 'Crypto.com Arena, LA',
          status: 'upcoming',
          importance: 'medium',
          tvChannel: 'ESPN'
        },
        {
          id: '4',
          sport: 'cricket',
          competition: 'Test Series',
          homeTeam: 'England',
          awayTeam: 'Pakistan',
          date: 'Tomorrow',
          time: '11:00 AM',
          venue: 'Lord\'s, London',
          status: 'upcoming',
          importance: 'medium',
          tvChannel: 'Sky Sports Cricket'
        },
        {
          id: '5',
          sport: 'tennis',
          competition: 'ATP Masters',
          homeTeam: 'Novak Djokovic',
          awayTeam: 'Rafael Nadal',
          date: 'Dec 28',
          time: '3:00 PM',
          venue: 'Centre Court, Wimbledon',
          status: 'upcoming',
          importance: 'high',
          tvChannel: 'Eurosport'
        },
        {
          id: '6',
          sport: 'football',
          competition: 'La Liga',
          homeTeam: 'Real Madrid',
          awayTeam: 'Barcelona',
          date: 'Dec 29',
          time: '9:00 PM',
          venue: 'Santiago Bernabéu, Madrid',
          status: 'upcoming',
          importance: 'high',
          tvChannel: 'ESPN'
        }
      ];
      
      setFixtures(mockFixtures);
      setIsLoading(false);
    }, 1500);
  };

  const filteredFixtures = fixtures.filter(fixture => {
    const matchesSport = selectedSport === 'all' || fixture.sport === selectedSport;
    const matchesSearch = searchTerm === '' || 
      fixture.homeTeam.toLowerCase().includes(searchTerm.toLowerCase()) ||
      fixture.awayTeam.toLowerCase().includes(searchTerm.toLowerCase()) ||
      fixture.competition.toLowerCase().includes(searchTerm.toLowerCase());
    
    let matchesDate = true;
    if (selectedDate === 'today') {
      matchesDate = fixture.date === 'Today';
    } else if (selectedDate === 'tomorrow') {
      matchesDate = fixture.date === 'Tomorrow';
    }
    
    return matchesSport && matchesSearch && matchesDate;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'live':
        return 'bg-red-500 text-white';
      case 'upcoming':
        return 'bg-blue-500 text-white';
      case 'completed':
        return 'bg-gray-500 text-white';
      default:
        return 'bg-gray-500 text-white';
    }
  };

  const getImportanceIcon = (importance: string) => {
    switch (importance) {
      case 'high':
        return <Star className="w-4 h-4 text-yellow-500 fill-current" />;
      case 'medium':
        return <Star className="w-4 h-4 text-gray-400" />;
      default:
        return null;
    }
  };

  return (
    <div className="bg-white dark:bg-dark-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-dark-700">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-500 rounded-lg flex items-center justify-center">
            <Calendar className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Sports Fixtures & Schedule</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">Complete schedule of upcoming and live matches</p>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="mb-6 space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search teams, competitions..."
            className="w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-dark-600 rounded-lg bg-gray-50 dark:bg-dark-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Sport
            </label>
            <select
              value={selectedSport}
              onChange={(e) => setSelectedSport(e.target.value)}
              className="w-full p-2 border border-gray-300 dark:border-dark-600 rounded-lg bg-gray-50 dark:bg-dark-700 text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              {sports.map((sport) => (
                <option key={sport.id} value={sport.id}>{sport.name}</option>
              ))}
            </select>
          </div>
          
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Date
            </label>
            <select
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="w-full p-2 border border-gray-300 dark:border-dark-600 rounded-lg bg-gray-50 dark:bg-dark-700 text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              {dateFilters.map((filter) => (
                <option key={filter.id} value={filter.id}>{filter.name}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Loading State */}
      {isLoading && (
        <div className="text-center py-8">
          <div className="w-12 h-12 border-4 border-green-200 border-t-green-600 rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600 dark:text-gray-400">Loading fixtures...</p>
          <p className="text-sm text-gray-500 dark:text-gray-500 mt-1">Getting latest schedule data</p>
        </div>
      )}

      {/* Fixtures List */}
      {!isLoading && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="font-medium text-gray-900 dark:text-white">
              {filteredFixtures.length} Fixtures Found
            </h4>
            <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
              <Activity className="w-4 h-4" />
              <span>{filteredFixtures.filter(f => f.status === 'live').length} Live</span>
            </div>
          </div>

          {filteredFixtures.length === 0 ? (
            <div className="text-center py-8">
              <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 dark:text-gray-400">No fixtures found for the selected criteria</p>
              <p className="text-sm text-gray-500 dark:text-gray-500 mt-1">Try adjusting your filters</p>
            </div>
          ) : (
            <div className="space-y-3">
              {filteredFixtures.map((fixture) => (
                <div
                  key={fixture.id}
                  className="p-4 bg-gray-50 dark:bg-dark-700 rounded-lg border border-gray-200 dark:border-dark-600 hover:bg-gray-100 dark:hover:bg-dark-600 transition-colors"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(fixture.status)}`}>
                        {fixture.status.toUpperCase()}
                      </span>
                      {getImportanceIcon(fixture.importance)}
                      <span className="text-sm font-medium text-gray-600 dark:text-gray-400 capitalize">
                        {fixture.sport}
                      </span>
                    </div>
                    <button className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                      <Bell className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="mb-3">
                    <h5 className="font-semibold text-gray-900 dark:text-white mb-1">{fixture.competition}</h5>
                    <div className="flex items-center justify-center space-x-4">
                      <div className="text-center flex-1">
                        <p className="font-medium text-gray-900 dark:text-white">{fixture.homeTeam}</p>
                        {fixture.homeScore !== undefined && (
                          <p className="text-2xl font-bold text-green-600 dark:text-green-400">{fixture.homeScore}</p>
                        )}
                      </div>
                      <div className="px-3 py-1 bg-white dark:bg-dark-800 rounded-lg border border-gray-200 dark:border-dark-600">
                        <span className="text-sm font-medium text-gray-600 dark:text-gray-400">VS</span>
                      </div>
                      <div className="text-center flex-1">
                        <p className="font-medium text-gray-900 dark:text-white">{fixture.awayTeam}</p>
                        {fixture.awayScore !== undefined && (
                          <p className="text-2xl font-bold text-green-600 dark:text-green-400">{fixture.awayScore}</p>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-sm text-gray-600 dark:text-gray-400">
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-3 h-3" />
                      <span>{fixture.date}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="w-3 h-3" />
                      <span>{fixture.time}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <MapPin className="w-3 h-3" />
                      <span className="truncate">{fixture.venue}</span>
                    </div>
                  </div>

                  {fixture.tvChannel && (
                    <div className="mt-2 flex items-center justify-between">
                      <div className="flex items-center space-x-1 text-sm text-gray-600 dark:text-gray-400">
                        <Trophy className="w-3 h-3" />
                        <span>TV: {fixture.tvChannel}</span>
                      </div>
                      <button className="px-3 py-1 bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-300 text-sm font-medium rounded hover:bg-green-200 dark:hover:bg-green-900/30 transition-colors">
                        {fixture.status === 'live' ? 'Watch Live' : 'Set Reminder'}
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* AI Insights */}
      <div className="mt-6 p-4 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/10 dark:to-emerald-900/10 rounded-lg border border-green-200 dark:border-green-800">
        <h5 className="font-semibold text-gray-900 dark:text-white mb-2 flex items-center">
          <Zap className="w-4 h-4 mr-2 text-green-600" />
          AI Schedule Insights
        </h5>
        <div className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
          <p>• {filteredFixtures.filter(f => f.importance === 'high').length} high-priority matches scheduled</p>
          <p>• Peak viewing time: {filteredFixtures.length > 0 ? '5:30 PM - 9:00 PM' : 'No matches today'}</p>
          <p>• Most popular sport today: {selectedSport === 'all' ? 'Football' : sports.find(s => s.id === selectedSport)?.name}</p>
          <p>• Recommended matches based on your preferences highlighted with ⭐</p>
        </div>
      </div>
    </div>
  );
};

export default SportsFixtures;