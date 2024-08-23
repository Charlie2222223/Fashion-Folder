import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Title from './Title';
import Section from './components/Section';
import PrelineScript from "./components/PrelineScript";
import Explanation from "./components/Explanation";
import Gaide from "./components/Gaide";
import LoginForm from './login/LoginForm';
import User_Info from './login/User_Info'

const Home: React.FC = () => {
  const [isSignInFormVisible, setSignInFormVisible] = useState(false);
  const [isUserFormVisible, setUserFormVisible] = useState(false);

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
          <User_Info onUserClick={() => {
            setSignInFormVisible(true);
            setUserFormVisible(false);
          } } onClose={() => {
            setUserFormVisible(false)
          } } />
        )}

        {isSignInFormVisible && (
          <LoginForm 
            onClose={() => {
              setSignInFormVisible(false);  // 状態を更新
            }}
          />
        )}
      </main>
      <Footer />
      <PrelineScript />
    </div>
  );
};

export default Home;