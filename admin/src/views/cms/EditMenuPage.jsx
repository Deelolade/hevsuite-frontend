"use client"

import { useState, useEffect, useRef } from "react"
import { BsArrowLeft } from "react-icons/bs"
import { AiOutlineCloudUpload } from "react-icons/ai"
import { useDispatch, useSelector } from "react-redux"
import { editMenus } from "../../store/cms/cmsSlice"
import { Loader } from 'lucide-react'
import toast from "react-hot-toast"

const EditMenuPage = ({ onBack, selectedItem }) => {
  const dispatch = useDispatch()
  const { isLoading, menus } = useSelector((state) => state.cms)

  const [title, setTitle] = useState("")
  const [buttonText, setButtonText] = useState("")
  const [link, setLink] = useState("")
  const [slides, setSlides] = useState([{ id: 1, title: "", image: null, link: "", content: "" }])
  const [editors, setEditors] = useState([{ id: 1, title: "", content: "", checked: true }])
  const [selectedSlide, setSelectedSlide] = useState(null)
  const [selectedSlideIndex, setSelectedSlideIndex] = useState(null)
  const [selectedEditor, setSelectedEditor] = useState(null)
  const [selectedContentIndex, setSelectedContentIndex] = useState(null)
  const [isSystem, setIsSystem] = useState(false)
  const [menuId, setMenuId] = useState(null)
  const [initialDataLoaded, setInitialDataLoaded] = useState(false)

  const inputRef2 = useRef(null)

  // Initialize form with selected item data
  useEffect(() => {
    if (selectedItem && !initialDataLoaded) {
      console.log("Selected item data:", selectedItem)

      // Set basic fields
      setTitle(selectedItem.title || "")
      setButtonText(selectedItem.buttonText || "")
      setLink(selectedItem.link || "")

      // Initialize slides
      if (selectedItem.slides && selectedItem.slides.length > 0) {
        const formattedSlides = selectedItem.slides.map((slide, index) => ({
          id: index + 1,
          title: slide.title || "",
          image: slide.image || null,
          link: slide.link || "",
          content: slide.content || "",
        }))
        setSlides(formattedSlides)

        // Select first slide by default for better UX
        setSelectedSlide(formattedSlides[0])
        setSelectedSlideIndex(0)
      } else {
        // Default slide if none exist
        setSlides([{ id: 1, title: "", image: null, link: "", content: "" }])
      }

      // Initialize editors
      if (selectedItem.content && selectedItem.content.length > 0) {
        const formattedEditors = selectedItem.content.map((content, index) => ({
          id: index + 1,
          title: content.title || "",
          content: content.content || "",
          checked: content.visibility !== false,
        }))
        setEditors(formattedEditors)

        // Select first editor by default for better UX
        setSelectedEditor(formattedEditors[0])
        setSelectedContentIndex(0)
      } else {
        // Default editor if none exist
        setEditors([{ id: 1, title: "", content: "", checked: true }])
      }

      // Set menu ID if available
      if (selectedItem.menuId) {
        setMenuId(selectedItem.menuId)
      }

      setInitialDataLoaded(true)
    }

    // Check if system page
    const params = new URLSearchParams(window.location.search).get("system")
    if (String(params) === "true") {
      setIsSystem(false) // Set to false to ensure all fields are visible regardless
    }
  }, [selectedItem, initialDataLoaded])

  const handleRemoveSlide = (id) => {
    if (slides.length === 1) {
      toast.warning("You must have at least one slide")
      return
    }
    setSlides((prevSlides) => {
      const updatedSlides = prevSlides.filter((slide) => slide.id !== id)

      // If the selected slide is removed, select the first available slide
      if (selectedSlide && selectedSlide.id === id) {
        setSelectedSlide(updatedSlides[0])
        setSelectedSlideIndex(0)
      }

      return updatedSlides
    })
  }

  const handleAddSlide = () => {
    if (slides.length === 5) {
      toast.warning("Maximum 5 slides allowed")
      return
    }

    const newSlide = {
      id: Date.now(),
      image: null,
      title: "",
      link: "",
      content: "",
    }

    setSlides((prevSlides) => [...prevSlides, newSlide])

    // Optionally select the newly added slide
    setSelectedSlide(newSlide)
    setSelectedSlideIndex(slides.length)
  }

  const handleImageUpload2 = (e, id) => {
    const file = e.target.files[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = () => {
      setSlides((prevSlides) => {
        const updatedSlides = prevSlides.map((s) => {
          if (s.id === id) {
            return { ...s, image: reader.result }
          }
          return s
        })

        // Update selected slide if it's the one being modified
        if (selectedSlide && selectedSlide.id === id) {
          setSelectedSlide({ ...selectedSlide, image: reader.result })
        }

        return updatedSlides
      })
    }
    reader.readAsDataURL(file)
  }

  const handleAddContent = () => {
    const newEditor = {
      id: Date.now(),
      title: "",
      content: "",
      checked: true,
    }

    setEditors((prev) => [...prev, newEditor])

    // Optionally select the newly added editor
    setSelectedEditor(newEditor)
    setSelectedContentIndex(editors.length)
  }

  const handleRemoveContent = (id) => {
    if (editors.length === 1) {
      toast.warning("You must have at least one content section")
      return
    }

    setEditors((prev) => {
      const updatedEditors = prev.filter((editor) => editor.id !== id)

      // If the selected editor is removed, select the first available editor
      if (selectedEditor && selectedEditor.id === id) {
        setSelectedEditor(updatedEditors[0])
        setSelectedContentIndex(0)
      }

      return updatedEditors
    })
  }

  const handleTitleChange = (id, value) => {
    setEditors((prev) => {
      const updatedEditors = prev.map((editor) => {
        if (editor.id === id) {
          return { ...editor, title: value }
        }
        return editor
      })

      // Update selected editor if it's the one being modified
      if (selectedEditor && selectedEditor.id === id) {
        setSelectedEditor({ ...selectedEditor, title: value })
      }

      return updatedEditors
    })
  }

  const handleContentChange = (id, value) => {
    setEditors((prev) => {
      const updatedEditors = prev.map((editor) => {
        if (editor.id === id) {
          return { ...editor, content: value }
        }
        return editor
      })

      // Update selected editor if it's the one being modified
      if (selectedEditor && selectedEditor.id === id) {
        setSelectedEditor({ ...selectedEditor, content: value })
      }

      return updatedEditors
    })
  }

  const handleSlideContentChange = (slideIndex, field, value) => {
    setSlides((prevSlides) => {
      const updatedSlides = [...prevSlides]
      updatedSlides[slideIndex] = {
        ...updatedSlides[slideIndex],
        [field]: value,
      }

      // Update selected slide if it's the one being modified
      if (selectedSlideIndex === slideIndex) {
        setSelectedSlide(updatedSlides[slideIndex])
      }

      return updatedSlides
    })
  }

  const handleEditorVisibilityChange = (id, checked) => {
    setEditors((prev) => {
      const updatedEditors = prev.map((editor) => {
        if (editor.id === id) {
          return { ...editor, checked }
        }
        return editor
      })

      // Update selected editor if it's the one being modified
      if (selectedEditor && selectedEditor.id === id) {
        setSelectedEditor({ ...selectedEditor, checked })
      }

      return updatedEditors
    })
  }

  const handleSaveChanges = async () => {
    try {
      // Validate form
      if (!title.trim()) {
        toast.error("Page title is required")
        return
      }

      // Find the current menu
      let currentMenuId = menuId

      if (!currentMenuId && selectedItem?._id) {
        // Find which menu contains this item
        for (const menu of menus) {
          if (menu.items && menu.items.some((item) => item._id === selectedItem._id)) {
            currentMenuId = menu._id
            break
          }
        }
      }

      if (!currentMenuId) {
        toast.error("Menu ID not found")
        return
      }

      // Find the current menu
      const currentMenu = menus.find((f) => f._id === currentMenuId)
      if (!currentMenu) {
        toast.error("Menu not found")
        return
      }

      // Create updated page object
      const updatedPage = {
        ...selectedItem,
        title,
        buttonText,
        link,
        slides: slides.map((slide) => ({
          title: slide.title || "",
          image: slide.image,
          link: slide.link || "",
          content: slide.content || "",
        })),
        content: editors.map((editor) => ({
          title: editor.title || "",
          content: editor.content || "",
          visibility: editor.checked,
        })),
      }

      // Update the page in the menu's items array
      const updatedItems = currentMenu.items.map((item) => (item._id === selectedItem._id ? updatedPage : item))

      // Prepare data for API call
      const data = {
        id: currentMenuId,
        data: {
          items: updatedItems,
        },
      }

      // Dispatch the action to update menu
      await dispatch(editMenus(data)).unwrap()

      // Show success message
      toast.success("Page updated successfully")

      // Go back
      onBack()
    } catch (error) {
      console.error("Error updating page:", error)
      toast.error(error?.message || "Failed to update page")
    }
  }

  const previewPage = () => {
    try {
      // Create a preview object with current data
      const previewData = {
        title,
        slides,
        content: editors,
      }

      // Store in sessionStorage for preview page to access
      sessionStorage.setItem("pagePreview", JSON.stringify(previewData))

      // Open preview in new tab
      window.open("/preview-page", "_blank")
    } catch (error) {
      toast.error("Failed to generate preview")
    }
  }

  return (
    <div className="space-y-6 pb-10">
      {/* Header with back button */}
      <div className="flex items-center gap-2">
        <button className="text-gray-600" onClick={onBack}>
          <BsArrowLeft size={20} />
        </button>
        <span className="text-xl font-semibold">Edit Page</span>
      </div>

      {/* Page Title */}
      <div className="bg-white rounded-lg p-6 shadow-sm">
        <div className="flex justify-between flex-col md:flex-row">
          <div className="w-full">
            <label className="block text-sm font-medium text-gray-700 mb-2">Page Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter page title"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="bg-white rounded-lg p-6 shadow-sm">
        <h2 className="text-lg font-semibold mb-4">Slides</h2>
        <p className="text-sm text-primary mb-4">Click on a slide to edit its details</p>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white col-span-3 overflow-auto flex flex-row gap-4">
            {slides.map((slide, indx) => (
              <div key={slide.id} className="flex flex-col">
                <div
                  onClick={() => {
                    setSelectedSlideIndex(indx)
                    setSelectedSlide(slide)
                  }}
                  className={`h-32 w-44 relative cursor-pointer transition-all duration-300 hover:shadow-md flex items-center justify-center flex-col text-center rounded-lg border ${
                    selectedSlide?.id === slide.id ? "border-2 border-primary" : "border-gray-200"
                  }`}
                >
                  {slide.image ? (
                    <img
                      src={slide.image || "/placeholder.svg"}
                      alt={`Slide ${indx + 1}`}
                      className="object-cover w-full h-full p-1 rounded-lg"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-500">Slide {indx + 1}</div>
                  )}
                </div>
                <button
                  onClick={() => handleRemoveSlide(slide.id)}
                  className="mt-2 text-red-500 self-center hover:text-red-700"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          <div className="bg-transparent col-span-1 flex items-start">
            <div
              onClick={handleAddSlide}
              className="h-32 w-44 cursor-pointer transition-all duration-300 hover:bg-gray-50 flex items-center justify-center flex-col text-center border border-primary border-dashed rounded-lg"
            >
              <span className="text-primary font-medium">Add Slide</span>
              <span className="text-primary text-xl">+</span>
            </div>
          </div>
        </div>

        {/* Selected Slide Details */}
        {selectedSlide && (
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mt-4">
            <h3 className="font-semibold text-lg mb-4">Editing Slide {selectedSlideIndex + 1}</h3>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Slide Image</label>
              {selectedSlide.image ? (
                <div className="relative mb-4">
                  <img
                    src={selectedSlide.image || "/placeholder.svg"}
                    alt="Slide preview"
                    className="max-h-48 object-contain rounded-lg mx-auto"
                  />
                </div>
              ) : (
                <div className="h-32 bg-gray-100 flex items-center justify-center rounded-lg mb-4">
                  <span className="text-gray-400">No image selected</span>
                </div>
              )}

              <div className="flex justify-center">
                <label className="flex items-center gap-2 cursor-pointer px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                  <AiOutlineCloudUpload size={20} className="text-primary" />
                  <span className="text-sm">Upload Image</span>
                  <input
                    ref={inputRef2}
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageUpload2(e, selectedSlide.id)}
                    className="hidden"
                  />
                </label>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Button Text</label>
                <input
                  type="text"
                  value={selectedSlide.title || ""}
                  onChange={(e) => handleSlideContentChange(selectedSlideIndex, "title", e.target.value)}
                  placeholder="Enter button text"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Button Link</label>
                <input
                  type="text"
                  value={selectedSlide.link || ""}
                  onChange={(e) => handleSlideContentChange(selectedSlideIndex, "link", e.target.value)}
                  placeholder="Enter link URL"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
            </div>

            <div className="mt-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Slide Content</label>
              <textarea
                value={selectedSlide.content || ""}
                onChange={(e) => handleSlideContentChange(selectedSlideIndex, "content", e.target.value)}
                placeholder="Enter slide content"
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>
          </div>
        )}
      </div>

      {/* Rich Text Editor Sections */}
      <div className="bg-white rounded-lg p-6 shadow-sm">
        <h2 className="text-lg font-semibold mb-4">Content Sections</h2>
        <p className="text-sm text-primary mb-4">Click on a section to edit its content</p>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white col-span-3 overflow-auto flex flex-row gap-4">
            {editors.map((editor, indx) => (
              <div key={editor.id} className="flex flex-col">
                <div
                  onClick={() => {
                    setSelectedContentIndex(indx)
                    setSelectedEditor(editor)
                  }}
                  className={`h-32 w-44 relative cursor-pointer transition-all duration-300 hover:shadow-md flex items-center justify-center flex-col text-center rounded-lg border ${
                    selectedEditor?.id === editor.id ? "border-2 border-primary" : "border-gray-200"
                  }`}
                >
                  <div className="p-2">
                    <h4 className="font-medium truncate w-36">{editor.title || "Untitled Section"}</h4>
                    <p className="text-xs text-gray-500 mt-1">
                      {editor.content ? `${editor.content.substring(0, 30)}...` : "No content"}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => handleRemoveContent(editor.id)}
                  className="mt-2 text-red-500 self-center hover:text-red-700"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          <div className="bg-transparent col-span-1 flex items-start">
            <div
              onClick={handleAddContent}
              className="h-32 w-44 cursor-pointer transition-all duration-300 hover:bg-gray-50 flex items-center justify-center flex-col text-center border border-primary border-dashed rounded-lg"
            >
              <span className="text-primary font-medium">Add Section</span>
              <span className="text-primary text-xl">+</span>
            </div>
          </div>
        </div>

        {/* Selected Editor Details */}
        {selectedEditor && (
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mt-4">
            <h3 className="font-semibold text-lg mb-4">Editing Content Section {selectedContentIndex + 1}</h3>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Section Title</label>
              <input
                type="text"
                value={selectedEditor.title || ""}
                onChange={(e) => handleTitleChange(selectedEditor.id, e.target.value)}
                placeholder="Enter section title"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>

            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <label className="block text-sm font-medium text-gray-700">Section Content</label>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id={`visibility-${selectedEditor.id}`}
                    checked={selectedEditor.checked}
                    onChange={(e) => handleEditorVisibilityChange(selectedEditor.id, e.target.checked)}
                    className="mr-2 h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                  />
                  <label htmlFor={`visibility-${selectedEditor.id}`} className="text-sm text-gray-600">
                    Visible
                  </label>
                </div>
              </div>
              <textarea
                value={selectedEditor.content || ""}
                onChange={(e) => handleContentChange(selectedEditor.id, e.target.value)}
                placeholder="Enter section content"
                rows={10}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex justify-end gap-3 pt-4">
        <button
          onClick={onBack}
          className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
        >
          Cancel
        </button>

        <button
          onClick={previewPage}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Preview
        </button>

        <button
          onClick={handleSaveChanges}
          className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
          disabled={isLoading}
        >
          {isLoading ? (
            <span className="flex items-center">
              <Loader className="animate-spin h-4 w-4 mr-2" />
              Saving...
            </span>
          ) : (
            "Save Changes"
          )}
        </button>
      </div>
    </div>
  )
}

export default EditMenuPage
