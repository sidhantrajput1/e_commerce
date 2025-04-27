import React from 'react';
import { assets } from '../assets/assets.js';

const NavBar = ({setToken}) => {
  return (
    <div className="flex items-center justify-between py-4 px-[4%] bg-white shadow-md">
      <img
        className="w-[max(10%,80px)] max-w-[150px]"
        src={assets.logo}
        alt="Logo"
      />
      <button onClick={() => setToken('')} className="bg-gray-700 hover:bg-gray-800 text-white px-5 py-2 sm:px-7 sm:py-2 rounded-full text-xs sm:text-sm transition duration-300">
        Logout
      </button>
    </div>
  );
};

export default NavBar;
