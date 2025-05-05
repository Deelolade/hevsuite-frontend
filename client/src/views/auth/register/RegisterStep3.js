import React, { useState, useEffect, use } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BsCheckCircleFill } from 'react-icons/bs';
import Footer from '../../../components/Footer';
import logo_white from '../../../assets/logo_white.png';
import bg_image from '../../../assets/party3.jpg';
import Swal from 'sweetalert2';
import { showModal } from '../../../components/FireModal';
import {
  CountrySelect,
  StateSelect,
  PhonecodeSelect,
} from 'react-country-state-city';
import 'react-country-state-city/dist/react-country-state-city.css';
import { useSelector, useDispatch } from 'react-redux';
import {
  prevStep,
  nextStep,
  updateStepData,
  reset,
} from '../../../features/auth/registerSlice';

const RegisterStep3 = () => {
  useEffect(() => {
    window.scrollTo({ top: 50, behavior: 'smooth' });
  }, []);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { currentStep, formData: data } = useSelector(
    (state) => state.register
  );

  const [formData, setFormData] = useState({ ...data.step3 });
  const [errors, setErrors] = useState({});
  const [countryId, setCountryId] = useState('');
  const [primaryPhoneCode, setPrimaryPhoneCode] = useState('');
  const [secondaryPhoneCode, setSecondaryPhoneCode] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
      // Validate required fields for step 3
  const newErrors = {};
  
  if (!formData.addressLine1) newErrors.addressLine1 = "Address Line 1 is required";
  if (!formData.city) newErrors.city = "City is required";
  if (!formData.country) newErrors.country = "Country is required";
  if (!formData.postcode) {
    newErrors.postcode = "Postcode is required";
  } else if (!/^\d+$/.test(formData.postcode)) {
    newErrors.postcode = "Postcode should contain only numbers";
  }
  if (!formData.state) newErrors.state = "State is required";
  if (!formData.primaryPhone) {
    newErrors.primaryPhone = "Primary phone is required";
  } else if (!/^\d+$/.test(formData.primaryPhone)) {
    newErrors.primaryPhone = "Phone number should contain only numbers";
  }

  if (formData.secondaryPhone && !/^\d+$/.test(formData.secondaryPhone)) {
    newErrors.secondaryPhone = "Phone number should contain only numbers";
  }
  // Add this validation function
const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

// In your handleSubmit:
if (!formData.primaryEmail) {
  newErrors.primaryEmail = "Primary email is required";
} else if (!validateEmail(formData.primaryEmail)) {
  newErrors.primaryEmail = "Please enter a valid email address";
}

if (formData.secondaryEmail && !validateEmail(formData.secondaryEmail)) {
  newErrors.secondaryEmail = "Please enter a valid email address";
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

    dispatch(
      updateStepData({
        step: `step${currentStep}`,
        data: {
          ...formData,
          primaryPhone: `${primaryPhoneCode}${formData.primaryPhone}`,
          secondaryPhone: `${secondaryPhoneCode}${formData.secondaryPhone}`,
        },
      })
    );
    dispatch(nextStep());
    navigate('/register-4');
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
            <img
              src={logo_white}
              alt='Hevsuite Club'
              className='h-12 md:h-16'
            />
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
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    index < 3
                      ? 'bg-[#0A5440]'
                      : 'bg-white border-2 border-gray-300'
                  }`}
                >
                  {index < 2 ? (
                    <BsCheckCircleFill className='text-white' />
                  ) : index === 2 ? (
                    <span className='text-white'>3</span>
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
                  className={`w-12 md:w-32 h-[2px] ${
                    index < 2 ? 'bg-[#0A5440]' : 'bg-gray-300'
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
            📍
          </span>
          Contact Details
        </h1>

        <form
          onSubmit={handleSubmit}
          className='bg-[#E3F8F959] p-4 md:p-8 rounded-lg space-y-4 md:space-y-6'
        >
          <div>
            <label className='block mb-1 md:mb-2 text-sm md:text-base'>
              Address Line 1<span className='text-red-500'>*</span>
            </label>
            <input
              type='text'
              placeholder='Address Line 1'
              className={`w-full px-3 md:px-4 py-2 md:py-3 border rounded-lg text-sm md:text-base ${
                errors.addressLine1 ? 'border-red-500' : ''
              }`}
              value={formData.addressLine1}
              onChange={(e) =>
                setFormData({ ...formData, addressLine1: e.target.value })
              }
              required
            />
          </div>

          <div>
            <label className='block mb-1 md:mb-2 text-sm md:text-base'>
              Town/City<span className='text-red-500'>*</span>
            </label>
            <input
              type='text'
              placeholder='Town/City'
              className={`w-full px-3 md:px-4 py-2 md:py-3 border rounded-lg text-sm md:text-base ${
                errors.city ? 'border-red-500' : ''
              }`}
              value={formData.city}
              onChange={(e) =>
                setFormData({ ...formData, city: e.target.value })
              }
              required
            />
          </div>

          <div>
            <label className='block mb-1 md:mb-2 text-sm md:text-base'>
              Country<span className='text-red-500'>*</span>
            </label>
            <CountrySelect
              onChange={(country) => {
                setFormData((prev) => ({
                  ...prev,
                  country: country.name,
                }));
                setCountryId(country.id);
              }}
              onTextChange={() => {
                setFormData((prev) => ({
                  ...prev,
                  country: '',
                  countryId: '',
                  state: '',
                }));
              }}
              defaultValue={formData.country}
              placeHolder='Select Country'
              style={{
                width: '100%',
                padding: '8px',
                borderRadius: '5px',
                border: errors.country ? '1px solid #EF4444' : 'none',
                fontSize: '16px',
              }}
            />
          </div>

          <div>
            <label className='block mb-1 md:mb-2 text-sm md:text-base'>
              Postcode/Zipcode<span className='text-red-500'>*</span>
            </label>
            <input
              type='text'
              placeholder='Postcode/Zipcode'
              className={`w-full px-3 md:px-4 py-2 md:py-3 border rounded-lg text-sm md:text-base ${
                errors.postcode ? 'border-red-500' : ''
              }`}
              value={formData.postcode}
              onChange={(e) =>
                setFormData({ ...formData, postcode: e.target.value })
              }
              required
            />
          </div>

          <div>
            <label className='block mb-1 md:mb-2 text-sm md:text-base'>
              Primary Email<span className='text-red-500'>*</span>
            </label>
            <input
              type='email'
              placeholder='Enter email address'
              className={`w-full px-3 md:px-4 py-2 md:py-3 border rounded-lg text-sm md:text-base ${
                errors.primaryEmail ? 'border-red-500' : ''
              }`}
              value={formData.primaryEmail}
              onChange={(e) =>
                setFormData({ ...formData, primaryEmail: e.target.value })
              }
              required
            />
          </div>

          <div>
            <label className='block mb-1 md:mb-2 text-sm md:text-base'>
              Secondary Email
            </label>
            <input
              type='email'
              placeholder='Enter email address'
              className={`w-full px-3 md:px-4 py-2 md:py-3 border rounded-lg text-sm md:text-base ${
                errors.secondaryEmail ? 'border-red-500' : ''
              }`}
              value={formData.secondaryEmail}
              onChange={(e) =>
                setFormData({ ...formData, secondaryEmail: e.target.value })
              }
            />
          </div>

          <div>
            <label className='block mb-1 md:mb-2 text-sm md:text-base'>
              State<span className='text-red-500'>*</span>
            </label>
            <StateSelect
              countryid={countryId}
              placeHolder='Select State'
              onChange={(state) => {
                setFormData((prev) => ({ ...prev, state: state.name }));
              }}
              onTextChange={() => {
                setFormData((prev) => ({ ...prev, state: '' }));
              }}
              style={{
                width: '100%',
                padding: '8px',
                borderRadius: '5px',
                border: errors.state ? '1px solid #EF4444' : 'none',
                fontSize: '16px',
              }}
            />
          </div>

          <div>
            <label className='block mb-1 md:mb-2 text-sm md:text-base'>
              Primary Phone<span className='text-red-500'>*</span>
            </label>
            <div className='grid grid-cols-3 gap-2 md:gap-4'>
              <PhonecodeSelect
                onChange={(code) => setPrimaryPhoneCode(code.phone_code)}
                onTextChange={() => setPrimaryPhoneCode('')}
                defaultValue={primaryPhoneCode}
                placeHolder='Select Phone Code'
                style={{
                  width: '100%',
                  padding: '8px',
                  borderRadius: '5px',
                  border: 'none',
                  fontSize: '16px',
                }}
              />
              <input
                type='tel'
                placeholder='Telephone'
                className={`col-span-2 px-3 md:px-4 py-2 md:py-3 border rounded-lg text-sm md:text-base ${
                  errors.primaryPhone ? 'border-red-500' : ''
                }`}
                value={formData.primaryPhone}
                onChange={(e) =>
                  setFormData({ ...formData, primaryPhone: e.target.value })
                }
                required
              />
            </div>
          </div>

          <div>
            <label className='block mb-1 md:mb-2 text-sm md:text-base'>
              Secondary Phone
            </label>
            <div className='grid grid-cols-3 gap-2 md:gap-4'>
              <PhonecodeSelect
                onChange={(code) => setSecondaryPhoneCode(code.phone_code)}
                onTextChange={() => setSecondaryPhoneCode('')}
                defaultValue={secondaryPhoneCode}
                placeHolder='Select Phone Code'
                style={{
                  width: '100%',
                  padding: '8px',
                  borderRadius: '5px',
                  border: 'none',
                  fontSize: '16px',
                }}
              />
              <input
                type='tel'
                placeholder='Mobile'
                className={`col-span-2 px-3 md:px-4 py-2 md:py-3 border rounded-lg text-sm md:text-base ${
                  errors.secondaryPhone ? 'border-red-500' : ''
                }`}
                value={formData.secondaryPhone}
                onChange={(e) =>
                  setFormData({ ...formData, secondaryPhone: e.target.value })
                }
              />
            </div>
          </div>
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
              to='/register-2'
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

export default RegisterStep3;
