// import React, { useState } from "react";
// import Modal from "react-modal";
// import { IoClose } from "react-icons/io5";
// import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
// import avatar from "../../../assets/user.avif";
// import SuccessfulReferrals from "./SuccessfulReferrals";
// import PendingReferrals from "./PendingReferrals";
// import CancelledReferrals from "./CancelledReferrals";

// // Set the app element for accessibility
// Modal.setAppElement("#root");

// // Navigation Tabs Component
// const NavigationTabs = ({ activeTab, setActiveTab }) => {
//   const tabs = [
//     "Successful Referrals",
//     "Pending Referrals",
//     "Cancelled Referrals",
//   ];
//   return (
//     <div className="flex gap-2 mb-6">
//       {tabs.map((tab) => (
//         <button
//           key={tab}
//           onClick={() => setActiveTab(tab)}
//           className={`px-6 py-2 rounded-lg transition-colors ${
//             tab === activeTab
//               ? "bg-[#540A26] text-white"
//               : "bg-white text-black hover:bg-gray-100"
//           }`}
//         >
//           {tab}
//         </button>
//       ))}
//     </div>
//   );
// };

// // Referral List Item Component
// const ReferralItem = ({ referral, activeTab }) => {
//   return (
//     <div className="flex items-center justify-between py-3">
//       <div className="flex items-center gap-4">
//         <img
//           src={referral.image}
//           alt={referral.name}
//           className="w-12 h-12 rounded-full object-cover"
//         />
//         <div>
//           <h3 className="font-medium text-black font-primary">
//             {referral.name}
//           </h3>
//           <p className="text-sm text-gray-600  font-primary">{referral.date}</p>
//         </div>
//       </div>
//       {activeTab === "Successful Referrals" ? (
//         <div className="bg-white text-black shadow-lg font-primary rounded-lg px-12 py-2">
//           {referral.relationship}
//         </div>
//       ) : activeTab === "Pending Referrals" ? (
//         <button className="bg-red-500 text-white px-4 py-2 rounded-lg flex items-center gap-2">
//           Cancel Referral <IoClose />
//         </button>
//       ) : (
//         <div className="text-gray-400 px-4 py-2 rounded-lg flex items-center gap-2">
//           Cancelled Referral <IoClose />
//         </div>
//       )}
//     </div>
//   );
// };

// // Pagination Component
// const Pagination = () => {
//   return (
//     <div className="flex justify-center items-center gap-4 mt-8">
//       <button className="text-gray-400 hover:text-gray-600">
//         <BsChevronLeft size={20} />
//       </button>
//       <div className="flex gap-2">
//         {[1, 2, 3, 4, 5].map((dot, index) => (
//           <button
//             key={dot}
//             className={`w-2 h-2 rounded-full ${
//               index === 0 ? "bg-[#540A26]" : "bg-gray-300"
//             }`}
//           />
//         ))}
//       </div>
//       <button className="text-gray-400 hover:text-gray-600">
//         <BsChevronRight size={20} />
//       </button>
//     </div>
//   );
// };

// // Send Referral Modal Component
// const SendReferralModal = ({ isOpen, onClose }) => {
//   return (
//     <Modal
//       isOpen={isOpen}
//       onRequestClose={onClose}
//       className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg p-6 w-[500px]"
//       overlayClassName="fixed inset-0 bg-black bg-opacity-50"
//       style={{
//         overlay: { zIndex: 1000 },
//         content: { zIndex: 1001 },
//       }}
//     >
//       <div className="flex justify-between items-center mb-6">
//         <h2 className="text-xl font-semibold">Send Referrals</h2>
//         <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
//           <IoClose size={24} />
//         </button>
//       </div>

//       <div className="space-y-4">
//         <div>
//           <label className="block mb-2">Prospect Name</label>
//           <div className="flex gap-4">
//             <input
//               type="text"
//               placeholder="First Name"
//               className="w-1/2 px-4 py-2 rounded-lg bg-gray-50"
//             />
//             <input
//               type="text"
//               placeholder="Last Name"
//               className="w-1/2 px-4 py-2 rounded-lg bg-gray-50"
//             />
//           </div>
//         </div>

//         <div>
//           <label className="block mb-2">Relationship</label>
//           <select className="w-full px-4 py-2 rounded-lg bg-gray-50">
//             <option value="">Select Your Relationship with them</option>
//             <option value="friend">Friend</option>
//             <option value="family">Family</option>
//             <option value="coworker">Co-Worker</option>
//             <option value="acquaintance">Acquaintance</option>
//             <option value="stranger">Stranger</option>
//           </select>
//         </div>

