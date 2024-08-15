import { FaCamera, FaHome, FaUserAlt } from "react-icons/fa";

const Header: React.FC<{ onUserClick: () => void }> = ({ onUserClick }) => {
  console.log("Header component rendered");

  return (
    <header className="flex items-center justify-between p-4 text-white bg-gray-800">
      <div className="flex items-center">
        <h1 className="ml-2 text-xl">Fashion Folder</h1>
      </div>
      <nav className="flex">
        <button 
          onClick={() => {
            console.log("User icon clicked");
            onUserClick();  // ここでフォームを表示するための関数を呼び出し
          }}
          className="flex items-center ml-4 text-white hover:text-gray-400 z-20"
        >
          <FaUserAlt size={20} />
          <span className="ml-2">ユーザー</span>
        </button>
        <div className="hidden lg:flex">
        <a href="#home" className="flex items-center ml-4 text-white hover:text-gray-400">
          <FaHome size={20} /> 
          <span className="ml-2">Home</span> 
        </a>
        <a href="#cart" className="flex items-center ml-4 text-white hover:text-gray-400">
          <FaCamera size={20} />
          <span className="ml-2">写真</span> 
        </a>
      </div>
      </nav>
    </header>
  );
};

export default Header;