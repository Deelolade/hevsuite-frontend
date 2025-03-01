import React, { useState } from "react";
import { FaCreditCard } from "react-icons/fa";
import { BsQuestionCircle } from "react-icons/bs";
import Modal from "../components/Modal";
import visa from "../../../../assets/VISA.png";
import amex from "../../../../assets/AMEX.png";
import discover from "../../../../assets/Discover.png";

const PaymentMethodSection = () => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditForm, setShowEditForm] = useState(true);

  const AddPaymentModal = () => (
    <Modal
      isOpen={showAddModal}
      onClose={() => setShowAddModal(false)}
      title="Add Payment Method"
    >
      <div className="space-y-4">
        <div>
          <label className="block mb-2">Fullname</label>
          <input
            type="text"
            placeholder="Good Luck"
            className="w-full p-3 border rounded-lg focus:outline-none focus:border-[#540A26]"
          />
        </div>
        <div>
          <label className="block mb-2">Card number</label>
          <div className="relative">
            <input
              type="text"
              placeholder="1234 1234 1234 1234"
              className="w-full p-3 border rounded-lg focus:outline-none focus:border-[#540A26]"
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2 flex gap-2">
              <img src={visa} alt="Visa" className="h-5" />
              <img src={amex} alt="Amex" className="h-5" />
              <img src={discover} alt="Discover" className="h-5" />
            </div>
          </div>
        </div>
        <div className="flex gap-4">
          <div className="flex-1">
            <label className="block mb-2">Expiration</label>
            <input
              type="text"
              placeholder="MM/YY"
              className="w-full p-3 border rounded-lg focus:outline-none focus:border-[#540A26]"
            />
          </div>
          <div className="flex-1">
            <label className="block mb-2">CVC</label>
            <div className="relative">
              <input
                type="text"
                placeholder="CVC"
                className="w-full p-3 border rounded-lg focus:outline-none focus:border-[#540A26]"
              />
              <BsQuestionCircle className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
            </div>
          </div>
        </div>
        <div>
          <label className="block mb-2">Country</label>
          <select className="w-full p-3 border rounded-lg bg-white focus:outline-none focus:border-[#540A26]">
            <option>Hong Kong SAR China</option>
          </select>
        </div>
        <div className="flex gap-4">
          <div className="flex-1">
            <label className="block mb-2">Country</label>
            <select className="w-full p-3 border rounded-lg bg-white focus:outline-none focus:border-[#540A26]">
              <option>Hong Kong SAR China</option>
            </select>
          </div>
          <div className="flex-1">
            <label className="block mb-2">Zipcode</label>
            <input
              type="text"
              placeholder="5555555"
              className="w-full p-3 border rounded-lg focus:outline-none focus:border-[#540A26]"
            />
          </div>
        </div>
        <button className="w-full bg-primary text-white rounded-lg p-3 mt-4 hover:bg-[#6b0d31]">
          Save
        </button>
      </div>
    </Modal>
  );

  return (
    <div className="mt-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-[#540A26] text-xl font-medium">
          All Payment Methods
        </h2>
        <div className="flex gap-2">
          <button
            onClick={() => setShowEditForm(!showEditForm)}
            className="px-6 py-2 bg-primary text-white rounded-lg "
          >
            Edit
          </button>
        </div>
      </div>
      <div className="flex gap-8">
        <div className="mt-6 flex-1">
          <div className="border rounded-lg p-4">
            <div className="flex items-center gap-4">
              <input type="radio" className="w-5 h-5" checked readOnly />
              <div className="flex items-center gap-2">
                <FaCreditCard className="text-[#FF5F00]" size={32} />
                <div>
                  <p className="font-medium">Mastercard</p>
                  <p className="text-sm text-gray-500">Ends 3456</p>
                </div>
              </div>
              <span className="ml-2 text-sm text-primary font-medium">
                Default
              </span>
            </div>
          </div>
          <button
            onClick={() => setShowAddModal(true)}
            className="px-6 py-2 text-[#540A26]  rounded-lg"
          >
            + Add Payment Method
          </button>
        </div>

        <div className="space-y-4 mt-8 flex-1">
          <div>
            <label className="block mb-2">Fullname</label>
            <input
              type="text"
              placeholder="Good Luck"
              className="w-full p-3 border rounded-lg focus:outline-none focus:border-[#540A26]"
            />
          </div>
          <div>
            <label className="block mb-2">Card number</label>
            <div className="relative">
              <input
                type="text"
                placeholder="1234 1234 1234 1234"
                className="w-full p-3 border rounded-lg focus:outline-none focus:border-[#540A26]"
              />
              <div className="absolute right-3 top-1/2 -translate-y-1/2 flex gap-2">
                <img src={visa} alt="Visa" className="h-5" />
                <img src={amex} alt="Amex" className="h-5" />
                <img src={discover} alt="Discover" className="h-5" />
              </div>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block mb-2">Expiration</label>
              <input
                type="text"
                placeholder="MM/YY"
                className="w-full p-3 border rounded-lg focus:outline-none focus:border-[#540A26]"
              />
            </div>
            <div className="flex-1">
              <label className="block mb-2">CVC</label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="CVC"
                  className="w-full p-3 border rounded-lg focus:outline-none focus:border-[#540A26]"
                />
                <BsQuestionCircle className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
              </div>
            </div>
          </div>
          <div>
            <label className="block mb-2">Country</label>
            <select className="w-full p-3 border rounded-lg bg-white focus:outline-none focus:border-[#540A26]">
              <option>Hong Kong SAR China</option>
            </select>
          </div>
          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block mb-2">Country</label>
              <select className="w-full p-3 border rounded-lg bg-white focus:outline-none focus:border-[#540A26]">
                <option>Hong Kong SAR China</option>
              </select>
            </div>
            <div className="flex-1">
              <label className="block mb-2">Zipcode</label>
              <input
                type="text"
                placeholder="5555555"
                className="w-full p-3 border rounded-lg focus:outline-none focus:border-[#540A26]"
              />
            </div>
          </div>
          <button className="w-full bg-primary text-white rounded-lg p-3 hover:bg-[#6b0d31]">
            Save
          </button>
        </div>
      </div>

      <AddPaymentModal />
    </div>
  );
};

export default PaymentMethodSection;
