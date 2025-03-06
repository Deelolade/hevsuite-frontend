import React, { useState, useEffect } from "react";
import { FiEdit } from "react-icons/fi";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";
import Modal from "react-modal";
import AddFooterPage from "./AddPage";
// import AddFooterPage from "./AddFooterPage";
import EditFooterItem from "../../components/modals/cms/footer/EditFooterItem";
import EditFooter from "../../components/modals/cms/footer/EditFooter";
import CreatedPages from "../../components/modals/cms/footer/CreatedPages";
import EditPage from "./EditPage";

const Footer = () => {
  const [selectedSection, setSelectedSection] = useState("policies");
  const [currentPage, setCurrentPage] = useState(2);
  const [isAddFooterOpen, setIsAddFooterOpen] = useState(false);
  const [footerTitle, setFooterTitle] = useState("");
  const [footerLink, setFooterLink] = useState("");
  const [footerVisibility, setFooterVisibility] = useState(false);
  const [showAddPage, setShowAddPage] = useState(false);
  const [menuVisibility, setMenuVisibility] = useState(false);

  const [isEditItemModalOpen, setIsEditItemModalOpen] = useState(false);
  const [isEditFooterModalOpen, setIsEditFooterModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isCreatedPagesOpen, setIsCreatedPagesOpen] = useState(false);
  const [showEditPage, setShowEditPage] = useState(false);

  const [sections, setSections] = useState([
    { id: "policies", name: "Policies" },
    { id: "hhclub", name: "HH Club & Founder" },
  ]);

  useEffect(() => {
    if (selectedSection === "policies") {
      setFooterItems([
        {
          id: 1,
          title: "Terms and Condition",
          visibility: true,
          owner: "System",
        },
        { id: 2, title: "Privacy Policy", visibility: true, owner: "System" },
      ]);
    } else {
      setFooterItems([]);
    }
  }, [selectedSection]);

  const [dragging, setDragging] = useState(null);
  const [dragOver, setDragOver] = useState(null);

  const Items = (event, index) => {
    setDragging(index);
  };

  const handleDragOver = (event, index) => {
    setDragOver(index);
  };

  const handleDragEnd = (event) => {
    if (dragging !== null && dragOver !== null) {
      const newFooters = [...sections];
      const [reorderedItem] = newFooters.splice(dragging, 1);
      newFooters.splice(dragOver, 0, reorderedItem);
      setSections(newFooters);
    }
    setDragging(null);
    setDragOver(null);
  };

  const [footerItems, setFooterItems] = useState([
    { id: 1, title: "Terms and Condition", visibility: true, owner: "System" },
    { id: 2, title: "Privacy Policy", visibility: true, owner: "System" },
  ]);
  const handleVisibility = (id) => {
    setFooterItems(
      footerItems.map((item) =>
        item.id === id ? { ...item, visibility: !item.visibility } : item
      )
    );
  };

  const [draggingItems, setDraggingItems] = useState(null);
  const [dragItemsOver, setDragItemsOver] = useState(null);

  const handleDragItemsStart = (event, index) => {
    setDraggingItems(index);
  };

  const handleDragItemsOver = (event, index) => {
    setDragItemsOver(index);
  };

  const handleDragItemsEnd = (event) => {
    if (draggingItems !== null && dragItemsOver !== null) {
      const newFooters = [...footerItems];
      const [reorderedItem] = newFooters.splice(draggingItems, 1);
      newFooters.splice(dragItemsOver, 0, reorderedItem);
      setFooterItems(newFooters);
    }
    setDraggingItems(null);
    setDragItemsOver(null);
  };
  useEffect(() => {
    const params = new URLSearchParams(window.location.search).get("edit");
    if (params === "1") {
      setShowAddPage(true);
    }
    if (params === "2") {
      setShowAddPage(true);
      setShowEditPage(true);
    }
  }, []);

  return (
    <div className="space-y-6">
      {/* Controls */}
      {showAddPage ? (
        showEditPage ? (
          <EditPage
            onBack={() => {
              setShowAddPage(false);
              setShowEditPage(false);
            }}
          />
        ) : (
          <AddFooterPage
            onBack={() => {
              setShowAddPage(false);
              setShowEditPage(false);
            }}
          />
        )
      ) : (
        <>
          <div className="flex flex-col md:flex-row justify-end items-center gap-2">
            <select className="px-4 py-2 w-full md:w-fit border rounded-lg text-gray-600 min-w-[200px]">
              <option>Active</option>
              <option>Deleted</option>
            </select>
            <div className="flex items-start justify-start md:justify-end md:items-end w-full md:w-fit gap-3">
              <button
                className="px-6 py-2 border rounded-lg"
                onClick={() => setIsEditFooterModalOpen(true)}
              >
                Edit Footer
              </button>
              <button
                className="px-6 py-2 bg-primary text-white rounded-lg"
                onClick={() => setIsAddFooterOpen(true)}
              >
                Add Footer
              </button>
            </div>
          </div>

          <div className="flex items-center md:w-full w-full justify-center md:gap-4">
            <button className="text-gray-400">
              <svg
                className="w-6 h-6"
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

            <div className="flex gap-4  overflow-auto">
              {sections.map((section, index) => (
                <button
                  key={section.id}
                  draggable={true}
                  onDragStart={(e) => Items(e, index)}
                  onDragOver={(e) => handleDragOver(e, index)}
                  onDragEnd={handleDragEnd}
                  className={`px-6 py-2 rounded-lg  w-56 h-16 flex justify-between items-center gap-2 ${
                    selectedSection === section.id
                      ? "bg-primary text-white"
                      : "border text-gray-600"
                  }`}
                  onClick={() => setSelectedSection(section.id)}
                >
                  {section.name}
                  <div className="flex flex-col  scale-75  gap-1 ">
                    <BsArrowLeft size={20} />
                    <BsArrowRight size={20} />
                  </div>
                </button>
              ))}
            </div>

            <button className="text-gray-400 ">
              <svg
                className="w-6 h-6"
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
            <div
              onClick={() => setIsCreatedPagesOpen(true)}
              className="bg-gray-100 rounded-lg p-4 text-center w-2/5 border-2 border-primary cursor-pointer hover:bg-gray-50 transition-colors"
            >
              Created Pages
            </div>
          </div>

          <div className="flex justify-end">
            <button
              className="px-6 py-2 bg-primary text-white rounded-lg"
              onClick={() => {
                setShowAddPage(true);
                window.history.pushState(null, "", `?tab=footer&edit=1`);
              }}
            >
              Add New Page
            </button>
          </div>

          {/* Table */}
          <div className="bg-white w-[90vw] md:w-full overflow-auto  rounded-lg">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-4 px-6 text-sm font-medium">
                    Page Title
                  </th>
                  <th className="text-left py-4 px-6 text-sm font-medium">
                    Visibility
                  </th>
                  <th className="text-left py-4 px-6 text-sm font-medium">
                    Owner
                  </th>
                  <th className="text-left py-4 px-6 text-sm font-medium">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {footerItems.map((item, index) => (
                  <tr
                    key={item.id}
                    draggable={true}
                    onDragStart={(e) => handleDragItemsStart(e, index)}
                    onDragOver={(e) => handleDragItemsOver(e, index)}
                    onDragEnd={handleDragItemsEnd}
                    className="border-b"
                  >
                    <td className="py-4 px-6 flex items-center gap-2">
                      <span className="p-1 border rounded">⋮⋮</span>
                      {item.title}
                    </td>
                    <td className="py-4 px-6">
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={item.visibility}
                          className="sr-only peer"
                          onChange={() => handleVisibility(item.id)}
                        />
                        <div className="w-11 h-6 bg-gray-500 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                      </label>
                    </td>
                    <td className="py-4 px-6 text-sm text-gray-600">
                      {item.owner}
                    </td>
                    <td className="py-4 px-6">
                      <button
                        className="text-primary"
                        onClick={() => {
                          setSelectedItem(item);
                          setShowEditPage(true);
                          setShowAddPage(true);
                          window.history.pushState(
                            null,
                            "",
                            `?tab=footer&edit=2`
                          );
                          // setIsEditItemModalOpen(true);
                        }}
                      >
                        <FiEdit size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex w-[95vw] overflow-auto md:w-full items-center justify-between">
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
            isOpen={isAddFooterOpen}
            onRequestClose={() => setIsAddFooterOpen(false)}
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg md:w-[450px] w-[90vw]"
            overlayClassName="fixed inset-0 bg-black/50"
          >
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold">Add Footer</h2>
                <button
                  onClick={() => setIsAddFooterOpen(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-6">
                {/* Footer Title */}
                <div>
                  <label className="block text-sm mb-2">Footer Title</label>
                  <input
                    type="text"
                    value={footerTitle}
                    onChange={(e) => setFooterTitle(e.target.value)}
                    placeholder="Footer Title"
                    className="w-full px-3 py-2 border rounded-lg text-sm"
                  />
                </div>

                {/* Link */}
                <div>
                  <label className="block text-sm mb-2">Link (available)</label>
                  <input
                    type="text"
                    value={footerLink}
                    onChange={(e) => setFooterLink(e.target.value)}
                    placeholder="Enter link/url"
                    className="w-full px-3 py-2 border rounded-lg text-sm"
                  />
                </div>

                {/* Visibility */}
                <div>
                  <label className="block text-sm mb-2">Visibility</label>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={footerVisibility}
                      onChange={(e) => setFooterVisibility(e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-500 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                  </label>
                </div>

                {/* Action Buttons */}
                <div className="flex justify-end gap-3 pt-4">
                  <button
                    onClick={() => setIsAddFooterOpen(false)}
                    className="px-6 py-2 border rounded-lg text-sm"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => {
                      // Handle save changes
                      setIsAddFooterOpen(false);
                    }}
                    className="px-6 py-2 bg-primary text-white rounded-lg text-sm"
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          </Modal>

          <Modal
            isOpen={isEditItemModalOpen}
            onRequestClose={() => setIsEditItemModalOpen(false)}
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg md:w-[450px] w-[90vw]"
            overlayClassName="fixed inset-0 bg-black/50"
          >
            <EditFooterItem
              setIsEditItemModalOpen={setIsEditItemModalOpen}
              selectedItem={selectedItem}
            />
          </Modal>

          <Modal
            isOpen={isEditFooterModalOpen}
            onRequestClose={() => setIsEditFooterModalOpen(false)}
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg md:w-[450px] w-[90vw]"
            overlayClassName="fixed inset-0 bg-black/50"
          >
            <EditFooter setIsEditFooterModalOpen={setIsEditFooterModalOpen} />
          </Modal>
          <Modal
            isOpen={isCreatedPagesOpen}
            onRequestClose={() => setIsCreatedPagesOpen(false)}
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg w-[600px]"
            overlayClassName="fixed inset-0 bg-black/50"
          >
            <CreatedPages setIsCreatedPagesOpen={setIsCreatedPagesOpen} />
          </Modal>
        </>
      )}
    </div>
  );
};

export default Footer;
