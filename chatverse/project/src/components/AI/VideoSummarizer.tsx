import React, { useState } from 'react';
import { 
  Video, 
  Play, 
  Clock, 
  FileText, 
  Download,
  ExternalLink,
  Sparkles
} from 'lucide-react';

interface VideoSummarizerProps {
  onClose?: () => void;
}

const VideoSummarizer: React.FC<VideoSummarizerProps> = ({ onClose }) => {
  const [videoUrl, setVideoUrl] = useState('');
  const [summary, setSummary] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleAnalyze = async () => {
    setIsLoading(true);
    
    // Simulate AI processing
    setTimeout(() => {
      const mockSummary = {
        title: "Introduction to Quantum Computing",
        duration: "15:42",
        thumbnail: "https://images.pexels.com/photos/2582937/pexels-photo-2582937.jpeg?auto=compress&cs=tinysrgb&w=400&h=225&dpr=2",
        keyPoints: [
          {
            timestamp: "0:30",
            title: "What is Quantum Computing?",
            description: "Introduction to quantum bits (qubits) and superposition"
          },
          {
            timestamp: "3:15",
            title: "Quantum vs Classical Computing",
            description: "Comparison of processing capabilities and use cases"
          },
          {
            timestamp: "7:20",
            title: "Quantum Entanglement",
            description: "Explanation of quantum entanglement and its applications"
          },
          {
            timestamp: "11:45",
            title: "Real-world Applications",
            description: "Current and future applications in cryptography and AI"
          }
        ],
        summary: "This video provides a comprehensive introduction to quantum computing, covering fundamental concepts like qubits, superposition, and entanglement. The presenter explains how quantum computers differ from classical computers and explores potential applications in cryptography, artificial intelligence, and scientific research.",
        tags: ["Quantum Computing", "Physics", "Technology", "Science"],
        difficulty: "Intermediate"
      };
      
      setSummary(mockSummary);
      setIsLoading(false);
    }, 2500);
  };

  return (
    <div className="bg-white dark:bg-dark-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-dark-700">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-pink-500 rounded-lg flex items-center justify-center">
            <Video className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">AI Video Summarizer</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">Extract key insights from educational videos</p>
          </div>
        </div>
      </div>

      {/* URL Input */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Video URL
        </label>
        <div className="flex space-x-2">
          <input
            type="url"
            value={videoUrl}
            onChange={(e) => setVideoUrl(e.target.value)}
            placeholder="Paste YouTube URL or video link..."
            className="flex-1 p-3 border border-gray-300 dark:border-dark-600 rounded-lg bg-gray-50 dark:bg-dark-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-500"
          />
          <button
            onClick={handleAnalyze}
            disabled={isLoading || !videoUrl}
            className="px-4 py-3 bg-gradient-to-r from-red-600 to-pink-600 text-white rounded-lg hover:from-red-700 hover:to-pink-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
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
        <div className="text-center py-8">
          <div className="w-12 h-12 border-4 border-red-200 border-t-red-600 rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600 dark:text-gray-400">Analyzing video content...</p>
          <p className="text-sm text-gray-500 dark:text-gray-500 mt-1">This may take a few moments</p>
        </div>
      )}

      {/* Summary Results */}
      {summary && (
        <div className="space-y-6">
          {/* Video Info */}
          <div className="flex space-x-4 p-4 bg-gray-50 dark:bg-dark-700 rounded-lg">
            <img
              src={summary.thumbnail}
              alt={summary.title}
              className="w-24 h-16 object-cover rounded"
            />
            <div className="flex-1">
              <h4 className="font-medium text-gray-900 dark:text-white">{summary.title}</h4>
              <div className="flex items-center space-x-4 mt-1 text-sm text-gray-500 dark:text-gray-400">
                <div className="flex items-center">
                  <Clock className="w-3 h-3 mr-1" />
                  {summary.duration}
                </div>
                <div className="flex items-center">
                  <FileText className="w-3 h-3 mr-1" />
                  {summary.difficulty}
                </div>
              </div>
              <div className="flex flex-wrap gap-1 mt-2">
                {summary.tags.map((tag: string, index: number) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-300 text-xs rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Key Points Timeline */}
          <div>
            <h5 className="font-medium text-gray-900 dark:text-white mb-3">Key Points Timeline</h5>
            <div className="space-y-3">
              {summary.keyPoints.map((point: any, index: number) => (
                <div key={index} className="flex space-x-3 p-3 bg-gray-50 dark:bg-dark-700 rounded-lg hover:bg-gray-100 dark:hover:bg-dark-600 transition-colors cursor-pointer">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 bg-red-100 dark:bg-red-900/20 rounded-lg flex items-center justify-center">
                      <Play className="w-3 h-3 text-red-600 dark:text-red-400" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <h6 className="font-medium text-gray-900 dark:text-white text-sm">{point.title}</h6>
                      <span className="text-xs text-red-600 dark:text-red-400 font-mono">{point.timestamp}</span>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{point.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Summary */}
          <div>
            <h5 className="font-medium text-gray-900 dark:text-white mb-3">AI Summary</h5>
            <div className="p-4 bg-gray-50 dark:bg-dark-700 rounded-lg">
              <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">{summary.summary}</p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex space-x-2">
            <button className="flex items-center space-x-2 px-4 py-2 bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-300 rounded-lg hover:bg-red-200 dark:hover:bg-red-900/30 transition-colors">
              <ExternalLink className="w-4 h-4" />
              <span>Watch Video</span>
            </button>
            <button className="flex items-center space-x-2 px-4 py-2 bg-gray-100 dark:bg-dark-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-dark-600 transition-colors">
              <Download className="w-4 h-4" />
              <span>Export Summary</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoSummarizer;