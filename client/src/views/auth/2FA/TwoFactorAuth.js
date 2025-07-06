import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../../assets/logo_white.png";
import image from "../../../assets/image.jpg";
import { fetchProfile } from "../../../features/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";
import constants from "../../../constants";
import { fetchGeneralSettings } from "../../../features/generalSettingSlice";
import {
  selectPricingFees,
  fetchPricingFees,
} from "../../../features/pricingFeesSlice";

const TwoFactorAuth = () => {
  const navigate = useNavigate();
  const [input, setInput] = useState("email");
  const dispatch = useDispatch();
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

  const handleMethodSelection = async () => {
    // Redirect to the appropriate verification page
    navigate(`/${input}-verification`);
  };

  useEffect(() => {
    dispatch(fetchProfile())
      .unwrap()
      .then((response) => {
        console.log("user in useEffect", response);
      });
    dispatch(fetchGeneralSettings());
    dispatch(fetchPricingFees());
  }, [dispatch]);

  const handleSkipForNow = async () => {
    // await dispatch(fetchProfile()).unwrap();
    // if (!user) {
    //   navigate('/login');
    // } else if (user.membershipStatus === 'accepted' && user.joinFeeStatus === 'paid') {
    //   navigate('/homepage');
    // } else if (user.membershipStatus === 'accepted' && user.joinFeeStatus === 'pending') {
    //   navigate('/register-6');
    // }
    // else {
    //   navigate('/register-6'); // Or your membership registration page
    // }
    console.log(user, Settings);
    await dispatch(fetchProfile()).unwrap();
    console.log("user in 2fa", user);
    if (!user) {
      navigate("/login");
    } else if (
      user.membershipStatus === constants.membershipStatus.accepted &&
      user.joinFeeStatus === constants.joinFeeStatus.paid
    ) {
      navigate("/homepage", { replace: true });
    } else if (
      user.membershipStatus === constants.membershipStatus.accepted &&
      user.joinFeeStatus === constants.joinFeeStatus.pending &&
      hasMembershipFee()
    ) {
      navigate("/register-7", { replace: true });
    } else {
      if (Settings.requiredReferralNumber <= 0 && !hasMembershipFee())
        return navigate("/homepage", { replace: true });
      else if (Settings.requiredReferralNumber <= 0 && hasMembershipFee())
        return navigate("/register-7");

      const allReferredByApproved = user.referredBy.every(
        (r) => r.status.toLowerCase() === constants.referredByStatus.approved
      );
      if (
        user.approvedByAdmin ||
        allReferredByApproved ||
        user.membershipStatus === constants.membershipStatus.accepted
      )
        return navigate("/homepage", { replace: true });

      navigate("/register-6"); // fallback
      // console.log(user.membershipStatus)
    }
  };

  return (
    <div className="min-h-screen md:grid md:grid-cols-2 relative">
      {/* Background Image - Visible on all screens */}
      <div className="absolute inset-0 md:relative md:block">
        <div className="absolute inset-0">
          <img
            src={image}
            alt="Background"
            className="w-full h-full object-cover"
          />
          {/* Dark overlay for mobile */}
          <div className="absolute inset-0 bg-black/60 md:bg-transparent"></div>
        </div>

        {/* Desktop Left Side Content */}
        <div className="hidden md:flex relative z-10 p-16 flex-col h-full">
          <div className="flex flex-col items-center text-center">
            <div className="w-32 h-32 rounded-2xl mb-4">
              <img
                src={logo}
                alt="Hevsuite Club"
                className="w-full h-full p-4"
              />
            </div>
            <h1 className="text-5xl text-white font-medium">Hevsuite Club</h1>
          </div>
          <div className="mt-auto text-center flex justify-center gap-8 p-8">
            <p className="text-white text-xl pt-4">Don't have membership?</p>
            <Link
              to="/register"
              className="p-4 px-8 bg-gradient-to-r from-[#540A26] to-[#0A5440] text-white rounded-3xl text-lg font-medium"
            >
              Become a Member
            </Link>
          </div>
        </div>
      </div>

      {/* Two-Factor Auth Form - Centered on mobile, right side on desktop */}
      <div className="flex items-center justify-center relative z-10 p-4 md:p-16">
        <div className="w-full max-w-md rounded-lg md:bg-transparent md:p-0">
          {/* Logo for mobile only */}
          <div className="flex justify-center mb-6 md:hidden">
            <div className="w-24 h-24 bg-[#540A26] rounded-2xl flex items-center justify-center">
              <Link to="/">
                <img src={logo} alt="Logo" className="w-16 h-16" />
              </Link>
            </div>
          </div>
          <div className="bg-white max-w-md p-8 rounded-xl">
            <div className="mb-6 md:mb-8 text-center">
              <h2 className="text-2xl md:text-3xl font-medium mb-2 font-primary text-[#333333]">
                Two-Factor Authentication
              </h2>
              <p className="text-gray-600 text-sm font-primary">
                Protect Your Password. How would you like to receive one-time
                password(OTP)?
              </p>
            </div>

            <div className="space-y-4">
              <label className="flex items-center space-x-3 p-4 border border-gray-200 rounded-[4px] cursor-pointer">
                <input
                  type="radio"
                  name="auth-method"
                  className="text-[#540A26]"
                  onChange={() => setInput("phone")}
                />
                <div>
                  <p className="text-sm font-primary">Phone Number</p>
                  <p className="text-xs text-gray-500 font-primary">
                    Use phone number to receive verification codes
                  </p>
                </div>
              </label>

              <label className="flex items-center space-x-3 p-4 border border-gray-200 rounded-[4px] cursor-pointer">
                <input
                  type="radio"
                  name="auth-method"
                  className="text-[#540A26]"
                  defaultChecked
                  onChange={() => setInput("email")}
                />
                <div>
                  <p className="text-sm font-primary">Email</p>
                  <p className="text-xs text-gray-500 font-primary">
                    Receive verification code via email
                  </p>
                </div>
              </label>

              <button
                onClick={handleMethodSelection}
                className="w-full py-3 bg-gradient-to-r from-[#540A26] to-[#0A5440] text-white rounded-3xl font-secondary text-lg font-medium mt-4"
              >
                Continue
              </button>
              <div
                className="w-full flex items-center justify-center hover:underline cursor-pointer text-sm"
                // onClick={() => {
                //   navigate('/homepage');
                // }}
                onClick={handleSkipForNow}
              >
                Skip for now
              </div>
            </div>
          </div>

          {/* Mobile-only bottom section */}
          <div className="md:hidden mt-8 text-center">
            <p className="text-white mb-4">Don't have an Account?</p>
            <Link
              to="/register"
              className="inline-block px-6 py-3 bg-gradient-to-r from-[#540A26] to-[#0A5440] text-white rounded-3xl text-base font-medium"
            >
              Become a member now
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TwoFactorAuth;
