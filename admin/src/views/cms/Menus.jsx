"use client"

import { useState, useEffect } from "react"
import { FiEdit } from "react-icons/fi"
import { BsArrowLeft, BsArrowRight } from "react-icons/bs"
import { FaTrash } from "react-icons/fa"
import Modal from "react-modal"
import AddMenuPage from "./AddPage"
import EditMenuItem from "../../components/modals/cms/menu/EditMenuItem"
import EditMenu from "../../components/modals/cms/menu/EditMenu"
import CreatedMenuPages from "../../components/modals/cms/menu/CreatedMenuPages"
import EditPage from "./EditPage"
import { useDispatch, useSelector } from "react-redux"
import { getAllMenus, changeMenuVisibility, updateMenuOrder, addNewMenu, editMenus, getPages, updatePage } from "../../store/cms/cmsSlice"
import { Loader } from "lucide-react"

const Menu = () => {
  const dispatch = useDispatch()
  const { menus, isLoading, pages: storePages } = useSelector((state) => state.cms)

  const [selectedSection, setSelectedSection] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [isAddMenuOpen, setIsAddMenuOpen] = useState(false)
  const [menuTitle, setMenuTitle] = useState("")
  const [menuLink, setMenuLink] = useState("")
  const [menuVisibility, setMenuVisibility] = useState(false)
  const [showAddPage, setShowAddPage] = useState(false)
  const [statusFilter, setStatusFilter] = useState("active")
  const [menuPages, setMenuPages] = useState([])

  const [isEditItemModalOpen, setIsEditItemModalOpen] = useState(false)
  const [isEditMenuModalOpen, setIsEditMenuModalOpen] = useState(false)
  const [selectedItem, setSelectedItem] = useState(null)
  const [isCreatedPagesOpen, setIsCreatedPagesOpen] = useState(false)
  const [showEditPage, setShowEditPage] = useState(false)
  const [menuItems, setMenuItems] = useState([])
  const [sections, setSections] = useState([])
  const [selectedPages, setSelectedPages] = useState([])

  const [draggingPage, setDraggingPage] = useState(null)
  const [dragPageOver, setDragPageOver] = useState(null)

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [pageToDelete, setPageToDelete] = useState(null)

  const [localPageOrder, setLocalPageOrder] = useState({});
  const [orderedPages, setOrderedPages] = useState([]);

  // Add this useEffect to initialize local storage and ordered pages
  useEffect(() => {
    const savedOrder = localStorage.getItem(`menu_${selectedSection}_order`);
    if (savedOrder) {
      setLocalPageOrder(JSON.parse(savedOrder));
    }
  }, [selectedSection]);

  // Add this useEffect to maintain ordered pages
  useEffect(() => {
    if (storePages && storePages.length > 0) {
      const filteredPages = storePages.filter(page => {
        const isMenuPage = page.menuId === selectedSection;
        const isInMenuItems = menuPages.includes(page._id);
        return isMenuPage || isInMenuItems;
      });

      const sortedPages = [...filteredPages].sort((a, b) => {
        const orderA = localPageOrder[a._id];
        const orderB = localPageOrder[b._id];
        
        if (orderA !== undefined && orderB !== undefined) {
          return orderA - orderB;
        }
        
        if (a.order !== undefined && b.order !== undefined) {
          return a.order - b.order;
        }
        
        return new Date(b.createdAt) - new Date(a.createdAt);
      });

      setOrderedPages(sortedPages);
    }
  }, [storePages, selectedSection, localPageOrder, menuPages]);

  const handleDragPageStart = (event, index) => {
    setDraggingPage(index)
  }

  const handleDragPageOver = (event, index) => {
    event.preventDefault()
    setDragPageOver(index)
  }

  const handleDragPageEnd = async (event) => {
    if (draggingPage === null || dragPageOver === null) {
      setDraggingPage(null)
      setDragPageOver(null)
      return
    }

    try {
      // Create new array with reordered pages
      const newPages = [...orderedPages];
      const [reorderedPage] = newPages.splice(draggingPage, 1);
      newPages.splice(dragPageOver, 0, reorderedPage);

      // Update local storage immediately
      const newOrder = {};
      newPages.forEach((page, index) => {
        newOrder[page._id] = index + 1;
      });
      
      // Update both state and localStorage
      setLocalPageOrder(newOrder);
      localStorage.setItem(`menu_${selectedSection}_order`, JSON.stringify(newOrder));
      setOrderedPages(newPages);

      // Update the order for all pages in the backend
      for (let i = 0; i < newPages.length; i++) {
        const page = newPages[i];
        await dispatch(
        updatePage({
            id: page._id,
          data: {
              order: i + 1
          }
        })
        );
      }

      // Refresh the pages list
      await dispatch(getPages({ status: "active" }));
    } catch (error) {
      console.error('Error updating page order:', error);
      // Revert local storage on error
      const savedOrder = localStorage.getItem(`menu_${selectedSection}_order`);
      if (savedOrder) {
        setLocalPageOrder(JSON.parse(savedOrder));
      }
    } finally {
      setDraggingPage(null);
      setDragPageOver(null);
    }
  }

  // Fetch menus on component mount and when status filter changes
  useEffect(() => {
    dispatch(getAllMenus({ status: statusFilter }))
  }, [dispatch, statusFilter])

  // Fetch pages when component mounts and when selectedSection changes
  useEffect(() => {
    if (selectedSection) {
      // First fetch pages with menuId
      dispatch(getPages({ status: "active", menuId: selectedSection }))
        .then(() => {
          // Then fetch all active pages to ensure we have the complete list
          dispatch(getPages({ status: "active" }))
        })
    }
  }, [dispatch, selectedSection])

  // Update sections when menus are loaded
  useEffect(() => {
    if (menus && menus.length > 0) {
      const sectionData = menus.map((menu) => ({
        id: menu._id,
        name: menu.title,
      }))
      setSections(sectionData)

      // Set default selected section to the first one
      if (sectionData.length > 0 && !selectedSection) {
        setSelectedSection(sectionData[0].id)
      }
    }
  }, [menus])

  // Update menu items when selected section changes
  useEffect(() => {
    if (selectedSection && menus) {
      const selectedMenu = menus.find((menu) => menu._id === selectedSection)
      if (selectedMenu) {
        console.log('Selected Menu:', selectedMenu)
        setMenuItems(selectedMenu.items || [])
        // Get the pageIds from menu items - handle both populated and unpopulated cases
        const pageIds = selectedMenu.items
          ?.filter(item => item.pageId)
          .map(item => {
            // If pageId is an object (populated), get its _id, otherwise use the value directly
            const pageId = typeof item.pageId === 'object' ? item.pageId._id : item.pageId
            console.log('Processing pageId:', pageId)
            return pageId
          }) || []
        console.log('Menu Page IDs:', pageIds)
        setMenuPages(pageIds)
      } else {
        setMenuItems([])
        setMenuPages([])
      }
    }
  }, [selectedSection, menus])

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
      dispatch(updateMenuOrder(orderedIds))
    }
    setDragging(null)
    setDragOver(null)
  }

  const handleVisibility = (id) => {
    const item = menuItems.find((item) => item._id === id)
    if (item) {
      const updatedItem = { ...item, visibility: !item.visibility }

      dispatch(
        changeMenuVisibility({
          id: selectedSection,
          data: {
            items: menuItems.map((i) => (i._id === id ? updatedItem : i)),
          },
        }),
      )

      // Update local state for immediate UI feedback
      setMenuItems(menuItems.map((item) => (item._id === id ? { ...item, visibility: !item.visibility } : item)))
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
      const newMenuItems = [...menuItems]
      const [reorderedItem] = newMenuItems.splice(draggingItems, 1)
      newMenuItems.splice(dragItemsOver, 0, reorderedItem)
      setMenuItems(newMenuItems)

      // Update in the backend
      dispatch(
        changeMenuVisibility({
          id: selectedSection,
          data: {
            items: newMenuItems,
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
  const totalPages = Math.ceil(menuItems.length / itemsPerPage)
  const paginatedItems = menuItems.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

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

  // Add this function to handle page selection
  const handlePageSelection = (pageId) => {
    const page = storePages.find(p => p._id === pageId)
    if (page) {
      setSelectedPages(prev => [...prev, {
        _id: Date.now().toString(),
        type: "page",
        pageId: page._id,
        title: page.title,
        visibility: true,
        createdAt: new Date().toISOString()
      }])
    }
  }

  // Add this function to remove selected page
  const handleRemovePage = (pageId) => {
    setSelectedPages(prev => prev.filter(p => p.pageId !== pageId))
  }

  // Update page visibility
  const handlePageVisibilityChange = (pageId, newVisibility) => {
    // Update backend
    dispatch(
      updatePage({
        id: pageId,
        data: {
          visibility: newVisibility
        }
      })
    ).then((response) => {
      if (response.meta.requestStatus === 'fulfilled') {
        // Update local state immediately
        const updatedPages = storePages.map(page => 
          page._id === pageId ? { ...page, visibility: newVisibility } : page
        );
        // No need to refresh pages since we've updated the local state
      }
    })
  }

  // Update page after edit
  const handlePageEdit = (updatedPage) => {
    // Update backend
    dispatch(
      updatePage({
        id: updatedPage._id,
        data: updatedPage
      })
    ).then((response) => {
      if (response.meta.requestStatus === 'fulfilled') {
        // Update local state immediately
        const updatedPages = storePages.map(page => 
          page._id === updatedPage._id ? updatedPage : page
        );
        // No need to refresh pages since we've updated the local state
      }
    })
  }

  // Update the handleDeletePage function
  const handleDeletePage = (pageId) => {
    setPageToDelete(pageId)
    setIsDeleteModalOpen(true)
  }

  const confirmDeletePage = () => {
    if (!pageToDelete) return

      // First check if the page is in menu items
    const menuItem = menuItems.find(item => item.pageId === pageToDelete || (item.pageId && item.pageId._id === pageToDelete))
      
      if (menuItem) {
        // If page is in menu items, remove it from the menu
        const updatedItems = menuItems.filter(item => 
        item.pageId !== pageToDelete && (!item.pageId || item.pageId._id !== pageToDelete)
        )
        
        dispatch(
          editMenus({
            id: selectedSection,
            data: { items: updatedItems },
          })
        ).then(() => {
          // Update local state
          setMenuItems(updatedItems)
          // Remove from menuPages
        setMenuPages(prev => prev.filter(id => id !== pageToDelete))
        })
      }

      // Then delete the page itself
      dispatch(
        updatePage({
        id: pageToDelete,
          data: {
            visibility: false // Soft delete by setting visibility to false
          }
        })
      ).then(() => {
        // Refresh pages
        dispatch(getPages({ status: "active" }))
      // Close modal and reset state
      setIsDeleteModalOpen(false)
      setPageToDelete(null)
      })
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
              window.history.pushState(null, "", `?tab=menu`)
            }}
            selectedItem={selectedItem}
            onSave={handlePageEdit}
          />
        ) : (
          <AddMenuPage
            onBack={() => {
              setShowAddPage(false)
              setShowEditPage(false)
              window.history.pushState(null, "", `?tab=menu`)
            }}
            refreshData={() => {
              dispatch(getPages({ status: "active" }))
            }}
            menuId={selectedSection}
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
              <button className="px-6 py-2 border rounded-lg" onClick={() => setIsEditMenuModalOpen(true)}>
                Edit Menu
              </button>
              <button className="px-6 py-2 bg-primary text-white rounded-lg" onClick={() => setIsAddMenuOpen(true)}>
                Add Menu
              </button>
            </div>
          </div>

          {isLoading ? (
            <div className="flex justify-center items-center h-40">
              <Loader className="animate-spin h-8 w-8" />
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
              </div>

              <div className="flex justify-end">
                <button
                  className="px-6 py-2 bg-primary text-white rounded-lg"
                  onClick={() => {
                    setShowAddPage(true)
                    window.history.pushState(null, "", `?tab=menu&edit=1`)
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
                    {orderedPages.length > 0 ? (
                      orderedPages.map((page, index) => (
                          <tr 
                            key={page._id} 
                          className={`border-b transition-colors duration-200 ${
                            draggingPage === index ? 'opacity-50 bg-gray-50' : ''
                          } ${
                            dragPageOver === index ? 'border-t-2 border-primary bg-primary/5' : ''
                          }`}
                            draggable={true}
                            onDragStart={(e) => handleDragPageStart(e, index)}
                            onDragOver={(e) => handleDragPageOver(e, index)}
                            onDragEnd={handleDragPageEnd}
                          >
                            <td className="py-4 px-6 flex items-center gap-2">
                            <span className="p-1 border rounded cursor-move hover:bg-gray-50">
                              <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 8h16M4 16h16" />
                              </svg>
                            </span>
                              {page.title}
                            </td>
                            <td className="py-4 px-6">
                              <label className="relative inline-flex items-center cursor-pointer">
                                <input
                                  type="checkbox"
                                  checked={page.visibility || false}
                                  className="sr-only peer"
                                  onChange={() => handlePageVisibilityChange(page._id, !page.visibility)}
                                />
                                <div className={`w-11 h-6 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all ${
                                  page.visibility ? "bg-primary" : "bg-gray-500"
                                }`}></div>
                              </label>
                            </td>
                            <td className="py-4 px-6 text-sm text-gray-600">{page.owner || "System"}</td>
                            <td className="py-4 px-6 flex items-center gap-3">
                              <button 
                                className="text-primary hover:text-primary-dark"
                                onClick={() => {
                                  setSelectedItem(page);
                                  setShowEditPage(true);
                                  setShowAddPage(true);
                                  window.history.pushState(null, "", `?tab=menu&edit=2`);
                                }}
                              >
                                <FiEdit size={18} />
                              </button>
                            {page.owner === "Admin" && (
                              <button 
                                className="text-red-500 hover:text-red-700"
                                onClick={() => handleDeletePage(page._id)}
                              >
                                <FaTrash size={18} />
                              </button>
                            )}
                            </td>
                          </tr>
                        ))
                    ) : (
                      <tr>
                        <td colSpan="4" className="py-4 px-6 text-center text-gray-500">
                          No pages found for this menu
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              {menuItems.length > 0 && (
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
                      className="px-3 py-1 border rounded"
                      onClick={() => setCurrentPage(1)}
                      disabled={currentPage === 1}
                    >
                      First
                    </button>
                    <button
                      className="px-3 py-1 border rounded"
                      onClick={() => setCurrentPage(currentPage - 1)}
                      disabled={currentPage === 1}
                    >
                      Previous
                    </button>
                    {generatePaginationNumbers().map((page, index) => (
                      <button
                        key={index}
                        className={`px-3 py-1 border rounded ${
                          page === currentPage ? "bg-primary text-white" : ""
                        }`}
                        onClick={() => {
                          if (page !== "...") {
                            setCurrentPage(page)
                          }
                        }}
                        disabled={page === "..."}
                      >
                        {page}
                      </button>
                    ))}
                    <button
                      className="px-3 py-1 border rounded"
                      onClick={() => setCurrentPage(currentPage + 1)}
                      disabled={currentPage === totalPages}
                    >
                      Next
                    </button>
                    <button
                      className="px-3 py-1 border rounded"
                      onClick={() => setCurrentPage(totalPages)}
                      disabled={currentPage === totalPages}
                    >
                      Last
                    </button>
                  </div>
                </div>
              )}
            </>
          )}

          <Modal
            isOpen={isAddMenuOpen}
            onRequestClose={() => setIsAddMenuOpen(false)}
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg md:w-[450px] w-[90vw]"
            overlayClassName="fixed inset-0 bg-black/50"
          >
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Add Menu</h2>
                <button onClick={() => setIsAddMenuOpen(false)} className="text-gray-400 hover:text-gray-600">
                  ✕
                </button>
              </div>

              <div className="space-y-6">
                {/* Menu Title */}
                <div>
                  <label className="block text-sm mb-1">Menu Title</label>
                  <input
                    type="text"
                    value={menuTitle}
                    onChange={(e) => setMenuTitle(e.target.value)}
                    placeholder="Menu Title"
                    className="w-full px-3 py-2 border rounded-lg text-sm"
                  />
                </div>

                {/* Link */}
                <div>
                  <label className="block text-sm mb-1">Link (available)</label>
                  <input
                    type="text"
                    value={menuLink}
                    onChange={(e) => setMenuLink(e.target.value)}
                    placeholder="Enter link/url"
                    className="w-full px-3 py-2 border rounded-lg text-sm"
                  />
                </div>

                {/* Page Selection */}
                <div>
                  <label className="block text-sm mb-1">Select Pages</label>
                  <select
                    className="w-full px-3 py-2 border rounded-lg text-sm"
                    onChange={(e) => handlePageSelection(e.target.value)}
                    value=""
                  >
                    <option value="">Select a page</option>
                    {storePages?.filter(page => !selectedPages.some(selectedPage => selectedPage.pageId === page._id))
                      .map((page) => (
                        <option key={page._id} value={page._id}>
                          {page.title}
                        </option>
                      ))}
                  </select>
                </div>

                {/* Selected Pages List */}
                {selectedPages.length > 0 && (
                  <div className="mt-2">
                    <label className="block text-sm mb-1">Selected Pages</label>
                    <div className="flex flex-wrap gap-2">
                      {selectedPages.map((page) => (
                        <div key={page.pageId} className="flex items-center justify-between bg-gray-50 p-2 rounded" style={{ width: 'fit-content' }}>
                          <span className="text-sm">{page.title}</span>
                          <button
                            onClick={() => handleRemovePage(page.pageId)}
                            className="text-red-500 hover:text-red-700 ml-2"
                          >
                            ✕
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Visibility Toggle */}
                <div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={menuVisibility}
                      onChange={(e) => setMenuVisibility(e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-500 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                  </label>
                </div>

                {/* Action Buttons */}
                <div className="flex justify-end gap-3 pt-4">
                  <button onClick={() => setIsAddMenuOpen(false)} className="px-6 py-2 border rounded-lg text-sm">
                    Cancel
                  </button>
                  <button
                    onClick={() => {
                      if (!menuTitle.trim()) {
                        alert("Menu title is required")
                        return
                      }
                      dispatch(addNewMenu({
                        title: menuTitle,
                        link: menuLink,
                        visibility: menuVisibility,
                        items: selectedPages
                      }))
                      setIsAddMenuOpen(false)
                      setMenuTitle("")
                      setMenuLink("")
                      setMenuVisibility(false)
                      setSelectedPages([])
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
            <EditMenuItem
              setIsEditItemModalOpen={setIsEditItemModalOpen}
              selectedItem={selectedItem}
              onSave={(updatedItem) => {
                const updatedItems = menuItems.map((item) => (item._id === updatedItem._id ? updatedItem : item))

                dispatch(
                  editMenus({
                    id: selectedSection,
                    data: { items: updatedItems },
                  }),
                )
              }}
            />
          </Modal>

          <Modal
            isOpen={isEditMenuModalOpen}
            onRequestClose={() => setIsEditMenuModalOpen(false)}
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg md:w-[450px] w-[90vw]"
            overlayClassName="fixed inset-0 bg-black/50"
          >
            <EditMenu
              setIsEditMenuModalOpen={setIsEditMenuModalOpen}
              selectedMenu={menus.find((f) => f._id === selectedSection)}
              onSave={(updatedMenu) => {
                return dispatch(
                  editMenus({
                    id: selectedSection,
                    data: updatedMenu,
                  }),
                ).then(() => {
                  // If the menu was soft deleted (visibility set to false)
                  if (updatedMenu.visibility === false) {
                    // Update local state immediately
                    setSections(prev => prev.filter(section => section.id !== selectedSection));
                    // If there are other sections, select the first one
                    if (sections.length > 1) {
                      const nextSection = sections.find(section => section.id !== selectedSection);
                      if (nextSection) {
                        setSelectedSection(nextSection.id);
                      }
                    }
                  }
                });
              }}
            />
          </Modal>

          <Modal
            isOpen={isCreatedPagesOpen}
            onRequestClose={() => setIsCreatedPagesOpen(false)}
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg w-[600px]"
            overlayClassName="fixed inset-0 bg-black/50"
          >
            <CreatedMenuPages
              setIsCreatedPagesOpen={setIsCreatedPagesOpen}
              menus={menus}
              onEditPage={(item) => {
                setSelectedItem(item)
                setShowEditPage(true)
                setShowAddPage(true)
                setIsCreatedPagesOpen(false)
                window.history.pushState(null, "", `?tab=menu&edit=2&system=true`)
              }}
            />
          </Modal>

          <Modal
            isOpen={isDeleteModalOpen}
            onRequestClose={() => {
              setIsDeleteModalOpen(false)
              setPageToDelete(null)
            }}
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg md:w-[450px] w-[90vw]"
            overlayClassName="fixed inset-0 bg-black/50"
          >
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-gray-800">Delete Page</h2>
                <button 
                  onClick={() => {
                    setIsDeleteModalOpen(false)
                    setPageToDelete(null)
                  }} 
                  className="text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-4">
                <p className="text-gray-600">
                  Are you sure you want to delete this page? This action cannot be undone.
                </p>

                <div className="flex justify-end gap-3 pt-4">
                  <button 
                    onClick={() => {
                      setIsDeleteModalOpen(false)
                      setPageToDelete(null)
                    }} 
                    className="px-6 py-2 border rounded-lg text-sm hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={confirmDeletePage}
                    className="px-6 py-2 bg-red-500 text-white rounded-lg text-sm hover:bg-red-600"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <span className="flex items-center">
                        <Loader className="animate-spin h-4 w-4 mr-2" />
                        Deleting...
                      </span>
                    ) : (
                      "Delete Page"
                    )}
                  </button>
                </div>
              </div>
            </div>
          </Modal>
        </>
      )}
    </div>
  )
}

export default Menu

