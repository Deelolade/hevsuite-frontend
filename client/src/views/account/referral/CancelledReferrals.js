import React from "react";
import ReferralItem from "./ReferralItem";

const CancelledReferrals = ({ referrals ,setReferralsData}) => {
  return (
    <div className="space-y-2 sm:space-y-3 md:space-y-4 px-1 sm:px-2">
      {referrals.length > 0 ? (
        referrals.map((referral, index) => (
          <ReferralItem
            key={index}
            referral={referral}
            activeTab="Cancelled Referrals"
             setReferralsData={setReferralsData}
          />
        ))
      ) : (
        <div className="py-6 text-center text-gray-500 text-sm sm:text-base">
          No cancelled referrals found
        </div>
      )}
    </div>
  );
};

export default CancelledReferrals;
