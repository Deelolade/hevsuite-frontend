import React, { useEffect, useState } from "react";
import { BsChevronUp, BsChevronDown, BsChatDots } from "react-icons/bs";
import avatar from "../../../assets/user.avif";
import mastercard from "../../../assets/Mastercard.png";

import SupportRequestsView from "./SupportRequestsView";
import Swal from "sweetalert2";
import { showModal } from "../../../components/FireModal";
import { useDispatch, useSelector } from "react-redux";
import referralService from "../../../services/referralService";
import toast from "react-hot-toast";
import {
  disable2FA,
  fetchProfile,
  setup2FA,
  updateProfile,
} from "../../../features/auth/authSlice";
import { CountrySelect, StateSelect } from "react-country-state-city";
import {
  activateCard,
  deactivateCard,
  getCardByUserId,
  selectClubCard,
  selectLoadingStates,
} from "../../../features/clubCardSlice";
import { createSupportRequest } from "../../../features/supportRequestSlice";
const StandardProfile = () => {
  const [openSections, setOpenSections] = useState({
    personalInfo: true,
    contactDetails: true,
    occupation: true,
    referrals: true,
    twoFA: true,
  });
  const { user, isLoading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const [isEditing, setIsEditing] = useState(false);
  const [showRequestModal, setShowRequestModal] = useState(false);
  const [showRequestView, setShowRequestView] = useState(false);
  const [isEditingFullName, setIsEditingFullName] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [countryId, setCountryId] = useState("");
  const [personalInfo, setPersonalInfo] = useState({
    title: user?.title || "",
    forename: user?.forename || "",
    surname: user?.surname || "",
    gender: user?.gender || "",
    dob: user?.dob
      ? new Date(user.dob).toLocaleDateString("en-US", {
          day: "numeric",
          month: "short",
          year: "numeric",
        })
      : "",
    relationshipStatus: user?.relationshipStatus || "",
    nationality: user?.nationality || "",
    additionalNationality: user?.additionalNationality || "",
  });

  const [show2FAModal, setShow2FAModal] = useState(false);
  const [twoFAAction, setTwoFAAction] = useState(null); // 'enable' or 'disable'
  const [selectedMethod, setSelectedMethod] = useState("");
  const [password, setPassword] = useState("");
  const clubCard = useSelector(selectClubCard);
  const { activating, deactivating } = useSelector(selectLoadingStates);

  const handle2FAChange = (method) => {
    if (user?.is2FAEnabled) {
      // If 2FA is enabled, check if user is selecting a different method
      if (user?.twoFAMethod === method) {
        // If clicking the same method that's currently enabled, do nothing or show info
        // Don't disable, just ignore the click or show a message
        return;
      } else {
        // If clicking a different method, change to that method (keep 2FA enabled)
        setSelectedMethod(method);
        setTwoFAAction("change");
        setShow2FAModal(true);
      }
    } else {
      // If 2FA is not enabled, enable it with selected method
      setSelectedMethod(method);
      setTwoFAAction("enable");
      setShow2FAModal(true);
    }
  };

  const confirm2FAAction = async () => {
    try {
      if (twoFAAction === "enable" || twoFAAction === "change") {
        const data = {
          method: selectedMethod,
          [selectedMethod]:
            selectedMethod === "email"
              ? user?.twoFAEmail || user?.primaryEmail
              : user?.primaryPhone,
        };
        await dispatch(setup2FA(data)).unwrap();
      } else if (twoFAAction === "disable") {
        await dispatch(disable2FA({ password })).unwrap();
      }

      await dispatch(fetchProfile());
      setShow2FAModal(false);
      setPassword("");
      setSelectedMethod("");
    } catch (error) {
      console.error(error);
      toast.error(error || "Failed to update 2FA");
    }
  };
  const cancel2FAAction = () => {
    setShow2FAModal(false);
    setPassword("");
    setSelectedMethod("");
    setTwoFAAction(null);
  };

  useEffect(() => {
    if (user?.id) {
      dispatch(getCardByUserId(user.id))
        .unwrap()
        .catch((error) => {
          console.log("No card found for user or error:", error);
        });
    }
  }, [dispatch, user]);
  console.log(user);

  const [contactDetails, setContactDetails] = useState({
    addressLine1: user?.addressLine1 || "",
    townCity: user?.city || "",
    country: user?.country || "",
    postcodeZipcode: user?.postcode || "",
    primaryEmail: user?.primaryEmail || "",
    secondaryEmail: user?.secondaryEmail || "",
    primaryPhone: user?.primaryPhone || "",
    secondaryPhone: user?.secondaryPhone || "",
    state: user?.state || "",
  });

  const [occupationInfo, setOccupationInfo] = useState({
    employmentStatus: user?.employmentStatus || "",
    businessName: user?.businessName || "",
    memberOfClub: user?.memberOfClub || "",
    preferredSocialMedia: user?.preferredSocialMedia || "",
  });

  const [cardRequest, setCardRequest] = useState({
    fullName: user?.forename + " " + user?.surname,
    cardType: clubCard?.cardType,
    disableCurrent: "No",
  });

  const toggleSection = (section) => {
    setOpenSections({
      ...openSections,
      [section]: !openSections[section],
    });
  };

  const handlePersonalInfoChange = (field, value) => {
    setPersonalInfo({
      ...personalInfo,
      [field]: value,
    });
  };

  const handleContactDetailsChange = (field, value) => {
    setContactDetails({
      ...contactDetails,
      [field]: value,
    });
  };

  const handleOccupationInfoChange = (field, value) => {
    setOccupationInfo({
      ...occupationInfo,
      [field]: value,
    });
  };
  const changeNationalityHandler = (country, key) => {
    setPersonalInfo((prev) => ({ ...prev, [key]: country.name }));
  };
  const handleSave = async () => {
    try {
      const formData = {
        personalInfo,
        contactDetails,
        occupationInfo,
      };
      // Get confirmPassword from user input
      const confirmPassword = await Swal.fire({
        title: "Confirm Password",
        input: "password",
        inputLabel: "Please enter your current password to confirm changes",
        inputPlaceholder: "Enter your password",
        showCancelButton: true,
        confirmButtonText: "Confirm", // Custom text
        cancelButtonText: "Cancel", // Custom text
        confirmButtonColor: "#540A26",
        cancelButtonColor: "#6c757d",
        customClass: {
          confirmButton: "swal-confirm-button", // Optional custom class
          cancelButton: "swal-cancel-button", // Optional custom class
        },
        inputValidator: (value) => {
          if (!value) {
            return "You need to enter your password!";
          }
        },
        buttonsStyling: false, // Disable default styling
        willOpen: () => {
          // Apply inline styles when modal opens
          const confirmBtn = document.querySelector(".custom-confirm-button");
          const cancelBtn = document.querySelector(".custom-cancel-button");

          if (confirmBtn) {
            confirmBtn.style.backgroundColor = "#540A26";
            confirmBtn.style.color = "white";
            confirmBtn.style.border = "none";
            confirmBtn.style.padding = "8px 24px";
            confirmBtn.style.margin = "0 5px";
          }

          if (cancelBtn) {
            cancelBtn.style.backgroundColor = "#6c757d";
            cancelBtn.style.color = "white";
            cancelBtn.style.border = "none";
            cancelBtn.style.padding = "8px 24px";
            cancelBtn.style.margin = "0 5px";
          }
        },
      });

      // if (confirmPassword.isConfirmed) {
      //   const resultAction = await dispatch(
      //     updateProfile({
      //       userData: formData,
      //       confirmPassword: confirmPassword.value,
      //     })
      //   );

      //   if (updateProfile.fulfilled.match(resultAction)) {
      //     toast.success("Profile updated successfully");
      //     setIsEditing(false);
      //   } else {
      //     throw new Error(resultAction.payload || "Update failed");
      //   }
      // }

      if (confirmPassword.isConfirmed) {
        const supportRequestData = {
          type: "Profile Update",
          description: `Profile update request containing changes to personal information/ contact details/ and occupation/interests.`,
          confirmPassword: confirmPassword.value,
          requestData: formData, // Include the actual form data for processing
        };

        const resultAction = await dispatch(
          createSupportRequest(supportRequestData)
        );

        if (createSupportRequest.fulfilled.match(resultAction)) {
          toast.success(
            "Profile update request submitted successfully! An admin will review your changes."
          );
          setIsEditing(false);
        } else {
          throw new Error(resultAction.payload || "Failed to submit request");
        }
      }
    } catch (error) {
      toast.error(error.message);
      console.error("Update error:", error);
    }
  };

  const [showRequestConfirmModal, setShowRequestConfirmModal] = useState(false);

  const handleRequestCard = async () => {
    try {
      const userId = user?.id;

      if (!userId) {
        toast.error("User ID not found");
        return;
      }

      // Show confirmation modal
      setShowRequestConfirmModal(true);
    } catch (error) {
      console.error("Error in handleRequestCard:", error);
      const errorMessage =
        error?.message || error || "Failed to request club card";
      toast.error(errorMessage);
    }
  };

  const confirmCardRequest = async () => {
    try {
      const userId = user?.id;
      const isReplacement = cardRequest.disableCurrent === "Deactivate";
      const cardId = clubCard.cardId;

      console.log("Requesting club card for user:", userId);
      console.log("Is replacement:", isReplacement);

      const result = await dispatch(activateCard({ cardId, userId })).unwrap();

      if (result.success) {
        toast.success("Your club card request has been submitted.");

        // Optionally clear form or update UI
        setCardRequest({
          fullName: "",
          cardType: "Standard",
          disableCurrent: "Activate",
        });
        setIsEditingFullName(false);
      }

      setShowRequestConfirmModal(false);
    } catch (error) {
      console.error("Error requesting card:", error);
      const errorMessage =
        error?.message || error || "Failed to request club card";
      toast.error(errorMessage);

      setShowRequestConfirmModal(false);

      showModal({
        title: "Error",
        text: errorMessage,
        confirmText: "Try Again",
      });
    }
  };

  const cancelCardRequest = () => {
    console.log("Card request cancelled by user");
    setShowRequestConfirmModal(false);
  };

  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [pendingAction, setPendingAction] = useState(null);

  const handleSaveCardStatus = async () => {
    try {
      const userId = user?.id;
      const cardId = clubCard.cardId;

      if (!userId || !cardId) {
        toast.error("User ID or Card ID not found");
        return;
      }

      const action =
        cardRequest.disableCurrent === "Deactivate" ? "Deactivate" : "Activate";

      // Set pending action and show confirmation modal
      setPendingAction(action);
      setShowConfirmModal(true);
    } catch (error) {
      console.error("Error in handleSaveCardStatus:", error);
      const errorMessage =
        error?.message || error || "Failed to update card status";
      toast.error(errorMessage);
    }
  };

  const confirmCardAction = async () => {
    try {
      const userId = user?.id;
      const cardId = clubCard.cardId;

      console.log("Saving card status for user:", userId);
      console.log("Disable current setting:", cardRequest.disableCurrent);

      if (pendingAction === "Deactivate") {
        // Deactivate the card
        await dispatch(deactivateCard({ cardId, userId })).unwrap();
        console.log("Card deactivated");
        toast.success("Card deactivated successfully!");
      } else {
        // Activate the card
        await dispatch(activateCard({ cardId, userId })).unwrap();
        console.log("Card activated");
        toast.success("Card activated successfully!");
        localStorage.removeItem("authToken");
      }

      setIsEditingFullName(false);
      setShowConfirmModal(false);
      setPendingAction(null);
    } catch (error) {
      console.error("Error updating card status:", error);

      const errorMessage =
        error?.message || error || "Failed to update card status";
      toast.error(errorMessage);

      setShowConfirmModal(false);
      setPendingAction(null);
    }
  };

  const cancelCardAction = () => {
    console.log("Card action cancelled by user");
    setShowConfirmModal(false);
    setPendingAction(null);
  };

  const PaymentMethodModal = ({ onClose }) => {
    const paymentMethods = [
      { id: "apple-pay", logo: mastercard, name: "Apple Pay" },
      { id: "amazon-pay", logo: mastercard, name: "Amazon Pay" },
      { id: "samsung-pay", logo: mastercard, name: "Samsung Pay" },
      { id: "google-pay", logo: mastercard, name: "Google Pay" },
      { id: "mastercard", logo: mastercard, name: "Mastercard" },
      { id: "paypal", logo: mastercard, name: "PayPal" },
      { id: "visa", logo: mastercard, name: "Visa" },
      { id: "maestro", logo: mastercard, name: "Maestro" },
      { id: "cirrus", logo: mastercard, name: "Cirrus" },
    ];

    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
        <div className="bg-white rounded-3xl w-full max-w-lg p-6">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-semibold">
              Select your Payment Method
            </h2>
            <button onClick={onClose} className="text-[#540A26] font-medium">
              Back
            </button>
          </div>

          <div className="grid grid-cols-3 gap-4 mb-8">
            {paymentMethods.map((method) => (
              <div
                key={method.id}
                className="bg-white rounded-lg p-4 shadow-sm border hover:border-[#540A26] cursor-pointer transition-colors"
              >
                <img
                  src={method.logo}
                  alt={method.name}
                  className="w-full h-12 object-contain"
                />
              </div>
            ))}
          </div>

          <button className="w-full py-3 bg-[#540A26] text-white rounded-lg font-medium hover:bg-opacity-90 transition-opacity">
            Next
          </button>
        </div>
      </div>
    );
  };

  const interests = [
    "Art & Design",
    "Cigars",
    "Country Pursuits",
    "Dance",
    "Family Entertainment",
    "Fashion",
    "Film",
    "Food",
    "Literature",
    "Music/Dj",
    "Politics",
    "Sport",
  ];

  console.log(user);

  const TwoFAModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-96">
        <h3 className="text-lg font-semibold mb-4">
          {twoFAAction === "enable"
            ? "Enable"
            : twoFAAction === "change"
            ? "Change"
            : "Disable"}{" "}
          Two-Factor Authentication
        </h3>

        {twoFAAction === "enable" || twoFAAction === "change" ? (
          <div>
            <p className="text-gray-600 mb-4">
              You are about to{" "}
              {twoFAAction === "change"
                ? "change your 2FA method to"
                : "enable 2FA using"}{" "}
              {selectedMethod === "email" ? "email" : "phone"}:{" "}
              <strong>
                {selectedMethod === "email"
                  ? user?.twoFAEmail || user?.primaryEmail
                  : `+${user?.primaryPhone}`}
              </strong>
              {twoFAAction === "change" && (
                <span className="block mt-2 text-sm text-gray-500">
                  Your 2FA will remain enabled with the new method.
                </span>
              )}
            </p>
          </div>
        ) : (
          <div>
            <p className="text-gray-600 mb-4">
              Please enter your password to disable two-factor authentication.
            </p>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoFocus
              className="w-full p-3 border border-gray-300 rounded-lg mb-4"
            />
          </div>
        )}

        <div className="flex gap-3 justify-end">
          <button
            onClick={cancel2FAAction}
            className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50"
            disabled={isLoading}
          >
            Cancel
          </button>
          <button
            onClick={confirm2FAAction}
            disabled={isLoading || (twoFAAction === "disable" && !password)}
            className="px-4 py-2 bg-[#540A26] text-white rounded-lg hover:bg-[#6B0D32] disabled:opacity-50"
          >
            {isLoading ? "Processing..." : "Confirm"}
          </button>
        </div>
      </div>
    </div>
  );
  return (
    <div className="text-black">
      {/* Profile Header */}
      {showRequestView ? (
        <SupportRequestsView onBack={() => setShowRequestView(false)} />
      ) : (
        <>
          {showPaymentModal && (
            <PaymentMethodModal onClose={() => setShowPaymentModal(false)} />
          )}
          {show2FAModal && <TwoFAModal />}
          <div className="flex items-start gap-4 mb-6">
            <img
              src={user?.profilePhoto || avatar}
              alt="Profile"
              className="w-12 h-12 sm:w-20 sm:h-20 rounded-full object-cover"
            />
            <div className="flex-1">
              <h2 className="text-sm sm:text-xl font-semibold">
                {user?.forename} {user?.surname}
              </h2>
              <p className="text-xs sm:text-base text-gray-600 mb-1">
                Standard Member/{user.membershipNumber}
              </p>
              <p className="text-xs sm:text-base text-gray-500">
                {user?.primaryEmail}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button
                className="p-2 bg-gray-100 text-[#540A26] rounded-full"
                onClick={() => setShowRequestView(true)}
              >
                <BsChatDots size={18} />
              </button>

              <button
                className={`px-2 text-sm sm:text-base sm:px-6 py-1.5 sm:py-2 ${
                  isEditing ? "bg-green-600" : "bg-[#540A26]"
                } text-white rounded-lg`}
                onClick={isEditing ? handleSave : () => setIsEditing(true)}
              >
                {isEditing ? "Save" : "Edit"}
              </button>
            </div>
          </div>

          {/* Personal Information */}
          <div className="mb-4">
            <div
              className="flex justify-between items-center cursor-pointer"
              onClick={() => toggleSection("personalInfo")}
            >
              <h3 className="text-lg font-semibold font-primary text-[#323C47]">
                Personal Information
              </h3>
              {openSections.personalInfo ? <BsChevronUp /> : <BsChevronDown />}
            </div>

            {openSections.personalInfo && (
              <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                <div>
                  <label className="block mb-1 text-sm">Title*</label>
                  <select
                    value={personalInfo.title}
                    onChange={(e) =>
                      handlePersonalInfoChange("title", e.target.value)
                    }
                    disabled={!isEditing}
                    className={`w-full px-3 py-2 ${
                      isEditing ? "bg-white" : "bg-gray-50"
                    } rounded-lg border border-gray-200`}
                  >
                    <option value="">Select title</option>
                    <option value="Mr">Mr</option>
                    <option value="Mrs">Mrs</option>
                    <option value="Miss">Miss</option>
                    <option value="Ms">Ms</option>
                    <option value="Dr">Dr</option>
                  </select>
                </div>

                <div>
                  <label className="block mb-1 text-sm">Forename*</label>
                  <input
                    type="text"
                    value={personalInfo.forename}
                    onChange={(e) =>
                      handlePersonalInfoChange("forename", e.target.value)
                    }
                    disabled={!isEditing}
                    className={`w-full px-3 py-2 ${
                      isEditing ? "bg-white" : "bg-gray-50"
                    } rounded-lg border border-gray-200`}
                  />
                </div>
                <div>
                  <label className="block mb-1 text-sm">Surname*</label>
                  <input
                    type="text"
                    value={personalInfo.surname}
                    onChange={(e) =>
                      handlePersonalInfoChange("surname", e.target.value)
                    }
                    disabled={!isEditing}
                    className={`w-full px-3 py-2 ${
                      isEditing ? "bg-white" : "bg-gray-50"
                    } rounded-lg border border-gray-200`}
                  />
                </div>
                <div>
                  <label className="block mb-1 text-sm">Gender*</label>
                  {isEditing ? (
                    <select
                      value={personalInfo.gender}
                      onChange={(e) =>
                        handlePersonalInfoChange("gender", e.target.value)
                      }
                      disabled={!isEditing}
                      className={`w-full px-3 py-2 ${
                        isEditing ? "bg-white" : "bg-gray-50"
                      } rounded-lg border border-gray-200`}
                    >
                      <option value="">Select gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  ) : (
                    <div className="w-full px-3 py-2 bg-gray-50 rounded-lg border border-gray-200">
                      {personalInfo.gender}
                    </div>
                  )}
                </div>
                <div>
                  <label className="block mb-1 text-sm">Date of birth*</label>
                  {isEditing ? (
                    <input
                      type="date"
                      value={personalInfo.dob}
                      onChange={(e) =>
                        handlePersonalInfoChange("dob", e.target.value)
                      }
                      className="w-full px-3 py-2 bg-white rounded-lg border border-gray-200"
                    />
                  ) : (
                    <div className="w-full px-3 py-2 bg-gray-50 rounded-lg border border-gray-200">
                      {personalInfo.dob}
                    </div>
                  )}
                </div>
                <div>
                  <label className="block mb-1 text-sm">
                    Relationship Status*
                  </label>
                  {isEditing ? (
                    <select
                      value={personalInfo.relationshipStatus}
                      onChange={(e) =>
                        handlePersonalInfoChange(
                          "relationshipStatus",
                          e.target.value
                        )
                      }
                      disabled={!isEditing}
                      className={`w-full px-3 py-2 ${
                        isEditing ? "bg-white" : "bg-gray-50"
                      } rounded-lg border border-gray-200`}
                    >
                      <option value="">Select status</option>
                      <option value="Single">Single</option>
                      <option value="Married">Married</option>
                      <option value="Divorced">Divorced</option>
                      <option value="Widowed">Widowed</option>
                    </select>
                  ) : (
                    <div className="w-full px-3 py-2 bg-gray-50 rounded-lg border border-gray-200">
                      {personalInfo.relationshipStatus}
                    </div>
                  )}
                </div>
                <div>
                  <label className="block mb-1 text-sm">Nationality*</label>
                  {isEditing ? (
                    <CountrySelect
                      onChange={(country) =>
                        changeNationalityHandler(country, "nationality")
                      }
                      onTextChange={() =>
                        setPersonalInfo((prev) => ({
                          ...prev,
                          nationality: "",
                        }))
                      }
                      defaultValue={personalInfo.nationality}
                      placeHolder="Select Country"
                      style={{
                        width: "100%",
                        padding: "8px",
                        borderRadius: "5px",
                        border: "none",
                        fontSize: "16px",
                      }}
                    />
                  ) : (
                    <div className="w-full px-3 py-2 bg-gray-50 rounded-lg border border-gray-200">
                      {personalInfo.nationality}
                    </div>
                  )}
                </div>
                <div>
                  <label className="block mb-1 text-sm">
                    Additional Nationality*
                  </label>
                  {isEditing ? (
                    <CountrySelect
                      onChange={(country) =>
                        changeNationalityHandler(
                          country,
                          "additionalNationality"
                        )
                      }
                      onTextChange={() =>
                        setPersonalInfo((prev) => ({
                          ...prev,
                          additionalNationality: "",
                        }))
                      }
                      defaultValue={personalInfo.additionalNationality}
                      placeHolder="Select Country"
                      style={{
                        width: "100%",
                        padding: "8px",
                        borderRadius: "5px",
                        border: "none",
                        fontSize: "16px",
                      }}
                    />
                  ) : (
                    <div className="w-full px-3 py-2 bg-gray-50 rounded-lg border border-gray-200">
                      {personalInfo.additionalNationality}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Contact Details */}
          <div className="mb-4">
            <div
              className="flex justify-between items-center cursor-pointer"
              onClick={() => toggleSection("contactDetails")}
            >
              <h3 className="text-lg font-semibold font-primary text-[#323C47]">
                Contact Details
              </h3>
              {openSections.contactDetails ? (
                <BsChevronUp />
              ) : (
                <BsChevronDown />
              )}
            </div>

            {openSections.contactDetails && (
              <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block mb-1 text-sm">Address Line1*</label>
                  <input
                    type="text"
                    value={contactDetails.addressLine1}
                    onChange={(e) =>
                      handleContactDetailsChange("addressLine1", e.target.value)
                    }
                    disabled={!isEditing}
                    className={`w-full px-3 py-2 ${
                      isEditing ? "bg-white" : "bg-gray-50"
                    } rounded-lg border border-gray-200`}
                  />
                </div>
                <div>
                  <label className="block mb-1 text-sm">Town/City*</label>
                  <input
                    type="text"
                    value={contactDetails.townCity}
                    onChange={(e) =>
                      handleContactDetailsChange("townCity", e.target.value)
                    }
                    disabled={!isEditing}
                    className={`w-full px-3 py-2 ${
                      isEditing ? "bg-white" : "bg-gray-50"
                    } rounded-lg border border-gray-200`}
                  />
                </div>
                <div>
                  <label className="block mb-1 text-sm">Country*</label>
                  {isEditing ? (
                    <CountrySelect
                      onChange={(country) => {
                        handleContactDetailsChange("country", country.name);
                        setCountryId(country.id);
                        handleContactDetailsChange("state", "");
                      }}
                      onTextChange={() =>
                        setContactDetails((prev) => ({ ...prev, country: "" }))
                      }
                      defaultValue={contactDetails.country}
                      placeHolder="Select Country"
                      style={{
                        width: "100%",
                        padding: "8px",
                        borderRadius: "5px",
                        border: "none",
                        fontSize: "16px",
                      }}
                    />
                  ) : (
                    <div className="w-full px-3 py-2 bg-gray-50 rounded-lg border border-gray-200">
                      {contactDetails.country}
                    </div>
                  )}
                </div>
                <div>
                  <label className="block mb-1 text-sm">
                    Postcode/Zipcode*
                  </label>
                  <input
                    type="text"
                    value={contactDetails.postcodeZipcode}
                    onChange={(e) =>
                      handleContactDetailsChange(
                        "postcodeZipcode",
                        e.target.value
                      )
                    }
                    disabled={!isEditing}
                    className={`w-full px-3 py-2 ${
                      isEditing ? "bg-white" : "bg-gray-50"
                    } rounded-lg border border-gray-200`}
                  />
                </div>
                <div>
                  <label className="block mb-1 text-sm">Primary Email*</label>
                  <input
                    type="email"
                    value={contactDetails.primaryEmail}
                    onChange={(e) =>
                      handleContactDetailsChange("primaryEmail", e.target.value)
                    }
                    disabled={!isEditing}
                    className={`w-full px-3 py-2 ${
                      isEditing ? "bg-white" : "bg-gray-50"
                    } rounded-lg border border-gray-200`}
                  />
                </div>
                <div>
                  <label className="block mb-1 text-sm">Secondary Email*</label>
                  <input
                    type="email"
                    value={contactDetails.secondaryEmail}
                    onChange={(e) =>
                      handleContactDetailsChange(
                        "secondaryEmail",
                        e.target.value
                      )
                    }
                    disabled={!isEditing}
                    className={`w-full px-3 py-2 ${
                      isEditing ? "bg-white" : "bg-gray-50"
                    } rounded-lg border border-gray-200`}
                  />
                </div>
                <div>
                  <label className="block mb-1 text-sm">PrimaryPhone*</label>
                  <input
                    type="text"
                    value={contactDetails.primaryPhone}
                    onChange={(e) =>
                      handleContactDetailsChange("primaryPhone", e.target.value)
                    }
                    disabled={!isEditing}
                    className={`w-full px-3 py-2 ${
                      isEditing ? "bg-white" : "bg-gray-50"
                    } rounded-lg border border-gray-200`}
                  />
                </div>
                <div>
                  <label className="block mb-1 text-sm">Secondary Phone*</label>
                  <input
                    type="text"
                    value={contactDetails.secondaryPhone}
                    onChange={(e) =>
                      handleContactDetailsChange(
                        "secondaryPhone",
                        e.target.value
                      )
                    }
                    disabled={!isEditing}
                    className={`w-full px-3 py-2 ${
                      isEditing ? "bg-white" : "bg-gray-50"
                    } rounded-lg border border-gray-200`}
                  />
                </div>
                <div>
                  <label className="block mb-1 text-sm">State*</label>
                  {isEditing ? (
                    <StateSelect
                      countryid={countryId}
                      placeHolder="Select State"
                      onChange={(state) => {
                        handleContactDetailsChange("state", state.name);
                      }}
                      onTextChange={() =>
                        setContactDetails((prev) => ({ ...prev, state: "" }))
                      }
                      defaultValue={contactDetails.state}
                      style={{
                        width: "100%",
                        padding: "8px",
                        borderRadius: "5px",
                        border: "none",
                        fontSize: "16px",
                      }}
                    />
                  ) : (
                    <div className="w-full px-3 py-2 bg-gray-50 rounded-lg border border-gray-200">
                      {contactDetails.state}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Occupation & Interest */}
          <div className="mb-4">
            <div
              className="flex justify-between items-center cursor-pointer"
              onClick={() => toggleSection("occupation")}
            >
              <h3 className="text-lg font-semibold font-primary text-[#323C47]">
                Occupation & Interest
              </h3>
              {openSections.occupation ? <BsChevronUp /> : <BsChevronDown />}
            </div>

            {openSections.occupation && (
              <div className="mt-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                  <div>
                    <label className="block mb-1 text-sm">
                      Employment Status*
                    </label>
                    {isEditing ? (
                      <select
                        value={occupationInfo.employmentStatus}
                        onChange={(e) =>
                          handleOccupationInfoChange(
                            "employmentStatus",
                            e.target.value
                          )
                        }
                        disabled={!isEditing}
                        className={`w-full px-3 py-2 ${
                          isEditing ? "bg-white" : "bg-gray-50"
                        } rounded-lg border border-gray-200`}
                      >
                        <option value="">Select status</option>
                        <option value="Employed">Employed</option>
                        <option value="Self-employed">Self-employed</option>
                        <option value="Retired">Retired</option>
                        <option value="Student">Student</option>
                      </select>
                    ) : (
                      <div className="w-full px-3 py-2 bg-gray-50 rounded-lg border border-gray-200">
                        {occupationInfo.employmentStatus}
                      </div>
                    )}
                  </div>
                  <div>
                    <label className="block mb-1 text-sm">
                      Bussiness Name / Organization / Institution
                    </label>
                    <input
                      type="text"
                      value={occupationInfo.businessName}
                      onChange={(e) =>
                        handleOccupationInfoChange(
                          " businessName",
                          e.target.value
                        )
                      }
                      disabled={!isEditing}
                      className={`w-full px-3 py-2 ${
                        isEditing ? "bg-white" : "bg-gray-50"
                      } rounded-lg border border-gray-200`}
                    />
                  </div>
                  <div>
                    <label className="block mb-1 text-sm">
                      member of a club?*
                    </label>
                    <input
                      type="text"
                      value={occupationInfo.memberOfClub}
                      onChange={(e) =>
                        handleOccupationInfoChange(
                          "memberOfClub",
                          e.target.value
                        )
                      }
                      disabled={!isEditing}
                      className={`w-full px-3 py-2 ${
                        isEditing ? "bg-white" : "bg-gray-50"
                      } rounded-lg border border-gray-200`}
                    />
                  </div>
                  <div>
                    <label className="block mb-1 text-sm">
                      Prefered Social Media*
                    </label>
                    {isEditing ? (
                      <select
                        value={occupationInfo.preferredSocialMedia}
                        onChange={(e) =>
                          handleOccupationInfoChange(
                            "preferredSocialMedia",
                            e.target.value
                          )
                        }
                        disabled={!isEditing}
                        className={`w-full px-3 py-2 ${
                          isEditing ? "bg-white" : "bg-gray-50"
                        } rounded-lg border border-gray-200`}
                      >
                        <option value="">Select platform</option>
                        <option value="Facebook">Facebook</option>
                        <option value="Instagram">Instagram</option>
                        <option value="Twitter">Twitter</option>
                        <option value="LinkedIn">LinkedIn</option>
                      </select>
                    ) : (
                      <div className="w-full px-3 py-2 bg-gray-50 rounded-lg border border-gray-200">
                        {occupationInfo.preferredSocialMedia}
                      </div>
                    )}
                  </div>
                  <div>
                    <label className="block mb-1 text-sm">
                      Secondary Phone*
                    </label>
                    <input
                      type="text"
                      value={occupationInfo.secondaryPhone}
                      onChange={(e) =>
                        handleOccupationInfoChange(
                          "secondaryPhone",
                          e.target.value
                        )
                      }
                      disabled={!isEditing}
                      className={`w-full px-3 py-2 ${
                        isEditing ? "bg-white" : "bg-gray-50"
                      } rounded-lg border border-gray-200`}
                    />
                  </div>
                </div>

                <h4 className="font-medium mb-3">Your Interests</h4>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-y-4">
                  {user?.userInterests?.length > 0 ? (
                    user.userInterests.map((interest, index) => (
                      <div key={index} className="flex items-center">
                        <span className="text-sm">{interest}</span>
                      </div>
                    ))
                  ) : (
                    <p className=" text-sm col-span-full">
                      No interests selected
                    </p>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Your Referrals */}
          <div className="mb-4">
            <div
              className="flex justify-between items-center cursor-pointer"
              onClick={() => toggleSection("referrals")}
            >
              <h3 className="text-lg font-semibold font-primary text-[#323C47]">
                Your Referrals{" "}
                <span className="text-sm font-normal">
                  (who approved your registration)
                </span>
              </h3>
              {openSections.referrals ? <BsChevronUp /> : <BsChevronDown />}
            </div>

            {openSections.referrals && (
              <div className="mt-4 space-y-3">
                {user?.referredBy?.length > 0 ? (
                  <ReferralsList referredBy={user.referredBy} />
                ) : (
                  <p className="text-gray-500">No referrals found</p>
                )}
              </div>
            )}
          </div>

          {/* Two Factor Authentication */}
          <div className="mt-8">
            <h3 className="font-semibold mb-4">
              Enable/disable Two Factor authentication
            </h3>
            <div className="space-y-3">
              <div className="flex flex-col sm:flex-row items-center justify-between">
                <div className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="twoFAMethod"
                    value="disabled"
                    checked={!user?.is2FAEnabled}
                    onChange={() => {
                      if (user?.is2FAEnabled) {
                        setTwoFAAction("disable");
                        setShow2FAModal(true);
                      }
                    }}
                    className="w-4 h-4 accent-[#540A26]"
                    readOnly
                  />
                  <span>Two-factor authentication disabled</span>
                </div>
                <span className="text-gray-500 text-sm">
                  {user?.is2FAEnabled
                    ? `2FA Enabled ${
                        user?.updatedAt
                          ? new Date(user.updatedAt).toLocaleDateString(
                              "en-US",
                              {
                                month: "short",
                                year: "numeric",
                              }
                            )
                          : "recently"
                      }`
                    : "2FA Not enabled"}
                </span>
              </div>
              <div className="flex flex-col sm:flex-row items-center justify-between">
                <div className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="twoFAMethod"
                    value="email"
                    checked={
                      user?.is2FAEnabled && user?.twoFAMethod === "email"
                    }
                    onChange={() => handle2FAChange("email")}
                    className="w-4 h-4 accent-[#540A26]"
                    readOnly
                  />
                  <span>
                    {user?.twoFAEmail || user?.primaryEmail || "No email set"}
                  </span>
                </div>
                <span className="text-gray-500 text-sm">
                  {user?.is2FAEnabled && user?.twoFAMethod === "email"
                    ? `Enabled ${
                        user?.updatedAt
                          ? new Date(user.updatedAt).toLocaleDateString(
                              "en-US",
                              {
                                month: "short",
                                year: "numeric",
                              }
                            )
                          : "recently"
                      }`
                    : "Not enabled"}
                </span>
              </div>
              <div className="flex flex-col sm:flex-row items-center justify-between">
                <div className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="twoFAMethod"
                    value="phone"
                    checked={
                      user?.is2FAEnabled && user?.twoFAMethod === "phone"
                    }
                    onChange={() => handle2FAChange("phone")}
                    className="w-4 h-4 accent-[#540A26]"
                    readOnly
                  />
                  <span>{`+${user?.primaryPhone}` || "No phone set"}</span>
                </div>
                <span className="text-gray-500 text-sm">
                  {user?.is2FAEnabled && user?.twoFAMethod === "phone"
                    ? `Enabled ${
                        user?.updatedAt
                          ? new Date(user.updatedAt).toLocaleDateString(
                              "en-US",
                              {
                                month: "short",
                                year: "numeric",
                              }
                            )
                          : "recently"
                      }`
                    : "Not enabled"}
                </span>
              </div>
            </div>
          </div>
          {showConfirmModal && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white rounded-lg w-full max-w-md p-6">
                <h3 className="text-lg font-semibold mb-4">
                  Confirm Card Action
                </h3>
                <p className="text-gray-600 mb-6">
                  Are you sure you want to {pendingAction} your club card? This
                  action will{" "}
                  {pendingAction === "Deactivate" ? "disable" : "enable"} your
                  card access.
                </p>

                <div className="flex justify-end gap-3">
                  <button
                    onClick={cancelCardAction}
                    className="px-4 py-2 text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={confirmCardAction}
                    disabled={activating || deactivating}
                    className="px-4 py-2 bg-[#540A26] text-white rounded-lg hover:bg-opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {activating || deactivating ? (
                      <span className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        {pendingAction === "Deactivate"
                          ? "Deactivating..."
                          : "Activating..."}
                      </span>
                    ) : (
                      `Yes, ${pendingAction}`
                    )}
                  </button>
                </div>
              </div>
            </div>
          )}
          {showRequestConfirmModal && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white rounded-lg w-full max-w-md p-6">
                <h3 className="text-lg font-semibold mb-4">
                  Confirm Card Request
                </h3>
                <div className="text-gray-600 mb-6">
                  <p className="mb-3">
                    Are you sure you want to request a new club card?
                  </p>

                  {/* Show current card status information */}
                  {clubCard.isActive && (
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-3">
                      <p className="text-blue-800 text-sm">
                        <strong>Note:</strong> You currently have an active
                        card.
                        {cardRequest.disableCurrent === "Deactivate"
                          ? " This request will disable your current card and issue a replacement."
                          : " You will have both cards active until you choose to disable one."}
                      </p>
                    </div>
                  )}

                  {!clubCard.isActive && (
                    <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-3">
                      <p className="text-green-800 text-sm">
                        <strong>Note:</strong> Your current card is inactive.
                        This new card will become your active card.
                      </p>
                    </div>
                  )}

                  {/* <p className="font-semibold">Total cost: £15</p> */}
                </div>

                <div className="flex justify-end gap-3">
                  <button
                    onClick={cancelCardRequest}
                    className="px-4 py-2 text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={confirmCardRequest}
                    className="px-4 py-2 bg-[#540A26] text-white rounded-lg hover:bg-opacity-90 transition-opacity"
                  >
                    Yes, Request Card
                  </button>
                </div>
              </div>
            </div>
          )}
          {/* Request a New Club Card */}
          <div className="mt-8">
            <h3 className="font-semibold mb-4">Request a New Club Card</h3>
            <div className="border border-gray-400 rounded-lg p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-1">
                  <label className="block mb-2">Full name</label>
                  <div className="relative">
                    <input
                      type="text"
                      value={cardRequest.fullName}
                      disabled={true}
                      className={`w-full px-4 py-3 ${
                        isEditing ? "bg-[#f9f9f9]" : "bg-gray-50"
                      } rounded-lg border border-gray-200`}
                    />
                    {/* <button
                      className="absolute right-3 top-1/2 -translate-y-1/2"
                      onClick={() => setIsEditingFullName(true)}
                    >
                      <BsPencil className="text-gray-500" />
                    </button> */}
                  </div>
                </div>

                <div className="md:col-span-1 md:row-span-3 md:justify-self-end md:mt-0">
                  <div className="p-4 rounded-lg">
                    <h4 className="font-medium mb-2">Payment Summary:</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>Club Card Fee:</span>
                        <span className="font-medium">£15</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Shipping Fee:</span>
                        <span className="font-medium">£0</span>
                      </div>
                      <div className="border-t border-gray-300 my-2 pt-2 flex justify-between">
                        <span>Total:</span>
                        <span className="font-medium">£15</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="md:col-span-1">
                  <label className="block mb-2">Card Type</label>
                  <div className="relative">
                    <input
                      type="text"
                      value={clubCard?.cardType || ""}
                      disabled={true}
                      className={`w-full px-4 py-3 ${
                        isEditing ? "bg-[#f9f9f9]" : "bg-gray-50"
                      } rounded-lg border border-gray-200`}
                    />
                    {/* <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                      <svg
                        className="w-4 h-4 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M19 9l-7 7-7-7"
                        ></path>
                      </svg>
                    </div> */}
                  </div>
                </div>

                <div className="md:col-span-2">
                  <label className="block mb-2">Club Card Status</label>
                  <div className="flex flex-col sm:flex-row items-center">
                    <div className="relative flex-1 ">
                      <select
                        className="w-full px-4 py-3  bg-[#f9f9f9] text-gray-500 rounded-lg border border-gray-200 appearance-none"
                        value={cardRequest.disableCurrent}
                        onChange={(e) =>
                          setCardRequest({
                            ...cardRequest,
                            disableCurrent: e.target.value,
                          })
                        }
                      >
                        <option>Activate</option>
                        <option>Deactivate</option>
                      </select>
                      <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                        <svg
                          className="w-4 h-4 text-gray-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M19 9l-7 7-7-7"
                          ></path>
                        </svg>
                      </div>
                    </div>
                    <div className="md:col-span-2 mt-6 flex-1">
                      <div className="flex justify-end gap-3">
                        <button
                          className="text-sm sm:text-base px-2 sm:px-6 py-1 border border-gradient_r text-[#444444] rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
                          disabled={
                            activating || deactivating || !clubCard.cardId
                          }
                          onClick={handleSaveCardStatus}
                        >
                          {activating || deactivating ? (
                            <span className="flex items-center gap-2">
                              <div className="w-4 h-4 border-2 border-gray-300 border-t-[#540A26] rounded-full animate-spin"></div>
                              {cardRequest.disableCurrent === "Deactivate"
                                ? "Deactivating..."
                                : "Activating..."}
                            </span>
                          ) : (
                            "Save"
                          )}
                        </button>
                        <button
                          className="text-sm sm:text-base px-2 sm:px-6 py-2 bg-gradient-to-r from-gradient_r to-gradient_g text-white rounded-lg"
                          onClick={handleRequestCard}
                        >
                          Request New Club Card
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {showRequestModal && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white rounded-lg w-full max-w-4xl p-6 max-h-[90vh] overflow-y-auto">
                <div className="flex justify-between items-center mb-4">
                  <button className="flex items-center gap-2 text-gray-700">
                    <span>←</span> Back
                  </button>
                  <button
                    onClick={() => setShowRequestModal(false)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    ✕
                  </button>
                </div>

                <div className="mb-6">
                  <div className="flex flex-col sm:flex-row space-x-0 sm:space-x-2 mb-4">
                    <button className="px-4 py-2 rounded-lg bg-white border border-gray-300">
                      All Requests
                    </button>
                    <button className="px-4 py-2 rounded-lg bg-[#540A26] text-white">
                      Approved Requests
                    </button>
                    <button className="px-4 py-2 rounded-lg bg-white border border-gray-300">
                      Pending Requests
                    </button>
                    <button className="px-4 py-2 rounded-lg bg-white border border-gray-300">
                      Declined Requests
                    </button>
                  </div>

                  <div className="flex justify-end mb-4">
                    <button className="px-4 py-2 bg-[#540A26] text-white rounded-lg">
                      Add Support Request
                    </button>
                  </div>

                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="text-left">
                        <th className="pb-2">No</th>
                        <th className="pb-2">Type</th>
                        <th className="pb-2">Submission Date</th>
                        <th className="pb-2">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-t">
                        <td className="py-4">1</td>
                        <td>Evidence Review</td>
                        <td>Jan 16, 2025</td>
                        <td className="text-green-500">Approved</td>
                      </tr>
                      <tr className="border-t">
                        <td className="py-4">1</td>
                        <td>Evidence Review</td>
                        <td>Jan 16, 2025</td>
                        <td className="text-green-500">Approved</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

const ReferralsList = ({ referredBy }) => {
  const [referrals, setReferrals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReferrals = async () => {
      try {
        // Extract user IDs from referredBy array

        const referralIds = referredBy
          .filter((ref) => ref.status === "approved")
          .map((ref) => ref.userId);

        if (referralIds.length > 0) {
          // Fetch referral user details
          const referralUsers = await referralService.fetchReferralbyIds(
            referralIds
          );

          const approvedReferrals = referredBy
            .filter((ref) => ref.status === "approved")
            .map((ref, index) => ({
              ...ref,
              user: referralUsers[index], // Now indexes match since we filtered both arrays
            }));

          setReferrals(approvedReferrals);
        }
      } catch (error) {
        console.error("Error fetching referrals:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchReferrals();
  }, [referredBy]);
  console.log(referrals);
  if (loading) {
    return <p className="text-gray-500">Loading referrals...</p>;
  }

  return (
    <>
      {referrals.map((referral, index) => (
        <div
          key={index}
          className="flex flex-col sm:flex-row items-center justify-between border-b pb-2"
        >
          <div className="flex items-center gap-3">
            <img
              src={referral.user?.profilePhoto || avatar}
              alt="Referral"
              className="w-8 h-8 rounded-full"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = avatar;
              }}
            />
            <span>{referral.user?.name || ""}</span>
          </div>
          <span className="text-sm text-gray-500">
            {referral.status === "approved" ? "Approved" : "Pending"} on{" "}
            {new Date(
              referral.referDate || referral.createdAt
            ).toLocaleDateString("en-US", {
              day: "numeric",
              month: "short",
              year: "numeric",
            })}
          </span>
        </div>
      ))}
    </>
  );
};

export default StandardProfile;
