"use client"

import { useState, useEffect, useRef } from "react"
import { FiSettings } from "react-icons/fi"
import Modal from "react-modal"
import { useDispatch, useSelector } from "react-redux"
import {
  getAllSocialMedia,
  createSocialMedia,
  updateSocialMedia,
  deleteSocialMedia,
  reorderSocialMedia,
} from "../../store/socialMedia/socialMediaSlice"

import { toast } from "react-toastify"
import { Loader } from 'lucide-react'

// Set app element for accessibility
Modal.setAppElement("#root")

const SocialLinks = () => {

  // Debug logs
  console.log("Component mounted, about to fetch social media links")

  const dispatch = useDispatch()

  // Log the entire Redux state to debug
  const reduxState = useSelector((state) => state)
  console.log("Redux state:", reduxState)

  const { activeTab } = useSelector((state) => state.settings)

  // Use a safer approach to access the state
  const socialMediaState = useSelector((state) => state.socialMedia) || { socialLinks: [], loading: false }
  const { socialLinks = [], loading = false } = socialMediaState

  console.log("Social media state:", socialMediaState)

  // Add this useEffect to watch for tab changes
  useEffect(() => {
    if (activeTab === 'social') {
      try {
        dispatch(getAllSocialMedia())
      } catch (error) {
        console.error("Error dispatching getAllSocialMedia:", error)
      }
    }
  }, [dispatch, activeTab]) // Add activeTab to dependencies

  // UI state
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isRemoveModalOpen, setIsRemoveModalOpen] = useState(false)
  const [openSettingsId, setOpenSettingsId] = useState(null)
  const [dragging, setDragging] = useState(null)
  const [dragOver, setDragOver] = useState(null)
  const [isSubmitting, setIsSubmitting] = useState(false)



  // Form state
  const [newSocial, setNewSocial] = useState({
    name: "",
    link: "",
    icon: null,
    iconFile: null,
  })
  const [selectedSocial, setSelectedSocial] = useState(null)
  const [editForm, setEditForm] = useState({
    name: "",
    link: "",
    icon: null,
    iconFile: null,
  })

  // Refs
  const fileInputRef = useRef(null)
  const editFileInputRef = useRef(null)

  // Fetch social media links on component mount
  useEffect(() => {
    try {
      dispatch(getAllSocialMedia())
    } catch (error) {
      console.error("Error dispatching getAllSocialMedia:", error)
    }
  }, [dispatch])

  // Handle drag and drop for reordering
  const handleDragStart = (event, index) => {
    setDragging(index)
  }

  const handleDragOver = (event, index) => {
    event.preventDefault()
    setDragOver(index)
  }

  const handleDragEnd = async (event) => {
    if (dragging !== null && dragOver !== null && dragging !== dragOver) {
      // Create a copy of the social links array
      const newSocialLinks = [...socialLinks]
  
      // Remove the dragged item and insert it at the new position
      const [draggedItem] = newSocialLinks.splice(dragging, 1)
      newSocialLinks.splice(dragOver, 0, draggedItem)
  
      // Get the ordered IDs for the backend
      const orderedIds = newSocialLinks.map((link) => link._id)
  
      // Dispatch the reorder action
      try {
        // Set a loading state if needed
        setIsReordering(true)
        
        // Dispatch the action and wait for it to complete
        await dispatch(reorderSocialMedia(orderedIds)).unwrap()
        
        // No need to manually update the state here as the Redux reducer will handle it
      } catch (error) {
        toast.error("Failed to reorder social media links")
        // If there's an error, you might want to refresh the data
        dispatch(getAllSocialMedia())
      } finally {
        setIsReordering(false)
      }
    }
  
    setDragging(null)
    setDragOver(null)
  }

  // Handle edit button click
  const handleEdit = (social) => {
    setSelectedSocial(social)
    setEditForm({
      name: social.socialName,
      link: social.url,
      icon: social.iconImage,
      iconFile: null,
    })
    setIsEditModalOpen(true)
    setOpenSettingsId(null)
  }

  // Handle remove button click
  const handleRemove = (social) => {
    setSelectedSocial(social)
    setIsRemoveModalOpen(true)
    setOpenSettingsId(null)
  }

  // Handle image selection for new social media
  const handleImageSelect = (e) => {
    const file = e.target.files[0]
    if (file) {
      // Validate file type
      if (!file.type.match("image.*")) {
        toast.error("Please select an image file")
        return
      }

      // Validate file size (max 2MB)
      if (file.size > 2 * 1024 * 1024) {
        toast.error("File size should be less than 2MB")
        return
      }

      const imageUrl = URL.createObjectURL(file)
      setNewSocial({
        ...newSocial,
        icon: imageUrl,
        iconFile: file,
      })
    }
  }

  // Handle image selection for editing
  const handleEditImageSelect = (e) => {
    const file = e.target.files[0]
    if (file) {
      // Validate file type
      if (!file.type.match("image.*")) {
        toast.error("Please select an image file")
        return
      }

      // Validate file size (max 2MB)
      if (file.size > 2 * 1024 * 1024) {
        toast.error("File size should be less than 2MB")
        return
      }

      const imageUrl = URL.createObjectURL(file)
      setEditForm({
        ...editForm,
        icon: imageUrl,
        iconFile: file,
      })
    }
  }

  // Handle adding a new social media link
  const handleAddSocial = async () => {
    // Validate form
    if (!newSocial.name.trim()) {
      toast.error("Social name is required")
      return
    }

    if (!newSocial.link.trim()) {
      toast.error("Social link is required")
      return
    }

    if (!newSocial.iconFile) {
      toast.error("Social icon is required")
      return
    }

    setIsSubmitting(true)
    console.log("Starting to add social media")

    try {
      // Create form data for file upload
      const formData = new FormData()
      formData.append("socialName", newSocial.name)
      formData.append("url", newSocial.link)
      formData.append("index", socialLinks.length)
      formData.append("iconImage", newSocial.iconFile)

      console.log("Form data created:", {
        name: newSocial.name,
        link: newSocial.link,
        index: socialLinks.length,
        hasFile: !!newSocial.iconFile,
      })

      // Dispatch create action
      console.log("Dispatching createSocialMedia action")
      const result = await dispatch(createSocialMedia(formData)).unwrap()
      console.log("Create social media result:", result)

      // Reset form and close modal
      setNewSocial({
        name: "",
        link: "",
        icon: null,
        iconFile: null,
      })
      setIsAddModalOpen(false)
    } catch (error) {
      console.error("Error adding social media:", error)
      toast.error(error || "Failed to add social media link")
    } finally {
      setIsSubmitting(false)
    }
  }

  // Handle updating a social media link
  const handleUpdateSocial = async () => {
    // Validate form
    if (!editForm.name.trim()) {
      toast.error("Social name is required")
      return
    }

    if (!editForm.link.trim()) {
      toast.error("Social link is required")
      return
    }

    setIsSubmitting(true)

    try {
      // Create form data for file upload
      const formData = new FormData()
      formData.append("socialName", editForm.name)
      formData.append("url", editForm.link)

      // Only append the file if a new one was selected
      if (editForm.iconFile) {
        formData.append("iconImage", editForm.iconFile)
      }

      // Dispatch update action
      await dispatch(updateSocialMedia({ id: selectedSocial._id, formData })).unwrap()

      // Close modal
      setIsEditModalOpen(false)
    } catch (error) {
      toast.error(error || "Failed to update social media link")
    } finally {
      setIsSubmitting(false)
    }
  }

  // Handle deleting a social media link
  const handleDeleteSocial = async () => {
    setIsSubmitting(true)

    try {
      // Dispatch delete action
      await dispatch(deleteSocialMedia(selectedSocial._id)).unwrap()

      // Close modal
      setIsRemoveModalOpen(false)
    } catch (error) {
      toast.error(error || "Failed to delete social media link")
    } finally {
      setIsSubmitting(false)
    }
  }

  // Handle toggling visibility
  const handleToggleVisibility = async (id) => {
    try {
      // Create form data for the update
      const social = socialLinks.find((link) => link._id === id)
      const formData = new FormData()
      formData.append("socialName", social.socialName)
      formData.append("url", social.url)
      formData.append("visibility", !social.visibility)

      // Dispatch update action
      await dispatch(updateSocialMedia({ id, formData })).unwrap()
    } catch (error) {
      toast.error(error || "Failed to toggle visibility")
    }
  }

  if (loading && socialLinks.length === 0) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader className="animate-spin h-8 w-8 text-primary" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl">Social Links</h2>
        <button className="px-6 py-2 bg-primary text-white rounded-lg" onClick={() => setIsAddModalOpen(true)}>
          + Add Socials
        </button>
      </div>

      <div className="space-y-4">
        {socialLinks && socialLinks.length > 0 ? (
          socialLinks.map((social, index) => (
            <div
              key={social._id || index}
              draggable={true}
              onDragStart={(e) => handleDragStart(e, index)}
              onDragOver={(e) => handleDragOver(e, index)}
              onDragEnd={handleDragEnd}
              className={`flex items-center cursor-pointer justify-between p-4 bg-white rounded-lg border ${
                dragOver === index ? "border-primary border-2" : ""
              }`}
            >
              <div className="flex items-center gap-8">
                <span className="text-gray-500">{index + 1}</span>
                <img
                  src={social.iconImage || "/placeholder.svg"}
                  alt={social.socialName}
                  className="h-12 w-12 object-contain"
                />
                <span className="font-medium">{social.socialName}</span>
              </div>
              <div className="flex items-center gap-6">
                <div className="flex gap-2">
                  <button
                    className="p-2 hover:bg-gray-100 rounded text-[32px]"
                    onClick={() => {
                      if (index > 0) {
                        const newSocialLinks = [...socialLinks]
                        const temp = newSocialLinks[index]
                        newSocialLinks[index] = newSocialLinks[index - 1]
                        newSocialLinks[index - 1] = temp

                        const orderedIds = newSocialLinks.map((link) => link._id)
                        dispatch(reorderSocialMedia(orderedIds))
                      }
                    }}
                    disabled={index === 0}
                  >
                    ↑
                  </button>
                  <button
                    className="p-2 hover:bg-gray-100 rounded text-[32px]"
                    onClick={() => {
                      if (index < socialLinks.length - 1) {
                        const newSocialLinks = [...socialLinks]
                        const temp = newSocialLinks[index]
                        newSocialLinks[index] = newSocialLinks[index + 1]
                        newSocialLinks[index + 1] = temp

                        const orderedIds = newSocialLinks.map((link) => link._id)
                        dispatch(reorderSocialMedia(orderedIds))
                      }
                    }}
                    disabled={index === socialLinks.length - 1}
                  >
                    ↓
                  </button>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  checked={social.visibility !== false}
                  onChange={() => handleToggleVisibility(social._id)}
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
              </label>
              <div className="relative">
                <button
                  className="p-1 hover:bg-gray-100 rounded"
                  onClick={() => {
                    setOpenSettingsId(openSettingsId === social._id ? null : social._id)
                  }}
                >
                  <FiSettings size={20} />
                </button>
                {openSettingsId === social._id && (
                  <div className="absolute right-0 mt-2 w-32 bg-white rounded-lg shadow-lg border py-1 z-10">
                    <button
                      className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50"
                      onClick={() => handleEdit(social)}
                    >
                      Edit
                    </button>
                    <button
                      className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 text-red-500"
                      onClick={() => handleRemove(social)}
                    >
                      Remove
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-8 text-gray-500">No social links found. Add your first social link.</div>
        )}
      </div>

      {/* Add Social Modal */}
      <Modal
        isOpen={isAddModalOpen}
        onRequestClose={() => setIsAddModalOpen(false)}
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg md:w-[500px] w-[95vw]"
        overlayClassName="fixed inset-0 bg-black/50"
      >
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl">Add Social Link</h2>
            <button onClick={() => setIsAddModalOpen(false)} className="text-gray-400 hover:text-gray-600">
              ✕
            </button>
          </div>

          <div className="space-y-6">
            {/* Icon Upload Section */}
            <div className="flex flex-col items-center gap-4">
              <div
                className="w-32 h-32 flex items-center justify-center border rounded-lg cursor-pointer hover:bg-gray-50"
                onClick={() => fileInputRef.current?.click()}
              >
                {newSocial.icon ? (
                  <img
                    src={newSocial.icon || "/placeholder.svg"}
                    alt="Social Icon"
                    className="w-full h-full object-contain p-2"
                  />
                ) : (
                  <div className="text-8xl font-bold text-gray-300">+</div>
                )}
              </div>
              <input
                type="file"
                id="socialIcon"
                accept="image/*"
                className="hidden"
                onChange={handleImageSelect}
                ref={fileInputRef}
              />
              <label
                htmlFor="socialIcon"
                className="text-primary cursor-pointer"
                onClick={(e) => {
                  e.preventDefault()
                  fileInputRef.current?.click()
                }}
              >
                Click to Add icon
              </label>
            </div>

            <div>
              <label className="block mb-2">Social Name</label>
              <input
                type="text"
                placeholder="Name"
                value={newSocial.name}
                onChange={(e) => setNewSocial({ ...newSocial, name: e.target.value })}
                className="w-full px-4 py-2 border rounded-lg"
              />
            </div>

            <div>
              <label className="block mb-2">Social Link</label>
              <input
                type="text"
                placeholder="Url or link"
                value={newSocial.link}
                onChange={(e) => setNewSocial({ ...newSocial, link: e.target.value })}
                className="w-full px-4 py-2 border rounded-lg"
              />
            </div>

            <div className="flex justify-end gap-3 pt-4">
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="px-6 py-2 border rounded-lg hover:bg-gray-50"
                disabled={isSubmitting}
              >
                Cancel
              </button>
              <button
                className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90"
                onClick={handleAddSocial}
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <span className="flex items-center">
                    <Loader className="animate-spin h-4 w-4 mr-2" />
                    Adding...
                  </span>
                ) : (
                  "Add"
                )}
              </button>
            </div>
          </div>
        </div>
      </Modal>

      {/* Edit Social Modal */}
      <Modal
        isOpen={isEditModalOpen}
        onRequestClose={() => setIsEditModalOpen(false)}
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg md:w-[500px] w-[95vw]"
        overlayClassName="fixed inset-0 bg-black/50"
      >
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl">Edit Social Info</h2>
            <button onClick={() => setIsEditModalOpen(false)} className="text-gray-400 hover:text-gray-600">
              ✕
            </button>
          </div>

          <div className="space-y-6">
            {/* Icon Upload Section */}
            <div className="flex flex-col items-center gap-4">
              <div
                className="w-32 h-32 flex items-center justify-center border rounded-lg cursor-pointer hover:bg-gray-50"
                onClick={() => editFileInputRef.current?.click()}
              >
                {editForm.icon ? (
                  <img
                    src={editForm.icon || "/placeholder.svg"}
                    alt="Social Icon"
                    className="w-full h-full object-contain p-2"
                  />
                ) : (
                  <div className="text-8xl font-bold text-gray-300">+</div>
                )}
              </div>
              <input
                type="file"
                id="editSocialIcon"
                accept="image/*"
                className="hidden"
                onChange={handleEditImageSelect}
                ref={editFileInputRef}
              />
              <label
                htmlFor="editSocialIcon"
                className="text-primary cursor-pointer"
                onClick={(e) => {
                  e.preventDefault()
                  editFileInputRef.current?.click()
                }}
              >
                Click to Change icon
              </label>
            </div>

            <div>
              <label className="block mb-2">Social Name</label>
              <input
                type="text"
                value={editForm.name}
                onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                placeholder="X (Formerly Twitter)"
                className="w-full px-4 py-2 border rounded-lg"
              />
            </div>

            <div>
              <label className="block mb-2">Social Link</label>
              <input
                type="text"
                value={editForm.link}
                onChange={(e) => setEditForm({ ...editForm, link: e.target.value })}
                placeholder="www.x.com/hermandai/profile"
                className="w-full px-4 py-2 border rounded-lg"
              />
            </div>

            <div className="flex justify-end gap-3 pt-4">
              <button
                onClick={() => setIsEditModalOpen(false)}
                className="px-6 py-2 border rounded-lg hover:bg-gray-50"
                disabled={isSubmitting}
              >
                Cancel
              </button>
              <button
                className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90"
                onClick={handleUpdateSocial}
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <span className="flex items-center">
                    <Loader className="animate-spin h-4 w-4 mr-2" />
                    Saving...
                  </span>
                ) : (
                  "Save"
                )}
              </button>
            </div>
          </div>
        </div>
      </Modal>

      {/* Remove Social Modal */}
      <Modal
        isOpen={isRemoveModalOpen}
        onRequestClose={() => setIsRemoveModalOpen(false)}
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg md:w-[500px] w-[95vw]"
        overlayClassName="fixed inset-0 bg-black/50"
      >
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <span className="text-red-500">⚠</span>
              Remove Social Link
            </h2>
            <button onClick={() => setIsRemoveModalOpen(false)} className="text-gray-400 hover:text-gray-600">
              ✕
            </button>
          </div>
          <div className="space-y-6">
            <p className="text-gray-600">
              Are you sure you want to remove {selectedSocial?.socialName}? This action cannot be undone.
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setIsRemoveModalOpen(false)}
                className="px-6 py-2 border rounded-lg text-sm"
                disabled={isSubmitting}
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteSocial}
                className="px-6 py-2 bg-primary text-white rounded-lg text-sm"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <span className="flex items-center">
                    <Loader className="animate-spin h-4 w-4 mr-2" />
                    Removing...
                  </span>
                ) : (
                  "Remove"
                )}
              </button>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  )
}

export default SocialLinks