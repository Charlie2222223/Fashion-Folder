import React from 'react';

interface ModeToggleProps {
  viewMode: 'clothes' | 'setups';
  setViewMode: (mode: 'clothes' | 'setups') => void;
}

const ModeToggle: React.FC<ModeToggleProps> = ({ viewMode, setViewMode }) => {
  return (
    <div className="mb-4">
      <button
        className={`px-4 py-2 mr-2 rounded-md ${
          viewMode === 'clothes'
            ? 'bg-indigo-600 text-white'
            : 'bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-white'
        }`}
        onClick={() => setViewMode('clothes')}
      >
        服一覧
      </button>
      <button
        className={`px-4 py-2 rounded-md ${
          viewMode === 'setups'
            ? 'bg-indigo-600 text-white'
            : 'bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-white'
        }`}
        onClick={() => setViewMode('setups')}
      >
        セットアップ一覧
      </button>
    </div>
  );
};

export default ModeToggle;