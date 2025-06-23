import axios from "axios";

const API_URL = `${process.env.REACT_APP_API_BASE_URL}/api/events`;

const eventService = {
  // Get all visible events for logged-in user
  getVisibleEvents: async () => {
    try {
      const response = await axios.get(`${API_URL}/user`, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || "Failed to fetch events";
    }
  },

  // Get attending events
  getAttendingEvents: async () => {
    try {
      const response = await axios.get(`${API_URL}/user/attending`, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || "Failed to fetch attending events";
    }
  },

  // Get invited events
  getInvitedEvents: async () => {
    try {
      const response = await axios.get(`${API_URL}/user/invited`, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || "Failed to fetch invited events";
    }
  },

  // Get past attended events
  getPastEvents: async () => {
    try {
      const response = await axios.get(`${API_URL}/user/attended`, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || "Failed to fetch past events";
    }
  },

  // Get attending members for an event
  getAttendingMembers: async (eventId) => {
    try {
      const response = await axios.post(
        `${API_URL}/attending-members`,
        { eventId },
        { withCredentials: true }
      );
      return response.data;
    } catch (error) {
      throw (
        error.response?.data?.message || "Failed to fetch attending members"
      );
    }
  },

  // Update invite status
  updateInviteStatus: async ({ eventId, status }) => {
    try {
      const response = await axios.put(
        `${API_URL}/invite/status/update`,
        { eventId, status },
        { withCredentials: true }
      );
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || "Failed to update invite status";
    }
  },

  // Invite users to event
  inviteUsersToEvent: async (eventId, userIds) => {
    try {
      const response = await axios.post(
        `${API_URL}/invite`,
        { eventId, userIds },
        { withCredentials: true }
      );
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || "Failed to invite users";
    }
  },

  // Cancel event attendance
  cancelEventAttendance: async (eventId) => {
    try {
      const response = await axios.post(
        `${API_URL}/cancel-attendance`,
        { eventId },
        { withCredentials: true }
      );
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || "Failed to cancel attendance";
    }
  },
  // Save an event
  saveEvent: async (eventId) => {
    try {
      const response = await axios.post(
        `${API_URL}/save-event`,
        { eventId },
        { withCredentials: true }
      );
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: "Failed to save event" };
    }
  },

  // Remove saved event
  removeSavedEvent: async (eventId) => {
    try {
      const response = await axios.post(
        `${API_URL}/remove-saved-event`,
        { eventId },
        { withCredentials: true }
      );
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || "Failed to remove saved event";
    }
  },

  // Get saved events
  getSavedEvents: async () => {
    try {
      const response = await axios.get(`${API_URL}/user/saved`, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || "Failed to fetch saved events";
    }
  },
};

export default eventService;
