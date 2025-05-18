import React, { useState } from "react";
import { HiOutlineMail } from "react-icons/hi";
import { useDispatch } from "react-redux";
import { inviteUser } from "../../../store/users/userSlice";
import toast from "react-hot-toast";
import Modal from "react-modal";

Modal.setAppElement('#root');

const InviteUsers = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");

  const handleInvite = async () => {
    if (!email) {
      toast.error("Please enter an email address");
      return;
    }

    try {
      await dispatch(inviteUser(email)).unwrap();
      onClose();
      setEmail("");
    } catch (error) {
      // Error handling is already done in the Redux slice
      console.error("Failed to invite user:", error);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className="fixed inset-0 flex items-center justify-center"
      overlayClassName="fixed inset-0 bg-black bg-opacity-50"
    >
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
        <div className="p-8 flex flex-col items-center">
          <h2 className="text-3xl font-medium font-secondary text-center mb-8">
            Invite New Users
          </h2>
          <div className="relative w-full">
            <HiOutlineMail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />
            <input
              type="email"
              placeholder="Enter Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-2xl border border-gray-200 focus:outline-none focus:border-primary text-sm"
            />
          </div>
          <div className="flex gap-4 w-full mt-6">
            <button
              onClick={onClose}
              className="flex-1 py-3 rounded-2xl text-sm font-medium border border-gray-200 hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleInvite}
              className="flex-1 bg-primary font-secondary text-white py-3 rounded-2xl text-sm font-medium hover:bg-primary/90 transition-colors"
            >
              Invite
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default InviteUsers;
