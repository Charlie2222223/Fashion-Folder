import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="p-4 mt-8 text-white bg-gray-800">
      <div className="container flex flex-col items-center mx-auto">
        <div className="flex mb-4 space-x-6">
          <a href="#about" className="hover:text-gray-400">About</a>
          <a href="#contact" className="hover:text-gray-400">Contact</a>
          <a href="#privacy" className="hover:text-gray-400">Privacy Policy</a>
        </div>
        <div className="text-sm">
          &copy; 2024 My Fashion App. All rights reserv.
        </div>
      </div>
    </footer>
  );
};

export default Footer;