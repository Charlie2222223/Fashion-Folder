import React, { useState, useEffect } from 'react';
import axios from 'axios'; // axiosライブラリを使用
import { useRouter } from 'next/router';

const PasswordInputForm: React.FC = () => {
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [email, setEmail] = useState<string | null>(null); // メールアドレスを状態で管理
  const router = useRouter(); // useRouterフックからrouterを取得
  const { query } = router; // queryをrouterから取得

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const formData = {
      email: query.email,
      password: (event.target as unknown as HTMLFormElement).password.value,
      password_confirmation: (event.target as unknown as HTMLFormElement).password_check.value,
    };

    // formDataをコンソールに出力して確認
    console.log('Form Data:', formData);

    try {

      const token = localStorage.getItem('authToken');
      // Laravel APIにリクエストを送信
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/change/password/input`, formData,{
        headers: {
          'Authorization': `Bearer ${token}`, // Authorizationヘッダーを追加
        },
      }
      );
      console.log('Verification successful:', response.data);

      // 正常に処理された場合、次のステップに進むなどの処理を行います
      router.push('/'); // 次のステップに進む
    } catch (error) {
      const err = error as any; // `error` を `any` にキャスト
      if (err.response && err.response.data.errors) {
        // バリデーションエラーの場合、エラーメッセージを状態に保存
        setErrors(err.response.data.errors);
      } else {
        console.error('Verification failed:', err.response?.data || err.message);
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative w-full max-w-3xl p-20 mx-4 bg-white border border-gray-200 shadow-sm rounded-xl dark:bg-neutral-900 dark:border-neutral-700 h-128 sm:mx-8 md:mx-16 lg:mx-24 xl:mx-32">
        <h1 className="mb-8 text-2xl font-bold text-center text-gray-800 dark:text-white">
          メール認証
        </h1>
        {/* メールアドレスの表示 */}
        {query.email && (
          <p className="mb-4 text-center text-gray-600 dark:text-gray-400">
            <span className="font-bold">{query.email}</span>
          </p>
        )}
        <form onSubmit={handleSubmit}>
          <div className="grid gap-y-7">
            <div className="flex flex-col items-center gap-y-7">
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
                {errors.password && <p className="mt-2 text-sm text-red-500">{errors.password}</p>}
              </div>
              <div>
                <div className="flex items-center justify-between">
                  <label className="block mb-2 text-sm dark:text-white" htmlFor="password_check">
                    パスワード(確認)
                  </label>
                </div>
                <input
                  className="block w-full px-4 py-3 text-sm border border-gray-200 rounded-lg shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-neutral-900 dark:border-neutral-700 dark:text-white dark:placeholder-neutral-500 dark:focus:bg-neutral-800 dark:focus:ring-neutral-600"
                  id="password_check"
                  name="password_check"
                  required
                  type="password"
                />
                {errors.password_confirmation && <p className="mt-2 text-sm text-red-500">{errors.password_confirmation}</p>}
              </div>

              <button
                className="inline-flex items-center justify-center w-full max-w-md px-4 py-3 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-lg gap-x-2 hover:bg-blue-700 focus:outline-none focus:bg-blue-700"
                type="submit"
              >
                送信
              </button>
            </div>
            {/* エラーメッセージ表示 */}
            {errors.general && <p className="mt-2 text-sm text-center text-red-500">{errors.general}</p>}
          </div>
        </form>
      </div>
    </div>
  );
};

export default PasswordInputForm;