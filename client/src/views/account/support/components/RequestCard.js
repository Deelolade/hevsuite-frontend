// import React, { useState } from "react";
// import { BsCheckLg, BsX } from "react-icons/bs";
// import Modal from "react-modal";

// const RequestCard = ({
//   request,
//   view,
//   index,
//   selectedRequests,
//   handleSelect,
// }) => {
//   const [isAcceptModalOpen, setIsAcceptModalOpen] = useState(false);
//   const [isDeclineModalOpen, setIsDeclineModalOpen] = useState(false);

//   const RequestDetailsModal = ({ isOpen, onClose, type }) => (
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
//       <div className="relative">
//         <div className="flex justify-between items-center mb-6">
//           <h2 className="text-xl font-semibold flex items-center gap-2">
//             <span
//               className={type === "accept" ? "text-green-500" : "text-red-500"}
//             >
//               {type === "accept" ? "✓" : "⚠"}
//             </span>
//             {type === "accept" ? "Accept Request" : "Decline Request"}
//           </h2>
//           <button
//             onClick={onClose}
//             className="text-gray-400 hover:text-gray-600"
//           >
//             ✕
//           </button>
//         </div>

//         <div className="mb-6">
//           <div className="flex items-center gap-4 mb-4">
//             <img
//               src={request.image}
//               alt={request.name}
//               className="w-16 h-16 rounded-full"
//             />
//             <div>
//               <h3 className="font-medium text-lg">{request.name}</h3>
//               <p className="text-sm text-gray-600">{request.date}</p>
//             </div>
//           </div>
//           <p className="text-gray-600">
//             Are you sure you want to {type === "accept" ? "accept" : "decline"}{" "}
//             the join request from {request.name}?
//           </p>
//         </div>

//         <div className="flex justify-end gap-3">
//           <button
//             onClick={onClose}
//             className="px-6 py-2 border rounded-lg text-sm"
//           >
//             Cancel
//           </button>
//           <button
//             onClick={() => {
//               // Add accept/decline logic here
//               onClose();
//             }}
//             className={`px-6 py-2 text-white rounded-lg text-sm ${
//               type === "accept" ? "bg-[#0E5B31]" : "bg-red-500"
//             }`}
//           >
//             {type === "accept" ? "Accept" : "Decline"}
//           </button>
//         </div>
//       </div>
//     </Modal>
//   );

//   if (view === "grid") {
//     return (
//       <>
//         <div className="bg-white rounded-lg p-4 shadow-xl relative">
//           <input
//             type="checkbox"
//             className="absolute left-4 top-4 w-5 h-5"
//             checked={selectedRequests.includes(index)}
//             onChange={() => handleSelect(index)}
//           />
//           <div className="flex flex-col items-center">
//             <img
//               src={request.image}
//               alt={request.name}
//               className="w-16 h-16 rounded-full mb-3"
//             />
//             <h3 className="font-medium text-lg text-black">{request.name}</h3>
//             <p className="text-sm text-gray-600 mb-4">{request.date}</p>
//             <div className="flex gap-2 w-full">
//               <button
//                 onClick={() => setIsAcceptModalOpen(true)}
//                 className="flex-1 bg-[#0E5B31] text-white py-2 rounded-lg flex items-center justify-center gap-1"
//               >
//                 Accept <BsCheckLg />
//               </button>
//               <button
//                 onClick={() => setIsDeclineModalOpen(true)}
//                 className="flex-1 bg-red-500 text-white py-2 rounded-lg flex items-center justify-center gap-1"
//               >
//                 Decline <BsX />
//               </button>
//             </div>
//           </div>
//         </div>

//         <RequestDetailsModal
//           isOpen={isAcceptModalOpen}
//           onClose={() => setIsAcceptModalOpen(false)}
//           type="accept"
//         />
//         <RequestDetailsModal
//           isOpen={isDeclineModalOpen}
//           onClose={() => setIsDeclineModalOpen(false)}
//           type="decline"
//         />
//       </>
//     );
//   }

