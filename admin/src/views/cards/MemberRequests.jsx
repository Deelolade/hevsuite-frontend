"use client"

import { useState, useRef, useEffect } from "react"
import Modal from "react-modal"
import { BiSearch, BiChevronDown } from "react-icons/bi"
import CancelCardModal from "../../components/modals/cards/CancelCardModal"
import IssueNewCardModal from "../../components/modals/cards/IssueNewCardModal"
import PostCard from "../../components/modals/cards/PostCard"
import BulkCancelModal from "../../components/modals/cards/BulkCancelModal"
import QRCodeModal from "../../components/modals/cards/QRCodeModal"
import ClubCardItem from "../../components/cards/ClubCardItem"
import { FiDownload } from "react-icons/fi"
import * as XLSX from "xlsx"
import jsPDF from "jspdf"
import autoTable from "jspdf-autotable"
import { useDispatch, useSelector } from "react-redux"
import { getNewMembers, postCards } from "../../store/cards/cardSlice"

Modal.setAppElement("#root")

const MemberRequests = () => {
  const dispatch = useDispatch()
  const { new_members, isLoading } = useSelector((state) => state.cards)

  const [isPostModalOpen, setIsPostModalOpen] = useState(false)
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false)
  const [isBulkCancelModalOpen, setIsBulkCancelModalOpen] = useState(false)
  const [isQRModalOpen, setIsQRModalOpen] = useState(false)
  const [isIssueModalOpen, setIsIssueModalOpen] = useState(false)
  const [selectedCards, setSelectedCards] = useState([])
  const [selectedCard, setSelectedCard] = useState(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [memberTypeFilter, setMemberTypeFilter] = useState("All")
  const [statusFilter, setStatusFilter] = useState("All")
  const [requestTypeFilter, setRequestTypeFilter] = useState("All")
  const [refreshTrigger, setRefreshTrigger] = useState(0);


  // Add this function to handle successful card issuance
  const handleCardIssued = () => {
    setRefreshTrigger(prev => prev + 1); // Increment to trigger refresh
    dispatch(getNewMembers({ // Explicitly refetch data
      search: searchTerm,
      status: statusFilter.toLowerCase(),
      filter: requestTypeFilter.toLowerCase(),
    }));
  };

  // Post selected cards and move them to 'Card Issued'
  const handlePostSelectedCards = async () => {
    if (selectedCards.length === 0) {
      alert("Please select at least one card to post.");
      return;
    }
    try {
      await dispatch(postCards({ cardIds: selectedCards })).unwrap();
      setSelectedCards([]);
      handleCardIssued();
    } catch (error) {
      alert(error?.message || "Failed to post cards.");
    }
  };

  useEffect(() => {
    dispatch(
      getNewMembers({
        search: searchTerm,
        status: statusFilter.toLowerCase(),
        filter: requestTypeFilter === "All" ? "all" : requestTypeFilter.toLowerCase(),
      }),
    )
  }, [dispatch, searchTerm, statusFilter, requestTypeFilter, refreshTrigger])

  const handleSelectAll = () => {
    if (selectedCards.length === filteredCards.length) {
      setSelectedCards([]) // Deselect all if all are selected
    } else {
      setSelectedCards(filteredCards.map((card) => card._id)) // Select all
    }
  }

  const handleSelectCard = (cardId) => {
    setSelectedCards((prev) => (prev.includes(cardId) ? prev.filter((id) => id !== cardId) : [...prev, cardId]))
  }

  const [isExportMenuOpen, setIsExportMenuOpen] = useState(false)
  const exportMenuRef = useRef(null)

  // Filter cards based on selected filters
  // Filter cards based on selected filters
  const filteredCards = new_members.filter((card) => {
  // Filter by member type
  if (memberTypeFilter === "VIP" && card.cardType !== "vip") {
    return false
  }
  if (memberTypeFilter === "Standard" && card.cardType !== "standard") {
    return false
  }

  // Filter by approval status
  if (card.approvedByAdmin) {
    return false
  }

  return true
  })

  const handleViewQR = (card) => {
    setSelectedCard(card)
    setIsQRModalOpen(true)
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
        doc.text("Member Cards", 14, 10)

        const tableColumn = ["Name", "Member ID", "Status", "Card Type", "Address", "Town", "Country", "Postcode"]
        const tableRows = cardsToExport.map((card) => [
          `${card.userId?.forename || ""} ${card.userId?.surname || ""}`,
          card._id.substring(0, 8),
          card.isBanned ? "Cancelled" : card.approvedByAdmin ? "Active" : "Pending",
          card.cardType,
          card.userId?.addressLine1 || "",
          card.userId?.town || "",
          card.userId?.country || "",
          card.userId?.postcode || "",
        ])

        autoTable(doc, {
          head: [tableColumn],
          body: tableRows,
          startY: 20,
          headStyles: { fillColor: "#900C3F" },
        })

        doc.save("member_cards.pdf")
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
              card.isBanned ? "Cancelled" : card.approvedByAdmin ? "Active" : "Pending",
              card.cardType,
              card.userId?.addressLine1 || "",
              card.userId?.town || "",
              card.userId?.country || "",
              card.userId?.postcode || "",
            ].join(","),
          ),
        ].join("\n")

        const blob = new Blob([csvContent], { type: "text/csv" })
        const url = URL.createObjectURL(blob)
        const link = document.createElement("a")
        link.href = url
        link.download = "member_cards.csv"
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
            Status: card.isBanned ? "Cancelled" : card.approvedByAdmin ? "Active" : "Pending",
            "Card Type": card.cardType,
            "Address Line 1": card?.addressLine1 || "",
            Town: card?.town || "",
            Country: card?.country || "",
            Postcode: card?.postcode || "",
          })),
        )

        const workbook = XLSX.utils.book_new()
        XLSX.utils.book_append_sheet(workbook, worksheet, "Members")
        XLSX.writeFile(workbook, "member_cards.xlsx")
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

  const handleSearch = (e) => {
    setSearchTerm(e.target.value)
  }

  return (
    <div className="md:p-6 space-y-6  max-h-[400px] overflow-y-auto">
      {/* Stats and Controls */}
      <div className="flex  ">
        <div className="flex flex-col md:flex-row items-center gap-4 justify-between md:w-full overflow-x-auto">
          <div className="flex flex-col md:flex-row md:items-center gap-4">
            <h2 className="text-3xl font-semibold">{filteredCards.length}</h2>
            <div className="flex flex-row gap-4 overflow-hidden">
              <select
                value={memberTypeFilter}
                onChange={(e) => setMemberTypeFilter(e.target.value)}
                className="px-4 py-2 border rounded-lg text-gray-600 md:min-w-[180px]"
              >
                <option value="All">All</option>
                <option value="Standard">Standard Members</option>
                <option value="VIP">VIP Members</option>
              </select>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-4 py-2 border rounded-lg text-gray-600 md:min-w-[180px]"
              >
                <option value="All">All</option>
                <option value="Pending">Pending</option>
                <option value="Cancelled">Cancelled</option>
              </select>
              {/* {statusFilter === "Pending" && ( */}
                <select
                  value={requestTypeFilter}
                  onChange={(e) => setRequestTypeFilter(e.target.value)}
                  className="px-4 hidden md:inline-block py-2 border rounded-lg text-gray-600 md:min-w-[180px]"
                >
                  <option value="All">All Types</option>
                  <option value="new-registration">New Registration</option>
                  <option value="replacement">Replacement</option>
                  <option value="promotion">Promoted</option>
                </select>
              {/* )} */}
            </div>
          </div>
          {statusFilter === "Pending" && (
            <select
              value={requestTypeFilter}
              onChange={(e) => setRequestTypeFilter(e.target.value)}
              className="px-4 self-start mr-0 ml-0 md:hidden py-2 border rounded-lg text-gray-600 md:min-w-[180px]"
            >
              <option value="All">All Types</option>
              <option value="new">New Registration</option>
              <option value="replacement">Replacement</option>
              <option value="promotion">Promoted</option>
            </select>
          )}
          <div className="flex flex-row gap-4 justify-between md:justify-end w-full overflow-hidden">
            <button
              className={`text-primary font-semibold ${selectedCards.length === filteredCards.length ? "font-semibold" : ""
                }`}
              onClick={handleSelectAll}
            >
              Select All
            </button>
            <div className="" ref={exportMenuRef}>
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
      </div>

      <div className="flex flex-col md:flex-row md:w-full overflow-auto">
        <div className="relative flex-1 mr-4 md:mt-2">
          <BiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />
          <input
            type="text"
            placeholder="Search"
            value={searchTerm}
            onChange={handleSearch}
            className="w-full pl-10 pr-4 py-2.5 border rounded-lg"
          />
        </div>
        <div className="grid mt-2 grid-cols-2 md:grid-cols-3 items-center gap-4">
          <button
            onClick={() => setIsPostModalOpen(true)}
            className="px-4 py-2 bg-[#00B707] text-white rounded-lg"
            disabled={selectedCards.length === 0}
          >
            Post Card
          </button>
          <button
            onClick={() => setIsIssueModalOpen(true)}
            className="text-nowrap px-0 md:px-4 py-2 border border-primary text-[#050002] rounded-lg"
          >
            Issue New Card
          </button>
          <button
            onClick={() => {
              if (selectedCards.length > 0) {
                setIsBulkCancelModalOpen(true)
              }
            }}
            className={`px-4 py-2 bg-primary text-white rounded-lg ${selectedCards.length === 0 ? "opacity-50 cursor-not-allowed" : ""
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
              <ClubCardItem
                key={card._id}
                card={card}
                onSelect={handleSelectCard}
                isSelected={selectedCards.includes(card._id)}
              />
            ))
          ) : (
            <div className="col-span-1 md:col-span-3 text-center py-10">
              <p className="text-gray-500">No cards found matching your criteria</p>
            </div>
          )}
        </div>
      )}

      <Modal
        isOpen={isPostModalOpen}
        onRequestClose={() => setIsPostModalOpen(false)}
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg w-[90vw] superZ md:w-[450px]"
        overlayClassName="fixed inset-0 superZ bg-black/50"
        style={{
          overlay: { zIndex: 1000 },
          content: { zIndex: 1001 },
        }}
      >
        <PostCard setIsPostModalOpen={setIsPostModalOpen} selectedCards={selectedCards} />
      </Modal>

      <Modal
        isOpen={isCancelModalOpen}
        onRequestClose={() => setIsCancelModalOpen(false)}
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg w-[90vw] superZ md:w-[450px]"
        overlayClassName="fixed inset-0 superZ bg-black/50"
        style={{
          overlay: { zIndex: 1000 },
          content: { zIndex: 1001 },
        }}
      >
        <CancelCardModal onClose={setIsCancelModalOpen} selectedCard={selectedCard} />
      </Modal>

      <Modal
        isOpen={isQRModalOpen}
        onRequestClose={() => setIsQRModalOpen(false)}
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg w-[90vw] superZ md:w-[450px]"
        overlayClassName="fixed inset-0 superZ bg-black/50"
        style={{
          overlay: { zIndex: 1000 },
          content: { zIndex: 1001 },
        }}
      >
        <QRCodeModal onClose={setIsQRModalOpen} selectedCard={selectedCard} />
      </Modal>

      <Modal
        isOpen={isIssueModalOpen}
        onRequestClose={() => setIsIssueModalOpen(false)}
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg w-[90vw] superZ md:w-[450px]"
        overlayClassName="fixed inset-0 superZ bg-black/50"
        style={{
          overlay: { zIndex: 1000 },
          content: { zIndex: 1001 },
        }}
      >
        <IssueNewCardModal
          onClose={() => setIsIssueModalOpen(false)}
          onCardIssued={handleCardIssued} // Pass the callback
        />
      </Modal>

      <Modal
        isOpen={isBulkCancelModalOpen}
        onRequestClose={() => setIsBulkCancelModalOpen(false)}
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-100 bg-white rounded-lg w-[90vw] superZ md:w-[450px] z-100"
        overlayClassName="fixed inset-0 superZ bg-black/50 z-100"
        style={{
          overlay: { zIndex: 1000 },
          content: { zIndex: 1001 },
        }}
      >
        <BulkCancelModal
          onClose={setIsBulkCancelModalOpen}
          selectedCount={selectedCards.length}
          selectedCards={selectedCards}
        />
      </Modal>
    </div>
  )
}

export default MemberRequests
