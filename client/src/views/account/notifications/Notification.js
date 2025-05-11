import React, { useState } from "react";
import { IoClose } from "react-icons/io5";
import { BsFilter } from "react-icons/bs";
import Modal from "react-modal";
import { useDispatch, useSelector } from 'react-redux';
import { markAsRead,
   fetchNotifications,
  markAllAsRead,
  deleteNotification,
  clearAllNotifications,
  selectFilteredNotifications,
  setFilter } from "../../../features/notificationSlice";
Modal.setAppElement("#root");

const NotificationItem = ({ notification, onRemove }) => {
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const handleRemove = () => {
    setShowConfirmModal(true);
  };

  return (
    <>
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
          onClick={handleRemove}
          className="text-gray-400 hover:text-gray-600 p-1 sm:p-1.5 flex-shrink-0"
        >
          <IoClose size={16} className="sm:w-5 sm:h-5" />
        </button>
      </div>

      {/* Individual Notification Remove Modal */}
      <Modal
        isOpen={showConfirmModal}
        onRequestClose={() => setShowConfirmModal(false)}
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-xl p-6 max-w-md w-full mx-4"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 z-50"
        style={{
          overlay: {
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            zIndex: 1000,
          },
        }}
      >
        <h3 className="text-xl font-semibold mb-2">Remove Notification</h3>
        <p className="text-gray-600 mb-4">
          Are you sure you want to remove this notification?
        </p>
        <div className="flex justify-end gap-3">
          <button
            onClick={() => setShowConfirmModal(false)}
            className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              onRemove(notification.id);
              setShowConfirmModal(false);
            }}
            className="px-4 py-2 bg-red-600 text-white rounded-lg"
          >
            Remove
          </button>
        </div>
      </Modal>
    </>
  );
};

const FilterModal = ({ isOpen, onClose, onApply, currentFilter }) => {
  const [filter, setFilter] = useState(currentFilter);

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-xl p-6 max-w-md w-full mx-4"
      overlayClassName="fixed inset-0 bg-black bg-opacity-50 z-50"
      style={{
        overlay: {
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          zIndex: 1000,
        },
      }}
    >
      <h3 className="text-xl font-semibold mb-4">Filter Notifications</h3>
      <div className="space-y-3 mb-6">
        <label className="block">
          <input
            type="radio"
            name="filter"
            value="all"
            checked={filter === "all"}
            onChange={(e) => setFilter(e.target.value)}
            className="mr-2"
          />
          All Notifications
        </label>
        <label className="block">
          <input
            type="radio"
            name="filter"
            value="unread"
            checked={filter === "unread"}
            onChange={(e) => setFilter(e.target.value)}
            className="mr-2"
          />
          Unread
        </label>
        <label className="block">
          <input
            type="radio"
            name="filter"
            value="read"
            checked={filter === "read"}
            onChange={(e) => setFilter(e.target.value)}
            className="mr-2"
          />
          Read
        </label>
        <label className="block">
          <input
            type="radio"
            name="filter"
            value="events"
            checked={filter === "events"}
            onChange={(e) => setFilter(e.target.value)}
            className="mr-2"
          />
          Events Only
        </label>
      </div>
      <div className="flex justify-end gap-3">
        <button
          onClick={onClose}
          className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
        >
          Cancel
        </button>
        <button
          onClick={() => {
            onApply(filter);
            onClose();
          }}
          className="px-4 py-2 bg-[#540A26] text-white rounded-lg"
        >
          Apply Filter
        </button>
      </div>
    </Modal>
  );
};

