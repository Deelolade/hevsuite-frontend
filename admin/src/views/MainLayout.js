import React, { useState } from "react";
import Sidebar from "./layout/Sidebar";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="flex min-h-screen bg-[#F8F8F8]">
      {/* Sidebar */}
      <aside
        className={`fixed top-0 h-screen transition-width duration-300 ${
          collapsed ? "w-20" : "w-72"
        }`}
      >
        <Sidebar collapsed={collapsed} />
      </aside>

      {/* Main Content */}
      <div
        className={`${
          collapsed ? "ml-20" : "ml-72"
        } flex-1 transition-all duration-300`}
      >
        <main className="pt-[12px] p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
