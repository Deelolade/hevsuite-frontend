import React, { useState } from "react";
import eventImage from "../../assets/event.png";
import Profile from "../../components/Profile";
import { BiSearch } from "react-icons/bi";
import Modal from "react-modal";
import { BsCalendar } from "react-icons/bs";
import { FiEye, FiEyeOff, FiTrash2 } from "react-icons/fi";
import { IoCloseOutline } from "react-icons/io5";
import { MdAccessTime } from "react-icons/md";
import edit_icon from "../../assets/icons/edit.png";
import avat from "../../assets/user.avif";
import send_icon from "../../assets/icons/send.png";
import star_icon from "../../assets/icons/star.png";
import book_icon from "../../assets/icons/read.png";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
const News = () => {
  const [currentPage, setCurrentPage] = useState(2);
  const [isAddNewsOpen, setIsAddNewsOpen] = useState(false);
  const [addNewsImages, setAddNewsImages] = useState([]);
  const [isEditNewsOpen, setIsEditNewsOpen] = useState(false);
  const [selectedNews, setSelectedNews] = useState(null);
  const [editNewsImages, setEditNewsImages] = useState([]);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isViewNewsOpen, setIsViewNewsOpen] = useState(false);

  const [isPostModalOpen, setIsPostModalOpen] = useState(false);
  const [receiverEmail, setReceiverEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [allNews, setNews] = useState([
    {
      id: 1,
      title: "The Kings Halloween Event Celebration Party",
      date: "2nd January, 2025",
      reads: "120",
      image: eventImage,
      expireDate: "23 Jan, 2025",
      audienceType: "Members",
      description: "Lorem ipsum dolor sit amet...",
      isLandingPage: true,
      isSpotlight: false,
      images: [eventImage, eventImage],
    },
    {
      id: 2,
      title: "The Kings Halloween Event Celebration Party",
      date: "2nd January, 2025",
      reads: "120",
      image: eventImage,
      expireDate: "23 Jan, 2025",
      audienceType: "Members",
      description: "Lorem ipsum dolor sit amet...",
      isLandingPage: true,
      isSpotlight: false,
      images: [eventImage, eventImage],
    },
    {
      id: 3,
      title: "The Kings Halloween Event Celebration Party",
      date: "2nd January, 2025",
      reads: "120",
      image: eventImage,
      expireDate: "23 Jan, 2025",
      audienceType: "Members",
      description: "Lorem ipsum dolor sit amet...",
      isLandingPage: true,
      isSpotlight: false,
      images: [eventImage, eventImage],
    },
    {
      id: 4,
      title: "The Kings Halloween Event Celebration Party",
      date: "2nd January, 2025",
      reads: "120",
      image: eventImage,
      expireDate: "23 Jan, 2025",
      audienceType: "Members",
      description: "Lorem ipsum dolor sit amet...",
      isLandingPage: true,
      isSpotlight: false,
      images: [eventImage, eventImage],
    },
    {
      id: 5,
      title: "The Kings Halloween Event Celebration Party",
      date: "2nd January, 2025",
      reads: "120",
      image: eventImage,
      expireDate: "23 Jan, 2025",
      audienceType: "Members",
      description: "Lorem ipsum dolor sit amet...",
      isLandingPage: true,
      isSpotlight: false,
      images: [eventImage, eventImage],
    },
    {
      id: 6,
      title: "The Kings Halloween Event Celebration Party",
      date: "2nd January, 2025",
      reads: "120",
      image: eventImage,
      expireDate: "23 Jan, 2025",
      audienceType: "Members",
      description: "Lorem ipsum dolor sit amet...",
      isLandingPage: true,
      isSpotlight: false,
      images: [eventImage, eventImage],
    },
    {
      id: 7,
      title: "The Kings Halloween Event Celebration Party",
      date: "2nd January, 2025",
      reads: "120",
      image: eventImage,
      expireDate: "23 Jan, 2025",
      audienceType: "Members",
      description: "Lorem ipsum dolor sit amet...",
      isLandingPage: true,
      isSpotlight: false,
      images: [eventImage, eventImage],
    },
    {
      id: 8,
      title: "The Kings Halloween Event Celebration Party",
      date: "2nd January, 2025",
      reads: "120",
      image: eventImage,
      expireDate: "23 Jan, 2025",
      audienceType: "Members",
      description: "Lorem ipsum dolor sit amet...",
      isLandingPage: true,
      isSpotlight: false,
      images: [eventImage, eventImage],
    },
    {
      id: 9,
      title: "The Kings Halloween Event Celebration Party",
      date: "2nd January, 2025",
      reads: "120",
      image: eventImage,
      expireDate: "23 Jan, 2025",
      audienceType: "Members",
      description: "Lorem ipsum dolor sit amet...",
      isLandingPage: true,
      isSpotlight: false,
      images: [eventImage, eventImage],
    },
    {
      id: 10,
      title: "The Kings Halloween Event Celebration Party",
      date: "2nd January, 2025",
      reads: "120",
      image: eventImage,
      expireDate: "23 Jan, 2025",
      audienceType: "Members",
      description: "Lorem ipsum dolor sit amet...",
      isLandingPage: true,
      isSpotlight: false,
      images: [eventImage, eventImage],
    },
    {
      id: 11,
      title: "The Kings Halloween Event Celebration Party",
      date: "2nd January, 2025",
      reads: "120",
      image: eventImage,
      expireDate: "23 Jan, 2025",
      audienceType: "Members",
      description: "Lorem ipsum dolor sit amet...",
      isLandingPage: true,
      isSpotlight: false,
      images: [eventImage, eventImage],
    },
  ]);

  return (
    <div className="space-y-6 md:p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex-1 max-w-2xl mx-auto px-4">
          <div className="relative">
            <BiSearch className="absolute md:flex hidden right-8 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />
            <input
              type="text"
              placeholder="Search..."
              className="w-full px-8 py-2.5 rounded-full  border border-gray-400 focus:outline-none text-sm"
            />
          </div>
        </div>
        <Profile />
      </div>

      <div className="flex justify-between flex-col md:flex-row gap-2 items-center">
        <button
          className="px-6 py-2 bg-primary text-white rounded-lg flex items-center gap-2"
          onClick={() => setIsAddNewsOpen(true)}
        >
          Create News
          <span className="text-xl">+</span>
        </button>
        <div className="flex gap-4">
          <div className="relative">
            <select
              className="appearance-none px-6 py-2.5 border border-gray-200 rounded-lg text-[#323C47] md:min-w-[200px] hover:border-gray-300 transition-colors"
              defaultValue="all"
            >
              <option value="all">All</option>
              <option value="spotlight">Spotlight News</option>
              <option value="landing">Landing Page News</option>
            </select>
          </div>
          <div className="relative">
            <select
              className="appearance-none px-6 py-2.5 border border-gray-200 rounded-lg text-[#323C47] md:min-w-[200px] hover:border-gray-300 transition-colors"
              defaultValue="all"
            >
              <option value="all">All</option>
              <option value="latest">Latest</option>
              <option value="oldest">Oldest</option>
            </select>
          </div>
        </div>
      </div>

      {/* News Grid */}
      <div className="grid md:grid-cols-4 gap-6">
        {allNews.map((news) => (
          <div
            key={news.id}
            className="relative group"
            onClick={() => {
              setSelectedNews(news);
              setIsViewNewsOpen(true);
            }}
          >
            <div className="absolute top-4 flex justify-between w-full gap-2 z-10">
              <button
                className="p-2 relative text-white left-4 rounded-lg transition-colors"
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedNews(news);
                  setIsDeleteModalOpen(true);
                }}
              >
                <FiTrash2 className="w-5 h-5" />
              </button>
              <button
                className="p-2 relative right-4 text-white rounded-lg transition-colors"
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedNews(news);
                  setEditNewsImages(news.images || []);
                  setIsEditNewsOpen(true);
                }}
              >
                <img src={edit_icon} alt="edit icon" />
              </button>
            </div>
            <div
              className="relative h-80 rounded-2xl overflow-hidden bg-center"
              style={{ backgroundImage: `url(${news.image})` }}
            >
              {/* Gradient Overlay */}
              <div className="absolute inset-0 " />

              <div className="absolute bottom-0 left-0 right-0 p-4">
                <h3 className="text-xl font-medium text-white mb-2 overflow-hidden text-ellipsis whitespace-nowrap">
                  {news.title}
                </h3>
                <div className="flex justify-between gap-4">
                  <div className="flex  flex-col gap-4">
                    <div className="flex items-center gap-2 text-white/80">
                      <BsCalendar className="w-4 h-4" />
                      <span className="text-[12px]">{news.date}</span>
                    </div>
                    <div className="flex items-center gap-2 text-white/80">
                      <img src={book_icon} alt="" />
                      <span className="text-[12px]">{news.reads} reads</span>
                    </div>
                    <div className="flex items-center gap-2 text-white/80">
                      <img src={star_icon} alt="star icon" />
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-white/80 cursor-pointer mt-12">
                    <button
                      className="border-2 rounded-3xl px-2.5 pb-0.5  border-white flex gap-2"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedNews(news);
                        setIsPostModalOpen(true);
                      }}
                    >
                      <img
                        src={send_icon}
                        alt="send icon"
                        className="w-5 h-5 mt-1"
                      />
                      post
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between">
        <div>
          Show result:
          <select className="ml-2 px-2 py-1 border rounded">
            <option>6</option>
          </select>
        </div>
        <div className="flex items-center gap-2">
          <button className="p-1 text-gray-400">
            <svg
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
          {[1, 2, 3, 4, "...", 20].map((page, index) => (
            <button
              key={index}
              className={`w-8 h-8 flex items-center justify-center rounded-lg ${
                currentPage === page
                  ? "bg-green-800 text-white"
                  : "text-gray-600"
              }`}
            >
              {page}
            </button>
          ))}
          <button className="p-1 text-gray-400">
            <svg
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>
      </div>

      <Modal
        isOpen={isAddNewsOpen}
        onRequestClose={() => setIsAddNewsOpen(false)}
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg md:w-[600px] w-[96vw] max-h-[90vh] overflow-y-auto"
        overlayClassName="fixed inset-0 bg-black/50"
        style={{
          overlay: { zIndex: 1000 },
          content: { zIndex: 1001 },
        }}
      >
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">Add News</h2>
            <button
              onClick={() => setIsAddNewsOpen(false)}
              className="text-gray-400 hover:text-gray-600"
            >
              <IoCloseOutline size={24} />
            </button>
          </div>

          <div className="space-y-4">
            {/* News Title */}
            <div>
              <label className="block mb-1">News Title</label>
              <input
                type="text"
                placeholder="Enter news title"
                className="w-full px-4 py-2 border rounded-lg text-gray-600"
              />
            </div>

            {/* Expire Date and Audience Type */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block mb-1">Expire Date</label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Enter Post Expire Date"
                    className="w-full px-4 py-2 border rounded-lg text-gray-600"
                  />
                  <BsCalendar className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
                </div>
              </div>
              <div>
                <label className="block mb-1">Audience Type</label>
                <select
                  className="w-full px-4 py-2 border rounded-lg text-gray-600 appearance-none bg-white"
                  defaultValue=""
                >
                  <option value="" disabled>
                    Who Should see the news?
                  </option>
                  <option value="all">All</option>
                  <option value="members">Members</option>
                </select>
              </div>
            </div>

            {/* News Description */}
            <div>
              <label className="block mb-1">News Description</label>
              <div className="border rounded-lg overflow-hidden">
                <div className="flex items-center gap-2 border-b p-2 bg-white">
                  <select className="px-2 py-1 border rounded text-sm">
                    <option>Normal text</option>
                  </select>
                  <div className="h-4 border-r"></div>
                  <button className="p-1 rounded hover:bg-gray-100">B</button>
                  <button className="p-1 rounded hover:bg-gray-100">I</button>
                  <button className="p-1 rounded hover:bg-gray-100">U</button>
                  <button className="p-1 rounded hover:bg-gray-100">S</button>
                  <div className="h-4 border-r"></div>
                  <button className="p-1 rounded hover:bg-gray-100">
                    {"<>"}
                  </button>
                  <button className="p-1 rounded hover:bg-gray-100">🔗</button>
                  <div className="h-4 border-r"></div>
                  <button className="p-1 rounded hover:bg-gray-100">:</button>
                  <button className="p-1 rounded hover:bg-gray-100">:</button>
                  <div className="h-4 border-r"></div>
                  <button className="p-1 rounded hover:bg-gray-100">
                    {'"'}
                  </button>
                </div>
                <textarea
                  className="w-full p-4 min-h-[200px] resize-none focus:outline-none"
                  placeholder="Enter news description..."
                />
              </div>
            </div>

            {/* Checkboxes */}
            <div className="space-y-2">
              <label className="flex items-center gap-2">
                <input type="checkbox" className="rounded" />
                <span>Post on Landing Page</span>
              </label>
              <label className="flex items-center gap-2">
                <input type="checkbox" className="rounded" />
                <span>Spotlight News</span>
              </label>
            </div>

            {/* News Images */}
            <div>
              <label className="block mb-1">News Images</label>
              <div className="flex gap-4 flex-wrap">
                <label className="w-24 h-24 border-2 border-dashed rounded-lg flex items-center justify-center cursor-pointer hover:bg-gray-50">
                  <span className="text-2xl text-gray-400">+</span>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files[0];
                      if (file) {
                        const imageUrl = URL.createObjectURL(file);
                        setAddNewsImages((prev) => [...prev, imageUrl]);
                      }
                    }}
                  />
                </label>
                {addNewsImages.map((image, index) => (
                  <div
                    key={index}
                    className="w-24 h-24 rounded-lg overflow-hidden relative group"
                  >
                    <img
                      src={image}
                      alt=""
                      className="w-full h-full object-cover"
                    />
                    <button
                      onClick={() => {
                        setAddNewsImages((prev) =>
                          prev.filter((_, i) => i !== index)
                        );
                      }}
                      className="absolute top-1 right-1 w-6 h-6 rounded-full bg-red-500 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end gap-3 pt-4">
              <button
                onClick={() => {
                  setIsAddNewsOpen(false);
                  setAddNewsImages([]);
                }}
                className="px-6 py-2 border rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                className="px-6 py-2 bg-gradient-to-r from-[#540A26] to-[#0A5440] text-white rounded-lg"
                onClick={() => {
                  // Handle create news with images
                  const newNews = {
                    id: allNews.length + 1,
                    title: "New News",
                    date: "2nd January, 2025",
                    reads: "0",
                    image: addNewsImages[0] || eventImage,
                    images: addNewsImages,
                  };
                  setNews([...allNews, newNews]);
                  setAddNewsImages([]);
                  setIsAddNewsOpen(false);
                }}
              >
                Add News
              </button>
            </div>
          </div>
        </div>
      </Modal>

      <Modal
        isOpen={isEditNewsOpen}
        onRequestClose={() => setIsEditNewsOpen(false)}
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg md:w-[600px] w-[96vw] max-h-[90vh] overflow-y-auto"
        overlayClassName="fixed inset-0 bg-black/50"
        style={{
          overlay: { zIndex: 1000 },
          content: { zIndex: 1001 },
        }}
      >
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">News Detail</h2>
            <button
              onClick={() => setIsEditNewsOpen(false)}
              className="text-gray-400 hover:text-gray-600"
            >
              <IoCloseOutline size={24} />
            </button>
          </div>

          {selectedNews && (
            <div className="space-y-4">
              {/* News Title */}
              <div>
                <label className="block mb-1">News Title</label>
                <input
                  type="text"
                  defaultValue={selectedNews.title}
                  className="w-full px-4 py-2 border rounded-lg text-gray-600"
                />
              </div>

              {/* Expire Date and Audience Type */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block mb-1">Expire Date</label>
                  <div className="relative">
                    <input
                      type="text"
                      defaultValue={selectedNews.expireDate}
                      className="w-full px-4 py-2 border rounded-lg text-gray-600"
                    />
                    <BsCalendar className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  </div>
                </div>
                <div>
                  <label className="block mb-1">Audience Type</label>
                  <select
                    className="w-full px-4 py-2 border rounded-lg text-gray-600 appearance-none bg-white"
                    defaultValue={selectedNews.audienceType}
                  >
                    <option value="all">All</option>
                    <option value="members">Members</option>
                  </select>
                </div>
              </div>

              {/* News Description */}
              <div>
                <label className="block mb-1">News Description</label>
                <div className="border rounded-lg overflow-hidden">
                  <div className="flex items-center gap-2 border-b p-2 bg-white">
                    {/* ... existing toolbar buttons ... */}
                  </div>
                  <textarea
                    className="w-full p-4 min-h-[200px] resize-none focus:outline-none"
                    defaultValue={selectedNews.description}
                  />
                </div>
              </div>

              {/* Checkboxes */}
              <div className="space-y-2">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    className="rounded"
                    defaultChecked={selectedNews.isLandingPage}
                  />
                  <span>Post on Landing Page</span>
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    className="rounded"
                    defaultChecked={selectedNews.isSpotlight}
                  />
                  <span>Spotlight News</span>
                </label>
              </div>

              {/* Upload Image / Video */}
              <div>
                <label className="block mb-1">Upload Image / Video</label>
                <div className="flex gap-4 flex-wrap">
                  <label className="w-24 h-24 border-2 border-dashed rounded-lg flex items-center justify-center cursor-pointer hover:bg-gray-50">
                    <span className="text-2xl text-gray-400">+</span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files[0];
                        if (file) {
                          const imageUrl = URL.createObjectURL(file);
                          setEditNewsImages((prev) => [...prev, imageUrl]);
                        }
                      }}
                    />
                  </label>
                  {editNewsImages.map((image, index) => (
                    <div
                      key={index}
                      className="w-24 h-24 rounded-lg overflow-hidden relative group"
                    >
                      <img
                        src={image}
                        alt=""
                        className="w-full h-full object-cover"
                      />
                      <button
                        onClick={() => {
                          setEditNewsImages((prev) =>
                            prev.filter((_, i) => i !== index)
                          );
                        }}
                        className="absolute top-1 right-1 w-6 h-6 rounded-full bg-red-500 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end gap-3 pt-4">
                <button
                  onClick={() => {
                    setIsEditNewsOpen(false);
                    setEditNewsImages([]);
                    setSelectedNews(null);
                  }}
                  className="px-6 py-2 border rounded-lg"
                >
                  Cancel
                </button>
                <button
                  className="px-6 py-2 bg-gradient-to-r from-[#540A26] to-[#0A5440] text-white rounded-lg"
                  onClick={() => {
                    setNews((news) =>
                      news.map((item) =>
                        item.id === selectedNews.id
                          ? { ...item, images: editNewsImages }
                          : item
                      )
                    );
                    setIsEditNewsOpen(false);
                    setEditNewsImages([]);
                    setSelectedNews(null);
                  }}
                >
                  Save
                </button>
              </div>
            </div>
          )}
        </div>
      </Modal>

      <Modal
        isOpen={isDeleteModalOpen}
        onRequestClose={() => setIsDeleteModalOpen(false)}
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg w-[400px]"
        overlayClassName="fixed inset-0 bg-black/50"
        style={{
          overlay: { zIndex: 1000 },
          content: { zIndex: 1001 },
        }}
      >
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">Delete News</h2>
            <button
              onClick={() => setIsDeleteModalOpen(false)}
              className="text-gray-400 hover:text-gray-600"
            >
              <IoCloseOutline size={24} />
            </button>
          </div>

          <p className="text-gray-600 mb-6">
            Are you sure you want to delete this news? This action cannot be
            undone.
          </p>

          <div className="flex justify-end gap-3">
            <button
              onClick={() => setIsDeleteModalOpen(false)}
              className="px-6 py-2 border rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
              onClick={() => {
                setNews((news) =>
                  news.filter((item) => item.id !== selectedNews.id)
                );
                setIsDeleteModalOpen(false);
                setSelectedNews(null);
              }}
            >
              Delete
            </button>
          </div>
        </div>
      </Modal>

      <Modal
        isOpen={isViewNewsOpen}
        onRequestClose={() => setIsViewNewsOpen(false)}
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg md:w-[600px] w-[96vw] max-h-[90vh] overflow-y-auto"
        overlayClassName="fixed inset-0 bg-black/50"
        style={{
          overlay: { zIndex: 1000 },
          content: { zIndex: 1001 },
        }}
      >
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">View News</h2>
            <button
              onClick={() => setIsViewNewsOpen(false)}
              className="text-gray-400 hover:text-gray-600"
            >
              <IoCloseOutline size={24} />
            </button>
          </div>

          {selectedNews && (
            <div className="space-y-4">
              {/* News Image */}
              <div>
                <div className="w-full h-64 rounded-lg overflow-hidden bg-gray-100">
                  <img
                    src={selectedNews.image}
                    alt=""
                    className="w-full h-full object-contain"
                  />
                </div>
              </div>

              {/* News Title */}
              <div>
                <label className="block mb-1 text-sm text-gray-600">
                  News Title
                </label>
                <div className="w-full px-4 py-2 border rounded-lg text-gray-600 bg-gray-50">
                  {selectedNews.title}
                </div>
              </div>

              {/* Expire Date and Audience Type */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block mb-1 text-sm text-gray-600">
                    Expire Date
                  </label>
                  <div className="w-full px-4 py-2 border rounded-lg text-gray-600 bg-gray-50">
                    {selectedNews.expireDate}
                  </div>
                </div>
                <div>
                  <label className="block mb-1 text-sm text-gray-600">
                    Audience Type
                  </label>
                  <div className="w-full px-4 py-2 border rounded-lg text-gray-600 bg-gray-50">
                    {selectedNews.audienceType}
                  </div>
                </div>
              </div>

              {/* News Description */}
              <div>
                <label className="block mb-1 text-sm text-gray-600">
                  News Description
                </label>
                <div className="w-full px-4 py-2 border rounded-lg text-gray-600 bg-gray-50 min-h-[150px]">
                  {selectedNews.description}
                </div>
              </div>

              {/* Additional Info */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block mb-1 text-sm text-gray-600">
                    Post Status
                  </label>
                  <div className="w-full px-4 py-2 border rounded-lg text-gray-600 bg-gray-50">
                    {selectedNews.isLandingPage
                      ? "Landing Page"
                      : "Regular Post"}
                  </div>
                </div>
                <div>
                  <label className="block mb-1 text-sm text-gray-600">
                    Spotlight Status
                  </label>
                  <div className="w-full px-4 py-2 border rounded-lg text-gray-600 bg-gray-50">
                    {selectedNews.isSpotlight
                      ? "Spotlight News"
                      : "Regular News"}
                  </div>
                </div>
              </div>

              {/* News Images */}
              <div>
                <label className="block mb-1 text-sm text-gray-600">
                  News Images
                </label>
                <div className="flex gap-4 flex-wrap">
                  {selectedNews.images.map((image, index) => (
                    <div
                      key={index}
                      className="w-24 h-24 rounded-lg overflow-hidden"
                    >
                      <img
                        src={image}
                        alt=""
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Close Button */}
              <div className="flex justify-end pt-4">
                <button
                  onClick={() => setIsViewNewsOpen(false)}
                  className="px-6 py-2 bg-gradient-to-r from-[#540A26] to-[#0A5440] text-white rounded-lg"
                >
                  Close
                </button>
              </div>
            </div>
          )}
        </div>
      </Modal>

      <Modal
        isOpen={isPostModalOpen}
        onRequestClose={() => setIsPostModalOpen(false)}
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg w-[450px]"
        overlayClassName="fixed inset-0 bg-black/50"
        style={{
          overlay: { zIndex: 1000 },
          content: { zIndex: 1001 },
        }}
      >
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">Post News</h2>
            <button
              onClick={() => setIsPostModalOpen(false)}
              className="text-gray-400"
            >
              ✕
            </button>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-sm mb-2">Receivers Email</label>
              <input
                type="email"
                value={receiverEmail}
                onChange={(e) => setReceiverEmail(e.target.value)}
                placeholder="Enter email"
                className="w-full px-3 py-2.5 border rounded-lg text-sm"
              />
            </div>

            <p className="text-sm text-gray-600">
              Are you sure you want to post this news article to selected
              accounts? The request is irreversible.
            </p>

            <div>
              <label className="block text-sm mb-2">Your Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-3 py-2.5 border rounded-lg text-sm pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                >
                  {showPassword ? (
                    <AiOutlineEyeInvisible className="w-5 h-5" />
                  ) : (
                    <AiOutlineEye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-4">
              <button
                onClick={() => setIsPostModalOpen(false)}
                className="px-6 py-2 border rounded-lg text-sm"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  // Handle send logic here
                  setIsPostModalOpen(false);
                }}
                className="px-6 py-2 bg-[#00B707] text-white rounded-lg text-sm"
              >
                Send
              </button>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default News;
