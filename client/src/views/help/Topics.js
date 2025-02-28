import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BsBell, BsChevronLeft, BsChevronRight } from "react-icons/bs";
import { IoSearchOutline } from "react-icons/io5";
import Header from "../../components/Header";
import bg_image from "../../assets/header-bg.jpg";
import Footer from "../../components/Footer";

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
    {
      id: 3,
      icon: "h",
      title: "About Hazor Hevsuite (HH) Club",
      description:
        "What makes HH Club unique? What are the benefits of being a member? How can I contact the HH Club team",
    },
    {
      id: 4,
      icon: "h",
      title: "Joining the HH Club",
      description:
        "How do I register and join the club? What is the joining fee, and when do I pay it? Why do I need three members to support my registration?",
    },
    {
      id: 5,
      icon: "h",
      title: "About Hazor Hevsuite (HH) Club",
      description:
        "What makes HH Club unique? What are the benefits of being a member? How can I contact the HH Club team",
    },
    {
      id: 6,
      icon: "h",
      title: "Joining the HH Club",
      description:
        "How do I register and join the club? What is the joining fee, and when do I pay it? Why do I need three members to support my registration?",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="relative text-white">
        <div className="absolute inset-0 z-0">
          <img
            src={bg_image}
            alt="background"
            className="w-full h-full object-cover brightness-50"
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>
        <div className="relative z-10">
          <Header />
          <div className=" text-white text-center py-16 px-4">
            <p className="text-sm mb-2 font-secondary">FAQs</p>
            <h1 className="text-4xl font-semibold mb-4 font-secondary">
              Ask us anything
            </h1>
            <p className="mb-8 font-primary">
              Have any questions? We're here to assist you.
            </p>
            <div className="max-w-2xl mx-auto relative">
              <input
                type="text"
                placeholder="Search here"
                className="w-full px-4 py-3 rounded-lg text-black"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button className="absolute right-3 top-1/2 -translate-y-1/2 text-[#737474]">
                <IoSearchOutline size={24} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Popular Topics */}
      <div className="max-w-6xl mx-auto px-4 py-16">
        <h2 className="text-[50px] font-semibold text-gradient_r mb-12 text-center font-secondary">
          Popular Topics
        </h2>

        <div className="relative">
          <div className="grid grid-cols-3 gap-8 px-20 overflow-hidden">
            {popularTopics.map((topic) => (
              <div
                key={topic.id}
                className=" bg-white rounded-lg p-6 shadow-lg"
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
          <h2 className="text-[50px] mb-12 text-gradient_r text-center font-secondary">
            FAQs
          </h2>
          <div className="grid grid-cols-2 gap-x-16 gap-y-12">
            {[...Array(6)].map((_, index) => (
              <div key={index} className="border-b border-gray-200 pb-6">
                <div className="flex items-start gap-6">
                  <span className="w-8 h-8 bg-gradient-to-r from-[#540A26] to-[#0A5440] rounded-full flex items-center justify-center text-white text-base font-medium shrink-0">
                    {index + 1}
                  </span>
                  <div>
                    <h3 className="text-lg font-semibold mb-3">
                      How do I join the HH Club?
                    </h3>
                    <p className="text-gray-600 leading-relaxed mb-3">
                      To join, complete the registration form and select three
                      members to support your registration. Once accepted,
                      you'll need to pay a non-refundable joining fee of £120 to
                      activate your membership.
                    </p>
                    <button className="text-red-700 font-medium hover:text-red-600 transition-colors">
                      Read more
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Topics;
