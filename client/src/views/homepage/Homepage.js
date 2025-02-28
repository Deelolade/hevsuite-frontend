import React, { useState } from "react";
import Header from "../../components/Header";
import headerBg from "../../assets/header-bg.jpg";
import event from "../../assets/event.png";
import Footer from "../../components/Footer";
import { BsCalendar } from "react-icons/bs";
import { MdAccessTime } from "react-icons/md";
import { Link } from "react-router-dom";

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
      image: event,
    },
    {
      id: 2,
      title: "The Bout for Lions",
      date: "2nd January, 2025",
      time: "10:00pm",
      image: event,
    },
    {
      id: 3,
      title: "The Bout for Lions",
      date: "2nd January, 2025",
      time: "10:00pm",
      image: event,
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
    {
      id: 4,
      title: "Battle for NBA Cup",
      date: "2nd January, 2025",
      time: "10:00pm",
      image: event,
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Filters */}
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
          <div className="flex flex-col items-center">
            <div className="px-6 py-4 flex items-center space-x-4 ">
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
            <div className="relative px-6 py-8 ">
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
                <Link to="/events" className="text-gray-400 hover:text-white">
                  View All
                </Link>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Newsroom */}
      <section className="py-16">
        <div className="container mx-auto px-12">
          <h2 className="text-4xl font-bold text-center mb-12 font-secondary text-gradient_r">
            Newsroom
          </h2>
          <div className="grid grid-cols-5 gap-6">
            {newsItems.map((item) => (
              <div key={item.id} className="relative group ">
                <div
                  className="relative h-80 rounded-2xl overflow-hidden bg-center"
                  style={{ backgroundImage: `url(${item.image})` }}
                >
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-gradient_r/90 to-transparent" />

                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h3 className="text-xl font-medium text-white mb-2 overflow-hidden text-ellipsis whitespace-nowrap">
                      {item.title}
                    </h3>
                    <div className="flex justify-between gap-4">
                      <div className="flex flex-col gap-4">
                        <div className="flex items-center gap-2 text-white/80">
                          <BsCalendar className="w-4 h-4" />
                          <span className="text-[12px]">{item.date}</span>
                        </div>
                        <div className="flex items-center gap-2 text-white/80">
                          <MdAccessTime className="w-4 h-4" />
                          <span className="text-[12px]">{item.time}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-center gap-2 mt-8">
            <button className="w-2 h-2 rounded-full bg-[#540A26]"></button>
            <button className="w-2 h-2 rounded-full bg-gray-300"></button>
            <button className="w-2 h-2 rounded-full bg-gray-300"></button>
          </div>
          <div className="text-center mt-8">
            <Link
              to="/news"
              className="px-8 py-3 bg-primary text-white rounded-lg font-secondary"
            >
              View all
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Homepage;
