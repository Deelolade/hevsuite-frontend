"use client"

import { useState, useRef, useEffect } from "react"
import { ArrowLeft, Upload, Plus, X } from "lucide-react"
import { useDispatch } from "react-redux"
import { createPage } from "../../store/pages/pageSlice"
import { useNavigate } from "react-router-dom"
import toast from "react-hot-toast"

const AddPage = ({ onBack, refreshData, menuId }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  // Initialize state from sessionStorage or defaults
  const [title, setTitle] = useState(() => {
    return sessionStorage.getItem("addPageTitle") || ""
  })

  const [slides, setSlides] = useState(() => {
    const savedSlides = sessionStorage.getItem("addPageSlides")
    if (savedSlides) {
      try {
        const parsed = JSON.parse(savedSlides)
        return parsed.length > 0
          ? parsed
          : [{ id: Date.now(), title: "", image: null, link: "", fileType: null, file: null, content: "" }]
      } catch (e) {
        return [{ id: Date.now(), title: "", image: null, link: "", fileType: null, file: null, content: "" }]
      }
    }
    return [{ id: Date.now(), title: "", image: null, link: "", fileType: null, file: null, content: "" }]
  })

  const [editors, setEditors] = useState(() => {
    const savedEditors = sessionStorage.getItem("addPageEditors")
    if (savedEditors) {
      try {
        const parsed = JSON.parse(savedEditors)
        return parsed.length > 0 ? parsed : [{ id: 1, title: "Main Content", content: "", checked: true }]
      } catch (e) {
        return [{ id: 1, title: "Main Content", content: "", checked: true }]
      }
    }
    return [{ id: 1, title: "Main Content", content: "", checked: true }]
  })

  const [selectedSlide, setSelectedSlide] = useState(null)
  const [selectedSlideIndex, setSelectedSlideIndex] = useState(null)
  const [selectedEditor, setSelectedEditor] = useState(null)
  const [selectedContentIndex, setSelectedContentIndex] = useState(null)
  const inputRefs = useRef({})

  // Save to sessionStorage whenever state changes
  useEffect(() => {
    sessionStorage.setItem("addPageTitle", title)
  }, [title])

  useEffect(() => {
    sessionStorage.setItem("addPageSlides", JSON.stringify(slides))
  }, [slides])

  useEffect(() => {
    sessionStorage.setItem("addPageEditors", JSON.stringify(editors))
  }, [editors])

  // Clear sessionStorage when component unmounts (when going back or saving)
  const clearSessionData = () => {
    sessionStorage.removeItem("addPageTitle")
    sessionStorage.removeItem("addPageSlides")
    sessionStorage.removeItem("addPageEditors")
    // Also clear preview data
    sessionStorage.removeItem("slides")
    sessionStorage.removeItem("contents")
    sessionStorage.removeItem("mainText")
  }

  const handlePreview = () => {
    // Save data to sessionStorage in the format expected by the existing preview components
    const formattedSlides = slides.map((slide) => ({
      id: slide.id,
      title: slide.title || "",
      image: slide.image || "",
      link: slide.link || "",
      content: slide.content || "",
      fileType: slide.fileType || "image",
    }))

    const formattedContents = editors.map((editor) => ({
      id: editor.id,
      title: editor.title || "",
      content: editor.content || "",
      checked: editor.checked,
    }))

    // Save to sessionStorage with the keys the preview page expects
    sessionStorage.setItem("slides", JSON.stringify(formattedSlides))
    sessionStorage.setItem("contents", JSON.stringify(formattedContents))
    sessionStorage.setItem("mainText", title)

    // Navigate to preview page
    navigate("./preview")
  }

  const handleImageUpload = (e, id) => {
    const file = e.target.files[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = () => {
      setSlides((prev) =>
        prev.map((slide) =>
          slide.id === id
            ? {
                ...slide,
                file,
                image: reader.result,
                fileType: file.type.startsWith("video") ? "video" : "image",
              }
            : slide,
        ),
      )
    }
    reader.readAsDataURL(file)
  }

  const handleAddSlide = () => {
    if (slides.length >= 5) return
    const newSlide = {
      id: Date.now() + Math.random(),
      title: "",
      image: null,
      link: "",
      fileType: null,
      file: null,
      content: "",
    }
    setSlides((prev) => [...prev, newSlide])
  }

  const handleRemoveSlide = (id) => {
    if (slides.length === 1) return
    setSlides((prev) => prev.filter((slide) => slide.id !== id))
    if (selectedSlide?.id === id) {
      setSelectedSlide(null)
      setSelectedSlideIndex(null)
    }
  }

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
    if (editors.length === 1) return
    setEditors((prev) => prev.filter((editor) => editor.id !== id))
    if (selectedEditor?.id === id) {
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

  const handleSavePage = async () => {
    if (!title.trim()) {
      toast.error("Page title is required")
      return
    }

    // Prepare form data
    const formData = new FormData()
    formData.append("title", title)
    formData.append("visibility", true)
    formData.append(
      "content",
      JSON.stringify(
        editors.map((editor) => ({
          title: editor.title,
          content: editor.content,
          visibility: true,
        })),
      ),
    )
    formData.append(
      "slides",
      JSON.stringify(
        slides.map((slide) => ({
          title: slide.title,
          link: slide.link,
          content: slide.content || "",
        })),
      ),
    )

    if (menuId) {
      formData.append("menuId", menuId)
    }

    slides.forEach((slide) => {
      if (slide.file) {
        formData.append("slideImages", slide.file)
      }
    })

    try {
      await dispatch(createPage(formData)).unwrap()

      // Clear all session data after successful save
      clearSessionData()

      // Reset state
      setTitle("")
      setSlides([{ id: Date.now(), title: "", image: null, link: "", fileType: null, file: null, content: "" }])
      setEditors([{ id: 1, title: "Main Content", content: "", checked: true }])
      setSelectedSlide(null)
      setSelectedSlideIndex(null)
      setSelectedEditor(null)
      setSelectedContentIndex(null)

      if (refreshData) refreshData()
      onBack()
      toast.success("Page created successfully!")
    } catch (error) {
      toast.error("Failed to add page")
    }
  }

  const handleRemoveAll = () => {
    if (confirm("Are you sure you want to remove all content?")) {
      clearSessionData()
      setTitle("")
      setSlides([{ id: Date.now(), title: "", image: null, link: "", fileType: null, file: null, content: "" }])
      setEditors([{ id: 1, title: "Main Content", content: "", checked: true }])
      setSelectedSlide(null)
      setSelectedEditor(null)
    }
  }

  const handleBack = () => {
    // Ask user if they want to save their work before leaving
    if (title || slides.some((s) => s.title || s.image || s.link || s.content) || editors.some((e) => e.content)) {
      if (confirm("You have unsaved changes. Do you want to leave without saving?")) {
        clearSessionData()
        onBack()
      }
    } else {
      clearSessionData()
      onBack()
    }
  }

  return (
    <div className="space-y-6 pb-10 max-w-7xl mx-auto px-4">
      {/* Header */}
      <div className="flex items-center gap-2 mb-6">
        <button className="text-gray-600 hover:text-gray-800 transition-colors" onClick={handleBack}>
          <ArrowLeft size={20} />
        </button>
        <span className="text-lg font-medium">Add New Page</span>
      </div>

      {/* Page Title */}
      <div className="bg-white rounded-lg p-6 shadow-sm">
        <div className="flex justify-between flex-col md:flex-row gap-4">
          <div className="flex-1">
            <label className="block text-sm mb-2 font-medium">Page Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter page title"
              className="w-full md:w-96 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="bg-white rounded-lg p-6 shadow-sm">
        <h3 className="text-lg font-medium mb-4">Hero Section</h3>
        <p className="text-sm text-blue-600 mb-4">Click any slide to edit</p>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mb-6">
          <div className="lg:col-span-3 bg-gray-50 p-4 rounded-lg overflow-x-auto">
            <div className="flex gap-4 min-w-max">
              {slides.map((slide, index) => (
                <div key={slide.id} className="flex items-start gap-2">
                  <div
                    onClick={() => {
                      setSelectedSlideIndex(index)
                      setSelectedSlide(slide)
                    }}
                    className={`h-32 w-44 relative cursor-pointer transition-all duration-200 flex items-center justify-center flex-col space-y-2 text-center shadow-md rounded-lg bg-white hover:shadow-lg ${
                      selectedSlide?.id === slide.id ? "ring-2 ring-primary" : ""
                    }`}
                  >
                    {slide.image ? (
                      slide.fileType === "video" ? (
                        <video className="object-cover w-full h-full rounded-lg">
                          <source src={slide.image} type="video/mp4" />
                        </video>
                      ) : (
                        <img
                          src={slide.image || "/placeholder.svg"}
                          alt="Slide preview"
                          className="object-cover w-full h-full rounded-lg"
                        />
                      )
                    ) : (
                      <div className="text-gray-500">
                        <Upload size={24} className="mx-auto mb-2" />
                        <span className="text-sm">Slide {index + 1}</span>
                      </div>
                    )}
                  </div>
                  {slides.length > 1 && (
                    <button
                      onClick={() => handleRemoveSlide(slide.id)}
                      className="text-red-500 hover:text-red-700 bg-white rounded-full p-1 shadow-md transition-colors"
                    >
                      <X size={16} />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-1 p-4">
            <button
              onClick={handleAddSlide}
              disabled={slides.length >= 5}
              className="h-32 w-full cursor-pointer transition-all duration-300 flex items-center justify-center flex-col space-y-2 text-center border-2 border-primary border-dashed rounded-lg hover:bg-blue-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Plus className="text-primary" size={24} />
              <span className="text-primary font-medium text-sm">Add Slide</span>
            </button>
          </div>
        </div>

        {/* Selected Slide Details */}
        {selectedSlide && (
          <div className="border border- rounded-lg p-6 bg-gray-50">
            <h4 className="text-lg font-semibold mb-4">Slide {selectedSlideIndex + 1} Details</h4>

            {/* Image Upload */}
            <div className="mb-6">
              <label className="block text-sm font-medium mb-2">Image or Video</label>
              {slides[selectedSlideIndex]?.image && (
                <div className="mb-4">
                  {slides[selectedSlideIndex]?.fileType === "video" ? (
                    <video controls className="max-w-xs h-32 rounded-lg object-cover">
                      <source src={slides[selectedSlideIndex]?.image} type="video/mp4" />
                    </video>
                  ) : (
                    <img
                      src={slides[selectedSlideIndex]?.image || "/placeholder.svg"}
                      alt="Uploaded preview"
                      className="max-w-xs h-32 rounded-lg object-cover"
                    />
                  )}
                </div>
              )}

              <div className="flex items-center justify-center p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-primary transition-colors">
                <label className="cursor-pointer flex flex-col items-center">
                  <input
                    ref={(el) => (inputRefs.current[slides[selectedSlideIndex]?.id] = el)}
                    type="file"
                    accept="image/*,video/*"
                    onChange={(e) => handleImageUpload(e, slides[selectedSlideIndex]?.id)}
                    className="hidden"
                  />
                  <Upload className="text-primary mb-2" size={24} />
                  <span className="text-primary text-sm font-medium">
                    Click to {slides[selectedSlideIndex]?.image ? "replace" : "upload"} image/video
                  </span>
                </label>
              </div>
            </div>

            {/* Slide Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Button Text</label>
                <input
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
                  type="text"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Enter button text"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Link URL</label>
                <input
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
                  type="text"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Enter link URL"
                />
              </div>
            </div>

            {/* Slide Content */}
            <div className="mt-4">
              <label className="block text-sm font-medium mb-2">Slide Content</label>
              <textarea
                value={slides[selectedSlideIndex]?.content || ""}
                onChange={(e) => {
                  setSlides((prev) => {
                    const updatedSlides = [...prev]
                    updatedSlides[selectedSlideIndex] = {
                      ...updatedSlides[selectedSlideIndex],
                      content: e.target.value,
                    }
                    return updatedSlides
                  })
                }}
                className="w-full min-h-[100px] p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                placeholder="Enter slide content/description..."
              />
            </div>
          </div>
        )}
      </div>

      {/* Content Editor Section */}
      <div className="bg-white rounded-lg p-6 shadow-sm">
        <h3 className="text-lg font-medium mb-4">Page Content</h3>
        <p className="text-sm text-blue-600 mb-4">Click any content block to edit</p>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mb-6">
          <div className="lg:col-span-3 bg-gray-50 p-4 rounded-lg overflow-x-auto">
            <div className="flex gap-4 min-w-max">
              {editors.map((editor, index) => (
                <div key={editor.id} className="flex items-start gap-2">
                  <div
                    onClick={() => {
                      setSelectedContentIndex(index)
                      setSelectedEditor(editor)
                    }}
                    className={`h-32 w-44 relative cursor-pointer transition-all duration-200 flex items-center justify-center flex-col space-y-2 text-center shadow-md rounded-lg bg-white hover:shadow-lg ${
                      selectedEditor?.id === editor.id ? "ring-2 ring-primary" : ""
                    }`}
                  >
                    <div className="p-4 text-center">
                      <h4 className="font-medium text-sm mb-2">{editor.title || "Untitled"}</h4>
                      <p className="text-xs text-gray-500 line-clamp-3">
                        {editor.content ? editor.content.substring(0, 50) + "..." : "No content"}
                      </p>
                    </div>
                  </div>
                  {editors.length > 1 && (
                    <button
                      onClick={() => handleRemoveContent(editor.id)}
                      className="text-red-500 hover:text-red-700 bg-white rounded-full p-1 shadow-md transition-colors"
                    >
                      <X size={16} />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-1 p-4">
            <button
              onClick={handleAddContent}
              className="h-32 w-full cursor-pointer transition-all duration-300 flex items-center justify-center flex-col space-y-2 text-center border-2 border-primary border-dashed rounded-lg hover:bg-blue-50"
            >
              <Plus className="text-primary" size={24} />
              <span className="text-primary font-medium text-sm">Add Content</span>
            </button>
          </div>
        </div>

        {/* Selected Content Editor */}
        {selectedEditor && (
          <div className="border border-gray-200 rounded-lg p-6 bg-gray-50">
            <h4 className="text-lg font-semibold mb-4">
              Editing: {editors[selectedContentIndex]?.title || "Untitled"}
            </h4>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Content Title</label>
              <input
                type="text"
                className="w-full md:w-1/2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Enter content title"
                value={editors[selectedContentIndex]?.title || ""}
                onChange={(e) => {
                  handleTitleChange(editors[selectedContentIndex]?.id, e.target.value)
                }}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Content</label>
              <textarea
                value={editors[selectedContentIndex]?.content || ""}
                onChange={(e) => handleContentChange(editors[selectedContentIndex]?.id, e.target.value)}
                className="w-full min-h-[200px] p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                placeholder="Enter your content here..."
              />
            </div>
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex justify-end gap-4 pt-6">
        <button
          onClick={handlePreview}
          className="px-6 py-2 border border-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors"
        >
          Preview
        </button>
        <button
          onClick={handleRemoveAll}
          className="px-6 py-2 bg-red-600 text-white rounded-lg text-sm font-medium hover:bg-red-700 transition-colors"
        >
          Remove
        </button>
        <button
          onClick={handleSavePage}
          className="px-6 py-2 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700 transition-colors"
        >
          Confirm
        </button>
      </div>
    </div>
  )
}

export default AddPage
