import { useEffect } from "react";
import { useRouter } from "next/router"; 
import { FaHome, FaUserAlt } from "react-icons/fa";

const Header: React.FC<{ onUserClick: () => void }> = ({ onUserClick }) => {
  const router = useRouter(); 

  useEffect(() => {
    console.log("Header component mounted");
  }, []);

  const IconClick = () => {
    console.log("Icon clicked");
    router.push('/SignIn'); 
  };

  return (
    <header className="flex items-center justify-between p-3 text-white bg-gray-800">
      <div className="flex items-center" onClick={IconClick}>
        <img 
          className="object-cover w-16 h-16 opacity-75 cursor-pointer"  
          src="/img/Icon2.png" 
          alt="Gallery Masonry Image" 
        />
        <h1 className="ml-4 text-4xl cursor-pointer">
          Fashion Folder
        </h1>
      </div>
      <nav className="flex">
        <button 
          onClick={() => {
            onUserClick();
          }}
          className="z-20 flex items-center ml-6 text-white hover:text-gray-400"
        >
          <FaUserAlt size={28} />
          <span className="ml-3 text-lg">ユーザー</span> 
        </button>
        <div className="hidden lg:flex">
        <a href="#home" className="flex items-center ml-6 text-white hover:text-gray-400">
          <FaHome size={28} />
          <span className="ml-3 text-lg">Home</span>
        </a>
      </div>
      </nav>
    </header>
  );
};

export default Header;