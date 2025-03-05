import React, { useState } from "react";
import { FiEdit, FiEye, FiEyeOff, FiTrash2 } from "react-icons/fi";
import eventImage from "../../assets/event.png";
import Profile from "../../components/Profile";
import { BiSearch } from "react-icons/bi";
import { IoCloseOutline } from "react-icons/io5";
import Modal from "react-modal";
import {
  BsCalendar,
  BsChevronLeft,
  BsChevronRight,
  BsHeart,
} from "react-icons/bs";
import { MdAccessTime } from "react-icons/md";
import edit_icon from "../../assets/icons/edit.png";
import avat from "../../assets/user.avif";
import "../layout/forced.css";

const Event = () => {
  const [currentPage, setCurrentPage] = useState(2);
  const [isAddEventOpen, setIsAddEventOpen] = useState(false);
  const [isViewEventOpen, setIsViewEventOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isEditEventOpen, setIsEditEventOpen] = useState(false);
  const [editEventImages, setEditEventImages] = useState([]);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [addEventImages, setAddEventImages] = useState([]);

  const [events, setEvents] = useState([
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
      image: avat,
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
      image: avat,
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
      image: avat,
    },
  ]);

  const [users, setUsers] = useState([
    {
      id: 1,
      name: "Andrew Bojangles",
      avatar: avat,
    },
    {
      id: 2,
      name: "Emily Wilson",
      avatar: avat,
    },
    {
      id: 3,
      name: "Michael Davis",
      avatar: avat,
    },
    {
      id: 4,
      name: "Sophia Rodriguez",
      avatar: avat,
    },
    {
      id: 5,
      name: "Oliver Brown",
      avatar: avat,
    },
    {
      id: 6,
      name: "Ava Lee",
      avatar: avat,
    },
    {
      id: 7,
      name: "Ethan Hall",
      avatar: avat,
    },
    {
      id: 8,
      name: "Isabella Martin",
      avatar: avat,
    },
  ]);

  const handleVisibility = (id) => {
    setEvents(
      events.map((event) =>
        event.id === id ? { ...event, isVisible: !event.isVisible } : event
      )
    );
  };

  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("description");

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="md:p-8 space-y-6 md:min-h-screen">
      {/* Header */}

      <div className="flex items-center justify-between">
        <div className="flex-1 max-w-2xl mx-auto px-8">
          <div className="relative">
            <BiSearch className="absolute hidden md:flex right-8 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />
            <input
              type="text"
              placeholder="Search..."
              className="w-full px-8 py-2.5 rounded-full  border border-gray-400 focus:outline-none text-sm"
            />
          </div>
        </div>
        <Profile />
      </div>

      <div className="flex justify-between flex-col md:flex-row gap-2 items-center">
        <button
          className="px-6 py-2.5 bg-primary text-white rounded-lg flex items-center gap-2 hover:bg-[#4a0922] transition-colors"
          onClick={() => setIsAddEventOpen(true)}
        >
          Create Event
          <span className="text-xl">+</span>
        </button>
        <div className="flex gap-4">
          <div className="relative">
            <select
              className="appearance-none px-6 py-2.5 border border-gray-200 rounded-lg text-[#323C47] md:min-w-[200px] hover:border-gray-300 transition-colors"
              defaultValue="all"
            >
              <option value="all">All</option>
              <option value="vip">VIP Members</option>
              <option value="standard">Standard Members</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2">
              <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
                <path
                  fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </div>
          <div className="relative">
            <select
              className="appearance-none px-6 py-2.5 border border-gray-200 rounded-lg text-[#323C47] md:min-w-[200px] hover:border-gray-300 transition-colors"
              defaultValue="all"
            >
              <option value="all">All</option>
              <option value="latest">Latest</option>
              <option value="oldest">Oldest</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2">
              <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
                <path
                  fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Event Grid */}
      <div className="grid md:grid-cols-4 gap-6">
        {events.map((event) => (
          <div
            key={event.id}
            className="relative group"
            onClick={() => {
              setSelectedEvent(event);
              setIsViewEventOpen(true);
            }}
          >
            <div className="absolute top-4 flex justify-between w-full gap-2 z-10">
              <button
                className="p-2 relative  text-white left-4 rounded-lg  transition-colors"
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedEvent(event);
                  setIsEditEventOpen(true);
                }}
              >
                <img src={edit_icon} alt="edit icon" />
              </button>
              <button
                className="p-2 relative right-4 text-white rounded-lg transition-colors"
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedEvent(event);
                  setIsDeleteModalOpen(true);
                }}
              >
                <FiTrash2 className="w-5 h-5" />
              </button>
            </div>
            <div
              className="relative h-80 rounded-2xl overflow-hidden bg-center"
              style={{ backgroundImage: `url(${event.image})` }}
            >
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#540A26]/90 to-transparent" />

              <div className="absolute bottom-0 left-0 right-0 p-4">
                <h3 className="text-xl font-medium text-white mb-2 overflow-hidden text-ellipsis whitespace-nowrap">
                  {event.title}
                </h3>
                <div className="flex justify-between gap-4">
                  <div className="flex  flex-col gap-4">
                    <div className="flex items-center gap-2 text-white/80">
                      <BsCalendar className="w-4 h-4" />
                      <span className="text-[12px]">{event.date}</span>
                    </div>
                    <div className="flex items-center gap-2 text-white/80">
                      <MdAccessTime className="w-4 h-4" />
                      <span className="text-[12px]">{event.time}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-white/80 cursor-pointer">
                    {event.isVisible ? (
                      <FiEye
                        className="w-7 h-7 text-white"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleVisibility(event.id);
                        }}
                      />
                    ) : (
                      <FiEyeOff
                        className="w-7 h-7 text-white/80"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleVisibility(event.id);
                        }}
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex w-[95vw] md:w-full overflow-auto items-center justify-between">
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
                  ? "bg-primary text-white"
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
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-1000 superZ bg-white rounded-lg md:w-[600px] w-[95vw] max-h-[80vh] overflow-y-auto"
        overlayClassName="fixed inset-0 bg-black/50 superZ"
        style={{
          overlay: { zIndex: 1000 },
          content: { zIndex: 1001 },
        }}
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
                <select
                  className="w-full px-4 py-2 border rounded-lg text-gray-600 bg-white"
                  defaultValue=""
                >
                  <option value="" disabled>
                    Enter who can attend?
                  </option>
                  <option value="Public">Public</option>
                  <option value="VIP Members">VIP Members</option>
                  <option value="Standard Members">Standard Members</option>
                  <option value="Invite Only">Invite Only</option>
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
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border rounded-lg text-gray-600"
                  />
                </div>
                <button className="px-6 py-2 bg-primary text-white rounded-lg">
                  Invite Users
                </button>
              </div>
              <div className="mt-2 border rounded-lg h-[120px] overflow-y-auto">
                {filteredUsers.map((user) => (
                  <div key={user.id} className="flex items-center gap-2 py-2">
                    <img
                      src={user.avatar}
                      alt="Avatar"
                      className="w-8 h-8 rounded-full"
                    />
                    <span>{user.name}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Event Image */}
            <div>
              <label className="block mb-1">Event Image</label>
              <div className="flex gap-4 flex-wrap">
                <label className="w-24 h-24 border-2 border-dashed rounded-lg flex items-center justify-center cursor-pointer hover:bg-gray-50">
                  <span className="text-2xl text-gray-400">+</span>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files[0];
                      if (file) {
                        const imageUrl = URL.createObjectURL(file);
                        setAddEventImages((prev) => [...prev, imageUrl]);
                      }
                    }}
                  />
                </label>
                {addEventImages.map((image, index) => (
                  <div
                    key={index}
                    className="w-24 h-24 rounded-lg overflow-hidden relative group"
                  >
                    <img
                      src={image}
                      alt=""
                      className="w-full h-full object-cover"
                    />
                    <button
                      onClick={() => {
                        setAddEventImages((prev) =>
                          prev.filter((_, i) => i !== index)
                        );
                      }}
                      className="absolute top-1 right-1 w-6 h-6 rounded-full bg-red-500 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      ✕
                    </button>
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
              <button className="px-6 py-2 bg-primary text-white rounded-lg">
                Create Event
              </button>
            </div>
          </div>
        </div>
      </Modal>

      {/* <Modal
        isOpen={isViewEventOpen}
        onRequestClose={() => setIsViewEventOpen(false)}
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-100 bg-white rounded-lg md:w-[600px] w-[90vw] max-h-[80vh] overflow-y-auto"
        overlayClassName="fixed inset-0 bg-black/50 z-50"
        style={{
          overlay: { zIndex: 1000 },
          content: { zIndex: 1001 },
        }}
      >
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">View Event</h2>
            <button
              onClick={() => setIsViewEventOpen(false)}
              className="text-gray-400 hover:text-gray-600"
            >
              ✕
            </button>
          </div>

          {selectedEvent && (
            <div className="space-y-4">
              <div>
                <div className="w-full h-64 rounded-lg overflow-hidden bg-gray-100">
                  <img
                    src={selectedEvent.image}
                    alt=""
                    className="w-full h-full object-contain bg-gray-100"
                  />
                </div>
              </div>

              
              <div>
                <label className="block mb-1 text-sm text-gray-600">
                  Event Name
                </label>
                <div className="w-full px-4 py-2 border rounded-lg text-gray-600 bg-gray-50">
                  {selectedEvent.title}
                </div>
              </div>

              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block mb-1 text-sm text-gray-600">
                    Location
                  </label>
                  <div className="w-full px-4 py-2 border rounded-lg text-gray-600 bg-gray-50">
                    New York, USA
                  </div>
                </div>
                <div>
                  <label className="block mb-1 text-sm text-gray-600">
                    Time
                  </label>
                  <div className="w-full px-4 py-2 border rounded-lg text-gray-600 bg-gray-50">
                    {selectedEvent.time}
                  </div>
                </div>
              </div>


              <div>
                <label className="block mb-1 text-sm text-gray-600">
                  Event Description
                </label>
                <div className="w-full px-4 py-2 border rounded-lg text-gray-600 bg-gray-50 min-h-[150px]">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </div>
              </div>


              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block mb-1 text-sm text-gray-600">
                    Audience Type
                  </label>
                  <div className="w-full px-4 py-2 border rounded-lg text-gray-600 bg-gray-50">
                    Public
                  </div>
                </div>
                <div>
                  <label className="block mb-1 text-sm text-gray-600">
                    Price
                  </label>
                  <div className="w-full px-4 py-2 border rounded-lg text-gray-600 bg-gray-50">
                    $50
                  </div>
                </div>
              </div>

              
              <div>
                <label className="block mb-1 text-sm text-gray-600">
                  No of Tickets
                </label>
                <div className="w-full px-4 py-2 border rounded-lg text-gray-600 bg-gray-50">
                  100
                </div>
              </div>

              
              <div>
                <label className="block mb-1 text-sm text-gray-600">
                  Attending members
                </label>
                <div className="mt-2 border rounded-lg h-[120px] bg-gray-50 p-4">
                  
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <button
                  onClick={() => setIsViewEventOpen(false)}
                  className="px-6 py-2 border rounded-lg"
                >
                  Close
                </button>
              </div>
            </div>
          )}
        </div>
      </Modal> */}

      <Modal
        isOpen={isViewEventOpen}
        onRequestClose={() => setIsViewEventOpen(false)}
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-100 bg-white rounded-3xl w-[90%] max-w-7xl overflow-hidden"
        overlayClassName="fixed inset-0 bg-black/50 z-50"
        style={{
          overlay: { zIndex: 1000 },
          content: { zIndex: 1001 },
        }}
      >
        {selectedEvent && (
          <div className="flex flex-col md:flex-row">
            {/* Left side - Image */}
            <div className="w-full md:w-5/12 relative bg-black">
              <div className="absolute top-6 left-6 flex items-center gap-2 text-white z-10">
                <BsChevronLeft
                  size={20}
                  className="cursor-pointer"
                  onClick={() => setIsViewEventOpen(false)}
                />
                <span>Event Details</span>
              </div>
              <div className="relative h-[300px] md:h-[600px] overflow-y-auto">
                <img
                  src={selectedEvent.image}
                  alt={selectedEvent.title}
                  className="w-full h-full object-cover opacity-90"
                />
                <div className="absolute inset-0 flex items-center justify-between px-6">
                  <button className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center">
                    <BsChevronLeft className="text-white text-xl" />
                  </button>
                  <button className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center">
                    <BsChevronRight className="text-white text-xl" />
                  </button>
                </div>
                <div className="absolute top-6 right-6">
                  <button className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center">
                    <BsHeart className="text-white text-xl" />
                  </button>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-4 md:p-8 bg-gradient-to-t from-black to-transparent">
                  <div className="text-3xl md:text-5xl font-bold text-white mb-2 md:mb-4">
                    50£
                  </div>
                  <div className="inline-block px-3 py-1 md:px-4 md:py-1.5 rounded-full border-2 border-[#540A26] text-white mb-3 md:mb-6 text-sm md:text-base">
                    Members Only
                  </div>
                  <div className="flex items-center gap-3 md:gap-6 text-white mb-2 md:mb-4 text-sm md:text-base">
                    <div className="flex items-center gap-2">
                      <BsCalendar />
                      <span>{selectedEvent.date}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MdAccessTime />
                      <span>{selectedEvent.time}</span>
                    </div>
                  </div>
                  <p className="text-white/70 text-xs md:text-sm mb-3 md:mb-6">
                    Note: Limited tickets available
                  </p>
                  <div className="flex gap-3">
                    <button
                      onClick={() => setIsEditEventOpen(true)}
                      className="flex-1 py-2 md:py-4 bg-white text-[#540A26] rounded-xl text-sm md:text-lg font-medium"
                    >
                      Edit Event
                    </button>
                    <button
                      onClick={() => {
                        setIsViewEventOpen(false);
                        setIsDeleteModalOpen(true);
                      }}
                      className="flex-1 py-2 md:py-4 bg-gradient-to-r from-[#540A26] to-[#540A26] text-white rounded-xl text-sm md:text-lg font-medium"
                    >
                      Delete Event
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Right side - Details */}
            <div className="w-full md:w-7/12 overflow-y-auto max-h-[80vh]">
              <div className="border-b">
                <div className="flex overflow-x-auto">
                  <button
                    className={`px-4 md:px-8 py-3 md:py-4 whitespace-nowrap ${
                      activeTab === "description"
                        ? "bg-[#540A26] text-white"
                        : "bg-white text-black"
                    }`}
                    onClick={() => setActiveTab("description")}
                  >
                    Event Description
                  </button>
                  <button
                    className={`px-4 md:px-8 py-3 md:py-4 whitespace-nowrap ${
                      activeTab === "location"
                        ? "bg-[#540A26] text-white"
                        : "bg-white text-black"
                    }`}
                    onClick={() => setActiveTab("location")}
                  >
                    Location
                  </button>
                  <button
                    className={`px-4 md:px-8 py-3 md:py-4 whitespace-nowrap ${
                      activeTab === "members"
                        ? "bg-[#540A26] text-white"
                        : "bg-white text-black"
                    }`}
                    onClick={() => setActiveTab("members")}
                  >
                    Attending Members
                  </button>
                </div>
              </div>

              <div className="p-4 md:p-8">
                {activeTab === "description" && (
                  <div>
                    <h2 className="text-2xl md:text-[40px] font-bold mb-2 md:mb-4 text-black font-primary">
                      {selectedEvent.title}
                    </h2>
                    <h3 className="text-lg md:text-xl mb-2 md:mb-4 text-black font-primary font-semibold">
                      The Event of the Year! 🎵
                    </h3>
                    <p className="text-gray-600 mb-4 md:mb-6 text-sm md:text-base">
                      Get ready to let loose, dance, and create unforgettable
                      memories, a night filled with excitement, laughter, and
                      good vibes! Whether you're here to groove on the dance
                      floor, enjoy delicious food and drinks, or just soak in
                      the party atmosphere, we've got it all covered.
                    </p>
                    <h3 className="text-lg md:text-xl font-semibold mb-2 md:mb-4 text-black">
                      🎵 What to Expect
                    </h3>
                    <ul className="space-y-2 text-gray-600 list-disc p-4 text-sm md:text-base">
                      <li>
                        Live DJ or Band spinning your favorite hits all night
                        long!
                      </li>
                      <li>
                        Delicious Food & Drinks to keep you energized and in the
                        party mood.
                      </li>
                      <li>
                        Fun Activities & Surprises that will make this night
                        unforgettable.
                      </li>
                      <li>Photo Booth to capture all your favorite moments.</li>
                    </ul>
                  </div>
                )}

                {activeTab === "location" && (
                  <div>
                    <h2 className="text-2xl md:text-[40px] font-bold mb-2 md:mb-4 text-black font-primary">
                      Event Location
                    </h2>
                    <div className="h-[300px] md:h-[400px] bg-gray-100 rounded-lg mb-4 flex items-center justify-center">
                      <div className="text-center">
                        <div className="text-gray-400 mb-2">
                          <svg
                            className="w-12 h-12 mx-auto"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                            ></path>
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                            ></path>
                          </svg>
                        </div>
                        <p className="text-gray-500">Map view</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600 mb-2">
                      <svg
                        className="w-5 h-5 text-[#540A26]"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                        ></path>
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                        ></path>
                      </svg>
                      <span>New York, USA</span>
                    </div>
                    <p className="text-gray-600 text-sm md:text-base">
                      No. 12, Broadway Avenue, New York, USA.
                    </p>
                  </div>
                )}

                {activeTab === "members" && (
                  <div className="space-y-4">
                    <h2 className="text-2xl md:text-[40px] font-bold mb-2 md:mb-4 text-black font-primary">
                      Attending Members
                    </h2>
                    {users.slice(0, 6).map((user) => (
                      <div
                        key={user.id}
                        className="flex items-center gap-4 border-b pb-3"
                      >
                        <img
                          src={user.avatar}
                          alt={user.name}
                          className="w-10 h-10 md:w-12 md:h-12 rounded-full"
                        />
                        <div>
                          <h3 className="font-semibold text-black text-sm md:text-base">
                            {user.name}
                          </h3>
                          <p className="text-gray-600 text-xs md:text-sm">
                            Registered on {selectedEvent.date}
                          </p>
                        </div>
                      </div>
                    ))}
                    <div className="flex items-center justify-center gap-2 mt-6">
                      <button className="p-2">
                        <BsChevronLeft />
                      </button>
                      <div className="flex gap-1">
                        {Array.from({ length: 3 }, (_, index) => (
                          <div
                            key={index}
                            className={`w-2 h-2 rounded-full ${
                              index === 0 ? "bg-[#540A26]" : "bg-gray-200"
                            }`}
                          ></div>
                        ))}
                      </div>
                      <button className="p-2">
                        <BsChevronRight />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </Modal>

      <Modal
        isOpen={isEditEventOpen}
        onRequestClose={() => setIsEditEventOpen(false)}
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-100 bg-white rounded-lg md:w-[600px] w-[90vw] max-h-[80vh] overflow-y-auto"
        overlayClassName="fixed inset-0 bg-black/50 z-50"
        style={{
          overlay: { zIndex: 1000 },
          content: { zIndex: 1001 },
        }}
      >
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">Edit Event</h2>
            <button
              onClick={() => setIsEditEventOpen(false)}
              className="text-gray-400 hover:text-gray-600"
            >
              <IoCloseOutline size={24} />
            </button>
          </div>

          {selectedEvent && (
            <div className="space-y-4">
              {/* Event Name */}
              <div>
                <label className="block mb-1">Event Name</label>
                <input
                  type="text"
                  placeholder="Enter event name"
                  defaultValue={selectedEvent.title}
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
                    defaultValue="New York, USA"
                    className="w-full px-4 py-2 border rounded-lg text-gray-600"
                  />
                </div>
                <div>
                  <label className="block mb-1">Time</label>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Enter event time"
                      defaultValue={selectedEvent.time}
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
                  placeholder="Enter event description"
                  defaultValue="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
                  className="w-full px-4 py-2 border rounded-lg text-gray-600 resize-none"
                />
              </div>

              {/* Audience Type and Price */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block mb-1">Audience Type</label>
                  <select
                    className="w-full px-4 py-2 border rounded-lg text-gray-600 appearance-none bg-white"
                    defaultValue=""
                  >
                    <option value="" disabled>
                      Enter who can attend?
                    </option>
                    <option value="VIP Members">VIP Members</option>
                    <option value="Standard Members">Standard Members</option>
                  </select>
                </div>
                <div>
                  <label className="block mb-1">Price</label>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Enter the price"
                      defaultValue="50"
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
                  defaultValue="100"
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
                <div className="mt-2 border rounded-lg p-4">
                  {/* Attending Members List */}
                  <div className="flex flex-wrap gap-2">
                    {[1, 2, 3, 4, 5].map((_, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-2 bg-gray-50 px-3 py-1.5 rounded-full"
                      >
                        <img
                          src={avat}
                          alt="Andrew Bojangles"
                          className="w-6 h-6 rounded-full"
                        />
                        <span className="text-sm">Andrew Bojangles</span>
                        <button className="text-gray-400 hover:text-gray-600">
                          <IoCloseOutline size={18} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Event Image */}
              <div>
                <label className="block mb-1">Event Image</label>
                <div className="flex gap-4 flex-wrap">
                  <label className="w-24 h-24 border-2 border-dashed rounded-lg flex items-center justify-center cursor-pointer hover:bg-gray-50">
                    <span className="text-2xl text-gray-400">+</span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files[0];
                        if (file) {
                          const imageUrl = URL.createObjectURL(file);
                          setEditEventImages((prev) => [...prev, imageUrl]);
                        }
                      }}
                    />
                  </label>
                  {editEventImages.map((image, index) => (
                    <div
                      key={index}
                      className="w-24 h-24 rounded-lg overflow-hidden relative group"
                    >
                      <img
                        src={image}
                        alt=""
                        className="w-full h-full object-cover"
                      />
                      <button
                        onClick={() => {
                          setEditEventImages((prev) =>
                            prev.filter((_, i) => i !== index)
                          );
                        }}
                        className="absolute top-1 right-1 w-6 h-6 rounded-full bg-red-500 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                  <div className="w-24 h-24 rounded-lg overflow-hidden">
                    <img
                      src={selectedEvent.image}
                      alt=""
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end gap-3 pt-4">
                <button
                  onClick={() => setIsEditEventOpen(false)}
                  className="px-6 py-2 border rounded-lg"
                >
                  Cancel
                </button>
                <button
                  className="px-6 py-2 bg-primary text-white rounded-lg"
                  onClick={() => {
                    // Handle save changes here
                    if (editEventImages.length > 0) {
                      setEvents(
                        events.map((event) =>
                          event.id === selectedEvent.id
                            ? { ...event, images: editEventImages }
                            : event
                        )
                      );
                    }
                    setEditEventImages([]);
                    setIsEditEventOpen(false);
                  }}
                >
                  Update Event
                </button>
              </div>
            </div>
          )}
        </div>
      </Modal>

      <Modal
        isOpen={isDeleteModalOpen}
        onRequestClose={() => setIsDeleteModalOpen(false)}
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-100 bg-white rounded-lg w-[450px]"
        overlayClassName="fixed inset-0 bg-black/50 z-50"
        style={{
          overlay: { zIndex: 1000 },
          content: { zIndex: 1001 },
        }}
      >
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <span className="text-red-500">⚠</span>
              Remove Event
            </h2>
            <button
              onClick={() => setIsDeleteModalOpen(false)}
              className="text-gray-400 hover:text-gray-600"
            >
              ✕
            </button>
          </div>
          <div className="space-y-6">
            <p className="text-gray-600">
              Are you sure you want to remove this event?
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setIsDeleteModalOpen(false)}
                className="px-6 py-2 border rounded-lg text-sm"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  // Handle delete logic
                  setEvents(
                    events.filter((event) => event.id !== selectedEvent.id)
                  );
                  setIsDeleteModalOpen(false);
                }}
                className="px-6 py-2 bg-primary text-white rounded-lg text-sm"
              >
                Remove
              </button>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Event;
