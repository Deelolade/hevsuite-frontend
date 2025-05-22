"use client"

import { useState, useRef, useEffect } from "react"
import { BsArrowLeft } from "react-icons/bs"
import { AiOutlineCloudUpload } from "react-icons/ai"
import { useDispatch, useSelector } from "react-redux"
import { editFooter } from "../../store/cms/cmsSlice"
import { Loader } from "lucide-react"
import toast from "react-hot-toast"

const EditFooterPage = ({ onBack, selectedFooter, selectedPage, refreshData }) => {
  const dispatch = useDispatch()
  const { isLoading } = useSelector((state) => state.cms)
  const [title, setTitle] = useState("")
  const [slides, setSlides] = useState([
    { id: Date.now(), title: "", image: null, link: "", content: "" }
  ])
  const [content, setContent] = useState("")
  const inputRefs = useRef({})

  // Initialize form with selected page data
  useEffect(() => {
    if (selectedPage) {
      setTitle(selectedPage.title || "")
      if (selectedPage.slides && selectedPage.slides.length > 0) {
        setSlides(selectedPage.slides.map(slide => ({
          id: Date.now() + Math.random(),
          title: slide.title || "",
          image: slide.image || null,
          link: slide.link || "",
          content: slide.content || ""
        })))
      }
      if (selectedPage.content && selectedPage.content.length > 0) {
        setContent(selectedPage.content[0]?.content || "")
      }
    }
  }, [selectedPage])

  const handleImageUpload = (e, id) => {
    const file = e.target.files[0]
    if (!file) return
    setSlides((prev) =>
      prev.map((slide) =>
        slide.id === id
          ? {
              ...slide,
              file,
              image: URL.createObjectURL(file),
              fileType: file.type.startsWith('video') ? 'video' : 'image',
            }
          : slide
      )
    )
  }

  const handleAddSlide = () => {
    setSlides(prev => [...prev, { id: Date.now() + Math.random(), title: "", image: null, link: "", content: "" }])
  }

  const handleRemoveSlide = (id) => {
    if (slides.length === 1) return
    setSlides(prev => prev.filter(slide => slide.id !== id))
  }

  const handleSavePage = async () => {
    if (!title.trim()) {
      toast.error("Page title is required")
      return
    }

    if (!selectedFooter) {
      toast.error("No footer selected")
      return
    }

    try {
      // Create updated page object
      const updatedPage = {
        ...selectedPage,
        title,
        visibility: true,
        owner: "System",
        slides: slides.map((slide) => ({
          title: slide.title,
          image: slide.image,
          link: slide.link,
          content: slide.content,
        })),
        content: [
          {
            title: "",
            content: content,
            visibility: true,
          },
        ],
      }

      // Update the page in the footer's items array
      const updatedItems = selectedFooter.items.map(item => 
        item._id === selectedPage._id ? updatedPage : item
      )

      // Prepare data for API call
      const data = {
        id: selectedFooter._id,
        data: {
          items: updatedItems,
        },
      }

      // Dispatch the action to update footer
      await dispatch(editFooter(data)).unwrap()

      // Show success message
      toast.success("Page updated successfully")

      // Refresh data and go back
      if (refreshData) refreshData()
      onBack()
    } catch (error) {
      console.error("Error updating page:", error)
      toast.error("Failed to update page")
    }
  }

  return (
    <div className="min-h-screen flex flex-col pb-10">
      {/* Header */}
      <div className="flex items-center gap-2 mb-6 mt-2">
        <button className="text-gray-600" onClick={onBack}>
          <BsArrowLeft size={20} />
        </button>
        <span className="text-lg font-medium">Edit Page</span>
      </div>

      {/* Page Title Card */}
      <div className="bg-white rounded-xl p-6 flex flex-col md:flex-row items-center mb-6 shadow-sm">
        <div className="flex-1 w-full md:w-auto">
          <label className="block text-sm mb-2 font-medium">Page Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
            className="w-full md:w-96 px-3 py-2 border rounded-lg text-sm bg-gray-50"
          />
        </div>
        <button
          className="ml-0 md:ml-6 mt-4 md:mt-0 px-6 py-2 bg-primary text-white rounded-lg text-sm font-semibold"
          onClick={handleAddSlide}
        >
          Add Slide
        </button>
      </div>

      {/* Hero Section Cards */}
      {slides.map((slide, idx) => (
        <div key={slide.id} className="bg-white rounded-xl p-6 mb-6 shadow-sm">
          <div className="mb-6">
            <span className="block text-base font-medium mb-4">Hero Section</span>
            <div className="flex flex-col items-center justify-center">
              <div
                className="flex flex-col items-center justify-center cursor-pointer"
                onClick={() => inputRefs.current[slide.id]?.click()}
              >
                <input
                  type="file"
                  ref={el => inputRefs.current[slide.id] = el}
                  className="hidden"
                  accept="image/*,video/*"
                  onChange={e => handleImageUpload(e, slide.id)}
                />
                <AiOutlineCloudUpload size={36} className="text-primary mb-2" />
                <span className="text-sm text-primary font-medium">Click to Add image/Video</span>
                {slide.image && slide.fileType === 'image' && (
                  <img src={slide.image} alt="slide" className="mt-4 h-32 rounded-lg object-cover" />
                )}
                {slide.image && slide.fileType === 'video' && (
                  <video controls className="mt-4 h-32 rounded-lg object-cover">
                    <source src={slide.image} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                )}
              </div>
            </div>
          </div>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1">
              <label className="block text-sm mb-2 font-medium">Button Text</label>
              <input
                type="text"
                value={slide.title}
                onChange={e => setSlides(prev => prev.map(s => s.id === slide.id ? { ...s, title: e.target.value } : s))}
                placeholder="Add text"
                className="w-full px-3 py-2 border rounded-lg text-sm bg-gray-50"
              />
            </div>
            <div className="flex-1">
              <label className="block text-sm mb-2 font-medium">Available Link</label>
              <input
                type="text"
                value={slide.link}
                onChange={e => setSlides(prev => prev.map(s => s.id === slide.id ? { ...s, link: e.target.value } : s))}
                placeholder="link"
                className="w-full px-3 py-2 border rounded-lg text-sm bg-gray-50"
              />
            </div>
          </div>
          <div className="flex justify-end">
            <button
              className="px-6 py-2 bg-primary text-white rounded-lg text-sm font-semibold"
              onClick={() => handleRemoveSlide(slide.id)}
              disabled={slides.length === 1}
            >
              Remove Slide
            </button>
          </div>
        </div>
      ))}

      {/* Content Editor Card */}
      <div className="bg-white rounded-xl p-6 mb-6 shadow-sm">
        <div className="flex items-center gap-2 mb-4">
          <span className="text-sm font-medium">Normal text</span>
          <span className="w-px h-5 bg-gray-200 mx-2" />
        </div>
        <div className="border rounded-lg flex flex-col items-center justify-center min-h-[180px] mb-4 w-full">
          <textarea
            value={content}
            onChange={e => setContent(e.target.value)}
            className="w-full min-h-[120px] p-2 rounded-lg border-none focus:ring-0 focus:outline-none resize-none text-sm"
            placeholder="Enter content..."
          />
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-end gap-4 mt-8">
        <button
          className="px-8 py-2 rounded-lg text-sm font-semibold bg-[#0A5438] text-white"
          onClick={handleSavePage}
          disabled={isLoading}
        >
          {isLoading ? (
            <span className="flex items-center">
              <Loader className="animate-spin h-4 w-4 mr-2" />
              Saving...
            </span>
          ) : (
            "Update Page"
          )}
        </button>
      </div>
    </div>
  )
}

export default EditFooterPage 