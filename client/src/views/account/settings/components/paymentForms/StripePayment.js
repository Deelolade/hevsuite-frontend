import React, { useEffect, useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import paymentService from '../../../../../services/paymentService';

const StripePaymentForm = ({ onSuccess, onError, isEditing }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [clientSecret, setClientSecret] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Call backend to create a Setup Intent and get client_secret
    const fetchSetupIntent = async () => {
      try {
        const response = await paymentService.createSetupIntent();
        if (response.success) {
          setClientSecret(response.data.client_secret);
        } else {
          throw new Error(response.message || 'Failed to initialize payment setup');
        }
      } catch (error) {
        console.error('Setup Intent error:', error);
        onError(error.message || 'Failed to initialize Stripe');
      }
    };

    fetchSetupIntent();
  }, [onError]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!stripe || !elements || !clientSecret) return;

    setLoading(true);
    try {
      const cardElement = elements.getElement(CardElement);

      const { error, setupIntent } = await stripe.confirmCardSetup(clientSecret, {
        payment_method: {
          card: cardElement,
        },
      });

      if (error) {
        throw error;
      }

      const response = await paymentService.addPayment('stripe', {
        paymentMethodId: setupIntent.payment_method,
        editing: isEditing,
      });

      if (response.success) {
        onSuccess(response.data);
      } else {
        throw new Error(response.message || 'Failed to save payment method');
      }
    } catch (error) {
      console.error('Stripe setup error:', error);
      onError(error.message || 'Failed to save payment method');
    } finally {
      setLoading(false);
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
        disabled={!stripe || !clientSecret || loading}
        className="w-full bg-primary text-white rounded-lg p-3 font-medium hover:bg-primary-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? 'Saving...' : 'Save Card'}
      </button>
    </form>
  );
};

export default StripePaymentForm;