const Notification = () => {

  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: "You liked the event The Big T-Pain Party House",
      timestamp: "29thDecember, 2024 by 12:09pm",
      read: false,
      type: "event",
    },
    {
      id: 2,
      title: "You saved the event The Big T-Pain Party House",
      timestamp: "29thDecember, 2024 by 12:09pm",
      read: true,
      type: "event",
    },
    {
      id: 3,
      title: "New message from support team",
      timestamp: "29thDecember, 2024 by 12:09pm",
      read: false,
      type: "message",
    },
    {
      id: 4,
      title: "Profile update successful",
      timestamp: "29thDecember, 2024 by 12:09pm",
      read: true,
      type: "system",
    },
    {
      id: 5,
      title: "New event recommendation",
      timestamp: "29thDecember, 2024 by 12:09pm",
      read: false,
      type: "event",
    },
    {
      id: 6,
      title: "Security alert: New login",
      timestamp: "29thDecember, 2024 by 12:09pm",
      read: false,
      type: "system",
    },
  ]);

  const [currentFilter, setCurrentFilter] = useState("all");
  const dispatch = useDispatch();
  const { status, error, unreadCount } = useSelector(state => state.notifications);
  const filteredNotifications = useSelector(selectFilteredNotifications);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [showClearAllModal, setShowClearAllModal] = useState(false);
  const userId = 'current-user-id'; // Replace with actual user ID from auth

  // const handleRemoveNotification = (id) => {
  //   setNotifications(
  //     notifications.filter((notification) => notification.id !== id)
  //   );
  // };
  const handleRemoveNotification = (id) => {
    dispatch(deleteNotification(id));
  };

  const handleClearAll = () => {
    dispatch(clearAllNotifications(userId));
    setShowClearAllModal(false);
  };

  const handleMarkAllAsRead = () => {
    dispatch(markAllAsRead(userId));
  };

  // const handleClearAll = () => {
  //   setNotifications([]);
  //   setShowClearAllModal(false);
  // };

  // const handleFilter = (filter) => {
  //   setCurrentFilter(filter);
  // };

  return (
    <div className="p-2 sm:p-4">
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-3 sm:gap-0 mb-4 sm:mb-6">
        {unreadCount > 0 && (
          <button
            onClick={handleMarkAllAsRead}
            className="text-[#540A26] text-lg sm:text-xl font-medium hover:underline"
          >
            Mark all as read ({unreadCount} unread)
          </button>
        )}
        
        {/* If no unread notifications, show empty div to maintain layout */}
        {unreadCount === 0 && <div></div>}

        <div className="flex items-center gap-2 sm:gap-4">
          <button
            onClick={() => setShowFilterModal(true)}
            className="flex justify-start items-center gap-1 sm:gap-2 px-3 sm:px-8 py-1.5 sm:py-2 bg-[#E1F5F6] rounded-lg text-[#444444] text-xs sm:text-sm"
          >
            <BsFilter size={16} className="sm:w-5 sm:h-5" />
            Filter
          </button>
          <button
            onClick={() => setShowClearAllModal(true)}
            className="text-gray-600 hover:text-gray-800 text-xs sm:text-sm px-2 py-1.5"
          >
            Clear all
          </button>
        </div>
      </div>

      <div className="space-y-2 sm:space-y-3">
      {filteredNotifications.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            No notifications found
          </div>
        ) : (
        filteredNotifications?.map((notification) => (
          <NotificationItem
            key={notification.id}
            notification={notification}
            onRemove={handleRemoveNotification}
          />
          
        )))}
      </div>

      {/* Filter Modal */}
      <FilterModal
        isOpen={showFilterModal}
        onClose={() => setShowFilterModal(false)}
                currentFilter={useSelector(state => state.notifications.filter)}
      />

      {/* Clear All Modal */}
      <Modal
        isOpen={showClearAllModal}
        onRequestClose={() => setShowClearAllModal(false)}
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-xl p-6 max-w-md w-full mx-4"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 z-50"
        style={{
          overlay: {
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            zIndex: 1000,
          },
        }}
      >
        <h3 className="text-xl font-semibold mb-2">Clear All Notifications</h3>
        <p className="text-gray-600 mb-4">
          Are you sure you want to clear all notifications? This action cannot
          be undone.
        </p>
        <div className="flex justify-end gap-3">
          <button
            onClick={() => setShowClearAllModal(false)}
            className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
          >
            Cancel
          </button>
          <button
            onClick={handleClearAll}
            className="px-4 py-2 bg-red-600 text-white rounded-lg"
          >
            Clear All
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default Notification;




// 
// import React, { useState } from "react";
// import { IoClose } from "react-icons/io5";
// import { BsFilter } from "react-icons/bs";
// import Modal from "react-modal";

// Modal.setAppElement("#root");

// const NotificationItem = ({ notification, onRemove }) => {
//   const [showConfirmModal, setShowConfirmModal] = useState(false);

//   const handleRemove = () => {
//     setShowConfirmModal(true);
//   };

