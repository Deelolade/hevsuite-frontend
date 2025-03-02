// // // import React, { useState } from "react";
// // // import AccountProfile from "../views/account/profile/AccountProfile";
// // // import YourEvents from "../views/account/events/YourEvents";
// // // import SupportRequest from "../views/account/support/SupportRequest";
// // // import YourAsks from "../views/account/asks/YourAsks";
// // // import Activities from "../views/account/activity/Activities";
// // // import Settings from "../views/account/settings/Settings";
// // // import Notification from "../views/account/notifications/Notification";
// // // import Referrals from "../views/account/referral/Referrals";

// // // const ProfileModal = ({ onClose }) => {
// // //   const [activeTab, setActiveTab] = useState("Account Profile"); // Initialize with the first tab
// // //   const [cardRequest, setCardRequest] = useState({
// // //     fullName: "Good Luck",
// // //     cardType: "Standard",
// // //     disableCurrent: "No",
// // //   });

// // //   const tabs = [
// // //     "Account Profile",
// // //     "Your Events",
// // //     "Referrals",
// // //     "Support Join Request",
// // //     "Your Asks",
// // //     "Notifications",
// // //     "Activity Log",
// // //     "Settings",
// // //   ];

// // //   return (
// // //     <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
// // //       <div className="bg-white rounded-3xl w-full max-w-6xl mx-4">
// // //         <div className="max-h-[90vh] overflow-y-auto">
// // //           <div className="p-6">
// // //             {/* Header */}
// // //             <div className="flex justify-between items-center">
// // //               <div className="flex gap-2">
// // //                 {tabs.map((tab) => (
// // //                   <button
// // //                     key={tab}
// // //                     onClick={() => setActiveTab(tab)} // Set active tab on click
// // //                     className={`px-6 py-2 rounded-lg transition-colors ${
// // //                       activeTab === tab // Conditionally apply active styles
// // //                         ? "bg-[#540A26] text-white"
// // //                         : "hover:bg-gray-100 text-gray-700"
// // //                     }`}
// // //                   >
// // //                     {tab}
// // //                   </button>
// // //                 ))}
// // //               </div>
// // //               <button onClick={onClose} className="text-3xl font-light">
// // //                 ×
// // //               </button>
// // //             </div>

// // //             {/* Render Content Based on Active Tab */}
// // //             <div className="mt-8">
// // //               {activeTab === "Account Profile" && <AccountProfile />}
// // //               {activeTab === "Your Events" && <YourEvents />}
// // //               {activeTab === "Referrals" && <Referrals />}
// // //               {activeTab === "Support Join Request" && <SupportRequest />}
// // //               {activeTab === "Your Asks" && <YourAsks />}
// // //               {activeTab === "Notifications" && <Notification />}
// // //               {activeTab === "Activity Log" && <Activities />}
// // //               {activeTab === "Settings" && <Settings />}
// // //             </div>
// // //           </div>
// // //         </div>
// // //       </div>
// // //     </div>
// // //   );
// // // };

// // // export default ProfileModal;

// // import React, { useState } from "react";
// // import Modal from "react-modal";
// // import AccountProfile from "../views/account/profile/AccountProfile";
// // import YourEvents from "../views/account/events/YourEvents";
// // import SupportRequest from "../views/account/support/SupportRequest";
// // import YourAsks from "../views/account/asks/YourAsks";
// // import Activities from "../views/account/activity/Activities";
// // import Settings from "../views/account/settings/Settings";
// // import Notification from "../views/account/notifications/Notification";
// // import Referrals from "../views/account/referral/Referrals";

// // const ProfileModal = ({ onClose }) => {
// //   const [activeTab, setActiveTab] = useState("Account Profile"); // Initialize with the first tab
// //   const [cardRequest, setCardRequest] = useState({
// //     fullName: "Good Luck",
// //     cardType: "Standard",
// //     disableCurrent: "No",
// //   });

// //   const tabs = [
// //     "Account Profile",
// //     "Your Events",
// //     "Referrals",
// //     "Support Join Request",
// //     "Your Asks",
// //     "Notifications",
// //     "Activity Log",
// //     "Settings",
// //   ];

