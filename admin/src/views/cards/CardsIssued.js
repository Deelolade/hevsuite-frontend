import React, { useState, useRef } from "react";
import Modal from "react-modal";
import { BiChevronDown, BiSearch } from "react-icons/bi";
import CancelCardModal from "../../components/modals/cards/CancelCardModal";
import IssueNewCardModal from "../../components/modals/cards/IssueNewCardModal";
import BulkCancelModal from "../../components/modals/cards/BulkCancelModal";
import { FiDownload } from "react-icons/fi";
import "../layout/forced.css"

Modal.setAppElement("#root");

const CardsIssued = () => {
  const [isExportMenuOpen, setIsExportMenuOpen] = useState(false);
  const exportMenuRef = useRef(null);

  const [isPostModalOpen, setIsPostModalOpen] = useState(false);
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
  const [receiverEmail, setReceiverEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [activeTab, setActiveTab] = useState("new");
  const [selectedCardId, setSelectedCardId] = useState(null);
  //   const [selectedCards, setSelectedCards] = useState([]);
  const [expandedAddresses, setExpandedAddresses] = useState([]);
  const [isIssueModalOpen, setIsIssueModalOpen] = useState(false);

  // Add this state near other state declarations
  const [selectedCards, setSelectedCards] = useState([]);
  const [isBulkCancelModalOpen, setIsBulkCancelModalOpen] = useState(false);
  const handleExport = (format) => {
    // Get selected cards or all cards if none selected
    const cardsToExport =
      selectedCards.length > 0
        ? cards.filter((card) => selectedCards.includes(card.id))
        : cards;

    // Format the data based on export type
    let exportData;
    let fileName;
    let fileType;

    switch (format) {
      case "pdf":
        // In a real app, you would use a library like jsPDF
        alert(`Exporting ${cardsToExport.length} cards as PDF`);
        // Example implementation would go here
        return;

      case "csv":
        // Create CSV content
        const headers = ["Name", "Member ID", "Status", "Address"];
        const csvContent = [
          headers.join(","),
          ...cardsToExport.map((card) =>
            [
              card.name,
              card.memberId,
              card.status,
              `${card.address.line1}, ${card.address.town}, ${card.address.country}, ${card.address.postcode}`,
            ].join(",")
          ),
        ].join("\n");

        exportData = csvContent;
        fileName = "member_cards.csv";
        fileType = "text/csv";
        break;

      case "excel":
        // For Excel, we'll use CSV format with an .xlsx extension
        // In a real app, you would use a library like xlsx
        const excelHeaders = [
          "Name",
          "Member ID",
          "Status",
          "Address Line 1",
          "Town",
          "Country",
          "Postcode",
        ];
        const excelContent = [
          excelHeaders.join(","),
          ...cardsToExport.map((card) =>
            [
              card.name,
              card.memberId,
              card.status,
              card.address.line1,
              card.address.town,
              card.address.country,
              card.address.postcode,
            ].join(",")
          ),
        ].join("\n");

        exportData = excelContent;
        fileName = "member_cards.xlsx";
        fileType =
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
        break;

      default:
        return;
    }

    // Create and download the file
    const blob = new Blob([exportData], { type: fileType });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    // Close the export menu
    setIsExportMenuOpen(false);
  };
  const toggleAddress = (cardId) => {
    setExpandedAddresses((prev) =>
      prev.includes(cardId)
        ? prev.filter((id) => id !== cardId)
        : [...prev, cardId]
    );
  };

  const handleIssueNewCard = (data) => {
    console.log("Issuing new card:", data);
    setIsIssueModalOpen(false);
  };

  const cards = [
    {
      id: 1,
      name: "Anna Ivanovic",
      memberId: "12345678",
      status: "Pending",
      address: {
        line1: "Andrew",
        town: "Andrew",
        country: "Andrew",
        postcode: "Andrew",
      },
    },
    {
      id: 2,
      name: "Anna Ivanovic",
      memberId: "12345678",
      status: "Not Activated",
      address: {
        line1: "Andrew",
        town: "Andrew",
        country: "Andrew",
        postcode: "Andrew",
      },
    },
    {
      id: 3,
      name: "Anna Ivanovic",
      memberId: "12345678",
      status: "Active",
      address: {
        line1: "Andrew",
        town: "Andrew",
        country: "Andrew",
        postcode: "Andrew",
      },
    },
    {
      id: 4,
      name: "Anna Ivanovic",
      memberId: "12345678",
      status: "Cancelled",
      address: {
        line1: "Andrew",
        town: "Andrew",
        country: "Andrew",
        postcode: "Andrew",
      },
    },
    // Add 8 more similar objects for the grid
  ];
  return (
    <div className="md:p-6 space-y-6">
      {/* Stats and Controls */}
      <div className="flex ">
        <div className="flex flex-col md:flex-row items-center gap-4 justify-between  md:w-full overflow-x-auto">
          <div className="flex flex-col md:flex-row md:items-center gap-4">
            <h2 className="text-3xl font-semibold">10,000</h2>
            <div className="flex flex-row gap-4 overflow-hidden">
              <select className="px-4 py-2 border rounded-lg text-gray-600 min-w-[120px]">
                <option>All</option>
                <option>Members</option>
                <option>VIP Members</option>
              </select>
              <select className="px-4 py-2 border rounded-lg text-gray-600 min-w-[120px]">
                <option>All</option>
                <option>Active</option>
                <option>Not Activated</option>
                <option>Cancelled</option>
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
              <BiChevronDown
                className={`transition-transform ${
                  isExportMenuOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {isExportMenuOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg z-10 py-2">
                <button
                  className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center gap-2"
                  onClick={() => handleExport("pdf")}
                >
                  <span className="text-red-500">
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
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
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
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
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
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
                setIsBulkCancelModalOpen(true);
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
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6 items-start">
        {/* <div className="grid grid-cols-1 gap-6 mt-6 items-start"> */}
        {cards.map((card) => (
          <div
            key={card.id}
            className="bg-white rounded-xl p-4 shadow-sm self-start relative"
          >
            <div className="absolute top-4 right-4 z-10">
              <input
                type="checkbox"
                checked={selectedCards.includes(card.id)}
                onChange={() => {
                  setSelectedCards((prev) =>
                    prev.includes(card.id)
                      ? prev.filter((id) => id !== card.id)
                      : [...prev, card.id]
                  );
                }}
                className="w-4 h-4 -z-10 rounded border-gray-300 text-primary focus:ring-primary"
              />
            </div>
            <div className="flex items-start gap-4">
              {/* QR Code on left */}
              <div className="bg-gray-100 p-2 rounded-lg shrink-0">
                <img
                  src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${card.id}`}
                  alt="QR Code"
                  className="w-24 h-24"
                />
              </div>

              {/* Card details on right */}
              <div className="flex-1">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-medium text-sm">{card.name}</h3>
                    <p className="text-xs text-gray-500">
                      Member/{card.memberId}
                    </p>
                  </div>
                  <button className="text-gray-400">
                    <svg
                      className="w-5 h-5"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
                    </svg>
                  </button>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Delivery Address</span>
                    <button
                      onClick={() => toggleAddress(card.id)}
                      className="text-gray-400"
                    >
                      <svg
                        className={`w-4 h-4 transform transition-transform ${
                          expandedAddresses.includes(card.id)
                            ? "rotate-180"
                            : ""
                        }`}
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </button>
                  </div>

                  {expandedAddresses.includes(card.id) && (
                    <div className="space-y-2 pt-2">
                      <div>
                        <label className="text-sm text-gray-600 font-primary block mb-1">
                          Address Line1<span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          value={card.address.line1}
                          className="w-full px-3 py-1.5 text-sm text-gray font-primary border  rounded-lg"
                          readOnly
                        />
                      </div>
                      <div>
                        <label className="text-sm  text-gray-600 font-primary block mb-1">
                          Town/City<span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          value={card.address.town}
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
                          value={card.address.country}
                          className="w-full px-3 py-1.5 text-sm border text-gray font-primary rounded-lg"
                          readOnly
                        />
                      </div>
                      <div>
                        <label className="text-sm text-gray-600 font-primary block mb-1">
                          Postcode/Zipcode
                        </label>
                        <input
                          type="text"
                          value={card.address.postcode}
                          className="w-full px-3 py-1.5 text-sm border text-gray font-primary rounded-lg"
                          readOnly
                        />
                      </div>
                    </div>
                  )}
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Status</span>
                    <span
                      className={`text-xs px-5 py-0.5 rounded-lg ${
                        card.status === "Cancelled"
                          ? "bg-tertiary text-white"
                          : card.status === "Active"
                          ? "bg-green-500 text-white"
                          : card.status === "Not Activated"
                          ? "bg-blue-500 text-white"
                          : "bg-gray-200 text-gray-600"
                      }`}
                    >
                      {card.status}
                    </span>
                  </div>
                </div>

                {card.status !== "Cancelled" && (
                  <button
                    className="w-full py-2 bg-red-500 text-white text-sm rounded-lg mt-4 hover:bg-red-600 transition-colors"
                    onClick={() => {
                      setSelectedCardId(card.id);
                      setIsCancelModalOpen(true);
                    }}
                  >
                    Cancel
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      <Modal
        isOpen={isCancelModalOpen}
        onRequestClose={() => setIsCancelModalOpen(false)}
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg w-[90vw] superZ md:w-[450px]"
        overlayClassName="fixed inset-0 superZ bg-black/50"
      >
        <CancelCardModal onClose={setIsCancelModalOpen} />
      </Modal>
      <Modal
        isOpen={isIssueModalOpen}
        onRequestClose={() => setIsIssueModalOpen(false)}
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg w-[90vw] superZ md:w-[450px]"
        overlayClassName="fixed inset-0 superZ bg-black/50"
      >
        <IssueNewCardModal
          onClose={setIsIssueModalOpen}
          onConfirm={handleIssueNewCard}
        />
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
        />
      </Modal>
    </div>
  );
};

export default CardsIssued;
