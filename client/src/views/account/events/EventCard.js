import React, { useState } from "react";
import { BsCalendar } from "react-icons/bs";
import { HiOutlineArrowRight } from "react-icons/hi";
import Modal from "react-modal";
import { IoClose } from "react-icons/io5";
import EventDetailsModal, { PaymentMethodModal } from "./EventDetails";
import Swal from "sweetalert2";

const EventCard = ({ event, activeTab }) => {
  const [isAcceptModalOpen, setIsAcceptModalOpen] = useState(false);
  const [isDeclineModalOpen, setIsDeclineModalOpen] = useState(false);
  const [isRemoveModalOpen, setIsRemoveModalOpen] = useState(false);
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
  const [openModalPayment, setOpenModalPayment] = useState(false);

  const modalStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      transform: "translate(-50%, -50%)",
      maxWidth: "400px",
      width: "90%",
      padding: "20px",
      border: "none",
      borderRadius: "16px",
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
              className="w-full bg-[#0E5B31] text-white py-2 rounded-lg mb-2 text-sm sm:text-base hover:bg-opacity-90 transition-colors"
            >
              Accept
            </button>
            <button
              onClick={() => setIsDeclineModalOpen(true)}
              className="w-full bg-primary text-white py-2 rounded-lg mb-2 text-sm sm:text-base hover:bg-opacity-90 transition-colors"
            >
              Decline
            </button>
          </>
        );
      case "Saved Events":
        return (
          <button
            onClick={() =>
              Swal.fire({
                title: "Remove Saved Event?",
                text: "You won't be able to undo this action!",
                imageUrl: "/logo_white.png", // Change this to your image path
                imageWidth: 70,
                imageHeight: 70,
                showCancelButton: true,
                confirmButtonText: "Remove",
                cancelButtonText: "No",
                confirmButtonColor: "#900C3F",
                cancelButtonColor: "gray",
              })
            }
            className="w-full bg-primary text-white py-2 rounded-lg mb-2 text-sm sm:text-base hover:bg-opacity-90 transition-colors"
          >
            Remove
          </button>
        );
      case "Attending Events":
        return (
          <button
            onClick={() =>
              Swal.fire({
                title: "Cancel Attendance?",
                text: "You won't be able to undo this action!",
                imageUrl: "/logo_white.png", // Change this to your image path
                imageWidth: 70,
                imageHeight: 70,
                showCancelButton: true,
                confirmButtonText: "Yes, Cancel",
                cancelButtonText: "No",
                confirmButtonColor: "#900C3F",
                cancelButtonColor: "gray",
              })
            }
            className="w-full bg-primary text-white py-2 rounded-lg mb-2 text-sm sm:text-base hover:bg-opacity-90 transition-colors"
          >
            Cancel Attendance
          </button>
        );
      case "Past Events":
        return (
          <button className="w-full bg-[#0E5B31] text-white py-2 rounded-lg mb-2 text-sm sm:text-base hover:bg-opacity-90 transition-colors">
            Attended
          </button>
        );
      default:
        return null;
    }
  };
  const [selectedEvent, setSelectedEvent] = useState(null);
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-sm border border-gray-100 flex flex-col h-full">
      <div className="relative w-full pt-[60%]">
        <img
          src={event.image}
          alt={event.title}
          onClick={() => setSelectedEvent(event)}
          className="absolute  cursor-pointer top-0 left-0 w-full h-full object-cover"
        />
      </div>
      <div className="p-3 sm:p-4 flex-grow flex flex-col">
        <h3 className="font-medium mb-2 text-base sm:text-lg font-secondary text-[#121212] line-clamp-2">
          {event.title}
        </h3>
        <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-600 mb-2">
          <BsCalendar />
          <span>{event.date}</span>
          <span>{event.time}</span>
        </div>
        <div className="mt-auto">
          {getActionButtons()}
          {activeTab !== "Invited Events" && (
            <button
              onClick={() => setSelectedEvent(event)}
              className="w-full flex items-center justify-between px-2 text-gray-600 hover:text-gray-800 text-sm sm:text-base py-1"
            >
              <span>View Details</span>
              <HiOutlineArrowRight />
            </button>
          )}
        </div>
      </div>
      {selectedEvent && (
        <EventDetailsModal
          event={selectedEvent}
          eventType={activeTab}
          onClose={() => setSelectedEvent(null)}
        />
      )}
      {openModalPayment && (
        <PaymentMethodModal onClose={() => setOpenModalPayment(false)} />
      )}
      <Modal
        isOpen={isAcceptModalOpen}
        onRequestClose={() => setIsAcceptModalOpen(false)}
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-100 bg-white rounded-lg w-[90%] max-w-[500px] max-h-[90vh] overflow-y-auto"
        overlayClassName="fixed inset-0 bg-black/50 z-1000"
        contentLabel="Accept Event Modal"
        style={{
          overlay: { zIndex: 1000 },
          content: { zIndex: 1001 },
        }}
      >
        <div className="p-4 sm:p-6">
          <div className="flex justify-between items-center mb-4 sm:mb-6">
            <h2 className="text-lg sm:text-xl font-semibold flex items-center gap-2">
              <span className="text-green-500">✓</span>
              Accept Event
            </h2>
            <button
              onClick={() => setIsAcceptModalOpen(false)}
              className="text-gray-400 hover:text-gray-600"
            >
              <IoClose size={24} />
            </button>
          </div>
          <div className="space-y-4 sm:space-y-6">
            <p className="text-gray-600 text-sm sm:text-base">
              Are you sure you want to accept this event invitation?
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setIsAcceptModalOpen(false)}
                className="px-4 sm:px-6 py-1.5 sm:py-2 border rounded-lg text-xs sm:text-sm"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setIsAcceptModalOpen(false);
                  setOpenModalPayment(true);
                }}
                className="px-4 sm:px-6 py-1.5 sm:py-2 bg-[#0E5B31] text-white rounded-lg text-xs sm:text-sm"
              >
                Accept
              </button>
            </div>
          </div>
        </div>
      </Modal>

      {/* Other modals with similar responsive updates */}
      {/* Decline Modal */}
      <Modal
        isOpen={isDeclineModalOpen}
        onRequestClose={() => setIsDeclineModalOpen(false)}
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-100 bg-white rounded-lg w-[90%] max-w-[500px] max-h-[90vh] overflow-y-auto"
        overlayClassName="fixed inset-0 bg-black/50 z-1000"
        contentLabel="Decline Event Modal"
        style={{
          overlay: { zIndex: 1000 },
          content: { zIndex: 1001 },
        }}
      >
        {/* Similar responsive updates for this modal */}
        <div className="p-4 sm:p-6">
          <div className="flex justify-between items-center mb-4 sm:mb-6">
            <h2 className="text-lg sm:text-xl font-semibold flex items-center gap-2">
              <span className="text-red-500">⚠</span>
              Decline Event
            </h2>
            <button
              onClick={() => setIsDeclineModalOpen(false)}
              className="text-gray-400 hover:text-gray-600"
            >
              <IoClose size={24} />
            </button>
          </div>
          <div className="space-y-4 sm:space-y-6">
            <p className="text-gray-600 text-sm sm:text-base">
              Are you sure you want to decline this event invitation?
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setIsDeclineModalOpen(false)}
                className="px-4 sm:px-6 py-1.5 sm:py-2 border rounded-lg text-xs sm:text-sm"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setIsDeclineModalOpen(false);
                }}
                className="px-4 sm:px-6 py-1.5 sm:py-2 bg-primary text-white rounded-lg text-xs sm:text-sm"
              >
                Decline
              </button>
            </div>
          </div>
        </div>
      </Modal>

      {/* Similar updates for Remove and Cancel modals */}
    </div>
  );
};

export default EventCard;