// //   const handleLogout = () => {
// //     alert("Logout functionality triggered!");
// //     onClose(); // Close the modal after logout
// //   };

// //   return (
// //     <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
// //       {/* Modal Container */}
// //       <div className="bg-white rounded-3xl w-full max-w-6xl mx-4 min-h-[200px] max-h-[90vh] overflow-y-auto">
// //         {/* Modal Header */}
// //         <div className="p-6 flex justify-between items-center">
// //           {/* Tabs */}
// //           <div className="flex gap-2 sm:gap-4 flex-wrap">
// //             {tabs.map((tab) => (
// //               <button
// //                 key={tab}
// //                 onClick={() => setActiveTab(tab)} // Set active tab on click
// //                 className={`px-4 py-2 sm:px-6 sm:py-3 rounded-lg transition-colors ${
// //                   activeTab === tab // Conditionally apply active styles
// //                     ? "bg-[#540A26] text-white"
// //                     : "hover:bg-gray-100 text-gray-700"
// //                 }`}
// //               >
// //                 {tab}
// //               </button>
// //             ))}
// //           </div>

// //           {/* Top Right Actions */}
// //           <div className="flex items-center space-x-4 sm:space-x-6">
// //             {/* Close Button */}
// //             <button
// //               onClick={onClose}
// //               className="text-xl sm:text-2xl font-light hover:text-gray-500 transition-colors"
// //             >
// //               ×
// //             </button>

// //             {/* Logout Button */}
// //             <button
// //               onClick={handleLogout}
// //               className="px-4 py-2 sm:px-6 sm:py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
// //             >
// //               Logout
// //             </button>
// //           </div>
// //         </div>

// //         {/* Tab Content */}
// //         <div className="p-6">
// //           {activeTab === "Account Profile" && <AccountProfile />}
// //           {activeTab === "Your Events" && <YourEvents />}
// //           {activeTab === "Referrals" && <Referrals />}
// //           {activeTab === "Support Join Request" && <SupportRequest />}
// //           {activeTab === "Your Asks" && <YourAsks />}
// //           {activeTab === "Notifications" && <Notification />}
// //           {activeTab === "Activity Log" && <Activities />}
// //           {activeTab === "Settings" && <Settings />}
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default ProfileModal;

// // import React, { useState } from "react";
// // import Modal from "react-modal";
// // import AccountProfile from "../views/account/profile/AccountProfile";
// // import YourEvents from "../views/account/events/YourEvents";
// // import SupportRequest from "../views/account/support/SupportRequest";
// // import YourAsks from "../views/account/asks/YourAsks";
// // import Activities from "../views/account/activity/Activities";
// // import Settings from "../views/account/settings/Settings";
// // import Notification from "../views/account/notifications/Notification";
// // import Referrals from "../views/account/referral/Referrals";

// // const ProfileModal = ({ onClose }) => {
// //   const [activeTab, setActiveTab] = useState("Account Profile");
// //   const [cardRequest, setCardRequest] = useState({
// //     fullName: "Good Luck",
// //     cardType: "Standard",
// //     disableCurrent: "No",
// //   });
// //   Modal.setAppElement("#root"); // Assuming your app is rendered in an element with id "root"

// //   const customStyles = {
// //     overlay: {
// //       backgroundColor: "rgba(0, 0, 0, 0.5)",
// //     },
// //     content: {
// //       top: "50px",
// //       left: "50px",
// //       right: "50px",
// //       bottom: "50px",
// //       transform: "translate(0%, 0%)",
// //     },
// //   };

// //   const tabs = [
// //     "Account Profile",
// //     "Your Events",
// //     "Referrals",
// //     "Support Join Request",
// //     "Your Asks",
// //     "Notifications",
// //     "Activity Log",
// //     "Settings",
// //   ];

// //   const handleLogout = () => {
// //     alert("Logout functionality triggered!");
// //     onClose();
// //   };

