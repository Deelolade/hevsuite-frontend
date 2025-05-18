"use client"

import { useState } from "react"
import { saveAs } from "file-saver"
// import QRCode from "qrcode.react"
import { QRCodeCanvas } from "qrcode.react"
import { base_url } from "../../../constants/axiosConfig"

const QRCodeModal = ({ onClose, selectedCard }) => {
  const [isDownloading, setIsDownloading] = useState(false)
  const [error, setError] = useState(null)

  // Function to download QR code as PNG
  const handleDownloadQR = () => {
    try {
      setIsDownloading(true)
      setError(null)

      const canvas = document.getElementById("card-qr-code")
      if (!canvas) {
        throw new Error("QR code canvas not found")
      }

      canvas.toBlob((blob) => {
        if (!blob) {
          throw new Error("Failed to generate image")
        }

        const fileName = `club-card-${selectedCard._id.substring(0, 8)}.png`
        saveAs(blob, fileName)
        setIsDownloading(false)
      })
    } catch (error) {
      console.error("Error downloading QR code:", error)
      setError("Failed to download QR code")
      setIsDownloading(false)
    }
  }

  // Function to regenerate QR code
  const handleRegenerateQR = async () => {
    try {
      setIsDownloading(true)
      setError(null)

      const token = getAuthToken()
      const response = await fetch(`${base_url}/api/club-cards/admin/regenerate-qr/${selectedCard._id}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || "Failed to regenerate QR code")
      }

      // Refresh the page or update the state to show the new QR code
      window.location.reload()
    } catch (error) {
      console.error("Error regenerating QR code:", error)
      setError("Failed to regenerate QR code")
      setIsDownloading(false)
    }
  }

  // Helper function to get auth token
  const getAuthToken = () => {
    const adminData = localStorage.getItem("admin")
    const admin = adminData ? JSON.parse(adminData) : null
    return admin?.token || ""
  }

  // Parse QR code data if available
  const getQRData = () => {
    if (!selectedCard.qrCode) return null

    try {
      // Extract data from QR code if needed
      // This is a placeholder - in a real app, you might need to decode the QR code
      return {
        cardId: selectedCard._id,
        cardType: selectedCard.cardType,
        issuedDate: new Date(selectedCard.createdAt).toLocaleDateString(),
        expiryDate: selectedCard.expiryDate ? new Date(selectedCard.expiryDate).toLocaleDateString() : "N/A",
        status: selectedCard.isActive ? (selectedCard.isBanned ? "Cancelled" : "Active") : "Inactive",
        membershipNumber: selectedCard.membershipNumber,
      }
    } catch (error) {
      console.error("Error parsing QR data:", error)
      return null
    }
  }

  const qrData = getQRData()

  return (
    <div className="p-6 max-h-[500px] overflow-y-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Club Card QR Code</h2>
        <button onClick={() => onClose(false)} className="text-gray-400">
          ✕
        </button>
      </div>

      <div className="space-y-6">
        {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">{error}</div>}

        <div className="flex flex-col items-center justify-center">
          {selectedCard.qrCode ? (
            <>
              <div className="bg-white p-4 rounded-lg shadow-md">
                {/* <QRCodeCanvas
                  id="card-qr-code"
                  value={selectedCard.qrCode}
                  size={250}
                  level="H"
                  includeMargin={true}
                  renderAs="canvas"
                /> */}
                <img src={selectedCard.qrCode || "/placeholder.svg"} alt="QR Code" className="w-64 h-64" />
              </div>
              <p className="mt-4 text-center text-sm text-gray-500">Scan this QR code to verify the club card</p>
            </>
          ) : (
            <div className="bg-gray-100 p-8 rounded-lg flex items-center justify-center">
              <p className="text-gray-500">No QR code available for this card</p>
            </div>
          )}
        </div>

        {qrData && (
          <div className="mt-4 bg-gray-50 p-4 rounded-lg">
            <h3 className="font-medium mb-2">Card Information</h3>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div className="text-gray-500">Card ID:</div>
              <div>ID#{qrData.membershipNumber || "00000000"}</div>
              <div className="text-gray-500">Card Type:</div>
              <div className="capitalize">{qrData.cardType}</div>
              <div className="text-gray-500">Issued Date:</div>
              <div>{qrData.issuedDate}</div>
              <div className="text-gray-500">Expiry Date:</div>
              <div>{qrData.expiryDate}</div>
              <div className="text-gray-500">Status:</div>
              <div>{qrData.status}</div>
            </div>
          </div>
        )}

        <div className="flex justify-end gap-3 pt-4">
          <button onClick={handleRegenerateQR} className="px-6 py-2 border rounded-lg text-sm" disabled={isDownloading}>
            {isDownloading ? "Processing..." : "Regenerate QR"}
          </button>
          <button
            onClick={handleDownloadQR}
            className="px-6 py-2 bg-primary text-white rounded-lg text-sm"
            disabled={!selectedCard.qrCode || isDownloading}
          >
            {isDownloading ? "Processing..." : "Download QR"}
          </button>
        </div>
      </div>
    </div>
  )
}

export default QRCodeModal
