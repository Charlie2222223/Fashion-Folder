import React, { useState } from 'react';
import axios from 'axios'; // axiosライブラリを使用
import { useRouter } from 'next/router';

const VerificationsForm: React.FC = () => {
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter(); // useRouterフックからrouterを取得
  const { query } = router; // queryをrouterから取得

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsLoading(true); // ローディング状態を開始

    const form = event.target as HTMLFormElement;
    const vertificationInput = form.elements.namedItem('Vertification') as HTMLInputElement;

    const formData = {
      name: query.name as string,
      email: query.email as string,
      password: query.password as string, // セキュリティ上、クエリパラメータにパスワードを含めるのは避けるべきです
      remember: query.remember === 'true' ? true : false, // クエリパラメータは文字列として取得されるため、booleanに変換
      temporary_password: vertificationInput?.value, // ここで入力値を取得
    };

    // formDataをコンソールに出力して確認
    console.log('Form Data:', formData);

    try {
      // Laravel APIにリクエストを送信
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/register/verification`, formData);
      console.log('Verification successful:', response.data);

      // 正常に処理された場合、次のステップに進むなどの処理を行います
      router.push('/'); // 次のステップに進む
    } catch (error) {
      const err = error as any; // `error` を `any` にキャスト
      if (err.response && err.response.data && err.response.data.errors) {
        // バリデーションエラーの場合、エラーメッセージを状態に保存
        setErrors(err.response.data.errors);
      } else {
        console.error('Verification failed:', err.response?.data || err.message);
      }
    } finally {
      setIsLoading(false); // ローディング状態を終了
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative w-full max-w-md p-10 mx-4 bg-white border border-gray-200 shadow-sm rounded-xl dark:bg-neutral-900 dark:border-neutral-700">
        <h1 className="mb-8 text-2xl font-bold text-center text-gray-800 dark:text-white">
          メール認証
        </h1>
        {/* メールアドレスの表示 */}
        <p className="mb-4 text-center text-gray-600 dark:text-gray-400">
          メールアドレス: <span className="font-bold">{query.email}</span>
        </p>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-y-7">
            <div className="flex flex-col items-center gap-y-7">
              <div className="w-full">
                <label className="block mb-2 text-sm text-center dark:text-white" htmlFor="Vertification">
                  仮パスワード入力
                </label>
                <input
                  className="block w-full px-4 py-3 text-sm text-black border border-gray-200 rounded-lg shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-neutral-900 dark:border-neutral-700 dark:text-white dark:placeholder-neutral-500 dark:focus:bg-neutral-800 dark:focus:ring-neutral-600"
                  id="Vertification"
                  name="Vertification"
                  required
                  type="text"
                  disabled={isLoading}
                />
                {errors.Vertification && (
                  <p className="mt-2 text-sm text-red-500">{errors.Vertification}</p>
                )}
              </div>

              <button
                type="submit"
                className="inline-flex items-center justify-center w-full px-4 py-3 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-lg gap-x-2 hover:bg-blue-700 focus:outline-none focus:bg-blue-700"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center justify-center w-full">
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
                    送信中...
                  </div>
                ) : (
                  '送信'
                )}
              </button>
            </div>
            {/* エラーメッセージ表示 */}
            {errors.general && (
              <p className="mt-2 text-sm text-center text-red-500">{errors.general}</p>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default VerificationsForm;