import React from "react";
import ReferralItem from "./ReferralItem";

const CancelledReferrals = ({ referrals }) => {
  return (
    <div className="space-y-2">
      {referrals.map((referral, index) => (
        <ReferralItem 
          key={index} 
          referral={referral} 
          activeTab="Cancelled Referrals" 
        />
      ))}
    </div>
  );
};

export default CancelledReferrals;