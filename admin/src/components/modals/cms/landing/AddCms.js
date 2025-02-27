import React, { useState } from "react";
import { AiOutlineCloudUpload } from "react-icons/ai";

const AddCms = ({ setIsAddModalOpen }) => {
  const [openInNewTab, setOpenInNewTab] = useState(false);
  const [link, setLink] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);

  return (
    <div>
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Add Image Overlay</h2>
          <button
            onClick={() => setIsAddModalOpen(false)}
            className="text-gray-400 hover:text-gray-600"
          >
            ✕
          </button>
        </div>

        <div className="space-y-6">
          {/* Preview Image */}
          <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden">
            {selectedImage ? (
              <img
                src={URL.createObjectURL(selectedImage)}
                alt="Preview"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-400">
                No image selected
              </div>
            )}
          </div>

          {/* Upload Icon */}
          <div className="flex justify-center">
            <label className="cursor-pointer text-primary flex flex-col items-center">
              <AiOutlineCloudUpload size={24} />
              <span className="text-sm">Click to Add icon</span>
              <input
                type="file"
                className="hidden"
                accept="image/*"
                onChange={(e) => setSelectedImage(e.target.files[0])}
              />
            </label>
          </div>

          {/* Link Input */}
          <div>
            <label className="block text-sm mb-2">
              Available Link
              <span className="text-red-500">*</span> Required
            </label>
            <input
              type="text"
              value={link}
              onChange={(e) => setLink(e.target.value)}
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
              onClick={() => setIsAddModalOpen(false)}
              className="px-6 py-2 border rounded-lg text-sm"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                // Handle save
                console.log({
                  image: selectedImage,
                  link,
                  openInNewTab
                });
                setIsAddModalOpen(false);
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

export default AddCms;