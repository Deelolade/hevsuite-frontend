import React, { useState, useEffect, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BsCheckCircleFill } from 'react-icons/bs';
import Footer from '../../../components/Footer';
import logo_white from '../../../assets/logo_white.png';
import bg_image from '../../../assets/party3.jpg';
import Swal from 'sweetalert2';
import { showModal } from '../../../components/FireModal';
import { CountrySelect, GetCountries } from 'react-country-state-city';
import 'react-country-state-city/dist/react-country-state-city.css';
import { useSelector, useDispatch } from 'react-redux';
import {
  prevStep,
  nextStep,
  updateStepData,
  reset,
} from '../../../features/auth/registerSlice';
import ProgressSteps from './ProgressSteps';

const RegisterStep2 = () => {
  useEffect(() => {
    window.scrollTo({ top: 50, behavior: 'smooth' });
  }, []);

  const navigate = useNavigate();
  const { Settings } = useSelector((state) => state.generalSettings);
  const { currentStep, formData: data } = useSelector(
    (state) => state.register
  );

  const [countries, setCountries] = useState([]);

  const [formData, setFormData] = useState({ ...data.step2 });
  const [errors, setErrors] = useState({});

  const dispatch = useDispatch();

  const handleTextChange = (txt, key) => {
    const trimmed = txt.trim();

    if (!trimmed) {
      // Clear country if user clears input
      setFormData((prev) => ({ ...prev, [key]: '' }));
      return;
    }

    const match = countries.find(
      (c) => c.name.toLowerCase() === txt.trim().toLowerCase()
    );
    if (match) setFormData((prev) => ({ ...prev, [key]: match }));       // ✅ auto‑select
  };

  const changeNationalityHandler = (country, key) => {
    setFormData((prev) => ({ ...prev, [key]: country.name }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Check if the form is valid before proceeding
    const newErrors = {};

    if (!formData.title) newErrors.title = "Title is required";
    if (!formData.forename) newErrors.forename = "Forename is required";
    if (!formData.surname) newErrors.surname = "Surname is required";
    if (!formData.gender) newErrors.gender = "Gender is required";
    if (!formData.dob) {
      newErrors.dob = "Date of birth is required";
    } else {
      // ✅ Age validation
      const birthDate = new Date(formData.dob);
      const today = new Date();
      const age = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();
      const dayDiff = today.getDate() - birthDate.getDate();

      const isBirthdayPassed = monthDiff > 0 || (monthDiff === 0 && dayDiff >= 0);
      const actualAge = isBirthdayPassed ? age : age - 1;

      const minAge = Settings?.requiredJoiningAge ?? 18;
      if (actualAge < minAge) {
        newErrors.dob = `You must be at least ${minAge} years old.`;
      }
    }
    if (!formData.nationality) newErrors.nationality = "Nationality is required";
    if (!formData.relationshipStatus)
      newErrors.relationshipStatus = "Relationship status is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Clear errors
    setErrors({});
    dispatch(updateStepData({ step: `step${currentStep}`, data: formData }));
    dispatch(nextStep());
    navigate('/register-3');
  };

  useEffect(() => {
    GetCountries().then(setCountries); 
  }, []);

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
          <ProgressSteps />
          
        </div>
      </div>

      {/* Main Content */}
      <div className='container mx-auto px-4 py-8 md:py-12 max-w-3xl flex-grow'>
        <h1 className='text-2xl md:text-3xl font-medium text-center mb-8 md:mb-12 flex items-center justify-center gap-2 md:gap-3 text-[#540A26]'>
          <span className='w-8 h-8 md:w-8 md:h-8 bg-[#eae5e7] rounded-full flex items-center justify-center text-white text-sm md:text-base'>
            👤
          </span>
          Personal Details
        </h1>

        <form
          onSubmit={handleSubmit}
          className='bg-[#E3F8F959] p-4 md:p-8 rounded-lg space-y-4 md:space-y-6'
        >
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6'>
            <div className='col-span-1'>
              <label className='block mb-1 md:mb-2 text-sm md:text-base'>
                Title<span className='text-red-500'>*</span>
              </label>
              <select
                className={`w-full px-3 md:px-4 py-2 md:py-3 border rounded-lg appearance-none bg-white text-sm md:text-base ${errors.title ? 'border-red-500' : ''}`}
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                required
              >
                <option value=''>Select title</option>
                <option value='Mr'>Mr</option>
                <option value='Mrs'>Mrs</option>
                <option value='Miss'>Miss</option>
                <option value='Ms'>Ms</option>
                <option value='Dr'>Dr</option>
              </select>
              {errors.title ? <p className="text-red-500 text-xs mt-1">{errors.title}</p> : <></>}
            </div>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6'>
            <div>
              <label className='block mb-1 md:mb-2 text-sm md:text-base'>
                Forename<span className='text-red-500'>*</span>
              </label>
              <input
                type='text'
                placeholder='Enter first name'
                className={`w-full px-3 md:px-4 py-2 md:py-3 border rounded-lg text-sm md:text-base ${errors.forename ? 'border-red-500' : ''}`}
                value={formData.forename}
                onChange={(e) =>
                  setFormData({ ...formData, forename: e.target.value })
                }
                required
              />
              {errors.forename && <p className="text-red-500 text-xs mt-1">{errors.forename}</p>}
            </div>
            <div>
              <label className='block mb-1 md:mb-2 text-sm md:text-base'>
                Surname<span className='text-red-500'>*</span>
              </label>
              <input
                type='text'
                placeholder='Enter surname'
                className={`w-full px-3 md:px-4 py-2 md:py-3 border rounded-lg text-sm md:text-base ${errors.surname ? 'border-red-500' : ''}`}
                value={formData.surname}
                onChange={(e) =>
                  setFormData({ ...formData, surname: e.target.value })
                }
                required
              />
              {errors.surname && <p className="text-red-500 text-xs mt-1">{errors.surname}</p>}
            </div>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6'>
            <div>
              <label className='block mb-1 md:mb-2 text-sm md:text-base'>
                Gender<span className='text-red-500'>*</span>
              </label>
              <select
                name='gender'
                className={`w-full px-3 md:px-4 py-2 md:py-3 border rounded-lg appearance-none bg-white text-sm md:text-base ${errors.gender ? 'border-red-500' : ''}`}
                value={formData.gender}
                onChange={(e) =>
                  setFormData({ ...formData, gender: e.target.value })
                }
                required
              >
                <option value=''>Select Gender</option>
                <option value='male'>Male</option>
                <option value='female'>Female</option>
              </select>
              {errors.gender && <p className="text-red-500 text-xs mt-1">{errors.gender}</p>}
            </div>
            <div>
              <label className='block mb-1 md:mb-2 text-sm md:text-base'>
                Date of Birth<span className='text-red-500'>*</span>
              </label>
              <input
                type='date'
                className={`w-full px-3 md:px-4 py-2 md:py-3 border rounded-lg text-sm md:text-base ${errors.dob ? 'border-red-500' : ''}`}
                value={formData.dob}
                onChange={(e) =>
                  setFormData({ ...formData, dob: e.target.value })
                }
                required
              />
              {errors.dob && <p className="text-red-500 text-xs mt-1">{errors.dob}</p>}
            </div>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6'>
            <div>
              <label className='block mb-1 md:mb-2 text-sm md:text-base'>
                Nationality<span className='text-red-500'>*</span>
              </label>
              <div className={`${errors.nationality ? 'border border-red-500' : ''}`}>
                <CountrySelect
                  autoComplete='off'
                  onChange={(country) =>
                    changeNationalityHandler(country, 'nationality')
                  }
                  onTextChange={(e) =>  handleTextChange(e.target.value, "nationality")
                    // setFormData((prev) => ({ ...prev, nationality: '' }))
                  }
                  defaultValue={formData.nationality}
                  placeHolder='Select Country'
                  style={{
                    width: '100%',
                    padding: '8px',
                    borderRadius: '5px',
                    border: 'none',
                    fontSize: '16px',
                  }}
                />
              </div>
              {errors.nationality && <p className="text-red-500 text-xs mt-1">{errors.nationality}</p>}
            </div>
            <div>
              <label className='block mb-1 md:mb-2 text-sm md:text-base'>
                Additional Nationality
              </label>
              <CountrySelect
                onChange={(country) =>
                  changeNationalityHandler(country, 'additionalNationality')
                }
                onTextChange={(e) =>  handleTextChange(e.target.value, "additionalNationality")}
                // onTextChange={() =>
                //   setFormData((prev) => ({
                //     ...prev,
                //     additionalNationality: '',
                //   }))
                // }
                placeHolder='Select Additional Country'
                defaultValue={formData.additionalNationality}
                style={{
                  width: '100%',
                  padding: '8px',
                  borderRadius: '5px',
                  border: 'none',
                  fontSize: '16px',
                }}
              />
            </div>
          </div>

          <div>
            <label className='block mb-1 md:mb-2 text-sm md:text-base'>
              Relationship Status<span className='text-red-500'>*</span>
            </label>
            <select
              className={`w-full px-3 md:px-4 py-2 md:py-3 border rounded-lg appearance-none bg-white text-sm md:text-base ${errors.relationshipStatus ? 'border-red-500' : ''}`}
              value={formData.relationshipStatus}
              onChange={(e) =>
                setFormData({ ...formData, relationshipStatus: e.target.value })
              }
              required
            >
              <option value=''>Select Status</option>
              <option value='single'>Single</option>
              <option value='married'>Married</option>
              <option value='divorced'>Divorced</option>
              <option value='widowed'>Widowed</option>
            </select>
            {errors.relationshipStatus && (
              <p className="text-red-500 text-xs mt-1">{errors.relationshipStatus}</p>
            )}
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
              to='/register'
              className='text-quatr font-medium text-sm md:text-base'
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

export default RegisterStep2;
