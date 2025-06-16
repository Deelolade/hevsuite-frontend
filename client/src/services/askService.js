// services/askService.js
import axios from "axios";

const baseUrl = process.env.REACT_APP_API_BASE_URL;
const API_URL = `${baseUrl}/api/ask/`;

// Configure axios instance
const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});
const fetchOpenAsks = async () => {
  try {
    const response = await api.get("");
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || error.message);
  }
};
const createAsk = async (askData) => {
  try {
    const response = await api.post("", askData);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || error.message);
  }
};

const claimAsk = async (askId) => {
  try {
    const response = await api.post("claim", { askId });
    console.log(response);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || error.message);
  }
};

const abandonAsk = async (askId) => {
  try {
    console.log("askId:", askId); // Log the askId to check its value
    const response = await api.post("abandon", { askId });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || error.message);
  }
};

const deliverAsk = async (askId) => {
  try {
    const response = await api.post("deliver", { askId });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || error.message);
  }
};
const deleteAsk = async (askId) => {
  try {
    const response = await api.delete("delete", { askId });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || error.message);
  }
};
const reportAsk = async ({ askId, reason }) => {
  try {
    console.log("askId:", askId, reason); // Log the askId to check its value
    const response = await api.post("report", { askId, reason });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || error.message);
  }
};

const chat = async ({ askId, message }) => {
  try {
    const response = await api.post("chat", { askId, message });
    const lastMessage = response.data.chat[response.data.chat.length - 1];

    return {
      askId,
      message: lastMessage, // Return only the newly added message
    };
  } catch (error) {
    throw new Error(error.response?.data?.message || error.message);
  }
};

const fetchCurrentUserAsks = async () => {
  try {
    const response = await api.get("current");
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || error.message);
  }
};
const fetchAcceptedAsks = async () => {
  try {
    const response = await api.get("accepted");
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || error.message);
  }
};
const askService = {
  fetchOpenAsks,
  createAsk,
  claimAsk,
  deleteAsk,
  abandonAsk,
  deliverAsk,
  reportAsk,
  chat,
  fetchCurrentUserAsks,
  fetchAcceptedAsks,
};

export default askService;
