import React from 'react';
import Layout from '../components/closet/Layout';
import ClothingRegistration from '../components/closet/registration_cloth/ClothingRegistration';

const RegisterClothesPage: React.FC = () => {
  return (
    <Layout>
      <ClothingRegistration />
    </Layout>
  );
};

export default RegisterClothesPage;