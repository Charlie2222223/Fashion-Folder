import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface Category {
  id: number;
  category_name: string;
}

interface Size {
  id: number;
  size_name: string;
}

interface Color {
  id: number;
  color_name: string;
  color_code: string;
}

interface ClothingItem {
  id: number;
  clothes_name: string;
  category: Category;
  size: Size;
  color: Color;
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
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedSeason, setSelectedSeason] = useState<string>('spring'); // 初期値として"spring"を設定

  const fetchSeasonalSetup = async (season: string) => {
    setLoading(true); // ボタン押下でロード状態を設定
    try {
      const authToken = localStorage.getItem('authToken');

      if (!authToken) {
        console.error('認証トークンがありません。ログインしてください。');
        return;
      }

      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/seasonal-setup`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
        params: {
          season, // 選択された季節をAPIに渡す
        },
      });

      setRandomSetup(response.data.setup);
      setLoading(false);
    } catch (error) {
      console.error('季節ごとのセットアップの取得に失敗しました', error);
      setLoading(false);
    }
  };

  const handleSeasonChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedSeason(event.target.value);
  };

  const handleFetchSetup = () => {
    fetchSeasonalSetup(selectedSeason);
  };

  return (
    <div className="p-4 bg-gray-100 rounded-md shadow dark:bg-gray-700">
      <h1 className="mb-6 text-xl font-bold text-gray-800 dark:text-white sm:text-2xl">ランダムセットアップ</h1>

      {/* 季節選択用ドロップダウンメニュー */}
      <div className="mb-4">
        <label htmlFor="season" className="mr-2 text-gray-800 dark:text-white">
          季節を選択:
        </label>
        <select
          id="season"
          value={selectedSeason}
          onChange={handleSeasonChange}
          className="p-2 text-gray-700 border rounded-md dark:text-white"
        >
          <option value="spring">春</option>
          <option value="summer">夏</option>
          <option value="fall">秋</option>
          <option value="winter">冬</option>
        </select>
        <button
          onClick={handleFetchSetup}
          className="px-4 py-2 ml-4 text-white bg-blue-500 rounded-md hover:bg-blue-600"
        >
          セットアップを表示
        </button>
      </div>

      {/* ローディング状態 */}
      {loading && <div>読み込み中...</div>}

      {/* セットアップの表示 */}
      {!loading && randomSetup ? (
        <div>
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
                  <p className="text-xs">カテゴリ: {item.clothes.category.category_name}</p>
                  <p className="text-xs">サイズ: {item.clothes.size.size_name}</p>
                  <p className="text-xs">色: {item.clothes.color.color_name}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        !loading && <div>セットアップが見つかりません。</div>
      )}
    </div>
  );
};

export default RandomSetup;