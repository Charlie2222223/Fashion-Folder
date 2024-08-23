import { useRouter } from 'next/router';
import React from 'react';
import axios from 'axios';
import { FcGoogle } from 'react-icons/fc';

const SignInForm: React.FC<{ onClose: () => void; onLoginSuccess: (token: string, user: any) => void }> = ({ onClose, onLoginSuccess }) => {

  const router = useRouter();

  const handleClick = () => {
    // `/SignIn` ページに遷移する
    router.push('/SignIn');
  };

  const handleGoogleLogin = () => {
    window.location.href = 'http://localhost:8000/auth/google';
  };

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = {
      email: event.currentTarget.email.value,
      password: event.currentTarget.password.value,
    };

    try {
      const response = await axios.post('http://localhost:8000/api/auth/user', formData);
      console.log('Login successful:', response.data);

      // ログイン成功後の処理を追加
      const { token, user } = response.data;
      onLoginSuccess(token, user); // 親コンポーネントにトークンとユーザー情報を渡す

    } catch (error) {
      console.error('Login failed:', error.response?.data || error.message);
      // エラーメッセージの処理をここに追加
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative w-full max-w-md p-8 mx-4 bg-white border border-gray-200 shadow-sm rounded-xl dark:bg-neutral-900 dark:border-neutral-700 sm:mx-8 md:mx-16 lg:mx-24 xl:mx-32">
        <button 
          onClick={onClose} 
          className="absolute text-gray-600 top-2 right-2 hover:text-gray-900"
        >
          ✖
        </button>
        <h1 className="mb-4 text-2xl font-bold text-center text-gray-800 dark:text-white">
          サインイン
        </h1>
        <p className="mb-6 text-sm text-center text-gray-600 dark:text-neutral-400">
          まだアカウントをお持ちでないですか？{" "}
          <a className="text-blue-600 decoration-2 hover:underline dark:text-blue-500" href="#" onClick={handleClick}>
            こちらで登録
          </a>
        </p>
        <button 
        onClick={handleGoogleLogin}
        className="inline-flex items-center justify-center w-full px-4 py-3 text-sm font-medium text-gray-800 bg-white border border-gray-200 rounded-lg shadow-sm gap-x-2 hover:bg-gray-50 focus:outline-none focus:bg-gray-50 dark:bg-neutral-900 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-800 dark:focus:bg-neutral-800">
          <FcGoogle className="mr-2 text-2xl" />
          Googleでサインイン
        </button>
        <div className="flex items-center py-3 text-xs text-gray-400 uppercase before:flex-1 before:border-t before:border-gray-200 before:me-6 after:flex-1 after:border-t after:border-gray-200 after:ms-6 dark:text-neutral-500 dark:before:border-neutral-600 dark:after:border-neutral-600">
          または
        </div>
        <form onSubmit={handleLogin}>
          <div className="grid gap-y-4">
            <div>
              <label className="block mb-2 text-sm dark:text-white" htmlFor="email">
                メールアドレス
              </label>
              <input
                className="block w-full px-4 py-3 text-sm border border-gray-200 rounded-lg shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-neutral-900 dark:border-neutral-700 dark:text-white dark:placeholder-neutral-500 dark:focus:bg-neutral-800 dark:focus:ring-neutral-600"
                id="email"
                name="email"
                required
                type="email"
              />
            </div>
            <div>
              <div className="flex items-center justify-between">
                <label className="block mb-2 text-sm dark:text-white" htmlFor="password">
                  パスワード
                </label>
              </div>
              <input
                className="block w-full px-4 py-3 text-sm border border-gray-200 rounded-lg shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-neutral-900 dark:border-neutral-700 dark:text-white dark:placeholder-neutral-500 dark:focus:bg-neutral-800 dark:focus:ring-neutral-600"
                id="password"
                name="password"
                required
                type="password"
              />
              <a className="inline-flex items-center text-sm text-blue-600 gap-x-1 decoration-2 hover:underline dark:text-blue-500" href="#">
                  パスワードをお忘れですか？
              </a>
            </div>
            <div className="flex items-center">
              <input className="shrink-0 mt-0.5 border-gray-200 rounded text-blue-600 dark:bg-neutral-800 dark:border-neutral-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800" id="remember-me" name="remember-me" type="checkbox" />
              <label className="text-sm ms-3 dark:text-white" htmlFor="remember-me">
                ログイン状態を維持する
              </label>
            </div>
            <button className="inline-flex items-center justify-center w-full px-4 py-3 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-lg gap-x-2 hover:bg-blue-700 focus:outline-none focus:bg-blue-700"
              type="submit">
              サインイン
            </button>
          </div>
        </form> 
      </div>
    </div>
  );
};

export default SignInForm;