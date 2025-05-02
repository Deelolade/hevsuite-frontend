import React, { useState } from 'react';
import { FaCreditCard, FaPaypal, FaStripe } from 'react-icons/fa';
import Modal from '../components/Modal';
import { PaymentMethodModal } from '../../events/EventDetails';
import Swal from 'sweetalert2';
import { showModal } from '../../../../components/FireModal';
import CardPaymentForm from '../components/paymentForms/CardPayment';
import StripePaymentForm from '../components/paymentForms/StripePayment';
import PayPalPaymentForm from '../components/paymentForms/PaypalForm';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { PayPalScriptProvider } from '@paypal/react-paypal-js';



const PaymentMethodSection = () => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [openModalPayment, setOpenModalPayment] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('card'); // Consistent with renderPaymentForm keys
  const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);
  const [editMethod, setSelectedEditMethod]  = useState("card");
  const [isEditing, setIsEditing] = useState(false);

   const renderPaymentForm = (method) => {
    switch (method) {
      case 'card':
        return <CardPaymentForm  isEditing={isEditing}/>;
      case 'paypal':
        return <PayPalPaymentForm isEditing={isEditing} />;
      case 'stripe':
        return <StripePaymentForm isEditing={isEditing}/>;
      default:
        return <p>Please select a payment method.</p>;
    }
  }; 

  const handlePaymentMethodSelect = (method) => {
    // Map PaymentMethodModal values to internal values
    const methodMap = {
      Mastercard: 'card',
      PayPal: 'paypal',
      Stripe: 'stripe',
    };
    const normalizedMethod = methodMap[method] || 'card';
    setPaymentMethod(normalizedMethod);
    
  };

  // Edit of payment method

  const handleEdit = (method) => {
    setSelectedEditMethod(method)
    setShowEditForm(true);
    setIsEditing(true);
  };

  // Handle removal of payment method

  const handleRemovePayment = (method)=>{
    console.log("Method id", method)
  }



  const AddPaymentModal = ({ paymentMethod }) => (
    
    <Modal
      isOpen={showAddModal}
      onClose={() => setShowAddModal(false)}
      title={`Add Payment Method - ${paymentMethod || 'Select'}`}
    >
      {paymentMethod === 'stripe' ? (
        <Elements stripe={stripePromise}>
          <StripePaymentForm onSuccess={() => setShowAddModal(false)}  />
        </Elements>
      ) : paymentMethod === 'paypal' ? (
        <PayPalScriptProvider options={{ "client-id": process.env.REACT_APP_PAYPAL_CLIENT_ID, "intent": "authorize",  // <-- Add this
    "vault": "true"}} >
          <PayPalPaymentForm onSuccess={() => setShowAddModal(false)}  />
        </PayPalScriptProvider>
      ) : (
        renderPaymentForm(paymentMethod)
      )}
      
    </Modal>
  );

  return (
    
      <div className="mt-4 sm:mt-6 md:mt-8">
    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 sm:gap-0 mb-4 sm:mb-6">
      <h2 className="text-[#540A26] text-lg sm:text-xl font-medium">
        All Payment Methods
      </h2>
      <div className="flex gap-2">
        <button
          onClick={() => setShowEditForm(!showEditForm)}
          className="px-4 sm:px-6 py-1.5 sm:py-2 bg-primary text-white rounded-lg text-sm sm:text-base"
        >
          {showEditForm ? 'Hide Form' : 'Edit'}
        </button>
      </div>
    </div>
    <div className="flex flex-col lg:flex-row gap-4 sm:gap-6 lg:gap-8">
      <div className="mt-2 sm:mt-4 lg:mt-6 w-full lg:w-1/3">
        <div className="border rounded-lg p-3 sm:p-4">
          <div className="flex items-center gap-2 sm:gap-4">
            <input type="radio" className="w-4 h-4 sm:w-5 sm:h-5" checked readOnly />
            <div className="flex items-center gap-1 sm:gap-2">
              <FaCreditCard className="text-[#FF5F00] text-xl sm:text-2xl" />
              <div>
                <p className="font-medium text-sm sm:text-base">Mastercard</p>
                <p className="text-xs sm:text-sm text-gray-500">Ends 3456</p>
              </div>
            </div>
            <span className="ml-1 sm:ml-2 text-xs sm:text-sm text-primary font-medium">
              Default
            </span>
          </div>
        </div>
        <div className="border rounded-lg p-3 mt-4 sm:p-4">
  <div className="flex items-center gap-2 sm:gap-4">
    <input type="radio" className="w-4 h-4 sm:w-5 sm:h-5" checked disabled />
    <div className="flex items-center gap-1 sm:gap-2">
      <FaStripe className="text-[#635bff] text-xl sm:text-2xl" /> 
      <div>
        <p className="font-medium text-sm sm:text-base">Stripe</p>
        <p className="text-xs sm:text-sm text-gray-500">Card ends in 4242</p> 
      </div>
    </div>
    <span
      onClick={() =>
        showModal({
          title: 'Remove Payment?',
          text: "You won't be able to undo this action!",
          confirmText: 'Remove',
          onConfirm: () => handleRemovePayment("Stripe")
        })
      }
      className="ml-1 cursor-pointer sm:ml-2 text-xs sm:text-sm text-red-500 font-medium"
    >
      Remove
    </span>
    <button
            onClick={(e)=>handleEdit("stripe")}
            className="ml-1 cursor-pointer sm:ml-2 text-xs sm:text-sm text-blue-500 font-medium"
          >
            Edit
          </button>
  </div>
</div>
        <div className="border rounded-lg p-3 mt-4 sm:p-4">
          <div className="flex items-center gap-2 sm:gap-4">
            <input type="radio" className="w-4 h-4 sm:w-5 sm:h-5" checked disabled />
            <div className="flex items-center gap-1 sm:gap-2">
  <FaPaypal className="text-blue-500 text-xl sm:text-2xl" />
  <div>
    <p className="font-medium text-sm sm:text-base">PayPal</p>
    <p className="text-xs sm:text-sm text-gray-500">user@example.com</p>
  </div>
</div>
            <span
              onClick={() =>
                showModal({
                  title: 'Remove Card?',
                  text: "You won't be able to undo this action!",
                  confirmText: 'Remove',
                  onConfirm: () => handleRemovePayment("paypal"),
                })
              }
              className="ml-1 cursor-pointer sm:ml-2 text-xs sm:text-sm text-red-500 font-medium"
            >
              Remove
            </span>
            <button
            onClick={(e)=>handleEdit("paypal")}
            className="ml-1 cursor-pointer sm:ml-2 text-xs sm:text-sm text-blue-500 font-medium"
          >
            Edit
          </button>
          </div>
        </div>
        <button
          onClick={() => setOpenModalPayment(true)}
          className="px-4 sm:px-6 py-1.5 sm:py-2 text-[#540A26] rounded-lg text-sm sm:text-base mt-2 sm:mt-3"
        >
          + Add Payment Method
        </button>
      </div>

      {showEditForm && (
        <div className="space-y-3 sm:space-y-4 mt-4 sm:mt-6 lg:mt-8 w-full lg:w-2/3">
          {
            // Will impliment selection of the specific method, now the default is CardPayment
            editMethod === "card"? <CardPaymentForm isEditing={isEditing} /> : editMethod === "stripe" ? <Elements stripe={stripePromise}>
            <StripePaymentForm onSuccess={() => setShowAddModal(false)} isEditing={isEditing} />
          </Elements>: <PayPalScriptProvider options={{ "client-id": process.env.REACT_APP_PAYPAL_CLIENT_ID, "intent": "authorize",  // <-- Add this
    "vault": "true"}} isEditing={isEditing}>
          <PayPalPaymentForm onSuccess={() => setShowAddModal(false)} />
        </PayPalScriptProvider>
          }
        </div>
      )}
    </div>
    {openModalPayment && (
      <PaymentMethodModal
        onClose={() => setOpenModalPayment(false)}
        showNewModal={() => setShowAddModal(true)}
        onPaymentMethodSelect={handlePaymentMethodSelect}
      />
    )}
    <AddPaymentModal paymentMethod={paymentMethod} />
  </div>
      
    
  );
};

export default PaymentMethodSection;