//   return (
//     <>
//       <div className="flex items-center gap-4 bg-white rounded-lg p-3">
//         <input
//           type="checkbox"
//           className="w-5 h-5"
//           checked={selectedRequests.includes(index)}
//           onChange={() => handleSelect(index)}
//         />
//         <img
//           src={request.image}
//           alt={request.name}
//           className="w-12 h-12 rounded-full"
//         />
//         <div className="flex-grow">
//           <h3 className="font-medium">{request.name}</h3>
//           <p className="text-sm text-gray-600">{request.date}</p>
//         </div>
//         <div className="flex gap-2">
//           <button
//             onClick={() => setIsAcceptModalOpen(true)}
//             className="bg-[#0E5B31] text-white px-4 py-2 rounded-lg flex items-center gap-1"
//           >
//             Accept <BsCheckLg />
//           </button>
//           <button
//             onClick={() => setIsDeclineModalOpen(true)}
//             className="bg-red-500 text-white px-4 py-2 rounded-lg flex items-center gap-1"
//           >
//             Decline <BsX />
//           </button>
//         </div>
//       </div>

//       <RequestDetailsModal
//         isOpen={isAcceptModalOpen}
//         onClose={() => setIsAcceptModalOpen(false)}
//         type="accept"
//       />
//       <RequestDetailsModal
//         isOpen={isDeclineModalOpen}
//         onClose={() => setIsDeclineModalOpen(false)}
//         type="decline"
//       />
//     </>
//   );
// };

// export default RequestCard;

import React, { useState } from "react";
import { BsCheckLg, BsX } from "react-icons/bs";
import Modal from "react-modal";

