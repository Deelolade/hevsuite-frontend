"use client"

import { useState } from "react"
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"
import { useDispatch } from "react-redux"
import { postCards } from "../../../store/cards/cardSlice"

const PostCard = ({ setIsPostModalOpen, selectedCards }) => {
  const [receiverEmail, setReceiverEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const dispatch = useDispatch()

  const handleSend = () => {
    if (!receiverEmail || !password || selectedCards.length === 0) {
      return
    }

    setIsSubmitting(true)

    // In a real app, you would verify the password first
    dispatch(
      postCards({
        cardIds: selectedCards,
        receiverEmail,
      }),
    )
      .then(() => {
        setIsSubmitting(false)
        setIsPostModalOpen(false)
      })
      .catch(() => {
        setIsSubmitting(false)
      })
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Post Cards</h2>
        <button onClick={() => setIsPostModalOpen(false)} className="text-gray-400">
          ✕
        </button>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-sm mb-2">Receiver's Email</label>
          <input
            type="email"
            value={receiverEmail}
            onChange={(e) => setReceiverEmail(e.target.value)}
            placeholder="Enter email"
            className="w-full px-3 py-2.5 border rounded-lg text-sm"
            required
          />
        </div>

        <p className="text-sm text-gray-600">
          Are you sure you want to post {selectedCards.length} cards to be printed for selected accounts? The request is
          irreversible.
        </p>

        <div>
          <label className="block text-sm mb-2">Your Password</label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2.5 border rounded-lg text-sm pr-10"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            >
              {showPassword ? <AiOutlineEyeInvisible className="w-5 h-5" /> : <AiOutlineEye className="w-5 h-5" />}
            </button>
          </div>
        </div>

        <div className="flex justify-end gap-3 pt-4">
          <button
            onClick={() => setIsPostModalOpen(false)}
            className="px-6 py-2 border rounded-lg text-sm"
            disabled={isSubmitting}
          >
            Cancel
          </button>
          <button
            onClick={handleSend}
            className="px-6 py-2 bg-[#00B707] text-white rounded-lg text-sm"
            disabled={!receiverEmail || !password || selectedCards.length === 0 || isSubmitting}
          >
            {isSubmitting ? "Processing..." : "Send"}
          </button>
        </div>
      </div>
    </div>
  )
}

export default PostCard
