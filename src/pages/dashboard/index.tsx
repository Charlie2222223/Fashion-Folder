// src/pages/Index.tsx

import React, { useState } from 'react';
import Sidebar from '../components/Closet/Sidebar';
import Header from '../components/Closet/Header';
import ClothingRegistration from '../components/Closet/ClothingRegistration';
import ClothesList from '../components/Closet/ClothesList';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const Index: React.FC = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  return (
    <Router>
      <Header onToggleSidebar={() => setSidebarOpen(!isSidebarOpen)} />
      <main className="flex h-screen bg-gray-100 dark:bg-gray-900">
        {/* サイドバー */}
        <Sidebar isOpen={isSidebarOpen} onClose={() => setSidebarOpen(false)} />

        {/* メインコンテンツ */}
        <div className="z-10 flex-1 p-6 overflow-y-auto bg-white dark:bg-gray-600 dark:text-gray-200">
          <Routes>
            <Route path="/register-clothes" element={<ClothingRegistration />} />
            <Route path="/view-closet" element={<ClothesList />} />
            {/* 他のルートを追加できます */}
            <Route path="/" element={<ClothingRegistration />} />
          </Routes>
        </div>
      </main>
    </Router>
  );
};

export default Index;