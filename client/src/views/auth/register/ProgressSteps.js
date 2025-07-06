import { useEffect, useState } from "react";
import { BsCheckCircleFill } from "react-icons/bs";
import { useSelector, useDispatch } from "react-redux";
import {
  selectPricingFees,
  fetchPricingFees,
} from "../../../features/pricingFeesSlice";

const ProgressSteps = ({ currentStep = 2 }) => {
  const [steps, setSteps] = useState(6);
  const { Settings } = useSelector((s) => s.generalSettings);
  const pricingFees = useSelector(selectPricingFees);
  const dispatch = useDispatch();

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

  useEffect(() => {
    dispatch(fetchPricingFees());
  }, [dispatch]);

  useEffect(() => {
    if (Settings) {
      // both are off
      if (Settings.requiredReferralNumber <= 0 && !hasMembershipFee())
        setSteps(5);
    }
  }, [Settings, pricingFees]);

  return (
    <>
      {[...Array(steps)].map((_, index) => (
        <div key={index} className="flex items-center flex-shrink-0 mb-4">
          <div className="relative">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center ${
                index < currentStep
                  ? "bg-[#0A5440]"
                  : "bg-white border-2 border-gray-300"
              }`}
            >
              {index < currentStep - 1 ? (
                <BsCheckCircleFill className="text-white" />
              ) : index === currentStep - 1 ? (
                <span className="text-white">{currentStep} </span>
              ) : (
                <span className="text-gray-500">{`0${index + 1}`}</span>
              )}
            </div>
            <p className="absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap text-xs md:text-sm">
              Step {index + 1}
            </p>
          </div>
          {index < steps - 1 && (
            <div
              className={`w-12 md:w-32 h-[2px] ${
                index < currentStep - 1 ? "bg-[#0A5440]" : "bg-gray-300"
              }`}
            />
          )}
        </div>
      ))}
    </>
  );
};

export default ProgressSteps;
