import { GetServerSideProps } from 'next';

export const getServerSideProps: GetServerSideProps = async (context) => {
  return {
    redirect: {
      destination: 'http://localhost:8000/auth/google',
      permanent: false,
    },
  };
};

const GoogleAuthRedirectPage = () => {
  return null; // このページには内容はありません
};

export default GoogleAuthRedirectPage;