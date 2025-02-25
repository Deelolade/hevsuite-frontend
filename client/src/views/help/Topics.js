import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BsBell, BsChevronLeft, BsChevronRight } from "react-icons/bs";

const Topics = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const popularTopics = [
    {
      id: 1,
      icon: "h",
      title: "About Hazor Hevsuite (HH) Club",
      description:
        "What makes HH Club unique? What are the benefits of being a member? How can I contact the HH Club team",
    },
    {
      id: 2,
      icon: "h",
      title: "Joining the HH Club",
      description:
        "How do I register and join the club? What is the joining fee, and when do I pay it? Why do I need three members to support my registration?",
    },
    // Add more topics as needed
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-black py-4 px-6">
        <div className="flex items-center justify-between">
          <Link to="/" className="text-3xl font-bold text-white">
            h
          </Link>
          <div className="flex items-center space-x-6 text-white">
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
              <span className="text-red-500">Goodluck</span>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <div className="bg-black text-white text-center py-16 px-4">
        <p className="text-sm mb-2">FAQs</p>
        <h1 className="text-4xl font-semibold mb-4">Ask us anything</h1>
        <p className="mb-8">Have any questions? We're here to assist you.</p>
        <div className="max-w-2xl mx-auto relative">
          <input
            type="text"
            placeholder="Search here"
            className="w-full px-4 py-3 rounded-lg text-black"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button className="absolute right-3 top-1/2 -translate-y-1/2">
            🔍
          </button>
        </div>
      </div>

      {/* Popular Topics */}
      <div className="max-w-6xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-semibold text-[#540A26] mb-12">
          Popular Topics
        </h2>

        <div className="relative">
          <div className="flex gap-6 overflow-hidden">
            {popularTopics.map((topic) => (
              <div
                key={topic.id}
                className="w-1/3 bg-white rounded-lg p-6 shadow-lg"
                onClick={() => navigate(`/topic-details/${topic.id}`)}
              >
                <div className="w-12 h-12 bg-[#540A26] rounded-lg text-white flex items-center justify-center text-2xl mb-4">
                  {topic.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{topic.title}</h3>
                <p className="text-gray-600 text-sm">{topic.description}</p>
              </div>
            ))}
          </div>

          {/* Navigation Dots */}
          <div className="flex justify-center gap-2 mt-8">
            <button className="w-2 h-2 rounded-full bg-[#540A26]"></button>
            <button className="w-2 h-2 rounded-full bg-gray-300"></button>
            <button className="w-2 h-2 rounded-full bg-gray-300"></button>
            <button className="w-2 h-2 rounded-full bg-gray-300"></button>
            <button className="w-2 h-2 rounded-full bg-gray-300"></button>
          </div>
        </div>

        {/* FAQs */}
        <div className="mt-20">
          <h2 className="text-3xl mb-8">FAQs</h2>
          <div className="grid grid-cols-2 gap-8">
            {[...Array(6)].map((_, index) => (
              <div key={index} className="border-b pb-6">
                <div className="flex items-start gap-4">
                  <span className="w-6 h-6 bg-[#540A26] rounded-full flex items-center justify-center text-white text-sm">
                    {index + 1}
                  </span>
                  <div>
                    <h3 className="font-semibold mb-2">
                      How do I join the HH Club?
                    </h3>
                    <p className="text-gray-600 text-sm mb-2">
                      To join, complete the registration form and select three
                      members to support your registration. Once accepted,
                      you'll need to pay a non-refundable joining fee of £120 to
                      activate your membership.
                    </p>
                    <button className="text-[#540A26] text-sm">
                      Read more
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t py-6">
        <div className="max-w-6xl mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <span>Follow us</span>
            <Link to="#" className="text-gray-600">
              Facebook
            </Link>
            <Link to="#" className="text-gray-600">
              Twitter
            </Link>
            <Link to="#" className="text-gray-600">
              Instagram
            </Link>
            <Link to="#" className="text-gray-600">
              LinkedIn
            </Link>
          </div>
          <div className="flex gap-8">
            <Link to="/policies" className="text-gray-600">
              Policies
            </Link>
            <Link to="/about" className="text-gray-600">
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

export default Topics;
