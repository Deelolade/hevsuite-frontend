import React from "react";

const PreviewCms = ({ setIsPreviewModalOpen, selectedItem }) => {
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Preview Image Overlay</h2>
        <button
          onClick={() => setIsPreviewModalOpen(false)}
          className="text-gray-400 hover:text-gray-600"
        >
          ✕
        </button>
      </div>

      <div className="space-y-6">
        {/* Preview Image */}
        <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden">
          {selectedItem && (
            <img
              src={selectedItem.preview}
              alt="Preview"
              className="w-full h-full object-cover"
            />
          )}
        </div>

        {/* Details */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm text-gray-600 mb-1">Status</label>
            <div
              className={`text-sm ${
                selectedItem?.isVisible ? "text-green-600" : "text-red-500"
              }`}
            >
              {selectedItem?.isVisible ? "Visible" : "Hidden"}
            </div>
          </div>

          <div>
            <label className="block text-sm text-gray-600 mb-1">
              Last Modified
            </label>
            <div className="text-sm">{selectedItem?.lastModified}</div>
          </div>
        </div>

        {/* Action Button */}
        <div className="flex justify-end pt-4">
          <button
            onClick={() => setIsPreviewModalOpen(false)}
            className="px-6 py-2 border rounded-lg text-sm bg-primary text-white"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default PreviewCms;