//   return (
//     <>
//       <div className="flex items-start sm:items-center justify-between bg-white rounded-lg p-3 sm:p-4 shadow-md sm:shadow-lg">
//         <div className="flex-1 pr-2">
//           <p className="font-medium text-black text-sm sm:text-base line-clamp-2 sm:line-clamp-1">
//             {notification.title}
//           </p>
//           <p className="text-xs sm:text-sm text-gray-600">
//             {notification.timestamp}
//           </p>
//         </div>
//         <button
//           onClick={handleRemove}
//           className="text-gray-400 hover:text-gray-600 p-1 sm:p-1.5 flex-shrink-0"
//         >
//           <IoClose size={16} className="sm:w-5 sm:h-5" />
//         </button>
//       </div>

//       {/* Individual Notification Remove Modal */}
//       <Modal
//         isOpen={showConfirmModal}
//         onRequestClose={() => setShowConfirmModal(false)}
//         className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-xl p-6 max-w-md w-full mx-4"
//         overlayClassName="fixed inset-0 bg-black bg-opacity-50 z-50"
//         style={{
//           overlay: {
//             position: "fixed",
//             top: 0,
//             left: 0,
//             right: 0,
//             bottom: 0,
//             backgroundColor: "rgba(0, 0, 0, 0.5)",
//             zIndex: 1000,
//           },
//         }}
//       >
//         <h3 className="text-xl font-semibold mb-2">Remove Notification</h3>
//         <p className="text-gray-600 mb-4">
//           Are you sure you want to remove this notification?
//         </p>
//         <div className="flex justify-end gap-3">
//           <button
//             onClick={() => setShowConfirmModal(false)}
//             className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
//           >
//             Cancel
//           </button>
//           <button
//             onClick={() => {
//               onRemove(notification.id);
//               setShowConfirmModal(false);
//             }}
//             className="px-4 py-2 bg-red-600 text-white rounded-lg"
//           >
//             Remove
//           </button>
//         </div>
//       </Modal>
//     </>
//   );
// };

// const FilterModal = ({ isOpen, onClose, onApply, currentFilter }) => {
//   const [filter, setFilter] = useState(currentFilter);

//   return (
//     <Modal
//       isOpen={isOpen}
//       onRequestClose={onClose}
//       className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-xl p-6 max-w-md w-full mx-4"
//       overlayClassName="fixed inset-0 bg-black bg-opacity-50 z-50"
//       style={{
//         overlay: {
//           position: "fixed",
//           top: 0,
//           left: 0,
//           right: 0,
//           bottom: 0,
//           backgroundColor: "rgba(0, 0, 0, 0.5)",
//           zIndex: 1000,
//         },
//       }}
//     >
//       <h3 className="text-xl font-semibold mb-4">Filter Notifications</h3>
//       <div className="space-y-3 mb-6">
//         <label className="block">
//           <input
//             type="radio"
//             name="filter"
//             value="all"
//             checked={filter === "all"}
//             onChange={(e) => setFilter(e.target.value)}
//             className="mr-2"
//           />
//           All Notifications
//         </label>
//         <label className="block">
//           <input
//             type="radio"
//             name="filter"
//             value="unread"
//             checked={filter === "unread"}
//             onChange={(e) => setFilter(e.target.value)}
//             className="mr-2"
//           />
//           Unread
//         </label>
//         <label className="block">
//           <input
//             type="radio"
//             name="filter"
//             value="read"
//             checked={filter === "read"}
//             onChange={(e) => setFilter(e.target.value)}
//             className="mr-2"
//           />
//           Read
//         </label>
//         <label className="block">
//           <input
//             type="radio"
//             name="filter"
//             value="events"
//             checked={filter === "events"}
//             onChange={(e) => setFilter(e.target.value)}
//             className="mr-2"
//           />
//           Events Only
//         </label>
//       </div>
//       <div className="flex justify-end gap-3">
//         <button
//           onClick={onClose}
//           className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
//         >
//           Cancel
//         </button>
//         <button
//           onClick={() => {
//             onApply(filter);
//             onClose();
//           }}
//           className="px-4 py-2 bg-[#540A26] text-white rounded-lg"
//         >
//           Apply Filter
//         </button>
//       </div>
//     </Modal>
//   );
// };

