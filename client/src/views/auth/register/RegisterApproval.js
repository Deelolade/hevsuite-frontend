import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  BsThreeDotsVertical,
  BsTrash3Fill,
} from "react-icons/bs";
import avatar from "../../../assets/user.avif";

import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../../features/auth/authSlice";
import { persistor } from "../../../store/store";
import constants from "../../../constants";
import { IoClose } from "react-icons/io5";
import Modal from "../../account/settings/components/Modal";
import referralService from "../../../services/referralService";
import toast from "react-hot-toast";
import AuthModal from '../../../components/AuthModal';

const RegisterApproval = ({ setApproval, referrals, onDecliningReferredBy }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { Settings } = useSelector((state) => state.generalSettings);
  const navigate = useNavigate();

  const menuRef = useRef(null);
  const [ logOutLoading, setLogOutLoading ] = useState(false);
  const [pendingDropdown, setPendingDropdown] = useState(-1);
  const [referredByUsers, setReferredByUsers] = useState(referrals);
  const [referredByToDecline, setReferredByToDecline] = useState(null);
  const [userApprovedToMakePayment, setUserApprovedToMakePayment] = useState(false);
  
  const [declineReferredByModalOpen, setDeclineReferredByModalOpen] =
    useState(false);
  const [declineReferredRequestLoading, setDeclineReferredRequestLoading] =
    useState(false);

  const handleShowDeclineReferredByRequest = (referredBy) => {
    console.log(referredBy);
    setReferredByToDecline(referredBy);
    setDeclineReferredByModalOpen(true);
    setTimeout(() => {
      setPendingDropdown(-1);
    }, 200);
  };

  const handleDeclineReferredByRequest = () => {
    if (!referredByToDecline) return;

    setDeclineReferredRequestLoading(true);

    referralService.declineReferral(referredByToDecline.userId._id)
    .then(res => {
      const filtered = referredByUsers.filter(r => r.userId._id !== referredByToDecline.userId._id);
      setReferredByUsers(filtered);
      toast.success(res.message);
      onDecliningReferredBy();
    })
    .catch(ex => toast.error(ex))
    .finally(() => {
       setDeclineReferredRequestLoading(false);
       setDeclineReferredByModalOpen(false);
    })
  };


  // Close on click outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setPendingDropdown(false);
      }
    }

    function handleEscape(event) {
      if (event.key === "Escape") {
        setPendingDropdown(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  useEffect(() => {

    if(user && referredByUsers) {
      
      const allReferredByApproved = referredByUsers.every(r => r.status.toLowerCase() === constants.referredByStatus.approved);
      if(allReferredByApproved && referredByUsers.length > 0 || user.approvedByAdmin || user.membershipStatus === constants.membershipStatus.accepted  ){
        setUserApprovedToMakePayment(true);
      }
    }

  },[referredByUsers, user])

  React.useEffect(() => {
    window.scrollTo({ top: 50, behavior: "smooth" });
  }, []);

  const handleLogout = async () => {
    
    setLogOutLoading(true);

    dispatch(logout()).then(() => {
      persistor.purge(); // safely purge after logout completes
      navigate("/");
    })
    .catch(ex => toast.error(ex))
    .finally(() => { setTimeout(() => {setLogOutLoading(false)},2000) })
  };

  const modalStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      transform: "translate(-50%, -50%)",
      maxWidth: "400px",
      width: "90%",
      padding: "24px",
      border: "none",
      borderRadius: "24px",
      backgroundColor: "white",
    },
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.75)",
    },
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Main Content */}
      <AuthModal loading open={logOutLoading} title="Logging Out" description="Sigining out your account..." />
      <div className="container mx-auto px-4 py-8 md:py-12 max-w-3xl text-center flex-grow">
        <div className="mb-8 md:mb-12">
          <div className="w-16 h-16 md:w-24 md:h-24 bg-gradient-to-r from-[#540A26] to-[#0A5440] rounded-full mx-auto mb-4 md:mb-8 flex items-center justify-center">
            <svg
              className="w-8 h-8 md:w-12 md:h-12 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <h2 className="text-xl md:text-3xl font-medium mb-2 md:mb-4 text-[#540A26]">
            Your membership application is pending for approval.
          </h2>
        </div>

        <div className="bg-white rounded-lg p-4 md:p-8 shadow-sm">
          <h3 className="text-lg md:text-2xl font-medium mb-4 md:mb-6">
            Check your referrals
          </h3>
          <div className="space-y-3 md:space-y-4">
            {referredByUsers.length > 0 &&
              referredByUsers.map((referredUser, index) => (
                <div
                  key={referredUser.id}
                  className="flex flex-wrap md:flex-nowrap items-center justify-between bg-gray-50 p-3 md:p-4 rounded-lg"
                >
                  <div className="flex items-center gap-2 md:gap-4 mb-2 md:mb-0 w-full md:w-auto">
                    <img
                      src={referredUser.userId.profilePhoto || avatar}
                      alt={`${referredUser.userId.forename} ${referredUser.userId.surname}`}
                      className="w-8 h-8 md:w-10 md:h-10 rounded-full object-cover"
                    />
                    <span className="font-medium text-sm md:text-base">
                      {`${referredUser.userId.forename} ${referredUser.userId.surname}`}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2 w-full md:w-auto justify-end">
                    {referredUser.status === constants.referredByStatus.approved ? (
                      <span className="px-3 md:px-4 py-1 md:py-2 bg-[#0A5440] text-white rounded-lg text-xs md:text-base">
                        Approved
                      </span>
                    ) : referredUser.status ===
                      constants.referredByStatus.declined ? (
                      <>
                        <span className="px-3 cursor-pointer md:px-4 py-1 md:py-2 bg-[#540A26] text-white rounded-lg text-xs md:text-base">
                          Declined
                        </span>
                      </>
                    ) : null}
                    {referredUser.status === constants.referredByStatus.pending && (
                      <>
                        <div className="flex gap-2 items-center ">
                          <span className="px-3 md:px-4 py-1 md:py-2 bg-white text-gray-500 border border-gray-200 rounded-lg text-xs md:text-base">
                            Pending
                          </span>
                          <div className="relative">
                            <button
                              onClick={() => setPendingDropdown(index)}
                              className="text-gray-400"
                            >
                              <BsThreeDotsVertical size={16} />
                            </button>
                            {pendingDropdown === index && (
                              <div
                                ref={menuRef}
                                className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 z-10"
                              >
                                <div className="py-1">
                                  <div
                                    role="button"
                                    onClick={() =>
                                      handleShowDeclineReferredByRequest(
                                        referredUser
                                      )
                                    }
                                    className="flex gap-2 items-center  justify-center py-1 px-5 group  hover:bg-[#540A26] "
                                  >
                                    <BsTrash3Fill className="text-[#540A26] group-hover:text-white" />
                                    <span className="text-[#540A26] group-hover:text-white">
                                      Decline Request{" "}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              ))}
          </div>

          <div className="mt-6 md:mt-8 flex justify-between items-center">
            <button
              className="px-4 md:px-6 py-1 md:py-2 text-[#540A26] border-2 border-[#540A26] rounded-3xl font-secondary inline-flex items-center gap-2 text-sm md:text-base  transition-colors"
              onClick={() => setApproval(false)}
            >
              <svg
                className="w-4 h-4 md:w-5 md:h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 4v16m8-8H4"
                />
              </svg>
              Add other referral
            </button>
            
            { userApprovedToMakePayment ?

            <div className=" flex gap-4 items-center" > 

              { Settings?.membershipFee ? 
                <Link
                  to="/register-7"
                  className="px-4 md:px-6 py-1 md:py-2 text-white bg-gradient-to-r from-gradient_r to-gradient_g rounded-3xl font-secondary inline-flex items-center gap-2 text-sm md:text-base hover:bg-opacity-90 transition-colors"
                >
                  Go to payment
                  <span className="ml-1">→</span>
                </Link>
              :   
                <Link
                    to="/homepage"
                    className="px-4 md:px-6 py-1 md:py-2 text-white bg-gradient-to-r from-gradient_r to-gradient_g rounded-3xl font-secondary inline-flex items-center gap-2 text-sm md:text-base hover:bg-opacity-90 transition-colors"
                  >
                  Go to Homepage
                  <span className="ml-1">→</span>
                </Link>

              }

               <button
                onClick={handleLogout}
                className="px-3 py-1.5 sm:px-4 sm:py-2 bg-primary text-white text-sm rounded-lg hover:bg-red-600 transition-colors"
              >
                Logout
              </button>

            </div>
            : 
              <button
                onClick={handleLogout}
                className="px-3 py-1.5 sm:px-4 sm:py-2 bg-primary text-white text-sm rounded-lg hover:bg-red-600 transition-colors"
              >
                Logout
              </button>
          }
          </div>
        </div>
      </div>

      {/* modal */}
      <Modal
        isOpen={declineReferredByModalOpen}
        onRequestClose={() => setDeclineReferredByModalOpen(false)}
        style={modalStyles}
        contentLabel="Cancel Referral Request"
      >
        <div className="relative">
          <button
            onClick={() => setDeclineReferredByModalOpen(false)}
            className="absolute right-0 top-0 text-gray-400 hover:text-gray-600"
          >
            <IoClose size={24} />
          </button>

          <h2 className="text-xl md:text-2xl font-semibold mb-4 md:mb-6">
            Cancel Referral Request
          </h2>

          <p className="text-gray-600 mb-4 md:mb-6 text-sm md:text-base">
            Are you sure you want to cancel referral request to this member?
          </p>

          <div className="space-y-3 md:space-y-4 mb-6 md:mb-8">
            {referredByToDecline && (
              <div className="flex gap-3 items-center">
                <div className="rounded-full w-12 h-12 overflow-hidden flex justify-center items-center">
                  <img
                    src={referredByToDecline.userId.profilePhoto}
                    className="w-10 h-10 md:w-12 md:h-12 rounded-full"
                  />
                </div>
                <div className="flex gap-2">
                  <span>{referredByToDecline.userId.surname}</span>
                  <span>{referredByToDecline.userId.forename}</span>
                </div>
              </div>
            )}
          </div>

          <div className="flex flex-col sm:flex-row justify-end gap-3 md:gap-4">
            <button
              onClick={() => setDeclineReferredByModalOpen(false)}
              className="px-4 md:px-6 py-2 border border-gray-300 rounded-lg text-gray-600 text-sm md:text-base order-2 sm:order-1"
            >
              Cancel
            </button>
            <button
              onClick={handleDeclineReferredByRequest}
              disabled={declineReferredRequestLoading}
              className="px-4 md:px-6 py-2  bg-[#540A26] disabled:bg-[#540A26]/10 text-white rounded-lg text-sm md:text-base order-1 sm:order-2 disabled:border-[#540A26]/40 transition-colors disabled:text-[#540A26]/40 disabled:hover:bg-[#540A26]/10 disabled:cursor-not-allowed"
            >
              {declineReferredRequestLoading ? "Cancelling..." : "Confirm"}
            </button>
            {/* <button
                    onClick={handleProceedToSendReferredBy}
                    className='px-4 md:px-6 py-2 bg-[#540A26] text-white rounded-lg text-sm md:text-base order-1 sm:order-2'
                  >
                    Confirm
                  </button> */}
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default RegisterApproval;
