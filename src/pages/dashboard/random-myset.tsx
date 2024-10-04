import React from 'react';
import Layout from '../components/closet/Layout';
import ClothingRegistration from '../components/closet/randomsetup/RandomSetup';
import RandomSetup from '../components/closet/randomsetup/RandomSetup';

const RegisterClothesPage: React.FC = () => {
  return (
    <Layout>
      <RandomSetup />
    </Layout>
  );
};

export default RegisterClothesPage;