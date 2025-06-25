import React, { useState } from "react";
import { FiCalendar } from "react-icons/fi";
import { formatDateWithSuffix, formatTime } from "../../../utils/formatDate";
import { FaRegClock } from "react-icons/fa";
import { useDispatch } from "react-redux";
import {
  fetchAllEventTypes,
  updateInviteStatus,
} from "../../../features/eventSlice";
import toast from "react-hot-toast";
import PaymentModal from "../../../components/PaymentModal";

const InvitedEvents = ({ events }) => {
  const [respondingEvents, setRespondingEvents] = useState({});
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [paymentData, setPaymentData] = useState(null);
  const dispatch = useDispatch();
  const handleInviteResponse = async (eventId, status) => {
    if (status === "accepted") {
      const selectedEvent = events.find((event) => event._id === eventId);

      if (!selectedEvent) {
        toast.error("Event not found");
        return;
      }

      const eventPrice = selectedEvent.price || 0;

      if (eventPrice === 0) {
        setRespondingEvents((prev) => ({ ...prev, [eventId]: "accepted" }));

        try {
          await dispatch(
            updateInviteStatus({ eventId, status: "accepted" })
          ).unwrap();
          await dispatch(fetchAllEventTypes()).unwrap();
          toast.success("Free event invitation accepted successfully!");
        } catch (error) {
          console.error("Failed to update invite status:", error);
          toast.error("Failed to accept invitation");
        } finally {
          setRespondingEvents((prev) => {
            const { [eventId]: removed, ...rest } = prev;
            return rest;
          });
        }
        return;
      }

      const eventPaymentData = {
        eventId: selectedEvent._id,
        ticketCount: 1,
        amount: eventPrice,
        type: `Event - ${selectedEvent.name} ticket purchase`,
        reason: `Invitation acceptance for ${selectedEvent.name}`,
        trxRef: `inv_${Date.now()}_${selectedEvent._id}`,
      };

      setPaymentData(eventPaymentData);
      setShowPaymentModal(true);
      return;
    }

    setRespondingEvents((prev) => ({ ...prev, [eventId]: status }));

    try {
      await dispatch(updateInviteStatus({ eventId, status })).unwrap();

      await dispatch(fetchAllEventTypes()).unwrap();

      toast.success("Invitation declined successfully");
    } catch (error) {
      console.error("Failed to update invite status:", error);
      toast.error("Failed to update invitation status");
    } finally {
      setRespondingEvents((prev) => {
        const { [eventId]: removed, ...rest } = prev;
        return rest;
      });
    }
  };
  if (!events || events.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <div className="text-gray-500 text-lg mb-4">
          You have no event invitations
        </div>
      </div>
    );
  }
  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4">
        {events.map((event, index) => (
          // <EventCard key={index} event={event} activeTab="Attending Events" events={events} />
          <div
            key={index}
            className="drop-shadow-[0px_10px_50px_rgba(0,0,0,0.18)] max-w-[241px]"
          >
            <img
              src={event.images[0]}
              alt={event.name}
              className="w-[241px] h-[200px]"
            />{" "}
            <div className="bg-white border-b rounded-b-xl">
              <div className="p-4">
                <h4 className="text-xl font-semibold">{event.name}</h4>
                <div>
                  <div className="flex items-center justify-between gap-2 text-gray-500 mt-2">
                    <div className="flex flex-row items-center gap-2 text-sm text-[#444444] font-bold">
                      <FiCalendar />
                      {formatDateWithSuffix(event.time)}
                    </div>
                    <div className="flex flex-row items-center gap-2 text-sm text-[#444444] font-bold">
                      <FaRegClock />
                      {formatTime(event.time)}
                    </div>
                  </div>
                </div>
                <div className="mt-3.5 flex flex-col gap-1.5">
                  <button
                    onClick={() => handleInviteResponse(event._id, "accepted")}
                    disabled={respondingEvents[event._id]}
                    className="w-full py-2.5 px-4 rounded-lg bg-[#0A5438] text-white text-base disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#0A5438]/90 transition-colors"
                  >
                    {respondingEvents[event._id] === "accepted"
                      ? "Accepting..."
                      : "Accept"}
                  </button>
                  <button
                    onClick={() => handleInviteResponse(event._id, "declined")}
                    disabled={respondingEvents[event._id]}
                    className="w-full py-2.5 px-4 rounded-lg bg-[#900C3F] text-white text-base disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#900C3F]/90 transition-colors"
                  >
                    {respondingEvents[event._id] === "declined"
                      ? "Declining..."
                      : "Decline"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {showPaymentModal && paymentData && (
        <PaymentModal
          isOpen={showPaymentModal}
          onClose={() => {
            setShowPaymentModal(false);
            setPaymentData(null);
          }}
          paymentData={paymentData}
          onPaymentSuccess={async (result) => {
            console.log("Payment successful:", result);

            try {
              await dispatch(
                updateInviteStatus({
                  eventId: paymentData.eventId,
                  status: "accepted",
                })
              ).unwrap();

              await dispatch(fetchAllEventTypes()).unwrap();

              toast.success(
                "Invitation accepted and payment completed successfully!"
              );

              setShowPaymentModal(false);
              setPaymentData(null);
            } catch (error) {
              console.error(
                "Failed to update invite status after payment:",
                error
              );
              toast.error(
                "Payment completed but failed to update invitation status"
              );
            }
          }}
        />
      )}
    </>
  );
};

export default InvitedEvents;
