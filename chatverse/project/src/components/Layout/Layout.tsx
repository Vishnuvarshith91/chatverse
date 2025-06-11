import React, { ReactNode, useState } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import AIFloatingButton from '../AI/AIFloatingButton';
import AIAssistant from '../AI/AIAssistant';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isAIOpen, setIsAIOpen] = useState(false);

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-dark-900">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto bg-gray-50 dark:bg-dark-900 p-6">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
      
      {/* AI Assistant */}
      {!isAIOpen && (
        <AIFloatingButton 
          onClick={() => setIsAIOpen(true)}
          hasNotification={false}
        />
      )}
      
      {isAIOpen && (
        <AIAssistant 
          isOpen={isAIOpen}
          onToggle={() => setIsAIOpen(false)}
        />
      )}
    </div>
  );
};

export default Layout;