// import React, { useState } from "react";
// import { FaCreditCard } from "react-icons/fa";
// import { BsQuestionCircle } from "react-icons/bs";
// import { IoClose } from "react-icons/io5";
// import { FaTrash } from "react-icons/fa";
// import { FaUser } from "react-icons/fa";
// import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

// const Modal = ({ isOpen, onClose, title, children }) => {
//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//       <div className="bg-white rounded-lg w-full max-w-md p-6 relative">
//         <button onClick={onClose} className="absolute right-4 top-4">
//           <IoClose size={24} />
//         </button>
//         <h2 className="text-2xl font-medium mb-6">{title}</h2>
//         {children}
//       </div>
//     </div>
//   );
// };

// const PasswordInput = () => {
//   const [showPassword, setShowPassword] = useState(false);

//   return (
//     <div className="relative">
//       <label className="block mb-2">Password</label>
//       <div className="relative">
//         <input
//           type={showPassword ? "text" : "password"}
//           placeholder="Enter your password"
//           className="w-full p-3 border rounded-lg pr-10"
//         />
//         <button
//           onClick={() => setShowPassword(!showPassword)}
//           className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
//         >
//           {showPassword ? (
//             <AiOutlineEyeInvisible size={20} />
//           ) : (
//             <AiOutlineEye size={20} />
//           )}
//         </button>
//       </div>
//     </div>
//   );
// };

// const NavigationTabs = ({ activeTab, setActiveTab }) => {
//   const tabs = ["Payment Method", "Email Notification", "Delete Membership"];
//   return (
//     <div className="flex gap-2">
//       {tabs.map((tab) => (
//         <button
//           key={tab}
//           onClick={() => setActiveTab(tab)}
//           className={`px-6 py-2 rounded-lg ${
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

// const PaymentMethodSection = () => {
//   const [showAddModal, setShowAddModal] = useState(false);
//   const [showEditForm, setShowEditForm] = useState(false);

//   const AddPaymentModal = () => (
//     <Modal
//       isOpen={showAddModal}
//       onClose={() => setShowAddModal(false)}
//       title="Add Payment Method"
//     >
//       <div className="space-y-4">
//         <div>
//           <label className="block mb-2">Fullname</label>
//           <input
//             type="text"
//             defaultValue="Good Luck"
//             className="w-full p-3 border rounded-lg"
//           />
//         </div>
//         <div>
//           <label className="block mb-2">Card number</label>
//           <div className="relative">
//             <input
//               type="text"
//               defaultValue="1234 1234 1234 1234"
//               className="w-full p-3 border rounded-lg"
//             />
//             <div className="absolute right-3 top-1/2 -translate-y-1/2 flex gap-2">
//               <img src="/visa.png" alt="Visa" className="h-5" />
//               <img src="/amex.png" alt="Amex" className="h-5" />
//               <img src="/discover.png" alt="Discover" className="h-5" />
//             </div>
//           </div>
//         </div>
//         <div className="flex gap-4">
//           <div className="flex-1">
//             <label className="block mb-2">Expiration</label>
//             <input
//               type="text"
//               placeholder="MM/YY"
//               className="w-full p-3 border rounded-lg"
//             />
//           </div>
//           <div className="flex-1">
//             <label className="block mb-2">CVC</label>
//             <div className="relative">
//               <input
//                 type="text"
//                 placeholder="CVC"
//                 className="w-full p-3 border rounded-lg"
//               />
//               <BsQuestionCircle className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
//             </div>
//           </div>
//         </div>
//         <div>
//           <label className="block mb-2">Country</label>
//           <select className="w-full p-3 border rounded-lg bg-white">
//             <option>Hong Kong SAR China</option>
//           </select>
//         </div>
//         <div className="flex gap-4">
//           <div className="flex-1">
//             <label className="block mb-2">Country</label>
//             <select className="w-full p-3 border rounded-lg bg-white">
//               <option>Hong Kong SAR China</option>
//             </select>
//           </div>
//           <div className="flex-1">
//             <label className="block mb-2">Zipcode</label>
//             <input
//               type="text"
//               defaultValue="5555555"
//               className="w-full p-3 border rounded-lg"
//             />
//           </div>
//         </div>
//         <button className="w-full bg-[#540A26] text-white rounded-lg p-3 mt-4">
//           Save
//         </button>
//       </div>
//     </Modal>
//   );

