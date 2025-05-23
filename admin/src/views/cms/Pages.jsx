"use client"

import { useState, useEffect } from "react"
import { FiEdit, FiTrash2 } from "react-icons/fi"
import { useDispatch, useSelector } from "react-redux"
import { getAllPages, deletePage, changePageVisibility } from "../../store/pages/pageSlice"
import { Loader } from "lucide-react"
import AddPage from "./AddPage"
import EditPage from "./EditPage"

const Pages = () => {
  const dispatch = useDispatch()
  const { pages, isLoading, pagination } = useSelector((state) => state.pages)

  const [currentPage, setCurrentPage] = useState(1)
  const [statusFilter, setStatusFilter] = useState("active")
  const [searchQuery, setSearchQuery] = useState("")
  const [showAddPage, setShowAddPage] = useState(false)
  const [showEditPage, setShowEditPage] = useState(false)
  const [selectedPage, setSelectedPage] = useState(null)

  // Fetch pages on component mount and when filters change
  useEffect(() => {
    dispatch(getAllPages({
      status: statusFilter,
      search: searchQuery,
      page: currentPage,
      limit: 10
    }))
  }, [dispatch, statusFilter, searchQuery, currentPage])

  const handleDeletePage = async (id) => {
    if (window.confirm("Are you sure you want to delete this page?")) {
      await dispatch(deletePage(id))
    }
  }

  const handleVisibilityToggle = async (page) => {
    await dispatch(changePageVisibility({
      id: page._id,
      data: { visibility: !page.visibility }
    }))
  }

  const handleEditPage = (page) => {
    setSelectedPage(page)
    setShowEditPage(true)
  }

  // Generate pagination numbers
  const generatePaginationNumbers = () => {
    const totalPages = pagination.pages
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

  if (showAddPage) {
    return (
      <AddPage
        onBack={() => {
          setShowAddPage(false)
          window.history.pushState(null, "", `?tab=pages`)
        }}
        refreshData={() => dispatch(getAllPages({
          status: statusFilter,
          search: searchQuery,
          page: currentPage,
          limit: 10
        }))}
      />
    )
  }

  if (showEditPage && selectedPage) {
    return (
      <EditPage
        onBack={() => {
          setShowEditPage(false)
          setSelectedPage(null)
          window.history.pushState(null, "", `?tab=pages`)
        }}
        selectedPage={selectedPage}
        refreshData={() => dispatch(getAllPages({
          status: statusFilter,
          search: searchQuery,
          page: currentPage,
          limit: 10
        }))}
      />
    )
  }

  return (
    <div className="space-y-6">
      {/* Controls */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex gap-4 w-full md:w-auto">
          <select
            className="px-4 py-2 border rounded-lg text-gray-600"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="active">Active</option>
            <option value="deleted">Deleted</option>
          </select>
          <input
            type="text"
            placeholder="Search pages..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="px-4 py-2 border rounded-lg text-gray-600 w-full md:w-64"
          />
        </div>
        <button
          className="px-6 py-2 bg-primary text-white rounded-lg w-full md:w-auto"
          onClick={() => {
            setShowAddPage(true)
            window.history.pushState(null, "", `?tab=pages&add=1`)
          }}
        >
          Add New Page
        </button>
      </div>

      {/* Table */}
      {isLoading ? (
        <div className="flex justify-center items-center h-40">
          <Loader className="animate-spin h-8 w-8 text-primary" />
        </div>
      ) : (
        <>
          <div className="bg-white rounded-lg overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-4 px-6 text-sm font-medium">Title</th>
                  <th className="text-left py-4 px-6 text-sm font-medium">Visibility</th>
                  <th className="text-left py-4 px-6 text-sm font-medium">Created At</th>
                  <th className="text-left py-4 px-6 text-sm font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {pages.length > 0 ? (
                  pages.map((page) => (
                    <tr key={page._id} className="border-b">
                      <td className="py-4 px-6">{page.title}</td>
                      <td className="py-4 px-6">
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={page.visibility}
                            onChange={() => handleVisibilityToggle(page)}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-gray-500 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                        </label>
                      </td>
                      <td className="py-4 px-6">
                        {new Date(page.createdAt).toLocaleDateString()}
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-4">
                          <button
                            className="text-primary hover:text-primary-dark"
                            onClick={() => handleEditPage(page)}
                          >
                            <FiEdit size={18} />
                          </button>
                          <button
                            className="text-red-500 hover:text-red-700"
                            onClick={() => handleDeletePage(page._id)}
                          >
                            <FiTrash2 size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="py-4 px-6 text-center text-gray-500">
                      No pages found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {pagination.pages > 1 && (
            <div className="flex justify-center items-center gap-2">
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
                    currentPage === page ? "bg-primary text-white" : "text-gray-600"
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
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, pagination.pages))}
                disabled={currentPage === pagination.pages}
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          )}
        </>
      )}
    </div>
  )
}

export default Pages 