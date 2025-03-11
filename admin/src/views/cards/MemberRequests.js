import React, { useState, useRef } from "react";
import Modal from "react-modal";
import { BiSearch, BiChevronDown } from "react-icons/bi";
import CancelCardModal from "../../components/modals/cards/CancelCardModal";
import IssueNewCardModal from "../../components/modals/cards/IssueNewCardModal";
import PostCard from "../../components/modals/cards/PostCard";
import BulkCancelModal from "../../components/modals/cards/BulkCancelModal";
import { FiDownload } from "react-icons/fi";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import "jspdf/dist/polyfills.es.js";
import autoTable from "jspdf-autotable";


Modal.setAppElement("#root");

const MemberRequests = () => {
  const [isPostModalOpen, setIsPostModalOpen] = useState(false);
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
  const [isBulkCancelModalOpen, setIsBulkCancelModalOpen] = useState(false);
  const [expandedAddresses, setExpandedAddresses] = useState([]);
  const [isIssueModalOpen, setIsIssueModalOpen] = useState(false);
  const [selectedCards, setSelectedCards] = useState([]);

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

  const handleSelectAll = () => {
    if (selectedCards.length === cards.length) {
      setSelectedCards([]); // Deselect all if all are selected
    } else {
      setSelectedCards(cards.map((card) => card.id)); // Select all
    }
  };

  const [isExportMenuOpen, setIsExportMenuOpen] = useState(false);
  const exportMenuRef = useRef(null);

  const handleExport = (format) => {
    const cardsToExport =
      selectedCards.length > 0
        ? cards.filter((card) => selectedCards.includes(card.id))
        : cards;

    if (cardsToExport.length === 0) return alert("No data to export");

    switch (format) {
      case "pdf": {
        const doc = new jsPDF();
        doc.text("Member Cards", 14, 10);

        const tableColumn = [
          "Name",
          "Member ID",
          "Status",
          "Address",
          "Town",
          "Country",
          "Postcode",
        ];
        const tableRows = cardsToExport.map((card) => [
          card.name,
          card.memberId,
          card.status,
          card.address.line1,
          card.address.town,
          card.address.country,
          card.address.postcode,
        ]);

        autoTable(doc, {
          head: [tableColumn],
          body: tableRows,
          startY: 20,
          headStyles: { fillColor: "#900C3F" },
        });

        doc.save("member_cards.pdf");
        break;
      }

      case "csv": {
        const headers = [
          "Name",
          "Member ID",
          "Status",
          "Address",
          "Town",
          "Country",
          "Postcode",
        ];
        const csvContent = [
          headers.join(","),
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

        const blob = new Blob([csvContent], { type: "text/csv" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = "member_cards.csv";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
        break;
      }

      case "excel": {
        const worksheet = XLSX.utils.json_to_sheet(
          cardsToExport.map((card) => ({
            Name: card.name,
            "Member ID": card.memberId,
            Status: card.status,
            "Address Line 1": card.address.line1,
            Town: card.address.town,
            Country: card.address.country,
            Postcode: card.address.postcode,
          }))
        );

        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Members");
        XLSX.writeFile(workbook, "member_cards.xlsx");
        break;
      }

      default:
        return;
    }

    setIsExportMenuOpen(false);
  };

  const handleClickOutside = (event) => {
    if (
      exportMenuRef.current &&
      !exportMenuRef.current.contains(event.target)
    ) {
      setIsExportMenuOpen(false);
    }
  };

  React.useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const cards = [
    {
      id: 1,
      name: "Anna Ivanovic",
      memberId: "12345678",
      status: "Pending",
      address: {
        line1: "Andrew",
        town: "My Town",
        country: "My Country",
        postcode: "#000060",
      },
    },
    {
      id: 2,
      name: "Anna Ivanovic",
      memberId: "12345678",
      status: "Cancelled",
      address: {
        line1: "Andrew",
        town: "My Town",
        country: "My Country",
        postcode: "#000060",
      },
    },
    {
      id: 3,
      name: "Anna Ivanovic",
      memberId: "12345678",
      status: "Pending",
      address: {
        line1: "Andrew",
        town: "My Town",
        country: "My Country",
        postcode: "#000060",
      },
    },
    {
      id: 4,
      name: "Anna Ivanovic",
      memberId: "12345678",
      status: "Cancelled",
      address: {
        line1: "Andrew",
        town: "My Town",
        country: "My Country",
        postcode: "#000060",
      },
    },
    {
      id: 4,
      name: "Anna Ivanovic",
      memberId: "12345678",
      status: "Cancelled",
      address: {
        line1: "Andrew",
        town: "My Town",
        country: "My Country",
        postcode: "#000060",
      },
    },
    {
      id: 4,
      name: "Anna Ivanovic",
      memberId: "12345678",
      status: "Cancelled",
      address: {
        line1: "Andrew",
        town: "My Town",
        country: "My Country",
        postcode: "#000060",
      },
    },
    {
      id: 4,
      name: "Anna Ivanovic",
      memberId: "12345678",
      status: "Cancelled",
      address: {
        line1: "Andrew",
        town: "My Town",
        country: "My Country",
        postcode: "#000060",
      },
    },
    {
      id: 4,
      name: "Anna Ivanovic",
      memberId: "12345678",
      status: "Cancelled",
      address: {
        line1: "Andrew",
        town: "My Town",
        country: "My Country",
        postcode: "#000060",
      },
    },
  ];
  const [vip, setVIP] = useState(false);
  const [Pending, setPending] = useState(false);
  return (
    <div className="md:p-6 space-y-6">
      {/* Stats and Controls */}
      <div className="flex  md:-mt-10">
        <div className="flex flex-col md:flex-row items-center gap-4 justify-between  md:w-full overflow-x-auto">
          <div className="flex flex-col md:flex-row md:items-center gap-4">
            <h2 className="text-3xl font-semibold">10,000</h2>
            <div className="flex flex-row gap-4 overflow-hidden">
              <select
                onChange={(e) =>
                  e.target.value === "VIP" ? setVIP(true) : setVIP(false)
                }
                className="px-4 py-2 border rounded-lg text-gray-600 md:min-w-[180px]"
              >
                <option value="All">All</option>
                <option value="Members">Members</option>
                <option value="VIP">VIP Members</option>
              </select>
              <select
                onChange={(e) =>
                  e.target.value === "Pending"
                    ? setPending(true)
                    : setPending(false)
                }
                className="px-4 py-2 border rounded-lg text-gray-600 md:min-w-[180px]"
              >
                <option value="All">All</option>
                <option value="Pending">Pending</option>
                <option value="Cancelled">Cancelled</option>
              </select>
              {Pending && (
                <select className="px-4 hidden md:inline-block py-2 border rounded-lg text-gray-600 md:min-w-[180px]">
                  <option value="All">New Registration</option>
                  <option value="Pending">Replacement</option>
                  <option value="Cancelled">Promoted</option>
                </select>
              )}
            </div>
          </div>
          {Pending && (
            <select className="px-4 self-start mr-0 ml-0 md:hidden py-2 border rounded-lg text-gray-600 md:min-w-[180px]">
              <option value="All">New Registration</option>
              <option value="Pending">Replacement</option>
              <option value="Cancelled">Promoted</option>
            </select>
          )}
          <div className="flex flex-row gap-4 justify-between md:justify-end  w-full overflow-hidden">
            <button
              className={`text-primary font-semibold ${
                selectedCards.length === cards.length ? "font-semibold" : ""
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
          {/* <button className="px-4 py-2 bg-primary text-white rounded-lg items-center gap-2">
            + Export {selectedCards.length > 0 ? selectedCards.length : ""}
          </button> */}
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
        <div className="grid mt-2 grid-cols-2 md:grid-cols-3 items-center gap-4">
          <button
            onClick={() => setIsPostModalOpen(true)}
            className="px-4 py-2 bg-[#00B707] text-white rounded-lg"
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
                setIsBulkCancelModalOpen(true);
              }
            }}
            className={`px-4 py-2 bg-primary text-white rounded-lg ${
              selectedCards.length === 0 ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={selectedCards.length === 0}
          >
            Bulk Cancel
          </button>
        </div>
      </div>

      {/* Cards Grid */}
      <div className="grid overflow-auto h-72 pb-10 grid-cols-1 md:grid-cols-3 gap-6 mt-6 items-start">
        {cards.map((card) => (
          <div
            key={card.id}
            className={`${
              vip ? "bg-[#FFB800]/70" : "bg-white"
            } h-full rounded-xl p-4 shadow-sm relative`}
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
                className="w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary"
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
                        <label className="text-sm text-gray-600 block mb-1">
                          Address Line1<span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          value={card.address.line1}
                          className="w-full px-3 py-1.5 text-sm border rounded-lg"
                          readOnly
                        />
                      </div>
                      <div>
                        <label className="text-sm text-gray-600 block mb-1">
                          Town/City<span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          value={card.address.town}
                          className="w-full px-3 py-1.5 text-sm border rounded-lg"
                          readOnly
                        />
                      </div>
                      <div>
                        <label className="text-sm text-gray-600 block mb-1">
                          Country<span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          value={card.address.country}
                          className="w-full px-3 py-1.5 text-sm border rounded-lg"
                          readOnly
                        />
                      </div>
                      <div>
                        <label className="text-sm text-gray-600 block mb-1">
                          Postcode/Zipcode
                        </label>
                        <input
                          type="text"
                          value={card.address.postcode}
                          className="w-full px-3 py-1.5 text-sm border rounded-lg"
                          readOnly
                        />
                      </div>
                    </div>
                  )}
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Status</span>
                    <span
                      className={`text-xs px-2 py-0.5 rounded ${
                        card.status === "Cancelled"
                          ? "bg-red-500 text-white"
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
        isOpen={isPostModalOpen}
        onRequestClose={() => setIsPostModalOpen(false)}
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg  w-[90vw] superZ md:w-[450px]"
        overlayClassName="fixed inset-0 superZ bg-black/50"
        style={{
          overlay: { zIndex: 1000 },
          content: { zIndex: 1001 },
        }}
      >
        <PostCard setIsPostModalOpen={setIsPostModalOpen} />
      </Modal>
      <Modal
        isOpen={isCancelModalOpen}
        onRequestClose={() => setIsCancelModalOpen(false)}
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg  w-[90vw] superZ md:w-[450px]"
        overlayClassName="fixed inset-0 superZ bg-black/50"
        style={{
          overlay: { zIndex: 1000 },
          content: { zIndex: 1001 },
        }}
      >
        <CancelCardModal onClose={setIsCancelModalOpen} />
      </Modal>
      <Modal
        isOpen={isIssueModalOpen}
        onRequestClose={() => setIsIssueModalOpen(false)}
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg  w-[90vw] superZ md:w-[450px]"
        overlayClassName="fixed inset-0 superZ bg-black/50"
        style={{
          overlay: { zIndex: 1000 },
          content: { zIndex: 1001 },
        }}
      >
        <IssueNewCardModal
          onClose={setIsIssueModalOpen}
          onConfirm={handleIssueNewCard}
        />
      </Modal>

      <Modal
        isOpen={isBulkCancelModalOpen}
        onRequestClose={() => setIsBulkCancelModalOpen(false)}
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-100 bg-white rounded-lg  w-[90vw] superZ md:w-[450px] z-100"
        overlayClassName="fixed inset-0 superZ bg-black/50 z-100"
        style={{
          overlay: { zIndex: 1000 },
          content: { zIndex: 1001 },
        }}
      >
        <BulkCancelModal
          onClose={setIsBulkCancelModalOpen}
          selectedCount={selectedCards.length}
        />
      </Modal>
    </div>
  );
};

export default MemberRequests;
