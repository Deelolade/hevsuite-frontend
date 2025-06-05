import React, { useState } from "react";
import { FaTrash, FaUser } from "react-icons/fa";
import Modal from "../components/Modal";
import PasswordInput from "../components/PasswordInput";
import profileService from "../../../../services/profileService";
import toast from "react-hot-toast";

const DeleteMembershipSection = () => {
  const [showDeactivateModal, setShowDeactivateModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const userId = "6824454697235380416bbbb3"; // Replace with actual userId

  const handleDeactivateMembership = async () => {
    if (!password) {
      toast.error("Please enter your password");
      return;
    }

    setIsLoading(true);
    try {
      const response = await profileService.deActivateAccount({
        userId,
        password,
      });

      if (response.success) {
        toast.success("Account deactivated successfully!");
        setShowDeactivateModal(false);
        setPassword("");
      } else {
        throw new Error(response.message || "Failed to deactivate account");
      }
    } catch (error) {
      console.error("Error deactivating account:", error);
      toast.error(error.message || "Failed to deactivate account");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteMembership = async () => {
    if (!password) {
      toast.error("Please enter your password");
      return;
    }

    setIsLoading(true);
    try {
      const response = await profileService.deleteAccount({
        userId,
        password,
      });

      if (response.success) {
        toast.success("Account deleted successfully!");
        setShowDeleteModal(false);
        setPassword("");
      } else {
        throw new Error(response.message || "Failed to delete account");
      }
    } catch (error) {
      console.error("Error deleting account:", error);
      toast.error(error.message || "Failed to delete account");
    } finally {
      setIsLoading(false);
    }
  };

  const DeactivateModal = () => (
    <Modal
      isOpen={showDeactivateModal}
      onClose={() => {
        setShowDeactivateModal(false);
        setPassword("");
      }}
    >
      <div className="text-center">
        <div className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-3 sm:mb-4 flex items-center justify-center">
          <FaUser className="text-[#540A26]" size={24} />
        </div>
        <h3 className="text-lg sm:text-xl font-medium mb-2">
          Are you sure you want to deactivate your membership?
        </h3>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleDeactivateMembership();
          }}
          className="mt-4 sm:mt-6"
        >
          <PasswordInput
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="flex gap-2 sm:gap-4 mt-4 sm:mt-6">
            <button
              type="button"
              onClick={() => {
                setShowDeactivateModal(false);
                setPassword("");
              }}
              className="flex-1 p-2 sm:p-3 border border-gray-300 rounded-lg text-sm sm:text-base"
              disabled={isLoading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className={`flex-1 p-2 sm:p-3 bg-[#540A26] text-white rounded-lg text-sm sm:text-base ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
              disabled={isLoading}
            >
              {isLoading ? "Deactivating..." : "Deactivate"}
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );

  const DeleteModal = () => (
    <Modal
      isOpen={showDeleteModal}
      onClose={() => {
        setShowDeleteModal(false);
        setPassword("");
      }}
    >
      <div className="text-center">
        <div className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-3 sm:mb-4 flex items-center justify-center">
          <FaTrash className="text-[#540A26]" size={24} />
        </div>
        <h3 className="text-lg sm:text-xl font-medium mb-2">
          Are you sure you want to delete your membership?
        </h3>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleDeleteMembership();
          }}
          className="mt-4 sm:mt-6"
        >
          <PasswordInput
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="flex gap-2 sm:gap-4 mt-4 sm:mt-6">
            <button
              type="button"
              onClick={() => {
                setShowDeleteModal(false);
                setPassword("");
              }}
              className="flex-1 p-2 sm:p-3 border border-gray-300 rounded-lg text-sm sm:text-base"
              disabled={isLoading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className={`flex-1 p-2 sm:p-3 bg-[#540A26] text-white rounded-lg text-sm sm:text-base ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
              disabled={isLoading}
            >
              {isLoading ? "Deleting..." : "Delete"}
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );

  return (
    <div className="mt-4 sm:mt-6 md:mt-8 space-y-6 sm:space-y-8">
      <div className="flex flex-col sm:flex-row justify-between sm:items-start gap-3 sm:gap-4">
        <div className="max-w-xl">
          <h3 className="font-medium mb-1 sm:mb-2 text-base sm:text-lg">
            Deactivate Membership
          </h3>
          <p className="text-xs sm:text-sm text-gray-500 leading-relaxed">
            Deactivating your account is temporary, and it means your profile
            will be hidden until you reactivate it by logging in.
          </p>
        </div>
        <button
          onClick={() => setShowDeactivateModal(true)}
          className="px-3 sm:px-4 py-1.5 sm:py-2 bg-[#540A26] text-white rounded-lg text-sm sm:text-base self-start sm:self-auto"
        >
          Deactivate
        </button>
      </div>

      <div className="flex flex-colAPPROVE sm:flex-row justify-between sm:items-start gap-3 sm:gap-4">
        <div className="max-w-xl">
          <h3 className="font-medium mb-1 sm:mb-2 text-base sm:text-lg">
            Delete Membership
          </h3>
          <p className="text-xs sm:text-sm text-gray-500 leading-relaxed">
            Deleting your account is permanent. When you delete your personal
            information will permanently deleted if you'd just like to take a
            break, you can temporarily deactivate your account.
          </p>
        </div>
        <button
          onClick={() => setShowDeleteModal(true)}
          className="px-3 sm:px-6 py-1.5 sm:py-2 border border-gray-300 rounded-lg text-sm sm:text-base self-start sm:self-auto"
        >
          Delete
        </button>
      </div>
      <DeactivateModal />
      <DeleteModal />
    </div>
  );
};

export default DeleteMembershipSection;