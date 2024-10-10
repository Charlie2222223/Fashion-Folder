import { useRouter } from 'next/router';
import React, { useState } from 'react';
import axios from 'axios';
import { FcGoogle } from 'react-icons/fc';

const SignInForm: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleClick = () => {
    router.push('/auth/SignUp');
  };

  const handleGoogleLogin = () => {
    window.location.href = `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/google`;
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/login`, {
        email,
        password,
      });

      const token = response.data.access_token;

      // トークンをローカルストレージに保存
      localStorage.setItem('authToken', token);

      // Axiosのデフォルトヘッダーにトークンを設定
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

      // 必要に応じて他のユーザーデータを保存
      localStorage.setItem('user', JSON.stringify(response.data.user));

      // ログイン後にリダイレクト
      router.push('/');
    } catch (error) {
      const err = error as any;
      if (err.response && err.response.data.errors) {
        setErrors(err.response.data.errors);
      } else {
        console.error('Login failed:', err.response?.data || err.message);
        setErrors({ general: 'ログインに失敗しました。メールアドレスとパスワードを確認してください。' });
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative w-full max-w-md p-8 mx-4 bg-white border border-gray-200 shadow-sm rounded-xl dark:bg-neutral-900 dark:border-neutral-700 sm:mx-8 md:mx-16 lg:mx-24 xl:mx-32">
        <button onClick={onClose} className="absolute text-gray-600 top-2 right-2 hover:text-gray-900">
          ✖
        </button>
        <h1 className="mb-4 text-2xl font-bold text-center text-gray-800 dark:text-white">サインイン</h1>
        <p className="mb-6 text-sm text-center text-gray-600 dark:text-neutral-400">
          まだアカウントをお持ちでないですか？{" "}
          <a className="text-blue-600 decoration-2 hover:underline dark:text-blue-500" href="#" onClick={handleClick}>
            こちらで登録
          </a>
        </p>
        <button
          onClick={handleGoogleLogin}
          className="inline-flex items-center justify-center w-full px-4 py-3 mb-4 text-sm font-medium text-gray-800 bg-white border border-gray-200 rounded-lg shadow-sm gap-x-2 hover:bg-gray-50 focus:outline-none focus:bg-gray-50 dark:bg-neutral-900 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-800 dark:focus:bg-neutral-800"
        >
          <FcGoogle className="mr-2 text-2xl" />
          Googleでサインイン
        </button>
        <div className="flex items-center py-3 text-xs text-gray-400 uppercase before:flex-1 before:border-t before:border-gray-200 before:mr-6 after:flex-1 after:border-t after:border-gray-200 after:ml-6 dark:text-neutral-500 dark:before:border-neutral-600 dark:after:border-neutral-600">
          または
        </div>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-y-4">
            {errors.general && <p className="text-sm text-red-500">{errors.general}</p>}
            <div>
              <label className="block mb-2 text-sm text-black dark:text-white" htmlFor="email">
                メールアドレス
              </label>
              <input
                className="block w-full px-4 py-3 text-sm border border-gray-200 rounded-lg shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-neutral-900 dark:border-neutral-700 dark:text-white dark:placeholder-neutral-500 dark:focus:bg-neutral-800 dark:focus:ring-neutral-600"
                id="email"
                name="email"
                required
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {errors.password && <p className="mt-2 text-sm text-red-500">{errors.password}</p>}
              <a className="inline-flex items-center mt-2 text-sm text-blue-600 gap-x-1 decoration-2 hover:underline dark:text-blue-500" href="user-modal/PasswordChange">
                パスワードをお忘れですか？
              </a>
            </div>
            <div className="flex items-center">
              <input
                className="shrink-0 mt-0.5 border-gray-200 rounded text-blue-600 dark:bg-neutral-800 dark:border-neutral-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800"
                id="remember-me"
                name="remember-me"
                type="checkbox"
              />
              <label className="ml-3 text-sm dark:text-white" htmlFor="remember-me">
                ログイン状態を維持する
              </label>
            </div>
            <button className="inline-flex items-center justify-center w-full px-4 py-3 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-lg gap-x-2 hover:bg-blue-700 focus:outline-none focus:bg-blue-700">
              サインイン
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignInForm;