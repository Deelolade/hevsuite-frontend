import axios from 'axios';

const baseUrl = process.env.REACT_APP_API_BASE_URL;

const API_URL = baseUrl + '/api/user/';

const checkReferral = async () => {
  const response = await axios.get(API_URL + 'check-referral');
  return response.data;
};

const referralService = {
  checkReferral,
};

export default referralService;
