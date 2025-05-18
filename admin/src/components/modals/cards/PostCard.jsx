"use client"

import React, { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { toast } from "react-toastify"
import { postCards, reset } from "../../../store/cards/cardSlice"

const PostCard = ({ onClose, selectedCards }) => {
  const [receiverEmail, setReceiverEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const dispatch = useDispatch()
  const { isError, message } = useSelector((state) => state.cards)

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!receiverEmail) {
      toast.error("Please enter receiver's email")
      return
    }

    if (!selectedCards || selectedCards.length === 0) {
      toast.error("Please select at least one card")
      return
    }

    setIsLoading(true)

    try {
      await dispatch(postCards({ cardIds: selectedCards, receiverEmail })).unwrap()
      toast.success("Cards posted successfully")
      onClose()
    } catch (error) {
      toast.error(error || "Failed to post cards")
    } finally {
      setIsLoading(false)
      dispatch(reset())
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 max-w-md w-full">
        <h2 className="text-2xl font-bold mb-6">Post Selected Cards</h2>
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Receiver's Email
            </label>
            <input
              type="email"
              value={receiverEmail}
              onChange={(e) => setReceiverEmail(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Enter email address"
              required
            />
          </div>

          <div className="mb-6">
            <p className="text-sm text-gray-600">
              Selected Cards: {selectedCards.length}
            </p>
            <p className="text-sm text-gray-600 mt-2">
              A PDF containing card details will be sent to the specified email address.
            </p>
          </div>

          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              disabled={isLoading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              disabled={isLoading}
            >
              {isLoading ? "Posting..." : "Post Cards"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default PostCard
