import axios from 'axios';

const baseUrl = process.env.REACT_APP_API_BASE_URL;

const API_URL = baseUrl + '/api/user/';

const deleteAccount = async ({userId,password}) => {
    const response = await axios.post(API_URL + 'deleteMembership', {
        userId,
        password
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


  const deActivateAccount = async ({userId, password}) => {
    const response = await axios.post(API_URL + 'deactivateMembership', {
        userId,
        password
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
  const updateNotifications = async ({userId, notifications}) => {
    const response = await axios.post(API_URL + 'updateNotifications', {
        userId, notifications
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

  const getNotifications = async (userId) => {
  const response = await axios.get(`${API_URL}getNotifications/${userId}`, {
    withCredentials: true,
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.data;
};


  const profileService = {
       deleteAccount,
      deActivateAccount,
      updateNotifications,
      getNotifications

  };

  export default profileService;