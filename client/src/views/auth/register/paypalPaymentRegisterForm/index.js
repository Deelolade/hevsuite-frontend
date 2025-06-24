import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import { useSelector } from "react-redux";
import PayPalCheckout from "./form";
import PaypalSuccessModal from "./paypalSuccessModal";
import { useState } from "react";

const PaypalPaymentRegisterForm = () => {
  const { user } = useSelector(s => s.auth);
  const { Settings } = useSelector((s) => s.generalSettings);

  const [showModal , setShowModal ] = useState(false);
  const [paymentDetails , setPaymentDetails ] = useState(null);

  const clientId = process.env.REACT_APP_PAYPAL_CLIENT_ID;

  /**@type {import("@paypal/react-paypal-js").ReactPayPalScriptOptions} */
  const initialOptions = { clientId, currency: "GBP",buyerCountry: "GB" };

  const handleOnSuccessfullPayment = (payDetails) => {
    console.log("Onsucees: ", payDetails);
    setPaymentDetails(payDetails);
    setTimeout(() => {

      setShowModal(true);

    },1200);
  }
 
  const handleOnCloseModal = ( ) => {

    setShowModal(false);

    setTimeout(() => { 

      setPaymentDetails(null);

    },4_000);
  }

  return (
    <>
    {paymentDetails && showModal && <PaypalSuccessModal isOpen={showModal} onClose={handleOnCloseModal} paymentDetails={paymentDetails} user={user} /> }
      <PayPalScriptProvider options={initialOptions}>
        {Settings  && <PayPalCheckout Settings={Settings} onSuccess={handleOnSuccessfullPayment} />}
      </PayPalScriptProvider>
    </>
  );
};

export default PaypalPaymentRegisterForm;
