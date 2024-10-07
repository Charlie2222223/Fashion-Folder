import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { FaGear } from "react-icons/fa6";
import { BiCloset } from "react-icons/bi";
import { CiLogout } from "react-icons/ci";

interface User_InfoProps {
  onUserClick: () => void;
  onSettingClick: (userData: any) => void;
  onClose: () => void;
}

const User_Info: React.FC<User_InfoProps> = ({ onUserClick, onSettingClick, onClose }) => {
  const router = useRouter();
  const [userData, setUserData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true); // ローディング状態を初期化

  const handleClick = () => {
    router.push('/auth/SignIn');
  };

  const handleCloset = async () => {
    setIsLoading(true); // ローディングを開始
    try {
      await router.push("/dashboard");
    } finally {
      setIsLoading(false); // ローディングを終了
    }
  };

  const handleLogout = async () => {
    const token = localStorage.getItem('authToken');
    if (token) {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/logout`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

        if (response.ok) {
          localStorage.removeItem('authToken');
          localStorage.removeItem('userData');
          window.location.href = '/';
        } else {
          console.error('Failed to log out');
        }
      } catch (error) {
        console.error('Error logging out:', error);
      }
    }
  };

  useEffect(() => {
    const fetchUserData = async () => {
      const authToken = localStorage.getItem('authToken');
      if (authToken) {
        try {
          const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/user`, {
            headers: {
              'Authorization': `Bearer ${authToken}`
            }
          });

          if (response.ok) {
            const userData = await response.json();
            setUserData(userData);
          } else {
            console.error('Failed to fetch user data');
          }
        } catch (error) {
          console.error('Error occurred:', error);
        }
      }
      setIsLoading(false); // ローディング完了
    };

    fetchUserData();
  }, []);

  if (isLoading) {
    // ローディング中のスピナー表示
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
        <div className="flex justify-center">
          <div className="w-10 h-10 border-t-4 border-blue-500 border-solid rounded-full animate-spin"></div>
        </div>
      </div>
    );
  }

  if (!userData) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
        <div className="relative w-56 max-w-md p-8 bg-white border border-gray-200 shadow-sm rounded-xl dark:bg-neutral-900 dark:border-neutral-700">
          <h1 className="mb-4 text-xl font-bold text-center text-gray-800 dark:text-white">
            ユーザー
          </h1>
          <div className="flex justify-center mb-6">
            <img
              src="/img/Wear_1.jpg"
              alt="ユーザーアイコン"
              className="object-cover w-20 h-20 rounded-full"
            />
          </div>
          <p className="mb-3 text-sm text-center text-gray-600 dark:text-neutral-400">
            ログインできていません
          </p>
          <div className="flex justify-center mt-10 space-x-5">
            <button
              className="px-5 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600"
              onClick={() => { onUserClick(); }}
            >
              Login
            </button>
            <button
              className="px-5 py-2 text-white bg-green-500 rounded-md hover:bg-green-600"
              onClick={handleClick}
            >
              Signup
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative w-64 max-w-md p-8 bg-white border border-gray-200 shadow-sm rounded-xl dark:bg-neutral-900 dark:border-neutral-700">
        <h1 className="mb-4 text-lg font-bold text-center text-gray-800 md:text-xl dark:text-white">
          {userData.name}
        </h1>
        <div className="flex justify-center mb-6">
          <img
            src={userData.avatar || 'img/Icon2.png'}
            alt="ユーザーアイコン"
            className="object-cover w-20 h-20 rounded-full"
          />
        </div>
        <p className="text-xs text-center text-gray-600 md:text-sm dark:text-neutral-400 mb-7">
          {userData.email}
        </p>
        <div
          className="flex items-center justify-between p-2 mb-3 text-xs text-left text-blue-600 rounded cursor-pointer md:text-sm hover:bg-blue-100"
          onClick={handleCloset}
        >
          <p>MyClosetへ進む</p>
          <BiCloset className="ml-auto text-lg" />
        </div>
        <div
          className="flex items-center justify-between p-2 mb-3 text-xs text-left text-purple-600 rounded cursor-pointer md:text-sm hover:bg-purple-100"
          onClick={() => { onSettingClick(userData); }}
        >
          <p>プロフィールを設定する</p>
          <FaGear className="ml-auto text-lg" />
        </div>
        <div
          className="flex items-center justify-between p-2 mb-3 text-xs text-left text-red-600 rounded cursor-pointer md:text-sm hover:bg-red-100"
          onClick={handleLogout}
        >
          <p>ログアウト</p>
          <CiLogout className="ml-auto text-lg" />
        </div>
        <div className="flex justify-center mt-10 space-x-5">
          <button
            className="px-5 py-2 text-white bg-gray-500 rounded-md hover:bg-gray-600"
            onClick={onClose}
          >
            閉じる
          </button>
        </div>
      </div>
    </div>
  );
};

export default User_Info;