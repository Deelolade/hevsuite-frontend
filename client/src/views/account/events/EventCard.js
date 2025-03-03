import React, { useState } from "react";
import { BsCalendar } from "react-icons/bs";
import { HiOutlineArrowRight } from "react-icons/hi";
import Modal from "react-modal";
import { IoClose } from "react-icons/io5";

Modal.setAppElement("#root");

const EventCard = ({ event, activeTab }) => {
  const [isAcceptModalOpen, setIsAcceptModalOpen] = useState(false);
  const [isDeclineModalOpen, setIsDeclineModalOpen] = useState(false);
  const [isRemoveModalOpen, setIsRemoveModalOpen] = useState(false);
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);

  const getActionButtons = () => {
    switch (activeTab) {
      case "Invited Events":
        return (
          <>
            <button
              onClick={() => setIsAcceptModalOpen(true)}
              className="w-full bg-[#0E5B31] text-white py-2 rounded-lg mb-2 hover:bg-[#0a4526] transition-colors"
            >
              Accept
            </button>
            <button
              onClick={() => setIsDeclineModalOpen(true)}
              className="w-full bg-primary text-white py-2 rounded-lg mb-2 hover:bg-[#4a0921] transition-colors"
            >
              Decline
            </button>
          </>
        );
      case "Saved Events":
        return (
          <button
            onClick={() => setIsRemoveModalOpen(true)}
            className="w-full bg-primary text-white py-2 rounded-lg mb-2 hover:bg-[#4a0921] transition-colors"
          >
            Remove
          </button>
        );
      case "Attending Events":
        return (
          <button
            onClick={() => setIsCancelModalOpen(true)}
            className="w-full bg-primary text-white py-2 rounded-lg mb-2 hover:bg-[#4a0921] transition-colors"
          >
            Cancel Attendance
          </button>
        );
      case "Past Events":
        return (
          <button className="w-full bg-[#0E5B31] text-white py-2 rounded-lg mb-2 cursor-default">
            Attended
          </button>
        );
      default:
        return null;
    }
  };

  const renderModal = (
    isOpen,
    onClose,
    title,
    message,
    confirmText,
    onConfirm,
    icon
  ) => (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg p-4 sm:p-6 w-[90%] max-w-[500px]"
      overlayClassName="fixed inset-0 bg-black bg-opacity-50"
      style={{
        overlay: { zIndex: 1000 },
      }}
    >
      <div className="relative">
        <div className="flex justify-between items-center mb-4 sm:mb-6">
          <h2 className="text-lg sm:text-xl font-semibold flex items-center gap-2">
            <span className={icon === "✓" ? "text-green-500" : "text-red-500"}>
              {icon}
            </span>
            {title}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <IoClose size={24} />
          </button>
        </div>

        <p className="text-gray-600 mb-6">{message}</p>

        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 sm:px-6 py-2 border rounded-lg text-sm"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className={`px-4 sm:px-6 py-2 text-white rounded-lg text-sm ${
              icon === "✓"
                ? "bg-[#0E5B31] hover:bg-[#0a4526]"
                : "bg-primary hover:bg-[#4a0921]"
            }`}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </Modal>
  );

  const renderDetailsModal = () => (
    <Modal
      isOpen={isDetailsModalOpen}
      onRequestClose={() => setIsDetailsModalOpen(false)}
      className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg p-4 sm:p-6 w-[90%] max-w-[600px]"
      overlayClassName="fixed inset-0 bg-black bg-opacity-50"
      style={{
        overlay: { zIndex: 1000 },
      }}
    >
      <div className="relative">
        <div className="flex justify-between items-center mb-4 sm:mb-6">
          <h2 className="text-lg sm:text-xl font-semibold">{event.title}</h2>
          <button
            onClick={() => setIsDetailsModalOpen(false)}
            className="text-gray-400 hover:text-gray-600"
          >
            <IoClose size={24} />
          </button>
        </div>

        <div className="space-y-4">
          <img
            src={event.image}
            alt={event.title}
            className="w-full h-48 sm:h-64 object-cover rounded-lg"
          />

          <div className="flex items-center gap-2 text-sm text-gray-600">
            <BsCalendar />
            <span>{event.date}</span>
            <span>{event.time}</span>
          </div>

          <div className="space-y-2">
            <h3 className="font-medium">Description</h3>
            <p className="text-gray-600 text-sm">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
          </div>

          <div className="space-y-2">
            <h3 className="font-medium">Location</h3>
            <p className="text-gray-600 text-sm">
              123 Event Street, City, Country
            </p>
          </div>

          <div className="space-y-2">
            <h3 className="font-medium">Organizer</h3>
            <p className="text-gray-600 text-sm">John Doe</p>
          </div>
        </div>

        <div className="flex justify-end mt-6">
          <button
            onClick={() => setIsDetailsModalOpen(false)}
            className="px-4 sm:px-6 py-2 border rounded-lg text-sm"
          >
            Close
          </button>
        </div>
      </div>
    </Modal>
  );

  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-sm border border-gray-100">
      <img
        src={event.image}
        alt={event.title}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="font-medium mb-2 text-lg font-secondary text-[#121212]">
          {event.title}
        </h3>
        <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
          <BsCalendar />
          <span>{event.date}</span>
          <span>{event.time}</span>
        </div>
        {getActionButtons()}
        {activeTab !== "Invited Events" && (
          <button
            onClick={() => setIsDetailsModalOpen(true)}
            className="w-full flex items-center justify-between px-2 text-gray-600 hover:text-gray-800"
          >
            <span>View Details</span>
            <HiOutlineArrowRight />
          </button>
        )}
      </div>

      {renderModal(
        isAcceptModalOpen,
        () => setIsAcceptModalOpen(false),
        "Accept Event",
        "Are you sure you want to accept this event invitation?",
        "Accept",
        () => {
          // Add accept logic here
          console.log("Event accepted");
        },
        "✓"
      )}

      {renderModal(
        isDeclineModalOpen,
        () => setIsDeclineModalOpen(false),
        "Decline Event",
        "Are you sure you want to decline this event invitation?",
        "Decline",
        () => {
          // Add decline logic here
          console.log("Event declined");
        },
        "⚠"
      )}

      {renderModal(
        isRemoveModalOpen,
        () => setIsRemoveModalOpen(false),
        "Remove Event",
        "Are you sure you want to remove this event from your saved events?",
        "Remove",
        () => {
          // Add remove logic here
          console.log("Event removed from saved");
        },
        "⚠"
      )}

      {renderModal(
        isCancelModalOpen,
        () => setIsCancelModalOpen(false),
        "Cancel Attendance",
        "Are you sure you want to cancel your attendance to this event?",
        "Cancel Attendance",
        () => {
          // Add cancel attendance logic here
          console.log("Attendance cancelled");
        },
        "⚠"
      )}

      {renderDetailsModal()}
    </div>
  );
};

export default EventCard;
