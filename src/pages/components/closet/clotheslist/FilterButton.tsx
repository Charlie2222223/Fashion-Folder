// src/components/closet/clotheslist/FilterButton.tsx

import React from 'react';

interface FilterButtonProps {
  viewMode: 'clothes' | 'setups';
  openFilterModal: () => void;
}

const FilterButton: React.FC<FilterButtonProps> = ({ viewMode, openFilterModal }) => {
  return (
    <div className="mb-4">
      {viewMode === 'clothes' && (
        <button
          className="px-4 py-2 mb-4 text-white bg-indigo-600 rounded-md"
          onClick={openFilterModal}
        >
          フィルター
        </button>
      )}
      {viewMode === 'setups' && (
        <button
          className="px-4 py-2 mb-4 text-white bg-indigo-600 rounded-md"
          onClick={openFilterModal}
        >
          フィルター（季節）
        </button>
      )}
    </div>
  );
};

export default FilterButton;