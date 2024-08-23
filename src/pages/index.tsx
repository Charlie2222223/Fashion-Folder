import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Title from './Title';
import Section from './components/Section';
import PrelineScript from "./components/PrelineScript";
import Explanation from "./components/Explanation";
import Gaide from "./components/Gaide";
import LoginForm from './login/LoginForm';
import User_Info from './components/user/User_Info';

const Home: React.FC = () => {
  const [isSignInFormVisible, setSignInFormVisible] = useState(false);
  const [isUserFormVisible, setUserFormVisible] = useState(false);

  // トークンとユーザーデータを保存するステート
  const [token, setToken] = useState<string | null>(null);
  const [userData, setUserData] = useState<any>(null);

  useEffect(() => {
    // コンポーネントがマウントされたときに、localStorageからトークンとユーザーデータを取得してステートに設定
    const savedToken = localStorage.getItem('authToken');
    const savedUserData = localStorage.getItem('userData');

    if (savedToken) {
      setToken(savedToken);
    }
    if (savedUserData) {
      setUserData(JSON.parse(savedUserData)); // JSON 文字列からオブジェクトに変換
    }
  }, []);

  useEffect(() => {
    // トークンが変更されたら、localStorageに保存する
    if (token) {
      localStorage.setItem('authToken', token);
    }
  }, [token]);

  const handleLoginSuccess = (newToken: string, newUserData: any) => {
    setToken(newToken);  // トークンをステートに保存
    setUserData(newUserData); // ユーザーデータをステートに保存
    localStorage.setItem('userData', JSON.stringify(newUserData)); // localStorageに保存
    setSignInFormVisible(false);  // ログインフォームを閉じる
  };

  const handleLogoutSuccess = () => {
    // ログアウト時にトークンとユーザーデータをクリア
    setToken(null);
    setUserData(null);
    localStorage.removeItem('authToken');
    localStorage.removeItem('userData');
    setUserFormVisible(false);
  };

  return (
    <div className="flex flex-col min-h-screen space-y-8"> {/* 全体に余白を追加 */}
      <Header onUserClick={() => {
        isUserFormVisible ? setUserFormVisible(false) : setUserFormVisible(true);
      }} />
      <main className="flex-grow space-y-16"> {/* メイン部分に余白を追加 */}
        <Title />
        <Section />
        <Explanation />
        <Gaide onUserClick={() => {
          setSignInFormVisible(true);  // 状態を更新
        }}/>

        {isUserFormVisible && (
          <User_Info 
            userData={userData}
            onUserClick={() => {
              setSignInFormVisible(true);
              setUserFormVisible(false);
            }} 
            onClose={() => {
              setUserFormVisible(false);
            }}
            onLogoutSuccess={handleLogoutSuccess} // ログアウト成功時に呼び出される
          />
        )}

        {isSignInFormVisible && (
          <LoginForm 
            onClose={() => {
              setSignInFormVisible(false);  // 状態を更新
            }}
            onLoginSuccess={handleLoginSuccess} // ログイン成功時に呼び出される
          />
        )}
      </main>
      <Footer />
      <PrelineScript />
    </div>
  );
};

export default Home;