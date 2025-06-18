import React, { useState, useEffect } from "react";
import { BiSearch } from "react-icons/bi";
import {
  BsCheckCircleFill,
  BsThreeDots,
  BsThreeDotsVertical,
  BsXCircleFill,
} from "react-icons/bs";
import Modal from "react-modal";
import avatar from "../../assets/defualtuser.webp";
import idcards from "../../assets/Id.jpg";
import ExportButton from "../ExportButton";
import { useSelector, useDispatch } from "react-redux";
import { getSupportRequests, updateSupportRequest, addMessageToSupportRequest } from "../../store/support/supportSlice";
import Spinner from "../../components/Spinner";

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

  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const [selectedPreviewImage, setSelectedPreviewImage] = useState(null);
  const [isApproveModalOpen, setIsApproveModalOpen] = useState(false);
  const [isDeclineModalOpen, setIsDeclineModalOpen] = useState(false);
  const [newMessage, setNewMessage] = useState("");
  const [isSendingMessage, setIsSendingMessage] = useState(false);

  const [adminList] = useState([
    { id: 1, name: "Admin 1" },
    { id: 2, name: "Admin 2" },
    { id: 3, name: "Admin 3" },
  ]);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        console.log('Fetching assigned requests with params:', {
          page: 1,
          limit: 100,
          search: searchTerm,
          sortBy: "submissionDate",
          filter: statusFilter,
          assignedTo: "me"
        });
        
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
        
        console.log('Fetched requests result:', result);
      } catch (error) {
        console.error('Failed to fetch assigned requests:', error);
      }
    };

    fetchRequests();
  }, [dispatch, searchTerm, statusFilter]);

  const getFilteredRequests = () => {
    if (!supportRequests) return [];
    
    console.log('Current user:', user);
    console.log('All support requests:', supportRequests);
    
    return supportRequests.filter((request) => {
      console.log('Checking request:', {
        id: request._id,
        assignedTo: request.assignedTo,
        user: request.user,
        status: request.status
      });
      
      const matchesAssignedTo = request.assignedTo === user?._id;
      const matchesSearch = request.user?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           request.type?.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === "All" || request.status === statusFilter;
      
      console.log('Filter results:', {
        matchesAssignedTo,
        matchesSearch,
        matchesStatus,
        finalResult: matchesAssignedTo && matchesSearch && matchesStatus
      });
      
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
    setCurrentMessageIndex(request.messages.length - 1); //  latest message
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
        setIsApproveModalOpen(false);
        // Refresh the requests list
        dispatch(
          getSupportRequests({
            page: 1,
            limit: 100,
            search: searchTerm,
            sortBy: "submissionDate",
            filter: statusFilter,
            assignedTo: "me"
          })
        );
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
        setIsDeclineModalOpen(false);
        // Refresh the requests list
        dispatch(
          getSupportRequests({
            page: 1,
            limit: 100,
            search: searchTerm,
            sortBy: "submissionDate",
            filter: statusFilter,
            assignedTo: "me"
          })
        );
      } catch (error) {
        console.error("Failed to decline request:", error);
      }
    }
  };

  const handleSendMessage = async () => {
    if (!newMessage.trim() || !selectedRequest) return;
    
    setIsSendingMessage(true);
    // Optimistically update local message history
    const optimisticMsg = {
      text: newMessage.trim(),
      sender: "admin",
      date: new Date().toISOString(),
      _id: Math.random().toString(36).substr(2, 9), // temp id
    };
    setSelectedRequest(prev => ({
      ...prev,
      messages: [...(prev?.messages || []), optimisticMsg]
    }));
    setNewMessage("");
    try {
      await dispatch(addMessageToSupportRequest({
        requestId: selectedRequest._id,
        messageData: {
          text: optimisticMsg.text,
          sender: "admin"
        }
      })).unwrap();
      // Optionally, refresh from server here if you want to sync
      dispatch(
        getSupportRequests({
          page: 1,
          limit: 100,
          search: searchTerm,
          sortBy: "submissionDate",
          filter: statusFilter,
          assignedTo: "me"
        })
      );
    } catch (error) {
      // Remove the optimistic message if API fails
      setSelectedRequest(prev => ({
        ...prev,
        messages: prev.messages.filter(m => m._id !== optimisticMsg._id)
      }));
      console.error("Failed to send message:", error);
    } finally {
      setIsSendingMessage(false);
    }
  };

  if (isLoading) {
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
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <select
              className="px-4 py-2 border w-44 rounded-lg font-primary text-[#343434] bg-white"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
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
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-2xl w-[600px] shadow-lg focus:outline-none"
        overlayClassName="fixed inset-0 bg-black/50 z-50"
      >
        <div className="p-8">
          {/* Header */}
          <div className="flex justify-between items-start mb-8">
            <div>
              <h2 className="text-2xl font-bold mb-2">Request Details</h2>
              <div className="flex items-center gap-3">
                <img
                  src={selectedRequest?.user?.avatar || avatar}
                  alt={selectedRequest?.user?.name || 'User'}
                  className="w-10 h-10 rounded-full border"
                />
                <span className="font-semibold text-lg">{selectedRequest?.user?.name || 'Unknown User'}</span>
              </div>
            </div>
            <div className="flex flex-col items-end gap-2">
              <span className="text-gray-500 text-sm">{selectedRequest?.user?.email || 'No email provided'}</span>
              <button
                onClick={() => setOpenDetails(false)}
                className="text-gray-400 hover:text-gray-600 text-2xl"
              >
                ×
              </button>
            </div>
          </div>

          {/* Dropdown */}
          <select
            className="w-full px-4 py-2 border rounded-lg text-gray-600 mb-6 bg-gray-50 cursor-not-allowed"
            disabled
          >
            <option>{selectedRequest?.type}</option>
          </select>

          {/* Images */}
          {selectedRequest?.images && selectedRequest.images.length > 0 && (
            <div className="flex gap-4 mb-8">
              {selectedRequest.images.map((image, index) => (
                <div key={index} className="relative w-32 h-32 bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden">
                  <img
                    src={image}
                    alt={`Evidence ${index + 1}`}
                    className="w-full h-full object-cover rounded-lg brightness-50 contrast-50"
                  />
                  <button
                    className="absolute inset-0 text-white hover:bg-black/20 rounded-lg font-semibold text-lg"
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

          {/* User Message Section */}
          <div className="mb-6">
            <label className="font-bold text-base mb-2 block">Messages</label>
            <div className="max-h-48 overflow-y-auto space-y-3">
              {selectedRequest?.messages?.map((msg, idx) => (
                <div
                  key={msg._id?.$oid || idx}
                  className={`p-3 rounded-lg w-fit max-w-[80%] ${
                    msg.sender === 'admin'
                      ? 'ml-auto bg-blue-100 text-right'
                      : 'mr-auto bg-gray-100 text-left'
                  }`}
                >
                  <div className="text-sm text-gray-700">{msg.text}</div>
                  <div className="text-xs text-gray-500 mt-1">
                    {new Date(msg.date?.$date || msg.date).toLocaleString()} - {msg.sender === 'admin' ? 'Admin' : 'User'}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Response Section */}
          {selectedRequest?.status === 'Declined' ? (
            <div className="mb-8 text-center text-gray-400 font-semibold">
              Messaging is disabled for declined requests.
            </div>
          ) : (
            <div className="mb-8">
              <label className="font-bold text-base mb-2 block">Response</label>
              <textarea
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Write Your Response"
                className="w-full p-4 border rounded-lg resize-none min-h-[80px] text-gray-700"
                disabled={isSendingMessage}
              />
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex justify-end gap-4">
            <button
              onClick={() => setOpenDetails(false)}
              className="px-6 py-2 border border-gray-300 rounded-lg bg-white text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            {selectedRequest?.status !== 'Declined' && (
              <button
                onClick={handleSendMessage}
                disabled={!newMessage.trim() || isSendingMessage}
                className={`px-6 py-2 rounded-lg text-white font-semibold ${
                  !newMessage.trim() || isSendingMessage
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-[#A80036] hover:bg-[#8a0030]'
                }`}
              >
                {isSendingMessage ? 'Sending...' : 'Send'}
              </button>
            )}
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
