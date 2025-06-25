import React, { useState } from "react";
import { BsCalendar } from "react-icons/bs";
import { HiOutlineArrowRight } from "react-icons/hi";
import Modal from "react-modal";
import { IoClose } from "react-icons/io5";
import EventDetailsModal, { PaymentMethodModal } from "./EventDetails";
import Swal from "sweetalert2";
import { showModal } from "../../../components/FireModal";
import { formatDateWithSuffix, formatTime } from "../../../utils/formatDate";
import { MdAccessTime } from "react-icons/md";
import {
  cancelEventAttendance,
  removeSavedEvent,
  updateInviteStatus,
} from "../../../features/eventSlice";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

const EventCard = ({ event, activeTab, events }) => {
  const [isAcceptModalOpen, setIsAcceptModalOpen] = useState(false);
  const [isDeclineModalOpen, setIsDeclineModalOpen] = useState(false);
  const [isRemoveModalOpen, setIsRemoveModalOpen] = useState(false);
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
  const [openModalPayment, setOpenModalPayment] = useState(false);
  const dispatch = useDispatch();
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
  const handleAcceptInvite = () => {
    dispatch(
      updateInviteStatus({
        eventId: event._id,
        status: "accepted",
      })
    )
      .unwrap()
      .then(() => {
        toast.success("Invitation accepted successfully!");
        setIsAcceptModalOpen(false);
      })
      .catch((error) => {
        toast.error(error.message || "Failed to accept invitation");
      });
  };

  const handleDeclineInvite = () => {
    dispatch(
      updateInviteStatus({
        eventId: event._id,
        status: "declined",
      })
    )
      .unwrap()
      .then(() => {
        toast.success("Invitation declined successfully!");
        setIsDeclineModalOpen(false);
      })
      .catch((error) => {
        toast.error(error.message || "Failed to decline invitation");
      });
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
              showModal({
                title: "Remove Saved Event?",
                text: "You won't be able to undo this action!",
                confirmText: "Yes",
                onConfirm: () => {
                  dispatch(removeSavedEvent(event._id))
                    .unwrap()
                    .then(() => {
                      toast.success("Event removed from saved list!");
                    })
                    .catch((error) => {
                      toast.error(
                        error.message || "Failed to remove saved event"
                      );
                    });
                },
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
              showModal({
                title: "Cancel Attendance?",
                text: "You won't be able to undo this action!",
                confirmText: "Yes",
                onConfirm: () => {
                  // Remove the event parameter here since we're using closure
                  dispatch(cancelEventAttendance(event._id))
                    .unwrap()
                    .then(() => {
                      toast.success("Attendance cancelled successfully!");
                    })
                    .catch((error) => {
                      toast.error(
                        error.message || "Failed to cancel attendance"
                      );
                    });
                },
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
      <Link key={event._id} to={`/events/${event._id}`}>
        <div
          key={event._id}
          className="rounded-2xl overflow-hidden bg-black relative group cursor-pointer w-full min-w-[300px] max-w-[350px] h-[427px]"
          // onClick={() => setSelectedEvent(event)}
        >
          <img
            src={event?.images[0]}
            alt={event?.name}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
          />
          <div className="absolute bottom-0 left-0 right-0 p-4">
            <h3 className="text-xl font-semibold">{event?.name}</h3>
            <div className="flex items-center space-x-4 mt-2">
              <span>{formatDateWithSuffix(event?.time)}</span>
              <span>{formatTime(event?.time)}</span>
            </div>
          </div>
        </div>
      </Link>
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
      {selectedEvent && (
        <EventDetailsModal
          event={selectedEvent}
          eventType={activeTab}
          onClose={() => setSelectedEvent(null)}
          events={events}
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
                onClick={handleAcceptInvite}
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
                onClick={handleDeclineInvite}
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
