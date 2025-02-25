import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BsCheckCircleFill, BsThreeDotsVertical } from "react-icons/bs";

const RegisterStep6 = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedMembers, setSelectedMembers] = useState([]);

  const members = [
    {
      id: 1,
      name: "Andrew Bojangles",
      email: "some@gmail.com",
      type: "Member",
      avatar: "/images/avatar.jpg",
    },
    // Add more members as needed
  ];

  const handleMemberSelect = (memberId) => {
    if (selectedMembers.includes(memberId)) {
      setSelectedMembers(selectedMembers.filter((id) => id !== memberId));
    } else if (selectedMembers.length < 3) {
      setSelectedMembers([...selectedMembers, memberId]);
    }
  };

  const handleSubmit = () => {
    navigate("/register-7");
  };

  return (
    <div className="min-h-screen">
      {/* Header with Logo */}
      <header className="bg-black py-4">
        <div className="container mx-auto px-4">
          <img src="/logo.png" alt="Hevsuite Club" className="h-16" />
        </div>
      </header>

      {/* Progress Steps */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between max-w-4xl mx-auto">
          {[...Array(7)].map((_, index) => (
            <div key={index} className="flex items-center">
              <div className="relative">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    index < 6
                      ? "bg-[#0A5440]"
                      : "bg-white border-2 border-gray-300"
                  }`}
                >
                  {index < 5 ? (
                    <BsCheckCircleFill className="text-white" />
                  ) : index === 5 ? (
                    <span className="text-white">6</span>
                  ) : (
                    <span className="text-gray-500">07</span>
                  )}
                </div>
                <p className="absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap text-sm">
                  Step {index + 1}
                </p>
              </div>
              {index < 6 && (
                <div
                  className={`w-32 h-[2px] ${
                    index < 5 ? "bg-[#0A5440]" : "bg-gray-300"
                  }`}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12 max-w-3xl">
        <h1 className="text-3xl font-medium text-center mb-12 flex items-center justify-center gap-3">
          <span className="w-8 h-8 bg-[#540A26] rounded-full flex items-center justify-center text-white">
            👥
          </span>
          Select Your Referrals
        </h1>

        <div className="bg-white rounded-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="relative flex-1 max-w-md">
              <input
                type="text"
                placeholder="Search members"
                className="w-full pl-10 pr-4 py-2 border rounded-lg"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <svg
                className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            <button className="px-4 py-2 bg-[#540A26] text-white rounded-lg">
              Send Referral
            </button>
          </div>

          <div className="space-y-2">
            {members.map((member) => (
              <div
                key={member.id}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
              >
                <div className="flex items-center gap-4">
                  <input
                    type="checkbox"
                    checked={selectedMembers.includes(member.id)}
                    onChange={() => handleMemberSelect(member.id)}
                    className="w-4 h-4 rounded border-gray-300"
                  />
                  <img
                    src={member.avatar}
                    alt={member.name}
                    className="w-10 h-10 rounded-full"
                  />
                  <div>
                    <h3 className="font-medium">{member.name}</h3>
                    <p className="text-gray-500 text-sm">{member.email}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-gray-500">{member.type}</span>
                  <button className="text-gray-400">
                    <BsThreeDotsVertical />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <p className="text-gray-500 text-sm mt-4">
            Note: you can select only 3 member
          </p>
        </div>

        <div className="flex justify-between mt-8">
          <Link to="/register-5" className="text-gray-600 font-medium">
            BACK
          </Link>
          <button
            onClick={handleSubmit}
            className="px-8 py-3  text-[#540A26] rounded-lg"
          >
            Continue →
          </button>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white border-t py-6 mt-12">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
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
        </div>
      </footer>
    </div>
  );
};

export default RegisterStep6;
