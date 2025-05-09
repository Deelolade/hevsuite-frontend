"use client"

import { useState, useEffect } from "react"
import { FiSettings } from "react-icons/fi"
import Modal from "react-modal"
import AllAskDetails from "../../components/modals/ask/AllAskDetails"
import AllAskRemove from "../../components/modals/ask/AllAskRemove"
import { useSelector, useDispatch } from "react-redux"
import { getAllAsks } from "../../store/ask/askSlice"
import Pagination from "../../components/Pagination"

const AllAsks = ({ searchTerm }) => {
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(6)
  const [openSettingsId, setOpenSettingsId] = useState(null)
  const [openDetails, setOpenDetails] = useState(false)
  const [selectedAsk, setSelectedAsk] = useState(null)
  const [isRemoveModalOpen, setIsRemoveModalOpen] = useState(false)
  const [filter, setFilter] = useState("all")

  const dispatch = useDispatch()
  // Fix: Access the correct state path
  const askState = useSelector((state) => state.ask)
  const { asks = [], isLoading = false } = askState || {}

  useEffect(() => {
    dispatch(getAllAsks({ filter, search: searchTerm }))
  }, [dispatch, filter, searchTerm])

  const handleEdit = (ask) => {
    setSelectedAsk(ask)
    setOpenDetails(true)
    setOpenSettingsId(null)
  }

  const handleRemove = (ask) => {
    setSelectedAsk(ask)
    setIsRemoveModalOpen(true)
    setOpenSettingsId(null)
  }

  const handleFilterChange = (e) => {
    setFilter(e.target.value)
    setCurrentPage(1)
  }

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentItems = asks.slice(indexOfFirstItem, indexOfLastItem)
  const totalPages = Math.ceil(asks.length / itemsPerPage)

  return (
    <div className="space-y-6">
      {/* Filter Dropdown */}
      <div className="flex justify-end">
        <select
          className="px-4 py-2 border rounded-lg text-gray-600 min-w-[200px]"
          value={filter}
          onChange={handleFilterChange}
        >
          <option value="all">All Asks</option>
          <option value="open">Open Asks</option>
          <option value="claimed">Claimed Asks</option>
          <option value="delivered">Delivered Asks</option>
        </select>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg w-[90vw] md:w-full overflow-auto">
        {isLoading ? (
          <div className="p-6 text-center">Loading...</div>
        ) : (
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="w-12 py-4 px-6 text-left">
                  <input type="checkbox" className="rounded" />
                </th>
                <th className="text-left py-4 px-6">Title</th>
                <th className="text-left py-4 px-6">User</th>
                {/* <th className="text-left py-4 px-6">Status</th> */}
                <th className="text-left py-4 px-6">Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.length > 0 ? (
                currentItems.map((ask) => (
                  <tr key={ask._id} className="border-b">
                    <td className="py-4 px-6">
                      <input type="checkbox" className="rounded" />
                    </td>
                    <td className="py-4 px-6">{ask.title}</td>
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-2">
                        <img
                          src={ask.createdBy?.profilePhoto || "/placeholder-avatar.png"}
                          alt={`${ask.createdBy?.forename || ""} ${ask.createdBy?.surname || ""}`}
                          className="w-8 h-8 rounded-full object-cover"
                        />
                        <span>{`${ask.createdBy?.forename || ""} ${ask.createdBy?.surname || ""}`}</span>
                      </div>
                    </td>
                    {/* <td className="py-4 px-6">
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${
                          ask.status === "open"
                            ? "bg-blue-100 text-blue-800"
                            : ask.status === "claimed"
                              ? "bg-yellow-100 text-yellow-800"
                              : ask.status === "delivered"
                                ? "bg-green-100 text-green-800"
                                : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {ask.status.charAt(0).toUpperCase() + ask.status.slice(1)}
                      </span>
                    </td> */}
                    <td className="py-4 px-6">
                      <button
                        className="p-1 hover:bg-gray-100 rounded"
                        onClick={() => {
                          setOpenSettingsId(openSettingsId === ask._id ? null : ask._id)
                        }}
                      >
                        <FiSettings size={20} />
                      </button>
                      {openSettingsId === ask._id && (
                        <div className="absolute right-6 mt-2 w-32 bg-white rounded-lg shadow-lg border py-1 z-10">
                          <button
                            className="w-full px-4 py-2 text-left font-primary font-medium text-sm hover:bg-gray-50"
                            onClick={() => handleEdit(ask)}
                          >
                            Detail
                          </button>
                          <button
                            className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 text-red-500"
                            onClick={() => handleRemove(ask)}
                          >
                            Remove
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="py-4 px-6 text-center">
                    No asks found
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
        isOpen={openDetails}
        onRequestClose={() => setOpenDetails(false)}
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg md:w-[450px] w-[96vw]"
        overlayClassName="fixed inset-0 bg-black/50"
      >
        <AllAskDetails setOpenDetails={setOpenDetails} selectedAsk={selectedAsk} />
      </Modal>
      <Modal
        isOpen={isRemoveModalOpen}
        onRequestClose={() => setIsRemoveModalOpen(false)}
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg md:w-[450px] w-[96vw]"
        overlayClassName="fixed inset-0 bg-black/50"
      >
        <AllAskRemove setIsRemoveModalOpen={setIsRemoveModalOpen} selectedAsk={selectedAsk} />
      </Modal>
    </div>
  )
}

export default AllAsks
