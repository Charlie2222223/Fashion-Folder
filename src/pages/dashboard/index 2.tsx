import React, { useState } from 'react';
import Sidebar from '../components/Closet/Sidebar';
import Header from '../components/Closet/Header';

const Index: React.FC = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      <Header onToggleSidebar={() => setSidebarOpen(!isSidebarOpen)} />
      <main>
        <Sidebar isOpen={isSidebarOpen} onClose={() => setSidebarOpen(false)} />
      </main>
    </>
  );
};

export default Index;