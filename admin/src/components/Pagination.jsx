"use client"

const Pagination = ({ currentPage, totalPages, onPageChange, itemsPerPage, setItemsPerPage }) => {
  // Generate page numbers
  const getPageNumbers = () => {
    const pageNumbers = []

    if (totalPages <= 7) {
      // If total pages is 7 or less, show all pages
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i)
      }
    } else {
      // Always include first page
      pageNumbers.push(1)

      // Calculate start and end of middle pages
      let startPage = Math.max(2, currentPage - 1)
      let endPage = Math.min(totalPages - 1, currentPage + 1)

      // Adjust if we're near the beginning
      if (currentPage <= 3) {
        endPage = 4
      }

      // Adjust if we're near the end
      if (currentPage >= totalPages - 2) {
        startPage = totalPages - 3
      }

      // Add ellipsis after first page if needed
      if (startPage > 2) {
        pageNumbers.push("...")
      }

      // Add middle pages
      for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(i)
      }

      // Add ellipsis before last page if needed
      if (endPage < totalPages - 1) {
        pageNumbers.push("...")
      }

      // Always include last page
      pageNumbers.push(totalPages)
    }

    return pageNumbers
  }

  return (
    <div className="flex items-center justify-between">
      <div>
        Show result:
        <select
          className="ml-2 px-2 py-1 border rounded"
          value={itemsPerPage}
          onChange={(e) => {
            setItemsPerPage(Number(e.target.value))
            onPageChange(1) // Reset to first page when changing items per page
          }}
        >
          <option value={6}>6</option>
          <option value={10}>10</option>
          <option value={20}>20</option>
          <option value={50}>50</option>
        </select>
      </div>
      <div className="flex items-center gap-2">
        <button
          className={`p-1 ${currentPage === 1 ? "text-gray-300 cursor-not-allowed" : "text-gray-400 hover:text-gray-600"}`}
          onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        {getPageNumbers().map((page, index) => (
          <button
            key={index}
            className={`w-8 h-8 flex items-center justify-center rounded-lg ${
              currentPage === page
                ? "bg-green-800 text-white"
                : page === "..."
                  ? "text-gray-600 cursor-default"
                  : "text-gray-600 hover:bg-gray-100"
            }`}
            onClick={() => page !== "..." && onPageChange(page)}
            disabled={page === "..."}
          >
            {page}
          </button>
        ))}

        <button
          className={`p-1 ${currentPage === totalPages ? "text-gray-300 cursor-not-allowed" : "text-gray-400 hover:text-gray-600"}`}
          onClick={() => currentPage < totalPages && onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  )
}

export default Pagination
