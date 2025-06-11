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
  Save
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import toast from 'react-hot-toast';

interface CreateRoomForm {
  name: string;
  description: string;
  category: string;
  privacy: 'public' | 'private';
  maxParticipants: number;
  password?: string;
  tags: string;
  aiAssisted: boolean;
  allowFileSharing: boolean;
  allowVideoChat: boolean;
}

const CreateChatRoom: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [isCreating, setIsCreating] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string>('');

  const { register, handleSubmit, formState: { errors }, watch } = useForm<CreateRoomForm>({
    defaultValues: {
      privacy: 'public',
      maxParticipants: 50,
      aiAssisted: true,
      allowFileSharing: true,
      allowVideoChat: false,
    }
  });

  const privacy = watch('privacy');

  const categories = [
    { id: 'science', name: 'Science & Technology', icon: '🔬' },
    { id: 'technology', name: 'Programming & Tech', icon: '💻' },
    { id: 'medical', name: 'Medical & Health', icon: '🏥' },
    { id: 'business', name: 'Business & Finance', icon: '💼' },
    { id: 'arts', name: 'Arts & Literature', icon: '🎨' },
    { id: 'languages', name: 'Languages', icon: '🌍' },
    { id: 'mathematics', name: 'Mathematics', icon: '📊' },
    { id: 'general', name: 'General Discussion', icon: '💬' },
  ];

  const thumbnailOptions = [
    'https://images.pexels.com/photos/220301/pexels-photo-220301.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=2',
    'https://images.pexels.com/photos/270348/pexels-photo-270348.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=2',
    'https://images.pexels.com/photos/356040/pexels-photo-356040.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=2',
    'https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=2',
    'https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=2',
    'https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&dpr=2',
  ];

  const onSubmit = async (data: CreateRoomForm) => {
    setIsCreating(true);
    
    try {
      // Simulate room creation
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const newRoom = {
        id: Date.now().toString(),
        name: data.name,
        description: data.description,
        category: data.category,
        privacy: data.privacy,
        maxParticipants: data.maxParticipants,
        currentParticipants: 1,
        creator: user?.username,
        createdAt: new Date(),
        thumbnail: selectedImage || thumbnailOptions[0],
        tags: data.tags.split(',').map(tag => tag.trim()).filter(Boolean),
        aiAssisted: data.aiAssisted,
        allowFileSharing: data.allowFileSharing,
        allowVideoChat: data.allowVideoChat,
      };

      toast.success('Chat room created successfully!');
      navigate(`/study-rooms/${newRoom.id}`);
    } catch (error) {
      toast.error('Failed to create chat room. Please try again.');
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-4">
        <button
          onClick={() => navigate('/study-rooms')}
          className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-dark-700 rounded-lg transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Create Chat Room</h1>
          <p className="text-gray-600 dark:text-gray-400">Set up a new study room for collaborative learning</p>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Basic Information */}
            <div className="bg-white dark:bg-dark-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-dark-700">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                <BookOpen className="w-5 h-5 mr-2" />
                Basic Information
              </h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Room Name *
                  </label>
                  <input
                    {...register('name', { required: 'Room name is required' })}
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-dark-600 rounded-lg bg-white dark:bg-dark-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                    placeholder="Enter room name..."
                  />
                  {errors.name && (
                    <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Description *
                  </label>
                  <textarea
                    {...register('description', { required: 'Description is required' })}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-dark-600 rounded-lg bg-white dark:bg-dark-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                    placeholder="Describe what this room is about..."
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
                    {categories.map(category => (
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
                    Room Privacy
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <label className={`flex items-center p-3 border-2 rounded-lg cursor-pointer transition-colors ${
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
                      <Globe className="w-5 h-5 text-primary-600 mr-3" />
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">Public</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Anyone can join</p>
                      </div>
                    </label>
                    
                    <label className={`flex items-center p-3 border-2 rounded-lg cursor-pointer transition-colors ${
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
                      <Lock className="w-5 h-5 text-primary-600 mr-3" />
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">Private</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Invite only</p>
                      </div>
                    </label>
                  </div>
                </div>

                {privacy === 'private' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Room Password (optional)
                    </label>
                    <input
                      {...register('password')}
                      type="password"
                      className="w-full px-3 py-2 border border-gray-300 dark:border-dark-600 rounded-lg bg-white dark:bg-dark-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                      placeholder="Enter password for private room..."
                    />
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Maximum Participants
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

            {/* Features */}
            <div className="bg-white dark:bg-dark-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-dark-700">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                <Settings className="w-5 h-5 mr-2" />
                Room Features
              </h3>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Zap className="w-5 h-5 text-primary-600" />
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">AI Assistant</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Enable AI-powered learning assistance</p>
                    </div>
                  </div>
                  <input
                    {...register('aiAssisted')}
                    type="checkbox"
                    className="w-4 h-4 text-primary-600 bg-gray-100 border-gray-300 rounded focus:ring-primary-500"
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Image className="w-5 h-5 text-primary-600" />
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

                <div className="flex items-center justify-between">
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

        {/* Submit Button */}
        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={() => navigate('/study-rooms')}
            className="px-6 py-2 border border-gray-300 dark:border-dark-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-dark-700 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isCreating}
            className="flex items-center px-6 py-2 bg-gradient-to-r from-primary-600 to-secondary-600 text-white rounded-lg hover:from-primary-700 hover:to-secondary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            {isCreating ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                Creating...
              </>
            ) : (
              <>
                <Save className="w-4 h-4 mr-2" />
                Create Room
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateChatRoom;