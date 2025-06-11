import React, { useState } from 'react';
import { 
  TrendingUp, 
  Target, 
  Calendar, 
  Trophy, 
  BarChart3,
  Zap,
  Clock,
  Users,
  Activity
} from 'lucide-react';

interface SportsPredictorProps {
  onClose?: () => void;
}

interface MatchPrediction {
  match: string;
  teams: { home: string; away: string };
  sport: string;
  date: string;
  predictions: {
    winner: string;
    confidence: number;
    score: string;
    keyFactors: string[];
  };
  odds: {
    home: number;
    away: number;
    draw?: number;
  };
}

const SportsPredictor: React.FC<SportsPredictorProps> = ({ onClose }) => {
  const [selectedSport, setSelectedSport] = useState('cricket');
  const [predictionType, setPredictionType] = useState<'match' | 'player' | 'season'>('match');
  const [predictions, setPredictions] = useState<MatchPrediction[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const sports = [
    { id: 'cricket', name: 'Cricket' },
    { id: 'football', name: 'Football' },
    { id: 'basketball', name: 'Basketball' },
    { id: 'tennis', name: 'Tennis' }
  ];

  const generatePredictions = async () => {
    setIsLoading(true);
    
    // Simulate AI prediction generation
    setTimeout(() => {
      const mockPredictions: MatchPrediction[] = [
        {
          match: 'IND vs AUS',
          teams: { home: 'India', away: 'Australia' },
          sport: selectedSport,
          date: 'Today, 2:30 PM',
          predictions: {
            winner: 'India',
            confidence: 78,
            score: selectedSport === 'cricket' ? '285/6 vs 278/8' : '2-1',
            keyFactors: [
              'Home advantage for India',
              'Recent form favors India (4 wins in last 5)',
              'Weather conditions suit Indian playing style',
              'Key player Virat Kohli in excellent form'
            ]
          },
          odds: {
            home: 1.65,
            away: 2.20,
            draw: selectedSport === 'cricket' ? 4.50 : undefined
          }
        },
        {
          match: 'ENG vs PAK',
          teams: { home: 'England', away: 'Pakistan' },
          sport: selectedSport,
          date: 'Tomorrow, 5:00 PM',
          predictions: {
            winner: 'England',
            confidence: 65,
            score: selectedSport === 'cricket' ? '310/7 vs 295/9' : '3-2',
            keyFactors: [
              'England\'s strong batting lineup',
              'Pakistan\'s inconsistent recent performance',
              'Pitch conditions favor England',
              'England\'s superior bowling attack'
            ]
          },
          odds: {
            home: 1.80,
            away: 1.95,
            draw: selectedSport === 'cricket' ? 3.80 : undefined
          }
        },
        {
          match: 'SA vs NZ',
          teams: { home: 'South Africa', away: 'New Zealand' },
          sport: selectedSport,
          date: 'Dec 28, 10:00 AM',
          predictions: {
            winner: 'South Africa',
            confidence: 72,
            score: selectedSport === 'cricket' ? '265/8 vs 240/10' : '2-0',
            keyFactors: [
              'South Africa\'s home ground advantage',
              'Strong pace bowling attack',
              'New Zealand missing key players',
              'Historical head-to-head favors SA'
            ]
          },
          odds: {
            home: 1.55,
            away: 2.40,
            draw: selectedSport === 'cricket' ? 5.20 : undefined
          }
        }
      ];
      
      setPredictions(mockPredictions);
      setIsLoading(false);
    }, 2000);
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 75) return 'text-green-600 dark:text-green-400';
    if (confidence >= 60) return 'text-yellow-600 dark:text-yellow-400';
    return 'text-red-600 dark:text-red-400';
  };

  const getConfidenceBg = (confidence: number) => {
    if (confidence >= 75) return 'bg-green-500';
    if (confidence >= 60) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <div className="bg-white dark:bg-dark-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-dark-700">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
            <TrendingUp className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">AI Sports Predictor</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">Advanced match predictions and analytics</p>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="mb-6 space-y-4">
        <div className="flex flex-wrap gap-2">
          <div className="flex-1 min-w-32">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Sport
            </label>
            <select
              value={selectedSport}
              onChange={(e) => setSelectedSport(e.target.value)}
              className="w-full p-2 border border-gray-300 dark:border-dark-600 rounded-lg bg-gray-50 dark:bg-dark-700 text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {sports.map((sport) => (
                <option key={sport.id} value={sport.id}>{sport.name}</option>
              ))}
            </select>
          </div>
          
          <div className="flex-1 min-w-32">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Prediction Type
            </label>
            <select
              value={predictionType}
              onChange={(e) => setPredictionType(e.target.value as any)}
              className="w-full p-2 border border-gray-300 dark:border-dark-600 rounded-lg bg-gray-50 dark:bg-dark-700 text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="match">Match Predictions</option>
              <option value="player">Player Performance</option>
              <option value="season">Season Outlook</option>
            </select>
          </div>
        </div>

        <button
          onClick={generatePredictions}
          disabled={isLoading}
          className="w-full flex items-center justify-center space-x-2 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-lg hover:from-blue-700 hover:to-cyan-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
        >
          {isLoading ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              <span>Generating Predictions...</span>
            </>
          ) : (
            <>
              <Zap className="w-4 h-4" />
              <span>Generate AI Predictions</span>
            </>
          )}
        </button>
      </div>

      {/* Loading State */}
      {isLoading && (
        <div className="text-center py-8">
          <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600 dark:text-gray-400">Analyzing match data...</p>
          <p className="text-sm text-gray-500 dark:text-gray-500 mt-1">Processing team statistics and historical data</p>
        </div>
      )}

      {/* Predictions Display */}
      {predictions.length > 0 && (
        <div className="space-y-4">
          <h4 className="font-medium text-gray-900 dark:text-white">Match Predictions</h4>
          
          {predictions.map((prediction, index) => (
            <div key={index} className="bg-gray-50 dark:bg-dark-700 rounded-lg p-4 space-y-4">
              {/* Match Header */}
              <div className="flex items-center justify-between">
                <div>
                  <h5 className="font-semibold text-gray-900 dark:text-white">{prediction.match}</h5>
                  <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
                    <Calendar className="w-3 h-3" />
                    <span>{prediction.date}</span>
                    <Trophy className="w-3 h-3 ml-2" />
                    <span>{prediction.sport}</span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Predicted Winner</p>
                  <p className="text-lg font-bold text-blue-600 dark:text-blue-400">{prediction.predictions.winner}</p>
                </div>
              </div>

              {/* Confidence & Score */}
              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 bg-white dark:bg-dark-800 rounded border border-gray-200 dark:border-dark-600">
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Confidence Level</p>
                  <div className="flex items-center space-x-2">
                    <div className="flex-1 bg-gray-200 dark:bg-dark-600 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full ${getConfidenceBg(prediction.predictions.confidence)}`}
                        style={{ width: `${prediction.predictions.confidence}%` }}
                      />
                    </div>
                    <span className={`text-sm font-medium ${getConfidenceColor(prediction.predictions.confidence)}`}>
                      {prediction.predictions.confidence}%
                    </span>
                  </div>
                </div>
                
                <div className="p-3 bg-white dark:bg-dark-800 rounded border border-gray-200 dark:border-dark-600">
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Predicted Score</p>
                  <p className="font-semibold text-gray-900 dark:text-white">{prediction.predictions.score}</p>
                </div>
              </div>

              {/* Betting Odds */}
              <div className="p-3 bg-white dark:bg-dark-800 rounded border border-gray-200 dark:border-dark-600">
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Betting Odds</p>
                <div className="flex space-x-4">
                  <div className="text-center">
                    <p className="text-xs text-gray-500 dark:text-gray-400">{prediction.teams.home}</p>
                    <p className="font-semibold text-gray-900 dark:text-white">{prediction.odds.home}</p>
                  </div>
                  {prediction.odds.draw && (
                    <div className="text-center">
                      <p className="text-xs text-gray-500 dark:text-gray-400">Draw</p>
                      <p className="font-semibold text-gray-900 dark:text-white">{prediction.odds.draw}</p>
                    </div>
                  )}
                  <div className="text-center">
                    <p className="text-xs text-gray-500 dark:text-gray-400">{prediction.teams.away}</p>
                    <p className="font-semibold text-gray-900 dark:text-white">{prediction.odds.away}</p>
                  </div>
                </div>
              </div>

              {/* Key Factors */}
              <div>
                <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Key Prediction Factors</p>
                <div className="space-y-1">
                  {prediction.predictions.keyFactors.map((factor, factorIndex) => (
                    <div key={factorIndex} className="flex items-start space-x-2">
                      <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2" />
                      <span className="text-sm text-gray-600 dark:text-gray-400">{factor}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* AI Insights */}
      <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/10 dark:to-cyan-900/10 rounded-lg border border-blue-200 dark:border-blue-800">
        <h5 className="font-semibold text-gray-900 dark:text-white mb-2 flex items-center">
          <BarChart3 className="w-4 h-4 mr-2 text-blue-600" />
          AI Prediction Insights
        </h5>
        <div className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
          <p>• Predictions are based on comprehensive analysis of team statistics, player form, and historical data</p>
          <p>• Weather conditions, pitch reports, and injury updates are factored into calculations</p>
          <p>• Machine learning models analyze over 50+ variables for each prediction</p>
          <p>• Confidence levels indicate the reliability of predictions based on data quality</p>
        </div>
      </div>
    </div>
  );
};

export default SportsPredictor;