import React, { useState } from "react";
import { Link } from "react-router-dom";

const Landing = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const newsItems = [
    {
      id: 1,
      title: "The Bout for Lions",
      date: "2nd January, 2025",
      time: "10:00pm",
      image: "/images/bout-lions.jpg",
    },
    {
      id: 2,
      title: "Battle for NBA Cup",
      date: "2nd January, 2025",
      time: "10:00pm",
      image: "/images/nba-cup.jpg",
    },
    {
      id: 3,
      title: "The Adventurer",
      date: "2nd January, 2025",
      time: "10:00pm",
      image: "/images/adventurer.jpg",
    },
    {
      id: 4,
      title: "Battle for NBA Cup",
      date: "2nd January, 2025",
      time: "10:00pm",
      image: "/images/nba-cup-2.jpg",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="absolute top-0 left-0 right-0 z-50">
        <nav className="container mx-auto px-4 py-6 flex justify-between items-center">
          <Link to="/" className="text-white text-3xl font-bold">
            <img src="/logo.png" alt="Logo" className="h-10" />
          </Link>
          <div className="flex items-center gap-8 text-white">
            <Link to="/become-member">Become a member</Link>
            <Link to="/how-it-works">How it works</Link>
            <Link to="/help-centre">Help centre</Link>
            <Link to="/login" className="px-6 py-2 bg-[#540A26] rounded-lg">
              Login for members
            </Link>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="relative h-screen">
        <div className="absolute inset-0 bg-black/50">
          <img
            src="/images/hero.jpg"
            alt="Hero"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
          <h1 className="text-6xl font-bold mb-8">
            The Kings Halloween Event Celebration Party
          </h1>
          <Link
            to="/become-member"
            className="px-8 py-3 bg-[#540A26] rounded-lg text-xl"
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
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">Newsroom</h2>
          <div className="grid grid-cols-4 gap-6">
            {newsItems.map((item) => (
              <div
                key={item.id}
                className="relative rounded-lg overflow-hidden group"
              >
                <div className="aspect-[3/4]">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent p-6 flex flex-col justify-end text-white">
                  <h3 className="text-xl font-semibold mb-4">{item.title}</h3>
                  <div className="flex items-center gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <span>📅</span>
                      <span>{item.date}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span>⏰</span>
                      <span>{item.time}</span>
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
            <button className="px-8 py-3 bg-[#540A26] text-white rounded-lg">
              View all
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <span>Follow us</span>
            <div className="flex gap-4">
              <a href="#" className="text-gray-600 hover:text-black">
                Facebook
              </a>
              <a href="#" className="text-gray-600 hover:text-black">
                Twitter
              </a>
              <a href="#" className="text-gray-600 hover:text-black">
                Instagram
              </a>
              <a href="#" className="text-gray-600 hover:text-black">
                LinkedIn
              </a>
            </div>
          </div>
          <div className="flex gap-8">
            <Link to="/policies" className="text-gray-600 hover:text-black">
              Policies
            </Link>
            <Link to="/about" className="text-gray-600 hover:text-black">
              HH Club & Founder
            </Link>
          </div>
          <div className="text-gray-600">
            2024 Hazor Group (Trading as HH Club)
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
