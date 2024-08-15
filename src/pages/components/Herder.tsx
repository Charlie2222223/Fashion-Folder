// Reactと必要なアイコンをreact-iconsライブラリからインポート
import React from 'react';
import { FaUserAlt,FaHome,FaCamera } from 'react-icons/fa';

// ヘッダーコンポーネントの定義。React.FCはFunction Componentを表す型
const Header: React.FC = () => {
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
        <a href="#profile" className="flex items-center ml-4 text-white hover:text-gray-400">
          <FaUserAlt size={20} /> 
          <span className="ml-2">ユーザー</span>
        </a>
        
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
    </header>
  );
};

export default Header;