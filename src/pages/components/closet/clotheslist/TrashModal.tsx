// src/components/closet/clotheslist/TrashModal.tsx

import React from 'react';
import { ClothingItem, Setup } from './ClothesList'; // 必要に応じてインポートパスを調整

interface TrashModalProps {
  isOpen: boolean;
  closeModal: () => void;
  trashItems: ClothingItem[];
  setupTrashItems: Setup[];
  handleRestoreItem: (id: number) => void;
  handleDeletePermanently: (id: number) => void;
  handleRestoreSetup: (id: number) => void;
  handleDeleteSetupPermanently: (id: number) => void;
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
  if (!isOpen) return null;

  return (
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
                            src={`${process.env.NEXT_PUBLIC_API_BASE_URL}/${item.image}`}
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
                        季節: {setup.season.season_name}
                      </p>
                      <div className="grid grid-cols-2 gap-4 mt-2">
                        {setup.items.map((item) => (
                          <div key={item.id} className="flex flex-col items-center">
                            {item.clothes.image ? (
                              <img
                                src={`${process.env.NEXT_PUBLIC_API_BASE_URL}/${item.clothes.image}`}
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