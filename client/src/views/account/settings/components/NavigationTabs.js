// import React from "react";

// const NavigationTabs = ({ activeTab, setActiveTab }) => {
//   const tabs = ["Payment Method", "Email Notification", "Delete Membership"];
//   return (
//     <div className="flex gap-2">
//       {tabs.map((tab) => (
//         <button
//           key={tab}
//           onClick={() => setActiveTab(tab)}
//           className={`px-6 py-2 border-2 rounded-lg ${
//             tab === activeTab
//               ? "bg-[#540A26] text-white"
//               : "bg-white text-black"
//           }`}
//         >
//           {tab}
//         </button>
//       ))}
//     </div>
//   );
// };

// export default NavigationTabs;

import React from "react";

const NavigationTabs = ({ activeTab, setActiveTab }) => {
  const tabs = ["Payment Method", "Email Notification", "Delete Membership"];
  return (
    <div className="flex flex-wrap gap-1.5 sm:gap-2">
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => setActiveTab(tab)}
          className={`px-2 sm:px-4 md:px-6 py-1.5 sm:py-2 border-2 rounded-lg text-xs sm:text-sm md:text-base ${
            tab === activeTab
              ? "bg-[#540A26] text-white"
              : "bg-white text-black"
          }`}
        >
          {tab}
        </button>
      ))}
    </div>
  );
};

export default NavigationTabs;
