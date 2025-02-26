import React, { useState } from "react";
import { BiSearch } from "react-icons/bi";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import Modal from "react-modal";

const FAQs = () => {
  const [currentPage, setCurrentPage] = useState(2);
  const [expandedFAQ, setExpandedFAQ] = useState(null);

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedFAQ, setSelectedFAQ] = useState(null);
  const faqs = [
    { id: 1, question: "How do I join the HH Club?", visible: true },
    { id: 2, question: "How do I change my account details?", visible: true },
    { id: 3, question: "How do I change my account details?", visible: true },
    { id: 4, question: "How do I change my account details?", visible: true },
  ];

  return (
    <div className="space-y-6">
      {/* Search and Create FAQ */}
      <div className="flex justify-between items-center">
        <div className="relative flex-1">
          <BiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search"
            className="w-full pl-10 pr-4 py-2 border rounded-lg"
          />
        </div>
        <button className="px-6 py-2 bg-primary text-white rounded-lg flex items-center gap-2">
          Create FAQ
          <span className="text-xl">+</span>
        </button>
      </div>

      {/* FAQs List */}
      <div className="space-y-3">
        {faqs.map((faq) => (
          <div key={faq.id} className="border rounded-lg">
            <div className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <span>{faq.id}</span>
                <span>{faq.question}</span>
              </div>
              <div className="flex items-center gap-4">
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={faq.visible}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                </label>
                <button
                  className="text-primary"
                  onClick={() => {
                    setSelectedFAQ(faq);
                    setIsEditModalOpen(true);
                  }}
                >
                  <FiEdit size={20} />
                </button>
                <button className="text-primary">
                  <FiTrash2 size={20} />
                </button>
                <button
                  className="p-2 border rounded-lg"
                  onClick={() =>
                    setExpandedFAQ(expandedFAQ === faq.id ? null : faq.id)
                  }
                >
                  <svg
                    className={`w-4 h-4 transform transition-transform ${
                      expandedFAQ === faq.id ? "rotate-180" : ""
                    }`}
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                  </svg>
                </button>
              </div>
            </div>
            {expandedFAQ === faq.id && (
              <div className="px-4 py-3 border-t">
                <p className="text-gray-600">
                  To join the HH Club, please follow these steps...
                </p>
              </div>
            )}
          </div>
        ))}
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
        isOpen={isEditModalOpen}
        onRequestClose={() => setIsEditModalOpen(false)}
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg w-[450px]"
        overlayClassName="fixed inset-0 bg-black/50"
      >
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl">Edit FAQs</h2>
            <button
              onClick={() => setIsEditModalOpen(false)}
              className="text-gray-400 hover:text-gray-600"
            >
              ✕
            </button>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block mb-2">Question</label>
              <input
                type="text"
                value={selectedFAQ?.question || ""}
                placeholder="What is Hazor Hevsuite (HH) Club?"
                className="w-full px-4 py-2 border rounded-lg"
                onChange={(e) =>
                  setSelectedFAQ({
                    ...selectedFAQ,
                    question: e.target.value,
                  })
                }
              />
            </div>

            <div>
              <label className="block mb-2">Answer</label>
              <textarea
                value={selectedFAQ?.answer || ""}
                className="w-full px-4 py-2 border rounded-lg resize-y min-h-[150px]"
                placeholder="Hazor Hevsuite (HH) Club is an exclusive members-only community..."
                onChange={(e) =>
                  setSelectedFAQ({
                    ...selectedFAQ,
                    answer: e.target.value,
                  })
                }
              />
            </div>

            <div className="flex justify-end gap-3 pt-4">
              <button
                onClick={() => setIsEditModalOpen(false)}
                className="px-6 py-2 border rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90"
                onClick={() => {
                  // Handle FAQ update here
                  setIsEditModalOpen(false);
                }}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default FAQs;
