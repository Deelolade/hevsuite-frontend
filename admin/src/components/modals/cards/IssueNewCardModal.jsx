"use client"

import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getAllUsers, issueNewCard } from "../../../store/cards/cardSlice"
import { BiSearch } from "react-icons/bi"
import axios from "axios"
import { base_url } from "../../../constants/axiosConfig"

const IssueNewCardModal = ({ onClose, onCardIssued  }) => {
  const dispatch = useDispatch()
  const { users, isLoading } = useSelector((state) => state.cards)

  const [searchTerm, setSearchTerm] = useState("")
  const [selectedUser, setSelectedUser] = useState(null)
  const [cardType, setCardType] = useState("standard")
  const [issuedReason, setIssuedReason] = useState("")
  const [addressLine1, setAddressLine1] = useState("")
  const [town, setTown] = useState("")
  const [country, setCountry] = useState("")
  const [postcode, setPostcode] = useState("")
  const [formErrors, setFormErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showUserList, setShowUserList] = useState(false)
  const [loadingUserDetails, setLoadingUserDetails] = useState(false)
  const [useExistingAddress, setUseExistingAddress] = useState(true)

  useEffect(() => {
    dispatch(getAllUsers())
  }, [dispatch])

  const [refreshKey, setRefreshKey] = useState(0);

  // const handleCardIssued = () => {
  //   setRefreshKey(prev => prev + 1); // This will force re-render
  //   dispatch(getNewMembers({ // Explicitly refetch data
  //     search: searchTerm,
  //     status: "all",
  //     filter: "all",
  //   }));
  // };

  // Filter users based on search term
  const filteredUsers = users.filter(
    (user) =>
      user.forename?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.surname?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.primaryEmail?.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const fetchUserDetails = async (userId) => {
    try {
      setLoadingUserDetails(true)
  
      const getAuthToken = () => {
        const adminData = localStorage.getItem("admin")
        const admin = adminData ? JSON.parse(adminData) : null
        return admin?.token || ""
      }
  
      const token = getAuthToken()
  
      const response = await axios.get(`${base_url}/api/user/admin/users/${userId}/details`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
  
      if (response.data.success && response.data.user) {
        const userDetails = response.data.user

        console.log(userDetails)
  
        // Use top-level address fields instead of nested address object
        setAddressLine1(userDetails.addressLine1 || "")
        setTown(userDetails.city || "") // Note: backend returns 'city' not 'town'
        setCountry(userDetails.country || "")
        setPostcode(userDetails.postcode || "")
      }
    } catch (error) {
      console.error("Error fetching user details:", error)
    } finally {
      setLoadingUserDetails(false)
    }
  }

  const handleUserSelect = (user) => {
    setSelectedUser(user)
    setShowUserList(false)

    // Fetch user details including address
    if (user._id) {
      fetchUserDetails(user._id)
    }
  }

  const validateForm = () => {
    const errors = {}
    if (!selectedUser) errors.user = "Please select a user"
    if (useExistingAddress) {
      if (!addressLine1) errors.addressLine1 = "Address line 1 is required"
      if (!town) errors.town = "Town/City is required"
      if (!country) errors.country = "Country is required"
    }
    if (!issuedReason) errors.issuedReason = "Please provide a reason for issuing the card"

    setFormErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!validateForm()) return

    setIsSubmitting(true)

    const cardData = {
      userId: selectedUser._id,
      cardType,
      issuedReason,
      requestType: "admin-issued",
      approvedByAdmin: true,
      paymentStatus: "paid",
    }

    // Only include address if using existing address
    if (useExistingAddress) {
      cardData.addressLine1 = addressLine1
      cardData.town = town
      cardData.country = country
      cardData.postcode = postcode
    }

    dispatch(issueNewCard(cardData))
      .unwrap()
      .then((response) => {
        // Refresh the cards list
        // dispatch(getNewMembers({
        //   search: "",
        //   status: "all",
        //   filter: "all",
        // }))
        onClose()
        if (onCardIssued && response.cards && response.cards.length > 0) {
          onCardIssued(response.cards[0])
        }
      })
      .catch((error) => {
        setFormErrors({ submit: error.toString() })
        setIsSubmitting(false)
      })
      .finally(() => {
        setIsSubmitting(false)
      })
  }

  const handleToggleAddressUse = () => {
    setUseExistingAddress(!useExistingAddress)

    // Clear form errors related to address when toggling
    const { addressLine1, town, country, ...otherErrors } = formErrors
    setFormErrors(otherErrors)
  }

  return (
    <div className="p-6 max-h-[500px] overflow-y-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Issue New Card</h2>
        <button onClick={() => onClose()} className="text-gray-500 hover:text-gray-700">
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>

      <form onSubmit={handleSubmit}>
        {/* User Selection */}
        <div className="mb-4 relative">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Select User <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <BiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value)
                setShowUserList(true)
              }}
              onFocus={() => setShowUserList(true)}
              className="w-full pl-10 pr-4 py-2 border rounded-lg"
            />
          </div>

          {showUserList && (
            <div className="absolute z-10 mt-1 w-full bg-white border rounded-lg shadow-lg max-h-60 overflow-y-auto">
              {isLoading ? (
                <div className="p-4 text-center">Loading users...</div>
              ) : filteredUsers.length > 0 ? (
                filteredUsers.map((user) => (
                  <div
                    key={user._id}
                    className="p-2 hover:bg-gray-100 cursor-pointer flex items-center"
                    onClick={() => handleUserSelect(user)}
                  >
                    {user.profilePhoto && (
                      <img
                        src={user.profilePhoto || "/placeholder.svg"}
                        alt={`${user.forename} ${user.surname}`}
                        className="w-8 h-8 rounded-full mr-2"
                      />
                    )}
                    <div>
                      <div className="font-medium">
                        {user.forename} {user.surname}
                      </div>
                      <div className="text-sm text-gray-500">{user.primaryEmail}</div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-4 text-center text-gray-500">No users found</div>
              )}
            </div>
          )}

          {selectedUser && (
            <div className="mt-2 p-2 border rounded-lg flex items-center">
              {selectedUser.profilePhoto && (
                <img
                  src={selectedUser.profilePhoto || "/placeholder.svg"}
                  alt={`${selectedUser.forename} ${selectedUser.surname}`}
                  className="w-8 h-8 rounded-full mr-2"
                />
              )}
              <div>
                <div className="font-medium">
                  {selectedUser.forename} {selectedUser.surname}
                </div>
                <div className="text-sm text-gray-500">{selectedUser.primaryEmail}</div>
              </div>
              <button
                type="button"
                className="ml-auto text-gray-400 hover:text-gray-600"
                onClick={() => {
                  setSelectedUser(null)
                  setAddressLine1("")
                  setTown("")
                  setCountry("")
                  setPostcode("")
                }}
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>
          )}

          {formErrors.user && <p className="mt-1 text-sm text-red-600">{formErrors.user}</p>}
        </div>

        {/* Card Type */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Card Type <span className="text-red-500">*</span>
          </label>
          <select
            value={cardType}
            onChange={(e) => setCardType(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg"
          >
            <option value="standard">Standard</option>
            <option value="vip">VIP</option>
          </select>
        </div>

        {/* Delivery Address */}
        <div className="mb-4">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-sm font-medium text-gray-700">Delivery Address</h3>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="useExistingAddress"
                checked={useExistingAddress}
                onChange={handleToggleAddressUse}
                className="mr-2 h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
              />
              <label htmlFor="useExistingAddress" className="text-sm text-gray-600">
                Include delivery address
              </label>
            </div>
          </div>

          {loadingUserDetails && (
            <div className="flex justify-center items-center py-4">
              <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-primary"></div>
              <span className="ml-2 text-sm text-gray-600">Loading address...</span>
            </div>
          )}

          {useExistingAddress && (
            <>
              <div className="mb-3">
                <label className="block text-sm text-gray-600 mb-1">
                  Address Line 1 <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={addressLine1}
                  onChange={(e) => setAddressLine1(e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg"
                />
                {formErrors.addressLine1 && <p className="mt-1 text-sm text-red-600">{formErrors.addressLine1}</p>}
              </div>

              <div className="mb-3">
                <label className="block text-sm text-gray-600 mb-1">
                  Town/City <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={town}
                  onChange={(e) => setTown(e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg"
                />
                {formErrors.town && <p className="mt-1 text-sm text-red-600">{formErrors.town}</p>}
              </div>

              <div className="mb-3">
                <label className="block text-sm text-gray-600 mb-1">
                  Country <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg"
                />
                {formErrors.country && <p className="mt-1 text-sm text-red-600">{formErrors.country}</p>}
              </div>

              <div className="mb-3">
                <label className="block text-sm text-gray-600 mb-1">Postcode/Zipcode</label>
                <input
                  type="text"
                  value={postcode}
                  onChange={(e) => setPostcode(e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg"
                />
              </div>
            </>
          )}

          {!useExistingAddress && (
            <div className="p-3 bg-yellow-50 text-yellow-700 rounded-lg text-sm">
              No delivery address will be associated with this card. The user will need to provide an address later.
            </div>
          )}
        </div>

        {/* Issued Reason */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Reason for Issuing <span className="text-red-500">*</span>
          </label>
          <textarea
            value={issuedReason}
            onChange={(e) => setIssuedReason(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg"
            rows={3}
          />
          {formErrors.issuedReason && <p className="mt-1 text-sm text-red-600">{formErrors.issuedReason}</p>}
        </div>

        {formErrors.submit && <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-lg">{formErrors.submit}</div>}

        <div className="flex justify-end gap-3">
          <button type="button" onClick={() => onClose()} className="px-4 py-2 border rounded-lg">
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting || loadingUserDetails}
            className="px-4 py-2 bg-primary text-white rounded-lg disabled:opacity-50"
          >
            {isSubmitting ? "Issuing..." : "Issue Card"}
          </button>
        </div>
      </form>
    </div>
  )
}

export default IssueNewCardModal
