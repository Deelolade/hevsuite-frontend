import React, { useState } from "react";
import Modal from "react-modal";
import DeleteMenuModal from "../../components/modals/cms/menu/DeleteMenuModal";

const EditMenu = ({ setIsEditMenuOpen, setMenuVisibility, menuVisibility }) => {
  const [selectedPages, setSelectedPages] = useState(["Page 1"]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  // Sample pages - replace with your actual pages
  const availablePages = [
    "Home",
    "About Us",
    "Products",
    "Services",
    "Contact",
    "Blog",
  ];

  const handlePageSelect = (page) => {
    if (!selectedPages.includes(page)) {
      setSelectedPages([...selectedPages, page]);
    }
    setIsDropdownOpen(false);
  };

  const handleRemovePage = (pageToRemove) => {
    setSelectedPages(selectedPages.filter((page) => page !== pageToRemove));
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Edit Menu</h2>
        <button
          onClick={() => setIsEditMenuOpen(false)}
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
            value="Products"
            className="w-full px-3 py-2 border rounded-lg text-sm"
          />
        </div>

        {/* Link */}
        <div>
          <label className="block text-sm mb-2">Link (available)</label>
          <input
            type="text"
            value="https://hermandai.com/products"
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
                className="sr-only peer"
                onChange={(e) => setMenuVisibility(e.target.checked)}
              />
              <div className="w-11 h-6 bg-gray-500 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
            </label>
          </div>
          <div className="relative">
            <label className="block text-sm mb-2">Add Menu Pages</label>
            <div className="space-y-2">
              <div className="flex flex-wrap items-center gap-2">
                {selectedPages.map((page, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 border rounded-lg text-sm flex items-center gap-2"
                  >
                    {page}
                    <button
                      className="text-gray-400 hover:text-gray-600"
                      onClick={() => handleRemovePage(page)}
                    >
                      ✕
                    </button>
                  </span>
                ))}
              </div>
              <div className="relative">
                <button
                  className="px-4 py-2 border rounded-lg text-sm w-full flex justify-between items-center"
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                >
                  Select Pages
                  <svg
                    className={`w-4 h-4 transform transition-transform ${
                      isDropdownOpen ? "rotate-180" : ""
                    }`}
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

                {isDropdownOpen && (
                  <div className="absolute z-10 mt-1 w-full bg-white border rounded-lg shadow-lg max-h-48 overflow-y-auto">
                    {availablePages.map((page, index) => (
                      <button
                        key={index}
                        className={`w-full px-4 py-2 text-left text-sm hover:bg-gray-50 ${
                          selectedPages.includes(page)
                            ? "text-gray-400"
                            : "text-gray-700"
                        }`}
                        onClick={() => handlePageSelect(page)}
                        disabled={selectedPages.includes(page)}
                      >
                        {page}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-3 pt-4">
          <button
            onClick={() => setIsEditMenuOpen(false)}
            className="px-6 py-2 border rounded-lg text-sm"
          >
            Cancel
          </button>
          <button
            onClick={() => setIsDeleteModalOpen(true)}
            className="px-6 py-2 bg-red-500 text-white rounded-lg text-sm"
          >
            Delete Menu
          </button>
          <button
            onClick={() => {
              // Handle save changes
              setIsEditMenuOpen(false);
            }}
            className="px-6 py-2 bg-primary text-white rounded-lg text-sm"
          >
            Save Changes
          </button>
        </div>
      </div>
      <Modal
        isOpen={isDeleteModalOpen}
        onRequestClose={() => setIsDeleteModalOpen(false)}
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg w-[450px]"
        overlayClassName="fixed inset-0 bg-black/50"
      >
        <DeleteMenuModal setIsDeleteModalOpen={setIsDeleteModalOpen} />
      </Modal>
    </div>
  );
};

export default EditMenu;
