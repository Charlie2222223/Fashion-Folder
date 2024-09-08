import React, { useState } from 'react';
import Sidebar from '../components/Closet/Sidebar';
import Header from '../components/Closet/Header';
import ClothingRegistration from '../components/Closet/ClothingRegistration';

const Index: React.FC = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      <Header onToggleSidebar={() => setSidebarOpen(!isSidebarOpen)} />
      <main className="flex h-screen bg-gray-100 dark:bg-gray-900">
        {/* サイドバー - 幅を固定 */}
        <Sidebar isOpen={isSidebarOpen} onClose={() => setSidebarOpen(false)} />

        {/* 登録フォーム - 残りの画面いっぱいに表示 */}
        <div className="z-10 flex-1 p-6 bg-white dark:bg-gray-600 dark:text-gray-200">
          <ClothingRegistration />
        </div>
      </main>
    </>
  );
};

export default Index;