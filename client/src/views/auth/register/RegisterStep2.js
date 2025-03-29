import React, { useState, useEffect, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BsCheckCircleFill } from 'react-icons/bs';
import Footer from '../../../components/Footer';
import logo_white from '../../../assets/logo_white.png';
import bg_image from '../../../assets/party3.jpg';
import Swal from 'sweetalert2';
import { showModal } from '../../../components/FireModal';
import { CountrySelect } from 'react-country-state-city';
import 'react-country-state-city/dist/react-country-state-city.css';

const RegisterStep2 = () => {
  useEffect(() => {
    window.scrollTo({ top: 50, behavior: 'smooth' });
  }, []);

  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    forename: '',
    surname: '',
    gender: '',
    dateOfBirth: '',
    nationality: '',
    additionalNationality: '',
    relationshipStatus: '',
  });

  const steps = [
    { number: '1', label: 'Step 1', completed: true },
    { number: '2', label: 'Step2', active: true },
    { number: '03', label: 'Step 3' },
    { number: '04', label: 'Step 4' },
    { number: '05', label: 'Step 5' },
    { number: '06', label: 'Step 6' },
    { number: '07', label: 'Step 7' },
  ];

  const changeNationalityHandler = (country, key) => {
    setFormData((prev) => ({ ...prev, [key]: country.name }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add form submission logic here
    navigate('/register-3');
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
                    index < 2
                      ? 'bg-[#0A5440]'
                      : 'bg-white border-2 border-gray-300'
                  }`}
                >
                  {index < 1 ? (
                    <BsCheckCircleFill className='text-white' />
                  ) : index === 1 ? (
                    <span className='text-white'>2</span>
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
                    index < 1 ? 'bg-[#0A5440]' : 'bg-gray-300'
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
                className='w-full px-3 md:px-4 py-2 md:py-3 border rounded-lg appearance-none bg-white text-sm md:text-base'
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
                className='w-full px-3 md:px-4 py-2 md:py-3 border rounded-lg text-sm md:text-base'
                value={formData.forename}
                onChange={(e) =>
                  setFormData({ ...formData, forename: e.target.value })
                }
                required
              />
            </div>
            <div>
              <label className='block mb-1 md:mb-2 text-sm md:text-base'>
                Surname<span className='text-red-500'>*</span>
              </label>
              <input
                type='text'
                placeholder='Enter surname'
                className='w-full px-3 md:px-4 py-2 md:py-3 border rounded-lg text-sm md:text-base'
                value={formData.surname}
                onChange={(e) =>
                  setFormData({ ...formData, surname: e.target.value })
                }
                required
              />
            </div>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6'>
            <div>
              <label className='block mb-1 md:mb-2 text-sm md:text-base'>
                Gender<span className='text-red-500'>*</span>
              </label>
              <select
                className='w-full px-3 md:px-4 py-2 md:py-3 border rounded-lg appearance-none bg-white text-sm md:text-base'
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
            </div>
            <div>
              <label className='block mb-1 md:mb-2 text-sm md:text-base'>
                Date of Birth<span className='text-red-500'>*</span>
              </label>
              <input
                type='date'
                className='w-full px-3 md:px-4 py-2 md:py-3 border rounded-lg text-sm md:text-base'
                value={formData.dateOfBirth}
                onChange={(e) =>
                  setFormData({ ...formData, dateOfBirth: e.target.value })
                }
                required
              />
            </div>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6'>
            <div>
              <label className='block mb-1 md:mb-2 text-sm md:text-base'>
                Nationality<span className='text-red-500'>*</span>
              </label>
              <CountrySelect
                onChange={(country) =>
                  changeNationalityHandler(country, 'nationality')
                }
                onTextChange={() =>
                  setFormData((prev) => ({ ...prev, nationality: '' }))
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
            <div>
              <label className='block mb-1 md:mb-2 text-sm md:text-base'>
                Additional Nationality
              </label>
              <CountrySelect
                onChange={(country) =>
                  changeNationalityHandler(country, 'additionalNationality')
                }
                onTextChange={() =>
                  setFormData((prev) => ({
                    ...prev,
                    additionalNationality: '',
                  }))
                }
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
              className='w-full px-3 md:px-4 py-2 md:py-3 border rounded-lg appearance-none bg-white text-sm md:text-base'
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
                    navigate('/');
                  },
                })
              }
            >
              CANCEL
            </Link>
            <Link
              to='/register'
              className='text-gray-600 font-medium text-sm md:text-base'
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
