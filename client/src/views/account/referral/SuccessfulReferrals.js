import React from "react";
import ReferralItem from "./ReferralItem";

const SuccessfulReferrals = ({ referrals }) => {
  return (
    <div className="space-y-2">
      {referrals.map((referral, index) => (
        <ReferralItem 
          key={index} 
          referral={referral} 
          activeTab="Successful Referrals" 
        />
      ))}
    </div>
  );
};

export default SuccessfulReferrals;