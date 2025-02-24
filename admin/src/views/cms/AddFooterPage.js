import React, { useState } from "react";
import { BsArrowLeft } from "react-icons/bs";
import { AiOutlineCloudUpload } from "react-icons/ai";

const AddFooterPage = ({ onBack }) => {
  const [title, setTitle] = useState("");
  const [buttonText, setButtonText] = useState("");
  const [link, setLink] = useState("");

  return (
    <div className="space-y-6">
      {/* Header with back button */}
      <div className="flex items-center gap-2">
        <button className="text-gray-600" onClick={onBack}>
          <BsArrowLeft size={20} />
        </button>
        <span>Add New Page</span>
      </div>

      {/* Page Title */}
      <div className="bg-white rounded-lg p-4">
        <div>
          <label className="block text-sm mb-2">Page Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
            className="w-full px-3 py-2 border rounded-lg text-sm"
          />
        </div>
        <button className="mt-4 px-4 py-2 bg-[#540A26] text-white rounded-lg text-sm">
          Add Slide
        </button>
      </div>

      {/* Hero Section */}
      <div className="bg-white rounded-lg p-4 space-y-4">
        <h3 className="font-medium">Hero Section</h3>
        <div className="bg-gray-50 rounded-lg p-8 flex flex-col items-center justify-center min-h-[200px]">
          <button className="text-[#540A26] flex flex-col items-center gap-2">
            <AiOutlineCloudUpload size={24} />
            <span className="text-sm">Click to Add image/Video</span>
          </button>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm mb-2">Button Text</label>
            <input
              type="text"
              value={buttonText}
              onChange={(e) => setButtonText(e.target.value)}
              placeholder="Add text"
              className="w-full px-3 py-2 border rounded-lg text-sm"
            />
          </div>
          <div>
            <label className="block text-sm mb-2">Available Link</label>
            <input
              type="text"
              value={link}
              onChange={(e) => setLink(e.target.value)}
              placeholder="link"
              className="w-full px-3 py-2 border rounded-lg text-sm"
            />
          </div>
        </div>
        <div className="flex justify-end">
          <button className="px-4 py-2 bg-[#540A26] text-white rounded-lg text-sm">
            Remove Slide
          </button>
        </div>
      </div>

      {/* Rich Text Editor */}
      <div className="bg-white rounded-lg p-4">
        <div className="border-b pb-2 mb-4">
          <div className="flex items-center gap-2">
            <select className="text-sm border rounded-lg px-2 py-1">
              <option>Normal text</option>
            </select>
            <div className="flex items-center gap-1 border-l pl-2">
              <button className="p-1 hover:bg-gray-100 rounded">B</button>
              <button className="p-1 hover:bg-gray-100 rounded">I</button>
              <button className="p-1 hover:bg-gray-100 rounded">U</button>
              <button className="p-1 hover:bg-gray-100 rounded">S</button>
            </div>
            <div className="flex items-center gap-1 border-l pl-2">
              <button className="p-1 hover:bg-gray-100 rounded">{"<>"}</button>
              <button className="p-1 hover:bg-gray-100 rounded">🔗</button>
            </div>
            <div className="flex items-center gap-1 border-l pl-2">
              <button className="p-1 hover:bg-gray-100 rounded">•</button>
              <button className="p-1 hover:bg-gray-100 rounded">1.</button>
            </div>
            <div className="flex items-center gap-1 border-l pl-2">
              <button className="p-1 hover:bg-gray-100 rounded">⇱</button>
              <button className="p-1 hover:bg-gray-100 rounded">""</button>
            </div>
            <div className="flex items-center gap-1 ml-auto">
              <button className="p-1 hover:bg-gray-100 rounded">≡</button>
              <button className="p-1 hover:bg-gray-100 rounded">=</button>
              <button className="p-1 hover:bg-gray-100 rounded">≣</button>
            </div>
          </div>
        </div>
        <div className="min-h-[200px] flex items-center justify-center">
          <button className="text-gray-400 text-3xl">+</button>
        </div>
        <div className="flex justify-end mt-4">
          <button className="px-4 py-2 bg-[#540A26] text-white rounded-lg text-sm">
            Save
          </button>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-end gap-3">
        <button className="px-6 py-2 border rounded-lg text-sm">Preview</button>
        <button className="px-6 py-2 bg-red-500 text-white rounded-lg text-sm">
          Remove
        </button>
        <button className="px-6 py-2 bg-green-800 text-white rounded-lg text-sm">
          Confirm
        </button>
      </div>
    </div>
  );
};

export default AddFooterPage;
