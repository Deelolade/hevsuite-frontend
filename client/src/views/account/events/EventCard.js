import React, { useState } from "react";
import { BsCalendar } from "react-icons/bs";
import { HiOutlineArrowRight } from "react-icons/hi";
import Modal from "react-modal";
import { IoClose } from "react-icons/io5";

const EventCard = ({ event, activeTab }) => {
  const [isAcceptModalOpen, setIsAcceptModalOpen] = useState(false);
  const [isDeclineModalOpen, setIsDeclineModalOpen] = useState(false);
  const [isRemoveModalOpen, setIsRemoveModalOpen] = useState(false);
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);

  const modalStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      transform: "translate(-50%, -50%)",
      maxWidth: "400px",
      width: "90%",
      padding: "24px",
      border: "none",
      borderRadius: "24px",
      backgroundColor: "white",
    },
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.75)",
    },
  };

  const getActionButtons = () => {
    switch (activeTab) {
      case "Invited Events":
        return (
          <>
            <button
              onClick={() => setIsAcceptModalOpen(true)}
              className="w-full bg-[#0E5B31] text-white py-2 rounded-lg mb-2"
            >
              Accept
            </button>
            <button
              onClick={() => setIsDeclineModalOpen(true)}
              className="w-full bg-primary text-white py-2 rounded-lg mb-2"
            >
              Decline
            </button>
          </>
        );
      case "Saved Events":
        return (
          <button
            onClick={() => setIsRemoveModalOpen(true)}
            className="w-full bg-primary text-white py-2 rounded-lg mb-2"
          >
            Remove
          </button>
        );
      case "Attending Events":
        return (
          <button
            onClick={() => setIsCancelModalOpen(true)}
            className="w-full bg-primary text-white py-2 rounded-lg mb-2"
          >
            Cancel Attendance
          </button>
        );
      case "Past Events":
        return (
          <button className="w-full bg-[#0E5B31] text-white py-2 rounded-lg mb-2">
            Attended
          </button>
        );
      default:
        return null;
    }
  };

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
        <button className="w-full flex items-center justify-between px-2 text-gray-600 hover:text-gray-800">
          {activeTab !== "Invited Events" && (
            <button className="w-full flex items-center justify-between px-2 text-gray-600 hover:text-gray-800">
              <span>View Details</span>
              <HiOutlineArrowRight />
            </button>
          )}
        </button>
      </div>

      <Modal
        isOpen={isAcceptModalOpen}
        onRequestClose={() => setIsAcceptModalOpen(false)}
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-100 bg-white rounded-lg w-[600px] max-h-[80vh] overflow-y-auto"
        overlayClassName="fixed inset-0 bg-black/50 z-1000"
        contentLabel="Accept Event Modal"
        style={{
          overlay: { zIndex: 1000 },
          content: { zIndex: 1001 },
        }}
      >
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <span className="text-green-500">✓</span>
              Accept Event
            </h2>
            <button
              onClick={() => setIsAcceptModalOpen(false)}
              className="text-gray-400 hover:text-gray-600"
            >
              ✕
            </button>
          </div>
          <div className="space-y-6">
            <p className="text-gray-600">
              Are you sure you want to accept this event invitation?
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setIsAcceptModalOpen(false)}
                className="px-6 py-2 border rounded-lg text-sm"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setIsAcceptModalOpen(false);
                }}
                className="px-6 py-2 bg-[#0E5B31] text-white rounded-lg text-sm"
              >
                Accept
              </button>
            </div>
          </div>
        </div>
      </Modal>

      {/* Decline Modal */}
      <Modal
        isOpen={isDeclineModalOpen}
        onRequestClose={() => setIsDeclineModalOpen(false)}
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-100 bg-white rounded-lg w-[600px] max-h-[80vh] overflow-y-auto"
        overlayClassName="fixed inset-0 bg-black/50 z-1000"
        contentLabel="Decline Event Modal"
        style={{
          overlay: { zIndex: 1000 },
          content: { zIndex: 1001 },
        }}
      >
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <span className="text-red-500">⚠</span>
              Decline Event
            </h2>
            <button
              onClick={() => setIsDeclineModalOpen(false)}
              className="text-gray-400 hover:text-gray-600"
            >
              ✕
            </button>
          </div>
          <div className="space-y-6">
            <p className="text-gray-600">
              Are you sure you want to decline this event invitation?
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setIsDeclineModalOpen(false)}
                className="px-6 py-2 border rounded-lg text-sm"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  // Handle remove logic here
                  setIsDeclineModalOpen(false);
                }}
                className="px-6 py-2 bg-primary text-white rounded-lg text-sm"
              >
                Decline
              </button>
            </div>
          </div>
        </div>
      </Modal>

      {/* Remove Modal */}
      <Modal
        isOpen={isRemoveModalOpen}
        onRequestClose={() => setIsRemoveModalOpen(false)}
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-100 bg-white rounded-lg w-[600px] max-h-[80vh] overflow-y-auto"
        overlayClassName="fixed inset-0 bg-black/50 z-1000"
        contentLabel="Remove Event Modal"
        style={{
          overlay: { zIndex: 1000 },
          content: { zIndex: 1001 },
        }}
      >
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <span className="text-red-500">⚠</span>
              Remove Event
            </h2>
            <button
              onClick={() => setIsRemoveModalOpen(false)}
              className="text-gray-400 hover:text-gray-600"
            >
              ✕
            </button>
          </div>
          <div className="space-y-6">
            <p className="text-gray-600">
              Are you sure you want to remove this event from saved events?
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setIsRemoveModalOpen(false)}
                className="px-6 py-2 border rounded-lg text-sm"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setIsRemoveModalOpen(false);
                }}
                className="px-6 py-2 bg-primary text-white rounded-lg text-sm"
              >
                Remove
              </button>
            </div>
          </div>
        </div>
      </Modal>

      {/* Cancel Modal */}
      <Modal
        isOpen={isCancelModalOpen}
        onRequestClose={() => setIsCancelModalOpen(false)}
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-100 bg-white rounded-lg w-[600px] max-h-[80vh] overflow-y-auto"
        overlayClassName="fixed inset-0 bg-black/50 z-1000"
        contentLabel="Cancel Attendance Modal"
        style={{
          overlay: { zIndex: 1000 },
          content: { zIndex: 1001 },
        }}
      >
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <span className="text-red-500">⚠</span>
              Cancel Attendance
            </h2>
            <button
              onClick={() => setIsCancelModalOpen(false)}
              className="text-gray-400 hover:text-gray-600"
            >
              ✕
            </button>
          </div>
          <div className="space-y-6">
            <p className="text-gray-600">
              Are you sure you want to cancel your attendance?
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setIsCancelModalOpen(false)}
                className="px-6 py-2 border rounded-lg text-sm"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setIsCancelModalOpen(false);
                }}
                className="px-6 py-2 bg-primary text-white rounded-lg text-sm"
              >
                Cancel Attendance
              </button>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default EventCard;