// //   return (
// //     <div className="fixed   translate-x-0 translate-y-0 inset-0 bg-black/50 z-50 flex items-center mt-64 p-4">
// //       {/* Modal Container */}
// //       <div className="bg-white rounded-3xl w-full  mt-96 overflow-hidden flex flex-col">
// //         {/* Modal Header with scrollable tabs */}
// //         <div className="p-4 md:p-6 border-b">
// //           <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
// //             {/* Close and Logout Buttons - Top Right on Mobile, Right Side on Desktop */}
// //             <div className="flex items-center gap-2 self-end sm:self-auto order-1 sm:order-2">
// //               <button
// //                 onClick={handleLogout}
// //                 className="px-3 py-1.5 sm:px-4 sm:py-2 bg-red-500 text-white text-sm rounded-lg hover:bg-red-600 transition-colors"
// //               >
// //                 Logout
// //               </button>
// //               <button
// //                 onClick={onClose}
// //                 className="text-xl sm:text-2xl font-light hover:text-gray-500 transition-colors"
// //               >
// //                 ×
// //               </button>
// //             </div>

// //             {/* Tabs - Scrollable on Mobile */}
// //             <div className="w-full sm:w-auto order-2 sm:order-1 overflow-x-auto pb-2 sm:pb-0 h-full">
// //               <div className="flex gap-2 min-w-max">
// //                 {tabs.map((tab) => (
// //                   <button
// //                     key={tab}
// //                     onClick={() => setActiveTab(tab)}
// //                     className={`px-3 py-1.5 sm:px-4 sm:py-2 text-sm rounded-lg whitespace-nowrap transition-colors ${
// //                       activeTab === tab
// //                         ? "bg-[#540A26] text-white"
// //                         : "hover:bg-gray-100 text-gray-700"
// //                     }`}
// //                   >
// //                     {tab}
// //                   </button>
// //                 ))}
// //               </div>
// //             </div>
// //           </div>
// //         </div>

// //         {/* Tab Content - Scrollable */}
// //         <div className="flex-1 overflow-y-auto p-4 md:p-6">
// //           {activeTab === "Account Profile" && <AccountProfile />}
// //           {activeTab === "Your Events" && <YourEvents />}
// //           {activeTab === "Referrals" && <Referrals />}
// //           {activeTab === "Support Join Request" && <SupportRequest />}
// //           {activeTab === "Your Asks" && <YourAsks />}
// //           {activeTab === "Notifications" && <Notification />}
// //           {activeTab === "Activity Log" && <Activities />}
// //           {activeTab === "Settings" && <Settings />}
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default ProfileModal;

// // import React from "react";
// // import ReactModal from "react-modal";
// // import { FaTimes } from "react-icons/fa";

// // import React, { useState } from "react";
// // import Modal from "react-modal";
// // import AccountProfile from "../views/account/profile/AccountProfile";
// // import YourEvents from "../views/account/events/YourEvents";
// // import SupportRequest from "../views/account/support/SupportRequest";
// // import YourAsks from "../views/account/asks/YourAsks";
// // import Activities from "../views/account/activity/Activities";
// // import Settings from "../views/account/settings/Settings";
// // import Notification from "../views/account/notifications/Notification";
// // import Referrals from "../views/account/referral/Referrals";

// // const ProfileModal = ({ isOpen, onClose }) => {
// //   const [activeTab, setActiveTab] = useState("Account Profile");
// //   const [cardRequest, setCardRequest] = useState({
// //     fullName: "Good Luck",
// //     cardType: "Standard",
// //     disableCurrent: "No",
// //   });
// //   const customStyles = {
// //     content: {
// //       top: "4rem",
// //       bottom: "0",
// //       left: "50%",
// //       right: "auto",
// //       marginRight: "-50%",
// //       transform: "translate(-50%, 0)",
// //       maxWidth: "480px",
// //       maxHeight: "calc(100vh - 4rem)",
// //       overflowY: "auto",
// //       padding: "20px",
// //       borderRadius: "8px",
// //       backgroundColor: "#fff",
// //       border: "none",
// //     },
// //     overlay: {
// //       backgroundColor: "rgba(0, 0, 0, 0.75)",
// //       zIndex: 1000,
// //     },
// //   };
// //   const tabs = [
// //     "Account Profile",
// //     "Your Events",
// //     "Referrals",
// //     "Support Join Request",
// //     "Your Asks",
// //     "Notifications",
// //     "Activity Log",
// //     "Settings",
// //   ];

