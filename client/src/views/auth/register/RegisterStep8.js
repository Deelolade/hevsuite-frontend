import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BsCheckCircleFill } from "react-icons/bs";
import { FiDownload } from "react-icons/fi";
import Modal from "react-modal";

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
        <h1 className="text-3xl font-medium text-center mb-12">
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
                <img src="/visa.png" alt="Visa" className="h-6" />
                <img src="/mastercard.png" alt="Mastercard" className="h-6" />
                <img src="/amex.png" alt="American Express" className="h-6" />
                <img src="/discover.png" alt="Discover" className="h-6" />
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
                  className="w-full px-4 py-3 border rounded-lg appearance-none bg-white"
                  value={paymentDetails.country}
                  onChange={(e) =>
                    setPaymentDetails({
                      ...paymentDetails,
                      country: e.target.value,
                    })
                  }
                >
                  <option value="United States">United States</option>
                  {/* Add more countries */}
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
              className="w-full py-3 bg-gradient-to-r from-[#540A26] to-[#0A5440] text-white rounded-lg text-lg font-medium"
            >
              Make Payment
            </button>

            <button
              type="button"
              className="w-full py-3 border border-[#540A26] text-[#540A26] rounded-lg text-lg font-medium"
            >
              Cancel Application
            </button>
          </div>
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
      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        style={modalStyles}
        contentLabel="Payment Success Modal"
      >
        <div className="relative p-8">
          {/* Success Icon */}
          <div className="absolute -top-8 left-1/2 -translate-x-1/2">
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
              className="w-full py-3 bg-gradient-to-r from-[#540A26] to-[#0A5440] text-white rounded-lg hover:opacity-90 transition-opacity"
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
