import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import toast from 'react-hot-toast';

interface User {
  id: string;
  email: string;
  username: string;
  role: 'user' | 'admin' | 'moderator';
  avatar?: string;
  preferences?: {
    theme: 'light' | 'dark';
    notifications: boolean;
  };
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, username: string, password: string) => Promise<void>;
  logout: () => void;
  updateProfile: (data: Partial<User>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Configure axios defaults
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
  }, []);

  // Check for existing session on mount
  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const token = localStorage.getItem('token');
        if (token) {
          let decoded: any;
          
          // Check if it's a mock token
          if (token.startsWith('mock-jwt-token-')) {
            // Create a mock decoded object for mock tokens
            decoded = {
              sub: '1',
              email: 'user@example.com',
              username: 'Demo User',
              role: 'user',
              exp: Math.floor(Date.now() / 1000) + (24 * 60 * 60) // 24 hours from now
            };
          } else {
            // Decode real JWT token
            decoded = jwtDecode(token);
          }
          
          // Check if token is expired
          if (decoded.exp * 1000 < Date.now()) {
            localStorage.removeItem('token');
            delete axios.defaults.headers.common['Authorization'];
            setIsLoading(false);
            return;
          }

          // For now, create a mock user from token
          // In production, you'd validate with the server
          const mockUser: User = {
            id: decoded.sub || '1',
            email: decoded.email || 'user@example.com',
            username: decoded.username || 'Demo User',
            role: decoded.role || 'user',
            avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
            preferences: {
              theme: 'light',
              notifications: true,
            },
          };
          
          setUser(mockUser);
        }
      } catch (error) {
        console.error('Auth check failed:', error);
        localStorage.removeItem('token');
        delete axios.defaults.headers.common['Authorization'];
      } finally {
        setIsLoading(false);
      }
    };

    checkAuthStatus();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      
      // Mock login - in production, this would be an API call
      const mockResponse = {
        data: {
          token: 'mock-jwt-token-' + Date.now(),
          user: {
            id: '1',
            email,
            username: email.split('@')[0],
            role: 'user' as const,
            avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
            preferences: {
              theme: 'light' as const,
              notifications: true,
            },
          },
        },
      };

      localStorage.setItem('token', mockResponse.data.token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${mockResponse.data.token}`;
      setUser(mockResponse.data.user);
      
      toast.success('Welcome to ChatVerse!');
    } catch (error: any) {
      toast.error(error?.response?.data?.message || 'Login failed');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (email: string, username: string, password: string) => {
    try {
      setIsLoading(true);
      
      // Mock registration - in production, this would be an API call
      const mockResponse = {
        data: {
          token: 'mock-jwt-token-' + Date.now(),
          user: {
            id: Date.now().toString(),
            email,
            username,
            role: 'user' as const,
            avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
            preferences: {
              theme: 'light' as const,
              notifications: true,
            },
          },
        },
      };

      localStorage.setItem('token', mockResponse.data.token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${mockResponse.data.token}`;
      setUser(mockResponse.data.user);
      
      toast.success('Account created successfully!');
    } catch (error: any) {
      toast.error(error?.response?.data?.message || 'Registration failed');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    delete axios.defaults.headers.common['Authorization'];
    setUser(null);
    toast.success('Logged out successfully');
  };

  const updateProfile = async (data: Partial<User>) => {
    try {
      // Mock update - in production, this would be an API call
      if (user) {
        const updatedUser = { ...user, ...data };
        setUser(updatedUser);
        toast.success('Profile updated successfully');
      }
    } catch (error: any) {
      toast.error('Failed to update profile');
      throw error;
    }
  };

  const value = {
    user,
    isLoading,
    login,
    register,
    logout,
    updateProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};