"use client"

import { useState, useEffect } from "react"
import { CountrySelect, StateSelect } from "react-country-state-city"
import { State, Country } from "country-state-city"
import "react-country-state-city/dist/react-country-state-city.css"
import { useSelector, useDispatch } from "react-redux"
import { createAffiliate, updateAffiliate, updateAffiliateStatus, reset } from "../../store/affiliate/affiliateSlice"
import authService from "../../store/auth/authService"
import affiliateService from "../../store/affiliate/affiliateService"
import toast from "react-hot-toast"
import Modal from "react-modal"
import { exportData } from "../Exporter"
import { FiDownload } from "react-icons/fi"

const initialBusiness = {
  businessName: "",
  addressLine1: "",
  city: "",
  country: "",
  countryId: "",
  state: "",
  postcode: "",
  email: "",
  phone: "",
  phoneCode: "",
  proofBusiness: null,
}

const initialRep = {
  repName: "",
  relationship: "",
  addressLine1: "",
  city: "",
  country: "",
  countryId: "",
  state: "",
  postcode: "",
  email: "",
  phone: "",
  phoneCode: "",
  proofBusiness: null,
  proofId: null,
}

const relationshipOptions = [
  "Owner/Founder",
  "Business Manager",
  "Employee",
  "Business Coordinator",
  "Business Event Organisers",
  "Sales Manager",
  "Third Party",
  "Other",
]

// Phone code mapping for countries that might not have phonecode in the library
const phoneCodeMapping = {
  Afghanistan: "93",
  Albania: "355",
  Algeria: "213",
  "United States": "1",
  "United Kingdom": "44",
  Canada: "1",
  Australia: "61",
  Germany: "49",
  France: "33",
  Italy: "39",
  Spain: "34",
  Netherlands: "31",
  Belgium: "32",
  Switzerland: "41",
  Austria: "43",
  Sweden: "46",
  Norway: "47",
  Denmark: "45",
  Finland: "358",
  Poland: "48",
  "Czech Republic": "420",
  Hungary: "36",
  Romania: "40",
  Bulgaria: "359",
  Greece: "30",
  Turkey: "90",
  Russia: "7",
  Ukraine: "380",
  India: "91",
  China: "86",
  Japan: "81",
  "South Korea": "82",
  Thailand: "66",
  Vietnam: "84",
  Malaysia: "60",
  Singapore: "65",
  Indonesia: "62",
  Philippines: "63",
  Pakistan: "92",
  Bangladesh: "880",
  "Sri Lanka": "94",
  Nepal: "977",
  Myanmar: "95",
  Cambodia: "855",
  Laos: "856",
  Brazil: "55",
  Argentina: "54",
  Chile: "56",
  Colombia: "57",
  Peru: "51",
  Venezuela: "58",
  Mexico: "52",
  Egypt: "20",
  "South Africa": "27",
  Nigeria: "234",
  Kenya: "254",
  Ghana: "233",
  Ethiopia: "251",
  Morocco: "212",
  Tunisia: "216",
  Algeria: "213",
  Libya: "218",
  Sudan: "249",
  Israel: "972",
  "Saudi Arabia": "966",
  "United Arab Emirates": "971",
  Qatar: "974",
  Kuwait: "965",
  Bahrain: "973",
  Oman: "968",
  Jordan: "962",
  Lebanon: "961",
  Syria: "963",
  Iraq: "964",
  Iran: "98",
  "New Zealand": "64",
}

