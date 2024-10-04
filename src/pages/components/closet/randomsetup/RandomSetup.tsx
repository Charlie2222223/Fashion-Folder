import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface ClothingItem {
  id: number;
  clothes_name: string;
  clothes_category: string;
  clothes_size: string;
  clothes_color: string;
  clothes_detail: string | null;
  price: number;
  image: string | null;
}

interface Setup {
  id: number;
  setup_name: string;
  items: {
    id: number;
    clothes: ClothingItem;
  }[];
}

const RandomSetup: React.FC = () => {
  const [randomSetup, setRandomSetup] = useState<Setup | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetchRandomSetup();
  }, []);

  const fetchRandomSetup = async () => {
    try {
      const authToken = localStorage.getItem('authToken');

      if (!authToken) {
        console.error('認証トークンがありません。ログインしてください。');
        return;
      }

      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/random-setup`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });

      setRandomSetup(response.data.setup);
      setLoading(false);
    } catch (error) {
      console.error('ランダムなセットアップの取得に失敗しました', error);
      setLoading(false);
    }
  };

  if (loading) {
    return <div>読み込み中...</div>;
  }

  if (!randomSetup) {
    return <div>セットアップが見つかりません。</div>;
  }

  return (
    <div className="p-4 bg-gray-100 rounded-md shadow dark:bg-gray-700">
      <h1 className="mb-6 text-xl font-bold text-gray-800 dark:text-white sm:text-2xl">ランダムなセットアップ</h1>
      <h2 className="mb-4 text-lg font-bold text-gray-800 dark:text-white">{randomSetup.setup_name}</h2>
      <div className="grid grid-cols-2 gap-4">
        {randomSetup.items.map((item) => (
          <div key={item.id} className="flex flex-col items-center">
            {item.clothes.image ? (
              <img
                src={item.clothes.image}
                alt={item.clothes.clothes_name}
                className="object-cover w-full h-auto max-w-xs rounded-md"
              />
            ) : (
              <div className="flex items-center justify-center w-full h-32 bg-gray-200 rounded-md">
                <span className="text-gray-500">No Image</span>
              </div>
            )}
            <div className="mt-2 text-center text-gray-800 dark:text-white">
              <p className="text-sm font-bold">{item.clothes.clothes_name}</p>
              <p className="text-xs">カテゴリ: {item.clothes.clothes_category}</p>
              <p className="text-xs">サイズ: {item.clothes.clothes_size}</p>
              <p className="text-xs">色: {item.clothes.clothes_color}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RandomSetup;