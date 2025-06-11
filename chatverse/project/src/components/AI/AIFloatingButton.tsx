import React from 'react';
import { Bot, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

interface AIFloatingButtonProps {
  onClick: () => void;
  hasNotification?: boolean;
}

const AIFloatingButton: React.FC<AIFloatingButtonProps> = ({ onClick, hasNotification = false }) => {
  return (
    <motion.button
      onClick={onClick}
      className="fixed bottom-4 right-4 z-40 w-14 h-14 bg-gradient-to-br from-primary-500 to-secondary-500 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center group"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 1 }}
    >
      <div className="relative">
        <Bot className="w-6 h-6 group-hover:scale-110 transition-transform" />
        {hasNotification && (
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse" />
        )}
      </div>
      
      {/* Floating sparkles animation */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 0.5 }}
      >
        <Sparkles className="absolute -top-1 -right-1 w-3 h-3 text-yellow-300 animate-pulse" />
        <Sparkles className="absolute -bottom-1 -left-1 w-2 h-2 text-blue-300 animate-pulse" style={{ animationDelay: '0.5s' }} />
      </motion.div>
    </motion.button>
  );
};

export default AIFloatingButton;