// //   const handleLogout = () => {
// //     alert("Logout functionality triggered!");
// //     onClose();
// //   };

// //   return (
// //     // <div>
// //     //   <button
// //     //     onClick={onClose}
// //     //     className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 focus:outline-none"
// //     //   >
// //     //     <FaTimes className="w-6 h-6" />
// //     //   </button>

// //     //   {/* Modal header */}
// //     //   <h2 className="text-2xl font-bold mb-6">Profile</h2>

// //     //   {/* Profile content */}
// //     //   <div>
// //     //     {/* Profile picture */}
// //     //     <div className="flex items-center justify-center mb-6">
// //     //       <img
// //     //         src="https://via.placeholder.com/150"
// //     //         alt="Profile"
// //     //         className="w-32 h-32 rounded-full border-2 border-gray-300"
// //     //       />
// //     //     </div>

// //     //     {/* User details */}
// //     //     <div className="mb-6">
// //     //       <p className="text-lg font-semibold">Goodluck Johnson</p>
// //     //       <p className="text-gray-600">goodluck@example.com</p>
// //     //     </div>

// //     //     {/* Account information */}
// //     //     <div className="space-y-4">
// //     //       <h3 className="text-lg font-semibold">Account Information</h3>
// //     //       <div className="border-b pb-4">
// //     //         <p className="font-medium">Username:</p>
// //     //         <p>goodluck_johnson</p>
// //     //       </div>
// //     //       <div className="border-b pb-4">
// //     //         <p className="font-medium">Phone Number:</p>
// //     //         <p>+1 (123) 456-7890</p>
// //     //       </div>
// //     //       <div className="border-b pb-4">
// //     //         <p className="font-medium">Date Joined:</p>
// //     //         <p>January 1, 2023</p>
// //     //       </div>
// //     //     </div>

// //     //     {/* Settings */}
// //     //     <div className="space-y-4">
// //     //       <h3 className="text-lg font-semibold">Settings</h3>
// //     //       <div className="border-b pb-4">
// //     //         <p className="font-medium">Notifications:</p>
// //     //         <p>Email notifications are enabled.</p>
// //     //       </div>
// //     //       <div className="border-b pb-4">
// //     //         <p className="font-medium">Language:</p>
// //     //         <p>English</p>
// //     //       </div>
// //     //     </div>

// //     //     {/* Actions */}
// //     //     <div className="mt-6">
// //     //       <button className="w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-200">
// //     //         Edit Profile
// //     //       </button>
// //     //     </div>
// //     //   </div>
// //     // </div>
// //     <div className="fixed   translate-x-0 translate-y-0 inset-0 bg-black/50 z-50 flex items-center mt-64 p-4">
// //       {/* Modal Container */}
// //       <div className="bg-white rounded-3xl w-full  mt-96 overflow-hidden flex flex-col">
// //         {/* Modal Header with scrollable tabs */}
// //         <div className="p-4 md:p-6 border-b">
// //           <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
// //             {/* Close and Logout Buttons - Top Right on Mobile, Right Side on Desktop */}
// //             <div className="flex items-center gap-2 self-end sm:self-auto order-1 sm:order-2">
// //               <button
// //                 onClick={handleLogout}
// //                 className="px-3 py-1.5 sm:px-4 sm:py-2 bg-red-500 text-white text-sm rounded-lg hover:bg-red-600 transition-colors"
// //               >
// //                 Logout
// //               </button>
// //               <button
// //                 onClick={onClose}
// //                 className="text-xl sm:text-2xl font-light hover:text-gray-500 transition-colors"
// //               >
// //                 ×
// //               </button>
// //             </div>

// //             {/* Tabs - Scrollable on Mobile */}
// //             <div className="w-full sm:w-auto order-2 sm:order-1 overflow-x-auto pb-2 sm:pb-0 h-full">
// //               <div className="flex gap-2 min-w-max">
// //                 {tabs.map((tab) => (
// //                   <button
// //                     key={tab}
// //                     onClick={() => setActiveTab(tab)}
// //                     className={`px-3 py-1.5 sm:px-4 sm:py-2 text-sm rounded-lg whitespace-nowrap transition-colors ${
// //                       activeTab === tab
// //                         ? "bg-[#540A26] text-white"
// //                         : "hover:bg-gray-100 text-gray-700"
// //                     }`}
// //                   >
// //                     {tab}
// //                   </button>
// //                 ))}
// //               </div>
// //             </div>
// //           </div>
// //         </div>

