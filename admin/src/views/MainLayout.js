import React, { useState } from "react";
import Sidebar from "./layout/Sidebar";
import { Outlet } from "react-router-dom";
import { BiMenu, BiSupport } from "react-icons/bi";
import "./layout/forced.css";

const MainLayout = () => {
  const [collapsed, setCollapsed] = useState(window.innerWidth < 800);

  return (
    <div className="flex flex-1 relative">
      {/* Sidebar */}
      <div className="md:w-72">
        <aside
          className={` fixed left-0 w-72 superZ top-0 h-screen overflow-auto nobar transition-transform duration-300 bg-white ${
            collapsed ? "-translate-x-full" : "translate-x-0"
          }`}
        >
          <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />
        </aside>
      </div>

      {/* Menu button (Only visible when sidebar is closed) */}
      {collapsed && (
        <div
          onClick={() => setCollapsed(false)}
          className="p-3 shadow-lg fixed top-2 left-1 z-50 rounded-lg  bg-red-200"
        >
          <BiMenu size={25} className="  text-black z-50 " />
        </div>
      )}

      {/* Main Content */}
      <div
        className="w-full transition-all duration-300"
        onClick={() => window.innerWidth < 800 && setCollapsed(true)}
      >
        <main className="pt-[12px] md:px-10 px-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
