import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { removeCMS } from "../../../../store/cms/cmsSlice";
import toast from "react-hot-toast";

const RemoveCms = ({ setIsRemoveModalOpen, selectedItem, refreshData }) => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  const handleRemove = async () => {
    try {
      setIsLoading(true);
      await dispatch(removeCMS({ id: selectedItem._id })).unwrap();
      toast.success("Landing page removed successfully");
      setIsRemoveModalOpen(false);
      refreshData();
    } catch (error) {
      console.error("Error removing landing page:", error);
      toast.error(error.message || "Failed to remove landing page");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <span className="text-red-500">⚠</span>
            Remove Content
          </h2>
          <button
            onClick={() => setIsRemoveModalOpen(false)}
            className="text-gray-400 hover:text-gray-600"
            disabled={isLoading}
          >
            ✕
          </button>
        </div>
        <div className="space-y-6">
          <p className="text-gray-600">
            Are you sure you want to remove "{selectedItem?.link}"?
          </p>
          <div className="flex justify-end gap-3">
            <button
              onClick={() => setIsRemoveModalOpen(false)}
              className="px-6 py-2 border rounded-lg text-sm"
              disabled={isLoading}
            >
              Cancel
            </button>
            <button
              onClick={handleRemove}
              className="px-6 py-2 bg-red-500 text-white rounded-lg text-sm disabled:opacity-50"
              disabled={isLoading}
            >
              {isLoading ? "Removing..." : "Remove"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RemoveCms;