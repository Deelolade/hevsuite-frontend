"use client"

import { useState, useEffect } from "react"
import { Loader } from "lucide-react"
import { useSelector } from "react-redux"

const EditFooter = ({ setIsEditFooterModalOpen, selectedFooter, onSave }) => {
  const { isLoading } = useSelector((state) => state.cms)
  const [footerTitle, setFooterTitle] = useState("")
  const [footerLink, setFooterLink] = useState("")
  const [footerVisibility, setFooterVisibility] = useState(false)

  useEffect(() => {
    if (selectedFooter) {
      setFooterTitle(selectedFooter.title || "")
      setFooterLink(selectedFooter.link || "")
      setFooterVisibility(selectedFooter.visibility !== false)
    }
  }, [selectedFooter])

  const handleSave = () => {
    if (!footerTitle.trim()) {
      alert("Footer title is required")
      return
    }

    const updatedFooter = {
      title: footerTitle,
      link: footerLink,
      visibility: footerVisibility,
    }

    onSave(updatedFooter)
    setIsEditFooterModalOpen(false)
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
  )
}

export default EditFooter
