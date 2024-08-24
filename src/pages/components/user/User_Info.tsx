import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { FaGear } from "react-icons/fa6";
import { BiCloset } from "react-icons/bi";
import { CiLogout } from "react-icons/ci";


const User_Info: React.FC<{ onUserClick: () => void ,onSettingClick: (userData: any) => void ,onClose: () => void}> = ({ onUserClick ,onSettingClick ,onClose}) => {
    const router = useRouter();
    const [userData, setUserData] = useState<any>(null);

    const handleClick = () => {
        // サインインページに遷移する
        router.push('/SignIn');
    };

    const handleLogout = async () => {
        const token = localStorage.getItem('authToken');
    
        if (token) {
            try {
                const response = await fetch('http://127.0.0.1:8000/api/logout', {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                });
    
                if (response.ok) {
                    localStorage.removeItem('authToken'); // ローカルストレージからトークンを削除
                    localStorage.removeItem('userData'); // ローカルストレージからユーザーデータを削除
                    window.location.href = '/';  // ログインページにリダイレクト
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
                    const response = await fetch('http://127.0.0.1:8000/api/user', {
                        headers: {
                            'Authorization': `Bearer ${authToken}`
                        }
                    });
    
                    if (response.ok) {
                        const userData = await response.json();
                        console.log('User Data:', userData);  // ここでレスポンスを確認
                        setUserData(userData); // 取得したユーザーデータを状態にセット
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

    if (!userData) {
        return (
            <div className="fixed inset-x-0 top-0 z-50 flex items-start justify-end bg-opacity-50">
                <div className="relative w-56 max-w-md p-8 mx-4 bg-white border border-gray-200 shadow-sm rounded-xl dark:bg-neutral-900 dark:border-neutral-700 sm:mx-8 md:mx-16 lg:mx-24 xl:mx-32">
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
                            className="px-5 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600"
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
        <div className="fixed inset-x-0 top-0 z-50 flex items-start justify-end bg-opacity-50">
            <div className="relative w-64 max-w-md p-8 mx-4 bg-white border border-gray-200 shadow-sm rounded-xl dark:bg-neutral-900 dark:border-neutral-700 sm:mx-8 md:mx-16 lg:mx-24 xl:mx-32">
                <h1 className="mb-4 text-lg font-bold text-center text-gray-800 md:text-xl dark:text-white">
                    {userData.name}
                </h1>
                <div className="flex justify-center mb-6">
                    <img
                        src={userData.avatar || '/default-avatar.png'}
                        alt="ユーザーアイコン"
                        className="object-cover w-20 h-20 rounded-full"
                    />
                </div>
                <p className="text-xs text-center text-gray-600 md:text-sm dark:text-neutral-400 mb-7">
                    {userData.email}
                </p>
                <div className="flex items-center justify-between mb-3 text-xs text-left text-white md:text-sm hover:bg-blue-600">
                    <p>MyClosetへ進む</p>
                    <BiCloset className="ml-auto text-lg" />
                </div>
                <div className="flex items-center justify-between mb-3 text-xs text-left text-white md:text-sm hover:bg-blue-600">
                    <p onClick={() => { onSettingClick(userData); }}>
                        プロフィールを設定する</p>
                    <FaGear className="ml-auto text-lg" />
                </div>
                <div className="flex items-center justify-between mb-3 text-xs text-left text-white md:text-sm hover:bg-blue-600"
                    onClick={handleLogout}>
                    <p>ログアウト</p>
                    <CiLogout className="ml-auto text-lg" />
                </div>

                <div className="flex justify-center mt-10 space-x-5">
                    <button
                        className="px-5 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600"
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