"use client"

import { useState, useEffect } from "react"
import Modal from "react-modal"
import { AiOutlineCloudUpload } from "react-icons/ai"
import { useDispatch, useSelector } from "react-redux"
import { getLogos, uploadWebsiteLogo, uploadAdminLogo, uploadFavIcon, uploadFooterIcon } from "../../store/cms/cmsSlice"
import { Loader } from "lucide-react"
import toast from "react-hot-toast"
import defaultLogo from "../../assets/logo_white.png"

const SiteLogos = () => {
  const dispatch = useDispatch()
  const { logos, isLoading } = useSelector((state) => state.cms)

  const [isWebsiteLogoModalOpen, setIsWebsiteLogoModalOpen] = useState(false)
  const [isAdminLogoModalOpen, setIsAdminLogoModalOpen] = useState(false)
  const [isFavIconModalOpen, setIsFavIconModalOpen] = useState(false)
  const [isFooterIconModalOpen, setIsFooterIconModalOpen] = useState(false)

  const [websiteLogo, setWebsiteLogo] = useState(defaultLogo)
  const [adminLogo, setAdminLogo] = useState(defaultLogo)
  const [favIcon, setFavIcon] = useState(defaultLogo)
  const [footerIcon, setFooterIcon] = useState(defaultLogo)

  const [selectedImage, setSelectedImage] = useState(null)
  const [currentLogoType, setCurrentLogoType] = useState(null)

  // Fetch logos on component mount
  useEffect(() => {
    dispatch(getLogos())
  }, [dispatch])

  // Update local state when logos are loaded from Redux
  useEffect(() => {
    if (logos) {
      if (logos.websiteLogo) setWebsiteLogo(logos.websiteLogo)
      if (logos.adminLogo) setAdminLogo(logos.adminLogo)
      if (logos.favIcon) setFavIcon(logos.favIcon)
      if (logos.footerIcon) setFooterIcon(logos.footerIcon)
    }
  }, [logos])

  const handleImageSelect = (e, setImage) => {
    const file = e.target.files[0]
    if (file) {
      // Check file size (max 2MB)
      if (file.size > 2 * 1024 * 1024) {
        toast.error("Image size should be less than 2MB")
        return
      }

      // Check file type
      if (!file.type.startsWith("image/")) {
        toast.error("Please select an image file")
        return
      }

      setSelectedImage(file)
      setImage(URL.createObjectURL(file))
    }
  }

  const handleSaveLogo = async () => {
    if (!selectedImage) {
      toast.error("Please select an image first")
      return
    }

    try {
      switch (currentLogoType) {
        case "website":
          await dispatch(uploadWebsiteLogo(selectedImage)).unwrap()
          setIsWebsiteLogoModalOpen(false)
          break
        case "admin":
          await dispatch(uploadAdminLogo(selectedImage)).unwrap()
          setIsAdminLogoModalOpen(false)
          break
        case "favicon":
          await dispatch(uploadFavIcon(selectedImage)).unwrap()
          setIsFavIconModalOpen(false)
          break
        case "footer":
          await dispatch(uploadFooterIcon(selectedImage)).unwrap()
          setIsFooterIconModalOpen(false)
          break
        default:
          toast.error("Invalid logo type")
      }

      // Reset selected image after successful upload
      setSelectedImage(null)
    } catch (error) {
      console.error("Error uploading logo:", error)
    }
  }

  const openLogoModal = (type) => {
    setCurrentLogoType(type)
    setSelectedImage(null)

    switch (type) {
      case "website":
        setIsWebsiteLogoModalOpen(true)
        break
      case "admin":
        setIsAdminLogoModalOpen(true)
        break
      case "favicon":
        setIsFavIconModalOpen(true)
        break
      case "footer":
        setIsFooterIconModalOpen(true)
        break
      default:
        break
    }
  }

  const LogoModal = ({ title, isOpen, setIsOpen, currentLogo, setLogo, logoType }) => (
    <Modal
      isOpen={isOpen}
      onRequestClose={() => {
        setIsOpen(false)
        setSelectedImage(null)
      }}
      className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg md:w-[450px] w-[90vw]"
      overlayClassName="fixed inset-0 bg-black/50"
    >
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Change {title}</h2>
          <button
            onClick={() => {
              setIsOpen(false)
              setSelectedImage(null)
            }}
            className="text-gray-400 hover:text-gray-600"
          >
            ✕
          </button>
        </div>

        <div className="space-y-6">
          <div className="w-32 h-32 mx-auto rounded-2xl flex items-center justify-center border">
            <img
              src={currentLogo || "/placeholder.svg"}
              alt={title.toLowerCase()}
              className="max-w-full max-h-full object-contain"
            />
          </div>

          <div className="flex flex-col items-center gap-2">
            <label className="text-primary flex items-center gap-2 cursor-pointer">
              <AiOutlineCloudUpload size={20} />
              <span>Click to replace image</span>
              <input type="file" className="hidden" accept="image/*" onChange={(e) => handleImageSelect(e, setLogo)} />
            </label>
            <p className="text-xs text-gray-500">Max size: 2MB. Formats: JPG, PNG, SVG</p>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-3 pt-4">
            <button
              onClick={() => {
                setIsOpen(false)
                setSelectedImage(null)
              }}
              className="px-6 py-2 border rounded-lg text-sm"
            >
              Cancel
            </button>
            <button
              onClick={handleSaveLogo}
              className="px-6 py-2 bg-primary text-white rounded-lg text-sm"
              disabled={isLoading || !selectedImage}
            >
              {isLoading ? (
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
  )

  return (
    <div className="space-y-8">
      <h2 className="text-xl font-semibold">Site Logos</h2>

      {isLoading && !logos && (
        <div className="flex justify-center items-center h-40">
          <Loader className="animate-spin h-8 w-8 text-primary" />
        </div>
      )}

      {/* Website Logo Section */}
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h3 className="text-gray-600">Website logo</h3>
          <div className="w-16 h-16 rounded-lg flex items-center justify-center border">
            <img
              src={websiteLogo || "/placeholder.svg"}
              alt="web logo"
              className="max-w-full max-h-full object-contain"
            />
          </div>
        </div>
        <button
          className="px-4 py-2 bg-primary text-white rounded-lg text-sm"
          onClick={() => openLogoModal("website")}
          disabled={isLoading}
        >
          {isLoading ? (
            <span className="flex items-center">
              <Loader className="animate-spin h-4 w-4 mr-2" />
              Loading...
            </span>
          ) : (
            "Upload New"
          )}
        </button>
      </div>

      {/* Admin Logo Section */}
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h3 className="text-gray-600">Admin logo</h3>
          <div className="w-16 h-16 rounded-lg flex items-center justify-center border">
            <img
              src={adminLogo || "/placeholder.svg"}
              alt="admin logo"
              className="max-w-full max-h-full object-contain"
            />
          </div>
        </div>
        <button
          className="px-4 py-2 bg-primary text-white rounded-lg text-sm"
          onClick={() => openLogoModal("admin")}
          disabled={isLoading}
        >
          {isLoading ? (
            <span className="flex items-center">
              <Loader className="animate-spin h-4 w-4 mr-2" />
              Loading...
            </span>
          ) : (
            "Upload New"
          )}
        </button>
      </div>

      {/* Fav Icon Section */}
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h3 className="text-gray-600">Fav Icon</h3>
          <div className="w-16 h-16 rounded-lg flex items-center justify-center border">
            <img src={favIcon || "/placeholder.svg"} alt="fav logo" className="max-w-full max-h-full object-contain" />
          </div>
        </div>
        <button
          className="px-4 py-2 bg-primary text-white rounded-lg text-sm"
          onClick={() => openLogoModal("favicon")}
          disabled={isLoading}
        >
          {isLoading ? (
            <span className="flex items-center">
              <Loader className="animate-spin h-4 w-4 mr-2" />
              Loading...
            </span>
          ) : (
            "Upload New"
          )}
        </button>
      </div>

      {/* Footer Icon Section */}
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h3 className="text-gray-600">Footer Icon</h3>
          <div className="w-16 h-16 rounded-lg flex items-center justify-center border">
            <img
              src={footerIcon || "/placeholder.svg"}
              alt="footer logo"
              className="max-w-full max-h-full object-contain"
            />
          </div>
        </div>
        <button
          className="px-4 py-2 bg-primary text-white rounded-lg text-sm"
          onClick={() => openLogoModal("footer")}
          disabled={isLoading}
        >
          {isLoading ? (
            <span className="flex items-center">
              <Loader className="animate-spin h-4 w-4 mr-2" />
              Loading...
            </span>
          ) : (
            "Upload New"
          )}
        </button>
      </div>

      {/* Modals */}
      <LogoModal
        title="Website Logo"
        isOpen={isWebsiteLogoModalOpen}
        setIsOpen={setIsWebsiteLogoModalOpen}
        currentLogo={websiteLogo}
        setLogo={setWebsiteLogo}
        logoType="website"
      />
      <LogoModal
        title="Admin Logo"
        isOpen={isAdminLogoModalOpen}
        setIsOpen={setIsAdminLogoModalOpen}
        currentLogo={adminLogo}
        setLogo={setAdminLogo}
        logoType="admin"
      />
      <LogoModal
        title="Fav Icon"
        isOpen={isFavIconModalOpen}
        setIsOpen={setIsFavIconModalOpen}
        currentLogo={favIcon}
        setLogo={setFavIcon}
        logoType="favicon"
      />
      <LogoModal
        title="Footer Icon"
        isOpen={isFooterIconModalOpen}
        setIsOpen={setIsFooterIconModalOpen}
        currentLogo={footerIcon}
        setLogo={setFooterIcon}
        logoType="footer"
      />
    </div>
  )
}

export default SiteLogos
