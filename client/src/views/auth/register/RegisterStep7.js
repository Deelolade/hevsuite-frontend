import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BsCheck, BsCheckCircleFill } from "react-icons/bs";
import { FiDownload } from "react-icons/fi";
import Modal from "react-modal";
import Footer from "../../../components/Footer";
import mastercard from "../../../assets/Mastercard.png";
import american from "../../../assets/AMEX.png";
import discover from "../../../assets/Discover.png";
import visa from "../../../assets/VISA.png";
import logo_white from "../../../assets/logo_white.png";
import bg_image from "../../../assets/party3.jpg";
import { persistor } from "../../../store/store";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../../features/auth/authSlice";
import toast from "react-hot-toast";
import constants from "../../../constants";
import AuthModal from "../../../components/AuthModal";

import { GetCountries } from "react-country-state-city";
import StripePaymentRegisterForm from "./stripePaymentRegisterForm";
import PaypalPaymentRegisterForm from "./paypalPaymentRegisterForm";
import {
  fetchPricingFees,
  selectPricingFees,
  selectPricingFeesLoading,
} from "../../../features/pricingFeesSlice";

const RegisterStep7 = () => {
  const dispatch = useDispatch();
  React.useEffect(() => {
    window.scrollTo({ top: 50, behavior: "smooth" });
  }, []);
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [countries, setCountries] = useState([]);

  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
  const [logOutLoading, setLogOutLoading] = useState(false);
  const [paymentDetails, setPaymentDetails] = useState({
    cardNumber: "",
    expiry: "",
    cvc: "",
    country: "United Kingdom",
    postalCode: "",
  });
  const { user } = useSelector((state) => state.auth);
  const { Settings } = useSelector((state) => state.generalSettings);

  const pricingFees = useSelector(selectPricingFees);

  // Helper function to check if membership fee exists in pricing fees
  const hasMembershipFee = () => {
    if (!pricingFees || pricingFees.length === 0) return false;
    const membershipFee = pricingFees.find(
      (fee) => fee.name === "Membership Fee"
    );
    return (
      membershipFee &&
      membershipFee.isEnabled &&
      (membershipFee.standardPrice > 0 || membershipFee.vipPrice > 0)
    );
  };

  const getMembershipFeeAmount = () => {
    const membershipFee = pricingFees?.find(
      (fee) => fee.name === "Membership Fee"
    );
    if (membershipFee) {
      return user?.role === "vip"
        ? membershipFee.vipPrice
        : membershipFee.standardPrice;
    }
  };

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
      height: "min-content",
      border: "none",
      borderRadius: "24px",
      backgroundColor: "white",
    },
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.75)",
    },
  };

  const cancelModalStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      transform: "translate(-50%, -50%)",
      maxWidth: "400px",
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
  const [isPopoverVisible, setPopoverVisible] = useState(false);
  const [mode, setMode] = useState("Card");
  // Toggle the visibility of the popover
  const togglePopover = () => {
    setPopoverVisible(!isPopoverVisible);
  };

  function handleMode(val) {
    setPopoverVisible(false);
    setMode(val);
  }
  const handleLogout = async () => {
    setLogOutLoading(true);

    try {
      await dispatch(logout()).unwrap(); // unwrap to catch error
      await persistor.purge(); // clear redux-persist storage
      navigate("/");
      setLogOutLoading(false);
    } catch (error) {
      toast.error("Logout failed. Please try again.");
      console.error("Logout failed:", error);
    }
  };

  useEffect(() => {
    GetCountries().then((res) => {
      const _countries = res.map((c) => c.name);
      setCountries(_countries);
    });
  }, []);

  useEffect(() => {
    if (Settings && user) {
      if (user.membershipStatus === constants.membershipStatus.declined) {
        navigate("/application-declined", { replace: true });
        return;
      }

      if (
        user.membershipStatus === constants.membershipStatus.accepted &&
        user.joinFeeStatus === constants.joinFeeStatus.paid
      ) {
        navigate("/homepage", { replace: true });
        return;
      }

      if (user.requiredReferrals > 0) {
        // const allReferredByDeclined = user.referredBy.every(r => r.status.toLowerCase() === constants.referredByStatus.declined);
        // if(allReferredByDeclined && user.referredBy.length > 0 && user.requiredReferrals > 0) {
        const allReferredByApproved = user.referredBy.every(
          (r) => r.status.toLowerCase() === constants.referredByStatus.approved
        );
        if (
          user.membershipStatus === constants.membershipStatus.accepted ||
          user.approvedByAdmin ||
          allReferredByApproved
        ) {
          //if membeshipFee is off
          if (!hasMembershipFee()) {
            navigate("/homepage", { replace: true });
            return;
          }

          // stay here to proceed with payment
          return;
        }

        navigate("/register-6", { replace: true });
        return;
      }
    }
  }, [user, Settings]);

  useEffect(() => {
    dispatch(fetchPricingFees());
  }, [dispatch]);
  return (
    <div className="min-h-screen">
      <AuthModal
        loading
        open={logOutLoading}
        title="Logging Out"
        description="Sigining out your account..."
      />
      <div className="relative text-white">
        <div className="absolute inset-0 z-0">
          <img
            src={bg_image}
            alt="background"
            className="w-full h-[120px] object-cover brightness-50 "
          />
        </div>
        <header className="relative z-10 py-4">
          <div className="container mx-auto px-4 flex justify-center">
            <Link to="/">
              <img src={logo_white} alt="Hevsuite Club" className="h-16" />
            </Link>
          </div>
        </header>
      </div>

      {/* Progress Steps */}
      <div className="container mx-auto px-4 py-6 mt-8">
        <div className="flex flex-wrap justify-center gap-4 pb-6 md:pb-0">
          {[...Array(7)].map((_, index) => (
            <div key={index} className="flex items-center flex-shrink-0 mb-4">
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
                  ) : index === 6 ? (
                    <span className="text-white">7</span>
                  ) : (
                    <span className="text-gray-500">{`0${index + 1}`}</span>
                  )}
                </div>
                <p className="absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap text-xs md:text-sm">
                  Step {index + 1}
                </p>
              </div>
              {index < 6 && (
                <div
                  className={`w-12 md:w-32 h-[2px] ${
                    index < 6 ? "bg-[#0A5440]" : "bg-gray-300"
                  }`}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12 max-w-3xl">
        <h1 className="text-3xl font-medium text-center mb-12 text-primary font-secondary">
          Proceed to Payment
        </h1>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Left Side - Fee Display */}
          <div className="md:order-1">
            <h2 className="text-[#0A5440] font-medium text-xl mb-2">
              Membership fee
            </h2>
            <p className="text-gray-400 text-3xl">
              {new Intl.NumberFormat("en-GB", {
                style: "currency",
                currency: "GBP",
              }).format(getMembershipFeeAmount())}
            </p>
          </div>

          {/* Right Side - Payment Form */}
          <div className="md:order-2 space-y-6">
            <div>
              <label className="block mb-2 font-medium text-xl text-[#0A5440]">
                {mode === "Card" ? "Stripe" : mode}
              </label>
              <div className="flex gap-4">
                {(() => {
                  if (mode === "Card") {
                    return (
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
                      </div>
                    );
                  } else if (mode === "PayPal") {
                    return (
                      <div className="underline mr-8 font-bold text-sm justify-center flex items-center text-primary">
                        Proceed to PayPal For Payment
                      </div>
                    );
                  } else {
                    return (
                      <div className="underline cursor-pointer mr-8 text-sm font-bold justify-center flex items-center text-primary">
                        Proceed to Google Pay For Payment
                      </div>
                    );
                  }
                })()}
                <div className="inline-block relative">
                  <button
                    className="w-12 h-12 border rounded-lg flex items-center justify-center"
                    onClick={togglePopover}
                  >
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
                  {isPopoverVisible && (
                    <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg border p-3 z-[2222]">
                      <div
                        className="cursor-pointer p-2 flex items-center gap-2 hover:bg-gray-100 rounded-lg"
                        onClick={() => handleMode("Card")}
                      >
                        Stripe{" "}
                        {mode === "Card" && (
                          <BsCheck className="text-green-400" />
                        )}
                      </div>
                      <div
                        className="cursor-pointer p-2 flex items-center gap-2 hover:bg-gray-100 rounded-lg"
                        onClick={() => handleMode("PayPal")}
                      >
                        PayPal{" "}
                        {mode === "PayPal" && (
                          <BsCheck className="text-green-400" />
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
            {mode === "Card" && <StripePaymentRegisterForm />}
            {mode === "PayPal" && <PaypalPaymentRegisterForm />}
            <button
              type="button"
              onClick={() => setIsCancelModalOpen(true)}
              className="w-full py-3 border border-[#540A26] text-[#540A26] rounded-3xl text-base font-medium"
            >
              Cancel Application
            </button>
            {user && user.joinFeeStatus === "pending" && (
              <button
                onClick={handleLogout}
                className="w-full py-3 border border-[#540A26] text-[#540A26] rounded-3xl text-base font-medium"
              >
                Logout
              </button>
            )}
          </div>
        </div>
      </div>

      <Footer />

      <Modal
        isOpen={isCancelModalOpen}
        onRequestClose={() => setIsCancelModalOpen(false)}
        style={cancelModalStyles}
        contentLabel="Cancel Application Confirmation Modal"
      >
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <span className="text-red-500">⚠</span>
              Cancel Application
            </h2>
            <button
              onClick={() => setIsCancelModalOpen(false)}
              className="text-gray-400 hover:text-gray-600"
            >
              ✕
            </button>
          </div>
          <div className="space-y-6">
            <p className="text-gray-600">
              Are you sure you want to cancel your application? This action
              cannot be undone.
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setIsCancelModalOpen(false)}
                className="px-6 py-2 border rounded-lg text-sm"
              >
                No, Keep Application
              </button>
              <button
                onClick={() => {
                  setIsCancelModalOpen(false);
                  navigate("/");
                }}
                className="px-6 py-2 bg-[#540A26] text-white rounded-lg text-sm"
              >
                Yes, Cancel
              </button>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default RegisterStep7;
