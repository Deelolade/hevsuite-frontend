import React, { useEffect, useState } from "react";
import AccountProfile from "../views/account/profile/AccountProfile";
import YourEvents from "../views/account/events/YourEvents";
import SupportRequest from "../views/account/support/SupportRequest";
import YourAsks from "../views/account/asks/YourAsks";
import Activities from "../views/account/activity/Activities";
import Settings from "../views/account/settings/Settings";
import Notification from "../views/account/notifications/Notification";
import Referrals from "../views/account/referral/Referrals";
import { useNavigate } from "react-router-dom";
import { logout } from "../features/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { persistor } from '../store/store';
import toast from "react-hot-toast";
const ProfileModal = ({ onClose, forNotification }) => {
  const { user } = useSelector((state) => state.auth);
    const [accessDenied, setAccessDenied] = useState(false);
    const [requiredPayment, setRequiredPayment] = useState(false);
      const navigate = useNavigate();
   const dispatch = useDispatch();

    // Check access rights when component mounts or user changes
  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }

    if (user.membershipStatus !== "accepted") {
      setAccessDenied(true);

    }
    if (user.membershipStatus !== "accepted"&& !user.approvedByAdmin) {
     setRequiredPayment(true);

    }
  }, [user, navigate]);
  // const tabs = [
  //   "Account Profile",
  //   "Your Events",
  //   "Referrals",
  //   "Support Join Request",
  //   "Your Asks",
  //   "Notifications",
  //   "Activity Log",
  //   "Settings",
  // ];
  const tabs = [
  "Account Profile",
  ...(user?.approvedByAdmin ? ["Your Events"] : []),
  "Referrals",
  ...(user?.approvedByAdmin ? ["Support Join Request"] : []),
  ...(user?.approvedByAdmin ? ["Your Asks"] : []),
  "Notifications",
  "Activity Log",
  "Settings"
];

  const [activeTab, setActiveTab] = useState(
    forNotification && forNotification.current ? tabs[5] : tabs[0]
  );


const handleLogout = async () => {
  try {
    await dispatch(logout()).unwrap(); // unwrap to catch error
    await persistor.purge();           // clear redux-persist storage
    navigate('/');
    window.location.reload();
  } catch (error) {
    toast.error("Logout failed. Please try again.");
    console.error('Logout failed:', error);
  }
};

  const containerRef = React.useRef(null);
  let isDragging = false;
  let startX;
  let scrollLeft;

  // Handle mouse down event to start dragging
  const handleMouseDown = (e) => {
    isDragging = true;
    startX = e.clientX;
    scrollLeft = containerRef.current.scrollLeft;
  };

  // Handle mouse move event while dragging
  const handleMouseMove = (e) => {
    if (!isDragging) return;
    const x = e.clientX;
    const walk = (x - startX) * 2; // Control the speed of scroll
    containerRef.current.scrollLeft = scrollLeft - walk;
  };

  // Handle mouse up event to stop dragging
  const handleMouseUp = () => {
    isDragging = false;
  };
  if (accessDenied) {
    return (
      <div className="relative bg-transparent rounded-3xl overflow-hidden">
        <div className="p-4 md:p-6 border-b border-transparent relative">
          <div className="absolute top-4 right-4">
            <button
              onClick={onClose}
              className="text-4xl sm:text-2xl font-light text-white hover:text-gray-500 transition-colors"
            >
              ×
            </button>
          </div>
        </div>
        
        <div className="p-4 md:p-6 space-y-4 text-black bg-white rounded-t-3xl overflow-y-auto h-[650px] md:h-[520px] flex flex-col items-center justify-center">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-red-600 mb-4">Access Restricted</h3>
            <p className="text-gray-700 mb-6">
              {user?.membershipStatus === "pending"
                ? "Your membership is still pending approval. Please complete your registration."
                : "You don't have permission to access this content."}
            </p>
            {user?.membershipStatus !== "accepted" && (
              <button
                onClick={() => navigate("/register-6")}
                className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
              >
                Complete Registration
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }
  if (requiredPayment) {
    return (
      <div className="relative bg-transparent rounded-3xl overflow-hidden">
        <div className="p-4 md:p-6 border-b border-transparent relative">
          <div className="absolute top-4 right-4">
            <button
              onClick={onClose}
              className="text-4xl sm:text-2xl font-light text-white hover:text-gray-500 transition-colors"
            >
              ×
            </button>
          </div>
        </div>
        
        <div className="p-4 md:p-6 space-y-4 text-black bg-white rounded-t-3xl overflow-y-auto h-[650px] md:h-[520px] flex flex-col items-center justify-center">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-red-600 mb-4">Access Restricted</h3>
            <p className="text-gray-700 mb-6">
              {user?.membershipStatus === "accepted"&& !user.approvedByAdmin
                ? "Your membership is still pending approval. Please complete your registration."
                : "You don't have permission to access this content."}
            </p>
            {(user?.membershipStatus === "accepted"&& !user.approvedByAdmin) && (
              <button
                onClick={() => navigate("/register-7")}
                className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
              >
                Complete Payment
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="relative bg-transparent rounded-3xl overflow-hidden">
      <div className="p-4 md:p-6 border-b border-transparent relative">
        <div className="absolute top-4 right-4 flex items-center gap-2">
          <button
            onClick={handleLogout}
            className="px-3 py-1.5 sm:px-4 sm:py-2 bg-primary text-white text-sm rounded-lg hover:bg-red-600 transition-colors"
          >
            Logout
          </button>
          <button
            onClick={onClose}
            className="text-4xl sm:text-2xl font-light text-white hover:text-gray-500 transition-colors"
          >
            ×
          </button>
        </div>

        {/* Tabs - Scrollable on Mobile with hidden scrollbar */}
        <div
          ref={containerRef}
          className="w-full sm:w-auto overflow-x-auto pb-2 sm:pb-0 pt-12 no-scrollbar cursor-grab"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        >
          <div className="flex gap-2 min-w-max">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-2  py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm rounded-lg whitespace-nowrap  w-auto sm:w-[165px] transition-colors border border-transparent ${
                  activeTab === tab
                    ? "bg-[#540A26] text-white"
                    : "hover:bg-gray-100 text-gray-700 bg-white"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="p-4 md:p-6 space-y-4 text-black bg-white rounded-t-3xl overflow-y-auto no-scrollbar h-[650px] md:h-[520px]">
        <style jsx global>{`
          /* Hide scrollbar for Chrome, Safari and Opera */
          .no-scrollbar::-webkit-scrollbar {
            display: none;
          }

          /* Hide scrollbar for IE, Edge and Firefox */
          .no-scrollbar {
            -ms-overflow-style: none; /* IE and Edge */
            scrollbar-width: none; /* Firefox */
          }

          /* Hide scrollbar on mobile devices */
          @media (max-width: 768px) {
            .no-scrollbar::-webkit-scrollbar {
              display: none;
            }
            .no-scrollbar {
              -ms-overflow-style: none; /* IE and Edge */
              scrollbar-width: none; /* Firefox */
            }
          }
        `}</style>

        {activeTab === "Account Profile" && <AccountProfile />}
        {activeTab === "Your Events" && <YourEvents />}
        {activeTab === "Referrals" && <Referrals />}
        {activeTab === "Support Join Request" && <SupportRequest />}
        {activeTab === "Your Asks" && <YourAsks />}
        {activeTab === "Notifications" && <Notification />}
        {activeTab === "Activity Log" && <Activities />}
        {activeTab === "Settings" && <Settings />}
      </div>
    </div>
  );
};

export default ProfileModal;
