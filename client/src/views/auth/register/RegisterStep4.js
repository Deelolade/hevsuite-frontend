import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BsCheckCircleFill } from 'react-icons/bs';
import Footer from '../../../components/Footer';
import logo_white from '../../../assets/logo_white.png';
import bg_image from '../../../assets/party3.jpg';
import Swal from 'sweetalert2';
import { showModal } from '../../../components/FireModal';
import { useSelector, useDispatch } from 'react-redux';
import {
  prevStep,
  nextStep,
  updateStepData,
  reset,
} from '../../../features/auth/registerSlice';

const RegisterStep4 = () => {
  useEffect(() => {
    window.scrollTo({ top: 50, behavior: 'smooth' });
  }, []);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { currentStep, formData: data } = useSelector(
    (state) => state.register
  );

  const [formData, setFormData] = useState({ ...data.step4 });
  const [errors, setErrors] = useState({});
  const interests = [
    ['Art & Design', 'Cigars', 'Country Pursuits'],
    ['Dance', 'Family Entertainment', 'Fashion'],
    ['Film', 'Food', 'Literature'],
    ['Music/Dj', 'Politics', 'Sport'],
    ['Technology', 'Theatre', 'Travel'],
    ['Wellness & Beauty', 'Wine & Spirits', 'Yoga'],
  ];

  const handleInterestToggle = (interest) => {
    const newInterests = formData.interests.includes(interest)
      ? formData.interests.filter((i) => i !== interest)
      : [...formData.interests, interest];
    setFormData({ ...formData, interests: newInterests });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {};

    // Validate required fields
    if (!formData.employmentStatus) {
      newErrors.employmentStatus = "Employment status is required";
    }
    if (!formData.preferredSocialMedia) {
      newErrors.preferredSocialMedia = "Preferred social media is required";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      // Scroll to first error
      const firstError = Object.keys(newErrors)[0];
      document.querySelector(`[name="${firstError}"]`)?.scrollIntoView({
        behavior: 'smooth',
        block: 'center'
      });
      return;
    }
    // Clear errors
    setErrors({});

    dispatch(updateStepData({ step: `step${currentStep}`, data: formData }));
    dispatch(nextStep());
    navigate('/register-5');
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
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${index < 4
                    ? 'bg-[#0A5440]'
                    : 'bg-white border-2 border-gray-300'
                    }`}
                >
                  {index < 3 ? (
                    <BsCheckCircleFill className='text-white' />
                  ) : index === 3 ? (
                    <span className='text-white'>4</span>
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
                  className={`w-12 md:w-32 h-[2px] ${index < 3 ? 'bg-[#0A5440]' : 'bg-gray-300'
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
          <span className='w-6 h-6 md:w-8 md:h-8 bg-[#eae5e7] rounded-full flex items-center justify-center text-white text-sm md:text-base'>
            👤
          </span>
          Occupation & Interest
        </h1>

        <form
          onSubmit={handleSubmit}
          className='bg-[#E3F8F959] p-4 md:p-8 rounded-lg space-y-4 md:space-y-8'
        >
          <div>
            <label className='block mb-1 md:mb-2 text-sm md:text-base'>
              Employment Status<span className='text-red-500'>*</span>
            </label>
            <select
              className={`w-full px-3 md:px-4 py-2 md:py-3 border rounded-lg appearance-none bg-white text-sm md:text-base ${errors.employmentStatus ? 'border-red-500' : ''
                }`}
              value={formData.employmentStatus}
              onChange={(e) =>
                setFormData({ ...formData, employmentStatus: e.target.value })
              }
              required
            >
              <option value=''>Select Option</option>
              <option value='employed'>Employed</option>
              <option value='self-employed'>Self-employed</option>
              <option value='retired'>Retired</option>
              <option value='student'>Student</option>
            </select>
          </div>
          <div>
            <label className='block mb-1 md:mb-2 text-sm md:text-base'>
              Bussiness Name / Organization / Institution
            </label>
            <input
              type='text'
              placeholder='Enter your bussiness or organization or institution'
              className='w-full px-3 md:px-4 py-2 md:py-3 border rounded-lg text-sm md:text-base'
              value={formData.businessName || ''}
              onChange={(e) =>
                setFormData({ ...formData, businessName: e.target.value })
              }
            />
          </div>
          <div>
            <h3 className='text-lg md:text-xl font-medium text-center mb-2 md:mb-4'>
              Your Interest
            </h3>
            <p className='text-center text-gray-600 mb-4 md:mb-6 text-sm md:text-base'>
              Please select all/any interests from the following:
            </p>
            <div className='grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-2 md:gap-4'>
              {interests.flat().map((interest, index) => (
                <label
                  key={index}
                  className='flex items-center gap-2 text-sm md:text-base'
                >
                  <input
                    type='checkbox'
                    checked={formData.interests.includes(interest)}
                    onChange={() => handleInterestToggle(interest)}
                    className='w-4 h-4 rounded border-gray-300'
                  />
                  <span>{interest}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className='block mb-1 md:mb-2 text-sm md:text-base'>
              Are you a member of any other club?
            </label>
            <input
              type='text'
              placeholder='Enter club name'
              className='w-full px-3 md:px-4 py-2 md:py-3 border rounded-lg text-sm md:text-base'
              value={formData.otherClubMembership}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  otherClubMembership: e.target.value,
                })
              }
            />
          </div>

          <div>
            <label className='block mb-1 md:mb-2 text-sm md:text-base'>
              Preferred Social Media Platform
              <span className='text-red-500'>*</span>
            </label>
            <select
              className={`w-full px-3 md:px-4 py-2 md:py-3 border rounded-lg appearance-none bg-white text-sm md:text-base ${errors.preferredSocialMedia ? 'border-red-500' : ''
                }`}
              value={formData.preferredSocialMedia}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  preferredSocialMedia: e.target.value,
                })
              }
              required
            >
              <option value=''>Select an Option</option>
              <option value='facebook'>Facebook</option>
              <option value='instagram'>Instagram</option>
              <option value='twitter'>Twitter</option>
              <option value='linkedin'>LinkedIn</option>
            </select>
          </div>

          <label className='flex items-start gap-2'>
            <input
              type='checkbox'
              checked={formData.marketingConsent}
              onChange={(e) =>
                setFormData({ ...formData, marketingConsent: e.target.checked })
              }
              className='mt-1 w-4 h-4 rounded border-gray-300'
            />
            <span className='text-xs md:text-sm text-gray-600'>
              By ticking this box, you are confirming that you are happy to
              receive marketing communications from us. You can choose to
              unsubscribe at any time by clicking unsubscribe in the footer of
              the email.
            </span>
          </label>
        </form>

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
              to='/register-3'
              className='text-gray-600 font-medium text-sm md:text-base'
              onClick={() => dispatch(prevStep())}
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

export default RegisterStep4;
