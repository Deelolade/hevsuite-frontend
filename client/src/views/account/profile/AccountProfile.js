import React, { useState, useEffect } from "react";
import StandardProfile from "./StandardProfile";
import VIPProfile from "./VIPProfile";
import { useSelector } from "react-redux";

const AccountProfile = () => {
    const { user, isLoading } = useSelector((state) => state.auth);
  const [membershipType, setMembershipType] = useState("Standard Member");

  useEffect(() => {
    if (user?.role === "member" && user?.roleName) {
      setMembershipType(user.roleName);
    }
  }, [user]);
  return (
    <>{membershipType === "Standard Member" ? <StandardProfile /> : <VIPProfile />}</>
  );
};

export default AccountProfile;
