"use client"

import { useState, useEffect } from "react"
import Modal from "react-modal"
import { FiEye, FiSettings, FiAlertCircle } from "react-icons/fi"
import { Loader } from "lucide-react"
import { useDispatch, useSelector } from "react-redux"
import { getAllCMS, changeVisiblity, removeCMS } from "../../store/cms/cmsSlice"
import { toast } from "react-hot-toast"

import EditCms from "../../components/modals/cms/landing/EditCms"
import PreviewCms from "../../components/modals/cms/landing/PreviewCms"
import AddCms from "../../components/modals/cms/landing/AddCms"
import RemoveCms from "../../components/modals/cms/landing/RemoveCms"

const Landing = () => {
  const dispatch = useDispatch()
  const { cms, isLoading, isError, message } = useSelector((state) => state.cms)

  const [activeFilter, setActiveFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("active")
  const [openSettingsId, setOpenSettingsId] = useState(null)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isRemoveModalOpen, setIsRemoveModalOpen] = useState(false)
  const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false)
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [selectedItem, setSelectedItem] = useState(null)
  const [retryCount, setRetryCount] = useState(0)
  const [errorDetails, setErrorDetails] = useState(null)

  // Add state to differentiate delete/restore actions for the modal
  const [modalActionType, setModalActionType] = useState(null)

  // Fetch CMS data on component mount and when filters change
  useEffect(() => {
    fetchCmsData()
  }, [dispatch, statusFilter, activeFilter])

  // Function to fetch CMS data with retry logic
  const fetchCmsData = async () => {
    try {
      await dispatch(getAllCMS({ status: statusFilter, activeFilter: activeFilter })).unwrap()
      // Reset retry count on successful fetch
      setRetryCount(0)
      setErrorDetails(null)
    } catch (error) {
      console.error("Error fetching CMS data:", error)
      setErrorDetails(error?.message || "Failed to fetch CMS data")

      // Implement retry logic (max 3 retries)
      if (retryCount < 3) {
        const retryDelay = Math.pow(2, retryCount) * 1000 // Exponential backoff
        setTimeout(() => {
          setRetryCount((prev) => prev + 1)
          fetchCmsData()
        }, retryDelay)
      }
    }
  }

  // Handle visibility toggle with optimistic update
  const handleVisibility = async (id) => {
    try {
      // Find the item to toggle
      const item = cms.find((item) => item._id === id)
      if (!item) return

      // Prepare data for API call
      const data = {
        id: id,
        data: { visibility: !item.visibility },
      }

      // Dispatch the action to update visibility
      await dispatch(changeVisiblity(data)).unwrap()
    } catch (error) {
      console.error("Error toggling visibility:", error)
      // If there's an error, refresh the data to ensure UI is in sync
      fetchCmsData()
    }
  }

  const handleEdit = (item) => {
    setSelectedItem(item)
    setIsEditModalOpen(true)
    setOpenSettingsId(null) // Close the dropdown when edit is clicked
  }

  // Handle soft delete
  const handleSoftDelete = async (id) => {
    try {
      // Explicitly dispatch the removeCMS action creator from cmsSlice
      await dispatch(removeCMS({ id: id, isDeleted: true })).unwrap()
      toast.success("Landing page soft-deleted successfully")
      fetchCmsData() // Refresh data to update list
    } catch (error) {
      console.error("Error soft-deleting landing page:", error)
      toast.error(error.message || "Failed to soft-delete landing page")
    } finally {
      setIsRemoveModalOpen(false) // Close modal after action
    }
  }

  // Handle restore
  const handleRestore = async (id) => {
    try {
      // Explicitly dispatch the removeCMS action creator from cmsSlice
      await dispatch(removeCMS({ id: id, isDeleted: false })).unwrap()
      toast.success("Landing page restored successfully")
      fetchCmsData() // Refresh data to update list
    } catch (error) {
      console.error("Error restoring landing page:", error)
      toast.error(error.message || "Failed to restore landing page")
    } finally {
      setIsRemoveModalOpen(false) // Close modal after action
    }
  }

  // Function to open the remove/restore modal
  const openRemoveRestoreModal = (item, actionType) => {
    setSelectedItem(item)
    setModalActionType(actionType) // Set the action type
    setOpenSettingsId(null) // Close the dropdown
    setIsRemoveModalOpen(true)
  }

  const handlePreview = (item) => {
    setSelectedItem(item)
    setIsPreviewModalOpen(true)
  }

  // Render loading state
  if (isLoading && cms.length === 0) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader className="animate-spin h-8 w-8 text-primary" />
        <span className="ml-2">Loading CMS data...</span>
      </div>
    )
  }

  // Render error state
  if (isError && cms.length === 0 && retryCount >= 3) {
    return (
      <div className="flex flex-col justify-center items-center h-64 text-red-500">
        <FiAlertCircle size={40} />
        <h3 className="mt-4 text-lg font-medium">Failed to load CMS data</h3>
        <p className="mt-2 text-sm text-gray-600">{errorDetails || message}</p>
        <button onClick={fetchCmsData} className="mt-4 px-4 py-2 bg-primary text-white rounded-lg">
          Try Again
        </button>
      </div>
    )
  }

  return (
    <div>
      {/* Error notification if there's an error but we have some data */}
      {isError && cms.length > 0 && (
        <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-600 flex items-center">
          <FiAlertCircle className="mr-2" />
          <span>There was an issue refreshing the data. Some information may be outdated.</span>
          <button onClick={fetchCmsData} className="ml-auto px-3 py-1 bg-red-100 hover:bg-red-200 rounded-lg text-sm">
            Retry
          </button>
        </div>
      )}

      {/* Filters and Add Button */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center">
        <div className="flex gap-4">
          <select
            value={activeFilter}
            onChange={(e) => setActiveFilter(e.target.value)}
            className="px-4 py-2 border mb-6 rounded-lg text-gray-600 md:min-w-[200px]"
          >
            <option value="all">All</option>
            <option value="overlays">Image Overlays</option>
            <option value="other">Other options</option>
          </select>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 mb-6 border rounded-lg text-gray-600 md:min-w-[200px]"
          >
            <option value="active">Active</option>
            <option value="deleted">Deleted</option>
          </select>
        </div>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="px-6 py-2 bg-primary text-white rounded-lg"
          disabled={isLoading}
        >
          {isLoading ? (
            <span className="flex items-center">
              <Loader className="animate-spin h-4 w-4 mr-2" />
              Adding...
            </span>
          ) : (
            "Add"
          )}
        </button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg w-[90vw] md:w-full">
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="text-left py-4 px-6 text-sm font-medium"></th>
              <th className="text-left py-4 px-6 text-sm font-medium">Item</th>
              <th className="text-left py-4 px-6 text-sm font-medium">Preview</th>
              <th className="text-left py-4 px-6 text-sm font-medium">Last Modified</th>
              <th className="text-left py-4 px-6 text-sm font-medium">Visibility</th>
              <th className="text-left py-4 px-6 text-sm font-medium">Action</th>
            </tr>
          </thead>
          <tbody>
            {cms.length > 0 ? (
              cms.map((item, index) => (
                <tr key={item._id} className="border-b">
                  <td className="py-4 px-6">{index + 1}</td>
                  <td className="py-4 px-6">
                    <div className="w-24 h-16 bg-gray-200 rounded-lg overflow-hidden">
                      {item.fileType === 'video' ? (
                        <video
                          src={item.file}
                          controls
                          className="w-full h-full object-cover"
                        />
                      ) : (
                      <img
                          src={item.file || "/placeholder.svg?height=64&width=96"}
                        alt="Preview"
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.onerror = null
                          e.target.src = "/placeholder.svg?height=64&width=96"
                        }}
                      />
                      )}
                    </div>
                  </td>
                  <td className="py-4 px-6 text-sm text-gray-600">
                    <button className="text-gray-400 hover:text-gray-600" onClick={() => handlePreview(item)} disabled={isLoading}>
                      <FiEye size={20} />
                    </button>
                  </td>
                  <td className="py-4 px-6 text-sm text-gray-600">
                    {new Date(item.updatedAt).toLocaleString("en-US", {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                      hour: "numeric",
                      minute: "numeric",
                      hour12: true,
                    })}
                  </td>
                  <td className="py-4 px-6">
                    {/* Visibility Toggle (only for non-deleted items) */}
                    {!item.isDeleted ? (
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={item.visibility !== false}
                        className="sr-only peer"
                        onChange={() => handleVisibility(item._id)}
                        disabled={isLoading}
                      />
                      <div className="w-11 h-6 bg-gray-500 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                    </label>
                    ) : (
                      <span className="text-sm text-gray-500">N/A</span> // Show N/A for deleted items
                    )}
                  </td>
                  <td className="py-4 px-6 relative">
                    <button
                      className="text-gray-400 hover:text-gray-600"
                      onClick={() => setOpenSettingsId(openSettingsId === item._id ? null : item._id)}
                      disabled={isLoading}
                    >
                      <FiSettings size={20} />
                    </button>

                    {/* Settings Dropdown */}
                    {openSettingsId === item._id && (
                      <div className="absolute right-6 mt-2 w-32 bg-white rounded-lg shadow-lg border py-1 z-10">
                        <button
                          className="w-full px-4 py-2 text-left text-sm text-[#1A1A1A] hover:bg-gray-50"
                          onClick={() => handleEdit(item)}
                        >
                          Edit
                        </button>
                        {item.isDeleted ? (
                          <button
                            className="w-full px-4 py-2 text-left text-sm text-green-600 hover:bg-gray-50"
                            onClick={() => openRemoveRestoreModal(item, 'restore')}
                          >
                            Restore
                          </button>
                        ) : (
                        <button
                          className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 text-red-500"
                            onClick={() => openRemoveRestoreModal(item, 'delete')}
                        >
                          Remove
                        </button>
                        )}
                      </div>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="py-8 text-center text-gray-500">
                  {isLoading ? (
                    <div className="flex justify-center items-center">
                      <Loader className="animate-spin h-5 w-5 mr-2" />
                      Loading...
                    </div>
                  ) : (
                    "No CMS items found. Add your first item."
                  )}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Edit Modal */}
      <Modal
        isOpen={isEditModalOpen}
        onRequestClose={() => setIsEditModalOpen(false)}
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg w-[90vw] md:w-[450px]"
        overlayClassName="fixed inset-0 bg-black/50 superZ"
      >
        <EditCms setIsEditModalOpen={setIsEditModalOpen} selectedItem={selectedItem} refreshData={fetchCmsData} />
      </Modal>

      {/* Remove/Restore Modal (Using the adapted RemoveCms)*/}
      <Modal
        isOpen={isRemoveModalOpen}
        onRequestClose={() => setIsRemoveModalOpen(false)}
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg w-[90vw] md:w-[450px]"
        overlayClassName="fixed inset-0 bg-black/50 superZ"
      >
        <RemoveCms
          setIsRemoveModalOpen={setIsRemoveModalOpen}
          selectedItem={selectedItem}
          refreshData={fetchCmsData}
          modalTitle={modalActionType === 'delete' ? 'Confirm Removal' : 'Confirm Restore'}
          modalMessage={modalActionType === 'delete' ? `Are you sure you want to remove this landing page item? This action will soft-delete it.` : `Are you sure you want to restore this landing page item? It will become active again.`}
          confirmButtonText={modalActionType === 'delete' ? 'Remove' : 'Restore'}
          onConfirmAction={modalActionType === 'delete' ? handleSoftDelete : handleRestore}
        />
      </Modal>

      {/* Preview Modal */}
      <Modal
        isOpen={isPreviewModalOpen}
        onRequestClose={() => setIsPreviewModalOpen(false)}
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg w-[90vw] md:w-[450px]"
        overlayClassName="fixed inset-0 bg-black/50 superZ"
      >
        <PreviewCms setIsPreviewModalOpen={setIsPreviewModalOpen} selectedItem={selectedItem} />
      </Modal>

      {/* Add Modal */}
      <Modal
        isOpen={isAddModalOpen}
        onRequestClose={() => setIsAddModalOpen(false)}
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg w-[90vw] md:w-[450px]"
        overlayClassName="fixed inset-0 bg-black/50 superZ"
      >
        <AddCms setIsAddModalOpen={setIsAddModalOpen} refreshData={fetchCmsData} />
      </Modal>
    </div>
  )
}

export default Landing
