import { useState, useEffect } from "react";
import { useRouter } from "next/router"; 
import { FaHome } from "react-icons/fa";

const Header: React.FC<{ onUserClick: () => void }> = ({ onUserClick }) => {
  const router = useRouter(); 
  const [userData, setUserData] = useState<any>(null);
  const avatarUrl = userData?.avatar 
  ? `${process.env.NEXT_PUBLIC_API_BASE_URL}/${userData.avatar}` 
  : '/img/Icon2.png';
  useEffect(() => {
    console.log("Header component mounted");
    console.log("Avatar URL:", avatarUrl);
  }, []);

  useEffect(() => {
    console.log("User Data:", userData);  // userDataの内容を確認
    console.log("Avatar URL:", avatarUrl); // avatarUrlの確認
  }, [userData]);

  const IconClick = () => {
    console.log("Icon clicked");
    router.push('/SignIn'); 
  };

  useEffect(() => {
    const fetchUserData = async () => {
      const authToken = localStorage.getItem('authToken');

      if (authToken) {
        try {
          const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/user`, {
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
        className="relative z-50 w-12 h-12 overflow-hidden rounded-full shadow focus:outline-none"
        onClick={onUserClick}
      >
        <img
          src={avatarUrl}
          alt="ユーザーアイコン"
          className="object-cover object-center w-full h-full" // object-centerで画像を中央揃え
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