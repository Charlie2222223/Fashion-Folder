import React from 'react';
import axios from 'axios'; // axiosライブラリを使用
import { FcGoogle } from 'react-icons/fc';

const SigninForm: React.FC = () => {
  
  const handleGoogleLogin = () => {
    window.location.href = 'http://localhost:8000/auth/google';
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const formData = {
      name: event.target.name.value,
      email: event.target.email.value,
      password: event.target.password.value,
      password_confirmation: event.target.password_check.value,
      remember: event.target['remember-me'].checked,
    };

    try {
      const response = await axios.post('http://localhost:8000/api/register', formData);
      console.log('Registration successful:', response.data);
      // メール送信成功メッセージなどの処理をここに追加できます
    } catch (error) {
      console.error('Registration failed:', error.response.data);
      // エラーメッセージなどの処理をここに追加できます
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm dark:bg-neutral-900 dark:border-neutral-700 h-128 p-20 relative w-full max-w-3xl mx-4 sm:mx-8 md:mx-16 lg:mx-24 xl:mx-32">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white text-center mb-8">
          アカウント作成
        </h1>
        <div className="grid gap-y-7">
          <button
            onClick={handleGoogleLogin}
            className="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 focus:outline-none focus:bg-gray-50 dark:bg-neutral-900 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-800 dark:focus:bg-neutral-800"
          >
            <FcGoogle className="mr-2 text-2xl" />
            Googleでアカウントを作成
          </button>
          <div className="py-3 flex items-center text-xs text-gray-400 uppercase before:flex-1 before:border-t before:border-gray-200 before:me-6 after:flex-1 after:border-t after:border-gray-200 after:ms-6 dark:text-neutral-500 dark:before:border-neutral-600 dark:after:border-neutral-600">
            または
          </div>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-y-7">
              <div>
                <label className="block text-sm mb-2 dark:text-white" htmlFor="name">
                  アカウント名
                </label>
                <input
                  className="py-3 px-4 block w-full border border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-neutral-900 dark:border-neutral-700 dark:text-white dark:placeholder-neutral-500 dark:focus:bg-neutral-800 dark:focus:ring-neutral-600 shadow-sm"
                  id="name"
                  name="name"
                  required
                  type="text"
                />
              </div>
              <div>
                <label className="block text-sm mb-2 dark:text-white" htmlFor="email">
                  メールアドレス
                </label>
                <input
                  className="py-3 px-4 block w-full border border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-neutral-900 dark:border-neutral-700 dark:text-white dark:placeholder-neutral-500 dark:focus:bg-neutral-800 dark:focus:ring-neutral-600 shadow-sm"
                  id="email"
                  name="email"
                  required
                  type="email"
                />
              </div>
              <div>
                <div className="flex justify-between items-center">
                  <label className="block text-sm mb-2 dark:text-white" htmlFor="password">
                    パスワード
                  </label>
                </div>
                <input
                  className="py-3 px-4 block w-full border border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-neutral-900 dark:border-neutral-700 dark:text-white dark:placeholder-neutral-500 dark:focus:bg-neutral-800 dark:focus:ring-neutral-600 shadow-sm"
                  id="password"
                  name="password"
                  required
                  type="password"
                />
              </div>
              <div>
                <div className="flex justify-between items-center">
                  <label className="block text-sm mb-2 dark:text-white" htmlFor="password_check">
                    パスワード(確認)
                  </label>
                </div>
                <input
                  className="py-3 px-4 block w-full border border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-neutral-900 dark:border-neutral-700 dark:text-white dark:placeholder-neutral-500 dark:focus:bg-neutral-800 dark:focus:ring-neutral-600 shadow-sm"
                  id="password_check"
                  name="password_check"
                  required
                  type="password"
                />
              </div>
              <div className="flex items-center">
                <input className="shrink-0 mt-0.5 border-gray-200 rounded text-blue-600 dark:bg-neutral-800 dark:border-neutral-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800" id="remember-me" name="remember-me" type="checkbox" />
                <label className="ms-3 text-sm dark:text-white" htmlFor="remember-me">
                  ログイン状態を維持する
                </label>
              </div>
              <button className="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:bg-blue-700">
                作成する
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SigninForm;