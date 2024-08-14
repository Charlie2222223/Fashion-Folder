import Head from 'next/head';
import Header from './components/Herder';
import Footer from './components/Footer';
import Title from './components/Title';
import Section from './components/Section';
import PrelineScript from "./components/PrelineScript";
import Gaide from "./components/Gaide";

const Home: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Head>
        <title>My Fashion App</title>
      </Head>
      <Header />
      <main className="flex-grow">
        <Title />
        <Section />
        <Gaide />
      </main>
      <Footer />
      <PrelineScript />
    </div>
  );
};

export default Home;