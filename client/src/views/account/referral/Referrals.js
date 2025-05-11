import React, { use, useEffect, useState } from "react";
import Modal from "react-modal";
import { IoClose } from "react-icons/io5";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import avatar from "../../../assets/user.avif";
import SuccessfulReferrals from "./SuccessfulReferrals";
import PendingReferrals from "./PendingReferrals";
import CancelledReferrals from "./CancelledReferrals";
import { useSelector } from "react-redux";
import referralService from "../../../services/referralService";
import toast from "react-hot-toast";

Modal.setAppElement("#root");
const NavigationTabs = ({ activeTab, setActiveTab }) => {
  const tabs = [
    "Successful Referrals",
    "Pending Referrals",
    "Cancelled Referrals",
  ];
  return (
    <div className="flex flex-wrap gap-2 mb-4 sm:mb-6">
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => setActiveTab(tab)}
          className={`px-3 sm:px-6 py-1.5 sm:py-2 rounded-lg transition-colors text-xs sm:text-sm ${
            tab === activeTab
              ? "bg-[#540A26] text-white"
              : "bg-white text-black hover:bg-gray-100"
          }`}
        >
          {tab}
        </button>
      ))}
    </div>
  );
};

// Pagination Component
const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  return (
    <div className="flex justify-center items-center gap-2 sm:gap-4 mt-4 sm:mt-8">
      <button
        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
        className={`text-gray-400 hover:text-gray-600 p-1 sm:p-2 ${
          currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
        }`}
        disabled={currentPage === 1}
      >
        <BsChevronLeft size={16} className="sm:w-5 sm:h-5" />
      </button>
      <div className="flex gap-1.5 sm:gap-2">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full transition-colors ${
              page === currentPage
                ? "bg-[#540A26]"
                : "bg-gray-300 hover:bg-gray-400"
            }`}
          />
        ))}
      </div>
      <button
        onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
        className={`text-gray-400 hover:text-gray-600 p-1 sm:p-2 ${
          currentPage === totalPages ? "opacity-50 cursor-not-allowed" : ""
        }`}
        disabled={currentPage === totalPages}
      >
        <BsChevronRight size={16} className="sm:w-5 sm:h-5" />
      </button>
    </div>
  );
};

// Send Referral Modal Component
const SendReferralModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    relationship: "",
    email: "",
  });
  const [loading, setLoading] = useState(false);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    setLoading(true);
   try {
    const { firstName, lastName, relationship, email } = formData;

    // Basic validation
    if (!firstName || !lastName || !relationship || !email) {
      toast.error("Please fill in all the fields.");
      return;
    }
      // Email format validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    toast.error("Please enter a valid email address.");
    return;
  }

      await referralService.sendReferrals(formData);
    setFormData({ firstName: "", lastName: "", relationship: "", email: "" });
    onClose();
    toast.success("Referral sent successfully!")
   } catch (error) {
    toast.error(error.message || "Failed to send referral");
   }finally{
    setLoading(false);
   }
  }
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg p-4 sm:p-6 w-[90%] max-w-[500px] max-h-[90vh] overflow-y-auto"
      overlayClassName="fixed inset-0 bg-black bg-opacity-50"
      style={{
        overlay: { zIndex: 1000 },
        content: { zIndex: 1001 },
      }}
    >
      <div className="flex justify-between items-center mb-4 sm:mb-6">
        <h2 className="text-lg sm:text-xl font-semibold">Send Referrals</h2>
        <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
          <IoClose size={20} className="sm:w-6 sm:h-6" />
        </button>
      </div>

      <div className="space-y-3 sm:space-y-4">
        <div>
          <label className="block mb-1 sm:mb-2 text-sm sm:text-base">
            Prospect Name
          </label>
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              placeholder="First Name"
              className="w-full sm:w-1/2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg bg-gray-50 text-sm"
            />
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              placeholder="Last Name"
              className="w-full sm:w-1/2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg bg-gray-50 text-sm"
            />
          </div>
        </div>

        <div>
          <label className="block mb-1 sm:mb-2 text-sm sm:text-base">
            Relationship
          </label>
          <select
            name="relationship"
            value={formData.relationship}
            onChange={handleChange}
            required
            className="w-full px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg bg-gray-50 text-sm"
          >
            <option value="">Select Your Relationship with them</option>
            <option value="friend">Friend</option>
            <option value="family">Family</option>
            <option value="coworker">Co-Worker</option>
            <option value="acquaintance">Acquaintance</option>
            <option value="stranger">Stranger</option>
          </select>
        </div>

        <div>
          <label className="block mb-1 sm:mb-2 text-sm sm:text-base">
            Email
          </label>
           <input
            type="email"
            name="email"
            value={formData.email}
            required
            onChange={handleChange}
            placeholder="Enter prospect email"
            className="w-full px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg bg-gray-50 text-sm"
          />
        </div>
      </div>

      <div className="flex justify-end gap-2 sm:gap-4 mt-4 sm:mt-6">
        <button
          onClick={onClose}
          disabled={loading}
          className="px-4 sm:px-6 py-1.5 sm:py-2 rounded-lg border border-gray-200 hover:bg-gray-50 text-xs sm:text-sm"
        >
          Cancel
        </button>
        <button
        onClick={handleSubmit}
        className="px-4 sm:px-6 py-1.5 sm:py-2 rounded-lg bg-[#540A26] text-white hover:bg-[#4a0921] text-xs sm:text-sm">
          Send
        </button>
      </div>
    </Modal>
  );
};

// Main Referrals Component
const Referrals = () => {
  const { user, isLoading } = useSelector((state) => state.auth);
  const [activeTab, setActiveTab] = useState("Successful Referrals");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;


    // State for storing fetched referrals
   const [referralsData, setReferralsData] = useState({
    successful: [],
    pending: [],
    cancelled: []
  });
  useEffect(() => {
    if (isLoading || !user?.referrals) return;
    
    const fetchReferralDetails = async () => {
      try {
        // Filter referrals by status
        const successfulRefs = user.referrals.filter(ref => ref.status === 'approved');
        const pendingRefs = user.referrals.filter(ref => ref.status === 'pending');
        const cancelledRefs = user.referrals.filter(ref => ref.status === 'cancelled');
        
        // Extract user IDs from each referral
        const successfulIds = successfulRefs.map(ref => ref.userId);
        const pendingIds = pendingRefs.map(ref => ref.userId);
        const cancelledIds = cancelledRefs.map(ref => ref.userId);
        // Fetch user details in parallel
        const [successfulUsers, pendingUsers, cancelledUsers] = await Promise.all([
          successfulIds.length > 0 ? referralService.fetchReferralbyIds(successfulIds) : Promise.resolve([]),
          pendingIds.length > 0 ? referralService.fetchReferralbyIds(pendingIds) : Promise.resolve([]),
          cancelledIds.length > 0 ? referralService.fetchReferralbyIds(cancelledIds) : Promise.resolve([])
        ]);
        console.log('API Responses:', { successfulUsers, pendingUsers, cancelledUsers });
        // Combine referral data with user details
      // Combine referral data with user details
setReferralsData({
  successful: successfulRefs.map((ref, index) => ({
    ...ref,
    name: `${successfulUsers[index]?.name}`,
    image: successfulUsers[index]?.profilePhoto || avatar,
    date: new Date(ref.referDate || ref.createdAt).toLocaleDateString('en-US', { 
      day: 'numeric', 
      month: 'short', 
      year: 'numeric' 
    }),
    relationship: ref.relationship // Include the relationship from referral
  })),
  pending: pendingRefs.map((ref, index) => ({
    ...ref,
    name: `${pendingUsers[index]?.name}`,
    image: pendingUsers[index]?.profilePhoto || avatar,
    date: new Date(ref.referDate || ref.createdAt).toLocaleDateString('en-US', { 
      day: 'numeric', 
      month: 'short', 
      year: 'numeric' 
    }),
    relationship: ref.relationship // Include the relationship from referral
  })),
  cancelled: cancelledRefs.map((ref, index) => ({
    ...ref,
    name: `${cancelledUsers[index]?.name}`,
    image: cancelledUsers[index]?.profilePhoto || avatar,
    date: new Date(ref.referDate || ref.createdAt).toLocaleDateString('en-US', { 
      day: 'numeric', 
      month: 'short', 
      year: 'numeric' 
    }),
    relationship: ref.relationship // Include the relationship from referral
  }))
});
      } catch (error) {
        console.error('Failed to fetch referral details:', error);
        toast.error(error.message || 'Failed to fetch referral details')
        // Fallback to basic data if API fails
        setReferralsData({
          successful: user.referrals.filter(ref => ref.status === 'approved'),
          pending: user.referrals.filter(ref => ref.status === 'pending'),
          cancelled: user.referrals.filter(ref => ref.status === 'cancelled')
        });
      }
    };

    fetchReferralDetails();
  }, [user, isLoading]);


  // const successReferrals = Array(15).fill({
  //   name: "Matt Hardy",
  //   date: "2nd Dec., 2025",
  //   image: avatar,
  //   relationship: "Friend",
  // });

  // const pendingReferrals = Array(12).fill({
  //   name: "Matt Hardy",
  //   date: "2nd Dec., 2025",
  //   image: avatar,
  //   relationship: "Friend",
  // });

  // const cancelledReferrals = Array(9).fill({
  //   name: "Matt Hardy",
  //   date: "2nd Dec., 2025",
  //   image: avatar,
  //   relationship: "Friend",
  // });

  const getCurrentReferrals = () => {
    let referrals = [];
    switch (activeTab) {
      case "Successful Referrals":
        referrals = referralsData.successful;
        break;
      case "Pending Referrals":
        referrals = referralsData.pending;
        break;
      case "Cancelled Referrals":
        referrals = referralsData.cancelled;
        break;
      default:
        referrals = [];
    }
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return referrals.slice(startIndex, endIndex);
  };

  const getTotalPages = () => {
    let totalItems = 0;
    switch (activeTab) {
      case "Successful Referrals":
        totalItems = referralsData.successful.length;
        break;
      case "Pending Referrals":
        totalItems = referralsData.pending.length;
        break;
      case "Cancelled Referrals":
        totalItems = referralsData.cancelled.length;
        break;
      default:
        totalItems = 0;
    }
    return Math.ceil(totalItems / itemsPerPage);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    // Scroll to top of the referrals section
    const referralsSection = document.querySelector(".referrals-section");
    if (referralsSection) {
      window.scrollTo({
        top: referralsSection.offsetTop - 80,
        behavior: "smooth",
      });
    }
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setCurrentPage(1); // Reset to first page when changing tabs
  };

  return (
    <div className="p-4">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <NavigationTabs activeTab={activeTab} setActiveTab={handleTabChange} />
        <button
          onClick={() => setIsModalOpen(true)}
          className="px-4 sm:px-6 py-1.5 sm:py-2 rounded-lg bg-[#540A26] text-white flex items-center gap-1 sm:gap-2 text-xs sm:text-sm"
        >
          Send Referral
        </button>
      </div>

      <div className="space-y-2 referrals-section">
      {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <p>Loading referrals...</p>
          </div>
        ) : (
          <>
        <div className="flex justify-between px-2 sm:px-4 mb-2">
          <span className="text-base sm:text-lg text-black font-primary">
            Name
          </span>
          <span className="text-base sm:text-lg text-black font-primary">
            Relationship
          </span>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-2 sm:p-4">
          {activeTab === "Successful Referrals" && (
            <SuccessfulReferrals referrals={getCurrentReferrals()}  setReferralsData={setReferralsData} />
          )}
          {activeTab === "Pending Referrals" && (
            <PendingReferrals referrals={getCurrentReferrals()}   setReferralsData={setReferralsData} />
          )}
          {activeTab === "Cancelled Referrals" && (
            <CancelledReferrals referrals={getCurrentReferrals() } setReferralsData={setReferralsData}/>
          )}
        </div>
        </>
        )}
      </div>

      {getTotalPages() > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={getTotalPages()}
          onPageChange={handlePageChange}
        />
      )}

      <SendReferralModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default Referrals;