// //         {/* Tab Content - Scrollable */}
// //         <div className="flex-1 overflow-y-auto p-4 md:p-6">
// //           {activeTab === "Account Profile" && <AccountProfile />}
// //           {activeTab === "Your Events" && <YourEvents />}
// //           {activeTab === "Referrals" && <Referrals />}
// //           {activeTab === "Support Join Request" && <SupportRequest />}
// //           {activeTab === "Your Asks" && <YourAsks />}
// //           {activeTab === "Notifications" && <Notification />}
// //           {activeTab === "Activity Log" && <Activities />}
// //           {activeTab === "Settings" && <Settings />}
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default ProfileModal;

// import React, { useState } from "react";
// import AccountProfile from "../views/account/profile/AccountProfile";
// import YourEvents from "../views/account/events/YourEvents";
// import SupportRequest from "../views/account/support/SupportRequest";
// import YourAsks from "../views/account/asks/YourAsks";
// import Activities from "../views/account/activity/Activities";
// import Settings from "../views/account/settings/Settings";
// import Notification from "../views/account/notifications/Notification";
// import Referrals from "../views/account/referral/Referrals";

// const ProfileModal = () => {
//   const tabs = [
//     "Account Profile",
//     "Your Events",
//     "Referrals",
//     "Support Join Request",
//     "Your Asks",
//     "Notifications",
//     "Activity Log",
//     "Settings",
//   ];

//   const [activeTab, setActiveTab] = useState(tabs[0]);

//   const handleLogout = () => {
//     console.log("Logout functionality goes here");
//     // onClose();
//   };

//   return (
//     <div className="relative bg-transparent rounded-3xl overflow-hidden">
//       <div className="p-4 md:p-6 border-b border-transparent relative">
//         <div className="absolute top-4 right-4 flex items-center gap-2">
//           <button
//             onClick={handleLogout}
//             className="px-3 py-1.5 sm:px-4 sm:py-2 bg-red-500 text-white text-sm rounded-lg hover:bg-red-600 transition-colors"
//           >
//             Logout
//           </button>
//           <button
//             // onClick={onClose}
//             className="text-xl sm:text-2xl font-light hover:text-gray-500 transition-colors"
//           >
//             ×
//           </button>
//         </div>

//         {/* Tabs - Scrollable on Mobile */}
//         <div className="w-full sm:w-auto overflow-x-auto pb-2 sm:pb-0 pt-12">
//           <div className="flex gap-2 min-w-max">
//             {tabs.map((tab) => (
//               <button
//                 key={tab}
//                 onClick={() => setActiveTab(tab)}
//                 className={`px-3 py-1.5 sm:px-4 sm:py-2 text-sm rounded-lg whitespace-nowrap w-[165px] transition-colors border border-transparent ${
//                   activeTab === tab
//                     ? "bg-[#540A26] text-white"
//                     : "hover:bg-gray-100 text-gray-700 bg-white"
//                 }`}
//               >
//                 {tab}
//               </button>
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* Tab Content - Scrollable with Hidden Scrollbar */}
//       <div
//         className="p-4 md:p-6 space-y-4 text-black bg-white rounded-t-3xl overflow-y-scroll scrollbar-hide h-[520px]"
//         //   style={{
//         //     scrollbarWidth: "none",
//         //   }}
//         // >
//         //   <style jsx>{`
//         //     .scrollbar-hide::-webkit-scrollbar {
//         //       display: none;
//         //     }
//         //   `}</style>
//         style={{
//           scrollbarWidth: "thin", // For Firefox
//         }}
//       >
//         {/* Custom scrollbar styles for WebKit-based browsers */}
//         <style jsx>{`
//           .scrollbar-hide::-webkit-scrollbar {
//             width: 8px; /* Set scrollbar width */
//             height: 8px;
//           }
//           .scrollbar-hide::-webkit-scrollbar-thumb {
//             background-color: #ccc; /* Set scrollbar thumb color */
//             border-radius: 10px;
//           }
//           .scrollbar-hide::-webkit-scrollbar-track {
//             background-color: #f0f0f0; /* Set scrollbar track color */
//           }
//         `}</style>

