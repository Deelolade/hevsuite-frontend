import axios from "axios";
import toast from "react-hot-toast";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import {
  PayPalScriptProvider,
  PayPalButtons,
  usePayPalScriptReducer,
} from "@paypal/react-paypal-js";
import { useEffect, useState, useMemo, useCallback, useRef } from "react";
import { MdClose, MdCheckCircle } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchPaymentMethods,
  selectAllPaymentMethods,
  selectPaymentMethodsLoading,
} from "../features/paymentMethodSlice";

// Utility function for class names
const cn = (...classes) => classes.filter(Boolean).join(" ");

// Generate transaction reference
const generateTransactionReference = () => {
  return "TRX-" + Math.random().toString(36).substr(2, 9).toUpperCase();
};

const apiUrl = "http://localhost:5000";

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

// const LoadingSpinner = () => (
//   <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black bg-opacity-50">
//     <div className="flex flex-col items-center">
//       <div className="h-12 w-12 animate-spin rounded-full border-4 border-blue-600 border-t-transparent"></div>
//       <p className="mt-4 font-medium text-white">Processing Payment...</p>
//     </div>
//   </div>
// );

const PayPalButtonWrapper = ({
  currency,
  amount,
  createOrder,
  onApprove,
  onError,
}) => {
  const [{ isPending, isResolved, isRejected }] = usePayPalScriptReducer();

  return (
    <div className="paypal-button-container mt-4">
      {isPending && <div className="py-4 text-center">Loading PayPal...</div>}
      {isRejected && (
        <div className="py-4 text-center text-red-500">
          Failed to load PayPal
        </div>
      )}
      {isResolved && (
        <PayPalButtons
          style={{
            layout: "vertical",
            shape: "rect",
            color: "blue",
            height: 48,
          }}
          createOrder={createOrder}
          onApprove={onApprove}
          onError={onError}
          forceReRender={[amount, currency]}
        />
      )}
    </div>
  );
};

