import React from "react";
import { Link } from "react-router-dom";
import { BsCheckCircleFill } from "react-icons/bs";
import logo_white from "../../../assets/logo_white.png";

const Register = () => {
  const steps = [
    { number: "1", label: "Step 1", active: true },
    { number: "02", label: "Step2" },
    { number: "03", label: "Step 3" },
    { number: "04", label: "Step 4" },
    { number: "05", label: "Step 5" },
    { number: "06", label: "Step 6" },
    { number: "07", label: "Step 7" },
  ];

  return (
    <div className="min-h-screen">
      {/* Header with Logo */}
      <header className="bg-black py-4">
        <div className="container mx-auto px-4">
          <img src={logo_white} alt="Hevsuite Club" className="h-16" />
        </div>
      </header>

      {/* Progress Steps */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between max-w-4xl mx-auto">
          {steps.map((step, index) => (
            <div key={index} className="flex items-center">
              <div className="relative">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    step.completed
                      ? "bg-[#0A5440]"
                      : step.active
                      ? "bg-[#0A5440]"
                      : "bg-white border-2 border-gray-300"
                  }`}
                >
                  {step.completed ? (
                    <BsCheckCircleFill className="text-white" />
                  ) : (
                    <span
                      className={step.active ? "text-white" : "text-gray-500"}
                    >
                      {step.number}
                    </span>
                  )}
                </div>
                <p className="absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap text-sm">
                  {step.label}
                </p>
              </div>
              {index < steps.length - 1 && (
                <div
                  className={`w-32 h-[2px] ${
                    step.active ? "bg-[#0A5440]" : "bg-gray-300"
                  }`}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12 max-w-3xl">
        <h1 className="text-3xl font-medium text-center mb-8">
          Membership Requirements
        </h1>

        <div className="space-y-6 text-gray-600">
          <p className="text-center">
            Please note that all sections must be completed in order for this
            application to be submitted to the Committee. Any application
            missing information will be deemed incomplete and therefore not to
            be considered.
          </p>

          <p className="text-center mb-8">
            In order to apply for membership you will need to include:
          </p>

          <div className="space-y-8">
            <div>
              <h2 className="font-medium text-black mb-2">
                1. Clear Recent Picture
              </h2>
              <p>
                Please upload a recent head and shoulders picture of yourself.
                This will be used for security purposes to verify your identity
                upon your arrival to the Club. Therefore, please ensure the
                picture is representative of how you will appear when visiting
                the Club.
              </p>
            </div>

            <div>
              <h2 className="font-medium text-black mb-2">2. Proof of ID</h2>
              <p>
                (e.g. Drivers License, Passport or ID card). Applicants must be
                over 18 years of age.
              </p>
            </div>

            <div>
              <h2 className="font-medium text-black mb-2">3. Your Referrals</h2>
              <p>
                A referral who is currently a Hevsuite Club Member is mandatory
                for this application. All potential members should be aware that
                we do not accept membership applications through third parties
                (including any agencies or concierges) or social media accounts.
                The only way to apply for membership is via our website.
              </p>
            </div>

            <div>
              <h2 className="font-medium text-black mb-2">4. Payment</h2>
              <p>
                To finalise your application, we kindly ask you to fill out both
                a Direct Debit mandate and your credit/debit card details which
                will be used to take payment for joining and non-engagement (see
                our support link for more). Payment only be taken after you've
                successfully been accepted by our members.
              </p>
            </div>

            <p className="italic">
              PS - Non-engagement fee is paid ONLY for not attending any
              occasion every 28 days.
            </p>
          </div>
        </div>

        <div className="text-center mt-12">
          <Link
            to="/register-2"
            className="inline-flex items-center px-8 py-3 text-[#540A26] rounded-lg text-lg font-medium hover:opacity-90"
          >
            Continue <span className="ml-2">→</span>
          </Link>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white border-t py-6 mt-12">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <span className="text-gray-600">Follow us</span>
              <div className="flex gap-4">
                <Link to="#" className="text-gray-600 hover:text-black">
                  Facebook
                </Link>
                <Link to="#" className="text-gray-600 hover:text-black">
                  Twitter
                </Link>
                <Link to="#" className="text-gray-600 hover:text-black">
                  Instagram
                </Link>
                <Link to="#" className="text-gray-600 hover:text-black">
                  LinkedIn
                </Link>
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
        </div>
      </footer>
    </div>
  );
};

export default Register;
