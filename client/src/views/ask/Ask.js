import React, { useEffect, useState, useRef } from "react";
import Modal from "react-modal";
import { IoChatboxEllipsesOutline, IoClose } from "react-icons/io5";
import Header from "../../components/Header";
import bg_image from "../../assets/party3.jpg";
import Footer from "../../components/Footer";
import { BiErrorCircle, BiMinus } from "react-icons/bi";
import { AiOutlineSend } from "react-icons/ai";
import avatar from "../../assets/user.avif";
import { useDispatch, useSelector } from "react-redux";
import {
  createAsk,
  claimAsk,
  abandonAsk,
  reportAsk,
  chat,
  setCurrentAsk,
  reset,
  fetchUserAsks,
} from "../../features/askSlice";
import { formatDateWithSuffix } from "../../utils/formatDate";
import { FaSpinner } from "react-icons/fa";
import toast from "react-hot-toast";
import useUserMembership from "../../hooks/useUserMembership";
import useUserIdentificationApproved from "../../hooks/useIdentificationApproved";
import AuthModal from "../../components/AuthModal";
import { fetchProfile } from "../../features/auth/authSlice";
import EmojiPicker from "emoji-picker-react";
import { BsEmojiSmile } from "react-icons/bs";
import { useSocket } from "../../store/socket-context";

