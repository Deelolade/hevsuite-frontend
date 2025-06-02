// "use client"

// import { useState, useRef } from "react"
// import { BsArrowLeft } from "react-icons/bs"
// import { AiOutlineCloudUpload } from "react-icons/ai"
// import { useDispatch, useSelector } from "react-redux"
// import { editFooter } from "../../store/cms/cmsSlice"
// import { Loader } from "lucide-react"
// import toast from "react-hot-toast"

// const AddPage = ({ onBack, selectedSection, refreshData }) => {
//   const dispatch = useDispatch()
//   const { isLoading, footers } = useSelector((state) => state.cms)

//   const [title, setTitle] = useState("")
//   const [buttonText, setButtonText] = useState("")
//   const [link, setLink] = useState("")
//   const [slides, setSlides] = useState([{ id: 1, title: "", image: null, video: null, link: "", content: "" }])
//   const [editors, setEditors] = useState([{ id: 1, title: "", content: "", checked: true }])
//   const [selectedSlide, setSelectedSlide] = useState(null)
//   const [selectedSlideIndex, setSelectedSlideIndex] = useState(null)
//   const [selectedEditor, setSelectedEditor] = useState(null)
//   const [selectedContentIndex, setSelectedContentIndex] = useState(null)

//   const inputRef2 = useRef(null)

//   const handleRemoveSlide = (id) => {
//     if (slides.length === 1) return
//     setSlides((prevSlides) => prevSlides.filter((slide) => slide.id !== id))
//   }

//   const handleAddSlide = () => {
//     if (slides.length === 5) return
//     const newSlide = {
//       id: Date.now(),
//       image: "",
//       video: "",
//       title: "",
//       link: "",
//       content: "",
//     }
//     setSlides([...slides, newSlide])
//   }

//   const handleImageUpload = (e, id) => {
//     const file = e.target.files[0]
//     if (!file) return

//     // Validate file type
//     if (!file.type.startsWith('image/')) {
//       toast.error('Please upload an image file')
//       return
//     }

//     // Validate file size (5MB max)
//     if (file.size > 5 * 1024 * 1024) {
//       toast.error('Image size should be less than 5MB')
//       return
//     }

//     const reader = new FileReader()
//     reader.onload = () => {
//       setSlides((prevSlides) => prevSlides.map((s) => (s.id === id ? { ...s, image: reader.result, video: null } : s)))
//     }
//     reader.readAsDataURL(file)
//   }

//   const handleVideoUpload = (e, id) => {
//     const file = e.target.files[0]
//     if (!file) return

//     // Validate file type
//     if (!file.type.startsWith('video/')) {
//       toast.error('Please upload a video file')
//       return
//     }

//     // Validate file size (50MB max)
//     if (file.size > 50 * 1024 * 1024) {
//       toast.error('Video size should be less than 50MB')
//       return
//     }

//     const reader = new FileReader()
//     reader.onload = () => {
//       setSlides((prevSlides) => prevSlides.map((s) => (s.id === id ? { ...s, video: reader.result, image: null } : s)))
//     }
//     reader.readAsDataURL(file)
//   }

//   const handleAddContent = () => {
//     const newEditor = {
//       id: Date.now(),
//       title: "",
//       content: "",
//       checked: true,
//     }
//     setEditors([...editors, newEditor])
//   }

//   const handleRemoveContent = (id) => {
//     setEditors((prev) => prev.filter((editor) => editor.id !== id))
//   }

//   const handleTitleChange = (id, value) => {
//     setEditors((prev) => prev.map((editor) => (editor.id === id ? { ...editor, title: value } : editor)))
//   }

//   const handleContentChange = (id, value) => {
//     setEditors((prev) => prev.map((editor) => (editor.id === id ? { ...editor, content: value } : editor)))
//   }

//   const handleSavePage = async () => {
//     const [isLoading, setIsLoading] = useState(false);
//     try {
//       // Validate form
//       if (!title.trim()) {
//         toast.error("Page title is required")
//         return
//       }

//       if (!selectedSection) {
//         toast.error("No section selected")
//         return
//       }

//       // Find the current footer
//       const currentFooter = footers.find((f) => f._id === selectedSection)
//       if (!currentFooter) {
//         toast.error("Selected section not found")
//         return
//       }

//       // Create FormData for file uploads
//       const formData = new FormData()
//       formData.append('title', title)
//       formData.append('visibility', true)
//       formData.append('owner', 'User')

//       // Add slides data
//       slides.forEach((slide, index) => {
//         if (slide.image) {
//           formData.append(`slideImages`, slide.image)
//         }
//         if (slide.video) {
//           formData.append(`slideVideos`, slide.video)
//         }
//         formData.append(`slideTitles[${index}]`, slide.title)
//         formData.append(`slideLinks[${index}]`, slide.link)
//         formData.append(`slideContents[${index}]`, slide.content)
//       })