const StripePaymentForm = ({
  paymentData,
  clientSecret,
  setClientSecret,
  isLoading,
  setIsLoading,
  savedPaymentMethods,
  selectedPaymentMethodId,
  setSelectedPaymentMethodId,
  useNewCard,
  setUseNewCard,
  setSavedPaymentMethods,
  onPaymentSuccess,
}) => {
  const stripe = useStripe();
  const elements = useElements();
  const authState = JSON.parse(localStorage.getItem("authState") || "{}");
  const [cardNumberComplete, setCardNumberComplete] = useState(false);
  const [cardExpiryComplete, setCardExpiryComplete] = useState(false);
  const [cardCvcComplete, setCardCvcComplete] = useState(false);
  const [formData, setFormData] = useState({ firstName: "", lastName: "" });
  const [formErrors, setFormErrors] = useState({ firstName: "", lastName: "" });
  const isMountedRef = useRef(true);

  useEffect(() => {
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  const memoizedPaymentData = useMemo(
    () => ({
      paymentProvider: paymentData.paymentProvider,
      trxRef: paymentData.trxRef,
      type: paymentData.type,
      amount: paymentData.amount,
      reason: paymentData.reason,
    }),
    [
      paymentData.paymentProvider,
      paymentData.trxRef,
      paymentData.type,
      paymentData.amount,
      paymentData.reason,
    ]
  );

  const createPaymentIntent = useCallback(async () => {
    if (clientSecret || !isMountedRef.current) return;

    try {
      setIsLoading(true);
      const response = await axios.post(
        `${apiUrl}/api/payments/create-payment-intent`,
        {
          amount: Math.round(parseFloat(memoizedPaymentData.amount) * 100),
          currency: "usd",
          paymentMethodId:
            selectedPaymentMethodId && !useNewCard
              ? selectedPaymentMethodId
              : undefined,
          data: {
            paymentProvider: memoizedPaymentData.paymentProvider,
            trxRef: memoizedPaymentData.trxRef,
            type: memoizedPaymentData.type,
            amount: memoizedPaymentData.amount,
            reason: memoizedPaymentData.reason,
          },
        },
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );

      if (isMountedRef.current) {
        setClientSecret(response.data.clientSecret);
      }
    } catch (error) {
      if (isMountedRef.current) {
        console.error("Failed to create payment intent:", error);
        if (error.response?.status === 429) {
          toast.error("Too many requests. Please try again later.");
        } else {
          toast.error(
            error.response?.data?.message || "Failed to initialize payment"
          );
        }
      }
    } finally {
      if (isMountedRef.current) {
        setIsLoading(false);
      }
    }
  }, [
    clientSecret,
    memoizedPaymentData,
    selectedPaymentMethodId,
    useNewCard,
    setClientSecret,
    setIsLoading,
  ]);

  useEffect(() => {
    createPaymentIntent();
  }, [createPaymentIntent]);

  const validateForm = () => {
    if (!useNewCard) {
      if (!selectedPaymentMethodId) {
        toast.error("Please select a payment method");
        return false;
      }
      return true;
    }
    let isValid = true;
    const errors = { firstName: "", lastName: "" };

    if (!formData.firstName.trim()) {
      errors.firstName = "First name is required";
      isValid = false;
    }
    if (!formData.lastName.trim()) {
      errors.lastName = "Last name is required";
      isValid = false;
    }

    setFormErrors(errors);
    return isValid;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setFormErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const savePaymentMethod = async (paymentMethodId) => {
    try {
      await axios.post(
        `${apiUrl}/api/payments/addPaymentMethod`,
        {
          paymentType: "stripe",
          paymentData: { paymentMethodId },
        },
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );

      const response = await axios.get(
        `${apiUrl}/api/payments/getpaymentMethods`,
        {
          headers: { Authorization: authState.apiKey },
        }
      );
      if (isMountedRef.current) {
        setSavedPaymentMethods(response.data.methods || []);
      }
    } catch (error) {
      if (isMountedRef.current) {
        console.error("Failed to save payment method:", error);
        toast.error("Failed to save payment method");
      }
    }
  };

  const sendReceipt = async (paymentResult, paymentData) => {
    try {
      const response = await axios.post(
        `${apiUrl}/api/payments/process-successful-payment`,
        {
          paymentResult,
          paymentData,
        },
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Failed to send receipt", error);
      toast.error(
        "Payment successful, but there was an issue with receipt delivery"
      );
    }
  };

  const handleStripeSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements || !validateForm() || !isMountedRef.current) {
      return;
    }
    setIsLoading(true);

    try {
      let paymentMethodId = selectedPaymentMethodId;

      if (useNewCard) {
        if (!isMountedRef.current) {
          throw new Error("Form is no longer mounted");
        }
        const cardNumberElement = elements.getElement(CardNumberElement);
        if (!cardNumberElement) {
          throw new Error("Card number element is not mounted");
        }

        const { error: pmError, paymentMethod } =
          await stripe.createPaymentMethod({
            type: "card",
            card: cardNumberElement,
            billing_details: {
              name: `${formData.firstName} ${formData.lastName}`,
              email: authState?.user?.email,
            },
          });

        if (pmError) {
          throw pmError;
        }

        paymentMethodId = paymentMethod.id;
        await savePaymentMethod(paymentMethodId);
      }

      if (!paymentMethodId) {
        throw new Error("No payment method selected");
      }

      const { error, paymentIntent } = await stripe.confirmCardPayment(
        clientSecret,
        {
          payment_method: paymentMethodId,
        }
      );

      if (error) {
        throw error;
      }

      if (paymentIntent?.status === "succeeded") {
        const paymentResult = {
          transactionId: paymentIntent.id,
          amount: paymentData.amount,
          currency: "GBP",
          status: "succeeded",
          paymentMethod: "stripe",
          paymentMethodId: paymentMethodId,
          created: new Date().toISOString(),
          charges: paymentIntent.charges?.data?.[0] || null,
        };

        const receiptToast = toast.loading("Processing payment...");

        try {
          await sendReceipt(paymentResult, paymentData);
          toast.dismiss(receiptToast);
          // toast.success("Payment completed successfully");
          // toast.success("Receipt sent to your Email!");
        } catch (receiptError) {
          console.error("Receipt update failed:", receiptError);
        }

        onPaymentSuccess(paymentResult);
      }
    } catch (error) {
      if (isMountedRef.current) {
        console.error("Payment error:", error);
        toast.error(error.message || "Payment failed");
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
        color: "#32325d",
        fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
        fontSmoothing: "antialiased",
        fontSize: "16px",
        "::placeholder": { color: "#aab7c4" },
      },
      invalid: {
        color: "#fa755a",
        iconColor: "#fa755a",
      },
    },
  };

  const stripeMethods = savedPaymentMethods.filter(
    (method) => method.provider === "stripe"
  );

  return (
    <>
      {!clientSecret ? (
        <div className="py-4 text-center">Loading payment form...</div>
      ) : (
        <form
          onSubmit={handleStripeSubmit}
          className="mt-5 flex flex-col gap-4 border-2 p-4"
        >
          <div className="flex flex-col gap-2">
            {stripeMethods.length > 0 ? (
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium">
                  Select a Saved Card
                </label>
                {stripeMethods.map((method) => (
                  <div
                    key={method.details.paymentMethodId}
                    className="flex items-center gap-2"
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      value={method.details.paymentMethodId}
                      checked={
                        selectedPaymentMethodId ===
                          method.details.paymentMethodId && !useNewCard
                      }
                      onChange={() => {
                        setSelectedPaymentMethodId(
                          method.details.paymentMethodId
                        );
                        setUseNewCard(false);
                      }}
                    />
                    <span>{`${
                      method.details.brand.charAt(0).toUpperCase() +
                      method.details.brand.slice(1)
                    } •••• ${method.details.last4}`}</span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-gray-500">
                No saved cards. Please add a new card.
              </p>
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
                  <label className="mb-1 text-sm font-medium">
                    Expiry Date
                  </label>
                  <div className="rounded-lg border border-gray-300 p-3">
                    <CardExpiryElement
                      options={CARD_ELEMENT_OPTIONS}
                      onChange={(e) => setCardExpiryComplete(e.complete)}
                    />
                  </div>
                </div>
                <div className="flex flex-col text-left">
                  <label className="mb-1 text-sm font-medium">
                    Security Code
                  </label>
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
                    <p className="text-sm text-red-500">
                      {formErrors.firstName}
                    </p>
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
                    <p className="text-sm text-red-500">
                      {formErrors.lastName}
                    </p>
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
              (useNewCard &&
                !(cardNumberComplete && cardExpiryComplete && cardCvcComplete))
            }
            className={`mt-4 w-full rounded-lg py-3 font-medium text-white ${
              isLoading ||
              (!useNewCard && !selectedPaymentMethodId) ||
              (useNewCard &&
                !(cardNumberComplete && cardExpiryComplete && cardCvcComplete))
                ? "cursor-not-allowed bg-gray-400"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {isLoading
              ? "Processing payment..."
              : `Pay £${Number(memoizedPaymentData.amount).toLocaleString()}`}
          </button>
        </form>
      )}
    </>
  );
};

const PaymentConfirmation = ({ onClose }) => {
  return (
    <div className="p-6 md:p-8 payment-confirmation-enter">
      <div className="flex flex-col items-center mb-8">
        <div className="relative mb-6">
          <div className="flex items-center justify-center w-20 h-20 rounded-full gradient-success shadow-lg payment-success-icon">
            <MdCheckCircle className="w-12 h-12 text-white" />
          </div>
          <div className="absolute inset-0 rounded-full border-4 border-green-400 animate-ping opacity-20"></div>
        </div>

        <h2 className="text-3xl font-bold text-gray-800 mb-3 text-center">
          Payment Successful!
        </h2>
        <p className="text-gray-600 text-center max-w-md leading-relaxed">
          Thank you for your payment. Your transaction has been completed
          successfully and a confirmation email has been sent.
        </p>
      </div>

      <div
        className="flex flex-col sm:flex-row gap-3 payment-details-card"
        style={{ animationDelay: "0.3s" }}
      >
        <button
          onClick={onClose}
          className="flex-1 gradient-primary text-white py-3 px-6 rounded-xl font-semibold hover:opacity-90 transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
        >
          Continue to Events
        </button>
      </div>
    </div>
  );
};

const PaymentModal = ({
  isOpen,
  onClose,
  paymentData: propPaymentData,
  onPaymentSuccess,
}) => {
  const [stripePromise, setStripePromise] = useState(null);
  const [paypalClientId, setPaypalClientId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [paymentMethod, setPaymentMethod] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [clientSecret, setClientSecret] = useState("");
  const [savedPaymentMethods, setSavedPaymentMethods] = useState([]);
  const [selectedPaymentMethodId, setSelectedPaymentMethodId] = useState(null);
  const [useNewCard, setUseNewCard] = useState(false);
  const [paymentResult, setPaymentResult] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const authState = JSON.parse(localStorage.getItem("authState") || "{}");
  const paymentMethods = useSelector(selectAllPaymentMethods);
  const paymentMethodsLoading = useSelector(selectPaymentMethodsLoading);
  const isMountedRef = useRef(true);

  const dispatch = useDispatch();

  const paymentData = useMemo(
    () => ({
      eventId: propPaymentData?.eventId,
      paymentProvider: propPaymentData?.paymentProvider,
      trxRef: propPaymentData?.trxRef || generateTransactionReference(),
      type: propPaymentData?.type,
      ticketCount: propPaymentData?.ticketCount,
      amount: propPaymentData?.amount,
      reason: propPaymentData?.reason,
    }),
    [propPaymentData]
  );

  useEffect(() => {
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  useEffect(() => {
    if (isOpen) {
      const initializePaymentProcessors = async () => {
        try {
          setStripePromise(loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY));
          setPaypalClientId(process.env.REACT_APP_PAYPAL_CLIENT_ID);
        } catch (error) {
          console.error("Payment initialization error:", error);
          toast.error("Payment system initialization failed");
        } finally {
          setLoading(false);
        }
      };

      initializePaymentProcessors();
    }
  }, [isOpen]);

  useEffect(() => {
    const fetchPaymentMethods = async () => {
      if (!paymentMethod || !isMountedRef.current) return;
      try {
        const response = await axios.get(
          `${apiUrl}/api/payments/getpaymentMethods`,
          {
            withCredentials: true,
            headers: { "Content-Type": "application/json" },
          }
        );

        if (isMountedRef.current) {
          setSavedPaymentMethods(response.data.methods || []);
          const methods = response.data.methods || [];
          const defaultMethod = methods.find(
            (m) => m.provider === paymentMethod
          );
          if (defaultMethod) {
            setSelectedPaymentMethodId(defaultMethod.details.paymentMethodId);
            setUseNewCard(false);
          } else {
            setUseNewCard(true);
          }
        }
      } catch (error) {
        if (isMountedRef.current) {
          console.error("Failed to fetch payment methods:", error);
          toast.error("Failed to load saved payment methods");
          setUseNewCard(true);
        }
      }
    };

    fetchPaymentMethods();
  }, [paymentMethod]);

  const createPayPalOrder = async () => {
    try {
      const response = await axios.post(
        `${apiUrl}/api/payments/paypal/create-order`,
        {
          amount: paymentData.amount,
          currency: "GBP",
          paymentData: {
            type: "one-time",
            description: paymentData.type,
          },
          billingAgreementId: savedPaymentMethods.find(
            (m) => m.provider === "paypal"
          )?.details.billingAgreementId,
        },
        { withCredentials: true }
      );
      return response.data.data.id;
    } catch (error) {
      console.error("Failed to create PayPal order:", error);
      toast.error(error.response?.data?.message || "Failed to create order");
      throw error;
    }
  };

  const onPayPalApprove = async (data) => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        `${apiUrl}/api/payments/paypal/capture-order/${data.orderID}`,

        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.billingAgreementId) {
        setSavedPaymentMethods((prev) => [
          ...prev,
          {
            provider: "paypal",
            details: {
              billingAgreementId: response.data.billingAgreementId,
              email: authState.user?.email,
            },
          },
        ]);
      }
      const result = {
        transactionId: data.orderID,
        amount: paymentData.amount,
        currency: "GBP",
        status: "succeeded",
        paymentMethod: "paypal",
        created: new Date().toISOString(),
      };
      try {
        await axios.post(
          `${apiUrl}/api/payments/process-successful-payment`,
          {
            paymentResult: result,
            paymentData: paymentData,
          },
          {
            withCredentials: true,
            headers: { "Content-Type": "application/json" },
          }
        );
      } catch (receiptError) {
        console.error("Failed to send receipt:", receiptError);
        toast.error(
          "Payment successful, but there was an issue with receipt delivery"
        );
      }
      setPaymentResult(result);
      toast.success("Payment completed successfully");
      setShowConfirmation(true);
    } catch (error) {
      console.error("Failed to process PayPal payment:", error);
      toast.error(error.response?.data?.message || "Payment failed");
    } finally {
      setIsLoading(false);
    }
  };

  const onPayPalError = (err) => {
    toast.error("An error occurred with PayPal");
    setIsLoading(false);
    console.error(err);
  };
  const handleModalClose = useCallback(() => {
    setPaymentMethod(null);
    setClientSecret("");
    setSelectedPaymentMethodId(null);
    setUseNewCard(false);
    setIsLoading(false);
    setShowConfirmation(false);
    setPaymentResult(null);
    onClose();
  }, [onClose]);

  const handlePaymentSuccess = (result) => {
    setPaymentResult(result);
    setShowConfirmation(true);
    toast.success("Payment completed successfully");
  };

  const handleConfirmationClose = () => {
    setShowConfirmation(false);
    setPaymentResult(null);
    onPaymentSuccess && onPaymentSuccess(paymentResult);
    handleModalClose();
  };

  useEffect(() => {
    dispatch(fetchPaymentMethods());
  }, [dispatch]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center payment-modal-backdrop p-4">
      {" "}
      <div className="relative w-full max-w-lg max-h-[90vh] py-6 overflow-y-auto rounded-xl bg-white payment-modal-content">
        {/* {isLoading && <LoadingSpinner />} */}

        {!showConfirmation && !isLoading && (
          <button
            onClick={handleModalClose}
            className="absolute right-4 top-4 z-10 rounded-full bg-gray-100 p-2 hover:bg-gray-200 transition-colors"
          >
            <MdClose className="h-5 w-5" />
          </button>
        )}
        {loading ? (
          <div className="py-8 text-center">Loading payment providers...</div>
        ) : showConfirmation && paymentResult ? (
          <PaymentConfirmation onClose={handleConfirmationClose} />
        ) : (
          <PayPalScriptProvider
            options={{
              "client-id": paypalClientId,
              currency: "GBP",
              "disable-funding": "credit,card",
              "data-sdk-integration-source": "funding_sc",
              vault: "true",
            }}
          >
            {paymentMethod ? (
              <PaymentTitle title={`Pay with ${paymentMethod}`} />
            ) : (
              <PaymentTitle title="Make Payment" />
            )}

            <div className="my-6 px-4 md:px-12 text-black">
              {paymentMethod === null ? (
                <div className="mb-6 flex flex-row gap-3 justify-center">
                  {paymentMethodsLoading ? (
                    <div className="py-4 text-center">
                      Loading payment methods...
                    </div>
                  ) : (
                    <>
                      {paymentMethods
                        .filter(
                          (pm) =>
                            pm.provider === "Stripe" && pm.enabled === true
                        )
                        .map((stripeMethod) => (
                          <button
                            key={stripeMethod.provider}
                            onClick={() => setPaymentMethod("stripe")}
                            className="cursor-pointer rounded-lg border border-gray-200 p-4 text-center transition-colors text-blue-600 hover:border-blue-600 w-32 h-16 sm:w-40 sm:h-20 flex justify-center items-center flex-shrink-0"
                          >
                            <img
                              src={stripeMethod.logo}
                              alt={stripeMethod.provider}
                              className="h-10 w-8 sm:h-10 sm:w-10"
                            />
                          </button>
                        ))}
                      {paymentMethods
                        .filter(
                          (pm) =>
                            pm.provider === "paypal" && pm.enabled === true
                        )
                        .map((paypalMethod) => (
                          <button
                            key={paypalMethod.provider}
                            onClick={() => setPaymentMethod("paypal")}
                            className="cursor-pointer rounded-lg border border-gray-200 p-4 text-center transition-colors text-blue-600 hover:border-blue-600 w-32 h-16 sm:w-40 sm:h-20 flex justify-center items-center flex-shrink-0"
                          >
                            <img
                              src={paypalMethod.logo}
                              alt={paypalMethod.provider}
                              className="h-10 w-8 sm:h-10 sm:w-10"
                            />
                          </button>
                        ))}
                    </>
                  )}
                </div>
              ) : (
                <>
                  <button
                    onClick={() => {
                      setPaymentMethod(null);
                      setClientSecret("");
                      setSelectedPaymentMethodId(null);
                      setUseNewCard(false);
                    }}
                    className="mb-4 rounded-lg bg-gray-600 px-4 py-2 font-medium text-white transition-colors hover:bg-gray-700"
                  >
                    ← Back to payment methods
                  </button>

                  {paymentMethod === "stripe" && (
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
                        onPaymentSuccess={handlePaymentSuccess}
                      />
                    </Elements>
                  )}

                  {paymentMethod === "paypal" && (
                    <div>
                      {savedPaymentMethods.find(
                        (m) => m.provider === "paypal"
                      ) ? (
                        <div className="flex flex-col gap-2">
                          <span>
                            Saved PayPal Account:{" "}
                            {
                              savedPaymentMethods.find(
                                (m) => m.provider === "paypal"
                              ).details.email
                            }
                          </span>
                          <div className="flex flex-col gap-3 mt-4">
                            <button
                              onClick={async () => {
                                try {
                                  setIsLoading(true);
                                  await createPayPalOrder();
                                } catch (error) {
                                  console.error(
                                    "PayPal payment failed:",
                                    error
                                  );
                                  toast.error("PayPal payment failed");
                                } finally {
                                  setIsLoading(false);
                                }
                              }}
                              disabled={isLoading}
                              className={`w-full rounded-lg py-3 font-medium text-white transition-colors ${
                                isLoading
                                  ? "bg-gray-400 cursor-not-allowed"
                                  : "bg-blue-600 hover:bg-blue-700"
                              }`}
                            >
                              {isLoading
                                ? "Processing..."
                                : `Pay $${Number(
                                    paymentData.amount
                                  ).toLocaleString()}`}
                            </button>
                          </div>
                        </div>
                      ) : (
                        <PayPalButtonWrapper
                          currency="GBP"
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
    </div>
  );
};

export default PaymentModal;