//         {activeTab === "Account Profile" && <AccountProfile />}
//         {activeTab === "Your Events" && <YourEvents />}
//         {activeTab === "Referrals" && <Referrals />}
//         {activeTab === "Support Join Request" && <SupportRequest />}
//         {activeTab === "Your Asks" && <YourAsks />}
//         {activeTab === "Notifications" && <Notification />}
//         {activeTab === "Activity Log" && <Activities />}
//         {activeTab === "Settings" && <Settings />}
//       </div>
//     </div>
//   );
// };
// export default ProfileModal;

import React, { useState } from "react";
import AccountProfile from "../views/account/profile/AccountProfile";
import YourEvents from "../views/account/events/YourEvents";
import SupportRequest from "../views/account/support/SupportRequest";
import YourAsks from "../views/account/asks/YourAsks";
import Activities from "../views/account/activity/Activities";
import Settings from "../views/account/settings/Settings";
import Notification from "../views/account/notifications/Notification";
import Referrals from "../views/account/referral/Referrals";

const ProfileModal = ({ onClose }) => {
  const tabs = [
    "Account Profile",
    "Your Events",
    "Referrals",
    "Support Join Request",
    "Your Asks",
    "Notifications",
    "Activity Log",
    "Settings",
  ];

  const [activeTab, setActiveTab] = useState(tabs[0]);

  const handleLogout = () => {
    console.log("Logout functionality goes here");
    if (onClose) onClose();
  };

  return (
    <div className="relative bg-transparent rounded-3xl overflow-hidden">
      <div className="p-4 md:p-6 border-b border-transparent relative">
        <div className="absolute top-4 right-4 flex items-center gap-2">
          <button
            onClick={handleLogout}
            className="px-3 py-1.5 sm:px-4 sm:py-2 bg-primary text-white text-sm rounded-lg hover:bg-red-600 transition-colors"
          >
            Logout
          </button>
          <button
            onClick={onClose}
            className="text-4xl sm:text-2xl font-light text-white hover:text-gray-500 transition-colors"
          >
            ×
          </button>
        </div>

        {/* Tabs - Scrollable on Mobile with hidden scrollbar */}
        <div className="w-full sm:w-auto overflow-x-auto pb-2 sm:pb-0 pt-12 no-scrollbar">
          <div className="flex gap-2 min-w-max">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-3 py-1.5 sm:px-4 sm:py-2 text-sm rounded-lg whitespace-nowrap w-[165px] transition-colors border border-transparent ${
                  activeTab === tab
                    ? "bg-[#540A26] text-white"
                    : "hover:bg-gray-100 text-gray-700 bg-white"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Tab Content - Scrollable with Hidden Scrollbar */}
      <div className="p-4 md:p-6 space-y-4 text-black bg-white rounded-t-3xl overflow-y-auto no-scrollbar h-[520px]">
        {/* Add global styles for hiding scrollbars */}
        <style jsx global>{`
          /* Hide scrollbar for Chrome, Safari and Opera */
          .no-scrollbar::-webkit-scrollbar {
            display: none;
          }

          /* Hide scrollbar for IE, Edge and Firefox */
          .no-scrollbar {
            -ms-overflow-style: none; /* IE and Edge */
            scrollbar-width: none; /* Firefox */
          }
        `}</style>

        {activeTab === "Account Profile" && <AccountProfile />}
        {activeTab === "Your Events" && <YourEvents />}
        {activeTab === "Referrals" && <Referrals />}
        {activeTab === "Support Join Request" && <SupportRequest />}
        {activeTab === "Your Asks" && <YourAsks />}
        {activeTab === "Notifications" && <Notification />}
        {activeTab === "Activity Log" && <Activities />}
        {activeTab === "Settings" && <Settings />}
      </div>
    </div>
  );
};

export default ProfileModal;
