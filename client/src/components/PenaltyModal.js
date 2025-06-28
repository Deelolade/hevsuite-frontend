import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout, fetchProfile } from "../features/auth/authSlice";
import {
  fetchPricingFees,
  selectPricingFees,
} from "../features/pricingFeesSlice";
import NonEngagementPaymentModal from "./NonEngagementPaymentModal";
import toast from "react-hot-toast";
import Logo from "../assets/logo_white.png";

const PenaltyModal = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const pricingFees = useSelector(selectPricingFees);

  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  React.useEffect(() => {
    if (user?.isPenalized) {
      dispatch(fetchPricingFees());
    }
  }, [dispatch, user?.isPenalized]);

  const handleLogout = async () => {
    try {
      setIsLoggingOut(true);
      await dispatch(logout()).unwrap();
      navigate("/");
    } catch (error) {
      console.error("Logout failed:", error);
      toast.error("Logout failed");
    } finally {
      setIsLoggingOut(false);
    }
  };

  const handlePaymentSuccess = () => {
    setShowPaymentModal(false);
    // Refresh user profile to update penalty status
    dispatch(fetchProfile());
  };

  const nonEngagementFee = pricingFees?.find(
    (fee) => fee.name === "Non Engagement Fee"
  );

  const feeAmount =
    user.role === "vip"
      ? nonEngagementFee?.vipPrice
      : nonEngagementFee?.standardPrice;

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
        <div className="relative z-10 w-full max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden">
          <div className="px-6 py-8">
            <div className="flex justify-center mb-6">
              <img src={Logo} alt="HevSuite Logo" className="h-12" />
            </div>

            <div className="text-center mb-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-3">
                Non-Engagement Penalty
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                Your account has been temporarily suspended due to lack of event
                attendace over a period of time.
              </p>
            </div>

            <div className="space-y-3">
              <button
                onClick={() => setShowPaymentModal(true)}
                disabled={isLoggingOut}
                className="w-full bg-[#540A26] hover:bg-[#6B0D32] text-white font-semibold py-4 px-6 rounded-xl transition-colors duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Pay Non-Engagement Fee - £{feeAmount}
              </button>

              <button
                onClick={handleLogout}
                disabled={isLoggingOut}
                className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-3 px-6 rounded-xl transition-colors duration-200 border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoggingOut ? "Logging out..." : "Logout"}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Payment Modal */}
      {showPaymentModal && (
        <NonEngagementPaymentModal
          isOpen={showPaymentModal}
          onClose={() => setShowPaymentModal(false)}
          paymentData={{
            type: "non-engagement-fee",
            amount: feeAmount,
            reason: "Non-engagement fee payment",
          }}
          onPaymentSuccess={handlePaymentSuccess}
          userId={user?.id}
        />
      )}
    </>
  );
};

export default PenaltyModal;
