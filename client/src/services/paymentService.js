import axios from "axios";

const baseUrl = process.env.REACT_APP_API_BASE_URL;

const API_URL = baseUrl + "/api/payments/";

const createSetupIntent = async () => {
  try {
    const res = await axios.post(
      API_URL + "stripe/setup-intent",
      {},
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return res.data;
  } catch (error) {
    console.error("Error creating setup intent:", error);
    throw error;
  }
};

const addPayment = async (paymentType, paymentData) => {
  const response = await axios.post(
    API_URL + "addpaymentMethod",
    {
      paymentType,
      paymentData,
    },
    {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return response.data;
};

const editPayment = async (paymentType, paymentData) => {
  const response = await axios.put(
    API_URL + "editpaymentMethod",
    {
      paymentType,
      paymentData: paymentData,
      paymentMethodId: paymentData.paymentMethodId,
    },
    {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return response.data;
};

const deletePayment = async (method) => {
  const response = await axios.post(
    API_URL + "deletepaymentMethod",
    {
      paymentMethodId: method,
    },
    {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return response.data;
};

const getPublishableKey = async () => {
  const response = await axios.get(API_URL + "get-publishable-key", {
    withCredentials: true,
    headers: {
      "Content-Type": "application/json",
    },
  });

  return response.data;
};

const createStripePayment = async ({
  amount,
  currency = "gbp",
  data = null,
}) => {
  const response = await axios.post(
    API_URL + "create-payment-intent",
    { amount, currency, data },
    {
      withCredentials: true,
      headers: { "Content-Type": "application/json" },
    }
  );

  return response.data;
};

const createMembershipPayment = async ({ amount, provider, userId }) => {
  const response = await axios.post(
    API_URL + "create-membership-session",
    { amount, provider, userId },
    {
      withCredentials: true,
      headers: { "Content-Type": "application/json" },
    }
  );

  return response.data;
};

const capturePaypalPayment = async ({ orderId }) => {
  const response = await axios.get(
    API_URL + "paypal/capture-order/" + orderId,
    {
      withCredentials: true,
      headers: { "Content-Type": "application/json" },
    }
  );

  return response.data;
};

const paymentService = {
  addPayment,
  createSetupIntent,
  editPayment,
  deletePayment,
  getPublishableKey,
  createStripePayment,
  capturePaypalPayment,
  createMembershipPayment,
};

export default paymentService;
