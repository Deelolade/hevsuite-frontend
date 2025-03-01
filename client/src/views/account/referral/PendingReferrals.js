import React from "react";
import ReferralItem from "./ReferralItem";

const PendingReferrals = ({ referrals }) => {
  return (
    <div className="space-y-2">
      {referrals.map((referral, index) => (
        <ReferralItem 
          key={index} 
          referral={referral} 
          activeTab="Pending Referrals" 
        />
      ))}
    </div>
  );
};

export default PendingReferrals;