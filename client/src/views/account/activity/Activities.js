import React, { useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";
import { BsFilter } from "react-icons/bs";
import Modal from "react-modal";
import {formatDateWithSuffix, formatTime} from '../../../utils/formatDate';
import activityService from "../../../services/activityService";
import toast from "react-hot-toast";
Modal.setAppElement("#root");

const ActivityItem = ({ activity, onRemove }) => {
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const handleRemove = () => {
    setShowConfirmModal(true);
  };
  const confirmRemove = async () => {
    setIsDeleting(true);
    try {
      await onRemove(activity._id); // Use _id instead of id for MongoDB
      setShowConfirmModal(false);
    } catch (error) {
      console.error("Error deleting activity:", error);
    } finally {
      setIsDeleting(false);
    }
  };
  return (
    <>
      <div className="flex items-start sm:items-center justify-between bg-white rounded-lg p-3 sm:p-4 shadow-md sm:shadow-lg">
        <div className="flex-1 pr-2">
          <p className="font-medium text-black text-sm sm:text-base line-clamp-2 sm:line-clamp-none">
            {activity.title}
          </p>
          <p className="text-xs sm:text-sm text-gray-600">
            {activity.timestamp}
          </p>
        </div>
        <button
          onClick={handleRemove}
          className="text-gray-400 hover:text-gray-600 p-1 sm:p-1.5 flex-shrink-0"
        >
          <IoClose size={16} className="sm:w-5 sm:h-5" />
        </button>
      </div>

      {/* Individual Activity Remove Modal */}
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
        <h3 className="text-xl font-semibold mb-2">Remove Activity</h3>
        <p className="text-gray-600 mb-4">
          Are you sure you want to remove this activity from your log?
        </p>
        <div className="flex justify-end gap-3">
          <button
            onClick={() => setShowConfirmModal(false)}
            className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
          >
            Cancel
          </button>
          <button
            onClick={confirmRemove}
            disabled={isDeleting}
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
      <h3 className="text-xl font-semibold mb-4">Filter Activity Log</h3>
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
          All Activities
        </label>
        <label className="block">
          <input
            type="radio"
            name="filter"
            value="login"
            checked={filter === "login"}
            onChange={(e) => setFilter(e.target.value)}
            className="mr-2"
          />
          Login Activities
        </label>
        <label className="block">
          <input
            type="radio"
            name="filter"
            value="security"
            checked={filter === "security"}
            onChange={(e) => setFilter(e.target.value)}
            className="mr-2"
          />
          Security Changes
        </label>
        <label className="block">
          <input
            type="radio"
            name="filter"
            value="support"
            checked={filter === "support"}
            onChange={(e) => setFilter(e.target.value)}
            className="mr-2"
          />
          Support Activities
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

const Activities = () => {


  // const [activities, setActivities] = useState([
  //   {
  //     id: 1,
  //     title: "You logged in from a new device (Windows 10, Chrome)",
  //     timestamp: "17th January, 2023 by 8:20 PM",
  //     type: "login",
  //   },
  //   {
  //     id: 2,
  //     title: "You changed your password successfully",
  //     timestamp: "29thDecember, 2024 by 12:09pm",
  //     type: "security",
  //   },
  //   {
  //     id: 3,
  //     title: "You updated your email address to hello.member@club.com",
  //     timestamp: "29thDecember, 2024 by 12:09pm",
  //     type: "security",
  //   },
  //   {
  //     id: 4,
  //     title:
  //       "Support join request for Jane Doe accepted (Device: MacBook Pro, Safari)",
  //     timestamp: "29thDecember, 2024 by 12:09pm",
  //     type: "support",
  //   },
  //   {
  //     id: 5,
  //     title: "you declined support join request for Sam Smith",
  //     timestamp: "29thDecember, 2024 by 12:09pm",
  //     type: "support",
  //   },
  //   {
  //     id: 6,
  //     title: "You logged out (iPhone 13, Safari)",
  //     timestamp: "29thDecember, 2024 by 12:09pm",
  //     type: "login",
  //   },
  // ]);

  const [showFilterModal, setShowFilterModal] = useState(false);
  const [showClearAllModal, setShowClearAllModal] = useState(false);
  const [currentFilter, setCurrentFilter] = useState("all");

  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const { success, data, error } = await activityService.getUserActivities();
        if (success) {
          setActivities(data.activities);
        } else {
          setError(error || "Failed to load activities");
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchActivities();
  }, []);
  const handleRemoveActivity = async (activityId) => {
    try {
      const { success } = await activityService.deleteActivity(activityId);
      if (success) {
        setActivities(activities.filter((activity) => activity._id !== activityId));
        toast.success("Activity has been deleted successfully")
      }
    } catch (error) {
      console.error("Error deleting activity:", error);
      toast.error(error.message)
    }
  };
  const handleClearAll = async () => {
    try {
      const { success } = await activityService.clearUserActivities();
      if (success) {
        setActivities([]);
        setShowClearAllModal(false);
        toast.success("All activities have been cleared successfully")
      }
    } catch (error) {
      console.error("Error clearing activities:", error);
      toast.error(error.message)
    }
  };
  const handleFilter = (filter) => {
    setCurrentFilter(filter);
  };

  const getFilteredActivities = () => {
    if (currentFilter === "all") return activities;
    return activities.filter((activity) => activity.action === currentFilter);
  };
  if (loading) {
    return <div className="p-4 text-center">Loading activities...</div>;
  }

  return (
    <div className="p-2 sm:p-4">
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-3 sm:gap-0 mb-4 sm:mb-6">
        <h2 className="text-[#540A26] text-lg sm:text-xl font-medium">
          Activity log
        </h2>
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
        {/* {getFilteredActivities().map((activity) => (
          <ActivityItem
            key={activity.id}
            activity={activity}
            onRemove={handleRemoveActivity}
          />
        ))} */}
        {getFilteredActivities().map((activity) => (
            <ActivityItem
              key={activity._id}
              activity={{
                ...activity,
                title: `${activity.details}(${activity.userAgent})`, // Helper function to format title
                timestamp: `${formatDateWithSuffix(activity.timestamp)} by ${formatTime(activity.timestamp)}`, // Format date
                type: activity.action // Map action to type
              }}
              onRemove={handleRemoveActivity}
            />
          ))}

      </div>

      {/* Filter Modal */}
      <FilterModal
        isOpen={showFilterModal}
        onClose={() => setShowFilterModal(false)}
        onApply={handleFilter}
        currentFilter={currentFilter}
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
        <h3 className="text-xl font-semibold mb-2">Clear Activity Log</h3>
        <p className="text-gray-600 mb-4">
          Are you sure you want to clear your entire activity log? This action
          cannot be undone.
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

export default Activities;
