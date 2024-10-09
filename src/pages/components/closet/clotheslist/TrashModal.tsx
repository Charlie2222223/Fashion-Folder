import React, { useState } from 'react';

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

interface Season {
  id: number;
  season_name: string;
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
  seasons: Season[]; // 複数の季節を保持
  items: {
    id: number;
    clothes: ClothingItem;
  }[];
}

interface TrashModalProps {
  isOpen: boolean;
  closeModal: () => void;
  trashItems: ClothingItem[];
  setupTrashItems: Setup[];
  handleRestoreItem: (id: number) => Promise<void>;
  handleDeletePermanently: (id: number) => Promise<void>;
  handleRestoreSetup: (id: number) => Promise<void>;
  handleDeleteSetupPermanently: (id: number) => Promise<void>;
}

const TrashModal: React.FC<TrashModalProps> = ({
  isOpen,
  closeModal,
  trashItems,
  setupTrashItems,
  handleRestoreItem,
  handleDeletePermanently,
  handleRestoreSetup,
  handleDeleteSetupPermanently,
}) => {
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  if (!isOpen) return null;

  // ハンドラー関数内でメッセージを設定
  const onRestoreItem = async (id: number) => {
    try {
      await handleRestoreItem(id);
      setSuccessMessage('服が復元されました。');
      setTimeout(() => setSuccessMessage(null), 5000);
    } catch (error) {
      setErrorMessage('服の復元に失敗しました。');
      setTimeout(() => setErrorMessage(null), 5000);
    }
  };

  const onDeleteItem = async (id: number) => {
    try {
      await handleDeletePermanently(id);
      setSuccessMessage('服が削除されました。');
      setTimeout(() => setSuccessMessage(null), 5000);
    } catch (error) {
      setErrorMessage('服の削除に失敗しました。');
      setTimeout(() => setErrorMessage(null), 5000);
    }
  };

  const onRestoreSetup = async (id: number) => {
    try {
      await handleRestoreSetup(id);
      setSuccessMessage('セットアップが復元されました。');
      setTimeout(() => setSuccessMessage(null), 5000);
    } catch (error) {
      setErrorMessage('セットアップの復元に失敗しました。');
      setTimeout(() => setErrorMessage(null), 5000);
    }
  };

  const onDeleteSetup = async (id: number) => {
    try {
      await handleDeleteSetupPermanently(id);
      setSuccessMessage('セットアップが削除されました。');
      setTimeout(() => setSuccessMessage(null), 5000);
    } catch (error) {
      setErrorMessage('セットアップの削除に失敗しました。');
      setTimeout(() => setErrorMessage(null), 5000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-full max-w-lg p-4 mx-auto bg-white rounded-md dark:bg-gray-800 sm:p-6">
        {/* 成功メッセージの表示 */}
        {successMessage && (
          <div className="p-2 mb-4 text-green-800 bg-green-100 border border-green-300 rounded">
            {successMessage}
          </div>
        )}
        {/* エラーメッセージの表示 */}
        {errorMessage && (
          <div className="p-2 mb-4 text-red-800 bg-red-100 border border-red-300 rounded">
            {errorMessage}
          </div>
        )}

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
                        <img
                          src={item.image || 'img/Image2.png'} // プレースホルダー画像を設定
                          alt={item.clothes_name}
                          className="object-cover w-full h-auto max-w-xs rounded-md"
                        />
                        <div className="mt-2 text-center text-gray-800 dark:text-white">
                          <p className="text-sm font-bold">{item.clothes_name}</p>
                          <div className="flex mt-2 space-x-2">
                            <button
                              onClick={() => onRestoreItem(item.id)}
                              className="px-2 py-1 text-xs text-white bg-green-500 rounded hover:bg-green-600"
                            >
                              復元
                            </button>
                            <button
                              onClick={() => onDeleteItem(item.id)}
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
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
                  {setupTrashItems.map((setup) => (
                    <div
                      key={setup.id}
                      className="p-4 bg-gray-100 rounded-md shadow dark:bg-gray-700"
                    >
                      <h2 className="mb-2 text-lg font-bold text-gray-800 dark:text-white">
                        {setup.setup_name}
                      </h2>
                      <p className="text-xs text-gray-600 dark:text-gray-300">
                        季節: {setup.seasons.map(season => season.season_name).join(', ') || '不明'}
                      </p>
                      <div className="grid grid-cols-2 gap-4 mt-2">
                        {setup.items.map((item) => (
                          <div key={item.id} className="flex flex-col items-center">
                            {item.clothes.image ? (
                              <img
                                src={item.clothes.image || 'img/Image2.png'}
                                alt={item.clothes.clothes_name}
                                className="object-cover w-full h-auto max-w-xs rounded-md"
                              />
                            ) : (
                              <div className="flex items-center justify-center w-full h-32 bg-gray-200 rounded-md">
                                <span className="text-gray-500">No Image</span>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                      <div className="flex justify-center mt-2 space-x-2">
                        <button
                          onClick={() => onRestoreSetup(setup.id)}
                          className="px-2 py-1 text-xs text-white bg-green-500 rounded hover:bg-green-600"
                        >
                          復元
                        </button>
                        <button
                          onClick={() => onDeleteSetup(setup.id)}
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
            onClick={closeModal}
            className="px-4 py-2 text-sm text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
          >
            閉じる
          </button>
        </div>
      </div>
    </div>
  );
};

export default TrashModal;