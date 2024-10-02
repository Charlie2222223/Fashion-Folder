import { useState, useEffect } from "react";
import { useRouter } from "next/router"; 
import { FaHome } from "react-icons/fa";

const Header: React.FC<{ onUserClick: () => void }> = ({ onUserClick }) => {
  const router = useRouter(); 
  const [userData, setUserData] = useState<any>(null);

  useEffect(() => {
    console.log("Header component mounted");
  }, []);

  const IconClick = () => {
    console.log("Icon clicked");
    router.push('/SignIn'); 
  };

  useEffect(() => {
    const fetchUserData = async () => {
      const authToken = localStorage.getItem('authToken');

      if (authToken) {
        try {
          const response = await fetch('http://127.0.0.1:8000/api/user', {
            headers: {
              'Authorization': `Bearer ${authToken}`
            }
          });

          if (response.ok) {
            const userData = await response.json();
            console.log('User Data:', userData);  // ここでレスポンスを確認
            setUserData(userData); // 取得したユーザーデータを状態にセット
          } else {
            console.error('Failed to fetch user data');
          }
        } catch (error) {
          console.error('Error occurred:', error);
        }
      } else {
        console.error('No token found');
      }
    };

    fetchUserData();
  }, []);

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
          className="relative z-50 block w-12 h-12 overflow-hidden rounded-full shadow focus:outline-none"
          onClick={onUserClick}
        >
          <img
            src={userData?.avatar ? `http://localhost:8000/${userData.avatar}` : 'img/Icon2.png'}
            alt="ユーザーアイコン"
            className="object-cover w-20 h-20 rounded-full"
          />
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