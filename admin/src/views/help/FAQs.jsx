import React, { useState, useEffect } from "react";
import { BiSearch } from "react-icons/bi";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import Modal from "react-modal";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  getAllFAQs,
  createFAQs,
  editFAQs,
  deleteFAQs,
  visibilityFAQs,
} from "../../store/help/helpSlice";

const FAQs = () => {
  const dispatch = useDispatch();
  const { faqs = [], isLoading, isError, message } = useSelector((state) => state.help || {});
  
  const [currentPage, setCurrentPage] = useState(1);
  const [expandedFAQ, setExpandedFAQ] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedFAQ, setSelectedFAQ] = useState(null);
  const [isCreateFAQOpen, setIsCreateFAQOpen] = useState(false);
  const [isDeleteFAQOpen, setIsDeleteFAQOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [newFAQ, setNewFAQ] = useState({
    question: "",
    answer: "",
    visibility: true
  });

  useEffect(() => {
    dispatch(getAllFAQs({ page: currentPage, limit: 10, search: searchQuery }));
  }, [dispatch, currentPage, searchQuery]);

  const handleVisibility = async (id, currentVisibility) => {
    try {
      await dispatch(editFAQs({ id, data: { visibility: !currentVisibility } }));
      toast.success("FAQ visibility updated");
      dispatch(getAllFAQs({ page: currentPage, limit: 10 }));
    } catch (error) {
      toast.error("Error updating FAQ visibility");
    }
  };

  const handleCreateFAQ = async (e) => {
    e.preventDefault();
    try {
      await dispatch(createFAQs(newFAQ));
      toast.success("FAQ created successfully");
      setIsCreateFAQOpen(false);
      setNewFAQ({
        question: "",
        answer: "",
        visibility: true
      });
      dispatch(getAllFAQs({ page: currentPage, limit: 10 }));
    } catch (error) {
      toast.error("Error creating FAQ");
    }
  };

  const handleEditFAQ = async (e) => {
    e.preventDefault();
    try {
      await dispatch(editFAQs({ id: selectedFAQ._id, data: selectedFAQ }));
      toast.success("FAQ updated successfully");
      setIsEditModalOpen(false);
      setSelectedFAQ(null);
      dispatch(getAllFAQs({ page: currentPage, limit: 10 }));
    } catch (error) {
      toast.error("Error updating FAQ");
    }
  };

  const handleDeleteFAQ = async () => {
    try {
      await dispatch(deleteFAQs(selectedFAQ._id));
      toast.success("FAQ deleted successfully");
      setIsDeleteFAQOpen(false);
      setSelectedFAQ(null);
      dispatch(getAllFAQs({ page: currentPage, limit: 10 }));
    } catch (error) {
      toast.error("Error deleting FAQ");
    }
  };

  return (
    <div className="space-y-6">
      {/* Search and Create FAQ */}
      <div className="flex justify-between items-center">
        <div className="relative flex-1 gap-8 mr-12">
          <BiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search"
            className="w-full pl-10 pr-4 py-2 border rounded-lg"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <button
          className="px-6 py-2 bg-primary font-secondary text-white rounded-lg flex items-center gap-2"
          onClick={() => setIsCreateFAQOpen(true)}
        >
          Create FAQ
          <span className="text-xl">+</span>
        </button>
      </div>

      {/* FAQs List */}
      <div className="space-y-3">
        {isLoading ? (
          <div className="text-center">Loading...</div>
        ) : faqs.length === 0 ? (
          <div className="text-center">No FAQs found</div>
        ) : (
          faqs.map((faq) => (
            <div key={faq._id} className="border rounded-lg">
              <div className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  {/* <span>{faq._id}</span> */}
                  <span>{faq.question}</span>
                </div>
                <div className="flex items-center gap-4">
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={faq.visibility}
                      className="sr-only peer"
                      onChange={() => handleVisibility(faq._id, faq.visibility)}
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
                  <button
                    className="text-primary"
                    onClick={() => {
                      setSelectedFAQ(faq);
                      setIsDeleteFAQOpen(true);
                    }}
                  >
                    <FiTrash2 size={20} />
                  </button>
                  <button
                    className="p-2 border rounded-lg"
                    onClick={() =>
                      setExpandedFAQ(expandedFAQ === faq._id ? null : faq._id)
                    }
                  >
                    <svg
                      className={`w-4 h-4 transform transition-transform ${
                        expandedFAQ === faq._id ? "rotate-180" : ""
                      }`}
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                    </svg>
                  </button>
                </div>
              </div>
              {expandedFAQ === faq._id && (
                <div className="px-4 py-3 border-t">
                  <p className="text-gray-600">{faq.answer}</p>
                </div>
              )}
            </div>
          ))
        )}
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between">
        <div>
          Show result:
          <select className="ml-2 px-2 py-1 border rounded">
            <option>10</option>
            <option>20</option>
            <option>50</option>
          </select>
        </div>
        <div className="flex items-center gap-2">
          <button 
            className="p-1 text-gray-400"
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
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
              onClick={() => typeof page === 'number' && setCurrentPage(page)}
              disabled={page === "..."}
            >
              {page}
            </button>
          ))}
          <button 
            className="p-1 text-gray-400"
            onClick={() => setCurrentPage(prev => prev + 1)}
            disabled={currentPage === 20}
          >
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

      {/* Edit FAQ Modal */}
      <Modal
        isOpen={isEditModalOpen}
        onRequestClose={() => setIsEditModalOpen(false)}
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg w-[450px]"
        overlayClassName="fixed inset-0 bg-black/50"
      >
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl">Edit FAQ</h2>
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
                placeholder="Enter question"
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
                placeholder="Enter answer"
                onChange={(e) =>
                  setSelectedFAQ({
                    ...selectedFAQ,
                    answer: e.target.value,
                  })
                }
              />
            </div>

            <div className="flex items-center justify-between">
              <label className="block mb-2">Visibility</label>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={selectedFAQ?.visibility ?? true}
                  className="sr-only peer"
                  onChange={(e) =>
                    setSelectedFAQ({
                      ...selectedFAQ,
                      visibility: e.target.checked,
                    })
                  }
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
              </label>
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
                onClick={handleEditFAQ}
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </Modal>

      {/* Create FAQ Modal */}
      <Modal
        isOpen={isCreateFAQOpen}
        onRequestClose={() => setIsCreateFAQOpen(false)}
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg w-[450px]"
        overlayClassName="fixed inset-0 bg-black/50"
      >
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl">Create New FAQ</h2>
            <button
              onClick={() => setIsCreateFAQOpen(false)}
              className="text-gray-400 hover:text-gray-600"
            >
              ✕
            </button>
          </div>

          <form onSubmit={handleCreateFAQ}>
            <div className="space-y-4">
              <div>
                <label className="block mb-2">Question</label>
                <input
                  type="text"
                  value={newFAQ.question}
                  placeholder="Enter question"
                  className="w-full px-4 py-2 border rounded-lg"
                  onChange={(e) =>
                    setNewFAQ({
                      ...newFAQ,
                      question: e.target.value,
                    })
                  }
                  required
                />
              </div>

              <div>
                <label className="block mb-2">Answer</label>
                <textarea
                  value={newFAQ.answer}
                  className="w-full px-4 py-2 border rounded-lg resize-y min-h-[150px]"
                  placeholder="Enter answer"
                  onChange={(e) =>
                    setNewFAQ({
                      ...newFAQ,
                      answer: e.target.value,
                    })
                  }
                  required
                />
              </div>

              <div className="flex items-center justify-between">
                <label className="block mb-2">Visibility</label>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={newFAQ.visibility}
                    className="sr-only peer"
                    onChange={(e) =>
                      setNewFAQ({
                        ...newFAQ,
                        visibility: e.target.checked,
                      })
                    }
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                </label>
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setIsCreateFAQOpen(false)}
                  className="px-6 py-2 border rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90"
                >
                  Create FAQ
                </button>
              </div>
            </div>
          </form>
        </div>
      </Modal>

      {/* Delete FAQ Modal */}
      <Modal
        isOpen={isDeleteFAQOpen}
        onRequestClose={() => setIsDeleteFAQOpen(false)}
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg w-[400px]"
        overlayClassName="fixed inset-0 bg-black/50"
      >
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl">Delete FAQ</h2>
            <button
              onClick={() => setIsDeleteFAQOpen(false)}
              className="text-gray-400 hover:text-gray-600"
            >
              ✕
            </button>
          </div>

          <p className="text-gray-600 mb-6">
            Are you sure you want to delete this FAQ? This action cannot be
            undone.
          </p>

          <div className="flex justify-end gap-3">
            <button
              onClick={() => setIsDeleteFAQOpen(false)}
              className="px-6 py-2 border rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
              onClick={handleDeleteFAQ}
            >
              Delete
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default FAQs;