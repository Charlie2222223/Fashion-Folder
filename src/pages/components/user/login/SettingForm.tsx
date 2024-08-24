import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { FaGear } from "react-icons/fa6";
import { BiCloset } from "react-icons/bi";
import { CiLogout } from "react-icons/ci";


const SettingForm: React.FC<{onClose: () => void, userData: any}> = ({onClose, userData}) => {
    
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
                    <p>プロフィールを設定する</p>
                    <FaGear className="ml-auto text-lg" />
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

export default SettingForm;