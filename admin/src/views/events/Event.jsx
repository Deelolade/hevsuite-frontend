import React, { useState, useEffect } from "react";
import { FiEdit, FiEye, FiEyeOff, FiTrash2, FiUpload, FiX } from "react-icons/fi";
import eventImage from "../../assets/event.png";
import { BiSearch } from "react-icons/bi";
import Modal from "react-modal";
import {
  BsCalendar,
  BsChevronLeft,
  BsChevronRight,
  BsHeart,
  BsThreeDotsVertical
} from "react-icons/bs";
import { MdAccessTime, MdLocationOn } from "react-icons/md";
import edit_icon from "../../assets/icons/edit.png";
import avat from "../../assets/user.avif";
import "../layout/forced.css";
import { useDispatch, useSelector } from "react-redux";
import { getEvents, createNewEvent, updateExistingEvent, deleteExistingEvent } from "../../store/events/eventSlice";
import { memberUsers } from "../../store/users/userSlice";
import { toast } from "react-toastify";
import { format, parseISO } from 'date-fns';
import { motion, AnimatePresence } from 'framer-motion';

Modal.setAppElement("#root");

const Event = () => {
  const dispatch = useDispatch();
  const { events, isLoading, isError, message } = useSelector((state) => state.events);
  const { member_users = [] } = useSelector((state) => state.user || {});
  const [currentPage, setCurrentPage] = useState(1);
  const [isAddEventOpen, setIsAddEventOpen] = useState(false);
  const [isViewEventOpen, setIsViewEventOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isEditEventOpen, setIsEditEventOpen] = useState(false);
  const [editEventImages, setEditEventImages] = useState([]);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [addEventImages, setAddEventImages] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [userSearchQuery, setUserSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("description");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterType, setFilterType] = useState("all");
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [isMenuOpen, setIsMenuOpen] = useState(null);

  // Form states for creating/editing events
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    time: "",
    description: "",
    audienceType: "",
    price: "",
    numberOfTicket: "",
    invitedUsers: [],
    type: "social",
    status: "upcoming"
  });

  useEffect(() => {
    dispatch(getEvents({ status: filterStatus, filter: filterType }));
  }, [dispatch, filterStatus, filterType]);

  useEffect(() => {
    dispatch(memberUsers({ page: 1, search: userSearchQuery, role: 'member' }));
  }, [dispatch, userSearchQuery]);

  const handleVisibility = async (id) => {
    try {
      const event = events.find(e => e._id === id);
      if (!event) {
        toast.error("Event not found");
        return;
      }

      const formData = new FormData();
      formData.append('name', event.name);
      formData.append('location', event.location || "");
      formData.append('time', new Date(event.time).toISOString());
      formData.append('description', event.description);
      formData.append('audienceType', event.audienceType);
      formData.append('price', event.price);
      formData.append('numberOfTicket', event.numberOfTicket);
      formData.append('type', event.type);
      formData.append('status', event.status);
      formData.append('visible', !event.visible);

      if (event.invitedUsers && Array.isArray(event.invitedUsers)) {
        const invitedUsersArray = event.invitedUsers.map(invite => {
          const userId = typeof invite.user === 'object' ? invite.user._id : invite.user;
          return {
            user: userId,
            status: invite.status || 'pending'
          };
        });
        formData.append('invitedUsers', JSON.stringify(invitedUsersArray));
      } else {
        formData.append('invitedUsers', JSON.stringify([]));
      }

      if (event.images && Array.isArray(event.images)) {
        event.images.forEach(image => {
          formData.append('images', image);
        });
      }

      const result = await dispatch(updateExistingEvent({
        id,
        eventData: formData
      })).unwrap();

      if (result) {
        await dispatch(getEvents({ status: filterStatus, filter: filterType }));
        toast.success(`Event is now ${!event.visible ? 'visible' : 'hidden'}`);
      }
    } catch (error) {
      toast.error(error.message || "Failed to update event visibility");
    }
  };

  const handleUserSelect = (userId) => {
    setSelectedUsers(prev => {
      const isSelected = prev.includes(userId);
      if (isSelected) {
        return prev.filter(id => id !== userId);
      } else {
        return [...prev, userId];
      }
    });
  };

  const handleCreateEvent = async (e) => {
    e.preventDefault();
    try {
      const formDataToSend = new FormData();
      const eventTime = new Date(formData.time).toISOString();
      
      formDataToSend.append('name', formData.name);
      formDataToSend.append('location', formData.location);
      formDataToSend.append('time', eventTime);
      formDataToSend.append('description', formData.description);
      formDataToSend.append('audienceType', formData.audienceType);
      formDataToSend.append('price', formData.price?.toString() || "");
      formDataToSend.append('numberOfTicket', formData.numberOfTicket?.toString() || "");
      formDataToSend.append('type', formData.type);
      formDataToSend.append('status', formData.status);

      const invitedUsersArray = selectedUsers.map(userId => ({
        id: userId,
        status: 'pending'
      }));
      formDataToSend.append('invitedUsers', JSON.stringify(invitedUsersArray));

      if (addEventImages && addEventImages.length > 0) {
        addEventImages.forEach((image) => {
          if (image instanceof File) {
            formDataToSend.append('images', image);
          }
        });
      }

      const result = await dispatch(createNewEvent(formDataToSend)).unwrap();
      if (result) {
        setIsAddEventOpen(false);
        setFormData({
          name: "",
          location: "",
          time: "",
          description: "",
          audienceType: "",
          price: "",
          numberOfTicket: "",
          invitedUsers: [],
          type: "social",
          status: "upcoming"
        });
        setAddEventImages([]);
        setSelectedUsers([]);
        await dispatch(getEvents({ status: filterStatus, filter: filterType }));
        toast.success("Event created successfully");
      }
    } catch (error) {
      toast.error(error.message || "Failed to create event");
    }
  };

  const handleUpdateEvent = async (e) => {
    e.preventDefault();
    try {
      const formDataToSend = new FormData();

      Object.keys(formData).forEach(key => {
        if (key !== "invitedUsers") {
          formDataToSend.append(key, formData[key]);
        }
      });

      const invitedUsersArray = selectedUsers.map(userId => ({
        id: userId,
        status: 'pending'
      }));

      if (selectedEvent?.invitedUsers) {
        selectedEvent.invitedUsers.forEach(invite => {
          const existingUser = invitedUsersArray.find(newInvite => 
            (typeof invite.user === 'object' ? invite.user._id : invite.user) === newInvite.id
          );
          if (existingUser) {
            existingUser.status = invite.status;
          }
        });
      }

      formDataToSend.append('invitedUsers', JSON.stringify(invitedUsersArray));

      if (editEventImages && editEventImages.length > 0) {
        editEventImages.forEach((image) => {
          if (image instanceof File) {
            formDataToSend.append('images', image);
          }
        });
      }

      const result = await dispatch(updateExistingEvent({
        id: selectedEvent._id,
        eventData: formDataToSend
      })).unwrap();

      if (result) {
        setIsEditEventOpen(false);
        setFormData({
          name: "",
          location: "",
          time: "",
          description: "",
          audienceType: "",
          price: "",
          numberOfTicket: "",
          invitedUsers: [],
          type: "social",
          status: "upcoming"
        });
        setEditEventImages([]);
        setSelectedUsers([]);
        await dispatch(getEvents({ status: filterStatus, filter: filterType }));
        toast.success("Event updated successfully");
      }
    } catch (error) {
      toast.error(error.message || "Failed to update event");
    }
  };

  const handleEditClick = (event) => {
    setSelectedEvent(event);
    const formattedDate = new Date(event.time).toISOString().slice(0, 16);
    const locationValue = typeof event.location === 'object' ? 
      event.location.address || event.location || "" : 
      event.location || "";
    
    setFormData({
      name: event.name || "",
      location: locationValue,
      time: formattedDate,
      description: event.description || "",
      audienceType: event.audienceType || "",
      price: event.price?.toString() || "",
      numberOfTicket: event.numberOfTicket?.toString() || "",
      type: event.type || "social",
      status: event.status || "upcoming"
    });
    
    if (event.invitedUsers && Array.isArray(event.invitedUsers)) {
      const selectedUserIds = event.invitedUsers.map(invite => {
        if (invite.user) {
          return typeof invite.user === 'object' ? invite.user._id : invite.user;
        } else if (invite._id) {
          return invite._id;
        }
        return null;
      }).filter(id => id !== null);
      setSelectedUsers(selectedUserIds);
    } else {
      setSelectedUsers([]);
    }
    
    setEditEventImages(event.images || []);
    setIsEditEventOpen(true);
  };

  const handleDeleteEvent = async () => {
    try {
      await dispatch(deleteExistingEvent(selectedEvent._id)).unwrap();
      setIsDeleteModalOpen(false);
      await dispatch(getEvents({ status: filterStatus, filter: filterType }));
      toast.success("Event deleted successfully");
    } catch (error) {
      toast.error(error.message || "Failed to delete event");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const filteredEvents = events
  .filter(event => event && event.name && event.name.toLowerCase().includes(searchQuery.toLowerCase()))
  .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  const timeInputStyle = {
    colorScheme: 'light',
    '&::-webkit-calendar-picker-indicator': {
      filter: 'invert(0.5)'
    }
  };

  const userSelectionSection = (
    <div className="space-y-4">
      <div>
        <label className="block mb-2 text-sm font-medium text-gray-700">Invite Users</label>
          <div className="relative">
          <BiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />
            <input
              type="text"
            placeholder="Search members..."
            className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
            value={userSearchQuery}
            onChange={(e) => setUserSearchQuery(e.target.value)}
            />
          </div>
        </div>
      <div className="max-h-60 overflow-y-auto border border-gray-200 rounded-lg">
        {member_users.map((user) => {
          const isSelected = selectedUsers.includes(user._id);
          let inviteStatus = 'pending';
          
          if (selectedEvent?.invitedUsers) {
            const invitedUser = selectedEvent.invitedUsers.find(invite => {
              const inviteUserId = typeof invite.user === 'object' ? invite.user._id : invite.user;
              return inviteUserId === user._id;
            });
            
            if (invitedUser) {
              inviteStatus = invitedUser.status || 'pending';
            }
          }
          
          return (
            <div
              key={user._id}
              className={`flex items-center gap-3 p-3 hover:bg-gray-50 cursor-pointer transition-colors ${isSelected ? 'bg-gray-50' : ''}`}
              onClick={() => handleUserSelect(user._id)}
            >
              <div className={`flex items-center justify-center h-5 w-5 rounded border ${isSelected ? 'bg-primary border-primary' : 'border-gray-300'}`}>
                {isSelected && (
                  <svg className="h-3 w-3 text-white" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                )}
      </div>
              <img
                src={user.profilePhoto || avat}
                alt={user.forename}
                className="w-9 h-9 rounded-full object-cover"
              />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">{`${user.forename} ${user.surname}`}</p>
                {isSelected && (
                  <p className={`text-xs font-medium ${
                    inviteStatus === 'accepted' ? 'text-green-600' : 
                    inviteStatus === 'declined' ? 'text-red-600' : 
                    'text-yellow-600'
                  }`}>
                    {inviteStatus.charAt(0).toUpperCase() + inviteStatus.slice(1)}
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );

  const getStatusColor = (status) => {
    switch (status) {
      case 'upcoming': return { bg: 'bg-blue-100', text: 'text-blue-800' };
      case 'ongoing': return { bg: 'bg-green-100', text: 'text-green-800' };
      case 'completed': return { bg: 'bg-gray-100', text: 'text-gray-800' };
      case 'cancelled': return { bg: 'bg-red-100', text: 'text-red-800' };
      default: return { bg: 'bg-gray-100', text: 'text-gray-800' };
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'social': return 'bg-purple-100 text-purple-800';
      case 'business': return 'bg-indigo-100 text-indigo-800';
      case 'entertainment': return 'bg-pink-100 text-pink-800';
      case 'sports': return 'bg-orange-100 text-orange-800';
      case 'cultural': return 'bg-amber-100 text-amber-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="flex flex-col h-full overflow-hidden bg-gray-50">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between gap-4 items-start md:items-center p-6 bg-white shadow-sm">
        <div className="flex items-center gap-4">
          <h1 className="text-2xl font-bold text-gray-800">Event Management</h1>
        </div>
        
        <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
        <button
            className="px-6 py-3 bg-primary hover:bg-primary-dark text-white rounded-lg flex items-center gap-2 transition-colors shadow-md hover:shadow-lg"
          onClick={() => setIsAddEventOpen(true)}
        >
          Create Event
            <span className="text-xl font-semibold">+</span>
        </button>
          
          <div className="flex gap-3 flex-wrap">
            <div className="relative flex-1 min-w-[180px]">
            <select
                className="appearance-none w-full px-4 py-2.5 border border-gray-300 rounded-lg text-gray-700 hover:border-gray-400 focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all bg-white shadow-sm"
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
              >
                <option value="all">All Types</option>
                <option value="social">Social</option>
                <option value="business">Business</option>
                <option value="entertainment">Entertainment</option>
                <option value="sports">Sports</option>
                <option value="cultural">Cultural</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2">
                <svg className="w-4 h-4 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
            
            <div className="relative flex-1 min-w-[180px]">
            <select
                className="appearance-none w-full px-4 py-2.5 border border-gray-300 rounded-lg text-gray-700 hover:border-gray-400 focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all bg-white shadow-sm"
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
              >
                <option value="all">All Status</option>
                <option value="upcoming">Upcoming</option>
                <option value="ongoing">Ongoing</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2">
                <svg className="w-4 h-4 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="px-6 py-4 bg-white border-b">
        <div className="relative max-w-2xl">
          <BiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />
          <input
            type="text"
            placeholder="Search events by name..."
            className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Event Grid */}
      <div className="flex-1 overflow-y-auto p-6">
        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
          </div>
        ) : isError ? (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-lg">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-700">{message || "Failed to load events"}</p>
              </div>
            </div>
          </div>
        ) : filteredEvents.length === 0 ? (
          <div className="text-center py-12">
            <div className="inline-block p-6 bg-white rounded-lg shadow-sm">
              <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h3 className="mt-2 text-lg font-medium text-gray-900">No events found</h3>
              <p className="mt-1 text-sm text-gray-500">Try adjusting your search or filter to find what you're looking for.</p>
              <div className="mt-6">
                <button
                  type="button"
                  className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                  onClick={() => setIsAddEventOpen(true)}
                >
                  Create New Event
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-6">
            {filteredEvents.map((event) => (
              <motion.div
                key={event._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="group bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden relative"
              >
                {/* Event Image */}
                <div className="relative h-48 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent z-10" />
                  <img
                    src={event.images && event.images.length > 0 ? event.images[0] : eventImage}
                    alt={event.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  
                  {/* Status Badge */}
                  <div className="absolute top-3 left-3 z-20">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${getStatusColor(event.status).bg} ${getStatusColor(event.status).text}`}>
                      {event.status ? event.status.charAt(0).toUpperCase() + event.status.slice(1) : 'Unknown'}
                    </span>
                  </div>
                  
                  {/* Action Menu */}
                  <div className="absolute top-3 right-3 z-20">
              <button
                      className="p-1.5 bg-white/20 backdrop-blur-sm rounded-lg hover:bg-white/30 transition-colors"
                onClick={(e) => {
                  e.stopPropagation();
                        setIsMenuOpen(isMenuOpen === event._id ? null : event._id);
                }}
              >
                      <BsThreeDotsVertical className="w-4 h-4 text-white" />
              </button>
                    
                    {isMenuOpen === event._id && (
                      <div className="absolute right-0 mt-1 w-48 bg-white rounded-md shadow-lg py-1 z-30">
              <button
                          className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                onClick={(e) => {
                  e.stopPropagation();
                            handleEditClick(event);
                            setIsMenuOpen(null);
                }}
              >
                          <FiEdit className="mr-2" />
                          Edit Event
              </button>
                        <button
                          className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                        onClick={(e) => {
                          e.stopPropagation();
                            handleVisibility(event._id);
                            setIsMenuOpen(null);
                          }}
                        >
                          {event.visible ? (
                            <>
                              <FiEyeOff className="mr-2" />
                              Hide Event
                            </>
                          ) : (
                            <>
                              <FiEye className="mr-2" />
                              Show Event
                            </>
                          )}
                        </button>
                        <button
                          className="flex items-center px-4 py-2 text-sm text-red-600 hover:bg-gray-100 w-full text-left"
                        onClick={(e) => {
                          e.stopPropagation();
                            setSelectedEvent(event);
                            setIsDeleteModalOpen(true);
                            setIsMenuOpen(null);
                          }}
                        >
                          <FiTrash2 className="mr-2" />
                          Delete Event
                        </button>
                      </div>
                    )}
                  </div>
                </div>
                
                {/* Event Details */}
                <div className="p-4">
                  <div className="flex justify-between items-start">
                    <h3 className="text-lg font-semibold text-gray-900 mb-1 truncate">
                      {event.name}
                    </h3>
              </div>
                  
                  <div className="flex items-center text-sm text-gray-500 mb-2">
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getTypeColor(event.type)}`}>
                      {event.type ? event.type.charAt(0).toUpperCase() + event.type.slice(1) : 'Unknown'}
                    </span>
                  </div>
                  
                  <div className="space-y-2 mt-3">
                    <div className="flex items-center text-sm text-gray-600">
                      <BsCalendar className="mr-2 text-gray-500" />
                      <span>{format(parseISO(event.time), 'MMM d, yyyy')}</span>
          </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <MdAccessTime className="mr-2 text-gray-500" />
                      <span>{format(parseISO(event.time), 'h:mm a')}</span>
                    </div>
                    <div className="flex items-start text-sm text-gray-600">
                      <MdLocationOn className="mr-2 mt-0.5 text-gray-500 flex-shrink-0" />
                      <span className="line-clamp-2">
                        {typeof event.location === 'object' ? event.location.address : event.location}
                      </span>
                    </div>
      </div>

                  <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between items-center">
                    <div className="text-sm text-gray-500">
                      {event.audienceType === 'all' ? 'Open to all' : 
                       event.audienceType === 'vip' ? 'VIP Only' : 'Members Only'}
        </div>
                    <div className="text-sm font-medium text-gray-900">
                      {event.price ? `$${event.price}` : 'Free'}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
        </div>
        )}
      </div>

      {/* Add Event Modal */}
      <Modal
        isOpen={isAddEventOpen}
        onRequestClose={() => setIsAddEventOpen(false)}
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-xl shadow-xl w-[95%] md:w-[700px] max-h-[90vh] overflow-y-auto"
        overlayClassName="fixed inset-0 bg-black/50 backdrop-blur-sm z-[1000]"
        style={{
          overlay: { zIndex: 1000 },
          content: { zIndex: 1001 }
        }}
      >
        <div className="p-6">
          <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-200">
            <h2 className="text-2xl font-bold text-gray-800">Create New Event</h2>
            <button
              onClick={() => setIsAddEventOpen(false)}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <FiX className="w-6 h-6" />
            </button>
          </div>

          <form onSubmit={handleCreateEvent} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Event Name */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Event Name *</label>
              <input
                type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                placeholder="Enter event name"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                  required
              />
            </div>

              {/* Location */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Location *</label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  placeholder="Enter event location"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                  required
                />
              </div>

              {/* Time */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Date & Time *</label>
                <div className="relative">
                  <input
                    type="datetime-local"
                    name="time"
                    value={formData.time}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all appearance-none"
                    style={timeInputStyle}
                    required
                  />
                </div>
              </div>

              {/* Event Type */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Event Type *</label>
                <select
                  name="type"
                  value={formData.type}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all bg-white"
                  required
                >
                  <option value="social">Social</option>
                  <option value="business">Business</option>
                  <option value="entertainment">Entertainment</option>
                  <option value="sports">Sports</option>
                  <option value="cultural">Cultural</option>
                </select>
            </div>

              {/* Status */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Status *</label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all bg-white"
                  required
                >
                  <option value="upcoming">Upcoming</option>
                  <option value="ongoing">Ongoing</option>
                  <option value="completed">Completed</option>
                  <option value="cancelled">Cancelled</option>
                </select>
            </div>

              {/* Audience Type */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Audience *</label>
                <select
                  name="audienceType"
                  value={formData.audienceType}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all bg-white"
                  required
                >
                  <option value="">Select audience</option>
                  <option value="all">All Members</option>
                  <option value="vip">VIP Members</option>
                  <option value="members">Regular Members</option>
                </select>
              </div>

              {/* Price */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Price *</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-gray-500">$</span>
                  </div>
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    placeholder="0.00"
                    min="0"
                    step="0.01"
                    className="w-full pl-8 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                    required
                  />
              </div>
            </div>

              {/* Number of Tickets */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Available Tickets *</label>
              <input
                  type="number"
                  name="numberOfTicket"
                  value={formData.numberOfTicket}
                  onChange={handleInputChange}
                  placeholder="Enter number of tickets"
                  min="1"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                  required
                />
              </div>
            </div>

            {/* Event Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Description *</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows={5}
                placeholder="Enter event description..."
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all resize-none"
                required
              />
            </div>

            {/* Event Images */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Event Images</label>
              <div className="flex flex-wrap gap-4">
                <label className="flex flex-col items-center justify-center w-32 h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-gray-400 transition-colors">
                  <FiUpload className="w-8 h-8 text-gray-400 mb-2" />
                  <span className="text-sm text-gray-500 text-center">Upload Image</span>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files[0];
                      if (file) {
                        setAddEventImages((prev) => [...prev, file]);
                      }
                    }}
                  />
                </label>
                {addEventImages.map((image, index) => (
                  <div key={index} className="relative group">
                    <img
                      src={typeof image === "string" ? image : URL.createObjectURL(image)}
                      alt=""
                      className="w-32 h-32 rounded-lg object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        setAddEventImages((prev) => prev.filter((_, i) => i !== index));
                      }}
                      className="absolute top-2 right-2 w-6 h-6 rounded-full bg-red-500 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <FiX className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {userSelectionSection}

            {/* Action Buttons */}
            <div className="flex justify-end gap-3 pt-6 border-t border-gray-200">
              <button
                type="button"
                onClick={() => setIsAddEventOpen(false)}
                className="px-6 py-2.5 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
            <button
                type="submit"
                className="px-6 py-2.5 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors flex items-center gap-2"
            >
                Create Event
            </button>
          </div>
          </form>
                </div>
      </Modal>

      {/* Edit Event Modal */}
      <Modal
        isOpen={isEditEventOpen}
        onRequestClose={() => setIsEditEventOpen(false)}
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-xl shadow-xl w-[95%] md:w-[700px] max-h-[90vh] overflow-y-auto"
        overlayClassName="fixed inset-0 bg-black/50 backdrop-blur-sm z-[1000]"
        style={{
          overlay: { zIndex: 1000 },
          content: { zIndex: 1001 }
        }}
      >
        <div className="p-6">
          <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-200">
            <h2 className="text-2xl font-bold text-gray-800">Edit Event</h2>
            <button
              onClick={() => setIsEditEventOpen(false)}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <FiX className="w-6 h-6" />
            </button>
          </div>

          <form onSubmit={handleUpdateEvent} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Event Name */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Event Name *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Enter event name"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                  required
                />
              </div>

              {/* Location */}
                <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Location *</label>
                  <input
                    type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                    placeholder="Enter event location"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                  required
                  />
                </div>

              {/* Time */}
                <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Date & Time *</label>
                  <div className="relative">
                    <input
                    type="datetime-local"
                    name="time"
                    value={formData.time}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all appearance-none"
                    style={timeInputStyle}
                    required
                  />
                  </div>
                </div>

              {/* Event Type */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Event Type *</label>
                <select
                  name="type"
                  value={formData.type}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all bg-white"
                  required
                >
                  <option value="social">Social</option>
                  <option value="business">Business</option>
                  <option value="entertainment">Entertainment</option>
                  <option value="sports">Sports</option>
                  <option value="cultural">Cultural</option>
                </select>
              </div>

              {/* Status */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Status *</label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all bg-white"
                  required
                >
                  <option value="upcoming">Upcoming</option>
                  <option value="ongoing">Ongoing</option>
                  <option value="completed">Completed</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>

              {/* Audience Type */}
                <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Audience *</label>
                  <select
                  name="audienceType"
                  value={formData.audienceType}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all bg-white"
                  required
                >
                  <option value="">Select audience</option>
                  <option value="all">All Members</option>
                  <option value="vip">VIP Members</option>
                  <option value="members">Regular Members</option>
                  </select>
                </div>

              {/* Price */}
                <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Price *</label>
                  <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-gray-500">$</span>
                  </div>
                    <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    placeholder="0.00"
                    min="0"
                    step="0.01"
                    className="w-full pl-8 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                    required
                  />
                </div>
              </div>

              {/* Number of Tickets */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Available Tickets *</label>
                <input
                  type="number"
                  name="numberOfTicket"
                  value={formData.numberOfTicket}
                  onChange={handleInputChange}
                  placeholder="Enter number of tickets"
                  min="1"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                  required
                />
              </div>
              </div>

            {/* Event Description */}
              <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Description *</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows={5}
                placeholder="Enter event description..."
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all resize-none"
                required
              />
              </div>

            {/* Event Images */}
              <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Event Images</label>
              <div className="flex flex-wrap gap-4">
                <label className="flex flex-col items-center justify-center w-32 h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-gray-400 transition-colors">
                  <FiUpload className="w-8 h-8 text-gray-400 mb-2" />
                  <span className="text-sm text-gray-500 text-center">Upload Image</span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files[0];
                        if (file) {
                        setEditEventImages((prev) => [...prev, file]);
                        }
                      }}
                    />
                  </label>
                  {editEventImages.map((image, index) => (
                  <div key={index} className="relative group">
                      <img
                      src={typeof image === "string" ? image : URL.createObjectURL(image)}
                        alt=""
                      className="w-32 h-32 rounded-lg object-cover"
                      />
                      <button
                      type="button"
                        onClick={() => {
                        setEditEventImages((prev) => prev.filter((_, i) => i !== index));
                        }}
                      className="absolute top-2 right-2 w-6 h-6 rounded-full bg-red-500 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                      <FiX className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

            {userSelectionSection}

              {/* Action Buttons */}
            <div className="flex justify-end gap-3 pt-6 border-t border-gray-200">
                <button
                type="button"
                  onClick={() => setIsEditEventOpen(false)}
                className="px-6 py-2.5 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                type="submit"
                className="px-6 py-2.5 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors flex items-center gap-2"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <span className="inline-block animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white"></span>
                    Updating...
                  </>
                ) : (
                  'Update Event'
                )}
                </button>
              </div>
          </form>
        </div>
      </Modal>

      {/* Delete Event Modal */}
      <Modal
        isOpen={isDeleteModalOpen}
        onRequestClose={() => setIsDeleteModalOpen(false)}
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-xl shadow-xl w-[95%] md:w-[450px]"
        overlayClassName="fixed inset-0 bg-black/50 backdrop-blur-sm z-[1000]"
        style={{
          overlay: { zIndex: 1000 },
          content: { zIndex: 1001 }
        }}
      >
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-full bg-red-100 text-red-500">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <h2 className="text-xl font-bold text-gray-800">Delete Event</h2>
            </div>
            <button
              onClick={() => setIsDeleteModalOpen(false)}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <FiX className="w-6 h-6" />
            </button>
          </div>
          
          <div className="space-y-4">
            <p className="text-gray-600">
              Are you sure you want to delete the event <span className="font-semibold">"{selectedEvent?.name}"</span>? This action cannot be undone.
            </p>
            
            <div className="flex justify-end gap-3 pt-4">
              <button
                onClick={() => setIsDeleteModalOpen(false)}
                className="px-6 py-2.5 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteEvent}
                className="px-6 py-2.5 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                Delete Event
              </button>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Event;