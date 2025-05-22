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
  const [selectedUsers, setSelectedUsers] = useState([])
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
    if (selectedUsers.some((u) => u._id === user._id)) {
      setSelectedUsers(selectedUsers.filter((u) => u._id !== user._id))
    } else {
      setSelectedUsers([...selectedUsers, user])
    }
    setShowUserList(false)
    if (user._id) {
      fetchUserDetails(user._id)
    }
  }

  const validateForm = () => {
    const errors = {}
    if (selectedUsers.length === 0) errors.user = "Please select at least one user"
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
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    const bulkCardData = selectedUsers.map((user) => {
      const cardData = {
        userId: user._id,
        cardType,
        issuedReason,
        requestType: "new-registration",
        approvedByAdmin: false,
        paymentStatus: "paid",
      };
      if (useExistingAddress) {
        cardData.addressLine1 = addressLine1;
        cardData.town = town;
        cardData.country = country;
        cardData.postcode = postcode;
      }
      return cardData;
    });
    Promise.all(bulkCardData.map((cardData) => dispatch(issueNewCard(cardData)).unwrap()))
      .then((responses) => {
        onClose();
        if (onCardIssued && responses.length > 0) {
          onCardIssued(responses);
        }
      })
      .catch((error) => {
        setFormErrors({ submit: error.toString() });
        setIsSubmitting(false);
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  const handleToggleAddressUse = () => {
    setUseExistingAddress(!useExistingAddress);

    // Clear form errors related to address when toggling
    const { addressLine1, town, country, ...otherErrors } = formErrors;
    setFormErrors(otherErrors);
  };

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
            Select Users <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <BiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setShowUserList(true);
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
                    className={`p-2 hover:bg-gray-100 cursor-pointer flex items-center ${selectedUsers.some((u) => u._id === user._id) ? 'bg-primary/10' : ''}`}
                    onClick={() => handleUserSelect(user)}
                  >
                    <input
                      type="checkbox"
                      checked={selectedUsers.some((u) => u._id === user._id)}
                      readOnly
                      className="mr-2"
                    />
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
          {selectedUsers.length > 0 && (
            <div className="mt-2 p-2 border rounded-lg flex flex-wrap gap-2">
              {selectedUsers.map((user) => (
                <div key={user._id} className="flex items-center bg-gray-100 px-2 py-1 rounded">
                  {user.profilePhoto && (
                    <img
                      src={user.profilePhoto || "/placeholder.svg"}
                      alt={`${user.forename} ${user.surname}`}
                      className="w-6 h-6 rounded-full mr-1"
                    />
                  )}
                  <span className="text-sm">{user.forename} {user.surname}</span>
                  <button
                    type="button"
                    className="ml-1 text-gray-400 hover:text-gray-600"
                    onClick={() => setSelectedUsers(selectedUsers.filter((u) => u._id !== user._id))}
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </div>
              ))}
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