const ProfileSettingsTab = () => {
  const [isEditMode, setIsEditMode] = useState(false)
  const [hasShownAlert, setHasShownAlert] = useState(false)
  const [affiliateId, setAffiliateId] = useState(null)
  const [originalAffiliate, setOriginalAffiliate] = useState(null)
  const [formErrors, setFormErrors] = useState({})
  const [isDissolveModalOpen, setIsDissolveModalOpen] = useState(false)
  const [isDissolving, setIsDissolving] = useState(false)
  const [isExportDropdownOpen, setIsExportDropdownOpen] = useState(false)
  
  // Use a single state object for all fields
  const [affiliates, setAffiliates] = useState({
    // Status field
    status: "Pending",
    // Business fields
    businessName: "",
    businessAddressLine1: "",
    businessCity: "",
    businessCountry: "",
    businessCountryId: "",
    businessState: "",
    businessStateId: "",
    businessPostcode: "",
    businessEmail: "",
    businessPhone: "",
    businessPhoneCode: "",
    businessProof: null,
    businessProofPreview: null,
    // Rep fields
    repName: "",
    repRelationship: "",
    repOtherRole: "",
    repAddressLine1: "",
    repCity: "",
    repCountry: "",
    repCountryId: "",
    repState: "",
    repStateId: "",
    repPostcode: "",
    repEmail: "",
    repPhone: "",
    repPhoneCode: "",
    repProofId: null,
    repProofIdPreview: null,
    // Bank fields
    bankName: "",
    accountNumber: "",
    sortCode: "",
    routingNumber: "",
    swiftBic: "",
    commissionFee: "10%",
  })

  const dispatch = useDispatch()
  const { isLoading, isError, isSuccess, message } = useSelector((state) => state.affiliate)

  // Determine if the user has an affiliate profile
  const hasAffiliate = !!affiliateId

  // Helper to get phone code by country name with fallback mapping
  const getPhoneCodeByCountry = (countryName) => {
    if (!countryName) return ""

    // First try to get from the library
    const countries = Country.getAllCountries()
    const country = countries.find((c) => c.name === countryName)

    if (country && country.phonecode) {
      return `+${country.phonecode}`
    }

    // Fallback to manual mapping
    const phoneCode = phoneCodeMapping[countryName]
    return phoneCode ? `+${phoneCode}` : "+1" // Default to +1 if not found
  }

  // Helper to map state name to isoCode (case-insensitive, trimmed)
  const getStateIdByName = (countryIsoCode, stateName) => {
    if (!countryIsoCode || !stateName) return ""
    const states = State.getStatesOfCountry(countryIsoCode)
    const normalized = (str) => str.trim().toLowerCase()
    const found = states.find((s) => normalized(s.name) === normalized(stateName))
    return found ? found.isoCode : ""
  }

  useEffect(() => {
    const fetchAffiliateData = async () => {
      try {
        const profileRes = await authService.getProfile()
        if (profileRes.user && profileRes.user._id) {
          const affiliateRes = await affiliateService.getAffiliateById(profileRes.user._id)
          if (affiliateRes && affiliateRes._id) {
            // Use id if present, otherwise map from name
            const businessStateId =
              affiliateRes.businessStateId || getStateIdByName(affiliateRes.businessCountry, affiliateRes.businessState)
            const repStateId =
              affiliateRes.repStateId || getStateIdByName(affiliateRes.repCountry, affiliateRes.repState)

            // Get country ISO codes to sync phone codes
            const countries = Country.getAllCountries()
            const businessCountryData = countries.find((c) => c.name === affiliateRes.businessCountry)
            const repCountryData = countries.find((c) => c.name === affiliateRes.repCountry)

            const affiliateData = {
              ...affiliateRes,
              businessProofPreview: affiliateRes.businessProof || null,
              repProofIdPreview: affiliateRes.repProofId || null,
              businessStateId,
              repStateId,
              businessCountryId: businessCountryData?.id || affiliateRes.businessCountryId,
              repCountryId: repCountryData?.id || affiliateRes.repCountryId,
              // Sync phone codes with countries using improved helper
              businessPhoneCode: businessCountryData
                ? getPhoneCodeByCountry(businessCountryData.name)
                : affiliateRes.businessPhoneCode || "+1",
              repPhoneCode: repCountryData
                ? getPhoneCodeByCountry(repCountryData.name)
                : affiliateRes.repPhoneCode || "+1",
            }
            setAffiliateId(affiliateRes._id)
            setAffiliates(affiliateData)
            setOriginalAffiliate(affiliateData)
            setIsEditMode(false) // Disable edit mode if data exists
          } else {
            setIsEditMode(true) // Enable edit mode if no data
          }
        } else {
          setIsEditMode(true) // Enable edit mode if no user
        }
      } catch (error) {
        if (error.response && error.response.status !== 404) {
          console.error("Failed to fetch affiliate data:", error)
          toast.error("Could not load affiliate information.")
        }
        setIsEditMode(true) // Enable edit mode if error (e.g., 404)
      }
    }
    fetchAffiliateData()
  }, [])

  // Feedback for save - only show alerts after user action
  useEffect(() => {
    if (hasShownAlert && isSuccess) {
      if (affiliateId) {
        toast.success("Profile updated successfully! Your status has been set to Pending for admin review.")
      } else {
        toast.success("Profile saved successfully!")
      }
      setIsEditMode(false)
      setHasShownAlert(false)
      dispatch(reset())
    }
    if (hasShownAlert && isError && message) {
      toast.error("Error: " + message)
      setHasShownAlert(false)
      dispatch(reset())
    }
  }, [isSuccess, isError, message, hasShownAlert, dispatch, affiliateId])

  // Handle clicking outside export dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isExportDropdownOpen && !event.target.closest('.export-dropdown-container')) {
        setIsExportDropdownOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isExportDropdownOpen])

  // Helper to ensure phone code is always prefixed with '+'
  const formatPhoneCode = (code) => {
    if (!code) return ""
    return code.startsWith("+") ? code : `+${code}`
  }

  // Get status badge color
  const getStatusBadgeColor = (status) => {
    switch (status) {
      case "Approved":
        return "bg-green-100 text-green-800 border-green-200"
      case "Declined":
        return "bg-red-100 text-red-800 border-red-200"
      case "Dissolved":
        return "bg-gray-100 text-gray-800 border-gray-200"
      case "Pending":
      default:
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
    }
  }

  // Handle status change
  const handleStatusChange = async (newStatus) => {
    if (!affiliateId) return

    try {
      await dispatch(updateAffiliateStatus({ id: affiliateId, status: newStatus })).unwrap()
      setAffiliates((prev) => ({ ...prev, status: newStatus }))
      toast.success(`Status updated to ${newStatus}`)
    } catch (error) {
      toast.error("Failed to update status")
    }
  }

  // Validate form fields
  const validateForm = () => {
    const errors = {}
    
    // Business validation
    if (!affiliates.businessName?.trim()) errors.businessName = "Business name is required"
    if (!affiliates.businessAddressLine1?.trim()) errors.businessAddressLine1 = "Business address is required"
    if (!affiliates.businessCity?.trim()) errors.businessCity = "Business city is required"
    if (!affiliates.businessCountry?.trim()) errors.businessCountry = "Business country is required"
    if (!affiliates.businessPostcode?.trim()) errors.businessPostcode = "Business postcode is required"
    if (!affiliates.businessEmail?.trim()) errors.businessEmail = "Business email is required"
    if (!affiliates.businessPhone?.trim()) errors.businessPhone = "Business phone is required"
    
    // Rep validation
    if (!affiliates.repName?.trim()) errors.repName = "Rep name is required"
    if (!affiliates.repRelationship?.trim()) errors.repRelationship = "Relationship is required"
    if (affiliates.repRelationship === "Other" && !affiliates.repOtherRole?.trim()) {
      errors.repOtherRole = "Please specify your role"
    }
    if (!affiliates.repAddressLine1?.trim()) errors.repAddressLine1 = "Rep address is required"
    if (!affiliates.repCity?.trim()) errors.repCity = "Rep city is required"
    if (!affiliates.repCountry?.trim()) errors.repCountry = "Rep country is required"
    if (!affiliates.repPostcode?.trim()) errors.repPostcode = "Rep postcode is required"
    if (!affiliates.repEmail?.trim()) errors.repEmail = "Rep email is required"
    if (!affiliates.repPhone?.trim()) errors.repPhone = "Rep phone is required"
    
    // Bank validation
    if (!affiliates.bankName?.trim()) errors.bankName = "Bank name is required"
    if (!affiliates.accountNumber?.trim()) errors.accountNumber = "Account number is required"
    
    // Country-specific bank validation
    if (affiliates.businessCountry === "United Kingdom" && !affiliates.sortCode?.trim()) {
      errors.sortCode = "Sort code is required for UK"
    }
    if (affiliates.businessCountry === "United States" && !affiliates.routingNumber?.trim()) {
      errors.routingNumber = "Routing number is required for US"
    }
    if (
      affiliates.businessCountry &&
      affiliates.businessCountry !== "United Kingdom" &&
      affiliates.businessCountry !== "United States" &&
      !affiliates.swiftBic?.trim()
    ) {
      errors.swiftBic = "SWIFT/BIC is required"
    }

    setFormErrors(errors)
    return Object.keys(errors).length === 0
  }

  // Get only changed fields compared to original data
  const getChangedFields = () => {
    if (!originalAffiliate) return affiliates

    const changedFields = {}
    Object.keys(affiliates).forEach((key) => {
      if (key === "businessProof" || key === "repProofId") {
        // Always include files if they exist
        if (affiliates[key]) {
          changedFields[key] = affiliates[key]
        }
      } else if (key === "businessProofPreview" || key === "repProofIdPreview") {
        // Skip preview fields
        return
      } else if (affiliates[key] !== originalAffiliate[key]) {
        changedFields[key] = affiliates[key]
      }
    })
    
    return changedFields
  }

  // Update all handlers to use affiliates state
  const handleChange = (e) => {
    if (!isEditMode) return
    const { name, value } = e.target
    setAffiliates((prev) => ({ ...prev, [name]: value }))
    
    // Clear error when user starts typing
    if (formErrors[name]) {
      setFormErrors((prev) => ({ ...prev, [name]: "" }))
    }
  }

  const handleCountry = (type, country) => {
    if (!isEditMode) return

    // Get phone code using the improved helper function
    const phoneCode = getPhoneCodeByCountry(country.name)

    if (type === "business") {
      setAffiliates((prev) => ({ 
        ...prev, 
        businessCountry: country.name, 
        businessCountryId: country.id, 
        businessState: "",
        businessStateId: "",
        businessPhoneCode: phoneCode, // Use improved phone code
        // Clear country-specific bank fields when country changes
        sortCode: "",
        routingNumber: "",
        swiftBic: "",
      }))
    } else {
      setAffiliates((prev) => ({ 
        ...prev, 
        repCountry: country.name, 
        repCountryId: country.id, 
        repState: "",
        repStateId: "",
        repPhoneCode: phoneCode, // Use improved phone code
      }))
    }
  }

  const handleProof = (type, e) => {
    if (!isEditMode) return
    const file = e.target.files[0]
    if (type === "business") {
      setAffiliates((prev) => ({ 
        ...prev, 
        businessProof: file, 
        businessProofPreview: file ? URL.createObjectURL(file) : prev.businessProofPreview,
      }))
    } else {
      setAffiliates((prev) => ({ 
        ...prev, 
        repProofId: file, 
        repProofIdPreview: file ? URL.createObjectURL(file) : prev.repProofIdPreview,
      }))
    }
  }

  // Remove the handlePhoneCode function since phone codes are now auto-synced

  const handleState = (type, state) => {
    if (!isEditMode) return
    if (type === "business") {
      setAffiliates((prev) => ({
        ...prev,
        businessState: state.name,
        businessStateId: state.isoCode,
      }))
    } else {
      setAffiliates((prev) => ({
        ...prev,
        repState: state.name,
        repStateId: state.isoCode,
      }))
    }
  }

  const handleStateText = (type) => {
    if (!isEditMode) return
    if (type === "business") {
      setAffiliates((prev) => ({ ...prev, businessState: "" }))
    } else {
      setAffiliates((prev) => ({ ...prev, repState: "" }))
    }
  }

  const handleEdit = () => {
    setIsEditMode(true)
    setFormErrors({})
  }

  const handleCancel = () => {
    setIsEditMode(false)
    setFormErrors({})
    // Reset form to original data, but ensure state ids are mapped
    if (originalAffiliate) {
      const businessStateId =
        originalAffiliate.businessStateId ||
        getStateIdByName(originalAffiliate.businessCountry, originalAffiliate.businessState)
      const repStateId =
        originalAffiliate.repStateId || getStateIdByName(originalAffiliate.repCountry, originalAffiliate.repState)
      setAffiliates({
        ...originalAffiliate,
        businessStateId,
        repStateId,
      })
    }
  }

  // Submit handler
  const handleSubmit = (e) => {
    e.preventDefault()
    if (!isEditMode) return
    
    // Validate form
    if (!validateForm()) {
      toast.error("Please fix the errors in the form")
      return
    }

    setHasShownAlert(true)
    const changedFields = getChangedFields()

    // Always include both name and id for states
    changedFields.businessState = affiliates.businessState
    changedFields.businessStateId = affiliates.businessStateId
    changedFields.repState = affiliates.repState
    changedFields.repStateId = affiliates.repStateId

    // Set status to Pending when updating data
    if (affiliateId) {
      changedFields.status = "Pending"
      dispatch(updateAffiliate({ id: affiliateId, data: changedFields }))
    } else {
      dispatch(createAffiliate(changedFields))
    }
  }

  // Dynamic bank fields based on business country
  const renderBankFields = () => {
    if (affiliates.businessCountry === "United Kingdom") {
      return (
        <>
          <div>
            <label className="block text-sm mb-1 font-medium">
              Sort Code<span className="text-red-500">*</span>
            </label>
            <input 
              type="text" 
              name="sortCode" 
              value={affiliates.sortCode} 
              onChange={handleChange} 
              disabled={!isEditMode}
              className={`w-full px-3 py-2 border rounded-lg ${!isEditMode ? "bg-gray-100 cursor-not-allowed" : ""} ${formErrors.sortCode ? "border-red-500" : ""}`}
            />
            {formErrors.sortCode && <p className="text-red-500 text-xs mt-1">{formErrors.sortCode}</p>}
          </div>
        </>
      )
    } else if (affiliates.businessCountry === "United States") {
      return (
        <>
          <div>
            <label className="block text-sm mb-1 font-medium">
              Routing Number<span className="text-red-500">*</span>
            </label>
            <input 
              type="text" 
              name="routingNumber" 
              value={affiliates.routingNumber} 
              onChange={handleChange} 
              disabled={!isEditMode}
              className={`w-full px-3 py-2 border rounded-lg ${!isEditMode ? "bg-gray-100 cursor-not-allowed" : ""} ${formErrors.routingNumber ? "border-red-500" : ""}`}
            />
            {formErrors.routingNumber && <p className="text-red-500 text-xs mt-1">{formErrors.routingNumber}</p>}
          </div>
        </>
      )
    } else if (affiliates.businessCountry) {
      return (
        <>
          <div>
            <label className="block text-sm mb-1 font-medium">
              SWIFT/BIC<span className="text-red-500">*</span>
            </label>
            <input 
              type="text" 
              name="swiftBic" 
              value={affiliates.swiftBic} 
              onChange={handleChange} 
              disabled={!isEditMode}
              className={`w-full px-3 py-2 border rounded-lg ${!isEditMode ? "bg-gray-100 cursor-not-allowed" : ""} ${formErrors.swiftBic ? "border-red-500" : ""}`}
            />
            {formErrors.swiftBic && <p className="text-red-500 text-xs mt-1">{formErrors.swiftBic}</p>}
          </div>
        </>
      )
    }
    return null
  }

  // Handle dissolve partnership
  const handleDissolvePartnership = async () => {
    if (!affiliateId) return

    setIsDissolving(true)
    try {
      // Call the dissolve partnership API
      await affiliateService.dissolvePartnership(affiliateId)
      
      // Clear local state
      setAffiliateId(null)
      setAffiliates({
        status: "Pending",
        businessName: "",
        businessAddressLine1: "",
        businessCity: "",
        businessCountry: "",
        businessCountryId: "",
        businessState: "",
        businessStateId: "",
        businessPostcode: "",
        businessEmail: "",
        businessPhone: "",
        businessPhoneCode: "",
        businessProof: null,
        businessProofPreview: null,
        repName: "",
        repRelationship: "",
        repOtherRole: "",
        repAddressLine1: "",
        repCity: "",
        repCountry: "",
        repCountryId: "",
        repState: "",
        repStateId: "",
        repPostcode: "",
        repEmail: "",
        repPhone: "",
        repPhoneCode: "",
        repProofId: null,
        repProofIdPreview: null,
        bankName: "",
        accountNumber: "",
        sortCode: "",
        routingNumber: "",
        swiftBic: "",
        commissionFee: "10%",
      })
      setOriginalAffiliate(null)
      setIsEditMode(true)
      
      toast.success("Partnership dissolved successfully. Your data will be cleared after 30 days from your last outstanding event.")
      setIsDissolveModalOpen(false)
    } catch (error) {
      console.error("Failed to dissolve partnership:", error)
      toast.error("Failed to dissolve partnership. Please try again.")
    } finally {
      setIsDissolving(false)
    }
  }

  // Check if partnership is dissolved
  const isDissolved = affiliates.status === "Dissolved"

  // Handle export functionality
  const handleExport = (format) => {
    if (!hasAffiliate) {
      toast.error("No affiliate data to export")
      return
    }

    // Prepare data with two rows: one for business, one for rep
    const now = new Date();
    const dateExported = now.toLocaleDateString();
    const timeExported = now.toLocaleTimeString();
    const exportDataArray = [
      { // Business Row
        "Type": "Business",
        "Name": affiliates.businessName || "",
        "Relationship": "N/A",
        "Address": affiliates.businessAddressLine1 || "",
        "City": affiliates.businessCity || "",
        "Country": affiliates.businessCountry || "",
        "State": affiliates.businessState || "",
        "Postcode": affiliates.businessPostcode || "",
        "Email": affiliates.businessEmail || "",
        "Phone": `${affiliates.businessPhoneCode || ""} ${affiliates.businessPhone || ""}`,
        "Bank Name": affiliates.bankName || "",
        "Account No.": affiliates.accountNumber || "",
        "Sort Code": affiliates.sortCode || "",
        "Routing No.": affiliates.routingNumber || "",
        "SWIFT/BIC": affiliates.swiftBic || "",
        "Commission": affiliates.commissionFee || "",
        "Status": affiliates.status || "",
        "Date Exported": dateExported,
        "Time Exported": timeExported,
      },
      { // Rep Row
        "Type": "Representative",
        "Name": affiliates.repName || "",
        "Relationship": affiliates.repRelationship === 'Other' ? affiliates.repOtherRole : affiliates.repRelationship,
        "Address": affiliates.repAddressLine1 || "",
        "City": affiliates.repCity || "",
        "Country": affiliates.repCountry || "",
        "State": affiliates.repState || "",
        "Postcode": affiliates.repPostcode || "",
        "Email": affiliates.repEmail || "",
        "Phone": `${affiliates.repPhoneCode || ""} ${affiliates.repPhone || ""}`,
        "Bank Name": "N/A",
        "Account No.": "N/A",
        "Sort Code": "N/A",
        "Routing No.": "N/A",
        "SWIFT/BIC": "N/A",
        "Commission": "N/A",
        "Status": "N/A",
        "Date Exported": dateExported,
        "Time Exported": timeExported,
      }
    ]

    exportData(exportDataArray, format, `affiliate_profile_${affiliates.businessName?.replace(/[^a-zA-Z0-9]/g, '_') || 'export'}`)
    toast.success(`Profile exported successfully as ${format.toUpperCase()}`)
  }

  if (isLoading) {
    return <div className="text-center p-10">Loading...</div>
  }

  // Show dissolved state UI
  if (isDissolved) {
    return (
      <div className="space-y-8">
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
          <div className="flex items-center justify-center">
            <div className="text-center">
              <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h3 className="mt-2 text-sm font-medium text-gray-900">Partnership Dissolved</h3>
              <p className="mt-1 text-sm text-gray-500">
                Your partnership has been dissolved. Your data will be permanently removed from the system after 30 days from your last outstanding event.
              </p>
              {affiliates.deletionDate && (
                <p className="mt-2 text-xs text-gray-400">
                  Scheduled for deletion: {new Date(affiliates.deletionDate).toLocaleDateString()}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <form className="space-y-8" onSubmit={handleSubmit}>
      {isLoading && <div className="text-center text-blue-500">Saving...</div>}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Business Information */}
        <div className="bg-white rounded-lg p-6 shadow-md">
          <h3 className="text-lg font-semibold mb-4">Business Information</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm mb-1 font-medium">
                Business Name<span className="text-red-500">*</span>
              </label>
              <input 
                type="text" 
                name="businessName" 
                value={affiliates.businessName} 
                onChange={handleChange} 
                disabled={!isEditMode}
                className={`w-full px-3 py-2 border rounded-lg ${!isEditMode ? "bg-gray-100 cursor-not-allowed" : ""} ${formErrors.businessName ? "border-red-500" : ""}`}
              />
              {formErrors.businessName && <p className="text-red-500 text-xs mt-1">{formErrors.businessName}</p>}
            </div>
            <div>
              <label className="block text-sm mb-1 font-medium">
                Address Line 1<span className="text-red-500">*</span>
              </label>
              <input 
                type="text" 
                name="businessAddressLine1" 
                value={affiliates.businessAddressLine1} 
                onChange={handleChange} 
                disabled={!isEditMode}
                className={`w-full px-3 py-2 border rounded-lg ${!isEditMode ? "bg-gray-100 cursor-not-allowed" : ""} ${formErrors.businessAddressLine1 ? "border-red-500" : ""}`}
              />
              {formErrors.businessAddressLine1 && (
                <p className="text-red-500 text-xs mt-1">{formErrors.businessAddressLine1}</p>
              )}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm mb-1 font-medium">
                  Town/City<span className="text-red-500">*</span>
                </label>
                <input 
                  type="text" 
                  name="businessCity" 
                  value={affiliates.businessCity} 
                  onChange={handleChange} 
                  disabled={!isEditMode}
                  className={`w-full px-3 py-2 border rounded-lg ${!isEditMode ? "bg-gray-100 cursor-not-allowed" : ""} ${formErrors.businessCity ? "border-red-500" : ""}`}
                />
                {formErrors.businessCity && <p className="text-red-500 text-xs mt-1">{formErrors.businessCity}</p>}
              </div>
              <div>
                <label className="block text-sm mb-1 font-medium">
                  Country<span className="text-red-500">*</span>
                </label>
                <CountrySelect
                  onChange={(country) => handleCountry("business", country)}
                  onTextChange={() => handleStateText("business")}
                  defaultValue={affiliates.businessCountry}
                  placeHolder="Select Country"
                  disabled={!isEditMode}
                  style={{ 
                    width: "100%",
                    padding: "8px",
                    borderRadius: "5px",
                    border: formErrors.businessCountry ? "1px solid #ef4444" : "none",
                    fontSize: "16px",
                    backgroundColor: !isEditMode ? "#f3f4f6" : "white",
                    cursor: !isEditMode ? "not-allowed" : "pointer",
                  }}
                />
                {formErrors.businessCountry && (
                  <p className="text-red-500 text-xs mt-1">{formErrors.businessCountry}</p>
                )}
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm mb-1 font-medium">State</label>
                {isEditMode ? (
                  <StateSelect
                    countryid={affiliates.businessCountryId}
                    placeHolder="Select State"
                    onChange={(state) => handleState("business", state)}
                    onTextChange={() => handleStateText("business")}
                    value={affiliates.businessStateId}
                    defaultValue={affiliates.businessStateId}
                    style={{ 
                      width: "100%",
                      padding: "8px",
                      borderRadius: "0.375rem",
                      border: "1px solid #d1d5db",
                    }}
                  />
                ) : (
                  <div className="w-full px-3 py-2 border rounded-lg bg-gray-100 flex items-center justify-between cursor-not-allowed">
                    <span className="text-gray-700">{affiliates.businessState || "Select State"}</span>
                    <svg
                      className="w-5 h-5 text-gray-400"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                )}
              </div>
              <div>
                <label className="block text-sm mb-1 font-medium">
                  Postcode/Zipcode<span className="text-red-500">*</span>
                </label>
                <input 
                  type="text" 
                  name="businessPostcode" 
                  value={affiliates.businessPostcode} 
                  onChange={handleChange} 
                  disabled={!isEditMode}
                  className={`w-full px-3 py-2 border rounded-lg ${!isEditMode ? "bg-gray-100 cursor-not-allowed" : ""} ${formErrors.businessPostcode ? "border-red-500" : ""}`}
                />
                {formErrors.businessPostcode && (
                  <p className="text-red-500 text-xs mt-1">{formErrors.businessPostcode}</p>
                )}
              </div>
            </div>
            <div>
              <label className="block text-sm mb-1 font-medium">
                Email<span className="text-red-500">*</span>
              </label>
              <input 
                type="email" 
                name="businessEmail" 
                value={affiliates.businessEmail} 
                onChange={handleChange} 
                disabled={!isEditMode}
                className={`w-full px-3 py-2 border rounded-lg ${!isEditMode ? "bg-gray-100 cursor-not-allowed" : ""} ${formErrors.businessEmail ? "border-red-500" : ""}`}
              />
              {formErrors.businessEmail && <p className="text-red-500 text-xs mt-1">{formErrors.businessEmail}</p>}
            </div>
            <label className="block text-sm mb-1 font-medium">
              Phone No<span className="text-red-500">*</span>
            </label>
            <div className="flex gap-2">
              {/* Phone code is now read-only and synced with country */}
              <div className="w-24 px-3 py-2 border rounded-lg bg-gray-100 flex items-center justify-center text-gray-700 cursor-not-allowed">
                {affiliates.businessPhoneCode || "+1"}
              </div>
              <input
                type="tel"
                name="businessPhone"
                value={affiliates.businessPhone}
                onChange={handleChange}
                disabled={!isEditMode}
                className={`w-full px-3 py-2 border rounded-lg ${!isEditMode ? "bg-gray-100 cursor-not-allowed" : ""} ${formErrors.businessPhone ? "border-red-500" : ""}`}
              />
            </div>
            {formErrors.businessPhone && <p className="text-red-500 text-xs mt-1">{formErrors.businessPhone}</p>}
            <div>
              <label className="block text-sm mb-1 font-medium">Proof of Business Existence</label>
              <div className="flex gap-4 flex-wrap">
                {isEditMode && (
                  <label className="w-24 h-24 border-2 border-dashed rounded-lg flex items-center justify-center cursor-pointer hover:bg-gray-50">
                    <span className="text-2xl text-gray-400">+</span>
                    <input
                      type="file"
                      name="businessProof"
                      accept="image/*,application/pdf"
                      onChange={(e) => handleProof("business", e)}
                      className="hidden"
                    />
                  </label>
                )}
                {affiliates.businessProofPreview && (
                  <div className="w-24 h-24 rounded-lg overflow-hidden relative group">
                    <img
                      src={affiliates.businessProofPreview || "/placeholder.svg"}
                      alt="Business Proof Preview"
                      className="w-full h-full object-cover"
                    />
                    {isEditMode && (
                      <button
                        type="button"
                        onClick={() => {
                          setAffiliates((prev) => ({
                            ...prev, 
                            businessProof: null, 
                            businessProofPreview: null,
                          }))
                        }}
                        className="absolute top-1 right-1 w-6 h-6 rounded-full bg-red-500 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        ✕
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        {/* Rep Information */}
        <div className="bg-white rounded-lg p-6 shadow-md">
          <h3 className="text-lg font-semibold mb-4">Rep Information</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm mb-1 font-medium">
                Rep Name<span className="text-red-500">*</span>
              </label>
              <input 
                type="text" 
                name="repName" 
                value={affiliates.repName} 
                onChange={handleChange} 
                disabled={!isEditMode}
                className={`w-full px-3 py-2 border rounded-lg ${!isEditMode ? "bg-gray-100 cursor-not-allowed" : ""} ${formErrors.repName ? "border-red-500" : ""}`}
              />
              {formErrors.repName && <p className="text-red-500 text-xs mt-1">{formErrors.repName}</p>}
            </div>
            <div>
              <label className="block text-sm mb-1 font-medium">
                Relationship to Business<span className="text-red-500">*</span>
              </label>
              <select 
                name="repRelationship" 
                value={affiliates.repRelationship} 
                onChange={handleChange} 
                disabled={!isEditMode}
                className={`w-full px-3 py-2 border rounded-lg ${!isEditMode ? "bg-gray-100 cursor-not-allowed" : ""} ${formErrors.repRelationship ? "border-red-500" : ""}`}
              >
                <option value="">Select Relationship</option>
                {relationshipOptions.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
              {formErrors.repRelationship && <p className="text-red-500 text-xs mt-1">{formErrors.repRelationship}</p>}
              {affiliates.repRelationship === "Other" && (
                <input
                  type="text"
                  name="repOtherRole"
                  value={affiliates.repOtherRole || ""}
                  onChange={(e) => setAffiliates((prev) => ({ ...prev, repOtherRole: e.target.value }))}
                  placeholder="Please specify your role"
                  disabled={!isEditMode}
                  className={`w-full mt-2 px-3 py-2 border rounded-lg ${!isEditMode ? "bg-gray-100 cursor-not-allowed" : ""} ${formErrors.repOtherRole ? "border-red-500" : ""}`}
                />
              )}
              {formErrors.repOtherRole && <p className="text-red-500 text-xs mt-1">{formErrors.repOtherRole}</p>}
            </div>
            <div>
              <label className="block text-sm mb-1 font-medium">
                Address Line 1<span className="text-red-500">*</span>
              </label>
              <input 
                type="text" 
                name="repAddressLine1" 
                value={affiliates.repAddressLine1} 
                onChange={handleChange} 
                disabled={!isEditMode}
                className={`w-full px-3 py-2 border rounded-lg ${!isEditMode ? "bg-gray-100 cursor-not-allowed" : ""} ${formErrors.repAddressLine1 ? "border-red-500" : ""}`}
              />
              {formErrors.repAddressLine1 && <p className="text-red-500 text-xs mt-1">{formErrors.repAddressLine1}</p>}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm mb-1 font-medium">
                  Town/City<span className="text-red-500">*</span>
                </label>
                <input 
                  type="text" 
                  name="repCity" 
                  value={affiliates.repCity} 
                  onChange={handleChange} 
                  disabled={!isEditMode}
                  className={`w-full px-3 py-2 border rounded-lg ${!isEditMode ? "bg-gray-100 cursor-not-allowed" : ""} ${formErrors.repCity ? "border-red-500" : ""}`}
                />
                {formErrors.repCity && <p className="text-red-500 text-xs mt-1">{formErrors.repCity}</p>}
              </div>
              <div>
                <label className="block text-sm mb-1 font-medium">
                  Country<span className="text-red-500">*</span>
                </label>
                <CountrySelect
                  onChange={(country) => handleCountry("rep", country)}
                  onTextChange={() => handleStateText("rep")}
                  defaultValue={affiliates.repCountry}
                  placeHolder="Select Country"
                  disabled={!isEditMode}
                  style={{ 
                    width: "100%",
                    padding: "8px",
                    borderRadius: "5px",
                    border: formErrors.repCountry ? "1px solid #ef4444" : "none",
                    fontSize: "16px",
                    backgroundColor: !isEditMode ? "#f3f4f6" : "white",
                    cursor: !isEditMode ? "not-allowed" : "pointer",
                  }}
                />
                {formErrors.repCountry && <p className="text-red-500 text-xs mt-1">{formErrors.repCountry}</p>}
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm mb-1 font-medium">State</label>
                {isEditMode ? (
                  <StateSelect
                    countryid={affiliates.repCountryId}
                    placeHolder="Select State"
                    onChange={(state) => handleState("rep", state)}
                    onTextChange={() => handleStateText("rep")}
                    value={affiliates.repStateId}
                    defaultValue={affiliates.repStateId}
                    style={{ 
                      width: "100%",
                      padding: "8px",
                      borderRadius: "0.375rem",
                      border: "1px solid #d1d5db",
                    }}
                  />
                ) : (
                  <div className="w-full px-3 py-2 border rounded-lg bg-gray-100 flex items-center justify-between cursor-not-allowed">
                    <span className="text-gray-700">{affiliates.repState || "Select State"}</span>
                    <svg
                      className="w-5 h-5 text-gray-400"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                )}
              </div>
              <div>
                <label className="block text-sm mb-1 font-medium">
                  Postcode/Zipcode<span className="text-red-500">*</span>
                </label>
                <input 
                  type="text" 
                  name="repPostcode" 
                  value={affiliates.repPostcode} 
                  onChange={handleChange} 
                  disabled={!isEditMode}
                  className={`w-full px-3 py-2 border rounded-lg ${!isEditMode ? "bg-gray-100 cursor-not-allowed" : ""} ${formErrors.repPostcode ? "border-red-500" : ""}`}
                />
                {formErrors.repPostcode && <p className="text-red-500 text-xs mt-1">{formErrors.repPostcode}</p>}
              </div>
            </div>
            <div>
              <label className="block text-sm mb-1 font-medium">
                Email<span className="text-red-500">*</span>
              </label>
              <input 
                type="email" 
                name="repEmail" 
                value={affiliates.repEmail} 
                onChange={handleChange} 
                disabled={!isEditMode}
                className={`w-full px-3 py-2 border rounded-lg ${!isEditMode ? "bg-gray-100 cursor-not-allowed" : ""} ${formErrors.repEmail ? "border-red-500" : ""}`}
              />
              {formErrors.repEmail && <p className="text-red-500 text-xs mt-1">{formErrors.repEmail}</p>}
            </div>
            <label className="block text-sm mb-1 font-medium">
              Phone No<span className="text-red-500">*</span>
            </label>
            <div className="flex gap-2">
              {/* Phone code is now read-only and synced with country */}
              <div className="w-24 px-3 py-2 border rounded-lg bg-gray-100 flex items-center justify-center text-gray-700 cursor-not-allowed">
                {affiliates.repPhoneCode || "+1"}
              </div>
              <input
                type="tel"
                name="repPhone"
                value={affiliates.repPhone}
                onChange={handleChange}
                disabled={!isEditMode}
                className={`w-full px-3 py-2 border rounded-lg ${!isEditMode ? "bg-gray-100 cursor-not-allowed" : ""} ${formErrors.repPhone ? "border-red-500" : ""}`}
              />
            </div>
            {formErrors.repPhone && <p className="text-red-500 text-xs mt-1">{formErrors.repPhone}</p>}
            <div>
              <label className="block text-sm mb-1 font-medium">Proof of Identification</label>
              <div className="flex gap-4 flex-wrap">
                {isEditMode && (
                  <label className="w-24 h-24 border-2 border-dashed rounded-lg flex items-center justify-center cursor-pointer hover:bg-gray-50">
                    <span className="text-2xl text-gray-400">+</span>
                    <input
                      type="file"
                      name="repProofId"
                      accept="image/*,application/pdf"
                      onChange={(e) => handleProof("rep", e)}
                      className="hidden"
                    />
                  </label>
                )}
                {affiliates.repProofIdPreview && (
                  <div className="w-24 h-24 rounded-lg overflow-hidden relative group">
                    <img
                      src={affiliates.repProofIdPreview || "/placeholder.svg"}
                      alt="Rep ID Proof Preview"
                      className="w-full h-full object-cover"
                    />
                    {isEditMode && (
                      <button
                        type="button"
                        onClick={() => {
                          setAffiliates((prev) => ({
                            ...prev, 
                            repProofId: null, 
                            repProofIdPreview: null,
                          }))
                        }}
                        className="absolute top-1 right-1 w-6 h-6 rounded-full bg-red-500 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        ✕
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Bank Details Section */}
      <div className="bg-white rounded-lg p-6 shadow-md mt-8 mx-auto">
        <h3 className="text-lg font-semibold mb-4">Bank Details</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm mb-1 font-medium">
              Bank Name<span className="text-red-500">*</span>
            </label>
            <input 
              type="text" 
              name="bankName" 
              value={affiliates.bankName} 
              onChange={handleChange} 
              disabled={!isEditMode}
              className={`w-full px-3 py-2 border rounded-lg ${!isEditMode ? "bg-gray-100 cursor-not-allowed" : ""} ${formErrors.bankName ? "border-red-500" : ""}`}
            />
            {formErrors.bankName && <p className="text-red-500 text-xs mt-1">{formErrors.bankName}</p>}
          </div>
          <div>
            <label className="block text-sm mb-1 font-medium">
              Account Number<span className="text-red-500">*</span>
            </label>
            <input 
              type="text" 
              name="accountNumber" 
              value={affiliates.accountNumber} 
              onChange={handleChange} 
              disabled={!isEditMode}
              className={`w-full px-3 py-2 border rounded-lg ${!isEditMode ? "bg-gray-100 cursor-not-allowed" : ""} ${formErrors.accountNumber ? "border-red-500" : ""}`}
            />
            {formErrors.accountNumber && <p className="text-red-500 text-xs mt-1">{formErrors.accountNumber}</p>}
          </div>
          {renderBankFields()}

          {affiliates.status == "Approved" && (
          <div>
            <label className="block text-sm mb-1 font-medium">Commission Fee</label>
              <input
                type="text"
                name="commissionFee"
                value={affiliates.commissionFee}
                readOnly
                className="w-full px-3 py-2 border rounded-lg bg-gray-100 text-gray-500 cursor-not-allowed"
              />
          </div>
          )}

        </div>
      </div>

       {/* Status Section */}
      {hasAffiliate && (
         <div className="bg-white rounded-lg p-6 shadow-md">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Application Status</h3>
            <div className="flex items-center gap-4">
              <span
                className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusBadgeColor(affiliates.status)}`}
              >
                {affiliates.status}
              </span>
              {/* Export Button - Only show if user has affiliate data */}
              {hasAffiliate && affiliates.businessName && (
                <div className="relative export-dropdown-container">
                  <button
                    type="button"
                    onClick={() => setIsExportDropdownOpen(!isExportDropdownOpen)}
                    className="px-4 py-2 bg-primary text-white rounded-lg flex items-center gap-2 hover:bg-primary/90 transition-colors"
                  >
                    <FiDownload />
                    Export Profile
                  </button>
                  {isExportDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg z-10 py-2">
                      <button
                        onClick={() => {
                          handleExport("pdf")
                          setIsExportDropdownOpen(false)
                        }}
                        className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center gap-2 text-red-500"
                      >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" />
                        </svg>
                        Export as PDF
                      </button>
                      <button
                        onClick={() => {
                          handleExport("csv")
                          setIsExportDropdownOpen(false)
                        }}
                        className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center gap-2 text-green-500"
                      >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" />
                        </svg>
                        Export as CSV
                      </button>
                      <button
                        onClick={() => {
                          handleExport("excel")
                          setIsExportDropdownOpen(false)
                        }}
                        className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center gap-2 text-blue-500"
                      >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" />
                        </svg>
                        Export as Excel
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
          {isEditMode && affiliates.status === "Approved" && (
            <div className="mt-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-sm text-blue-800">
                <strong>Note:</strong> When you submit changes, your status will be set to "Pending" for admin review.
              </p>
            </div>
          )}
        </div>
       )}

      <div className="flex flex-col md:flex-row justify-end items-center gap-3 mt-8">
        {hasAffiliate && (
          <button
            type="button"
            onClick={() => setIsDissolveModalOpen(true)}
            className="px-6 py-2 border border-red-500 text-red-500 rounded-lg hover:bg-red-50 transition-colors"
          >
            Dissolve Partnership
          </button>
        )}
        {hasAffiliate ? (
          !isEditMode ? (
            <button
              type="button"
              onClick={handleEdit}
              className="px-6 py-2 border border-primary text-primary rounded-lg hover:bg-primary/10 transition-colors"
            >
              Edit
            </button>
          ) : (
            <>
              <button
                type="button"
                onClick={handleCancel}
                className="px-6 py-2 border border-gray-500 text-gray-500 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
              >
                Submit
              </button>
            </>
          )
        ) : (
          <button
            type="submit"
            className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
          >
            Submit
          </button>
        )}
      </div>

      {/* Dissolve Partnership Warning Modal */}
      <Modal
        isOpen={isDissolveModalOpen}
        onRequestClose={() => setIsDissolveModalOpen(false)}
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-1000 bg-white rounded-lg w-[500px] max-w-[90vw]"
        overlayClassName="fixed inset-0 bg-black/50 z-50"
        style={{
          overlay: { zIndex: 1000 },
          content: { zIndex: 1001 },
        }}
      >
        <div className="p-6">
          <div className="flex items-start mb-4">
            <div className="flex-shrink-0">
              <svg className="h-6 w-6 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-lg font-medium text-gray-900">
                Dissolve Partnership
              </h3>
            </div>
          </div>
          
          <div className="mb-6">
            <p className="text-sm text-gray-600 mb-4">
              Are you sure you want to dissolve your partnership? This action will:
            </p>
            <ul className="text-sm text-gray-600 space-y-2 mb-4">
              <li className="flex items-start">
                <span className="text-red-500 mr-2">•</span>
                Remove you from the affiliate event dropdown
              </li>
              <li className="flex items-start">
                <span className="text-red-500 mr-2">•</span>
                Remove all action buttons and functionality
              </li>
              <li className="flex items-start">
                <span className="text-red-500 mr-2">•</span>
                Clear all your details after 30 days from your last outstanding event
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">•</span>
                Admin will retain a copy of your data for record-keeping
              </li>
            </ul>
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
              <p className="text-sm text-yellow-800 font-medium">
                ⚠️ Important: Please export your affiliate details using the "Export Profile" button above before proceeding.
              </p>
            </div>
          </div>

          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={() => setIsDissolveModalOpen(false)}
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              disabled={isDissolving}
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleDissolvePartnership}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50"
              disabled={isDissolving}
            >
              {isDissolving ? "Dissolving..." : "Dissolve Partnership"}
            </button>
          </div>
        </div>
      </Modal>
    </form>
  )
}

export default ProfileSettingsTab
