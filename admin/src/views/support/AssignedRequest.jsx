import React, { useState, useEffect, useCallback } from "react";
import { BiSearch } from "react-icons/bi";
import {
  BsCheckCircleFill,
  BsThreeDots,
  BsThreeDotsVertical,
  BsXCircleFill,
} from "react-icons/bs";
import Modal from "react-modal";
import avatar from "../../assets/user.avif";
import idcards from "../../assets/Id.jpg";
import ExportButton from "../ExportButton";
import { useSelector, useDispatch } from "react-redux";
import { getSupportRequests, updateSupportRequest } from "../../store/support/supportSlice";
import Spinner from "../../components/Spinner";
import debounce from 'lodash/debounce';

const AssignedRequest = () => {
  const dispatch = useDispatch();
  const { supportRequests, isLoading } = useSelector((state) => state.support);
  const { user } = useSelector((state) => state.auth);
  const [statusFilter, setStatusFilter] = useState("Pending");
  const [openOptionsId, setOpenOptionsId] = useState(null);
  const [openDetails, setOpenDetails] = useState(false);
  const [pendingDetails, setPendingDetails] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const [cache, setCache] = useState({
    supportRequests: null,
    lastFetchTime: null
  });

  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const [selectedPreviewImage, setSelectedPreviewImage] = useState(null);
  const [isApproveModalOpen, setIsApproveModalOpen] = useState(false);
  const [isDeclineModalOpen, setIsDeclineModalOpen] = useState(false);

  // Debounced search function
  const debouncedSearch = useCallback(
    debounce((term) => {
      setSearchTerm(term);
    }, 500),
    []
  );

  // Debounced status filter function
  const debouncedStatusFilter = useCallback(
    debounce((status) => {
      setStatusFilter(status);
    }, 300),
    []
  );

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        // Check if we have cached data and it's less than 30 seconds old
        const now = Date.now();
        const cacheAge = cache.lastFetchTime ? now - cache.lastFetchTime : Infinity;
        
        if (cache.supportRequests && cacheAge < 30000) {
          // Use cached data if it's less than 30 seconds old
          return;
        }

        const result = await dispatch(
          getSupportRequests({
            page: 1,
            limit: 100,
            search: searchTerm,
            sortBy: "submissionDate",
            filter: statusFilter,
            assignedTo: "me"
          })
        ).unwrap();
        
        // Update cache with new data
        setCache({
          supportRequests: result,
          lastFetchTime: now
        });
        
        setIsInitialLoad(false);
      } catch (error) {
        console.error('Failed to fetch assigned requests:', error);
      }
    };

    fetchRequests();
  }, [dispatch, searchTerm, statusFilter, isInitialLoad]);

  const getFilteredRequests = () => {
    if (!supportRequests) return [];
    
    return supportRequests.filter((request) => {
      const matchesAssignedTo = request.assignedTo === user?._id;
      const matchesSearch = request.user?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           request.type?.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === "All" || request.status === statusFilter;
      
      return matchesAssignedTo && matchesSearch && matchesStatus;
    });
  };

  const filteredRequests = getFilteredRequests();

  const formattedRequests = filteredRequests.map((request) => ({
    ID: request._id,
    Name: request.user?.name || 'Unknown User',
    Email: request.user?.email || 'No Email',
    Type: request.type,
    SubmissionDate: new Date(request.submissionDate).toLocaleDateString(),
    Status: request.status,
    Messages: request.messages
      ?.map((msg) => `${new Date(msg.date).toLocaleDateString()}: ${msg.text}`)
      .join(" | ") || "",
  }));

  const handlePreviousMessage = () => {
    if (currentMessageIndex > 0) {
      setCurrentMessageIndex(currentMessageIndex - 1);
    }
  };

  const handleNextMessage = () => {
    if (
      selectedRequest &&
      currentMessageIndex < selectedRequest.messages.length - 1
    ) {
      setCurrentMessageIndex(currentMessageIndex + 1);
    }
  };

  const handleDetail = (request) => {
    if (request?.status === "Pending") {
      setPendingDetails(true);
    } else {
      setOpenDetails(true);
    }
    setSelectedRequest(request);
    setCurrentMessageIndex(request.messages.length - 1);
    setOpenOptionsId(null);
  };

  const handleAssign = (request) => {
    setSelectedRequest(request);
    setIsAssignModalOpen(true);
    setOpenOptionsId(null);
  };

  const handleApprove = async () => {
    if (selectedRequest) {
      try {
        await dispatch(updateSupportRequest({
          ...selectedRequest,
          status: "Approved"
        })).unwrap();
        
        // Update local cache instead of making a new API call
        const updatedRequests = supportRequests.map(request => 
          request._id === selectedRequest._id 
            ? { ...request, status: "Approved" }
            : request
        );
        
        setCache(prev => ({
          ...prev,
          supportRequests: updatedRequests
        }));
        
        setIsApproveModalOpen(false);
      } catch (error) {
        console.error("Failed to approve request:", error);
      }
    }
  };

  const handleDecline = async () => {
    if (selectedRequest) {
      try {
        await dispatch(updateSupportRequest({
          ...selectedRequest,
          status: "Declined"
        })).unwrap();
        
        // Update local cache instead of making a new API call
        const updatedRequests = supportRequests.map(request => 
          request._id === selectedRequest._id 
            ? { ...request, status: "Declined" }
            : request
        );
        
        setCache(prev => ({
          ...prev,
          supportRequests: updatedRequests
        }));
        
        setIsDeclineModalOpen(false);
      } catch (error) {
        console.error("Failed to decline request:", error);
      }
    }
  };

  if (isLoading && isInitialLoad) {
    return <Spinner />;
  }

  return (
    <div>
      <div>
        <div className="md:flex justify-between grid grid-cols-2 items-center mb-4">
          <h2 className="text-xl font-primary text-[1A1A1A]">Your Assigned Requests</h2>
          <div className="flex flex-col md:flex-row items-center gap-4">
            <div className="relative">
              <BiSearch className="absolute hidden md:flex left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search"
                className="md:pl-10 pl-1 md:pr-4 py-2 border md:w-96 rounded-lg"
                onChange={(e) => debouncedSearch(e.target.value)}
              />
            </div>
            <select
              className="px-4 py-2 border w-44 rounded-lg font-primary text-[#343434] bg-white"
              value={statusFilter}
              onChange={(e) => debouncedStatusFilter(e.target.value)}
            >
              <option value="all">All</option>
              <option value="Pending">Pending</option>
              <option value="Approved">Approved</option>
              <option value="Declined">Declined</option>
            </select>
            <ExportButton
              data={formattedRequests}
              fileName="assigned_requests"
            />
          </div>
        </div>

        {/* Requests Table */}
        <div className="md:w-full w-[90vw] overflow-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-4">No</th>
                <th className="text-left py-4">User</th>
                <th className="text-left py-4">Type</th>
                <th className="text-left py-4">Submission Date</th>
                <th className="text-left py-4">Status</th>
                <th className="text-left py-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredRequests.length === 0 ? (
                <tr>
                  <td colSpan="6" className="text-center py-8 text-gray-500">
                    No assigned requests found
                  </td>
                </tr>
              ) : (
                filteredRequests.map((request) => (
                  <tr key={request._id} className="border-b">
                    <td className="py-4">{request._id}</td>
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
                        className={`px-3 py-1 bg-gray-100 rounded-full text-sm ${
                          request?.status === "Declined" ? "text-red-500" : ""
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
                                setIsApproveModalOpen(true);
                              }}
                            >
                              <BsCheckCircleFill size={24} />
                            </button>
                            <button
                              className="p-1 text-red-600 hover:text-red-700"
                              onClick={() => {
                                setSelectedRequest(request);
                                setIsDeclineModalOpen(true);
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
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Detail Modal */}
      <Modal
        isOpen={openDetails}
        onRequestClose={() => setOpenDetails(false)}
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg w-[600px]"
        overlayClassName="fixed inset-0 bg-black/50"
      >
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl">Request Details</h2>
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
                <span className="font-medium">
                  {selectedRequest?.user?.name || 'Unknown User'}
                </span>
              </div>
              <span className="text-gray-600">
                {selectedRequest?.user?.email || 'No email provided'}
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
            {selectedRequest?.images && selectedRequest.images.length > 0 && (
              <div className="flex gap-4">
                {selectedRequest.images.map((image, index) => (
                  <div key={index} className="relative w-32 h-32 bg-gray-100 rounded-lg flex items-center justify-center">
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
            )}

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
                {selectedRequest?.messages?.[currentMessageIndex]?.text || 'No message available'}
              </p>
              <p className="text-sm text-gray-400 mt-2">
                {selectedRequest?.messages?.[currentMessageIndex]?.date ? 
                  new Date(selectedRequest.messages[currentMessageIndex].date).toLocaleDateString() : 
                  'No date available'}
              </p>
            </div>
          </div>
        </div>
      </Modal>

      {/* Approve Modal */}
      <Modal
        isOpen={isApproveModalOpen}
        onRequestClose={() => setIsApproveModalOpen(false)}
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg w-[400px]"
        overlayClassName="fixed inset-0 bg-black/50"
      >
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">Accept Request</h2>
            <button
              onClick={() => setIsApproveModalOpen(false)}
              className="text-gray-400 hover:text-gray-600 text-2xl"
            >
              ×
            </button>
          </div>

          {selectedRequest && (
            <div className="mb-6">
              <div className="flex items-center gap-3 mb-4">
                <img
                  src={selectedRequest.user?.avatar || avatar}
                  alt=""
                  className="w-12 h-12 rounded-full"
                />
                <div>
                  <h3 className="font-medium">{selectedRequest.user?.name || 'Unknown User'}</h3>
                  <p className="text-sm text-gray-500">{selectedRequest.user?.email || 'No email provided'}</p>
                </div>
              </div>
              <p className="text-gray-600">
                Are you sure you want to accept this request?
              </p>
            </div>
          )}

          <div className="flex justify-end gap-3">
            <button
              onClick={() => setIsApproveModalOpen(false)}
              className="px-4 py-2 border rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              onClick={handleApprove}
              className="px-4 py-2 rounded-lg text-white bg-green-600 hover:bg-green-700"
            >
              Accept
            </button>
          </div>
        </div>
      </Modal>

      {/* Decline Modal */}
      <Modal
        isOpen={isDeclineModalOpen}
        onRequestClose={() => setIsDeclineModalOpen(false)}
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg w-[400px]"
        overlayClassName="fixed inset-0 bg-black/50"
      >
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">Reject Request</h2>
            <button
              onClick={() => setIsDeclineModalOpen(false)}
              className="text-gray-400 hover:text-gray-600 text-2xl"
            >
              ×
            </button>
          </div>

          {selectedRequest && (
            <div className="mb-6">
              <div className="flex items-center gap-3 mb-4">
                <img
                  src={selectedRequest.user?.avatar || avatar}
                  alt=""
                  className="w-12 h-12 rounded-full"
                />
                <div>
                  <h3 className="font-medium">{selectedRequest.user?.name || 'Unknown User'}</h3>
                  <p className="text-sm text-gray-500">{selectedRequest.user?.email || 'No email provided'}</p>
                </div>
              </div>
              <p className="text-gray-600">
                Are you sure you want to reject this request?
              </p>
            </div>
          )}

          <div className="flex justify-end gap-3">
            <button
              onClick={() => setIsDeclineModalOpen(false)}
              className="px-4 py-2 border rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              onClick={handleDecline}
              className="px-4 py-2 rounded-lg text-white bg-red-600 hover:bg-red-700"
            >
              Reject
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default AssignedRequest; 
