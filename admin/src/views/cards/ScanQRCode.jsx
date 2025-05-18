"use client"

import { useState } from "react"
import QRCodeScanner from "../../components/QRCodeScanner"
import Profile from "../../components/Profile"
import { base_url } from "../../../constants/axiosConfig"

const ScanQRCode = () => {
  const [scanResult, setScanResult] = useState(null)
  const [cardDetails, setCardDetails] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleScanComplete = async (result) => {
    try {
      setLoading(true)
      setError(null)
      setScanResult(result)

      if (result.data && result.data.cardId) {
        // Fetch card details from API
        const response = await fetch(`${base_url}/api/club-cards/card-status/${result.data.cardId}`)

        if (!response.ok) {
          throw new Error("Failed to fetch card details")
        }

        const data = await response.json()
        setCardDetails(data)
      }
    } catch (error) {
      console.error("Error processing scan result:", error)
      setError(error.message || "Failed to process scan result")
    } finally {
      setLoading(false)
    }
  }

  const handleReset = () => {
    setScanResult(null)
    setCardDetails(null)
    setError(null)
  }

  return (
    <div className="md:p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">QR Code Scanner</h1>
        <Profile />
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        {!scanResult ? (
          <>
            <p className="text-center text-gray-600 mb-6">
              Scan a club card QR code to verify its authenticity and view details
            </p>
            <QRCodeScanner onScanComplete={handleScanComplete} />
          </>
        ) : (
          <div className="space-y-6">
            {loading ? (
              <div className="flex justify-center items-center h-40">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
              </div>
            ) : error ? (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">{error}</div>
            ) : (
              <>
                <div className="flex items-center justify-center">
                  <div
                    className={`text-white text-lg font-medium px-4 py-2 rounded-full ${scanResult.isValid ? "bg-green-500" : "bg-red-500"}`}
                  >
                    {scanResult.isValid ? "Valid Card" : "Invalid Card"}
                  </div>
                </div>

                {cardDetails && (
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="font-medium mb-4">Card Information</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-gray-500">Card ID:</div>
                      <div>ID#{scanResult.data.membershipNumber || "00000000"}</div>

                      <div className="text-gray-500">Card Type:</div>
                      <div className="capitalize">{cardDetails.cardType || scanResult.data.cardType}</div>

                      <div className="text-gray-500">Status:</div>
                      <div
                        className={`${cardDetails.isActive && !cardDetails.isBanned ? "text-green-600" : "text-red-600"}`}
                      >
                        {cardDetails.isActive && !cardDetails.isBanned ? "Active" : "Inactive"}
                      </div>

                      <div className="text-gray-500">Expiry Date:</div>
                      <div>
                        {cardDetails.expiryDate ? new Date(cardDetails.expiryDate).toLocaleDateString() : "N/A"}
                      </div>

                      <div className="text-gray-500">Scan Time:</div>
                      <div>{new Date(scanResult.timestamp).toLocaleString()}</div>
                    </div>
                  </div>
                )}
              </>
            )}

            <div className="flex justify-center">
              <button onClick={handleReset} className="px-6 py-2 bg-primary text-white rounded-lg">
                Scan Another Code
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default ScanQRCode
