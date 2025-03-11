import React, { useState } from "react";
import { FaCreditCard } from "react-icons/fa";
import { BsQuestionCircle } from "react-icons/bs";
import Modal from "../components/Modal";
import visa from "../../../../assets/VISA.png";
import amex from "../../../../assets/AMEX.png";
import discover from "../../../../assets/Discover.png";
import { PaymentMethodModal } from "../../events/EventDetails";
import Swal from "sweetalert2";
import { showModal } from "../../../../components/FireModal";

const PaymentMethodSection = () => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false); // Changed default to false for better mobile experience
  const [openModalPayment, setOpenModalPayment] = useState(false);

  const AddPaymentModal = () => (
    <Modal
      isOpen={showAddModal}
      onClose={() => setShowAddModal(false)}
      title="Add Payment Method"
    >
      <div className="space-y-3 sm:space-y-4">
        <div>
          <label className="block mb-1 sm:mb-2 text-sm sm:text-base">
            Fullname
          </label>
          <input
            type="text"
            placeholder="Good Luck"
            className="w-full p-2 sm:p-3 border rounded-lg text-sm sm:text-base focus:outline-none focus:border-[#540A26]"
          />
        </div>
        <div>
          <label className="block mb-1 sm:mb-2 text-sm sm:text-base">
            Card number
          </label>
          <div className="relative">
            <input
              type="text"
              placeholder="1234 1234 1234 1234"
              className="w-full p-2 sm:p-3 border rounded-lg text-sm sm:text-base focus:outline-none focus:border-[#540A26]"
            />
            <div className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 flex gap-1 sm:gap-2">
              <img src={visa} alt="Visa" className="h-4 sm:h-5" />
              <img src={amex} alt="Amex" className="h-4 sm:h-5" />
              <img src={discover} alt="Discover" className="h-4 sm:h-5" />
            </div>
          </div>
        </div>
        <div className="flex gap-2 sm:gap-4">
          <div className="flex-1">
            <label className="block mb-1 sm:mb-2 text-sm sm:text-base">
              Expiration
            </label>
            <input
              type="text"
              placeholder="MM/YY"
              className="w-full p-2 sm:p-3 border rounded-lg text-sm sm:text-base focus:outline-none focus:border-[#540A26]"
            />
          </div>
          <div className="flex-1">
            <label className="block mb-1 sm:mb-2 text-sm sm:text-base">
              CVC
            </label>
            <div className="relative">
              <input
                type="text"
                placeholder="CVC"
                className="w-full p-2 sm:p-3 border rounded-lg text-sm sm:text-base focus:outline-none focus:border-[#540A26]"
              />
              <BsQuestionCircle className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm sm:text-base" />
            </div>
          </div>
        </div>
        <div>
          <label className="block mb-1 sm:mb-2 text-sm sm:text-base">
            Country
          </label>
          <select className="w-full p-2 sm:p-3 border rounded-lg bg-white text-sm sm:text-base focus:outline-none focus:border-[#540A26]">
            <option>Hong Kong SAR China</option>
          </select>
        </div>
        <div className="flex gap-2 sm:gap-4">
          <div className="flex-1">
            <label className="block mb-1 sm:mb-2 text-sm sm:text-base">
              Country
            </label>
            <select className="w-full p-2 sm:p-3 border rounded-lg bg-white text-sm sm:text-base focus:outline-none focus:border-[#540A26]">
              <option>Hong Kong SAR China</option>
            </select>
          </div>
          <div className="flex-1">
            <label className="block mb-1 sm:mb-2 text-sm sm:text-base">
              Zipcode
            </label>
            <input
              type="text"
              placeholder="5555555"
              className="w-full p-2 sm:p-3 border rounded-lg text-sm sm:text-base focus:outline-none focus:border-[#540A26]"
            />
          </div>
        </div>
        <button
          onClick={() => setShowAddModal(false)}
          className="w-full bg-primary text-white rounded-lg p-2 sm:p-3 mt-2 sm:mt-4 text-sm sm:text-base hover:bg-[#6b0d31]"
        >
          Save
        </button>
      </div>
    </Modal>
  );

  return (
    <div className="mt-4 sm:mt-6 md:mt-8">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 sm:gap-0 mb-4 sm:mb-6">
        <h2 className="text-[#540A26] text-lg sm:text-xl font-medium">
          All Payment Methods
        </h2>
        <div className="flex gap-2">
          <button
            onClick={() => setShowEditForm(!showEditForm)}
            className="px-4 sm:px-6 py-1.5 sm:py-2 bg-primary text-white rounded-lg text-sm sm:text-base"
          >
            {showEditForm ? "Hide Form" : "Edit"}
          </button>
        </div>
      </div>
      <div className="flex flex-col lg:flex-row gap-4 sm:gap-6 lg:gap-8">
        <div className="mt-2 sm:mt-4 lg:mt-6 w-full lg:w-1/3">
          <div className="border rounded-lg p-3 sm:p-4">
            <div className="flex items-center gap-2 sm:gap-4">
              <input
                type="radio"
                className="w-4 h-4 sm:w-5 sm:h-5"
                checked
                readOnly
              />
              <div className="flex items-center gap-1 sm:gap-2">
                <FaCreditCard className="text-[#FF5F00] text-xl sm:text-2xl" />
                <div>
                  <p className="font-medium text-sm sm:text-base">Mastercard</p>
                  <p className="text-xs sm:text-sm text-gray-500">Ends 3456</p>
                </div>
              </div>
              <span className="ml-1 sm:ml-2 text-xs sm:text-sm text-primary font-medium">
                Default
              </span>
            </div>
          </div>
          <div className="border rounded-lg p-3 mt-4 sm:p-4">
            <div className="flex items-center gap-2 sm:gap-4">
              <input
                type="radio"
                className="w-4 h-4 sm:w-5 sm:h-5"
                checked
                disabled
                // readOnly
              />
              <div className="flex items-center gap-1 sm:gap-2">
                <FaCreditCard className="text-[#FF5F00] text-xl sm:text-2xl" />
                <div>
                  <p className="font-medium text-sm sm:text-base">Mastercard</p>
                  <p className="text-xs sm:text-sm text-gray-500">Ends 3456</p>
                </div>
              </div>
              <span
                onClick={() =>
                  showModal({
                    title: "Remove Card?",
                    text: "You won't be able to undo this action!",
                    confirmText: "Remove",
                    onConfirm: () => {},
                  })
                }
                className="ml-1 cursor-pointer sm:ml-2 text-xs sm:text-sm text-red-500 font-medium"
              >
                Remove
              </span>
            </div>
          </div>
          <button
            onClick={() => setOpenModalPayment(true)}
            className="px-4 sm:px-6 py-1.5 sm:py-2 text-[#540A26] rounded-lg text-sm sm:text-base mt-2 sm:mt-3"
          >
            + Add Payment Method
          </button>
        </div>

        {showEditForm && (
          <div className="space-y-3 sm:space-y-4 mt-4 sm:mt-6 lg:mt-8 w-full lg:w-2/3">
            <div>
              <label className="block mb-1 sm:mb-2 text-sm sm:text-base">
                Fullname
              </label>
              <input
                type="text"
                placeholder="Good Luck"
                className="w-full p-2 sm:p-3 border rounded-lg text-sm sm:text-base focus:outline-none focus:border-[#540A26]"
              />
            </div>
            <div>
              <label className="block mb-1 sm:mb-2 text-sm sm:text-base">
                Card number
              </label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="1234 1234 1234 1234"
                  className="w-full p-2 sm:p-3 border rounded-lg text-sm sm:text-base focus:outline-none focus:border-[#540A26]"
                />
                <div className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 flex gap-1 sm:gap-2">
                  <img src={visa} alt="Visa" className="h-4 sm:h-5" />
                  <img src={amex} alt="Amex" className="h-4 sm:h-5" />
                  <img src={discover} alt="Discover" className="h-4 sm:h-5" />
                </div>
              </div>
            </div>
            <div className="flex gap-2 sm:gap-4">
              <div className="flex-1">
                <label className="block mb-1 sm:mb-2 text-sm sm:text-base">
                  Expiration
                </label>
                <input
                  type="text"
                  placeholder="MM/YY"
                  className="w-full p-2 sm:p-3 border rounded-lg text-sm sm:text-base focus:outline-none focus:border-[#540A26]"
                />
              </div>
              <div className="flex-1">
                <label className="block mb-1 sm:mb-2 text-sm sm:text-base">
                  CVC
                </label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="CVC"
                    className="w-full p-2 sm:p-3 border rounded-lg text-sm sm:text-base focus:outline-none focus:border-[#540A26]"
                  />
                  <BsQuestionCircle className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm sm:text-base" />
                </div>
              </div>
            </div>
            <div>
              <label className="block mb-1 sm:mb-2 text-sm sm:text-base">
                Country
              </label>
              <select className="w-full p-2 sm:p-3 border rounded-lg bg-white text-sm sm:text-base focus:outline-none focus:border-[#540A26]">
                <option>Hong Kong SAR China</option>
              </select>
            </div>
            <div className="flex gap-2 sm:gap-4">
              <div className="flex-1">
                <label className="block mb-1 sm:mb-2 text-sm sm:text-base">
                  Country
                </label>
                <select className="w-full p-2 sm:p-3 border rounded-lg bg-white text-sm sm:text-base focus:outline-none focus:border-[#540A26]">
                  <option>Hong Kong SAR China</option>
                </select>
              </div>
              <div className="flex-1">
                <label className="block mb-1 sm:mb-2 text-sm sm:text-base">
                  Zipcode
                </label>
                <input
                  type="text"
                  placeholder="5555555"
                  className="w-full p-2 sm:p-3 border rounded-lg text-sm sm:text-base focus:outline-none focus:border-[#540A26]"
                />
              </div>
            </div>
            <button className="w-full bg-primary text-white rounded-lg p-2 sm:p-3 text-sm sm:text-base hover:bg-[#6b0d31]">
              Save
            </button>
          </div>
        )}
      </div>
      {openModalPayment && (
        <PaymentMethodModal
          onClose={() => setOpenModalPayment(false)}
          showNewModal={() => setShowAddModal(true)}
        />
      )}

      <AddPaymentModal />
    </div>
  );
};

export default PaymentMethodSection;
