// components/Layout.tsx

import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      <Header onToggleSidebar={() => setSidebarOpen(!isSidebarOpen)} />
      <main className="flex h-screen bg-gray-100 dark:bg-gray-900">
        <Sidebar isOpen={isSidebarOpen} onClose={() => setSidebarOpen(false)} />
        <div className="z-10 flex-1 p-6 overflow-y-auto bg-white dark:bg-gray-600 dark:text-gray-200">
          {children}
        </div>
      </main>
    </>
  );
};

export default Layout;