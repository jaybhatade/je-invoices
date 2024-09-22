import React from "react";
import { FiSun, FiMoon } from "react-icons/fi";

const Navbar = ({ toggleTheme, darkMode }) => {
  return (
    <nav className="p-4 flex justify-between items-center bg-white dark:bg-gray-800 shadow-md">
      <h1 className="text-2xl font-bold">Invoicing App</h1>
      <button
        className="text-xl p-2 bg-gray-200 dark:bg-gray-700 rounded-full"
        onClick={toggleTheme}
      >
        {darkMode ? <FiSun /> : <FiMoon />}
      </button>
    </nav>
  );
};

export default Navbar;
