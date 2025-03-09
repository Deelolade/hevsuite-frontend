// import React from "react";

// const AcceptedListArchived = (ask) => (
//   <div className="flex items-center justify-between gap-4 bg-white rounded-lg p-4 text-[#444444]">
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
//     <div className="px-4 py-2 border border-[#0E5B31] text-[#0E5B31] rounded-lg">
//       Delivered
//     </div>
//   </div>
// );

// export default AcceptedListArchived;

import React from "react";
import Swal from "sweetalert2";

const AcceptedListArchived = (ask) => (
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
        src={ask.image}
        alt={ask.name}
        className="w-8 h-8 sm:w-12 sm:h-12 rounded-full"
      />
      <div className="min-w-0">
        <h4 className="font-medium font-primary text-sm sm:text-base truncate">
          {ask.name}
        </h4>
        <p className="text-xs sm:text-sm text-gray-600">{ask.date}</p>
      </div>
    </div>
    <div
      onClick={() =>
        Swal.fire({
          title: "Mark Delivered?",
          text: "Are you sure you want to mark this as delivered? This action can not be undone.",
          imageUrl: "/logo_white.png", // Change this to your image path
          imageWidth: 70,
          imageHeight: 70,
          showCancelButton: true,
          confirmButtonText: "Yes",
          cancelButtonText: "No",
          confirmButtonColor: "#0E5B31",
          cancelButtonColor: "gray",
        })
      }
      className="px-3 cursor-pointer sm:px-4 py-1 sm:py-2 border border-[#0E5B31] text-[#0E5B31] rounded-lg text-xs sm:text-sm whitespace-nowrap"
    >
      Delivered
    </div>
  </div>
);

export default AcceptedListArchived;
