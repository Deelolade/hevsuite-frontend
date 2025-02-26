import React, { useState } from "react";
import Modal from "react-modal";
import { FiSettings } from "react-icons/fi";
import party from "../../assets/party.jpg"
import party2 from "../../assets/party2.jpg"
import party3 from "../../assets/party3.jpg"

import EditCms from "../../components/modals/cms/landing/EditCms"
import RemoveCms from "../../components/modals/cms/landing/RemoveCms"

const Landing = () => {
  const [activeFilter, setActiveFilter] = useState("overlays");
  const [statusFilter, setStatusFilter] = useState("active");
  const [openSettingsId, setOpenSettingsId] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isRemoveModalOpen, setIsRemoveModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const items = [
    {
      id: 1,
      preview: party,
      lastModified: "July 22, 2024 - 10:45pm",
      isVisible: true,
    },
    {
      id: 2,
      preview: party2,
      lastModified: "July 22, 2024 - 10:45pm",
      isVisible: true,
    },
    {
      id: 3,
      preview: party3,
      lastModified: "July 22, 2024 - 10:45pm",
      isVisible: true,
    },
  ];

  const handleEdit = (item) => {
    setSelectedItem(item);
    // setEditLink("www.x.com/hermandai/profile!");
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
        <button className="px-6 py-2 bg-primary text-white rounded-lg">
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
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
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
        <EditCms setIsEditModalOpen={setIsEditModalOpen} selectedItem={selectedItem}/>
      </Modal>

      {/* Remove Modal */}
      <Modal
        isOpen={isRemoveModalOpen}
        onRequestClose={() => setIsRemoveModalOpen(false)}
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg w-[450px]"
        overlayClassName="fixed inset-0 bg-black/50"
      >
        <RemoveCms setIsRemoveModalOpen={setIsRemoveModalOpen} selectedItem={selectedItem}/>
        
      </Modal>
    </div>
  );
};

export default Landing;
