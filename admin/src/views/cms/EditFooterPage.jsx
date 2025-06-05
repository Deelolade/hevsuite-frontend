"use client"

import { useState, useEffect } from "react"
import { ArrowLeft, Plus, X } from "lucide-react"
import { useDispatch, useSelector } from "react-redux"
import { editFooter } from "../../store/cms/cmsSlice"
import { useNavigate } from "react-router-dom"
import toast from "react-hot-toast"

const EditFooterPage = ({ onBack, selectedFooter, selectedPage, refreshData }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { isLoading } = useSelector((state) => state.cms)

  // Initialize state with selectedPage data or from sessionStorage
  const [title, setTitle] = useState(() => {
    const savedTitle = sessionStorage.getItem("editFooterPageTitle")
    return savedTitle || selectedPage?.title || ""
  })

  const [editors, setEditors] = useState(() => {
    const savedEditors = sessionStorage.getItem("editFooterPageEditors")
    if (savedEditors) {
      try {
        return JSON.parse(savedEditors)
      } catch (e) {
        // Fall back to selectedPage data
      }
    }

    if (selectedPage?.content) {
      if (Array.isArray(selectedPage.content)) {
        return selectedPage.content.map((item, idx) => ({
          id: idx + 1,
          title: item.title || `Content ${idx + 1}`,
          content: item.content || "",
          checked: true,
          showInToc: item.showInToc || false,
        }))
      } else {
        return [{ id: 1, title: "Main Content", content: selectedPage.content, checked: true, showInToc: false }]
      }
    }
    return [{ id: 1, title: "Main Content", content: "", checked: true, showInToc: false }]
  })

  const [selectedEditor, setSelectedEditor] = useState(null)
  const [selectedContentIndex, setSelectedContentIndex] = useState(null)

  // Save to sessionStorage whenever state changes
  useEffect(() => {
    sessionStorage.setItem("editFooterPageTitle", title)
  }, [title])

  useEffect(() => {
    sessionStorage.setItem("editFooterPageEditors", JSON.stringify(editors))
  }, [editors])

  // Clear sessionStorage when component unmounts
  const clearSessionData = () => {
    sessionStorage.removeItem("editFooterPageTitle")
    sessionStorage.removeItem("editFooterPageEditors")
    // Also clear preview data
    sessionStorage.removeItem("slides")
    sessionStorage.removeItem("contents")
    sessionStorage.removeItem("mainText")
  }

  const handlePreview = () => {
    // Save data to sessionStorage in the format expected by the existing preview components
    const formattedContents = editors.map((editor) => ({
      id: editor.id,
      title: editor.title || "",
      content: editor.content || "",
      checked: editor.checked,
      showInToc: editor.showInToc || false
    }))

    // Save to sessionStorage with the keys the preview page expects
    sessionStorage.setItem("slides", JSON.stringify([])) // Empty slides for footer
    sessionStorage.setItem("contents", JSON.stringify(formattedContents))
    sessionStorage.setItem("mainText", JSON.stringify(title)) // Stringify the title to match the preview expectation

    // Navigate to preview-system page
    navigate("./preview-system")
  }

  useEffect(() => {
    // Update state when selectedPage changes (only if no saved data exists)
    if (!sessionStorage.getItem("editFooterPageTitle")) {
      setTitle(selectedPage?.title || "")
    }

    if (!sessionStorage.getItem("editFooterPageEditors")) {
      if (selectedPage?.content) {
        if (Array.isArray(selectedPage.content)) {
          setEditors(
            selectedPage.content.map((item, idx) => ({
              id: idx + 1,
              title: item.title || `Content ${idx + 1}`,
              content: item.content || "",
              checked: true,
              showInToc: item.showInToc || false,
            })),
          )
        } else {
          setEditors([{ id: 1, title: "Main Content", content: selectedPage.content, checked: true, showInToc: false }])
        }
      }
    }
  }, [selectedPage])

  const handleAddContent = () => {
    const newEditor = {
      id: Date.now(),
      title: "",
      content: "",
      checked: true,
      showInToc: false,
    }
    setEditors([...editors, newEditor])
  }

  const handleRemoveContent = (id) => {
    if (editors.length === 1) return
    setEditors((prev) => prev.filter((editor) => editor.id !== id))
    if (selectedEditor?.id === id) {
      setSelectedEditor(null)
      setSelectedContentIndex(null)
    }
  }

  const handleTitleChange = (id, value) => {
    setEditors((prev) => prev.map((editor) => (editor.id === id ? { ...editor, title: value } : editor)))
  }

  const handleContentChange = (id, value) => {
    setEditors((prev) => prev.map((editor) => (editor.id === id ? { ...editor, content: value } : editor)))
  }

  const handleSavePage = async () => {
    if (!title.trim()) {
      toast.error("Page title is required")
      return
    }

    if (!selectedFooter) {
      toast.error("No footer selected")
      return
    }

    try {
      // Create updated page object
      const updatedPage = {
        ...selectedPage,
        title,
        visibility: true,
        owner: "System",
        slides: [], // No slides for footer
        content: editors.map((editor) => ({
          title: editor.title,
          content: editor.content,
          visibility: true,
          showInToc: editor.showInToc,
        })),
      }

      // Update the page in the footer's items array
      const updatedItems = selectedFooter.items.map((item) => (item._id === selectedPage._id ? updatedPage : item))

      // Prepare data for API call
      const data = {
        id: selectedFooter._id,
        data: {
          items: updatedItems,
        },
      }

      // Dispatch the action to update footer
      await dispatch(editFooter(data)).unwrap()

      // Clear session data after successful save
      clearSessionData()

      // Show success message
      toast.success("Page updated successfully")

      // Refresh data and go back
      if (refreshData) refreshData()
      onBack()
    } catch (error) {
      console.error("Error updating page:", error)
      toast.error("Failed to update page")
    }
  }

  const handleBack = () => {
    // Ask user if they want to save their work before leaving
    const hasChanges =
      title !== (selectedPage?.title || "") || JSON.stringify(editors) !== JSON.stringify(selectedPage?.content || [])

    if (hasChanges) {
      if (confirm("You have unsaved changes. Do you want to leave without saving?")) {
        clearSessionData()
        onBack()
      }
    } else {
      clearSessionData()
      onBack()
    }
  }

  const handleDiscard = () => {
    if (confirm("Are you sure you want to discard all changes?")) {
      clearSessionData()
      onBack()
    }
  }

  return (
    <div className="space-y-6 pb-10 max-w-7xl mx-auto px-4">
      {/* Header */}
      <div className="flex items-center gap-2 mb-6">
        <button className="text-gray-600 hover:text-gray-800 transition-colors" onClick={ onBack}>
          <ArrowLeft size={20} />
        </button>
        <span className="text-lg font-medium">Edit Footer Page</span>
      </div>

      {/* Page Title */}
      <div className="bg-white rounded-lg p-6 shadow-sm">
        <div className="flex justify-between flex-col md:flex-row gap-4">
          <div className="flex-1">
            <label className="block text-sm mb-2 font-medium">Page Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter page title"
              className="w-full md:w-96 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>

      {/* Content Editor Section */}
      <div className="bg-white rounded-lg p-6 shadow-sm">
        <h3 className="text-lg font-medium mb-4">Page Content</h3>
        <p className="text-sm text-blue-600 mb-4">Click any content block to edit</p>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mb-6">
          <div className="lg:col-span-3 bg-gray-50 p-4 rounded-lg overflow-x-auto">
            <div className="flex gap-4 min-w-max">
              {editors.map((editor, index) => (
                <div key={editor.id} className="flex items-start gap-2">
                  <div
                    onClick={() => {
                      setSelectedContentIndex(index)
                      setSelectedEditor(editor)
                    }}
                    className={`h-32 w-44 relative cursor-pointer transition-all duration-200 flex items-center justify-center flex-col space-y-2 text-center shadow-md rounded-lg bg-white hover:shadow-lg ${
                      selectedEditor?.id === editor.id ? "ring-2 ring-primary" : ""
                    }`}
                  >
                    <div className="p-4 text-center">
                      <h4 className="font-medium text-sm mb-2">{editor.title || "Untitled"}</h4>
                      <p className="text-xs text-gray-500 line-clamp-3">
                        {editor.content ? editor.content.substring(0, 50) + "..." : "No content"}
                      </p>
                    </div>
                  </div>
                  {editors.length > 1 && (
                    <button
                      onClick={() => handleRemoveContent(editor.id)}
                      className="text-red-500 hover:text-red-700 bg-white rounded-full p-1 shadow-md transition-colors"
                    >
                      <X size={16} />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-1 p-4">
            <button
              onClick={handleAddContent}
              className="h-32 w-full cursor-pointer transition-all duration-300 flex items-center justify-center flex-col space-y-2 text-center border-2 border-primary border-dashed rounded-lg hover:bg-blue-50"
            >
              <Plus className="text-primary" size={24} />
              <span className="text-primary font-medium text-sm">Add Content</span>
            </button>
          </div>
        </div>

        {/* Selected Content Editor */}
        {selectedEditor && (
          <div className="border border-gray-200 rounded-lg p-6 bg-gray-50">
            <h4 className="text-lg font-semibold mb-4">
              Editing: {editors[selectedContentIndex]?.title || "Untitled"}
            </h4>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Content Title</label>
              <input
                type="text"
                className="w-full md:w-1/2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Enter content title"
                value={editors[selectedContentIndex]?.title || ""}
                onChange={(e) => {
                  handleTitleChange(editors[selectedContentIndex]?.id, e.target.value)
                }}
              />
            </div>

            <div className="mb-4">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={editors[selectedContentIndex]?.showInToc || false}
                  onChange={(e) => {
                    setEditors((prev) =>
                      prev.map((editor) =>
                        editor.id === editors[selectedContentIndex]?.id
                          ? { ...editor, showInToc: e.target.checked }
                          : editor
                      )
                    )
                  }}
                  className="rounded border-gray-300 text-primary focus:ring-primary"
                />
                <span className="text-sm font-medium">Show in Table of Contents</span>
              </label>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Content</label>
              <textarea
                value={editors[selectedContentIndex]?.content || ""}
                onChange={(e) => handleContentChange(editors[selectedContentIndex]?.id, e.target.value)}
                className="w-full min-h-[200px] p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                placeholder="Enter your content here..."
              />
            </div>
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex justify-end gap-4 pt-6">
        <button
          onClick={handlePreview}
          className="px-6 py-2 border border-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors"
        >
          Preview
        </button>
        <button
          onClick={handleDiscard}
          className="px-6 py-2 bg-red-600 text-white rounded-lg text-sm font-medium hover:bg-red-700 transition-colors"
        >
          Discard
        </button>
        <button
          onClick={handleSavePage}
          disabled={isLoading}
          className="px-6 py-2 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700 transition-colors disabled:opacity-50"
        >
          {isLoading ? "Saving..." : "Save Changes"}
        </button>
      </div>
    </div>
  )
}

export default EditFooterPage
