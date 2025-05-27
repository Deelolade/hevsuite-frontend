"use client"

import { useState, useRef, useEffect } from "react"
import { ArrowLeft, Upload, Plus, X } from "lucide-react"
import { useDispatch } from "react-redux"
import { updatePage } from "../../store/pages/pageSlice"
import toast from "react-hot-toast"

const EditPage = ({ onBack, selectedItem, refreshData }) => {
  const dispatch = useDispatch()

  // Initialize state with selectedItem data
  const [title, setTitle] = useState(selectedItem?.title || "")
  const [slides, setSlides] = useState(
    selectedItem?.slides?.length > 0
      ? selectedItem.slides.map((slide, idx) => ({
          id: slide.id || Date.now() + idx,
          title: slide.title || "",
          image: slide.video ? slide.video : slide.image ? slide.image : null,
          link: slide.link || "",
          fileType: slide.video ? "video" : slide.image ? "image" : null,
          file: null,
        }))
      : [{ id: Date.now(), title: "", image: null, link: "", fileType: null, file: null }],
  )

  const [editors, setEditors] = useState(() => {
    if (selectedItem?.content) {
      if (Array.isArray(selectedItem.content)) {
        return selectedItem.content.map((item, idx) => ({
          id: idx + 1,
          title: item.title || `Content ${idx + 1}`,
          content: item.content || "",
          checked: true,
        }))
      } else {
        return [{ id: 1, title: "Main Content", content: selectedItem.content, checked: true }]
      }
    }
    return [{ id: 1, title: "Main Content", content: "", checked: true }]
  })

  const [selectedSlide, setSelectedSlide] = useState(null)
  const [selectedSlideIndex, setSelectedSlideIndex] = useState(null)
  const [selectedEditor, setSelectedEditor] = useState(null)
  const [selectedContentIndex, setSelectedContentIndex] = useState(null)
  const inputRefs = useRef({})

  useEffect(() => {
    // Update state when selectedItem changes
    setTitle(selectedItem?.title || "")
    setSlides(
      selectedItem?.slides?.length > 0
        ? selectedItem.slides.map((slide, idx) => ({
            id: slide.id || Date.now() + idx,
            title: slide.title || "",
            image: slide.video ? slide.video : slide.image ? slide.image : null,
            link: slide.link || "",
            fileType: slide.video ? "video" : slide.image ? "image" : null,
            file: null,
          }))
        : [{ id: Date.now(), title: "", image: null, link: "", fileType: null, file: null }],
    )

    if (selectedItem?.content) {
      if (Array.isArray(selectedItem.content)) {
        setEditors(
          selectedItem.content.map((item, idx) => ({
            id: idx + 1,
            title: item.title || `Content ${idx + 1}`,
            content: item.content || "",
            checked: true,
          })),
        )
      } else {
        setEditors([{ id: 1, title: "Main Content", content: selectedItem.content, checked: true }])
      }
    }
  }, [selectedItem])

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
    formData.append("visibility", selectedItem?.visibility ?? true)
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
          content: "",
        })),
      ),
    )

    slides.forEach((slide) => {
      if (slide.file) {
        formData.append("slideImages", slide.file)
      }
    })

    try {
      await dispatch(updatePage({ id: selectedItem._id, data: formData })).unwrap()
      if (refreshData) refreshData()
      onBack()
      toast.success("Page updated successfully")
    } catch (error) {
      toast.error("Failed to update page")
    }
  }

  return (
    <div className="space-y-6 pb-10 max-w-7xl mx-auto px-4">
      {/* Header */}
      <div className="flex items-center gap-2 mb-6">
        <button className="text-gray-600 hover:text-gray-800 transition-colors" onClick={onBack}>
          <ArrowLeft size={20} />
        </button>
        <span className="text-lg font-medium">Edit Page</span>
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
              className="w-full md:w-96 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                      selectedSlide?.id === slide.id ? "ring-2 ring-blue-500" : ""
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
              className="h-32 w-full cursor-pointer transition-all duration-300 flex items-center justify-center flex-col space-y-2 text-center border-2 border-blue-500 border-dashed rounded-lg hover:bg-blue-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Plus className="text-blue-500" size={24} />
              <span className="text-blue-500 font-medium text-sm">Add Slide</span>
            </button>
          </div>
        </div>

        {/* Selected Slide Details */}
        {selectedSlide && (
          <div className="border border-gray-200 rounded-lg p-6 bg-gray-50">
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

              <div className="flex items-center justify-center p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 transition-colors">
                <label className="cursor-pointer flex flex-col items-center">
                  <input
                    ref={(el) => (inputRefs.current[slides[selectedSlideIndex]?.id] = el)}
                    type="file"
                    accept="image/*,video/*"
                    onChange={(e) => handleImageUpload(e, slides[selectedSlideIndex]?.id)}
                    className="hidden"
                  />
                  <Upload className="text-blue-500 mb-2" size={24} />
                  <span className="text-blue-500 text-sm font-medium">
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
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter link URL"
                />
              </div>
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
                      selectedEditor?.id === editor.id ? "ring-2 ring-blue-500" : ""
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
              className="h-32 w-full cursor-pointer transition-all duration-300 flex items-center justify-center flex-col space-y-2 text-center border-2 border-blue-500 border-dashed rounded-lg hover:bg-blue-50"
            >
              <Plus className="text-blue-500" size={24} />
              <span className="text-blue-500 font-medium text-sm">Add Content</span>
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
                className="w-full md:w-1/2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                className="w-full min-h-[200px] p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                placeholder="Enter your content here..."
              />
            </div>
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex justify-end gap-4 pt-6">
        <button
          onClick={onBack}
          className="px-6 py-2 border border-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors"
        >
          Cancel
        </button>
        <button
          onClick={() => {
            if (confirm("Are you sure you want to discard all changes?")) {
              onBack()
            }
          }}
          className="px-6 py-2 bg-red-600 text-white rounded-lg text-sm font-medium hover:bg-red-700 transition-colors"
        >
          Discard
        </button>
        <button
          onClick={handleSavePage}
          className="px-6 py-2 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700 transition-colors"
        >
          Save Changes
        </button>
      </div>
    </div>
  )
}

export default EditPage
