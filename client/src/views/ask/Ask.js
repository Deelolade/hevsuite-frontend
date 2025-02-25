import React, { useState } from "react";
import { Link } from "react-router-dom";
import { BsBell, BsThreeDotsVertical } from "react-icons/bs";
import Modal from "react-modal";
import { IoClose } from "react-icons/io5";

const Ask = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isChatModalOpen, setIsChatModalOpen] = useState(false);
  const [showAbandonModal, setShowAbandonModal] = useState(false);
  const [showReportModal, setShowReportModal] = useState(false);
  const [reportType, setReportType] = useState("");

  const [messages, setMessages] = useState([
    {
      text: "Hello, I'm interested in volunteering...",
      time: "7:20",
      isUser: true,
    },
    {
      text: "Great! Please confirm the date and Provide me with you full name and Contact details",
      time: "7:20",
      isUser: false,
    },
    {
      text: "Yeah Sure i am Available.........",
      time: "7:20",
      isUser: true,
    },
  ]);
  const [newMessage, setNewMessage] = useState("");

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    deadline: "",
    agreeToGuidelines: false,
  });

  const modalStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      transform: "translate(-50%, -50%)",
      maxWidth: "600px",
      width: "90%",
      padding: "32px",
      border: "none",
      borderRadius: "24px",
      backgroundColor: "white",
    },
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.75)",
    },
  };

  const chatModalStyles = {
    content: {
      top: "auto",
      left: "auto",
      right: "32px",
      bottom: "32px",
      width: "400px",
      padding: "0",
      border: "none",
      borderRadius: "24px",
      backgroundColor: "white",
      boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
    },
    overlay: {
      backgroundColor: "transparent",
    },
  };

  const abandonModalStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      transform: "translate(-50%, -50%)",
      maxWidth: "400px",
      width: "90%",
      padding: "24px",
      border: "none",
      borderRadius: "24px",
      backgroundColor: "white",
    },
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.75)",
    },
  };

  const reportModalStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      transform: "translate(-50%, -50%)",
      maxWidth: "400px",
      width: "90%",
      padding: "24px",
      border: "none",
      borderRadius: "24px",
      backgroundColor: "white",
    },
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.75)",
    },
  };

  const requests = Array(9).fill({
    title: "Request for Event Volunteers",
    description:
      "Looking for volunteers to assist at the annual || charity event this weekend.",
    createdBy: "John Daniel",
    date: "21 January, 2025",
    tags: ["#Urgent", "#Open"],
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add submission logic here
    setIsModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="py-4 px-6 flex items-center justify-between bg-white text-black">
        <Link to="/" className="text-3xl font-bold">
          h
        </Link>
        <div className="flex items-center space-x-6">
          <Link to="/how-it-works" className="text-black">
            How it works
          </Link>
          <Link to="/help-centre" className="text-black">
            Help centre
          </Link>
          <Link to="/ask" className="text-[#540A26]">
            Ask
          </Link>
          <div className="relative">
            <BsBell className="w-6 h-6 text-black" />
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-xs flex items-center justify-center text-white">
              2
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <img
              src="/avatar.jpg"
              alt="User"
              className="w-8 h-8 rounded-full"
            />
            <span className="text-black">Goodluck</span>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <div className="text-center py-16 text-black">
        <h1 className="text-4xl font-semibold mb-4">Ask</h1>
        <p className="text-gray-600">
          View and respond to questions or requests posted by other members.
        </p>
      </div>

      {/* Actions */}
      <div
        className="px-6 flex justify-start items-center mb-8"
        onClick={() => setShowReportModal(true)}
      >
        <BsThreeDotsVertical className="text-2xl text-gray-400 cursor-pointer" />
        <button
          onClick={() => setIsModalOpen(true)}
          className="px-6 py-2 bg-[#540A26] text-white rounded-lg flex items-center gap-2"
        >
          <span>Add Ask</span>
        </button>
      </div>

      {/* Requests Grid */}
      <div className="px-6 grid grid-cols-3 gap-6">
        {requests.map((request, index) => (
          <div
            key={index}
            className="bg-white border border-gray-200 rounded-xl p-6 relative group shadow-sm"
          >
            <button className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
              <BsThreeDotsVertical className="text-gray-400" />
            </button>
            <div className="mb-4">
              <h3 className="text-xl font-semibold mb-2 text-black">
                {request.title}
              </h3>
              <p className="text-gray-600">{request.description}</p>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <span>Created By:</span>
                <span>{request.createdBy}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <span>Date:</span>
                <span>{request.date}</span>
              </div>
            </div>
            <div className="flex items-center gap-4 mt-4">
              <div className="flex gap-2">
                {request.tags.map((tag, tagIndex) => (
                  <span
                    key={tagIndex}
                    className="px-3 py-1 bg-gray-100 rounded-full text-sm text-gray-600"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <button
                className="ml-auto px-4 py-1 bg-[#540A26] text-white rounded-lg text-sm"
                onClick={() => setIsChatModalOpen(true)}
              >
                Claim Ask
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center gap-2 mt-12 mb-8">
        <button className="w-8 h-8 flex items-center justify-center text-gray-600">
          ←
        </button>
        <button className="w-2 h-2 rounded-full bg-[#540A26]"></button>
        <button className="w-2 h-2 rounded-full bg-gray-300"></button>
        <button className="w-2 h-2 rounded-full bg-gray-300"></button>
        <button className="w-2 h-2 rounded-full bg-gray-300"></button>
        <button className="w-2 h-2 rounded-full bg-gray-300"></button>
        <button className="w-8 h-8 flex items-center justify-center text-gray-600">
          →
        </button>
      </div>

      {/* Footer */}
      <footer className="border-t border-gray-200 py-6 px-6 bg-white">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-4 text-gray-600">
            <span>Follow us</span>
            <Link to="#" className="hover:text-gray-900">
              Facebook
            </Link>
            <Link to="#" className="hover:text-gray-900">
              Twitter
            </Link>
            <Link to="#" className="hover:text-gray-900">
              Instagram
            </Link>
            <Link to="#" className="hover:text-gray-900">
              LinkedIn
            </Link>
          </div>
          <div className="flex space-x-8">
            <Link to="/policies" className="text-gray-600 hover:text-gray-900">
              Policies
            </Link>
            <Link to="/about" className="text-gray-600 hover:text-gray-900">
              HH Club & Founder
            </Link>
          </div>
          <div className="text-gray-600">
            2024 Hazor Group (Trading as HH Club)
          </div>
        </div>
      </footer>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        style={modalStyles}
        contentLabel="Add Ask Modal"
      >
        <div className="relative">
          <button
            onClick={() => setIsModalOpen(false)}
            className="absolute right-0 top-0 text-gray-400 hover:text-gray-600"
          >
            <IoClose size={24} />
          </button>

          <h2 className="text-2xl font-semibold mb-8">Add Ask</h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block mb-2">
                Add Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="What do you need help with?"
                className="w-full px-4 py-3 bg-gray-100 rounded-lg"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                required
              />
            </div>

            <div>
              <label className="block mb-2">
                Description <span className="text-red-500">*</span>
              </label>
              <textarea
                placeholder="Provide more details about your Ask..."
                className="w-full px-4 py-3 bg-gray-100 rounded-lg min-h-[120px]"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                required
              />
            </div>

            <div>
              <label className="block mb-2">
                Deadline <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="Select Date"
                className="w-full px-4 py-3 bg-gray-100 rounded-lg"
                value={formData.deadline}
                onChange={(e) =>
                  setFormData({ ...formData, deadline: e.target.value })
                }
                required
              />
            </div>

            <label className="flex items-start gap-2">
              <input
                type="checkbox"
                className="mt-1"
                checked={formData.agreeToGuidelines}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    agreeToGuidelines: e.target.checked,
                  })
                }
                required
              />
              <span className="text-sm text-gray-600">
                I ensure my Ask follows HH club community guidelines.
              </span>
            </label>

            <button
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-[#540A26] to-[#0A5440] text-white rounded-lg font-medium"
            >
              Add Ask
            </button>
          </form>
        </div>
      </Modal>

      <Modal
        isOpen={isChatModalOpen}
        onRequestClose={() => setIsChatModalOpen(false)}
        style={chatModalStyles}
        contentLabel="Chat Modal"
      >
        <div className="rounded-t-2xl bg-gradient-to-r from-[#540A26] to-[#0A5440] p-4">
          <div className="flex items-center gap-3">
            <img
              src="/avatar.jpg"
              alt="John Daniel"
              className="w-10 h-10 rounded-full"
            />
            <div className="text-white">
              <h3 className="font-medium">John Daniel</h3>
              <span className="text-sm flex items-center gap-1">
                <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                Online
              </span>
            </div>
            <button
              onClick={() => setIsChatModalOpen(false)}
              className="ml-auto text-white hover:opacity-80"
            >
              <IoClose size={24} />
            </button>
          </div>
        </div>

        <div className="h-96 p-4 overflow-y-auto">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${
                message.isUser ? "justify-end" : "justify-start"
              } mb-4`}
            >
              <div
                className={`max-w-[80%] p-3 rounded-2xl ${
                  message.isUser
                    ? "bg-gray-100 text-black"
                    : "bg-[#0A5440] text-white"
                }`}
              >
                <p>{message.text}</p>
                <span className="text-xs mt-1 block text-right">
                  {message.time}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="p-4 border-t">
          <div className="relative flex items-center gap-4">
            <button
              className="px-4 py-2 bg-gradient-to-r from-[#540A26] to-[#0A5440] text-white rounded-lg text-sm"
              onClick={() => setShowAbandonModal(true)}
            >
              Abandon Ask
            </button>
            <div className="flex-1 relative">
              <input
                type="text"
                placeholder="Type your message here..."
                className="w-full pr-12 pl-4 py-3 bg-gray-100 rounded-full"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
              />
              <button
                className="absolute right-2 top-1/2 -translate-y-1/2 text-[#540A26]"
                onClick={() => {
                  if (newMessage.trim()) {
                    setMessages([
                      ...messages,
                      { text: newMessage, time: "7:20", isUser: true },
                    ]);
                    setNewMessage("");
                  }
                }}
              >
                <svg
                  className="w-6 h-6 -rotate-90"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </Modal>

      <Modal
        isOpen={showAbandonModal}
        onRequestClose={() => setShowAbandonModal(false)}
        style={abandonModalStyles}
        contentLabel="Abandon Confirmation Modal"
      >
        <div className="text-center">
          <div className="w-16 h-16 bg-[#F8E7EB] rounded-2xl mx-auto mb-4 flex items-center justify-center">
            <svg
              className="w-8 h-8 text-[#540A26]"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M16.01 11H4v2h12.01v3L20 12l-3.99-4v3z" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold mb-2">
            Are you sure You want to Abandon?
          </h3>
          <p className="text-gray-600 mb-2">Request for Event Volunteers</p>
          <p className="text-gray-500 text-sm mb-6">
            Looking for volunteers to assist at the annual || charity event this
            weekend.
          </p>
          <button
            onClick={() => {
              setShowAbandonModal(false);
              setIsChatModalOpen(false);
            }}
            className="w-full py-3 bg-gradient-to-r from-[#540A26] to-[#0A5440] text-white rounded-lg"
          >
            Yes, Abandon Ask
          </button>
        </div>
      </Modal>

      <Modal
        isOpen={showReportModal}
        onRequestClose={() => setShowReportModal(false)}
        style={reportModalStyles}
        contentLabel="Report Modal"
      >
        <div className="text-center">
          <div className="w-16 h-16 bg-[#F8E7EB] rounded-2xl mx-auto mb-4 flex items-center justify-center">
            <svg
              className="w-8 h-8 text-[#540A26]"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold mb-2">
            Are you sure You want to Report?
          </h3>
          <p className="text-gray-600 mb-2">Request for Event Volunteers</p>
          <p className="text-gray-500 text-sm mb-6">
            Looking for volunteers to assist at the annual || charity event this
            weekend.
          </p>

          <div className="mb-6">
            <label className="block text-left text-gray-600 mb-2">
              Report Type
            </label>
            <select
              value={reportType}
              onChange={(e) => setReportType(e.target.value)}
              className="w-full px-4 py-3 bg-gray-100 rounded-lg appearance-none"
            >
              <option value="">Sexual Content</option>
              <option value="harassment">Inappropriate Content</option>
              <option value="mislead">Misleading Information</option>
              <option value="spam">Spamming</option>
            </select>
          </div>

          <button
            onClick={() => {
              setShowReportModal(false);
            }}
            className="w-full py-3 bg-gradient-to-r from-[#540A26] to-[#0A5440] text-white rounded-lg"
          >
            Report Ask
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default Ask;
