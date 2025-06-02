import React from 'react';
import { PayPalButtons } from '@paypal/react-paypal-js';
import paymentService from '../../../../../services/paymentService';

const PayPalPaymentForm = ({ onSuccess, onError, isEditing }) => {
  const handleApprove = async (data) => {
    try {
    
      
const response = await paymentService.addPayment('paypal', {
    billingAgreementToken: data.billingToken, 
    payerId: data.payerID,
    email: data.payerEmail,
    editing: isEditing
  });

      if (response.success) {
        onSuccess(response.data);
      } else {
        throw new Error(response.message || 'Failed to save PayPal payment method');
      }
    } catch (error) {
      console.error('PayPal payment method error:', error);
      onError(error.message || 'Failed to save payment method');
    }
  };

  return (
    <div className="space-y-4">
      <p className="text-sm text-gray-600">
        Connect your PayPal account to save it as a payment method.
      </p>
      <PayPalButtons
        style={{
          layout: 'vertical',
          shape: 'rect',
          color: 'blue',
          height: 40
        }}
        createOrder={(data, actions) => {
          return actions.order.create({
            intent: 'AUTHORIZE', 
            purchase_units: [{
              amount: {
                value: '0.01', 
                currency_code: 'USD'
              }
            }]
          });
        }}
        onApprove={(data, actions) => {
        
          return handleApprove(data);
        }}
        onError={(err) => {
          console.error("PayPal error:", err);
          onError(err.message || 'PayPal connection failed');
        }}
        onCancel={() => {
          onError('PayPal connection cancelled');
        }}
      />
    </div>
  );
};

export default PayPalPaymentForm;