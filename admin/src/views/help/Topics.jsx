import React, { useState } from "react";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import { BiPencil, BiSearch } from "react-icons/bi";
import edit_icon from "../../assets/icons/edit3.png";
import Modal from "react-modal";

const Topics = () => {
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

  const [topics, setTopics] = useState([
    { id: 1, title: "Topic 1", visible: true },
    { id: 2, title: "Topic 1", visible: true },
    { id: 3, title: "Topic 1", visible: true },
    { id: 4, title: "Topic 1", visible: true },
  ]);

  const [questions, setQuestions] = useState([
    { id: 1, question: "What is Hazor Hevsuite (HH) Club?", visible: true },
    { id: 2, question: "What is Hazor Hevsuite (HH) Club?", visible: true },
    { id: 3, question: "What is Hazor Hevsuite (HH) Club?", visible: true },
  ]);

  const handleTopicVisibility = (id) => {
    setTopics(
      topics.map((topic) =>
        topic.id === id ? { ...topic, visible: !topic.visible } : topic
      )
    );
  };
  const handleQuestionVisibility = (id) => {
    setQuestions(
      questions.map((question) =>
        question.id === id
          ? { ...question, visible: !question.visible }
          : question
      )
    );
  };

  return (
    <div className="space-y-6">
      {/* Topics Grid */}
      <div className="flex justify-between flex-wrap items-center  gap-8">
        <div className="relative flex-1">
          <BiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search"
            className="w-full pl-10 pr-4 py-2 border rounded-xl"
          />
        </div>
        <select className="px-4 py-2 border bg-gray-200 rounded-lg  min-w-[200px]">
          <option>All Topics</option>
          <option>Archived</option>
          <option>Deleted</option>
        </select>
        <button
          className="px-6 py-2 bg-primary text-white font-secondary rounded-lg flex items-center gap-2"
          onClick={() => setIsCreateTopicOpen(true)}
        >
          Create Topics
          <span className="text-xl">+</span>
        </button>
      </div>
      <div className="md:grid md:grid-cols-4 w-[90vw] md:w-full overflow-auto flex gap-1">
        {topics.map((topic) => (
          <div
            key={topic.id}
            className={` w-56 cursor-pointer ${
              activeTopic === topic.id
                ? "border-4 border-primary rounded-t-3xl"
                : ""
            }`}
            onClick={() => setActiveTopic(topic.id)}
          >
            <div className="bg-gradient-to-r from-[#540A26] to-[#0A5438] p-4 rounded-t-3xl flex justify-between items-center h-16">
              <h3 className="text-white text-center font-secondary w-64">
                Topic 1
              </h3>
              <button
                className="text-white"
                onClick={(e) => {
                  e.stopPropagation(); // Prevent triggering the parent onClick
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
                    checked={topic.visible}
                    className="sr-only peer"
                    onChange={(e) => {
                      e.stopPropagation(); // Prevent triggering the parent onClick
                      handleTopicVisibility(topic.id);
                    }}
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                </label>
              </div>
              <button
                className="w-44 py-2 bg-gray-200 rounded-lg"
                onClick={(e) => {
                  e.stopPropagation(); // Prevent triggering the parent onClick
                  setSelectedTopic(topic);
                  setIsArchiveTopicOpen(true);
                }}
              >
                Archive
              </button>
              <button
                className="w-44 py-2 bg-primary text-white rounded-lg"
                onClick={(e) => {
                  e.stopPropagation(); // Prevent triggering the parent onClick
                  setSelectedTopic(topic);
                  setIsDeleteTopicOpen(true);
                }}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center items-center gap-2 mt-4">
        <button className="p-1 text-gray-400 hover:text-gray-600">
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
        {[1, 2, 3].map((page) => (
          <button
            key={page}
            onClick={() => setCurrentPage(page)}
            className={`w-2 h-2 rounded-full transition-all ${
              currentPage === page ? "bg-primary w-4" : "bg-gray-300"
            }`}
          />
        ))}
        <button className="p-1 text-gray-400 hover:text-gray-600">
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

      {/* Questions Section */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-lg">
            Topic 1 Questions: About Hazor Hevsuite (HH) Club
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
          {questions.map((qa) => (
            <div key={qa.id}>
              <div className="border rounded-lg p-4 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <span>{qa.id}</span>
                  <span>{qa.question}</span>
                </div>
                <div className="flex items-center gap-4">
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={qa.visible}
                      className="sr-only peer"
                      onChange={() => handleQuestionVisibility(qa.id)}
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                  </label>
                  <button
                    className="text-primary"
                    onClick={() => {
                      setSelectedQA(qa);
                      setIsEditQAModalOpen(true);
                    }}
                  >
                    <FiEdit size={20} />
                  </button>
                  <button
                    className="text-primary"
                    onClick={() => {
                      setSelectedQA(qa);
                      setIsDeleteQAModalOpen(true);
                    }}
                  >
                    <FiTrash2 size={20} />
                  </button>
                  <button
                    className="p-2 border rounded-lg"
                    onClick={() =>
                      setExpandedQuestion(
                        expandedQuestion === qa.id ? null : qa.id
                      )
                    }
                  >
                    <svg
                      className={`w-4 h-4 transform transition-transform ${
                        expandedQuestion === qa.id ? "rotate-180" : ""
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
              {expandedQuestion === qa.id && (
                <div className="mt-2 p-4 border-t">
                  <p className="text-gray-600">
                    Hazor Hevsuite (HH) Club is an exclusive members-only
                    community designed for networking, social events, and shared
                    experiences. The club fosters connections among like-minded
                    individuals while offering access to exclusive events,
                    personalized services, and a sense of belonging......
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
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
              <label className="block mb-2">Select Topic to Edit</label>
              <select className="w-full px-4 py-2 border rounded-lg text-gray-600">
                <option>Select Topic</option>
                {topics.map((topic) => (
                  <option key={topic.id} value={topic.id}>
                    {topic.title}
                  </option>
                ))}
              </select>
            </div>

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
                onClick={() => {
                  // Handle topic update here
                  setIsEditModalOpen(false);
                }}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      </Modal>
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
              <label className="block mb-2">QA Topic</label>
              <select className="w-full px-4 py-2 border rounded-lg text-gray-600">
                <option>Topic 1: About Hazor Hevsuite (HH) Club</option>
                {topics.map((topic) => (
                  <option key={topic.id} value={topic.id}>
                    {topic.title}
                  </option>
                ))}
              </select>
            </div>

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
                onClick={() => {
                  // Handle QA update here
                  setIsEditQAModalOpen(false);
                }}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      </Modal>

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
              <label className="block mb-2">Select QA Topic</label>
              <select className="w-full px-4 py-2 border rounded-lg text-gray-600">
                <option>Topic 1: About Hazor Hevsuite (HH) Club</option>
                {topics.map((topic) => (
                  <option key={topic.id} value={topic.id}>
                    {topic.title}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block mb-2">Question</label>
              <input
                type="text"
                placeholder="What is Hazor Hevsuite (HH) Club?"
                className="w-full px-4 py-2 border rounded-lg"
              />
            </div>

            <div>
              <label className="block mb-2">Answer</label>
              <textarea
                className="w-full px-4 py-2 border rounded-lg resize-y min-h-[150px]"
                placeholder="Hazor Hevsuite (HH) Club is an exclusive members-only community..."
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
                onClick={() => {
                  // Handle create QA here
                  setIsCreateQAModalOpen(false);
                }}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      </Modal>

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
              />
            </div>

            <div>
              <label className="block mb-2">Description</label>
              <textarea
                className="w-full px-4 py-2 border rounded-lg resize-y min-h-[100px]"
                placeholder="Enter topic description..."
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
                onClick={() => {
                  // Handle create topic here
                  setIsCreateTopicOpen(false);
                }}
              >
                Create
              </button>
            </div>
          </div>
        </div>
      </Modal>

      <Modal
        isOpen={isDeleteTopicOpen}
        onRequestClose={() => setIsDeleteTopicOpen(false)}
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg w-[400px]"
        overlayClassName="fixed inset-0 bg-black/50"
      >
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl">Delete Topic</h2>
            <button
              onClick={() => setIsDeleteTopicOpen(false)}
              className="text-gray-400 hover:text-gray-600"
            >
              ✕
            </button>
          </div>

          <p className="text-gray-600 mb-6">
            Are you sure you want to delete this topic? This action cannot be
            undone.
          </p>

          <div className="flex justify-end gap-3">
            <button
              onClick={() => setIsDeleteTopicOpen(false)}
              className="px-6 py-2 border rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
              onClick={() => {
                setTopics(topics.filter((t) => t.id !== selectedTopic.id));
                setIsDeleteTopicOpen(false);
                setSelectedTopic(null);
              }}
            >
              Delete
            </button>
          </div>
        </div>
      </Modal>

      <Modal
        isOpen={isArchiveTopicOpen}
        onRequestClose={() => setIsArchiveTopicOpen(false)}
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg w-[400px]"
        overlayClassName="fixed inset-0 bg-black/50"
      >
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl">Archive Topic</h2>
            <button
              onClick={() => setIsArchiveTopicOpen(false)}
              className="text-gray-400 hover:text-gray-600"
            >
              ✕
            </button>
          </div>

          <p className="text-gray-600 mb-6">
            Are you sure you want to archive this topic? You can restore it
            later.
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
              onClick={() => {
                // Handle archive topic here
                setIsArchiveTopicOpen(false);
                setSelectedTopic(null);
              }}
            >
              Archive
            </button>
          </div>
        </div>
      </Modal>

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
              onClick={() => {
                setQuestions(questions.filter((q) => q.id !== selectedQA.id));
                setIsDeleteQAModalOpen(false);
                setSelectedQA(null);
              }}
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
