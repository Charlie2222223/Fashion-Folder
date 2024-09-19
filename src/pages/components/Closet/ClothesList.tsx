import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaTrashAlt } from 'react-icons/fa';

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
  const [trashItems, setTrashItems] = useState<ClothingItem[]>([]); // ゴミ箱内のアイテム
  const [loading, setLoading] = useState<boolean>(true);
  const [editingItem, setEditingItem] = useState<ClothingItem | null>(null);
  const [formData, setFormData] = useState<ClothingItem | null>(null);
  const [draggedItemId, setDraggedItemId] = useState<number | null>(null);
  const [isDragOverTrash, setIsDragOverTrash] = useState<boolean>(false);
  const [isTrashModalOpen, setIsTrashModalOpen] = useState<boolean>(false); // ゴミ箱モーダルの表示状態

  useEffect(() => {
    fetchClothingList();
  }, []);

  const fetchClothingList = async () => {
    try {
      const authToken = localStorage.getItem('authToken');

      if (!authToken) {
        console.error('認証トークンがありません。ログインしてください。');
        return;
      }

      const response = await axios.get('http://localhost:8000/api/user-closet', {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });

      setClothingList(response.data.clothes);
      setLoading(false);
    } catch (error) {
      console.error('服のリストの取得に失敗しました', error);
      setLoading(false);
    }
  };

  // ドラッグ開始時のハンドラ
  const handleDragStart = (e: React.DragEvent<HTMLDivElement>, itemId: number) => {
    setDraggedItemId(itemId);
    e.dataTransfer.effectAllowed = 'move';
  };

  // ドラッグ終了時のハンドラ
  const handleDragEnd = () => {
    setDraggedItemId(null);
  };

  // ゴミ箱上にドラッグしている間のハンドラ
  const handleDragOverTrash = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOverTrash(true);
    e.dataTransfer.dropEffect = 'move';
  };

  // ゴミ箱からドラッグが離れたときのハンドラ
  const handleDragLeaveTrash = () => {
    setIsDragOverTrash(false);
  };

  // ゴミ箱にドロップしたときのハンドラ
  const handleDropOnTrash = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOverTrash(false);
    if (draggedItemId !== null) {
      // アイテムをゴミ箱に移動
      const itemToTrash = clothingList.find((item) => item.id === draggedItemId);
      if (itemToTrash) {
        setTrashItems((prevTrash) => [...prevTrash, itemToTrash]);
        setClothingList((prevList) => prevList.filter((item) => item.id !== draggedItemId));
      }
      // 状態をリセット
      setDraggedItemId(null);
    }
  };

  const handleFormChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    if (formData) {
      setFormData({
        ...formData,
        [e.target.name]:
          e.target.name === 'price' ? parseInt(e.target.value) : e.target.value,
      });
    }
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData) return;

    try {
      const authToken = localStorage.getItem('authToken');
      if (!authToken) {
        console.error('認証トークンがありません。ログインしてください。');
        return;
      }

      await axios.put(`http://localhost:8000/api/user-closet/${formData.id}`, formData, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });

      setClothingList((prevList) =>
        prevList.map((item) => (item.id === formData.id ? formData : item))
      );

      setEditingItem(null);
      setFormData(null);
    } catch (error) {
      console.error('服の更新に失敗しました', error);
    }
  };

  const handleCancelEdit = () => {
    setEditingItem(null);
    setFormData(null);
  };

  // ゴミ箱アイコンをクリックしたときのハンドラ
  const handleTrashIconClick = () => {
    setIsTrashModalOpen(true);
  };

  // ゴミ箱モーダルを閉じる
  const closeTrashModal = () => {
    setIsTrashModalOpen(false);
  };

  // アイテムを完全に削除
  const handleDeletePermanently = async (itemId: number) => {
    try {
      const authToken = localStorage.getItem('authToken');
      if (!authToken) {
        console.error('認証トークンがありません。ログインしてください。');
        return;
      }

      // バックエンドで削除APIを呼び出す
      await axios.delete(`http://localhost:8000/api/user-closet/${itemId}`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });

      // ゴミ箱からアイテムを削除
      setTrashItems((prevTrash) => prevTrash.filter((item) => item.id !== itemId));
    } catch (error) {
      console.error('アイテムの削除に失敗しました', error);
    }
  };

  // アイテムを元に戻す
  const handleRestoreItem = (itemId: number) => {
    const itemToRestore = trashItems.find((item) => item.id === itemId);
    if (itemToRestore) {
      setClothingList((prevList) => [...prevList, itemToRestore]);
      setTrashItems((prevTrash) => prevTrash.filter((item) => item.id !== itemId));
    }
  };

  if (loading) {
    return <div>読み込み中...</div>;
  }

  return (
    <div className="relative">
      {/* ゴミ箱アイコン */}
      <div
        className={`fixed bottom-4 right-4 z-50 flex items-center justify-center w-12 h-12 rounded-full shadow-lg cursor-pointer ${
          isDragOverTrash ? 'bg-red-500' : 'bg-gray-200 dark:bg-gray-700'
        }`}
        onDragOver={handleDragOverTrash}
        onDragLeave={handleDragLeaveTrash}
        onDrop={handleDropOnTrash}
        onClick={handleTrashIconClick}
      >
        <FaTrashAlt className="text-xl text-gray-800 dark:text-white" />
      </div>

      <h1 className="mb-6 text-xl font-bold text-gray-800 dark:text-white sm:text-2xl">クローゼットの服</h1>
      {clothingList.length === 0 ? (
        <p className="text-gray-800 dark:text-white">クローゼットに服がありません。</p>
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
          {clothingList.map((item) => (
            <div
              key={item.id}
              className={`p-2 bg-gray-100 rounded-md shadow cursor-pointer dark:bg-gray-700 ${
                draggedItemId === item.id ? 'opacity-50' : ''
              }`}
              onClick={() => {
                setEditingItem(item);
                setFormData({ ...item });
              }}
              draggable
              onDragStart={(e) => handleDragStart(e, item.id)}
              onDragEnd={handleDragEnd}
            >
              <div className="flex flex-col items-center">
                {item.image ? (
                  <img
                    src={item.image}
                    alt={item.clothes_name}
                    className="object-cover w-full h-auto max-w-xs rounded-md"
                  />
                ) : (
                  <div className="flex items-center justify-center w-full h-32 bg-gray-200 rounded-md">
                    <span className="text-gray-500">No Image</span>
                  </div>
                )}
                <div className="mt-2 text-center text-gray-800 dark:text-white">
                  <p className="text-sm font-bold sm:text-base">{item.clothes_name}</p>
                  <p className="text-xs sm:text-sm">カテゴリ: {item.clothes_category}</p>
                  <p className="text-xs sm:text-sm">サイズ: {item.clothes_size}</p>
                  <p className="text-xs sm:text-sm">色: {item.clothes_color}</p>
                  <p className="text-xs sm:text-sm">価格: ¥{item.price}</p>
                  {/* 詳細は省略またはモーダルで表示 */}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* 編集用モーダル */}
      {editingItem && formData && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-full max-w-lg p-4 mx-auto bg-white rounded-md dark:bg-gray-800 sm:p-6">
            <h2 className="mb-4 text-xl font-semibold text-gray-800 dark:text-white">服の編集</h2>
            <form onSubmit={handleFormSubmit}>
              {/* フォームフィールド */}
              {/* 服の名前 */}
              <div className="mb-2">
                <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
                  服の名前
                </label>
                <input
                  type="text"
                  name="clothes_name"
                  value={formData.clothes_name}
                  onChange={handleFormChange}
                  className="w-full px-2 py-1 text-gray-800 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white"
                />
              </div>
              {/* 他のフィールドも同様に調整 */}
              {/* ボタン */}
              <div className="flex justify-end mt-4">
                <button
                  type="button"
                  onClick={handleCancelEdit}
                  className="px-3 py-1 mr-2 text-sm text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 dark:bg-gray-600 dark:text-white"
                >
                  キャンセル
                </button>
                <button
                  type="submit"
                  className="px-3 py-1 text-sm text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
                >
                  保存する
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ゴミ箱モーダル */}
      {isTrashModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-full max-w-lg p-4 mx-auto bg-white rounded-md dark:bg-gray-800 sm:p-6">
            <h2 className="mb-4 text-xl font-semibold text-gray-800 dark:text-white">ゴミ箱</h2>
            {trashItems.length === 0 ? (
              <p className="text-gray-800 dark:text-white">ゴミ箱は空です。</p>
            ) : (
              <div className="grid grid-cols-2 gap-4">
                {trashItems.map((item) => (
                  <div
                    key={item.id}
                    className="p-2 bg-gray-100 rounded-md shadow dark:bg-gray-700"
                  >
                    <div className="flex flex-col items-center">
                      {item.image ? (
                        <img
                          src={item.image}
                          alt={item.clothes_name}
                          className="object-cover w-full h-auto max-w-xs rounded-md"
                        />
                      ) : (
                        <div className="flex items-center justify-center w-full h-32 bg-gray-200 rounded-md">
                          <span className="text-gray-500">No Image</span>
                        </div>
                      )}
                      <div className="mt-2 text-center text-gray-800 dark:text-white">
                        <p className="text-sm font-bold">{item.clothes_name}</p>
                        <div className="flex mt-2 space-x-2">
                          <button
                            onClick={() => handleRestoreItem(item.id)}
                            className="px-2 py-1 text-xs text-white bg-green-500 rounded hover:bg-green-600"
                          >
                            復元
                          </button>
                          <button
                            onClick={() => handleDeletePermanently(item.id)}
                            className="px-2 py-1 text-xs text-white bg-red-500 rounded hover:bg-red-600"
                          >
                            削除
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
            <div className="flex justify-end mt-4">
              <button
                onClick={closeTrashModal}
                className="px-4 py-2 text-sm text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
              >
                閉じる
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ClothesList;