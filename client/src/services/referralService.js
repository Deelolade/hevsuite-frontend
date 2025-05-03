import axios from 'axios';

const baseUrl = process.env.REACT_APP_API_BASE_URL;

const API_URL = baseUrl + '/api/user/';

const checkReferral = async () => {
  const response = await axios.get(API_URL + 'check-referral',{
    withCredentials: true,
  });
  return response.data;
};
const sendReferrals = async (referredUserIds) => {
  try{
  const response = await axios.post(API_URL + 'referrals/send',{referredUserIds} ,{
    withCredentials: true,
  });
  return response.data;
}catch (error) {
    throw new Error(
      error.response?.data?.message || 
      error.message || 
      'Referral sending failed'
    );
  }
};
const fetchAllUsersBasicInfo = async () => {
   try{
    const response = await axios.get(API_URL + 'users/fetch-only-id-name-email-photo',{
      withCredentials: true,
    });
    return response.data;
  }catch (error) {
  
    throw new Error(
      error.response?.data?.message || 
      error.message || 
      'Fetching users failed'
    );
  }

};
const declineReferral = async (referredUserId) => {
  try{
   const response = await axios.delete(`${API_URL}/referrals/${referredUserId}`,{
     withCredentials: true,
   });
   return response.data;
 }catch (error) {
 
   throw new Error(
     error.response?.data?.message || 
     error.message || 
     'Failed to decline referral'
   );
 }

};

const referralService = {
  checkReferral,
  sendReferrals,
  fetchAllUsersBasicInfo,
  declineReferral
};

export default referralService;
