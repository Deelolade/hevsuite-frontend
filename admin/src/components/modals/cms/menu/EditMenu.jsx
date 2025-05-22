"use client"

import { useState, useEffect } from "react"
import { Loader } from "lucide-react"
import { useSelector, useDispatch } from "react-redux"
import { getPages } from "../../../../store/cms/cmsSlice"

const EditMenu = ({ setIsEditMenuModalOpen, selectedMenu, onSave }) => {
  const dispatch = useDispatch()
  const { isLoading, pages } = useSelector((state) => state.cms)
  const [menuTitle, setMenuTitle] = useState("")
  const [menuLink, setMenuLink] = useState("")
  const [menuVisibility, setMenuVisibility] = useState(false)
  const [selectedPages, setSelectedPages] = useState([])
  const [selectedPage, setSelectedPage] = useState(null)

  useEffect(() => {
    // Fetch pages when component mounts
    dispatch(getPages({ status: "active" }))
  }, [dispatch])

  useEffect(() => {
    if (selectedMenu) {
      setMenuTitle(selectedMenu.title || "")
      setMenuLink(selectedMenu.link || "")
      setMenuVisibility(selectedMenu.visibility !== false)
      setSelectedPages(selectedMenu.items || [])
    }
  }, [selectedMenu])

  const handlePageSelection = (pageId) => {
    const page = pages.find(p => p._id === pageId)
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

  const handleRemovePage = (pageId) => {
    setSelectedPages(prev => prev.filter(p => p.pageId !== pageId))
  }

  const handleSave = () => {
    if (!menuTitle.trim()) {
      alert("Menu title is required")
      return
    }

    const updatedMenu = {
      title: menuTitle,
      link: menuLink,
      visibility: menuVisibility,
      items: selectedPages.map(page => ({
        ...page,
        _id: page._id || Date.now().toString()
      }))
    }

    onSave(updatedMenu)
    setIsEditMenuModalOpen(false)
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Edit Menu</h2>
        <button onClick={() => setIsEditMenuModalOpen(false)} className="text-gray-400 hover:text-gray-600">
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
            {pages?.filter(page => !selectedPages.some(selectedPage => selectedPage.pageId === page._id))
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

        {/* Visibility */}
        <div>
          <label className="block text-sm mb-1">Visibility</label>
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

        {/* Selected Page Display */}
        <div className="selected-page-display" style={{ maxHeight: '50px', overflow: 'auto' }}>
          {selectedPage && (
            <div className="p-2 bg-gray-100 rounded">
              <p className="text-sm">{selectedPage.title}</p>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-3 pt-4">
          <button onClick={() => setIsEditMenuModalOpen(false)} className="px-6 py-2 border rounded-lg text-sm">
            Cancel
          </button>
          <button
            onClick={handleSave}
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
  )
}

export default EditMenu
