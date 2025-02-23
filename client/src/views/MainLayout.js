import React, { useEffect } from "react";
import Navigation from "../layout/Navigation";
import Sidebar from "../layout/Sidebar";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  useEffect(() => {
    const adminData = JSON.parse(localStorage.getItem("admin"));
    if (adminData && adminData.preference.mode === "dark") {
      document.body.classList.add("dark");
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navigation />
      <div className="flex pt-16">
        {/* Sidebar */}
        <aside
          className="fixed left-0 top-16 h-[calc(100vh-4rem)] w-64 
                         bg-white dark:bg-gray-800 border-r border-gray-200 
                         dark:border-gray-700 transition-all duration-300 ease-in-out
                         shadow-sm"
        >
          <Sidebar />
        </aside>

        {/* Main Content */}
        <main className="flex-1 ml-64 p-6 lg:p-8 min-h-[calc(100vh-4rem)]">
          <div className="max-w-7xl mx-auto">
            <div
              className="bg-white dark:bg-gray-800 rounded-lg shadow-sm 
                          border border-gray-200 dark:border-gray-700 p-6"
            >
              <Outlet />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
