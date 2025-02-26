import React, { useState } from "react";
import { FiEdit } from "react-icons/fi";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";
import Modal from "react-modal";
import AddFooterPage from "./AddFooterPage";

const Footer = () => {
  const [selectedSection, setSelectedSection] = useState("policies");
  const [currentPage, setCurrentPage] = useState(2);
  const [isAddFooterOpen, setIsAddFooterOpen] = useState(false);
  const [footerTitle, setFooterTitle] = useState("");
  const [footerLink, setFooterLink] = useState("");
  const [footerVisibility, setFooterVisibility] = useState(false);
  const [showAddPage, setShowAddPage] = useState(false);
  const [menuVisibility, setMenuVisibility] = useState(false);

  const sections = [
    { id: "policies", name: "Policies" },
    { id: "hhclub", name: "HH Club & Founder" },
  ];

  const [footerItems, setFooterItems] = useState([
    { id: 1, title: "Terms and Condition", visibility: true, owner: "System" },
    { id: 2, title: "Privacy Policy", visibility: true, owner: "System" },
    { id: 3, title: "Terms and Condition", visibility: true, owner: "System" },
    { id: 4, title: "Privacy Policy", visibility: true, owner: "System" },
    { id: 5, title: "Terms and Condition", visibility: false, owner: "System" },
  ]);
  const handleVisibility = (id) => {
    setFooterItems(
      footerItems.map((item) =>
        item.id === id ? { ...item, visibility: !item.visibility } : item
      )
    );
  };

  return (
    <div className="space-y-6">
      {/* Controls */}
      {showAddPage ? (
        <AddFooterPage onBack={() => setShowAddPage(false)} />
      ) : (
        <>
          <div className="flex justify-end items-center gap-2">
            <select className="px-4 py-2 border rounded-lg text-gray-600 min-w-[200px]">
              <option>Active</option>
              <option>Deleted</option>
            </select>
            <div className="flex gap-3">
              <button className="px-6 py-2 border rounded-lg">
                Edit Footer
              </button>
              <button
                className="px-6 py-2 bg-primary text-white rounded-lg"
                onClick={() => setIsAddFooterOpen(true)}
              >
                Add Footer
              </button>
            </div>
          </div>

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
              {sections.map((section) => (
                <button
                  key={section.id}
                  className={`px-6 py-2 rounded-lg  w-56 h-16 flex justify-between items-center gap-2 ${
                    selectedSection === section.id
                      ? "bg-primary text-white"
                      : "border text-gray-600"
                  }`}
                  onClick={() => setSelectedSection(section.id)}
                >
                  {section.name}
                  <div className="flex flex-col gap-1 ">
                    <BsArrowLeft size={20} />
                    <BsArrowRight size={20} />
                  </div>
                </button>
              ))}
            </div>

            <button className="text-gray-400 ">
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
            <div className="bg-gray-100 rounded-lg p-4 text-center w-2/5 border-2 border-primary">
              Footer Created Pages
            </div>
          </div>

          <div className="flex justify-end">
            <button
              className="px-6 py-2 bg-primary text-white rounded-lg"
              onClick={() => setShowAddPage(true)}
            >
              Add New Page
            </button>
          </div>

          {/* Table */}
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
                {footerItems.map((item) => (
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
                          onChange={() => handleVisibility(item.id)}
                        />
                        <div className="w-11 h-6 bg-gray-500 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                      </label>
                    </td>
                    <td className="py-4 px-6 text-sm text-gray-600">
                      {item.owner}
                    </td>
                    <td className="py-4 px-6">
                      <button className="text-primary">
                        <FiEdit size={18} />
                      </button>
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
            isOpen={isAddFooterOpen}
            onRequestClose={() => setIsAddFooterOpen(false)}
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg w-[450px]"
            overlayClassName="fixed inset-0 bg-black/50"
          >
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold">Add Footer</h2>
                <button
                  onClick={() => setIsAddFooterOpen(false)}
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
                    onClick={() => setIsAddFooterOpen(false)}
                    className="px-6 py-2 border rounded-lg text-sm"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => {
                      // Handle save changes
                      setIsAddFooterOpen(false);
                    }}
                    className="px-6 py-2 bg-primary text-white rounded-lg text-sm"
                  >
                    Save Changes
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

export default Footer;
