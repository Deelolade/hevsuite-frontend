import axios from 'axios';
import { base_url } from '../../constants/axiosConfig';

const getAuthToken = () => {
  const adminData = localStorage.getItem('admin');
  const admin = adminData ? JSON.parse(adminData) : null;
  return admin?.token || '';
};

// Get all events with filtering
export const getAllEvents = async ({ status = 'all', filter = 'all' }) => {
  const token = getAuthToken();
  const response = await axios.get(`${base_url}/api/events/admin`, {
    params: { status, filter },
    headers: {
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  });
  return response.data;
};

// Create new event
export const createEvent = async (formData) => {
  const token = getAuthToken();
  try {
    const response = await axios.post(`${base_url}/api/events`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
      withCredentials: true,
    });
    return response.data.data;
  } catch (error) {
    console.error('Error creating event:', error);
    throw error;
  }
};

// Update event
export const updateEvent = async (eventId, formData) => {
  const token = getAuthToken();
  try {
    const response = await axios.put(`${base_url}/api/events/${eventId}`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
      withCredentials: true,
    });
  return response.data;
  } catch (error) {
    console.error('Error updating event:', error);
    throw error.response?.data || error;
  }
};

// Delete event
export const deleteEvent = async (eventId) => {
  const token = getAuthToken();
  const response = await axios.delete(`${base_url}/api/events/${eventId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  });
  return response.data;
};

// Get event registrations
export const getEventRegistrations = async (eventId) => {
  const token = getAuthToken();
  const response = await axios.get(`${base_url}/api/events/${eventId}/registrations`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
  });
  return response.data;
};

// Invite users to event
export const inviteUsersToEvent = async (eventId, userIds) => {
  const token = getAuthToken();
  const response = await axios.post(`${base_url}/api/events/${eventId}/invite`, { userIds }, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  });
  return response.data;
};

const eventService = {
  getAllEvents,
  createEvent,
  updateEvent,
  deleteEvent,
  getEventRegistrations,
  inviteUsersToEvent,
};

export default eventService;
