"use client"

import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getAllActivities } from "../../store/activities/activitySlice"
import ExportButton from "../ExportButton";
import { format } from "date-fns"
// import { Loader } from "lucide-react"
import LoadingSpinner from '../../components/Spinner';

const Activities = () => {
  const dispatch = useDispatch()
  const { activities, loading, totalPages, totalItems } = useSelector((state) => state.activities)
  const [searchTerm, setSearchTerm] = useState("")
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    dispatch(getAllActivities({
      page: currentPage,
      limit: itemsPerPage,
      search: searchTerm,
    }))
  }, [dispatch, currentPage, itemsPerPage, searchTerm])

  // Format activities for export
  const exportData = activities.map((activity) => ({
    Timestamp: format(new Date(activity.timestamp), "MMM d, yyyy - h:mma"),
    Admin: activity.adminName,
    Action: activity.action,
  }))

  if (loading && activities.length === 0) {
    return <LoadingSpinner />;
  }

  // Handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Generate pagination numbers dynamically
  const generatePaginationNumbers = () => {
    if (!totalPages) return [];

    const pages = [];
    const maxPagesToShow = 5; // Number of pages to display
    const sidePages = Math.floor((maxPagesToShow - 1) / 2);

    let startPage = Math.max(1, currentPage - sidePages);
    let endPage = Math.min(totalPages, currentPage + sidePages);

    if (endPage - startPage + 1 < maxPagesToShow) {
      if (startPage === 1) {
        endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);
      } else if (endPage === totalPages) {
        startPage = Math.max(1, totalPages - maxPagesToShow + 1);
      }
    }

    // Always show first page and add ellipsis if needed
    if (startPage > 1) {
      pages.push(1);
      if (startPage > 2) pages.push("...");
    }

    // Add pages in the calculated range
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    // Always show last page and add ellipsis if needed
    if (endPage < totalPages) {
      if (endPage < totalPages - 1) pages.push("...");
      pages.push(totalPages);
    }

    return pages;
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-medium">All Activities</h2>
        <div className="flex items-center gap-4">
          <input
            type="text"
            placeholder="Search activities..."
            className="px-4 py-2 border rounded-lg"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <ExportButton data={exportData} fileName="activities" />
        </div>
      </div>

      <div className="bg-white rounded-lg border">
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="text-left py-4 px-6 font-medium">Timestamp</th>
              <th className="text-left py-4 px-6 font-medium">Admin</th>
              <th className="text-left py-4 px-6 font-medium">Action</th>
            </tr>
          </thead>
          <tbody>
            {activities.length > 0 ? (
              activities.map((activity, index) => (
                <tr key={activity._id || index} className="border-b">
                  <td className="py-4 px-6 text-gray-600">
                    {format(new Date(activity.timestamp), "MMM d, yyyy - h:mma")}
                  </td>
                  <td className="py-4 px-6">{activity.adminName}</td>
                  <td className="py-4 px-6 italic">{activity.action}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={3} className="py-8 text-center text-gray-500">
                  {loading ? "Loading activities..." : "No activities found"}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && ( activities.length > 0 || currentPage > 1 ) && (
        <div className="flex justify-center items-center gap-4">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1 || loading}
            className="px-3 py-1 border rounded"
          >
            Previous
          </button>
          {generatePaginationNumbers().map((page, index) => (
            <button
              key={index}
              onClick={() => typeof page === 'number' && handlePageChange(page)}
              className={`px-3 py-1 border rounded ${
                currentPage === page ? 'bg-primary text-white' : ''
              }`}
              disabled={page === "..." || loading}
            >
              {page}
            </button>
          ))}
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages || loading}
            className="px-3 py-1 border rounded"
          >
            Next
          </button>
        </div>
      )}
    </div>
  )
}

export default Activities
