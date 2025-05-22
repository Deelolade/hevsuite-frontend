"use client"

import { useState } from "react"
import Modal from "react-modal"
import QRCodeModal from "../modals/cards/QRCodeModal"
import CancelCardModal from "../modals/cards/CancelCardModal"

const ClubCardItem = ({ card, onSelect, isSelected }) => {
  const [expandedAddress, setExpandedAddress] = useState(false)
  const [isQRModalOpen, setIsQRModalOpen] = useState(false)
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false)
  const [qrError, setQRError] = useState(null)

  const toggleAddress = () => {
    setExpandedAddress(!expandedAddress)
  }

  const handleViewQR = () => {
    if (!card.qrCode) {
      setQRError("No QR code available for this card")
      return
    }

    setQRError(null)
    setIsQRModalOpen(true)
  }

  const handleCancelCard = () => {
    setIsCancelModalOpen(true)
  }

  return (
    <div className={`${card.cardType === "vip" ? "bg-[#FFB800]/70" : "bg-white"} rounded-xl p-4 shadow-sm relative`}>
      {qrError && (
        <div className="absolute top-0 left-0 right-0 bg-red-100 text-red-700 p-2 text-xs text-center rounded-t-xl">
          {qrError}
        </div>
      )}

      <div className="absolute top-4 right-4 z-10">
        <input
          type="checkbox"
          checked={isSelected}
          onChange={() => onSelect(card._id)}
          className="w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary"
        />
      </div>

      <div className="flex items-start gap-4">
        {/* QR Code or placeholder */}
        <div className="bg-gray-100 p-2 rounded-lg shrink-0 cursor-pointer" onClick={handleViewQR}>
          {card.qrCode ? (
            <img src={card.qrCode || "/placeholder.svg"} alt="QR Code" className="w-24 h-24" />
          ) : (
            <div className="w-24 h-24 flex items-center justify-center">
              <svg className="w-12 h-12 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            </div>
          )}
        </div>

        {/* Card details */}
        <div className="flex-1">
          <div className="flex items-start justify-between mb-3">
            <div>
              <h3 className="font-medium text-sm">{`${card.userId?.forename || ""} ${card.userId?.surname || ""}`}</h3>
              <p className="text-xs text-gray-500">Member/ID#{card.userId?.membershipNumber || card.membershipNumber || "00000000"}</p>
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
              <button onClick={toggleAddress} className="text-gray-400">
                <svg
                  className={`w-4 h-4 transform transition-transform ${expandedAddress ? "rotate-180" : ""}`}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            </div>

            {expandedAddress && (
              <div className="space-y-2 pt-2">
                <div>
                  <label className="text-sm text-gray-600 block mb-1">
                    Address Line1<span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={card.userId?.addressLine1 || ""}
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
                    value={card.userId?.city || ""}
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
                    value={card.userId?.country || ""}
                    className="w-full px-3 py-1.5 text-sm border rounded-lg"
                    readOnly
                  />
                </div>
                <div>
                  <label className="text-sm text-gray-600 block mb-1">Postcode/Zipcode</label>
                  <input
                    type="text"
                    value={card.userId?.postcode || ""}
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
                  card.isBanned
                    ? "bg-red-500 text-white"
                    : card.approvedByAdmin
                      ? "bg-green-500 text-white"
                      : "bg-gray-200 text-gray-600"
                }`}
              >
                {card.isBanned ? "Cancelled" : card.approvedByAdmin ? "Active" : "Pending"}
              </span>
            </div>
          </div>

          <div className="flex gap-2 mt-4">
            {/* <button
              className="flex-1 py-2 bg-primary text-white text-sm rounded-lg hover:bg-primary/90 transition-colors"
              onClick={handleViewQR}
            >
              View QR
            </button> */}

            {!card.isBanned && (
              <button
                className="flex-1 py-2 bg-red-500 text-white text-sm rounded-lg hover:bg-red-600 transition-colors"
                onClick={handleCancelCard}
              >
                Cancel
              </button>
            )}
          </div>
        </div>
      </div>

      {/* QR Code Modal */}
      {/* <Modal
        isOpen={isQRModalOpen}
        onRequestClose={() => setIsQRModalOpen(false)}
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg w-[90vw] md:w-[450px]"
        overlayClassName="fixed inset-0 bg-black/50 z-50"
      >
        <QRCodeModal onClose={setIsQRModalOpen} selectedCard={card} />
      </Modal> */}

      {/* Cancel Card Modal */}
      <Modal
        isOpen={isCancelModalOpen}
        onRequestClose={() => setIsCancelModalOpen(false)}
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg w-[90vw] md:w-[450px]"
        overlayClassName="fixed inset-0 bg-black/50 z-50"
      >
        <CancelCardModal onClose={setIsCancelModalOpen} selectedCard={card} />
      </Modal>
    </div>
  )
}

export default ClubCardItem
