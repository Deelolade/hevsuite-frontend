"use client"

import { useState, useEffect } from "react"
import { Loader } from "lucide-react"
import { useSelector } from "react-redux"

const EditFooterItem = ({ setIsEditItemModalOpen, selectedItem, onSave }) => {
  const { isLoading } = useSelector((state) => state.cms)
  const [title, setTitle] = useState("")
  const [link, setLink] = useState("")
  const [visibility, setVisibility] = useState(true)

  useEffect(() => {
    if (selectedItem) {
      setTitle(selectedItem.title || "")
      setLink(selectedItem.link || "")
      setVisibility(selectedItem.visibility !== false)
    }
  }, [selectedItem])

  const handleSave = () => {
    if (!title.trim()) {
      alert("Title is required")
      return
    }

    const updatedItem = {
      ...selectedItem,
      title,
      link,
      visibility,
    }

    onSave(updatedItem)
    setIsEditItemModalOpen(false)
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Edit Footer Item</h2>
        <button onClick={() => setIsEditItemModalOpen(false)} className="text-gray-400 hover:text-gray-600">
          ✕
        </button>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-sm mb-2">Page Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg text-sm"
          />
        </div>

        <div>
          <label className="block text-sm mb-2">Link (optional)</label>
          <input
            type="text"
            value={link}
            onChange={(e) => setLink(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg text-sm"
            placeholder="https://example.com"
          />
        </div>

        <div>
          <label className="block text-sm mb-2">Visibility</label>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={visibility}
              onChange={(e) => setVisibility(e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-500 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
          </label>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-3 pt-4">
          <button onClick={() => setIsEditItemModalOpen(false)} className="px-6 py-2 border rounded-lg text-sm">
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

export default EditFooterItem