const Ask = () => {
  // Helper function to construct profile photo URL
  const getProfilePhotoUrl = (profilePhoto) => {
    if (!profilePhoto) return avatar;
    if (profilePhoto.startsWith("http")) return profilePhoto;
    return `${process.env.REACT_APP_API_BASE_URL}/${profilePhoto}`;
  };

  // Auto-scroll to bottom (only when user sends message)
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isChatModalOpen, setIsChatModalOpen] = useState(false);
  const [minimized, setMinimized] = useState(false);
  const [showAbandonModal, setShowAbandonModal] = useState(false);
  const [showReportModal, setShowReportModal] = useState(false);
  const [reportType, setReportType] = useState("");
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [messages, setMessages] = useState({});
  const [newMessage, setNewMessage] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const messagesEndRef = useRef(null);
  const { user: currentUser } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const { socket, isConnected, joinAskRoom, leaveAskRoom, sendMessage } =
    useSocket();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    deadline: "",
    agreeToGuidelines: false,
  });

  // Removed auto-scroll functionality as requested

  // READ RECEIPT SYSTEM IMPLEMENTATION
  // This system tracks when messages are read using:
  // 1. Reply-based logic: messages are marked as read when recipient replies
  // 2. Visual indicators (red dot for unread, checkmarks for sent/read)
  // 3. Real-time updates when new messages arrive
  // 4. Messages are NOT marked as read by default - only when recipient replies

  // Mark message as read locally (no longer used with reply-based system)
  const markMessageAsRead = (messageId, senderId) => {
    console.log("📖 Message marked as read via reply:", messageId);
  };

  const { asks, currentAsk, chatLoading } = useSelector((state) => state.ask);

  const [showDocumentReviewModal, setShowDocumentReviewModal] = useState(false);

  const { userIdentificationApproved } = useUserIdentificationApproved();

  useUserMembership();

  const isUserVerifiedAndApproved =
    currentUser && currentUser?.isEmailVerified && userIdentificationApproved;

  // Fetch asks on component mount
  useEffect(() => {
    dispatch(fetchUserAsks());
    dispatch(fetchProfile());
    return () => {
      dispatch(reset());
    };
  }, [dispatch]);

  // Helper function to check if a message is read based on recipient replies
  const isMessageReadByReply = (messageIndex, allMessages, currentUserId) => {
    const message = allMessages[messageIndex];
    if (!message || message.senderId === currentUserId) {
      return true; // Own messages are always "read"
    }

    // Check if there's a reply from the recipient after this message
    for (let i = messageIndex + 1; i < allMessages.length; i++) {
      const laterMessage = allMessages[i];
      if (laterMessage.senderId === currentUserId) {
        return true; // Recipient replied, so message is read
      }
    }
    return false; // No reply from recipient, message is unread
  };

  // Transform Redux ask data to message format
  useEffect(() => {
    if (selectedRequest) {
      const askFromRedux =
        asks.find((a) => a._id === selectedRequest._id) || currentAsk;
      if (askFromRedux?.chat) {
        const transformedMessages = askFromRedux.chat.map((msg, index) => {
          // msg.sender is just an ID, get user info from available data
          const senderId = msg.sender;
          const isCurrentUser = currentUser && senderId === currentUser._id;

          // Get sender info from available data
          let senderInfo = {};
          if (isCurrentUser) {
            senderInfo = currentUser;
          } else {
            // If sender is the ask creator, use createdBy data
            if (senderId === selectedRequest.createdBy?._id) {
              senderInfo = selectedRequest.createdBy;
            } else if (senderId === selectedRequest.claimedBy?._id) {
              senderInfo = selectedRequest.claimedBy;
            }
          }

          return {
            text: msg.message,
            time: new Date(msg.sentAt).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            }),
            isUser: isCurrentUser,
            senderProfilePhoto: getProfilePhotoUrl(senderInfo.profilePhoto),
            senderName: `${senderInfo.forename || senderInfo.name || "User"} ${
              senderInfo.surname || ""
            }`.trim(),
            senderId: senderId,
            messageId: msg._id,
            sentAt: msg.sentAt,
            isRead: isCurrentUser, // Will be updated below
          };
        });

        // Update read status based on replies
        const messagesWithReadStatus = transformedMessages.map(
          (msg, index) => ({
            ...msg,
            isRead: isMessageReadByReply(
              index,
              transformedMessages,
              currentUser._id
            ),
          })
        );

        setMessages((prev) => ({
          ...prev,
          [selectedRequest.id]: messagesWithReadStatus,
        }));
      }
    }
  }, [selectedRequest, asks, currentAsk, currentUser]);

  const handleSendMessage = async () => {
    if (!newMessage.trim() || !selectedRequest || !currentUser) return;

    const messageText = newMessage.trim();
    const tempMessageId = `temp-${Date.now()}-${Math.random()}`;

    // Clear input immediately for better UX
    setNewMessage("");

    // Create optimistic message with unique ID
    const optimisticMessage = {
      text: messageText,
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      isUser: true,
      isOptimistic: true,
      tempId: tempMessageId,
      senderProfilePhoto: getProfilePhotoUrl(currentUser.profilePhoto),
      senderName: `${currentUser.forename || currentUser.name || "You"} ${
        currentUser.surname || ""
      }`.trim(),
      senderId: currentUser._id || currentUser.id,
      sentAt: new Date().toISOString(),
      isRead: false, // Will be updated when confirmed
    };

    // Add optimistic message immediately
    setMessages((prev) => ({
      ...prev,
      [selectedRequest.id]: [
        ...(prev[selectedRequest.id] || []),
        optimisticMessage,
      ],
    }));

    // Scroll to bottom when user sends a message
    setTimeout(() => scrollToBottom(), 100);

    // Send message via socket immediately (no retry delay for UX)
    try {
      if (socket && socket.connected) {
        sendMessage(selectedRequest._id, messageText);
      } else {
        console.warn(
          "⚠️ Socket not connected, message will be sent when reconnected"
        );
        // Store message to send when reconnected
        setTimeout(() => {
          if (socket && socket.connected) {
            sendMessage(selectedRequest._id, messageText);
          }
        }, 1000);
      }
    } catch (error) {
      console.error("Failed to send message:", error);
      // Remove optimistic message on error
      setMessages((prev) => ({
        ...prev,
        [selectedRequest.id]:
          prev[selectedRequest.id]?.filter(
            (msg) => msg.tempId !== tempMessageId
          ) || [],
      }));
    }
  };
  const modalStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      transform: "translate(-50%, -50%)",
      maxWidth: "600px",
      width: "90%",
      padding: "32px",
      border: "none",
      borderRadius: "24px",
      backgroundColor: "white",
      zIndex: 10000,
    },
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.75)",
      zIndex: 10000,
    },
  };

  const chatModalStyles = {
    content: {
      top: "auto",
      left: "auto",
      right: "16px",
      bottom: "16px",
      width: "90%",
      maxWidth: "400px",
      padding: "0",
      border: "none",
      borderRadius: "24px",
      backgroundColor: "white",
      boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
    },
    overlay: {
      backgroundColor: "transparent",
    },
  };

  const abandonModalStyles = {
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

  const reportModalStyles = {
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

  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  // create ask handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Prevent multiple submissions
    if (isSubmitting) return;
    try {
      await dispatch(createAsk(formData)).unwrap();
      setIsModalOpen(false);
      setFormData({
        title: "",
        description: "",
        deadline: "",
        agreeToGuidelines: false,
      });
    } catch (error) {
      console.error("Failed to create ask:", error);
      toast.error(error.message || "Failed to create ask");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle claim ask
  const handleClaimAsk = async (askId) => {
    try {
      const askToClaim = asks.find((ask) => ask._id === askId);

      // Check if current user is the creator of the ask
      if (currentUser.id.toString() === askToClaim.createdBy._id.toString()) {
        toast.error("You cannot claim your own ask");
        return;
      }
      if (askToClaim.status !== "open") {
        toast.error("This ask is no longer available");
        return;
      }
      const result = await dispatch(claimAsk(askId)).unwrap();
      setSelectedRequest(result);
      dispatch(setCurrentAsk(result));
      setIsChatModalOpen(true);

      dispatch(fetchUserAsks());
    } catch (error) {
      toast.error(error.messages || "Failed to claim ask:");
      console.error("Failed to claim ask:", error);
    }
  };

  // Handle claim ask
  const handleAbandonAsk = async (askId) => {
    try {
      await dispatch(abandonAsk(askId));
      setIsChatModalOpen(false);
      setShowAbandonModal(false);
      setMinimized(false);
      setSelectedRequest(null);
      setMessages((prev) => {
        const updated = { ...prev };
        delete updated[askId];
        return updated;
      });
      dispatch(setCurrentAsk(null));
      dispatch(fetchUserAsks());
    } catch (error) {
      toast.error(error.messages || "Failed to abandon ask:");
      console.error("Failed to abandon ask:", error);
    }
  };
  // Update pagination to use real data
  const requestsPerPage = 6;
  const totalPages = Math.ceil(18 / requestsPerPage);

  const availableAsks = asks?.filter((ask) => {
    // Show only open asks that don't belong to current user
    return ask.status === "open";
  });
  const paginatedRequests = availableAsks?.slice(
    (currentPage - 1) * requestsPerPage,
    currentPage * requestsPerPage
  );

  const hasUnreadMessages = (ask) => {
    if (!ask.chat || !currentUser) return false;

    // Check if there are any unread messages based on reply logic
    const transformedMessages = ask.chat.map((msg) => ({
      senderId: msg.sender,
      messageId: msg._id,
    }));

    // Check each message to see if it's unread (no reply from current user after it)
    for (let i = 0; i < transformedMessages.length; i++) {
      const message = transformedMessages[i];
      const isFromCurrentUser =
        message.senderId === currentUser._id ||
        message.senderId === currentUser.id;

      if (!isFromCurrentUser) {
        // Check if current user replied after this message
        let hasReply = false;
        for (let j = i + 1; j < transformedMessages.length; j++) {
          const laterMessage = transformedMessages[j];
          if (
            laterMessage.senderId === currentUser._id ||
            laterMessage.senderId === currentUser.id
          ) {
            hasReply = true;
            break;
          }
        }

        if (!hasReply) {
          return true; // Found an unread message
        }
      }
    }

    return false; // No unread messages found
  };

  const userOwnAsks =
    asks?.filter((ask) => {
      const isUserCreator =
        ask.createdBy?._id?.toString() === currentUser?.id?.toString();
      const isUserClaimer =
        ask.claimedBy?._id.toString() === currentUser?.id?.toString();
      const isClaimed = ask.status === "claimed";

      return (isUserCreator || isUserClaimer) && isClaimed;
    }) || [];

  const onEmojiClick = (emojiObject) => {
    setNewMessage((prevMessage) => prevMessage + emojiObject.emoji);
    setShowEmojiPicker(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showEmojiPicker && !event.target.closest(".emoji-picker-container")) {
        setShowEmojiPicker(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showEmojiPicker]);

  useEffect(() => {
    if (socket) {
      socket.on("receive-message", (data) => {
        const { askId, message } = data;

        setMessages((prev) => {
          const existingMessages = prev[askId] || [];
          const isCurrentUser = message.sender._id === currentUser._id;

          let updatedMessages;

          // If it's from current user, replace optimistic message
          if (isCurrentUser) {
            // Remove any optimistic messages for this user
            const filteredMessages = existingMessages.filter(
              (msg) => !msg.isOptimistic || msg.senderId !== currentUser._id
            );

            updatedMessages = [
              ...filteredMessages,
              {
                text: message.message,
                time: new Date(message.sentAt).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                }),
                isUser: true,
                senderProfilePhoto: getProfilePhotoUrl(
                  message.sender.profilePhoto
                ),
                senderName: `${
                  message.sender.forename || message.sender.name || "You"
                } ${message.sender.surname || ""}`.trim(),
                senderId: message.sender._id,
                messageId: message._id,
                sentAt: message.sentAt,
                isRead: true, // Own messages are always "read"
              },
            ];
          } else {
            // For other users, just add the message
            updatedMessages = [
              ...existingMessages,
              {
                text: message.message,
                time: new Date(message.sentAt).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                }),
                isUser: false,
                senderProfilePhoto: getProfilePhotoUrl(
                  message.sender.profilePhoto
                ),
                senderName: `${
                  message.sender.forename || message.sender.name || "User"
                } ${message.sender.surname || ""}`.trim(),
                senderId: message.sender._id,
                messageId: message._id,
                sentAt: message.sentAt,
                isRead: false, // Will be recalculated below
              },
            ];
          }

          // Recalculate read status for all messages based on replies
          const messagesWithUpdatedReadStatus = updatedMessages.map(
            (msg, index) => ({
              ...msg,
              isRead: isMessageReadByReply(
                index,
                updatedMessages,
                currentUser._id
              ),
            })
          );

          // Scroll to bottom if it's current user's message (confirmed)
          if (isCurrentUser) {
            setTimeout(() => scrollToBottom(), 100);
          }

          return {
            ...prev,
            [askId]: messagesWithUpdatedReadStatus,
          };
        });
      });

      // Remove the read receipt handler since we're using reply-based logic
      return () => {
        socket.off("receive-message");
      };
    }
  }, [socket, currentUser, getProfilePhotoUrl, scrollToBottom]);

  useEffect(() => {
    if (selectedRequest && socket) {
      let retryCount = 0;
      const maxRetries = 10;

      // Wait for socket to be ready and join room
      const joinRoom = () => {
        if (socket && socket.connected) {
          console.log("🏠 Joining ask room:", selectedRequest._id);
          joinAskRoom(selectedRequest._id);
        } else if (retryCount < maxRetries) {
          retryCount++;
          console.warn(
            `⚠️ Socket not connected, retrying ${retryCount}/${maxRetries} in 500ms...`
          );
          setTimeout(joinRoom, 500);
        } else {
          console.error("❌ Failed to join room after maximum retries");
        }
      };

      joinRoom();

      return () => {
        if (socket && socket.connected) {
          console.log("🚪 Leaving ask room:", selectedRequest._id);
          leaveAskRoom(selectedRequest._id);
        }
      };
    }
  }, [selectedRequest, socket, isConnected, joinAskRoom, leaveAskRoom]);

  // Re-join room when socket reconnects
  useEffect(() => {
    if (selectedRequest && socket && isConnected && socket.connected) {
      console.log(
        "🔄 Socket reconnected, re-joining room:",
        selectedRequest._id
      );
      joinAskRoom(selectedRequest._id);
    }
  }, [isConnected, selectedRequest, socket, joinAskRoom]);

  useEffect(() => {
    console.log("🔍 Socket object:", socket);
    console.log("🔍 Current user:", currentUser);
  }, [socket, currentUser]);

  return (
    <div className="min-h-screen bg-white z-0">
      <AuthModal
        open={showDocumentReviewModal}
        onClose={() => setShowDocumentReviewModal(false)}
        title="Document Verification Process "
        description="Verification is ongoing before you can start using this feature"
      />

      <div className="relative text-white">
        <div className="absolute inset-0">
          <img
            src={bg_image}
            alt="background"
            className="w-full h-[200px] md:h-full object-cover brightness-50"
          />
        </div>
        <div className="relative">
          <Header />
          {/* Hero Section */}
          <div className="relative text-center py-24 md:py-32">
            <h1 className="text-2xl md:text-4xl font-semibold mb-2 md:mb-4 font-secondary">
              Ask
            </h1>
            <p className="text-gray-200 font-primary text-sm md:text-base px-4 md:px-0">
              View and respond to questions or requests posted by other members.
            </p>
          </div>
        </div>
      </div>
      <div className="p-4 md:p-12 mt-0">
        <div className="px-0 md:px-44 flex justify-between md:justify-center items-center mb-6 md:mb-8">
          <button
            onClick={(e) => {
              e.stopPropagation();

              if (currentUser.isRestricted) {
                toast.error("You are restricted from creating asks");
                return;
              }

              if (!isUserVerifiedAndApproved) {
                setShowDocumentReviewModal(true);
                return;
              }

              setIsModalOpen(true);
            }}
            className="px-4 md:px-6 py-1 md:py-2 bg-primary text-white rounded-lg flex items-center gap-2 text-sm md:text-base ml-4 md:ml-0"
          >
            <span>Add Ask</span>
          </button>
        </div>
        {/* Requests Grid */}
        {!availableAsks || availableAsks.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-black text-lg">
              No available asks at the moment
            </p>
            <p className="text-black text-sm">
              Check back later or create your own ask!
            </p>
          </div>
        ) : (
          <div className="px-0 md:px-44 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 z-0">
            {paginatedRequests?.map((request) => (
              <div
                key={request._id}
                className="bg-white border border-gray-200 rounded-xl p-4 md:p-6 relative group shadow-xl"
              >
                <button
                  className="absolute top-4 md:top-3 right-3 md:right-3"
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowReportModal(true);
                    setSelectedRequest(request);
                  }}
                >
                  <BiErrorCircle className="text-gray-400 w-5 h-5 md:w-6 md:h-6" />
                </button>
                <div className="mb-3 md:mb-4">
                  <h3 className="text-lg md:text-xl font-semibold mb-1 md:mb-2 text-gradient_r font-secondary">
                    {request.title} {request.id}
                  </h3>
                  <p className="text-[#979797] font-primary text-sm ">
                    {request.description}
                  </p>
                </div>
                <div className="space-y-1 md:space-y-2">
                  <div className="flex items-center gap-1 md:gap-2 text-xs md:text-sm text-gray-600">
                    <span>Created By:</span>
                    <span className="text-[#979797]">
                      {" "}
                      {request.createdByName}
                    </span>
                  </div>
                  <div className="flex items-center gap-1 md:gap-2 text-xs md:text-sm text-gray-600">
                    <span>Date:</span>
                    <span className="text-[#979797]">
                      {formatDateWithSuffix(request.createdAt)}
                    </span>
                  </div>
                </div>
                <div className="flex flex-wrap items-center gap-2 md:gap-4 mt-3 md:mt-4">
                  <div className="flex flex-wrap gap-1 md:gap-2">
                    {request.isUrgent && (
                      <span className="px-2 py-0.5 rounded-full text-xs md:text-sm text-primary border border-primary md:border-2">
                        #Urgent
                      </span>
                    )}
                    {request.status === "open" && (
                      <span className="px-2 py-0.5 rounded-full text-xs md:text-sm text-primary border border-primary md:border-2">
                        #Open
                      </span>
                    )}
                  </div>
                  <button
                    className="ml-auto px-3 md:px-4 py-1 bg-gradient-to-r from-[#540A26] to-[#0A5440] text-white rounded-lg text-xs md:text-sm"
                    onClick={() => {
                      setSelectedRequest(request);
                      handleClaimAsk(request._id);
                    }}
                  >
                    Claim Ask
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
        {/* User's Own Asks Section */}
        {userOwnAsks && userOwnAsks.length > 0 ? (
          <div className="px-0 md:px-44 mt-12">
            <h2 className="text-xl font-semibold mb-6 text-gray-800">
              Your Active Asks ({userOwnAsks.length})
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {userOwnAsks.map((ask, index) => (
                <div
                  key={`${ask._id}-${index}`} // Ensure unique keys for multiple asks
                  className="bg-white border border-gray-200 rounded-xl p-4 md:p-6 relative group shadow-xl"
                >
                  {/* Chat notification icon */}
                  <div className="absolute top-3 right-3 flex items-center gap-2">
                    <button
                      className="relative p-2 hover:bg-gray-100 rounded-full transition-colors"
                      onClick={() => {
                        console.log("Opening chat for ask:", ask._id);
                        setSelectedRequest(ask);
                        setIsChatModalOpen(true);
                        setMinimized(false);
                      }}
                      title="Open chat"
                    >
                      <IoChatboxEllipsesOutline
                        className={`w-6 h-6 ${
                          hasUnreadMessages(ask)
                            ? "text-green-500 animate-pulse"
                            : "text-gray-600 hover:text-primary"
                        }`}
                      />
                      {hasUnreadMessages(ask) && (
                        <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-white"></div>
                      )}
                    </button>
                  </div>

                  <div className="mb-3 md:mb-4 pr-12">
                    <h3 className="text-lg md:text-xl font-semibold mb-1 md:mb-2 text-gradient_r font-secondary">
                      {ask.title}
                    </h3>
                    <p className="text-[#979797] font-primary text-sm line-clamp-3">
                      {ask.description}
                    </p>
                  </div>

                  <div className="space-y-1 md:space-y-2">
                    <div className="flex items-center gap-1 md:gap-2 text-xs md:text-sm text-gray-600">
                      <span>Created:</span>
                      <span className="text-[#979797]">
                        {formatDateWithSuffix(ask.createdAt)}
                      </span>
                    </div>

                    {ask.deadline && (
                      <div className="flex items-center gap-1 md:gap-2 text-xs md:text-sm text-gray-600">
                        <span>Deadline:</span>
                        <span className="text-[#979797]">
                          {formatDateWithSuffix(ask.deadline)}
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="flex items-center gap-2 mt-3 md:mt-4">
                    <button
                      className="px-3 md:px-4 py-1 bg-gradient-to-r from-[#540A26] to-[#0A5440] text-white rounded-lg text-xs md:text-sm flex items-center gap-2 hover:opacity-90 transition-opacity"
                      onClick={() => {
                        console.log("Chat button clicked for ask:", ask._id);
                        setSelectedRequest(ask);
                        setIsChatModalOpen(true);
                        setMinimized(false);
                      }}
                    >
                      <IoChatboxEllipsesOutline className="w-4 h-4" />
                      Chat
                      {/* {hasUnreadMessages(ask) && (
                        <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse"></div>
                      )} */}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          // Show when no active asks
          <div className="px-0 md:px-44 mt-12">
            <h2 className="text-xl font-semibold mb-6 text-gray-800">
              Your Active Asks
            </h2>
            <div className="bg-gray-50 border border-gray-200 rounded-xl p-8 text-center">
              <div className="text-gray-400 mb-4">
                <IoChatboxEllipsesOutline className="w-12 h-12 mx-auto" />
              </div>
              <p className="text-gray-600 mb-2">No active asks found</p>
              <p className="text-sm text-gray-500">
                Create an ask and wait for someone to claim it to see it here.
              </p>
            </div>
          </div>
        )}
        {/* Pagination */}
        <div className="flex justify-center items-center gap-2 mt-8 md:mt-12 mb-6 md:mb-8">
          <button
            className="w-6 h-6 md:w-8 md:h-8 flex items-center justify-center text-gray-600 hover:text-[#540A26] transition-colors"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            style={{
              opacity: currentPage === 1 ? 0.5 : 1,
              cursor: currentPage === 1 ? "not-allowed" : "pointer",
            }}
          >
            ←
          </button>

          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index}
              className={`w-2 h-2 rounded-full ${
                currentPage === index + 1 ? "bg-[#540A26]" : "bg-gray-300"
              } hover:bg-[#540A26]/70 transition-colors`}
              onClick={() => handlePageChange(index + 1)}
              aria-label={`Page ${index + 1}`}
            ></button>
          ))}

          <button
            className="w-6 h-6 md:w-8 md:h-8 flex items-center justify-center text-gray-600 hover:text-[#540A26] transition-colors"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            style={{
              opacity: currentPage === totalPages ? 0.5 : 1,
              cursor: currentPage === totalPages ? "not-allowed" : "pointer",
            }}
          >
            →
          </button>
        </div>
      </div>
      <Footer />
      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        style={modalStyles}
        contentLabel="Add Ask Modal"
      >
        <div className="relative">
          <button
            onClick={() => setIsModalOpen(false)}
            className="absolute right-0 top-0 text-gray-400 hover:text-gray-600"
          >
            <IoClose size={24} />
          </button>

          <h2 className="text-xl md:text-2xl font-semibold mb-6 md:mb-8">
            Add Ask
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
            <div>
              <label className="block mb-1 md:mb-2 text-sm md:text-base">
                Add Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="What do you need help with?"
                className="w-full px-3 md:px-4 py-2 md:py-3 bg-gray-100 rounded-lg text-sm md:text-base"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                required
              />
            </div>

            <div>
              <label className="block mb-1 md:mb-2 text-sm md:text-base">
                Description <span className="text-red-500">*</span>
              </label>
              <textarea
                placeholder="Provide more details about your Ask..."
                className="w-full px-3 md:px-4 py-2 md:py-3 bg-gray-100 rounded-lg min-h-[100px] md:min-h-[120px] text-sm md:text-base"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                required
              />
            </div>

            <div>
              <label className="block mb-1 md:mb-2 text-sm md:text-base">
                Deadline <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                placeholder="Select Date"
                className="w-full px-3 md:px-4 py-2 md:py-3 bg-gray-100 rounded-lg text-sm md:text-base"
                value={formData.deadline}
                onChange={(e) =>
                  setFormData({ ...formData, deadline: e.target.value })
                }
                required
              />
            </div>

            <label className="flex items-start gap-2">
              <input
                type="checkbox"
                className="mt-1"
                checked={formData.agreeToGuidelines}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    agreeToGuidelines: e.target.checked,
                  })
                }
                required
              />
              <span className="text-xs md:text-sm text-gray-600">
                I ensure my Ask follows HH club community guidelines.
              </span>
            </label>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-2 md:py-3 bg-gradient-to-r from-[#540A26] to-[#0A5440] text-white rounded-lg font-medium text-sm md:text-base"
            >
              Add Ask
            </button>
          </form>
        </div>
      </Modal>
      <Modal
        isOpen={isChatModalOpen}
        onRequestClose={() => setIsChatModalOpen(false)}
        style={chatModalStyles}
        contentLabel="Chat Modal"
      >
        {minimized ? (
          <div
            className="rounded-t-2xl animate-pulse bg-gradient-to-r from-[#540A26] to-[#0A5440] cursor-pointer p-3"
            onClick={() => setMinimized(false)}
          >
            <div className="text-white flex justify-evenly text-sm">
              <h3 className="font-medium">
                {selectedRequest?.createdByName || "User"}
              </h3>
              <span className="text-xs flex items-center gap-1">
                <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                Online
              </span>
            </div>
          </div>
        ) : (
          <>
            <div className="rounded-t-2xl bg-gradient-to-r from-[#540A26] to-[#0A5440] p-4">
              <div className="flex items-center gap-3">
                <img
                  src={
                    selectedRequest?.createdBy?.profilePhoto ||
                    selectedRequest?.createdbyImage ||
                    avatar
                  }
                  alt={selectedRequest?.createdByName || "User"}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div className="text-white">
                  <h3 className="font-medium">
                    {selectedRequest?.createdByName ||
                      selectedRequest?.createdBy?.forename ||
                      "User"}
                  </h3>
                  <span className="text-sm flex items-center gap-1">
                    <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                    Online
                  </span>
                </div>
                <button
                  onClick={() => setMinimized(true)}
                  className="ml-auto text-white hover:opacity-80"
                >
                  <BiMinus size={24} />
                </button>
              </div>
            </div>

            <div className="h-96 p-4 overflow-y-auto">
              {selectedRequest && (
                <div className="bg-gray-100 p-3 rounded-lg mb-4">
                  <h4 className="font-medium text-sm">
                    {selectedRequest.title}
                  </h4>
                  <p className="text-sm text-gray-600">
                    {selectedRequest.description}
                  </p>
                </div>
              )}

              {(messages[selectedRequest?.id] || []).map((message, index) => (
                <div
                  key={message.tempId || message.messageId || index}
                  className={`flex ${
                    message.isUser ? "justify-end" : "justify-start"
                  } mb-4 ${
                    message.isOptimistic ? "opacity-70" : "opacity-100"
                  } transition-opacity duration-200`}
                >
                  {!message.isUser && (
                    <div className="flex flex-col items-center mr-2">
                      <img
                        src={message.senderProfilePhoto || avatar}
                        alt={message.senderName || "User"}
                        className="w-8 h-8 rounded-full object-cover flex-shrink-0 border-2 border-gray-200"
                      />
                    </div>
                  )}

                  <div className="flex flex-col max-w-[70%]">
                    <div
                      className={`p-3 rounded-2xl relative ${
                        message.isUser
                          ? "bg-gray-100 text-black rounded-br-md"
                          : "bg-[#0A5440] text-white rounded-bl-md"
                      }`}
                    >
                      {/* Red indicator for truly unread messages from others */}
                      {!message.isUser && !message.isRead && (
                        <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-white"></div>
                      )}

                      <p className="break-words">{message.text}</p>
                      <div className="text-xs mt-1 flex gap-1 justify-between items-center opacity-70">
                        <span>{message.time}</span>
                        {message.isUser && (
                          <span className="flex items-center gap-1">
                            {message.isOptimistic ? (
                              <span className="text-gray-400 animate-pulse">
                                ○
                              </span> // Sending
                            ) : message.isRead ? (
                              <span className="text-green-500" title="Read">
                                ✔✔
                              </span> // Double tick for read
                            ) : (
                              <span className="text-gray-500" title="Sent">
                                ✔
                              </span> // Single tick for sent
                            )}
                            {message.readAt && (
                              <span className="text-xs text-gray-400 ml-1">
                                {new Date(message.readAt).toLocaleTimeString(
                                  [],
                                  {
                                    hour: "2-digit",
                                    minute: "2-digit",
                                  }
                                )}
                              </span>
                            )}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {message.isUser && (
                    <div className="flex flex-col items-center ml-2">
                      <img
                        src={
                          currentUser?.profilePhoto
                            ? currentUser.profilePhoto.startsWith("http")
                              ? currentUser.profilePhoto
                              : `${process.env.REACT_APP_API_BASE_URL}/${currentUser.profilePhoto}`
                            : avatar
                        }
                        alt={
                          currentUser?.forename || currentUser?.name || "You"
                        }
                        className="w-8 h-8 rounded-full object-cover flex-shrink-0 border-2 border-gray-200"
                      />
                    </div>
                  )}
                </div>
              ))}

              {/* Scroll anchor */}
              <div ref={messagesEndRef} />
            </div>

            <div className="p-4 border-t">
              <div className="relative flex items-center gap-4">
                <button
                  className="px-4 py-2 bg-gradient-to-r from-[#540A26] to-[#0A5440] text-white rounded-lg text-sm"
                  onClick={() => setShowAbandonModal(true)}
                >
                  Abandon Ask
                </button>
                <div className="flex-1 relative">
                  <textarea
                    placeholder="Type your message here..."
                    className="w-full pr-20 pl-4 py-3 bg-gray-100 rounded-2xl resize-none overflow-hidden placeholder:text-ellipsis placeholder:whitespace-nowrap placeholder:overflow-hidden"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    // onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                    disabled={chatLoading}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault();
                        handleSendMessage();
                      }
                      // Allow Shift+Enter for new lines
                    }}
                    rows={1}
                    style={{
                      minHeight: "48px",
                      maxHeight: "120px",
                    }}
                    onInput={(e) => {
                      // Auto-resize textarea based on content
                      e.target.style.height = "auto";
                      e.target.style.height =
                        Math.min(e.target.scrollHeight, 120) + "px";
                    }}
                  />
                  <button
                    type="button"
                    className="absolute right-12 top-1/2 -translate-y-1/2 text-[#540A26] hover:text-[#740E36] transition-colors"
                    onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                    disabled={chatLoading}
                  >
                    <BsEmojiSmile size={20} />
                  </button>
                  <button
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-[#540A26]"
                    onClick={handleSendMessage}
                    disabled={!newMessage.trim() || chatLoading}
                  >
                    {chatLoading ? (
                      <FaSpinner size={20} className="animate-spin" />
                    ) : (
                      <AiOutlineSend size={24} />
                    )}
                  </button>
                  {showEmojiPicker && (
                    <div className="absolute bottom-full right-0 mb-2 z-50 emoji-picker-container">
                      <EmojiPicker
                        onEmojiClick={onEmojiClick}
                        width={300}
                        height={400}
                        theme="light"
                        searchDisabled={false}
                        skinTonesDisabled={false}
                        previewConfig={{
                          showPreview: false,
                        }}
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </>
        )}
      </Modal>
      <Modal
        isOpen={showReportModal}
        onRequestClose={() => setShowReportModal(false)}
        style={reportModalStyles}
        contentLabel="Report Modal"
      >
        <div className="text-center relative z-20">
          <button
            onClick={() => setShowReportModal(false)}
            className="absolute right-4 top-4 text-gray-400 hover:text-gray-600"
          >
            <IoClose size={24} />
          </button>
          <div className="w-16 h-16 bg-[#F8E7EB] rounded-2xl mx-auto mb-4 flex items-center justify-center">
            <svg
              className="w-8 h-8 text-[#540A26]"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold mb-2">
            Are you sure you want to Report?
          </h3>
          <p className="text-gray-600 mb-2">
            {selectedRequest?.title || "Request"}
          </p>
          <p className="text-gray-500 text-sm mb-6">
            {selectedRequest?.description || "No description available."}
          </p>

          <div className="mb-6">
            <label className="block text-left text-gray-600 mb-2">
              Report Type
            </label>
            <select
              value={reportType}
              onChange={(e) => setReportType(e.target.value)}
              required
              className="w-full px-4 py-3 bg-gray-100 rounded-lg pr-6"
            >
              <option value="">select</option>
              <option value="Sexual Content">Sexual Content</option>
              <option value="Inappropriate Content">
                Inappropriate Content
              </option>
              <option value="Misleading Information">
                Misleading Information
              </option>
              <option value="Spamming">Spamming</option>
            </select>
          </div>
          <button
            onClick={() => {
              // Handle report logic
              if (reportType) {
                dispatch(
                  reportAsk({ askId: selectedRequest._id, reason: reportType })
                );
                toast.success("Report submitted successfully!");
              } else {
                toast.error("Please select a report type.");
              }
              setReportType("");
              setShowReportModal(false);
            }}
            className="w-full py-3 bg-gradient-to-r from-[#540A26] to-[#0A5440] text-white rounded-lg"
          >
            Report Ask
          </button>
        </div>
      </Modal>

      <Modal
        isOpen={showAbandonModal}
        onRequestClose={() => setShowAbandonModal(false)}
        style={abandonModalStyles}
        contentLabel="Abandon Confirmation Modal"
      >
        <div className="text-center relative">
          <button
            onClick={() => {
              setShowAbandonModal(false);
              setIsChatModalOpen(false);
            }}
            className="absolute right-4 top-4 text-gray-400 hover:text-gray-600"
          >
            <IoClose size={24} />
          </button>
          <div className="w-16 h-16 bg-[#F8E7EB] rounded-2xl mx-auto mb-4 flex items-center justify-center">
            <svg
              className="w-8 h-8 text-[#540A26]"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M16.01 11H4v2h12.01v3L20 12l-3.99-4v3z" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold mb-2">
            Are you sure You want to Abandon?
          </h3>
          <p className="text-gray-600 mb-2">
            {selectedRequest?.title || "Request"}
          </p>
          <p className="text-gray-500 text-sm mb-6">
            {selectedRequest?.description || "No description available."}
          </p>
          <button
            onClick={() => {
              handleAbandonAsk(selectedRequest._id);
              setShowAbandonModal(false);
              setIsChatModalOpen(false);
            }}
            className="w-full py-3 bg-gradient-to-r from-[#540A26] to-[#0A5440] text-white rounded-lg"
          >
            Yes, Abandon Ask
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default Ask;
