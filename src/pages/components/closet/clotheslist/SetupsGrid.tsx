import React from 'react';

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
    season: Season;
    items: {
      id: number;
      clothes: ClothingItem;
    }[];
  }

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
              <input
                type="checkbox"
                checked={selectedSetupItems.includes(setup.id)}
                onChange={() => handleSelectSetupItem(setup.id)}
                className="mb-2"
              />
              <h2 className="mb-2 text-lg font-bold text-gray-800 dark:text-white">
                {setup.setup_name}
              </h2>
              <p className="text-xs text-gray-600 dark:text-gray-300">
                季節: {setup?.season?.season_name || '不明'}
              </p>
              <div className="grid grid-cols-2 gap-4 mt-2">
                {setup.items.map((item) => (
                  <div key={item.id} className="flex flex-col items-center">
                    {item.clothes.image ? (
                      <img
                        src={item?.clothes.image || 'img/Image2.png'}
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