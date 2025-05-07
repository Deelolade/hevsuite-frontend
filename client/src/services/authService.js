import axios from 'axios';
const baseUrl = process.env.REACT_APP_API_BASE_URL;

const API_URL = baseUrl + '/api/user/';

// Register user
const register = async (userData) => {
  try{
  const response = await axios.post(API_URL + 'register', userData );
  return response.data;
}catch (error) {

  throw new Error(
    error.response?.data?.message || 
    error.message || 
    'Registration failed'
  );
}
};
//pending registration login
const pendingRegLogin = async (email) => {
  try {
   
    const response = await axios.post(API_URL + 'pending-reg', {email} );
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || 
      error.message || 
      'Pending login failed'
    );
  }
}

// Login user
const loginUser = async (userData) => {
  try {
    const response = await axios.post(API_URL + 'login', userData);
    return response.data;
    
  } catch (error) {
    throw new Error(
      error.response?.data?.message || 
      error.message || 
      'Login failed'
    );
  }
};

const setup2FA = async (data) => {
  try {
    const response = await axios.post(API_URL + 'setup-2fa', data,{
      withCredentials: true,
    });
    return response.data;
    
  } catch (error) {
    throw new Error(
      error.response?.data?.message || 
      error.message || 
      'two factor authentication setup failed'
    );
  }
};

const verify2FA = async (data) => {
  try {
    const response = await axios.post(API_URL + 'verify-2fa', data,{
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || 
      error.message || 
      'two factor authentication verification failed'
    );
  }

};
// Forgot Password - Initiate reset
const forgotPassword = async (emailOrPhone) => {
  try {
    // Determine if input is email or phone
    const isEmail = emailOrPhone.includes('@');
    const payload = isEmail 
      ? { email: emailOrPhone }
      : { phone: emailOrPhone };
    const response = await axios.post(`${API_URL}forgot-password`, payload);
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || 
      'Failed to initiate password reset. Please try again.'
    );
  }
};

// Reset Password - Confirm with code and new password
const resetPassword = async (emailOrPhone, code, newPassword) => {
  try {
    const isEmail = emailOrPhone.includes('@');
    const payload = {
      [isEmail ? 'email' : 'phone']: emailOrPhone,
      code,
      newPassword
    };
    const response = await axios.post(`${API_URL}reset-password`, payload);
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || 
      'Failed to reset password. Please try again.'
    );
  }
};
const resend2FACode = async () => {
  try {
    const response = await axios.get(API_URL + 'resend-2fa-code', {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || 
      error.message || 
      'Failed to resend verification code'
    );
  }
}
const logout = async () => {
  try {
    const response = await axios.post(API_URL + 'logout',{
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || 
      error.message || 
      'Logout failed'
    );
  }

};
// Register user
const updateProfile = async (userData) => {
  try{
  const response = await axios.put(API_URL + 'update', userData ,{
    withCredentials: true,
  });
  return response.data;
}catch (error) {

  throw new Error(
    error.response?.data?.message || 
    error.message || 
    'Registration failed'
  );
}
};

const authService = {
  register,
  updateProfile,
  pendingRegLogin,
  loginUser,
  setup2FA,
  logout,
  verify2FA,
  forgotPassword,
  resetPassword,
  resend2FACode
};

export default authService;
