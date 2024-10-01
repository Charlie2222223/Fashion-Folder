import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { FaPlus } from "react-icons/fa6";
import axios from 'axios';

const SettingForm: React.FC<{ onClose: () => void, userData: any }> = ({ onClose, userData }) => {
    const router = useRouter();
    const [selectedFile, setSelectedFile] = useState<File | null>(null); // ファイル選択の状態を管理
    const [name, setName] = useState(userData?.name || ''); // ユーザーの名前を管理
    const [email, setEmail] = useState(userData?.email || '');
    const [isSaving, setIsSaving] = useState(false); // 保存中の状態を管理
    const [isLoading, setIsLoading] = useState(false); // パスワード変更リクエスト送信中

    const handleClickPassword = async () => {
        setIsLoading(true);

        const formData = new FormData();
        formData.append('email', email);

        try {
            const token = localStorage.getItem('authToken');
            if (!token) {
                throw new Error('Authentication token is missing');
            }

            const response = await axios.post('http://localhost:8000/api/register/password', formData, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });

            console.log('Registration successful:', response.data);

            router.push({
                pathname: '/user/PasswordChange',
                query: {
                    email: email,
                },
            });
        } catch (error: any) { // ここで error を any にキャスト
            console.error('Error:', error.response ? error.response.data : error.message);
        } finally {
            setIsLoading(false);
        }
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            setSelectedFile(event.target.files[0]);
        }
    };

    const handleSave = async () => {
        setIsSaving(true);

        const formData = new FormData();
        formData.append('name', name);

        if (selectedFile) {
            formData.append('avatar', selectedFile);
        }

        try {
            const response = await fetch('http://127.0.0.1:8000/api/upload/profile', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
                },
                body: formData,
            });

            if (response.ok) {
                const data = await response.json();
                console.log('Profile updated successfully:', data);

                userData.name = data.name;
                userData.avatar = data.avatar;

                router.reload(); // 現在のページをリロードする
            } else {
                console.error('Profile update failed:', response.status, response.statusText);
            }
        } catch (error) {
            console.error('Error updating profile:', error);
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <div className="fixed inset-x-0 top-0 z-50 flex items-start justify-end bg-opacity-50 dark:bg-neutral-800">
            <div className="relative w-64 max-w-md p-8 mx-4 bg-white border border-gray-200 shadow-sm rounded-xl dark:bg-neutral-900 dark:border-neutral-700 sm:mx-8 md:mx-16 lg:mx-24 xl:mx-32">
                {/* ユーザー名入力 */}
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3 py-2 mb-4 text-base font-bold text-center text-gray-800 border border-gray-300 rounded-md md:text-lg dark:bg-neutral-900 dark:text-white dark:border-neutral-700"
                />
                <div className="flex justify-center">
                    {/* アバター画像 */}
                    <img
                        src={userData?.avatar ? `http://localhost:8000/${userData.avatar}` : '/default-avatar.png'}
                        alt="ユーザーアイコン"
                        className="object-cover w-20 h-20 rounded-full dark:bg-neutral-700"
                        style={{ cursor: 'pointer' }}
                    />
                </div>
                {/* ファイル選択 */}
                <FaPlus
                    className="mb-4 ml-32 text-2xl text-gray-700 dark:text-white"
                    onClick={() => document.getElementById('fileInput')?.click()}
                />
                <input
                    type="file"
                    id="fileInput"
                    style={{ display: 'none' }}
                    onChange={handleFileChange}
                />
                <p className="mb-3 text-xs text-center text-gray-600 md:text-sm dark:text-neutral-400">
                    {email}
                </p>
                {/* パスワード変更リンク */}
                <div className="text-center">
                    <a
                        className={`text-xs text-blue-600 decoration-2 hover:underline dark:text-blue-500 md:text-sm ${isLoading ? 'cursor-not-allowed opacity-50' : ''}`}
                        onClick={!isLoading ? handleClickPassword : undefined}
                    >
                        {isLoading ? '送信中...' : 'Passwordを変更はこちら'}
                    </a>
                </div>
                {/* 保存ボタン */}
                <div className="flex justify-center mt-10 space-x-5">
                    <button
                        className={`px-5 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 ${isSaving ? 'opacity-50 cursor-not-allowed' : ''}`}
                        onClick={handleSave}
                        disabled={isSaving}
                    >
                        保存
                    </button>
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

export default SettingForm;