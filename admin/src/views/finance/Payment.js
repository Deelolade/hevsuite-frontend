import React, { useState } from "react";
import { BsGear } from "react-icons/bs";
import Modal from "react-modal";

const Payment = () => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedProcessor, setSelectedProcessor] = useState(null);

  // Add handler for settings click
  const handleSettingsClick = (processor) => {
    setSelectedProcessor(processor);
    setIsEditModalOpen(true);
  };

  const processors = [
    { id: 1, name: "stripe", logo: "/stripe-logo.png", isTopPriority: true },
    { id: 2, name: "amazon", logo: "/amazon-logo.png", isTopPriority: false },
    {
      id: 3,
      name: "mastercard",
      logo: "/mastercard-logo.png",
      isTopPriority: false,
    },
    { id: 4, name: "paypal", logo: "/paypal-logo.png", isTopPriority: false },
  ];
  return (
    <div>
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-medium">Payment Processors</h2>
        <button
          className="px-6 py-2 bg-[#540A26] text-white rounded-lg flex items-center gap-2"
          onClick={() => setIsAddModalOpen(true)}
        >
          + Add New
        </button>
      </div>

      {/* Processors List */}
      <div className="space-y-4">
        {processors.map((processor) => (
          <div
            key={processor.id}
            className="flex items-center justify-between p-4 bg-white rounded-lg border"
          >
            <div className="flex items-center gap-8">
              <span className="text-gray-500">{processor.id}</span>
              <img src={processor.logo} alt={processor.name} className="h-8" />
              {processor.isTopPriority && (
                <span className="px-3 py-1 text-sm text-[#540A26] border border-[#540A26] rounded-full">
                  Top Priority
                </span>
              )}
            </div>
            <div className="flex items-center gap-6">
              <div className="flex gap-2">
                <button className="p-2 hover:bg-gray-100 rounded">↑</button>
                <button className="p-2 hover:bg-gray-100 rounded">↓</button>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  defaultChecked
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#540A26]"></div>
              </label>
              <button
                className="text-gray-400 hover:text-gray-600"
                onClick={() => handleSettingsClick(processor)}
              >
                <BsGear size={20} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-end gap-4 items-center">
        <button className="px-4 py-2 text-gray-500 hover:bg-gray-50 rounded-lg">
          Previous
        </button>
        <span className="w-10 h-10 flex items-center justify-center bg-gray-100 rounded-lg">
          1
        </span>
        <button className="px-4 py-2 text-gray-500 hover:bg-gray-50 rounded-lg">
          Next
        </button>
      </div>
      <Modal
        isOpen={isAddModalOpen}
        onRequestClose={() => setIsAddModalOpen(false)}
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg w-[500px]"
        overlayClassName="fixed inset-0 bg-black/50"
      >
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl">Add New Payment Processor</h2>
            <button
              onClick={() => setIsAddModalOpen(false)}
              className="text-gray-400 hover:text-gray-600"
            >
              ✕
            </button>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block mb-2">Payment Processor Name</label>
              <input
                type="text"
                placeholder="Enter here"
                className="w-full px-4 py-2 border rounded-lg"
              />
            </div>

            <div>
              <label className="block mb-2">API Key</label>
              <input
                type="text"
                placeholder="Enter here"
                className="w-full px-4 py-2 border rounded-lg"
              />
            </div>

            <div>
              <label className="block mb-2">Secret Key</label>
              <input
                type="text"
                placeholder="Enter here"
                className="w-full px-4 py-2 border rounded-lg"
              />
            </div>

            <div>
              <label className="block mb-2">Auth Key</label>
              <input
                type="text"
                placeholder="Enter here"
                className="w-full px-4 py-2 border rounded-lg"
              />
            </div>

            <div className="p-4 bg-gray-50 rounded-lg border border-dashed border-gray-300 text-center cursor-pointer">
              <button className="text-[#540A26]">Click to add image</button>
            </div>

            <div className="flex justify-end gap-3 pt-4">
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="px-6 py-2 border rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button className="px-6 py-2 bg-[#540A26] text-white rounded-lg hover:bg-[#540A26]/90">
                Add Processor
              </button>
            </div>
          </div>
        </div>
      </Modal>

      <Modal
        isOpen={isEditModalOpen}
        onRequestClose={() => setIsEditModalOpen(false)}
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg w-[500px]"
        overlayClassName="fixed inset-0 bg-black/50"
      >
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl">Edit Payment Processor</h2>
            <button
              onClick={() => setIsEditModalOpen(false)}
              className="text-gray-400 hover:text-gray-600"
            >
              ✕
            </button>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block mb-2">Payment Processor Name</label>
              <input
                type="text"
                value={selectedProcessor?.name || "Paypal"}
                className="w-full px-4 py-2 border rounded-lg"
                disabled
              />
            </div>

            <div>
              <label className="block mb-2">API Key</label>
              <input
                type="text"
                value="15014a3e-0382-4d44-a0bf-a44b944856a315014a3e-0382-4d44-a0bf-a44b944856a3"
                className="w-full px-4 py-2 border rounded-lg font-mono text-sm"
              />
            </div>

            <div>
              <label className="block mb-2">Secret Key</label>
              <input
                type="text"
                value="15014a3e-0382-4d44-a0bf-a44b944856a315014a3e-0382-4d4jfcjxjjxjjjiewwope939393999939-0382-4d44-a0bf-a4 4b944856"
                className="w-full px-4 py-2 border rounded-lg font-mono text-sm"
              />
            </div>

            <div>
              <label className="block mb-2">Auth Key</label>
              <input
                type="text"
                value="15014a3e-0382-4d44-a0bf-a44b944856a315014a3e-0382-4d44-a0bf-a44b944856a3"
                className="w-full px-4 py-2 border rounded-lg font-mono text-sm"
              />
            </div>

            <div className="relative">
              <img
                src={selectedProcessor?.logo || "/paypal-logo.png"}
                alt="Processor Logo"
                className="w-20 h-20 mx-auto"
              />
              <button className="w-full mt-2 p-4 bg-gray-50 rounded-lg border border-dashed border-gray-300 text-center text-[#540A26]">
                Click to change image
              </button>
            </div>

            <div className="flex justify-end gap-3 pt-4">
              <button
                onClick={() => setIsEditModalOpen(false)}
                className="px-6 py-2 border rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button className="px-6 py-2 bg-[#540A26] text-white rounded-lg hover:bg-[#540A26]/90">
                Update
              </button>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Payment;
