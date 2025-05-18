"use client"

import { useState, useRef } from "react"
import { BsArrowLeft } from "react-icons/bs"
import { AiOutlineCloudUpload } from "react-icons/ai"
import { useDispatch, useSelector } from "react-redux"
import { editMenus } from "../../store/cms/cmsSlice"
import { Loader } from 'lucide-react'
import toast from "react-hot-toast"

const AddMenuPage = ({ onBack, selectedSection, refreshData }) => {
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

  const inputRef2 = useRef(null)

  const handleRemoveSlide = (id) => {
    if (slides.length === 1) return
    setSlides((prevSlides) => prevSlides.filter((slide) => slide.id !== id))
  }

  const handleAddSlide = () => {
    if (slides.length === 5) return
    const newSlide = {
      id: Date.now(),
      image: "",
      title: "",
      link: "",
      content: "",
    }
    setSlides([...slides, newSlide])
  }

  const handleImageUpload2 = (e, id) => {
    const file = e.target.files[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = () => {
      setSlides((prevSlides) => prevSlides.map((s) => (s.id === id ? { ...s, image: reader.result } : s)))
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
    setEditors([...editors, newEditor])
  }

  const handleRemoveContent = (id) => {
    setEditors((prev) => prev.filter((editor) => editor.id !== id))
  }

  const handleTitleChange = (id, value) => {
    setEditors((prev) => prev.map((editor) => (editor.id === id ? { ...editor, title: value } : editor)))
  }

  const handleContentChange = (id, value) => {
    setEditors((prev) => prev.map((editor) => (editor.id === id ? { ...editor, content: value } : editor)))
  }

  const handleSavePage = async () => {
    try {
      // Validate form
      if (!title.trim()) {
        toast.error("Page title is required")
        return
      }

      if (!selectedSection) {
        toast.error("No section selected")
        return
      }

      // Find the current menu
      const currentMenu = menus.find((f) => f._id === selectedSection)
      if (!currentMenu) {
        toast.error("Selected section not found")
        return
      }

      // Create a new page object
      const newPage = {
        _id: Date.now().toString(), // Temporary ID, will be replaced by backend
        title,
        visibility: true,
        owner: "User",
        createdAt: new Date().toISOString(),
        slides: slides.map((slide) => ({
          title: slide.title,
          image: slide.image,
          link: slide.link,
          content: slide.content,
        })),
        content: editors.map((editor) => ({
          title: editor.title,
          content: editor.content,
          visibility: editor.checked,
        })),
      }

      // Add the new page to the menu's items array
      const updatedItems = [...(currentMenu.items || []), newPage]

      // Prepare data for API call
      const data = {
        id: selectedSection,
        data: {
          items: updatedItems,
        },
      }

      // Dispatch the action to update menu
      await dispatch(editMenus(data)).unwrap()

      // Show success message
      toast.success("Page added successfully")

      // Reset form and go back
      setTitle("")
      setButtonText("")
      setLink("")
      setSlides([{ id: 1, title: "", image: null, link: "", content: "" }])
      setEditors([{ id: 1, title: "", content: "", checked: true }])

      // Refresh data and go back
      if (refreshData) refreshData()
      onBack()
    } catch (error) {
      console.error("Error adding page:", error)
      toast.error("Failed to add page")
    }
  }

  return (
    <div className="space-y-6 pb-10">
      {/* Header with back button */}
      <div className="flex items-center gap-2">
        <button className="text-gray-600" onClick={onBack}>
          <BsArrowLeft size={20} />
        </button>
        <span>Add New Page</span>
      </div>

      {/* Page Title */}
      <div className="bg-white rounded-lg md:ml-0 -ml-8 p-4">
        <div className="flex justify-between flex-col md:flex-row">
          <div>
            <label className="block text-sm mb-2">Page Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Title"
              className="md:w-96 px-3 py-2 border rounded-lg text-sm"
            />
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <p className="text-sm text-primary mb-4 w-44">Click Any To Edit</p>
      <div className="grid grid-cols-1 md:grid-cols-4 mb-2">
        <div className="bg-white p-4 col-span-3 space-x-2 overflow-auto scrollBar flex flex-row">
          {slides.map((slide, indx) => (
            <div key={slide.id} className="flex flex-row">
              <div
                onClick={() => {
                  setSelectedSlideIndex(indx)
                  setSelectedSlide(slide)
                }}
                className={`h-32 w-44 relative cursor-pointer active:scale-95 transition-all duration-50 flex items-center justify-center flex-col space-y-2 text-center shadow-lg rounded-lg ${
                  selectedSlide?.id === slide.id ? "border-2 border-primary" : ""
                }`}
              >
                {slide.image ? (
                  <img
                    src={slide.image || "/placeholder.svg"}
                    alt="Uploaded"
                    className="object-cover m-auto h-full p-2"
                  />
                ) : (
                  "Slide " + Number(indx + 1)
                )}
              </div>
              <div>
                <div
                  onClick={() => handleRemoveSlide(slide.id)}
                  className="text-red-600 cursor-pointer rounded-full shadow-lg text-lg bg-white"
                >
                  ✘
                </div>
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
        <div className="bg-white border border-grey rounded-lg mb-4 pb-10 px-4">
          <div className="flex justify-between mb-6 px-3 pt-7 flex-col">
            <p className="block text-lg py-2 mb-2 font-semibold">Slide {selectedSlideIndex + 1}.</p>
            <p className="block text-sm font-semibold">Image Or Video</p>
          </div>
          {slides[selectedSlideIndex]?.image && (
            <img
              src={slides[selectedSlideIndex]?.image || "/placeholder.svg"}
              alt="Uploaded"
              className="object-cover m-auto w-1/3 h-full mt-3"
            />
          )}
          <div className="h-10 p-5 flex items-center justify-center">
            <div className="mt-2 rounded-lg flex items-center justify-center cursor-pointer">
              <label>
                <div className="w-full flex flex-col items-center mb-4">
                  <span className="flex items-center bottom-2 text-primary text-sm cursor-pointer">
                    <input
                      ref={inputRef2}
                      id={`fileInput-${slides[selectedSlideIndex]?.id}`}
                      type="file"
                      accept="image/*, video/*"
                      onChange={(e) => handleImageUpload2(e, slides[selectedSlideIndex]?.id)}
                      className="inset-0 opacity-0 cursor-pointer hidden"
                    />
                    <AiOutlineCloudUpload size={24} />
                    Click to replace image/Video
                  </span>
                </div>
              </label>
            </div>
          </div>
          <div className="mt-4 px-3 flex flex-col md:flex-row w-full md:space-x-4">
            <div className="w-full md:w-1/4 mb-4 md:mb-0">
              <label htmlFor={`title-${slides[selectedSlideIndex]?.id}`} className="block text-lg font-semibold">
                Button Text
              </label>
              <input
                value={slides[selectedSlideIndex]?.title}
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
                id={`title-${slides[selectedSlideIndex]?.id}`}
                type="text"
                className="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                placeholder="Text"
              />
            </div>
            <div className="w-full md:mr-10 flex flex-row items-end space-x-10 justify-center mb-4 md:mb-0">
              <div className="w-full md:ml-20">
                <label htmlFor="title" className="block text-lg font-semibold">
                  Available Link
                </label>
                <input
                  value={slides[selectedSlideIndex]?.link}
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
                  id="link/url"
                  type="text"
                  className="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                  placeholder="Text"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Rich Text Editor */}
      <div className="bg-white rounded-lg p-4">
        <div>
          <p className="text-sm text-primary mb-4 w-44">Click Any To Edit</p>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 -ml-6 mb-6">
            <div className="bg-white p-4 col-span-3 space-x-2 overflow-auto scrollBar flex flex-row">
              {editors.map((editor, indx) => (
                <div className="flex flex-row" key={editor.id}>
                  <div
                    onClick={() => {
                      setSelectedContentIndex(indx)
                      setSelectedEditor(editor)
                    }}
                    className={`h-32 w-44 relative cursor-pointer active:scale-95 transition-all duration-50 flex items-center justify-center flex-col space-y-2 text-center shadow-lg rounded-lg ${
                      selectedEditor?.id === editor.id ? "border-2 border-primary/70" : ""
                    }`}
                  >
                    <p className="font-semibold">{editor.title || "Untitled"}</p>
                  </div>
                  <div>
                    <div
                      onClick={() => handleRemoveContent(editor.id)}
                      className="text-red-600 cursor-pointer rounded-full shadow-lg text-lg bg-white"
                    >
                      ✘
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="bg-transparent col-span-1 p-4">
              <div
                onClick={handleAddContent}
                className="h-32 w-44 cursor-pointer active:scale-95 transition-all duration-50 flex items-center justify-center flex-col space-y-2 text-center border border-primary border-dashed rounded-lg"
              >
                <span className="text-primary font-semibold text-sm">Add Content</span>
                <div className="text-primary">+</div>
              </div>
            </div>
          </div>
          {selectedEditor && (
            <div className="my-6 bg-white rounded-lg">
              <div className="p-3">
                <label htmlFor="body" className="block text-lg font-semibold">
                  Editing: {editors[selectedContentIndex]?.title || "Untitled"}
                </label>
                <div className="flex flex-col md:flex-row justify-between md:mt-4 mb-8">
                  <div className="w-full md:w-2/5 mt-2 md:mt-0">
                    <label>Content Title</label>
                    <input
                      id={`title-${editors[selectedContentIndex]?.id}`}
                      type="text"
                      className="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                      placeholder="Title"
                      value={editors[selectedContentIndex]?.title}
                      onChange={(e) => {
                        handleTitleChange(editors[selectedContentIndex]?.id, e.target.value)
                      }}
                    />
                  </div>
                </div>
                <div className="mt-4">
                  <textarea
                    value={editors[selectedContentIndex]?.content}
                    onChange={(e) => handleContentChange(editors[selectedContentIndex]?.id, e.target.value)}
                    className="w-full min-h-[200px] p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                    placeholder="Enter content here..."
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="flex justify-end mt-4">
          <button
            className="px-4 py-2 bg-primary text-white rounded-lg text-sm"
            onClick={handleSavePage}
            disabled={isLoading}
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

      {/* Action Buttons */}
      <div className="flex justify-end gap-3">
        <button
          className="px-6 py-2 w-28 border rounded-lg text-sm font-semibold hover:bg-red-200 duration-1000 transition-all"
          onClick={onBack}
        >
          Cancel
        </button>
        <button
          onClick={() => {
            // Reset form
            setTitle("")
            setButtonText("")
            setLink("")
            setSlides([{ id: 1, title: "", image: null, link: "", content: "" }])
            setEditors([{ id: 1, title: "", content: "", checked: true }])
            toast.success("Form cleared")
          }}
          className="px-6 py-2 w-28 bg-primary text-white rounded-lg text-sm"
          disabled={isLoading}
        >
          Clear
        </button>
        <button
          onClick={handleSavePage}
          className="px-6 py-2 w-28 bg-[#0A5438] text-white rounded-lg text-sm"
          disabled={isLoading}
        >
          {isLoading ? (
            <span className="flex items-center">
              <Loader className="animate-spin h-4 w-4 mr-2" />
              Saving...
            </span>
          ) : (
            "Confirm"
          )}
        </button>
      </div>
    </div>
  )
}

export default AddMenuPage
