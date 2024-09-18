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

const ClothesList: React.FC = () => {
  const [clothingList, setClothingList] = useState<ClothingItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchClothingList = async () => {
      try {
        // 認証トークンを取得
        const authToken = localStorage.getItem('authToken');

        // トークンがない場合は処理を中断
        if (!authToken) {
          console.error('認証トークンがありません。ログインしてください。');
          return;
        }

        // トークンをヘッダーに追加
        const response = await axios.get('http://localhost:8000/api/user-closet', {
          headers: {
            'Authorization': `Bearer ${authToken}`,
          },
        });

        setClothingList(response.data.clothes);
        setLoading(false);
      } catch (error) {
        console.error('服のリストの取得に失敗しました', error);
        setLoading(false);
      }
    };

    fetchClothingList();
  }, []);

  if (loading) {
    return <div>読み込み中...</div>;
  }

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold text-gray-800 dark:text-white">クローゼットの中身</h1>
      {clothingList.length === 0 ? (
        <p className="text-gray-800 dark:text-white">クローゼットに服がありません。</p>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {clothingList.map((item) => (
            <div key={item.id} className="p-4 bg-gray-100 rounded-md shadow dark:bg-gray-700">
              <div className="flex flex-col items-center">
                {item.image ? (
                  <img
                    src={item.image}
                    alt={item.clothes_name}
                    className="object-cover w-40 h-40 rounded-md"
                  />
                ) : (
                  <div className="flex items-center justify-center w-40 h-40 bg-gray-200 rounded-md">
                    <span className="text-gray-500">No Image</span>
                  </div>
                )}
                <div className="mt-4 text-center text-gray-800 dark:text-white">
                  <p className="font-bold">{item.clothes_name}</p>
                  <p>カテゴリ: {item.clothes_category}</p>
                  <p>サイズ: {item.clothes_size}</p>
                  <p>色: {item.clothes_color}</p>
                  <p>価格: ¥{item.price}</p>
                  <p>詳細: {item.clothes_detail || '特にありません'}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ClothesList;