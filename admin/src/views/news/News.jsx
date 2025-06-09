"use client"

import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getAllNews, createNews, updateNews, deleteNews, reset, postNewsViaEmail } from "../../store/news/newsSlice"
import eventImage from "../../assets/event.png"
import Profile from "../../components/Profile"
import { BiSearch } from "react-icons/bi"
import Modal from "react-modal"
import { BsCalendar } from "react-icons/bs"
import { FiTrash2 } from "react-icons/fi"
import { IoCloseOutline } from "react-icons/io5"
import edit_icon from "../../assets/icons/edit.png"
import send_icon from "../../assets/icons/send.png"
import star_icon from "../../assets/icons/star.png"
import book_icon from "../../assets/icons/read.png"
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"
import toast from "react-hot-toast"
import newsService from "../../store/news/newsService"

// Set app element for Modal accessibility
Modal.setAppElement("#root")

const News = () => {
  const dispatch = useDispatch()
  const { news, isLoading, isSuccess, isError, message } = useSelector((state) => state.news)

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(6)
  const [totalPages, setTotalPages] = useState(1)

  // Search and filter state
  const [searchQuery, setSearchQuery] = useState("")
  const [filterType, setFilterType] = useState("all")
  const [sortType, setSortType] = useState("latest")

  // Modal states
  const [isAddNewsOpen, setIsAddNewsOpen] = useState(false)
  const [isEditNewsOpen, setIsEditNewsOpen] = useState(false)
  const [selectedNews, setSelectedNews] = useState(null)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [isViewNewsOpen, setIsViewNewsOpen] = useState(false)
  const [isPostModalOpen, setIsPostModalOpen] = useState(false)

  // Form states
  const [imageFiles, setImageFiles] = useState([])
  const [addNewsImages, setAddNewsImages] = useState([])
  const [editNewsImages, setEditNewsImages] = useState([])
  const [videoFiles, setVideoFiles] = useState([])
  const [addNewsVideos, setAddNewsVideos] = useState([])
  const [editNewsVideos, setEditNewsVideos] = useState([])
  const [receiverEmail, setReceiverEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [newsFormData, setNewsFormData] = useState({
    title: "",
    expireDate: "",
    audienceType: "",
    description: "",
    isOnLandingPage: false,
    isSpotlightNews: false,
  })
  const [formErrors, setFormErrors] = useState({})

  // Dropdown states for filter and sort
  const [showFilterDropdown, setShowFilterDropdown] = useState(false)
  const [showSortDropdown, setShowSortDropdown] = useState(false)

  // Handlers for filter and sort
  const handleFilterChange = (value) => {
    setShowFilterDropdown(false)
    setFilterType(value)
    setCurrentPage(1)
  }
  const handleSortChange = (value) => {
    setShowSortDropdown(false)
    setSortType(value)
    setCurrentPage(1)
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

  // Fetch news on component mount and when filters change
  useEffect(() => {
    dispatch(
      getAllNews({
        page: currentPage,
        limit: itemsPerPage,
        search: searchQuery,
        filter: filterType,
        sort: sortType,
      }),
    )
  }, [dispatch, currentPage, itemsPerPage, searchQuery, filterType, sortType])

  // Update total pages when news data changes
  useEffect(() => {
    if (news?.pagination) {
      setTotalPages(news.pagination.pages || 1)
    }
  }, [news])

  // Reset form when modal closes
  useEffect(() => {
    if (!isAddNewsOpen) {
      setNewsFormData({
        title: "",
        expireDate: "",
        audienceType: "",
        description: "",
        isOnLandingPage: false,
        isSpotlightNews: false,
      })
      setAddNewsImages([])
      setImageFiles([])
      setFormErrors({})
      setAddNewsVideos([])
      setVideoFiles([])
    }
  }, [isAddNewsOpen])

  // Reset Redux state when component unmounts
  useEffect(() => {
    return () => {
      dispatch(reset())
    }
  }, [dispatch])

  // Set form data when editing news
  useEffect(() => {
    if (selectedNews && isEditNewsOpen) {
      // Format the date properly for the date input field
      let formattedExpireDate = ""
      if (selectedNews.expireDate) {
        // Convert to YYYY-MM-DD format for date input
        const date = new Date(selectedNews.expireDate)
        formattedExpireDate = date.toISOString().split("T")[0]
      }

      setNewsFormData({
        title: selectedNews.title || "",
        expireDate: formattedExpireDate,
        audienceType: selectedNews.audienceType || "",
        description: selectedNews.description || "",
        isOnLandingPage: selectedNews.isOnLandingPage || false,
        isSpotlightNews: selectedNews.isSpotlightNews || false,
      })

      // Set images if available
      if (selectedNews.images && selectedNews.images.length > 0) {
        setEditNewsImages(selectedNews.images)
      } else {
        setEditNewsImages([])
      }

      // Set videos if available
      if (selectedNews.videos && selectedNews.videos.length > 0) {
        setEditNewsVideos(selectedNews.videos)
      } else {
        setEditNewsVideos([])
      }

      // Reset image files when editing a new news item
      setImageFiles([])
      setVideoFiles([])
    }
  }, [selectedNews, isEditNewsOpen])

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    setNewsFormData({
      ...newsFormData,
      [name]: type === "checkbox" ? checked : value,
    })

    // Clear error for this field if it exists
    if (formErrors[name]) {
      setFormErrors({
        ...formErrors,
        [name]: "",
      })
    }
  }

  // Handle image file selection for new news
  const handleAddImageChange = (e) => {
    const files = Array.from(e.target.files)
    if (files.length > 0) {
      setImageFiles((prevFiles) => [...prevFiles, ...files])
      // Create preview URLs for display
      const imageUrls = files.map((file) => URL.createObjectURL(file))
      setAddNewsImages((prevImages) => [...prevImages, ...imageUrls])
    }
  }

  // Handle video file selection for new news
  const handleAddVideoChange = (e) => {
    const files = Array.from(e.target.files)
    if (files.length > 0) {
      setVideoFiles((prevFiles) => [...prevFiles, ...files])
      const videoUrls = files.map((file) => URL.createObjectURL(file))
      setAddNewsVideos((prevVideos) => [...prevVideos, ...videoUrls])
    }
  }

  // Handle image file selection for edit news
  const handleEditImageChange = (e) => {
    const files = Array.from(e.target.files)
    if (files.length > 0) {
      setImageFiles((prevFiles) => [...prevFiles, ...files])
      const imageUrls = files.map((file) => URL.createObjectURL(file))
      setEditNewsImages((prevImages) => [...prevImages, ...imageUrls])
    }
  }

  // Handle video file selection for edit news
  const handleEditVideoChange = (e) => {
    const files = Array.from(e.target.files)
    if (files.length > 0) {
      setVideoFiles((prevFiles) => [...prevFiles, ...files])
      const videoUrls = files.map((file) => URL.createObjectURL(file))
      setEditNewsVideos((prevVideos) => [...prevVideos, ...videoUrls])
    }
  }

  // Validate form
  const validateForm = () => {
    const errors = {}
    if (!newsFormData.title.trim()) errors.title = "Title is required"
    if (!newsFormData.expireDate.trim()) errors.expireDate = "Expire date is required"
    if (!newsFormData.audienceType.trim()) errors.audienceType = "Audience type is required"
    if (!newsFormData.description.trim()) errors.description = "Description is required"

    setFormErrors(errors)
    return Object.keys(errors).length === 0
  }

  // Handle create news submission
  const handleCreateNews = () => {
    if (!validateForm()) {
      toast.error("Please fill all required fields")
      return
    }

    const formData = new FormData()

    // Append news data
    formData.append("title", newsFormData.title)
    formData.append("expireDate", newsFormData.expireDate)
    formData.append("audienceType", newsFormData.audienceType)
    formData.append("description", newsFormData.description)
    formData.append("isOnLandingPage", newsFormData.isOnLandingPage)
    formData.append("isSpotlightNews", newsFormData.isSpotlightNews)

    // Append images
    if (imageFiles.length > 0) {
      imageFiles.forEach((file) => {
        formData.append("images", file)
      })
    }

    // Append videos
    if (videoFiles.length > 0) {
      videoFiles.forEach((file) => {
        formData.append("videos", file)
      })
    }

    dispatch(createNews(formData)).then((response) => {
      if (response.meta.requestStatus === "fulfilled") {
        setIsAddNewsOpen(false)
        setAddNewsImages([])
        setImageFiles([])
        setAddNewsVideos([])
        setVideoFiles([])

        // Refresh news list
        dispatch(
          getAllNews({
            page: currentPage,
            limit: itemsPerPage,
            search: searchQuery,
            filter: filterType,
            sort: sortType,
          }),
        )
      }
    })
  }

  // Handle update news submission
  const handleUpdateNews = () => {
    if (!validateForm() || !selectedNews) {
      toast.error("Please fill all required fields")
      return
    }

    const formData = new FormData()

    // Append news data
    formData.append("title", newsFormData.title)
    formData.append("expireDate", newsFormData.expireDate)
    formData.append("audienceType", newsFormData.audienceType)
    formData.append("description", newsFormData.description)
    formData.append("isOnLandingPage", newsFormData.isOnLandingPage)
    formData.append("isSpotlightNews", newsFormData.isSpotlightNews)

    // Append images - only append new images that were added during editing
    if (imageFiles.length > 0) {
      imageFiles.forEach((file) => {
        formData.append("images", file)
      })
    }

    // Append videos - only append new videos that were added during editing
    if (videoFiles.length > 0) {
      videoFiles.forEach((file) => {
        formData.append("videos", file)
      })
    }

    // If no new images were added but there are existing images,
    // we need to tell the backend to keep the existing images
    if (imageFiles.length === 0 && editNewsImages.length > 0) {
      formData.append("keepExistingImages", "true")
    }

    // If no new videos were added but there are existing videos,
    // we need to tell the backend to keep the existing videos
    if (videoFiles.length === 0 && editNewsVideos.length > 0) {
      formData.append("keepExistingVideos", "true")
    }

    dispatch(updateNews({ id: selectedNews._id, newsData: formData })).then((response) => {
      if (response.meta.requestStatus === "fulfilled") {
        toast.success("News updated successfully")
        setIsEditNewsOpen(false)
        setEditNewsImages([])
        setImageFiles([])
        setEditNewsVideos([])
        setVideoFiles([])
        setSelectedNews(null)

        // Refresh news list to show the updated data
        dispatch(
          getAllNews({
            page: currentPage,
            limit: itemsPerPage,
            search: searchQuery,
            filter: filterType,
            sort: sortType,
          }),
        )
      } else if (response.meta.requestStatus === "rejected") {
        toast.error(response.payload?.message || "Failed to update news")
      }
    })
  }

  // Handle delete news
  const handleDeleteNews = () => {
    if (!selectedNews) return

    dispatch(deleteNews(selectedNews._id)).then((response) => {
      if (response.meta.requestStatus === "fulfilled") {
        setIsDeleteModalOpen(false)
        setSelectedNews(null)

        // Refresh news list
        dispatch(
          getAllNews({
            page: currentPage,
            limit: itemsPerPage,
            search: searchQuery,
            filter: filterType,
            sort: sortType,
          }),
        )
      }
    })
  }

  // Handle post news
  const handlePostNews = async () => {
    if (!receiverEmail || !password) {
      toast.error("Please fill all required fields")
      return
    }

    try {
      await dispatch(postNewsViaEmail({
        newsId: selectedNews._id,
        receiverEmail,
        password
      })).unwrap()

      toast.success("News posted successfully")
      setIsPostModalOpen(false)
      setReceiverEmail("")
      setPassword("")
    } catch (error) {
      toast.error(error || "Failed to post news")
    } finally {
      dispatch(reset())
    }
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
          className={`w-8 h-8 flex items-center justify-center rounded-lg ${
            currentPage === 1 ? "bg-primary text-white" : "text-gray-600"
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
          className={`w-8 h-8 flex items-center justify-center rounded-lg ${
            currentPage === i ? "bg-primary text-white" : "text-gray-600"
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
          className={`w-8 h-8 flex items-center justify-center rounded-lg ${
            currentPage === totalPages ? "bg-primary text-white" : "text-gray-600"
          }`}
          onClick={() => setCurrentPage(totalPages)}
        >
          {totalPages}
        </button>,
      )
    }

    return buttons
  }

  // Format date for display
  const formatDate = (dateString) => {
    if (!dateString) return ""
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  // Add a function to remove images from the edit form
  const removeEditImage = (index) => {
    // Remove from preview
    setEditNewsImages((prev) => prev.filter((_, i) => i !== index))

    // If this is a new image (has a corresponding file), remove it from files array
    if (index < imageFiles.length) {
      setImageFiles((prev) => prev.filter((_, i) => i !== index))
    }
  }

  // Remove video for edit
  const removeEditVideo = (index) => {
    setEditNewsVideos((prev) => prev.filter((_, i) => i !== index))
    setVideoFiles((prev) => prev.filter((_, i) => i !== index))
  }

  return (
    <div className="space-y-6 md:p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex-1 max-w-2xl mx-auto px-4">
          <div className="relative">
            <BiSearch className="absolute md:flex hidden right-8 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />
            <input
              type="text"
              placeholder="Search..."
              className="w-full px-8 py-2.5 rounded-full border border-gray-400 focus:outline-none text-sm"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  dispatch(
                    getAllNews({
                      page: 1,
                      limit: itemsPerPage,
                      search: searchQuery,
                      filter: filterType,
                      sort: sortType,
                    }),
                  )
                  setCurrentPage(1)
                }
              }}
            />
          </div>
        </div>
        <Profile />
      </div>

      <div className="flex justify-between flex-col md:flex-row gap-2 items-center">
        <button
          className="px-6 py-2 bg-primary text-white rounded-lg flex items-center gap-2"
          onClick={() => setIsAddNewsOpen(true)}
        >
          Create News
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
              <div className="absolute z-50 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg">
                <button className="block w-full text-left px-4 py-2 hover:bg-gray-100" onClick={() => handleFilterChange('all')}>All</button>
                <button className="block w-full text-left px-4 py-2 hover:bg-gray-100" onClick={() => handleFilterChange('spotlight')}>Spotlight News</button>
                <button className="block w-full text-left px-4 py-2 hover:bg-gray-100" onClick={() => handleFilterChange('landing')}>Landing Page News</button>
              </div>
            )}
          </div>
          {/* Sort By Button */}
          <div className="relative z-100">
            <button
              className="flex items-center border border-gray-300 rounded-lg px-6 py-2.5 bg-white text-gray-500 hover:bg-gray-100 transition-colors focus:outline-none z-100"
              onClick={() => setShowSortDropdown((prev) => !prev)}
              type="button"
            >
              Sort by
              <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 7h18M3 12h18M3 17h18" /><path strokeLinecap="round" strokeLinejoin="round" d="M6 10l3 3 3-3" /></svg>
            </button>
            {showSortDropdown && (
              <div className="absolute z-50 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg">
                <button className="block w-full text-left px-4 py-2 hover:bg-gray-100" onClick={() => handleSortChange('all')}>All</button>
                <button className="block w-full text-left px-4 py-2 hover:bg-gray-100" onClick={() => handleSortChange('latest')}>Latest</button>
                <button className="block w-full text-left px-4 py-2 hover:bg-gray-100" onClick={() => handleSortChange('oldest')}>Oldest</button>
                <button className="block w-full text-left px-4 py-2 hover:bg-gray-100" onClick={() => handleSortChange('mostRead')}>Most Read</button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Loading State */}
      {isLoading && (
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      )}

      {/* Error State */}
      {isError && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
          <p>{message || "Error loading news. Please try again later."}</p>
        </div>
      )}

      {/* News Grid */}
      {!isLoading && !isError && (
        <div className="grid md:grid-cols-4 gap-6">
          {news && news.length > 0 ? (
            news.map((newsItem) => (
              <div
                key={newsItem._id}
                className="relative group"
                onClick={() => {
                  setSelectedNews(newsItem)
                  setIsViewNewsOpen(true)
                }}
              >
                <div className="absolute top-4 flex justify-between w-full gap-2 z-10">
                  <button
                    className="p-2 relative text-white left-4 rounded-lg transition-colors"
                    onClick={(e) => {
                      e.stopPropagation()
                      setSelectedNews(newsItem)
                      setIsDeleteModalOpen(true)
                    }}
                  >
                    <FiTrash2 className="w-5 h-5" />
                  </button>
                  <button
                    className="p-2 relative right-4 text-white rounded-lg transition-colors"
                    onClick={(e) => {
                      e.stopPropagation()
                      setSelectedNews(newsItem)
                      setEditNewsImages(newsItem.images || [])
                      setIsEditNewsOpen(true)
                    }}
                  >
                    <img src={edit_icon || "/placeholder.svg"} alt="edit icon" />
                  </button>
                </div>
                <div
                  className="relative h-80 rounded-2xl overflow-hidden bg-center bg-cover"
                  style={{
                    backgroundImage: `url(${
                      newsItem.images && newsItem.images.length > 0 ? newsItem.images[0] : eventImage
                    })`,
                  }}
                >
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />

                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h3 className="text-xl font-medium text-white mb-2 overflow-hidden text-ellipsis whitespace-nowrap">
                      {newsItem.title}
                    </h3>
                    <div className="flex justify-between gap-4">
                      <div className="flex flex-col gap-4">
                        <div className="flex items-center gap-2 text-white/80">
                          <BsCalendar className="w-4 h-4" />
                          <span className="text-[12px]">{formatDate(newsItem.createdAt || newsItem.date)}</span>
                        </div>
                        <div className="flex items-center gap-2 text-white/80">
                          <img src={book_icon || "/placeholder.svg"} alt="" />
                          <span className="text-[12px]">{newsItem.readCount || 0} reads</span>
                        </div>
                        {newsItem.isSpotlightNews && (
                          <div className="flex items-center gap-2 text-white/80">
                            <img src={star_icon || "/placeholder.svg"} alt="star icon" />
                          </div>
                        )}
                      </div>
                      <div className="flex items-center gap-2 text-white/80 cursor-pointer mt-12">
                        <button
                          className="border-2 rounded-3xl px-2.5 pb-0.5 border-white flex gap-2"
                          onClick={(e) => {
                            e.stopPropagation()
                            setSelectedNews(newsItem)
                            setIsPostModalOpen(true)
                          }}
                        >
                          <img src={send_icon || "/placeholder.svg"} alt="send icon" className="w-5 h-5 mt-1" />
                          post
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-4 text-center py-12">
              <p className="text-gray-500">No news found. Create your first news article!</p>
            </div>
          )}
        </div>
      )}

      {/* Pagination */}
      {!isLoading && !isError && news && news.length > 0 && (
        <div className="flex items-center justify-between">
          <div>
            Show result:
            <select
              className="ml-2 px-2 py-1 border rounded"
              value={itemsPerPage}
              onChange={(e) => {
                setItemsPerPage(Number(e.target.value))
                setCurrentPage(1)
              }}
            >
              <option value={6}>6</option>
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

      {/* Add News Modal */}
      <Modal
        isOpen={isAddNewsOpen}
        onRequestClose={() => setIsAddNewsOpen(false)}
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg md:w-[600px] w-[96vw] max-h-[90vh] overflow-y-auto"
        overlayClassName="fixed inset-0 bg-black/50"
        style={{
          overlay: { zIndex: 1000 },
          content: { zIndex: 1001 },
        }}
      >
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">Add News</h2>
            <button onClick={() => setIsAddNewsOpen(false)} className="text-gray-400 hover:text-gray-600">
              <IoCloseOutline size={24} />
            </button>
          </div>

          <div className="space-y-4">
            {/* News Title */}
            <div>
              <label className="block mb-1">News Title</label>
              <input
                type="text"
                name="title"
                placeholder="Enter news title"
                className={`w-full px-4 py-2 border rounded-lg text-gray-600 ${formErrors.title ? "border-red-500" : ""}`}
                value={newsFormData.title}
                onChange={handleInputChange}
              />
              {formErrors.title && <p className="text-red-500 text-xs mt-1">{formErrors.title}</p>}
            </div>

            {/* Expire Date and Audience Type */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block mb-1">Expire Date</label>
                <div className="relative">
                  <input
                    type="date"
                    name="expireDate"
                    className={`w-full px-4 py-2 border rounded-lg text-gray-600 ${formErrors.expireDate ? "border-red-500" : ""}`}
                    value={newsFormData.expireDate}
                    onChange={handleInputChange}
                  />
                  {formErrors.expireDate && <p className="text-red-500 text-xs mt-1">{formErrors.expireDate}</p>}
                </div>
              </div>
              <div>
                <label className="block mb-1">Audience Type</label>
                <select
                  className={`w-full px-4 py-2 border rounded-lg text-gray-600 appearance-none bg-white ${formErrors.audienceType ? "border-red-500" : ""}`}
                  name="audienceType"
                  value={newsFormData.audienceType}
                  onChange={handleInputChange}
                >
                  <option value="" disabled>
                    Who should see the news?
                  </option>
                  <option value="all">All</option>
                  <option value="members">Members</option>
                </select>
                {formErrors.audienceType && <p className="text-red-500 text-xs mt-1">{formErrors.audienceType}</p>}
              </div>
            </div>

            {/* News Description */}
            <div>
              <label className="block mb-1">News Description</label>
              <div className="border rounded-lg overflow-hidden">
                <div className="flex items-center gap-2 border-b p-2 bg-white">
                  <select className="px-2 py-1 border rounded text-sm">
                    <option>Normal text</option>
                  </select>
                  <div className="h-4 border-r"></div>
                  <button className="p-1 rounded hover:bg-gray-100">B</button>
                  <button className="p-1 rounded hover:bg-gray-100">I</button>
                  <button className="p-1 rounded hover:bg-gray-100">U</button>
                  <button className="p-1 rounded hover:bg-gray-100">S</button>
                  <div className="h-4 border-r"></div>
                  <button className="p-1 rounded hover:bg-gray-100">{"<>"}</button>
                  <button className="p-1 rounded hover:bg-gray-100">🔗</button>
                  <div className="h-4 border-r"></div>
                  <button className="p-1 rounded hover:bg-gray-100">:</button>
                  <button className="p-1 rounded hover:bg-gray-100">:</button>
                  <div className="h-4 border-r"></div>
                  <button className="p-1 rounded hover:bg-gray-100">{'"'}</button>
                </div>
                <textarea
                  name="description"
                  className={`w-full p-4 min-h-[200px] resize-none focus:outline-none ${formErrors.description ? "border-red-500" : ""}`}
                  placeholder="Enter news description..."
                  value={newsFormData.description}
                  onChange={handleInputChange}
                />
                {formErrors.description && <p className="text-red-500 text-xs mt-1">{formErrors.description}</p>}
              </div>
            </div>

            {/* Checkboxes */}
            <div className="space-y-2">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="isOnLandingPage"
                  checked={newsFormData.isOnLandingPage}
                  onChange={handleInputChange}
                  className="rounded"
                />
                <span>Post on Home/Landing page</span>
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="isSpotlightNews"
                  checked={newsFormData.isSpotlightNews}
                  onChange={handleInputChange}
                  className="rounded"
                />
                <span>Spotlight News</span>
              </label>
            </div>

            {/* News Images */}
            <div>
              <label className="block mb-1">News Images</label>
              <div className="flex gap-4 flex-wrap">
                <label className="w-24 h-24 border-2 border-dashed rounded-lg flex items-center justify-center cursor-pointer hover:bg-gray-50">
                  <span className="text-2xl text-gray-400">+</span>
                  <input type="file" accept="image/*" className="hidden" onChange={handleAddImageChange} />
                </label>
                {addNewsImages.map((image, index) => (
                  <div key={index} className="w-24 h-24 rounded-lg overflow-hidden relative group">
                    <img src={image || "/placeholder.svg"} alt="" className="w-full h-full object-cover" />
                    <button
                      onClick={() => {
                        setAddNewsImages((prev) => prev.filter((_, i) => i !== index))
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

            {/* News Videos */}
            <div>
              <label className="block mb-1">News Videos</label>
              <div className="flex gap-4 flex-wrap">
                <label className="w-24 h-24 border-2 border-dashed rounded-lg flex items-center justify-center cursor-pointer hover:bg-gray-50">
                  <span className="text-2xl text-gray-400">+</span>
                  <input type="file" accept="video/*" className="hidden" onChange={handleAddVideoChange} />
                </label>
                {addNewsVideos.map((video, index) => (
                  <div key={index} className="w-24 h-24 rounded-lg overflow-hidden relative group">
                    <video src={video} controls className="w-full h-full object-cover" />
                    <button
                      onClick={() => {
                        setAddNewsVideos((prev) => prev.filter((_, i) => i !== index))
                        setVideoFiles((prev) => prev.filter((_, i) => i !== index))
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
              <button
                onClick={() => {
                  setIsAddNewsOpen(false)
                  setAddNewsImages([])
                  setImageFiles([])
                  setAddNewsVideos([])
                  setVideoFiles([])
                }}
                className="px-6 py-2 border rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                className="px-6 py-2 bg-gradient-to-r from-[#540A26] to-[#0A5440] text-white rounded-lg"
                onClick={handleCreateNews}
                disabled={isLoading}
              >
                {isLoading ? "Adding..." : "Add News"}
              </button>
            </div>
          </div>
        </div>
      </Modal>

      {/* Edit News Modal */}
      <Modal
        isOpen={isEditNewsOpen}
        onRequestClose={() => setIsEditNewsOpen(false)}
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg md:w-[600px] w-[96vw] max-h-[90vh] overflow-y-auto"
        overlayClassName="fixed inset-0 bg-black/50"
        style={{
          overlay: { zIndex: 1000 },
          content: { zIndex: 1001 },
        }}
      >
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">News Detail</h2>
            <button onClick={() => setIsEditNewsOpen(false)} className="text-gray-400 hover:text-gray-600">
              <IoCloseOutline size={24} />
            </button>
          </div>

          {selectedNews && (
            <div className="space-y-4">
              {/* News Title */}
              <div>
                <label className="block mb-1">News Title</label>
                <input
                  type="text"
                  name="title"
                  value={newsFormData.title}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-2 border rounded-lg text-gray-600 ${formErrors.title ? "border-red-500" : ""}`}
                />
                {formErrors.title && <p className="text-red-500 text-xs mt-1">{formErrors.title}</p>}
              </div>

              {/* Expire Date and Audience Type */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block mb-1">Expire Date</label>
                  <div className="relative">
                    <input
                      type="date"
                      name="expireDate"
                      value={newsFormData.expireDate}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-2 border rounded-lg text-gray-600 ${formErrors.expireDate ? "border-red-500" : ""}`}
                    />
                    {formErrors.expireDate && <p className="text-red-500 text-xs mt-1">{formErrors.expireDate}</p>}
                  </div>
                </div>
                <div>
                  <label className="block mb-1">Audience Type</label>
                  <select
                    name="audienceType"
                    value={newsFormData.audienceType}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-2 border rounded-lg text-gray-600 appearance-none bg-white ${formErrors.audienceType ? "border-red-500" : ""}`}
                  >
                    <option value="" disabled>
                      Who should see the news?
                    </option>
                    <option value="all">All</option>
                    <option value="members">Members</option>
                  </select>
                  {formErrors.audienceType && <p className="text-red-500 text-xs mt-1">{formErrors.audienceType}</p>}
                </div>
              </div>

              {/* News Description */}
              <div>
                <label className="block mb-1">News Description</label>
                <div className="border rounded-lg overflow-hidden">
                  <div className="flex items-center gap-2 border-b p-2 bg-white">
                    {/* ... existing toolbar buttons ... */}
                  </div>
                  <textarea
                    name="description"
                    value={newsFormData.description}
                    onChange={handleInputChange}
                    className={`w-full p-4 min-h-[200px] resize-none focus:outline-none ${formErrors.description ? "border-red-500" : ""}`}
                  />
                  {formErrors.description && <p className="text-red-500 text-xs mt-1">{formErrors.description}</p>}
                </div>
              </div>

              {/* Checkboxes */}
              <div className="space-y-2">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    name="isOnLandingPage"
                    checked={newsFormData.isOnLandingPage}
                    onChange={handleInputChange}
                    className="rounded"
                  />
                  <span>Post on Landing Page</span>
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    name="isSpotlightNews"
                    checked={newsFormData.isSpotlightNews}
                    onChange={handleInputChange}
                    className="rounded"
                  />
                  <span>Spotlight News</span>
                </label>
              </div>

              {/* Upload Image / Video */}
              <div>
                <label className="block mb-1">Upload Image / Video</label>
                <div className="flex gap-4 flex-wrap">
                  <label className="w-24 h-24 border-2 border-dashed rounded-lg flex items-center justify-center cursor-pointer hover:bg-gray-50">
                    <span className="text-2xl text-gray-400">+</span>
                    <input type="file" accept="image/*" className="hidden" onChange={handleEditImageChange} />
                  </label>
                  {editNewsImages.map((image, index) => (
                    <div key={index} className="w-24 h-24 rounded-lg overflow-hidden relative group">
                      <img src={image || "/placeholder.svg"} alt="" className="w-full h-full object-cover" />
                      <button
                        onClick={() => removeEditImage(index)}
                        className="absolute top-1 right-1 w-6 h-6 rounded-full bg-red-500 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* News Videos */}
              <div>
                <label className="block mb-1">News Videos</label>
                <div className="flex gap-4 flex-wrap">
                  <label className="w-24 h-24 border-2 border-dashed rounded-lg flex items-center justify-center cursor-pointer hover:bg-gray-50">
                    <span className="text-2xl text-gray-400">+</span>
                    <input type="file" accept="video/*" className="hidden" onChange={handleEditVideoChange} />
                  </label>
                  {editNewsVideos.map((video, index) => (
                    <div key={index} className="w-24 h-24 rounded-lg overflow-hidden relative group">
                      <video src={typeof video === 'string' ? video : URL.createObjectURL(video)} controls className="w-full h-full object-cover" />
                      <button
                        onClick={() => removeEditVideo(index)}
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
                <button
                  onClick={() => {
                    setIsEditNewsOpen(false)
                    setEditNewsImages([])
                    setImageFiles([])
                    setEditNewsVideos([])
                    setVideoFiles([])
                    setSelectedNews(null)
                  }}
                  className="px-6 py-2 border rounded-lg"
                >
                  Cancel
                </button>
                <button
                  className="px-6 py-2 bg-gradient-to-r from-[#540A26] to-[#0A5440] text-white rounded-lg"
                  onClick={handleUpdateNews}
                  disabled={isLoading}
                >
                  {isLoading ? "Saving..." : "Save"}
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
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg w-[400px]"
        overlayClassName="fixed inset-0 bg-black/50"
        style={{
          overlay: { zIndex: 1000 },
          content: { zIndex: 1001 },
        }}
      >
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">Delete News</h2>
            <button onClick={() => setIsDeleteModalOpen(false)} className="text-gray-400 hover:text-gray-600">
              <IoCloseOutline size={24} />
            </button>
          </div>

          <p className="text-gray-600 mb-6">Are you sure you want to delete this news? This action cannot be undone.</p>

          <div className="flex justify-end gap-3">
            <button
              onClick={() => setIsDeleteModalOpen(false)}
              className="px-6 py-2 border rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
              onClick={handleDeleteNews}
              disabled={isLoading}
            >
              {isLoading ? "Deleting..." : "Delete"}
            </button>
          </div>
        </div>
      </Modal>

      {/* View News Modal */}
      <Modal
        isOpen={isViewNewsOpen}
        onRequestClose={() => setIsViewNewsOpen(false)}
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg md:w-[600px] w-[96vw] max-h-[90vh] overflow-y-auto"
        overlayClassName="fixed inset-0 bg-black/50"
        style={{
          overlay: { zIndex: 1000 },
          content: { zIndex: 1001 },
        }}
      >
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">View News</h2>
            <button onClick={() => setIsViewNewsOpen(false)} className="text-gray-400 hover:text-gray-600">
              <IoCloseOutline size={24} />
            </button>
          </div>

          {selectedNews && (
            <div className="space-y-4">
              {/* News Image */}
              <div>
                <div className="w-full h-64 rounded-lg overflow-hidden bg-gray-100">
                  <img
                    src={selectedNews.images && selectedNews.images.length > 0 ? selectedNews.images[0] : eventImage}
                    alt=""
                    className="w-full h-full object-contain"
                  />
                </div>
              </div>

              {/* News Title */}
              <div>
                <label className="block mb-1 text-sm text-gray-600">News Title</label>
                <div className="w-full px-4 py-2 border rounded-lg text-gray-600 bg-gray-50">{selectedNews.title}</div>
              </div>

              {/* Expire Date and Audience Type */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block mb-1 text-sm text-gray-600">Expire Date</label>
                  <div className="w-full px-4 py-2 border rounded-lg text-gray-600 bg-gray-50">
                    {formatDate(selectedNews.expireDate)}
                  </div>
                </div>
                <div>
                  <label className="block mb-1 text-sm text-gray-600">Audience Type</label>
                  <div className="w-full px-4 py-2 border rounded-lg text-gray-600 bg-gray-50">
                    {selectedNews.audienceType}
                  </div>
                </div>
              </div>

              {/* News Description */}
              <div>
                <label className="block mb-1 text-sm text-gray-600">News Description</label>
                <div className="w-full px-4 py-2 border rounded-lg text-gray-600 bg-gray-50 min-h-[150px]">
                  {selectedNews.description}
                </div>
              </div>

              {/* Additional Info */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block mb-1 text-sm text-gray-600">Post Status</label>
                  <div className="w-full px-4 py-2 border rounded-lg text-gray-600 bg-gray-50">
                    {selectedNews.isOnLandingPage ? "Landing Page" : "Regular Post"}
                  </div>
                </div>
                <div>
                  <label className="block mb-1 text-sm text-gray-600">Spotlight Status</label>
                  <div className="w-full px-4 py-2 border rounded-lg text-gray-600 bg-gray-50">
                    {selectedNews.isSpotlightNews ? "Spotlight News" : "Regular News"}
                  </div>
                </div>
              </div>

              {/* News Images */}
              <div>
                <label className="block mb-1 text-sm text-gray-600">News Images</label>
                <div className="flex gap-4 flex-wrap">
                  {selectedNews.images && selectedNews.images.length > 0 ? (
                    selectedNews.images.map((image, index) => (
                      <div key={index} className="w-24 h-24 rounded-lg overflow-hidden">
                        <img src={image || "/placeholder.svg"} alt="" className="w-full h-full object-cover" />
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-500">No images available</p>
                  )}
                </div>
              </div>

              {/* News Videos */}
              <div>
                <label className="block mb-1 text-sm text-gray-600">News Videos</label>
                <div className="flex gap-4 flex-wrap">
                  {selectedNews.videos && selectedNews.videos.length > 0 ? (
                    selectedNews.videos.map((video, index) => (
                      <div key={index} className="w-24 h-24 rounded-lg overflow-hidden">
                        <video src={video} controls className="w-full h-full object-cover" />
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-500">No videos available</p>
                  )}
                </div>
              </div>

              {/* Close Button */}
              <div className="flex justify-end pt-4">
                <button
                  onClick={() => setIsViewNewsOpen(false)}
                  className="px-6 py-2 bg-gradient-to-r from-[#540A26] to-[#0A5440] text-white rounded-lg"
                >
                  Close
                </button>
              </div>
            </div>
          )}
        </div>
      </Modal>

      {/* Post News Modal */}
      <Modal
        isOpen={isPostModalOpen}
        onRequestClose={() => setIsPostModalOpen(false)}
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg w-[450px]"
        overlayClassName="fixed inset-0 bg-black/50"
        style={{
          overlay: { zIndex: 1000 },
          content: { zIndex: 1001 },
        }}
      >
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">Post News</h2>
            <button onClick={() => setIsPostModalOpen(false)} className="text-gray-400">
              ✕
            </button>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-sm mb-2">Receivers Email</label>
              <input
                type="email"
                value={receiverEmail}
                onChange={(e) => setReceiverEmail(e.target.value)}
                placeholder="Enter email"
                className="w-full px-3 py-2.5 border rounded-lg text-sm"
              />
            </div>

            <p className="text-sm text-gray-600">
              Are you sure you want to post this news article to selected accounts? The request is irreversible.
            </p>

            <div>
              <label className="block text-sm mb-2">Your Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-3 py-2.5 border rounded-lg text-sm pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                >
                  {showPassword ? <AiOutlineEyeInvisible className="w-5 h-5" /> : <AiOutlineEye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-4">
              <button onClick={() => setIsPostModalOpen(false)} className="px-6 py-2 border rounded-lg text-sm">
                Cancel
              </button>
              <button
                onClick={handlePostNews}
                className="px-6 py-2 bg-[#00B707] text-white rounded-lg text-sm"
                disabled={isLoading}
              >
                {isLoading ? "Sending..." : "Send"}
              </button>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  )
}

export default News
