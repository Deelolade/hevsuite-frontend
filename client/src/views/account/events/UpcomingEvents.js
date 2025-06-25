import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllEventTypes } from "../../../features/eventSlice";
import logo from "../../../assets/logo_white.png";
import { getCardByUserId } from "../../../features/clubCardSlice";
import { FiCalendar } from "react-icons/fi";
import { formatDateWithSuffix, formatTime } from "../../../utils/formatDate";
import { FaRegClock } from "react-icons/fa";

const UpcomingEvents = () => {
  const dispatch = useDispatch();
  const { attendingEvents, loading } = useSelector((state) => state.events);
  const { user } = useSelector((state) => state.auth);
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
    return attendingEvents.filter((event) => {
      const eventTime = new Date(event.time);
      const isWithinTimeRange = eventTime >= now && eventTime <= endDate;

      return isWithinTimeRange;
    });
  };
  const filteredEvents = getFilteredEvents();

  console.log("attendingEvents", attendingEvents);
  console.log("filteredEvents", filteredEvents);

  if (loading || cardLoading) {
    return <div className="text-center">Loading...</div>;
  }

  return (
    <div className="py-4 px-8">
      {" "}
      <div className="mt-6 w-full flex flex-col items-center text-center">
        <img src={logo} className="mb-4" alt="logo" />
        {!cardActivated && (
          <div className="mb-6">
            <div>
              <h1 className="text-black text-2xl font-bold mb-2">
                Welcome! Your Club Card is Now Registered
              </h1>
              <p className="text-gray-600 text-lg">
                Please visit your account profile to activate your card and
                start enjoying member benefits.
              </p>
            </div>
          </div>
        )}
      </div>
      <div className="mt-6 text-center">
        <h2 className="text-black text-2xl font-bold mb-4">Upcoming Events</h2>
      </div>
      <div className="mt-6 flex justify-center items-center gap-3">
        <span className="text-gray-600 text-lg font-medium">
          Filter by time:
        </span>
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
        {" "}
        {filteredEvents.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-black text-lg">
              No upcoming events you're attending
            </p>
            <p className="text-black text-sm mt-2">
              {attendingEvents.length === 0
                ? "You haven't registered for any events yet. Visit the homepage to discover and join events!"
                : "Try adjusting your time filter to see more events"}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4">
            {filteredEvents.map((event, index) => (
              // <EventCard key={event._id || index} event={event} />
              <div
                key={index}
                className="drop-shadow-[0px_10px_50px_rgba(0,0,0,0.18)] max-w-[241px]"
              >
                <img
                  src={event.images[0]}
                  alt={event.name}
                  className="w-[241px] h-[200px]"
                />
                <div className="bg-white border-b rounded-xl">
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
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default UpcomingEvents;
