import Head from 'next/head';
import Header from './components/Herder';
import Footer from './components/Footer';
import Title from './components/Title';

const Home: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Head>
        <title>My Fashion App</title>
      </Head>
      <Header />
      <main className="flex-grow">
        <Title />
      </main>
      <Footer />
    </div>
  );
};

export default Home;