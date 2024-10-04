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

interface Season {
  id: number;
  season_name: string;
}

const OutfitSetup: React.FC = () => {
  const [clothingList, setClothingList] = useState<ClothingItem[]>([]);
  const [selectedItems, setSelectedItems] = useState<ClothingItem[]>([]); // 選択された服
  const [draggedItem, setDraggedItem] = useState<ClothingItem | null>(null);
  const [isDragOverSetupArea, setIsDragOverSetupArea] = useState<boolean>(false);
  const [setupName, setSetupName] = useState<string>(''); // セットアップ名の状態管理
  const [seasonList, setSeasonList] = useState<Season[]>([]); // 季節リスト
  const [selectedSeasons, setSelectedSeasons] = useState<number[]>([]); // 選択された季節IDのリスト

  useEffect(() => {
    fetchClothingList();
    fetchSeasons();
  }, []);

  const fetchClothingList = async () => {
    const authToken = localStorage.getItem('authToken');

    if (!authToken) {
      console.error('認証トークンがありません。ログインしてください。');
      return;
    }

    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/user-closet`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });

      setClothingList(response.data.clothes);
    } catch (error) {
      console.error('服のリストの取得に失敗しました', error);
    }
  };

  const fetchSeasons = async () => {
    const authToken = localStorage.getItem('authToken');
  
    if (!authToken) {
      console.error('認証トークンがありません。ログインしてください。');
      return;
    }
  
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/seasons`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
  
      setSeasonList(response.data); // 季節データをstateにセット
    } catch (error) {
      console.error('季節の取得に失敗しました:', error);
    }
  };

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>, item: ClothingItem) => {
    setDraggedItem(item);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragEnd = () => {
    setDraggedItem(null);
  };

  const handleDragOverSetupArea = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOverSetupArea(true);
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDropOnSetupArea = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (draggedItem) {
      setSelectedItems((prev) => [...prev, draggedItem]);
      setDraggedItem(null);
    }
    setIsDragOverSetupArea(false);
  };

  const handleRemoveItem = (itemId: number) => {
    setSelectedItems((prev) => prev.filter((item) => item.id !== itemId));
  };

  const handleSeasonChange = (seasonId: number) => {
    if (selectedSeasons.includes(seasonId)) {
      setSelectedSeasons(selectedSeasons.filter((id) => id !== seasonId));
    } else {
      setSelectedSeasons([...selectedSeasons, seasonId]);
    }
  };

  const handleSaveOutfit = async () => {
    const authToken = localStorage.getItem('authToken');

    if (!authToken) {
      console.error('認証トークンがありません。');
      return;
    }

    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/outfit/save`, {
        setup_name: setupName,
        selectedItems: selectedItems.map((item) => item.id),
        selectedSeasons, // 季節データを送信
      }, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });

      if (response.status === 201) {
        console.log('コーディネートが保存されました');
        // 保存が成功したら、選択された服と季節をリセット
        setSelectedItems([]);
        setSelectedSeasons([]);
      }
    } catch (error) {
      console.error('保存中にエラーが発生しました:', error);
    }
  };

  return (
    <div className="max-w-4xl p-4 mx-auto mt-6 bg-white rounded-lg shadow-md dark:bg-gray-800 dark:text-white">
      <h1 className="mb-4 text-xl font-bold">コーディネートをセットアップする</h1>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {clothingList.map((item) => (
          <div
            key={item.id}
            className="p-4 bg-gray-100 rounded-md shadow cursor-pointer dark:bg-gray-700"
            draggable
            onDragStart={(e) => handleDragStart(e, item)}
            onDragEnd={handleDragEnd}
          >
            <img src={item.image || ''} alt={item.clothes_name} className="object-cover w-32 h-32 rounded-md" />
            <div className="mt-2 text-center text-gray-800 dark:text-white">
              <p className="font-bold">{item.clothes_name}</p>
              <p>カテゴリ: {item.clothes_category}</p>
              <p>サイズ: {item.clothes_size}</p>
              <p>色: {item.clothes_color}</p>
              <p>価格: ¥{item.price}</p>
              <p>詳細: {item.clothes_detail || '特になし'}</p>
            </div>
          </div>
        ))}
      </div>

      <div
        className={`mt-6 p-4 border-2 rounded-lg ${
          isDragOverSetupArea ? 'border-blue-400 bg-blue-100' : 'border-gray-300'
        }`}
        onDragOver={handleDragOverSetupArea}
        onDrop={handleDropOnSetupArea}
        onDragLeave={() => setIsDragOverSetupArea(false)}
      >
        <h2 className="mb-2 text-lg font-bold text-gray-800 dark:text-white">セットアップ名</h2>
        <input
          type="text"
          value={setupName}
          onChange={(e) => setSetupName(e.target.value)}
          placeholder="セットアップの名前を入力"
          className="w-full px-4 py-2 mb-4 text-gray-900 bg-white border border-gray-300 rounded-md dark:bg-gray-700 dark:text-white dark:border-gray-600"
        />
        <h2 className="mb-2 text-lg font-bold text-gray-800 dark:text-white">季節を選択</h2>
        <div className="grid grid-cols-2 gap-4">
          {seasonList.map((season) => (
            <label key={season.id} className="flex items-center space-x-2">
              <input
                type="checkbox"
                value={season.id}
                checked={selectedSeasons.includes(season.id)}
                onChange={() => handleSeasonChange(season.id)}
              />
              <span className='text-gray-800 dark:text-white'>{season.season_name}</span>
            </label>
          ))}
        </div>
        <h2 className="text-lg font-bold text-gray-800 dark:text-white">選択された服</h2>
        {selectedItems.length === 0 ? (
          <p className="text-gray-500">ここにドラッグして服をセットアップします。</p>
        ) : (
          <div className="grid grid-cols-3 gap-4">
            {selectedItems.map((item) => (
              <div
                key={item.id}
                className="relative flex flex-col items-center justify-center p-4 bg-gray-300 rounded-md dark:bg-gray-600"
              >
                <img src={item.image || ''} alt={item.clothes_name} className="object-cover w-24 h-24 rounded-md" />
                <button
                  className="absolute text-red-500 top-1 right-1"
                  onClick={() => handleRemoveItem(item.id)}
                >
                  ×
                </button>
                <div className="mt-2 text-center text-gray-800 dark:text-white">
                  <p className="font-bold">{item.clothes_name}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <button
        onClick={handleSaveOutfit}
        className="px-4 py-2 mt-4 text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
      >
        コーディネートを保存
      </button>
    </div>
  );
};

export default OutfitSetup;