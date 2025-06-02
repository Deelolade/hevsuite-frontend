"use client"

import { useState, useEffect, useRef } from "react"
import { useDispatch, useSelector } from "react-redux"
import { FiEye, FiEyeOff, FiTrash2 } from "react-icons/fi"
import { BiSearch } from "react-icons/bi"
import { IoCloseOutline } from "react-icons/io5"
import Modal from "react-modal"
import { BsCalendar, BsChevronLeft, BsChevronRight, BsHeart } from "react-icons/bs"
import { MdAccessTime } from "react-icons/md"
import edit_icon from "../../assets/icons/edit.png"
import Profile from "../../components/Profile"
import { getEvents, createNewEvent, updateExistingEvent, deleteExistingEvent } from "../../store/events/eventSlice"
import { memberUsers } from "../../store/users/userSlice"
import "../layout/forced.css"

// Set app element for Modal accessibility
Modal.setAppElement("#root")

const Event = () => {
  const dispatch = useDispatch()
  const {
    events,
    isLoading: eventsLoading,
    isError: eventsError,
    message: eventsMessage,
  } = useSelector((state) => state.events);
  const { member_users: users, isLoading: usersLoading, isError: usersError } = useSelector((state) => state.user)

  // const { events, isLoading: eventsLoading, isError: eventsError, message: eventsMessage } = useSelector((state) => state.events);
  // const { users = [], isLoading: usersLoading, isError: usersError  } = useSelector((state) => state.user || {});

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(8)
  const [totalPages, setTotalPages] = useState(1)

  // Modal states
  const [isAddEventOpen, setIsAddEventOpen] = useState(false)
  const [isViewEventOpen, setIsViewEventOpen] = useState(false)
  const [selectedEvent, setSelectedEvent] = useState(null)
  const [isEditEventOpen, setIsEditEventOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)

  // Form states
  const [eventImages, setEventImages] = useState([])
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState("description")
  const [selectedUsers, setSelectedUsers] = useState([])
  const [eventFormData, setEventFormData] = useState({
    name: "",
    location: "",
    time: new Date().toISOString(),
    endTime: new Date().toISOString(),
    description: "",
    audienceType: "all",
    price: "",
    numberOfTicket: "",
    type: "social",
    status: "upcoming",
  })
  const [formErrors, setFormErrors] = useState({})
  const [imageFiles, setImageFiles] = useState([])

  // Filter and sort states
  const [showFilterDropdown, setShowFilterDropdown] = useState(false)
  const [showSortDropdown, setShowSortDropdown] = useState(false)

  // Filter and sort handlers for new UI
  const handleFilterChange = (filterValue) => {
    setShowFilterDropdown(false)
    const sort = currentSort || 'all'
    dispatch(getEvents({ sort, filter: filterValue }))
    setCurrentFilter(filterValue)
  }

  const handleSortChange = (sortValue) => {
    setShowSortDropdown(false)
    const filter = currentFilter || 'all'
    dispatch(getEvents({ sort: sortValue, filter }))
    setCurrentSort(sortValue)
  }

  // State for current filter/sort
  const [currentFilter, setCurrentFilter] = useState('all')
  const [currentSort, setCurrentSort] = useState('all')

  // State for image slider in event detail modal
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  // Fetch events and users on component mount
  useEffect(() => {
    dispatch(getEvents({ status: "all", filter: "all" }))
    dispatch(memberUsers({ page: 1, search: "", role: "" }))
  }, [dispatch])

  // Update total pages when events data changes
  useEffect(() => {
    if (events?.pagination) {
      setTotalPages(events.pagination.pages || 1)
    }
  }, [events])

  // Reset form data when modal closes
  useEffect(() => {
    if (!isAddEventOpen) {
      setEventFormData({
        name: "",
        location: "",
        time: new Date().toISOString(),
        endTime: new Date().toISOString(),
        description: "",
        audienceType: "all",
        price: "",
        numberOfTicket: "",
        type: "social",
        status: "upcoming",
      })
      setEventImages([])
      setImageFiles([])
      setSelectedUsers([])
      setFormErrors({})
    }
  }, [isAddEventOpen])

  // Set form data when editing an event
  useEffect(() => {
    if (selectedEvent && isEditEventOpen) {
      // Format date and time for input fields
      let eventTime = new Date()
      let eventEndTime = new Date()

      if (selectedEvent.time) {
        eventTime = new Date(selectedEvent.time)
      }
      if (selectedEvent.endTime) {
        eventEndTime = new Date(selectedEvent.endTime)
      }

      setEventFormData({
        name: selectedEvent.name || "",
        location: selectedEvent.location || "",
        time: eventTime.toISOString(),
        endTime: eventEndTime.toISOString(),
        description: selectedEvent.description || "",
        audienceType: selectedEvent.audienceType || "all",
        price: selectedEvent.price || "",
        numberOfTicket: selectedEvent.numberOfTicket || "",
        type: selectedEvent.type || "social",
        status: selectedEvent.status || "upcoming",
      })

      // Set images if available
      if (selectedEvent.images && selectedEvent.images.length > 0) {
        setEventImages(selectedEvent.images)
      } else {
        setEventImages([])
      }

      // Set selected users if available
      if (selectedEvent.invitedUsers && selectedEvent.invitedUsers.length > 0 && users) {
        const invitedUserIds = selectedEvent.invitedUsers.map((invited) =>
          typeof invited.user === "object" ? invited.user._id : invited.user,
        )
        const selectedInvitedUsers = users.filter((user) => invitedUserIds.includes(user._id))
        setSelectedUsers(selectedInvitedUsers)
      } else {
        setSelectedUsers([])
      }
    }
  }, [selectedEvent, isEditEventOpen, users])

  // Reset image index when selectedEvent changes
  useEffect(() => {
    setCurrentImageIndex(0)
  }, [selectedEvent])

  // Filter users based on search query
  const filteredUsers =
    users?.filter((user) => (user.forename + " " + user.surname).toLowerCase().includes(searchQuery.toLowerCase())) ||
    []

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target
    setEventFormData({
      ...eventFormData,
      [name]: value,
    })

    // Clear error for this field if it exists
    if (formErrors[name]) {
      setFormErrors({
        ...formErrors,
        [name]: "",
      })
    }
  }

  // Handle image file selection
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files)
    if (files.length > 0) {
      // Append new files to existing ones
      setImageFiles(prevFiles => [...prevFiles, ...files])

      // Create preview URLs for display and append to existing ones
      const newImageUrls = files.map(file => URL.createObjectURL(file))
      setEventImages(prevImages => [...prevImages, ...newImageUrls])
    }
  }

  // Validate form
  const validateForm = () => {
    const errors = {}
    if (!eventFormData.name.trim()) errors.name = "Event name is required"
    if (!eventFormData.time) errors.time = "Start date and time are required"
    if (!eventFormData.endTime) errors.endTime = "End date and time are required"
    if (new Date(eventFormData.endTime) <= new Date(eventFormData.time)) {
      errors.endTime = "End time must be after start time"
    }
    if (!eventFormData.description.trim()) errors.description = "Description is required"
    if (!eventFormData.location.trim()) errors.location = "Location is required"

    setFormErrors(errors)
    return Object.keys(errors).length === 0
  }

  // Handle event visibility toggle
  const handleVisibility = (id) => {
    const eventToUpdate = events.find((event) => event._id === id)
    if (eventToUpdate) {
      const formData = new FormData()
      formData.append("visible", !eventToUpdate.visible)

      dispatch(
        updateExistingEvent({
          id: eventToUpdate._id,
          eventData: formData,
        }),
      )
    }
  }

  // Handle user selection for event
  const handleCheckboxChange = (user) => {
    setSelectedUsers((prev) =>
      prev.some((u) => u._id === user._id) ? prev.filter((u) => u._id !== user._id) : [...prev, user],
    )
  }

  // Remove user from selected users
  const removeUser = (userId) => {
    setSelectedUsers((prev) => prev.filter((u) => u._id !== userId))
  }

  // Handle create event submission
  const handleCreateEvent = () => {
    if (!validateForm()) return

    const formData = new FormData()

    // Append basic event data
    formData.append("name", eventFormData.name)
    formData.append("location", eventFormData.location)
    formData.append("time", new Date(eventFormData.time).toISOString())
    formData.append("endTime", new Date(eventFormData.endTime).toISOString())
    formData.append("description", eventFormData.description)
    formData.append("audienceType", eventFormData.audienceType)
    formData.append("price", eventFormData.price)
    formData.append("numberOfTicket", eventFormData.numberOfTicket)
    formData.append("type", eventFormData.type)
    formData.append("status", eventFormData.status)

    // Append invited users
    if (selectedUsers.length > 0) {
      const invitedUsers = selectedUsers.map((user) => ({
        user: user._id,
        status: "pending",
      }))
      formData.append("invitedUsers", JSON.stringify(invitedUsers))
    }

    // Append images
    if (imageFiles.length > 0) {
      imageFiles.forEach((file) => {
        formData.append("images", file)
      })
    }

    dispatch(createNewEvent(formData)).then((response) => {
      if (response.meta.requestStatus === "fulfilled") {
        setIsAddEventOpen(false)
        // Refresh events list
        dispatch(getEvents({ status: "all", filter: "all" }))
      }
    })
  }

  // Handle update event submission
  const handleUpdateEvent = () => {
    if (!validateForm() || !selectedEvent) return

    const formData = new FormData()

    // Append basic event data
    formData.append("name", eventFormData.name)
    formData.append("location", eventFormData.location)
    formData.append("time", new Date(eventFormData.time).toISOString())
    formData.append("endTime", new Date(eventFormData.endTime).toISOString())
    formData.append("description", eventFormData.description)
    formData.append("audienceType", eventFormData.audienceType)
    formData.append("price", eventFormData.price)
    formData.append("numberOfTicket", eventFormData.numberOfTicket)
    formData.append("type", eventFormData.type)
    formData.append("status", eventFormData.status)

    // Append invited users
    if (selectedUsers.length > 0) {
      const invitedUsers = selectedUsers.map((user) => ({
        user: user._id,
        status: "pending",
      }))
      formData.append("invitedUsers", JSON.stringify(invitedUsers))
    }

    // Append images
    if (imageFiles.length > 0) {
      imageFiles.forEach((file) => {
        formData.append("images", file)
      })
    }

    // Preserve existing data
    if (selectedEvent.visible !== undefined) {
      formData.append("visible", selectedEvent.visible)
    }

    dispatch(
      updateExistingEvent({
        id: selectedEvent._id,
        eventData: formData,
      }),
    ).then((response) => {
      if (response.meta.requestStatus === "fulfilled") {
        setIsEditEventOpen(false)
        // Refresh events list
        dispatch(getEvents({ status: "all", filter: "all" }))
      }
    })
  }

  // Handle delete event
  const handleDeleteEvent = () => {
    if (!selectedEvent) return

    dispatch(deleteExistingEvent(selectedEvent._id)).then((response) => {
      if (response.meta.requestStatus === "fulfilled") {
        setIsDeleteModalOpen(false)
        setIsViewEventOpen(false)
        // Refresh events list
        dispatch(getEvents({ status: "all", filter: "all" }))
      }
    })
  }

  // Format date for display
  const formatDate = (dateString) => {
    if (!dateString) return ""
    const date = new Date(dateString)
    const options = { year: "numeric", month: "long", day: "numeric" }
    return date.toLocaleDateString("en-US", options)
  }

  // Format time for display
  const formatTime = (dateString) => {
    if (!dateString) return ""
    const date = new Date(dateString)
    return date.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })
  }

  // Generate pagination buttons
  const renderPaginationButtons = () => {
    const buttons = []
    const maxVisibleButtons = 5

    // Calculate range of buttons to show
    let startPage = Math.max(1, currentPage - Math.floor(maxVisibleButtons / 2))
    const endPage = Math.min(totalPages, startPage + maxVisibleButtons - 1)

    // Adjust start if we're near the end
    if (endPage - startPage + 1 < maxVisibleButtons) {
      startPage = Math.max(1, endPage - maxVisibleButtons + 1)
    }

    // First page
    if (startPage > 1) {
      buttons.push(
        <button
          key={1}
          className={`w-8 h-8 flex items-center justify-center rounded-lg transition-colors ${
            currentPage === 1 ? "bg-primary text-white" : "text-[#323C47] hover:bg-gray-100"
          }`}
          onClick={() => setCurrentPage(1)}
        >
          1
        </button>,
      )

      // Ellipsis if needed
      if (startPage > 2) {
        buttons.push(
          <span key="ellipsis1" className="w-8 h-8 flex items-center justify-center">
            ...
          </span>,
        )
      }
    }

    // Page buttons
    for (let i = startPage; i <= endPage; i++) {
      buttons.push(
        <button
          key={i}
          className={`w-8 h-8 flex items-center justify-center rounded-lg transition-colors ${
            currentPage === i ? "bg-primary text-white" : "text-[#323C47] hover:bg-gray-100"
          }`}
          onClick={() => setCurrentPage(i)}
        >
          {i}
        </button>,
      )
    }

    // Last page
    if (endPage < totalPages) {
      // Ellipsis if needed
      if (endPage < totalPages - 1) {
        buttons.push(
          <span key="ellipsis2" className="w-8 h-8 flex items-center justify-center">
            ...
          </span>,
        )
      }

      buttons.push(
        <button
          key={totalPages}
          className={`w-8 h-8 flex items-center justify-center rounded-lg transition-colors ${
            currentPage === totalPages ? "bg-primary text-white" : "text-[#323C47] hover:bg-gray-100"
          }`}
          onClick={() => setCurrentPage(totalPages)}
        >
          {totalPages}
        </button>,
      )
    }

    return buttons
  }

  // Close dropdowns when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (!event.target.closest('.relative')) {
        setShowFilterDropdown(false)
        setShowSortDropdown(false)
      }
    }
    if (showFilterDropdown || showSortDropdown) {
      document.addEventListener('mousedown', handleClickOutside)
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [showFilterDropdown, showSortDropdown])


  // Add this state near the other state declarations
