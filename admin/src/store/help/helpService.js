import axios from "axios";
import { base_url } from "../../constants/axiosConfig";
const getAuthToken = () => {
  const adminData = localStorage.getItem("admin");
  const admin = adminData ? JSON.parse(adminData) : null;
  return admin?.token || "";
};

const getAllHelps = async () => {
  const token = getAuthToken();
  const response = await axios.get(`${base_url}/admin/all-helps`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  });
  return response.data;
};

const editTopic = async (data) => {
  const token = getAuthToken();
  const response = await axios.put(
    `${base_url}/admin/edit-topic/${data.id}`,
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

const deleteTopic = async (id) => {
  const token = getAuthToken();
  const response = await axios.delete(`${base_url}/admin/delete-topic/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  });
  return response.data;
};

const topicVisibility = async (data) => {
  const token = getAuthToken();
  const response = await axios.put(
    `${base_url}/admin/topic-visibility/${data.id}`,
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

const archiveTopic = async (data) => {
  const token = getAuthToken();
  const response = await axios.put(
    `${base_url}/admin/archive-topic/${data.id}`,
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

const createQA = async (data) => {
  const token = getAuthToken();
  const response = await axios.post(`${base_url}/admin/create-QA`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  });
  return response.data;
};

const editQA = async (data) => {
  const token = getAuthToken();
  const response = await axios.put(
    `${base_url}/admin/edit-QA/${data.id}`,
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

const deleteQA = async (id) => {
  const token = getAuthToken();
  const response = await axios.delete(`${base_url}/admin/delete-QA/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  });
  return response.data;
};

const visibilityQA = async (data) => {
  const token = getAuthToken();
  const response = await axios.put(
    `${base_url}/admin/visibility-QA/${data.id}`,
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

const getAllFAQs = async ({ limit, page, search }) => {
  const token = getAuthToken();
  const response = await axios.get(
    `${base_url}/admin/all-faqs?page=${page}&limit=${limit}&search=${search}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    }
  );
  return response.data;
};

const createFAQs = async (data) => {
  const token = getAuthToken();
  const response = await axios.post(`${base_url}/admin/create-faqs`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  });
  return response.data;
};

const editFAQs = async (data) => {
  const token = getAuthToken();
  const response = await axios.put(
    `${base_url}/admin/edit-faqs/${data.id}`,
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

const deleteFAQs = async (id) => {
  const token = getAuthToken();
  const response = await axios.delete(`${base_url}/admin/delete-faqs/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  });
  return response.data;
};

const visibilityFAQs = async (data) => {
  const token = getAuthToken();
  const response = await axios.put(
    `${base_url}/admin/visibility-faqs/${data.id}`,
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

const eventService = {
  getAllHelps,
  editTopic,
  deleteTopic,
  topicVisibility,
  archiveTopic,
  createQA,
  editQA,
  deleteQA,
  visibilityQA,
  getAllFAQs,
  createFAQs,
  editFAQs,
  deleteFAQs,
  visibilityFAQs,
};

export default eventService;
