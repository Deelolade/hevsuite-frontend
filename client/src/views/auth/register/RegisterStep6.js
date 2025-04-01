import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BsCheckCircleFill, BsThreeDotsVertical } from 'react-icons/bs';
import Modal from 'react-modal';
import { IoClose } from 'react-icons/io5';
import Footer from '../../../components/Footer';
import avatar from '../../../assets/user.avif';
import logo_white from '../../../assets/logo_white.png';
import bg_image from '../../../assets/party3.jpg';
import RegisterApproval from './RegisterApproval';
import Swal from 'sweetalert2';
import { showModal } from '../../../components/FireModal';
import referralService from '../../../services/referralService';

const RegisterStep6 = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMembers, setSelectedMembers] = useState([]);
  const [isReferralModalOpen, setIsReferralModalOpen] = useState(false);
  const [approval, setApproval] = useState(true);

  useEffect(() => {
    window.scrollTo({ top: 50, behavior: 'smooth' });

    const checkReferral = async () => {
      const response = await referralService.checkReferral();
      console.log(response);
    };
    checkReferral();
  }, []);

  const members = [
    {
      id: 1,
      name: 'Andrew Bojangles',
      email: 'some@gmail.com',
      type: 'Member',
      avatar: avatar,
    },
    // ... other members
  ];

  const modalStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      transform: 'translate(-50%, -50%)',
      maxWidth: '400px',
      width: '90%',
      padding: '24px',
      border: 'none',
      borderRadius: '24px',
      backgroundColor: 'white',
    },
    overlay: {
      backgroundColor: 'rgba(0, 0, 0, 0.75)',
    },
  };

  const handleMemberSelect = (memberId) => {
    if (selectedMembers.includes(memberId)) {
      setSelectedMembers(selectedMembers.filter((id) => id !== memberId));
    } else if (selectedMembers.length < 3) {
      setSelectedMembers([...selectedMembers, memberId]);
    }
  };

  const handleSubmit = () => {
    navigate('/register-7');
  };

  const handleSendReferral = () => {
    if (selectedMembers.length > 0) {
      setIsReferralModalOpen(true);
    }
  };

  return (
    <div className='min-h-screen flex flex-col'>
      <div className='relative text-white'>
        <div className='absolute inset-0 z-0'>
          <img
            src={bg_image}
            alt='background'
            className='w-full h-[120px] object-cover brightness-50 object-cover'
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
                    index < 6
                      ? 'bg-[#0A5440]'
                      : 'bg-white border-2 border-gray-300'
                  }`}
                  onClick={() => {
                    if (index === 6) handleSubmit();
                  }}
                >
                  {index < 5 ? (
                    <BsCheckCircleFill className='text-white' />
                  ) : index === 5 ? (
                    <span className='text-white'>6</span>
                  ) : (
                    <span className='text-gray-500'>{`0${index + 1}`}</span>
                  )}
                </div>
                <p
                  onClick={() => {
                    if (index === 6) handleSubmit();
                  }}
                  className='absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap text-xs md:text-sm'
                >
                  Step {index + 1}
                </p>
              </div>
              {index < 6 && (
                <div
                  className={`w-12 md:w-32 h-[2px] ${
                    index < 5 ? 'bg-[#0A5440]' : 'bg-gray-300'
                  }`}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      {approval ? (
        <RegisterApproval setApproval={setApproval} />
      ) : (
        <div className='container mx-auto px-4 py-8 md:py-12 max-w-3xl flex-grow'>
          <h1 className='text-2xl md:text-3xl font-medium text-center mb-8 md:mb-12 flex items-center justify-center gap-2 md:gap-3 text-[#540A26]'>
            <span className='w-6 h-6 md:w-8 md:h-8 bg-[#eae5e7] rounded-full flex items-center justify-center text-white text-sm md:text-base'>
              👥
            </span>
            Select Your Referrals
          </h1>

          <div className='bg-[#E3F8F959] rounded-lg p-4 md:p-6'>
            <div className='flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-4 md:mb-6'>
              <div className='relative flex-1 w-full max-w-md'>
                <input
                  type='text'
                  placeholder='Search members'
                  className='w-full pl-10 pr-4 py-2 border rounded-lg text-sm md:text-base'
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <svg
                  className='w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
                  />
                </svg>
              </div>
              <button
                className='px-4 py-2 bg-[#540A26] text-white rounded-lg text-sm md:text-base w-full sm:w-auto'
                onClick={handleSendReferral}
              >
                Send Referral
              </button>
            </div>

            <div className='space-y-2'>
              {members.map((member) => (
                <div
                  key={member.id}
                  className='flex flex-wrap sm:flex-nowrap items-center justify-between p-3 md:p-4 bg-gray-50 rounded-lg'
                >
                  <div className='flex items-center gap-2 md:gap-4 w-full sm:w-auto'>
                    <input
                      type='checkbox'
                      checked={selectedMembers.includes(member.id)}
                      onChange={() => handleMemberSelect(member.id)}
                      className='w-4 h-4 rounded border-gray-300'
                    />
                    <img
                      src={member.avatar}
                      alt={member.name}
                      className='w-8 h-8 md:w-10 md:h-10 rounded-full object-cover'
                    />
                    <div>
                      <h3 className='font-medium text-sm md:text-base'>
                        {member.name}
                      </h3>
                      <p className='text-gray-500 text-xs md:text-sm'>
                        {member.email}
                      </p>
                    </div>
                  </div>
                  <div className='flex items-center gap-2 md:gap-4 mt-2 sm:mt-0 ml-auto sm:ml-0'>
                    <span className='text-gray-500 text-xs md:text-base'>
                      {member.type}
                    </span>
                    <button className='text-gray-400'>
                      <BsThreeDotsVertical size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <p className='text-gray-500 text-xs md:text-sm mt-4'>
              Note: you can select only 3 members
            </p>
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
                      navigate('/');
                    },
                  })
                }
              >
                CANCEL
              </Link>
              <Link
                to='/register-5'
                className='text-gray-600 font-medium text-sm md:text-base'
              >
                BACK
              </Link>
            </div>
            <button
              onClick={() => setApproval(true)}
              className='px-4 md:px-6 py-1 md:py-2 text-[#540A26] border-2 border-[#540A26] rounded-3xl text-sm md:text-base hover:bg-[#540A26] hover:text-white transition-colors'
            >
              Continue →
            </button>
          </div>
        </div>
      )}

      <Footer />

      <Modal
        isOpen={isReferralModalOpen}
        onRequestClose={() => setIsReferralModalOpen(false)}
        style={modalStyles}
        contentLabel='Referral Confirmation Modal'
      >
        <div className='relative'>
          <button
            onClick={() => setIsReferralModalOpen(false)}
            className='absolute right-0 top-0 text-gray-400 hover:text-gray-600'
          >
            <IoClose size={24} />
          </button>

          <h2 className='text-xl md:text-2xl font-semibold mb-4 md:mb-6'>
            Confirm Referral
          </h2>

          <p className='text-gray-600 mb-4 md:mb-6 text-sm md:text-base'>
            Are you sure you want to send referral requests to these members?
          </p>

          <div className='space-y-3 md:space-y-4 mb-6 md:mb-8'>
            {members
              .filter((member) => selectedMembers.includes(member.id))
              .map((member) => (
                <div
                  key={member.id}
                  className='flex items-center gap-3 md:gap-4'
                >
                  <img
                    src={member.avatar}
                    alt={member.name}
                    className='w-10 h-10 md:w-12 md:h-12 rounded-full'
                  />
                  <div>
                    <h3 className='font-medium text-sm md:text-base'>
                      {member.name}
                    </h3>
                    <p className='text-gray-500 text-xs md:text-sm'>
                      {member.email}
                    </p>
                  </div>
                </div>
              ))}
          </div>

          <div className='flex flex-col sm:flex-row justify-end gap-3 md:gap-4'>
            <button
              onClick={() => setIsReferralModalOpen(false)}
              className='px-4 md:px-6 py-2 border border-gray-300 rounded-lg text-gray-600 text-sm md:text-base order-2 sm:order-1'
            >
              Cancel
            </button>
            <button
              onClick={() => {
                // Add your referral sending logic here
                setIsReferralModalOpen(false);
              }}
              className='px-4 md:px-6 py-2 bg-[#540A26] text-white rounded-lg text-sm md:text-base order-1 sm:order-2'
            >
              Confirm
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default RegisterStep6;
