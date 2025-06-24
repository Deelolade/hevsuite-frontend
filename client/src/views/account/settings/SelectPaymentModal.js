import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchPaymentMethods,
  selectAllPaymentMethods,
  selectPaymentMethodsLoading,
} from "../../../features/paymentMethodSlice";

const SelectPaymentModal = ({
  onClose,
  showNewModal,
  onPaymentMethodSelect,
}) => {
  const dispatch = useDispatch();
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("");

  const paymentMethods = useSelector(selectAllPaymentMethods);
  const isLoading = useSelector(selectPaymentMethodsLoading);
  console.log(paymentMethods);

  const handleMethodSelection = () => {
    if (selectedPaymentMethod) {
      onPaymentMethodSelect(selectedPaymentMethod);
      showNewModal();
      onClose();
    } else {
      alert("Please select a payment method.");
    }
  };

  useEffect(() => {
    dispatch(fetchPaymentMethods());
  }, [dispatch]);

  if (isLoading) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
        <div className="bg-white rounded-3xl w-full max-w-lg p-6">
          <h2 className="text-lg font-medium">Loading payment methods...</h2>
        </div>
      </div>
    );
  }
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      <div className="bg-white rounded-3xl w-full max-w-lg p-6">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-semibold">Select your Payment Method</h2>
          <button onClick={onClose} className="text-[#540A26] font-medium">
            Back
          </button>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-8">
          {paymentMethods.map((method) => (
            <div
              key={method.id}
              onClick={() => setSelectedPaymentMethod(method.provider)}
              className={`bg-white rounded-lg p-4 shadow-sm border cursor-pointer transition-colors ${
                selectedPaymentMethod === method.provider
                  ? "border-[#540A26] bg-[#540A26]/10"
                  : "hover:border-[#540A26] border-gray-200"
              }`}
            >
              <img
                src={method.logo}
                alt={method.provider}
                className="w-full h-12 object-contain"
              />
            </div>
          ))}
        </div>

        <button
          onClick={() => handleMethodSelection()}
          className="w-full py-3 bg-[#540A26] text-white rounded-lg font-medium hover:bg-opacity-90 transition-opacity"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default SelectPaymentModal;
