import React, { useState } from "react";
import { Link } from "react-router-dom";
import { BsCalendar } from "react-icons/bs";
import { MdAccessTime } from "react-icons/md";

import event_card from "../../assets/event.png";
import Footer from "../../components/Footer";
import HeaderOne from "../../components/HeaderOne";

const Landing = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const newsItems = [
    {
      id: 1,
      title: "The Bout for Lions",
      date: "2nd January, 2025",
      time: "10:00pm",
      image: event_card,
    },
    {
      id: 2,
      title: "Battle for NBA Cup",
      date: "2nd January, 2025",
      time: "10:00pm",
      image: event_card,
    },
    {
      id: 3,
      title: "The Adventurer",
      date: "2nd January, 2025",
      time: "10:00pm",
      image: event_card,
    },
    {
      id: 4,
      title: "Battle for NBA Cup",
      date: "2nd January, 2025",
      time: "10:00pm",
      image: event_card,
    },
    {
      id: 4,
      title: "Battle for NBA Cup",
      date: "2nd January, 2025",
      time: "10:00pm",
      image: event_card,
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Header */}
      <HeaderOne />

      {/* Hero Section */}
      <section className="relative h-screen">
        <div className="absolute inset-0 bg-black/50">
          <div className="absolute inset-0 bg-black/50">
            <video
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-full object-cover"
            >
              <source src="/videos/hero.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
        <div className="absolute inset-0 flex flex-col items-center justify-end mb-20 text-white">
          <h1 className="text-6xl font-primary font-bold mb-8">
            The Kings Halloween Event Celebration Party
          </h1>
          <Link
            to="/register"
            className="px-8 py-3 bg-gradient-to-r from-gradient_r to-[#1F4F46] rounded-3xl font-secondary text-xl"
          >
            Become a Member
          </Link>
          <div className="flex gap-2 mt-8">
            <button className="w-2 h-2 rounded-full bg-white"></button>
            <button className="w-2 h-2 rounded-full bg-white/50"></button>
            <button className="w-2 h-2 rounded-full bg-white/50"></button>
          </div>
        </div>
      </section>

      {/* Newsroom Section */}
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
              to="news"
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

export default Landing;
