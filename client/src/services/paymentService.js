import axios from 'axios';

const baseUrl = process.env.REACT_APP_API_BASE_URL;

const API_URL = baseUrl + '/api/payments/';
console.log("APIURL",API_URL )



const addPayment = async (paymentType, paymentData) => {
    const response = await axios.post(API_URL + 'addpaymentMethod', {
        paymentType,
        paymentData
      },
      {
        withCredentials: true, 
        headers: {
          'Content-Type': 'application/json',
         
        }
      }
    );
      return response.data;

  };

 
  const createSetupIntent = async () => {
    try {
       
      const res = await axios.post(
        API_URL + 'stripe/setup-intent',
        {},
        {
          withCredentials: true, 
          headers: {
            'Content-Type': 'application/json',
           
          }
        }
      );
      return res.data;
    } catch (error) {
      console.error('Error creating setup intent:', error);
      throw error;
    }
  };



  const paymentService = {
    addPayment,
    createSetupIntent

  };

  export default paymentService;