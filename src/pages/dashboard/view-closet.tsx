import React from 'react';
import Layout from '../../components/closet/Layout';
import ClothesList from '../../components/closet/clotheslist/ClothesList';

const ViewClosetPage: React.FC = () => {
  return (
    <Layout>
      <ClothesList />
    </Layout>
  );
};

export default ViewClosetPage;