import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import constants from "../constants";
import { useNavigate } from "react-router-dom";
import {
  selectPricingFees,
  fetchPricingFees,
} from "../features/pricingFeesSlice";

const useUserMembership = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((s) => s.auth);
  const { Settings } = useSelector((s) => s.generalSettings);
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

  useEffect(() => {
    dispatch(fetchPricingFees());
  }, [dispatch]);

  useEffect(() => {
    if (user && Settings) {
      if (user.membershipStatus === constants.membershipStatus.declined) {
        navigate("/application-declined", { replace: true });
        return;
      }

      if (
        user.membershipStatus === constants.membershipStatus.accepted &&
        user.joinFeeStatus === constants.joinFeeStatus.paid
      )
        return;

      if (
        user.membershipStatus === constants.membershipStatus.accepted &&
        user.joinFeeStatus === constants.joinFeeStatus.pending &&
        hasMembershipFee()
      ) {
        navigate("/register-7");
        return;
      }

      const allReferredByApproved = user.referredBy.every(
        (r) => r.status.toLowerCase() === constants.referredByStatus.approved
      );
      if (
        user.approvedByAdmin ||
        (allReferredByApproved && user.referredBy.length > 0) ||
        user.membershipStatus === constants.membershipStatus.accepted
      )
        return;

      if (user.requiredReferrals > 0) {
        if (user.membershipStatus !== constants.membershipStatus.accepted) {
          navigate("/register-6");
          return;
        }

        if (hasMembershipFee()) {
          navigate("/register-7");
          return;
        }
      }
    }
  }, [user, Settings, pricingFees]);
};

export default useUserMembership;
