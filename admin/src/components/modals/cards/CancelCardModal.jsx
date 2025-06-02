"use client"

import { useState } from "react"
import { useDispatch } from "react-redux"
import { cancelCard } from "../../../store/cards/cardSlice"

const CancelCardModal = ({ onClose, selectedCard }) => {
  const [reason, setReason] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const dispatch = useDispatch()

  const handleConfirm = () => {
    if (!reason.trim()) {
      return
    }

    setIsSubmitting(true)

    dispatch(
      cancelCard({
        id: selectedCard._id,
        reason,
      }),
    )
      .then(() => {
        setIsSubmitting(false)
        onClose(false)
      })
      .catch(() => {
        setIsSubmitting(false)
      })
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Cancel Card</h2>
        <button onClick={() => onClose(false)} className="text-gray-400">
          ✕
        </button>
      </div>

      <div className="space-y-6">
        <p className="text-sm text-gray-600">
          Are you sure you want to cancel this card? This action is not reversible and is permanent.
        </p>

        <div>
          <label className="block text-sm mb-2">Reason</label>
          <input
            type="text"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            placeholder="What is the reason?"
            className="w-full px-3 py-2.5 border font-secondary italic rounded-lg text-sm"
            required
          />
        </div>

        <div className="flex justify-end gap-3 pt-4">
          <button
            onClick={() => onClose(false)}
            className="px-6 py-2 border rounded-lg text-sm"
            disabled={isSubmitting}
          >
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            className="px-6 py-2 bg-secondary text-white rounded-lg text-sm"
            disabled={!reason.trim() || isSubmitting}
          >
            {isSubmitting ? "Processing..." : "Confirm"}
          </button>
        </div>
      </div>
    </div>
  )
}

export default CancelCardModal
