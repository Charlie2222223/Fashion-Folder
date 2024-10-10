import React from 'react';
import {ClothingItem} from '../../../types/closet/clotheslist'; 

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
  {clothingList && clothingList.length > 0 ? (
    clothingList.map((item) => (
      <div
        key={item.id}
        className={`p-2 bg-gray-100 rounded-md shadow cursor-pointer dark:bg-gray-700 ${
          draggedItemId === item.id ? 'opacity-50' : ''
        }`}
        draggable={!isMobile}
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
    ))
  ) : (
    <p className="text-center text-gray-500">データがありません</p>
  )}
</div>
  );
};

export default ClothesGrid;