import React, { useState } from "react";
import eventImage from "../../assets/event.png";
import Profile from "../../components/Profile";
import { BiSearch } from "react-icons/bi";
import Modal from "react-modal";
import { BsCalendar } from "react-icons/bs";
import { FiEye, FiEyeOff, FiTrash2 } from "react-icons/fi";
import { MdAccessTime } from "react-icons/md";
import edit_icon from "../../assets/icons/edit.png";
import avat from "../../assets/user.avif";
import send_icon from "../../assets/icons/send.png";
import star_icon from "../../assets/icons/star.png";
// import { useEditor, EditorContent } from "@tiptap/react";
// import StarterKit from "@tiptap/starter-kit";
// import Underline from "@tiptap/extension-underline";
const News = () => {
  const [currentPage, setCurrentPage] = useState(2);
  const [isAddNewsOpen, setIsAddNewsOpen] = useState(false);

  // const editor = useEditor({
  //   extensions: [StarterKit, Underline],
  //   content: "",
  // });

  const [news, setNews] = useState([
    {
      id: 1,
      title: "The Bout for Lions",
      date: "2nd January, 2025",
      time: "10:00pm",
      image: eventImage,
    },
    {
      id: 2,
      title: "The Bout for Lions",
      date: "2nd January, 2025",
      time: "10:00pm",
      image: eventImage,
    },
    {
      id: 3,
      title: "The Bout for Lions",
      date: "2nd January, 2025",
      time: "10:00pm",
      image: avat,
    },
    {
      id: 4,
      title: "The Bout for Lions",
      date: "2nd January, 2025",
      time: "10:00pm",
      image: eventImage,
    },
    {
      id: 5,
      title: "The Bout for Lions",
      date: "2nd January, 2025",
      time: "10:00pm",
      image: avat,
    },
    {
      id: 6,
      title: "The Bout for Lions",
      date: "2nd January, 2025",
      time: "10:00pm",
      image: eventImage,
    },
    {
      id: 7,
      title: "The Bout for Lions",
      date: "2nd January, 2025",
      time: "10:00pm",
      image: eventImage,
    },
    {
      id: 8,
      title: "The Bout for Lions",
      date: "2nd January, 2025",
      time: "10:00pm",
      image: avat,
    },
  ]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div className="relative flex-1 max-w-xl">
          <BiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />
          <input
            type="text"
            placeholder="Search..."
            className="w-full pl-10 pr-4 py-2 border rounded-lg"
          />
        </div>
        <div className="flex items-center gap-4">
          <Profile />
        </div>
      </div>
      <div className="flex justify-between items-center">
        <button
          className="px-6 py-2 bg-primary text-white rounded-lg flex items-center gap-2"
          onClick={() => setIsAddNewsOpen(true)}
        >
          Create News
          <span className="text-xl">+</span>
        </button>
        <div className="flex gap-4">
          <div className="relative">
            <button className="px-6 py-2 border rounded-lg text-gray-600 min-w-[200px] text-left flex items-center justify-between">
              Filter
              <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
                <path
                  fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
          <div className="relative">
            <button className="px-6 py-2 border rounded-lg text-gray-600 min-w-[200px] text-left flex items-center justify-between">
              Sort by
              <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
                <path
                  fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* News Grid */}
      <div className="grid grid-cols-4 gap-6">
        {news.map((event) => (
          <div key={event.id} className="relative group">
            <div className="absolute top-4 flex justify-between w-full gap-2 z-10">
              <button className="p-2 relative  text-white left-4 rounded-lg  transition-colors">
                <img src={edit_icon} alt="edit icon" />
              </button>
              <button className="p-2 relative right-4 text-white rounded-lg  transition-colors">
                <FiTrash2 className="w-5 h-5" />
              </button>
            </div>
            <div
              className="relative h-80 rounded-2xl overflow-hidden bg-center"
              style={{ backgroundImage: `url(${event.image})` }}
            >
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#540A26]/90 to-transparent" />

              <div className="absolute bottom-0 left-0 right-0 p-4">
                <h3 className="text-xl font-medium text-white mb-2 overflow-hidden text-ellipsis whitespace-nowrap">
                  {event.title}
                </h3>
                <div className="flex justify-between gap-4">
                  <div className="flex  flex-col gap-4">
                    <div className="flex items-center gap-2 text-white/80">
                      <BsCalendar className="w-4 h-4" />
                      <span className="text-[12px]">{event.date}</span>
                    </div>
                    <div className="flex items-center gap-2 text-white/80">
                      <MdAccessTime className="w-4 h-4" />
                      <span className="text-[12px]">{event.time}</span>
                    </div>
                    <div className="flex items-center gap-2 text-white/80">
                      <img src={star_icon} alt="star icon" />
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-white/80 cursor-pointer mt-12">
                    <button className="border-2 rounded-3xl px-2.5 pb-0.5  border-white flex gap-2">
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
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg w-[600px] max-h-[90vh] overflow-y-auto"
        overlayClassName="fixed inset-0 bg-black/50"
      >
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">Add News</h2>
            <button
              onClick={() => setIsAddNewsOpen(false)}
              className="text-2xl text-gray-400 hover:text-gray-600"
            >
              ×
            </button>
          </div>

          <div className="space-y-4">
            {/* News Title */}
            <div>
              <label className="block mb-2">News Title</label>
              <input
                type="text"
                placeholder="Enter news title"
                className="w-full px-4 py-3 border rounded-lg text-gray-600"
              />
            </div>

            {/* Expire Date and Audience Type */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block mb-2">Expire Date</label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Enter Post Expire Date"
                    className="w-full px-4 py-3 border rounded-lg text-gray-600"
                  />
                  <BsCalendar className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
                </div>
              </div>
              <div>
                <label className="block mb-2">Audience Type</label>
                <select className="w-full px-4 py-3 border rounded-lg text-gray-600 appearance-none">
                  <option>Who Should see the news?</option>
                </select>
              </div>
            </div>

            {/* News Description */}
            <div>
              <label className="block mb-2">News Description</label>
              <div className="border rounded-lg overflow-hidden">
                <div className="flex items-center gap-2 border-b p-2 bg-white">
                  <select className="px-2 py-1 border rounded text-sm">
                    <option>Normal text</option>
                  </select>
                  <div className="h-4 border-r"></div>
                  <button
                  // onClick={() => editor?.chain().focus().toggleBold().run()}
                  // className={`p-1 rounded ${
                  //   // editor?.isActive("bold") ? "bg-gray-100" : ""
                  // }`}
                  >
                    B
                  </button>
                  <button
                  // onClick={() => editor?.chain().focus().toggleItalic().run()}
                  // className={`p-1 rounded ${
                  //   editor?.isActive("italic") ? "bg-gray-100" : ""
                  // }`}
                  >
                    I
                  </button>
                  <button
                  // onClick={() =>
                  //   editor?.chain().focus().toggleUnderline().run()
                  // }
                  // className={`p-1 rounded ${
                  //   editor?.isActive("underline") ? "bg-gray-100" : ""
                  // }`}
                  >
                    U
                  </button>
                  <button className="p-1 rounded">S</button>
                  <div className="h-4 border-r"></div>
                  <button className="p-1 rounded">{"<>"}</button>
                  <button className="p-1 rounded">🔗</button>
                  <div className="h-4 border-r"></div>
                  <button className="p-1 rounded">:</button>
                  <button className="p-1 rounded">:</button>
                  <div className="h-4 border-r"></div>
                  <button className="p-1 rounded">{'"'}</button>
                </div>
                {/* <EditorContent editor={editor} className="p-4 min-h-[200px]" /> */}
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

            {/* Event Image */}
            <div>
              <label className="block mb-2">Event Image</label>
              <div className="border-2 border-dashed rounded-lg p-8 flex items-center justify-center cursor-pointer hover:bg-gray-50">
                <span className="text-4xl text-gray-400">+</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end gap-3 pt-4">
              <button
                onClick={() => setIsAddNewsOpen(false)}
                className="px-6 py-2 border rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button className="px-6 py-2 bg-gradient-to-r from-[#540A26] to-[#0A5440] text-white rounded-lg">
                Add News
              </button>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default News;
