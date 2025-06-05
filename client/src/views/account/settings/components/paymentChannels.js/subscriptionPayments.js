'use client'
import { useState } from 'react'
import { loadStripe } from '@stripe/stripe-js'
import { Elements, useStripe } from '@stripe/react-stripe-js'
import { PayPalScriptProvider, PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js'
import { useNavigate } from 'react-router-dom'

import axios from 'axios'
import toast from 'react-hot-toast'

const apiUrl = 'http://localhost:8000' // Adjust if backend URL differs

const PaymentTitle = ({ title }) => {
  return (
    <h4 className="border-b border-[#777] px-4 pb-3 text-left text-lg font-semibold text-[#000080] md:px-12 md:text-xl">
      {title}
    </h4>
  )
}

const PayPalButtonWrapper = ({ currency, amount, createSubscription, onApprove, onError }) => {
  const [{ isPending, isResolved, isRejected }] = usePayPalScriptReducer()

  return (
    <div className="paypal-button-container mt-4">
      {isPending && <div className="py-4 text-center">Loading PayPal...</div>}
      {isRejected && <div className="py-4 text-center text-red-500">Failed to load PayPal</div>}
      {isResolved && (
        <PayPalButtons
          style={{ layout: 'vertical', shape: 'rect', color: 'blue', height: 48 }}
          createSubscription={createSubscription}
          onApprove={onApprove}
          onError={onError}
          forceReRender={[amount, currency]}
        />
      )}
    </div>
  )
}

const PaymentForm = ({ paymentData, stripePromise, paypalClientId }) => {
  const stripe = useStripe()
  const navigate = useNavigate()
  const [paymentMethod, setPaymentMethod] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [paypalError, setPaypalError] = useState(null)
  const authState = JSON.parse(localStorage.getItem('authState') || '{}')

  const handleStripeSubmit = async () => {
    if (!stripe) {
      toast.error('Payment system is not ready. Please try again.')
      return
    }

    setIsLoading(true)
    try {
      const response = await axios.post(
        `${apiUrl}/api/payments/create-payment-intent-subscription`,
        {
          priceId: paymentData.priceId,
          customerId: null, // No customerId required for new subscriptions
          email: 'user@example.com',
          packageId: paymentData.packageId,
          trialPeriodDays: paymentData.trialPeriodDays,
          packageName: paymentData.packageName,
          amount: paymentData.amount,
          isPremium: paymentData.isPremium,
          type: paymentData.type,
          paymentId: paymentData.priceId,
          quantity: 1,
          status: 'active',
          customerEmail: 'user@example.com',
          paymentProvider: 'stripe',
          user_id: 'hardcoded_user_123',
          items: [{ priceId: paymentData.priceId, quantity: 1 }],
        },
        { headers: { Authorization: authState.apiKey } }
      )

      if (response.data.message && response.data.message.includes('Free package subscription recorded')) {
        toast.success('Free package subscription successfully recorded!')
        setTimeout(() => navigate('/homepage'), 2000)
        return
      }

      const { sessionId } = response.data
      const { error } = await stripe.redirectToCheckout({ sessionId })
      if (error) throw error
    } catch (error) {
      console.error('Subscription error:', error)
      toast.error(error.message || 'Failed to initiate subscription')
    } finally {
      setIsLoading(false)
    }
  }

  const createPayPalSubscription = async () => {
    try {
      const response = await axios.post(
        `${apiUrl}/api/create-paypal-subscription`,
        {
          planId: paymentData.planId,
          packageName: paymentData.packageName,
          amount: paymentData.amount,
          isPremium: paymentData.isPremium,
          type: paymentData.type,
          user_id: 'hardcoded_user_123',
          email: 'user@example.com',
        },
        { headers: { Authorization: authState.apiKey } }
      )
      return response.data.subscriptionId
    } catch (error) {
      setPaypalError(error.response?.data?.message || 'Failed to create subscription')
      throw error
    }
  }

  const onPayPalApprove = async (data) => {
    try {
      await axios.post(
        `${apiUrl}/api/verify-paypal-subscription/${data.subscriptionID}`,
        {},
        { headers: { Authorization: authState.apiKey } }
      )
      toast.success('Subscription created successfully')
      setTimeout(() => navigate('/homepage'), 2000)
    } catch (error) {
      setPaypalError(error.response?.data?.message || 'Subscription failed')
      throw error
    }
  }

  const onPayPalError = (err) => {
    setPaypalError('An error occurred with PayPal. Please try again.')
    console.error('PayPal error:', err)
  }

  return (
    <div className="ml-auto mr-auto min-h-[300px] w-full rounded-lg bg-white py-6 md:w-[60%] lg:w-[40%]">
      <PaymentTitle title={paymentMethod ? `Pay with ${paymentMethod}` : 'Make Payment'} />
      <div className="my-6 px-3 text-black md:px-12">
        {paymentMethod === null ? (
          <div className="mb-6 flex flex-col justify-center gap-4 md:flex-row">
            <div
              onClick={() => setPaymentMethod('stripe')}
              className="cursor-pointer rounded-lg border border-gray-200 p-6 text-center transition-colors hover:border-blue-500"
            >
              <button className="w-full rounded-lg bg-blue-600 py-2 text-white">
                Subscribe with Stripe
              </button>
            </div>
            <div
              onClick={() => setPaymentMethod('paypal')}
              className="cursor-pointer rounded-lg border border-gray-200 p-6 text-center transition-colors hover:border-blue-500"
            >
              <button className="w-full rounded-lg bg-blue-600 py-2 text-white">
                Subscribe with PayPal
              </button>
            </div>
          </div>
        ) : (
          <>
            <button
              onClick={() => {
                setPaymentMethod(null)
                setPaypalError(null)
              }}
              className="mb-4 rounded-lg bg-gray-600 px-4 py-2 font-medium text-white transition-colors hover:bg-gray-700"
            >
              ← Back to payment methods
            </button>
            {paymentMethod === 'stripe' && (
              <div>
                <button
                  onClick={handleStripeSubmit}
                  disabled={isLoading || !stripe}
                  className={`mt-4 w-full rounded-lg py-3 font-medium text-white ${
                    isLoading || !stripe ? 'cursor-not-allowed bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'
                  }`}
                >
                  {isLoading
                    ? 'Processing...'
                    : `Subscribe for $${Number(paymentData.amount).toLocaleString()}/month`}
                </button>
              </div>
            )}
            {paymentMethod === 'paypal' && (
              <>
                {paypalError && <div className="mb-4 text-center text-red-500">{paypalError}</div>}
                <PayPalButtonWrapper
                  currency="USD"
                  amount={paymentData.amount}
                  createSubscription={createPayPalSubscription}
                  onApprove={onPayPalApprove}
                  onError={onPayPalError}
                />
              </>
            )}
          </>
        )}
      </div>
    </div>
  )
}

const MakeSubscriptionPayment = () => {
  const navigate = useNavigate()
  const stripePromise = loadStripe('pk_test_51QmgnBG24XnfZ7Kqdj69hLZDDHUfJXr7xkNs9KLsZk7sjF9pI32MXYPfcBt0DcrM7NADyDoXECiirxQFC6lnUx2V00rfb3fGNb')
  const paypalClientId = 'AX61-75bx_Ttj-uEtbpHKW5p1TfJUTHyl8hEJD5faf8-7-PyOGsvVmEMEFcgkFXl0GhqSpQvU0M451rN'

  // Hypothetical paymentData
  const paymentData = {
    priceId: 'price_1RKMjEG24XnfZ7KqniZtPUKi',
    planId: 'P-1EH063409J3762905NAOJDKI',
    packageId: 'pkg_123',
    trialPeriodDays: 1,
    packageName: 'Premium Package',
    amount: 10,
    isPremium: true,
    type: 'PackageSubscription',
  }

  return (
    <PayPalScriptProvider
      options={{
        clientId: paypalClientId,
        currency: 'USD',
        disableFunding: 'credit,card',
        intent: 'subscription',
        vault: true,
      }}
    >
      <Elements stripe={stripePromise}>
        <PaymentForm paymentData={paymentData} stripePromise={stripePromise} paypalClientId={paypalClientId} />
      </Elements>
    </PayPalScriptProvider>
  )
}

export default MakeSubscriptionPayment