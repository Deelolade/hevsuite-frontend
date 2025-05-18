"use client"

import { useState, useEffect } from "react"
import { FiEdit } from "react-icons/fi"
import { BsArrowLeft, BsArrowRight } from "react-icons/bs"
import Modal from "react-modal"
import AddFooterPage from "./AddPage"
import EditFooterItem from "../../components/modals/cms/footer/EditFooterItem"
import EditFooter from "../../components/modals/cms/footer/EditFooter"
import CreatedPages from "../../components/modals/cms/footer/CreatedPages"
import EditPage from "./EditPage"
import { useDispatch, useSelector } from "react-redux"
import {
  getAllFooters,
  changeFooterVisibility,
  updateFooterOrder,
  addNewFooter,
  editFooter,
} from "../../store/cms/cmsSlice"
import { Loader } from "lucide-react"

const Footer = () => {
  const dispatch = useDispatch()
  const { footers, isLoading } = useSelector((state) => state.cms)

  const [selectedSection, setSelectedSection] = useState("policies")
  const [currentPage, setCurrentPage] = useState(1)
  const [isAddFooterOpen, setIsAddFooterOpen] = useState(false)
  const [footerTitle, setFooterTitle] = useState("")
  const [footerLink, setFooterLink] = useState("")
  const [footerVisibility, setFooterVisibility] = useState(false)
  const [showAddPage, setShowAddPage] = useState(false)
  const [menuVisibility, setMenuVisibility] = useState(false)
  const [statusFilter, setStatusFilter] = useState("active")

  const [isEditItemModalOpen, setIsEditItemModalOpen] = useState(false)
  const [isEditFooterModalOpen, setIsEditFooterModalOpen] = useState(false)
  const [selectedItem, setSelectedItem] = useState(null)
  const [isCreatedPagesOpen, setIsCreatedPagesOpen] = useState(false)
  const [showEditPage, setShowEditPage] = useState(false)
  const [footerItems, setFooterItems] = useState([])
  const [sections, setSections] = useState([])

  // Fetch footers on component mount and when status filter changes
  useEffect(() => {
    dispatch(getAllFooters({ status: statusFilter }))
  }, [dispatch, statusFilter])

  // Update sections when footers are loaded
  useEffect(() => {
    if (footers && footers.length > 0) {
      const sectionData = footers.map((footer) => ({
        id: footer._id,
        name: footer.title,
      }))
      setSections(sectionData)

      // Set default selected section to the first one
      if (sectionData.length > 0 && !selectedSection) {
        setSelectedSection(sectionData[0].id)
      }
    }
  }, [footers])

  // Update footer items when selected section changes
  useEffect(() => {
    if (selectedSection && footers) {
      const selectedFooter = footers.find((footer) => footer._id === selectedSection)
      if (selectedFooter) {
        setFooterItems(selectedFooter.items || [])
      } else {
        setFooterItems([])
      }
    }
  }, [selectedSection, footers])

  const [dragging, setDragging] = useState(null)
  const [dragOver, setDragOver] = useState(null)

  const handleDragStart = (event, index) => {
    setDragging(index)
  }

  const handleDragOver = (event, index) => {
    event.preventDefault()
    setDragOver(index)
  }

  const handleDragEnd = (event) => {
    if (dragging !== null && dragOver !== null) {
      const newSections = [...sections]
      const [reorderedItem] = newSections.splice(dragging, 1)
      newSections.splice(dragOver, 0, reorderedItem)
      setSections(newSections)

      // Update order in the backend
      const orderedIds = newSections.map((section) => section.id)
      dispatch(updateFooterOrder(orderedIds))
    }
    setDragging(null)
    setDragOver(null)
  }

  const handleVisibility = (id) => {
    const item = footerItems.find((item) => item._id === id)
    if (item) {
      const updatedItem = { ...item, visibility: !item.visibility }

      dispatch(
        changeFooterVisibility({
          id: selectedSection,
          data: {
            items: footerItems.map((i) => (i._id === id ? updatedItem : i)),
          },
        }),
      )

      // Update local state for immediate UI feedback
      setFooterItems(footerItems.map((item) => (item._id === id ? { ...item, visibility: !item.visibility } : item)))
    }
  }

  const [draggingItems, setDraggingItems] = useState(null)
  const [dragItemsOver, setDragItemsOver] = useState(null)

  const handleDragItemsStart = (event, index) => {
    setDraggingItems(index)
  }

  const handleDragItemsOver = (event, index) => {
    event.preventDefault()
    setDragItemsOver(index)
  }

  const handleDragItemsEnd = (event) => {
    if (draggingItems !== null && dragItemsOver !== null) {
      const newFooterItems = [...footerItems]
      const [reorderedItem] = newFooterItems.splice(draggingItems, 1)
      newFooterItems.splice(dragItemsOver, 0, reorderedItem)
      setFooterItems(newFooterItems)

      // Update in the backend
      dispatch(
        changeFooterVisibility({
          id: selectedSection,
          data: {
            items: newFooterItems,
          },
        }),
      )
    }
    setDraggingItems(null)
    setDragItemsOver(null)
  }

  useEffect(() => {
    const params = new URLSearchParams(window.location.search).get("edit")
    if (params === "1") {
      setShowAddPage(true)
    }
    if (params === "2") {
      setShowAddPage(true)
      setShowEditPage(true)
    }
  }, [])

  // Calculate pagination
  const itemsPerPage = 6
  const totalPages = Math.ceil(footerItems.length / itemsPerPage)
  const paginatedItems = footerItems.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  // Generate pagination numbers
  const generatePaginationNumbers = () => {
    if (totalPages <= 7) {
      return Array.from({ length: totalPages }, (_, i) => i + 1)
    }

    if (currentPage <= 4) {
      return [1, 2, 3, 4, 5, "...", totalPages]
    }

    if (currentPage >= totalPages - 3) {
      return [1, "...", totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages]
    }

    return [1, "...", currentPage - 1, currentPage, currentPage + 1, "...", totalPages]
  }

  return (
    <div className="space-y-6">
      {/* Controls */}
      {showAddPage ? (
        showEditPage ? (
          <EditPage
            onBack={() => {
              setShowAddPage(false)
              setShowEditPage(false)
              window.history.pushState(null, "", `?tab=footer`)
            }}
            selectedItem={selectedItem}
          />
        ) : (
          <AddFooterPage
            onBack={() => {
              setShowAddPage(false)
              setShowEditPage(false)
              window.history.pushState(null, "", `?tab=footer`)
            }}
            selectedSection={selectedSection}
            refreshData={() => dispatch(getAllFooters({ status: statusFilter }))}
          />
        )
      ) : (
        <>
          <div className="flex flex-col md:flex-row justify-end items-center gap-2">
            <select
              className="px-4 py-2 w-full md:w-fit border rounded-lg text-gray-600 min-w-[200px]"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="active">Active</option>
              <option value="deleted">Deleted</option>
            </select>
            <div className="flex items-start justify-start md:justify-end md:items-end w-full md:w-fit gap-3">
              <button className="px-6 py-2 border rounded-lg" onClick={() => setIsEditFooterModalOpen(true)}>
                Edit Footer
              </button>
              <button className="px-6 py-2 bg-primary text-white rounded-lg" onClick={() => setIsAddFooterOpen(true)}>
                Add Footer
              </button>
            </div>
          </div>

          {isLoading ? (
            <div className="flex justify-center items-center h-40">
              <Loader className="animate-spin h-8 w-8 text-primary" />
            </div>
          ) : (
            <>
              <div className="flex items-center md:w-full w-full justify-center md:gap-4">
                <button
                  className="text-gray-400"
                  onClick={() => {
                    const currentIndex = sections.findIndex((s) => s.id === selectedSection)
                    if (currentIndex > 0) {
                      setSelectedSection(sections[currentIndex - 1].id)
                    }
                  }}
                  disabled={sections.length === 0}
                >
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>

                <div className="flex gap-4 overflow-auto">
                  {sections.map((section, index) => (
                    <button
                      key={section.id}
                      draggable={true}
                      onDragStart={(e) => handleDragStart(e, index)}
                      onDragOver={(e) => handleDragOver(e, index)}
                      onDragEnd={handleDragEnd}
                      className={`px-6 py-2 rounded-lg w-56 h-16 flex justify-between items-center gap-2 ${
                        selectedSection === section.id ? "bg-primary text-white" : "border text-gray-600"
                      }`}
                      onClick={() => setSelectedSection(section.id)}
                    >
                      {section.name}
                      <div className="flex flex-col scale-75 gap-1">
                        <BsArrowLeft size={20} />
                        <BsArrowRight size={20} />
                      </div>
                    </button>
                  ))}
                </div>

                <button
                  className="text-gray-400"
                  onClick={() => {
                    const currentIndex = sections.findIndex((s) => s.id === selectedSection)
                    if (currentIndex < sections.length - 1) {
                      setSelectedSection(sections[currentIndex + 1].id)
                    }
                  }}
                  disabled={sections.length === 0}
                >
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
                <div
                  onClick={() => setIsCreatedPagesOpen(true)}
                  className="bg-gray-100 rounded-lg p-4 text-center w-2/5 border-2 border-primary cursor-pointer hover:bg-primary/50 transition-colors"
                >
                  Created Pages
                </div>
              </div>

              <div className="flex justify-end">
                <button
                  className="px-6 py-2 bg-primary text-white rounded-lg"
                  onClick={() => {
                    setShowAddPage(true)
                    window.history.pushState(null, "", `?tab=footer&edit=1`)
                  }}
                >
                  Add New Page
                </button>
              </div>

              {/* Table */}
              <div className="bg-white w-[90vw] md:w-full overflow-auto rounded-lg">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-4 px-6 text-sm font-medium">Page Title</th>
                      <th className="text-left py-4 px-6 text-sm font-medium">Visibility</th>
                      <th className="text-left py-4 px-6 text-sm font-medium">Owner</th>
                      <th className="text-left py-4 px-6 text-sm font-medium">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedItems.length > 0 ? (
                      paginatedItems.map((item, index) => (
                        <tr
                          key={item._id}
                          draggable={true}
                          onDragStart={(e) => handleDragItemsStart(e, index)}
                          onDragOver={(e) => handleDragItemsOver(e, index)}
                          onDragEnd={handleDragItemsEnd}
                          className="border-b"
                        >
                          <td className="py-4 px-6 flex items-center gap-2">
                            <span className="p-1 border rounded cursor-move">⋮⋮</span>
                            {item.title}
                          </td>
                          <td className="py-4 px-6">
                            <label className="relative inline-flex items-center cursor-pointer">
                              <input
                                type="checkbox"
                                checked={item.visibility}
                                className="sr-only peer"
                                onChange={() => handleVisibility(item._id)}
                              />
                              <div className="w-11 h-6 bg-gray-500 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                            </label>
                          </td>
                          <td className="py-4 px-6 text-sm text-gray-600">{item.owner || "System"}</td>
                          <td className="py-4 px-6">
                            <button
                              className="text-primary"
                              onClick={() => {
                                setSelectedItem(item)
                                setShowEditPage(true)
                                setShowAddPage(true)
                                window.history.pushState(null, "", `?tab=footer&edit=2&system=true`)
                              }}
                            >
                              <FiEdit size={18} />
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="4" className="py-4 px-6 text-center text-gray-500">
                          No items found. Add a new page to get started.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              {footerItems.length > 0 && (
                <div className="flex w-[95vw] overflow-auto md:w-full items-center justify-between">
                  <div>
                    Show result:
                    <select
                      className="ml-2 px-2 py-1 border rounded"
                      value={itemsPerPage}
                      onChange={(e) => {
                        // This would need additional state management to be fully implemented
                        // setItemsPerPage(Number(e.target.value));
                        // setCurrentPage(1);
                      }}
                    >
                      <option value="6">6</option>
                      <option value="12">12</option>
                      <option value="24">24</option>
                    </select>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      className="p-1 text-gray-400"
                      onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                      disabled={currentPage === 1}
                    >
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                    </button>
                    {generatePaginationNumbers().map((page, index) => (
                      <button
                        key={index}
                        className={`w-8 h-8 flex items-center justify-center rounded-lg ${
                          currentPage === page ? "bg-green-800 text-white" : "text-gray-600"
                        }`}
                        onClick={() => {
                          if (typeof page === "number") {
                            setCurrentPage(page)
                          }
                        }}
                        disabled={typeof page !== "number"}
                      >
                        {page}
                      </button>
                    ))}
                    <button
                      className="p-1 text-gray-400"
                      onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                      disabled={currentPage === totalPages}
                    >
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </div>
                </div>
              )}
            </>
          )}

          <Modal
            isOpen={isAddFooterOpen}
            onRequestClose={() => setIsAddFooterOpen(false)}
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg md:w-[450px] w-[90vw]"
            overlayClassName="fixed inset-0 bg-black/50"
          >
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold">Add Footer</h2>
                <button onClick={() => setIsAddFooterOpen(false)} className="text-gray-400 hover:text-gray-600">
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
                  <button onClick={() => setIsAddFooterOpen(false)} className="px-6 py-2 border rounded-lg text-sm">
                    Cancel
                  </button>
                  <button
                    onClick={() => {
                      dispatch(
                        addNewFooter({
                          title: footerTitle,
                          items: [],
                          visibility: footerVisibility,
                          link: footerLink,
                        }),
                      ).then(() => {
                        setIsAddFooterOpen(false)
                        setFooterTitle("")
                        setFooterLink("")
                        setFooterVisibility(false)
                      })
                    }}
                    className="px-6 py-2 bg-primary text-white rounded-lg text-sm"
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
              onSave={(updatedItem) => {
                const updatedItems = footerItems.map((item) => (item._id === updatedItem._id ? updatedItem : item))

                dispatch(
                  editFooter({
                    id: selectedSection,
                    data: { items: updatedItems },
                  }),
                )
              }}
            />
          </Modal>

          <Modal
            isOpen={isEditFooterModalOpen}
            onRequestClose={() => setIsEditFooterModalOpen(false)}
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg md:w-[450px] w-[90vw]"
            overlayClassName="fixed inset-0 bg-black/50"
          >
            <EditFooter
              setIsEditFooterModalOpen={setIsEditFooterModalOpen}
              selectedFooter={footers.find((f) => f._id === selectedSection)}
              onSave={(updatedFooter) => {
                dispatch(
                  editFooter({
                    id: selectedSection,
                    data: updatedFooter,
                  }),
                )
              }}
            />
          </Modal>

          <Modal
            isOpen={isCreatedPagesOpen}
            onRequestClose={() => setIsCreatedPagesOpen(false)}
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg w-[600px]"
            overlayClassName="fixed inset-0 bg-black/50"
          >
            <CreatedPages
              setIsCreatedPagesOpen={setIsCreatedPagesOpen}
              footers={footers}
              onEditPage={(item) => {
                setSelectedItem(item)
                setShowEditPage(true)
                setShowAddPage(true)
                setIsCreatedPagesOpen(false)
                window.history.pushState(null, "", `?tab=footer&edit=2&system=true`)
              }}
            />
          </Modal>
        </>
      )}
    </div>
  )
}

export default Footer
