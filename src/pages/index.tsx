import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Title from '../components/home/Title';
import Section from '../components/home/Section';
import PrelineScript from "../components/home/PrelineScript";
import Explanation from "../components/home/Explanation";
import Gaide from "../components/home/Gaide";
import LoginForm from '../components/user_auth/login/LoginForm';
import User_Info from '../components/user_auth/User_Info';
import SettingForm from '../components/user_auth/login/setting/SettingForm';

const Home: React.FC = () => {
  const [isSignInFormVisible, setSignInFormVisible] = useState(false);
  const [isUserFormVisible, setUserFormVisible] = useState(false);
  const [isSettingFormVisible, setSettingFormVisible] = useState(false);

  // ユーザーデータを保存するステート
  const [userData, setUserData] = useState<any>(null);

  // トークンを保存するステート
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    // コンポーネントがマウントされたときに、localStorageからトークンを取得してステートに設定
    const savedToken = localStorage.getItem('authToken');
    if (savedToken) {
      setToken(savedToken);
    }
  }, []);

  useEffect(() => {
    // トークンが変更されたら、localStorageに保存する
    if (token) {
      localStorage.setItem('authToken', token);
    }
  }, [token]);

  const handleLogin = (newToken: string) => {
    setToken(newToken);  // トークンをステートに保存
    setSignInFormVisible(false);  // ログインフォームを閉じる
  };

  const handleSettingClick = (userData: any) => {
    setUserData(userData);  // ユーザーデータをステートに保存
    setUserFormVisible(false);
    setSettingFormVisible(true);
  };

  return (
    <div className="flex flex-col min-h-screen space-y-8"> {/* 全体に余白を追加 */}
      <Header onUserClick={() => setUserFormVisible(!isUserFormVisible)} />
      <main className="flex-grow space-y-16"> {/* メイン部分に余白を追加 */}
        <Title />
        <Section />
        <Explanation />
        <Gaide onUserClick={() => setSignInFormVisible(true)} />

        {isUserFormVisible && (
          <User_Info 
            onUserClick={() => {
              setSignInFormVisible(true);
              setUserFormVisible(false);
            }}
            onClose={() => setUserFormVisible(false)}
            onSettingClick={handleSettingClick} // ユーザーデータを設定して設定フォームを表示
          />
        )}

        {isSignInFormVisible && (
          <LoginForm 
            onClose={() => setSignInFormVisible(false)}
          />
        )}

        {isSettingFormVisible && (
          <SettingForm 
            onClose={() => setSettingFormVisible(false)}
            userData={userData} // ユーザーデータをSettingFormに渡す
          />
        )}
      </main>
      <Footer />
      <PrelineScript />
    </div>
  );
};

export default Home;