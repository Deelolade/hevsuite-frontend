"use client"

import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { removeCMS } from "../../../../store/cms/cmsSlice";
import toast from "react-hot-toast";

// Make the modal more generic to handle delete and restore
const RemoveCms = ({
  setIsRemoveModalOpen,
  selectedItem,
  refreshData,
  // Add new props for generic modal content and action
  modalTitle,
  modalMessage,
  confirmButtonText,
  onConfirmAction, // Function to call on confirmation
}) => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  const handleConfirm = async () => {
    try {
      setIsLoading(true);
      // Call the passed onConfirmAction function instead of removeCMS directly
      await onConfirmAction(selectedItem._id);
      // Success toast and data refresh will be handled by the onConfirmAction handlers in Landing.jsx
      setIsRemoveModalOpen(false);
    } catch (error) {
      // Error handling will be done in the onConfirmAction handlers
      console.error("Error during modal action:", error);
      toast.error(error.message || "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        {/* Use modalTitle prop for the title */}
        <h2 className="text-xl font-semibold">{modalTitle}</h2>
        <button
          onClick={() => setIsRemoveModalOpen(false)}
          className="text-gray-400 hover:text-gray-600"
          disabled={isLoading}
        >
          ✕
        </button>
      </div>

      <div className="space-y-6">
        {/* Use modalMessage prop for the message */}
        <p>{modalMessage}</p>
      </div>

      <div className="flex justify-end space-x-4 mt-6">
        <button
          type="button"
          onClick={() => setIsRemoveModalOpen(false)}
          className="px-6 py-2 border rounded-lg text-gray-700 hover:bg-gray-100 font-semibold"
          disabled={isLoading}
        >
          Cancel
        </button>
        <button
          type="button"
          onClick={handleConfirm} // Call the generic handleConfirm
          className={`px-6 py-2 rounded-lg font-semibold ${confirmButtonText === 'Remove' ? 'bg-red-500 hover:bg-red-600 text-white' : 'bg-green-600 hover:bg-green-700 text-white'}`}
          disabled={isLoading}
        >
          {/* Use confirmButtonText prop for button text */}
          {isLoading ? "Processing..." : confirmButtonText}
        </button>
      </div>
    </div>
  );
};

export default RemoveCms;