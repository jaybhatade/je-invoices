import React, { useState } from "react";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Navbar from "./components/navbar";
import BottomNav from "./components/BottomNav";
import HomePage from "./pages/homePage";
import InvoicesPage from "./pages/InvoicesPage";
import ProfilePage from "./pages/ProfilePage";
import NewInvoicePage from "./pages/NewInvoicePage"

function App() {
  const [darkMode, setDarkMode] = useState(false);
  

  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };
  const Layout = ({ toggleTheme, darkMode }) => {
    return (
      <>
        <Navbar toggleTheme={toggleTheme} darkMode={darkMode} />
        <Outlet />
        <BottomNav />
      </>
    );
  };
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout toggleTheme={toggleTheme} darkMode={darkMode} />,
      children: [
        { index: true, element: <HomePage /> },
        { path: "invoices", element: <InvoicesPage /> },
        { path: "profile", element: <ProfilePage /> },
        { path: "new_invoice", element: <NewInvoicePage /> },

      ],
    },
  ]);

  return (
    <div className={darkMode ? "dark" : ""}>
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
        <RouterProvider router={router} />
      </div>
    </div>
  );
}

export default App;
