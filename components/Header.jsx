
import React from 'react';

const Header = () => {
  return (
    <header className="bg-white shadow-md border-b border-gray-200">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center h-20">
          <div className="flex items-center space-x-3">
            <svg className="h-10 w-10 text-emerald-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v11.494m-5.247-8.991l10.494 0M12 21.747a9.75 9.75 0 110-19.5 9.75 9.75 0 010 19.5z" />
            </svg>
            <h1 className="text-3xl font-extrabold text-gray-800 tracking-tight">
              AI Recipe Generator
            </h1>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;