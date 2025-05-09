"use client"

import { useState, useEffect } from "react"
import { FiSettings } from "react-icons/fi"
import Modal from "react-modal"
import BanAsk from "../../components/modals/ask/BanAsk"
import ReportDetails from "../../components/modals/ask/ReportDetails"
import ReportRemove from "../../components/modals/ask/ReportRemove"
import { useSelector, useDispatch } from "react-redux"
import { getAllReports } from "../../store/ask/askSlice"
import Pagination from "../../components/Pagination"

const Reports = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(6)
  const [openDetails, setOpenDetails] = useState(false)
  const [selectedReport, setSelectedReport] = useState(null)
  const [isBanModalOpen, setIsBanModalOpen] = useState(false)
  const [openSettingsId, setOpenSettingsId] = useState(null)
  const [isRemoveModalOpen, setIsRemoveModalOpen] = useState(false)

  const dispatch = useDispatch()
  // Fix: Access the correct state path
  const askState = useSelector((state) => state.ask)
  const { reports = [], isLoading = false } = askState || {}

  useEffect(() => {
    dispatch(getAllReports())
  }, [dispatch])

  const handleEdit = (report) => {
    setSelectedReport(report)
    setOpenDetails(true)
    setOpenSettingsId(null)
  }

  const handleRemove = (report) => {
    setSelectedReport(report)
    setIsRemoveModalOpen(true)
    setOpenSettingsId(null)
  }

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentItems = reports.slice(indexOfFirstItem, indexOfLastItem)
  const totalPages = Math.ceil(reports.length / itemsPerPage)

  return (
    <div className="space-y-6">
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
                <th className="text-left py-4 px-6">Type</th>
                <th className="text-left py-4 px-6">Reported By</th>
                <th className="text-left py-4 px-6">Date</th>
                <th className="text-left py-4 px-6">Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.length > 0 ? (
                currentItems.map((report) => (
                  <tr key={report._id} className="border-b">
                    <td className="py-4 px-6">
                      <input type="checkbox" className="rounded" />
                    </td>
                    <td className="py-4 px-6">{report.ask?.title || "N/A"}</td>
                    <td className="py-4 px-6 text-gray-600">{report.reason}</td>
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-2">
                        <img
                          src={report.reportedBy?.profilePhoto || "/placeholder-avatar.png"}
                          alt={`${report.reportedBy?.forename || ""} ${report.reportedBy?.surname || ""}`}
                          className="w-8 h-8 rounded-full object-cover"
                        />
                        <span>{`${report.reportedBy?.forename || ""} ${report.reportedBy?.surname || ""}`}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6">{new Date(report.reportedAt).toLocaleDateString()}</td>
                    <td className="py-4 px-6">
                      <button
                        className="p-1 hover:bg-gray-100 rounded"
                        onClick={() => {
                          setOpenSettingsId(openSettingsId === report._id ? null : report._id)
                        }}
                      >
                        <FiSettings size={20} />
                      </button>
                      {openSettingsId === report._id && (
                        <div className="absolute right-6 mt-2 w-32 bg-white rounded-lg shadow-lg border py-1 z-10">
                          <button
                            className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50"
                            onClick={() => handleEdit(report)}
                          >
                            Detail
                          </button>
                          <button
                            className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 text-red-500"
                            onClick={() => handleRemove(report)}
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
                  <td colSpan="6" className="py-4 px-6 text-center">
                    No reports found
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
        <ReportDetails
          setOpenDetails={setOpenDetails}
          setIsBanModalOpen={setIsBanModalOpen}
          selectedReport={selectedReport}
        />
      </Modal>

      <Modal
        isOpen={isBanModalOpen}
        onRequestClose={() => setIsBanModalOpen(false)}
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg md:w-[450px] w-[96vw]"
        overlayClassName="fixed inset-0 bg-black/50"
      >
        <BanAsk setIsBanModalOpen={setIsBanModalOpen} setOpenDetails={setOpenDetails} selectedReport={selectedReport} />
      </Modal>

      <Modal
        isOpen={isRemoveModalOpen}
        onRequestClose={() => setIsRemoveModalOpen(false)}
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg md:w-[450px] w-[96vw]"
        overlayClassName="fixed inset-0 bg-black/50"
      >
        <ReportRemove setIsRemoveModalOpen={setIsRemoveModalOpen} selectedReport={selectedReport} />
      </Modal>
    </div>
  )
}

export default Reports