// const Notification = () => {
//   const [notifications, setNotifications] = useState([
//     {
//       id: 1,
//       title: "You liked the event The Big T-Pain Party House",
//       timestamp: "29thDecember, 2024 by 12:09pm",
//       read: false,
//       type: "event",
//     },
//     {
//       id: 2,
//       title: "You saved the event The Big T-Pain Party House",
//       timestamp: "29thDecember, 2024 by 12:09pm",
//       read: true,
//       type: "event",
//     },
//     {
//       id: 3,
//       title: "New message from support team",
//       timestamp: "29thDecember, 2024 by 12:09pm",
//       read: false,
//       type: "message",
//     },
//     {
//       id: 4,
//       title: "Profile update successful",
//       timestamp: "29thDecember, 2024 by 12:09pm",
//       read: true,
//       type: "system",
//     },
//     {
//       id: 5,
//       title: "New event recommendation",
//       timestamp: "29thDecember, 2024 by 12:09pm",
//       read: false,
//       type: "event",
//     },
//     {
//       id: 6,
//       title: "Security alert: New login",
//       timestamp: "29thDecember, 2024 by 12:09pm",
//       read: false,
//       type: "system",
//     },
//   ]);

//   const [showFilterModal, setShowFilterModal] = useState(false);
//   const [showClearAllModal, setShowClearAllModal] = useState(false);
//   const [currentFilter, setCurrentFilter] = useState("all");

//   const handleRemoveNotification = (id) => {
//     setNotifications(
//       notifications.filter((notification) => notification.id !== id)
//     );
//   };

//   const handleClearAll = () => {
//     setNotifications([]);
//     setShowClearAllModal(false);
//   };

//   const handleFilter = (filter) => {
//     setCurrentFilter(filter);
//   };

//   const getFilteredNotifications = () => {
//     switch (currentFilter) {
//       case "unread":
//         return notifications.filter((n) => !n.read);
//       case "read":
//         return notifications.filter((n) => n.read);
//       case "events":
//         return notifications.filter((n) => n.type === "event");
//       default:
//         return notifications;
//     }
//   };

//   return (
//     <div className="p-2 sm:p-4">
//       <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-3 sm:gap-0 mb-4 sm:mb-6">
//         <h2 className="text-[#540A26] text-lg sm:text-xl font-medium">
//           Mark all as read
//         </h2>
//         <div className="flex items-center gap-2 sm:gap-4">
//           <button
//             onClick={() => setShowFilterModal(true)}
//             className="flex justify-start items-center gap-1 sm:gap-2 px-3 sm:px-8 py-1.5 sm:py-2 bg-[#E1F5F6] rounded-lg text-[#444444] text-xs sm:text-sm"
//           >
//             <BsFilter size={16} className="sm:w-5 sm:h-5" />
//             Filter
//           </button>
//           <button
//             onClick={() => setShowClearAllModal(true)}
//             className="text-gray-600 hover:text-gray-800 text-xs sm:text-sm px-2 py-1.5"
//           >
//             Clear all
//           </button>
//         </div>
//       </div>

//       <div className="space-y-2 sm:space-y-3">
//         {getFilteredNotifications().map((notification) => (
//           <NotificationItem
//             key={notification.id}
//             notification={notification}
//             onRemove={handleRemoveNotification}
//           />
//         ))}
//       </div>

//       {/* Filter Modal */}
//       <FilterModal
//         isOpen={showFilterModal}
//         onClose={() => setShowFilterModal(false)}
//         onApply={handleFilter}
//         currentFilter={currentFilter}
//       />

//       {/* Clear All Modal */}
//       <Modal
//         isOpen={showClearAllModal}
//         onRequestClose={() => setShowClearAllModal(false)}
//         className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-xl p-6 max-w-md w-full mx-4"
//         overlayClassName="fixed inset-0 bg-black bg-opacity-50 z-50"
//         style={{
//           overlay: {
//             position: "fixed",
//             top: 0,
//             left: 0,
//             right: 0,
//             bottom: 0,
//             backgroundColor: "rgba(0, 0, 0, 0.5)",
//             zIndex: 1000,
//           },
//         }}
//       >
//         <h3 className="text-xl font-semibold mb-2">Clear All Notifications</h3>
//         <p className="text-gray-600 mb-4">
//           Are you sure you want to clear all notifications? This action cannot
//           be undone.
//         </p>
//         <div className="flex justify-end gap-3">
//           <button
//             onClick={() => setShowClearAllModal(false)}
//             className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
//           >
//             Cancel
//           </button>
//           <button
//             onClick={handleClearAll}
//             className="px-4 py-2 bg-red-600 text-white rounded-lg"
//           >
//             Clear All
//           </button>
//         </div>
//       </Modal>
//     </div>
//   );
// };

// export default Notification;
