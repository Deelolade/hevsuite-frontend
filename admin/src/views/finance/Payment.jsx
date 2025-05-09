import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BsGear } from "react-icons/bs";
import Modal from "react-modal";
import { toast } from "react-toastify";
import {
  getProcessors,
  updateProcessor,
  addProcessor,
  removeProcessor,
  reset,
  reorderProcessors,
} from "../../store/payment/paymentSlice";
import LoadingSpinner from "../../components/Spinner";
import stripe from "../../assets/Stripe.png";
import paypal from "../../assets/PayPal.png";
import mastercard from "../../assets/Mastercard.png";
import amazon_pay from "../../assets/AmazonPay.png";
import TransactionHistory from './History';

const Payment = () => {
  const dispatch = useDispatch();
  const { processors, isLoading, isError, message } = useSelector(
    (state) => state.payment
  );

  const [activeTab, setActiveTab] = useState('processors');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedProcessor, setSelectedProcessor] = useState(null);
  const [openOptionsId, setOpenOptionsId] = useState(null);
  const [isRemoveModalOpen, setIsRemoveModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [newProcessorData, setNewProcessorData] = useState({
    provider: "",
    enabled: true,
    apiKey: "",
    secretKey: "",
    authKey: "",
    currency: "GBP",
    allowedMembers: "all",
    logo: null,
  });

  // Drag and drop state
  const [dragging, setDragging] = useState(null);
  const [dragOver, setDragOver] = useState(null);

  useEffect(() => {
    dispatch(getProcessors());

    return () => {
      dispatch(reset());
    };
  }, [dispatch]);

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
  }, [isError, message]);

  const handleAddProcessor = async (e) => {
    e.preventDefault();
    await dispatch(addProcessor(newProcessorData));
    if (!isError) {
      setIsAddModalOpen(false);
      setNewProcessorData({
        provider: "",
        enabled: true,
        apiKey: "",
        secretKey: "",
        authKey: "",
        currency: "GBP",
        allowedMembers: "all",
        logo: null,
      });
      toast.success("Payment processor added successfully");
    }
  };

  const handleUpdateProcessor = async (e) => {
    e.preventDefault();
    await dispatch(updateProcessor(selectedProcessor));
    if (!isError) {
      setIsEditModalOpen(false);
      setSelectedProcessor(null);
      toast.success("Payment processor updated successfully");
    }
  };

  const handleRemoveProcessor = async () => {
    await dispatch(removeProcessor(selectedProcessor.provider));
    if (!isError) {
      setIsRemoveModalOpen(false);
      setSelectedProcessor(null);
      toast.success("Payment processor removed successfully");
    }
  };

  const handleNewImageSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewProcessorData({
        ...newProcessorData,
        logo: file,
      });
    }
  };

  // Drag and drop handlers
  const handleDragStart = (e, index) => {
    setDragging(index);
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDragOver = (e, index) => {
    e.preventDefault();
    setDragOver(index);
  };

  const handleDragEnd = () => {
    if (dragging !== null && dragOver !== null && dragging !== dragOver) {
      const newProcessors = [...processors];
      const [removed] = newProcessors.splice(dragging, 1);
      newProcessors.splice(dragOver, 0, removed);
      
      // Update the order in Redux
      dispatch(reorderProcessors(newProcessors));
      
      toast.success("Payment processors reordered successfully");
    }
    
    setDragging(null);
    setDragOver(null);
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="space-y-6">
      {/* Tabs */}
      <div className="border-b border-gray-200">
        {/* <nav className="-mb-px flex space-x-8">
          <button
            className={`${
              activeTab === 'processors'
                ? 'border-primary text-primary'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            onClick={() => setActiveTab('processors')}
          >
            Payment Processors
          </button>
          <button
            className={`${
              activeTab === 'transactions'
                ? 'border-primary text-primary'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            onClick={() => setActiveTab('transactions')}
          >
            Transaction History
          </button>
        </nav> */}
      </div>

      {activeTab === 'processors' ? (
        <>
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-medium">Payment Processors</h2>
        <button
              className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90"
              onClick={() => {
                setIsAddModalOpen(true);
              }}
            >
              Add New Processor
        </button>
      </div>

      {/* Processors List */}
      <div className="space-y-4">
        {processors.map((processor, index) => (
          <div
                key={processor.provider}
                draggable
                onDragStart={(e) => handleDragStart(e, index)}
            onDragOver={(e) => handleDragOver(e, index)}
            onDragEnd={handleDragEnd}
                className={`flex items-center cursor-pointer justify-between p-4 bg-white rounded-lg border ${
                  dragging === index ? "opacity-50 border-primary" : ""
                } ${
                  dragOver === index && dragging !== index
                    ? "border-t-2 border-primary"
                    : ""
                }`}
          >
            <div className="flex items-center gap-8">
                  <span className="text-gray-500">{processor.provider}</span>
              <img
                src={processor.logo}
                    alt={processor.provider}
                className="h-16 w-32"
              />
            </div>
            <div className="flex items-center gap-6">
              <div className="flex gap-2">
                    <button 
                      className="p-2 hover:bg-gray-100 rounded text-[32px]"
                      onClick={(e) => {
                        e.stopPropagation();
                        if (index > 0) {
                          const newProcessors = [...processors];
                          const [removed] = newProcessors.splice(index, 1);
                          newProcessors.splice(index - 1, 0, removed);
                          dispatch(reorderProcessors(newProcessors));
                          toast.success("Payment processor moved up");
                        }
                      }}
                      disabled={index === 0}
                    >
                  ↑
                </button>
                    <button 
                      className="p-2 hover:bg-gray-100 rounded text-[32px]"
                      onClick={(e) => {
                        e.stopPropagation();
                        if (index < processors.length - 1) {
                          const newProcessors = [...processors];
                          const [removed] = newProcessors.splice(index, 1);
                          newProcessors.splice(index + 1, 0, removed);
                          dispatch(reorderProcessors(newProcessors));
                          toast.success("Payment processor moved down");
                        }
                      }}
                      disabled={index === processors.length - 1}
                    >
                  ↓
                </button>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    checked={processor.enabled}
                    onChange={(e) => {
                      e.stopPropagation();
                      dispatch(
                        updateProcessor({
                          ...processor,
                          enabled: !processor.enabled,
                        })
                      );
                    }}
                  />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
            </label>
            <div className="relative">
              <button
                className="text-gray-400 hover:text-gray-600"
                    onClick={(e) => {
                      e.stopPropagation();
                  setOpenOptionsId(
                        openOptionsId === processor.provider
                          ? null
                          : processor.provider
                      );
                    }}
              >
                <BsGear size={20} />
              </button>
                  {openOptionsId === processor.provider && (
                <div className="absolute right-0 mt-2 w-32 bg-white rounded-lg shadow-lg border py-1 z-10">
                  <button
                    className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedProcessor(processor);
                          setIsEditModalOpen(true);
                          setOpenOptionsId(null);
                        }}
                      >
                        Settings
                  </button>
                  <button
                    className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 text-red-500"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedProcessor(processor);
                          setIsRemoveModalOpen(true);
                          setOpenOptionsId(null);
                        }}
                  >
                    Remove
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
        </>
      ) : (
        <TransactionHistory />
      )}

      {/* Add Modal */}
      <Modal
        isOpen={isAddModalOpen}
        onRequestClose={() => setIsAddModalOpen(false)}
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg md:w-[500px] w-[90vw] max-h-[90vh] overflow-y-auto"
        overlayClassName="fixed inset-0 bg-black/50 z-50"
      >
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">Add New Payment Processor</h2>
            <button
              onClick={() => setIsAddModalOpen(false)}
              className="text-gray-400 hover:text-gray-600"
            >
              ✕
            </button>
          </div>

          <form onSubmit={handleAddProcessor} className="space-y-6">
            {/* Logo Upload Section */}
            <div className="mb-6">
              <label className="block mb-2 font-medium">Logo</label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                {newProcessorData.logo ? (
                  <div className="relative">
                    <img
                      src={URL.createObjectURL(newProcessorData.logo)}
                      alt="Preview"
                      className="max-h-32 mx-auto object-contain"
                    />
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setNewProcessorData({ ...newProcessorData, logo: null });
                      }}
                      className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
                    >
                      ×
                    </button>
                  </div>
                ) : (
                  <div>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        e.stopPropagation();
                        setNewProcessorData({
                          ...newProcessorData,
                          logo: e.target.files[0],
                        });
                      }}
                      className="hidden"
                      id="logo-upload"
                    />
                    <label
                      htmlFor="logo-upload"
                      className="cursor-pointer text-primary hover:text-primary/80"
                    >
                      <div className="flex flex-col items-center">
                        <svg
                          className="w-12 h-12 mb-2 text-gray-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                          />
                        </svg>
                        <span className="text-sm">Click to upload logo</span>
                        <span className="text-xs text-gray-500 mt-1">
                          PNG, JPG up to 5MB
                        </span>
                      </div>
                    </label>
                  </div>
                )}
              </div>
            </div>

            <div>
              <label className="block mb-2 font-medium">Provider Name</label>
              <input
                type="text"
                placeholder="e.g., stripe, paypal"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary"
                value={newProcessorData.provider}
                onChange={(e) => {
                  e.stopPropagation();
                  setNewProcessorData({
                    ...newProcessorData,
                    provider: e.target.value,
                  });
                }}
                required
              />
            </div>

            <div>
              <label className="block mb-2 font-medium">Allowed Members</label>
              <select
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary"
                value={newProcessorData.allowedMembers}
                onChange={(e) => {
                  e.stopPropagation();
                  setNewProcessorData({
                    ...newProcessorData,
                    allowedMembers: e.target.value,
                  });
                }}
              >
                <option value="all">All Members</option>
                <option value="vip">VIP Members</option>
                <option value="standard">Standard Members</option>
              </select>
            </div>

            <div>
              <label className="block mb-2 font-medium">API Key</label>
              <input
                type="text"
                placeholder="Enter API key"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary font-mono text-sm"
                value={newProcessorData.apiKey}
                onChange={(e) => {
                  e.stopPropagation();
                  setNewProcessorData({
                    ...newProcessorData,
                    apiKey: e.target.value,
                  });
                }}
                required
              />
            </div>

            <div>
              <label className="block mb-2 font-medium">Secret Key</label>
              <input
                type="password"
                placeholder="Enter secret key"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary font-mono text-sm"
                value={newProcessorData.secretKey}
                onChange={(e) => {
                  e.stopPropagation();
                  setNewProcessorData({
                    ...newProcessorData,
                    secretKey: e.target.value,
                  });
                }}
                required
              />
            </div>

            <div>
              <label className="block mb-2 font-medium">Auth Key (Optional)</label>
              <input
                type="password"
                placeholder="Enter auth key"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary font-mono text-sm"
                value={newProcessorData.authKey}
                onChange={(e) => {
                  e.stopPropagation();
                  setNewProcessorData({
                    ...newProcessorData,
                    authKey: e.target.value,
                  });
                }}
              />
            </div>

            <div>
              <label className="block mb-2 font-medium">Currency</label>
              <select
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary"
                value={newProcessorData.currency}
                onChange={(e) => {
                  e.stopPropagation();
                  setNewProcessorData({
                    ...newProcessorData,
                    currency: e.target.value,
                  });
                }}
              >
                <option value="GBP">GBP</option>
                <option value="USD">USD</option>
                <option value="EUR">EUR</option>
              </select>
            </div>

            <div className="flex gap-4 pt-4">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsAddModalOpen(false);
                }}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
              >
                Add Processor
              </button>
            </div>
          </form>
        </div>
      </Modal>

      {/* Edit Modal */}
      <Modal
        isOpen={isEditModalOpen}
        onRequestClose={() => setIsEditModalOpen(false)}
        className="absolute h-[95vh] overflow-auto top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg md:w-[500px] w-[90vw]"
        overlayClassName="fixed inset-0 bg-black/50 z-50"
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

          {selectedProcessor && (
            <form onSubmit={handleUpdateProcessor} className="space-y-4">
            <div>
              <label className="block mb-2">API Key</label>
              <input
                type="text"
                  placeholder="Enter API key"
                  className="w-full px-4 py-2 border rounded-lg"
                  value={selectedProcessor.apiKey || ""}
                  onChange={(e) => {
                    e.stopPropagation();
                    setSelectedProcessor({
                      ...selectedProcessor,
                      apiKey: e.target.value,
                    });
                  }}
                  required
              />
            </div>
            <div>
              <label className="block mb-2">Secret Key</label>
              <input
                  type="password"
                  placeholder="Enter secret key"
                  className="w-full px-4 py-2 border rounded-lg"
                  value={selectedProcessor.secretKey || ""}
                  onChange={(e) => {
                    e.stopPropagation();
                    setSelectedProcessor({
                      ...selectedProcessor,
                      secretKey: e.target.value,
                    });
                  }}
                  required
              />
            </div>
            <div>
                <label className="block mb-2">Auth Key (Optional)</label>
              <input
                  type="password"
                  placeholder="Enter auth key"
                  className="w-full px-4 py-2 border rounded-lg"
                  value={selectedProcessor.authKey || ""}
                  onChange={(e) => {
                    e.stopPropagation();
                    setSelectedProcessor({
                      ...selectedProcessor,
                      authKey: e.target.value,
                    });
                  }}
              />
            </div>
              <div>
                <label className="block mb-2">Currency</label>
                <select
                  className="w-full px-4 py-2 border rounded-lg"
                  value={selectedProcessor.currency}
                  onChange={(e) => {
                    e.stopPropagation();
                    setSelectedProcessor({
                      ...selectedProcessor,
                      currency: e.target.value,
                    });
                  }}
                >
                  <option value="GBP">GBP</option>
                  <option value="USD">USD</option>
                  <option value="EUR">EUR</option>
                </select>
            </div>
              <button
                type="submit"
                className="w-full px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90"
              >
                Update Processor
              </button>
            </form>
          )}
        </div>
      </Modal>

      {/* Remove Modal */}
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
                onClick={handleRemoveProcessor}
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
