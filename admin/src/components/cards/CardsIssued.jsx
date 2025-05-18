import React, { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { toast } from "react-toastify"
import { deactivateCard } from "../../store/cards/cardSlice"

const CardsIssued = () => {
  const [cards, setCards] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [filter, setFilter] = useState("all")

  const dispatch = useDispatch()

  useEffect(() => {
    fetchCards()
  }, [filter])

  const fetchCards = async () => {
    try {
      const response = await fetch(`/api/club-cards/issued?filter=${filter}`)
      if (!response.ok) {
        throw new Error("Failed to fetch cards")
      }
      const data = await response.json()
      setCards(data)
    } catch (error) {
      console.error("Error fetching cards:", error)
      toast.error("Failed to load cards")
    } finally {
      setIsLoading(false)
    }
  }

  const handleDeactivate = async (cardId) => {
    try {
      await dispatch(deactivateCard({ cardId })).unwrap()
      toast.success("Card deactivated successfully")
      fetchCards() // Refresh the list
    } catch (error) {
      toast.error(error.message || "Failed to deactivate card")
    }
  }

  const getStatusBadge = (card) => {
    if (card.isBanned) {
      return (
        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
          Disabled
        </span>
      )
    }
    if (card.isActivated) {
      return (
        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
          Active
        </span>
      )
    }
    return (
      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
        Not Activated
      </span>
    )
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Cards Issued</h2>
        <div className="flex space-x-4">
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="border rounded-lg px-3 py-2"
          >
            <option value="all">All Cards</option>
            <option value="new-registration">New Registration</option>
            <option value="replacement">Replacement</option>
            <option value="promoted">Promoted</option>
          </select>
        </div>
      </div>

      {cards.length === 0 ? (
        <p className="text-gray-500 text-center">No cards found</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Member Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Card Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Request Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Issued Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {cards.map((card) => (
                <tr key={card._id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {card.userId.forename} {card.userId.surname}
                    </div>
                    <div className="text-sm text-gray-500">{card.userId.primaryEmail}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {card.cardType}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {card.requestType}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getStatusBadge(card)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(card.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    {card.isActivated && !card.isBanned && (
                      <button
                        onClick={() => handleDeactivate(card._id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        Deactivate
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

export default CardsIssued 