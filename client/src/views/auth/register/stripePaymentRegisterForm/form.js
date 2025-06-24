import {
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { useState } from "react";
import toast from "react-hot-toast";

const StripePaymentForm = ({ onSuccess }) => {
  const stripe = useStripe();
  const elements = useElements();

  const [isProcessing, setIsProcessing] = useState(false);
  // const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) return;

    setIsProcessing(true);

    try {
      // stripe.confirmCardSetup(client_secret, {return_url: })
      const { error, paymentIntent } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `${window.location.origin}`,
        },
        redirect: "if_required",
      });

      if (error) {
        // setErrorMessage(error.message);
        toast.error(error.message, { duration: 4_000 });
        return;
      } else if (paymentIntent && paymentIntent.status === "succeeded") {
        onSuccess(paymentIntent);
      }
    } catch (ex) {
      toast.error(ex.message);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div>
      <form id="register-payment-form" onSubmit={handleSubmit}>
        <PaymentElement />
        <button
          type="submit"
          className="w-full mt-5 bg-gradient-to-r from-[#540A26] to-[#0A5440] text-white px-6 py-3 rounded-3xl text-base font-medium
         shadow-sm transition duration-200 ease-in-out hover:opacity-90 disabled:from-gray-300 disabled:to-gray-400 disabled:text-gray-600 
         disabled:cursor-not-allowed disabled:active:ring-0"
          disabled={isProcessing}
        >
          {isProcessing ? "Processing..." : "Make Payment"}
        </button>
      </form>
    </div>
  );
};

export default StripePaymentForm;
