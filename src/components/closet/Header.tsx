import React, { useState, useEffect } from 'react';
import User_Info from '../user_auth/User_Info';
import SettingForm from '../user_auth/login/setting/SettingForm';

interface HeaderProps {
  onToggleSidebar: () => void;
}

const Header: React.FC<HeaderProps> = ({ onToggleSidebar }) => {
  const [isUserInfoVisible, setIsUserInfoVisible] = useState(false);
  const [isSettingFormVisible, setIsSettingFormVisible] = useState(false);
  const [userData, setUserData] = useState<any>(null);

  const handleUserClick = () => {
    setIsUserInfoVisible(true);
  };

  const handleSettingClick = (userData: any) => {
    console.log('設定クリック:', userData);
    setIsUserInfoVisible(false); // User_Infoを非表示にする
    setIsSettingFormVisible(true); // SettingFormを表示
  };

  const handleCloseUserInfo = () => {
    setIsUserInfoVisible(false);
  };

  const handleCloseSettingForm = () => {
    setIsSettingFormVisible(false);
  };

  useEffect(() => {
    const fetchUserData = async () => {
      const authToken = localStorage.getItem('authToken');

      if (authToken) {
        try {
          const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/user`, {
            headers: { Authorization: `Bearer ${authToken}` },
          });

          if (response.ok) {
            const userData = await response.json();
            console.log('User Data:', userData);
            setUserData(userData);
          } else {
            console.error('Failed to fetch user data');
          }
        } catch (error) {
          console.error('Error occurred:', error);
        }
      } else {
        console.error('No token found');
      }
    };

    fetchUserData();
  }, []);

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
          <div className="ml-4 lg:ml-0">
            <h1 className="text-2xl font-bold text-indigo-600 dark:text-white">Fashion Folder</h1>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          {/* User Icon */}
          <div className="relative">
            <button
              className="relative block w-16 h-16 overflow-hidden border-black rounded-full shadow border-1 focus:outline-none"
              onClick={handleUserClick}
            >
              <img
                src={userData?.avatar || 'img/Icon2.png'}
                alt="ユーザーアイコン"
                className="object-cover w-20 h-20 rounded-full"
              />
            </button>
          </div>
        </div>
      </header>

      {/* User_Info コンポーネントの表示 */}
      {isUserInfoVisible && (
        <User_Info
          onUserClick={handleUserClick}
          onSettingClick={() => handleSettingClick(userData)} // 設定クリック時にユーザーデータを渡す
          onClose={handleCloseUserInfo}
        />
      )}

      {/* SettingForm コンポーネントの表示 */}
      {isSettingFormVisible && (
        <SettingForm
          onClose={handleCloseSettingForm}
          userData={userData} // ユーザーデータをSettingFormに渡す
        />
      )}
    </>
  );
};

export default Header;