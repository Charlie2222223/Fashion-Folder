import React, { useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Title from './Title';
import Section from './components/Section';
import PrelineScript from "./components/PrelineScript";
import Explanation from "./components/Explanation";
import Gaide from "./components/Gaide";
import LoginForm from './components/LoginForm';
import User_Info from './components/user/User_Info'


const Home: React.FC = () => {
  const [isSignInFormVisible, setSignInFormVisible] = useState(false);
  const [isUserFormVisible, setUserFormVisible] = useState(false);

  return (
    <div className="flex flex-col min-h-screen space-y-8"> {/* 全体に余白を追加 */}
      <Header onUserClick={() => {
        setUserFormVisible(true);  // 状態を更新
      }} />
      <main className="flex-grow space-y-16"> {/* メイン部分に余白を追加 */}
        <Title />
        <Section />
        <Explanation />
        <Gaide onUserClick={() => {
        setSignInFormVisible(true);  // 状態を更新
        }}/>

        {isUserFormVisible && (
          <User_Info onClose={() => {
            setUserFormVisible(false);
          }} />
        )}

        {isSignInFormVisible && (
          <LoginForm onClose={() => {
            setSignInFormVisible(false);  // 状態を更新
          }} />
        )}
      </main>
      <Footer />
      <PrelineScript />
    </div>
  );
};

export default Home;