//       // Add content data
//       editors.forEach((editor, index) => {
//         formData.append(`contentTitles[${index}]`, editor.title)
//         formData.append(`contentBodies[${index}]`, editor.content)
//         formData.append(`contentVisibility[${index}]`, editor.checked)
//       })

//       // Create a new page object
//       const newPage = {
//         _id: Date.now().toString(), // Temporary ID, will be replaced by backend
//         title,
//         visibility: true,
//         owner: "User",
//         createdAt: new Date().toISOString(),
//         slides: slides.map((slide) => ({
//           title: slide.title,
//           image: slide.image,
//           video: slide.video,
//           link: slide.link,
//           content: slide.content,
//         })),
//         content: editors.map((editor) => ({
//           title: editor.title,
//           content: editor.content,
//           visibility: editor.checked,
//         })),
//       }

//       // Add the new page to the footer's items array
//       const updatedItems = [...(currentFooter.items || []), newPage]

//       // Prepare data for API call
//       const data = {
//         id: selectedSection,
//         data: {
//           items: updatedItems,
//         },
//       }

//       // Dispatch the action to update footer
//       await dispatch(editFooter(data)).unwrap()

//       // Show success message
//       toast.success("Page added successfully")

//       // Reset form and go back
//       setTitle("")
//       setButtonText("")
//       setLink("")
//       setSlides([{ id: 1, title: "", image: null, video: null, link: "", content: "" }])
//       setEditors([{ id: 1, title: "", content: "", checked: true }])

//       // Refresh data and go back
//       if (refreshData) refreshData()
//       onBack()
//     } catch (error) {
//       console.error("Error adding page:", error)
//       toast.error("Failed to add page")
//     } finally {
//       setIsLoading(false);
//     }
//   }

//   return (
//     <div className="space-y-6 pb-10">
//       {/* Header with back button */}
//       <div className="flex items-center gap-2">
//         <button className="text-gray-600" onClick={onBack}>
//           <BsArrowLeft size={20} />
//         </button>
//         <span>Add New Page</span>
//       </div>

//       {/* Page Title */}
//       <div className="bg-white rounded-lg md:ml-0 -ml-8 p-4">
//         <div className="flex justify-between flex-col md:flex-row">
//           <div>
//             <label className="block text-sm mb-2">Page Title</label>
//             <input
//               type="text"
//               value={title}
//               onChange={(e) => setTitle(e.target.value)}
//               placeholder="Title"
//               className="md:w-96 px-3 py-2 border rounded-lg text-sm"
//             />
//           </div>
//         </div>
//       </div>

//       {/* Hero Section */}
//       <p className="text-sm text-primary mb-4 w-44">Click Any To Edit</p>
//       <div className="grid grid-cols-1 md:grid-cols-4 mb-2">
//         <div className="bg-white p-4 col-span-3 space-x-2 overflow-auto scrollBar flex flex-row">
//           {slides.map((slide, indx) => (
//             <div key={slide.id} className="flex flex-row">
//               <div
//                 onClick={() => {
//                   setSelectedSlideIndex(indx)
//                   setSelectedSlide(slide)
//                 }}
//                 className={`h-32 w-44 relative cursor-pointer active:scale-95 transition-all duration-50 flex items-center justify-center flex-col space-y-2 text-center shadow-lg rounded-lg ${
//                   selectedSlide?.id === slide.id ? "border-2 border-primary" : ""
//                 }`}
//               >
//                 {slide.image ? (
//                   <img
//                     src={slide.image}
//                     alt="Uploaded"
//                     className="object-cover m-auto h-full p-2"
//                   />
//                 ) : slide.video ? (
//                   <video
//                     src={slide.video}
//                     className="object-cover m-auto h-full p-2"
//                     controls
//                   />
//                 ) : (
//                   "Slide " + Number(indx + 1)
//                 )}
//               </div>
//               <div className="flex flex-col justify-center ml-2">
//                 <button
//                   onClick={() => handleRemoveSlide(slide.id)}
//                   className="text-red-500 hover:text-red-700"
//                 >
//                   ✕
//                 </button>
//               </div>
//             </div>
//           ))}
//           {slides.length < 5 && (
//             <div
//               onClick={handleAddSlide}
//               className="h-32 w-44 border-2 border-dashed rounded-lg flex items-center justify-center cursor-pointer hover:bg-gray-50"
//             >
//               <span className="text-2xl text-gray-400">+</span>
//             </div>
//           )}
//         </div>
//       </div>

//       {/* Selected Slide Editor */}
//       {selectedSlide && (
//         <div className="bg-white rounded-lg p-4">
//           <div className="space-y-4">
//             <div>
//               <label className="block text-sm mb-2">Slide Title</label>
//               <input
//                 type="text"
//                 value={selectedSlide.title}
//                 onChange={(e) =>
//                   setSlides((prev) =>
//                     prev.map((s) =>
//                       s.id === selectedSlide.id ? { ...s, title: e.target.value } : s
//                     )
//                   )
//                 }
//                 placeholder="Title"
//                 className="w-full px-3 py-2 border rounded-lg text-sm"
//               />
//             </div>

