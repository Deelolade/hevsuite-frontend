"use client"

import { Loader } from "lucide-react"

const DeleteMenuModal = ({ setIsDeleteModalOpen, handleDeleteMenu, isLoading }) => {
  return (
    <div className="p-6">
      <div className="flex items-center gap-4 mb-6">
        <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center">
          <span className="text-red-500 text-xl">⚠</span>
        </div>
        <h2 className="text-xl">Delete Menu</h2>
        <button onClick={() => setIsDeleteModalOpen(false)} className="text-gray-400 hover:text-gray-600 ml-auto">
          ✕
        </button>
      </div>

      <p className="text-gray-600 mb-8">
        Are you sure you want to delete this menu? This action cannot be undone and will remove all pages associated
        with this menu.
      </p>

      <div className="flex justify-end gap-3">
        <button
          onClick={() => setIsDeleteModalOpen(false)}
          className="px-6 py-2 border rounded-lg hover:bg-gray-50"
          disabled={isLoading}
        >
          Cancel
        </button>
        <button
          className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
          onClick={handleDeleteMenu}
          disabled={isLoading}
        >
          {isLoading ? (
            <span className="flex items-center">
              <Loader className="animate-spin h-4 w-4 mr-2" />
              Deleting...
            </span>
          ) : (
            "Delete"
          )}
        </button>
      </div>
    </div>
  )
}

export default DeleteMenuModal
