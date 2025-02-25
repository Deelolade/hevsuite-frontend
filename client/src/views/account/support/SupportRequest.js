import React, { useState } from "react";
import { BsCheckLg, BsGrid, BsListUl, BsX } from "react-icons/bs";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";

const ViewToggle = ({ view, setView }) => {
  return (
    <div className="flex items-center gap-2">
      <button
        onClick={() => setView("list")}
        className={`p-2 rounded ${view === "list" ? "bg-gray-100" : ""}`}
      >
        <BsListUl size={20} />
      </button>
      <button
        onClick={() => setView("grid")}
        className={`p-2 rounded ${view === "grid" ? "bg-gray-100" : ""}`}
      >
        <BsGrid size={20} />
      </button>
    </div>
  );
};

const RequestCard = ({ request, view }) => {
  if (view === "grid") {
    return (
      <div className="bg-white rounded-lg p-4 shadow-sm">
        <div className="flex flex-col items-center">
          <img
            src={request.image}
            alt={request.name}
            className="w-16 h-16 rounded-full mb-3"
          />
          <h3 className="font-medium text-lg">{request.name}</h3>
          <p className="text-sm text-gray-600 mb-4">{request.date}</p>
          <div className="flex gap-2 w-full">
            <button className="flex-1 bg-[#0E5B31] text-white py-2 rounded-lg flex items-center justify-center gap-1">
              Accept <BsCheckLg />
            </button>
            <button className="flex-1 bg-red-500 text-white py-2 rounded-lg flex items-center justify-center gap-1">
              Decline <BsX />
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-4 bg-white rounded-lg p-3">
      <input type="checkbox" className="w-5 h-5" />
      <img
        src={request.image}
        alt={request.name}
        className="w-12 h-12 rounded-full"
      />
      <div className="flex-grow">
        <h3 className="font-medium">{request.name}</h3>
        <p className="text-sm text-gray-600">{request.date}</p>
      </div>
      <div className="flex gap-2">
        <button className="bg-[#0E5B31] text-white px-4 py-2 rounded-lg flex items-center gap-1">
          Accept <BsCheckLg />
        </button>
        <button className="bg-red-500 text-white px-4 py-2 rounded-lg flex items-center gap-1">
          Decline <BsX />
        </button>
      </div>
    </div>
  );
};

const Pagination = () => {
  return (
    <div className="flex justify-center items-center gap-4 mt-8">
      <button className="text-gray-400 hover:text-gray-600">
        <BsChevronLeft size={20} />
      </button>
      <div className="flex gap-2">
        {[1, 2, 3, 4, 5].map((dot, index) => (
          <button
            key={dot}
            className={`w-2 h-2 rounded-full ${
              index === 0 ? "bg-[#540A26]" : "bg-gray-300"
            }`}
          />
        ))}
      </div>
      <button className="text-gray-400 hover:text-gray-600">
        <BsChevronRight size={20} />
      </button>
    </div>
  );
};

const SupportRequest = () => {
  const [view, setView] = useState("grid");

  const requests = [
    {
      name: "Anna Ivanovic",
      date: "2nd Dec., 2025",
      image: "/profile-image.jpg",
    },
    {
      name: "Benson Jackson",
      date: "2nd Dec., 2025",
      image: "/profile-image.jpg",
    },
    {
      name: "Beryl Ama",
      date: "2nd Dec., 2025",
      image: "/profile-image.jpg",
    },
    {
      name: "Jack Phil",
      date: "2nd Dec., 2025",
      image: "/profile-image.jpg",
    },
    {
      name: "Matt Hardy",
      date: "2nd Dec., 2025",
      image: "/profile-image.jpg",
    },
    {
      name: "Michael Jackinson",
      date: "2nd Dec., 2025",
      image: "/profile-image.jpg",
    },
    {
      name: "Philip Bryan",
      date: "2nd Dec., 2025",
      image: "/profile-image.jpg",
    },
  ];

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">
          Join Request <span className="text-gray-500">(10)</span>
        </h2>
        <div className="flex items-center gap-4">
          <button className="p-2 rounded hover:bg-gray-100">
            <BsCheckLg size={20} className="text-gray-600" />
          </button>
          <button className="p-2 rounded hover:bg-gray-100">
            <BsX size={20} className="text-gray-600" />
          </button>
          <ViewToggle view={view} setView={setView} />
        </div>
      </div>

      {view === "grid" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {requests.map((request, index) => (
            <RequestCard key={index} request={request} view={view} />
          ))}
        </div>
      ) : (
        <div className="space-y-3">
          {requests.map((request, index) => (
            <RequestCard key={index} request={request} view={view} />
          ))}
        </div>
      )}

      <Pagination />
    </div>
  );
};

export default SupportRequest;
