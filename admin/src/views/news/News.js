import React, { useState } from "react";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import eventImage from "../../assets/event-image.png";
import Profile from "../../components/Profile";
import { BiSearch } from "react-icons/bi";
import Modal from "react-modal";
import { BsCalendar } from "react-icons/bs";

const News = () => {
  const [currentPage, setCurrentPage] = useState(2);
  const [isAddNewsOpen, setIsAddNewsOpen] = useState(false);

  const events = [
    {
      id: 1,
      title: "The Bout for Lions",
      date: "2nd January, 2025",
      time: "10:00pm",
      image: eventImage,
    },
    {
      id: 2,
      title: "The Bout for Lions",
      date: "2nd January, 2025",
      time: "10:00pm",
      image: eventImage,
    },
    {
      id: 3,
      title: "The Bout for Lions",
      date: "2nd January, 2025",
      time: "10:00pm",
      image: eventImage,
    },
    {
      id: 4,
      title: "The Bout for Lions",
      date: "2nd January, 2025",
      time: "10:00pm",
      image: eventImage,
    },
    {
      id: 5,
      title: "The Bout for Lions",
      date: "2nd January, 2025",
      time: "10:00pm",
      image: eventImage,
    },
    {
      id: 6,
      title: "The Bout for Lions",
      date: "2nd January, 2025",
      time: "10:00pm",
      image: eventImage,
    },
    {
      id: 7,
      title: "The Bout for Lions",
      date: "2nd January, 2025",
      time: "10:00pm",
      image: eventImage,
    },
    {
      id: 8,
      title: "The Bout for Lions",
      date: "2nd January, 2025",
      time: "10:00pm",
      image: eventImage,
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div className="relative flex-1 max-w-xl">
          <BiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />
          <input
            type="text"
            placeholder="Search..."
            className="w-full pl-10 pr-4 py-2 border rounded-lg"
          />
        </div>
        <div className="flex items-center gap-4">
          <Profile />
        </div>
      </div>
      <div className="flex justify-between items-center">
        <button
          className="px-6 py-2 bg-primary text-white rounded-lg flex items-center gap-2"
          onClick={() => setIsAddNewsOpen(true)}
        >
          Create News
          <span className="text-xl">+</span>
        </button>
        <div className="flex gap-4">
          <div className="relative">
            <button className="px-6 py-2 border rounded-lg text-gray-600 min-w-[200px] text-left flex items-center justify-between">
              Filter
              <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
                <path
                  fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
          <div className="relative">
            <button className="px-6 py-2 border rounded-lg text-gray-600 min-w-[200px] text-left flex items-center justify-between">
              Sort by
              <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
                <path
                  fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Event Grid */}
      <div className="grid grid-cols-4 gap-6">
        {events.map((event) => (
          <div key={event.id} className="relative group">
            <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <button className="p-2 bg-white rounded-lg text-primary hover:bg-gray-100">
                <FiEdit size={18} />
              </button>
              <button className="p-2 bg-white rounded-lg text-primary hover:bg-gray-100">
                <FiTrash2 size={18} />
              </button>
            </div>
            <div className="bg-primary rounded-lg overflow-hidden">
              <img
                src={event.image}
                alt={event.title}
                className="w-full h-48 object-cover opacity-50"
              />
              <div className="p-4 text-white">
                <h3 className="text-lg font-semibold">{event.title}</h3>
                <div className="flex items-center gap-2 text-sm mt-2">
                  <span>📅 {event.date}</span>
                  <span>⏰ {event.time}</span>
                </div>
              </div>
            </div>
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
        isOpen={isAddNewsOpen}
        onRequestClose={() => setIsAddNewsOpen(false)}
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg w-[600px] max-h-[80vh] overflow-y-auto"
        overlayClassName="fixed inset-0 bg-black/50"
      >
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">Add Event</h2>
            <button
              onClick={() => setIsAddNewsOpen(false)}
              className="text-gray-400 hover:text-gray-600"
            >
              ✕
            </button>
          </div>

          <div className="space-y-4">
            {/* Event Name */}
            <div>
              <label className="block mb-1">Event Name</label>
              <input
                type="text"
                placeholder="Enter event name"
                className="w-full px-4 py-2 border rounded-lg text-gray-600"
              />
            </div>

            {/* Location and Time */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block mb-1">Location</label>
                <input
                  type="text"
                  placeholder="Enter event location"
                  className="w-full px-4 py-2 border rounded-lg text-gray-600"
                />
              </div>
              <div>
                <label className="block mb-1">Time</label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Enter event time"
                    className="w-full px-4 py-2 border rounded-lg text-gray-600"
                  />
                  <BsCalendar className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
                </div>
              </div>
            </div>

            {/* Event Description */}
            <div>
              <label className="block mb-1">Event Description</label>
              <textarea
                rows={6}
                className="w-full px-4 py-2 border rounded-lg text-gray-600 resize-none"
              />
            </div>

            {/* Audience Type and Price */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block mb-1">Audience Type</label>
                <select className="w-full px-4 py-2 border rounded-lg text-gray-600 appearance-none bg-white">
                  <option>Enter who can attend?</option>
                </select>
              </div>
              <div>
                <label className="block mb-1">Price</label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Enter the price"
                    className="w-full px-4 py-2 border rounded-lg text-gray-600"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                    ℹ
                  </span>
                </div>
              </div>
            </div>

            {/* No of Tickets */}
            <div>
              <label className="block mb-1">No of Tickets</label>
              <input
                type="text"
                placeholder="Enter the no of tickets"
                className="w-full px-4 py-2 border rounded-lg text-gray-600"
              />
            </div>

            {/* Attending members */}
            <div>
              <label className="block mb-1">Attending members</label>
              <div className="flex gap-4">
                <div className="relative flex-1">
                  <BiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search members"
                    className="w-full pl-10 pr-4 py-2 border rounded-lg text-gray-600"
                  />
                </div>
                <button className="px-6 py-2 bg-primary text-white rounded-lg">
                  Invite Users
                </button>
              </div>
              <div className="mt-2 border rounded-lg h-[120px]"></div>
            </div>

            {/* Event Image */}
            <div>
              <label className="block mb-1">Event Image</label>
              <div className="flex gap-4">
                <div className="w-24 h-24 border-2 border-dashed rounded-lg flex items-center justify-center cursor-pointer hover:bg-gray-50">
                  <span className="text-2xl text-gray-400">+</span>
                </div>
                {[1, 2].map((_, index) => (
                  <div
                    key={index}
                    className="w-24 h-24 rounded-lg overflow-hidden"
                  >
                    <img
                      src={eventImage}
                      alt=""
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end gap-3 pt-4">
              <button
                onClick={() => setIsAddNewsOpen(false)}
                className="px-6 py-2 border rounded-lg"
              >
                Cancel
              </button>
              <button className="px-6 py-2 bg-primary text-white rounded-lg">
                Create Event
              </button>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default News;
