import React, { useState } from 'react';
import User_Info from '../user_auth/User_Info';

interface HeaderProps {
  onToggleSidebar: () => void;
}

const Header: React.FC<HeaderProps> = ({ onToggleSidebar }) => {
  const [isUserInfoVisible, setIsUserInfoVisible] = useState(false);
  const [selectedUserData, setSelectedUserData] = useState<any>(null); // 必要に応じて型を定義

  const handleUserClick = () => {
    setIsUserInfoVisible(true);
  };

  const handleSettingClick = (userData: any) => {
    // 設定ボタンがクリックされたときの処理をここに追加
    console.log('設定クリック:', userData);
    // 例えば、設定モーダルを開くなど
  };

  const handleClose = () => {
    setIsUserInfoVisible(false);
  };

  return (
    <>
      <header className="flex items-center justify-between px-6 py-4 bg-white border-b-4 border-indigo-500 dark:bg-gray-800 dark:border-white">
        <div className="flex items-center">
          <button
            onClick={onToggleSidebar}
            className="text-gray-500 focus:outline-none lg:hidden dark:text-gray-300"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4 6H20M4 12H20M4 18H11"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
              />
            </svg>
          </button>
          {/* タイトル */}
          <div className="ml-4 lg:ml-0">
            <h1 className="text-2xl font-bold text-indigo-600 dark:text-white">Fashion Folder</h1>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          {/* Notification Icon */}
          <button className="relative text-gray-500 focus:outline-none dark:text-gray-300">
            <svg
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M15 17H20L18.595 15.595C18.214 15.214 18 14.697 18 14.158V11C18 8.388 16.33 6.165 14 5.341V5C14 3.895 13.105 3 12 3C10.895 3 10 3.895 10 5V5.341C7.67 6.165 6 8.388 6 11V14.158C6 14.697 5.786 15.214 5.405 15.595L4 17H9M15 17V18C15 19.657 13.657 21 12 21C10.343 21 9 19.657 9 18V17M15 17H9"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
              />
            </svg>
            <span className="absolute top-0 right-0 inline-block w-2 h-2 bg-red-600 rounded-full"></span>
          </button>

          {/* User Icon */}
          <div className="relative">
            <button
              className="relative block w-8 h-8 overflow-hidden rounded-full shadow focus:outline-none"
              onClick={handleUserClick}
            >
              <img
                className="object-cover w-full h-full"
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=334&q=80"
                alt="User avatar"
              />
            </button>
          </div>
        </div>
      </header>

      {/* User_Info コンポーネントの表示 */}
      {isUserInfoVisible && (
        <User_Info
          onUserClick={handleUserClick}
          onSettingClick={handleSettingClick}
          onClose={handleClose}
        />
      )}
    </>
  );
};

export default Header;