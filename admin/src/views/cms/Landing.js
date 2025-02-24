import React, { useState } from "react";
import Modal from "react-modal";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { FiSettings } from "react-icons/fi";
const Landing = () => {
  const [activeFilter, setActiveFilter] = useState("overlays");
  const [statusFilter, setStatusFilter] = useState("active");
  const [openSettingsId, setOpenSettingsId] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isRemoveModalOpen, setIsRemoveModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [editLink, setEditLink] = useState("");
  const [openInNewTab, setOpenInNewTab] = useState(false);

  const items = [
    {
      id: 1,
      preview: "/path/to/image1.jpg",
      lastModified: "July 22, 2024 - 10:45pm",
      isVisible: true,
    },
    {
      id: 2,
      preview: "/path/to/image2.jpg",
      lastModified: "July 22, 2024 - 10:45pm",
      isVisible: true,
    },
    {
      id: 3,
      preview: "/path/to/image3.jpg",
      lastModified: "July 22, 2024 - 10:45pm",
      isVisible: true,
    },
  ];

  const handleEdit = (item) => {
    setSelectedItem(item);
    setEditLink("www.x.com/hermandai/profile!");
    setIsEditModalOpen(true);
    setOpenSettingsId(null); // Close the dropdown when edit is clicked
  };

  const handleRemove = (item) => {
    setSelectedItem(item);
    setIsRemoveModalOpen(true);
    setOpenSettingsId(null); // Close the dropdown when remove is clicked
  };
  return (
    <div>
      {/* Filters and Add Button */}
      <div className="flex justify-between items-center">
        <div className="flex gap-4">
          <select
            value={activeFilter}
            onChange={(e) => setActiveFilter(e.target.value)}
            className="px-4 py-2 border rounded-lg text-gray-600 min-w-[200px]"
          >
            <option value="overlays">Image Overlays</option>
            <option value="other">Other options</option>
          </select>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 border rounded-lg text-gray-600 min-w-[200px]"
          >
            <option value="active">Active</option>
            <option value="deleted">Deleted</option>
          </select>
        </div>
        <button className="px-6 py-2 bg-[#540A26] text-white rounded-lg">
          Add
        </button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg">
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="text-left py-4 px-6 text-sm font-medium">Item</th>
              <th className="text-left py-4 px-6 text-sm font-medium">
                Preview
              </th>
              <th className="text-left py-4 px-6 text-sm font-medium">
                Last Modified
              </th>
              <th className="text-left py-4 px-6 text-sm font-medium">
                Visibility
              </th>
              <th className="text-left py-4 px-6 text-sm font-medium">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, index) => (
              <tr key={item.id} className="border-b">
                <td className="py-4 px-6">{index + 1}</td>
                <td className="py-4 px-6">
                  <div className="w-24 h-16 bg-gray-200 rounded-lg overflow-hidden">
                    <img
                      src={item.preview}
                      alt="Preview"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </td>
                <td className="py-4 px-6 text-sm text-gray-600">
                  {item.lastModified}
                </td>
                <td className="py-4 px-6">
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={item.isVisible}
                      className="sr-only peer"
                      onChange={() => {}}
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#540A26]"></div>
                  </label>
                </td>
                <td className="py-4 px-6 relative">
                  <button
                    className="text-gray-400 hover:text-gray-600"
                    onClick={() =>
                      setOpenSettingsId(
                        openSettingsId === item.id ? null : item.id
                      )
                    }
                  >
                    <FiSettings size={20} />
                  </button>

                  {/* Settings Dropdown */}
                  {openSettingsId === item.id && (
                    <div className="absolute right-6 mt-2 w-32 bg-white rounded-lg shadow-lg border py-1 z-10">
                      <button
                        className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50"
                        onClick={() => handleEdit(item)}
                      >
                        Edit
                      </button>
                      <button
                        className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 text-red-500"
                        onClick={() => handleRemove(item)}
                      >
                        Remove
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Edit Modal */}
      <Modal
        isOpen={isEditModalOpen}
        onRequestClose={() => setIsEditModalOpen(false)}
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg w-[450px]"
        overlayClassName="fixed inset-0 bg-black/50"
      >
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
              <button className="text-[#540A26]">
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
                className="rounded border-gray-300 text-[#540A26] focus:ring-[#540A26]"
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
              <button
                onClick={() => setIsEditModalOpen(false)}
                className="px-6 py-2 bg-red-500 text-white rounded-lg text-sm"
              >
                Delete
              </button>
              <button
                onClick={() => {
                  // Handle save
                  setIsEditModalOpen(false);
                }}
                className="px-6 py-2 bg-[#540A26] text-white rounded-lg text-sm"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </Modal>

      {/* Remove Modal */}
      <Modal
        isOpen={isRemoveModalOpen}
        onRequestClose={() => setIsRemoveModalOpen(false)}
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg w-[450px]"
        overlayClassName="fixed inset-0 bg-black/50"
      >
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
      </Modal>
    </div>
  );
};

export default Landing;