//         <div>
//           <label className="block mb-2">Email</label>
//           <input
//             type="email"
//             placeholder="Enter prospect email"
//             className="w-full px-4 py-2 rounded-lg bg-gray-50"
//           />
//         </div>
//       </div>

//       <div className="flex justify-end gap-4 mt-6">
//         <button
//           onClick={onClose}
//           className="px-6 py-2 rounded-lg border border-gray-200 hover:bg-gray-50"
//         >
//           Cancel
//         </button>
//         <button className="px-6 py-2 rounded-lg bg-[#540A26] text-white hover:bg-[#4a0921]">
//           Send
//         </button>
//       </div>
//     </Modal>
//   );
// };

// // Main Referrals Component
// const Referrals = () => {
//   const [activeTab, setActiveTab] = useState("Successful Referrals");
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   const successReferrals = Array(8).fill({
//     name: "Matt Hardy",
//     date: "2nd Dec., 2025",
//     image: avatar,
//     relationship: "Friend",
//   });

//   const pendingReferrals = Array(8).fill({
//     name: "Matt Hardy",
//     date: "2nd Dec., 2025",
//     image: avatar,
//     relationship: "Friend",
//   });

//   const cancelledReferrals = Array(8).fill({
//     name: "Matt Hardy",
//     date: "2nd Dec., 2025",
//     image: avatar,
//     relationship: "Friend",
//   });

//   return (
//     <div className="p-4">
//       <div className="flex justify-between items-center mb-6">
//         <NavigationTabs activeTab={activeTab} setActiveTab={setActiveTab} />
//         <button
//           onClick={() => setIsModalOpen(true)}
//           className="px-6 py-2 rounded-lg bg-[#540A26] text-white flex items-center gap-2"
//         >
//           Send Referral
//         </button>
//       </div>

//       <div className="space-y-2">
//         <div className="flex justify-between px-4 mb-2">
//           <span className="text-lg text-black font-primary">Name</span>
//           <span className="text-lg text-black font-primary">Relationship</span>
//         </div>
//         {activeTab === "Successful Referrals" && (
//           <SuccessfulReferrals referrals={successReferrals} />
//         )}
//         {activeTab === "Pending Referrals" && (
//           <PendingReferrals referrals={pendingReferrals} />
//         )}
//         {activeTab === "Cancelled Referrals" && (
//           <CancelledReferrals referrals={cancelledReferrals} />
//         )}
//       </div>

//       <Pagination />

//       <SendReferralModal
//         isOpen={isModalOpen}
//         onClose={() => setIsModalOpen(false)}
//       />
//     </div>
//   );
// };

// export default Referrals;

import React, { useState } from "react";
import Modal from "react-modal";
import { IoClose } from "react-icons/io5";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import avatar from "../../../assets/user.avif";
import SuccessfulReferrals from "./SuccessfulReferrals";
import PendingReferrals from "./PendingReferrals";
import CancelledReferrals from "./CancelledReferrals";

// Set the app element for accessibility
Modal.setAppElement("#root");

// Navigation Tabs Component
const NavigationTabs = ({ activeTab, setActiveTab }) => {
  const tabs = [
    "Successful Referrals",
    "Pending Referrals",
    "Cancelled Referrals",
  ];
  return (
    <div className="flex flex-wrap gap-2 mb-4 sm:mb-6">
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => setActiveTab(tab)}
          className={`px-3 sm:px-6 py-1.5 sm:py-2 rounded-lg transition-colors text-xs sm:text-sm ${
            tab === activeTab
              ? "bg-[#540A26] text-white"
              : "bg-white text-black hover:bg-gray-100"
          }`}
        >
          {tab}
        </button>
      ))}
    </div>
  );
};

