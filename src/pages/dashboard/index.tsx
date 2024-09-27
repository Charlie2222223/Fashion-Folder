// pages/dashboard/index.tsx

import React from 'react';
import Layout from '../components/Closet/Layout';
import ClothingRegistration from '../components/Closet/ClothingRegistration';

const DashboardHome: React.FC = () => {
  return (
    <Layout>
      <ClothingRegistration />
    </Layout>
  );
};

export default DashboardHome;