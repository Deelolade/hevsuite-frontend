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
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { persistor } from '../../../store/store';
import { logout } from '../../../features/auth/authSlice';
import constants from '../../../constants';
import ProgressSteps from './ProgressSteps';
import AuthModal from '../../../components/AuthModal';

const RegisterStep6 = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const dispatch = useDispatch();
  const [selectedMembers, setSelectedMembers] = useState(new Set());
  const [isReferredByModalOpen, setIsReferredByModalOpen] = useState(false);
  const [members, setMembers] = useState([])
  const [approval, setApproval] = useState(false);
  const [referredBy, setReferredBy] = useState([])
  const [referredByLoading, setReferredByLoading] = useState(false);
  const [sendReferredBylLoading, setSendReferredByLoading] = useState(false);
  const [logOutLoading, setLogOutLoading] = useState(false);

   const { Settings } = useSelector((state) => state.generalSettings);
   const {user}= useSelector((state)=> state.auth)

  useEffect(() => {
    window.scrollTo({ top: 50, behavior: 'smooth' });

    const fetchData = async () => {
      try {

        setReferredByLoading(true);

        const [usersResponse, referralResponse] = await Promise.all([   referralService.fetchAllUsersBasicInfo(),   referralService.checkReferral()  ]);
        setMembers(usersResponse.users);
        setReferredBy(referralResponse.referredBy)

      } catch (error) {
        toast.error(error.message);
      }finally {

         setTimeout(() => {
          setReferredByLoading(false);
        }, 1000);

      }
    };

    fetchData();
  }, []);

    useEffect(() => {

    if (user && referredBy && Settings) {

      // const allReferredByDeclined = user.referredBy.every(r => r.status.toLowerCase() === constants.referredByStatus.declined);
      // if(allReferredByDeclined && user.referredBy.length > 0 && Settings.requiredReferralNumber > 0)  {
      if(user.membershipStatus === constants.membershipStatus.declined){
        navigate("/application-declined", {replace: true });
        return;
      }

      if(user.membershipStatus === constants.membershipStatus.accepted && user.joinFeeStatus === constants.joinFeeStatus.paid ){
        navigate("/homepage", {replace: true });
        return
      }
            
      // if both referral and membership are off
      if (Settings.requiredReferralNumber <= 0 && !Settings.membershipFee) {
        navigate("/homepage", {replace: true });
        return;
      }

      //if referrals are off and membership are on
      if (Settings.requiredReferralNumber <= 0 && Settings.membershipFee) {

        // in-case someone visits this URL and they paid
        if(user.joinFeeStatus === constants.joinFeeStatus.paid) {
          navigate("/homepage", { replace: true });
          return;
        }

        navigate("/register-7", {replace: true });
        return;
      }

      // referrals are on, wait for acceptance
      if(user.membershipStatus === constants.membershipStatus.accepted) {
        navigate("/register-7", {replace: true });
        return
      }


      // if there is any pending referredBy, that means the user is not approved yet.
      // const allReferredByApproved = referredBy.every(r => r.status.toLowerCase() === constants.referredByStatus.approved);
      // if (user.approvedByAdmin || allReferredByApproved) {
      //   //if membeshipFee is on
      //   if (Settings.membershipFee) navigate("/register-7", { replace: true });
      //   else navigate("/homepage", { replace: true });

      // }
    }
  }, [referredBy, Settings, user]);

   useEffect(() => {
    // always show referrals first evenever we have them
    if (referredBy.length > 0 && !approval) setApproval(true);
  }, [referredBy]);

   const handleLogout = async () => {
      try {
        setLogOutLoading(true);

        await dispatch(logout()).unwrap()
        await persistor.purge();
        
        navigate('/');
        // window.location.reload();
      } catch (error) {
        toast.error("Logout failed. Please try again.");
        console.error('Logout failed:', error);
      }
      finally {
        setTimeout( () => setLogOutLoading(false), 1000 ) ;

      }
    };

  // const members = [
  //   {
  //     id: 1,
  //     name: 'Andrew Bojangles',
  //     email: 'some@gmail.com',
  //     type: 'Member',
  //     avatar: avatar,
  //   },
  //   // ... other members
  // ];

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

  // const handleMemberSelect = (memberId) => {
  //   if (selectedMembers.includes(memberId)) {
  //     setSelectedMembers(selectedMembers.filter((id) => id !== memberId));
  //   } else if (selectedMembers.length < (Settings?.requiredReferralNumber ?? 3)) {
  //     setSelectedMembers([...selectedMembers, memberId]);
  //   }
  // };

    const handleMemberSelect = memberId => {
    const found = members.find(m => m.id === memberId);
    setSelectedMembers(prev => {
      const newSet = new Set(prev);
      if (newSet.has(found.id)) newSet.delete(found.id);else newSet.add(found.id);
      return newSet;
    });
  };

  const handleSubmit = () => {
    navigate('/register-7');
  };

   const refetchMembersAndReferredBy = async () => {
    // Refetch updated referral data
    const [referralResponse, userResponse] = await Promise.all([referralService.checkReferral(), referralService.fetchAllUsersBasicInfo()]);
    // Update state
    setMembers(userResponse.users);
    setReferredBy(referralResponse.referredBy);
  };

    const handleProceedToSendReferredBy = async () => {
    
      if(referredBy.length >= Settings.requiredReferralNumber){
        toast.error("You've reached the limit of required members", {duration: 3_000 });
        return
      }

      const remainingReferred = Settings.requiredReferralNumber - referredBy.length;

      if(selectedMembers.size > remainingReferred && referredBy.length ){

        const message = `You can refer up to ${remainingReferred} member${remainingReferred > 1 ? 's' : ''}.`;
        toast.error(message, {duration: 3_000})
        return
      }

      if(referredBy.length === 0 && selectedMembers.size > Settings.requiredReferralNumber){
        const message = `Only ${Settings.requiredReferralNumber} member${Settings.requiredReferralNumber > 1 ? 's' : ''}. are required`;
        toast.error(message, {duration: 3_000});
        return
      }

   
    try {
      const payload = [];
      setSendReferredByLoading(true);

      selectedMembers.forEach(id => payload.push(members.find(m => m.id === id).id));
      const response = await referralService.sendReferralsRequest(payload);

      if (response.success == true) {
        toast.success("Referral requests sent successfully!");
        await refetchMembersAndReferredBy();

        setIsReferredByModalOpen(false);
        setSelectedMembers(new Set()); // Clear selection
        
      } else {
        toast.error(response.error || "Failed to send referrals");
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setSendReferredByLoading(false);
    }
  };

  const handleSendReferral = () => {
    if (selectedMembers.size > 0) {
      setIsReferredByModalOpen(true);
    }
  };
  const filteredMembers = members.filter(
    (member) =>
      member.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className='min-h-screen flex flex-col'>
      <AuthModal loading open={logOutLoading} title="Logging Out" description="Sigining out your account..." />
      <div className='relative text-white'>
        <div className='absolute inset-0 z-0'>
          <img
            src={bg_image}
            alt='background'
            className='w-full h-[120px] object-cover brightness-50 '
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
          <ProgressSteps currentStep={6} />

        </div>
      </div>
 
      {referredByLoading ? ( <div className="min-h-[45em] max-w-xl m-auto w-full flex justify-center items-center">
          <div className="w-12 h-12 border-l border-[#540A26] rounded-full animate-spin"> </div>
        </div>): (
          <>
          
          {approval ? (
            <RegisterApproval setApproval={setApproval} referrals={referredBy} onDecliningReferredBy={() => refetchMembersAndReferredBy()} />
          ) : (
            <div className='container mx-auto px-4 py-8 md:py-12 max-w-3xl flex-grow'>
              {/* user && user.joinFeeStatus === 'pending' && */}
              { (
                <div className=' w-[100px] absolute top-60 right-4'>
                  <button
                    onClick={handleLogout}
                    className='px-4 py-2 bg-[#540A26] text-white rounded-lg text-sm md:text-base w-full sm:w-auto'
                  >
                    Logout
                  </button>
                </div>  
                )}
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
                  {filteredMembers.length > 0 && filteredMembers.map((member) => (
                    <div
                      key={member.id}
                      onClick={() => handleMemberSelect(member.id) }
                      role='button'
                      className='flex flex-wrap sm:flex-nowrap items-center justify-between p-3 md:p-4 bg-gray-50 rounded-lg'
                    >
                      <div 
                      className='flex  items-center gap-2 md:gap-4 w-full sm:w-auto'>
                        <input
                          type='checkbox'
                          checked={selectedMembers.has(member.id)}
                          onChange={() => handleMemberSelect(member.id)}
                          className='w-4 h-4 rounded border-gray-300'
                        />
                        <img
                          src={member.avatar || avatar}
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
                  Note: you can select only {Settings?.requiredReferralNumber ?? 3} members
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
          
          </>
        )}
          

      <Footer />

      <Modal
        isOpen={isReferredByModalOpen}
        onRequestClose={() => setIsReferredByModalOpen(false)}
        style={modalStyles}
        contentLabel='Referral Confirmation Modal'
      >
        <div className='relative'>
          <button
            onClick={() => setIsReferredByModalOpen(false)}
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
              .filter((member) => selectedMembers.has(member.id))
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
              onClick={() => setIsReferredByModalOpen(false)}
              className='px-4 md:px-6 py-2 border border-gray-300 rounded-lg text-gray-600 text-sm md:text-base order-2 sm:order-1'
            >
              Cancel
            </button>
             <button
              onClick={handleProceedToSendReferredBy}
              disabled={sendReferredBylLoading}
              className="px-4 md:px-6 py-2  bg-[#540A26] disabled:bg-[#540A26]/10 text-white rounded-lg text-sm md:text-base order-1 sm:order-2 disabled:border-[#540A26]/40 transition-colors disabled:text-[#540A26]/40 disabled:hover:bg-[#540A26]/10 disabled:cursor-not-allowed"
            >
              {sendReferredBylLoading ? "Sending.." : "Confirm"}
            </button>
            {/* <button
              onClick={handleProceedToSendReferredBy}
              className='px-4 md:px-6 py-2 bg-[#540A26] text-white rounded-lg text-sm md:text-base order-1 sm:order-2'
            >
              Confirm
            </button> */}
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default RegisterStep6;
