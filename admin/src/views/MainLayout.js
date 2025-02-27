// // import React, { useEffect } from "react";
// // import Navigation from "./layout/Navigation";
// // import Sidebar from "./layout/Sidebar";
// // import { Outlet } from "react-router-dom";

// // const MainLayout = () => {
// //   return (
// //     <div className="min-h-screen bg-gray-50">
// //       <Navigation />
// //       <div className="flex pt-16">
// //         <aside className="fixed left-0 top-16 h-[calc(100vh-4rem)] w-64">
// //           <Sidebar />
// //         </aside>
// //         <main className="flex-1 ml-64 p-6">
// //           <div className="max-w-7xl mx-auto">
// //             <Outlet />
// //           </div>
// //         </main>
// //       </div>
// //     </div>
// //   );
// // };

// // export default MainLayout;

// import React from "react";
// import Navigation from "./layout/Navigation";
// import Sidebar from "./layout/Sidebar";
// import { Outlet } from "react-router-dom";

// const MainLayout = () => {
//   return (
//     <div className="flex min-h-screen bg-[#F8F8F8]">
//       <aside className="fixed left-0 top-0 h-screen w-72">
//         <Sidebar />
//       </aside>
//       <div className="flex-1 ml-72">
//         {/* <header className="fixed top-0 right-0 left-[240px] bg-white z-50">
//           <Navigation />
//         </header> */}
//         <main className="pt-[12px] p-8">
//           <Outlet />
//         </main>
//       </div>
//     </div>
//   );
// };

// export default MainLayout;

import React, { useState } from "react";
import Navigation from "./layout/Navigation";
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

      {/* Toggle Button */}
      {/* <button
        onClick={() => setCollapsed(!collapsed)}
        className={`absolute top-1/2 left-[72px] -translate-y-1/2 p-2 rounded-full bg-gray-200 shadow-md hover:bg-gray-300 transition-colors ${
          collapsed ? "ml-20" : "ml-72"
        }`}
        // style={{ left: collapsed ? "20px" : "72px" }}
      >
        {collapsed ? (
          <span className="text-xl">&#8594;</span> // Right arrow when collapsed
        ) : (
          <span className="text-xl">&#8592;</span> // Left arrow when expanded
        )}
      </button> */}

      {/* Main Content */}
      <div
        className={`${
          collapsed ? "ml-20" : "ml-72"
        } flex-1 transition-all duration-300`}
        // style={{ marginLeft: collapsed ? "20px" : "72px" }}
      >
        {/* <header className="fixed top-0 right-0 left-[240px] bg-white z-50">
          <Navigation />
        </header> */}
        <main className="pt-[12px] p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
