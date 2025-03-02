import React, { useState, useEffect } from "react";
import StandardProfile from "./StandardProfile";
import VIPProfile from "./VIPProfile";

const AccountProfile = () => {
  const [membershipType, setMembershipType] = useState("Standard");

  useEffect(() => {
    setMembershipType("Standard");
  }, []);

  return (
    <>{membershipType === "Standard" ? <StandardProfile /> : <VIPProfile />}</>
  );
};

export default AccountProfile;
