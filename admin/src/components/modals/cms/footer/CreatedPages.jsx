"use client"
import { FiEdit } from "react-icons/fi"

const CreatedPages = ({ setIsCreatedPagesOpen, footers, onEditPage }) => {
  // Collect all items from all footers
  const allItems = footers.reduce((acc, footer) => {
    if (footer.items && footer.items.length > 0) {
      const itemsWithFooterInfo = footer.items.map((item) => ({
        ...item,
        footerTitle: footer.title,
        footerId: footer._id,
      }))
      return [...acc, ...itemsWithFooterInfo]
    }
    return acc
  }, [])

  // Sort by creation date (newest first)
  const sortedItems = [...allItems].sort((a, b) => {
    const dateA = a.createdAt ? new Date(a.createdAt) : new Date(0)
    const dateB = b.createdAt ? new Date(b.createdAt) : new Date(0)
    return dateB - dateA
  })

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Created Pages</h2>
        <button onClick={() => setIsCreatedPagesOpen(false)} className="text-gray-400 hover:text-gray-600">
          ✕
        </button>
      </div>

      <div className="space-y-4 max-h-[60vh] overflow-y-auto">
        {sortedItems.length > 0 ? (
          sortedItems.map((item) => (
            <div key={item._id} className="p-4 border rounded-lg flex items-center justify-between">
              <div>
                <h3 className="font-medium">{item.title}</h3>
                <p className="text-sm text-gray-500">Section: {item.footerTitle}</p>
                <p className="text-xs text-gray-400">
                  Created: {item.createdAt ? new Date(item.createdAt).toLocaleDateString() : "N/A"}
                </p>
              </div>
              <button className="text-primary" onClick={() => onEditPage(item)}>
                <FiEdit size={18} />
              </button>
            </div>
          ))
        ) : (
          <div className="text-center text-gray-500 py-8">No pages found. Create a new page to get started.</div>
        )}
      </div>
    </div>
  )
}

export default CreatedPages
