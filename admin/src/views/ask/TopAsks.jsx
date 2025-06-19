"use client"

import { useState, useEffect } from "react"
import Modal from "react-modal"
import PromoteAsk from "../../components/modals/ask/PromoteAsk"
import { useSelector, useDispatch } from "react-redux"
import { getTopAsks } from "../../store/ask/askSlice"
import Pagination from "../../components/Pagination"

const TopAsks = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(6)
  const [isPromoteModalOpen, setIsPromoteModalOpen] = useState(false)
  const [selectedUser, setSelectedUser] = useState(null)

  const dispatch = useDispatch()
  // Fix: Access the correct state path
  const askState = useSelector((state) => state.ask)
  const { top_asks: topAskers = [], isLoading = false } = askState || {}

  useEffect(() => {
    dispatch(getTopAsks())
  }, [dispatch])

  // Handle promote user
  const handlePromote = (asker) => {
    setSelectedUser(asker)
    setIsPromoteModalOpen(true)
  }

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentItems = topAskers.slice(indexOfFirstItem, indexOfLastItem)
  const totalPages = Math.ceil(topAskers.length / itemsPerPage)

  return (
    <div className="space-y-6">
      {/* Table */}
      <div className="bg-white rounded-lg w-[90vw] md:w-full overflow-auto">
        {isLoading ? (
          <div className="p-6 text-center">Loading...</div>
        ) : (
          <table className="w-full">
            <thead>
              <tr className="border-b text-[#7D7D7D]">
                <th className="w-12 py-4 px-6 text-left">Rank</th>
                <th className="text-center py-4 px-6">User</th>
                <th className="text-left py-4 px-6">Asks Claimed</th>
                <th className="text-left py-4 px-6">Asks Delivered</th>
                <th className="text-left py-4 px-6">Member Status</th>
                <th className="text-left py-4 px-6">Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.length > 0 ? (
                currentItems.map((asker, index) => (
                  <tr key={asker._id} className="border-b">
                    <td className="py-4 px-6">{indexOfFirstItem + index + 1}</td>
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-2 justify-center">
                        <img
                          src={asker.profilePhoto || "/placeholder-avatar.png"}
                          alt={`${asker.forename || ""} ${asker.surname || ""}`}
                          className="w-8 h-8 rounded-full object-cover"
                        />
                        <span className="font-primary">{`${asker.forename || ""} ${asker.surname || ""}`}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-gray-600">{asker.asksClaimed || 0}</td>
                    <td className="py-4 px-6 text-gray-600">{asker.asksDelivered || 0}</td>
                    <td className="py-4 px-6 text-gray-600">{asker.membershipType || "Standard Member"}</td>
                    <td className="py-4 px-6">
                      <button
                        className="px-4 py-2 bg-primary text-white rounded-lg"
                        onClick={() => handlePromote(asker)}
                      >
                        Promote
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="py-4 px-6 text-center">
                    No top askers found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>

      {/* Pagination */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        setCurrentPage={setCurrentPage}
        itemsPerPage={itemsPerPage}
        setItemsPerPage={setItemsPerPage}
      />

      <Modal
        isOpen={isPromoteModalOpen}
        onRequestClose={() => setIsPromoteModalOpen(false)}
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg md:w-[450px] w-[96vw]"
        overlayClassName="fixed inset-0 bg-black/50"
      >
        <PromoteAsk setIsPromoteModalOpen={setIsPromoteModalOpen} selectedUser={selectedUser} />
      </Modal>
    </div>
  )
}

export default TopAsks
