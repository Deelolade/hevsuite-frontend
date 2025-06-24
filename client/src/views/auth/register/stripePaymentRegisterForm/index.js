import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import paymentService from "../../../../services/paymentService";
import { useEffect, useState } from "react";
import StripePaymentForm from "./form";
import SuccessPaymentModal from "./successModal";
import { fetchProfile } from "../../../../features/auth/authSlice";
import { useSelector } from "react-redux";

const StripePaymentRegisterForm = () => {

  const { user } = useSelector(s => s.auth);
  const { Settings } = useSelector((state) => state.generalSettings);
  

  const [stripePromise, setStripePromise] = useState(null);
  const [paymentConfig, setpaymentConfig] = useState({
    clientSecret: "",
  });
  const [paymentDetails, setPaymentDetails] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handleOnPaymentSuccess = (payDetails) => {
    setShowModal(true);
    setPaymentDetails(payDetails);
    fetchProfile(); // re-fetch user-profile
  };

  const handleOnCloseModal = () => {
    setShowModal(false);

    setTimeout(() => {
      setPaymentDetails(null);
    }, 5_000);
  };

  useEffect(() => {
    const fetchPublishableKey = () => {
      paymentService
        .getPublishableKey()
        .then((res) => {
          const { publishable_key } = res.data;
          setStripePromise(loadStripe(publishable_key));
        })
        .catch((ex) => console.error(ex));
    };

    fetchPublishableKey();
  }, []);


  useEffect(() => {
    // getting client secret.
    const fetchClientSecret = () => {

      const amount = Settings.membershipStandardPrice;

      paymentService
        .createMembershipPayment({ amount, provider: "stripe" }) // amount 120, you need to get
        .then((res) => {
          setpaymentConfig(res);
        })
        .catch((ex) => console.error(ex));
    };

    if(Settings && user ) fetchClientSecret();
  }, [Settings, user]);

  return (
    <div>
      {paymentDetails && (
        <SuccessPaymentModal
          isOpen={showModal}
          onClose={handleOnCloseModal}
          paymentDetails={paymentDetails}
          user={user}
        />
      )}
      {paymentConfig.clientSecret && stripePromise && (
        <Elements
          stripe={stripePromise}
          options={{ clientSecret: paymentConfig.clientSecret }}
        >
          <StripePaymentForm onSuccess={handleOnPaymentSuccess} />
        </Elements>
      )}
    </div>
  );
};

export default StripePaymentRegisterForm;
