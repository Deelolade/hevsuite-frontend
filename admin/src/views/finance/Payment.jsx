"use client"

import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { BsGear } from "react-icons/bs"
import Modal from "react-modal"
import toast from "react-hot-toast"
import {
  getProcessors,
  updateProcessor,
  addProcessor,
  removeProcessor,
  reset,
  reorderProcessors,
} from "../../store/payment/paymentSlice"

// Set app element for Modal accessibility
Modal.setAppElement("#root")

const Payment = () => {
  const dispatch = useDispatch()
  const { processors, isLoading, isError, isSuccess, message } = useSelector((state) => state.payment)

  // Local state for UI
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [selectedProcessor, setSelectedProcessor] = useState(null)
  const [openOptionsId, setOpenOptionsId] = useState(null)
  const [isRemoveModalOpen, setIsRemoveModalOpen] = useState(false)
  const [logoFile, setLogoFile] = useState(null)
  const [logoPreview, setLogoPreview] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage] = useState(10)

  // Form state for adding new processor
  const [newProcessor, setNewProcessor] = useState({
    provider: "",
    apiKey: "",
    secretKey: "",
    authKey: "",
    allowedMembers: "All Members",
  })

  // Form state for editing processor
  const [editedProcessor, setEditedProcessor] = useState({
    provider: "",
    enabled: true,
    apiKey: "",
    secretKey: "",
    authKey: "",
    currency: "USD",
    allowedMembers: "All Members",
  })

  // Drag and drop state
  const [dragging, setDragging] = useState(null)
  const [dragOver, setDragOver] = useState(null)

  // Fetch processors on component mount
  useEffect(() => {
    dispatch(getProcessors())

    // Cleanup on unmount
    return () => {
      dispatch(reset())
    }
  }, [dispatch])

  // Reset success/error states after operations
  useEffect(() => {
    if (isSuccess || isError) {
      const timer = setTimeout(() => {
        dispatch(reset())
      }, 3000)
      return () => clearTimeout(timer)
    }
  }, [isSuccess, isError, dispatch])

  // Update editedProcessor when selectedProcessor changes
  useEffect(() => {
    if (selectedProcessor) {
      setEditedProcessor({
        provider: selectedProcessor.provider || "",
        enabled: selectedProcessor.enabled !== undefined ? selectedProcessor.enabled : true,
        apiKey: selectedProcessor.apiKey || "",
        secretKey: selectedProcessor.secretKey || "",
        authKey: selectedProcessor.authKey || "",
        currency: selectedProcessor.currency || "USD",
        allowedMembers: selectedProcessor.allowedMembers || "All Members",
      })
      setLogoPreview(selectedProcessor.logo || null)
    }
  }, [selectedProcessor])

  // Reset form when modal closes
  useEffect(() => {
    if (!isAddModalOpen) {
      setNewProcessor({
        provider: "",
        apiKey: "",
        secretKey: "",
        authKey: "",
        allowedMembers: "All Members",
      })
      setLogoFile(null)
      setLogoPreview(null)
    }
  }, [isAddModalOpen])

  // Handle drag start
  const handleDragStart = (event, index) => {
    setDragging(index)
  }

  // Handle drag over
  const handleDragOver = (event, index) => {
    event.preventDefault()
    setDragOver(index)
  }

  // Handle drag end
  const handleDragEnd = () => {
    if (dragging !== null && dragOver !== null && dragging !== dragOver) {
      const reorderedProcessors = [...processors];
      const [movedProcessor] = reorderedProcessors.splice(dragging, 1);
      reorderedProcessors.splice(dragOver, 0, movedProcessor);

      const updatedProcessors = reorderedProcessors.map((processor, index) => ({
        ...processor,
        order: index,
      }));

      dispatch(reorderProcessors(updatedProcessors)).then((result) => {
        if (result.meta.requestStatus === "fulfilled") {
          toast.success("Payment processors reordered successfully!");
        } else if (result.meta.requestStatus === "rejected") {
          toast.error(result.payload?.message || "Failed to reorder payment processors");
        }
      });
    }
    setDragging(null);
    setDragOver(null);
  };

  // Handle settings click
  const handleSettingsClick = (processor) => {
    setSelectedProcessor(processor)
    setIsEditModalOpen(true)
    setOpenOptionsId(null)
  }

  // Handle logo file selection
  const handleLogoSelect = (e) => {
    const file = e.target.files[0]
    if (file) {
      setLogoFile(file)
      const imageUrl = URL.createObjectURL(file)
      setLogoPreview(imageUrl)
    }
  }

  // Handle remove processor
  const handleRemove = (processor) => {
    setSelectedProcessor(processor)
    setIsRemoveModalOpen(true)
    setOpenOptionsId(null)
  }

  // Handle toggle processor enabled status
  const handleToggleEnabled = (processor) => {
    const updatedProcessor = {
      ...processor,
      enabled: !processor.enabled,
      provider: processor.provider
    };
    dispatch(updateProcessor(updatedProcessor)).then((result) => {
      if (result.meta.requestStatus === "fulfilled") {
        toast.success(`Payment processor ${processor.enabled ? 'disabled' : 'enabled'} successfully!`);
      } else if (result.meta.requestStatus === "rejected") {
        toast.error(result.payload?.message || "Failed to update payment processor status");
      }
    });
  };

  // Handle move processor up
  const handleMoveUp = (index) => {
    if (index > 0) {
      const reorderedProcessors = [...processors];
      const temp = reorderedProcessors[index];
      reorderedProcessors[index] = reorderedProcessors[index - 1];
      reorderedProcessors[index - 1] = temp;

      const updatedProcessors = reorderedProcessors.map((processor, idx) => ({
        ...processor,
        order: idx,
        provider: processor.provider // Ensure provider is included
      }));

      dispatch(reorderProcessors(updatedProcessors));
    }
  };

  // Handle move processor down
  const handleMoveDown = (index) => {
    if (index < processors.length - 1) {
      const reorderedProcessors = [...processors]
      const temp = reorderedProcessors[index]
      reorderedProcessors[index] = reorderedProcessors[index + 1]
      reorderedProcessors[index + 1] = temp

      // Update the order property for each processor
      const updatedProcessors = reorderedProcessors.map((processor, idx) => ({
        ...processor,
        order: idx,
      }))

      dispatch(reorderProcessors(updatedProcessors))
    }
  }

  // Handle add processor form input change
  const handleAddInputChange = (e) => {
    const { name, value } = e.target
    setNewProcessor({
      ...newProcessor,
      [name]: value,
    })
  }

  // Handle edit processor form input change
  const handleEditInputChange = (e) => {
    const { name, value } = e.target
    setEditedProcessor({
      ...editedProcessor,
      [name]: name === "enabled" ? value === "true" : value,
    })
  }

  // Handle add processor submit
  const handleAddProcessor = () => {
    const formData = new FormData()

    // Append all processor data
    Object.keys(newProcessor).forEach((key) => {
      formData.append(key, newProcessor[key])
    })

    // Ensure allowedMembers is explicitly set
    formData.set('allowedMembers', newProcessor.allowedMembers)

    // Append logo file if exists
    if (logoFile) {
      formData.append("logo", logoFile)
    }

    dispatch(addProcessor(formData)).then((result) => {
      if (result.meta.requestStatus === "fulfilled") {
        setIsAddModalOpen(false)
        toast.success("Payment processor added successfully!")
      } else if (result.meta.requestStatus === "rejected") {
        toast.error(result.payload?.message || "Failed to add payment processor")
      }
    })
  }

  // Handle update processor submit
  const handleUpdateProcessor = () => {
    const formData = new FormData();
    formData.append('provider', selectedProcessor.provider);

    Object.keys(editedProcessor).forEach((key) => {
      if (key !== 'provider') {
        formData.append(key, editedProcessor[key]);
      }
    });

    if (logoFile) {
      formData.append("logo", logoFile);
    }

    dispatch(updateProcessor(formData)).then((result) => {
      if (result.meta.requestStatus === "fulfilled") {
        setLogoFile(null);
        setIsEditModalOpen(false);
        toast.success("Payment processor updated successfully!");
      } else if (result.meta.requestStatus === "rejected") {
        toast.error(result.payload?.message || "Failed to update payment processor");
      }
    });
  };

  // Handle remove processor submit
  const handleRemoveProcessor = () => {
    if (selectedProcessor) {
      dispatch(removeProcessor(selectedProcessor.provider)).then((result) => {
        if (result.meta.requestStatus === "fulfilled") {
          setIsRemoveModalOpen(false)
          dispatch(getProcessors())
          toast.success("Payment processor removed successfully!");
        } else if (result.meta.requestStatus === "rejected") {
          toast.error(result.payload?.message || "Failed to remove payment processor");
        }
      })
    }
  }

  // Calculate pagination
  const indexOfLastProcessor = currentPage * itemsPerPage
  const indexOfFirstProcessor = indexOfLastProcessor - itemsPerPage
  const currentProcessors = processors.slice(indexOfFirstProcessor, indexOfLastProcessor)
  const totalPages = Math.ceil(processors.length / itemsPerPage)

  // Handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber)
  }

  // Currency options
  const currencies = ["USD", "EUR", "GBP", "JPY", "CAD", "AUD"]

  return (
    <div className="p-6">
      {/* Toast Container */}
      <div className="fixed top-4 right-4 z-50">
        <div className="toast-container"></div>
      </div>

      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-medium">Payment Processors</h2>
        <button
          className="px-6 py-2 bg-primary text-white rounded-lg flex items-center gap-2 hover:bg-primary/90 transition-colors"
          onClick={() => setIsAddModalOpen(true)}
        >
          + Add New
        </button>
      </div>

      {/* Success Message */}
      {/* {isSuccess && (
        <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg mb-6">
          <p>Operation completed successfully!</p>
        </div>
      )} */}

      {/* Error Message */}
      {isError && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
          <p>Error: {message}</p>
        </div>
      )}

      {/* Loading State */}
      {isLoading && (
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      )}

      {/* Processors List */}
      {!isLoading && (
        <div className="space-y-4 mb-6">
          {processors && processors.length > 0 ? (
            currentProcessors.map((processor, index) => (
              <div
                key={processor.provider}
                draggable={true}
                onDragStart={(e) => handleDragStart(e, index)}
                onDragOver={(e) => handleDragOver(e, index)}
                onDragEnd={handleDragEnd}
                className={`flex items-center justify-between p-4 bg-white rounded-lg border ${dragOver === index ? "border-primary border-2" : ""
                  }`}
              >
                <div className="flex items-center gap-8">
                  <span className="text-gray-500">{indexOfFirstProcessor + index + 1}</span>
                  <img
                    src={processor.logo || "/placeholder.svg?height=64&width=128"}
                    alt={processor.provider}
                    className="h-16 w-32 object-contain"
                  />
                  <span className="font-medium capitalize">{processor.provider}</span>
                </div>
                <div className="flex items-center gap-6">
                  <div className="flex gap-2">
                    <button
                      className="p-2 hover:bg-gray-100 rounded text-[32px]"
                      onClick={() => handleMoveUp(index)}
                      disabled={index === 0}
                    >
                      ↑
                    </button>
                    <button
                      className="p-2 hover:bg-gray-100 rounded text-[32px]"
                      onClick={() => handleMoveDown(index)}
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
                    onChange={() => handleToggleEnabled(processor)}
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                </label>
                <div className="relative">
                  <button
                    className="text-gray-400 hover:text-gray-600"
                    onClick={() => setOpenOptionsId(openOptionsId === processor.provider ? null : processor.provider)}
                  >
                    <BsGear size={20} />
                  </button>
                  {openOptionsId === processor.provider && (
                    <div className="absolute right-0 mt-2 w-32 bg-white rounded-lg shadow-lg border py-1 z-10">
                      <button
                        className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50"
                        onClick={() => handleSettingsClick(processor)}
                      >
                        Edit
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
            ))
          ) : (
            <div className="text-center py-12 bg-gray-50 rounded-lg">
              <p className="text-gray-500">No payment processors found. Add your first processor!</p>
            </div>
          )}
        </div>
      )}

      {/* Pagination */}
      {!isLoading && processors && processors.length > itemsPerPage && (
        <div className="flex justify-end gap-4 items-center">
          <button
            className={`px-4 py-2 ${currentPage === 1 ? "text-gray-300 cursor-not-allowed" : "text-gray-500 hover:bg-gray-50"} rounded-lg`}
            onClick={() => currentPage > 1 && handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <span
              key={page}
              className={`w-10 h-10 flex items-center justify-center rounded-lg cursor-pointer ${currentPage === page ? "bg-primary text-white" : "bg-gray-100 hover:bg-gray-200"
                }`}
              onClick={() => handlePageChange(page)}
            >
              {page}
            </span>
          ))}

          <button
            className={`px-4 py-2 ${currentPage === totalPages ? "text-gray-300 cursor-not-allowed" : "text-gray-500 hover:bg-gray-50"} rounded-lg`}
            onClick={() => currentPage < totalPages && handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      )}

      {/* Add Processor Modal */}
      <Modal
        isOpen={isAddModalOpen}
        onRequestClose={() => setIsAddModalOpen(false)}
        className="absolute h-[95vh] overflow-auto top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg md:w-[500px] w-[90vw]"
        overlayClassName="fixed inset-0 bg-black/50 z-50"
      >
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl">Add New Payment Processor</h2>
            <button onClick={() => setIsAddModalOpen(false)} className="text-gray-400 hover:text-gray-600">
              ✕
            </button>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block mb-2">Payment Processor Name</label>
              <input
                type="text"
                name="provider"
                placeholder="e.g., stripe, paypal"
                className="w-full px-4 py-2 border rounded-lg"
                value={newProcessor.provider}
                onChange={handleAddInputChange}
              />
              <p className="text-xs text-gray-500 mt-1">Use lowercase letters without spaces (e.g., stripe, paypal)</p>
            </div>

            <div>
              <label className="block mb-2">Allowed Members</label>
              <select
                className="w-full px-4 py-2 border rounded-lg"
                name="allowedMembers"
                value={newProcessor.allowedMembers}
                onChange={handleAddInputChange}
              >
                <option value="All Members">All Members</option>
                <option value="Standard Members">Standard Members</option>
                <option value="Vip Members">Vip Members</option>
              </select>
            </div>

            <div>
              <label className="block mb-2">API Key</label>
              <input
                type="text"
                name="apiKey"
                placeholder="Enter API key"
                className="w-full px-4 py-2 border rounded-lg font-mono text-sm"
                value={newProcessor.apiKey}
                onChange={handleAddInputChange}
              />
            </div>

            <div>
              <label className="block mb-2">Secret Key</label>
              <input
                type="password"
                name="secretKey"
                placeholder="Enter secret key"
                className="w-full px-4 py-2 border rounded-lg font-mono text-sm"
                value={newProcessor.secretKey}
                onChange={handleAddInputChange}
              />
            </div>

            <div>
              <label className="block mb-2">Auth Key (Optional)</label>
              <input
                type="text"
                name="authKey"
                placeholder="Enter auth key if required"
                className="w-full px-4 py-2 border rounded-lg font-mono text-sm"
                value={newProcessor.authKey}
                onChange={handleAddInputChange}
              />
            </div>

            <div className="relative">
              {logoPreview && (
                <div className="mb-4 flex justify-center">
                  <img
                    src={logoPreview || "/placeholder.svg"}
                    alt="Processor Logo Preview"
                    className="h-20 object-contain"
                  />
                </div>
              )}
              <input type="file" id="processorLogo" accept="image/*" className="hidden" onChange={handleLogoSelect} />
              <label
                htmlFor="processorLogo"
                className="w-full p-4 bg-gray-50 rounded-lg border border-dashed border-gray-300 text-center cursor-pointer block hover:bg-gray-100"
              >
                <span className="text-primary">Click to add logo image</span>
              </label>
              <p className="text-xs text-gray-500 mt-1">
                Recommended size: 128x64px, PNG or SVG with transparent background
              </p>
            </div>

            <div className="flex justify-end gap-3 pt-4">
              <button onClick={() => setIsAddModalOpen(false)} className="px-6 py-2 border rounded-lg hover:bg-gray-50">
                Cancel
              </button>
              <button
                className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90"
                onClick={handleAddProcessor}
                disabled={isLoading || !newProcessor.provider || !newProcessor.apiKey || !newProcessor.secretKey}
              >
                {isLoading ? "Adding..." : "Add Processor"}
              </button>
            </div>
          </div>
        </div>
      </Modal>

      {/* Edit Processor Modal */}
      <Modal
        isOpen={isEditModalOpen}
        onRequestClose={() => setIsEditModalOpen(false)}
        className="absolute h-[95vh] overflow-auto top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg md:w-[500px] w-[90vw]"
        overlayClassName="fixed inset-0 bg-black/50 z-50"
      >
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl">Edit Payment Processor</h2>
            <button onClick={() => setIsEditModalOpen(false)} className="text-gray-400 hover:text-gray-600">
              ✕
            </button>
          </div>

          {selectedProcessor && (
            <div className="space-y-4">
              <div>
                <label className="block mb-2">Payment Processor Name</label>
                <input
                  type="text"
                  name="provider"
                  value={editedProcessor.provider}
                  className="w-full px-4 py-2 border rounded-lg bg-gray-100"
                  disabled
                />
                <p className="text-xs text-gray-500 mt-1">Provider name cannot be changed</p>
              </div>

              <div>
                <label className="block mb-2">Allowed Members</label>
                <select
                  className="w-full px-4 py-2 border rounded-lg"
                  name="allowedMembers"
                  value={editedProcessor.allowedMembers}
                  onChange={handleEditInputChange}
                >
                  <option value="All Members">All Members</option>
                  <option value="Standard Members">Standard Members</option>
                  <option value="Vip Members">Vip Members</option>
                </select>
              </div>

              <div>
                <label className="block mb-2">API Key</label>
                <input
                  type="text"
                  name="apiKey"
                  value={editedProcessor.apiKey}
                  className="w-full px-4 py-2 border rounded-lg font-mono text-sm"
                  onChange={handleEditInputChange}
                />
              </div>

              <div>
                <label className="block mb-2">Secret Key</label>
                <input
                  type="password"
                  name="secretKey"
                  value={editedProcessor.secretKey}
                  className="w-full px-4 py-2 border rounded-lg font-mono text-sm"
                  onChange={handleEditInputChange}
                  placeholder="••••••••••••••••••••••••••"
                />
                <p className="text-xs text-gray-500 mt-1">Leave blank to keep the current secret key</p>
              </div>

              <div>
                <label className="block mb-2">Auth Key (Optional)</label>
                <input
                  type="text"
                  name="authKey"
                  value={editedProcessor.authKey}
                  className="w-full px-4 py-2 border rounded-lg font-mono text-sm"
                  onChange={handleEditInputChange}
                />
              </div>

              <div className="relative">
                {logoPreview && (
                  <div className="mb-4 flex justify-center">
                    <img src={logoPreview || "/placeholder.svg"} alt="Processor Logo" className="h-20 object-contain" />
                  </div>
                )}
                <input
                  type="file"
                  id="editProcessorLogo"
                  accept="image/*"
                  className="hidden"
                  onChange={handleLogoSelect}
                />
                <label
                  htmlFor="editProcessorLogo"
                  className="w-full mt-2 p-4 bg-gray-50 rounded-lg border border-dashed border-gray-300 text-center text-primary cursor-pointer block hover:bg-gray-100"
                >
                  Click to change logo
                </label>
                <p className="text-xs text-gray-500 mt-1">
                  Recommended size: 128x64px, PNG or SVG with transparent background
                </p>
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <button
                  onClick={() => setIsEditModalOpen(false)}
                  className="px-6 py-2 border rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90"
                  onClick={handleUpdateProcessor}
                  disabled={isLoading || !editedProcessor.apiKey}
                >
                  {isLoading ? "Updating..." : "Update"}
                </button>
              </div>
            </div>
          )}
        </div>
      </Modal>

      {/* Remove Confirmation Modal */}
      <Modal
        isOpen={isRemoveModalOpen}
        onRequestClose={() => setIsRemoveModalOpen(false)}
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg w-[400px]"
        overlayClassName="fixed inset-0 bg-black/50 z-50"
      >
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <span className="text-red-500">⚠</span>
              Remove Payment Processor
            </h2>
            <button onClick={() => setIsRemoveModalOpen(false)} className="text-gray-400 hover:text-gray-600">
              ✕
            </button>
          </div>
          <div className="space-y-6">
            <p className="text-gray-600">
              Are you sure you want to remove{" "}
              <span className="font-semibold capitalize">{selectedProcessor?.provider}</span>? This action cannot be
              undone.
            </p>
            <div className="flex justify-end gap-3">
              <button onClick={() => setIsRemoveModalOpen(false)} className="px-6 py-2 border rounded-lg text-sm">
                Cancel
              </button>
              <button
                onClick={handleRemoveProcessor}
                className="px-6 py-2 bg-primary text-white rounded-lg text-sm"
                disabled={isLoading}
              >
                {isLoading ? "Removing..." : "Remove"}
              </button>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  )
}

export default Payment
