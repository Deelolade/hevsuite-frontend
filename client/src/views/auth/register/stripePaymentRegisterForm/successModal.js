import { FiCopy, FiDownload } from "react-icons/fi";
import Modal from "../../../account/settings/components/Modal";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BsCheckCircleFill } from "react-icons/bs";

/**
 * @typedef {Object} SuccessPaymentModalProps
 * @property {import("@stripe/stripe-js").PaymentIntent} paymentDetails - The Stripe PaymentIntent object.
 * @property {boolean} isOpen - Whether the modal is open.
 * @property {() => void} onClose - Callback to close the modal.
 */

/**
 * Modal shown after a successful payment.
 *
 * @param {SuccessPaymentModalProps} props
 */
const SuccessPaymentModal = ({ paymentDetails, isOpen, onClose, user }) => {

  const fullName = `${user.surname} ${user.forename}`;

  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);
  const { currency, amount, created, id, payment_method_types } =  paymentDetails;

  const handleCopy = async (refId) => {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(refId);
      } else {
        // Fallback for older browsers (including old iOS)
        const textarea = document.createElement("textarea");
        textarea.value = refId;
        textarea.style.position = "fixed"; // avoid scrolling to bottom
        textarea.style.opacity = "0";
        document.body.appendChild(textarea);
        textarea.focus();
        textarea.select();
        const successful = document.execCommand("copy");
        document.body.removeChild(textarea);
        if (!successful) throw new Error("Fallback: Copy command unsuccessful");
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch (err) {
      console.error("Copy failed", err);
    }
  };

  const modalStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      transform: "translate(-50%, -50%)",
      maxWidth: "500px",
      width: "90%",
      padding: "0",
      height: "min-content",
      border: "none",
      borderRadius: "24px",
      backgroundColor: "white",
    },
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.75)",
    },
  };

  const formattedAmount = new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: (currency || "GBP").toUpperCase(),
  }).format(amount / 100); // convert cents to euros

  // 2. Format date
  const formattedDate = new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(new Date(created * 1000));

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      onRequestClose={onClose}
      style={{
        content: {
          ...modalStyles.content,
          background: "none",
          backgroundColor: "none !important",
        },
        overlay: modalStyles.overlay,
      }}
      contentLabel="Payment Success Modal"
    >
      <div className="relative pt-0 pb-8 px-4 z-10 rounded-2xl bg-white  ">
        {/* Success Icon */}
        <div className=" flex justify-center w-full absolute -top-[4.7rem] -left-1">
          <div className="w-14 h-14  rounded-full bg-black flex items-center justify-center"></div>
          <BsCheckCircleFill className="w-8 h-8 text-[#900C3F] z-0 absolute top-3" />
        </div>

        {/* Modal Content */}
        <div className="text-center mt-6">
          <h2 className="text-2xl font-semibold mb-2">Payment Success!</h2>
          <p className="text-gray-600 mb-8">
            Your payment has been successfully done.
          </p>

          <hr className="mb-4" />

          <div className="mb-8">
            <h3 className="text-gray-500 mb-2">Total Payment</h3>
            <p className="text-4xl text-gray-600">{formattedAmount} </p>
            {/* <p className="text-4xl text-gray-600">£120.00</p> */}
          </div>

          <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="bg-gray-50 p-4 rounded-lg ">
              <p className="text-gray-500 text-sm mb-1">Ref Number</p>
              <p className="font-medium text-sm text-ellipsis overflow-hidden text-center" title={id} >{id}</p>
              {/* <p className="font-medium break-words text-[0.95rem]">00008575257 </p> */}
              
              <button
                onClick={()=> handleCopy(id)}
                className="flex w-full justify-center mt-2 items-center gap-1 text-sm text-blue-600 hover:text-blue-800 transition"
                title={copied ? "Copied!" : "Copy"}
              >
                <FiCopy />
                {copied ? "Copied!" : "Copy"}
              </button>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-gray-500 text-sm mb-1">Payment Time</p>
              <p className="font-medium"> {formattedDate}</p>
              {/* <p className="font-medium">25 Feb 2023, 13:22</p> */}
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-gray-500 text-sm mb-1">Payment Method</p>
              <p className="font-medium">{payment_method_types[0]} </p>
              {/* <p className="font-medium">Card</p> */}
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-gray-500 text-sm mb-1">Sender Name</p>
              <p className="font-medium text-ellipsis overflow-hidden text-center">{fullName}{" "}</p>
              {/* <p className="font-medium">Antonio Roberto</p> */}
            </div>
          </div>

          <button
            className="flex items-center justify-center gap-2 text-gray-600 mx-auto mb-6 hover:text-gray-800"
            onClick={() => {
              /* Add PDF download logic */
            }}
          >
            <FiDownload className="w-5 h-5" />
            Get PDF Receipt
          </button>

          <button
            onClick={() => {
              onClose();
              navigate("/homepage");
            }}
            className="w-full py-1   text-[#540A26] border-2 border-gradient_r rounded-3xl"
          >
            Back to Home
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default SuccessPaymentModal;
