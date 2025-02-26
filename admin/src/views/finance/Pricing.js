import React, { useState } from "react";
import Modal from "react-modal";

const Pricing = () => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedFeature, setSelectedFeature] = useState(null);

  const features = [
    { id: 1, name: "Membership Fee", price: "£120", isEnabled: true },
    { id: 2, name: "Non-Engagement Fee", price: "£50", isEnabled: false },
    { id: 3, name: "New Club Card Fee", price: "£50", isEnabled: false },
  ];

  const handleEdit = (feature) => {
    setSelectedFeature(feature);
    setIsEditModalOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg border">
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
            {features.map((feature) => (
              <tr key={feature.id} className="border-b last:border-0">
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
                      defaultChecked={feature.isEnabled}
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                  </label>
                </td>
              </tr>
            ))}
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
              <label className="block mb-2">Select Feature</label>
              <select className="w-full px-4 py-2 border rounded-lg text-gray-600">
                <option>Membership Fee</option>
                <option>Non-Engagement Fee</option>
                <option>New Club Card Fee</option>
              </select>
            </div>

            <div>
              <label className="block mb-2">Price</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2">
                  $
                </span>
                <input
                  type="text"
                  defaultValue={selectedFeature?.price?.replace("£", "")}
                  className="w-full pl-8 pr-4 py-2 border rounded-lg"
                />
              </div>
            </div>

            <div>
              <label className="flex items-center justify-between">
                <span>Enable / Disable Visibility</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    defaultChecked={selectedFeature?.isEnabled}
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
              <button className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90">
                Update
              </button>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Pricing;
