"use client"

import React, { useState } from "react";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { addNewCMS } from "../../../../store/cms/cmsSlice";
import toast from "react-hot-toast";

const AddCms = ({ setIsAddModalOpen, refreshData }) => {
  const dispatch = useDispatch();
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [link, setLink] = useState("");
  const [openInNewTab, setOpenInNewTab] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Require either image or video
    if (!selectedImage && !selectedVideo) {
      toast.error("Please upload an image or a video");
      return;
    }

    if (!link.trim()) {
      toast.error("Please enter a link URL");
      return;
    }

      setIsLoading(true);
      
      const formData = new FormData();
      formData.append("link", link);
      formData.append("openInNewTab", openInNewTab);
    // Append either image or video file
    if (selectedImage) {
      formData.append("media", selectedImage); // Use 'media' field name as in backend
    } else if (selectedVideo) {
      formData.append("media", selectedVideo); // Use 'media' field name as in backend
    }

    try {
      await dispatch(addNewCMS(formData)).unwrap();
      toast.success("Landing page added successfully");
      setIsAddModalOpen(false);
      refreshData();
    } catch (error) {
      console.error("Error adding landing page:", error);
      toast.error(error.message || "Failed to add landing page");
    } finally {
      setIsLoading(false);
    }
  };

  return (
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Add New Landing Page Item</h2>
        <button onClick={() => setIsAddModalOpen(false)} className="text-gray-400" disabled={isLoading}>
            ✕
          </button>
        </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Preview Image or Video */}
        <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden flex items-center justify-center">
            {selectedImage ? (
              <img
                src={URL.createObjectURL(selectedImage)}
                alt="Preview"
                className="w-full h-full object-cover"
              />
          ) : selectedVideo ? (
            <video
              src={URL.createObjectURL(selectedVideo)}
              controls
              className="w-full h-full object-cover"
            />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-400">
              No image or video selected
              </div>
            )}
          </div>

        {/* Upload Image or Video */}
        <div className="flex justify-center gap-4">
          {/* Upload Image */}
            <label className="cursor-pointer text-primary flex flex-col items-center">
              <AiOutlineCloudUpload size={24} />
            <span className="text-sm">Upload Image</span>
              <input
                type="file"
                className="hidden"
                accept="image/*"
                onChange={(e) => {
                  if (e.target.files && e.target.files[0]) {
                    setSelectedImage(e.target.files[0]);
                  setSelectedVideo(null); // Clear video when image is selected
                }
              }}
              disabled={isLoading}
            />
          </label>
          {/* Upload Video */}
          <label className="cursor-pointer text-primary flex flex-col items-center">
            <AiOutlineCloudUpload size={24} />
            <span className="text-sm">Upload Video</span>
            <input
              type="file"
              className="hidden"
              accept="video/*"
              onChange={(e) => {
                if (e.target.files && e.target.files[0]) {
                  setSelectedVideo(e.target.files[0]);
                  setSelectedImage(null); // Clear image when video is selected
                  }
                }}
                disabled={isLoading}
              />
            </label>
          </div>

          {/* Link Input */}
          <div>
            <label className="block text-sm mb-2">
              Link URL
              <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={link}
              onChange={(e) => setLink(e.target.value)}
              placeholder="https://example.com/path"
              className="w-full px-3 py-2 border rounded-lg text-sm"
              disabled={isLoading}
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
              disabled={isLoading}
            />
          <label htmlFor="newTab" className="text-sm text-gray-700">
            Open link in new tab
            </label>
          </div>

        {/* Submit Button */}
        <div className="flex justify-end">
            <button
            type="submit"
            className="px-6 py-2 bg-primary text-white rounded-lg font-semibold"
              disabled={isLoading}
            >
            {isLoading ? "Adding..." : "Add Item"}
            </button>
        </div>
      </form>
    </div>
  );
};

export default AddCms;