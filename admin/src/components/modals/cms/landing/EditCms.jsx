"use client"

import React, { useState, useEffect } from "react";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { editCMS, removeCMS } from "../../../../store/cms/cmsSlice";
import toast from "react-hot-toast";
import Modal from "react-modal";
import RemoveCms from "./RemoveCms";

const EditCms = ({ setIsEditModalOpen, selectedItem, refreshData }) => {
  const dispatch = useDispatch();
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [editLink, setEditLink] = useState("");
  const [openInNewTab, setOpenInNewTab] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isRemoveModalOpen, setIsRemoveModalOpen] = useState(false);

  useEffect(() => {
    if (selectedItem) {
      setEditLink(selectedItem.link || "");
      setOpenInNewTab(selectedItem.openInNewTab || false);
      setSelectedImage(null);
      setSelectedVideo(null);
    }
  }, [selectedItem]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!editLink.trim()) {
      toast.error("Please enter a link URL");
      return;
    }

    if (!selectedItem?.file && !selectedItem?.fileType && !selectedImage && !selectedVideo) {
      toast.error("Please upload an image or a video");
      return;
    }

      setIsLoading(true);
      
      const formData = new FormData();
      formData.append("link", editLink);
      formData.append("openInNewTab", openInNewTab);

    if (selectedImage) {
      formData.append("media", selectedImage);
    } else if (selectedVideo) {
      formData.append("media", selectedVideo);
    }

    try {
      await dispatch(editCMS({ id: selectedItem._id, data: formData })).unwrap();
      toast.success("Landing page updated successfully");
      setIsEditModalOpen(false);
      refreshData();
    } catch (error) {
      console.error("Error updating landing page:", error);
      toast.error(error.message || "Failed to update landing page");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Edit Landing Page Item</h2>
          <button
            onClick={() => setIsEditModalOpen(false)}
            className="text-gray-400 hover:text-gray-600"
            disabled={isLoading}
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
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
            ) : selectedItem?.fileType === 'video' ? (
              <video
                src={selectedItem.file}
                controls
                className="w-full h-full object-cover"
              />
            ) : selectedItem?.file ? (
              <img
                src={selectedItem.file}
                alt="Preview"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-400">
                No image or video selected
              </div>
            )}
          </div>

          <div className="flex justify-center gap-4">
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
                    setSelectedVideo(null);
                  }
                }}
                disabled={isLoading}
              />
            </label>
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
                    setSelectedImage(null);
                  }
                }}
                disabled={isLoading}
              />
            </label>
          </div>

          <div>
            <label className="block text-sm mb-2">
              Link URL
              <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={editLink}
              onChange={(e) => setEditLink(e.target.value)}
              placeholder="https://example.com/path"
              className="w-full px-3 py-2 border rounded-lg text-sm"
              disabled={isLoading}
            />
          </div>

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

          <div className="flex justify-between pt-4 space-x-4">
            <button
              type="button"
              onClick={() => setIsEditModalOpen(false)}
              className="px-6 py-2 border rounded-lg text-gray-700 hover:bg-gray-100 font-semibold"
              disabled={isLoading}
            >
              Cancel
            </button>

            <div className="flex space-x-4">
              <button
                type="button"
                onClick={() => {
                  setIsRemoveModalOpen(true);
                  setIsEditModalOpen(false);
                }}
                className="px-6 py-2 bg-[#900C3F] text-white rounded-lg font-semibold hover:bg-red-700"
                disabled={isLoading}
              >
                Delete
              </button>

            <button
                type="submit"
                className="px-6 py-2 bg-[#900C3F] text-white rounded-lg font-semibold hover:bg-red-700"
              disabled={isLoading}
            >
              {isLoading ? "Saving..." : "Save"}
            </button>
          </div>
        </div>
        </form>
      </div>

      <Modal
        isOpen={isRemoveModalOpen}
        onRequestClose={() => setIsRemoveModalOpen(false)}
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg w-[90vw] md:w-[450px]"
        overlayClassName="fixed inset-0 bg-black/50 superZ"
      >
        <RemoveCms setIsRemoveModalOpen={setIsRemoveModalOpen} selectedItem={selectedItem} refreshData={refreshData} />
      </Modal>
    </div>
  );
};

export default EditCms;