import React, { useState } from "react";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import { BiPencil, BiSearch } from "react-icons/bi";

const Topics = () => {
  const [expandedQuestion, setExpandedQuestion] = useState(null);
  const topics = [
    { id: 1, title: "Topic 1", visible: true },
    { id: 2, title: "Topic 1", visible: true },
    { id: 3, title: "Topic 1", visible: true },
    { id: 4, title: "Topic 1", visible: true },
  ];

  const questions = [
    { id: 1, question: "What is Hazor Hevsuite (HH) Club?", visible: true },
    { id: 2, question: "What is Hazor Hevsuite (HH) Club?", visible: true },
    { id: 3, question: "What is Hazor Hevsuite (HH) Club?", visible: true },
  ];

  return (
    <div className="space-y-6">
      {/* Topics Grid */}
      <div className="grid grid-cols-4 gap-6">
        {topics.map((topic) => (
          <div key={topic.id} className="border rounded-lg">
            <div className="bg-[#540A26] p-4 rounded-t-lg flex justify-between items-center">
              <h3 className="text-white">Topic 1</h3>
              <button className="text-white">
                <BiPencil size={20} />
              </button>
            </div>
            <div className="p-4 space-y-3">
              <div className="flex items-center justify-between">
                <span>Visibility</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={topic.visible}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#540A26]"></div>
                </label>
              </div>
              <button className="w-full py-2 bg-gray-200 rounded-lg">
                Archive
              </button>
              <button className="w-full py-2 bg-[#540A26] text-white rounded-lg">
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Questions Section */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-lg">
            Topic 1 Questions: About Hazor Hevsuite (HH) Club
          </h3>
          <button className="px-6 py-2 bg-[#540A26] text-white rounded-lg flex items-center gap-2">
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
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#540A26]"></div>
                  </label>
                  <button className="text-[#540A26]">
                    <FiEdit size={20} />
                  </button>
                  <button className="text-[#540A26]">
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
    </div>
  );
};

export default Topics;
