import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import paymentService from "../../../../services/paymentService";
import { useEffect, useState } from "react";
import StripePaymentForm from "./form";
import SuccessPaymentModal from "./successModal";
import { fetchProfile } from "../../../../features/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { fetchPricingFees } from "../../../../features/pricingFeesSlice";
import { selectPricingFees } from "../../../../features/pricingFeesSlice";

const StripePaymentRegisterForm = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((s) => s.auth);
  const { Settings } = useSelector((state) => state.generalSettings);
  const pricingFees = useSelector(selectPricingFees);

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
    const fetchClientSecret = () => {
      const membershipFee = pricingFees.find(
        (fee) => fee.name === "Membership Fee"
      );

      if (!membershipFee) {
        console.error("Membership Fee not found in pricing fees");
        return;
      }

      const amount =
        user.role === "vip"
          ? membershipFee.vipPrice
          : membershipFee.standardPrice;

      paymentService
        .createMembershipPayment({
          amount,
          provider: "stripe",
          userId: user.id,
        })
        .then((res) => {
          setpaymentConfig(res);
        })
        .catch((ex) => console.error(ex));
    };

    if (pricingFees && user) fetchClientSecret();
  }, [pricingFees, user]);

  useEffect(() => {
    dispatch(fetchPricingFees());
    dispatch(fetchProfile());
  }, [dispatch]);

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
