import React, { useState } from "react";
import { BsGear } from "react-icons/bs";
import Modal from "react-modal";
import stripe from "../../assets/Stripe.png";
import paypal from "../../assets/PayPal.png";
import mastercard from "../../assets/Mastercard.png";
import amazon_pay from "../../assets/AmazonPay.png";

const Payment = () => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedProcessor, setSelectedProcessor] = useState(null);
  const [openOptionsId, setOpenOptionsId] = useState(null);
  const [isRemoveModalOpen, setIsRemoveModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [newProcessorImage, setNewProcessorImage] = useState(null);

  // Add handler for settings click
  const handleSettingsClick = (processor) => {
    setSelectedProcessor(processor);
    setIsEditModalOpen(true);
  };

  const handleImageSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setSelectedImage(imageUrl);
    }
  };

  const handleNewImageSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setNewProcessorImage(imageUrl);
    }
  };

  const processors = [
    { id: 1, name: "stripe", logo: stripe, isTopPriority: true },
    { id: 2, name: "amazon", logo: amazon_pay, isTopPriority: false },
    {
      id: 3,
      name: "mastercard",
      logo: mastercard,
    },
    { id: 4, name: "paypal", logo: paypal, isTopPriority: false },
  ];

  const handleRemove = (processor) => {
    setSelectedProcessor(processor);
    setIsRemoveModalOpen(true);
    setOpenOptionsId(null);
  };
  return (
    <div>
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-medium">Payment Processors</h2>
        <button
          className="px-6 py-2 mb-2 bg-primary text-white rounded-lg flex items-center gap-2"
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
              <img src={processor.logo} alt={processor.name} className="h-16" />
            </div>
            <div className="flex items-center gap-6">
              <div className="flex gap-2">
                <button className="p-2 hover:bg-gray-100 rounded text-[32px]">
                  ↑
                </button>
                <button className="p-2 hover:bg-gray-100 rounded text-[32px]">
                  ↓
                </button>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" defaultChecked />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
            </label>
            <div className="relative">
              <button
                className="text-gray-400 hover:text-gray-600"
                onClick={() =>
                  setOpenOptionsId(
                    openOptionsId === processor.id ? null : processor.id
                  )
                }
              >
                <BsGear size={20} />
              </button>
              {openOptionsId === processor.id && (
                <div className="absolute right-0 mt-2 w-32 bg-white rounded-lg shadow-lg border py-1 z-10">
                  <button
                    className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50"
                    onClick={() => handleSettingsClick(processor)}
                  >
                    Detail
                  </button>
                  <button
                    className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 text-red-500"
                    onClick={() => handleRemove(processor)}
                  >
                    Remove
                  </button>
                </div>
              )}
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

            <div className="relative">
              {newProcessorImage && (
                <img
                  src={newProcessorImage}
                  alt="New Processor Logo"
                  className="w-20 h-20 mx-auto object-contain mb-4"
                />
              )}
              <input
                type="file"
                id="newProcessorImage"
                accept="image/*"
                className="hidden"
                onChange={handleNewImageSelect}
              />
              <label
                htmlFor="newProcessorImage"
                className="w-full p-4 bg-gray-50 rounded-lg border border-dashed border-gray-300 text-center cursor-pointer block hover:bg-gray-100"
              >
                <span className="text-primary">Click to add image</span>
              </label>
            </div>

            <div className="flex justify-end gap-3 pt-4">
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="px-6 py-2 border rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90">
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
                src={
                  selectedImage || selectedProcessor?.logo || "/paypal-logo.png"
                }
                alt="Processor Logo"
                className="w-20 h-20 mx-auto object-contain"
              />
              <input
                type="file"
                id="processorImage"
                accept="image/*"
                className="hidden"
                onChange={handleImageSelect}
              />
              <label
                htmlFor="processorImage"
                className="w-full mt-2 p-4 bg-gray-50 rounded-lg border border-dashed border-gray-300 text-center text-primary cursor-pointer block hover:bg-gray-100"
              >
                Click to change image
              </label>
            </div>

            <div className="flex justify-end gap-3 pt-4">
              <button
                onClick={() => setIsEditModalOpen(false)}
                className="px-6 py-2 border rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90">
                Update
              </button>
            </div>
          </div>
        </div>
      </Modal>

      <Modal
        isOpen={isRemoveModalOpen}
        onRequestClose={() => setIsRemoveModalOpen(false)}
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg w-[400px]"
        overlayClassName="fixed inset-0 bg-black/50"
      >
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <span className="text-red-500">⚠</span>
              Remove Payment Processor
            </h2>
            <button
              onClick={() => setIsRemoveModalOpen(false)}
              className="text-gray-400 hover:text-gray-600"
            >
              ✕
            </button>
          </div>
          <div className="space-y-6">
            <p className="text-gray-600">
              Are you sure you want to remove this payment processor?
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setIsRemoveModalOpen(false)}
                className="px-6 py-2 border rounded-lg text-sm"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  // Handle remove logic here
                  setIsRemoveModalOpen(false);
                }}
                className="px-6 py-2 bg-primary text-white rounded-lg text-sm"
              >
                Remove
              </button>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Payment;
