import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import io, { Socket } from 'socket.io-client';
import { useAuth } from './AuthContext';

interface SocketContextType {
  socket: Socket | null;
  isConnected: boolean;
  onlineUsers: string[];
  joinRoom: (roomId: string) => void;
  leaveRoom: (roomId: string) => void;
}

const SocketContext = createContext<SocketContextType | undefined>(undefined);

export const useSocket = () => {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error('useSocket must be used within a SocketProvider');
  }
  return context;
};

interface SocketProviderProps {
  children: ReactNode;
}

export const SocketProvider: React.FC<SocketProviderProps> = ({ children }) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [onlineUsers, setOnlineUsers] = useState<string[]>([]);
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      // Mock socket connection - in production, connect to your WebSocket server
      const mockSocket = {
        connected: true,
        emit: (event: string, data?: any) => {
          console.log(`Socket emit: ${event}`, data);
        },
        on: (event: string, callback: Function) => {
          console.log(`Socket listener added: ${event}`);
          
          // Mock some initial data
          if (event === 'connect') {
            setTimeout(() => callback(), 100);
          } else if (event === 'onlineUsers') {
            setTimeout(() => callback(['user1', 'user2', 'user3']), 200);
          }
        },
        off: (event: string, callback?: Function) => {
          console.log(`Socket listener removed: ${event}`);
        },
        disconnect: () => {
          console.log('Socket disconnected');
        },
      } as any;

      setSocket(mockSocket);
      setIsConnected(true);
      
      // Mock online users
      setTimeout(() => {
        setOnlineUsers(['user1', 'user2', 'user3', user.id]);
      }, 300);

      return () => {
        mockSocket.disconnect();
        setSocket(null);
        setIsConnected(false);
        setOnlineUsers([]);
      };
    }
  }, [user]);

  const joinRoom = (roomId: string) => {
    if (socket && isConnected) {
      socket.emit('joinRoom', { roomId, userId: user?.id });
    }
  };

  const leaveRoom = (roomId: string) => {
    if (socket && isConnected) {
      socket.emit('leaveRoom', { roomId, userId: user?.id });
    }
  };

  return (
    <SocketContext.Provider
      value={{
        socket,
        isConnected,
        onlineUsers,
        joinRoom,
        leaveRoom,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};