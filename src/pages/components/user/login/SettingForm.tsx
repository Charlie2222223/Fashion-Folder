import router, { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { FaGear, FaPlus } from "react-icons/fa6";
import { BiCloset } from "react-icons/bi";

const SettingForm: React.FC<{onClose: () => void, userData: any}> = ({onClose, userData}) => {
    const [selectedFile, setSelectedFile] = useState<File | null>(null); // ファイル選択の状態を管理するためのステート
    const [name, setName] = useState(userData.name); // ユーザーの名前を管理するためのステート
    const [isSaving, setIsSaving] = useState(false); // 保存ボタンの状態を管理するためのステート

    // ファイルが選択されたときに呼び出されるハンドラー
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            setSelectedFile(event.target.files[0]); // 選択されたファイルをステートにセット
            handleFileUpload(event.target.files[0]);  // ファイルが選択されたらすぐにアップロード
        }
    };

    // ファイルをアップロードする関数
    const handleFileUpload = async (file: File) => {
        if (!file) return;

        console.log('Uploading file:', file);

        const formData = new FormData();
        formData.append('avatar', file); // フォームデータにファイルを追加

        try {
            const response = await fetch('http://127.0.0.1:8000/api/upload/avatar', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('authToken')}`, // 認証トークンをヘッダーに追加
                },
                body: formData,
            });

            if (response.ok) {
                const data = await response.json();
                console.log('Upload successful:', data);
                userData.avatar = data.avatar; // アップロードされた画像のパスを更新
                router.reload(); // 現在のページをリロードする
            } else {
                console.error('Upload failed', response.status, response.statusText);
            }
        } catch (error) {
            console.error('Error uploading file:', error);
        }
    };

    // 名前が変更されたときに呼び出されるハンドラー
    const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value); // 入力された名前をステートにセット
    };

    // 名前を保存するための関数
    const handleNameSave = async () => {
        setIsSaving(true); // 保存中の状態にする

        const formData = new FormData();
        formData.append('name', name);

        try {
            const response = await fetch('http://127.0.0.1:8000/api/upload/name', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('authToken')}`, // 認証トークンをヘッダーに追加
                },
                body: formData,
            });

            if (response.ok) {
                const data = await response.json();
                console.log('Name updated successfully:', data);
                userData.name = data.name; // 更新された名前を保存
                router.reload(); // 現在のページをリロードする
            } else {
                console.error('Name update failed', response.status, response.statusText);
            }
        } catch (error) {
            console.error('Error updating name:', error);
        } finally {
            setIsSaving(false); // 保存処理が終了したら元に戻す
        }
    };

    return (
        <div className="fixed inset-x-0 top-0 z-50 flex items-start justify-end bg-opacity-50">
            <div className="relative w-64 max-w-md p-8 mx-4 bg-white border border-gray-200 shadow-sm rounded-xl dark:bg-neutral-900 dark:border-neutral-700 sm:mx-8 md:mx-16 lg:mx-24 xl:mx-32">
                {/* ユーザー名を入力するテキストボックス */}
                <input
                    type="text"
                    value={name}
                    onChange={handleNameChange}
                    className="w-full px-3 py-2 mb-4 text-base font-bold text-center text-gray-800 border-2 border-gray-300 rounded-md md:text-lg dark:bg-neutral-900 dark:text-white dark:border-neutral-700"
                />
                <div className="flex justify-center">
                    {/* アバター画像 */}
                    <img
                        src={`http://localhost:8000/${userData.avatar}` || '/default-avatar.png'}
                        alt="ユーザーアイコン"
                        className="object-cover w-20 h-20 rounded-full"
                        style={{ cursor: 'pointer' }}
                    />
                </div>
                {/* プラスアイコンの追加 */}
                <FaPlus className='mb-4 ml-32 text-2xl'
                        onClick={() => document.getElementById('fileInput')?.click()}  // 画像クリックでファイル選択をトリガー
                />
                <input
                        type="file"
                        id="fileInput"
                        style={{ display: 'none' }}
                        onChange={handleFileChange}  // ファイル選択後、即アップロード
                />
                <p className="text-xs text-center text-gray-600 md:text-sm dark:text-neutral-400 mb-7">
                    {userData.email}
                </p>
                {/* 名前を保存するボタン */}
                <div className="flex justify-center mt-4 space-x-5">
                    <button
                        className="px-5 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600"
                        onClick={handleNameSave}
                        disabled={isSaving}  // 保存中はボタンを無効化
                    >
                        {isSaving ? '保存中...' : '保存する'}
                    </button>
                </div>
                {/* 閉じるボタン */}
                <div className="flex justify-center mt-4 space-x-5">
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

export default SettingForm;