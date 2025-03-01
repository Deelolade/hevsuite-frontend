import React, { useState } from "react";
import { FaTrash, FaUser } from "react-icons/fa";
import Modal from "../components/Modal";
import PasswordInput from "../components/PasswordInput";

const DeleteMembershipSection = () => {
  const [showDeactivateModal, setShowDeactivateModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const DeactivateModal = () => (
    <Modal
      isOpen={showDeactivateModal}
      onClose={() => setShowDeactivateModal(false)}
    >
      <div className="text-center">
        <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center">
          <FaUser className="text-[#540A26]" size={32} />
        </div>
        <h3 className="text-xl font-medium mb-2">
          Are you sure You want to Deactivate your membership?
        </h3>
        <div className="mt-6">
          <PasswordInput />
        </div>
        <div className="flex gap-4 mt-6">
          <button
            onClick={() => setShowDeactivateModal(false)}
            className="flex-1 p-3 border border-gray-300 rounded-lg"
          >
            Cancel
          </button>
          <button className="flex-1 p-3 bg-[#540A26] text-white rounded-lg">
            Deactivate
          </button>
        </div>
      </div>
    </Modal>
  );

  const DeleteModal = () => (
    <Modal isOpen={showDeleteModal} onClose={() => setShowDeleteModal(false)}>
      <div className="text-center">
        <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center">
          <FaTrash className="text-[#540A26]" size={32} />
        </div>
        <h3 className="text-xl font-medium mb-2">
          Are you sure You want to Delete your membership?
        </h3>
        <div className="mt-6">
          <PasswordInput />
        </div>
        <div className="flex gap-4 mt-6">
          <button
            onClick={() => setShowDeleteModal(false)}
            className="flex-1 p-3 border border-gray-300 rounded-lg"
          >
            Cancel
          </button>
          <button className="flex-1 p-3 bg-[#540A26] text-white rounded-lg">
            Delete
          </button>
        </div>
      </div>
    </Modal>
  );

  return (
    <div className="mt-8 space-y-8">
      <div className="flex justify-between items-start">
        <div className="max-w-xl">
          <h3 className="font-medium mb-2">Deactivate Membership</h3>
          <p className="text-sm text-gray-500 leading-relaxed">
            Deactivating your account is temporary, and it means your profile
            will be hidden until you reactivate it by logging in.
          </p>
        </div>
        <button
          onClick={() => setShowDeactivateModal(true)}
          className="px-4 py-2 bg-[#540A26] text-white rounded-lg"
        >
          Deactivate
        </button>
      </div>

      <div className="flex justify-between items-start">
        <div className="max-w-xl">
          <h3 className="font-medium mb-2">Delete Membership</h3>
          <p className="text-sm text-gray-500 leading-relaxed">
            Deleting your account is permanent. When you delete your personal
            information will permanently deleted if you'd just like to take a
            break, you can temporarily deactivate your account.
          </p>
        </div>
        <button
          onClick={() => setShowDeleteModal(true)}
          className="px-6 py-2 border border-gray-300 rounded-lg"
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
