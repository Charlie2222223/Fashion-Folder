import React from 'react';
import Layout from '../components/Closet/Layout';
import ClothesList from '../components/Closet/ClothesList';

const ViewClosetPage: React.FC = () => {
  return (
    <Layout>
      <ClothesList />
    </Layout>
  );
};

export default ViewClosetPage;