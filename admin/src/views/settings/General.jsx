"use client"

import { useState, useRef, useEffect } from "react"
import Modal from "react-modal"
import { BsEyeSlash, BsEye } from "react-icons/bs"
import { useDispatch, useSelector } from "react-redux"
import { getSettings, updateGeneralSettings } from "../../store/setting/settingSlice"
import { toast } from "react-toastify"
import { Loader } from "lucide-react"

const General = () => {
  const dispatch = useDispatch()
  const { settings, isLoading } = useSelector((state) => state.settings)
  const fileInputRef = useRef(null)

  // Form state
  const [formData, setFormData] = useState({
    favicon: "",
    siteTitle: "Hevsuite Club",
    maintenanceMode: false,
    requiredJoiningAge: 24,
    requiredReferralNumber: 0,
  })

  // UI state
  const [isMaintenanceModalOpen, setIsMaintenanceModalOpen] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [faviconPreview, setFaviconPreview] = useState(null)
  const [maintenanceForm, setMaintenanceForm] = useState({
    link: "",
    reason: "",
    password: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Fetch settings on component mount
  useEffect(() => {
    dispatch(getSettings())
  }, [dispatch])

  // Update form data when settings are loaded
  useEffect(() => {
    // Debug log to see what's coming from the API
    console.log("Settings from Redux:", settings)

    if (settings && settings.general) {
      const generalSettings = settings.general

      // Debug log to see the general settings
      console.log("General settings:", generalSettings)

      setFormData({
        favicon: generalSettings.favicon || "",
        siteTitle: generalSettings.siteTitle || "Hevsuite Club",
        maintenanceMode: generalSettings.maintenanceMode || false,
        requiredJoiningAge: generalSettings.requiredJoiningAge ?? 24,
        requiredReferralNumber: generalSettings.requiredReferralNumber ?? 0,
      })

      if (generalSettings.favicon) {
        setFaviconPreview(generalSettings.favicon)
      }
    }
  }, [settings])

  const handleFaviconSelect = async (e) => {
    const file = e.target.files[0]
    if (!file) return

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

    // Create preview
    const imageUrl = URL.createObjectURL(file)
    setFaviconPreview(imageUrl)

    // Convert to base64 for storage
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onloadend = () => {
      setFormData({
        ...formData,
        favicon: reader.result,
      })
    }
  }

  const handleFaviconClick = () => {
    if (isEditing && fileInputRef.current) {
      fileInputRef.current.click()
    }
  }

  const handleMaintenanceToggle = () => {
    if (!formData.maintenanceMode) {
      setIsMaintenanceModalOpen(true)
    } else {
      setFormData({
        ...formData,
        maintenanceMode: false,
      })
    }
  }

  const handleConfirmMaintenance = () => {
    // Validate password
    if (!maintenanceForm.password) {
      toast.error("Password is required to enable maintenance mode")
      return
    }

    // Here you would typically verify the password with the backend
    // For now, we'll just set the maintenance mode
    setFormData({
      ...formData,
      maintenanceMode: true,
    })
    setIsMaintenanceModalOpen(false)
  }

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    })
  }

  const toggleEditMode = () => {
    if (isEditing) {
      // Save changes
      handleSaveSettings()
    } else {
      // Enter edit mode
      setIsEditing(true)
    }
  }

  const handleSaveSettings = async () => {
    setIsSubmitting(true)
    try {
      // Validate inputs
      const joiningAge = Number.parseInt(formData.requiredJoiningAge)
      const referralNumber = Number.parseInt(formData.requiredReferralNumber)

      if (isNaN(joiningAge) || joiningAge < 18) {
        toast.error("Required joining age must be at least 18")
        setIsSubmitting(false)
        return
      }

      if (isNaN(referralNumber) || referralNumber < 0) {
        toast.error("Required referral number must be zero or a positive number")
        setIsSubmitting(false)
        return
      }

      // Update form data with validated values
      const updatedFormData = {
        ...formData,
        requiredJoiningAge: joiningAge,
        requiredReferralNumber: referralNumber,
      }

      // Dispatch update action
      await dispatch(updateGeneralSettings(updatedFormData)).unwrap()

      // Exit edit mode on success
      setIsEditing(false)
      toast.success("General settings updated successfully")
    } catch (error) {
      toast.error(error.message || "Failed to update settings")
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isLoading && !settings.general) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader className="animate-spin h-8 w-8 text-primary" />
      </div>
    )
  }

  return (
    <div>
      {/* General Settings Content */}
      <div className="space-y-8">
        {/* Favicon */}
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg mb-4">Favicon</h3>
            <div
              className={`w-20 h-20 rounded-full border flex items-center justify-center ${isEditing ? "cursor-pointer hover:bg-gray-50" : ""}`}
              onClick={handleFaviconClick}
            >
              {faviconPreview ? (
                <img
                  src={faviconPreview || "/placeholder.svg"}
                  alt="Favicon"
                  className="w-full h-full rounded-full object-cover"
                  onError={() => {
                    console.log("Error loading favicon, using placeholder")
                    setFaviconPreview(null)
                  }}
                />
              ) : (
                <span className="text-gray-400">No image</span>
              )}
            </div>
            {isEditing && <p className="text-xs text-gray-500 mt-2">Click to upload a new favicon</p>}
          </div>
          <div>
            <input
              type="file"
              id="faviconInput"
              accept="image/*"
              onChange={handleFaviconSelect}
              className="hidden"
              ref={fileInputRef}
              disabled={!isEditing}
            />
            <button
              onClick={toggleEditMode}
              className={`px-6 py-2 ${isEditing ? "bg-green-600" : "bg-primary"} text-white rounded-lg`}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <span className="flex items-center">
                  <Loader className="animate-spin h-4 w-4 mr-2" />
                  Saving...
                </span>
              ) : isEditing ? (
                "Save"
              ) : (
                "Edit"
              )}
            </button>
          </div>
        </div>

        {/* Site Title */}
        <div>
          <h3 className="text-lg mb-4">Site Title</h3>
          <input
            type="text"
            name="siteTitle"
            value={formData.siteTitle}
            onChange={handleInputChange}
            className={`w-full max-w-md px-4 py-2 border rounded-lg ${isEditing ? "bg-white" : "bg-gray-50"}`}
            readOnly={!isEditing}
          />
        </div>

        {/* Maintenance Mode */}
        <div>
          <div className="flex items-center justify-between">
            <h3 className="text-lg">Maintenance Mode</h3>
            <label className={`relative inline-flex items-center ${!isEditing && "pointer-events-none opacity-70"}`}>
              <input
                type="checkbox"
                name="maintenanceMode"
                className="sr-only peer"
                checked={formData.maintenanceMode}
                onChange={handleMaintenanceToggle}
                disabled={!isEditing}
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
            </label>
          </div>
          {formData.maintenanceMode && (
            <p className="text-sm text-amber-600 mt-2">
              Warning: The site is currently in maintenance mode. Users cannot access the site.
            </p>
          )}
        </div>

        {/* Required Joining Age */}
        <div>
          <h3 className="text-lg mb-4">Required Joining Age</h3>
          <div className="relative inline-block">
            <input
              type="number"
              name="requiredJoiningAge"
              value={formData.requiredJoiningAge}
              onChange={handleInputChange}
              min="18"
              className={`w-24 px-4 py-2 border rounded-lg pr-12 ${!isEditing && "bg-gray-50"}`}
              readOnly={!isEditing}
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500">yrs</span>
          </div>
        </div>

        {/* Required Number of Referral */}
        <div>
          <h3 className="text-lg mb-4">Required Number of Referral</h3>
          <input
            type="number"
            name="requiredReferralNumber"
            value={formData.requiredReferralNumber}
            onChange={handleInputChange}
            min="0"
            className={`w-24 px-4 py-2 border rounded-lg ${!isEditing && "bg-gray-50"}`}
            readOnly={!isEditing}
          />
        </div>
      </div>

      {/* Maintenance Mode Modal */}
      <Modal
        isOpen={isMaintenanceModalOpen}
        onRequestClose={() => setIsMaintenanceModalOpen(false)}
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg md:w-[500px] w-[95vw]"
        overlayClassName="fixed inset-0 bg-black/50"
      >
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-red-50 flex items-center justify-center">
                <span className="text-red-500">⚠</span>
              </div>
              <h2 className="text-xl">Close Website Temporarily</h2>
            </div>
            <button onClick={() => setIsMaintenanceModalOpen(false)} className="text-gray-400 hover:text-gray-600">
              ✕
            </button>
          </div>

          <p className="text-gray-600 mb-6">
            Are you sure you want to close the website temporarily? Users will no longer be able to access the website.
          </p>

          <div className="space-y-4">
            <div>
              <label className="block mb-2">Link (if any)</label>
              <input
                type="text"
                value={maintenanceForm.link}
                onChange={(e) =>
                  setMaintenanceForm({
                    ...maintenanceForm,
                    link: e.target.value,
                  })
                }
                className="w-full px-4 py-2 border rounded-lg"
                placeholder="Alternative site URL"
              />
            </div>

            <div>
              <label className="block mb-2">Reason</label>
              <input
                type="text"
                value={maintenanceForm.reason}
                onChange={(e) =>
                  setMaintenanceForm({
                    ...maintenanceForm,
                    reason: e.target.value,
                  })
                }
                className="w-full px-4 py-2 border rounded-lg"
                placeholder="Reason for maintenance"
              />
            </div>

            <div>
              <label className="block mb-2">
                Password <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={maintenanceForm.password}
                  onChange={(e) =>
                    setMaintenanceForm({
                      ...maintenanceForm,
                      password: e.target.value,
                    })
                  }
                  placeholder="Enter your Password"
                  className="w-full px-4 py-2 border rounded-lg pr-10"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                >
                  {showPassword ? <BsEyeSlash size={20} /> : <BsEye size={20} />}
                </button>
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-4">
              <button
                onClick={() => setIsMaintenanceModalOpen(false)}
                className="px-6 py-2 border rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmMaintenance}
                className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  )
}

export default General
