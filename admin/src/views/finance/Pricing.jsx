import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import { useDispatch, useSelector } from "react-redux";
import { getPricingFees, updatePricingFee } from "../../store/finance/financeSlice";
import toast from "react-hot-toast";

const Pricing = () => {
  const dispatch = useDispatch();
  const { pricingFees, isLoading } = useSelector((state) => state.finance);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedFeature, setSelectedFeature] = useState(null);
  const [editForm, setEditForm] = useState({
    name: "",
    price: "",
    isEnabled: false,
  });

  useEffect(() => {
    dispatch(getPricingFees());
  }, [dispatch]);

  useEffect(() => {
    if (selectedFeature) {
      setEditForm({
        name: selectedFeature.name,
        price: selectedFeature.price || 0,
        isEnabled: selectedFeature.isEnabled,
      });
    }
  }, [selectedFeature]);

  const handleEdit = (feature) => {
    setSelectedFeature(feature);
    setIsEditModalOpen(true);
  };

  const handleUpdate = () => {
    if (!selectedFeature) return;

    const updatedFeature = {
      id: selectedFeature._id,
      name: editForm.name,
      price: Number(editForm.price),
      isEnabled: editForm.isEnabled,
    };

    dispatch(updatePricingFee(updatedFeature))
      .unwrap()
      .then(() => {
        // toast.success("Pricing fee updated successfully");
        setIsEditModalOpen(false);
        setSelectedFeature(null);
        setEditForm({ name: "", price: "", isEnabled: false });
        dispatch(getPricingFees());
      })
      .catch((error) => {
        toast.error(error || "Failed to update pricing fee");
      });
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setEditForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg border md:w-full w-[90vw] overflow-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="text-left py-4 px-6">Feature name</th>
              <th className="text-left py-4 px-6">Price</th>
              <th className="text-left py-4 px-6">Action</th>
              <th className="text-left py-4 px-6">Apply Fee</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan="4" className="py-4 px-6 text-center">
                  Loading...
                </td>
              </tr>
            ) : pricingFees.length === 0 ? (
              <tr>
                <td colSpan="4" className="py-4 px-6 text-center">
                  No pricing features found
                </td>
              </tr>
            ) : (
              pricingFees.map((feature) => (
                <tr key={feature._id} className="border-b last:border-0">
                  <td className="py-4 px-6">{feature.name}</td>
                  <td className="py-4 px-6">{feature.price}</td>
                  <td className="py-4 px-6">
                    <button
                      onClick={() => handleEdit(feature)}
                      className="px-4 py-1 bg-primary text-white rounded-lg text-sm"
                    >
                      Edit
                    </button>
                  </td>
                  <td className="py-4 px-6">
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        className="sr-only peer"
                        checked={feature.isEnabled}
                        readOnly
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                    </label>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Edit Modal */}
      <Modal
        isOpen={isEditModalOpen}
        onRequestClose={() => setIsEditModalOpen(false)}
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg w-[450px]"
        overlayClassName="fixed inset-0 bg-black/50"
      >
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl">Edit Pricing Fee</h2>
            <button
              onClick={() => setIsEditModalOpen(false)}
              className="text-gray-400 hover:text-gray-600"
            >
              ✕
            </button>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block mb-2">Feature Name</label>
              <input
                type="text"
                name="name"
                value={editForm.name}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-lg text-gray-600"
                placeholder="Feature name"
              />
            </div>

            <div>
              <label className="block mb-2">Price</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2">
                  £
                </span>
                <input
                  type="number"
                  name="price"
                  value={editForm.price}
                  onChange={handleInputChange}
                  className="w-full pl-8 pr-4 py-2 border rounded-lg"
                  placeholder="Enter price"
                />
              </div>
            </div>

            <div>
              <label className="flex items-center justify-between">
                <span>Enable/Disable Visibility</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    name="isEnabled"
                    checked={editForm.isEnabled}
                    onChange={handleInputChange}
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                </label>
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
                {isLoading ? "Updating..." : "Update"}
              </button>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Pricing;
