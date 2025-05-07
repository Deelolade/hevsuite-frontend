// import React from "react";

// const AcceptedListCurrent = (ask, activeTab) => (
//   <div className="flex justify-between items-center gap-4 bg-white rounded-lg p-4 text-[#444444]">
//     <div className="flex gap-8 items-center">
//       <input type="checkbox" className="w-5 h-5" />
//       <div className="">
//         <h3 className="font-medium">{ask.title}</h3>
//         <p className="text-sm text-gray-600">{ask.description}</p>
//       </div>
//     </div>
//     <div className="flex justify-between gap-4">
//       <img src={ask.image} alt={ask.name} className="w-12 h-12 rounded-full" />
//       <div>
//         <h4 className="font-medium font-primary ">{ask.name}</h4>
//         <p className="text-sm text-gray-600">{ask.date}</p>
//       </div>
//     </div>
//     {activeTab === "Accepted Asks" ? (
//       <button className="bg-red-500 text-white px-6 py-2 rounded-lg">
//         Abandon
//       </button>
//     ) : (
//       <div className="flex gap-4">
//         <button className="bg-red-500 text-white px-4 py-2 rounded-lg">
//           Delete
//         </button>
//         <div className="px-4 py-2 border border-[#0E5B31] text-[#0E5B31] rounded-lg">
//           Delivered
//         </div>
//       </div>
//     )}
//   </div>
// );

// export default AcceptedListCurrent;

import React from "react";
import Swal from "sweetalert2";
import { showModal } from "../../../../../../components/FireModal";
import { formatDateWithSuffix } from "../../../../../../utils/formatDate";
import { abandonAsk, deleteAsk, deliverAsk, fetchAcceptedAsks, fetchCurrentUserAsks } from "../../../../../../features/askSlice";
import toast from "react-hot-toast";

const AcceptedListCurrent = (ask, activeTab,dispatch) => (
  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-4 bg-white rounded-lg p-3 sm:p-4 text-[#444444]">
    <div className="flex gap-3 sm:gap-8 items-center">
      <input type="checkbox" className="w-4 h-4 sm:w-5 sm:h-5" />
      <div className="min-w-0">
        <h3 className="font-medium text-sm sm:text-base line-clamp-1">
          {ask.title}
        </h3>
        <p className="text-xs sm:text-sm text-gray-600 line-clamp-1 sm:line-clamp-2">
          {ask.description}
        </p>
      </div>
    </div>
    <div className="flex justify-between gap-2 sm:gap-4 items-center">
      <img
        src={ask?.createdbyImage}
        alt={ask.createdByName}
        className="w-8 h-8 sm:w-12 sm:h-12 rounded-full"
      />
      <div className="min-w-0">
        <h4 className="font-medium font-primary text-sm sm:text-base truncate">
          {ask.createdByName}
        </h4>
        <p className="text-xs sm:text-sm text-gray-600">{formatDateWithSuffix(ask.createdAt)}</p>
      </div>
    </div>
    {activeTab === "Accepted Asks" || ask.delivered ? (
      <div className="flex gap-2 sm:gap-4 items-end">
        <button className="bg-red-500 opacity-0 text-white px-3 sm:px-6 py-1 sm:py-2 rounded-lg text-xs sm:text-sm whitespace-nowrap">
          nul
        </button>
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
          className="bg-red-500 text-white px-3 sm:px-6 py-1 sm:py-2 rounded-lg text-xs sm:text-sm whitespace-nowrap"
        >
          Abandon
        </button>
      </div>
    ) : (
      <div className="flex gap-2 sm:gap-4">
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
          className="bg-red-500 text-white px-3 sm:px-4 py-1 sm:py-2 rounded-lg text-xs sm:text-sm whitespace-nowrap"
        >
          Delete
        </button>
        <button
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
          className="px-3 sm:px-4 py-1 sm:py-2 border border-[#0E5B31] text-[#0E5B31] rounded-lg text-xs sm:text-sm whitespace-nowrap"
        >
          Delivered
        </button>
      </div>
    )}
  </div>
);

export default AcceptedListCurrent;