//             <div>
//               <label className="block text-sm mb-2">Upload Image</label>
//               <input
//                 type="file"
//                 accept="image/*"
//                 onChange={(e) => handleImageUpload(e, selectedSlide.id)}
//                 className="hidden"
//                 ref={inputRef2}
//               />
//               <button
//                 onClick={() => inputRef2.current?.click()}
//                 className="w-full px-3 py-2 border rounded-lg text-sm flex items-center justify-center gap-2 hover:bg-gray-50"
//               >
//                 <AiOutlineCloudUpload size={20} />
//                 Upload Image
//               </button>
//             </div>

//             <div>
//               <label className="block text-sm mb-2">Upload Video</label>
//               <input
//                 type="file"
//                 accept="video/*"
//                 onChange={(e) => handleVideoUpload(e, selectedSlide.id)}
//                 className="hidden"
//                 ref={inputRef2}
//               />
//               <button
//                 onClick={() => inputRef2.current?.click()}
//                 className="w-full px-3 py-2 border rounded-lg text-sm flex items-center justify-center gap-2 hover:bg-gray-50"
//               >
//                 <AiOutlineCloudUpload size={20} />
//                 Upload Video
//               </button>
//             </div>

//             <div>
//               <label className="block text-sm mb-2">Link</label>
//               <input
//                 type="text"
//                 value={selectedSlide.link}
//                 onChange={(e) =>
//                   setSlides((prev) =>
//                     prev.map((s) =>
//                       s.id === selectedSlide.id ? { ...s, link: e.target.value } : s
//                     )
//                   )
//                 }
//                 placeholder="Link"
//                 className="w-full px-3 py-2 border rounded-lg text-sm"
//               />
//             </div>

//             <div>
//               <label className="block text-sm mb-2">Content</label>
//               <textarea
//                 value={selectedSlide.content}
//                 onChange={(e) =>
//                   setSlides((prev) =>
//                     prev.map((s) =>
//                       s.id === selectedSlide.id ? { ...s, content: e.target.value } : s
//                     )
//                   )
//                 }
//                 placeholder="Content"
//                 className="w-full px-3 py-2 border rounded-lg text-sm min-h-[100px]"
//               />
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Content Section */}
//       <div className="bg-white rounded-lg p-4">
//         <div className="flex justify-between items-center mb-4">
//           <h3 className="text-lg font-semibold">Content</h3>
//           <button
//             onClick={handleAddContent}
//             className="px-4 py-2 bg-primary text-white rounded-lg text-sm"
//           >
//             Add Content
//           </button>
//         </div>

//         <div className="space-y-4">
//           {editors.map((editor) => (
//             <div key={editor.id} className="border rounded-lg p-4">
//               <div className="flex justify-between items-center mb-4">
//                 <input
//                   type="text"
//                   value={editor.title}
//                   onChange={(e) => handleTitleChange(editor.id, e.target.value)}
//                   placeholder="Title"
//                   className="px-3 py-2 border rounded-lg text-sm"
//                 />
//                 <div className="flex items-center gap-4">
//                   <label className="flex items-center gap-2">
//                     <input
//                       type="checkbox"
//                       checked={editor.checked}
//                       onChange={(e) =>
//                         setEditors((prev) =>
//                           prev.map((ed) =>
//                             ed.id === editor.id ? { ...ed, checked: e.target.checked } : ed
//                           )
//                         )
//                       }
//                       className="rounded"
//                     />
//                     <span className="text-sm">Visible</span>
//                   </label>
//                   <button
//                     onClick={() => handleRemoveContent(editor.id)}
//                     className="text-red-500 hover:text-red-700"
//                   >
//                     ✕
//                   </button>
//                 </div>
//               </div>
//               <textarea
//                 value={editor.content}
//                 onChange={(e) => handleContentChange(editor.id, e.target.value)}
//                 placeholder="Content"
//                 className="w-full px-3 py-2 border rounded-lg text-sm min-h-[100px]"
//               />
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Save Button */}
//       <div className="flex justify-end">
//         <button
//           onClick={handleSavePage}
//           className="px-6 py-2 bg-primary text-white rounded-lg text-sm font-semibold"
//           onClick={handleSavePage}
//           disabled={isLoading}
//         >
//           {isLoading ? (
//             <span className="flex items-center">
//               <Loader className="animate-spin h-4 w-4 mr-2" />
//               Saving...
//             </span>
//           ) : (
//             "Save"
//           )}
//         </button>
//       </div>
//     </div>
//   )
// }

// export default AddPage
