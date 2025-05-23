"use client"

import { useState, useRef, useEffect } from "react"
import Modal from "react-modal"
import { BiChevronDown, BiSearch } from "react-icons/bi"
import CancelCardModal from "../../components/modals/cards/CancelCardModal"
import IssueNewCardModal from "../../components/modals/cards/IssueNewCardModal"
import BulkCancelModal from "../../components/modals/cards/BulkCancelModal"
import { FiDownload } from "react-icons/fi"
import "../layout/forced.css"
import * as XLSX from "xlsx"
import jsPDF from "jspdf"
import autoTable from "jspdf-autotable"
import { useDispatch, useSelector } from "react-redux"
import { getNewMembers } from "../../store/cards/cardSlice"

Modal.setAppElement("#root")

const CardsIssued = () => {
  const dispatch = useDispatch()
  const { new_members, isLoading } = useSelector((state) => state.cards)

  const [isExportMenuOpen, setIsExportMenuOpen] = useState(false)
  const exportMenuRef = useRef(null)

  const [isPostModalOpen, setIsPostModalOpen] = useState(false)
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false)
  const [expandedAddresses, setExpandedAddresses] = useState([])
  const [isIssueModalOpen, setIsIssueModalOpen] = useState(false)
  const [selectedCards, setSelectedCards] = useState([])
  const [selectedCard, setSelectedCard] = useState(null)
  const [isBulkCancelModalOpen, setIsBulkCancelModalOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [cardTypeFilter, setCardTypeFilter] = useState("All")
  const [statusFilter, setStatusFilter] = useState("All")

  useEffect(() => {
    // For CardsIssued, we only want to show approved cards
    dispatch(
      getNewMembers({
        search: searchTerm,
        status: "all", // We'll filter locally
        filter: "all",
      }),
    )
  }, [dispatch, searchTerm])

  // Filter to only show approved cards
  const issuedCards = new_members

  // Apply additional filters
  const filteredCards = issuedCards.filter((card) => {
    // Filter by card type
    if (cardTypeFilter !== "All" && card.cardType !== cardTypeFilter) {
      return false
    }

    // Filter by status
    if (statusFilter === "Active" && card.isBanned) {
      return false
    }
    if (statusFilter === "Not Activated" && !card.isBanned) {
      return false
    }
    if (statusFilter === "Cancelled" && !card.isBanned) {
      return false
    }

    // Filter by approval status
    if (!card.approvedByAdmin) {
      return false
    }

    // Search by name or ID
    if (
      searchTerm &&
      !card.userId?.forename?.toLowerCase().includes(searchTerm.toLowerCase()) &&
      !card.userId?.surname?.toLowerCase().includes(searchTerm.toLowerCase()) &&
      !card._id.includes(searchTerm)
    ) {
      return false
    }

    return true
  })

  const toggleAddress = (cardId) => {
    setExpandedAddresses((prev) => (prev.includes(cardId) ? prev.filter((id) => id !== cardId) : [...prev, cardId]))
    console.log(expandedAddresses)
  }


  const handleIssueNewCard = (data) => {
    console.log("Issuing new card:", data)
    setIsIssueModalOpen(false)
  }

  const handleCancelCard = (card) => {
    setSelectedCard(card)
    setIsCancelModalOpen(true)
  }

  const handleExport = (format) => {
    const cardsToExport =
      selectedCards.length > 0 ? filteredCards.filter((card) => selectedCards.includes(card._id)) : filteredCards

    if (cardsToExport.length === 0) return alert("No data to export")

    switch (format) {
      case "pdf": {
        const doc = new jsPDF()
        doc.text("Issued Cards", 14, 10)

        const tableColumn = ["Name", "Member ID", "Status", "Card Type", "Address", "Town", "Country", "Postcode"]
        const tableRows = cardsToExport.map((card) => [
          `${card.userId?.forename || ""} ${card.userId?.surname || ""}`,
          card._id.substring(0, 8),
          card.isBanned ? "Cancelled" : "Active",
          card.cardType,
          card.deliveryAddress?.line1 || "",
          card.deliveryAddress?.town || "",
          card.deliveryAddress?.country || "",
          card.deliveryAddress?.postcode || "",
          console.log(card)
        ])

        autoTable(doc, {
          head: [tableColumn],
          body: tableRows,
          startY: 20,
          headStyles: { fillColor: "#900C3F" },
        })

        doc.save("issued_cards.pdf")
        break
      }

      case "csv": {
        const headers = ["Name", "Member ID", "Status", "Card Type", "Address", "Town", "Country", "Postcode"]
        const csvContent = [
          headers.join(","),
          ...cardsToExport.map((card) =>
            [
              `${card.userId?.forename || ""} ${card.userId?.surname || ""}`,
              card._id.substring(0, 8),
              card.isBanned ? "Cancelled" : "Active",
              card.cardType,
              card.deliveryAddress?.line1 || "",
              card.deliveryAddress?.town || "",
              card.deliveryAddress?.country || "",
              card.deliveryAddress?.postcode || "",
              console.log(card)
            ].join(","),
          ),
        ].join("\n")

        const blob = new Blob([csvContent], { type: "text/csv" })
        const url = URL.createObjectURL(blob)
        const link = document.createElement("a")
        link.href = url
        link.download = "issued_cards.csv"
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
        URL.revokeObjectURL(url)
        break
      }

      case "excel": {
        const worksheet = XLSX.utils.json_to_sheet(
          cardsToExport.map((card) => ({
            Name: `${card.userId?.forename || ""} ${card.userId?.surname || ""}`,
            "Member ID": card._id.substring(0, 8),
            Status: card.isBanned ? "Cancelled" : "Active",
            "Card Type": card.cardType,
            "Address Line 1": card.deliveryAddress?.line1 || "",
            Town: card.deliveryAddress?.town || "",
            Country: card.deliveryAddress?.country || "",
            Postcode: card.deliveryAddress?.postcode || "",
          })),
        )

        const workbook = XLSX.utils.book_new()
        XLSX.utils.book_append_sheet(workbook, worksheet, "Issued Cards")
        XLSX.writeFile(workbook, "issued_cards.xlsx")
        break
      }

      default:
        return
    }

    setIsExportMenuOpen(false)
  }

  const handleClickOutside = (event) => {
    if (exportMenuRef.current && !exportMenuRef.current.contains(event.target)) {
      setIsExportMenuOpen(false)
    }
  }

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  return (
    <div className="md:p-6 space-y-6  max-h-[400px] overflow-y-auto">
      {/* Stats and Controls */}
      <div className="flex  ">
        <div className="flex flex-col md:flex-row items-center gap-4 justify-between md:w-full overflow-x-auto">
          <div className="flex flex-col md:flex-row md:items-center gap-4">
            <h2 className="text-3xl font-semibold">{filteredCards.length}</h2>
            <div className="flex flex-row gap-4 overflow-hidden">
              <select
                value={cardTypeFilter}
                onChange={(e) => setCardTypeFilter(e.target.value)}
                className="px-4 py-2 border rounded-lg text-gray-600 min-w-[120px]"
              >
                <option value="All">All</option>
                <option value="Standard">Standard Members</option>
                <option value="VIP">VIP Members</option>
              </select>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-4 py-2 border rounded-lg text-gray-600 min-w-[120px]"
              >
                <option value="All">All</option>
                <option value="Active">Active</option>
                <option value="Not Activated">Not Activated</option>
                <option value="Cancelled">Cancelled</option>
              </select>
            </div>
          </div>
          <div className="flex justify-end w-full" ref={exportMenuRef}>
            <button
              className="px-4 py-2 bg-primary text-white rounded-lg flex items-center gap-2"
              onClick={() => setIsExportMenuOpen(!isExportMenuOpen)}
            >
              <FiDownload />
              Export {selectedCards.length > 0 ? selectedCards.length : ""}
              <BiChevronDown className={`transition-transform ${isExportMenuOpen ? "rotate-180" : ""}`} />
            </button>

            {isExportMenuOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg z-10 py-2">
                <button
                  className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center gap-2"
                  onClick={() => handleExport("pdf")}
                >
                  <span className="text-red-500">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9 2a2 2 0 00-2 2v8a2 2 0 002 2h6a2 2 0 002-2V6.414A2 2 0 0016.414 5L14 2.586A2 2 0 0012.586 2H9z" />
                      <path d="M3 8a2 2 0 012-2h2a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V8z" />
                    </svg>
                  </span>
                  Export as PDF
                </button>
                <button
                  className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center gap-2"
                  onClick={() => handleExport("csv")}
                >
                  <span className="text-green-500">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </span>
                  Export as CSV
                </button>
                <button
                  className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center gap-2"
                  onClick={() => handleExport("excel")}
                >
                  <span className="text-blue-500">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </span>
                  Export as Excel
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row md:w-full overflow-auto">
        <div className="relative flex-1 mr-4 md:mt-2">
          <BiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />
          <input
            type="text"
            placeholder="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 border rounded-lg"
          />
        </div>
        <div className="grid mt-2 grid-cols-2 md:grid-cols-2 items-center gap-4">
          <button
            onClick={() => setIsIssueModalOpen(true)}
            className="md:px-4 text-nowrap py-2 border border-primary text-[#050002] rounded-lg mr-2"
          >
            Issue New Card
          </button>
          <button
            onClick={() => {
              if (selectedCards.length > 0) {
                setIsBulkCancelModalOpen(true)
              }
            }}
            className={`px-4 py-2 bg-[#FB0A0A] text-white rounded-lg ${
              selectedCards.length === 0 ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={selectedCards.length === 0}
          >
            Bulk Cancel
          </button>
        </div>
      </div>

      {/* Cards Grid */}
      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6 items-start">
          {filteredCards.length > 0 ? (
            filteredCards.map((card) => (
              <div key={card._id} className={`${card.cardType === "vip" ? "bg-[#FFB800]/70" : "bg-white"} rounded-xl p-2 shadow-sm relative`}>
                <div className="absolute top-4 right-4 z-10">
                  <input
                    type="checkbox"
                    checked={selectedCards.includes(card._id)}
                    onChange={() => {
                      setSelectedCards((prev) =>
                        prev.includes(card._id) ? prev.filter((id) => id !== card._id) : [...prev, card._id],
                      )
                    }}
                    className="w-4 h-4 -z-10 rounded border-gray-300 text-primary focus:ring-primary"
                  />
                </div>
                <div className="flex items-start gap-4">
                  {/* QR Code on left */}
                  <div className="bg-gray-100 p-2 rounded-lg shrink-0">
                    <img
                      src={card.qrCode || `http://localhost:5000/api/club-cards/qr-code/61d0fe4f5311236168a109de`}
                      alt="QR Code"
                      className="w-24 h-24"
                    />
                  </div>

                  {/* Card details on right */}
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="font-medium text-sm">{`${card.userId?.forename || ""} ${card.userId?.surname || ""}`}</h3>
                        <p className="text-xs text-gray-500">Member/{card.userId?.membershipNumber || card.membershipNumber || card._id.substring(0, 8)}</p>
                      </div>
                      <button className="text-gray-400">
                        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
                        </svg>
                      </button>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Delivery Address</span>
                        <button onClick={() => toggleAddress(card._id)} className="text-gray-400">
                          <svg
                            className={`w-4 h-4 transform transition-transform ${
                              expandedAddresses.includes(card._id) ? "rotate-180" : ""
                            }`}
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                          </svg>
                        </button>
                      </div>

                      {expandedAddresses.includes(card._id) && (
                        <div className="space-y-2 pt-2">
                          <div>

                          {/* Debug: {JSON.stringify(card.addressLine1 || 'No address data')} */}
                            <label className="text-sm text-gray-600 font-primary block mb-1">
                              Address Line1<span className="text-red-500">*</span>
                            </label>
                            <input
                              type="text"
                              value={card.userId?.addressLine1 || card.addressLine1 || ""}
                              className="w-full px-3 py-1.5 text-sm text-gray font-primary border rounded-lg"
                              readOnly
                            />
                          </div>
                          <div>
                            <label className="text-sm text-gray-600 font-primary block mb-1">
                              Town/City<span className="text-red-500">*</span>
                            </label>
                            <input
                              type="text"
                              value={card.userId?.city || card.city || ""}
                              className="w-full px-3 py-1.5 text-sm border text-gray font-primary rounded-lg"
                              readOnly
                            />
                          </div>
                          <div>
                            <label className="text-sm text-gray-600 font-primary block mb-1">
                              Country<span className="text-red-500">*</span>
                            </label>
                            <input
                              type="text"
                              value={card.userId?.country || card.country || ""}
                              className="w-full px-3 py-1.5 text-sm border text-gray font-primary rounded-lg"
                              readOnly
                            />
                          </div>
                          <div>
                            <label className="text-sm text-gray-600 font-primary block mb-1">Postcode/Zipcode</label>
                            <input
                              type="text"
                              value={card.userId?.postcode || card.postcode || ""}
                              className="w-full px-3 py-1.5 text-sm border text-gray font-primary rounded-lg"
                              readOnly
                            />
                          </div>
                        </div>
                      )}
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Status</span>
                        <span
                          className={`text-xs px-3 py-0.5 rounded-lg ${
                            card.isBanned
                              ? "bg-tertiary text-white"
                              : card.approvedByAdmin
                                ? "bg-blue-500 text-white"
                                : card.status === "Not Activated"
                                  ? "bg-blue-500 text-white"
                                  : "bg-gray-200 text-gray-600"
                          }`}
                        >
                          {card.isBanned ? "Cancelled" : card.approvedByAdmin && card.isActive ? "Active" : card.approvedByAdmin ? "Not Activated" : "Pending"}
                        </span>
                      </div>
                    </div>

                    {!card.isBanned && (
                      <button
                        className="w-full py-2 bg-red-500 text-white text-sm rounded-lg mt-4 hover:bg-red-600 transition-colors"
                        onClick={() => handleCancelCard(card)}
                      >
                        Cancel
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-1 md:col-span-3 text-center py-10">
              <p className="text-gray-500">No cards found matching your criteria</p>
            </div>
          )}
        </div>
      )}

      <Modal
        isOpen={isCancelModalOpen}
        onRequestClose={() => setIsCancelModalOpen(false)}
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg w-[90vw] superZ md:w-[450px]"
        overlayClassName="fixed inset-0 superZ bg-black/50"
      >
        <CancelCardModal onClose={setIsCancelModalOpen} selectedCard={selectedCard} />
      </Modal>

      <Modal
        isOpen={isIssueModalOpen}
        onRequestClose={() => setIsIssueModalOpen(false)}
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg w-[90vw] superZ md:w-[450px]"
        overlayClassName="fixed inset-0 superZ bg-black/50"
      >
        <IssueNewCardModal onClose={setIsIssueModalOpen} />
      </Modal>

      <Modal
        isOpen={isBulkCancelModalOpen}
        onRequestClose={() => setIsBulkCancelModalOpen(false)}
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg w-[90vw] superZ md:w-[450px] z-100"
        overlayClassName="fixed inset-0 superZ bg-black/50"
      >
        <BulkCancelModal
          onClose={setIsBulkCancelModalOpen}
          selectedCount={selectedCards.length}
          onConfirm={handleConfirmBulkCancel}
          selectedCards={selectedCards}
        />
      </Modal>
    </div>
  )
}

export default CardsIssued

const handleConfirmBulkCancel = () => {
  console.log("Bulk cancel confirmed for selected cards:", selectedCards);
  // Add logic for bulk cancellation here
  setIsBulkCancelModalOpen(false);
}
