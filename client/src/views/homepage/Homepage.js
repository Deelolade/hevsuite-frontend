import React, { useState } from "react";
import { Link } from "react-router-dom";
import { BsBell } from "react-icons/bs";

const Homepage = () => {
  const [selectedAudience, setSelectedAudience] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedDate, setSelectedDate] = useState("");

  const events = [
    {
      id: 1,
      title: "The Bout for Lions",
      date: "2nd January, 2025",
      time: "10:00pm",
      image: "/images/event1.jpg",
    },
    {
      id: 2,
      title: "The Bout for Lions",
      date: "2nd January, 2025",
      time: "10:00pm",
      image: "/images/event2.jpg",
    },
    {
      id: 3,
      title: "The Bout for Lions",
      date: "2nd January, 2025",
      time: "10:00pm",
      image: "/images/event3.jpg",
    },
  ];

  const newsEvents = [
    {
      id: 1,
      title: "The Bout for Lions",
      date: "2nd January, 2025",
      time: "10:00pm",
      image: "/images/news1.jpg",
    },
    // Add more news events...
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="py-4 px-6 flex items-center justify-between">
        <Link to="/" className="text-3xl font-bold">
          h
        </Link>
        <div className="flex items-center space-x-6">
          <Link to="/how-it-works">How it works</Link>
          <Link to="/help-centre">Help centre</Link>
          <Link to="/ask">Ask</Link>
          <div className="relative">
            <BsBell className="w-6 h-6" />
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-xs flex items-center justify-center">
              2
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <img
              src="/avatar.jpg"
              alt="User"
              className="w-8 h-8 rounded-full"
            />
            <span>Goodluck</span>
          </div>
        </div>
      </header>

      {/* Filters */}
      <div className="px-6 py-4 flex items-center space-x-4">
        <select
          className="bg-transparent border border-gray-600 rounded-lg px-4 py-2"
          value={selectedAudience}
          onChange={(e) => setSelectedAudience(e.target.value)}
        >
          <option value="">Audience</option>
          <option value="">For Members</option>
          <option value="">Public Event</option>
          <option value="">Vip Members</option>
        </select>

        <select
          className="bg-transparent border border-gray-600 rounded-lg px-4 py-2"
          value={selectedCountry}
          onChange={(e) => setSelectedCountry(e.target.value)}
        >
          <option value="">Country</option>
          {/* Add options */}
        </select>

        <select
          className="bg-transparent border border-gray-600 rounded-lg px-4 py-2"
          value={selectedCity}
          onChange={(e) => setSelectedCity(e.target.value)}
        >
          <option value="">City</option>
          {/* Add options */}
        </select>

        <div className="ml-auto">
          <select
            className="bg-transparent border border-gray-600 rounded-lg px-4 py-2"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
          >
            <option value="">Date</option>
            <option value="">Newest to Oldest</option>
            <option value="">Oldest to Newest</option>
          </select>
        </div>
      </div>

      {/* Events Slider */}
      <div className="relative px-6 py-8">
        <div className="flex space-x-6 overflow-x-auto">
          {events.map((event) => (
            <div
              key={event.id}
              className="min-w-[300px] rounded-2xl overflow-hidden relative"
            >
              <img
                src={event.image}
                alt={event.title}
                className="w-full h-[400px] object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black">
                <h3 className="text-xl font-semibold">{event.title}</h3>
                <div className="flex items-center space-x-4 mt-2">
                  <span>{event.date}</span>
                  <span>{event.time}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
        <button className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 p-2 rounded-full">
          ←
        </button>
        <button className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 p-2 rounded-full">
          →
        </button>
        <div className="flex justify-center space-x-2 mt-4">
          <div className="w-2 h-2 rounded-full bg-red-500"></div>
          <div className="w-2 h-2 rounded-full bg-gray-500"></div>
          <div className="w-2 h-2 rounded-full bg-gray-500"></div>
          <div className="w-2 h-2 rounded-full bg-gray-500"></div>
          <div className="w-2 h-2 rounded-full bg-gray-500"></div>
        </div>
        <div className="text-right mt-4">
          <button className="text-gray-400 hover:text-white">View All</button>
        </div>
      </div>

      {/* Newsroom */}
      <div className="px-6 py-8">
        <h2 className="text-3xl font-semibold mb-6">Newsroom</h2>
        <div className="relative">
          <div className="flex space-x-6 overflow-x-auto">
            {newsEvents.map((event) => (
              <div
                key={event.id}
                className="min-w-[300px] rounded-2xl overflow-hidden relative"
              >
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-[300px] object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black">
                  <h3 className="text-xl font-semibold">{event.title}</h3>
                  <div className="flex items-center space-x-4 mt-2">
                    <span>{event.date}</span>
                    <span>{event.time}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <button className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 p-2 rounded-full">
            ←
          </button>
          <button className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 p-2 rounded-full">
            →
          </button>
        </div>
        <div className="text-center mt-8">
          <button className="px-8 py-3 bg-gradient-to-r from-[#540A26] to-[#0A5440] rounded-lg">
            View all
          </button>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
