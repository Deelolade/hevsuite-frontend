import React from "react";

const ReportRemove = ({ setIsRemoveModalOpen }) => {
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
          >
            ✕
          </button>
        </div>
        <div className="space-y-6">
          <p className="text-gray-600">
            Are you sure you want to remove this content?
          </p>
          <div className="flex justify-end gap-3">
            <button
              onClick={() => setIsRemoveModalOpen(false)}
              className="px-6 py-2 border rounded-lg text-sm"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                // Handle remove logic here
                setIsRemoveModalOpen(false);
              }}
              className="px-6 py-2 bg-[#540A26] text-white rounded-lg text-sm"
            >
              Remove
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportRemove;
