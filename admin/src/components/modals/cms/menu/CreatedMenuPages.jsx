"use client"
import { FiEdit } from "react-icons/fi"

const CreatedMenuPages = ({ setIsCreatedPagesOpen, menus, onEditPage }) => {
  // Collect all items from all menus
  const allItems = menus.reduce((acc, menu) => {
    if (menu.items && menu.items.length > 0) {
      const itemsWithMenuInfo = menu.items.map((item) => ({
        ...item,
        menuTitle: menu.title,
        menuId: menu._id,
      }))
      return [...acc, ...itemsWithMenuInfo]
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
                <p className="text-sm text-gray-500">Section: {item.menuTitle}</p>
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

export default CreatedMenuPages
