import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { BsCheckCircleFill } from 'react-icons/bs';
import Footer from '../../../components/Footer';
import logo_white from '../../../assets/logo_white.png';
import bg_image from '../../../assets/party3.jpg';
import { useSelector, useDispatch } from 'react-redux';
import { nextStep, updateStepData } from '../../../features/auth/registerSlice';
import { reset } from '../../../features/auth/registerSlice';

const Register = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(reset());
  }, []);
  const { currentStep } = useSelector((state) => state.register);
  const navigate = useNavigate();
  const handleUpdateStep = () => {
    dispatch(updateStepData({ step: `step${currentStep}`, data: {} }));
    dispatch(nextStep());
    navigate('/register-2');
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
          <div className='container mx-auto px-4 flex justify-center items-center w-full'>
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

      {/* Progress Steps - Responsive version */}
      <div className='container mx-auto px-4 py-6 mt-8'>
        <div className='flex flex-wrap justify-center gap-4 pb-6 md:pb-0'>
          {[...Array(7)].map((_, index) => (
            <div key={index} className='flex items-center flex-shrink-0 mb-4'>
              <div className='relative'>
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    index < 1
                      ? 'bg-[#0A5440]'
                      : 'bg-white border-2 border-gray-300'
                  }`}
                >
                  {index < 0 ? (
                    <BsCheckCircleFill className='text-white' />
                  ) : index === 0 ? (
                    <span className='text-white'>1</span>
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
                    index < 0 ? 'bg-[#0A5440]' : 'bg-gray-300'
                  }`}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div
        className='container mx-auto sm:mx-12 lg:mx-28 md:24 px-4 py-8 md:py-12 max-w-3xl sm:max-w-2xl md:max-w-3xl lg:max-w-4xl xl:max-w-5xl flex-grow'
        style={{ margin: 'auto' }}
      >
        <h1 className='text-2xl md:text-3xl font-medium text-center mb-6 md:mb-8 text-[#540A26]'>
          Membership
        </h1>

        <div className='space-y-4 md:space-y-6 text-gray-600'>
          <p className='text-center text-sm md:text-base'>
            Please note that all sections must be completed in order for this
            application to be submitted to the Committee. Any application
            missing information will be deemed incomplete and therefore not to
            be considered.
          </p>

          <p className='text-center text-sm md:text-base mb-4 md:mb-8'>
            In order to apply for membership you will need to include:
          </p>

          <div className='space-y-6 md:space-y-8'>
            <div>
              <h2 className='font-medium text-black mb-2 text-sm md:text-base'>
                1. Clear Recent Headshot
              </h2>
              <p className='text-sm md:text-base'>
                Please upload a recent head and shoulders picture of yourself.
                This will be used for security purposes to verify your identity
                upon your arrival to the Club. Therefore, please ensure the
                picture is representative of how you will appear when visiting
                the Club.
              </p>
            </div>
            <hr />
            <div>
              <h2 className='font-medium text-black mb-2 text-sm md:text-base'>
                2. Proof of ID
              </h2>
              <p className='text-sm md:text-base'>
                (e.g. Drivers License, Passport or ID card). Applicants must be
                over 18 years of age.
              </p>
            </div>
            <hr />

            <div>
              <h2 className='font-medium text-black mb-2 text-sm md:text-base'>
                3. Referrals
              </h2>
              <p className='text-sm md:text-base'>
                A referral who is currently a Hevsuite Club Member is mandatory
                for this application. All potential members should be aware that
                we do not accept membership applications through third parties
                (including any agencies or concierges) or social media accounts.
                The only way to apply for membership is via our website.
              </p>
            </div>
            <hr />

            <div>
              <h2 className='font-medium text-black mb-2 text-sm md:text-base'>
                4. Payment
              </h2>
              <p className='text-sm md:text-base'>
                To finalise your application, we kindly ask you to fill out both
                a Direct Debit mandate and your credit/debit card details which
                will be used to take payment for joining and non-engagement (see
                our support link for more). Payment only be taken after you’ve
                successfully been accepted by our members.
              </p>
            </div>

            <div>
              <p className='font-semibold'>
                PS - Non-engagement fee is paid ONLY for not attending any
                occasion every 28 days.
              </p>
            </div>
          </div>
        </div>

        <div className='text-center mt-8 md:mt-12'>
          <button
            className='inline-flex border-2 border-[#540A26] rounded-3xl items-center px-6 py-2 text-[#540A26] text-base md:text-lg font-medium hover:bg-[#540A26] hover:text-white transition-colors'
            onClick={handleUpdateStep}
          >
            Continue <span className='ml-2'>→</span>
          </button>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Register;
