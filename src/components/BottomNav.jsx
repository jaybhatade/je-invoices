import React, { useState } from "react";
import { FiHome, FiFileText, FiUser } from "react-icons/fi";
import { Link, useLocation } from "react-router-dom";

const BottomNav = () => {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState(location.pathname);

  const handleTabClick = (path) => {
    setActiveTab(path);
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 shadow-md border-t dark:border-gray-700">
      <div className="flex justify-around py-3">
        {/* Home Tab */}
        <Link
          to="/"
          onClick={() => handleTabClick("/")}
          className={activeTab === "/" ? "text-blue-500" : "text-gray-500"}
        >
          <div className="flex flex-col items-center cursor-pointer">
            <FiHome className="text-2xl" />
            <span className="text-sm">Home</span>
          </div>
        </Link>

        {/* Invoices Tab */}
        <Link
          to="/invoices"
          onClick={() => handleTabClick("/invoices")}
          className={activeTab === "/invoices" ? "text-blue-500" : "text-gray-500"}
        >
          <div className="flex flex-col items-center cursor-pointer">
            <FiFileText className="text-2xl" />
            <span className="text-sm">Invoices</span>
          </div>
        </Link>

        {/* Profile Tab */}
        <Link
          to="/profile"
          onClick={() => handleTabClick("/profile")}
          className={activeTab === "/profile" ? "text-blue-500" : "text-gray-500"}
        >
          <div className="flex flex-col items-center cursor-pointer">
            <FiUser className="text-2xl" />
            <span className="text-sm">Profile</span>
          </div>
        </Link>
      </div>
    </nav>
  );
};

export default BottomNav;
