"use client"

import { useState, useEffect } from "react"
import { Loader } from "lucide-react"
import { useSelector, useDispatch } from "react-redux"
import { getPages, getAllFooters } from "../../../../store/cms/cmsSlice"
import { toast } from "react-hot-toast"

const EditFooter = ({ setIsEditFooterModalOpen, selectedFooter, onSave }) => {
  const dispatch = useDispatch()
  const { isLoading, pages } = useSelector((state) => state.cms)
  const [footerTitle, setFooterTitle] = useState("")
  const [footerLink, setFooterLink] = useState("")
  const [footerVisibility, setFooterVisibility] = useState(false)
  const [selectedPages, setSelectedPages] = useState([])
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)

  useEffect(() => {
    // Fetch pages when component mounts
    dispatch(getPages({ status: "active" }))
  }, [dispatch])

  useEffect(() => {
    if (selectedFooter) {
      setFooterTitle(selectedFooter.title || "")
      setFooterLink(selectedFooter.link || "")
      setFooterVisibility(selectedFooter.visibility !== false)
      setSelectedPages(selectedFooter.items || [])
    }
  }, [selectedFooter])

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
    if (!footerTitle.trim()) {
      alert("Footer title is required")
      return
    }

    const updatedFooter = {
      title: footerTitle,
      link: footerLink,
      visibility: footerVisibility,
      items: selectedPages.map(page => ({
        ...page,
        _id: page._id || Date.now().toString()
      }))
    }

    onSave(updatedFooter)
    setIsEditFooterModalOpen(false)
  }

  const handleDelete = async () => {
    if (selectedFooter) {
      try {
        await onSave({ ...selectedFooter, visibility: false });
        // Show success message
        toast.success("Footer deleted successfully");
        // Refresh the footer list
        await dispatch(getAllFooters({ status: "active" }));
        // Close both modals after successful deletion
        setIsDeleteModalOpen(false);
        setIsEditFooterModalOpen(false);
      } catch (error) {
        console.error('Error deleting footer:', error);
        toast.error("Failed to delete footer");
        // Keep modals open if there's an error
      }
    }
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Edit Footer</h2>
        <button onClick={() => setIsEditFooterModalOpen(false)} className="text-gray-400 hover:text-gray-600">
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

        {/* Page Selection */}
        <div>
          <label className="block text-sm mb-2">Select Pages</label>
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
            <label className="block text-sm mb-2">Selected Pages</label>
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
        <div className="flex justify-between gap-3 pt-4">
          {(footerTitle.trim().toLowerCase() !== "policies" && (selectedFooter?.title || "").trim().toLowerCase() !== "policies") && (
            <button
              onClick={() => setIsDeleteModalOpen(true)}
              className="px-6 py-2 bg-red-500 text-white rounded-lg text-sm hover:bg-red-600"
              disabled={isLoading}
            >
              Delete Footer
            </button>
          )}
          <div className="flex gap-3">
            <button onClick={() => setIsEditFooterModalOpen(false)} className="px-6 py-2 border rounded-lg text-sm">
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

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center">
                <span className="text-red-500 text-xl">⚠</span>
              </div>
              <h2 className="text-xl">Delete Footer</h2>
              <button 
                onClick={() => {
                  setIsDeleteModalOpen(false);
                }} 
                className="text-gray-400 hover:text-gray-600 ml-auto"
              >
                ✕
              </button>
            </div>

            <p className="text-gray-600 mb-8">
              Are you sure you want to delete this footer? This action cannot be undone and will remove all pages associated
              with this footer.
            </p>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => {
                  setIsDeleteModalOpen(false);
                }}
                className="px-6 py-2 border rounded-lg hover:bg-gray-50"
                disabled={isLoading}
              >
                Cancel
              </button>
              <button
                className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                onClick={handleDelete}
                disabled={isLoading}
              >
                {isLoading ? (
                  <span className="flex items-center">
                    <Loader className="animate-spin h-4 w-4 mr-2" />
                    Deleting...
                  </span>
                ) : (
                  "Delete Footer"
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default EditFooter
