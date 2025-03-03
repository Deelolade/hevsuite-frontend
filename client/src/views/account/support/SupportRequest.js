import React, { useState } from "react";
import { BsCheckLg, BsX } from "react-icons/bs";
import avatar from "../../../assets/user.avif";
import ViewToggle from "./components/ViewToggle";
import RequestCard from "./components/RequestCard";
import Pagination from "./components/Pagination";
import Modal from "react-modal";

Modal.setAppElement("#root");

const SupportRequest = () => {
  const [view, setView] = useState("list");
  const [selectedRequests, setSelectedRequests] = useState([]);
  const [isAcceptModalOpen, setIsAcceptModalOpen] = useState(false);
  const [isDeclineModalOpen, setIsDeclineModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const handleSelectAll = () => {
    if (selectedRequests.length === requests.length) {
      setSelectedRequests([]);
    } else {
      setSelectedRequests(requests.map((_, index) => index));
    }
  };

  const handleSelect = (index) => {
    if (selectedRequests.includes(index)) {
      setSelectedRequests(selectedRequests.filter((i) => i !== index));
    } else {
      setSelectedRequests([...selectedRequests, index]);
    }
  };

  const requests = [
    {
      name: "Anna Ivanovic",
      date: "2nd Dec., 2025",
      image: avatar,
    },
    {
      name: "Benson Jackson",
      date: "2nd Dec., 2025",
      image: avatar,
    },
    {
      name: "Beryl Ama",
      date: "2nd Dec., 2025",
      image: avatar,
    },
    {
      name: "Jack Phil",
      date: "2nd Dec., 2025",
      image: avatar,
    },
    {
      name: "Matt Hardy",
      date: "2nd Dec., 2025",
      image: avatar,
    },
    {
      name: "Michael Jackinson",
      date: "2nd Dec., 2025",
      image: avatar,
    },
    {
      name: "Philip Bryan",
      date: "2nd Dec., 2025",
      image: avatar,
    },
    {
      name: "Sarah Connor",
      date: "2nd Dec., 2025",
      image: avatar,
    },
    {
      name: "John Doe",
      date: "2nd Dec., 2025",
      image: avatar,
    },
    {
      name: "Jane Smith",
      date: "2nd Dec., 2025",
      image: avatar,
    },
  ];

  const itemsPerPage = 6;
  const totalPages = Math.ceil(requests.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentRequests = requests.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    setSelectedRequests([]); 
    window.scrollTo({
      top: document.querySelector('.requests-container').offsetTop - 100,
      behavior: 'smooth'
    });
  };

  const handleBulkAccept = () => {
    if (selectedRequests.length > 0) {
      setIsAcceptModalOpen(true);
    }
  };

  const handleBulkDecline = () => {
    if (selectedRequests.length > 0) {
      setIsDeclineModalOpen(true);
    }
  };

  return (
    <div className="p-2 sm:p-3 md:p-4 max-w-full">
      <div className="mb-4 sm:mb-6">
        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-3 sm:gap-0 mb-3 sm:mb-4">
          <h2 className="text-lg sm:text-xl font-semibold font-secondary text-black">
            Join Request <span className="text-gray-500">({requests.length})</span>
          </h2>
          <div className="flex items-center gap-3 sm:gap-4">
            <button
              className="p-1.5 sm:p-2 rounded shadow-md sm:shadow-lg bg-[#E2F6F766] hover:bg-gray-100 transition-colors"
              onClick={handleBulkAccept}
              disabled={selectedRequests.length === 0}
            >
              <BsCheckLg
                size={18}
                className={`text-gray-600 ${
                  selectedRequests.length === 0 ? "opacity-50" : ""
                }`}
              />
            </button>
            <button
              className="p-1.5 sm:p-2 rounded shadow-md sm:shadow-lg bg-[#E2F6F766] hover:bg-gray-100 transition-colors"
              onClick={handleBulkDecline}
              disabled={selectedRequests.length === 0}
            >
              <BsX
                size={18}
                className={`text-gray-600 ${
                  selectedRequests.length === 0 ? "opacity-50" : ""
                }`}
              />
            </button>
          </div>
        </div>
        <div className="flex items-center gap-3 sm:gap-4">
          <button
            onClick={handleSelectAll}
            className={`p-1.5 sm:p-2 rounded shadow-md sm:shadow-lg ${
              selectedRequests.length === currentRequests.length
                ? "bg-gray-200"
                : "bg-[#E2F6F766]"
            } hover:bg-gray-100 transition-colors`}
          >
            <input
              type="checkbox"
              className="w-4 h-4 sm:w-5 sm:h-5"
              checked={selectedRequests.length === currentRequests.length}
              onChange={handleSelectAll}
            />
          </button>
          <ViewToggle view={view} setView={setView} />
        </div>
      </div>

      <div className="requests-container">
        {view === "grid" ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4">
            {currentRequests.map((request, index) => (
              <RequestCard
                key={startIndex + index}
                request={request}
                view={view}
                index={startIndex + index}
                selectedRequests={selectedRequests}
                handleSelect={handleSelect}
              />
            ))}
          </div>
        ) : (
          <div className="space-y-2 sm:space-y-3">
            {currentRequests.map((request, index) => (
              <RequestCard
                key={startIndex + index}
                request={request}
                view={view}
                index={startIndex + index}
                selectedRequests={selectedRequests}
                handleSelect={handleSelect}
              />
            ))}
          </div>
        )}
      </div>

      <div className="mt-4 sm:mt-6">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>

      <Modal
        isOpen={isAcceptModalOpen}
        onRequestClose={() => setIsAcceptModalOpen(false)}
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg p-4 sm:p-6 w-[90%] max-w-[500px]"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50"
      >
        <div className="relative">
          <div className="flex justify-between items-center mb-4 sm:mb-6">
            <h2 className="text-lg sm:text-xl font-semibold flex items-center gap-2">
              <span className="text-green-500">✓</span>
              Accept Requests
            </h2>
            <button
              onClick={() => setIsAcceptModalOpen(false)}
              className="text-gray-400 hover:text-gray-600"
            >
              ✕
            </button>
          </div>

          <p className="text-gray-600 mb-4 sm:mb-6 text-sm sm:text-base">
            Are you sure you want to accept {selectedRequests.length} selected
            requests?
          </p>

          <div className="flex justify-end gap-2 sm:gap-3">
            <button
              onClick={() => setIsAcceptModalOpen(false)}
              className="px-4 sm:px-6 py-1.5 sm:py-2 border rounded-lg text-xs sm:text-sm"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                setIsAcceptModalOpen(false);
                setSelectedRequests([]);
              }}
              className="px-4 sm:px-6 py-1.5 sm:py-2 bg-[#0E5B31] text-white rounded-lg text-xs sm:text-sm"
            >
              Accept
            </button>
          </div>
        </div>
      </Modal>

      <Modal
        isOpen={isDeclineModalOpen}
        onRequestClose={() => setIsDeclineModalOpen(false)}
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg p-4 sm:p-6 w-[90%] max-w-[500px]"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50"
      >
        <div className="relative">
          <div className="flex justify-between items-center mb-4 sm:mb-6">
            <h2 className="text-lg sm:text-xl font-semibold flex items-center gap-2">
              <span className="text-red-500">⚠</span>
              Decline Requests
            </h2>
            <button
              onClick={() => setIsDeclineModalOpen(false)}
              className="text-gray-400 hover:text-gray-600"
            >
              ✕
            </button>
          </div>

          <p className="text-gray-600 mb-4 sm:mb-6 text-sm sm:text-base">
            Are you sure you want to decline {selectedRequests.length} selected
            requests?
          </p>

          <div className="flex justify-end gap-2 sm:gap-3">
            <button
              onClick={() => setIsDeclineModalOpen(false)}
              className="px-4 sm:px-6 py-1.5 sm:py-2 border rounded-lg text-xs sm:text-sm"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                setIsDeclineModalOpen(false);
                setSelectedRequests([]);
              }}
              className="px-4 sm:px-6 py-1.5 sm:py-2 bg-red-500 text-white rounded-lg text-xs sm:text-sm"
            >
              Decline
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default SupportRequest;
