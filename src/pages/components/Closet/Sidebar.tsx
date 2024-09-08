import React from 'react';
import { FiPlus, FiEye} from 'react-icons/fi';
import { BiCloset } from "react-icons/bi";
import { GiClothes } from "react-icons/gi";
import { FaRandom } from "react-icons/fa";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  return (
    <>
      {/* オーバーレイが表示される部分 */}
      {isOpen && (
        <div
          onClick={onClose}  // ここでオーバーレイをタッチした際にサイドバーが閉じる
          className="fixed inset-0 z-20 transition-opacity bg-black opacity-50 lg:hidden"
        />
      )}
      <div className="flex h-screen bg-gray-200">
        {/* Sidebar */}
        <div
          className={`fixed inset-y-0 left-0 z-30 w-64 overflow-y-auto transition duration-300 transform bg-gray-900 lg:translate-x-0 lg:static lg:inset-0 ${isOpen ? 'translate-x-0 ease-out' : '-translate-x-full ease-in'}`}
        >
          <div className="flex items-center justify-center mt-8">
            <div className="flex items-center">
              <BiCloset className="w-12 h-12 text-indigo-500" />
              <span className="mx-2 text-2xl font-semibold text-white">
                Closet
              </span>
            </div>
          </div>
          <nav className="mt-10">
            <a
              className="flex items-center px-6 py-2 mt-4 text-gray-100 bg-gray-700 bg-opacity-25"
              href="#"
            >
              <FiPlus className="w-6 h-6" />
              <span className="mx-3">クローゼットに入れる</span>
            </a>
            <a
              className="flex items-center px-6 py-2 mt-4 text-gray-500 hover:bg-gray-700 hover:bg-opacity-25 hover:text-gray-100"
              href="#"
            >
              <GiClothes className="w-6 h-6" />
              <span className="mx-3">コーデをセットアップ</span>
            </a>
            <a
              className="flex items-center px-6 py-2 mt-4 text-gray-500 hover:bg-gray-700 hover:bg-opacity-25 hover:text-gray-100"
              href="#"
            >
              <FiEye className="w-6 h-6" />
              <span className="mx-3">クローゼットを覗く</span>
            </a>
            <a
              className="flex items-center px-6 py-2 mt-4 text-gray-500 hover:bg-gray-700 hover:bg-opacity-25 hover:text-gray-100"
              href="#"
            >
              <FaRandom className="w-6 h-6" />
              <span className="mx-3">ランダムMySet</span>
            </a>
          </nav>
        </div>
      </div>
    </>
  );
};

export default Sidebar;