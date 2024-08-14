import Head from 'next/head';
import Herder from './components/Herder';
import Footer from './components/Footer';
import Title from './Title';
import Section from './components/Section';
import PrelineScript from "./components/PrelineScript";
import Explanation from "./components/Explanation";
import Gaide from "./components/Gaide";


const Home: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Head>
        <title>My Fashion App</title>
      </Head>
      <Herder />
      <main className="flex-grow">
        <Title />
        <Section />
        <Explanation />
        <Gaide />
      </main>
      <Footer />
      <PrelineScript />
    </div>
  );
};

export default Home;