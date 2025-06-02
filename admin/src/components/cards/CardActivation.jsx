import React, { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { toast } from "react-toastify"
import { activateCard, logSuspiciousActivity } from "../../store/cards/cardSlice"
import { QrReader } from "react-qr-reader"

const CardActivation = () => {
  const [scanning, setScanning] = useState(false)
  const [cardData, setCardData] = useState(null)
  const [showLoginForm, setShowLoginForm] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const dispatch = useDispatch()
  const { isLoading } = useSelector((state) => state.cards)

  const handleScan = async (result) => {
    if (result) {
      try {
        const data = JSON.parse(result.text)
        setCardData(data)
        setScanning(false)
        setShowLoginForm(true)
      } catch (error) {
        toast.error("Invalid QR code")
      }
    }
  }

  const handleLogin = async (e) => {
    e.preventDefault()

    if (!email || !password) {
      toast.error("Please enter both email and password")
      return
    }

    try {
      // First verify the user's credentials
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      })

      if (!response.ok) {
        throw new Error("Invalid credentials")
      }

      const userData = await response.json()

      // Check if the card belongs to the user
      if (userData._id !== cardData.userId) {
        // Log suspicious activity
        await dispatch(
          logSuspiciousActivity({
            cardId: cardData._id,
            userId: userData._id,
            activityType: "unauthorized_activation_attempt",
            details: "User attempted to activate a card that doesn't belong to them",
          })
        ).unwrap()

        toast.error("This card does not belong to you")
        return
      }

      // Activate the card
      await dispatch(
        activateCard({
          cardId: cardData._id,
          userId: userData._id,
        })
      ).unwrap()

      toast.success("Card activated successfully")
      setShowLoginForm(false)
      setCardData(null)
    } catch (error) {
      toast.error(error.message || "Failed to activate card")
    }
  }

  return (
    <div className="max-w-md mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Activate Club Card</h2>

      {!scanning && !showLoginForm && (
        <button
          onClick={() => setScanning(true)}
          className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Scan QR Code
        </button>
      )}

      {scanning && (
        <div className="mb-4">
          <QrReader
            constraints={{ facingMode: "environment" }}
            onResult={handleScan}
            className="w-full"
          />
          <button
            onClick={() => setScanning(false)}
            className="mt-4 w-full bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Cancel Scanning
          </button>
        </div>
      )}

      {showLoginForm && (
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>

          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={() => {
                setShowLoginForm(false)
                setCardData(null)
              }}
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              disabled={isLoading}
            >
              {isLoading ? "Activating..." : "Activate Card"}
            </button>
          </div>
        </form>
      )}
    </div>
  )
}

export default CardActivation 