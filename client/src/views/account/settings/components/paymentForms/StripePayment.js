import React from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import paymentService from '../../../../../services/paymentService';


const StripePaymentForm = ({ onSuccess, onError,isEditing }) => {
    const stripe = useStripe();
    const elements = useElements();
  
    const handleSubmit = async (event) => {
      event.preventDefault();
      if (!stripe || !elements) return;
  
      try {
        const cardElement = elements.getElement(CardElement);
        const { error, paymentMethod } = await stripe.createPaymentMethod({
          type: 'card',
          card: cardElement,
        });
  
        if (error) {
          throw error;
        }

        
  
        const response = await paymentService.addPayment('stripe', {
          paymentMethodId: paymentMethod.id,
          editing: isEditing
        });
  
        if (response.success) {
          onSuccess(response.data);
        } else {
          throw new Error(response.message || 'Failed to save payment method');
        }
      } catch (error) {
        console.error('Stripe payment error:', error);
        onError(error.message || 'Payment failed');
      }
    };
  
    return (
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="border rounded-lg p-3">
          <CardElement
            options={{
              style: {
                base: {
                  fontSize: '16px',
                  color: '#424770',
                  '::placeholder': { color: '#aab7c4' },
                  fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
                },
                invalid: {
                  color: '#fa755a',
                  iconColor: '#fa755a',
                },
              },
            }}
          />
        </div>
        <button
          type="submit"
          disabled={!stripe}
          className="w-full bg-primary text-white rounded-lg p-3 font-medium hover:bg-primary-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Save Card
        </button>
      </form>
    );
  };
  

export default StripePaymentForm;