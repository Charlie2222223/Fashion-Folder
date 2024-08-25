import router, { useRouter } from 'next/router';
import React, { useState } from 'react';
import { FaGear, FaPlus } from "react-icons/fa6";
import { BiCloset } from "react-icons/bi";

const SettingForm: React.FC<{onClose: () => void, userData: any}> = ({onClose, userData}) => {
    const [selectedFile, setSelectedFile] = useState<File | null>(null); // ファイル選択の状態を管理するためのステート
    const [name, setName] = useState(userData.name); // ユーザーの名前を管理するためのステート
    const [email, setEmail] = useState(userData.email);
    const [isSaving, setIsSaving] = useState(false); // 保存中の状態を管理するためのステート

    const handleClickPassword = async () => {

        const formData = new FormData();
        formData.append('email', email);

        try{

            const response = await fetch('http://127.0.0.1:8000/api/change/password', {
                method: 'post',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('authToken')}`, // 認証トークンをヘッダーに追加
                },
                body: formData,
            })

            router.push({
                pathname: '/components/user/login/setting/password/PasswordChange',
                query: {
                    email: email
                }
              });
            
        }catch(error){
            console.log('not found');
        }
        
    }

    // ファイルが選択されたときに呼び出されるハンドラー
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            setSelectedFile(event.target.files[0]); // 選択されたファイルをステートにセット
        }
    };

    // ファイルと名前を同時にアップロード・更新する関数
    const handleSave = async () => {
        setIsSaving(true); // 保存中の状態にする

        const formData = new FormData();
        formData.append('name', name); // 名前をフォームデータに追加

        if (selectedFile) {
            formData.append('avatar', selectedFile); // ファイルが選択されていればフォームデータに追加
        }

        try {
            const response = await fetch('http://127.0.0.1:8000/api/upload/profile', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('authToken')}`, // 認証トークンをヘッダーに追加
                },
                body: formData,
            });

            if (response.ok) {
                const data = await response.json();
                console.log('Profile updated successfully:', data);

                // 更新された名前とアバターを保存
                userData.name = data.name;
                userData.avatar = data.avatar;

                router.reload(); // 現在のページをリロードする
            } else {
                console.error('Profile update failed', response.status, response.statusText);
            }
        } catch (error) {
            console.error('Error updating profile:', error);
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
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3 py-2 mb-4 text-base font-bold text-center text-gray-800 border border-gray-300 rounded-md md:text-lg dark:bg-neutral-900 dark:text-white dark:border-neutral-700"
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
                    onChange={handleFileChange}  // ファイル選択後、ステートに保存
                />
                <p className="mb-3 text-xs text-center text-gray-600 md:text-sm dark:text-neutral-400">
                    {email}
                </p>
                {/* Passwordを変更リンクを中央に配置 */}
                <div className="text-center">
                    <a className="text-xs text-blue-600 decoration-2 hover:underline dark:text-blue-500 md:text-sm"
                        onClick={handleClickPassword}>
                        Passwordを変更はこちら
                    </a>
                </div>
                {/* 保存ボタン */}
                <div className="flex justify-center mt-10 space-x-5">
                    <button
                        className={`px-5 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 ${isSaving ? 'opacity-50 cursor-not-allowed' : ''}`}
                        onClick={handleSave}
                        disabled={isSaving} // 保存中はボタンを無効化
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