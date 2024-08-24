import React, { useState, useEffect } from 'react';
import axios from 'axios'; // axiosライブラリを使用
import { useRouter } from 'next/router';

const VerificationsForm: React.FC = () => {
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const router = useRouter(); // useRouterフックからrouterを取得
  const { query } = router; // queryをrouterから取得

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    // クエリパラメータとフォームデータを統合
    const form = event.target as unknown as HTMLFormElement;
    const formData = {
      name: query.name as string,
      email: query.email as string,
      password: query.password as string,
      remember: query.remember as string,
      temporary_password: form.elements.namedItem('Vertification')?.value,
    };

    // formDataをコンソールに出力して確認
    console.log('Form Data:', formData);

    try {
      // Laravel APIにリクエストを送信
      const response = await axios.post('http://localhost:8000/api/register/vertification', formData);
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
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm dark:bg-neutral-900 dark:border-neutral-700 h-128 p-20 relative w-full max-w-3xl mx-4 sm:mx-8 md:mx-16 lg:mx-24 xl:mx-32">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white text-center mb-8">
          メール認証
        </h1>
        {/* メールアドレスの表示 */}
        <p className="text-center text-gray-600 dark:text-gray-400 mb-4">
          メールアドレス: <span className="font-bold">{query.email}</span>
        </p>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-y-7">
            <div className="flex flex-col items-center gap-y-7">
              <div className="w-full max-w-md">
                <label className="block text-sm mb-2 text-center dark:text-white" htmlFor="Vertification">
                  仮パスワード入力
                </label>
                <input
                  className="py-3 px-4 w-full border border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-neutral-900 dark:border-neutral-700 dark:text-white dark:placeholder-neutral-500 dark:focus:bg-neutral-800 dark:focus:ring-neutral-600 shadow-sm"
                  id="Vertification"
                  name="Vertification"
                  required
                  type="text"
                />
                {errors.Vertification && <p className="text-red-500 text-sm mt-2">{errors.Vertification}</p>}
              </div>

              <button
                className="w-full max-w-md py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:bg-blue-700"
                type="submit"
              >
                送信
              </button>
            </div>
            {/* エラーメッセージ表示 */}
            {errors.general && <p className="text-red-500 text-sm text-center mt-2">{errors.general}</p>}
          </div>
        </form>
      </div>
    </div>
  );
};

export default VerificationsForm;