import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllEventTypes } from "../../../features/eventSlice";
import logo from "../../../assets/logo_white.png";
import EventCard from "./EventCard";
import {
  getCardByUserId,
  selectClubCard,
} from "../../../features/clubCardSlice";
import { useNavigate } from "react-router-dom";

const UpcomingEvents = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { visibleEvents, loading } = useSelector((state) => state.events);
  const { user } = useSelector((state) => state.auth);
  const clubCard = useSelector(selectClubCard);
  const [timeFilter, setTimeFilter] = useState("24hr");
  const [cardLoading, setCardLoading] = useState(true);
  const [cardActivated, setCardActivated] = useState(false);

  useEffect(() => {
    dispatch(fetchAllEventTypes());

    if (user?.id) {
      dispatch(getCardByUserId(user.id))
        .unwrap()
        .then((cardData) => {
          if (cardData.isActive) {
            setCardActivated(true);
            localStorage.removeItem("authToken");
            console.log("AuthToken cleared - card already active");
          }
        })
        .catch((error) => {
          console.log("No card found or error:", error);
        })
        .finally(() => {
          setCardLoading(false);
        });
    } else {
      setCardLoading(false);
    }
  }, [dispatch, user]);

  const getFilteredEvents = () => {
    const now = new Date();
    let endDate;

    switch (timeFilter) {
      case "24hr":
        endDate = new Date(now.getTime() + 24 * 60 * 60 * 1000);
        break;
      case "7days":
        endDate = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
        break;
      case "month":
        endDate = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000);
        break;
      default:
        endDate = new Date(now.getTime() + 24 * 60 * 60 * 1000);
    }

    return visibleEvents.filter((event) => {
      const eventTime = new Date(event.time);
      const isWithinTimeRange = eventTime >= now && eventTime <= endDate;

      return isWithinTimeRange;
    });
  };

  const filteredEvents = getFilteredEvents();

  const handleNavigateHome = () => {
    navigate("/homepage", { replace: true });
  };

  console.log("visibleEvents", visibleEvents);
  console.log("filteredEvents", filteredEvents);

  if (loading || cardLoading) {
    return <div className="text-center">Loading...</div>;
  }

  return (
    <div className="py-4 px-8">
      <div className="mt-6 w-full flex flex-col items-center text-center">
        <img src={logo} className="mb-4" alt="logo" />
        <div className="mb-6">
          {cardActivated ? (
            // Show this when card is activated
            <div>
              <h1 className="text-black text-2xl font-bold mb-2">
                Your Club Card Has Been Activated!
              </h1>
              <p className="text-gray-600 text-lg mb-4">
                Your club card is now active and ready to use.
              </p>
              <button
                onClick={handleNavigateHome}
                className="px-6 py-3 bg-gradient-to-r from-gradient_r to-gradient_g text-white rounded-lg hover:opacity-90 transition-opacity"
              >
                Navigate to Home Page
              </button>
            </div>
          ) : (
            // Show this when card is not activated
            <div>
              <h1 className="text-black text-2xl font-bold mb-2">
                Welcome! Your Club Card is Now Registered
              </h1>
              <p className="text-gray-600 text-lg">
                Please visit your account profile to activate your card and
                start enjoying member benefits.
              </p>
            </div>
          )}
        </div>
      </div>

      <div className="mt-6 flex justify-center">
        <select
          className="w-full md:w-auto bg-transparent border border-gray-600 cursor-pointer rounded-lg px-4 py-2 text-sm appearance-none"
          value={timeFilter}
          onChange={(e) => setTimeFilter(e.target.value)}
        >
          <option value="24hr" className="text-black">
            Next 24 Hours
          </option>
          <option value="7days" className="text-black">
            Next 7 Days
          </option>
          <option value="month" className="text-black">
            Over a Month
          </option>
        </select>
      </div>

      <div className="mt-5">
        {filteredEvents.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-black text-lg">No upcoming events</p>
            <p className="text-black text-sm mt-2">
              Try adjusting your filters to see more events
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4">
            {filteredEvents.map((event, index) => (
              <EventCard key={event._id || index} event={event} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default UpcomingEvents;
