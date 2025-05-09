import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BiSearch } from "react-icons/bi";
import {
  BsCheckCircleFill,
  BsThreeDots,
  BsXCircleFill,
} from "react-icons/bs";
import Modal from "react-modal";
import avatar from "../../assets/user.avif";
import idcards from "../../assets/Id.jpg";
import ExportButton from "../ExportButton";
import { 
  getEvidenceRequests, 
  updateEvidenceStatus,
  assignRequestToAdmin as assignRequest
} from "../../store/evidence/evidenceSlice";
import { getAdminUsers } from "../../store/users/userSlice";
import evidenceService from "../../store/evidence/evidenceService";
import Spinner from "../../components/Spinner";
import { toast } from "react-toastify";
import axios from 'axios';
import { base_url } from '../../constants/axiosConfig';

const Evidence = () => {
  const dispatch = useDispatch();
  const { evidenceRequests, isLoading, isError, message } = useSelector(
    (state) => state.evidence
  );
  const { adminUsers = [], isLoading: isLoadingAdmins } = useSelector(
    (state) => state.adminUsers
  );
  const { user } = useSelector((state) => state.auth);
  const { admin } = useSelector((state) => state.adminProfile);
  const [currentUser, setCurrentUser] = useState(null);

  // Fetch current user profile
  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        // Get token from localStorage
        const adminData = localStorage.getItem("admin");
        if (!adminData) {
          console.log("No admin data found in localStorage");
          return;
        }

        const { token } = JSON.parse(adminData);
        if (!token) {
          console.log("No token found in admin data");
          return;
        }

        // Fetch user profile using the token
        const response = await axios.get(`${base_url}/user/profile`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        console.log("Fetched user profile:", response.data);

        // Extract the user data from the response
        if (response.data && response.data.user) {
          console.log("User data from profile:", response.data.user);
          setCurrentUser(response.data.user);
        } else {
          console.error("User data not found in profile response");
        }
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };

    // Only fetch if we don't have the user in Redux store
    if (!user || !user._id) {
      fetchCurrentUser();
    }
  }, [user]);

  // Get user ID from localStorage if not available in Redux store
  const getUserId = () => {
    // First try to get from currentUser state
    if (currentUser && currentUser._id) {
      console.log("Using user ID from currentUser state:", currentUser._id);
      return currentUser._id;
    }

    // Then try to get from Redux store
    if (user && user._id) {
      console.log("Using user ID from Redux store:", user._id);
      return user._id;
    }

    // If still not available, try to get from localStorage
    const adminData = localStorage.getItem("admin");
    if (adminData) {
      try {
        const admin = JSON.parse(adminData);
        console.log("Admin data from localStorage:", admin);

        // Try to extract user ID from token if available
        if (admin.token) {
          try {
            // JWT tokens are base64 encoded and have 3 parts separated by dots
            const tokenParts = admin.token.split('.');
            if (tokenParts.length === 3) {
              // Decode the payload (second part)
              const payload = JSON.parse(atob(tokenParts[1]));
              console.log("Token payload:", payload);
              if (payload.userId) {
                console.log("Using user ID from token:", payload.userId);
                return payload.userId;
              }
            }
          } catch (tokenError) {
            console.error("Error parsing token:", tokenError);
          }
        }
      } catch (error) {
        console.error("Error parsing admin data from localStorage:", error);
      }
    }

    console.log("No user ID found from any source");
    return null;
  };

  useEffect(() => {
    console.log("Admin users from state:", adminUsers); // Add this for debugging
    if (isError) {
      toast.error(message);
    }
    dispatch(getEvidenceRequests());
    dispatch(getAdminUsers());
  }, [dispatch, isError, message]);

  const [activeTab, setActiveTab] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [openOptionsId, setOpenOptionsId] = useState(null);
  const [openDetails, setOpenDetails] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [showApproveModal, setShowApproveModal] = useState(false);
  const [showDeclineModal, setShowDeclineModal] = useState(false);
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const [selectedPreviewImage, setSelectedPreviewImage] = useState(null);

  const handleDetail = (request) => {
    setSelectedRequest(request);
    setOpenDetails(true);
    setOpenOptionsId(null);
  };

  const handleAssign = (request) => {
    setSelectedRequest(request);
    setShowAssignModal(true);
    setOpenOptionsId(null);
  };

  const handleAssignToAdmin = async (requestId, adminId = null) => {
    try {
      await dispatch(assignRequest({ requestId, adminId: adminId || admin._id })).unwrap();
      toast.success("Request assigned successfully");
      setShowAssignModal(false);
    } catch (error) {
      toast.error(error.message || "Failed to assign request");
    }
  };

  const handleStatusUpdate = async (id, status) => {
    try {
      await dispatch(updateEvidenceStatus({ id, status })).unwrap();
      toast.success(`Request ${status.toLowerCase()} successfully`);
      if (status === "Approved") {
        setShowApproveModal(false);
      } else if (status === "Declined") {
        setShowDeclineModal(false);
      }
    } catch (error) {
      toast.error(error.message || "Failed to update status");
    }
  };

  const isAssignedToCurrentUser = (request) => {
    return request.assignedTo?._id === admin?._id;
  };

  // Filter requests based on active tab and search term
  const getFilteredRequests = () => {
    let filtered = [...evidenceRequests];

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter((request) =>
        request.user?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        request.user?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        request.type?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by status if not "all"
    if (statusFilter !== "all") {
      filtered = filtered.filter((request) => request.status === statusFilter);
    }

    // Filter by tab
    if (activeTab === "assigned") {
      filtered = filtered.filter((request) => isAssignedToCurrentUser(request));
    } else if (activeTab === "other") {
      filtered = filtered.filter((request) => !isAssignedToCurrentUser(request));
    }

    return filtered;
  };

  const filteredRequests = getFilteredRequests();

  const formattedRequests = filteredRequests.map((request) => ({
    ID: request._id,
    Name: `${request.user?.name || ''} ${request.user?.surname || ''}`.trim() || 'Unknown User',
    Email: request.user?.primaryEmail || 'No Email',
    Type: request.type,
    SubmissionDate: new Date(request.submissionDate).toLocaleDateString(),
    Status: request.status,
    Messages: request.messages
      ?.map((msg) => `${new Date(msg.date).toLocaleDateString()}: ${msg.text}`)
      .join(" | ") || "",
  }));

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div>
      <div>
        <div className="md:flex justify-between grid grid-cols-2 items-center mb-4">
          <h2 className="text-xl font-primary text-[1A1A1A]">Evidence Requests</h2>
          <div className="flex flex-col md:flex-row items-center gap-4">
            <div className="relative">
              <BiSearch className="absolute hidden md:flex left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search by name or type"
                className="md:pl-10 pl-1 md:pr-4 py-2 border md:w-96 rounded-lg"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <select
              className="px-4 py-2 border w-44 rounded-lg font-primary text-[#343434] bg-white"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="all">All Statuses</option>
              <option value="Pending">Pending</option>
              <option value="Approved">Approved</option>
              <option value="Declined">Declined</option>
            </select>
            <ExportButton
              data={formattedRequests}
              fileName="evidence_requests"
            />
          </div>
        </div>

        {/* Tabs */}
        <div className="flex flex-row md:ml-0 -ml-2 gap-4">
          <button
            className={`px-6 py-3 rounded-lg flex-1 ${activeTab === "all"
              ? "bg-primary text-white"
              : "bg-white border text-gray-700"
              }`}
            onClick={() => setActiveTab("all")}
          >
            All Requests
          </button>
          <button
            className={`px-6 py-3 rounded-lg flex-1 ${activeTab === "assigned"
              ? "bg-primary text-white"
              : "bg-white border text-gray-700"
              }`}
            onClick={() => setActiveTab("assigned")}
          >
            Your Assigned Requests
          </button>
          <button
            className={`px-6 py-3 rounded-lg flex-1 ${activeTab === "other"
              ? "bg-primary text-white"
              : "bg-white border text-gray-700"
              }`}
            onClick={() => setActiveTab("other")}
          >
            Other Requests
          </button>
        </div>

        {/* Requests Table */}
        <div className="md:w-full w-[90vw] overflow-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b text-quatr font-semibold">
                <th className="text-left py-4">No</th>
                <th className="text-center py-4">User</th>
                <th className="text-left py-4">Type</th>
                <th className="text-left py-4">Submitted on</th>
                <th className="text-left py-4">Status</th>
                <th className="text-left py-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredRequests.map((request, index) => (
                <tr key={request._id} className="border-b text-quatr">
                  <td className="py-4">{index + 1}</td>
                  <td className="py-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={request.user?.avatar || avatar}
                        alt={request.user?.name || 'User'}
                        className="w-8 h-8 rounded-full"
                      />
                      <span className="font-primary w-32 md:w-fit text-[#323C47]">
                        {request.user?.name || 'Unknown User'}
                      </span>
                    </div>
                  </td>
                  <td className="py-4">
                    <p className="py-4 w-32 md:w-fit">{request.type}</p>
                  </td>
                  <td className="py-4">
                    <p className="py-4 w-32 md:w-fit">
                      {new Date(request.submissionDate).toLocaleDateString()}
                    </p>
                  </td>
                  <td className="py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-sm ${request.status === "Declined"
                        ? "text-red-500"
                        : request.status === "Approved"
                          ? "text-green-500"
                          : "text-yellow-500"
                      }`}
                    >
                      {request.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      {request.status === "Pending" && (
                        <>
                          <button
                            className="p-1 text-green-600 hover:text-green-700"
                              onClick={() => {
                                setSelectedRequest(request);
                              setShowApproveModal(true);
                              }}
                          >
                            <BsCheckCircleFill size={24} />
                          </button>
                          <button
                            className="p-1 text-red-600 hover:text-red-700"
                              onClick={() => {
                                setSelectedRequest(request);
                              setShowDeclineModal(true);
                              }}
                          >
                            <BsXCircleFill size={24} />
                          </button>
                        </>
                      )}
                      <button
                        className="p-1 text-gray-400 hover:text-gray-500"
                        onClick={() => {
                          setOpenOptionsId(
                            openOptionsId === request._id ? null : request._id
                          );
                        }}
                      >
                        <BsThreeDots size={20} />
                      </button>

                      {openOptionsId === request._id && (
                        <div className="absolute right-6 mt-2 w-32 bg-white rounded-lg shadow-lg border py-1 z-10">
                          <button
                            className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50"
                            onClick={() => handleDetail(request)}
                          >
                            Detail
                          </button>
                          <button
                            className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50"
                            onClick={() => handleAssign(request)}
                          >
                            Assign Admin
                          </button>
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
          </div>

      {/* Detail Modal */}
      <Modal
        isOpen={openDetails}
        onRequestClose={() => setOpenDetails(false)}
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg md:w-[450px] w-[96vw]"
        overlayClassName="fixed inset-0 bg-black/50"
      >
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-primary font-semibold">
              Request Details
            </h2>
            <button
              onClick={() => setOpenDetails(false)}
              className="text-gray-400 hover:text-gray-600"
            >
              ✕
            </button>
          </div>

          <div className="space-y-6">
            {/* User Info */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img
                  src={selectedRequest?.user?.avatar || avatar}
                  alt={selectedRequest?.user?.name || 'User'}
                  className="w-10 h-10 rounded-full"
                />
                <span className="font-medium text-[#323C47]">
                  {selectedRequest?.user?.name || 'Unknown User'}
                </span>
              </div>
              <span className="text-gray-600">
                {selectedRequest?.user?.primaryEmail || 'No Email'}
              </span>
            </div>

            {/* Request Type */}
            <div>
              <select
                className="w-full px-4 py-2 border rounded-lg text-gray-600"
                disabled
              >
                <option>{selectedRequest?.type}</option>
              </select>
            </div>

            {/* Preview Images */}
            <div className="flex gap-4">
              {selectedRequest?.images?.map((image, index) => (
                <div
                  key={index}
                  className="relative w-32 h-32 bg-gray-100 rounded-lg flex items-center justify-center"
                >
                  <img
                    src={image}
                    alt={`Evidence ${index + 1}`}
                  className="w-full h-full object-cover rounded-lg brightness-50 contrast-50"
                />
                <button
                  className="absolute inset-0 text-white hover:bg-black/20 rounded-lg"
                  onClick={() => {
                    setShowPreviewModal(true);
                      setSelectedPreviewImage(image);
                  }}
                >
                  Preview
                </button>
              </div>
              ))}
            </div>

            {showPreviewModal && (
              <div
                className="fixed top-0 left-0 w-full h-screen bg-black/50 flex items-center justify-center z-50"
                onClick={() => setShowPreviewModal(false)}
              >
                <img
                  src={selectedPreviewImage}
                  alt="Preview"
                  className="max-w-[80%] max-h-[80%] object-contain"
                  onClick={(e) => e.stopPropagation()}
                />
              </div>
            )}

            {/* Request Message */}
            <div className="p-4 border rounded-lg">
              <p className="text-gray-600">
                {selectedRequest?.messages?.[0]?.text || "No message provided"}
              </p>
            </div>
          </div>
        </div>
      </Modal>

      {/* Approve Modal */}
      <Modal
        isOpen={showApproveModal}
        onRequestClose={() => setShowApproveModal(false)}
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg md:w-[400px] w-[96vw]"
        overlayClassName="fixed inset-0 bg-black/50"
      >
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">Approve Request</h2>
            <button
              onClick={() => setShowApproveModal(false)}
              className="text-gray-400 hover:text-gray-600 text-2xl"
            >
              ×
            </button>
          </div>

          {selectedRequest && (
            <div className="mb-6">
              <div className="flex items-center gap-3 mb-4">
                <img
                  src={selectedRequest?.user?.avatar || avatar}
                  alt={selectedRequest?.user?.name || 'User'}
                  className="w-12 h-12 rounded-full"
                />
                <div>
                  <h3 className="font-medium">{selectedRequest?.user?.name || 'Unknown User'}</h3>
                  <p className="text-sm text-gray-500">
                    {selectedRequest?.user?.primaryEmail || 'No Email'}
                  </p>
                </div>
              </div>
              <p className="text-gray-600">
                Are you sure you want to approve this request?
              </p>
            </div>
          )}

          <div className="flex justify-end gap-3">
            <button
              onClick={() => setShowApproveModal(false)}
              className="px-4 py-2 border rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              onClick={() => handleStatusUpdate(selectedRequest._id, "Approved")}
              className="px-4 py-2 rounded-lg text-white bg-green-600 hover:bg-green-700"
            >
              Approve
            </button>
          </div>
        </div>
      </Modal>

      {/* Decline Modal */}
      <Modal
        isOpen={showDeclineModal}
        onRequestClose={() => setShowDeclineModal(false)}
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg md:w-[400px] w-[96vw]"
        overlayClassName="fixed inset-0 bg-black/50"
      >
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">Decline Request</h2>
            <button
              onClick={() => setShowDeclineModal(false)}
              className="text-gray-400 hover:text-gray-600 text-2xl"
            >
              ×
            </button>
          </div>

          {selectedRequest && (
            <div className="mb-6">
              <div className="flex items-center gap-3 mb-4">
                <img
                  src={selectedRequest?.user?.avatar || avatar}
                  alt={selectedRequest?.user?.name || 'User'}
                  className="w-12 h-12 rounded-full"
                />
                <div>
                  <h3 className="font-medium">{selectedRequest?.user?.name || 'Unknown User'}</h3>
                  <p className="text-sm text-gray-500">
                    {selectedRequest?.user?.primaryEmail || 'No Email'}
                  </p>
                </div>
              </div>
              <p className="text-gray-600">
                Are you sure you want to decline this request?
              </p>
            </div>
          )}

          <div className="flex justify-end gap-3">
            <button
              onClick={() => setShowDeclineModal(false)}
              className="px-4 py-2 border rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              onClick={() => handleStatusUpdate(selectedRequest._id, "Declined")}
              className="px-4 py-2 rounded-lg text-white bg-red-600 hover:bg-red-700"
            >
              Decline
            </button>
          </div>
        </div>
      </Modal>

      {/* Assign Admin Modal */}
      <Modal
        isOpen={showAssignModal}
        onRequestClose={() => setShowAssignModal(false)}
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg md:w-[400px] w-[96vw]"
        overlayClassName="fixed inset-0 bg-black/50"
      >
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">Assign Admin</h2>
            <button
              onClick={() => setShowAssignModal(false)}
              className="text-gray-400 hover:text-gray-600 text-2xl"
            >
              ×
            </button>
          </div>

          {selectedRequest && (
            <div className="mb-6">
              <div className="flex items-center gap-3 mb-4">
                <img
                  src={selectedRequest?.user?.profilePhoto || avatar}
                  alt={selectedRequest?.user?.name || 'User'}
                  className="w-12 h-12 rounded-full"
                />
                <div>
                  <h3 className="font-medium">{selectedRequest?.user?.name || 'Unknown User'}</h3>
                  <p className="text-sm text-gray-500">
                    {selectedRequest?.user?.primaryEmail || 'No Email'}
                  </p>
                </div>
              </div>
              <p className="text-gray-600 mb-4">
                Select an admin to assign this request to:
              </p>

              <div className="space-y-2 max-h-60 overflow-y-auto">
                <button
                  onClick={() => handleAssignToAdmin(selectedRequest._id)}
                  className="w-full px-4 py-2 text-left border rounded-lg hover:bg-gray-50 flex items-center gap-3"
                >
                  <img
                    src={user?.profilePhoto || avatar}
                    alt={user?.name || 'Current User'}
                    className="w-8 h-8 rounded-full"
                  />
                  <span>Assign to myself</span>
                </button>

                {isLoadingAdmins ? (
                  <div className="text-center py-4">
                    <Spinner />
                  </div>
                ) : adminUsers && adminUsers.length > 0 ? (
                  adminUsers.map((admin) => (
                    <button
                      key={admin._id}
                      onClick={() => handleAssignToAdmin(selectedRequest._id, admin._id)}
                      className="w-full px-4 py-2 text-left border rounded-lg hover:bg-gray-50 flex items-center gap-3"
                    >
                      <img
                        src={admin.profilePhoto || avatar}
                        alt={admin.name}
                        className="w-8 h-8 rounded-full"
                      />
                      <div className="flex flex-col">
                        <span>{admin.name}</span>
                        <span className="text-sm text-gray-500">{admin.primaryEmail}</span>
                      </div>
                    </button>
                  ))
                ) : (
                  <div className="text-center py-4 text-gray-500">
                    No other admins available
                  </div>
                )}

                <button
                  onClick={() => handleAssignToAdmin(selectedRequest._id, null)}
                  className="w-full px-4 py-2 text-left border rounded-lg hover:bg-gray-50 text-red-600"
                >
                  Unassign (make available to all admins)
                </button>
              </div>
            </div>
          )}

          <div className="flex justify-end">
            <button
              onClick={() => setShowAssignModal(false)}
              className="px-4 py-2 border rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>
          </div>
    </div>
      </Modal>
    </div >
  );
};

export default Evidence;
