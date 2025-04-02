import axios from 'axios';
import { base_url } from '../../constants/axiosConfig';
const getAuthToken = () => {
  const adminData = localStorage.getItem('admin');
  const admin = adminData ? JSON.parse(adminData) : null;
  return admin?.token || '';
};

const getAllEvents = async ({ status, filter }) => {
  const token = getAuthToken();
  const response = await axios.get(
    `${base_url}/admin/all-events?status=${status}&filter=${filter}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    }
  );
  return response.data;
};

const createEvent = async (data) => {
  const response = await axios.post(`${base_url}/api/events`, data);
  return response.data;
};

const editEvent = async (data) => {
  const token = getAuthToken();
  const response = await axios.put(
    `${base_url}/admin/edit-event/${data.id}`,
    data.data,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    }
  );
  return response.data;
};

const deleteEvent = async (id) => {
  const token = getAuthToken();
  const response = await axios.delete(`${base_url}/admin/delete-event/${id}`, {
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
  editEvent,
  deleteEvent,
};

export default eventService;
