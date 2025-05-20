import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import profileService from "../../../../services/profileService";

const EmailNotificationSection = () => {
  const userId = "681bb32edcbec841ac85abc5"; // Replace with actual userId
  const [receiveNotifications, setReceiveNotifications] = useState(true);
  const [notifications, setNotifications] = useState({
    News: false,
    "New Events": false,
    Activities: false,
    Promotions: false,
  });
  const [isLoading, setIsLoading] = useState(false);

  // Fetch initial notification preferences from backend
  useEffect(() => {
    const fetchPreferences = async () => {
      try {
        const response = await profileService.getNotifications(userId);
        if (response.success) {
          setReceiveNotifications(response.data.receiveNotifications || true);
          setNotifications({
            News: response.data.notifications?.News || false,
            "New Events": response.data.notifications?.["New Events"] || false,
            Activities: response.data.notifications?.Activities || false,
            Promotions: response.data.notifications?.Promotions || false,
          });
        } else {
          throw new Error(
            response.message || "Failed to load notification preferences"
          );
        }
      } catch (error) {
        console.error("Error fetching notification preferences:", error);
        toast.error("Failed to load notification preferences");
      }
    };
    fetchPreferences();
  }, [userId]);

  // Function to update notification preferences in the backend
  const updateNotificationPreferences = async (updatedNotifications) => {
    setIsLoading(true);
    try {
      const response = await profileService.updateNotifications({
        userId,
        notifications: {
          receiveNotifications,
          ...updatedNotifications,
        },
      });

      if (response.success) {
        toast.success("Notification preferences updated successfully!");
      } else {
        throw new Error(
          response.message || "Failed to update notification preferences"
        );
      }
    } catch (error) {
      console.error("Error updating notification preferences:", error);
      toast.error(error.message || "Failed to update notification preferences");
    } finally {
      setIsLoading(false);
    }
  };

  // Handle main toggle change
  const handleToggleChange = () => {
    const newValue = !receiveNotifications;
    setReceiveNotifications(newValue);

    // If turning off notifications, reset all individual preferences
    if (!newValue) {
      const resetNotifications = {
        News: false,
        "New Events": false,
        Activities: false,
        Promotions: false,
      };
      setNotifications(resetNotifications);
      updateNotificationPreferences(resetNotifications);
    } else {
      updateNotificationPreferences(notifications);
    }
  };

  // Handle individual notification change
  const handleNotificationChange = (type) => {
    const updatedNotifications = {
      ...notifications,
      [type]: !notifications[type],
    };
    setNotifications(updatedNotifications);
    updateNotificationPreferences(updatedNotifications);
  };

  return (
    <div className="mt-4 sm:mt-6 md:mt-8">
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-3 sm:gap-0 mb-4 sm:mb-6 md:mb-8">
        <h2 className="text-lg sm:text-xl">Email Notification</h2>
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            className="sr-only peer"
            checked={receiveNotifications}
            onChange={handleToggleChange}
            disabled={isLoading}
          />
          <div className="w-9 sm:w-11 h-5 sm:h-6 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 sm:after:h-5 after:w-4 sm:after:w-5 after:transition-all peer-checked:bg-[#540A26]"></div>
        </label>
      </div>

      <div className="space-y-4 sm:space-y-6">
        {["News", "New Events", "Activities", "Promotions"].map((item) => (
          <div key={item} className="flex items-center gap-2 sm:gap-3">
            <input
              type="checkbox"
              className="w-4 h-4 sm:w-5 sm:h-5 rounded border-gray-300"
              checked={notifications[item]}
              onChange={() => handleNotificationChange(item)}
              disabled={!receiveNotifications || isLoading}
            />
            <span className="text-gray-700 text-sm sm:text-base">{item}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EmailNotificationSection;