const [locationSuggestions, setLocationSuggestions] = useState([])
const [showSuggestions, setShowSuggestions] = useState(false)
const locationInputRef = useRef(null)

// Add this handler function
const handleLocationChange = async (e) => {
  const { value } = e.target
  handleInputChange(e)
  
  if (value.length > 2) {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(value)}&addressdetails=1&limit=5`
      )
      const data = await response.json()
      setLocationSuggestions(data)
      setShowSuggestions(true)
    } catch (error) {
      console.error("Error fetching location suggestions:", error)
      setLocationSuggestions([])
    }
  } else {
    setLocationSuggestions([])
    setShowSuggestions(false)
  }
}

// Add this suggestion selection handler
const handleSelectSuggestion = (suggestion) => {
  setEventFormData({
    ...eventFormData,
    location: suggestion.display_name,
  })
  setShowSuggestions(false)
  
  if (formErrors.location) {
    setFormErrors({
      ...formErrors,
      location: "",
    })
  }
}

// Add this useEffect for click outside handling
useEffect(() => {
  function handleClickOutside(event) {
    if (locationInputRef.current && !locationInputRef.current.contains(event.target)) {
      setShowSuggestions(false)
    }
    if (!event.target.closest('.relative')) {
      setShowFilterDropdown(false)
      setShowSortDropdown(false)
    }
  }
  
  document.addEventListener('mousedown', handleClickOutside)
  return () => {
    document.removeEventListener('mousedown', handleClickOutside)
  }
}, [showFilterDropdown, showSortDropdown])

  return (
    <div className="md:p-8 space-y-6 md:min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex-1 max-w-2xl mx-auto px-8">
          <div className="relative">
            <BiSearch className="absolute hidden md:flex right-8 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />
            <input
              type="text"
              placeholder="Search events..."
              className="w-full px-8 py-2.5 rounded-full border border-gray-400 focus:outline-none text-sm"
            />
          </div>
        </div>
        <Profile />
      </div>

      <div className="flex justify-between flex-col md:flex-row gap-2 items-center">
        <button
          className="px-6 py-2.5 bg-primary text-white rounded-lg flex items-center gap-2 hover:bg-[#4a0922] transition-colors"
          onClick={() => setIsAddEventOpen(true)}
        >
          Create Event
          <span className="text-xl">+</span>
        </button>
        <div className="flex gap-4">
          {/* Filter Button */}
          <div className="relative">
            <button
              className="flex items-center border border-gray-300 rounded-lg px-6 py-2.5 bg-white text-gray-500 hover:bg-gray-100 transition-colors focus:outline-none"
              onClick={() => setShowFilterDropdown((prev) => !prev)}
              type="button"
            >
              Filter
              <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-.293.707l-6.414 6.414A1 1 0 0013 13.414V19a1 1 0 01-1.447.894l-4-2A1 1 0 017 17v-3.586a1 1 0 00-.293-.707L3.293 6.707A1 1 0 013 6V4z" /></svg>
            </button>
            {showFilterDropdown && (
              <div className="absolute z-10 mt-2 w-40 bg-white border border-gray-200 rounded-lg shadow-lg">
                <button className="block w-full text-left px-4 py-2 hover:bg-gray-100" onClick={() => handleFilterChange('all')}>All</button>
                <button className="block w-full text-left px-4 py-2 hover:bg-gray-100" onClick={() => handleFilterChange('members')}>Members Only</button>
                <button className="block w-full text-left px-4 py-2 hover:bg-gray-100" onClick={() => handleFilterChange('vip')}>VIP Members</button>
            </div>
            )}
          </div>
          {/* Sort By Button */}
          <div className="relative">
            <button
              className="flex items-center border border-gray-300 rounded-lg px-6 py-2.5 bg-white text-gray-500 hover:bg-gray-100 transition-colors focus:outline-none"
              onClick={() => setShowSortDropdown((prev) => !prev)}
              type="button"
            >
              Sort by
              <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 7h18M3 12h18M3 17h18" /><path strokeLinecap="round" strokeLinejoin="round" d="M6 10l3 3 3-3" /></svg>
            </button>
            {showSortDropdown && (
              <div className="absolute z-10 mt-2 w-40 bg-white border border-gray-200 rounded-lg shadow-lg">
                <button className="block w-full text-left px-4 py-2 hover:bg-gray-100" onClick={() => handleSortChange('all')}>All</button>
                <button className="block w-full text-left px-4 py-2 hover:bg-gray-100" onClick={() => handleSortChange('latest')}>Latest</button>
                <button className="block w-full text-left px-4 py-2 hover:bg-gray-100" onClick={() => handleSortChange('oldest')}>Oldest</button>
            </div>
            )}
          </div>
        </div>
      </div>

      {/* Loading State */}
      {eventsLoading && (
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      )}

      {/* Error State */}
      {eventsError && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
          <p>Error loading events: {eventsMessage}</p>
        </div>
      )}

      {/* Event Grid */}
      {!eventsLoading && !eventsError && (
        <div className="grid md:grid-cols-4 gap-6">
          {events?.length > 0 ? (
            events.map((event) => (
              <div
                key={event._id}
                className="relative group"
                onClick={() => {
                  setSelectedEvent(event)
                  setIsViewEventOpen(true)
                }}
              >
                <div className="absolute top-4 flex justify-between w-full gap-2 z-10">
                  <button
                    className="p-2 relative text-white left-4 rounded-lg transition-colors"
                    onClick={(e) => {
                      e.stopPropagation()
                      setSelectedEvent(event)
                      setIsEditEventOpen(true)
                    }}
                  >
                    <img src={edit_icon || "/placeholder.svg"} alt="edit icon" />
                  </button>
                  <button
                    className="p-2 relative right-4 text-white rounded-lg transition-colors"
                    onClick={(e) => {
                      e.stopPropagation()
                      setSelectedEvent(event)
                      setIsDeleteModalOpen(true)
                    }}
                  >
                    <FiTrash2 className="w-5 h-5" />
                  </button>
                </div>
                <div
                  className="relative h-80 rounded-2xl overflow-hidden bg-center bg-cover"
                  style={{
                    backgroundImage:
                      event.images && event.images.length > 0
                        ? `url(${event.images[0]})`
                        : "url(https://via.placeholder.com/400x300?text=No+Image)",
                  }}
                >
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />

                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h3 className="text-xl font-medium text-white mb-2 overflow-hidden text-ellipsis whitespace-nowrap">
                      {event.name}
                    </h3>
                    <div className="flex justify-between gap-4">
                      <div className="flex flex-col gap-4">
                        <div className="flex items-center gap-2 text-white/80">
                          <BsCalendar className="w-4 h-4" />
                          <span className="text-[12px]">{formatDate(event.time)} - {formatDate(event.endTime)}</span>
                        </div>
                        <div className="flex items-center gap-2 text-white/80">
                          <MdAccessTime className="w-4 h-4" />
                          <span className="text-[12px]">{formatTime(event.time)} - {formatTime(event.endTime)}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 text-white/80 cursor-pointer">
                        {event.visible ? (
                          <FiEye
                            className="w-7 h-7 text-white"
                            onClick={(e) => {
                              e.stopPropagation()
                              handleVisibility(event._id)
                            }}
                          />
                        ) : (
                          <FiEyeOff
                            className="w-7 h-7 text-white/80"
                            onClick={(e) => {
                              e.stopPropagation()
                              handleVisibility(event._id)
                            }}
                          />
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-4 text-center py-12">
              <p className="text-gray-500">No events found. Create your first event!</p>
            </div>
          )}
        </div>
      )}

      {/* Pagination */}
      {!eventsLoading && !eventsError && events?.length > 0 && (
        <div className="flex w-[90vw] md:w-full overflow-auto items-center justify-between">
          <div className="flex items-center gap-2 text-[#323C47]">
            Show result:
            <select
              className="px-3 py-1.5 border border-gray-200 rounded-lg focus:outline-none focus:border-gray-300 focus:ring-1 focus:ring-gray-300"
              value={itemsPerPage}
              onChange={(e) => {
                setItemsPerPage(Number(e.target.value))
                setCurrentPage(1)
              }}
            >
              <option value={8}>8</option>
              <option value={12}>12</option>
              <option value={24}>24</option>
            </select>
          </div>
          <div className="flex items-center gap-2">
            <button
              className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            {renderPaginationButtons()}

            <button
              className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
              onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      )}

      {/* Add Event Modal */}
      <Modal
        isOpen={isAddEventOpen}
        onRequestClose={() => setIsAddEventOpen(false)}
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-1000 superZ bg-white rounded-lg md:w-[600px] w-[95vw] max-h-[80vh] will-change-transform overflow-y-auto"
        overlayClassName="fixed inset-0 bg-black/50 superZ"
        style={{
          overlay: { zIndex: 1000 },
          content: { zIndex: 1001 },
        }}
      >
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">Add Event</h2>
            <button onClick={() => setIsAddEventOpen(false)} className="text-gray-400 hover:text-gray-600">
              ✕
            </button>
          </div>

          <div className="space-y-4">
            {/* Event Name */}
            <div>
              <label className="block mb-1">Event Name</label>
              <input
                type="text"
                name="name"
                placeholder="Enter event name"
                className={`w-full px-4 py-2 border rounded-lg text-gray-600 ${formErrors.name ? "border-red-500" : ""}`}
                value={eventFormData.name}
                onChange={handleInputChange}
              />
              {formErrors.name && <p className="text-red-500 text-xs mt-1">{formErrors.name}</p>}
            </div>

            {/* Location and Time */}
            <div className="grid grid-cols-2 gap-4">
            <div className="relative" ref={locationInputRef}>
  <label className="block mb-1">Location</label>
  <input
    type="text"
    name="location"
    placeholder="Enter event location"
    className={`w-full px-4 py-2 border rounded-lg text-gray-600 ${
      formErrors.location ? "border-red-500" : ""
    }`}
    value={eventFormData.location}
    onChange={handleLocationChange}
    autoComplete="off"
  />
  {showSuggestions && locationSuggestions.length > 0 && (
    <ul className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-auto">
      {locationSuggestions.map((suggestion, index) => (
        <li
          key={index}
          className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
          onClick={() => handleSelectSuggestion(suggestion)}
        >
          {suggestion.display_name}
        </li>
      ))}
    </ul>
  )}
  {formErrors.location && (
    <p className="text-red-500 text-xs mt-1">{formErrors.location}</p>
  )}
</div>
              <div>
                <label className="block mb-1">Start Date & Time</label>
                <div className="relative">
                  <input
                    type="datetime-local"
                    name="time"
                    className={`w-full px-4 py-2 border rounded-lg text-gray-600 ${formErrors.time ? "border-red-500" : ""}`}
                    value={eventFormData.time ? new Date(eventFormData.time).toISOString().slice(0, 16) : ""}
                    onChange={handleInputChange}
                  />
                  {formErrors.time && <p className="text-red-500 text-xs mt-1">{formErrors.time}</p>}
                </div>
              </div>
              <div>
                <label className="block mb-1">End Date & Time</label>
                <div className="relative">
                  <input
                    type="datetime-local"
                    name="endTime"
                    className={`w-full px-4 py-2 border rounded-lg text-gray-600 ${formErrors.endTime ? "border-red-500" : ""}`}
                    value={eventFormData.endTime ? new Date(eventFormData.endTime).toISOString().slice(0, 16) : ""}
                    onChange={handleInputChange}
                  />
                  {formErrors.endTime && <p className="text-red-500 text-xs mt-1">{formErrors.endTime}</p>}
                </div>
              </div>
            </div>

            {/* Event Description */}
            <div>
              <label className="block mb-1">Event Description</label>
              <textarea
                rows={6}
                name="description"
                className={`w-full px-4 py-2 border rounded-lg text-gray-600 resize-none ${formErrors.description ? "border-red-500" : ""}`}
                value={eventFormData.description}
                onChange={handleInputChange}
              />
              {formErrors.description && <p className="text-red-500 text-xs mt-1">{formErrors.description}</p>}
            </div>

            {/* Audience Type and Price */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block mb-1">Audience Type</label>
                <select
                  className="w-full px-4 py-2 border rounded-lg text-gray-600 bg-white"
                  name="audienceType"
                  value={eventFormData.audienceType}
                  onChange={handleInputChange}
                >
                  <option value="all">Public</option>
                  <option value="members">Members Only</option>
                  <option value="vip">VIP Members</option>
                </select>
              </div>
              <div>
                <label className="block mb-1">Price</label>
                <div className="relative">
                  <input
                    type="text"
                    name="price"
                    placeholder="Enter the price"
                    className="w-full px-4 py-2 border rounded-lg text-gray-600"
                    value={eventFormData.price}
                    onChange={handleInputChange}
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">£</span>
                </div>
              </div>
            </div>

            {/* No of Tickets */}
            <div>
              <label className="block mb-1">No of Tickets</label>
              <input
                type="text"
                name="numberOfTicket"
                placeholder="Enter the no of tickets"
                className="w-full px-4 py-2 border rounded-lg text-gray-600"
                value={eventFormData.numberOfTicket}
                onChange={handleInputChange}
              />
            </div>

            {/* Attending members */}
            <div>
              <label className="block mb-1">Attending members</label>
              <div className="flex gap-4">
                <div className="relative flex-1">
                  <BiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search members"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border rounded-lg text-gray-600"
                  />
                </div>
                <button className="px-6 py-2 bg-primary text-white rounded-lg">Invite Users</button>
              </div>
              <div>
                {selectedUsers.length > 0 && (
                  <div className="flex flex-wrap p-4 m-2 rounded-lg border-gray-200 border gap-2 mb-2">
                    {selectedUsers.map((user) => (
                      <div
                        key={user._id}
                        className="flex items-center gap-3 pr-3 border border-gray-200 bg-white shadow-2xl rounded-full"
                      >
                        <img
                          src={user.profilePhoto || "https://via.placeholder.com/40"}
                          alt="Avatar"
                          className="w-8 h-8 rounded-full"
                        />
                        <span>
                          {user.forename} {user.surname}
                        </span>
                        <button onClick={() => removeUser(user._id)} className="text-black">
                          ✕
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <div className="border rounded-lg h-[120px] overflow-y-auto">
                {usersLoading ? (
                  <div className="flex justify-center items-center h-full">
                    <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-primary"></div>
                  </div>
                ) : (
                  filteredUsers.map((user) => (
                    <div
                      key={user._id}
                      className={`items-center gap-2 p-2 ${
                        selectedUsers.some((u) => u._id === user._id) ? "hidden" : "flex"
                      }`}
                    >
                      <input
                        type="checkbox"
                        className="mx-2"
                        checked={selectedUsers.some((u) => u._id === user._id)}
                        onChange={() => handleCheckboxChange(user)}
                      />
                      <img
                        src={user.profilePhoto || "https://via.placeholder.com/40"}
                        alt="Avatar"
                        className="w-8 h-8 rounded-full"
                      />
                      <span className="ml-4">
                        {user.forename} {user.surname}
                      </span>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Event Image */}
            <div>
              <label className="block mb-1">Event Image</label>
              <div className="flex gap-4 flex-wrap">
                <label className="w-24 h-24 border-2 border-dashed rounded-lg flex items-center justify-center cursor-pointer hover:bg-gray-50">
                  <span className="text-2xl text-gray-400">+</span>
                  <input type="file" accept="image/*" multiple className="hidden" onChange={handleImageChange} />
                </label>
                {eventImages.map((image, index) => (
                  <div key={index} className="w-24 h-24 rounded-lg overflow-hidden relative group">
                    <img src={image || "/placeholder.svg"} alt="" className="w-full h-full object-cover" />
                    <button
                      onClick={() => {
                        setEventImages((prev) => prev.filter((_, i) => i !== index))
                        setImageFiles((prev) => prev.filter((_, i) => i !== index))
                      }}
                      className="absolute top-1 right-1 w-6 h-6 rounded-full bg-red-500 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end gap-3 pt-4">
              <button onClick={() => setIsAddEventOpen(false)} className="px-6 py-2 border rounded-lg">
                Cancel
              </button>
              <button
                className="px-6 py-2 bg-primary text-white rounded-lg"
                onClick={handleCreateEvent}
                disabled={eventsLoading}
              >
                {eventsLoading ? "Creating..." : "Create Event"}
              </button>
            </div>
          </div>
        </div>
      </Modal>

      {/* View Event Modal */}
      <Modal
        isOpen={isViewEventOpen}
        onRequestClose={() => setIsViewEventOpen(false)}
        className="absolute top-1/2 left-1/2 md:left-auto md:-translate-x-0 md:right-0 transform -translate-x-1/2 -translate-y-1/2 z-100 bg-white rounded-3xl w-[90%] max-w-7xl md:w-[75%] overflow-hidden"
        overlayClassName="fixed inset-0 bg-black/50 z-50"
        style={{
          overlay: { zIndex: 1000 },
          content: { zIndex: 1001 },
        }}
      >
        {selectedEvent && (
          <div className="flex md:h-full h-[80vh] overflow-auto flex-col md:flex-row">
            {/* Left side - Image */}
            <div className="w-full md:w-5/12 relative bg-black">
              <div className="absolute top-6 left-6 flex items-center gap-2 text-white z-10">
                <BsChevronLeft size={20} className="cursor-pointer" onClick={() => setIsViewEventOpen(false)} />
                <span>Event Details</span>
              </div>
              <div className="relative h-[300px] md:h-[600px] overflow-y-auto">
                {selectedEvent.images && selectedEvent.images.length > 0 ? (
                  <>
                    <img
                      src={selectedEvent.images[currentImageIndex]}
                  alt={selectedEvent.name}
                  className="w-full h-full object-cover opacity-90"
                />
                    {selectedEvent.images.length > 1 && (
                      <>
                        <button
                          className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center z-10"
                          onClick={e => {
                            e.stopPropagation();
                            setCurrentImageIndex((prev) => prev === 0 ? selectedEvent.images.length - 1 : prev - 1)
                          }}
                        >
                    <BsChevronLeft className="text-white text-xl" />
                  </button>
                        <button
                          className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center z-10"
                          onClick={e => {
                            e.stopPropagation();
                            setCurrentImageIndex((prev) => prev === selectedEvent.images.length - 1 ? 0 : prev + 1)
                          }}
                        >
                    <BsChevronRight className="text-white text-xl" />
                  </button>
                      </>
                    )}
                  </>
                ) : (
                  <img
                    src="https://via.placeholder.com/800x600?text=No+Image"
                    alt={selectedEvent.name}
                    className="w-full h-full object-cover opacity-90"
                  />
                )}
                <div className="absolute top-6 right-6">
                  <button className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center">
                    <BsHeart className="text-white text-xl" />
                  </button>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-4 md:p-8 bg-gradient-to-t from-black to-transparent">
                  <div className="text-3xl md:text-5xl font-bold text-white mb-2 md:mb-4">
                    {selectedEvent.price || "50"}£
                  </div>
                  <div className="inline-block px-3 py-1 md:px-4 md:py-1.5 rounded-full border-2 border-[#540A26] text-white mb-3 md:mb-6 text-sm md:text-base">
                    {selectedEvent.audienceType === "member"
                      ? "Members Only"
                      : selectedEvent.audienceType === "vip"
                        ? "VIP Members"
                        : "Public"}
                  </div>
                  <div className="flex items-center gap-3 md:gap-6 text-white mb-2 md:mb-4 text-sm md:text-base">
                    <div className="flex items-center gap-2">
                      <BsCalendar />
                      <span>{formatDate(selectedEvent.time)} - {formatDate(selectedEvent.endTime)}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MdAccessTime />
                      <span>{formatTime(selectedEvent.time)} - {formatTime(selectedEvent.endTime)}</span>
                    </div>
                  </div>
                  <p className="text-white/70 text-xs md:text-sm mb-3 md:mb-6">
                    {selectedEvent.status === "upcoming"
                      ? "Upcoming Event"
                      : selectedEvent.status === "ongoing"
                        ? "Ongoing Event"
                        : "Completed Event"}
                  </p>
                  <div className="flex gap-3">
                    <button
                      onClick={() => {
                        setIsViewEventOpen(false)
                        setIsEditEventOpen(true)
                      }}
                      className="flex-1 py-2 md:py-4 bg-white text-[#540A26] rounded-xl text-sm md:text-lg font-medium"
                    >
                      Edit Event
                    </button>
                    <button
                      onClick={() => {
                        setIsViewEventOpen(false)
                        setIsDeleteModalOpen(true)
                      }}
                      className="flex-1 py-2 md:py-4 bg-gradient-to-r from-[#540A26] to-[#540A26] text-white rounded-xl text-sm md:text-lg font-medium"
                    >
                      Delete Event
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Right side - Details */}
            <div className="w-full md:w-7/12 overflow-y-auto max-h-[80vh] will-change-transform">
              <div className="border-b">
                <div className="flex overflow-x-auto">
                  <button
                    className={`px-4 md:px-8 py-3 md:py-4 whitespace-nowrap ${
                      activeTab === "description" ? "bg-[#540A26] text-white" : "bg-white text-black"
                    }`}
                    onClick={() => setActiveTab("description")}
                  >
                    Event Description
                  </button>
                  <button
                    className={`px-4 md:px-8 py-3 md:py-4 whitespace-nowrap ${
                      activeTab === "location" ? "bg-[#540A26] text-white" : "bg-white text-black"
                    }`}
                    onClick={() => setActiveTab("location")}
                  >
                    Location
                  </button>
                  <button
                    className={`px-4 md:px-8 py-3 md:py-4 whitespace-nowrap ${
                      activeTab === "members" ? "bg-[#540A26] text-white" : "bg-white text-black"
                    }`}
                    onClick={() => setActiveTab("members")}
                  >
                    Attending Members
                  </button>
                </div>
              </div>

              <div className="p-4 md:p-8">
                {activeTab === "description" && (
                  <div>
                    <h2 className="text-2xl md:text-[40px] font-bold mb-2 md:mb-4 text-black font-primary">
                      {selectedEvent.name}
                    </h2>
                    <div
                      className="text-gray-600 mb-4 md:mb-6 text-sm md:text-base"
                      dangerouslySetInnerHTML={{ __html: selectedEvent.description }}
                    />
                    <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                      <h3 className="font-semibold text-lg mb-2">Event Details</h3>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-gray-500">Type</p>
                          <p className="capitalize">{selectedEvent.type || "Social"}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Status</p>
                          <p className="capitalize">{selectedEvent.status || "Upcoming"}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Tickets Available</p>
                          <p>{selectedEvent.numberOfTicket || "100"}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Audience</p>
                          <p className="capitalize">
                            {selectedEvent.audienceType === "all"
                              ? "Public"
                              : selectedEvent.audienceType === "member"
                                ? "Members Only"
                                : "VIP Members"}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === "location" && (
                  <div>
                    <h2 className="text-2xl md:text-[40px] font-bold mb-2 md:mb-4 text-black font-primary">
                      Event Location
                    </h2>
                    <div className="h-[300px] md:h-[400px] bg-gray-100 rounded-lg mb-4 flex items-center justify-center overflow-hidden">
                      <iframe
                        width="100%"
                        height="100%"
                        style={{ border: 0, borderRadius: '12px' }}
                        loading="lazy"
                        allowFullScreen
                        src={`https://www.google.com/maps?q=${encodeURIComponent(selectedEvent.location)}&output=embed`}
                        title="Event Location Map"
                      ></iframe>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600 mb-2">
                      <svg
                        className="w-5 h-5 text-[#540A26]"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                        ></path>
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                        ></path>
                      </svg>
                      <span>{selectedEvent.location || "No location specified"}</span>
                    </div>
                  </div>
                )}

                {activeTab === "members" && (
                  <div className="space-y-4">
                    <h2 className="text-2xl md:text-[40px] font-bold mb-2 md:mb-4 text-black font-primary">
                      Attending Members
                    </h2>
                    {usersLoading ? (
                      <div className="flex justify-center items-center py-12">
                        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
                      </div>
                    ) : (
                      <>
                        {selectedEvent.invitedUsers && selectedEvent.invitedUsers.length > 0 ? (
                          selectedEvent.invitedUsers.map((invite, index) => {
                            const user = users?.find(
                              (u) => u._id === (typeof invite.user === "object" ? invite.user._id : invite.user),
                            )
                            if (!user) return null

                            return (
                              <div key={index} className="flex items-center gap-4 border-b pb-3">
                                <img
                                  src={user.profilePhoto || "https://via.placeholder.com/40"}
                                  alt={`${user.forename} ${user.surname}`}
                                  className="w-10 h-10 md:w-12 md:h-12 rounded-full"
                                />
                                <div>
                                  <h3 className="font-semibold text-black text-sm md:text-base">
                                    {user.forename} {user.surname}
                                  </h3>
                                  <p className="text-gray-600 text-xs md:text-sm">
                                    Status: <span className="capitalize">{invite.status}</span>
                                  </p>
                                </div>
                              </div>
                            )
                          })
                        ) : (
                          <p className="text-gray-500">No members have been invited to this event yet.</p>
                        )}
                      </>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </Modal>

      {/* Edit Event Modal */}
      <Modal
        isOpen={isEditEventOpen}
        onRequestClose={() => setIsEditEventOpen(false)}
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-100 bg-white rounded-lg md:w-[600px] w-[90vw] max-h-[80vh] will-change-transform overflow-y-auto"
        overlayClassName="fixed inset-0 bg-black/50 z-50"
        style={{
          overlay: { zIndex: 1000 },
          content: { zIndex: 1001 },
        }}
      >
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">Edit Event</h2>
            <button onClick={() => setIsEditEventOpen(false)} className="text-gray-400 hover:text-gray-600">
              <IoCloseOutline size={24} />
            </button>
          </div>

          {selectedEvent && (
            <div className="space-y-4">
              {/* Event Name */}
              <div>
                <label className="block mb-1">Event Name</label>
                <input
                  type="text"
                  name="name"
                  placeholder="Enter event name"
                  className={`w-full px-4 py-2 border rounded-lg text-gray-600 ${formErrors.name ? "border-red-500" : ""}`}
                  value={eventFormData.name}
                  onChange={handleInputChange}
                />
                {formErrors.name && <p className="text-red-500 text-xs mt-1">{formErrors.name}</p>}
              </div>

              {/* Location and Time */}
              <div className="grid grid-cols-2 gap-4">
              <div className="relative" ref={locationInputRef}>
  <label className="block mb-1">Location</label>
  <input
    type="text"
    name="location"
    placeholder="Enter event location"
    className={`w-full px-4 py-2 border rounded-lg text-gray-600 ${
      formErrors.location ? "border-red-500" : ""
    }`}
    value={eventFormData.location}
    onChange={handleLocationChange}
    autoComplete="off"
  />
  {showSuggestions && locationSuggestions.length > 0 && (
    <ul className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-auto">
      {locationSuggestions.map((suggestion, index) => (
        <li
          key={index}
          className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
          onClick={() => handleSelectSuggestion(suggestion)}
        >
          {suggestion.display_name}
        </li>
      ))}
    </ul>
  )}
  {formErrors.location && (
    <p className="text-red-500 text-xs mt-1">{formErrors.location}</p>
  )}
</div>
                <div>
                  <label className="block mb-1">Start Date & Time</label>
                  <div className="relative">
                    <input
                      type="datetime-local"
                      name="time"
                      className={`w-full px-4 py-2 border rounded-lg text-gray-600 ${formErrors.time ? "border-red-500" : ""}`}
                      value={eventFormData.time ? new Date(eventFormData.time).toISOString().slice(0, 16) : ""}
                      onChange={handleInputChange}
                    />
                    {formErrors.time && <p className="text-red-500 text-xs mt-1">{formErrors.time}</p>}
                  </div>
                </div>
                <div>
                  <label className="block mb-1">End Date & Time</label>
                  <div className="relative">
                    <input
                      type="datetime-local"
                      name="endTime"
                      className={`w-full px-4 py-2 border rounded-lg text-gray-600 ${formErrors.endTime ? "border-red-500" : ""}`}
                      value={eventFormData.endTime ? new Date(eventFormData.endTime).toISOString().slice(0, 16) : ""}
                      onChange={handleInputChange}
                    />
                    {formErrors.endTime && <p className="text-red-500 text-xs mt-1">{formErrors.endTime}</p>}
                  </div>
                </div>
              </div>

              {/* Event Description */}
              <div>
                <label className="block mb-1">Event Description</label>
                <textarea
                  rows={6}
                  name="description"
                  placeholder="Enter event description"
                  className={`w-full px-4 py-2 border rounded-lg text-gray-600 resize-none ${formErrors.description ? "border-red-500" : ""}`}
                  value={eventFormData.description}
                  onChange={handleInputChange}
                />
                {formErrors.description && <p className="text-red-500 text-xs mt-1">{formErrors.description}</p>}
              </div>

              {/* Audience Type and Price */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block mb-1">Audience Type</label>
                  <select
                    className="w-full px-4 py-2 border rounded-lg text-gray-600 bg-white"
                    name="audienceType"
                    value={eventFormData.audienceType}
                    onChange={handleInputChange}
                  >
                    <option value="all">Public</option>
                    <option value="member">Members Only</option>
                    <option value="vip">VIP Members</option>
                  </select>
                </div>
                <div>
                  <label className="block mb-1">Price</label>
                  <div className="relative">
                    <input
                      type="text"
                      name="price"
                      placeholder="Enter the price"
                      className="w-full px-4 py-2 border rounded-lg text-gray-600"
                      value={eventFormData.price}
                      onChange={handleInputChange}
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">£</span>
                  </div>
                </div>
              </div>

              {/* No of Tickets */}
              <div>
                <label className="block mb-1">No of Tickets</label>
                <input
                  type="text"
                  name="numberOfTicket"
                  placeholder="Enter the no of tickets"
                  className="w-full px-4 py-2 border rounded-lg text-gray-600"
                  value={eventFormData.numberOfTicket}
                  onChange={handleInputChange}
                />
              </div>

              {/* Attending members */}
              <div>
                <label className="block mb-1">Attending members</label>
                <div className="flex gap-4">
                  <div className="relative flex-1">
                    <BiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search members"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border rounded-lg text-gray-600"
                    />
                  </div>
                  <button 
                    className="px-6 py-2 bg-primary text-white rounded-lg"
                    onClick={() => {
                      // Show the user list if it's not already visible
                      const userList = document.getElementById('edit-user-list');
                      if (userList) {
                        userList.style.display = userList.style.display === 'none' ? 'block' : 'none';
                      }
                    }}
                  >
                    Invite Users
                  </button>
                </div>
                <div className="mt-2 border rounded-lg p-4">
                  {/* Attending Members List */}
                  <div className="flex flex-wrap gap-2">
                    {selectedUsers.map((user) => (
                      <div key={user._id} className="flex items-center gap-2 bg-gray-50 px-3 py-1.5 rounded-full">
                        <img
                          src={user.profilePhoto || "https://via.placeholder.com/40"}
                          alt={`${user.forename} ${user.surname}`}
                          className="w-6 h-6 rounded-full"
                        />
                        <span className="text-sm">
                          {user.forename} {user.surname}
                        </span>
                        <button className="text-gray-400 hover:text-gray-600" onClick={() => removeUser(user._id)}>
                          <IoCloseOutline size={18} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
                <div id="edit-user-list" className="border rounded-lg h-[120px] overflow-y-auto mt-2">
                  {usersLoading ? (
                    <div className="flex justify-center items-center h-full">
                      <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-primary"></div>
                    </div>
                  ) : (
                    filteredUsers.map((user) => (
                      <div
                        key={user._id}
                        className={`items-center gap-2 p-2 ${
                          selectedUsers.some((u) => u._id === user._id) ? "hidden" : "flex"
                        }`}
                      >
                        <input
                          type="checkbox"
                          className="mx-2"
                          checked={selectedUsers.some((u) => u._id === user._id)}
                          onChange={() => handleCheckboxChange(user)}
                        />
                        <img
                          src={user.profilePhoto || "https://via.placeholder.com/40"}
                          alt="Avatar"
                          className="w-8 h-8 rounded-full"
                        />
                        <span className="ml-4">
                          {user.forename} {user.surname}
                        </span>
                      </div>
                    ))
                  )}
                </div>
              </div>

              {/* Event Image */}
              <div>
                <label className="block mb-1">Event Image</label>
                <div className="flex gap-4 flex-wrap">
                  <label className="w-24 h-24 border-2 border-dashed rounded-lg flex items-center justify-center cursor-pointer hover:bg-gray-50">
                    <span className="text-2xl text-gray-400">+</span>
                    <input type="file" accept="image/*" multiple className="hidden" onChange={handleImageChange} />
                  </label>
                  {eventImages.map((image, index) => (
                    <div key={index} className="w-24 h-24 rounded-lg overflow-hidden relative group">
                      <img src={image || "/placeholder.svg"} alt="" className="w-full h-full object-cover" />
                      <button
                        onClick={() => {
                          setEventImages((prev) => prev.filter((_, i) => i !== index))
                          setImageFiles((prev) => prev.filter((_, i) => i !== index))
                        }}
                        className="absolute top-1 right-1 w-6 h-6 rounded-full bg-red-500 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end gap-3 pt-4">
                <button onClick={() => setIsEditEventOpen(false)} className="px-6 py-2 border rounded-lg">
                  Cancel
                </button>
                <button
                  className="px-6 py-2 bg-primary text-white rounded-lg"
                  onClick={handleUpdateEvent}
                  disabled={eventsLoading}
                >
                  {eventsLoading ? "Updating..." : "Update Event"}
                </button>
              </div>
            </div>
          )}
        </div>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={isDeleteModalOpen}
        onRequestClose={() => setIsDeleteModalOpen(false)}
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-100 bg-white rounded-lg w-[450px]"
        overlayClassName="fixed inset-0 bg-black/50 z-50"
        style={{
          overlay: { zIndex: 1000 },
          content: { zIndex: 1001 },
        }}
      >
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <span className="text-red-500">⚠</span>
              Remove Event
            </h2>
            <button onClick={() => setIsDeleteModalOpen(false)} className="text-gray-400 hover:text-gray-600">
              ✕
            </button>
          </div>
          <div className="space-y-6">
            <p className="text-gray-600">Are you sure you want to remove this event? This action cannot be undone.</p>
            <div className="flex justify-end gap-3">
              <button onClick={() => setIsDeleteModalOpen(false)} className="px-6 py-2 border rounded-lg text-sm">
                Cancel
              </button>
              <button
                onClick={handleDeleteEvent}
                className="px-6 py-2 bg-primary text-white rounded-lg text-sm"
                disabled={eventsLoading}
              >
                {eventsLoading ? "Removing..." : "Remove"}
              </button>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  )
}

export default Event
