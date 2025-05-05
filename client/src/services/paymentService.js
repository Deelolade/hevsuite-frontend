import axios from 'axios';

const baseUrl = process.env.REACT_APP_API_BASE_URL;

const API_URL = baseUrl + '/api/user/';


const addPayment = async (paymentType, paymentData) => {
    console.log("PaymentData", paymentType, paymentData)
    const response = await axios.post(API_URL + 'addPayment', {
        paymentType,
        paymentData
      });
      return response.data;

  };



  const paymentService = {
    addPayment,

  };

  export default paymentService;