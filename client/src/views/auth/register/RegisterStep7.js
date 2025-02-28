import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { BsCheckCircleFill } from "react-icons/bs";
import Footer from "../../../components/Footer";
import avatar from "../../../assets/user.avif";

const RegisterStep7 = () => {
  const navigate = useNavigate();
  const referrals = [
    {
      id: 1,
      name: "Andrew Bojangles",
      avatar: avatar,
      status: "Approved",
    },
    {
      id: 2,
      name: "Andrew Bojangles",
      avatar: avatar,
      status: "Pending",
    },
    {
      id: 3,
      name: "Andrew Bojangles",
      avatar: avatar,
      status: "Pending",
    },
  ];

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
                    index < 7
                      ? "bg-[#0A5440]"
                      : "bg-white border-2 border-gray-300"
                  }`}
                >
                  {index < 6 ? (
                    <BsCheckCircleFill className="text-white" />
                  ) : (
                    <span className="text-white">7</span>
                  )}
                </div>
                <p className="absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap text-sm">
                  Step {index + 1}
                </p>
              </div>
              {index < 6 && <div className={`w-32 h-[2px] bg-[#0A5440]`} />}
            </div>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12 max-w-3xl text-center">
        <div className="mb-12">
          <div className="w-24 h-24 bg-gradient-to-r from-[#540A26] to-[#0A5440] rounded-full mx-auto mb-8 flex items-center justify-center">
            <svg
              className="w-12 h-12 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <h2 className="text-3xl font-medium mb-4">
            Your membership application is pending for approval.
          </h2>
        </div>

        <div className="bg-white rounded-lg p-8">
          <h3 className="text-2xl font-medium mb-6">Check your referrals</h3>
          <div className="space-y-4">
            {referrals.map((referral) => (
              <div
                key={referral.id}
                className="flex items-center justify-between bg-gray-50 p-4 rounded-lg"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={referral.avatar}
                    alt={referral.name}
                    className="w-10 h-10 rounded-full"
                  />
                  <span className="font-medium">{referral.name}</span>
                </div>
                <div>
                  {referral.status === "Approved" ? (
                    <span className="px-4 py-2 bg-[#0A5440] text-white rounded-lg">
                      Approved
                    </span>
                  ) : (
                    <>
                      <span className="px-4 py-2 bg-white text-quatr rounded-lg mx-4">
                        Pending
                      </span>
                      <span className="px-4 py-2 bg-[#540A26] text-white rounded-lg">
                        Decline
                      </span>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>

          <button
            className="mt-8 px-6 py-1  text-[#540A26] border-2 border-gradient_r rounded-3xl font-secondary inline-flex items-center gap-2"
            onClick={() => navigate("/register-6")}
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 4v16m8-8H4"
              />
            </svg>
            Add other referral
          </button>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default RegisterStep7;
