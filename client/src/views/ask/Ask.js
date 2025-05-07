import React, { useEffect, useState } from 'react';
import { BsThreeDotsVertical } from 'react-icons/bs';
import Modal from 'react-modal';
import { IoClose } from 'react-icons/io5';
import Header from '../../components/Header';
import bg_image from '../../assets/party3.jpg';
import Footer from '../../components/Footer';
import { BiErrorCircle, BiMinus } from 'react-icons/bi';
import { AiOutlineSend } from 'react-icons/ai';
import avatar from '../../assets/user.avif';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchOpenAsks,
  createAsk,
  claimAsk,
  abandonAsk,
  reportAsk,
  chat,
  setCurrentAsk,
  reset
} from '../../features/askSlice';
import { formatDateWithSuffix } from '../../utils/formatDate';
import { FaSpinner } from 'react-icons/fa';
import toast from 'react-hot-toast';
const Ask = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isChatModalOpen, setIsChatModalOpen] = useState(false);
  const [minimized, setMinimized] = useState(false);
  const [showAbandonModal, setShowAbandonModal] = useState(false);
  const [showReportModal, setShowReportModal] = useState(false);
  const [reportType, setReportType] = useState('');
  const [selectedRequest, setSelectedRequest] = useState(null);

  const [messages, setMessages] = useState({});
  const [newMessage, setNewMessage] = useState('');

  const dispatch = useDispatch();
  const { asks, currentAsk, loading, error, message } = useSelector((state) => state.ask);
  const { user: currentUser } = useSelector((state) => state.auth);
  // Fetch asks on component mount
  useEffect(() => {
    dispatch(fetchOpenAsks());
    return () => {
      dispatch(reset());
    };
  }, [dispatch]);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    deadline: '',
    agreeToGuidelines: false,
  });

  // Transform Redux ask data to message format
  useEffect(() => {
    if (selectedRequest) {
      const askFromRedux = asks.find(a => a._id === selectedRequest.id) || currentAsk;
      if (askFromRedux?.chat) {
        // In your message transformation effect
        setMessages(prev => ({
          ...prev,
          [selectedRequest.id]: askFromRedux.chat.map(msg => ({
            text: msg.message,
            time: new Date(msg.sentAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            isUser: currentUser && msg.sender?.toString() === currentUser._id?.toString()
          }))
        }));
      }
    }
  }, [selectedRequest, asks, currentAsk]);

  const handleSendMessage = async () => {
    if (!newMessage.trim() || !selectedRequest || !currentUser) return;
    
    try {
      // Create a temporary optimistic message
      const tempMessage = {
        sender: currentUser._id,
        message: newMessage,
        sentAt: new Date().toISOString(),
        isOptimistic: true
      };
  
      // Update local state immediately for instant feedback
      setMessages(prev => ({
        ...prev,
        [selectedRequest.id]: [
          ...(prev[selectedRequest.id] || []),
          {
            text: newMessage,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            isUser: true,
            isOptimistic: true
          }
        ]
      }));
  
      // Dispatch the chat action and wait for it to complete
      const resultAction = await dispatch(chat({
        askId: selectedRequest._id,
        message: newMessage
      }));
  
      if (chat.fulfilled.match(resultAction)) {
        // Success - clear the input field
        setNewMessage('');
        
        // Update the messages with the actual server response
        const newServerMessage = resultAction.payload;
        setMessages(prev => ({
          ...prev,
          [selectedRequest._id]: [
            ...((prev[selectedRequest._id] || []).filter(msg => !msg.isOptimistic)),
            {
              text: newServerMessage.message,
              time: new Date(newServerMessage.sentAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
              isUser: currentUser._id?.toString() === newServerMessage.sender?.toString()
            }
          ]
        }));
      } else {
        // If the action was rejected, throw to catch block
        throw new Error(resultAction.payload || 'Failed to send message');
      }
    } catch (error) {
      // Rollback optimistic update on error
      setMessages(prev => ({
        ...prev,
        [selectedRequest._id]: (prev[selectedRequest._id] || []).filter(
          msg => !msg.isOptimistic
        )
      }));
      console.error('Failed to send message:', error);
      toast.error(error.message || 'Failed to send message'); 
    }
  };
  const modalStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      transform: 'translate(-50%, -50%)',
      maxWidth: '600px',
      width: '90%',
      padding: '32px',
      border: 'none',
      borderRadius: '24px',
      backgroundColor: 'white',
      zIndex: 10000,
    },
    overlay: {
      backgroundColor: 'rgba(0, 0, 0, 0.75)',
      zIndex: 10000,
    },
  };

  const chatModalStyles = {
    content: {
      top: 'auto',
      left: 'auto',
      right: '16px',
      bottom: '16px',
      width: '90%',
      maxWidth: '400px',
      padding: '0',
      border: 'none',
      borderRadius: '24px',
      backgroundColor: 'white',
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
    },
    overlay: {
      backgroundColor: 'transparent',
    },
  };

  const abandonModalStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      transform: 'translate(-50%, -50%)',
      maxWidth: '400px',
      width: '90%',
      padding: '24px',
      border: 'none',
      borderRadius: '24px',
      backgroundColor: 'white',
    },
    overlay: {
      backgroundColor: 'rgba(0, 0, 0, 0.75)',
    },
  };

  const reportModalStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      transform: 'translate(-50%, -50%)',
      maxWidth: '400px',
      width: '90%',
      padding: '24px',
      border: 'none',
      borderRadius: '24px',
      backgroundColor: 'white',
    },
    overlay: {
      backgroundColor: 'rgba(0, 0, 0, 0.75)',
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
    try {
      await dispatch(createAsk(formData)).unwrap();
      setIsModalOpen(false);
      setFormData({
        title: '',
        description: '',
        deadline: '',
        agreeToGuidelines: false,
      });
    } catch (error) {
      console.error('Failed to create ask:', error);
    }
  };
  // Handle claim ask
  const handleClaimAsk = async (askId) => {
    try {
      await dispatch(claimAsk(askId));
      const selected = asks.find(ask => ask.id === askId);
      dispatch(setCurrentAsk(selected));
      setIsChatModalOpen(true);
    } catch (error) {
      console.error('Failed to claim ask:', error);
    }
  };
   // Handle claim ask
   const handleAbandonAsk = async (askId) => {
    try {
      await dispatch(abandonAsk(askId));
      const selected = asks.find(ask => ask.id === askId);
      dispatch(setCurrentAsk(selected));
    } catch (error) {
      console.error('Failed to claim ask:', error);
    }
  };
  // Update pagination to use real data
  const requestsPerPage = 6;
  const totalPages = Math.ceil(18 / requestsPerPage);

  const paginatedRequests = asks?.slice(
    (currentPage - 1) * requestsPerPage,
    currentPage * requestsPerPage
  );

  return (
    <div className='min-h-screen bg-white z-0'>
      <div className='relative text-white'>
        <div className='absolute inset-0'>
          <img
            src={bg_image}
            alt='background'
            className='w-full h-[200px] md:h-full object-cover brightness-50'
          />
        </div>
        <div className='relative'>
          <Header />
          {/* Hero Section */}
          <div className='relative text-center py-24 md:py-32'>
            <h1 className='text-2xl md:text-4xl font-semibold mb-2 md:mb-4 font-secondary'>
              Ask
            </h1>
            <p className='text-gray-200 font-primary text-sm md:text-base px-4 md:px-0'>
              View and respond to questions or requests posted by other members.
            </p>
          </div>
        </div>
      </div>
      <div className='p-4 md:p-12 mt-0'>
        <div className='px-0 md:px-44 flex justify-between md:justify-center items-center mb-6 md:mb-8'>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsModalOpen(true);
            }}
            className='px-4 md:px-6 py-1 md:py-2 bg-primary text-white rounded-lg flex items-center gap-2 text-sm md:text-base ml-4 md:ml-0'
          >
            <span>Add Ask</span>
          </button>
        </div>

        {/* Requests Grid */}
        <div className='px-0 md:px-44 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 z-0'>
          {paginatedRequests?.map((request) => (
            <div
              key={request.id}
              className='bg-white border border-gray-200 rounded-xl p-4 md:p-6 relative group shadow-xl'
            >
              <button
                className='absolute top-4 md:top-3 right-3 md:right-3'
                onClick={(e) => {
                  e.stopPropagation();
                  setShowReportModal(true);
                  setSelectedRequest(request);
                }}
              >
                <BiErrorCircle className='text-gray-400 w-5 h-5 md:w-6 md:h-6' />
              </button>
              <div className='mb-3 md:mb-4'>
                <h3 className='text-lg md:text-xl font-semibold mb-1 md:mb-2 text-gradient_r font-secondary'>
                  {request.title} {request.id}
                </h3>
                <p className='text-[#979797] font-primary text-sm '>
                  {request.description}
                </p>
              </div>
              <div className='space-y-1 md:space-y-2'>
                <div className='flex items-center gap-1 md:gap-2 text-xs md:text-sm text-gray-600'>
                  <span>Created By:</span>
                  <span className='text-[#979797]'> {request.createdByName}</span>
                </div>
                <div className='flex items-center gap-1 md:gap-2 text-xs md:text-sm text-gray-600'>
                  <span>Date:</span>
                  <span className='text-[#979797]'>{formatDateWithSuffix(request.createdAt)}</span>
                </div>
              </div>
              <div className='flex flex-wrap items-center gap-2 md:gap-4 mt-3 md:mt-4'>
                <div className='flex flex-wrap gap-1 md:gap-2'>
                  {request.isUrgent &&
                    <span
                      className='px-2 py-0.5 rounded-full text-xs md:text-sm text-primary border border-primary md:border-2'
                    >
                      #Urgent
                    </span>
                  }
                  {request.status == 'open' &&
                    <span
                      className='px-2 py-0.5 rounded-full text-xs md:text-sm text-primary border border-primary md:border-2'
                    >
                      #Open
                    </span>
                  }
                </div>
                <button
                  className='ml-auto px-3 md:px-4 py-1 bg-gradient-to-r from-[#540A26] to-[#0A5440] text-white rounded-lg text-xs md:text-sm'
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

        {/* Pagination */}
        <div className='flex justify-center items-center gap-2 mt-8 md:mt-12 mb-6 md:mb-8'>
          <button
            className='w-6 h-6 md:w-8 md:h-8 flex items-center justify-center text-gray-600 hover:text-[#540A26] transition-colors'
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            style={{
              opacity: currentPage === 1 ? 0.5 : 1,
              cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
            }}
          >
            ←
          </button>

          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index}
              className={`w-2 h-2 rounded-full ${currentPage === index + 1 ? 'bg-[#540A26]' : 'bg-gray-300'
                } hover:bg-[#540A26]/70 transition-colors`}
              onClick={() => handlePageChange(index + 1)}
              aria-label={`Page ${index + 1}`}
            ></button>
          ))}

          <button
            className='w-6 h-6 md:w-8 md:h-8 flex items-center justify-center text-gray-600 hover:text-[#540A26] transition-colors'
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            style={{
              opacity: currentPage === totalPages ? 0.5 : 1,
              cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
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
        contentLabel='Add Ask Modal'
      >
        <div className='relative'>
          <button
            onClick={() => setIsModalOpen(false)}
            className='absolute right-0 top-0 text-gray-400 hover:text-gray-600'
          >
            <IoClose size={24} />
          </button>

          <h2 className='text-xl md:text-2xl font-semibold mb-6 md:mb-8'>
            Add Ask
          </h2>

          <form onSubmit={handleSubmit} className='space-y-4 md:space-y-6'>
            <div>
              <label className='block mb-1 md:mb-2 text-sm md:text-base'>
                Add Title <span className='text-red-500'>*</span>
              </label>
              <input
                type='text'
                placeholder='What do you need help with?'
                className='w-full px-3 md:px-4 py-2 md:py-3 bg-gray-100 rounded-lg text-sm md:text-base'
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                required
              />
            </div>

            <div>
              <label className='block mb-1 md:mb-2 text-sm md:text-base'>
                Description <span className='text-red-500'>*</span>
              </label>
              <textarea
                placeholder='Provide more details about your Ask...'
                className='w-full px-3 md:px-4 py-2 md:py-3 bg-gray-100 rounded-lg min-h-[100px] md:min-h-[120px] text-sm md:text-base'
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                required
              />
            </div>

            <div>
              <label className='block mb-1 md:mb-2 text-sm md:text-base'>
                Deadline <span className='text-red-500'>*</span>
              </label>
              <input
                type='date'
                placeholder='Select Date'
                className='w-full px-3 md:px-4 py-2 md:py-3 bg-gray-100 rounded-lg text-sm md:text-base'
                value={formData.deadline}
                onChange={(e) =>
                  setFormData({ ...formData, deadline: e.target.value })
                }
                required
              />
            </div>

            <label className='flex items-start gap-2'>
              <input
                type='checkbox'
                className='mt-1'
                checked={formData.agreeToGuidelines}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    agreeToGuidelines: e.target.checked,
                  })
                }
                required
              />
              <span className='text-xs md:text-sm text-gray-600'>
                I ensure my Ask follows HH club community guidelines.
              </span>
            </label>

            <button
              type='submit'
              className='w-full py-2 md:py-3 bg-gradient-to-r from-[#540A26] to-[#0A5440] text-white rounded-lg font-medium text-sm md:text-base'
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
        contentLabel='Chat Modal'
      >
        {minimized ? (
          <div
            className='rounded-t-2xl animate-pulse bg-gradient-to-r from-[#540A26] to-[#0A5440] cursor-pointer p-3'
            onClick={() => setMinimized(false)}
          >
            <div className='text-white flex justify-evenly text-sm'>
              <h3 className='font-medium'>
                {selectedRequest?.createdByName || 'User'}
              </h3>
              <span className='text-xs flex items-center gap-1'>
                <span className='w-2 h-2 bg-green-400 rounded-full'></span>
                Online
              </span>
            </div>
          </div>
        ) : (
          <>
            <div className='rounded-t-2xl bg-gradient-to-r from-[#540A26] to-[#0A5440] p-4'>
              <div className='flex items-center gap-3'>
                <img
                  src={avatar}
                  alt={selectedRequest?.createdByName || 'User'}
                  className='w-10 h-10 rounded-full object-cover'
                />
                <div className='text-white'>
                  <h3 className='font-medium'>
                    {selectedRequest?.createdByName || 'User'}
                  </h3>
                  <span className='text-sm flex items-center gap-1'>
                    <span className='w-2 h-2 bg-green-400 rounded-full'></span>
                    Online
                  </span>
                </div>
                <button
                  onClick={() => setMinimized(true)}
                  className='ml-auto text-white hover:opacity-80'
                >
                  <BiMinus size={24} />
                </button>
              </div>
            </div>

            <div className='h-96 p-4 overflow-y-auto'>
              {selectedRequest && (
                <div className='bg-gray-100 p-3 rounded-lg mb-4'>
                  <h4 className='font-medium text-sm'>
                    {selectedRequest.title}
                  </h4>
                  <p className='text-sm text-gray-600'>
                    {selectedRequest.description}
                  </p>
                </div>
              )}

              {(messages[selectedRequest?.id] || []).map((message, index) => (
                <div
                  key={index}
                  className={`flex ${message.isUser ? 'justify-end' : 'justify-start'
                    } mb-4`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-2xl ${message.isUser
                        ? 'bg-gray-100 text-black'
                        : 'bg-[#0A5440] text-white'
                      }`}
                  >
                    <p>{message.text}</p>
                    <span className='text-xs mt-1 block text-right'>
                      {message.time}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div className='p-4 border-t'>
              <div className='relative flex items-center gap-4'>
                <button
                  className='px-4 py-2 bg-gradient-to-r from-[#540A26] to-[#0A5440] text-white rounded-lg text-sm'
                  onClick={() => setShowAbandonModal(true)}
                >
                  Abandon Ask
                </button>
                <div className='flex-1 relative'>
                  <input
                    type='text'
                    placeholder='Type your message here...'
                    className='w-full pr-12 pl-4 py-3 bg-gray-100 rounded-full'
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    disabled={loading}
                  />
                  <button
                    className='absolute right-2 top-1/2 -translate-y-1/2 text-[#540A26]'
                    onClick={handleSendMessage}
                    disabled={!newMessage.trim() || loading}
                  >
                    {loading ? (
                      <FaSpinner size={20} />
                    ) : (
                      <AiOutlineSend size={24} />
                    )}
                  </button>
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
        contentLabel='Report Modal'
      >
        <div className='text-center relative z-20'>
          <button
            onClick={() => setShowReportModal(false)}
            className='absolute right-4 top-4 text-gray-400 hover:text-gray-600'
          >
            <IoClose size={24} />
          </button>
          <div className='w-16 h-16 bg-[#F8E7EB] rounded-2xl mx-auto mb-4 flex items-center justify-center'>
            <svg
              className='w-8 h-8 text-[#540A26]'
              viewBox='0 0 24 24'
              fill='currentColor'
            >
              <path d='M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z' />
            </svg>
          </div>
          <h3 className='text-xl font-semibold mb-2'>
            Are you sure you want to Report?
          </h3>
          <p className='text-gray-600 mb-2'>
            {selectedRequest?.title || 'Request'}
          </p>
          <p className='text-gray-500 text-sm mb-6'>
            {selectedRequest?.description || 'No description available.'}
          </p>

          <div className='mb-6'>
            <label className='block text-left text-gray-600 mb-2'>
              Report Type
            </label>
            <select
              value={reportType}
              onChange={(e) => setReportType(e.target.value)}
              required
              className='w-full px-4 py-3 bg-gray-100 rounded-lg pr-6'
            >
              <option value=''>select</option>
              <option value='Sexual Content'>Sexual Content</option>
              <option value='Inappropriate Content'>Inappropriate Content</option>
              <option value='Misleading Information'>Misleading Information</option>
              <option value='Spamming'>Spamming</option>
            </select>
          </div>
          <button
            onClick={() => {
              // Handle report logic 
              if (reportType) {
                dispatch(reportAsk({ askId: selectedRequest._id, reason: reportType }));
                toast.success('Report submitted successfully!');
              } else {
                toast.error('Please select a report type.');
              }
              setReportType('');
              setShowReportModal(false);
            }}
            className='w-full py-3 bg-gradient-to-r from-[#540A26] to-[#0A5440] text-white rounded-lg'
          >
            Report Ask
          </button>
        </div>
      </Modal>

      <Modal
        isOpen={showAbandonModal}
        onRequestClose={() => setShowAbandonModal(false)}
        style={abandonModalStyles}
        contentLabel='Abandon Confirmation Modal'
      >
        <div className='text-center relative'>
          <button
            onClick={() => {
              setShowAbandonModal(false);
              setIsChatModalOpen(false);
            }}
            className='absolute right-4 top-4 text-gray-400 hover:text-gray-600'
          >
            <IoClose size={24} />
          </button>
          <div className='w-16 h-16 bg-[#F8E7EB] rounded-2xl mx-auto mb-4 flex items-center justify-center'>
            <svg
              className='w-8 h-8 text-[#540A26]'
              viewBox='0 0 24 24'
              fill='currentColor'
            >
              <path d='M16.01 11H4v2h12.01v3L20 12l-3.99-4v3z' />
            </svg>
          </div>
          <h3 className='text-xl font-semibold mb-2'>
            Are you sure You want to Abandon?
          </h3>
          <p className='text-gray-600 mb-2'>
            {selectedRequest?.title || 'Request'}
          </p>
          <p className='text-gray-500 text-sm mb-6'>
            {selectedRequest?.description || 'No description available.'}
          </p>
          <button
            onClick={() => {
              handleAbandonAsk(selectedRequest._id);
              setShowAbandonModal(false);
              setIsChatModalOpen(false);
            }}
            className='w-full py-3 bg-gradient-to-r from-[#540A26] to-[#0A5440] text-white rounded-lg'
          >
            Yes, Abandon Ask
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default Ask;
