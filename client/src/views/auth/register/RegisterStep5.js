import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BsCheckCircleFill, BsEye, BsEyeSlash } from 'react-icons/bs';
import Footer from '../../../components/Footer';
import logo_white from '../../../assets/logo_white.png';
import bg_image from '../../../assets/party3.jpg';
import Swal from 'sweetalert2';
import { showModal } from '../../../components/FireModal';
import { useSelector, useDispatch } from 'react-redux';
import {
  prevStep,
  updateStepData,
  reset,
} from '../../../features/auth/registerSlice';
import toast from 'react-hot-toast';
import authService from '../../../services/authService';

const RegisterStep5 = () => {
  React.useEffect(() => {
    window.scrollTo({ top: 50, behavior: 'smooth' });
  }, []);
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const dispatch = useDispatch();

  const { currentStep, formData: data } = useSelector(
    (state) => state.register
  );

  const [formData, setFormData] = useState({
    proofOfId: null,
    picture: null,
    password: '',
    confirmPassword: '',
  });

  const handleFileUpload = (type, file) => {
    setFormData({ ...formData, [type]: file });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    // Validate required image fields

    if (!formData.proofOfId) {
      toast.error("Proof of ID is required.");
      return;
    }
    if (!formData.picture) {
      toast.error("Profile picture is required.");
      return;
    }

    // Validate file types and sizes
    const allowedImageTypes = ['image/jpeg', 'image/png', 'image/webp'];
    const maxSizeInBytes = 5 * 1024 * 1024; // 5MB

    const checkFile = (file, label) => {
      if (!allowedImageTypes.includes(file.type)) {
        toast.error(`${label} must be a JPEG, PNG, or WEBP image.`);
        return false;
      }
      if (file.size > maxSizeInBytes) {
        toast.error(`${label} must be smaller than 5MB.`);
        return false;
      }
      return true;
    };

    if (!checkFile(formData.proofOfId, "Proof of ID")) return;
    if (!checkFile(formData.picture, "Profile picture")) return;


    const validatePassword = (pass) => {
      const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z]).{7,}$/;
      return passwordRegex.test(pass);
    };
    // Validate passwords
    if (!validatePassword(formData.password)) {
      toast.error('One uppercase, lowercase and a minimum of 7 characters)');
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    const finalData = {
      ...data.step2,
      ...data.step3,
      ...data.step4,
      password: formData.password,
    };

    const formDataToSend = new FormData();


    for (const key in finalData) {
      formDataToSend.append(key, finalData[key]);
    }

    // Append files (if they exist)
    if (formData.picture) {
      formDataToSend.append("profilePhoto", formData.picture);
    }
    if (formData.proofOfId) {
      formDataToSend.append("idCardPhoto", formData.proofOfId);
    }

    try {
      await authService.register(formDataToSend);
      toast.success("Registration successful! Check your email for verification.");
      navigate("/register-6");
      dispatch(reset());
    } catch (error) {
      toast.error(error.message || "Registration failed.");
    }
  };
  return (
    <div className='min-h-screen flex flex-col'>
      <div className='relative text-white'>
        <div className='absolute inset-0 z-0'>
          <img
            src={bg_image}
            alt='background'
            className='w-full h-[120px] object-cover brightness-50'
          />
        </div>
        <header className='relative z-10 py-4'>
          <div className='container mx-auto px-4 flex justify-center items-center'>
            <Link to='/'>
              <img
                src={logo_white}
                alt='Hevsuite Club'
                className='h-12 md:h-16'
              />
            </Link>
            {/* <button className="md:hidden text-white text-2xl">
              <span>☰</span>
            </button> */}
          </div>
        </header>
      </div>

      {/* Progress Steps */}
      <div className='container mx-auto px-4 py-6 mt-8'>
        <div className='flex flex-wrap justify-center gap-4 pb-6 md:pb-0'>
          {[...Array(7)].map((_, index) => (
            <div key={index} className='flex items-center flex-shrink-0 mb-4'>
              <div className='relative'>
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${index < 5
                      ? 'bg-[#0A5440]'
                      : 'bg-white border-2 border-gray-300'
                    }`}
                >
                  {index < 4 ? (
                    <BsCheckCircleFill className='text-white' />
                  ) : index === 4 ? (
                    <span className='text-white'>5</span>
                  ) : (
                    <span className='text-gray-500'>{`0${index + 1}`}</span>
                  )}
                </div>
                <p className='absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap text-xs md:text-sm'>
                  Step {index + 1}
                </p>
              </div>
              {index < 6 && (
                <div
                  className={`w-12 md:w-32 h-[2px] ${index < 4 ? 'bg-[#0A5440]' : 'bg-gray-300'
                    }`}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className='container mx-auto px-4 py-8 md:py-12 max-w-3xl flex-grow'>
        <h1 className='text-2xl md:text-3xl font-medium text-center mb-8 md:mb-12 flex items-center justify-center gap-2 md:gap-3 text-[#540A26]'>
          <span className='w-6 h-6 md:w-8 md:h-8 bg-[#540A26] rounded-full flex items-center justify-center text-white text-sm md:text-base'>
            📄
          </span>
          Supporting Documents
        </h1>

        <div className='space-y-4 md:space-y-8 bg-[#E3F8F959] p-4 md:p-6 rounded-lg'>
          {/* Upload Proof of ID */}
          <div className='bg-white rounded-lg p-4 md:p-8 text-center'>
            <h3 className='text-lg md:text-xl font-medium mb-1 md:mb-2'>
              Upload Proof of ID<span className='text-red-500'>*</span>
            </h3>
            <p className='text-gray-600 mb-4 md:mb-6 text-sm md:text-base'>
              Please upload a clear photo of your proof of ID e.g. Driving
              license or passport
            </p>
            {formData.proofOfId ? (
              <div className='mb-4'>
                <div className='relative w-48 md:w-64 h-32 md:h-40 mx-auto'>
                  <img
                    src={URL.createObjectURL(formData.proofOfId)}
                    alt='Proof of ID'
                    className='w-full h-full object-cover rounded-lg'
                  />
                  <button
                    onClick={() =>
                      setFormData({ ...formData, proofOfId: null })
                    }
                    className='absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center'
                  >
                    ×
                  </button>
                </div>
              </div>
            ) : (
              <button
                onClick={() => document.getElementById('proofOfId').click()}
                className='px-4 md:px-6 py-2 md:py-3 bg-[#540A26] text-white rounded-lg flex items-center justify-center gap-2 mx-auto text-sm md:text-base'
              >
                Upload Files
                <svg
                  className='w-4 h-4 md:w-5 md:h-5'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    d='M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12'
                  />
                </svg>
              </button>
            )}
            <input
              type='file'
              id='proofOfId'
              className='hidden'
              onChange={(e) => handleFileUpload('proofOfId', e.target.files[0])}
              accept='image/*,.pdf'
            />
          </div>

          {/* Upload Picture */}
          <div className='bg-white rounded-lg p-4 md:p-8 text-center'>
            <h3 className='text-lg md:text-xl font-medium mb-1 md:mb-2'>
              Upload Picture<span className='text-red-500'>*</span>
            </h3>
            <p className='text-gray-600 mb-4 md:mb-6 text-sm md:text-base'>
              Please upload a clear photo of a recent headshot of yourself.
            </p>
            {formData.picture ? (
              <div className='mb-4'>
                <div className='relative w-32 h-32 md:w-40 md:h-40 mx-auto'>
                  <img
                    src={URL.createObjectURL(formData.picture)}
                    alt='Profile Picture'
                    className='w-full h-full object-cover rounded-full'
                  />
                  <button
                    onClick={() => setFormData({ ...formData, picture: null })}
                    className='absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center'
                  >
                    ×
                  </button>
                </div>
              </div>
            ) : (
              <button
                onClick={() => document.getElementById('picture').click()}
                className='px-4 md:px-6 py-2 md:py-3 bg-[#540A26] text-white rounded-lg flex items-center justify-center gap-2 mx-auto text-sm md:text-base'
              >
                Upload Files
                <svg
                  className='w-4 h-4 md:w-5 md:h-5'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    d='M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12'
                  />
                </svg>
              </button>
            )}
            <input
              type='file'
              id='picture'
              className='hidden'
              onChange={(e) => handleFileUpload('picture', e.target.files[0])}
              accept='image/*'
            />
          </div>

          {/* Password Fields */}
          <div className='space-y-3 md:space-y-4 p-4 md:p-6'>
            <div>
              <label className='block mb-1 md:mb-2 text-sm md:text-base'>
                Password<span className='text-red-500'>*</span>
              </label>
              <div className='relative'>
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder='Enter your password'
                  className='w-full px-3 md:px-4 py-2 md:py-3 border rounded-lg text-sm md:text-base'
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                />
                <button
                  type='button'
                  onClick={() => setShowPassword(!showPassword)}
                  className='absolute right-3 md:right-4 top-1/2 -translate-y-1/2 text-gray-400'
                >
                  {showPassword ? (
                    <BsEyeSlash size={16} className='md:w-5 md:h-5' />
                  ) : (
                    <BsEye size={16} className='md:w-5 md:h-5' />
                  )}
                </button>
              </div>
            </div>

            <div>
              <label className='block mb-1 md:mb-2 text-sm md:text-base'>
                Confirm Password<span className='text-red-500'>*</span>
              </label>
              <div className='relative'>
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  placeholder='Enter password again'
                  className='w-full px-3 md:px-4 py-2 md:py-3 border rounded-lg text-sm md:text-base'
                  value={formData.confirmPassword}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      confirmPassword: e.target.value,
                    })
                  }
                />
                <button
                  type='button'
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className='absolute right-3 md:right-4 top-1/2 -translate-y-1/2 text-gray-400'
                >
                  {showConfirmPassword ? (
                    <BsEyeSlash size={16} className='md:w-5 md:h-5' />
                  ) : (
                    <BsEye size={16} className='md:w-5 md:h-5' />
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className='flex justify-between items-center mt-6 md:mt-8'>
          <div>
            <Link
              className='text-red-600 mr-6 font-medium text-sm md:text-base'
              to='#'
              onClick={() =>
                showModal({
                  title: 'Cancel Registration?',
                  text: "You won't be able to regain progress!",
                  confirmText: 'Yes',
                  onConfirm: () => {
                    dispatch(reset());
                    navigate('/');
                  },
                })
              }
            >
              CANCEL
            </Link>
            <Link
              to='/register-4'
              className='text-gray-600 font-medium text-sm md:text-base'
              onClick={() => {
                dispatch(prevStep());
              }}
            >
              BACK
            </Link>
          </div>
          <button
            onClick={handleSubmit}
            className='px-4 md:px-6 py-1 md:py-2 text-[#540A26] border-2 border-[#540A26] rounded-3xl text-sm md:text-base hover:bg-[#540A26] hover:text-white transition-colors'
          >
            Continue →
          </button>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default RegisterStep5;
