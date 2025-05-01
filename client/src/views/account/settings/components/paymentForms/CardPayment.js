import React, { useState } from 'react';
import { BsQuestionCircle } from 'react-icons/bs';
import visa from '../../../../../assets/VISA.png';
import amex from '../../../../../assets/AMEX.png';
import discover from '../../../../../assets/Discover.png';
import paymentService from '../../../../../services/paymentService';

const CardPaymentForm = ({isEditing}) => {
  const [formData, setFormData] = useState({
    fullname: '',
    cardNumber: '',
    expiration: '',
    cvc: '',
    country: 'Hong Kong SAR China',
    zipcode: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const availableCountries = [
    "Hong Kong SAR China",
    "Kenya",
    "England",
    "United States"
  ];

  const handleSave = async () => {
    try {
      const paymentResponse = await paymentService.addPayment('card',{
        cardDetails: {
          fullName: formData.fullname,
          cardNumber: formData.cardNumber,
          expirationDate: formData.expiration,
          securityCode: formData.cvc,
          country: formData.country,
          zipCode: formData.zipcode,
          editing: isEditing
        }
      });
  
      if (paymentResponse.success) {
        alert('Payment method added successfully');
        return paymentResponse.data;
      } else {
        throw new Error(paymentResponse.message || 'Failed to add payment method');
      }
    } catch (error) {
      console.error('Payment Error:', error.response?.data || error.message);
      alert(`Error: ${error.response?.data?.message || error.message}`);
      throw error; 
    }
  };
  

  return (
    <div className="space-y-4 sm:space-y-6">
      
      <div className="space-y-1">
        <label className="block text-sm font-medium text-gray-700">Full name</label>
        <input
          type="text"
          name="fullname"
          value={formData.fullname}
          onChange={handleInputChange}
          placeholder="John Doe"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-all"
        />
      </div>

      
      <div className="space-y-1">
        <label className="block text-sm font-medium text-gray-700">Card number</label>
        <div className="relative">
          <input
            type="text"
            name="cardNumber"
            value={formData.cardNumber}
            onChange={handleInputChange}
            placeholder="1234 5678 9012 3456"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-all pr-12"
          />
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex gap-2">
            <img src={visa} alt="Visa" className="h-5" />
            <img src={amex} alt="Amex" className="h-5" />
            <img src={discover} alt="Discover" className="h-5" />
          </div>
        </div>
      </div>

      
      <div className="grid grid-cols-2 gap-4">
        
        <div className="space-y-1">
          <label className="block text-sm font-medium text-gray-700">Expiration</label>
          <input
            type="text"
            name="expiration"
            value={formData.expiration}
            onChange={handleInputChange}
            placeholder="MM/YY"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-all"
          />
        </div>
        
        
        <div className="space-y-1">
          <label className="block text-sm font-medium text-gray-700">CVC</label>
          <div className="relative">
            <input
              type="text"
              name="cvc"
              value={formData.cvc}
              onChange={handleInputChange}
              placeholder="123"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-all pr-10"
            />
            <button 
              type="button" 
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              onClick={() => alert('CVC is the 3-digit code on the back of your card')}
            >
              <BsQuestionCircle className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      
      <div className="grid grid-cols-2 gap-4">
    
        <div className="space-y-1">
          <label className="block text-sm font-medium text-gray-700">Country</label>
          <select
            name="country"
            value={formData.country}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-all bg-white"
          >
            {availableCountries.map((country, index) => (
              <option key={index} value={country}>{country}</option>
            ))}
          </select>
        </div>
        
        
        <div className="space-y-1">
          <label className="block text-sm font-medium text-gray-700">Zip/Postal code</label>
          <input
            type="text"
            name="zipcode"
            value={formData.zipcode}
            onChange={handleInputChange}
            placeholder="12345"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-all"
          />
        </div>
      </div>

      
      <button
        onClick={handleSave}
        className="w-full mt-6 bg-primary hover:bg-primary-dark text-white font-medium py-3 px-4 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
      >
        Save Payment Method
      </button>
    </div>
  );
};

export default CardPaymentForm;