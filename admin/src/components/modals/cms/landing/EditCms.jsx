import React, { useState, useEffect } from "react";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { editCMS } from "../../../../store/cms/cmsSlice";
import toast from "react-hot-toast";

const EditCms = ({ setIsEditModalOpen, selectedItem, refreshData }) => {
  const dispatch = useDispatch();
  const [openInNewTab, setOpenInNewTab] = useState(false);
  const [editLink, setEditLink] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (selectedItem) {
      setEditLink(selectedItem.link || "");
      setOpenInNewTab(selectedItem.openInNewTab || false);
    }
  }, [selectedItem]);

  const handleSave = async () => {
    if (!editLink) {
      toast.error("Please enter a link");
      return;
    }

    try {
      setIsLoading(true);
      
      const formData = new FormData();
      if (selectedImage) {
        formData.append("image", selectedImage);
      }
      formData.append("link", editLink);
      formData.append("openInNewTab", openInNewTab);

      await dispatch(editCMS({
        id: selectedItem._id,
        data: formData
      })).unwrap();

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
          <h2 className="text-xl font-semibold">Edit Image Overlay</h2>
          <button
            onClick={() => setIsEditModalOpen(false)}
            className="text-gray-400 hover:text-gray-600"
            disabled={isLoading}
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
            ) : selectedItem?.image ? (
              <img
                src={selectedItem.image}
                alt="Preview"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-400">
                No image selected
              </div>
            )}
          </div>

          {/* Upload Image */}
          <div className="flex justify-center">
            <label className="cursor-pointer text-primary flex flex-col items-center">
              <AiOutlineCloudUpload size={24} />
              <span className="text-sm">Click to change image</span>
              <input
                type="file"
                className="hidden"
                accept="image/*"
                onChange={(e) => {
                  if (e.target.files && e.target.files[0]) {
                    setSelectedImage(e.target.files[0]);
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
              value={editLink}
              onChange={(e) => setEditLink(e.target.value)}
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
            <label htmlFor="newTab" className="text-sm">
              Open in a new tab
            </label>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-3 pt-4">
            <button
              onClick={() => setIsEditModalOpen(false)}
              className="px-6 py-2 border rounded-lg text-sm"
              disabled={isLoading}
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="px-6 py-2 bg-primary text-white rounded-lg text-sm disabled:opacity-50"
              disabled={isLoading}
            >
              {isLoading ? "Saving..." : "Save"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditCms;