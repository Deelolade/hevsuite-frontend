"use client"

import { useState, useRef } from "react"
import { BsArrowLeft } from "react-icons/bs"
import { AiOutlineCloudUpload } from "react-icons/ai"
import { Plus } from "lucide-react"
import { useDispatch } from "react-redux"
import { createPage } from "../../store/pages/pageSlice"
import toast from "react-hot-toast"
import { Remirror, useRemirror, ThemeProvider, useCommands, useActive } from '@remirror/react';
import { BoldExtension, ItalicExtension, UnderlineExtension, HeadingExtension, BulletListExtension, OrderedListExtension, BlockquoteExtension, CodeExtension, LinkExtension, HistoryExtension } from 'remirror/extensions';
import { htmlToProsemirrorNode, prosemirrorNodeToHtml } from 'remirror';

const AddPage = ({ onBack, refreshData }) => {
  const dispatch = useDispatch()
  const [title, setTitle] = useState("")
  const [slides, setSlides] = useState([
    { id: Date.now(), title: "", image: null, link: "", fileType: null }
  ])
  const [content, setContent] = useState("")
  const [showPlus, setShowPlus] = useState(true)
  const inputRefs = useRef({})

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
    setSlides(prev => [...prev, { id: Date.now() + Math.random(), title: "", image: null, link: "", fileType: null }])
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
    // Prepare form data
    const formData = new FormData()
    formData.append("title", title)
    formData.append("visibility", true)
    formData.append("content", JSON.stringify([{ title: "", content, visibility: true }]))
    formData.append("slides", JSON.stringify(slides.map(slide => ({ title: slide.title, link: slide.link, content: "" }))))
    slides.forEach((slide) => {
      if (slide.file) {
        formData.append('slideImages', slide.file);
      }
    })
    try {
      await dispatch(createPage(formData)).unwrap()
      setTitle("")
      setSlides([{ id: Date.now(), title: "", image: null, link: "", fileType: null }])
      setContent("")
      if (refreshData) refreshData()
      onBack()
    } catch (error) {
      toast.error("Failed to add page")
    }
  }

  return (
    <div className="min-h-screen flex flex-col pb-10">
      {/* Header */}
      <div className="flex items-center gap-2 mb-6 mt-2">
        <button className="text-gray-600" onClick={onBack}>
          <BsArrowLeft size={20} />
        </button>
        <span className="text-lg font-medium">Add New Page</span>
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
        <div className="flex justify-end">
          <button
            className="px-6 py-2 bg-primary text-white rounded-lg text-sm font-semibold"
            onClick={() => setShowPlus(true)}
          >
            Save
          </button>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-end gap-4 mt-8">
        {/* <button className="px-8 py-2 border rounded-lg text-sm font-semibold bg-white text-gray-800">Preview</button> */}
        <button className="px-8 py-2 rounded-lg text-sm font-semibold bg-[#A01B3B] text-white">Remove</button>
        <button
          className="px-8 py-2 rounded-lg text-sm font-semibold bg-[#0A5438] text-white"
          onClick={handleSavePage}
        >
          Confirm
        </button>
      </div>
    </div>
  )
}

export default AddPage
