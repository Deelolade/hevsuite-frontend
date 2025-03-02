// import React from "react";
// import { IoClose } from "react-icons/io5";
// import { BsFilter } from "react-icons/bs";

// const NotificationItem = ({ notification, onRemove }) => {
//   return (
//     <div className="flex items-center justify-between bg-white rounded-lg p-4 shadow-lg">
//       <div>
//         <p className="font-medium text-black">{notification.title}</p>
//         <p className="text-sm text-gray-600">{notification.timestamp}</p>
//       </div>
//       <button
//         onClick={() => onRemove(notification.id)}
//         className="text-gray-400 hover:text-gray-600"
//       >
//         <IoClose size={20} />
//       </button>
//     </div>
//   );
// };

// const Notification = () => {
//   const notifications = [
//     {
//       id: 1,
//       title: "You liked the event The Big T-Pain Party House",
//       timestamp: "29thDecember, 2024 by 12:09pm",
//     },
//     {
//       id: 2,
//       title: "You saved the event The Big T-Pain Party House",
//       timestamp: "29thDecember, 2024 by 12:09pm",
//     },
//     {
//       id: 3,
//       title: "You saved the event The Big T-Pain Party House",
//       timestamp: "29thDecember, 2024 by 12:09pm",
//     },
//     {
//       id: 4,
//       title: "You saved the event The Big T-Pain Party House",
//       timestamp: "29thDecember, 2024 by 12:09pm",
//     },
//     {
//       id: 5,
//       title: "You saved the event The Big T-Pain Party House",
//       timestamp: "29thDecember, 2024 by 12:09pm",
//     },
//     {
//       id: 6,
//       title: "You saved the event The Big T-Pain Party House",
//       timestamp: "29thDecember, 2024 by 12:09pm",
//     },
//   ];

//   const handleRemoveNotification = (id) => {
//     // Handle notification removal
//     console.log("Remove notification:", id);
//   };

//   return (
//     <div className="p-4 ">
//       <div className="flex justify-between items-center mb-6">
//         <h2 className="text-[#540A26] text-xl font-medium">Mark all as read</h2>
//         <div className="flex items-center gap-4">
//           <button className="flex justify-start w-full gap-2 px-8 py-2 bg-[#E1F5F6] rounded-lg text-[#444444]">
//             <BsFilter size={20} />
//             Filter
//           </button>
//           <button className="text-gray-600 hover:text-gray-800 w-full">
//             Clear all
//           </button>
//         </div>
//       </div>

//       <div className="space-y-3">
//         {notifications.map((notification) => (
//           <NotificationItem
//             key={notification.id}
//             notification={notification}
//             onRemove={handleRemoveNotification}
//           />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Notification;

import React from "react";
import { IoClose } from "react-icons/io5";
import { BsFilter } from "react-icons/bs";

const NotificationItem = ({ notification, onRemove }) => {
  return (
    <div className="flex items-start sm:items-center justify-between bg-white rounded-lg p-3 sm:p-4 shadow-md sm:shadow-lg">
      <div className="flex-1 pr-2">
        <p className="font-medium text-black text-sm sm:text-base line-clamp-2 sm:line-clamp-1">
          {notification.title}
        </p>
        <p className="text-xs sm:text-sm text-gray-600">
          {notification.timestamp}
        </p>
      </div>
      <button
        onClick={() => onRemove(notification.id)}
        className="text-gray-400 hover:text-gray-600 p-1 sm:p-1.5 flex-shrink-0"
      >
        <IoClose size={16} className="sm:w-5 sm:h-5" />
      </button>
    </div>
  );
};

const Notification = () => {
  const notifications = [
    {
      id: 1,
      title: "You liked the event The Big T-Pain Party House",
      timestamp: "29thDecember, 2024 by 12:09pm",
    },
    {
      id: 2,
      title: "You saved the event The Big T-Pain Party House",
      timestamp: "29thDecember, 2024 by 12:09pm",
    },
    {
      id: 3,
      title: "You saved the event The Big T-Pain Party House",
      timestamp: "29thDecember, 2024 by 12:09pm",
    },
    {
      id: 4,
      title: "You saved the event The Big T-Pain Party House",
      timestamp: "29thDecember, 2024 by 12:09pm",
    },
    {
      id: 5,
      title: "You saved the event The Big T-Pain Party House",
      timestamp: "29thDecember, 2024 by 12:09pm",
    },
    {
      id: 6,
      title: "You saved the event The Big T-Pain Party House",
      timestamp: "29thDecember, 2024 by 12:09pm",
    },
  ];

  const handleRemoveNotification = (id) => {
    // Handle notification removal
    console.log("Remove notification:", id);
  };

  return (
    <div className="p-2 sm:p-4">
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-3 sm:gap-0 mb-4 sm:mb-6">
        <h2 className="text-[#540A26] text-lg sm:text-xl font-medium">
          Mark all as read
        </h2>
        <div className="flex items-center gap-2 sm:gap-4">
          <button className="flex justify-start items-center gap-1 sm:gap-2 px-3 sm:px-8 py-1.5 sm:py-2 bg-[#E1F5F6] rounded-lg text-[#444444] text-xs sm:text-sm">
            <BsFilter size={16} className="sm:w-5 sm:h-5" />
            Filter
          </button>
          <button className="text-gray-600 hover:text-gray-800 text-xs sm:text-sm px-2 py-1.5">
            Clear all
          </button>
        </div>
      </div>

      <div className="space-y-2 sm:space-y-3">
        {notifications.map((notification) => (
          <NotificationItem
            key={notification.id}
            notification={notification}
            onRemove={handleRemoveNotification}
          />
        ))}
      </div>
    </div>
  );
};

export default Notification;