//   return (
//     <div className="mt-8">
//       <div className="flex justify-between items-center">
//         <h2 className="text-[#540A26] text-xl font-medium">
//           All Payment Methods
//         </h2>
//         <div className="flex gap-2">
//           <button
//             onClick={() => setShowAddModal(true)}
//             className="px-6 py-2 bg-[#540A26] text-white rounded-lg"
//           >
//             Add
//           </button>
//           <button
//             onClick={() => setShowEditForm(!showEditForm)}
//             className="px-6 py-2 bg-[#540A26] text-white rounded-lg"
//           >
//             Edit
//           </button>
//         </div>
//       </div>

//       <div className="mt-6">
//         <div className="border rounded-lg p-4 mb-4">
//           <div className="flex items-center gap-4">
//             <input type="radio" className="w-5 h-5" checked readOnly />
//             <div className="flex items-center gap-2">
//               <FaCreditCard className="text-[#FF5F00]" size={32} />
//               <div>
//                 <p className="font-medium">Mastercard</p>
//                 <p className="text-sm text-gray-500">Ends 3456</p>
//               </div>
//             </div>
//             <span className="ml-2 text-sm text-[#540A26]">Default</span>
//           </div>
//         </div>
//       </div>

//       {showEditForm && (
//         <div className="space-y-4 mt-8">
//           <div>
//             <label className="block mb-2">Fullname</label>
//             <input
//               type="text"
//               defaultValue="Good Luck"
//               className="w-full p-3 border rounded-lg"
//             />
//           </div>
//           <div>
//             <label className="block mb-2">Card number</label>
//             <div className="relative">
//               <input
//                 type="text"
//                 defaultValue="1234 1234 1234 1234"
//                 className="w-full p-3 border rounded-lg"
//               />
//               <div className="absolute right-3 top-1/2 -translate-y-1/2 flex gap-2">
//                 <img src="/visa.png" alt="Visa" className="h-5" />
//                 <img src="/amex.png" alt="Amex" className="h-5" />
//                 <img src="/discover.png" alt="Discover" className="h-5" />
//               </div>
//             </div>
//           </div>
//           <div className="flex gap-4">
//             <div className="flex-1">
//               <label className="block mb-2">Expiration</label>
//               <input
//                 type="text"
//                 placeholder="MM/YY"
//                 className="w-full p-3 border rounded-lg"
//               />
//             </div>
//             <div className="flex-1">
//               <label className="block mb-2">CVC</label>
//               <div className="relative">
//                 <input
//                   type="text"
//                   placeholder="CVC"
//                   className="w-full p-3 border rounded-lg"
//                 />
//                 <BsQuestionCircle className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
//               </div>
//             </div>
//           </div>
//           <div>
//             <label className="block mb-2">Country</label>
//             <select className="w-full p-3 border rounded-lg bg-white">
//               <option>Hong Kong SAR China</option>
//             </select>
//           </div>
//           <div className="flex gap-4">
//             <div className="flex-1">
//               <label className="block mb-2">Country</label>
//               <select className="w-full p-3 border rounded-lg bg-white">
//                 <option>Hong Kong SAR China</option>
//               </select>
//             </div>
//             <div className="flex-1">
//               <label className="block mb-2">Zipcode</label>
//               <input
//                 type="text"
//                 defaultValue="5555555"
//                 className="w-full p-3 border rounded-lg"
//               />
//             </div>
//           </div>
//           <button className="w-full bg-[#540A26] text-white rounded-lg p-3">
//             Save
//           </button>
//         </div>
//       )}
//       <AddPaymentModal />
//     </div>
//   );
// };

// const EmailNotificationSection = () => {
//   return (
//     <div className="mt-8">
//       <div className="flex justify-between items-center mb-8">
//         <h2 className="text-xl">Email Notification</h2>
//         <label className="relative inline-flex items-center cursor-pointer">
//           <input type="checkbox" className="sr-only peer" defaultChecked />
//           <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#540A26]"></div>
//         </label>
//       </div>

//       <div className="space-y-6">
//         {["News", "New Events", "Activities", "Promotions"].map((item) => (
//           <div key={item} className="flex items-center gap-3">
//             <input
//               type="checkbox"
//               className="w-5 h-5 rounded border-gray-300"
//             />
//             <span className="text-gray-700">{item}</span>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// const DeleteMembershipSection = () => {
//   const [showDeactivateModal, setShowDeactivateModal] = useState(false);
//   const [showDeleteModal, setShowDeleteModal] = useState(false);

