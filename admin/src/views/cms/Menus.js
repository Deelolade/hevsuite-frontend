import React, { useState } from "react";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import { BsArrowRight } from "react-icons/bs";
import Modal from "react-modal";
import EditMenu from "./EditMenu";
import AddPage from "./AddPage";

// Add new state
const Menus = () => {
  const [selectedMenu, setSelectedMenu] = useState(1);
  const [currentPage, setCurrentPage] = useState(2);
  const [isAddMenuOpen, setIsAddMenuOpen] = useState(false);
  const [menuTitle, setMenuTitle] = useState("");
  const [menuLink, setMenuLink] = useState("");
  const [menuVisibility, setMenuVisibility] = useState(false);
  const [isEditMenuOpen, setIsEditMenuOpen] = useState(false);
  const [showAddPage, setShowAddPage] = useState(false);
  const [isRemoveModalOpen, setIsRemoveModalOpen] = useState(false);
  const menus = [
    { id: 1, name: "Menu 1" },
    { id: 2, name: "Menu 2" },
    { id: 3, name: "Menu 3" },
    { id: 4, name: "Menu 4" },
  ];
  const menuItems = [
    { id: 1, title: "Terms and Condition", visibility: true, owner: "System" },
    { id: 2, title: "Terms and Condition", visibility: false, owner: "System" },
    { id: 3, title: "Terms and Condition", visibility: true, owner: "System" },
    { id: 4, title: "Terms and Condition", visibility: true, owner: "System" },
    { id: 5, title: "Terms and Condition", visibility: true, owner: "System" },
    { id: 6, title: "Terms and Condition", visibility: false, owner: "System" },
  ];
  return (
    <div className="space-y-6">
      {/* Controls */}
      {showAddPage ? (
        <AddPage />
      ) : (
        <>
          <div className="flex justify-end items-center gap-2">
            <select className="px-4 py-2 border rounded-lg text-gray-600 min-w-[200px]">
              <option>Active</option>
              <option>Deleted</option>
            </select>
            <div className="flex gap-3">
              <button
                className="px-6 py-2 border rounded-lg"
                onClick={() => setIsEditMenuOpen(true)}
              >
                Edit Menu
              </button>
              <button
                className="px-6 py-2 bg-[#540A26] text-white rounded-lg"
                onClick={() => setIsAddMenuOpen(true)}
              >
                Add Menu
              </button>
              <Modal
                isOpen={isAddMenuOpen}
                onRequestClose={() => setIsAddMenuOpen(false)}
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg w-[450px]"
                overlayClassName="fixed inset-0 bg-black/50"
              >
                <div className="p-6">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-semibold">Add Menu</h2>
                    <button
                      onClick={() => setIsAddMenuOpen(false)}
                      className="text-gray-400 hover:text-gray-600"
                    >
                      ✕
                    </button>
                  </div>

                  <div className="space-y-6">
                    {/* Menu Title */}
                    <div>
                      <label className="block text-sm mb-2">Menu Title</label>
                      <input
                        type="text"
                        value={menuTitle}
                        onChange={(e) => setMenuTitle(e.target.value)}
                        placeholder="Menu Title"
                        className="w-full px-3 py-2 border rounded-lg text-sm"
                      />
                    </div>

                    {/* Link */}
                    <div>
                      <label className="block text-sm mb-2">
                        Link (available)
                      </label>
                      <input
                        type="text"
                        value={menuLink}
                        onChange={(e) => setMenuLink(e.target.value)}
                        placeholder="Enter link/url"
                        className="w-full px-3 py-2 border rounded-lg text-sm"
                      />
                    </div>

                    {/* Visibility and Pages */}
                    <div className="flex justify-between items-center">
                      <div>
                        <label className="block text-sm mb-2">Visibility</label>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={menuVisibility}
                            onChange={(e) =>
                              setMenuVisibility(e.target.checked)
                            }
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#540A26]"></div>
                        </label>
                      </div>
                      <div>
                        <label className="block text-sm mb-2">
                          Add Menu Pages
                        </label>
                        <button className="px-4 py-2 border rounded-lg text-sm w-full flex justify-between items-center">
                          Select Pages
                          <svg
                            className="w-4 h-4"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </button>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex justify-end gap-3 pt-4">
                      <button
                        onClick={() => setIsAddMenuOpen(false)}
                        className="px-6 py-2 border rounded-lg text-sm"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={() => {
                          // Handle save changes
                          setIsAddMenuOpen(false);
                        }}
                        className="px-6 py-2 bg-[#540A26] text-white rounded-lg text-sm"
                      >
                        Save Changes
                      </button>
                    </div>
                  </div>
                </div>
              </Modal>
            </div>
          </div>

          {/* Menu Navigation */}
          <div className="flex items-center justify-center gap-4">
            <button className="text-gray-400">
              <svg
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>

            <div className="flex gap-4">
              {menus.map((menu) => (
                <button
                  key={menu.id}
                  className={`px-6 py-2 rounded-lg flex items-center gap-2 ${
                    selectedMenu === menu.id
                      ? "bg-[#540A26] text-white"
                      : "border text-gray-600"
                  }`}
                  onClick={() => setSelectedMenu(menu.id)}
                >
                  {menu.name}
                  <BsArrowRight />
                </button>
              ))}
            </div>

            <button className="text-gray-400">
              <svg
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>

          <div className="flex justify-end">
            <button
              className="px-6 py-2 bg-[#540A26] text-white rounded-lg"
              onClick={() => setShowAddPage(true)}
            >
              Add New Page
            </button>
          </div>
          <div className="bg-white rounded-lg">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-4 px-6 text-sm font-medium">
                    Page Title
                  </th>
                  <th className="text-left py-4 px-6 text-sm font-medium">
                    Visibility
                  </th>
                  <th className="text-left py-4 px-6 text-sm font-medium">
                    Owner
                  </th>
                  <th className="text-left py-4 px-6 text-sm font-medium">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {menuItems.map((item) => (
                  <tr key={item.id} className="border-b">
                    <td className="py-4 px-6 flex items-center gap-2">
                      <span className="p-1 border rounded">⋮⋮</span>
                      {item.title}
                    </td>
                    <td className="py-4 px-6">
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={item.visibility}
                          className="sr-only peer"
                          onChange={() => {}}
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#540A26]"></div>
                      </label>
                    </td>
                    <td className="py-4 px-6 text-sm text-gray-600">
                      {item.owner}
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex gap-4">
                        <button className="text-[#540A26]">
                          <FiEdit size={18} />
                        </button>
                        <button
                          className="text-[#540A26]"
                          onClick={() => setIsRemoveModalOpen(true)}
                        >
                          <FiTrash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between">
            <div>
              Show result:
              <select className="ml-2 px-2 py-1 border rounded">
                <option>6</option>
              </select>
            </div>
            <div className="flex items-center gap-2">
              <button className="p-1 text-gray-400">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>
              {[1, 2, 3, 4, "...", 20].map((page, index) => (
                <button
                  key={index}
                  className={`w-8 h-8 flex items-center justify-center rounded-lg ${
                    currentPage === page
                      ? "bg-green-800 text-white"
                      : "text-gray-600"
                  }`}
                >
                  {page}
                </button>
              ))}
              <button className="p-1 text-gray-400">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </div>
          </div>
          <Modal
            isOpen={isEditMenuOpen}
            onRequestClose={() => setIsEditMenuOpen(false)}
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg w-[450px]"
            overlayClassName="fixed inset-0 bg-black/50"
          >
            <EditMenu setIsEditMenuOpen={setIsEditMenuOpen} />
          </Modal>

          <Modal
            isOpen={isRemoveModalOpen}
            onRequestClose={() => setIsRemoveModalOpen(false)}
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg w-[450px]"
            overlayClassName="fixed inset-0 bg-black/50"
          >
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-2">
                  <span className="text-red-500 text-xl">⚠</span>
                  <h2 className="text-xl font-semibold">Remove Content</h2>
                </div>
                <button
                  onClick={() => setIsRemoveModalOpen(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-6">
                <p className="text-gray-600">
                  Are you sure you want to remove this content? Removing this
                  content will permanently erase it from the website when saved.
                </p>

                {/* Action Buttons */}
                <div className="flex justify-end gap-3 pt-4">
                  <button
                    onClick={() => setIsRemoveModalOpen(false)}
                    className="px-6 py-2 border rounded-lg text-sm"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => {
                      // Handle remove
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
        </>
      )}
    </div>
  );
};

export default Menus;
