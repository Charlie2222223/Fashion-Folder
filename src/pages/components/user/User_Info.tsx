import { useRouter } from 'next/router';
import React from 'react'
import { FcGoogle } from 'react-icons/fc'

const User_Info: React.FC <{onUserClick: () => void}> = ({ onUserClick }) =>{

    const router = useRouter();

    const handleClick = () => {
      //ページに遷移する
      router.push('/SignIn');
    };

  return (
    <div className="fixed inset-x-0 top-0  flex items-start justify-end  bg-opacity-50 z-50">
    {/* 背景を半透明にして、中央にコンテンツを配置するためのラッパー */}
    <div className="bg-white border border-gray-200 rounded-xl shadow-sm dark:bg-neutral-900 dark:border-neutral-700 p-8 relative w-56 max-w-md mx-4 sm:mx-8 md:mx-16 lg:mx-24 xl:mx-32">
        {/* カードのコンテナ: 白背景とボーダー、ダークモード対応 */}
        <h1 className="text-xl font-bold text-gray-800 dark:text-white text-center mb-4">
        {/* サインインの見出し: 中央揃え、ダークモード対応 */}
        ユーザー
        </h1>
        <div className="flex justify-center mb-6">
      {/* 丸いアイコンに写真を挿入 */}
        <img
            src="/img/Wear_1.jpg"
            alt="ユーザーアイコン"
            className="w-20 h-20 rounded-full object-cover"
        />
        </div>
        <p className="text-sm text-gray-600 dark:text-neutral-400 text-center mb-3">
          ログインできていません{" "}
        </p>

        <div className="flex justify-center mt-10 space-x-5">
                <button className="px-5 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600" onClick={() =>{onUserClick()}}>
                    Login
                </button>
                <button className="px-5 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600" onClick={handleClick}>
                    Signup
                </button>
            </div>
       
    </div>
    </div>
  )
}

export default User_Info