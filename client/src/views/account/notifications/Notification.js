import React from "react";
import { IoClose } from "react-icons/io5";
import { BsFilter } from "react-icons/bs";

const NotificationItem = ({ notification, onRemove }) => {
  return (
    <div className="flex items-center justify-between bg-white rounded-lg p-4 shadow-sm">
      <div>
        <p className="font-medium">{notification.title}</p>
        <p className="text-sm text-gray-600">{notification.timestamp}</p>
      </div>
      <button
        onClick={() => onRemove(notification.id)}
        className="text-gray-400 hover:text-gray-600"
      >
        <IoClose size={20} />
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
    <div className="p-4">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-[#540A26] text-xl font-medium">Mark all as read</h2>
        <div className="flex items-center gap-4">
          <button className="flex items-center gap-2 px-4 py-2 bg-gray-50 rounded-lg">
            <BsFilter size={20} />
            Filter
          </button>
          <button className="text-gray-600 hover:text-gray-800">Clear all</button>
        </div>
      </div>

      <div className="space-y-3">
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
