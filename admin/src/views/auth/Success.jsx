import React from 'react';
import { useNavigate } from 'react-router-dom';
import logo_white from '../../assets/logo_white.png';
import { BsCheck2Circle } from 'react-icons/bs';
import authImage from '../../assets/image.jpg';

const Success = () => {
  const navigate = useNavigate();

  return (
    <div className='flex h-screen'>
      <div
        className='md:w-2/5 w-full absolute md:relative pb-2 bg-[#1A1A1A] flex items-center justify-center p-8'
        style={{
          backgroundImage: `url(${authImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className='text-center'>
          <img src={logo_white} alt='logo' className='w-32 h-32 mx-auto mb-6' />
          <h1 className='text-white text-[40px] font-primary'>Hevsuite Club</h1>
        </div>
      </div>
      <div className='flex-1 mt-20 md:mt-0 flex flex-col justify-center px-[52px] bg-white'>
        <div className='w-full max-w-[380px] mx-auto text-center'>
          <BsCheck2Circle className='text-[#0A5438] text-8xl mx-auto mb-4' />
          <h1 className='text-[32px] font-primary mb-3'>
            Successfully Enabled
          </h1>

          <button
            onClick={() => navigate('/admin')}
            className='w-64 py-3.5 rounded-3xl bg-gradient-to-r from-primary to-[#0A5440] text-white text-sm font-secondary'
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
};

export default Success;
