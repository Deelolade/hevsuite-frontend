import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getSupportRequests } from "../features/supportRequestSlice";
import constants from "../constants";

const useUserIdentificationApproved = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((s) => s.auth);
  const { requests, isLoading, error } = useSelector((s) => s.supportRequest);
  const [userIdentificationApproved, setUserIdentificationApproved] =
    useState(false);

  // Fetch support requests when user changes
  useEffect(() => {
    if (user?.id) {
      dispatch(getSupportRequests());
    }
  }, [dispatch, user?.id]);

  // Update identification status when requests change
  useEffect(() => {
    // Handle both direct array and nested data structure
    const requestsArray = Array.isArray(requests) ? requests : requests?.data;

    if (requestsArray && Array.isArray(requestsArray)) {
      const isIdentificationApproved = requestsArray.some(
        (r) =>
          (r.type === "Document Review" || r.type === "Evidence Review") &&
          r.status === constants.supportRequestStatus.approved
      );

      console.log("Support requests:", requestsArray);
      console.log(
        "User identification approved status:",
        isIdentificationApproved
      );
      setUserIdentificationApproved(isIdentificationApproved);
    } else {
      setUserIdentificationApproved(false);
    }
  }, [requests]);

  return {
    userIdentificationApproved,
    loading: isLoading,
    error,
  };
};

export default useUserIdentificationApproved;
