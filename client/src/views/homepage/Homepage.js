import React, { useState } from "react";
import Header from "../../components/Header";
import headerBg from "../../assets/header-bg.jpg";
import event from "../../assets/event.png";
import Footer from "../../components/Footer";
import { BsCalendar } from "react-icons/bs";
import { MdAccessTime, MdPerson } from "react-icons/md";
import { IoLocationOutline } from "react-icons/io5";
import { Link } from "react-router-dom";

const Homepage = () => {
  const [selectedAudience, setSelectedAudience] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [activeSlide, setActiveSlide] = useState(1);
  const [showFilters, setShowFilters] = useState(false);

  const events = [
    {
      id: 1,
      title: "The Bout for Lions",
      date: "2nd January, 2025",
      time: "10:00pm",
      image: event,
    },
    {
      id: 2,
      title: "Battle for NBA Cup",
      date: "2nd January, 2025",
      time: "10:00pm",
      image: event,
    },
    {
      id: 3,
      title: "The Adventurer",
      date: "2nd January, 2025",
      time: "10:00pm",
      image: event,
    },
    {
      id: 4,
      title: "Battle for NBA Cup",
      date: "2nd January, 2025",
      time: "10:00pm",
      image: event,
    },
    {
      id: 5,
      title: "The Bout for Lions",
      date: "2nd January, 2025",
      time: "10:00pm",
      image: event,
    },
  ];

  const newsItems = [
    {
      id: 1,
      title: "The Bout for Lions",
      date: "2nd January, 2025",
      time: "10:00pm",
      image: event,
    },
    {
      id: 2,
      title: "Battle for NBA Cup",
      date: "2nd January, 2025",
      time: "10:00pm",
      image: event,
    },
    {
      id: 3,
      title: "The Adventurer",
      date: "2nd January, 2025",
      time: "10:00pm",
      image: event,
    },
    {
      id: 4,
      title: "Battle for NBA Cup",
      date: "2nd January, 2025",
      time: "10:00pm",
      image: event,
    },
  ];

  const handlePrevSlide = () => {
    setActiveSlide((prev) => (prev === 0 ? events.length - 1 : prev - 1));
  };

  const handleNextSlide = () => {
    setActiveSlide((prev) => (prev === events.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="relative text-white">
        <div className="absolute inset-0 z-0">
          <img
            src={headerBg}
            alt="background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>
        <div className="relative z-10">
          <Header />
          <div className="max-w-[1400px] mx-auto px-4">
            {/* Filters */}
            <div className="py-4 flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="w-full md:w-auto flex flex-col md:flex-row items-center gap-2 md:gap-4">
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="md:hidden w-full bg-[#540A26] text-white py-2 px-4 rounded-lg mb-2"
                >
                  {showFilters ? "Hide Filters" : "Show Filters"}
                </button>

                <div
                  className={`w-full md:flex items-center gap-2 md:gap-4 ${
                    showFilters
                      ? "flex flex-col md:flex-row"
                      : "hidden md:flex md:flex-row"
                  }`}
                >
                  <div className="relative w-full md:w-auto">
                    <MdPerson className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <select
                      className="w-full md:w-auto bg-transparent border border-gray-600 rounded-lg pl-10 pr-4 py-2 text-sm appearance-none"
                      value={selectedAudience}
                      onChange={(e) => setSelectedAudience(e.target.value)}
                    >
                      <option value="" className="text-black">
                        Audience
                      </option>
                      <option value="members" className="text-black">
                        For Members
                      </option>
                      <option value="public" className="text-black">
                        Public Event
                      </option>
                      <option value="vip" className="text-black">
                        Vip Members
                      </option>
                    </select>
                  </div>

                  <div className="relative w-full md:w-auto mt-2 md:mt-0">
                    <IoLocationOutline className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <select
                      className="w-full md:w-auto bg-transparent border border-gray-600 rounded-lg pl-10 pr-4 py-2 text-sm appearance-none"
                      value={selectedCountry}
                      onChange={(e) => setSelectedCountry(e.target.value)}
                    >
                      <option value="" className="text-black">
                        Country
                      </option>
                      <option value="ethiopia" className="text-black">
                        Ethiopia
                      </option>
                      <option value="kenya" className="text-black">
                        Kenya
                      </option>
                    </select>
                  </div>

                  <div className="relative w-full md:w-auto mt-2 md:mt-0">
                    <IoLocationOutline className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <select
                      className="w-full md:w-auto bg-transparent border border-gray-600 rounded-lg pl-10 pr-4 py-2 text-sm appearance-none"
                      value={selectedCity}
                      onChange={(e) => setSelectedCity(e.target.value)}
                    >
                      <option value="" className="text-black">
                        City
                      </option>
                      <option value="addis" className="text-black">
                        Addis Ababa
                      </option>
                      <option value="nairobi" className="text-black">
                        Nairobi
                      </option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="relative w-full md:w-auto mt-2 md:mt-0">
                <BsCalendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <select
                  className="w-full md:w-auto bg-transparent border border-gray-600 rounded-lg pl-10 pr-4 py-2 text-sm appearance-none"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                >
                  <option value="" className="text-black">
                    Date
                  </option>
                  <option value="newest" className="text-black">
                    Newest to Oldest
                  </option>
                  <option value="oldest" className="text-black">
                    Oldest to Newest
                  </option>
                </select>
              </div>
            </div>

            {/* Event Slider */}
            <div className="relative py-8">
              {/* Mobile Slider */}
              <div className="md:hidden">
                <div className="relative rounded-xl overflow-hidden h-[350px]">
                  <img
                    src={events[activeSlide].image}
                    alt={events[activeSlide].title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black">
                    <h3 className="text-xl font-semibold">
                      {events[activeSlide].title}
                    </h3>
                    <div className="flex items-center gap-4 mt-2 text-sm">
                      <div className="flex items-center gap-1">
                        <BsCalendar className="w-4 h-4" />
                        <span>{events[activeSlide].date}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MdAccessTime className="w-4 h-4" />
                        <span>{events[activeSlide].time}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex justify-between mt-4">
                  <button
                    onClick={handlePrevSlide}
                    className="bg-black/50 p-2 rounded-full hover:bg-black/70 transition-colors"
                  >
                    ←
                  </button>
                  <div className="flex justify-center gap-2 items-center">
                    {events.map((_, idx) => (
                      <div
                        key={idx}
                        className={`w-2 h-2 rounded-full ${
                          idx === activeSlide ? "bg-red-500" : "bg-gray-500"
                        }`}
                        onClick={() => setActiveSlide(idx)}
                      />
                    ))}
                  </div>
                  <button
                    onClick={handleNextSlide}
                    className="bg-black/50 p-2 rounded-full hover:bg-black/70 transition-colors"
                  >
                    →
                  </button>
                </div>
              </div>

              {/* Desktop Slider */}
              <div className="hidden md:block">
                <div className="flex justify-center items-center gap-4">
                  {events
                    .slice(
                      (activeSlide === 0
                        ? events.length - 1
                        : activeSlide - 1) % events.length,
                      ((activeSlide === 0
                        ? events.length - 1
                        : activeSlide - 1) %
                        events.length) +
                        3
                    )
                    .map((event, idx) => (
                      <div
                        key={event.id}
                        className={`relative rounded-2xl overflow-hidden transition-all duration-300 ${
                          idx === 1
                            ? "w-[500px] h-[400px]"
                            : "w-[300px] h-[300px] opacity-70"
                        }`}
                      >
                        <img
                          src={event.image}
                          alt={event.title}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black">
                          <h3 className="text-xl font-semibold">
                            {event.title}
                          </h3>
                          <div className="flex items-center gap-4 mt-2 text-sm">
                            <div className="flex items-center gap-1">
                              <BsCalendar className="w-4 h-4" />
                              <span>{event.date}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <MdAccessTime className="w-4 h-4" />
                              <span>{event.time}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
                <button
                  onClick={handlePrevSlide}
                  className="absolute left-8 top-1/2 -translate-y-1/2 bg-black/50 p-2 rounded-full hover:bg-black/70 transition-colors"
                >
                  ←
                </button>
                <button
                  onClick={handleNextSlide}
                  className="absolute right-8 top-1/2 -translate-y-1/2 bg-black/50 p-2 rounded-full hover:bg-black/70 transition-colors"
                >
                  →
                </button>
                <div className="flex justify-center gap-2 mt-6">
                  {events.map((_, idx) => (
                    <div
                      key={idx}
                      className={`w-2 h-2 rounded-full cursor-pointer ${
                        idx === activeSlide ? "bg-red-500" : "bg-gray-500"
                      }`}
                      onClick={() => setActiveSlide(idx)}
                    />
                  ))}
                </div>
              </div>

              <div className="text-center md:text-right mt-4 px-4">
                <Link
                  to="/events"
                  className="text-gray-400 hover:text-white transition-colors text-sm"
                >
                  View All
                </Link>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Newsroom */}
      <section className="py-8 md:py-16">
        <div className="container mx-auto px-4 md:px-12">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-8 md:mb-12 font-secondary text-gradient_r">
            Newsroom
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {newsItems.map((item) => (
              <div key={item.id} className="relative group">
                <div className="relative h-64 md:h-80 rounded-2xl overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black text-white">
                    <h3 className="text-lg md:text-xl font-semibold">
                      {item.title}
                    </h3>
                    <div className="flex items-center gap-4 mt-2 text-xs md:text-sm">
                      <div className="flex items-center gap-1">
                        <BsCalendar className="w-3 h-3 md:w-4 md:h-4" />
                        <span>{item.date}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MdAccessTime className="w-3 h-3 md:w-4 md:h-4" />
                        <span>{item.time}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-6 md:mt-8">
            <button className="bg-gradient-to-r  from-[#8B0000] to-[#4B0082] text-white px-8 py-2 rounded-full">
              View all
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Homepage;