//   const DeactivateModal = () => (
//     <Modal
//       isOpen={showDeactivateModal}
//       onClose={() => setShowDeactivateModal(false)}
//     >
//       <div className="text-center">
//         <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center">
//           <FaUser className="text-[#540A26]" size={32} />
//         </div>
//         <h3 className="text-xl font-medium mb-2">
//           Are you sure You want to Deactivate your membership?
//         </h3>
//         <div className="mt-6">
//           <PasswordInput />
//         </div>
//         <div className="flex gap-4 mt-6">
//           <button
//             onClick={() => setShowDeactivateModal(false)}
//             className="flex-1 p-3 border border-gray-300 rounded-lg"
//           >
//             Cancel
//           </button>
//           <button className="flex-1 p-3 bg-[#540A26] text-white rounded-lg">
//             Deactivate
//           </button>
//         </div>
//       </div>
//     </Modal>
//   );

//   const DeleteModal = () => (
//     <Modal isOpen={showDeleteModal} onClose={() => setShowDeleteModal(false)}>
//       <div className="text-center">
//         <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center">
//           <FaTrash className="text-[#540A26]" size={32} />
//         </div>
//         <h3 className="text-xl font-medium mb-2">
//           Are you sure You want to Delete your membership?
//         </h3>
//         <div className="mt-6">
//           <PasswordInput />
//         </div>
//         <div className="flex gap-4 mt-6">
//           <button
//             onClick={() => setShowDeleteModal(false)}
//             className="flex-1 p-3 border border-gray-300 rounded-lg"
//           >
//             Cancel
//           </button>
//           <button className="flex-1 p-3 bg-[#540A26] text-white rounded-lg">
//             Delete
//           </button>
//         </div>
//       </div>
//     </Modal>
//   );

//   return (
//     <div className="mt-8 space-y-8">
//       <div className="flex justify-between items-start">
//         <div className="max-w-xl">
//           <h3 className="font-medium mb-2">Deactivate Membership</h3>
//           <p className="text-sm text-gray-500 leading-relaxed">
//             Deactivating your account is temporary, and it means your profile
//             will be hidden until you reactivate it by logging in.
//           </p>
//         </div>
//         <button
//           onClick={() => setShowDeactivateModal(true)}
//           className="px-4 py-2 bg-[#540A26] text-white rounded-lg"
//         >
//           Deactivate
//         </button>
//       </div>

//       <div className="flex justify-between items-start">
//         <div className="max-w-xl">
//           <h3 className="font-medium mb-2">Delete Membership</h3>
//           <p className="text-sm text-gray-500 leading-relaxed">
//             Deleting your account is permanent. When you delete your personal
//             information will permanently deleted if you'd just like to take a
//             break, you can temporarily deactivate your account.
//           </p>
//         </div>
//         <button
//           onClick={() => setShowDeleteModal(true)}
//           className="px-6 py-2 border border-gray-300 rounded-lg"
//         >
//           Delete
//         </button>
//       </div>
//       <DeactivateModal />
//       <DeleteModal />
//     </div>
//   );
// };

// const Settings = () => {
//   const [activeTab, setActiveTab] = useState("Payment Method");

//   return (
//     <div className="p-6 text-black">
//       <NavigationTabs activeTab={activeTab} setActiveTab={setActiveTab} />

//       {activeTab === "Payment Method" && <PaymentMethodSection />}
//       {activeTab === "Email Notification" && <EmailNotificationSection />}
//       {activeTab === "Delete Membership" && <DeleteMembershipSection />}
//     </div>
//   );
// };

// export default Settings;

import React, { useState } from "react";
import NavigationTabs from "./components/NavigationTabs";
import PaymentMethodSection from "./sections/PaymentMethodSection";
import EmailNotificationSection from "./sections/EmailNotificationSection";
import DeleteMembershipSection from "./sections/DeleteMembershipSection";

const Settings = () => {
  const [activeTab, setActiveTab] = useState("Payment Method");

  return (
    <div className="p-6 text-black">
      <NavigationTabs activeTab={activeTab} setActiveTab={setActiveTab} />

      {activeTab === "Payment Method" && <PaymentMethodSection />}
      {activeTab === "Email Notification" && <EmailNotificationSection />}
      {activeTab === "Delete Membership" && <DeleteMembershipSection />}
    </div>
  );
};

export default Settings;
