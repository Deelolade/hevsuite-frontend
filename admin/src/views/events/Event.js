import React, { useState } from "react";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import eventImage from "../../assets/event-image.png";
import Profile from "../../components/Profile";
import { BiSearch } from "react-icons/bi";
import Modal from "react-modal";
import { BsCalendar } from "react-icons/bs";
import { MdAccessTime } from "react-icons/md";

const Event = () => {
  const [currentPage, setCurrentPage] = useState(2);
  const [isAddEventOpen, setIsAddEventOpen] = useState(false);

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
    <div className="p-8 space-y-6 bg-gray-50 min-h-screen">
      {/* Header */}
      {/* <div className="flex justify-between items-center">
        <div className="relative flex-1 max-w-xl">
          <BiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />
          <input
            type="text"
            placeholder="Search..."
            className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:border-gray-300 focus:ring-1 focus:ring-gray-300"
          />
        </div>
        <div className="flex items-center gap-4">
          <div className="relative">
            
            <button className="p-2">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12.02 2.90991C8.70997 2.90991 6.01997 5.59991 6.01997 8.90991V11.7999C6.01997 12.4099 5.75997 13.3399 5.44997 13.8599L4.29997 15.7699C3.58997 16.9499 4.07997 18.2599 5.37997 18.6999C9.68997 20.1399 14.34 20.1399 18.65 18.6999C19.86 18.2999 20.39 16.8699 19.73 15.7699L18.58 13.8599C18.28 13.3399 18.02 12.4099 18.02 11.7999V8.90991C18.02 5.60991 15.32 2.90991 12.02 2.90991Z" stroke="#323C47" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round"/>
                <path d="M13.87 3.19994C13.56 3.10994 13.24 3.03994 12.91 2.99994C11.95 2.87994 11.03 2.94994 10.17 3.19994C10.46 2.45994 11.18 1.93994 12.02 1.93994C12.86 1.93994 13.58 2.45994 13.87 3.19994Z" stroke="#323C47" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M15.02 19.0601C15.02 20.7101 13.67 22.0601 12.02 22.0601C11.2 22.0601 10.44 21.7201 9.90002 21.1801C9.36002 20.6401 9.02002 19.8801 9.02002 19.0601" stroke="#323C47" strokeWidth="1.5" strokeMiterlimit="10"/>
              </svg>
            </button>
          </div>
          <Profile />
        </div>
      </div> */}
      <div className="flex items-center justify-between">
        <div className="flex-1 max-w-2xl mx-auto px-4">
          <div className="relative">
            <BiSearch className="absolute right-8 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />
            <input
              type="text"
              placeholder="Search..."
              className="w-full px-8 py-2.5 rounded-full  border border-gray-400 focus:outline-none text-sm"
            />
          </div>
        </div>
        <Profile />
      </div>

      <div className="flex justify-between items-center">
        <button
          className="px-6 py-2.5 bg-[#540A26] text-white rounded-lg flex items-center gap-2 hover:bg-[#4a0922] transition-colors"
          onClick={() => setIsAddEventOpen(true)}
        >
          Create Event
          <span className="text-xl">+</span>
        </button>
        <div className="flex gap-4">
          <div className="relative">
            <button className="px-6 py-2.5 border border-gray-200 rounded-lg text-[#323C47] min-w-[200px] text-left flex items-center justify-between hover:border-gray-300 transition-colors">
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
            <button className="px-6 py-2.5 border border-gray-200 rounded-lg text-[#323C47] min-w-[200px] text-left flex items-center justify-between hover:border-gray-300 transition-colors">
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
            <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity z-10">
              <button className="p-2 bg-white rounded-lg text-[#540A26] hover:bg-gray-100 transition-colors">
                <FiEdit size={18} />
              </button>
              <button className="p-2 bg-white rounded-lg text-[#540A26] hover:bg-gray-100 transition-colors">
                <FiTrash2 size={18} />
              </button>
            </div>
            <div className="bg-[#540A26] rounded-lg overflow-hidden">
              <img
                src={event.image}
                alt={event.title}
                className="w-full h-48 object-cover opacity-50"
              />
              <div className="p-4 text-white">
                <h3 className="text-lg font-bold">{event.title}</h3>
                <div className="flex items-center gap-4 text-sm mt-2 text-gray-200">
                  <div className="flex items-center gap-1.5">
                    <BsCalendar className="text-lg" />
                    <span className="text-sm">{event.date}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <MdAccessTime className="text-lg" />
                    <span className="text-sm">{event.time}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-[#323C47]">
          Show result:
          <select className="px-3 py-1.5 border border-gray-200 rounded-lg focus:outline-none focus:border-gray-300 focus:ring-1 focus:ring-gray-300">
            <option>6</option>
            <option>12</option>
            <option>24</option>
          </select>
        </div>
        <div className="flex items-center gap-2">
          <button className="p-1 text-gray-400 hover:text-gray-600 transition-colors">
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
              className={`w-8 h-8 flex items-center justify-center rounded-lg transition-colors ${
                currentPage === page
                  ? "bg-[#540A26] text-white"
                  : "text-[#323C47] hover:bg-gray-100"
              }`}
            >
              {page}
            </button>
          ))}
          <button className="p-1 text-gray-400 hover:text-gray-600 transition-colors">
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
        isOpen={isAddEventOpen}
        onRequestClose={() => setIsAddEventOpen(false)}
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg w-[600px] max-h-[80vh] overflow-y-auto"
        overlayClassName="fixed inset-0 bg-black/50"
      >
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">Add Event</h2>
            <button
              onClick={() => setIsAddEventOpen(false)}
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
                <button className="px-6 py-2 bg-[#540A26] text-white rounded-lg">
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
                onClick={() => setIsAddEventOpen(false)}
                className="px-6 py-2 border rounded-lg"
              >
                Cancel
              </button>
              <button className="px-6 py-2 bg-[#540A26] text-white rounded-lg">
                Create Event
              </button>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Event;
