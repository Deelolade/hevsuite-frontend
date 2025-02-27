import React, { useState } from "react";

const EditFooter = ({ setIsEditFooterModalOpen }) => {
  const [footerTitle, setFooterTitle] = useState("");
  const [footerLink, setFooterLink] = useState("");
  const [footerVisibility, setFooterVisibility] = useState(false);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Edit Footer</h2>
        <button
          onClick={() => setIsEditFooterModalOpen(false)}
          className="text-gray-400 hover:text-gray-600"
        >
          ✕
        </button>
      </div>

      <div className="space-y-6">
        {/* Footer Title */}
        <div>
          <label className="block text-sm mb-2">Footer Title</label>
          <input
            type="text"
            value={footerTitle}
            onChange={(e) => setFooterTitle(e.target.value)}
            placeholder="Footer Title"
            className="w-full px-3 py-2 border rounded-lg text-sm"
          />
        </div>

        {/* Link */}
        <div>
          <label className="block text-sm mb-2">Link (available)</label>
          <input
            type="text"
            value={footerLink}
            onChange={(e) => setFooterLink(e.target.value)}
            placeholder="Enter link/url"
            className="w-full px-3 py-2 border rounded-lg text-sm"
          />
        </div>

        {/* Visibility */}
        <div>
          <label className="block text-sm mb-2">Visibility</label>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={footerVisibility}
              onChange={(e) => setFooterVisibility(e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-500 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
          </label>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-3 pt-4">
          <button
            onClick={() => setIsEditFooterModalOpen(false)}
            className="px-6 py-2 border rounded-lg text-sm"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              // Handle save changes
              setIsEditFooterModalOpen(false);
            }}
            className="px-6 py-2 bg-primary text-white rounded-lg text-sm"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditFooter;