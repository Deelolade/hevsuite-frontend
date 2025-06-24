import { PayPalButtons } from "@paypal/react-paypal-js";
import { toast } from "react-hot-toast";
import paymentService from "../../../../services/paymentService";

const PayPalCheckout = ({ Settings, onSuccess }) => {
  
  const createOrder = async () => {
    try {
      const amount = Settings.membershipStandardPrice;

      const response = await paymentService.createMembershipPayment({ amount, provider: "paypal" });

      const { id } = response.data;

      return id; //order Id
    } catch (ex) {
      console.error("Error creating paypal offer: ", ex);

      if (ex || ex?.response) {
        toast.error(ex?.response?.data?.message);
        return;
      }

      toast.error(ex?.message || "Unexpected error occurred, please try again");

      return null;
    }
  };

  
  const handleOnApprove = async (data, actions) => {
    try {
      
      if (!data?.orderID) throw new Error("Invalid Order Id");

      const response = await paymentService.capturePaypalPayment({
        orderId: data?.orderID,
      });

      onSuccess(response.data);

    } catch (ex) {

      if (ex || ex?.response) {
        toast.error(ex?.response?.data?.message, { duration: 4_000 });
        return;
      }

      toast.error(
        ex?.message || "Unexpected error occurred, please try again",
        { duration: 5_000 }
      );
    }
  };

  const handleOnError = (err) => {
      // log this error to the server 
        console.error("Paypal Error: ",err);
        toast.error("Oops! Something went wrong with your payment. Please try again or use a different method.", {duration: 4_000 });
  };



  return (
    <>
      <PayPalButtons
        style={{ label: "paypal", color: "gold", layout: "vertical" }}
        createOrder={createOrder}
        onApprove={handleOnApprove}
        onError={handleOnError}
      ></PayPalButtons>
    </>
  );
};

export default PayPalCheckout;
