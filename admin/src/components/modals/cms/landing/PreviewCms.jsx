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
        {/* Preview Media */}
        <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden">
          {selectedItem?.fileType === 'video' ? (
            <video
              src={selectedItem.file}
              controls
              className="w-full h-full object-cover"
            />
          ) : (
            <img
              src={selectedItem.file}
              alt="Preview"
              className="w-full h-full object-cover"
            />
          )}
        </div>

        {/* Details */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm text-gray-600 mb-1">Link</label>
            <div className="text-sm text-blue-500 break-all">
              <a 
                href={selectedItem?.link} 
                target="_blank" 
                rel="noopener noreferrer"
              >
                {selectedItem?.link}
              </a>
            </div>
          </div>

          <div>
            <label className="block text-sm text-gray-600 mb-1">Status</label>
            <div
              className={`text-sm ${
                selectedItem?.visibility ? "text-green-600" : "text-red-500"
              }`}
            >
              {selectedItem?.visibility ? "Visible" : "Hidden"}
            </div>
          </div>

          <div>
            <label className="block text-sm text-gray-600 mb-1">
              Last Modified
            </label>
            <div className="text-sm">
              {selectedItem?.updatedAt && new Date(selectedItem.updatedAt).toLocaleString()}
            </div>
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