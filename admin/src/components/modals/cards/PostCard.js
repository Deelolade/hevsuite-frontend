import React, { useState } from "react";
import { BiSearch } from "react-icons/bi";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

const PostCard = ({ setIsPostModalOpen }) => {
    const [receiverEmail, setReceiverEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [activeTab, setActiveTab] = useState("new");
  const [selectedCardId, setSelectedCardId] = useState(null);

    return(
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">Post Cards</h2>
            <button
              onClick={() => setIsPostModalOpen(false)}
              className="text-gray-400"
            >
              ✕
            </button>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-sm mb-2">Receivers Email</label>
              <input
                type="email"
                value={receiverEmail}
                onChange={(e) => setReceiverEmail(e.target.value)}
                placeholder="Enter email"
                className="w-full px-3 py-2.5 border rounded-lg text-sm"
              />
            </div>

            <p className="text-sm text-gray-600">
              Are you sure you want to post cards to be printed for selected
              accounts? The request is irreversible.
            </p>

            <div>
              <label className="block text-sm mb-2">Your Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-3 py-2.5 border rounded-lg text-sm pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                >
                  {showPassword ? (
                    <AiOutlineEyeInvisible className="w-5 h-5" />
                  ) : (
                    <AiOutlineEye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-4">
              <button
                onClick={() => setIsPostModalOpen(false)}
                className="px-6 py-2 border rounded-lg text-sm"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  // Handle send logic here
                  setIsPostModalOpen(false);
                }}
                className="px-6 py-2 bg-[#00B707] text-white rounded-lg text-sm"
              >
                Send
              </button>
            </div>
          </div>
        </div>
    )
}

export default PostCard