const RequestCard = ({
  request,
  view,
  index,
  selectedRequests,
  handleSelect,
}) => {
  const [isAcceptModalOpen, setIsAcceptModalOpen] = useState(false);
  const [isDeclineModalOpen, setIsDeclineModalOpen] = useState(false);

  const RequestDetailsModal = ({ isOpen, onClose, type }) => (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg p-4 sm:p-6 w-[90%] max-w-[500px]"
      overlayClassName="fixed inset-0 bg-black bg-opacity-50"
      style={{
        overlay: { zIndex: 1000 },
        content: { zIndex: 1001 },
      }}
    >
      <div className="relative">
        <div className="flex justify-between items-center mb-4 sm:mb-6">
          <h2 className="text-lg sm:text-xl font-semibold flex items-center gap-2">
            <span
              className={type === "accept" ? "text-green-500" : "text-red-500"}
            >
              {type === "accept" ? "✓" : "⚠"}
            </span>
            {type === "accept" ? "Accept Request" : "Decline Request"}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            ✕
          </button>
        </div>

        <div className="mb-4 sm:mb-6">
          <div className="flex items-center gap-3 sm:gap-4 mb-3 sm:mb-4">
            <img
              src={request.image}
              alt={request.name}
              className="w-12 h-12 sm:w-16 sm:h-16 rounded-full"
            />
            <div>
              <h3 className="font-medium text-base sm:text-lg">
                {request.name}
              </h3>
              <p className="text-xs sm:text-sm text-gray-600">{request.date}</p>
            </div>
          </div>
          <p className="text-sm sm:text-base text-gray-600">
            Are you sure you want to {type === "accept" ? "accept" : "decline"}{" "}
            the join request from {request.name}?
          </p>
        </div>

        <div className="flex justify-end gap-2 sm:gap-3">
          <button
            onClick={onClose}
            className="px-4 sm:px-6 py-1.5 sm:py-2 border rounded-lg text-xs sm:text-sm"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              // Add accept/decline logic here
              onClose();
            }}
            className={`px-4 sm:px-6 py-1.5 sm:py-2 text-white rounded-lg text-xs sm:text-sm ${
              type === "accept" ? "bg-[#0E5B31]" : "bg-red-500"
            }`}
          >
            {type === "accept" ? "Accept" : "Decline"}
          </button>
        </div>
      </div>
    </Modal>
  );

  if (view === "grid") {
    return (
      <>
        <div className="bg-white rounded-lg p-3 sm:p-4 shadow-md sm:shadow-xl relative">
          <input
            type="checkbox"
            className="absolute left-3 sm:left-4 top-3 sm:top-4 w-4 h-4 sm:w-5 sm:h-5"
            checked={selectedRequests.includes(index)}
            onChange={() => handleSelect(index)}
          />
          <div className="flex flex-col items-center">
            <img
              src={request.image}
              alt={request.name}
              className="w-12 h-12 sm:w-16 sm:h-16 rounded-full mb-2 sm:mb-3"
            />
            <h3 className="font-medium text-base sm:text-lg text-black">
              {request.name}
            </h3>
            <p className="text-xs sm:text-sm text-gray-600 mb-3 sm:mb-4">
              {request.date}
            </p>
            <div className="flex gap-2 w-full">
              <button
                onClick={() => setIsAcceptModalOpen(true)}
                className="flex-1 bg-[#0E5B31] text-white py-1.5 sm:py-2 rounded-lg flex items-center justify-center gap-1 text-xs sm:text-sm"
              >
                Accept <BsCheckLg size={12} className="sm:w-4 sm:h-4" />
              </button>
              <button
                onClick={() => setIsDeclineModalOpen(true)}
                className="flex-1 bg-red-500 text-white py-1.5 sm:py-2 rounded-lg flex items-center justify-center gap-1 text-xs sm:text-sm"
              >
                Decline <BsX size={12} className="sm:w-4 sm:h-4" />
              </button>
            </div>
          </div>
        </div>

        <RequestDetailsModal
          isOpen={isAcceptModalOpen}
          onClose={() => setIsAcceptModalOpen(false)}
          type="accept"
        />
        <RequestDetailsModal
          isOpen={isDeclineModalOpen}
          onClose={() => setIsDeclineModalOpen(false)}
          type="decline"
        />
      </>
    );
  }

  return (
    <>
      <div className="flex items-center gap-2 sm:gap-4 bg-white rounded-lg p-2 sm:p-3">
        <input
          type="checkbox"
          className="w-4 h-4 sm:w-5 sm:h-5"
          checked={selectedRequests.includes(index)}
          onChange={() => handleSelect(index)}
        />
        <img
          src={request.image}
          alt={request.name}
          className="w-10 h-10 sm:w-12 sm:h-12 rounded-full"
        />
        <div className="flex-grow min-w-0">
          <h3 className="font-medium text-sm sm:text-base truncate">
            {request.name}
          </h3>
          <p className="text-xs sm:text-sm text-gray-600">{request.date}</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-1 sm:gap-2">
          <button
            onClick={() => setIsAcceptModalOpen(true)}
            className="bg-[#0E5B31] text-white px-2 sm:px-4 py-1 sm:py-2 rounded-lg flex items-center justify-center gap-1 text-xs sm:text-sm whitespace-nowrap"
          >
            Accept <BsCheckLg size={12} className="sm:w-4 sm:h-4" />
          </button>
          <button
            onClick={() => setIsDeclineModalOpen(true)}
            className="bg-red-500 text-white px-2 sm:px-4 py-1 sm:py-2 rounded-lg flex items-center justify-center gap-1 text-xs sm:text-sm whitespace-nowrap"
          >
            Decline <BsX size={12} className="sm:w-4 sm:h-4" />
          </button>
        </div>
      </div>

      <RequestDetailsModal
        isOpen={isAcceptModalOpen}
        onClose={() => setIsAcceptModalOpen(false)}
        type="accept"
      />
      <RequestDetailsModal
        isOpen={isDeclineModalOpen}
        onClose={() => setIsDeclineModalOpen(false)}
        type="decline"
      />
    </>
  );
};

export default RequestCard;
