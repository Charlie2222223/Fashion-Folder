// src/components/closet/clotheslist/ClothesGrid.tsx

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
  

interface ClothesGridProps {
  clothingList: ClothingItem[];
  isMobile: boolean;
  selectedClothingItems: number[];
  handleSelectClothingItem: (id: number) => void;
  draggedItemId: number | null;
  handleDragStartItem: (e: React.DragEvent<HTMLDivElement>, id: number) => void;
  handleDragEnd: () => void;
}

const ClothesGrid: React.FC<ClothesGridProps> = ({
  clothingList,
  isMobile,
  selectedClothingItems,
  handleSelectClothingItem,
  draggedItemId,
  handleDragStartItem,
  handleDragEnd,
}) => {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
      {clothingList.map((item) => (
        <div
          key={item.id}
          className={`p-2 bg-gray-100 rounded-md shadow cursor-pointer dark:bg-gray-700 ${
            draggedItemId === item.id ? 'opacity-50' : ''
          }`}
          draggable={!isMobile}
          onDragStart={(e) => handleDragStartItem(e, item.id)}
          onDragEnd={handleDragEnd}
        >
          <input
            type="checkbox"
            checked={selectedClothingItems.includes(item.id)}
            onChange={() => handleSelectClothingItem(item.id)}
            className="mb-2"
          />
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
              <p className="text-sm font-bold sm:text-base">{item.clothes_name}</p>
              <p className="text-xs sm:text-sm">カテゴリ: {item.category.category_name}</p>
              <p className="text-xs sm:text-sm">サイズ: {item.size.size_name}</p>
              <p className="text-xs sm:text-sm">色: {item.color.color_name}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ClothesGrid;