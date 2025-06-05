import React, { useState, useEffect } from "react";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import { BiPencil, BiSearch } from "react-icons/bi";
import edit_icon from "../../assets/icons/edit3.png";
import Modal from "react-modal";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  getAllHelps,
  createQA,
  editFAQs,
  deleteQA,
  visibilityQA,
  editTopic,
  deleteTopic,
  createTopic,
  archiveTopic,
  editQA
} from "../../store/help/helpSlice";

const Topics = () => {
  const dispatch = useDispatch();
  const { helps = [], isLoading, isError, message } = useSelector((state) => state.help || {});

  const [expandedQuestion, setExpandedQuestion] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [isEditQAModalOpen, setIsEditQAModalOpen] = useState(false);
  const [selectedQA, setSelectedQA] = useState(null);
  const [activeTopic, setActiveTopic] = useState(null);
  const [isCreateQAModalOpen, setIsCreateQAModalOpen] = useState(false);
  const [isCreateTopicOpen, setIsCreateTopicOpen] = useState(false);
  const [isDeleteTopicOpen, setIsDeleteTopicOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [isArchiveTopicOpen, setIsArchiveTopicOpen] = useState(false);
  const [isDeleteQAModalOpen, setIsDeleteQAModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [topicFilter, setTopicFilter] = useState("active");
  const topicsPerPage = 4; // Number of topics to show at once

  const filteredTopics = helps.filter(topic => {
    let statusMatch = false;
    switch (topicFilter) {
      case "active":
        statusMatch = !topic.archived && !topic.deleted;
        break;
      case "archived":
        statusMatch = topic.archived && !topic.deleted;
        break;
      case "deleted":
        statusMatch = topic.deleted;
        break;
      default:
        statusMatch = true;
    }

    if (searchQuery.trim() === '') {
      return statusMatch;
    }

    const searchLower = searchQuery.toLowerCase();
    const titleMatch = topic.title.toLowerCase().includes(searchLower);
    const descriptionMatch = topic.description?.toLowerCase().includes(searchLower);
    const qaMatch = topic.QAs?.some(qa => 
      qa.question.toLowerCase().includes(searchLower) || 
      qa.answer.toLowerCase().includes(searchLower)
    );

    return statusMatch && (titleMatch || descriptionMatch || qaMatch);
  });

  useEffect(() => {
    dispatch(getAllHelps()).then(() => {
      if (filteredTopics.length > 0 && !activeTopic) {
        setActiveTopic(filteredTopics[0]._id);
        setSelectedTopic(filteredTopics[0]);
      }
    });
  }, [dispatch, topicFilter, searchQuery]);

  const [newTopic, setNewTopic] = useState({
    title: '',
    description: '',
  });

  const handleCreateTopic = async (e) => {
    e.preventDefault();
    try {
      // Assuming you have a createTopic action in your Redux slice
      await dispatch(createTopic(newTopic));
      toast.success('Topic created successfully');
      setIsCreateTopicOpen(false);
      setNewTopic({ title: '', description: '' });
      // Refresh the topics list
      dispatch(getAllHelps());
    } catch (error) {
      toast.error(error.message || 'Failed to create topic');
    } finally {
    }
  };

  const handleTopicVisibility = async (id, currentVisibility) => {
    try {
      await dispatch(editTopic({ id, data: { visibility: !currentVisibility } }));
      toast.success("Topic visibility updated");
    } catch (error) {
      toast.error("Error updating topic visibility");
    }
  };

  const handleQuestionVisibility = async (id, currentVisibility) => {
    try {
      await dispatch(editQA({ id, data: { visibility: !currentVisibility } }));
      dispatch(getAllHelps());
      toast.success("QA visibility updated");
    } catch (error) {
      toast.error("Error updating QA visibility");
    }
  };

  const handleCreateQA = async (e) => {
    e.preventDefault();
    try {
      await dispatch(createQA({ ...selectedQA, topicId: activeTopic }));
      toast.success("QA created successfully");
      setIsCreateQAModalOpen(false);
      setSelectedQA(null);
      dispatch(getAllHelps());
    } catch (error) {
      toast.error("Error creating QA");
    }
  };

  const handleEditQA = async (e) => {
    e.preventDefault();
    try {
      await dispatch(editQA({ id: selectedQA._id, data: selectedQA }));
      toast.success("QA updated successfully");
      setIsEditQAModalOpen(false);
      setSelectedQA(null);
      dispatch(getAllHelps());
    } catch (error) {
      toast.error("Error updating QA");
    }
  };

  const handleDeleteQA = async () => {
    try {
      await dispatch(deleteQA({
        topicId: activeTopic,
        qaId: selectedQA._id
      }));
      toast.success("QA deleted successfully");
      setIsDeleteQAModalOpen(false);
      setSelectedQA(null);
      dispatch(getAllHelps());
    } catch (error) {
      toast.error("Error deleting QA");
    }
  };

  const handleEditTopic = async (e) => {
    e.preventDefault();
    try {
      await dispatch(editTopic({ id: selectedTopic._id, data: selectedTopic }));
      toast.success("Topic updated successfully");
      setIsEditModalOpen(false);
      setSelectedTopic(null);
    } catch (error) {
      toast.error("Error updating topic");
    }
  };

  const handleDeleteTopic = async () => {
    try {
      const isCurrentlyDeleted = selectedTopic.deleted;
      await dispatch(editTopic({ 
        id: selectedTopic._id, 
        data: { deleted: !isCurrentlyDeleted } 
      }));
      toast.success(isCurrentlyDeleted ? "Topic restored successfully" : "Topic deleted successfully");
      setIsDeleteTopicOpen(false);
      setSelectedTopic(null);
      dispatch(getAllHelps());
    } catch (error) {
      toast.error("Error updating topic status");
    }
  };

  const handleArchiveTopic = async () => {
    try {
      const isCurrentlyArchived = selectedTopic.archived;
      await dispatch(editTopic({ 
        id: selectedTopic._id, 
        data: { archived: !isCurrentlyArchived } 
      }));
      toast.success(isCurrentlyArchived ? "Topic restored successfully" : "Topic archived successfully");
      setIsArchiveTopicOpen(false);
      setSelectedTopic(null);
      dispatch(getAllHelps());
    } catch (error) {
      toast.error("Error updating topic status");
    }
  };

  // Calculate pagination
  const totalPages = Math.ceil(filteredTopics.length / topicsPerPage);
  const startIndex = (currentPage - 1) * topicsPerPage;
  const endIndex = startIndex + topicsPerPage;
  const currentTopics = filteredTopics.slice(startIndex, endIndex);

  const handlePrevPage = () => {
    setCurrentPage(prev => (prev > 1 ? prev - 1 : totalPages));
  };

  const handleNextPage = () => {
    setCurrentPage(prev => (prev < totalPages ? prev + 1 : 1));
  };

  return (
    <div className="space-y-6">
      {/* Topics Grid */}
      <div className="flex justify-between flex-wrap items-center gap-8">
        <div className="relative flex-1">
          <BiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search"
            className="w-full pl-10 pr-4 py-2 border rounded-xl"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <select 
          className="px-4 py-2 border bg-gray-200 rounded-lg min-w-[200px]"
          value={topicFilter}
          onChange={(e) => setTopicFilter(e.target.value)}
        >
          <option value="active">Active Topics</option>
          <option value="archived">Archived Topics</option>
          <option value="deleted">Deleted Topics</option>
        </select>
        <button
          className="px-6 py-2 bg-primary text-white font-secondary rounded-lg flex items-center gap-2"
          onClick={() => setIsCreateTopicOpen(true)}
        >
          Create Topics
          <span className="text-xl">+</span>
        </button>
      </div>

      {isLoading ? (
        <div className="text-center">Loading...</div>
      ) : filteredTopics.length === 0 ? (
        <div className="text-center">No {topicFilter} topics found</div>
      ) : (
        <div className="flex items-center gap-4">
          <button 
            onClick={handlePrevPage}
            className="p-2 text-gray-400 hover:text-gray-600 disabled:opacity-50"
            disabled={isLoading}
          >
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

          <div className="flex gap-4 overflow-x-auto pb-4 flex-nowrap">
            {currentTopics.map((topic) => (
            <div
              key={topic._id}
                className={`flex-shrink-0 w-56 cursor-pointer ${
                  activeTopic === topic._id
                  ? "border-4 border-primary rounded-t-3xl"
                  : ""
                }`}
              onClick={() => {
                setActiveTopic(topic._id);
                setSelectedTopic(topic);
              }}
            >
              <div className="bg-gradient-to-r from-[#540A26] to-[#0A5438] p-4 rounded-t-3xl flex justify-between items-center h-16">
                <h3 className="text-white text-center font-secondary w-64">
                  {topic.title}
                </h3>
                <button
                  className="text-white"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedTopic(topic);
                    setIsEditModalOpen(true);
                  }}
                >
                  <img src={edit_icon} alt="edit icon" />
                </button>
              </div>
              <div className="p-5 space-y-3 w-56">
                <div className="flex items-center justify-between">
                  <span>Visibility</span>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={topic.visibility}
                      className="sr-only peer"
                      onChange={(e) => {
                        e.stopPropagation();
                        handleTopicVisibility(topic._id, topic.visibility);
                      }}
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                  </label>
                </div>
                <button
                  className={`w-44 py-2 ${topic.archived ? 'bg-primary text-white' : 'bg-gray-200'} rounded-lg`}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedTopic(topic);
                    setIsArchiveTopicOpen(true);
                  }}
                >
                  {topic.archived ? 'Unarchive' : 'Archive'}
                </button>
                <button
                  className={`w-44 py-2 ${topic.deleted ? 'bg-primary text-white' : 'bg-primary text-white'} rounded-lg`}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedTopic(topic);
                    setIsDeleteTopicOpen(true);
                  }}
                >
                  {topic.deleted ? 'Restore' : 'Delete'}
                </button>
              </div>
            </div>
          ))}
        </div>

          <button 
            onClick={handleNextPage}
            className="p-2 text-gray-400 hover:text-gray-600 disabled:opacity-50"
            disabled={isLoading}
          >
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
      )}

      <div className="flex justify-center items-center gap-2 mt-4">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            onClick={() => setCurrentPage(page)}
            className={`w-2 h-2 rounded-full transition-all ${
              currentPage === page ? "bg-primary w-4" : "bg-gray-300"
            }`}
          />
        ))}
      </div>

      {/* Questions Section */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-lg">
            {helps.find(t => t._id === activeTopic)?.title || 'Select a topic'} Questions
          </h3>
          <button
            className="px-6 py-2 bg-primary text-white rounded-lg flex items-center gap-2"
            onClick={() => setIsCreateQAModalOpen(true)}
          >
            Create QA
            <span className="text-xl">+</span>
          </button>
        </div>

        {/* Questions List */}
        <div className="space-y-3">
          {helps
            .find(topic => topic._id === activeTopic)
            ?.QAs?.filter(qa =>
              qa.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
              qa.answer.toLowerCase().includes(searchQuery.toLowerCase())
            )
            .map((qa) => (
              <div key={qa._id}>
                <div className="border rounded-lg p-4 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    
                    <span>{qa.question}</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={qa.visibility}
                        className="sr-only peer"
                        onChange={(e) => {
                          e.stopPropagation();
                          handleQuestionVisibility(qa._id, qa.visibility);
                        }}
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                    </label>
                    <button
                      className="text-primary"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedQA(qa);
                        setIsEditQAModalOpen(true);
                      }}
                    >
                      <FiEdit size={20} />
                    </button>
                    <button
                      className="text-primary"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedQA(qa);
                        setIsDeleteQAModalOpen(true);
                      }}
                    >
                      <FiTrash2 size={20} />
                    </button>
                    <button
                      className="p-2 border rounded-lg"
                      onClick={(e) => {
                        e.stopPropagation();
                        setExpandedQuestion(
                          expandedQuestion === qa._id ? null : qa._id
                        );
                      }}
                    >
                      <svg
                        className={`w-4 h-4 transform transition-transform ${expandedQuestion === qa._id ? "rotate-180" : ""
                          }`}
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                      </svg>
                    </button>
                  </div>
                </div>
                {/* Expanded Content */}
                {expandedQuestion === qa._id && (
                  <div className="mt-2 p-4 border-t">
                    <p className="text-gray-600">{qa.answer}</p>
                  </div>
                )}
              </div>
            ))}
        </div>
      </div>

      {/* Edit Topic Modal */}
      <Modal
        isOpen={isEditModalOpen}
        onRequestClose={() => setIsEditModalOpen(false)}
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg md:w-[450px] w-[96vw]"
        overlayClassName="fixed inset-0 bg-black/50"
      >
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl">Edit Topic</h2>
            <button
              onClick={() => setIsEditModalOpen(false)}
              className="text-gray-400 hover:text-gray-600"
            >
              ✕
            </button>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block mb-2">Topic Title</label>
              <input
                type="text"
                placeholder="Group Title"
                className="w-full px-4 py-2 border rounded-lg"
                value={selectedTopic?.title || ""}
                onChange={(e) =>
                  setSelectedTopic({
                    ...selectedTopic,
                    title: e.target.value,
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
                onClick={handleEditTopic}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      </Modal>

      {/* Edit QA Modal */}
      <Modal
        isOpen={isEditQAModalOpen}
        onRequestClose={() => setIsEditQAModalOpen(false)}
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg md:w-[450px] w-[96vw]"
        overlayClassName="fixed inset-0 bg-black/50"
      >
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl">Edit Topic QA</h2>
            <button
              onClick={() => setIsEditQAModalOpen(false)}
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
                value={selectedQA?.question || ""}
                placeholder="What is Hazor Hevsuite (HH) Club?"
                className="w-full px-4 py-2 border rounded-lg"
                onChange={(e) =>
                  setSelectedQA({
                    ...selectedQA,
                    question: e.target.value,
                  })
                }
              />
            </div>

            <div>
              <label className="block mb-2">Answer</label>
              <textarea
                value={selectedQA?.answer || ""}
                className="w-full px-4 py-2 border rounded-lg resize-y min-h-[150px]"
                placeholder="Hazor Hevsuite (HH) Club is an exclusive members-only community..."
                onChange={(e) =>
                  setSelectedQA({
                    ...selectedQA,
                    answer: e.target.value,
                  })
                }
              />
            </div>

            <div className="flex justify-end gap-3 pt-4">
              <button
                onClick={() => setIsEditQAModalOpen(false)}
                className="px-6 py-2 border rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90"
                onClick={handleEditQA}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      </Modal>

      {/* Create QA Modal */}
      <Modal
        isOpen={isCreateQAModalOpen}
        onRequestClose={() => setIsCreateQAModalOpen(false)}
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg md:w-[450px] w-[96vw]"
        overlayClassName="fixed inset-0 bg-black/50"
      >
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl">Create Topic QA</h2>
            <button
              onClick={() => setIsCreateQAModalOpen(false)}
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
                placeholder="What is Hazor Hevsuite (HH) Club?"
                className="w-full px-4 py-2 border rounded-lg"
                value={selectedQA?.question || ''}
                onChange={(e) => setSelectedQA({
                  ...selectedQA,
                  question: e.target.value
                })}
              />
            </div>

            <div>
              <label className="block mb-2">Answer</label>
              <textarea
                className="w-full px-4 py-2 border rounded-lg resize-y min-h-[150px]"
                placeholder="Hazor Hevsuite (HH) Club is an exclusive members-only community..."
                value={selectedQA?.answer || ''}
                onChange={(e) => setSelectedQA({
                  ...selectedQA,
                  answer: e.target.value
                })}
              />
            </div>

            <div className="flex justify-end gap-3 pt-4">
              <button
                onClick={() => setIsCreateQAModalOpen(false)}
                className="px-6 py-2 border rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90"
                onClick={handleCreateQA}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      </Modal>

      {/* Create Topic Modal */}
      <Modal
        isOpen={isCreateTopicOpen}
        onRequestClose={() => setIsCreateTopicOpen(false)}
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg md:w-[450px] w-[96vw]"
        overlayClassName="fixed inset-0 bg-black/50"
      >
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl">Create Topic</h2>
            <button
              onClick={() => setIsCreateTopicOpen(false)}
              className="text-gray-400 hover:text-gray-600"
            >
              ✕
            </button>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block mb-2">Topic Title</label>
              <input
                type="text"
                placeholder="Enter topic title"
                className="w-full px-4 py-2 border rounded-lg"
                value={newTopic.title}
                onChange={(e) => setNewTopic({ ...newTopic, title: e.target.value })}
              />
            </div>

            <div>
              <label className="block mb-2">Description</label>
              <textarea
                className="w-full px-4 py-2 border rounded-lg resize-y min-h-[100px]"
                placeholder="Enter topic description..."
                value={newTopic.description}
                onChange={(e) => setNewTopic({ ...newTopic, description: e.target.value })}
              />
            </div>

            <div className="flex justify-end gap-3 pt-4">
              <button
                onClick={() => setIsCreateTopicOpen(false)}
                className="px-6 py-2 border rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90"
                onClick={handleCreateTopic}
              >
                Create
              </button>
            </div>
          </div>
        </div>
      </Modal>

      {/* Delete Topic Modal */}
      <Modal
        isOpen={isDeleteTopicOpen}
        onRequestClose={() => setIsDeleteTopicOpen(false)}
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg w-[400px]"
        overlayClassName="fixed inset-0 bg-black/50"
      >
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl">{selectedTopic?.deleted ? 'Restore Topic' : 'Delete Topic'}</h2>
            <button
              onClick={() => setIsDeleteTopicOpen(false)}
              className="text-gray-400 hover:text-gray-600"
            >
              ✕
            </button>
          </div>

          <p className="text-gray-600 mb-6">
            {selectedTopic?.deleted 
              ? 'Are you sure you want to restore this topic?'
              : 'Are you sure you want to delete this topic? This action can be reversed later.'}
          </p>

          <div className="flex justify-end gap-3">
            <button
              onClick={() => setIsDeleteTopicOpen(false)}
              className="px-6 py-2 border rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              className={`px-6 py-2 ${selectedTopic?.deleted ? 'bg-primary' : 'bg-red-500'} text-white rounded-lg hover:${selectedTopic?.deleted ? 'bg-primary/90' : 'bg-red-600'}`}
              onClick={handleDeleteTopic}
            >
              {selectedTopic?.deleted ? 'Restore' : 'Delete'}
            </button>
          </div>
        </div>
      </Modal>

      {/* Archive Topic Modal */}
      <Modal
        isOpen={isArchiveTopicOpen}
        onRequestClose={() => setIsArchiveTopicOpen(false)}
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg w-[400px]"
        overlayClassName="fixed inset-0 bg-black/50"
      >
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl">{selectedTopic?.archived ? 'Unarchive Topic' : 'Archive Topic'}</h2>
            <button
              onClick={() => setIsArchiveTopicOpen(false)}
              className="text-gray-400 hover:text-gray-600"
            >
              ✕
            </button>
          </div>

          <p className="text-gray-600 mb-6">
            {selectedTopic?.archived 
              ? 'Are you sure you want to unarchive this topic?'
              : 'Are you sure you want to archive this topic? This action can be reversed later.'}
          </p>

          <div className="flex justify-end gap-3">
            <button
              onClick={() => setIsArchiveTopicOpen(false)}
              className="px-6 py-2 border rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90"
              onClick={handleArchiveTopic}
            >
              {selectedTopic?.archived ? 'Unarchive' : 'Archive'}
            </button>
          </div>
        </div>
      </Modal>

      {/* Delete QA Modal */}
      <Modal
        isOpen={isDeleteQAModalOpen}
        onRequestClose={() => setIsDeleteQAModalOpen(false)}
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg w-[400px]"
        overlayClassName="fixed inset-0 bg-black/50"
      >
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl">Delete Question</h2>
            <button
              onClick={() => setIsDeleteQAModalOpen(false)}
              className="text-gray-400 hover:text-gray-600"
            >
              ✕
            </button>
          </div>

          <p className="text-gray-600 mb-6">
            Are you sure you want to delete this question? This action cannot be
            undone.
          </p>

          <div className="flex justify-end gap-3">
            <button
              onClick={() => setIsDeleteQAModalOpen(false)}
              className="px-6 py-2 border rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-red-600"
              onClick={handleDeleteQA}
            >
              Delete
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Topics;