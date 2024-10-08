// src/pages/components/closet/clotheslist/SetupsGrid.tsx

import React from 'react';
import { Setup } from '../../../types/closet/clotheslist'; // 正しいパスに変更


interface SetupsGridProps {
    setupList: Setup[];
    isMobile: boolean;
    selectedSetupItems: number[];
    handleSelectSetupItem: (id: number) => void;
    draggedSetupId: number | null;
    handleDragStartSetup: (e: React.DragEvent<HTMLDivElement>, id: number) => void;
    handleDragEnd: () => void;
}

const SetupsGrid: React.FC<SetupsGridProps> = ({
    setupList,
    isMobile,
    selectedSetupItems,
    handleSelectSetupItem,
    draggedSetupId,
    handleDragStartSetup,
    handleDragEnd,
}) => {
    // デバッグログの追加
    React.useEffect(() => {
        console.log('Setup List:', setupList);
    }, [setupList]);

    return (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
            {setupList && setupList.length > 0 ? (
                setupList.map((setup) => (
                    <div
                        key={setup.id}
                        className={`p-4 bg-gray-100 rounded-md shadow dark:bg-gray-700 ${
                            draggedSetupId === setup.id ? 'opacity-50' : ''
                        }`}
                        draggable={!isMobile}
                        onDragStart={(e) => handleDragStartSetup(e, setup.id)}
                        onDragEnd={handleDragEnd}
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
                ))
            ) : (
                <p className="text-center text-gray-500">セットアップデータがありません</p>
            )}
        </div>
    );
};

export default SetupsGrid;