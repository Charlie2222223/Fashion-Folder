// Reactと必要なアイコンをreact-iconsライブラリからインポート
import React, { useState } from 'react';
import { FaUserAlt, FaHome, FaCamera } from 'react-icons/fa';

// ログインモーダルコンポーネント
const LoginModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-8 rounded shadow-lg w-96">
        <h2 className="text-2xl font-bold mb-4">ログイン</h2>
        <form>
          <div className="mb-4">
            <label className="block text-gray-700">ユーザー名</label>
            <input type="text" className="w-full px-3 py-2 border rounded" />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">パスワード</label>
            <input type="password" className="w-full px-3 py-2 border rounded" />
          </div>
          <button type="submit" className="w-full bg-blue-500 text-white px-3 py-2 rounded">ログイン</button>
        </form>
        <button onClick={onClose} className="mt-4 text-blue-500 hover:underline">閉じる</button>
      </div>
    </div>
  );
};

// ヘッダーコンポーネント
const Header: React.FC = () => {
  const [isModalOpen, setModalOpen] = useState(false);

  return (
    // ヘッダー要素。Tailwind CSSを使用してスタイルを適用
    <header className="flex items-center justify-between p-4 text-white bg-gray-800">
      
      {/* ロゴセクション：アプリ名を表示 */}
      <div className="flex items-center">
        <h1 className="ml-2 text-xl">Fashion Folder</h1> {/* アプリ名の表示 */}
      </div>

      {/* ナビゲーションメニュー */}
      <nav className="flex">
        
        {/* Profileリンク：アイコンとテキストを表示 */}
        <button 
          onClick={() => setModalOpen(true)}
          className="flex items-center ml-4 text-white hover:text-gray-400"
        >
          <FaUserAlt size={20} />
          <span className="ml-2">ユーザー</span>
        </button>
        
        {/* 他の要素は小さいスクリーンで隠す */}
        <div className="hidden lg:flex">
          {/* 他のリンクをここに追加 */}
          <a href="#home" className="flex items-center ml-4 text-white hover:text-gray-400">
            <FaHome size={20} /> 
            <span className="ml-2">Home</span> 
          </a>
          <a href="#cart" className="flex items-center ml-4 text-white hover:text-gray-400">
            <FaCamera size={20} />
            <span className="ml-2">写真</span> 
          </a>
        </div>
        
      </nav>

      {/* ログインモーダルの表示 */}
      <LoginModal isOpen={isModalOpen} onClose={() => setModalOpen(false)} />
    </header>
  );
};

export default Header;