import React, { useState } from 'react';
import { 
  Brain, 
  Plus, 
  Download, 
  Share2, 
  Sparkles,
  GitBranch
} from 'lucide-react';

interface MindMapNode {
  id: string;
  text: string;
  x: number;
  y: number;
  level: number;
  children: string[];
  color: string;
}

interface MindMapGeneratorProps {
  onClose?: () => void;
}

const MindMapGenerator: React.FC<MindMapGeneratorProps> = ({ onClose }) => {
  const [topic, setTopic] = useState('');
  const [mindMap, setMindMap] = useState<MindMapNode[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const colors = [
    'bg-blue-500', 'bg-green-500', 'bg-purple-500', 'bg-red-500', 
    'bg-yellow-500', 'bg-pink-500', 'bg-indigo-500', 'bg-teal-500'
  ];

  const handleGenerate = async () => {
    setIsLoading(true);
    
    // Simulate AI processing
    setTimeout(() => {
      const mockMindMap: MindMapNode[] = [
        {
          id: 'root',
          text: topic || 'Machine Learning',
          x: 400,
          y: 200,
          level: 0,
          children: ['supervised', 'unsupervised', 'reinforcement', 'applications'],
          color: 'bg-purple-500'
        },
        {
          id: 'supervised',
          text: 'Supervised Learning',
          x: 200,
          y: 100,
          level: 1,
          children: ['classification', 'regression'],
          color: 'bg-blue-500'
        },
        {
          id: 'unsupervised',
          text: 'Unsupervised Learning',
          x: 600,
          y: 100,
          level: 1,
          children: ['clustering', 'dimensionality'],
          color: 'bg-green-500'
        },
        {
          id: 'reinforcement',
          text: 'Reinforcement Learning',
          x: 200,
          y: 300,
          level: 1,
          children: ['q-learning', 'policy'],
          color: 'bg-red-500'
        },
        {
          id: 'applications',
          text: 'Applications',
          x: 600,
          y: 300,
          level: 1,
          children: ['nlp', 'computer-vision'],
          color: 'bg-yellow-500'
        },
        // Level 2 nodes
        {
          id: 'classification',
          text: 'Classification',
          x: 100,
          y: 50,
          level: 2,
          children: [],
          color: 'bg-blue-400'
        },
        {
          id: 'regression',
          text: 'Regression',
          x: 300,
          y: 50,
          level: 2,
          children: [],
          color: 'bg-blue-400'
        },
        {
          id: 'clustering',
          text: 'Clustering',
          x: 500,
          y: 50,
          level: 2,
          children: [],
          color: 'bg-green-400'
        },
        {
          id: 'dimensionality',
          text: 'Dimensionality Reduction',
          x: 700,
          y: 50,
          level: 2,
          children: [],
          color: 'bg-green-400'
        },
        {
          id: 'q-learning',
          text: 'Q-Learning',
          x: 100,
          y: 350,
          level: 2,
          children: [],
          color: 'bg-red-400'
        },
        {
          id: 'policy',
          text: 'Policy Gradient',
          x: 300,
          y: 350,
          level: 2,
          children: [],
          color: 'bg-red-400'
        },
        {
          id: 'nlp',
          text: 'Natural Language Processing',
          x: 500,
          y: 350,
          level: 2,
          children: [],
          color: 'bg-yellow-400'
        },
        {
          id: 'computer-vision',
          text: 'Computer Vision',
          x: 700,
          y: 350,
          level: 2,
          children: [],
          color: 'bg-yellow-400'
        }
      ];
      
      setMindMap(mockMindMap);
      setIsLoading(false);
    }, 2000);
  };

  const renderConnections = () => {
    return mindMap.map(node => 
      node.children.map(childId => {
        const child = mindMap.find(n => n.id === childId);
        if (!child) return null;
        
        return (
          <line
            key={`${node.id}-${childId}`}
            x1={node.x}
            y1={node.y}
            x2={child.x}
            y2={child.y}
            stroke="#6B7280"
            strokeWidth="2"
            className="opacity-60"
          />
        );
      })
    ).flat().filter(Boolean);
  };

  return (
    <div className="bg-white dark:bg-dark-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-dark-700">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
            <Brain className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">AI Mind Map Generator</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">Visualize concepts and their relationships</p>
          </div>
        </div>
      </div>

      {/* Topic Input */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Topic or Concept
        </label>
        <div className="flex space-x-2">
          <input
            type="text"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="Enter a topic to create a mind map..."
            className="flex-1 p-3 border border-gray-300 dark:border-dark-600 rounded-lg bg-gray-50 dark:bg-dark-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <button
            onClick={handleGenerate}
            disabled={isLoading || !topic}
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
          <p className="text-gray-600 dark:text-gray-400">Generating mind map...</p>
          <p className="text-sm text-gray-500 dark:text-gray-500 mt-1">Analyzing concepts and relationships</p>
        </div>
      )}

      {/* Mind Map Visualization */}
      {mindMap.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="font-medium text-gray-900 dark:text-white">Generated Mind Map</h4>
            <div className="flex space-x-2">
              <button className="flex items-center space-x-1 px-3 py-1.5 text-sm bg-gray-100 dark:bg-dark-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-dark-600 transition-colors">
                <Share2 className="w-3 h-3" />
                <span>Share</span>
              </button>
              <button className="flex items-center space-x-1 px-3 py-1.5 text-sm bg-gray-100 dark:bg-dark-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-dark-600 transition-colors">
                <Download className="w-3 h-3" />
                <span>Export</span>
              </button>
            </div>
          </div>

          <div className="relative bg-gray-50 dark:bg-dark-700 rounded-lg p-4 overflow-auto" style={{ height: '400px' }}>
            <svg width="800" height="400" className="w-full h-full">
              {/* Render connections */}
              {renderConnections()}
              
              {/* Render nodes */}
              {mindMap.map(node => (
                <g key={node.id}>
                  <circle
                    cx={node.x}
                    cy={node.y}
                    r={node.level === 0 ? 40 : node.level === 1 ? 30 : 20}
                    className={`${node.color} opacity-90`}
                    fill="currentColor"
                  />
                  <text
                    x={node.x}
                    y={node.y + 5}
                    textAnchor="middle"
                    className="fill-white text-xs font-medium"
                    style={{ fontSize: node.level === 0 ? '12px' : '10px' }}
                  >
                    {node.text.length > 15 ? node.text.substring(0, 15) + '...' : node.text}
                  </text>
                </g>
              ))}
            </svg>
          </div>

          {/* Legend */}
          <div className="flex items-center justify-center space-x-6 text-xs text-gray-500 dark:text-gray-400">
            <div className="flex items-center space-x-1">
              <div className="w-3 h-3 bg-purple-500 rounded-full" />
              <span>Main Topic</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-2.5 h-2.5 bg-blue-500 rounded-full" />
              <span>Subtopics</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-green-500 rounded-full" />
              <span>Details</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MindMapGenerator;