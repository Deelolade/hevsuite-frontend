import React, { useState } from "react";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { addNewCMS } from "../../../../store/cms/cmsSlice";
import toast from "react-hot-toast";

const AddCms = ({ setIsAddModalOpen, refreshData }) => {
  const dispatch = useDispatch();
  const [openInNewTab, setOpenInNewTab] = useState(false);
  const [link, setLink] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSave = async () => {
    // Validate inputs
    if (!selectedImage) {
      toast.error("Please select an image");
      return;
    }

    if (!link) {
      toast.error("Please enter a link");
      return;
    }

    try {
      setIsLoading(true);
      
      // Create FormData for file upload
      const formData = new FormData();
      formData.append("image", selectedImage);
      formData.append("link", link);
      formData.append("openInNewTab", openInNewTab);
      formData.append("visibility", true); // Default to visible

      // Dispatch the action
      await dispatch(addNewCMS(formData)).unwrap();

      // // Show success message
      // toast.success("Landing page added successfully");
      
      // Close modal and refresh data
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
    <div>
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Add Image Overlay</h2>
          <button
            onClick={() => setIsAddModalOpen(false)}
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
              <span className="text-sm">Click to upload image</span>
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
            <label htmlFor="newTab" className="text-sm">
              Open in a new tab
            </label>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-3 pt-4">
            <button
              onClick={() => setIsAddModalOpen(false)}
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
              {isLoading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Saving...
                </span>
              ) : (
                "Save"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddCms;