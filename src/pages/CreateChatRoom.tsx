import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { 
  ArrowLeft, 
  Users, 
  Lock, 
  Globe, 
  BookOpen, 
  Brain, 
  Zap,
  Tag,
  Image,
  Settings,
  Save,
  Film,
  Trophy,
  Shield,
  Clock,
  FileText,
  MessageSquare,
  Eye,
  EyeOff,
  Calendar,
  Trash2,
  UserCheck,
  AlertCircle
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import toast from 'react-hot-toast';

interface CreateRoomForm {
  sector: 'study' | 'entertainment' | 'sports';
  name: string;
  description: string;
  category: string;
  privacy: 'public' | 'private';
  maxParticipants: number;
  password?: string;
  tags: string;
  rules: string;
  aiAssisted: boolean;
  allowFileSharing: boolean;
  allowVideoChat: boolean;
  allowMessageHistory: boolean;
  enableModeration: boolean;
  autoDeleteMessages: boolean;
  autoDeleteDays: number;
}

const CreateChatRoom: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [isCreating, setIsCreating] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string>('');
  const [showPassword, setShowPassword] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);

  const { register, handleSubmit, formState: { errors }, watch, setValue } = useForm<CreateRoomForm>({
    defaultValues: {
      sector: 'study',
      privacy: 'public',
      maxParticipants: 50,
      aiAssisted: true,
      allowFileSharing: true,
      allowVideoChat: false,
      allowMessageHistory: true,
      enableModeration: false,
      autoDeleteMessages: false,
      autoDeleteDays: 30,
    }
  });

  const selectedSector = watch('sector');
  const privacy = watch('privacy');
  const autoDeleteMessages = watch('autoDeleteMessages');

  const sectors = [
    {
      id: 'study',
      name: 'Study Rooms',
      description: 'Academic discussions, study groups, subject-specific chats',
      icon: BookOpen,
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-50 dark:bg-blue-900/10',
      borderColor: 'border-blue-200 dark:border-blue-800'
    },
    {
      id: 'entertainment',
      name: 'Entertainment',
      description: 'Movies, music, gaming, hobbies',
      icon: Film,
      color: 'from-purple-500 to-purple-600',
      bgColor: 'bg-purple-50 dark:bg-purple-900/10',
      borderColor: 'border-purple-200 dark:border-purple-800'
    },
    {
      id: 'sports',
      name: 'Sports Center',
      description: 'Teams, matches, fitness, training',
      icon: Trophy,
      color: 'from-green-500 to-green-600',
      bgColor: 'bg-green-50 dark:bg-green-900/10',
      borderColor: 'border-green-200 dark:border-green-800'
    }
  ];

  const getCategoriesBySector = (sector: string) => {
    switch (sector) {
      case 'study':
        return [
          { id: 'science', name: 'Science & Technology', icon: '🔬' },
          { id: 'technology', name: 'Programming & Tech', icon: '💻' },
          { id: 'medical', name: 'Medical & Health', icon: '🏥' },
          { id: 'business', name: 'Business & Finance', icon: '💼' },
          { id: 'arts', name: 'Arts & Literature', icon: '🎨' },
          { id: 'languages', name: 'Languages', icon: '🌍' },
          { id: 'mathematics', name: 'Mathematics', icon: '📊' },
          { id: 'general', name: 'General Discussion', icon: '💬' },
        ];
      case 'entertainment':
        return [
          { id: 'movies', name: 'Movies & TV Shows', icon: '🎬' },
          { id: 'music', name: 'Music & Audio', icon: '🎵' },
          { id: 'gaming', name: 'Gaming', icon: '🎮' },
          { id: 'books', name: 'Books & Reading', icon: '📚' },
          { id: 'anime', name: 'Anime & Manga', icon: '🎌' },
          { id: 'art', name: 'Art & Design', icon: '🎨' },
          { id: 'comedy', name: 'Comedy & Memes', icon: '😂' },
          { id: 'general', name: 'General Chat', icon: '💬' },
        ];
      case 'sports':
        return [
          { id: 'football', name: 'Football/Soccer', icon: '⚽' },
          { id: 'basketball', name: 'Basketball', icon: '🏀' },
          { id: 'cricket', name: 'Cricket', icon: '🏏' },
          { id: 'tennis', name: 'Tennis', icon: '🎾' },
          { id: 'fitness', name: 'Fitness & Training', icon: '💪' },
          { id: 'esports', name: 'E-Sports', icon: '🎮' },
          { id: 'olympics', name: 'Olympics & Athletics', icon: '🏃' },
          { id: 'general', name: 'General Sports', icon: '🏆' },
        ];
      default:
        return [];
    }
  };

  const getThumbnailsBySector = (sector: string) => {
    switch (sector) {
      case 'study':
        return [
          'https://images.pexels.com/photos/220301/pexels-photo-220301.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=2',
          'https://images.pexels.com/photos/270348/pexels-photo-270348.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=2',
          'https://images.pexels.com/photos/356040/pexels-photo-356040.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=2',
          'https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=2',
          'https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=2',
          'https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=2',
        ];
      case 'entertainment':
        return [
          'https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=2',
          'https://images.pexels.com/photos/7991678/pexels-photo-7991678.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=2',
          'https://images.pexels.com/photos/33129/popcorn-movie-party-entertainment.jpg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=2',
          'https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=2',
          'https://images.pexels.com/photos/442150/pexels-photo-442150.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=2',
          'https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=2',
        ];
      case 'sports':
        return [
          'https://images.pexels.com/photos/1661950/pexels-photo-1661950.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=2',
          'https://images.pexels.com/photos/114296/pexels-photo-114296.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=2',
          'https://images.pexels.com/photos/358042/pexels-photo-358042.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=2',
          'https://images.pexels.com/photos/209977/pexels-photo-209977.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=2',
          'https://images.pexels.com/photos/863988/pexels-photo-863988.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=2',
          'https://images.pexels.com/photos/1552242/pexels-photo-1552242.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=2',
        ];
      default:
        return [];
    }
  };

  const onSubmit = async (data: CreateRoomForm) => {
    setIsCreating(true);
    
    try {
      // Simulate room creation
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const newRoom = {
        id: Date.now().toString(),
        sector: data.sector,
        name: data.name,
        description: data.description,
        category: data.category,
        privacy: data.privacy,
        maxParticipants: data.maxParticipants,
        currentParticipants: 1,
        creator: user?.username,
        createdAt: new Date(),
        thumbnail: selectedImage || getThumbnailsBySector(data.sector)[0],
        tags: data.tags.split(',').map(tag => tag.trim()).filter(Boolean),
        rules: data.rules,
        aiAssisted: data.aiAssisted,
        allowFileSharing: data.allowFileSharing,
        allowVideoChat: data.allowVideoChat,
        allowMessageHistory: data.allowMessageHistory,
        enableModeration: data.enableModeration,
        autoDeleteMessages: data.autoDeleteMessages,
        autoDeleteDays: data.autoDeleteDays,
      };

      toast.success('Chat room created successfully!');
      
      // Navigate to appropriate section based on sector
      const sectorRoutes = {
        study: '/study-rooms',
        entertainment: '/entertainment',
        sports: '/sports'
      };
      
      navigate(`${sectorRoutes[data.sector]}/${newRoom.id}`);
    } catch (error) {
      toast.error('Failed to create chat room. Please try again.');
    } finally {
      setIsCreating(false);
    }
  };

  const nextStep = () => {
    if (currentStep < 3) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const selectedSectorData = sectors.find(s => s.id === selectedSector);
  const thumbnailOptions = getThumbnailsBySector(selectedSector);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-4">
        <button
          onClick={() => navigate(-1)}
          className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-dark-700 rounded-lg transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Create New Chat Room</h1>
          <p className="text-gray-600 dark:text-gray-400">Set up a new chat space for your community</p>
        </div>
      </div>

      {/* Progress Steps */}
      <div className="bg-white dark:bg-dark-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-dark-700">
        <div className="flex items-center justify-between mb-4">
          {[1, 2, 3].map((step) => (
            <div key={step} className="flex items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                step <= currentStep 
                  ? 'bg-primary-600 text-white' 
                  : 'bg-gray-200 dark:bg-dark-700 text-gray-500 dark:text-gray-400'
              }`}>
                {step}
              </div>
              {step < 3 && (
                <div className={`w-16 h-1 mx-2 ${
                  step < currentStep ? 'bg-primary-600' : 'bg-gray-200 dark:bg-dark-700'
                }`} />
              )}
            </div>
          ))}
        </div>
        <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
          <span>Choose Sector</span>
          <span>Room Details</span>
          <span>Settings & Features</span>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Step 1: Choose Sector */}
        {currentStep === 1 && (
          <div className="bg-white dark:bg-dark-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-dark-700">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">Choose a Sector</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {sectors.map((sector) => (
                <label
                  key={sector.id}
                  className={`relative cursor-pointer rounded-xl border-2 p-6 transition-all hover:shadow-md ${
                    selectedSector === sector.id
                      ? `${sector.borderColor} ${sector.bgColor} shadow-md`
                      : 'border-gray-200 dark:border-dark-600 hover:border-gray-300 dark:hover:border-dark-500'
                  }`}
                >
                  <input
                    {...register('sector')}
                    type="radio"
                    value={sector.id}
                    className="sr-only"
                  />
                  
                  <div className="text-center">
                    <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r ${sector.color} rounded-xl mb-4`}>
                      <sector.icon className="w-8 h-8 text-white" />
                    </div>
                    <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                      {sector.name}
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {sector.description}
                    </p>
                  </div>
                  
                  {selectedSector === sector.id && (
                    <div className="absolute top-4 right-4 w-6 h-6 bg-primary-600 rounded-full flex items-center justify-center">
                      <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                  )}
                </label>
              ))}
            </div>
          </div>
        )}

        {/* Step 2: Room Details */}
        {currentStep === 2 && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              {/* Basic Information */}
              <div className="bg-white dark:bg-dark-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-dark-700">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                  {selectedSectorData && <selectedSectorData.icon className="w-5 h-5 mr-2" />}
                  Basic Information
                </h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Room Name * <span className="text-xs text-gray-500">(2-30 characters)</span>
                    </label>
                    <input
                      {...register('name', { 
                        required: 'Room name is required',
                        minLength: { value: 2, message: 'Name must be at least 2 characters' },
                        maxLength: { value: 30, message: 'Name must be less than 30 characters' }
                      })}
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 dark:border-dark-600 rounded-lg bg-white dark:bg-dark-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                      placeholder="Enter a clear, descriptive name..."
                    />
                    {errors.name && (
                      <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Description * <span className="text-xs text-gray-500">(max 200 characters)</span>
                    </label>
                    <textarea
                      {...register('description', { 
                        required: 'Description is required',
                        maxLength: { value: 200, message: 'Description must be less than 200 characters' }
                      })}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-dark-600 rounded-lg bg-white dark:bg-dark-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                      placeholder="Briefly describe the room's purpose..."
                    />
                    {errors.description && (
                      <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Category *
                    </label>
                    <select
                      {...register('category', { required: 'Category is required' })}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-dark-600 rounded-lg bg-white dark:bg-dark-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                    >
                      <option value="">Select a category</option>
                      {getCategoriesBySector(selectedSector).map(category => (
                        <option key={category.id} value={category.id}>
                          {category.icon} {category.name}
                        </option>
                      ))}
                    </select>
                    {errors.category && (
                      <p className="mt-1 text-sm text-red-600">{errors.category.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Tags (comma-separated)
                    </label>
                    <input
                      {...register('tags')}
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 dark:border-dark-600 rounded-lg bg-white dark:bg-dark-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                      placeholder="e.g., physics, quantum, advanced"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Room Rules (optional)
                    </label>
                    <textarea
                      {...register('rules')}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-dark-600 rounded-lg bg-white dark:bg-dark-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                      placeholder="Set optional room guidelines or requirements..."
                    />
                  </div>
                </div>
              </div>

              {/* Privacy & Access */}
              <div className="bg-white dark:bg-dark-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-dark-700">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                  <Lock className="w-5 h-5 mr-2" />
                  Privacy & Access
                </h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                      Room Type
                    </label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <label className={`flex items-start p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                        privacy === 'public' 
                          ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20' 
                          : 'border-gray-300 dark:border-dark-600'
                      }`}>
                        <input
                          {...register('privacy')}
                          type="radio"
                          value="public"
                          className="sr-only"
                        />
                        <Globe className="w-5 h-5 text-primary-600 mr-3 mt-0.5" />
                        <div>
                          <p className="font-medium text-gray-900 dark:text-white">Public</p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">Anyone can join and participate</p>
                        </div>
                      </label>
                      
                      <label className={`flex items-start p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                        privacy === 'private' 
                          ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20' 
                          : 'border-gray-300 dark:border-dark-600'
                      }`}>
                        <input
                          {...register('privacy')}
                          type="radio"
                          value="private"
                          className="sr-only"
                        />
                        <Lock className="w-5 h-5 text-primary-600 mr-3 mt-0.5" />
                        <div>
                          <p className="font-medium text-gray-900 dark:text-white">Private</p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">Requires invitation or password to join</p>
                        </div>
                      </label>
                    </div>
                  </div>

                  {privacy === 'private' && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Room Password (optional)
                      </label>
                      <div className="relative">
                        <input
                          {...register('password')}
                          type={showPassword ? 'text' : 'password'}
                          className="w-full px-3 py-2 pr-10 border border-gray-300 dark:border-dark-600 rounded-lg bg-white dark:bg-dark-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                          placeholder="Enter password for private room..."
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        >
                          {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>
                  )}

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Room Capacity <span className="text-xs text-gray-500">(2-100 participants)</span>
                    </label>
                    <input
                      {...register('maxParticipants', { 
                        required: 'Max participants is required',
                        min: { value: 2, message: 'Minimum 2 participants required' },
                        max: { value: 100, message: 'Maximum 100 participants allowed' }
                      })}
                      type="number"
                      min="2"
                      max="100"
                      className="w-full px-3 py-2 border border-gray-300 dark:border-dark-600 rounded-lg bg-white dark:bg-dark-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                    {errors.maxParticipants && (
                      <p className="mt-1 text-sm text-red-600">{errors.maxParticipants.message}</p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Room Thumbnail */}
              <div className="bg-white dark:bg-dark-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-dark-700">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Room Thumbnail</h3>
                
                <div className="grid grid-cols-2 gap-2">
                  {thumbnailOptions.map((thumbnail, index) => (
                    <button
                      key={index}
                      type="button"
                      onClick={() => setSelectedImage(thumbnail)}
                      className={`relative h-20 rounded-lg overflow-hidden border-2 transition-colors ${
                        selectedImage === thumbnail 
                          ? 'border-primary-500' 
                          : 'border-gray-300 dark:border-dark-600'
                      }`}
                    >
                      <img
                        src={thumbnail}
                        alt={`Thumbnail ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              </div>

              {/* Preview */}
              <div className="bg-white dark:bg-dark-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-dark-700">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Preview</h3>
                
                <div className="bg-gray-50 dark:bg-dark-700 rounded-lg p-4">
                  <div className="relative h-24 rounded-lg overflow-hidden mb-3">
                    <img
                      src={selectedImage || thumbnailOptions[0]}
                      alt="Room preview"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-2 right-2 p-1 bg-gradient-to-r from-primary-500 to-secondary-500 rounded">
                      <Zap className="w-3 h-3 text-white" />
                    </div>
                  </div>
                  <h4 className="font-medium text-gray-900 dark:text-white text-sm mb-1">
                    {watch('name') || 'Room Name'}
                  </h4>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">
                    {watch('description') || 'Room description will appear here...'}
                  </p>
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center text-gray-500 dark:text-gray-400">
                      <Users className="w-3 h-3 mr-1" />
                      1/{watch('maxParticipants') || 50}
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      privacy === 'public' 
                        ? 'bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-300'
                        : 'bg-yellow-100 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-300'
                    }`}>
                      {privacy === 'public' ? 'Public' : 'Private'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Settings & Features */}
        {currentStep === 3 && (
          <div className="space-y-6">
            {/* Features */}
            <div className="bg-white dark:bg-dark-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-dark-700">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                <Settings className="w-5 h-5 mr-2" />
                Room Features
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-dark-700 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Zap className="w-5 h-5 text-primary-600" />
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">AI Assistant</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Enable AI-powered assistance</p>
                      </div>
                    </div>
                    <input
                      {...register('aiAssisted')}
                      type="checkbox"
                      className="w-4 h-4 text-primary-600 bg-gray-100 border-gray-300 rounded focus:ring-primary-500"
                    />
                  </div>

                  <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-dark-700 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <FileText className="w-5 h-5 text-primary-600" />
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">File Sharing</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Allow participants to share files</p>
                      </div>
                    </div>
                    <input
                      {...register('allowFileSharing')}
                      type="checkbox"
                      className="w-4 h-4 text-primary-600 bg-gray-100 border-gray-300 rounded focus:ring-primary-500"
                    />
                  </div>

                  <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-dark-700 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Users className="w-5 h-5 text-primary-600" />
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">Video Chat</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Enable video conferencing</p>
                      </div>
                    </div>
                    <input
                      {...register('allowVideoChat')}
                      type="checkbox"
                      className="w-4 h-4 text-primary-600 bg-gray-100 border-gray-300 rounded focus:ring-primary-500"
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-dark-700 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <MessageSquare className="w-5 h-5 text-primary-600" />
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">Message History</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Allow new members to see history</p>
                      </div>
                    </div>
                    <input
                      {...register('allowMessageHistory')}
                      type="checkbox"
                      className="w-4 h-4 text-primary-600 bg-gray-100 border-gray-300 rounded focus:ring-primary-500"
                    />
                  </div>

                  <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-dark-700 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Shield className="w-5 h-5 text-primary-600" />
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">Moderator Roles</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Enable moderator management</p>
                      </div>
                    </div>
                    <input
                      {...register('enableModeration')}
                      type="checkbox"
                      className="w-4 h-4 text-primary-600 bg-gray-100 border-gray-300 rounded focus:ring-primary-500"
                    />
                  </div>

                  <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-dark-700 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Trash2 className="w-5 h-5 text-primary-600" />
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">Auto-Delete Messages</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Scheduled message cleanup</p>
                      </div>
                    </div>
                    <input
                      {...register('autoDeleteMessages')}
                      type="checkbox"
                      className="w-4 h-4 text-primary-600 bg-gray-100 border-gray-300 rounded focus:ring-primary-500"
                    />
                  </div>
                </div>
              </div>

              {autoDeleteMessages && (
                <div className="mt-4 p-4 bg-yellow-50 dark:bg-yellow-900/10 border border-yellow-200 dark:border-yellow-800 rounded-lg">
                  <div className="flex items-start space-x-3">
                    <AlertCircle className="w-5 h-5 text-yellow-600 dark:text-yellow-400 mt-0.5" />
                    <div className="flex-1">
                      <h4 className="font-medium text-yellow-800 dark:text-yellow-300 mb-2">Auto-Delete Settings</h4>
                      <div className="flex items-center space-x-4">
                        <label className="text-sm text-yellow-700 dark:text-yellow-400">
                          Delete messages after:
                        </label>
                        <select
                          {...register('autoDeleteDays')}
                          className="px-3 py-1 border border-yellow-300 dark:border-yellow-700 rounded bg-white dark:bg-dark-800 text-yellow-800 dark:text-yellow-300 text-sm"
                        >
                          <option value={7}>7 days</option>
                          <option value={14}>14 days</option>
                          <option value={30}>30 days</option>
                          <option value={90}>90 days</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Final Preview */}
            <div className="bg-white dark:bg-dark-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-dark-700">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Final Review</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <div>
                    <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Sector:</span>
                    <p className="text-gray-900 dark:text-white">{selectedSectorData?.name}</p>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Room Name:</span>
                    <p className="text-gray-900 dark:text-white">{watch('name') || 'Not set'}</p>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Privacy:</span>
                    <p className="text-gray-900 dark:text-white capitalize">{privacy}</p>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Capacity:</span>
                    <p className="text-gray-900 dark:text-white">{watch('maxParticipants')} participants</p>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div>
                    <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Features Enabled:</span>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {watch('aiAssisted') && (
                        <span className="px-2 py-1 bg-primary-100 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300 text-xs rounded-full">
                          AI Assistant
                        </span>
                      )}
                      {watch('allowFileSharing') && (
                        <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 text-xs rounded-full">
                          File Sharing
                        </span>
                      )}
                      {watch('allowVideoChat') && (
                        <span className="px-2 py-1 bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-300 text-xs rounded-full">
                          Video Chat
                        </span>
                      )}
                      {watch('enableModeration') && (
                        <span className="px-2 py-1 bg-purple-100 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300 text-xs rounded-full">
                          Moderation
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex justify-between">
          <button
            type="button"
            onClick={currentStep === 1 ? () => navigate(-1) : prevStep}
            className="px-6 py-2 border border-gray-300 dark:border-dark-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-dark-700 transition-colors"
          >
            {currentStep === 1 ? 'Cancel' : 'Previous'}
          </button>
          
          {currentStep < 3 ? (
            <button
              type="button"
              onClick={nextStep}
              className="px-6 py-2 bg-gradient-to-r from-primary-600 to-secondary-600 text-white rounded-lg hover:from-primary-700 hover:to-secondary-700 transition-all"
            >
              Next
            </button>
          ) : (
            <button
              type="submit"
              disabled={isCreating}
              className="flex items-center px-6 py-2 bg-gradient-to-r from-primary-600 to-secondary-600 text-white rounded-lg hover:from-primary-700 hover:to-secondary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              {isCreating ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                  Creating Room...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4 mr-2" />
                  Create Room
                </>
              )}
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default CreateChatRoom;