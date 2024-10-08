import React, { useState } from 'react';
import axios from 'axios';
import { FcGoogle } from 'react-icons/fc';
import router from 'next/router';

const SigninForm: React.FC = () => {
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleGoogleLogin = () => {
    window.location.href = `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/google`;
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
  
    const form = event.target as HTMLFormElement;
  
    const formData = {
      name: (form.elements.namedItem('name') as HTMLInputElement).value,
      email: (form.elements.namedItem('email') as HTMLInputElement).value,
      password: (form.elements.namedItem('password') as HTMLInputElement).value,
      password_confirmation: (form.elements.namedItem('password_check') as HTMLInputElement).value,
      remember: (form.elements.namedItem('remember-me') as HTMLInputElement).checked,
    };
  
    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/register`, formData);
      console.log('Registration successful:', response.data);
  
      // 正常に登録された場合、次のページにPOSTリクエストでデータを渡す
      router.push({
        pathname: 'auth/Verifications',
        query: {
          name: formData.name,
          email: formData.email,
          password: formData.password,
          remember: formData.remember,
        }
      });
    } catch (error) {
      const err = error as any;
      if (err.response && err.response.data.errors) {
        setErrors(err.response.data.errors);
      } else {
        console.error('Registration failed:', err.response?.data || err.message);
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative w-full max-w-3xl p-20 mx-4 bg-white border border-gray-200 shadow-sm rounded-xl dark:bg-neutral-900 dark:border-neutral-700 h-128 sm:mx-8 md:mx-16 lg:mx-24 xl:mx-32">
        <h1 className="mb-8 text-2xl font-bold text-center text-gray-800 dark:text-white">
          アカウント作成
        </h1>
        <div className="grid gap-y-7">
          <button
            onClick={handleGoogleLogin}
            className="inline-flex items-center justify-center w-full px-4 py-3 text-sm font-medium text-gray-800 bg-white border border-gray-200 rounded-lg shadow-sm gap-x-2 hover:bg-gray-50 focus:outline-none focus:bg-gray-50 dark:bg-neutral-900 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-800 dark:focus:bg-neutral-800"
          >
            <FcGoogle className="mr-2 text-2xl" />
            Googleでアカウントを作成
          </button>
          <div className="flex items-center py-3 text-xs text-gray-400 uppercase before:flex-1 before:border-t before:border-gray-200 before:me-6 after:flex-1 after:border-t after:border-gray-200 after:ms-6 dark:text-neutral-500 dark:before:border-neutral-600 dark:after:border-neutral-600">
            または
          </div>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-y-7">
              <div>
                <label className="block mb-2 text-sm text-black dark:text-white" htmlFor="name">
                  アカウント名
                </label>
                <input
                  className="block w-full px-4 py-3 text-sm text-black border border-gray-200 rounded-lg shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-neutral-900 dark:border-neutral-700 dark:text-white dark:placeholder-neutral-500 dark:focus:bg-neutral-800 dark:focus:ring-neutral-600"
                  id="name"
                  name="name"
                  required
                  type="text"
                />
                {errors.name && <p className="mt-2 text-sm text-red-500">{errors.name}</p>}
              </div>
              <div>
                <label className="block mb-2 text-sm text-black dark:text-white" htmlFor="email">
                  メールアドレス
                </label>
                <input
                  className="block w-full px-4 py-3 text-sm text-black border border-gray-200 rounded-lg shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-neutral-900 dark:border-neutral-700 dark:text-white dark:placeholder-neutral-500 dark:focus:bg-neutral-800 dark:focus:ring-neutral-600"
                  id="email"
                  name="email"
                  required
                  type="email"
                />
                {errors.email && <p className="mt-2 text-sm text-red-500">{errors.email}</p>}
              </div>
              <div>
                <div className="flex items-center justify-between">
                  <label className="block mb-2 text-sm text-black dark:text-white" htmlFor="password">
                    パスワード
                  </label>
                </div>
                <input
                  className="block w-full px-4 py-3 text-sm text-black border border-gray-200 rounded-lg shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-neutral-900 dark:border-neutral-700 dark:text-white dark:placeholder-neutral-500 dark:focus:bg-neutral-800 dark:focus:ring-neutral-600"
                  id="password"
                  name="password"
                  required
                  type="password"
                />
                {errors.password && <p className="mt-2 text-sm text-red-500">{errors.password}</p>}
              </div>
              <div>
                <div className="flex items-center justify-between">
                  <label className="block mb-2 text-sm text-black dark:text-white" htmlFor="password_check">
                    パスワード(確認)
                  </label>
                </div>
                <input
                  className="block w-full px-4 py-3 text-sm text-black border border-gray-200 rounded-lg shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-neutral-900 dark:border-neutral-700 dark:text-white dark:placeholder-neutral-500 dark:focus:bg-neutral-800 dark:focus:ring-neutral-600"
                  id="password_check"
                  name="password_check"
                  required
                  type="password"
                />
                {errors.password_confirmation && <p className="mt-2 text-sm text-red-500">{errors.password_confirmation}</p>}
              </div>
              <div className="flex items-center">
                <input className="shrink-0 mt-0.5 border-gray-200 rounded text-blue-600 dark:bg-neutral-800 dark:border-neutral-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800" id="remember-me" name="remember-me" type="checkbox" />
                <label className="text-sm text-black ms-3 dark:text-white" htmlFor="remember-me">
                  ログイン状態を維持する
                </label>
              </div>
              <button
                className="inline-flex items-center justify-center w-full px-4 py-3 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-lg gap-x-2 hover:bg-blue-700 focus:outline-none focus:bg-blue-700"
              >
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