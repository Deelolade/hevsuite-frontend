import React, { useState } from "react";

const EditMenu = ({ setIsEditMenuOpen }) => {
  const [selectedPages, setSelectedPages] = useState(["Page 1"]);
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
                checked={true}
                className="sr-only peer"
                onChange={() => {}}
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#540A26]"></div>
            </label>
          </div>
          <div>
            <label className="block text-sm mb-2">Add Menu Pages</label>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 border rounded-lg text-sm flex items-center gap-2">
                  Page 1
                  <button className="text-gray-400 hover:text-gray-600">
                    ✕
                  </button>
                </span>
              </div>
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
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-3 pt-4">
          <button
            onClick={() => setIsEditMenuOpen(false)}
            className="px-6 py-2 border rounded-lg text-sm"
          >
            Cancel
          </button>
          <button className="px-6 py-2 bg-red-500 text-white rounded-lg text-sm">
            Delete Menu
          </button>
          <button
            onClick={() => {
              // Handle save changes
              setIsEditMenuOpen(false);
            }}
            className="px-6 py-2 bg-[#540A26] text-white rounded-lg text-sm"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditMenu;
