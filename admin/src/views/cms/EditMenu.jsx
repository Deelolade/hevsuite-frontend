"use client"

import { useState, useEffect, createRef } from "react"
import { useDispatch, useSelector } from "react-redux"
import { editMenus, removeMenus } from "../../store/cms/cmsSlice"
import Modal from "react-modal"
import { Loader } from "lucide-react"
import { AiOutlineCloudUpload } from "react-icons/ai"
import DeleteMenuModal from "../../components/modals/cms/menu/DeleteMenuModal"
import EditorToolbar, { modules, formats } from "./editorToolbar"
import ReactQuill from "react-quill-new"
import toast from "react-hot-toast"



const EditMenu = ({ setIsEditMenuOpen, selectedMenu, refreshData, setMenuVisibility, menuVisibility }) => {
  const dispatch = useDispatch()
  const { menus, isLoading } = useSelector((state) => state.cms)

  // Basic menu state
  const [selectedPages, setSelectedPages] = useState([])
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [formData, setFormData] = useState({
    title: "",
    link: "",
    visibility: true,
  })

  // Page editing state
  const [isEditingPage, setIsEditingPage] = useState(false)
  const [pageTitle, setPageTitle] = useState("")
  const [slides, setSlides] = useState([])
  const [bodyText, setBodyText] = useState("")
  const [selectedSlide, setSelectedSlide] = useState(null)
  const [selectedSlideIndex, setSelectedSlideIndex] = useState(null)
  const [editors, setEditors] = useState([{ id: 1, title: "", content: "", checked: true }])
  const [selectedEditor, setSelectedEditor] = useState(null)
  const [selectedContentIndex, setSelectedContentIndex] = useState(null)
  const [isSaving, setIsSaving] = useState(false)
  const [hasPageChanges, setHasPageChanges] = useState(false)

  // Sample pages - replace with your actual pages
  const availablePages = ["Home", "About Us", "Products", "Services", "Contact", "Blog"]

  // File input ref for image upload
  const inputRef = createRef()

  // Initialize form data when selectedMenu changes
  useEffect(() => {
    if (selectedMenu) {
      const menu = menus.find((m) => m._id === selectedMenu)
      if (menu) {
        setFormData({
          title: menu.title || "",
          link: menu.link || "",
          visibility: menu.visibility !== false,
        })

        // Initialize page data if it exists
        if (menu.page) {
          setPageTitle(menu.page.title || "")

          // Initialize hero section slides
          if (menu.page.heroSection && menu.page.heroSection.length > 0) {
            setSlides(
              menu.page.heroSection.map((slide, index) => ({
                id: `slide-${index}`,
                title: slide.button || "",
                image: slide.image || null,
                link: slide.link || "",
                name: slide.name || `Slide ${index + 1}`,
              })),
            )
          } else {
            setSlides([{ id: `slide-${Date.now()}`, title: "", image: null, link: "", name: "Slide 1" }])
          }

          // Initialize body text content
          setBodyText(menu.page.bodyText || "")

          // Initialize content editors
          if (menu.page.bodyText) {
            setEditors([
              {
                id: 1,
                title: "Main Content",
                content: menu.page.bodyText,
                checked: true,
              },
            ])
          }
        }

        // Initialize selected pages
        if (menu.pages && menu.pages.length > 0) {
          setSelectedPages(menu.pages.map((page) => page.title))
        } else {
          setSelectedPages([])
        }
      }
    }
  }, [selectedMenu, menus])

  // Track changes to page data
  useEffect(() => {
    setHasPageChanges(true)
  }, [pageTitle, slides, bodyText, editors])

  const handlePageSelect = (page) => {
    if (!selectedPages.includes(page)) {
      setSelectedPages([...selectedPages, page])
    }
    setIsDropdownOpen(false)
  }

  const handleRemovePage = (pageToRemove) => {
    setSelectedPages(selectedPages.filter((page) => page !== pageToRemove))
  }

  // Handle slide management
  const handleAddSlide = () => {
    if (slides.length >= 5) {
      toast.error("Maximum of 5 slides allowed")
      return
    }

    const newSlide = {
      id: `slide-${Date.now()}`,
      title: "",
      image: null,
      link: "",
      name: `Slide ${slides.length + 1}`,
    }

    setSlides([...slides, newSlide])
  }

  const handleRemoveSlide = (id) => {
    if (slides.length <= 1) {
      toast.error("At least one slide is required")
      return
    }

    setSlides(slides.filter((slide) => slide.id !== id))

    if (selectedSlide && selectedSlide.id === id) {
      setSelectedSlide(null)
      setSelectedSlideIndex(null)
    }
  }

  const handleImageUpload = (e, id) => {
    const file = e.target.files[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = () => {
      setSlides((prevSlides) =>
        prevSlides.map((slide) => (slide.id === id ? { ...slide, image: reader.result } : slide)),
      )
    }
    reader.readAsDataURL(file)
  }

  // Handle content editors
  const handleAddContent = () => {
    const newEditor = {
      id: Date.now(),
      title: "",
      content: "",
      checked: true,
    }
    setEditors([...editors, newEditor])
  }

  const handleRemoveContent = (id) => {
    if (editors.length <= 1) {
      toast.error("At least one content section is required")
      return
    }

    setEditors(editors.filter((editor) => editor.id !== id))

    if (selectedEditor && selectedEditor.id === id) {
      setSelectedEditor(null)
      setSelectedContentIndex(null)
    }
  }

  const handleTitleChange = (id, value) => {
    setEditors((prev) => prev.map((editor) => (editor.id === id ? { ...editor, title: value } : editor)))
  }

  const handleContentChange = (id, value) => {
    setEditors((prev) => prev.map((editor) => (editor.id === id ? { ...editor, content: value } : editor)))
  }

  // Save menu changes
  const handleSaveChanges = async () => {
    try {
      // Validate form
      if (!formData.title.trim()) {
        toast.error("Menu title is required")
        return
      }

      // Prepare data for API call
      const data = {
        id: selectedMenu,
        data: {
          title: formData.title,
          link: formData.link,
          visibility: formData.visibility,
        },
      }

      // If page data has been edited, include it in the update
      if (isEditingPage && hasPageChanges) {
        // Transform slides to match the expected heroSection format
        const heroSection = slides.map((slide) => ({
          name: slide.name || "Slide",
          button: slide.title || "Button",
          image: slide.image || "",
          link: slide.link || "#",
        }))

        // Combine all editor content for bodyText
        const combinedBodyText = editors.map((editor) => editor.content).join("\n\n")

        // Add page data to the update
        data.data.page = {
          title: pageTitle,
          heroSection: heroSection,
          bodyText: combinedBodyText || bodyText,
        }
      }

      // Dispatch the action to update menu
      await dispatch(editMenus(data)).unwrap()

      // Reset state and close modal
      setIsEditingPage(false)
      setHasPageChanges(false)
      setIsEditMenuOpen(false)

      // Refresh data
      if (refreshData) refreshData()

      toast.success("Menu updated successfully")
    } catch (error) {
      console.error("Error updating menu:", error)
      toast.error("Failed to update menu")
    }
  }

  const handleDeleteMenu = async () => {
    try {
      // Dispatch the action to remove menu
      await dispatch(removeMenus({ id: selectedMenu })).unwrap()

      // Close modals and refresh data
      setIsDeleteModalOpen(false)
      setIsEditMenuOpen(false)
      if (refreshData) refreshData()
    } catch (error) {
      console.error("Error deleting menu:", error)
      toast.error("Failed to delete menu")
    }
  }

  // Toggle between basic menu editing and page editing
  const togglePageEditing = () => {
    setIsEditingPage(!isEditingPage)
  }

  // Render the basic menu editing form
  const renderBasicMenuForm = () => (
    <div className="space-y-6">
      {/* Menu Title */}
      <div>
        <label className="block text-sm mb-2">Menu Title</label>
        <input
          type="text"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          className="w-full px-3 py-2 border rounded-lg text-sm"
        />
      </div>

      {/* Link */}
      <div>
        <label className="block text-sm mb-2">Link (available)</label>
        <input
          type="text"
          value={formData.link}
          onChange={(e) => setFormData({ ...formData, link: e.target.value })}
          className="w-full px-3 py-2 border rounded-lg text-sm"
        />
      </div>

      {/* Visibility and Pages */}
      <div className="flex justify-between items-center">
        <div>
          <label className="block text-sm mb-2">Visibility</label>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={formData.visibility}
              className="sr-only peer"
              onChange={(e) => {
                setFormData({ ...formData, visibility: e.target.checked })
                if (setMenuVisibility) setMenuVisibility(e.target.checked)
              }}
            />
            <div className="w-11 h-6 bg-gray-500 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
          </label>
        </div>
        <div className="relative">
          <label className="block text-sm mb-2">Add Menu Pages</label>
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              {selectedPages.map((page, index) => (
                <span key={index} className="px-3 py-1 border rounded-lg text-sm flex items-center gap-2">
                  {page}
                  <button
                    className="text-gray-400 hover:text-gray-600"
                    onClick={() => handleRemovePage(page)}
                    disabled={isLoading}
                  >
                    ✕
                  </button>
                </span>
              ))}
            </div>
            <div className="relative">
              <button
                className="px-4 py-2 border rounded-lg text-sm w-full flex justify-between items-center"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                disabled={isLoading}
              >
                Select Pages
                <svg
                  className={`w-4 h-4 transform transition-transform ${isDropdownOpen ? "rotate-180" : ""}`}
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>

              {isDropdownOpen && (
                <div className="absolute z-10 mt-1 w-full bg-white border rounded-lg shadow-lg max-h-48 overflow-y-auto">
                  {availablePages.map((page, index) => (
                    <button
                      key={index}
                      className={`w-full px-4 py-2 text-left text-sm hover:bg-gray-50 ${
                        selectedPages.includes(page) ? "text-gray-400" : "text-gray-700"
                      }`}
                      onClick={() => handlePageSelect(page)}
                      disabled={selectedPages.includes(page) || isLoading}
                    >
                      {page}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Edit Page Content Button */}
      <div className="flex justify-center pt-4">
        <button
          onClick={togglePageEditing}
          className="px-6 py-2 bg-blue-500 text-white rounded-lg text-sm"
          disabled={isLoading}
        >
          Edit Page Content
        </button>
      </div>
    </div>
  )

  // Render the page editing form
  const renderPageEditingForm = () => (
    <div className="space-y-6">
      {/* Back to Menu Editing Button */}
      <div className="flex items-center gap-2 mb-4">
        <button className="text-gray-600 flex items-center gap-1" onClick={togglePageEditing} disabled={isLoading}>
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Menu Settings
        </button>
      </div>

      {/* Page Title */}
      <div className="bg-white rounded-lg p-4 border">
        <div>
          <label className="block text-sm mb-2">Page Title</label>
          <input
            type="text"
            value={pageTitle}
            onChange={(e) => setPageTitle(e.target.value)}
            placeholder="Title"
            className="w-full px-3 py-2 border rounded-lg text-sm"
          />
        </div>
      </div>

      {/* Hero Section */}
      <div className="bg-white rounded-lg p-4 border">
        <h3 className="text-lg font-medium mb-4">Hero Section</h3>
        <p className="text-sm text-primary mb-4">Click Any Slide To Edit</p>

        <div className="grid grid-cols-1 md:grid-cols-4 mb-4">
          <div className="bg-white p-4 col-span-3 space-x-2 overflow-auto flex flex-row">
            {slides.map((slide, index) => (
              <div key={slide.id} className="flex flex-row">
                <div
                  onClick={() => {
                    setSelectedSlideIndex(index)
                    setSelectedSlide(slide)
                  }}
                  className={`h-32 w-44 relative cursor-pointer active:scale-95 transition-all duration-50 flex items-center justify-center flex-col space-y-2 text-center shadow-lg rounded-lg ${
                    selectedSlide?.id === slide.id ? "border-2 border-primary" : ""
                  }`}
                >
                  {slide.image ? (
                    <img
                      src={slide.image || "/placeholder.svg"}
                      alt="Slide"
                      className="object-cover m-auto h-full p-2"
                    />
                  ) : (
                    <span>Slide {index + 1}</span>
                  )}
                </div>
                <div>
                  <button
                    onClick={() => handleRemoveSlide(slide.id)}
                    className="text-red-600 cursor-pointer rounded-full shadow-lg text-lg bg-white"
                  >
                    ✕
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-transparent col-span-1 p-4">
            <div
              onClick={handleAddSlide}
              className="h-32 w-44 cursor-pointer active:scale-90 transition-all duration-300 flex items-center justify-center flex-col space-y-2 text-center border border-primary border-dashed rounded-lg"
            >
              <span className="flex items-center bottom-2 font-semibold text-primary text-sm cursor-pointer">
                Add Slide
              </span>
              <p className="text-primary">+</p>
            </div>
          </div>
        </div>

        {/* Selected Slide Details */}
        {selectedSlide && (
          <div className="bg-white border border-gray-200 rounded-lg mb-4 p-4">
            <div className="flex justify-between mb-4">
              <h4 className="text-lg font-medium">Slide {selectedSlideIndex + 1}</h4>
            </div>

            {/* Image Preview */}
            <div className="mb-4">
              <p className="block text-sm font-medium mb-2">Image</p>
              {slides[selectedSlideIndex]?.image ? (
                <div className="relative">
                  <img
                    src={slides[selectedSlideIndex].image || "/placeholder.svg"}
                    alt="Slide"
                    className="object-cover max-h-40 rounded-lg mx-auto"
                  />
                </div>
              ) : (
                <div className="h-40 bg-gray-100 rounded-lg flex items-center justify-center">
                  <span className="text-gray-400">No image selected</span>
                </div>
              )}
            </div>

            {/* Image Upload */}
            <div className="mb-4">
              <div className="flex items-center justify-center">
                <label className="cursor-pointer">
                  <div className="flex items-center gap-2 text-primary">
                    <AiOutlineCloudUpload size={20} />
                    <span className="text-sm">
                      {slides[selectedSlideIndex]?.image ? "Replace Image" : "Upload Image"}
                    </span>
                    <input
                      ref={inputRef}
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleImageUpload(e, slides[selectedSlideIndex].id)}
                      className="hidden"
                    />
                  </div>
                </label>
              </div>
            </div>

            {/* Button Text */}
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Button Text</label>
              <input
                type="text"
                value={slides[selectedSlideIndex]?.title || ""}
                onChange={(e) => {
                  setSlides((prev) => {
                    const updatedSlides = [...prev]
                    updatedSlides[selectedSlideIndex] = {
                      ...updatedSlides[selectedSlideIndex],
                      title: e.target.value,
                    }
                    return updatedSlides
                  })
                }}
                className="w-full px-3 py-2 border rounded-lg text-sm"
                placeholder="Button Text"
              />
            </div>

            {/* Link */}
            <div>
              <label className="block text-sm font-medium mb-2">Link</label>
              <input
                type="text"
                value={slides[selectedSlideIndex]?.link || ""}
                onChange={(e) => {
                  setSlides((prev) => {
                    const updatedSlides = [...prev]
                    updatedSlides[selectedSlideIndex] = {
                      ...updatedSlides[selectedSlideIndex],
                      link: e.target.value,
                    }
                    return updatedSlides
                  })
                }}
                className="w-full px-3 py-2 border rounded-lg text-sm"
                placeholder="https://example.com"
              />
            </div>
          </div>
        )}
      </div>

      {/* Content Sections */}
      <div className="bg-white rounded-lg p-4 border">
        <h3 className="text-lg font-medium mb-4">Content Sections</h3>
        <p className="text-sm text-primary mb-4">Click Any Section To Edit</p>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white p-4 col-span-3 space-x-2 overflow-auto flex flex-row">
            {editors.map((editor, index) => (
              <div className="flex flex-row" key={editor.id}>
                <div
                  onClick={() => {
                    setSelectedContentIndex(index)
                    setSelectedEditor(editor)
                  }}
                  className={`h-32 w-44 relative cursor-pointer active:scale-95 transition-all duration-50 flex items-center justify-center flex-col space-y-2 text-center shadow-lg rounded-lg ${
                    selectedEditor?.id === editor.id ? "border-2 border-primary" : ""
                  }`}
                >
                  <p className="font-medium px-2 truncate w-full">{editor.title || "Untitled"}</p>
                </div>
                <div>
                  <button
                    onClick={() => handleRemoveContent(editor.id)}
                    className="text-red-600 cursor-pointer rounded-full shadow-lg text-lg bg-white"
                  >
                    ✕
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-transparent col-span-1 p-4">
            <div
              onClick={handleAddContent}
              className="h-32 w-44 cursor-pointer active:scale-95 transition-all duration-50 flex items-center justify-center flex-col space-y-2 text-center border border-primary border-dashed rounded-lg"
            >
              <span className="text-primary font-medium text-sm">Add Content</span>
              <div className="text-primary">+</div>
            </div>
          </div>
        </div>

        {/* Selected Content Editor */}
        {selectedEditor && (
          <div className="bg-white border border-gray-200 rounded-lg p-4">
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Section Title</label>
              <input
                type="text"
                value={editors[selectedContentIndex]?.title || ""}
                onChange={(e) => handleTitleChange(editors[selectedContentIndex].id, e.target.value)}
                className="w-full px-3 py-2 border rounded-lg text-sm"
                placeholder="Section Title"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Content</label>
              <EditorToolbar />
              <ReactQuill
                theme="snow"
                modules={modules}
                formats={formats}
                value={editors[selectedContentIndex]?.content || ""}
                onChange={(value) => handleContentChange(editors[selectedContentIndex].id, value)}
                className="bg-white rounded-lg border border-gray-200 min-h-[200px] mb-4"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  )

  return (
    <div className="p-6 max-h-[80vh] overflow-y-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">{isEditingPage ? "Edit Page Content" : "Edit Menu"}</h2>
        <button onClick={() => setIsEditMenuOpen(false)} className="text-gray-400 hover:text-gray-600">
          ✕
        </button>
      </div>

      {/* Render either basic menu form or page editing form */}
      {isEditingPage ? renderPageEditingForm() : renderBasicMenuForm()}

      {/* Action Buttons */}
      <div className="flex justify-end gap-3 pt-6 mt-4 border-t">
        <button
          onClick={() => setIsEditMenuOpen(false)}
          className="px-6 py-2 border rounded-lg text-sm"
          disabled={isLoading || isSaving}
        >
          Cancel
        </button>
        {!isEditingPage && (
          <button
            onClick={() => setIsDeleteModalOpen(true)}
            className="px-6 py-2 bg-red-500 text-white rounded-lg text-sm"
            disabled={isLoading || isSaving}
          >
            Delete Menu
          </button>
        )}
        <button
          onClick={handleSaveChanges}
          className="px-6 py-2 bg-primary text-white rounded-lg text-sm"
          disabled={isLoading || isSaving}
        >
          {isLoading || isSaving ? (
            <span className="flex items-center">
              <Loader className="animate-spin h-4 w-4 mr-2" />
              Saving...
            </span>
          ) : (
            "Save Changes"
          )}
        </button>
      </div>

      {/* Delete Menu Modal */}
      <Modal
        isOpen={isDeleteModalOpen}
        onRequestClose={() => setIsDeleteModalOpen(false)}
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg w-[450px]"
        overlayClassName="fixed inset-0 bg-black/50"
      >
        <DeleteMenuModal
          setIsDeleteModalOpen={setIsDeleteModalOpen}
          handleDeleteMenu={handleDeleteMenu}
          isLoading={isLoading}
        />
      </Modal>
    </div>
  )
}

export default EditMenu
