import axios from 'axios';
import toast from 'react-hot-toast';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardNumberElement, CardExpiryElement, CardCvcElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { PayPalScriptProvider, PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js';
import { useEffect, useState, useMemo, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

// Utility function for class names
const cn = (...classes) => classes.filter(Boolean).join(' ');

// Generate transaction reference
const generateTransactionReference = () => {
  return 'TRX-' + Math.random().toString(36).substr(2, 9).toUpperCase();
};

const apiUrl = 'http://localhost:8000';

export const PaymentTitle = ({ title, className }) => {
  return (
    <h4
      className={cn(
        `border-b border-[#777] px-4 pb-3 text-left text-lg font-semibold text-[#000080] md:px-12 md:text-xl`,
        className
      )}
    >
      {title}
    </h4>
  );
};

const LoadingSpinner = () => (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
    <div className="flex flex-col items-center">
      <div className="h-12 w-12 animate-spin rounded-full border-4 border-blue-600 border-t-transparent"></div>
      <p className="mt-4 font-medium text-white">Processing Payment...</p>
    </div>
  </div>
);

const PayPalButtonWrapper = ({ currency, amount, createOrder, onApprove, onError }) => {
  const [{ isPending, isResolved, isRejected }] = usePayPalScriptReducer();

  return (
    <div className="paypal-button-container mt-4">
      {isPending && <div className="py-4 text-center">Loading PayPal...</div>}
      {isRejected && <div className="py-4 text-center text-red-500">Failed to load PayPal</div>}
      {isResolved && (
        <PayPalButtons
          style={{ layout: 'vertical', shape: 'rect', color: 'blue', height: 48 }}
          createOrder={createOrder}
          onApprove={onApprove}
          onError={onError}
          forceReRender={[amount, currency]}
        />
      )}
    </div>
  );
};

const StripePaymentForm = ({ paymentData, clientSecret, setClientSecret, isLoading, setIsLoading, savedPaymentMethods, selectedPaymentMethodId, setSelectedPaymentMethodId, useNewCard, setUseNewCard, setSavedPaymentMethods }) => {
  const stripe = useStripe();
  const elements = useElements();
  const authState = JSON.parse(localStorage.getItem('authState') || '{}');
  const navigate = useNavigate();
  const [cardNumberComplete, setCardNumberComplete] = useState(false);
  const [cardExpiryComplete, setCardExpiryComplete] = useState(false);
  const [cardCvcComplete, setCardCvcComplete] = useState(false);
  const [formData, setFormData] = useState({ firstName: '', lastName: '' });
  const [formErrors, setFormErrors] = useState({ firstName: '', lastName: '' });
  const isMountedRef = useRef(true);

  useEffect(() => {
    return () => {
      isMountedRef.current = false; // Cleanup on unmount
    };
  }, []);

  // Memoize paymentData to prevent unnecessary useEffect triggers
  const memoizedPaymentData = useMemo(() => ({
    paymentProvider: paymentData.paymentProvider,
    trxRef: paymentData.trxRef,
    type: paymentData.type,
    amount: paymentData.amount,
    reason: paymentData.reason,
  }), [paymentData.paymentProvider, paymentData.trxRef, paymentData.type, paymentData.amount, paymentData.reason]);

  // Debounce API call to prevent rapid requests
  const createPaymentIntent = useCallback(async () => {
    if (clientSecret || !isMountedRef.current) return; // Prevent calls if clientSecret is set or component is unmounted

    try {
      setIsLoading(true);
      const response = await axios.post(
        `${apiUrl}/api/payments/create-payment-intent`,
        {
          amount: Math.round(parseFloat(memoizedPaymentData.amount) * 100),
          currency: 'usd',
          paymentMethodId: selectedPaymentMethodId && !useNewCard ? selectedPaymentMethodId : undefined,
          data: {
            paymentProvider: memoizedPaymentData.paymentProvider,
            trxRef: memoizedPaymentData.trxRef,
            type: memoizedPaymentData.type,
            amount: memoizedPaymentData.amount,
            reason: memoizedPaymentData.reason,
          },
        },
        { headers: { Authorization: authState.apiKey } }
      );
      if (isMountedRef.current) {
        setClientSecret(response.data.clientSecret);
      }
    } catch (error) {
      if (isMountedRef.current) {
        console.error('Failed to create payment intent:', error);
        if (error.response?.status === 429) {
          toast.error('Too many requests. Please try again later.');
        } else {
          toast.error(error.response?.data?.message || 'Failed to initialize payment');
        }
      }
    } finally {
      if (isMountedRef.current) {
        setIsLoading(false);
      }
    }
  }, [clientSecret, memoizedPaymentData, authState.apiKey, selectedPaymentMethodId, useNewCard, setClientSecret, setIsLoading]);

  useEffect(() => {
    createPaymentIntent();
  }, [createPaymentIntent]);

  const validateForm = () => {
    if (!useNewCard) {
      if (!selectedPaymentMethodId) {
        toast.error('Please select a payment method');
        return false;
      }
      return true; // No further validation needed for saved payment methods
    }
    let isValid = true;
    const errors = { firstName: '', lastName: '' };

    if (!formData.firstName.trim()) {
      errors.firstName = 'First name is required';
      isValid = false;
    }
    if (!formData.lastName.trim()) {
      errors.lastName = 'Last name is required';
      isValid = false;
    }

    setFormErrors(errors);
    return isValid;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setFormErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const savePaymentMethod = async (paymentMethodId) => {
    try {
      await axios.post(
        `${apiUrl}/api/payments/addPaymentMethod`,
        {
          paymentType: 'stripe',
          paymentData: { paymentMethodId },
          userId: authState.user?.userId,
        },
        { headers: { Authorization: authState.apiKey } }
      );
      // Refresh payment methods after saving
      const response = await axios.get(`${apiUrl}/api/payments/getpaymentMethods`, {
        headers: { Authorization: authState.apiKey },
      });
      if (isMountedRef.current) {
        setSavedPaymentMethods(response.data.methods || []);
      }
    } catch (error) {
      if (isMountedRef.current) {
        console.error('Failed to save payment method:', error);
        toast.error('Failed to save payment method');
      }
    }
  };

  const handleStripeSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements || !validateForm() || !isMountedRef.current) {
      return;
    }

    try {
      

      let paymentMethodId = selectedPaymentMethodId;

      if (useNewCard) {
        if (!isMountedRef.current) {
          throw new Error('Form is no longer mounted');
        }
        const cardNumberElement = elements.getElement(CardNumberElement);
        if (!cardNumberElement) {
          throw new Error('Card number element is not mounted');
        }

        const { error: pmError, paymentMethod } = await stripe.createPaymentMethod({
          type: 'card',
          card: cardNumberElement,
          billing_details: {
            name: `${formData.firstName} ${formData.lastName}`,
            email: authState?.user?.email || 'user@mail.com',
          },
        });

        if (pmError) {
          throw pmError;
        }

        paymentMethodId = paymentMethod.id;
        await savePaymentMethod(paymentMethodId); // Save the new payment method
      }

      if (!paymentMethodId) {
        throw new Error('No payment method selected');
      }

      const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: paymentMethodId,
      });

      if (error) {
        throw error;
      }

      if (paymentIntent?.status === 'succeeded') {
        toast.success('Payment completed successfully');
        if (isMountedRef.current) {
          setTimeout(() => {
            if (isMountedRef.current) {
              navigate('/homepage');
            }
          }, 2000);
        }
      }
    } catch (error) {
      if (isMountedRef.current) {
        console.error('Payment error:', error);
        toast.error(error.message || 'Payment failed');
      }
    } finally {
      if (isMountedRef.current) {
        setIsLoading(false);
      }
    }
  };

  const CARD_ELEMENT_OPTIONS = {
    style: {
      base: {
        color: '#32325d',
        fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
        fontSmoothing: 'antialiased',
        fontSize: '16px',
        '::placeholder': { color: '#aab7c4' },
      },
      invalid: {
        color: '#fa755a',
        iconColor: '#fa755a',
      },
    },
  };

  const stripeMethods = savedPaymentMethods.filter((method) => method.provider === 'stripe');

  return (
    <>
      {isLoading || !clientSecret ? (
        <div className="py-4 text-center">Loading payment form...</div>
      ) : (
        <form onSubmit={handleStripeSubmit} className="mt-5 flex flex-col gap-4 border-2 p-4">
          <div className="flex flex-col gap-2">
            {stripeMethods.length > 0 ? (
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium">Select a Saved Card</label>
                {stripeMethods.map((method) => (
                  <div key={method.details.paymentMethodId} className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value={method.details.paymentMethodId}
                      checked={selectedPaymentMethodId === method.details.paymentMethodId && !useNewCard}
                      onChange={() => {
                        setSelectedPaymentMethodId(method.details.paymentMethodId);
                        setUseNewCard(false);
                      }}
                    />
                    <span>{`${method.details.brand.charAt(0).toUpperCase() + method.details.brand.slice(1)} •••• ${method.details.last4}`}</span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-gray-500">No saved cards. Please add a new card.</p>
            )}
            <div className="flex items-center gap-2">
              <input
                type="radio"
                name="paymentMethod"
                checked={useNewCard}
                onChange={() => {
                  setSelectedPaymentMethodId(null);
                  setUseNewCard(true);
                }}
              />
              <span>Add a new card</span>
            </div>
          </div>
          {useNewCard && (
            <div className="flex flex-col gap-4">
              <div className="flex flex-col text-left">
                <label className="mb-1 text-sm font-medium">Card Number</label>
                <div className="rounded-lg border border-gray-300 p-3">
                  <CardNumberElement
                    options={CARD_ELEMENT_OPTIONS}
                    onChange={(e) => setCardNumberComplete(e.complete)}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col text-left">
                  <label className="mb-1 text-sm font-medium">Expiry Date</label>
                  <div className="rounded-lg border border-gray-300 p-3">
                    <CardExpiryElement
                      options={CARD_ELEMENT_OPTIONS}
                      onChange={(e) => setCardExpiryComplete(e.complete)}
                    />
                  </div>
                </div>
                <div className="flex flex-col text-left">
                  <label className="mb-1 text-sm font-medium">Security Code</label>
                  <div className="rounded-lg border border-gray-300 p-3">
                    <CardCvcElement
                      options={CARD_ELEMENT_OPTIONS}
                      onChange={(e) => setCardCvcComplete(e.complete)}
                    />
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col text-left">
                  <label className="mb-1 text-sm font-medium">First Name</label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className="w-full rounded-xl border-2 p-3 outline-none"
                    placeholder="John"
                  />
                  {formErrors.firstName && (
                    <p className="text-sm text-red-500">{formErrors.firstName}</p>
                  )}
                </div>
                <div className="flex flex-col text-left">
                  <label className="mb-1 text-sm font-medium">Last Name</label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className="w-full rounded-xl border-2 p-3 outline-none"
                    placeholder="Doe"
                  />
                  {formErrors.lastName && (
                    <p className="text-sm text-red-500">{formErrors.lastName}</p>
                  )}
                </div>
              </div>
            </div>
          )}
          <button
            type="submit"
            disabled={
              isLoading ||
              (!useNewCard && !selectedPaymentMethodId) ||
              (useNewCard && !(cardNumberComplete && cardExpiryComplete && cardCvcComplete))
            }
            className={`mt-4 w-full rounded-lg py-3 font-medium text-white ${
              isLoading ||
              (!useNewCard && !selectedPaymentMethodId) ||
              (useNewCard && !(cardNumberComplete && cardExpiryComplete && cardCvcComplete))
                ? 'cursor-not-allowed bg-gray-400'
                : 'bg-blue-600 hover:bg-blue-700'
            }`}
          >
            {isLoading
              ? 'Processing...'
              : `Pay $${Number(memoizedPaymentData.amount).toLocaleString()}`}
          </button>
        </form>
      )}
    </>
  );
};

const OneTimePayment = ({ paymentData: propPaymentData }) => {
  // Use memo to stabilize paymentData
  const paymentData = useMemo(() => ({
    paymentProvider: propPaymentData?.paymentProvider || 'stripe',
    trxRef: propPaymentData?.trxRef || generateTransactionReference(),
    type: propPaymentData?.type || 'Hevsuite Payment',
    amount: propPaymentData?.amount || '20',
    reason: propPaymentData?.reason || 'payment to hevsuite',
  }), [propPaymentData]);

  const [stripePromise, setStripePromise] = useState(null);
  const [paypalClientId, setPaypalClientId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [availableProcessors, setAvailableProcessors] = useState([]);
  const [paymentMethod, setPaymentMethod] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [clientSecret, setClientSecret] = useState('');
  const [savedPaymentMethods, setSavedPaymentMethods] = useState([]);
  const [selectedPaymentMethodId, setSelectedPaymentMethodId] = useState(null);
  const [useNewCard, setUseNewCard] = useState(false);
  const navigate = useNavigate();
  const authState = JSON.parse(localStorage.getItem('authState') || '{}');
  const isMountedRef = useRef(true);

  useEffect(() => {
    return () => {
      isMountedRef.current = false; // Cleanup on unmount
    };
  }, []);

  useEffect(() => {
    const initializePaymentProcessors = async () => {
      try {
        setStripePromise(
          loadStripe('pk_test_51QmgnBG24XnfZ7Kqdj69hLZDDHUfJXr7xkNs9KLsZk7sjF9pI32MXYPfcBt0DcrM7NADyDoXECiirxQFC6lnUx2V00rfb3fGNb')
        );
        setPaypalClientId('AX61-75bx_Ttj-uEtbpHKW5p1TfJUTHyl8hEJD5faf8-7-PyOGsvVmEMEFcgkFXl0GhqSpQvU0M451rN');
        setAvailableProcessors(['stripe', 'paypal']);
      } catch (error) {
        console.error('Payment initialization error:', error);
        toast.error('Payment system initialization failed');
      } finally {
        setLoading(false);
      }
    };

    initializePaymentProcessors();
  }, []);

  useEffect(() => {
    const fetchPaymentMethods = async () => {
      if (!paymentMethod || !isMountedRef.current) return;
      try {
        const response = await axios.get(`${apiUrl}/api/payments/getpaymentMethods`, {
          headers: { Authorization: authState.apiKey },
        });
        console.log('Fetched payment methods:', response.data);
        if (isMountedRef.current) {
          setSavedPaymentMethods(response.data.methods || []);
          const methods = response.data.methods || [];
          const defaultMethod = methods.find((m) => m.provider === paymentMethod);
          if (defaultMethod) {
            setSelectedPaymentMethodId(defaultMethod.details.paymentMethodId);
            setUseNewCard(false);
          } else {
            setUseNewCard(true);
          }
        }
      } catch (error) {
        if (isMountedRef.current) {
          console.error('Failed to fetch payment methods:', error);
          toast.error('Failed to load saved payment methods');
          setUseNewCard(true);
        }
      }
    };

    fetchPaymentMethods();
  }, [paymentMethod, authState.apiKey]);

  console.log('savedPaymentMethods', savedPaymentMethods);

  const createPayPalOrder = async () => {
    setIsLoading(true);
    try {
      const response = await axios.post(
        `${apiUrl}/api/payments/create-paypal-order`,
        {
          amount: paymentData.amount,
          currency: 'USD',
          paymentData: {
            type: 'one-time',
            description: paymentData.packageName || 'Purchase',
          },
          billingAgreementId: savedPaymentMethods.find((m) => m.provider === 'paypal')?.details.billingAgreementId,
        },
        { headers: { Authorization: authState.apiKey } }
      );
      return response.data.orderId;
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to create order');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const onPayPalApprove = async (data) => {
    setIsLoading(true);
    try {
      const response = await axios.post(
        `${apiUrl}/api/payments/capture-paypal-order/${data.orderID}`,
        {},
        { headers: { Authorization: authState.apiKey } }
      );
      if (response.data.billingAgreementId) {
        setSavedPaymentMethods((prev) => [
          ...prev,
          { provider: 'paypal', details: { billingAgreementId: response.data.billingAgreementId, email: authState.user?.email } },
        ]);
      }
      toast.success('Payment completed successfully');
      if (isMountedRef.current) {
        setTimeout(() => {
          if (isMountedRef.current) {
            navigate('/homepage');
          }
        }, 2000);
      }
    } catch (error) {
      console.error('Failed to process PayPal payment:', error);
      toast.error(error.response?.data?.message || 'Payment failed');
    } finally {
      setIsLoading(false);
    }
  };

  const onPayPalError = (err) => {
    toast.error('An error occurred with PayPal');
    setIsLoading(false);
    console.error(err);
  };

  const availablePaymentMethods = ['stripe', 'paypal'];

  return (
    <div className="relative ml-auto mr-auto min-h-[400px] w-full rounded-lg bg-white py-6 md:w-[600px] lg:w-[500px]">
      {isLoading && <LoadingSpinner />}
      {loading ? (
        <div className="py-4 text-center">Loading payment providers...</div>
      ) : (
        <PayPalScriptProvider
          options={{
            'client-id': paypalClientId,
            currency: 'USD',
            'disable-funding': 'credit,card',
            'data-sdk-integration-source': 'funding_sc',
            vault: 'true',
          }}
        >
          {paymentMethod ? (
            <PaymentTitle title={`Pay with ${paymentMethod}`} />
          ) : (
            <PaymentTitle title="Make Payment" />
          )}
          <div className="my-6 px-4 md:px-12 text-black">
            {loading ? (
              <div className="py-4 text-center">Loading payment options...</div>
            ) : paymentMethod === null ? (
              <div className="mb-6 flex flex-col gap-4 md:flex-row justify-center">
                {availablePaymentMethods.includes('stripe') && (
                  <div
                    onClick={() => setPaymentMethod('stripe')}
                    className="cursor-pointer rounded-lg border border-gray-200 p-6 text-center transition-colors hover:border-blue-600"
                  >
                    <button className="w-full rounded-lg bg-blue-600 py-2 text-white">
                      Pay with Stripe
                    </button>
                  </div>
                )}
                {availablePaymentMethods.includes('paypal') && (
                  <div
                    onClick={() => setPaymentMethod('paypal')}
                    className="cursor-pointer rounded-lg border border-gray-200 p-6 text-center transition-colors hover:border-blue-600"
                  >
                    <button className="w-full rounded-lg bg-blue-600 py-2 text-white">
                      Pay with PayPal
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <button
                  onClick={() => {
                    setPaymentMethod(null);
                    setClientSecret('');
                    setSelectedPaymentMethodId(null);
                    setUseNewCard(false);
                  }}
                  className="mb-4 rounded-lg bg-gray-600 px-4 py-2 font-medium text-white transition-colors hover:bg-gray-700"
                >
                  ← Back to payment methods
                </button>
                {paymentMethod === 'stripe' && (
                  <Elements stripe={stripePromise}>
                    <StripePaymentForm
                      paymentData={paymentData}
                      clientSecret={clientSecret}
                      setClientSecret={setClientSecret}
                      isLoading={isLoading}
                      setIsLoading={setIsLoading}
                      savedPaymentMethods={savedPaymentMethods}
                      selectedPaymentMethodId={selectedPaymentMethodId}
                      setSelectedPaymentMethodId={setSelectedPaymentMethodId}
                      useNewCard={useNewCard}
                      setUseNewCard={setUseNewCard}
                      setSavedPaymentMethods={setSavedPaymentMethods}
                    />
                  </Elements>
                )}
                {paymentMethod === 'paypal' && (
                  <div>
                    {savedPaymentMethods.find((m) => m.provider === 'paypal') ? (
                      <div className="flex flex-col gap-2">
                        <span>Saved PayPal Account: {savedPaymentMethods.find((m) => m.provider === 'paypal').details.email}</span>
                        <button
                          onClick={async () => {
                            try {
                              setIsLoading(true);
                              await createPayPalOrder();
                            } catch (error) {
                              console.error('PayPal payment failed:', error);
                              toast.error('PayPal payment failed');
                            } finally {
                              setIsLoading(false);
                            }
                          }}
                          className="mt-4 w-full rounded-lg bg-blue-600 py-3 font-medium text-white hover:bg-blue-700"
                        >
                          {isLoading ? 'Processing...' : `Pay $${Number(paymentData.amount).toLocaleString()}`}
                        </button>
                      </div>
                    ) : (
                      <PayPalButtonWrapper
                        currency="USD"
                        amount={paymentData.amount}
                        createOrder={createPayPalOrder}
                        onApprove={onPayPalApprove}
                        onError={onPayPalError}
                      />
                    )}
                  </div>
                )}
              </>
            )}
          </div>
        </PayPalScriptProvider>
      )}
    </div>
  );
};

export default OneTimePayment;