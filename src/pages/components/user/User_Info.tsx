import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

const User_Info: React.FC<{ onUserClick: () => void }> = ({ onUserClick }) => {
    const router = useRouter();
    const [userData, setUserData] = useState<any>(null);

    const handleClick = () => {
        // サインインページに遷移する
        router.push('/SignIn');
    };

    useEffect(() => {
        const fetchUserData = async () => {
            const authToken = localStorage.getItem('token');
            
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
            <div className="fixed inset-x-0 top-0 flex items-start justify-end bg-opacity-50 z-50">
                <div className="bg-white border border-gray-200 rounded-xl shadow-sm dark:bg-neutral-900 dark:border-neutral-700 p-8 relative w-56 max-w-md mx-4 sm:mx-8 md:mx-16 lg:mx-24 xl:mx-32">
                    <h1 className="text-xl font-bold text-gray-800 dark:text-white text-center mb-4">
                        ユーザー
                    </h1>
                    <div className="flex justify-center mb-6">
                        <img
                            src="/img/Wear_1.jpg"
                            alt="ユーザーアイコン"
                            className="w-20 h-20 rounded-full object-cover"
                        />
                    </div>
                    <p className="text-sm text-gray-600 dark:text-neutral-400 text-center mb-3">
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
        <div className="fixed inset-x-0 top-0 flex items-start justify-end bg-opacity-50 z-50">
            <div className="bg-white border border-gray-200 rounded-xl shadow-sm dark:bg-neutral-900 dark:border-neutral-700 p-8 relative w-64 max-w-md mx-4 sm:mx-8 md:mx-16 lg:mx-24 xl:mx-32">
                <h1 className="text-lg md:text-xl font-bold text-gray-800 dark:text-white text-center mb-4">
                    {userData.name}
                </h1>
                <div className="flex justify-center mb-6">
                    <img
                        src={userData.avatar}
                        alt="ユーザーアイコン"
                        className="w-20 h-20 rounded-full object-cover"
                    />
                </div>
                <p className="text-xs md:text-sm text-gray-600 dark:text-neutral-400 text-center mb-3">
                    {userData.email}
                </p>
                <div className="flex justify-center mt-10 space-x-5">
                    <button
                        className="px-5 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600"
                        onClick={() => { onUserClick(); }}
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};

export default User_Info;
