import React from 'react';
import { Category, Size, Color, Season} from '../../../types/clotheslist'; // 正しいパスに変更

interface FilterModalProps {
  viewMode: 'clothes' | 'setups';
  categories: Category[];
  sizes: Size[];
  colors: Color[];
  seasons: Season[];
  selectedCategory: number | null;
  selectedSize: number | null;
  selectedColor: number | null;
  selectedSeason: number | null;
  setSelectedCategory: (id: number | null) => void;
  setSelectedSize: (id: number | null) => void;
  setSelectedColor: (id: number | null) => void;
  setSelectedSeason: (id: number | null) => void;
  applyFilter: () => void;
  clearFilter: () => void;
  closeModal: () => void;
}

const FilterModal: React.FC<FilterModalProps> = ({
  viewMode,
  categories,
  sizes,
  colors,
  seasons,
  selectedCategory,
  selectedSize,
  selectedColor,
  selectedSeason,
  setSelectedCategory,
  setSelectedSize,
  setSelectedColor,
  setSelectedSeason,
  applyFilter,
  clearFilter,
  closeModal,
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-full max-w-lg p-4 mx-auto bg-white rounded-md dark:bg-gray-800 sm:p-6">
        <h2 className="mb-4 text-xl font-semibold text-gray-800 dark:text-white">フィルター</h2>
        {viewMode === 'clothes' && (
          <div className="mb-4 space-y-4 md:space-y-0 md:flex md:space-x-4">
            <select
              className="w-full p-2 text-black bg-gray-100 rounded-md"
              value={selectedCategory || ''}
              onChange={(e) => setSelectedCategory(e.target.value ? Number(e.target.value) : null)}
            >
              <option value="">カテゴリ</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.category_name}
                </option>
              ))}
            </select>

            <select
              className="w-full p-2 text-black bg-gray-100 rounded-md"
              value={selectedSize || ''}
              onChange={(e) => setSelectedSize(e.target.value ? Number(e.target.value) : null)}
            >
              <option value="">サイズ</option>
              {sizes.map((size) => (
                <option key={size.id} value={size.id}>
                  {size.size_name}
                </option>
              ))}
            </select>

            <select
              className="w-full p-2 text-black bg-gray-100 rounded-md"
              value={selectedColor || ''}
              onChange={(e) => setSelectedColor(e.target.value ? Number(e.target.value) : null)}
            >
              <option value="">色</option>
              {colors.map((color) => (
                <option key={color.id} value={color.id}>
                  {color.color_name}
                </option>
              ))}
            </select>
          </div>
        )}

        {viewMode === 'setups' && (
          <div className="mb-4 space-y-4 md:space-y-0 md:flex md:space-x-4">
            <select
              className="w-full p-2 text-black bg-gray-100 rounded-md"
              value={selectedSeason || ''}
              onChange={(e) => setSelectedSeason(e.target.value ? Number(e.target.value) : null)}
            >
              <option value="">季節</option>
              {seasons.map((season) => (
                <option key={season.id} value={season.id}>
                  {season.season_name}
                </option>
              ))}
            </select>
          </div>
        )}

        <div className="flex justify-end mt-4 space-x-2">
          <button
            className="px-4 py-2 text-sm text-gray-800 bg-gray-200 rounded-md hover:bg-gray-300"
            onClick={clearFilter}
          >
            クリア
          </button>
          <button
            className="px-4 py-2 text-sm text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
            onClick={applyFilter}
          >
            適用
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterModal;