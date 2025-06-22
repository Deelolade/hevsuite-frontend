import React, { useState, useEffect } from "react";
import { FaPaypal, FaStripe } from "react-icons/fa";
import Modal from "../components/Modal";
import { showModal } from "../../../../components/FireModal";
import StripePaymentForm from "../components/paymentFormsForAddingMethods/StripePayment";
import PayPalPaymentForm from "../components/paymentFormsForAddingMethods/PaypalForm";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import paymentService from "../../../../services/paymentService";
import axios from "axios";
import toast from "react-hot-toast";
import SelectPaymentModal from "../SelectPaymentModal";

const apiUrl = "http://localhost:5000";

const PaymentMethodSection = () => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [openModalPayment, setOpenModalPayment] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("stripe");
  const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);
  const [editMethod, setSelectedEditMethod] = useState("stripe");
  const [isEditing, setIsEditing] = useState(false);
  const [allPaymentMethods, setAllPaymentMethods] = useState([]);
  const [defaultMethodId, setDefaultMethodId] = useState(null); // Track default method by ID

  const renderPaymentForm = (method) => {
    switch (method) {
      case "paypal":
        return <PayPalPaymentForm isEditing={isEditing} />;
      case "stripe":
        return <StripePaymentForm isEditing={isEditing} />;
      default:
        return <p>Please select a payment method.</p>;
    }
  };

  const handlePaymentMethodSelect = (method) => {
    const methodMap = {
      paypal: "paypal",
      stripe: "stripe",
    };
    const normalizedMethod = methodMap[method];
    setPaymentMethod(normalizedMethod);
  };

  const handleEdit = (method, paymentMethodId) => {
    setSelectedEditMethod(method);
    setShowEditForm(true);
    setIsEditing(true);
  };

  const handleRemovePayment = async (methodId) => {
    try {
      const response = await paymentService.deletePayment(methodId);
      if (response.success) {
        toast.success("Payment method removed successfully!");
        setAllPaymentMethods(
          allPaymentMethods.filter(
            (method) => method.details.paymentMethodId !== methodId
          )
        );
        if (methodId === defaultMethodId) {
          setDefaultMethodId(null); // Reset default if removed
        }
      } else {
        throw new Error(response.message || "Failed to remove payment method");
      }
    } catch (error) {
      console.error("Error removing payment method:", error);
      toast.error(error.message || "Failed to remove payment method");
    }
  };

  const handleSetDefault = async (methodId) => {
    setDefaultMethodId(methodId); // Update frontend immediately

    // Hardcoded API call (to be implemented with actual backend logic)
    /*
    try {
      const response = await axios.post(
        `${apiUrl}/api/payments/setDefaultPayment`,
        { paymentMethodId: methodId },
        { withCredentials: true }
      );
      if (response.success) {
        toast.success('Default payment method updated!');
        setDefaultMethodId(methodId);
      } else {
        throw new Error(response.message || 'Failed to set default payment method');
      }
    } catch (error) {
      console.error('Error setting default payment method:', error);
      toast.error(error.message || 'Failed to set default payment method');
      // Revert to previous default if needed
      setDefaultMethodId(allPaymentMethods[0]?.details.paymentMethodId || null);
    }
    */
  };

  const [refreshing, setRefreshing] = useState(false);

  const getAllPaymentMethods = async () => {
    setRefreshing(true);
    try {
      const response = await axios.get(
        `${apiUrl}/api/payments/getpaymentMethods`,
        {
          withCredentials: true,
        }
      );
      console.log(response);
      // Combine backend methods with hardcoded PayPal
      // const hardcodedPayPal = {
      //   provider: "paypal",
      //   details: {
      //     paymentMethodId: "paypal-hardcoded-123",
      //     email: "user@example.com",
      //   },
      // };
      const methods = [...response.data.methods];
      setAllPaymentMethods(methods);
      // Set initial default to first method or hardcoded PayPal
      setDefaultMethodId(methods[0]?.details.paymentMethodId);
    } catch (error) {
      console.error("Failed to fetch payment methods:", error);
    }
  };

  const handleAddSuccess = async (newPaymentMethodData) => {
    try {
      setShowAddModal(false);

      await getAllPaymentMethods();
    } catch (error) {
      console.error("Failed to refresh payment methods after addition:", error);
    }
  };

  const handleEditSuccess = async (updatedPaymentMethodData) => {
    try {
      setShowEditForm(false);
      setIsEditing(false);

      await getAllPaymentMethods();
    } catch (error) {
      console.error("Failed to refresh payment methods after edit:", error);
    }
  };

  const handlePaymentError = (errorMessage) => {
    console.error("Payment operation failed:", errorMessage);
    toast.error(errorMessage);
  };

  useEffect(() => {
    getAllPaymentMethods();
  }, []);

  const AddPaymentModal = ({ paymentMethod }) => (
    <Modal
      isOpen={showAddModal}
      onClose={() => setShowAddModal(false)}
      title={`Add Payment Method - ${paymentMethod || "Select"}`}
    >
      {paymentMethod === "stripe" ? (
        <Elements stripe={stripePromise}>
          <StripePaymentForm
            onSuccess={handleAddSuccess}
            onError={handlePaymentError}
          />
        </Elements>
      ) : paymentMethod === "paypal" ? (
        <PayPalScriptProvider
          options={{
            "client-id": process.env.REACT_APP_PAYPAL_CLIENT_ID,
            intent: "authorize",
            vault: "true",
          }}
        >
          <PayPalPaymentForm
            onSuccess={handleAddSuccess}
            onError={handlePaymentError}
          />
        </PayPalScriptProvider>
      ) : (
        renderPaymentForm(paymentMethod)
      )}
    </Modal>
  );

  return (
    <div className="mt-4 sm:mt-6 md:mt-8">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 sm:gap-0 mb-4 sm:mb-6">
        <h2 className="text-[#540A26] text-lg sm:text-xl font-medium">
          All Payment Methods
        </h2>
        {defaultMethodId && (
          <div className="flex gap-2">
            <button
              onClick={() => {
                const defaultMethod = allPaymentMethods.find(
                  (method) => method.details.paymentMethodId === defaultMethodId
                );
                if (defaultMethod) {
                  handleEdit(
                    defaultMethod.provider,
                    defaultMethod.details.paymentMethodId
                  );
                }
              }}
              className="px-4 sm:px-6 py-1.5 sm:py-2 bg-primary text-white rounded-lg text-sm sm:text-base"
            >
              Edit Default
            </button>
          </div>
        )}
      </div>
      <div className="flex flex-col lg:flex-row gap-4 sm:gap-6 lg:gap-8">
        <div className="mt-2 sm:mt-4 lg:mt-6 w-full lg:w-1/3">
          {allPaymentMethods.map((method) => (
            <div
              key={method.details.paymentMethodId}
              className="border rounded-lg p-3 mt-4 sm:p-4"
            >
              <div className="flex items-center gap-2 sm:gap-4">
                <input
                  type="radio"
                  className="w-4 h-4 sm:w-5 sm:h-5"
                  checked={method.details.paymentMethodId === defaultMethodId}
                  onChange={() =>
                    handleSetDefault(method.details.paymentMethodId)
                  }
                />
                <div className="flex items-center gap-1 sm:gap-2">
                  {method.provider === "stripe" ? (
                    <FaStripe className="text-[#635bff] text-xl sm:text-2xl" />
                  ) : (
                    <FaPaypal className="text-blue-500 text-xl sm:text-2xl" />
                  )}
                  <div>
                    <p className="font-medium text-sm sm:text-base">
                      {method.provider.charAt(0).toUpperCase() +
                        method.provider.slice(1)}
                    </p>
                    <p className="text-xs sm:text-sm text-gray-500">
                      {method.provider === "stripe"
                        ? `Card ends in ${method.details.last4}`
                        : method.details.email || "user@example.com"}
                    </p>
                    {method.details.paymentMethodId === defaultMethodId && (
                      <p className="text-xs sm:text-sm text-primary font-medium">
                        Default
                      </p>
                    )}
                  </div>
                </div>
                <span
                  onClick={() =>
                    showModal({
                      title: "Remove Payment?",
                      text: "You won't be able to undo this action!",
                      confirmText: "Remove",
                      onConfirm: () =>
                        handleRemovePayment(method.details.paymentMethodId),
                    })
                  }
                  className="ml-1 cursor-pointer sm:ml-2 text-xs sm:text-sm text-red-500 font-medium"
                >
                  Remove
                </span>
                <button
                  onClick={() =>
                    handleEdit(method.provider, method.details.paymentMethodId)
                  }
                  className="ml-1 cursor-pointer sm:ml-2 text-xs sm:text-sm text-blue-500 font-medium"
                >
                  Edit
                </button>
              </div>
            </div>
          ))}
          <button
            onClick={() => setOpenModalPayment(true)}
            className="px-4 sm:px-6 py-1.5 sm:py-2 text-[#540A26] rounded-lg text-sm sm:text-base mt-2 sm:mt-3"
          >
            + Add Payment Method
          </button>
        </div>
        {showEditForm && (
          <div className="space-y-3 sm:space-y-4 mt-4 sm:mt-6 lg:mt-8 w-full lg:w-2/3">
            {editMethod === "stripe" ? (
              <Elements stripe={stripePromise}>
                <StripePaymentForm
                  onSuccess={handleEditSuccess}
                  onError={handlePaymentError}
                  isEditing={isEditing}
                  paymentMethodId={
                    editMethod === "stripe" ? defaultMethodId : undefined
                  }
                />
              </Elements>
            ) : (
              <PayPalScriptProvider
                options={{
                  "client-id": process.env.REACT_APP_PAYPAL_CLIENT_ID,
                  intent: "authorize",
                  vault: "true",
                }}
              >
                <PayPalPaymentForm
                  onSuccess={handleEditSuccess}
                  onError={handlePaymentError}
                  isEditing={isEditing}
                />
              </PayPalScriptProvider>
            )}
          </div>
        )}
      </div>
      {openModalPayment && (
        <SelectPaymentModal
          onClose={() => setOpenModalPayment(false)}
          showNewModal={() => setShowAddModal(true)}
          onPaymentMethodSelect={handlePaymentMethodSelect}
        />
      )}
      <AddPaymentModal paymentMethod={paymentMethod} />
    </div>
  );
};

export default PaymentMethodSection;
