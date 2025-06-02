import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import { useDispatch, useSelector } from "react-redux";
import { getPricingFees, updatePricingFee, addPricingFee } from "../../store/finance/financeSlice";
import toast from "react-hot-toast";

const Pricing = () => {
  const dispatch = useDispatch();
  const { pricingFees, isLoading } = useSelector((state) => state.finance);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedFee, setSelectedFee] = useState(null);
  const [editForm, setEditForm] = useState({
    name: "",
    standardPrice: "",
    vipPrice: "",
    isEnabled: true,
  });

  useEffect(() => {
    dispatch(getPricingFees());
  }, [dispatch]);

  useEffect(() => {
    if (selectedFee) {
      setEditForm({
        name: selectedFee.name,
        standardPrice: selectedFee.standardPrice || 0,
        vipPrice: selectedFee.vipPrice || 0,
        isEnabled: selectedFee.isEnabled,
      });
    }
  }, [selectedFee]);

  const handleEdit = (fee) => {
    setSelectedFee(fee);
    setIsEditModalOpen(true);
  };

  const handleAdd = () => {
    setSelectedFee(null);
    setEditForm({
      name: "",
      standardPrice: "",
      vipPrice: "",
      isEnabled: true,
    });
    setIsEditModalOpen(true);
  };

  const handleUpdate = () => {
    if (!editForm.name || !editForm.standardPrice || !editForm.vipPrice) {
      toast.error("Please fill in all required fields");
      return;
    }

    const feeData = {
      name: editForm.name,
      standardPrice: Number(editForm.standardPrice),
      vipPrice: Number(editForm.vipPrice),
      isEnabled: editForm.isEnabled,
    };

    if (selectedFee) {
      dispatch(updatePricingFee({ id: selectedFee._id, feeData }))
        .unwrap()
        .then(() => {
          setIsEditModalOpen(false);
          setSelectedFee(null);
          toast.success("Pricing fee updated successfully");
        })
        .catch((error) => {
          toast.error(error || "Failed to update pricing fee");
        });
    } else {
      dispatch(addPricingFee(feeData))
        .unwrap()
        .then(() => {
          setIsEditModalOpen(false);
          toast.success("Pricing fee added successfully");
        })
        .catch((error) => {
          toast.error(error || "Failed to add pricing fee");
        });
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleToggleChange = (fee) => {
    const feeData = { ...fee, isEnabled: !fee.isEnabled };
    dispatch(updatePricingFee({ id: fee._id, feeData }))
      .unwrap()
      .then(() => {
        toast.success(`Fee ${fee.name} ${feeData.isEnabled ? 'enabled' : 'disabled'} successfully`);
      })
      .catch((error) => {
        toast.error(error || "Failed to update fee status");
      });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">Pricing Fees</h2>
        <button
          onClick={handleAdd}
          className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90"
        >
          Add New Fee
        </button>
      </div>

      <div className="bg-white rounded-lg border md:w-full w-[90vw] overflow-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="text-left py-4 px-6">Name</th>
              <th className="text-left py-4 px-6">Standard Price</th>
              <th className="text-left py-4 px-6">VIP Price</th>
              <th className="text-left py-4 px-6">Actions</th>
              <th className="text-left py-4 px-6">Apply Fee</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan="5" className="py-4 px-6 text-center">
                  Loading...
                </td>
              </tr>
            ) : pricingFees.length === 0 ? (
              <tr>
                <td colSpan="5" className="py-4 px-6 text-center">
                  No pricing fees found
                </td>
              </tr>
            ) : (
              pricingFees.map((fee) => (
                <tr key={fee._id} className="border-b last:border-0">
                  <td className="py-4 px-6">{fee.name}</td>
                  <td className="py-4 px-6">£{fee.standardPrice}</td>
                  <td className="py-4 px-6">
                    {fee.name === "Non Engagement Fee" ? (
                      `£${fee.vipPrice}`
                    ) : (
                      <button
                        onClick={() => handleEdit(fee)}
                        className="px-3 py-0.5 bg-primary text-white rounded-lg text-sm"
                      >
                        {/* Edit */}
                      </button>
                    )}
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEdit(fee)}
                        className="px-3 py-1 bg-primary text-white rounded-lg text-sm"
                      >
                        Edit
                      </button>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <label className="inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        value=""
                        className="sr-only peer"
                        checked={fee.isEnabled}
                        onChange={() => handleToggleChange(fee)}
                      />
                      <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary">
                      </div>
                    </label>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Edit/Add Modal */}
      <Modal
        isOpen={isEditModalOpen}
        onRequestClose={() => setIsEditModalOpen(false)}
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg w-[450px]"
        overlayClassName="fixed inset-0 bg-black/50"
      >
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl">
              {selectedFee ? "Edit Pricing Fee" : "Add New Pricing Fee"}
            </h2>
            <button
              onClick={() => setIsEditModalOpen(false)}
              className="text-gray-400 hover:text-gray-600"
            >
              ✕
            </button>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block mb-2">Name *</label>
              <input
                type="text"
                name="name"
                value={editForm.name}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-lg text-gray-600"
                placeholder="Fee name"
              />
            </div>

            <div>
              <label className="block mb-2">Standard Price (£) *</label>
              <input
                type="number"
                name="standardPrice"
                value={editForm.standardPrice}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-lg"
                placeholder="Enter standard price"
                min="0"
                step="0.01"
              />
            </div>

            {editForm.name === "Non Engagement Fee" && (
              <div>
                <label className="block mb-2">VIP Price (£) *</label>
                <input
                  type="number"
                  name="vipPrice"
                  value={editForm.vipPrice}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded-lg"
                  placeholder="Enter VIP price"
                  min="0"
                  step="0.01"
                />
              </div>
            )}

            <div className="flex items-center justify-between">
              <label className="block">Enable / Disable Visibility</label>
              <label className="inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  value=""
                  className="sr-only peer"
                  checked={editForm.isEnabled}
                  onChange={(e) => setEditForm(prev => ({ ...prev, isEnabled: e.target.checked }))}
                />
                <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary">

                </div>
              </label>
            </div>

            <div className="flex justify-end gap-3 pt-4">
              <button
                onClick={() => setIsEditModalOpen(false)}
                className="px-6 py-2 border rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdate}
                className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90"
                disabled={isLoading}
              >
                {isLoading ? "Saving..." : selectedFee ? "Update" : "Add"}
              </button>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Pricing;
