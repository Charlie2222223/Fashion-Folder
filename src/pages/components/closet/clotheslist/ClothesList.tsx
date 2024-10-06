import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaTrashAlt } from 'react-icons/fa';

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
  price: string;
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

const ClothesList: React.FC = () => {
  const [clothingList, setClothingList] = useState<ClothingItem[]>([]);
  const [setupList, setSetupList] = useState<Setup[]>([]);
  const [trashItems, setTrashItems] = useState<ClothingItem[]>([]);
  const [setupTrashItems, setSetupTrashItems] = useState<Setup[]>([]); // セットアップ用ゴミ箱
  const [loading, setLoading] = useState<boolean>(true);
  const [draggedSetupId, setDraggedSetupId] = useState<number | null>(null);
  const [draggedItemId, setDraggedItemId] = useState<number | null>(null); // 服のアイテム用
  const [isDragOverTrash, setIsDragOverTrash] = useState<boolean>(false);
  const [isTrashModalOpen, setIsTrashModalOpen] = useState<boolean>(false);
  const [isMobile, setIsMobile] = useState<boolean>(false); // 初期値をfalseに設定
  const [selectedClothingItems, setSelectedClothingItems] = useState<number[]>([]);
  const [selectedSetupItems, setSelectedSetupItems] = useState<number[]>([]);

  useEffect(() => {
    // クライアントサイドでのみ window にアクセス
    if (typeof window !== 'undefined') {
      setIsMobile(window.innerWidth <= 768);

      const handleResize = () => {
        setIsMobile(window.innerWidth <= 768);
      };

      window.addEventListener('resize', handleResize);
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }
  }, []);

  useEffect(() => {
    fetchClothingList();
    fetchSetupList();
  }, []);

  const fetchClothingList = async () => {
    try {
      const authToken = localStorage.getItem('authToken');
      if (!authToken) {
        console.error('認証トークンがありません。ログインしてください。');
        return;
      }
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/user-closet`, {
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

  const fetchSetupList = async () => {
    try {
      const authToken = localStorage.getItem('authToken');
      if (!authToken) {
        console.error('認証トークンがありません。ログインしてください。');
        return;
      }

      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/setups`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });

      setSetupList(response.data.setups || []);
    } catch (error) {
      console.error('セットアップの取得に失敗しました', error);
    }
  };

  const handleSelectClothingItem = (itemId: number) => {
    setSelectedClothingItems((prev) =>
      prev.includes(itemId) ? prev.filter((id) => id !== itemId) : [...prev, itemId]
    );
  };

  const handleSelectSetupItem = (setupId: number) => {
    setSelectedSetupItems((prev) =>
      prev.includes(setupId) ? prev.filter((id) => id !== setupId) : [...prev, setupId]
    );
  };

  const handleDeleteSelectedItems = async () => {
    if (selectedClothingItems.length > 0) {
      for (const itemId of selectedClothingItems) {
        await handleDeletePermanently(itemId);
      }
      setSelectedClothingItems([]);
    }

    if (selectedSetupItems.length > 0) {
      for (const setupId of selectedSetupItems) {
        await handleDeleteSetupPermanently(setupId);
      }
      setSelectedSetupItems([]);
    }
  };

  // ドラッグ操作（セットアップ用）
  const handleDragStartSetup = (e: React.DragEvent<HTMLDivElement>, setupId: number) => {
    setDraggedSetupId(setupId);
    e.dataTransfer.effectAllowed = 'move';
  };

  // ドラッグ操作（服のアイテム用）
  const handleDragStartItem = (e: React.DragEvent<HTMLDivElement>, itemId: number) => {
    setDraggedItemId(itemId);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragEnd = () => {
    setDraggedSetupId(null);
    setDraggedItemId(null);
  };

  const handleDragOverTrash = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation(); // 他のイベントに影響を与えない
    setIsDragOverTrash(true);
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDragLeaveTrash = (e: React.DragEvent<HTMLDivElement>) => {
    e.stopPropagation(); // 他のイベントに影響を与えない
    setIsDragOverTrash(false);
  };

  const handleDropOnTrash = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation(); // 他のイベントに影響を与えない
    setIsDragOverTrash(false);

    // セットアップをゴミ箱に移動
    if (draggedSetupId !== null) {
      const setupToTrash = setupList.find((setup) => setup.id === draggedSetupId);
      if (setupToTrash) {
        setSetupTrashItems((prevTrash) => [...prevTrash, setupToTrash]);
        setSetupList((prevList) => prevList.filter((setup) => setup.id !== draggedSetupId));
      }
      setDraggedSetupId(null);
    }

    // 服のアイテムをゴミ箱に移動
    if (draggedItemId !== null) {
      const itemToTrash = clothingList.find((item) => item.id === draggedItemId);
      if (itemToTrash) {
        setTrashItems((prevTrash) => [...prevTrash, itemToTrash]);
        setClothingList((prevList) => prevList.filter((item) => item.id !== draggedItemId));
      }
      setDraggedItemId(null);
    }
  };

  const handleTrashIconClick = () => {
    setIsTrashModalOpen(true); // ゴミ箱を開く
  };

  // セットアップを完全に削除
  const handleDeleteSetupPermanently = async (setupId: number) => {
    try {
      const authToken = localStorage.getItem('authToken');
      if (!authToken) {
        console.error('認証トークンがありません。ログインしてください。');
        return;
      }

      await axios.delete(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/setups/${setupId}`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });

      setSetupTrashItems((prevTrash) => prevTrash.filter((setup) => setup.id !== setupId));
    } catch (error) {
      console.error('セットアップの削除に失敗しました', error);
    }
  };

  // セットアップをゴミ箱から復元
  const handleRestoreSetup = (setupId: number) => {
    const setupToRestore = setupTrashItems.find((setup) => setup.id === setupId);
    if (setupToRestore) {
      setSetupList((prevList) => [...prevList, setupToRestore]);
      setSetupTrashItems((prevTrash) => prevTrash.filter((setup) => setup.id !== setupId));
    }
  };

  // 服のアイテムを完全に削除
  const handleDeletePermanently = async (itemId: number) => {
    try {
      const authToken = localStorage.getItem('authToken');
      if (!authToken) {
        console.error('認証トークンがありません。ログインしてください。');
        return;
      }

      await axios.delete(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/user-closet/${itemId}`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });

      setTrashItems((prevTrash) => prevTrash.filter((item) => item.id !== itemId));
    } catch (error) {
      console.error('アイテムの削除に失敗しました', error);
    }
  };

  // 服のアイテムをゴミ箱から復元
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
      {/* ゴミ箱 */}
      {!isMobile && (
        <div
          className={`fixed bottom-4 right-4 z-50 flex items-center justify-center w-20 h-20 rounded-full shadow-lg cursor-pointer ${
            isDragOverTrash ? 'bg-red-500' : 'bg-gray-200 dark:bg-gray-700'
          }`}
          onDragOver={handleDragOverTrash}
          onDragLeave={handleDragLeaveTrash}
          onDrop={handleDropOnTrash}
          onClick={handleTrashIconClick} // ゴミ箱をクリック可能にする
        >
          <FaTrashAlt className="text-xl text-gray-800 dark:text-white" />
        </div>
      )}

      <h1 className="mb-6 text-xl font-bold text-gray-800 dark:text-white sm:text-2xl">クローゼットの服一覧</h1>
      {clothingList.length === 0 ? (
        <div className="flex items-center justify-center min-h-screen pb-40">
          <p className="text-2xl text-center text-gray-800 dark:text-white">クローゼットに服がありません。</p>
        </div>
      ) : isMobile ? (
        <>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
            {clothingList.map((item) => (
              <div key={item.id} className="p-2 bg-gray-100 rounded-md shadow cursor-pointer dark:bg-gray-700">
                <input
                  type="checkbox"
                  checked={selectedClothingItems.includes(item.id)}
                  onChange={() => handleSelectClothingItem(item.id)}
                />
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
                    <p className="text-xs sm:text-sm">カテゴリ: {item.category.category_name}</p>
                    <p className="text-xs sm:text-sm">サイズ: {item.size.size_name}</p>
                    <p className="text-xs sm:text-sm">色: {item.color.color_name}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>


          {/* 服の削除ボタン */}
          <button
            className="px-4 py-2 mt-4 text-white bg-red-500 rounded-md"
            onClick={() => handleDeleteSelectedItems()}
          >
            選択した服を削除
          </button>

          <h1 className="mt-10 mb-6 text-xl font-bold text-gray-800 dark:text-white sm:text-2xl">セットアップ一覧</h1>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
            {setupList.map((setup) => (
              <div key={setup.id} className="p-4 bg-gray-100 rounded-md shadow dark:bg-gray-700">
                <input
                  type="checkbox"
                  checked={selectedSetupItems.includes(setup.id)}
                  onChange={() => handleSelectSetupItem(setup.id)}
                />
                <h2 className="mb-2 text-lg font-bold text-gray-800 dark:text-white">{setup.setup_name}</h2>
                <div className="grid grid-cols-2 gap-4">
                  {setup.items.map((item) => (
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
                        <p className="text-xs">カテゴリ: {item.clothes.category?.category_name || '不明'}</p>
                        <p className="text-xs">サイズ: {item.clothes.size?.size_name || '不明'}</p>
                        <p className="text-xs">色: {item.clothes.color?.color_name || '不明'}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
          {/* セットアップの削除ボタン */}
          <button
            className="px-4 py-2 mt-4 text-white bg-red-500 rounded-md"
            onClick={() => handleDeleteSelectedItems()}
          >
            選択したセットアップを削除
          </button>
        </>
      ) : (
        <>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
            {clothingList.map((item) => (
              <div
                key={item.id}
                className={`p-2 bg-gray-100 rounded-md shadow cursor-pointer dark:bg-gray-700 ${
                  draggedItemId === item.id ? 'opacity-50' : ''
                }`}
                draggable
                onDragStart={(e) => handleDragStartItem(e, item.id)}
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
                    <p className="text-xs sm:text-sm">カテゴリ: {item.category.category_name}</p>
                    <p className="text-xs sm:text-sm">サイズ: {item.size.size_name}</p>
                    <p className="text-xs sm:text-sm">色: {item.color.color_name}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <h1 className="mt-10 mb-6 text-xl font-bold text-gray-800 dark:text-white sm:text-2xl">セットアップ一覧</h1>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
            {setupList.map((setup) => (
              <div
                key={setup.id}
                className={`p-4 bg-gray-100 rounded-md shadow dark:bg-gray-700 ${
                  draggedSetupId === setup.id ? 'opacity-50' : ''
                }`}
                draggable
                onDragStart={(e) => handleDragStartSetup(e, setup.id)}
                onDragEnd={handleDragEnd}
              >
                <h2 className="mb-2 text-lg font-bold text-gray-800 dark:text-white">{setup.setup_name}</h2>
                <div className="grid grid-cols-2 gap-4">
                  {setup.items.map((item) => (
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
                        <p className="text-xs">カテゴリ: {item.clothes.category?.category_name || '不明'}</p>
                        <p className="text-xs">サイズ: {item.clothes.size?.size_name || '不明'}</p>
                        <p className="text-xs">色: {item.clothes.color?.color_name || '不明'}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {/* ゴミ箱モーダル */}
      {isTrashModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-full max-w-lg p-4 mx-auto bg-white rounded-md dark:bg-gray-800 sm:p-6">
            <h2 className="mb-4 text-xl font-semibold text-gray-800 dark:text-white">ゴミ箱</h2>
            {trashItems.length === 0 && setupTrashItems.length === 0 ? (
              <p className="text-gray-800 dark:text-white">ゴミ箱は空です。</p>
            ) : (
              <div>
                {trashItems.length > 0 && (
                  <>
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-white">服</h3>
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
                  </>
                )}
                {setupTrashItems.length > 0 && (
                  <>
                    <h3 className="mt-6 text-lg font-semibold text-gray-800 dark:text-white">セットアップ</h3>
                    <div className="grid grid-cols-2 gap-4">
                      {setupTrashItems.map((setup) => (
                        <div
                          key={setup.id}
                          className="p-2 bg-gray-100 rounded-md shadow dark:bg-gray-700"
                        >
                          <h4 className="text-sm font-bold text-center">{setup.setup_name}</h4>
                          <div className="flex justify-center mt-2 space-x-2">
                            <button
                              onClick={() => handleRestoreSetup(setup.id)}
                              className="px-2 py-1 text-xs text-white bg-green-500 rounded hover:bg-green-600"
                            >
                              復元
                            </button>
                            <button
                              onClick={() => handleDeleteSetupPermanently(setup.id)}
                              className="px-2 py-1 text-xs text-white bg-red-500 rounded hover:bg-red-600"
                            >
                              削除
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </div>
            )}
            <div className="flex justify-end mt-4">
              <button
                onClick={() => setIsTrashModalOpen(false)}
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