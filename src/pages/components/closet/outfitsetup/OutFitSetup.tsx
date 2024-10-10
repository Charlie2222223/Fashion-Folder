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
  const [selectedItems, setSelectedItems] = useState<ClothingItem[]>([]);
  const [draggedItem, setDraggedItem] = useState<ClothingItem | null>(null);
  const [isDragOverSetupArea, setIsDragOverSetupArea] = useState<boolean>(false);
  const [setupName, setSetupName] = useState<string>('');
  const [seasonList, setSeasonList] = useState<Season[]>([]);
  const [selectedSeasons, setSelectedSeasons] = useState<number[]>([]);

  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    fetchClothingList();
    fetchSeasons();
  }, []);

  const fetchClothingList = async () => {
    const authToken = localStorage.getItem('authToken');

    if (!authToken) {
      console.error('認証トークンがありません。ログインしてください。');
      setErrorMessage('認証トークンがありません。ログインしてください。');
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
      setErrorMessage('服のリストの取得に失敗しました。もう一度お試しください。');
    }
  };

  const fetchSeasons = async () => {
    const authToken = localStorage.getItem('authToken');
  
    if (!authToken) {
      console.error('認証トークンがありません。ログインしてください。');
      setErrorMessage('認証トークンがありません。ログインしてください。');
      return;
    }
  
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/seasons`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
  
      setSeasonList(response.data);
    } catch (error) {
      console.error('季節の取得に失敗しました:', error);
      setErrorMessage('季節の取得に失敗しました。もう一度お試しください。');
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
      if (!selectedItems.some(item => item.id === draggedItem.id)) {
        setSelectedItems((prev) => [...prev, draggedItem]);
      } else {
        setErrorMessage('この服は既に選択されています。');
      }
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
      setErrorMessage('認証トークンがありません。ログインしてください。');
      return;
    }

    if (setupName.trim() === '') {
      setErrorMessage('セットアップ名を入力してください。');
      return;
    }

    if (selectedItems.length === 0) {
      setErrorMessage('少なくとも1つの服を選択してください。');
      return;
    }

    if (selectedSeasons.length === 0) {
      setErrorMessage('少なくとも1つの季節を選択してください。');
      return;
    }

    setLoading(true);
    setErrorMessage(null);

    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/outfit/save`, {
        setup_name: setupName,
        selectedItems: selectedItems.map((item) => item.id),
        selectedSeasons,
      }, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });

      if (response.status === 201) {
        console.log('コーディネートが保存されました');
        setSelectedItems([]);
        setSelectedSeasons([]);
        setSetupName('');
        setSuccessMessage('コーディネートが正常に保存されました！');

        setTimeout(() => {
          setSuccessMessage(null);
        }, 5000);
      } else {
        setErrorMessage('予期せぬエラーが発生しました。再度お試しください。');
      }
    } catch (error: any) {
      console.error('保存中にエラーが発生しました:', error);
      if (error.response && error.response.data && error.response.data.message) {
        setErrorMessage(error.response.data.message);
      } else {
        setErrorMessage('保存中にエラーが発生しました。再度お試しください。');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl p-4 mx-auto mt-6 bg-white rounded-lg shadow-md dark:bg-gray-800 dark:text-white">
      {/* 成功メッセージの表示 */}
      {successMessage && (
        <div className="fixed p-4 text-white bg-green-500 rounded shadow-lg top-4 right-4">
          {successMessage}
        </div>
      )}

      {/* 一般的なエラーメッセージの表示 */}
      {errorMessage && (
        <div className="fixed p-4 text-white bg-red-500 rounded shadow-lg top-4 right-4">
          {errorMessage}
        </div>
      )}

      <h1 className="mb-4 text-2xl font-bold">コーディネートをセットアップする</h1>

      <div className="flex flex-row space-x-4">
        {/* 左側: 服のリスト */}
        <div className="w-1/3 h-screen p-2 overflow-y-auto border rounded-lg bg-gray-50 dark:bg-gray-700">
          <h2 className="mb-2 text-xl font-semibold">服のリスト</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {clothingList.map((item) => (
              <div
                key={item.id}
                className="p-4 bg-gray-100 rounded-md shadow cursor-pointer dark:bg-gray-600"
                draggable
                onDragStart={(e) => handleDragStart(e, item)}
                onDragEnd={handleDragEnd}
              >
                <img src={item.image || '/img/Icon2.png'} alt={item.clothes_name} className="object-cover w-full h-40 rounded-md" />
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
        </div>

        {/* 右側: セットアップエリア */}
        <div className="flex-1 h-screen p-4 border rounded-lg bg-gray-50 dark:bg-gray-700">
          <div
            className={`p-4 border-2 rounded-lg ${
              isDragOverSetupArea ? 'border-blue-400 bg-blue-100' : 'border-gray-300'
            } h-full overflow-auto`}
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
              className="w-full px-4 py-2 mb-4 text-gray-900 bg-white border border-gray-300 rounded-md dark:bg-gray-600 dark:text-white dark:border-gray-500"
              required
            />
            <h2 className="mb-2 text-lg font-bold text-gray-800 dark:text-white">季節を選択</h2>
            <div className="grid grid-cols-2 gap-4 mb-4">
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
            <h2 className="mb-2 text-lg font-bold text-gray-800 dark:text-white">選択された服</h2>
            {selectedItems.length === 0 ? (
              <p className="text-gray-500">ここにドラッグして服をセットアップします。</p>
            ) : (
              <div className="grid grid-cols-2 gap-4">
                {selectedItems.map((item) => (
                  <div
                    key={item.id}
                    className="relative flex flex-col items-center justify-center p-4 bg-gray-300 rounded-md dark:bg-gray-600"
                  >
                    <img src={item.image || '/default-clothing.png'} alt={item.clothes_name} className="object-cover w-24 h-24 rounded-md" />
                    <button
                      className="absolute flex items-center justify-center w-6 h-6 text-red-500 bg-white rounded-full top-1 right-1"
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
            className="px-4 py-2 mt-4 text-white bg-indigo-600 rounded-md hover:bg-indigo-700 dark:bg-gray-700 dark:hover:bg-gray-600"
            disabled={loading}
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
              "コーディネートを保存"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default OutfitSetup;