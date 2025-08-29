
import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-white mt-12 border-t border-gray-200">
      <div className="container mx-auto py-6 px-4 sm:px-6 lg:px-8 text-center">
        <p className="text-sm text-gray-500">
          Powered by Generative AI. &copy; {new Date().getFullYear()} AI Recipe Generator. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;