// Pagination Component
const Pagination = () => {
  return (
    <div className="flex justify-center items-center gap-3 sm:gap-4 mt-6 sm:mt-8">
      <button className="text-gray-400 hover:text-gray-600 p-1 sm:p-2">
        <BsChevronLeft size={16} className="sm:w-5 sm:h-5" />
      </button>
      <div className="flex gap-1.5 sm:gap-2">
        {[1, 2, 3, 4, 5].map((dot, index) => (
          <button
            key={dot}
            className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full ${
              index === 0 ? "bg-[#540A26]" : "bg-gray-300"
            }`}
          />
        ))}
      </div>
      <button className="text-gray-400 hover:text-gray-600 p-1 sm:p-2">
        <BsChevronRight size={16} className="sm:w-5 sm:h-5" />
      </button>
    </div>
  );
};

// Send Referral Modal Component
const SendReferralModal = ({ isOpen, onClose }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg p-4 sm:p-6 w-[90%] max-w-[500px] max-h-[90vh] overflow-y-auto"
      overlayClassName="fixed inset-0 bg-black bg-opacity-50"
      style={{
        overlay: { zIndex: 1000 },
        content: { zIndex: 1001 },
      }}
    >
      <div className="flex justify-between items-center mb-4 sm:mb-6">
        <h2 className="text-lg sm:text-xl font-semibold">Send Referrals</h2>
        <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
          <IoClose size={20} className="sm:w-6 sm:h-6" />
        </button>
      </div>

      <div className="space-y-3 sm:space-y-4">
        <div>
          <label className="block mb-1 sm:mb-2 text-sm sm:text-base">
            Prospect Name
          </label>
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
            <input
              type="text"
              placeholder="First Name"
              className="w-full sm:w-1/2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg bg-gray-50 text-sm"
            />
            <input
              type="text"
              placeholder="Last Name"
              className="w-full sm:w-1/2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg bg-gray-50 text-sm"
            />
          </div>
        </div>

        <div>
          <label className="block mb-1 sm:mb-2 text-sm sm:text-base">
            Relationship
          </label>
          <select className="w-full px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg bg-gray-50 text-sm">
            <option value="">Select Your Relationship with them</option>
            <option value="friend">Friend</option>
            <option value="family">Family</option>
            <option value="coworker">Co-Worker</option>
            <option value="acquaintance">Acquaintance</option>
            <option value="stranger">Stranger</option>
          </select>
        </div>

        <div>
          <label className="block mb-1 sm:mb-2 text-sm sm:text-base">
            Email
          </label>
          <input
            type="email"
            placeholder="Enter prospect email"
            className="w-full px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg bg-gray-50 text-sm"
          />
        </div>
      </div>

      <div className="flex justify-end gap-2 sm:gap-4 mt-4 sm:mt-6">
        <button
          onClick={onClose}
          className="px-4 sm:px-6 py-1.5 sm:py-2 rounded-lg border border-gray-200 hover:bg-gray-50 text-xs sm:text-sm"
        >
          Cancel
        </button>
        <button className="px-4 sm:px-6 py-1.5 sm:py-2 rounded-lg bg-[#540A26] text-white hover:bg-[#4a0921] text-xs sm:text-sm">
          Send
        </button>
      </div>
    </Modal>
  );
};

// Main Referrals Component
const Referrals = () => {
  const [activeTab, setActiveTab] = useState("Successful Referrals");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const successReferrals = Array(8).fill({
    name: "Matt Hardy",
    date: "2nd Dec., 2025",
    image: avatar,
    relationship: "Friend",
  });

  const pendingReferrals = Array(8).fill({
    name: "Matt Hardy",
    date: "2nd Dec., 2025",
    image: avatar,
    relationship: "Friend",
  });

  const cancelledReferrals = Array(8).fill({
    name: "Matt Hardy",
    date: "2nd Dec., 2025",
    image: avatar,
    relationship: "Friend",
  });

  return (
    <div className="p-2 sm:p-4">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-0 mb-4 sm:mb-6">
        <NavigationTabs activeTab={activeTab} setActiveTab={setActiveTab} />
        <button
          onClick={() => setIsModalOpen(true)}
          className="px-4 sm:px-6 py-1.5 sm:py-2 rounded-lg bg-[#540A26] text-white flex items-center gap-1 sm:gap-2 text-xs sm:text-sm"
        >
          Send Referral
        </button>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between px-2 sm:px-4 mb-2">
          <span className="text-base sm:text-lg text-black font-primary">
            Name
          </span>
          <span className="text-base sm:text-lg text-black font-primary">
            Relationship
          </span>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-2 sm:p-4">
          {activeTab === "Successful Referrals" && (
            <SuccessfulReferrals referrals={successReferrals} />
          )}
          {activeTab === "Pending Referrals" && (
            <PendingReferrals referrals={pendingReferrals} />
          )}
          {activeTab === "Cancelled Referrals" && (
            <CancelledReferrals referrals={cancelledReferrals} />
          )}
        </div>
      </div>

      <Pagination />

      <SendReferralModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default Referrals;
