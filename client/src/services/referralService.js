import axios from 'axios';

const baseUrl = process.env.REACT_APP_API_BASE_URL;

const API_URL = baseUrl + '/api/user/';

const checkReferral = async () => {
  const response = await axios.get(API_URL + 'check-referral',{
    withCredentials: true,
  });
  return response.data;
};
const sendReferralsRequest = async (referringUserIds) => {
  try{
  const response = await axios.post(API_URL + 'referrals/requestsend',{referringUserIds} ,{
    withCredentials: true,
  });
  // return response.data;
   return {
      success: true,
      data: response.data,
    };
}catch (error) {
  return {
      success: false,
      error: error.response?.data?.message || error.message,
    };
    // throw new Error(
    //   error.response?.data?.message || 
    //   error.message || 
    //   'Referral sending failed'
    // );
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
const fetchReferralbyIds = async (referredUserIds) => { 
  try{
    const response = await axios.post(`${API_URL}users/fetch-by-ids`,referredUserIds,{
      withCredentials: true,
    });
    return response.data.users;
  }catch (error) {
  
    throw new Error(
      error.response?.data?.message || 
      error.message || 
      'Fetching referrals failed'
    );
  }

}
const sendReferrals=async(formData)=>{
  try{
    const response = await axios.post(API_URL + 'referrals/send',formData ,{
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
}
const updateReferralStatus= async ({referredUserId,status}) => { 
  try{
    const response = await axios.put(`${API_URL}referrals/update`,{referredUserId,status},{
      withCredentials: true,
    });
    return response.data.users;
  }catch (error) {
  
    throw new Error(
      error.response?.data?.message || 
      error.message || 
      'Fetching referrals failed'
    );
  }

}
const cancelReferrals= async ({referredUserId}) => { 
  try{
    const response = await axios.put(`${API_URL}referrals/cancel`,{referredUserId},{
      withCredentials: true,
    });
    return response.data.users;
  }catch (error) {
  
    throw new Error(
      error.response?.data?.message || 
      error.message || 
      'Fetching referrals failed'
    );
  }

}

const referralService = {
  fetchReferralbyIds,
  checkReferral,
  sendReferralsRequest,
  sendReferrals,
  fetchAllUsersBasicInfo,
  declineReferral,
  updateReferralStatus,
  cancelReferrals,
};

export default referralService;
