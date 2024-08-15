import React, { useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Title from './Title';
import Section from './components/Section';
import PrelineScript from "./components/PrelineScript";
import Explanation from "./components/Explanation";
import Gaide from "./components/Gaide";
import SignInForm from './components/SignInForm';

const Home: React.FC = () => {
  const [isSignInFormVisible, setSignInFormVisible] = useState(false);
  console.log("Home component rendered");
  console.log("isSignInFormVisible state:", isSignInFormVisible);

  return (
    <div className="flex flex-col min-h-screen space-y-8"> {/* 全体に余白を追加 */}
      <Header onUserClick={() => {
        console.log("Setting form visibility to true");
        setSignInFormVisible(true);  // 状態を更新
      }} />
      <main className="flex-grow space-y-16"> {/* メイン部分に余白を追加 */}
        <Title />
        <Section />
        <Explanation />
        <Gaide />
        {isSignInFormVisible && (
          <SignInForm onClose={() => {
            console.log("Closing the sign-in form");
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