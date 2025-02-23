// import React, { useEffect } from "react";
// import Navigation from "./layout/Navigation";
// import Sidebar from "./layout/Sidebar";
// import { Outlet } from "react-router-dom";

// const MainLayout = () => {
//   return (
//     <div className="min-h-screen bg-gray-50">
//       <Navigation />
//       <div className="flex pt-16">
//         <aside className="fixed left-0 top-16 h-[calc(100vh-4rem)] w-64">
//           <Sidebar />
//         </aside>
//         <main className="flex-1 ml-64 p-6">
//           <div className="max-w-7xl mx-auto">
//             <Outlet />
//           </div>
//         </main>
//       </div>
//     </div>
//   );
// };

// export default MainLayout;

import React from "react";
import Navigation from "./layout/Navigation";
import Sidebar from "./layout/Sidebar";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <div className="flex min-h-screen bg-[#F8F8F8]">
      <aside className="fixed left-0 top-0 h-screen w-[240px]">
        <Sidebar />
      </aside>
      <div className="flex-1 pl-[240px]">
        <header className="fixed top-0 right-0 left-[240px] bg-white z-50">
          <Navigation />
        </header>
        <main className="pt-[72px] p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
