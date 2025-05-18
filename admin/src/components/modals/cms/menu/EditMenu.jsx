"use client"

import { useState, useEffect } from "react"
import { Loader } from "lucide-react"
import { useSelector } from "react-redux"

const EditMenu = ({ setIsEditMenuModalOpen, selectedMenu, onSave }) => {
  const { isLoading } = useSelector((state) => state.cms)
  const [menuTitle, setMenuTitle] = useState("")
  const [menuLink, setMenuLink] = useState("")
  const [menuVisibility, setMenuVisibility] = useState(false)

  useEffect(() => {
    if (selectedMenu) {
      setMenuTitle(selectedMenu.title || "")
      setMenuLink(selectedMenu.link || "")
      setMenuVisibility(selectedMenu.visibility !== false)
    }
  }, [selectedMenu])

  const handleSave = () => {
    if (!menuTitle.trim()) {
      alert("Menu title is required")
      return
    }

    const updatedMenu = {
      title: menuTitle,
      link: menuLink,
      visibility: menuVisibility,
    }

    onSave(updatedMenu)
    setIsEditMenuModalOpen(false)
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Edit Menu</h2>
        <button onClick={() => setIsEditMenuModalOpen(false)} className="text-gray-400 hover:text-gray-600">
          ✕
        </button>
      </div>

      <div className="space-y-6">
        {/* Menu Title */}
        <div>
          <label className="block text-sm mb-2">Menu Title</label>
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
          <label className="block text-sm mb-2">Link (available)</label>
          <input
            type="text"
            value={menuLink}
            onChange={(e) => setMenuLink(e.target.value)}
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
              checked={menuVisibility}
              onChange={(e) => setMenuVisibility(e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-500 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
          </label>
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
