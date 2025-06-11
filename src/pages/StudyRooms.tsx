import React, { useState } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { 
  Plus, 
  Users, 
  Clock, 
  BookOpen, 
  Brain, 
  FileText, 
  Video,
  Search,
  Filter,
  Zap,
  Sparkles
} from 'lucide-react';
import DocumentSummarizer from '../components/AI/DocumentSummarizer';
import VideoSummarizer from '../components/AI/VideoSummarizer';
import MindMapGenerator from '../components/AI/MindMapGenerator';
import CreateChatRoom from './CreateChatRoom';
import ChatRoom from './ChatRoom';

const StudyRoomsList: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [activeAITool, setActiveAITool] = useState<string | null>(null);

  const studyRooms = [
    {
      id: '1',
      name: 'Advanced Physics',
      description: 'Quantum mechanics and modern physics discussion',
      participants: 12,
      category: 'science',
      isLive: true,
      aiAssisted: true,
      thumbnail: 'https://images.pexels.com/photos/220301/pexels-photo-220301.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=2',
      tags: ['Physics', 'Quantum', 'AI-Assisted'],
    },
    {
      id: '2',
      name: 'Web Development Bootcamp',
      description: 'Full-stack development with React and Node.js',
      participants: 8,
      category: 'technology',
      isLive: false,
      aiAssisted: true,
      thumbnail: 'https://images.pexels.com/photos/270348/pexels-photo-270348.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=2',
      tags: ['React', 'Node.js', 'JavaScript'],
    },
    {
      id: '3',
      name: 'Medical Studies',
      description: 'Anatomy and physiology collaborative learning',
      participants: 15,
      category: 'medical',
      isLive: true,
      aiAssisted: false,
      thumbnail: 'https://images.pexels.com/photos/356040/pexels-photo-356040.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=2',
      tags: ['Anatomy', 'Physiology', 'Medical'],
    },
  ];

  const categories = [
    { id: 'all', name: 'All Rooms' },
    { id: 'science', name: 'Science' },
    { id: 'technology', name: 'Technology' },
    { id: 'medical', name: 'Medical' },
    { id: 'business', name: 'Business' },
  ];

  const aiTools = [
    {
      id: 'document',
      name: 'Document Summarizer',
      description: 'Summarize PDFs, articles, and text content',
      icon: FileText,
      color: 'from-blue-500 to-blue-600',
      component: DocumentSummarizer
    },
    {
      id: 'video',
      name: 'Video Analyzer',
      description: 'Extract key insights from educational videos',
      icon: Video,
      color: 'from-red-500 to-red-600',
      component: VideoSummarizer
    },
    {
      id: 'mindmap',
      name: 'Mind Map Generator',
      description: 'Create visual concept maps for any topic',
      icon: Brain,
      color: 'from-purple-500 to-purple-600',
      component: MindMapGenerator
    }
  ];

  const filteredRooms = studyRooms.filter(room => {
    const matchesSearch = room.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         room.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || room.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const ActiveAIComponent = activeAITool ? aiTools.find(tool => tool.id === activeAITool)?.component : null;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Study Rooms</h1>
          <p className="text-gray-600 dark:text-gray-400">Collaborate, learn, and grow together with AI assistance</p>
        </div>
        <Link
          to="/study-rooms/create"
          className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-primary-600 to-secondary-600 text-white rounded-lg hover:from-primary-700 hover:to-secondary-700 transition-all"
        >
          <Plus className="w-4 h-4 mr-2" />
          Create Room
        </Link>
      </div>

      {/* AI Tools Section */}
      <div className="bg-gradient-to-r from-primary-50 to-secondary-50 dark:from-primary-900/10 dark:to-secondary-900/10 rounded-2xl p-6 border border-primary-200 dark:border-primary-800">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-xl flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">AI Learning Tools</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Enhance your learning with AI-powered assistance</p>
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
                  ? 'border-primary-500 bg-white dark:bg-dark-800 shadow-md'
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
          {/* Search */}
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search study rooms..."
                className="w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-dark-600 rounded-lg bg-gray-50 dark:bg-dark-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          {/* Category Filter */}
          <div className="flex items-center space-x-2">
            <Filter className="w-4 h-4 text-gray-400" />
            <select
              className="border border-gray-300 dark:border-dark-600 rounded-lg bg-gray-50 dark:bg-dark-700 text-gray-900 dark:text-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              {categories.map(category => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Study Rooms Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredRooms.map((room) => (
          <div
            key={room.id}
            className="bg-white dark:bg-dark-800 rounded-xl shadow-sm border border-gray-200 dark:border-dark-700 overflow-hidden hover:shadow-md transition-shadow group"
          >
            {/* Thumbnail */}
            <div className="relative h-40 overflow-hidden">
              <img
                src={room.thumbnail}
                alt={room.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              {room.isLive && (
                <div className="absolute top-3 left-3 px-2 py-1 bg-red-500 text-white text-xs font-medium rounded-full flex items-center">
                  <div className="w-2 h-2 bg-white rounded-full mr-1 animate-pulse" />
                  LIVE
                </div>
              )}
              {room.aiAssisted && (
                <div className="absolute top-3 right-3 p-1.5 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-lg">
                  <Zap className="w-3 h-3 text-white" />
                </div>
              )}
            </div>

            {/* Content */}
            <div className="p-4">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">{room.name}</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm mb-3 line-clamp-2">
                {room.description}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-1 mb-3">
                {room.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-gray-100 dark:bg-dark-700 text-gray-600 dark:text-gray-400 text-xs rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
                  <div className="flex items-center">
                    <Users className="w-4 h-4 mr-1" />
                    {room.participants}
                  </div>
                </div>
                <Link
                  to={`/study-rooms/${room.id}`}
                  className="px-3 py-1.5 bg-primary-100 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300 text-sm font-medium rounded-lg hover:bg-primary-200 dark:hover:bg-primary-900/30 transition-colors"
                >
                  Join Room
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* AI Features Banner */}
      <div className="bg-gradient-to-r from-primary-50 to-secondary-50 dark:from-primary-900/10 dark:to-secondary-900/10 rounded-2xl p-6 border border-primary-200 dark:border-primary-800">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-2xl mb-4">
            <Brain className="w-8 h-8 text-white" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            AI-Powered Learning Experience
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4 max-w-2xl mx-auto">
            Experience the future of education with our comprehensive AI assistant that can summarize documents, 
            create mind maps, analyze videos, answer questions, and facilitate engaging discussions.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <div className="flex items-center px-3 py-2 bg-white dark:bg-dark-800 rounded-lg">
              <FileText className="w-4 h-4 text-primary-600 mr-2" />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Document Analysis</span>
            </div>
            <div className="flex items-center px-3 py-2 bg-white dark:bg-dark-800 rounded-lg">
              <Video className="w-4 h-4 text-primary-600 mr-2" />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Video Summarization</span>
            </div>
            <div className="flex items-center px-3 py-2 bg-white dark:bg-dark-800 rounded-lg">
              <Brain className="w-4 h-4 text-primary-600 mr-2" />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Mind Mapping</span>
            </div>
            <div className="flex items-center px-3 py-2 bg-white dark:bg-dark-800 rounded-lg">
              <Sparkles className="w-4 h-4 text-primary-600 mr-2" />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Smart Q&A</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const StudyRooms: React.FC = () => {
  return (
    <Routes>
      <Route index element={<StudyRoomsList />} />
      <Route path="create" element={<CreateChatRoom />} />
      <Route path=":id" element={<ChatRoom />} />
    </Routes>
  );
};

export default StudyRooms;