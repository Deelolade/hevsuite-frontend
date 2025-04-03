import React, { useState } from "react";
import { HiOutlineMail } from "react-icons/hi";
import { AiOutlineCloudUpload } from "react-icons/ai";

const EditCms = ({ setIsEditModalOpen, selectedItem }) => {
  const [openInNewTab, setOpenInNewTab] = useState(false);
  const [editLink, setEditLink] = useState("");

  return (
    <div>
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Edit Image Overlay</h2>
          <button
            onClick={() => setIsEditModalOpen(false)}
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

          {/* Upload Icon */}
          <div className="flex justify-center">
            <button className="text-primary">
              <AiOutlineCloudUpload size={24} />
              <span className="text-sm">Click to Add icon</span>
            </button>
          </div>

          {/* Link Input */}
          <div>
            <label className="block text-sm mb-2">
              Available Link
              <span className="text-red-500">*</span> Required
            </label>
            <input
              type="text"
              value={editLink}
              onChange={(e) => setEditLink(e.target.value)}
              placeholder="www.x.com/hermandai/profile!"
              className="w-full px-3 py-2 border rounded-lg text-sm"
            />
          </div>

          {/* Open in new tab checkbox */}
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="newTab"
              checked={openInNewTab}
              onChange={(e) => setOpenInNewTab(e.target.checked)}
              className="rounded border-gray-300 text-primary focus:ring-primary"
            />
            <label htmlFor="newTab" className="text-sm">
              Open in a new Tab
            </label>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-3 pt-4">
            <button
              onClick={() => setIsEditModalOpen(false)}
              className="px-6 py-2 border rounded-lg text-sm"
            >
              Cancel
            </button>
            {/* <button
                onClick={() => setIsEditModalOpen(false)}
                className="px-6 py-2 bg-red-500 text-white rounded-lg text-sm"
              >
                Delete
              </button> */}
            <button
              onClick={() => {
                // Handle save
                setIsEditModalOpen(false);
              }}
              className="px-6 py-2 bg-primary text-white rounded-lg text-sm"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditCms;
