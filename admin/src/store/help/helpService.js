import axios from "axios";
import { base_url } from "../../constants/axiosConfig";
const getAuthToken = () => {
  const adminData = localStorage.getItem("admin");
  const admin = adminData ? JSON.parse(adminData) : null;
  return admin?.token || "";
};

const getAllHelps = async () => {
  const token = getAuthToken();
  const response = await axios.get(`${base_url}/api/admin/all-helps`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  });
  return response.data;
};

// const createTopic = async (data) => {
//   query: (topicData) => ({
//     url: '/help/topics',
//     method: 'POST',
//     body: topicData,
//   }),
//   invalidatesTags: ['Help'],
// }),

const createTopic = async (data) => {
  const token = getAuthToken();
  const response = await axios.post(
    `${base_url}/api/admin/topics`,
    data,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    }
  );
  return response.data;
};

const editTopic = async (data) => {
  const token = getAuthToken();
  const response = await axios.put(
    `${base_url}/api/admin/topic/${data.id}`,
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
  const response = await axios.delete(`${base_url}/api/admin/topic/${id}`, {
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
    `${base_url}/api/admin/topic-visibility/${data.id}`,
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
    `${base_url}/api/admin/topic/${data.id}`,
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

export const createQA = async (data) => {
  const token = getAuthToken();
  const response = await axios.post(
    `${base_url}/api/admin/topic/${data.topicId}/qas`,
    {
      question: data.question,
      answer: data.answer,
      visibility: data.visibility || true
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    }
  );
  return response.data;
};

const editQA = async (data) => {
  const token = getAuthToken();
  const response = await axios.put(
    `${base_url}/api/admin/qa/${data.id}`,
    {
      question: data.data.question,
      answer: data.data.answer,
      visibility: data.data.visibility
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    }
  );
  return response.data;
};

const deleteQA = async (data) => {
  const token = getAuthToken();
  const response = await axios.delete(
    `${base_url}/api/admin/topic/${data.topicId}/qas/${data.qaId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    }
  );
  return response.data;
};

const visibilityQA = async (data) => {
  const token = getAuthToken();
  const response = await axios.put(
    `${base_url}/api/admin/visibility-QA/${data.id}`,
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
    `${base_url}/api/admin/all-faqs?page=${page}&limit=${limit}&search=${search}`,
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
  const response = await axios.post(`${base_url}/api/admin/create-faqs`, data, {
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
    `${base_url}/api/admin/faq/${data.id}`,
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
  const response = await axios.delete(`${base_url}/api/admin/delete-faqs/${id}`, {
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
    `${base_url}/api/admin/visibility-faqs/${data.id}`,
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
  createTopic,
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
