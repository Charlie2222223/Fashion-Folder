import React, { useState, useEffect } from 'react';
import axios from 'axios'; // axiosライブラリを使用
import { useRouter } from 'next/router';

const PasswordVerifications: React.FC = () => {
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  const { query } = router;

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const form = event.target as HTMLFormElement;
    const verificationInput = form.elements.namedItem('Verification') as HTMLInputElement; // 名前を修正

    const formData = {
      email: query.email,
      temporary_password: verificationInput?.value,
    };

    console.log('Form Data:', formData);

    try {
      setLoading(true); // ローディング開始
      setErrors({});
      setMessage(null);

      // 認証トークンを取得
      const token = localStorage.getItem('authToken');

      // Laravel APIにリクエストを送信
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/change/password/verification`, formData, { // パスを修正
        headers: {
          'Authorization': `Bearer ${token}`, // Authorizationヘッダーを追加
        },
      });
      
      console.log('Verification successful:', response.data);
      setMessage('パスワード認証に成功しました！次のステップに進みます。');

      // 正常に処理された場合、次のステップに進む
      setTimeout(() => {
        router.push({
          pathname: '/user-modal/PasswordInput',
          query: {
              email: query.email,
          },
        });
      }, 2000); // メッセージを表示してから2秒後に次のステップに進む

    } catch (error: any) {
      if (error.response && error.response.data.errors) {
        // バリデーションエラーの場合、エラーメッセージを状態に保存
        setErrors(error.response.data.errors);
      } else {
        console.error('Verification failed:', error.response?.data || error.message);
        setMessage('認証に失敗しました。もう一度お試しください。');
      }
    } finally {
      setLoading(false); // ローディング終了
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative w-full h-auto max-w-3xl p-20 mx-4 bg-white border border-gray-200 shadow-sm rounded-xl dark:bg-neutral-900 dark:border-neutral-700 sm:mx-8 md:mx-16 lg:mx-24 xl:mx-32">
        <h1 className="mb-8 text-2xl font-bold text-center text-gray-800 dark:text-white">
          メール認証
        </h1>
        {/* メールアドレスの表示 */}
        <p className="mb-4 text-center text-gray-600 dark:text-gray-400">
          メールアドレス: <span className="font-bold">{query.email}</span>
        </p>
        {message && (
          <p className="mb-4 text-center text-green-500 dark:text-green-400">
            {message}
          </p>
        )}
        <form onSubmit={handleSubmit}>
          <div className="grid gap-y-7">
            <div className="flex flex-col items-center gap-y-7">
              <div className="w-full max-w-md">
                <label className="block mb-2 text-sm text-center text-black dark:text-white" htmlFor="Verification"> {/* ラベル名を修正 */}
                  確認コード入力
                </label>
                <input
                  className="w-full px-4 py-3 text-sm text-black border border-gray-200 rounded-lg shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-neutral-900 dark:border-neutral-700 dark:text-white dark:placeholder-neutral-500 dark:focus:bg-neutral-800 dark:focus:ring-neutral-600"
                  id="Verification" // IDを修正
                  name="Verification" // 名前を修正
                  required
                  type="text"
                />
                {errors.Verification && <p className="mt-2 text-sm text-red-500">{errors.Verification}</p>} {/* エラーキーを修正 */}
              </div>

              <button
                className={`inline-flex items-center justify-center w-full max-w-md px-4 py-3 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-lg gap-x-2 hover:bg-blue-700 focus:outline-none focus:bg-blue-700 ${
                  loading ? 'cursor-not-allowed opacity-50' : ''
                }`}
                type="submit"
                disabled={loading} // ローディング中はボタンを無効化
              >
                {loading ? (
                  <div className="flex items-center justify-center">
                    <svg
                      className="w-5 h-5 mr-3 text-white animate-spin"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                      ></path>
                    </svg>
                    保存中...
                  </div>
                ) : (
                  "送信"
                )}
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

export default PasswordVerifications; // コンポーネント名を修正