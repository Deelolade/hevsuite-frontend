import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BsCheckCircleFill } from "react-icons/bs";
import { FiDownload } from "react-icons/fi";
import Modal from "react-modal";
import Footer from "../../../components/Footer";
import mastercard from "../../../assets/Mastercard.png";
import american from "../../../assets/AMEX.png";
import discover from "../../../assets/Discover.png";
import visa from "../../../assets/VISA.png";
import logo_white from "../../../assets/logo_white.png";
import bg_image from "../../../assets/party3.jpg";

const RegisterStep8 = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [paymentDetails, setPaymentDetails] = useState({
    cardNumber: "",
    expiry: "",
    cvc: "",
    country: "United States",
    postalCode: "",
  });

  const modalStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      transform: "translate(-50%, -50%)",
      maxWidth: "500px",
      width: "90%",
      padding: "0",
      border: "none",
      borderRadius: "24px",
      backgroundColor: "white",
    },
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.75)",
    },
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsModalOpen(true);
    // Add payment processing logic here
  };

  return (
    <div className="min-h-screen">
      <div className="relative text-white">
        <div className="absolute inset-0 z-0">
          <img
            src={bg_image}
            alt="background"
            className="w-full h-[120px] object-cover brightness-50 "
          />
          <div className="absolute inset-0 bg-black/60" />
        </div>
        <header className="relative z-10 py-4">
          <div className="container mx-auto px-4 flex justify-center">
            <img src={logo_white} alt="Hevsuite Club" className="h-16" />
          </div>
        </header>
      </div>

      {/* Progress Steps */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between max-w-4xl mx-auto">
          {[...Array(7)].map((_, index) => (
            <div key={index} className="flex items-center">
              <div className="relative">
                <div className="w-8 h-8 rounded-full flex items-center justify-center bg-[#0A5440]">
                  <BsCheckCircleFill className="text-white" />
                </div>
                <p className="absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap text-sm">
                  Step {index + 1}
                </p>
              </div>
              {index < 6 && <div className="w-32 h-[2px] bg-[#0A5440]" />}
            </div>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12 max-w-3xl">
        <h1 className="text-3xl font-medium text-center mb-12 text-primary font-secondary">
          Proceed to Payment
        </h1>

        <div className="grid grid-cols-2 gap-12">
          {/* Left Side - Fee Display */}
          <div>
            <h2 className="text-[#0A5440] font-medium text-xl mb-2">
              Membership fee
            </h2>
            <p className="text-gray-400 text-3xl">£120.00</p>
          </div>

          {/* Right Side - Payment Form */}
          <div className="space-y-6">
            <div>
              <label className="block mb-2">Card</label>
              <div className="flex gap-4">
                <div className="relative border rounded-lg flex-1">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2">
                    <svg
                      className="w-5 h-5 text-blue-500"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <rect
                        x="3"
                        y="5"
                        width="18"
                        height="14"
                        rx="2"
                        stroke="currentColor"
                        strokeWidth="2"
                      />
                      <path
                        d="M3 10H21"
                        stroke="currentColor"
                        strokeWidth="2"
                      />
                    </svg>
                  </div>
                  <input
                    type="text"
                    placeholder="Card"
                    className="w-full pl-12 pr-4 py-3 rounded-lg focus:outline-none"
                    value={paymentDetails.cardType}
                    onChange={(e) =>
                      setPaymentDetails({
                        ...paymentDetails,
                        cardType: e.target.value,
                      })
                    }
                  />
                </div>
                <button className="w-12 h-12 border rounded-lg flex  justify-center">
                  <svg
                    className="w-6 h-6 text-gray-400"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 110-2 1 1 0 010 2zm7 0a1 1 0 110-2 1 1 0 010 2zm7 0a1 1 0 110-2 1 1 0 010 2z"
                    />
                  </svg>
                </button>
              </div>
            </div>
            <div>
              <label className="block mb-2">Card number</label>
              <input
                type="text"
                placeholder="1234 1234 1234 1234"
                className="w-full px-4 py-3 border rounded-lg"
                value={paymentDetails.cardNumber}
                onChange={(e) =>
                  setPaymentDetails({
                    ...paymentDetails,
                    cardNumber: e.target.value,
                  })
                }
              />
              <div className="flex gap-2 mt-2">
                <img src={visa} alt="Visa" className="h-6" />
                <img src={mastercard} alt="Mastercard" className="h-6" />
                <img src={american} alt="American Express" className="h-6" />
                <img src={discover} alt="Discover" className="h-6" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block mb-2">Expiry</label>
                <input
                  type="text"
                  placeholder="MM/YY"
                  className="w-full px-4 py-3 border rounded-lg"
                  value={paymentDetails.expiry}
                  onChange={(e) =>
                    setPaymentDetails({
                      ...paymentDetails,
                      expiry: e.target.value,
                    })
                  }
                />
              </div>
              <div>
                <label className="block mb-2">CVC</label>
                <input
                  type="text"
                  placeholder="CVC"
                  className="w-full px-4 py-3 border rounded-lg"
                  value={paymentDetails.cvc}
                  onChange={(e) =>
                    setPaymentDetails({
                      ...paymentDetails,
                      cvc: e.target.value,
                    })
                  }
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block mb-2">Country</label>
                <select
                  className="w-full px-4 py-3 border rounded-lg bg-white"
                  value={paymentDetails.country}
                  onChange={(e) =>
                    setPaymentDetails({
                      ...paymentDetails,
                      country: e.target.value,
                    })
                  }
                >
                  <option value="United States">United States</option>
                  <option value="Canada">Canada</option>
                  <option value="Canada">Canada</option>
                  <option value="Canada">Canada</option>
                  <option value="Canada">Canada</option>
                </select>
              </div>
              <div>
                <label className="block mb-2">Postal code</label>
                <input
                  type="text"
                  placeholder="90210"
                  className="w-full px-4 py-3 border rounded-lg"
                  value={paymentDetails.postalCode}
                  onChange={(e) =>
                    setPaymentDetails({
                      ...paymentDetails,
                      postalCode: e.target.value,
                    })
                  }
                />
              </div>
            </div>

            <button
              onClick={handleSubmit}
              className="w-full py-3 bg-gradient-to-r from-[#540A26] to-[#0A5440] text-white rounded-3xl text-lg font-medium"
            >
              Make Payment
            </button>

            <button
              type="button"
              className="w-full py-3 border border-[#540A26] text-[#540A26] rounded-3xl text-lg font-medium"
            >
              Cancel Application
            </button>
          </div>
        </div>
      </div>

      <Footer />

      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        style={modalStyles}
        contentLabel="Payment Success Modal"
      >
        <div className="relative p-8">
          {/* Success Icon */}
          <div className=" flex justify-center">
            <div className="w-16 h-16 rounded-full bg-black flex items-center justify-center">
              <BsCheckCircleFill className="w-8 h-8 text-[#540A26]" />
            </div>
          </div>

          {/* Modal Content */}
          <div className="text-center mt-6">
            <h2 className="text-2xl font-semibold mb-2">Payment Success!</h2>
            <p className="text-gray-600 mb-8">
              Your payment has been successfully done.
            </p>

            <div className="mb-8">
              <h3 className="text-gray-500 mb-2">Total Payment</h3>
              <p className="text-4xl text-gray-600">£120.00</p>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-gray-500 text-sm mb-1">Ref Number</p>
                <p className="font-medium">00008575257</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-gray-500 text-sm mb-1">Payment Time</p>
                <p className="font-medium">25 Feb 2023, 13:22</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-gray-500 text-sm mb-1">Payment Method</p>
                <p className="font-medium">Card</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-gray-500 text-sm mb-1">Sender Name</p>
                <p className="font-medium">Antonio Roberto</p>
              </div>
            </div>

            <button
              className="flex items-center justify-center gap-2 text-gray-600 mx-auto mb-6 hover:text-gray-800"
              onClick={() => {
                /* Add PDF download logic */
              }}
            >
              <FiDownload className="w-5 h-5" />
              Get PDF Receipt
            </button>

            <button
              onClick={() => navigate("/homepage")}
              className="w-full py-1   text-[#540A26] border-2 border-gradient_r rounded-3xl"
            >
              Back to Home
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default RegisterStep8;
