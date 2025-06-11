import React, { useState } from 'react';
import { 
  Trophy, 
  Target, 
  Calendar, 
  Users, 
  TrendingUp, 
  BarChart3,
  Search,
  Sparkles,
  Clock,
  MapPin,
  Award,
  Activity,
  Zap
} from 'lucide-react';

interface SportsAIProps {
  onClose?: () => void;
}

interface PlayerData {
  name: string;
  sport: string;
  team: string;
  position: string;
  stats: {
    [key: string]: string | number;
  };
  achievements: string[];
  recentForm: string;
  marketValue: string;
  nationality: string;
  age: number;
  photo: string;
}

interface TeamData {
  name: string;
  sport: string;
  league: string;
  founded: number;
  stadium: string;
  capacity: number;
  manager: string;
  currentRanking: number;
  recentResults: string[];
  keyPlayers: string[];
  logo: string;
}

const SportsAI: React.FC<SportsAIProps> = ({ onClose }) => {
  const [query, setQuery] = useState('');
  const [searchType, setSearchType] = useState<'player' | 'team' | 'match'>('player');
  const [playerData, setPlayerData] = useState<PlayerData | null>(null);
  const [teamData, setTeamData] = useState<TeamData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'info' | 'stats' | 'analysis' | 'predictions'>('info');

  const handleSearch = async () => {
    if (!query.trim()) return;
    
    setIsLoading(true);
    
    // Simulate AI sports data retrieval
    setTimeout(() => {
      if (searchType === 'player') {
        const mockPlayerData: PlayerData = {
          name: query.toLowerCase().includes('kohli') ? 'Virat Kohli' : 
                query.toLowerCase().includes('messi') ? 'Lionel Messi' : 
                query.toLowerCase().includes('lebron') ? 'LeBron James' : 'Cristiano Ronaldo',
          sport: query.toLowerCase().includes('kohli') ? 'Cricket' : 
                 query.toLowerCase().includes('messi') || query.toLowerCase().includes('ronaldo') ? 'Football' : 'Basketball',
          team: query.toLowerCase().includes('kohli') ? 'Royal Challengers Bangalore' : 
                query.toLowerCase().includes('messi') ? 'Inter Miami CF' : 
                query.toLowerCase().includes('lebron') ? 'Los Angeles Lakers' : 'Al Nassr',
          position: query.toLowerCase().includes('kohli') ? 'Batsman' : 
                   query.toLowerCase().includes('messi') || query.toLowerCase().includes('ronaldo') ? 'Forward' : 'Small Forward',
          stats: {
            'Matches Played': 254,
            'Total Runs/Goals/Points': query.toLowerCase().includes('kohli') ? '12,344' : '800+',
            'Average': query.toLowerCase().includes('kohli') ? '59.07' : '0.91',
            'Strike Rate/Efficiency': query.toLowerCase().includes('kohli') ? '93.17' : '89.5%',
            'Centuries/Hat-tricks': query.toLowerCase().includes('kohli') ? '43' : '12'
          },
          achievements: [
            'ICC ODI Player of the Year (2012, 2017, 2018)',
            'Wisden Leading Cricketer in the World (2016, 2017, 2018)',
            'Padma Shri (2017)',
            'Rajiv Gandhi Khel Ratna (2018)'
          ],
          recentForm: 'Excellent - 3 centuries in last 5 matches',
          marketValue: '$15 million',
          nationality: 'Indian',
          age: 35,
          photo: 'https://images.pexels.com/photos/1661950/pexels-photo-1661950.jpeg?auto=compress&cs=tinysrgb&w=300&h=400&dpr=2'
        };
        setPlayerData(mockPlayerData);
        setTeamData(null);
      } else {
        const mockTeamData: TeamData = {
          name: query.toLowerCase().includes('india') ? 'Team India' : 
                query.toLowerCase().includes('barcelona') ? 'FC Barcelona' : 'Manchester United',
          sport: query.toLowerCase().includes('india') ? 'Cricket' : 'Football',
          league: query.toLowerCase().includes('india') ? 'International Cricket' : 
                  query.toLowerCase().includes('barcelona') ? 'La Liga' : 'Premier League',
          founded: query.toLowerCase().includes('india') ? 1932 : 
                   query.toLowerCase().includes('barcelona') ? 1899 : 1878,
          stadium: query.toLowerCase().includes('india') ? 'Various' : 
                   query.toLowerCase().includes('barcelona') ? 'Camp Nou' : 'Old Trafford',
          capacity: query.toLowerCase().includes('india') ? 0 : 
                    query.toLowerCase().includes('barcelona') ? 99354 : 74140,
          manager: query.toLowerCase().includes('india') ? 'Rahul Dravid' : 
                   query.toLowerCase().includes('barcelona') ? 'Xavi Hernández' : 'Erik ten Hag',
          currentRanking: query.toLowerCase().includes('india') ? 1 : 
                          query.toLowerCase().includes('barcelona') ? 3 : 6,
          recentResults: ['W 3-1', 'W 2-0', 'D 1-1', 'W 4-2', 'L 0-2'],
          keyPlayers: ['Virat Kohli', 'Rohit Sharma', 'Jasprit Bumrah'],
          logo: 'https://images.pexels.com/photos/114296/pexels-photo-114296.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&dpr=2'
        };
        setTeamData(mockTeamData);
        setPlayerData(null);
      }
      setIsLoading(false);
    }, 2000);
  };

  const tabs = [
    { id: 'info', name: 'Basic Info', icon: Trophy },
    { id: 'stats', name: 'Statistics', icon: BarChart3 },
    { id: 'analysis', name: 'AI Analysis', icon: Sparkles },
    { id: 'predictions', name: 'Predictions', icon: TrendingUp }
  ];

  return (
    <div className="bg-white dark:bg-dark-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-dark-700">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-500 rounded-lg flex items-center justify-center">
            <Trophy className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">AI Sports Knowledge Base</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">Get comprehensive information about players, teams, and matches</p>
          </div>
        </div>
      </div>

      {/* Search Controls */}
      <div className="mb-6 space-y-4">
        <div className="flex space-x-2">
          <button
            onClick={() => setSearchType('player')}
            className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
              searchType === 'player'
                ? 'bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-300'
                : 'bg-gray-100 dark:bg-dark-700 text-gray-600 dark:text-gray-400'
            }`}
          >
            <Users className="w-4 h-4 inline mr-1" />
            Player
          </button>
          <button
            onClick={() => setSearchType('team')}
            className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
              searchType === 'team'
                ? 'bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-300'
                : 'bg-gray-100 dark:bg-dark-700 text-gray-600 dark:text-gray-400'
            }`}
          >
            <Trophy className="w-4 h-4 inline mr-1" />
            Team
          </button>
          <button
            onClick={() => setSearchType('match')}
            className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
              searchType === 'match'
                ? 'bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-300'
                : 'bg-gray-100 dark:bg-dark-700 text-gray-600 dark:text-gray-400'
            }`}
          >
            <Activity className="w-4 h-4 inline mr-1" />
            Match
          </button>
        </div>

        <div className="flex space-x-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              placeholder={`Search for ${searchType}... (e.g., Virat Kohli, Team India, Messi)`}
              className="w-full pl-10 pr-3 py-3 border border-gray-300 dark:border-dark-600 rounded-lg bg-gray-50 dark:bg-dark-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
          <button
            onClick={handleSearch}
            disabled={isLoading || !query.trim()}
            className="px-4 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg hover:from-green-700 hover:to-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
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
          <div className="w-12 h-12 border-4 border-green-200 border-t-green-600 rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600 dark:text-gray-400">Analyzing sports data...</p>
          <p className="text-sm text-gray-500 dark:text-gray-500 mt-1">Gathering comprehensive information</p>
        </div>
      )}

      {/* Player Data Display */}
      {playerData && (
        <div className="space-y-6">
          {/* Player Header */}
          <div className="flex space-x-4 p-4 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/10 dark:to-emerald-900/10 rounded-lg">
            <img
              src={playerData.photo}
              alt={playerData.name}
              className="w-24 h-32 object-cover rounded-lg shadow-md"
            />
            <div className="flex-1">
              <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{playerData.name}</h4>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div className="flex items-center space-x-1">
                  <Trophy className="w-4 h-4 text-green-500" />
                  <span className="text-gray-600 dark:text-gray-400">{playerData.sport}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Users className="w-4 h-4 text-green-500" />
                  <span className="text-gray-600 dark:text-gray-400">{playerData.team}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Target className="w-4 h-4 text-green-500" />
                  <span className="text-gray-600 dark:text-gray-400">{playerData.position}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <MapPin className="w-4 h-4 text-green-500" />
                  <span className="text-gray-600 dark:text-gray-400">{playerData.nationality}</span>
                </div>
              </div>
              <div className="mt-3 flex items-center space-x-4">
                <span className="px-3 py-1 bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-300 text-sm rounded-full">
                  Age: {playerData.age}
                </span>
                <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 text-sm rounded-full">
                  Value: {playerData.marketValue}
                </span>
              </div>
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
                    ? 'bg-white dark:bg-dark-800 text-green-700 dark:text-green-300 shadow-sm'
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
                  <h5 className="font-semibold text-gray-900 dark:text-white mb-2">Recent Form</h5>
                  <p className="text-gray-700 dark:text-gray-300 text-sm">{playerData.recentForm}</p>
                </div>
                <div>
                  <h5 className="font-semibold text-gray-900 dark:text-white mb-2">Major Achievements</h5>
                  <div className="space-y-2">
                    {playerData.achievements.map((achievement, index) => (
                      <div key={index} className="flex items-start space-x-2">
                        <Award className="w-4 h-4 text-yellow-500 mt-0.5" />
                        <span className="text-sm text-gray-700 dark:text-gray-300">{achievement}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'stats' && (
              <div className="space-y-4">
                <h5 className="font-semibold text-gray-900 dark:text-white mb-3">Career Statistics</h5>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {Object.entries(playerData.stats).map(([key, value]) => (
                    <div key={key} className="p-3 bg-white dark:bg-dark-800 rounded-lg border border-gray-200 dark:border-dark-600">
                      <p className="text-sm text-gray-600 dark:text-gray-400">{key}</p>
                      <p className="text-lg font-bold text-gray-900 dark:text-white">{value}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'analysis' && (
              <div className="space-y-4">
                <div className="p-4 bg-gradient-to-r from-green-100 to-emerald-100 dark:from-green-900/20 dark:to-emerald-900/20 rounded-lg border border-green-200 dark:border-green-800">
                  <h5 className="font-semibold text-gray-900 dark:text-white mb-2 flex items-center">
                    <Sparkles className="w-4 h-4 mr-2 text-green-600" />
                    AI Performance Analysis
                  </h5>
                  <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                    This player demonstrates exceptional consistency and technical prowess. Their recent form shows remarkable 
                    improvement in key performance metrics. The statistical analysis indicates they are currently in their prime 
                    years with potential for continued excellence. Their leadership qualities and match-winning capabilities 
                    make them invaluable to their team's success.
                  </p>
                </div>
                
                <div>
                  <h5 className="font-semibold text-gray-900 dark:text-white mb-3">Strengths & Key Attributes</h5>
                  <div className="space-y-2">
                    <div className="flex items-start space-x-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full mt-2" />
                      <span className="text-sm text-gray-700 dark:text-gray-300">Exceptional consistency under pressure</span>
                    </div>
                    <div className="flex items-start space-x-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full mt-2" />
                      <span className="text-sm text-gray-700 dark:text-gray-300">Strong leadership and team coordination</span>
                    </div>
                    <div className="flex items-start space-x-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full mt-2" />
                      <span className="text-sm text-gray-700 dark:text-gray-300">Adaptability across different match situations</span>
                    </div>
                    <div className="flex items-start space-x-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full mt-2" />
                      <span className="text-sm text-gray-700 dark:text-gray-300">Technical excellence and strategic thinking</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'predictions' && (
              <div className="space-y-4">
                <div className="p-4 bg-gradient-to-r from-blue-100 to-cyan-100 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                  <h5 className="font-semibold text-gray-900 dark:text-white mb-2 flex items-center">
                    <TrendingUp className="w-4 h-4 mr-2 text-blue-600" />
                    Performance Predictions
                  </h5>
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Next Match Performance</p>
                      <div className="flex items-center space-x-2 mt-1">
                        <div className="flex-1 bg-gray-200 dark:bg-dark-600 rounded-full h-2">
                          <div className="bg-green-500 h-2 rounded-full" style={{ width: '85%' }}></div>
                        </div>
                        <span className="text-sm font-medium text-green-600">85% Positive</span>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Season Outlook</p>
                      <div className="flex items-center space-x-2 mt-1">
                        <div className="flex-1 bg-gray-200 dark:bg-dark-600 rounded-full h-2">
                          <div className="bg-blue-500 h-2 rounded-full" style={{ width: '78%' }}></div>
                        </div>
                        <span className="text-sm font-medium text-blue-600">78% Strong</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h5 className="font-semibold text-gray-900 dark:text-white mb-3">Upcoming Milestones</h5>
                  <div className="space-y-3">
                    <div className="p-3 bg-white dark:bg-dark-800 rounded-lg border border-gray-200 dark:border-dark-600">
                      <p className="text-sm font-medium text-gray-900 dark:text-white">Next Century/Milestone</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Predicted in next 3-4 matches</p>
                    </div>
                    <div className="p-3 bg-white dark:bg-dark-800 rounded-lg border border-gray-200 dark:border-dark-600">
                      <p className="text-sm font-medium text-gray-900 dark:text-white">Career Record Potential</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">On track to break multiple records this season</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Team Data Display */}
      {teamData && (
        <div className="space-y-6">
          {/* Team Header */}
          <div className="flex space-x-4 p-4 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/10 dark:to-emerald-900/10 rounded-lg">
            <img
              src={teamData.logo}
              alt={teamData.name}
              className="w-20 h-20 object-cover rounded-lg shadow-md"
            />
            <div className="flex-1">
              <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{teamData.name}</h4>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div className="flex items-center space-x-1">
                  <Trophy className="w-4 h-4 text-green-500" />
                  <span className="text-gray-600 dark:text-gray-400">{teamData.league}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Calendar className="w-4 h-4 text-green-500" />
                  <span className="text-gray-600 dark:text-gray-400">Founded {teamData.founded}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <MapPin className="w-4 h-4 text-green-500" />
                  <span className="text-gray-600 dark:text-gray-400">{teamData.stadium}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Users className="w-4 h-4 text-green-500" />
                  <span className="text-gray-600 dark:text-gray-400">{teamData.manager}</span>
                </div>
              </div>
              <div className="mt-3">
                <span className="px-3 py-1 bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-300 text-sm rounded-full">
                  Ranking: #{teamData.currentRanking}
                </span>
              </div>
            </div>
          </div>

          {/* Team Stats */}
          <div className="bg-gray-50 dark:bg-dark-700 rounded-lg p-4">
            <h5 className="font-semibold text-gray-900 dark:text-white mb-3">Recent Form</h5>
            <div className="flex space-x-2 mb-4">
              {teamData.recentResults.map((result, index) => (
                <span
                  key={index}
                  className={`px-2 py-1 text-xs font-medium rounded ${
                    result.startsWith('W') 
                      ? 'bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-300'
                      : result.startsWith('L')
                      ? 'bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-300'
                      : 'bg-yellow-100 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-300'
                  }`}
                >
                  {result}
                </span>
              ))}
            </div>
            
            <h5 className="font-semibold text-gray-900 dark:text-white mb-3">Key Players</h5>
            <div className="space-y-2">
              {teamData.keyPlayers.map((player, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <div className="w-6 h-6 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center">
                    <span className="text-xs font-medium text-green-700 dark:text-green-300">{index + 1}</span>
                  </div>
                  <span className="text-sm text-gray-700 dark:text-gray-300">{player}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SportsAI;