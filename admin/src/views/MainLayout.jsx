import React, { useState } from 'react';
import Sidebar from './layout/Sidebar';
import { Outlet, useNavigate } from 'react-router-dom';
import { BiMenu, BiSupport } from 'react-icons/bi';
import './layout/forced.css';
import useAuth from '../utils/useAuth';

const MainLayout = () => {
  const [collapsed, setCollapsed] = useState(window.innerWidth < 800);
  const [minimize, setMinimize] = useState(false);
  const { isAuthenticated, loading } = useAuth();
  const navigate = useNavigate();

  if (!isAuthenticated) {
    navigate('/');
  }

  if (loading) {
    return <div></div>;
  } else if (isAuthenticated) {
    return (
      <div className='flex flex-1 relative'>
        {/* Sidebar */}
        <div className={`${minimize ? 'md:w-20' : 'md:w-72'}`}>
          <aside
            className={` fixed left-0 ${
              minimize ? 'w-20' : 'w-72'
            } superZ top-0 h-screen overflow-auto nobar transition-transform duration-300 bg-white ${
              collapsed ? '-translate-x-full' : 'translate-x-0'
            }`}
          >
            <Sidebar
              collapsed={collapsed}
              setCollapsed={setCollapsed}
              minimize={minimize}
              setMinimize={setMinimize}
            />
          </aside>
        </div>

        {/* Menu button (Only visible when sidebar is closed) */}
        {collapsed && (
          <div
            onClick={() => setCollapsed(false)}
            className='p-3 shadow-lg fixed top-2 left-1 z-50 rounded-lg  bg-red-200'
          >
            <BiMenu size={25} className='  text-black z-50 ' />
          </div>
        )}

        {/* Main Content */}
        <div
          className='w-full transition-all duration-300'
          onClick={() => window.innerWidth < 800 && setCollapsed(true)}
        >
          <main className='pt-[12px] md:px-10 px-6'>
            <Outlet />
          </main>
        </div>
      </div>
    );
  }
};

export default MainLayout;
