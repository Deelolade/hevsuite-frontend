import React, { useState } from "react";

const EditFooterItem = ({ setIsEditItemModalOpen, selectedItem }) => {
  const [title, setTitle] = useState(selectedItem?.title || "");

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Edit Footer Item</h2>
        <button
          onClick={() => setIsEditItemModalOpen(false)}
          className="text-gray-400 hover:text-gray-600"
        >
          ✕
        </button>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-sm mb-2">Page Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg text-sm"
          />
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-3 pt-4">
          <button
            onClick={() => setIsEditItemModalOpen(false)}
            className="px-6 py-2 border rounded-lg text-sm"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              // Handle save changes
              setIsEditItemModalOpen(false);
            }}
            className="px-6 py-2 bg-primary text-white rounded-lg text-sm"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditFooterItem;