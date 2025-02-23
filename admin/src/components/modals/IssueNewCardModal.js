import React, { useState } from "react";
import { BiSearch } from "react-icons/bi";

const IssueNewCardModal = ({ onClose, onConfirm }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [reason, setReason] = useState("");
  const [selectedMembers, setSelectedMembers] = useState([]);

  const dummyMembers = [
    { id: 1, name: "Andrew Bojangles", avatar: "https://i.pravatar.cc/40?img=1" },
    { id: 2, name: "Andrew Bojangles", avatar: "https://i.pravatar.cc/40?img=2" },
    { id: 3, name: "Andrew Bojangles", avatar: "https://i.pravatar.cc/40?img=3" },
    { id: 4, name: "Andrew Bojangles", avatar: "https://i.pravatar.cc/40?img=4" },
    { id: 5, name: "Andrew Bojangles", avatar: "https://i.pravatar.cc/40?img=5" },
  ];

  const removeMember = (id) => {
    setSelectedMembers(selectedMembers.filter(member => member.id !== id));
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Issue New Card</h2>
        <button onClick={() => onClose(false)} className="text-gray-400">
          ✕
        </button>
      </div>

      <div className="space-y-6">
        <div className="relative">
          <BiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search Member"
            className="w-full pl-10 pr-4 py-2.5 border rounded-lg text-sm"
          />
        </div>

        {/* Selected Members */}
        <div className="flex flex-wrap gap-2">
          {dummyMembers.map((member) => (
            <div
              key={member.id}
              className="flex items-center gap-2 bg-gray-50 rounded-full pl-1 pr-2 py-1"
            >
              <img
                src={member.avatar}
                alt={member.name}
                className="w-6 h-6 rounded-full"
              />
              <span className="text-sm">{member.name}</span>
              <button
                onClick={() => removeMember(member.id)}
                className="text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            </div>
          ))}
        </div>

        <div>
          <label className="block text-sm mb-2">Reasons</label>
          <input
            type="text"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            placeholder="What the reason?"
            className="w-full px-3 py-2.5 border rounded-lg text-sm"
          />
        </div>

        <div>
          <label className="block text-sm mb-2">Card Type</label>
          <select className="w-full px-3 py-2.5 border rounded-lg text-sm">
            <option>VIP Member</option>
            <option>Regular Member</option>
          </select>
        </div>

        <div className="flex justify-end gap-3 pt-4">
          <button
            onClick={() => onClose(false)}
            className="px-6 py-2 border rounded-lg text-sm"
          >
            Cancel
          </button>
          <button
            onClick={() => onConfirm(reason)}
            className="px-6 py-2 bg-[#540A26] text-white rounded-lg text-sm"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default IssueNewCardModal;