import React, { useState } from "react";
import Modal from "react-modal";
import { BiSearch } from "react-icons/bi";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import Profile from "../../components/Profile";
import CancelCardModal from "../../components/modals/cards/CancelCardModal";
// Add to imports
import IssueNewCardModal from "../../components/modals/cards/IssueNewCardModal";

// Set app element for accessibility
Modal.setAppElement("#root");

const CardsIssued = () => {
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
    <div className="p-6 space-y-6">
      {/* Stats and Controls */}
      <div className="flex ">
        <div className="flex items-center gap-4 justify-between w-full">
          <div className="flex items-center gap-4">
            <h2 className="text-3xl font-semibold">10,000</h2>
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
          <button className="px-4 py-2 bg-primary text-white rounded-lg flex items-center gap-2">
            + Export 1
          </button>
        </div>
      </div>

      <div className="flex">
        <div className="relative flex-1 mr-8">
          <BiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />
          <input
            type="text"
            placeholder="Search"
            className="w-full pl-10 pr-4 py-2.5 border rounded-lg"
          />
        </div>
        <div className="flex items-center gap-4">
          <button
            onClick={() => setIsIssueModalOpen(true)}
            className="px-4 py-2 border border-primary text-[#050002] rounded-lg mr-2"
          >
            Issue New Card
          </button>
          <button className="px-4 py-2 bg-[#FB0A0A] text-white rounded-lg">
            Bulk Cancel
          </button>
        </div>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-3 gap-6 mt-6 auto-rows-auto items-start">
        {cards.map((card) => (
          <div
            key={card.id}
            className="bg-white rounded-xl p-4 shadow-sm self-start"
          >
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
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg w-[450px]"
        overlayClassName="fixed inset-0 bg-black/50"
      >
        <CancelCardModal onClose={setIsCancelModalOpen} />
      </Modal>
      <Modal
        isOpen={isIssueModalOpen}
        onRequestClose={() => setIsIssueModalOpen(false)}
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg w-[450px]"
        overlayClassName="fixed inset-0 bg-black/50"
      >
        <IssueNewCardModal
          onClose={setIsIssueModalOpen}
          onConfirm={handleIssueNewCard}
        />
      </Modal>
    </div>
  );
};

export default CardsIssued;
