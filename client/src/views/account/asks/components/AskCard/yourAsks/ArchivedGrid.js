// import React from "react";

// export const renderArchivedGridView = (ask) => (
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
//       <div className="w-full text-center py-2 border border-[#0E5B31] text-[#0E5B31] rounded-lg">
//         Delivered
//       </div>
//     </div>
//   </div>
// );

import React from "react";
import Swal from "sweetalert2";
import { showModal } from "../../../../../../components/FireModal";
import { deleteAsk, fetchAcceptedAsks, fetchCurrentUserAsks } from "../../../../../../features/askSlice";
import toast from "react-hot-toast";
import { formatDateWithSuffix } from "../../../../../../utils/formatDate";

export const renderArchivedGridView = (ask, dispatch) => (
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
      <div
        onClick={() =>
          showModal({
            title: "Delete Ask?",
            message:
              "Are you sure you want to delete this? This action can not be undone.",
            confirmText: "Yes",
            onConfirm: async () => {
              try {
                await dispatch(deleteAsk(ask._id))
                dispatch(fetchCurrentUserAsks());

              } catch (error) {
                toast.error(error.message || "Failed to delete")
              }
            },
          })
        }
        className="w-full cursor-pointer text-center py-1.5 sm:py-2 border border-[#0E5B31] text-[#0E5B31] rounded-lg text-xs sm:text-sm"
      >
        Delivered
      </div>
    </div>
  </div>
);
