"use client"

import { useState, useEffect, useRef, useMemo } from "react"
import { useDispatch, useSelector } from "react-redux"
import { FiEye, FiEyeOff, FiTrash2 } from "react-icons/fi"
import { BiSearch } from "react-icons/bi"
import { IoCloseOutline } from "react-icons/io5"
import { BsCalendar } from "react-icons/bs"
import { MdAccessTime } from "react-icons/md"
import edit_icon from "../../assets/icons/edit.png"
import { getEvents, updateExistingEvent, deleteExistingEvent } from "../../store/events/eventSlice"
import { memberUsers } from "../../store/users/userSlice"
import authService from "../../store/auth/authService"
import affiliateService from "../../store/affiliate/affiliateService"
import "../layout/forced.css"
import Modal from "react-modal"
import ExportButton from "../ExportButton"
import jsPDF from "jspdf"
import autoTable from "jspdf-autotable"
import { getCompanyInfo } from "../../store/setting/companySlice"
import { getAffiliateById, getAffiliates } from "../../store/affiliate/affiliateSlice"

const PastEventsTab = () => {
  const dispatch = useDispatch()
  const {
    events,
    isLoading: eventsLoading,
    isError: eventsError,
    message: eventsMessage,
  } = useSelector((state) => state.events)
  const { member_users: users, isLoading: usersLoading } = useSelector((state) => state.user)
  const { company } = useSelector((state) => state.company)
  const { affiliate, affiliates } = useSelector((state) => state.affiliate)

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(8)
  const [totalPages, setTotalPages] = useState(1)
  const [affiliateId, setAffiliateId] = useState(null)

  // Modal states
  const [isBreakdownModalOpen, setIsBreakdownModalOpen] = useState(false)
  const [selectedEvent, setSelectedEvent] = useState(null)
  const [isEditEventOpen, setIsEditEventOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [isInvoiceModalOpen, setIsInvoiceModalOpen] = useState(false)

  // Form states
  const [eventImages, setEventImages] = useState([])
  const [searchQuery, setSearchQuery] = useState("")
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
    const sort = currentSort || "all"
    if (affiliateId) {
      dispatch(getEvents({ affiliateId, sort, filter: filterValue }))
    }
    setCurrentFilter(filterValue)
  }

  const handleSortChange = (sortValue) => {
    setShowSortDropdown(false)
    const filter = currentFilter || "all"
    if (affiliateId) {
      dispatch(getEvents({ affiliateId, sort: sortValue, filter }))
    }
    setCurrentSort(sortValue)
  }

  // State for current filter/sort
  const [currentFilter, setCurrentFilter] = useState("all")
  const [currentSort, setCurrentSort] = useState("all")

  // Helper to determine event status
  const getEventStatus = (event) => {
    const now = new Date()
    const eventStart = new Date(event.time)
    const eventEnd = new Date(event.endTime)
    const sevenDaysFromNow = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000)

    if (now > eventEnd) {
      return "completed"
    } else if (now >= eventStart && now <= eventEnd) {
      return "ongoing"
    } else if (eventStart <= sevenDaysFromNow) {
      return "upcoming"
    }
    return "future"
  }

  // Fetch events and users on component mount
  useEffect(() => {
    const fetchAndLoadEvents = async () => {
      try {
        const profile = await authService.getProfile()
        if (profile?.user?._id) {
          const affiliate = await affiliateService.getAffiliateById(profile.user._id)
          if (affiliate?._id) {
            setAffiliateId(affiliate._id)
            dispatch(getEvents({ affiliateId: affiliate._id, status: "Approved", filter: "all" }))
          }
        }
      } catch (error) {
        console.error("Failed to fetch affiliate profile for events:", error)
      }
    }

    fetchAndLoadEvents()
    dispatch(memberUsers({ page: 1, search: "", role: "" }))
    dispatch(getCompanyInfo())
    dispatch(getAffiliates())
  }, [dispatch])

  // Update total pages when events data changes
  useEffect(() => {
    if (events?.pagination) {
      setTotalPages(events.pagination.pages || 1)
    }
  }, [events])

  // Set form data when editing an event
  useEffect(() => {
    if (selectedEvent && isEditEventOpen) {
      let eventTime = new Date()
      let eventEndTime = new Date()
      if (selectedEvent.time) eventTime = new Date(selectedEvent.time)
      if (selectedEvent.endTime) eventEndTime = new Date(selectedEvent.endTime)
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
      if (selectedEvent.images && selectedEvent.images.length > 0) {
        setEventImages(selectedEvent.images)
      } else {
        setEventImages([])
      }
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
    if (formErrors[name]) {
      setFormErrors({ ...formErrors, [name]: "" })
    }
  }

  // Handle image file selection
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files)
    if (files.length > 0) {
      setImageFiles((prevFiles) => [...prevFiles, ...files])
      const newImageUrls = files.map((file) => URL.createObjectURL(file))
      setEventImages((prevImages) => [...prevImages, ...newImageUrls])
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

  // Handle update event submission
  const handleUpdateEvent = () => {
    if (!validateForm() || !selectedEvent) return
    const formData = new FormData()
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
    if (selectedUsers.length > 0) {
      const invitedUsers = selectedUsers.map((user) => ({ user: user._id, status: "pending" }))
      formData.append("invitedUsers", JSON.stringify(invitedUsers))
    }
    if (imageFiles.length > 0) {
      imageFiles.forEach((file) => { formData.append("images", file) })
    }
    if (selectedEvent.visible !== undefined) {
      formData.append("visible", selectedEvent.visible)
    }
    dispatch(updateExistingEvent({ id: selectedEvent._id, eventData: formData })).then((response) => {
      if (response.meta.requestStatus === "fulfilled") {
        setIsEditEventOpen(false)
        if (affiliateId) {
          dispatch(getEvents({ affiliateId, sort: currentSort, filter: currentFilter }))
        }
      }
    })
  }

  // Handle delete event
  const handleDeleteEvent = () => {
    if (!selectedEvent) return
    dispatch(deleteExistingEvent(selectedEvent._id)).then((response) => {
      if (response.meta.requestStatus === "fulfilled") {
        setIsDeleteModalOpen(false)
        if (affiliateId) {
          dispatch(getEvents({ affiliateId, sort: currentSort, filter: currentFilter }))
        }
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
    let startPage = Math.max(1, currentPage - Math.floor(maxVisibleButtons / 2))
    const endPage = Math.min(totalPages, startPage + maxVisibleButtons - 1)
    if (endPage - startPage + 1 < maxVisibleButtons) {
      startPage = Math.max(1, endPage - maxVisibleButtons + 1)
    }
    if (startPage > 1) {
      buttons.push(
        <button key={1} className={`w-8 h-8 flex items-center justify-center rounded-lg transition-colors ${currentPage === 1 ? "bg-primary text-white" : "text-[#323C47] hover:bg-gray-100"}`} onClick={() => setCurrentPage(1)}>
          1
        </button>,
      )
      if (startPage > 2) {
        buttons.push(
          <span key="ellipsis1" className="w-8 h-8 flex items-center justify-center">...</span>,
        )
      }
    }
    for (let i = startPage; i <= endPage; i++) {
      buttons.push(
        <button key={i} className={`w-8 h-8 flex items-center justify-center rounded-lg transition-colors ${currentPage === i ? "bg-primary text-white" : "text-[#323C47] hover:bg-gray-100"}`} onClick={() => setCurrentPage(i)}>
          {i}
        </button>,
      )
    }
    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        buttons.push(
          <span key="ellipsis2" className="w-8 h-8 flex items-center justify-center">...</span>,
        )
      }
      buttons.push(
        <button key={totalPages} className={`w-8 h-8 flex items-center justify-center rounded-lg transition-colors ${currentPage === totalPages ? "bg-primary text-white" : "text-[#323C47] hover:bg-gray-100"}`} onClick={() => setCurrentPage(totalPages)}>
          {totalPages}
        </button>,
      )
    }
    return buttons
  }

  // Close dropdowns when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (!event.target.closest(".relative")) {
        setShowFilterDropdown(false)
        setShowSortDropdown(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [showFilterDropdown, showSortDropdown])

  // Prepare data for export
  const preparedExportData = useMemo(() => {
    if (!events || events.length === 0) {
      return []
    }
    // Add date and time of export
    const now = new Date();
    const dateExported = now.toLocaleDateString();
    const timeExported = now.toLocaleTimeString();
    return events
      .filter((event) => getEventStatus(event) === "completed")
      .map((event) => {
        const ticketsSold = event.invitedUsers?.length || 0
        const price = event.price || 0
        const totalRevenue = ticketsSold * price
        return {
          "Event Name": event.name,
          "Start Date": formatDate(event.time),
          "End Date": formatDate(event.endTime),
          "Tickets Sold": ticketsSold,
          "Price Per Ticket (£)": price.toFixed(2),
          "Total Revenue (£)": totalRevenue.toFixed(2),
          Status: getEventStatus(event),
          "Date Exported": dateExported,
          "Time Exported": timeExported,
        }
      })
  }, [events])

  const downloadInvoicePDF = (event) => {
    const doc = new jsPDF({ orientation: "portrait", unit: "pt", format: "a4" })
    const margin = 40
    let y = margin

    // --- Header Section ---
    // Left: Logo + Company Info
    const logoSize = 48;
    doc.addImage('/logo_white.png', 'PNG', margin, y, logoSize, logoSize)
    doc.setFontSize(16)
    doc.setTextColor('#900C3F')
    doc.text(company.name || 'HEVSUITE', margin + logoSize + 12, y + 18)
    doc.setFontSize(10)
    doc.setTextColor('#666')
    doc.text(company.email || 'info@hevsuite.com', margin + logoSize + 12, y + 34)
    doc.setTextColor('#888')
    doc.text(formatCompanyAddress(company) || '123 Main Street, City, Country', margin + logoSize + 12, y + 48)

    // Right: Receipt Info (top-aligned with logo)
    const pageWidth = doc.internal.pageSize.getWidth();
    const rightX = pageWidth - margin;
    let rightY = y;
    doc.setFontSize(22)
    doc.setTextColor('#900C3F')
    doc.text('Receipt', rightX, rightY + 10, { align: 'right' })
    doc.setFontSize(10)
    doc.setTextColor('#666')
    doc.text(`#RCP-${event._id?.slice(-12).toUpperCase() || 'N/A'}`, rightX, rightY + 28, { align: 'right' })
    doc.setTextColor('#222')
    doc.text(`Bill To: ${(typeof event.affiliatePartner === 'object' ? event.affiliatePartner.businessName || event.affiliatePartner.name : affiliate?.businessName || affiliate?.name) || 'Affiliate'}`, rightX, rightY + 43, { align: 'right' })
    doc.setTextColor('#666')
    doc.text((typeof event.affiliatePartner === 'object' && event.affiliatePartner.businessEmail) ? event.affiliatePartner.businessEmail : (affiliate?.businessEmail || 'affiliate@email.com'), rightX, rightY + 56, { align: 'right' })
    doc.text(`${formatDate(new Date())}, ${formatTime(new Date())}`, rightX, rightY + 69, { align: 'right' })
    // Status badge
    doc.setFillColor(event.balance === 0 ? 46 : 200, event.balance === 0 ? 125 : 160, event.balance === 0 ? 50 : 0)
    doc.roundedRect(rightX - 60, rightY + 75, 60, 20, 6, 6, 'F')
    doc.setFontSize(10)
    doc.setTextColor('#fff')
    doc.text(event.balance === 0 ? 'PAID' : 'UNPAID', rightX - 30, rightY + 90, { align: 'center' })

    // Set y to the lower of left or right section
    y = Math.max(y + logoSize + 20, rightY + 100)
    doc.setDrawColor('#eee')
    doc.line(margin, y, rightX, y)
    y += 20

    // --- Purchase Details ---
    doc.setFontSize(13)
    doc.setTextColor('#900C3F')
    doc.text('Purchase Details', margin, y)
    y += 18
    doc.setFontSize(10)
    doc.setTextColor('#222')
    const ticketsSold = event.invitedUsers?.length || 0;
    const price = event.price || 0;
    const total = ticketsSold * price;
    const commission = total * 0.1;
    const details = [
      ['Tickets Sold', ticketsSold.toString()],
      ['Price per Ticket', `£${price}`],
      ['Total', `£${total.toFixed(2)}`],
      ['Commission (10%)', `£${commission.toFixed(2)}`],
      ['Amount Paid', `£${commission.toFixed(2)}`],
      ['Bank Name', getAffiliateField('bankName')],
      ['Account Number', getAffiliateField('accountNumber')],
    ];
    const labelX = margin;
    const valueX = rightX; // perfectly right-aligned
    details.forEach(([label, value]) => {
      doc.text(label, labelX, y)
      doc.text(value, valueX, y, { align: 'right' })
      y += 18
    })
    y += 10

    // --- Total Amount Paid ---
    doc.setFillColor(245, 245, 245)
    doc.roundedRect(margin, y, pageWidth - margin * 2, 40, 8, 8, 'F')
    doc.setFontSize(14)
    doc.setTextColor('#900C3F')
    doc.text('Total Amount Paid', margin + 10, y + 25)
    doc.setFontSize(20)
    doc.setTextColor('#218838')
    doc.text(`£${commission.toFixed(2)}`, rightX - 10, y + 27, { align: 'right' })
    y += 60

    // --- Footer (centered) ---
    doc.setFontSize(10)
    doc.setTextColor('#222')
    doc.text('Thank you for your purchase!', pageWidth / 2, y, { align: 'center' })
    y += 15
    doc.setTextColor('#666')
    doc.text(`For support or inquiries, contact us at ${company.email || 'support@hevsuite.com'}`, pageWidth / 2, y, { align: 'center' })
    y += 15
    doc.setTextColor('#666')
    doc.text('Hazor Group Ltd', pageWidth / 2, y, { align: 'center' })
    y += 15
    doc.setFontSize(9)
    doc.setTextColor('#888')
    doc.text('HevSuite Club - Building Communities Through Events', pageWidth / 2, y, { align: 'center' })

    doc.save(`receipt_${event._id?.slice(-12).toUpperCase() || 'N/A'}.pdf`)
  }

  // Helper to format company address
  const formatCompanyAddress = (company) => {
    let parts = []
    // if (company.addressLine1) parts.push(company.addressLine1)
    if (company.city) parts.push(company.city)
    if (company.state) parts.push(company.state)
    if (company.country) parts.push(company.country)
    if (company.postcode) parts.push(company.postcode)
    return parts.join(", ")
  }

  // Fetch affiliate partner info when invoice modal opens and selectedEvent.affiliatePartner is a string
  useEffect(() => {
    if (isInvoiceModalOpen && selectedEvent && typeof selectedEvent.affiliatePartner === "string") {
      dispatch(getAffiliateById(selectedEvent.affiliatePartner))
    }
  }, [isInvoiceModalOpen, selectedEvent, dispatch])

  // Helper to get affiliate partner name
  const getAffiliateName = () => {
    if (selectedEvent && typeof selectedEvent.affiliatePartner === "object") {
      return (
        selectedEvent.affiliatePartner.businessName ||
        selectedEvent.affiliatePartner.name ||
        selectedEvent.affiliatePartner.email ||
        "Event Organizer"
      )
    }
    if (affiliate && affiliate._id === selectedEvent?.affiliatePartner) {
      return (
        affiliate.businessName ||
        affiliate.name ||
        affiliate.email ||
        "Event Organizer"
      )
    }
    // Try to find in affiliates array
    if (affiliates && Array.isArray(affiliates)) {
      const found = affiliates.find(a => a._id === selectedEvent?.affiliatePartner)
      if (found) {
        return (
          found.businessName ||
          found.name ||
          found.email ||
          "Event Organizer"
        )
      }
    }
    return "Event Organizer"
  }

  // Helper to get affiliate field (bankName, accountNumber, etc.)
  const getAffiliateField = (field) => {
    if (
      affiliate &&
      (affiliate._id === selectedEvent?.affiliatePartner ||
        affiliate._id === selectedEvent?.affiliatePartner?._id)
    ) {
      if (field === 'bankName') return affiliate[field] || 'Test Bank';
      if (field === 'accountNumber') return affiliate[field] || '123456789';
      return affiliate[field] || 'N/A';
    }
    if (
      selectedEvent &&
      typeof selectedEvent.affiliatePartner === 'object' &&
      selectedEvent.affiliatePartner[field]
    ) {
      if (field === 'bankName') return selectedEvent.affiliatePartner[field] || 'Test Bank';
      if (field === 'accountNumber') return selectedEvent.affiliatePartner[field] || '123456789';
      return selectedEvent.affiliatePartner[field];
    }
    if (field === 'bankName') return 'Test Bank';
    if (field === 'accountNumber') return '123456789';
    return 'N/A';
  };

  // Helper to get affiliate email for Bill To
  const getAffiliateEmail = () => {
    if (
      affiliate &&
      (affiliate._id === selectedEvent?.affiliatePartner ||
        affiliate._id === selectedEvent?.affiliatePartner?._id)
    ) {
      return affiliate.businessEmail || affiliate.email || 'affiliate@email.com';
    }
    if (
      selectedEvent &&
      typeof selectedEvent.affiliatePartner === 'object' &&
      (selectedEvent.affiliatePartner.businessEmail || selectedEvent.affiliatePartner.email)
    ) {
      return selectedEvent.affiliatePartner.businessEmail || selectedEvent.affiliatePartner.email;
    }
    return 'affiliate@email.com';
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-end flex-col md:flex-row gap-2 items-center">
        
        <div className="flex gap-4 relative">
          {/* Audience Type Filter Button */}
          <div className="relative">
            <button
              className="flex items-center border border-gray-300 rounded-lg px-6 py-2.5 bg-white text-gray-500 hover:bg-gray-100 transition-colors focus:outline-none"
              onClick={() => setShowFilterDropdown((prev) => !prev)}
              type="button"
            >
              Audience Type
              <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-.293.707l-6.414 6.414A1 1 0 0013 13.414V19a1 1 0 01-1.447.894l-4-2A1 1 0 017 17v-3.586a1 1 0 00-.293-.707L3.293 6.707A1 1 0 013 6V4z" />
              </svg>
            </button>
            {showFilterDropdown && (
              <div className="absolute z-[100] mt-2 w-40 bg-white border border-gray-200 rounded-lg shadow-lg">
                <button className="block w-full text-left px-4 py-2 hover:bg-gray-100" onClick={() => handleFilterChange("all")}>All</button>
                <button className="block w-full text-left px-4 py-2 hover:bg-gray-100" onClick={() => handleFilterChange("members")}>Members Only</button>
                <button className="block w-full text-left px-4 py-2 hover:bg-gray-100" onClick={() => handleFilterChange("vip")}>VIP Members</button>
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
              <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 7h18M3 12h18M3 17h18" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 10l3 3 3-3" />
              </svg>
            </button>
            {showSortDropdown && (
              <div className="absolute z-[100] mt-2 w-40 bg-white border border-gray-200 rounded-lg shadow-lg">
                <button className="block w-full text-left px-4 py-2 hover:bg-gray-100" onClick={() => handleSortChange("all")}>All</button>
                <button className="block w-full text-left px-4 py-2 hover:bg-gray-100" onClick={() => handleSortChange("latest")}>Latest</button>
                <button className="block w-full text-left px-4 py-2 hover:bg-gray-100" onClick={() => handleSortChange("oldest")}>Oldest</button>
              </div>
            )}
          </div>
        </div>
        <ExportButton data={preparedExportData} fileName="past_events" />
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
        <div className="grid md:grid-cols-4 gap-6 relative">
          {events
            ?.filter((event) => getEventStatus(event) === "completed")
            .map((event) => (
              <div key={event._id} className="relative group">
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
                          <span className="text-[12px]">
                            {formatDate(event.time)} - {formatDate(event.endTime)}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-white/80">
                          <MdAccessTime className="w-4 h-4" />
                          <span className="text-[12px]">
                            {formatTime(event.time)} - {formatTime(event.endTime)}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 text-white/80 cursor-pointer">
                        {event.visible ? <FiEye className="w-7 h-7 text-white" /> : <FiEyeOff className="w-7 h-7 text-white/80" />}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-1 gap-2 mt-2">
                  <button className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg text-sm w-full" onClick={() => {
                    setSelectedEvent(event);
                    setIsInvoiceModalOpen(true);
                  }}>
                    View Invoice
                  </button>
                  <button
                    className="bg-primary text-white px-4 py-2 rounded-lg text-sm w-full"
                    onClick={() => {
                      setSelectedEvent(event)
                      setIsBreakdownModalOpen(true)
                    }}
                  >
                    View Breakdown
                  </button>
                </div>
              </div>
            ))}
        </div>
      )}
      {/* Pagination */}
      {!eventsLoading && !eventsError && events?.length > 0 && (
        <div className="flex w-full overflow-auto items-center justify-between">
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
      <Modal
        isOpen={isBreakdownModalOpen}
        onRequestClose={() => setIsBreakdownModalOpen(false)}
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-1000 superZ bg-white rounded-lg md:w-[600px] w-[95vw] max-h-[80vh] will-change-transform overflow-y-auto"
        overlayClassName="fixed inset-0 bg-black/50 superZ"
        style={{
          overlay: { zIndex: 1000 },
          content: { zIndex: 1001 },
        }}
      >
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">Event Payment Breakdown</h2>
            <button onClick={() => setIsBreakdownModalOpen(false)} className="text-gray-400 hover:text-gray-600">
              ✕
            </button>
          </div>
          {selectedEvent && (
            <div>
              <h3 className="text-lg font-medium mb-4">{selectedEvent.name}</h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="bg-gray-50 p-3 rounded-lg">
                  <p className="text-gray-500">Available Tickets</p>
                  <p className="font-semibold text-lg">{selectedEvent.numberOfTicket || "N/A"}</p>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <p className="text-gray-500">Tickets Sold</p>
                  <p className="font-semibold text-lg">{selectedEvent.invitedUsers?.length || 0}</p>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <p className="text-gray-500">Price Per Ticket</p>
                  <p className="font-semibold text-lg">£{selectedEvent.price || 0}</p>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <p className="text-gray-500">Total Balance</p>
                  <p className="font-semibold text-lg">
                    £{((selectedEvent.invitedUsers?.length || 0) * (selectedEvent.price || 0)).toFixed(2)}
                  </p>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <p className="text-gray-500">Commission</p>
                  <p className="font-semibold text-lg">10%</p>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <p className="text-gray-500">Your Balance</p>
                  <p className="font-semibold text-lg">
                    £{(((selectedEvent.invitedUsers?.length || 0) * (selectedEvent.price || 0)) * 0.1).toFixed(2)}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
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
                <div>
                  <label className="block mb-1">Location</label>
                  <input
                    type="text"
                    name="location"
                    placeholder="Enter event location"
                    className={`w-full px-4 py-2 border rounded-lg text-gray-600 ${
                      formErrors.location ? "border-red-500" : ""
                    }`}
                    value={eventFormData.location}
                    onChange={handleInputChange}
                  />
                  {formErrors.location && <p className="text-red-500 text-xs mt-1">{formErrors.location}</p>}
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
                      className={`w-full px-4 py-2 border rounded-lg text-gray-600 ${
                        formErrors.endTime ? "border-red-500" : ""
                      }`}
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
                  className={`w-full px-4 py-2 border rounded-lg text-gray-600 resize-none ${
                    formErrors.description ? "border-red-500" : ""
                  }`}
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
                      const userList = document.getElementById("edit-user-list")
                      if (userList) {
                        userList.style.display = userList.style.display === "none" ? "block" : "none"
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

      {/* Invoice Modal */}
      <Modal
        isOpen={isInvoiceModalOpen}
        onRequestClose={() => setIsInvoiceModalOpen(false)}
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-1000 bg-white rounded-lg md:w-[600px] w-[95vw] max-h-[90vh] will-change-transform overflow-y-auto shadow-xl border"
        overlayClassName="fixed inset-0 bg-black/50 z-50"
        style={{
          overlay: { zIndex: 1000 },
          content: { zIndex: 1001 },
        }}
      >
        <div className="p-8 flex flex-col items-center justify-center text-center">
          {selectedEvent ? (
            <div className="w-full text-left">
              {/* Header */}
              <div className="flex justify-between items-start mb-6">
                <div className="flex flex-col items-start gap-2">
                  <img src="/logo_white.png" alt="Brand Logo" className="h-12 w-12 object-contain bg-gray-100 rounded-full border mb-2" onError={e => e.target.style.display='none'} />
                  <span className="text-lg font-bold text-gray-800">{company.name || 'HEVSUITE'}</span>
                  <span className="text-sm text-gray-500">{company.email || 'info@hevsuite.com'}</span>
                  <span className="text-xs text-gray-400">{formatCompanyAddress(company) || '123 Main Street, City, Country'}</span>
                </div>
                <div className="text-right">
                  <h2 className="text-2xl font-bold mb-1 text-[#900C3F]">Receipt</h2>
                  <p className="text-xs text-gray-500">#RCP-{selectedEvent._id?.slice(-12).toUpperCase() || 'N/A'}</p>
                  <div className="mt-2 text-xs text-gray-700">
                    <span className="font-semibold">Bill To:</span> <span className="font-bold text-[#900C3F]">{getAffiliateName()}</span><br/>
                    <span>{getAffiliateEmail()}</span><br/>
                    <span>{formatDate(new Date())}, {formatTime(new Date())}</span>
                  </div>
                  <div className="mt-2">
                    <span className="inline-block px-4 py-1 rounded-full text-xs font-semibold bg-green-600 text-white">{selectedEvent.balance === 0 ? 'PAID' : 'UNPAID'}</span>
                  </div>
                </div>
              </div>
              <hr className="my-6 border-gray-200" />
              {/* Purchase Details */}
              <div className="mb-6">
                <h3 className="text-lg font-bold mb-4 text-[#900C3F]">Purchase Details</h3>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Tickets Sold</span>
                    <span className="text-gray-900 font-medium">{selectedEvent.invitedUsers?.length || 0}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Price per Ticket</span>
                    <span className="text-gray-900 font-medium">£{selectedEvent.price || 0}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Total</span>
                    <span className="text-gray-900 font-medium">£{((selectedEvent.invitedUsers?.length || 0) * (selectedEvent.price || 0)).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Commission (10%)</span>
                    <span className="text-gray-900 font-medium">£{(((selectedEvent.invitedUsers?.length || 0) * (selectedEvent.price || 0)) * 0.1).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Amount Paid</span>
                    <span className="text-gray-900 font-medium">£{(((selectedEvent.invitedUsers?.length || 0) * (selectedEvent.price || 0)) * 0.1).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Bank Name</span>
                    <span className="text-gray-900 font-medium">{getAffiliateField('bankName')}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Account Number</span>
                    <span className="text-gray-900 font-medium">{getAffiliateField('accountNumber')}</span>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 rounded-lg p-4 mb-6 flex justify-between items-center">
                <span className="text-lg font-bold text-[#900C3F]">Total Amount Paid</span>
                <span className="text-2xl font-bold text-green-700">£{(((selectedEvent.invitedUsers?.length || 0) * (selectedEvent.price || 0)) * 0.1).toFixed(2)}</span>
              </div>
              <div className="mt-8 text-center text-gray-600 text-sm">
                <p className="mb-1 font-semibold">Thank you for your purchase!</p>
                <p>For support or inquiries, contact us at <a href={`mailto:${company.email || 'support@hevsuite.com'}`} className="text-[#900C3F] underline">{company.email || 'support@hevsuite.com'}</a></p>
                <p className="italic mt-2 text-xs">HevSuite Club - Building Communities Through Events</p>
                <p className="italic mt-2 text-xs">Hazor Group Ltd</p>
              </div>
            </div>
          ) : (
            <p>No event selected.</p>
          )}
          <button
            onClick={() => downloadInvoicePDF(selectedEvent)}
            className="px-6 py-2 bg-green-600 text-white rounded-lg mt-4 mr-2"
          >
            Download Receipt as PDF
          </button>
          <button
            onClick={() => setIsInvoiceModalOpen(false)}
            className="px-6 py-2 bg-primary text-white rounded-lg mt-4"
          >
            Close
          </button>
        </div>
      </Modal>
    </div>
  )
}

export default PastEventsTab
