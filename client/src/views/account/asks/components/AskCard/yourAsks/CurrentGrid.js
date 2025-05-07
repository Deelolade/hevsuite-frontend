// import React from "react";

// export const renderCurrentGridView = (ask, activeTab) => (
//   <div className="bg-white rounded-lg p-4 shadow-sm text-[#444444]">
//     <div className="flex items-start gap-2 mb-3">
//       <input type="checkbox" className="w-5 h-5 mt-1" />
//       <div>
//         <h3 className="font-medium text-lg">{ask.title}</h3>
//         <p className="text-sm text-gray-600">{ask.description}</p>
//       </div>
//     </div>
//     <div className="flex flex-col items-center mt-4">
//       <div className="flex justify-start w-full items-center gap-4">
//         <img
//           src={ask.image}
//           alt={ask.name}
//           className="w-16 h-16 rounded-full mb-2"
//         />
//         <div>
//           <h4 className="font-medium">{ask.name}</h4>
//           <p className="text-sm text-gray-600 mb-3">{ask.date}</p>
//         </div>
//       </div>
//       {activeTab === "Accepted Asks" ? (
//         <button className="bg-red-500 text-white w-full px-6 py-2 rounded-lg">
//           Abandon
//         </button>
//       ) : (
//         <div className="flex gap-4">
//           <button className="bg-red-500 text-white px-4 py-2 rounded-lg">
//             Delete
//           </button>
//           <div className="px-4 py-2 border border-[#0E5B31] text-[#0E5B31] rounded-lg">
//             Delivered
//           </div>
//         </div>
//       )}
//     </div>
//   </div>
// );

import React from "react";
import Swal from "sweetalert2";
import { showModal } from "../../../../../../components/FireModal";
import { abandonAsk, deleteAsk, deliverAsk, fetchAcceptedAsks, fetchCurrentUserAsks } from "../../../../../../features/askSlice";
import toast from "react-hot-toast";
import { formatDateWithSuffix } from "../../../../../../utils/formatDate";

export const renderCurrentGridView = (ask, activeTab,dispatch) => (
  <div className="bg-white rounded-lg p-3 sm:p-4 shadow-sm text-[#444444]">
    <div className="flex items-start gap-2 mb-2 sm:mb-3">
      <input type="checkbox" className="w-4 h-4 sm:w-5 sm:h-5 mt-1" />
      <div>
        <h3 className="font-medium text-base sm:text-lg line-clamp-1">
          {ask.title}
        </h3>
        <p className="text-xs sm:text-sm text-gray-600 line-clamp-2">
          {ask.description}
        </p>
      </div>
    </div>
    <div className="flex flex-col items-center mt-3 sm:mt-4">
      <div className="flex justify-start w-full items-center gap-2 sm:gap-4">
        <img
          src={ask?.createdbyImage}
          alt={ask.createdByName}
          className="w-10 h-10 sm:w-16 sm:h-16 rounded-full mb-1 sm:mb-2"
        />
        <div>
          <h4 className="font-medium text-sm sm:text-base">{ask.createdByName}</h4>
          <p className="text-xs sm:text-sm text-gray-600 mb-2 sm:mb-3">
            {formatDateWithSuffix(ask.createdAt)}
          </p>
        </div>
      </div>
      {activeTab === "Accepted Asks" || ask.delivered ? (
        <button
          onClick={() =>
            showModal({
              title: "Abandon Ask?",
              text: "You have previously marked this as delivered, are you sure you want to abandon this ask?",
              confirmText: "Yes",
              onConfirm: async() => {
                try {
                  await dispatch(abandonAsk(ask._id))
                  if (activeTab === "Your Asks") {
                    dispatch(fetchCurrentUserAsks());
                  } else {
                    dispatch(fetchAcceptedAsks());
                  }
                } catch (error) {
                  toast.error(error.message || "Failed to mark as abandoned")
                }
              },
            })
          }
          className="bg-red-500 text-white w-full px-4 sm:px-6 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm"
        >
          Abandon
        </button>
      ) : (
        <div className="flex gap-2 sm:gap-4 w-full">
          <button
            onClick={() =>
              showModal({
                title: "Delete Ask?",
                message:
                  "Are you sure you want to delete this? This action can not be undone.",
                confirmText: "Yes",
                onConfirm: async() => {
                  try {
                    await dispatch(deleteAsk(ask._id))
                    if (activeTab === "Your Asks") {
                      dispatch(fetchCurrentUserAsks());
                    } else {
                      dispatch(fetchAcceptedAsks());
                    } 
                  } catch (error) {
                    toast.error(error.message || "Failed to delete")
                  }
                },
              })
            }
            className="bg-red-500 text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm flex-1"
          >
            Delete
          </button>
          <div
            onClick={() =>
              showModal({
                title: "Mark Delivered?",
                message:
                  "Are you sure you want to mark this as delivered? This action can not be undone.",
                confirmText: "Yes",
                onConfirm: async() => {
                  try {
                    await dispatch(deliverAsk(ask._id))
                    if (activeTab === "Your Asks") {
                      dispatch(fetchCurrentUserAsks());
                    } else {
                      dispatch(fetchAcceptedAsks());
                    }
                  } catch (error) {
                    toast.error(error.message || "Failed to mark as delivered")
                  }
                },
              })
            }
            className="px-3 cursor-pointer sm:px-4 py-1.5 sm:py-2 border border-[#0E5B31] text-[#0E5B31] rounded-lg text-xs sm:text-sm flex-1 text-center"
          >
            Delivered
          </div>
        </div>
      )}
    </div>
  </div>
);
