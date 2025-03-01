import React from "react";
import { IoClose } from "react-icons/io5";
import { BsFilter } from "react-icons/bs";

const ActivityItem = ({ activity, onRemove }) => {
  return (
    <div className="flex items-center justify-between bg-white rounded-lg p-4 shadow-lg">
      <div>
        <p className="font-medium text-black">{activity.title}</p>
        <p className="text-sm text-gray-600">{activity.timestamp}</p>
      </div>
      <button
        onClick={() => onRemove(activity.id)}
        className="text-gray-400 hover:text-gray-600"
      >
        <IoClose size={20} />
      </button>
    </div>
  );
};

const Activities = () => {
  const activities = [
    {
      id: 1,
      title: "You logged in from a new device (Windows 10, Chrome)",
      timestamp: "17th January, 2023 by 8:20 PM",
    },
    {
      id: 2,
      title: "You changed your password successfully",
      timestamp: "29thDecember, 2024 by 12:09pm",
    },
    {
      id: 3,
      title: "You updated your email address to hello.member@club.com",
      timestamp: "29thDecember, 2024 by 12:09pm",
    },
    {
      id: 4,
      title:
        "Support join request for Jane Doe accepted (Device: MacBook Pro, Safari)",
      timestamp: "29thDecember, 2024 by 12:09pm",
    },
    {
      id: 5,
      title: "you declined support join request for Sam Smith",
      timestamp: "29thDecember, 2024 by 12:09pm",
    },
    {
      id: 6,
      title: "You logged out (iPhone 13, Safari)",
      timestamp: "29thDecember, 2024 by 12:09pm",
    },
  ];

  const handleRemoveActivity = (id) => {
    // Handle activity removal
    console.log("Remove activity:", id);
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-[#540A26] text-xl font-medium">Activity log</h2>
        <div className="flex items-center gap-4">
          <button className="flex justify-start w-full gap-2 px-8 py-2 bg-[#E1F5F6] rounded-lg text-[#444444]">
            <BsFilter size={20} />
            Filter
          </button>
          <button className="text-gray-600 hover:text-gray-800 w-full">
            Clear all
          </button>
        </div>
      </div>

      <div className="space-y-3">
        {activities.map((activity) => (
          <ActivityItem
            key={activity.id}
            activity={activity}
            onRemove={handleRemoveActivity}
          />
        ))}
      </div>
    </div>
  );
};

export default Activities;
