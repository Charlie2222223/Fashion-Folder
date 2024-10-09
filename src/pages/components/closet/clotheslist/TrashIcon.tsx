import React from 'react';
import { FaTrashAlt } from 'react-icons/fa';

interface TrashIconProps {
  isDragOverTrash: boolean;
  handleDragOverTrash: (e: React.DragEvent<HTMLDivElement>) => void;
  handleDragLeaveTrash: (e: React.DragEvent<HTMLDivElement>) => void;
  handleDropOnTrash: (e: React.DragEvent<HTMLDivElement>) => void;
  openTrashModal: () => void;
}

const TrashIcon: React.FC<TrashIconProps> = ({
  isDragOverTrash,
  handleDragOverTrash,
  handleDragLeaveTrash,
  handleDropOnTrash,
  openTrashModal,
}) => {
  return (
    <div
      className={`fixed bottom-4 right-4 z-50 flex items-center justify-center w-20 h-20 rounded-full shadow-lg cursor-pointer ${
        isDragOverTrash ? 'bg-red-500' : 'bg-gray-200 dark:bg-gray-700'
      }`}
      onDragOver={handleDragOverTrash}
      onDragLeave={handleDragLeaveTrash}
      onDrop={handleDropOnTrash}
      onClick={openTrashModal}
    >
      <FaTrashAlt className="text-xl text-gray-800 dark:text-white" />
    </div>
  );
};

export default TrashIcon;