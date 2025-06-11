import React, { useState, useRef, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Send, 
  Users, 
  Settings, 
  Mic, 
  MicOff, 
  Video, 
  VideoOff,
  Phone,
  PhoneOff,
  MoreVertical,
  Paperclip,
  Smile,
  Search,
  Volume2,
  VolumeX,
  Share,
  Copy,
  UserPlus,
  Crown,
  Shield,
  Ban,
  Zap,
  FileText,
  Image as ImageIcon,
  Download
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useSocket } from '../contexts/SocketContext';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';

interface Message {
  id: string;
  userId: string;
  username: string;
  avatar: string;
  content: string;
  type: 'text' | 'file' | 'image' | 'system';
  timestamp: Date;
  reactions?: { emoji: string; users: string[] }[];
}

interface Participant {
  id: string;
  username: string;
  avatar: string;
  role: 'owner' | 'moderator' | 'member';
  isOnline: boolean;
  isMuted: boolean;
  hasVideo: boolean;
  joinedAt: Date;
}

const ChatRoom: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { socket } = useSocket();
  
  const [messages, setMessages] = useState<Message[]>([]);
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState<string[]>([]);
  const [showParticipants, setShowParticipants] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [hasVideo, setHasVideo] = useState(false);
  const [isInCall, setIsInCall] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Mock room data
  const roomData = {
    id: id || '1',
    name: 'Advanced Physics Discussion',
    description: 'Quantum mechanics and modern physics collaborative learning',
    category: 'science',
    privacy: 'public' as const,
    maxParticipants: 50,
    currentParticipants: 12,
    creator: 'Dr. Smith',
    createdAt: new Date(),
    thumbnail: 'https://images.pexels.com/photos/220301/pexels-photo-220301.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=2',
    tags: ['Physics', 'Quantum', 'AI-Assisted'],
    aiAssisted: true,
    allowFileSharing: true,
    allowVideoChat: true,
  };

  useEffect(() => {
    // Mock initial data
    const mockMessages: Message[] = [
      {
        id: '1',
        userId: 'system',
        username: 'System',
        avatar: '',
        content: `Welcome to ${roomData.name}! This room has AI assistance enabled.`,
        type: 'system',
        timestamp: new Date(Date.now() - 3600000),
      },
      {
        id: '2',
        userId: 'user1',
        username: 'Dr. Smith',
        avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2',
        content: 'Hello everyone! Today we\'ll be discussing quantum entanglement. Has anyone read the latest paper on Bell\'s theorem?',
        type: 'text',
        timestamp: new Date(Date.now() - 1800000),
      },
      {
        id: '3',
        userId: 'user2',
        username: 'Alice Chen',
        avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2',
        content: 'Yes! The implications for quantum computing are fascinating. I have some questions about the measurement problem.',
        type: 'text',
        timestamp: new Date(Date.now() - 900000),
      },
    ];

    const mockParticipants: Participant[] = [
      {
        id: 'user1',
        username: 'Dr. Smith',
        avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2',
        role: 'owner',
        isOnline: true,
        isMuted: false,
        hasVideo: true,
        joinedAt: new Date(Date.now() - 7200000),
      },
      {
        id: 'user2',
        username: 'Alice Chen',
        avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2',
        role: 'member',
        isOnline: true,
        isMuted: false,
        hasVideo: false,
        joinedAt: new Date(Date.now() - 3600000),
      },
      {
        id: user?.id || 'current-user',
        username: user?.username || 'You',
        avatar: user?.avatar || 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2',
        role: 'member',
        isOnline: true,
        isMuted: false,
        hasVideo: false,
        joinedAt: new Date(),
      },
    ];

    setMessages(mockMessages);
    setParticipants(mockParticipants);
  }, [user]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    const message: Message = {
      id: Date.now().toString(),
      userId: user?.id || 'current-user',
      username: user?.username || 'You',
      avatar: user?.avatar || 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2',
      content: newMessage,
      type: 'text',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, message]);
    setNewMessage('');

    // Simulate AI response if AI is enabled
    if (roomData.aiAssisted && newMessage.toLowerCase().includes('ai') || newMessage.includes('?')) {
      setTimeout(() => {
        const aiMessage: Message = {
          id: (Date.now() + 1).toString(),
          userId: 'ai-assistant',
          username: 'AI Assistant',
          avatar: '',
          content: generateAIResponse(newMessage),
          type: 'text',
          timestamp: new Date(),
        };
        setMessages(prev => [...prev, aiMessage]);
      }, 1500);
    }
  };

  const generateAIResponse = (input: string): string => {
    const responses = [
      "That's an excellent question about quantum mechanics! Let me break this down for you...",
      "Based on the latest research, here's what we know about this topic:",
      "I can help clarify that concept. Here's a detailed explanation:",
      "Great observation! This relates to several key principles in physics:",
    ];
    return responses[Math.floor(Math.random() * responses.length)];
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const message: Message = {
      id: Date.now().toString(),
      userId: user?.id || 'current-user',
      username: user?.username || 'You',
      avatar: user?.avatar || '',
      content: `Shared file: ${file.name}`,
      type: 'file',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, message]);
    toast.success('File uploaded successfully!');
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
    toast.success(isMuted ? 'Microphone unmuted' : 'Microphone muted');
  };

  const toggleVideo = () => {
    setHasVideo(!hasVideo);
    toast.success(hasVideo ? 'Camera turned off' : 'Camera turned on');
  };

  const toggleCall = () => {
    setIsInCall(!isInCall);
    toast.success(isInCall ? 'Left voice call' : 'Joined voice call');
  };

  const copyRoomLink = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success('Room link copied to clipboard!');
  };

  const inviteUsers = () => {
    toast.success('Invite link generated! Share with others to join.');
  };

  const filteredMessages = messages.filter(message =>
    message.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
    message.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="h-full flex flex-col bg-white dark:bg-dark-800">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-dark-700 bg-white dark:bg-dark-800">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => navigate('/study-rooms')}
            className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-dark-700 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          
          <div className="flex items-center space-x-3">
            <img
              src={roomData.thumbnail}
              alt={roomData.name}
              className="w-10 h-10 rounded-lg object-cover"
            />
            <div>
              <h1 className="font-semibold text-gray-900 dark:text-white">{roomData.name}</h1>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {roomData.currentParticipants} participants
                {roomData.aiAssisted && (
                  <span className="ml-2 inline-flex items-center">
                    <Zap className="w-3 h-3 text-primary-500 mr-1" />
                    AI Enabled
                  </span>
                )}
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          {/* Voice Controls */}
          <button
            onClick={toggleMute}
            className={`p-2 rounded-lg transition-colors ${
              isMuted 
                ? 'bg-red-100 dark:bg-red-900/20 text-red-600 dark:text-red-400' 
                : 'bg-gray-100 dark:bg-dark-700 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
            }`}
          >
            {isMuted ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
          </button>

          <button
            onClick={toggleVideo}
            className={`p-2 rounded-lg transition-colors ${
              hasVideo 
                ? 'bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-400' 
                : 'bg-gray-100 dark:bg-dark-700 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
            }`}
          >
            {hasVideo ? <Video className="w-4 h-4" /> : <VideoOff className="w-4 h-4" />}
          </button>

          <button
            onClick={toggleCall}
            className={`p-2 rounded-lg transition-colors ${
              isInCall 
                ? 'bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-400' 
                : 'bg-gray-100 dark:bg-dark-700 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
            }`}
          >
            {isInCall ? <Phone className="w-4 h-4" /> : <PhoneOff className="w-4 h-4" />}
          </button>

          {/* Participants */}
          <button
            onClick={() => setShowParticipants(!showParticipants)}
            className="flex items-center space-x-2 px-3 py-2 bg-gray-100 dark:bg-dark-700 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white rounded-lg transition-colors"
          >
            <Users className="w-4 h-4" />
            <span className="text-sm">{participants.length}</span>
          </button>

          {/* Settings */}
          <button
            onClick={() => setShowSettings(!showSettings)}
            className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-dark-700 rounded-lg transition-colors"
          >
            <MoreVertical className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden">
        {/* Main Chat Area */}
        <div className="flex-1 flex flex-col">
          {/* Search Bar */}
          <div className="p-4 border-b border-gray-200 dark:border-dark-700">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search messages..."
                className="w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-dark-600 rounded-lg bg-gray-50 dark:bg-dark-700 text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            <AnimatePresence>
              {filteredMessages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className={`flex space-x-3 ${
                    message.type === 'system' ? 'justify-center' : 
                    message.userId === user?.id ? 'justify-end' : 'justify-start'
                  }`}
                >
                  {message.type === 'system' ? (
                    <div className="px-4 py-2 bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-300 rounded-lg text-sm">
                      {message.content}
                    </div>
                  ) : (
                    <>
                      {message.userId !== user?.id && (
                        <img
                          src={message.avatar || 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2'}
                          alt={message.username}
                          className="w-8 h-8 rounded-full object-cover"
                        />
                      )}
                      <div className={`max-w-xs lg:max-w-md ${
                        message.userId === user?.id ? 'order-first' : ''
                      }`}>
                        {message.userId !== user?.id && (
                          <div className="flex items-center space-x-2 mb-1">
                            <span className="text-sm font-medium text-gray-900 dark:text-white">
                              {message.username}
                            </span>
                            {message.username === 'AI Assistant' && (
                              <Zap className="w-3 h-3 text-primary-500" />
                            )}
                          </div>
                        )}
                        <div className={`p-3 rounded-lg ${
                          message.userId === user?.id
                            ? 'bg-primary-600 text-white'
                            : message.username === 'AI Assistant'
                            ? 'bg-gradient-to-r from-primary-100 to-secondary-100 dark:from-primary-900/20 dark:to-secondary-900/20 text-gray-900 dark:text-white border border-primary-200 dark:border-primary-800'
                            : 'bg-gray-100 dark:bg-dark-700 text-gray-900 dark:text-white'
                        }`}>
                          {message.type === 'file' ? (
                            <div className="flex items-center space-x-2">
                              <FileText className="w-4 h-4" />
                              <span className="text-sm">{message.content}</span>
                              <Download className="w-4 h-4 cursor-pointer hover:text-primary-300" />
                            </div>
                          ) : (
                            <p className="text-sm">{message.content}</p>
                          )}
                        </div>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                          {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </p>
                      </div>
                      {message.userId === user?.id && (
                        <img
                          src={message.avatar || user?.avatar || 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2'}
                          alt={message.username}
                          className="w-8 h-8 rounded-full object-cover"
                        />
                      )}
                    </>
                  )}
                </motion.div>
              ))}
            </AnimatePresence>
            
            {/* Typing Indicator */}
            {isTyping.length > 0 && (
              <div className="flex items-center space-x-2 text-gray-500 dark:text-gray-400">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                </div>
                <span className="text-sm">{isTyping.join(', ')} {isTyping.length === 1 ? 'is' : 'are'} typing...</span>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Message Input */}
          <div className="p-4 border-t border-gray-200 dark:border-dark-700">
            <div className="flex items-center space-x-2">
              <button
                onClick={() => fileInputRef.current?.click()}
                className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-dark-700 rounded-lg transition-colors"
              >
                <Paperclip className="w-4 h-4" />
              </button>
              
              <div className="flex-1 relative">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Type a message..."
                  className="w-full px-4 py-2 border border-gray-300 dark:border-dark-600 rounded-lg bg-white dark:bg-dark-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
                <button className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                  <Smile className="w-4 h-4" />
                </button>
              </div>
              
              <button
                onClick={handleSendMessage}
                disabled={!newMessage.trim()}
                className="p-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>

          <input
            ref={fileInputRef}
            type="file"
            className="hidden"
            onChange={handleFileUpload}
            accept="image/*,.pdf,.doc,.docx,.txt"
          />
        </div>

        {/* Participants Sidebar */}
        <AnimatePresence>
          {showParticipants && (
            <motion.div
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: 300, opacity: 1 }}
              exit={{ width: 0, opacity: 0 }}
              className="border-l border-gray-200 dark:border-dark-700 bg-gray-50 dark:bg-dark-900 overflow-hidden"
            >
              <div className="p-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-gray-900 dark:text-white">Participants ({participants.length})</h3>
                  <button
                    onClick={inviteUsers}
                    className="p-1 text-primary-600 hover:text-primary-700"
                  >
                    <UserPlus className="w-4 h-4" />
                  </button>
                </div>
                
                <div className="space-y-2">
                  {participants.map((participant) => (
                    <div key={participant.id} className="flex items-center justify-between p-2 rounded-lg hover:bg-white dark:hover:bg-dark-800 transition-colors">
                      <div className="flex items-center space-x-3">
                        <div className="relative">
                          <img
                            src={participant.avatar}
                            alt={participant.username}
                            className="w-8 h-8 rounded-full object-cover"
                          />
                          <div className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-white dark:border-dark-800 ${
                            participant.isOnline ? 'bg-green-500' : 'bg-gray-400'
                          }`} />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900 dark:text-white">
                            {participant.username}
                            {participant.id === user?.id && ' (You)'}
                          </p>
                          <div className="flex items-center space-x-1">
                            {participant.role === 'owner' && <Crown className="w-3 h-3 text-yellow-500" />}
                            {participant.role === 'moderator' && <Shield className="w-3 h-3 text-blue-500" />}
                            {participant.isMuted && <MicOff className="w-3 h-3 text-red-500" />}
                            {participant.hasVideo && <Video className="w-3 h-3 text-green-500" />}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Settings Sidebar */}
        <AnimatePresence>
          {showSettings && (
            <motion.div
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: 300, opacity: 1 }}
              exit={{ width: 0, opacity: 0 }}
              className="border-l border-gray-200 dark:border-dark-700 bg-gray-50 dark:bg-dark-900 overflow-hidden"
            >
              <div className="p-4">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Room Settings</h3>
                
                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Room Actions</h4>
                    <div className="space-y-2">
                      <button
                        onClick={copyRoomLink}
                        className="w-full flex items-center space-x-2 p-2 text-left text-gray-700 dark:text-gray-300 hover:bg-white dark:hover:bg-dark-800 rounded-lg transition-colors"
                      >
                        <Copy className="w-4 h-4" />
                        <span className="text-sm">Copy Room Link</span>
                      </button>
                      
                      <button
                        onClick={inviteUsers}
                        className="w-full flex items-center space-x-2 p-2 text-left text-gray-700 dark:text-gray-300 hover:bg-white dark:hover:bg-dark-800 rounded-lg transition-colors"
                      >
                        <Share className="w-4 h-4" />
                        <span className="text-sm">Invite Users</span>
                      </button>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Room Info</h4>
                    <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                      <p><strong>Created:</strong> {roomData.createdAt.toLocaleDateString()}</p>
                      <p><strong>Creator:</strong> {roomData.creator}</p>
                      <p><strong>Category:</strong> {roomData.category}</p>
                      <p><strong>Privacy:</strong> {roomData.privacy}</p>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Features</h4>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600 dark:text-gray-400">AI Assistant</span>
                        <div className={`w-4 h-4 rounded-full ${roomData.aiAssisted ? 'bg-green-500' : 'bg-gray-400'}`} />
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600 dark:text-gray-400">File Sharing</span>
                        <div className={`w-4 h-4 rounded-full ${roomData.allowFileSharing ? 'bg-green-500' : 'bg-gray-400'}`} />
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600 dark:text-gray-400">Video Chat</span>
                        <div className={`w-4 h-4 rounded-full ${roomData.allowVideoChat ? 'bg-green-500' : 'bg-gray-400'}`} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ChatRoom;