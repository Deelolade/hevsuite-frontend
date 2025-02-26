import React from "react";
import InviteUsers from "../../components/modals/users/InviteUsers";

const AddEvent = () => {
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);
  const [inviteEmail, setInviteEmail] = useState("");
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4 font-secondary">Add Event</h2>
      <button
        onClick={() => Navigate("/events")}
        className="text-gray-400 hover:text-gray-600 absolute top-4 right-4"
      >
        ✕
      </button>

      {/* Event Name */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 font-montserrat">
          Event Name
        </label>
        <input
          type="text"
          className="mt-1 p-2 border rounded-md font-montserrat w-full"
          placeholder="Enter event name"
        />
      </div>

      {/* Location and Time */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium font-montserrat text-gray-700">
            Location
          </label>
          <input
            type="text"
            className="mt-1 p-2 border rounded-md font-montserrat w-full"
            placeholder="Enter location"
          />
        </div>
        <div>
          <label className="block text-sm font-medium font-montserrat text-gray-700">
            Time
          </label>
          <input
            type="time"
            className="mt-1 p-2 border rounded-md font-montserrat w-full"
            placeholder="Enter time"
          />
        </div>
      </div>

      {/* Event Description */}
      <div className="mb-4">
        <label className="block text-sm font-medium font-montserrat text-gray-700">
          Event Description
        </label>
        <textarea
          className="mt-1 p-2 border rounded-md font-montserrat w-full"
          rows="4"
          placeholder="Enter event description"
        ></textarea>
      </div>

      {/* Audience Type and Price */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-sm font-montserrat font-medium text-gray-700">
            Audience Type
          </label>
          <select className="mt-1 p-2 border font-montserrat rounded-md w-full">
            <option value="">Select audience type</option>
            <option value="public">Public</option>
            <option value="private">Private</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-montserrat font-medium text-gray-700">
            Price
          </label>
          <input
            type="number"
            className="mt-1 p-2 border rounded-md w-full"
            placeholder="Enter price"
          />
        </div>
      </div>

      {/* No of Tickets */}
      <div className="mb-4">
        <label className="block text-sm font-montserrat font-medium text-gray-700">
          No of Tickets
        </label>
        <input
          type="number"
          className="mt-1 p-2 border font-montserrat rounded-md w-full"
          placeholder="Enter number of tickets"
        />
      </div>

      {/* Attending members */}
      <div className="mb-4">
        <label className="block text-sm font-montserrat font-medium text-gray-700">
          Attending members
        </label>
        <button
          className="mt-2 px-4 py-2 font-secondary bg-blue-500 text-white rounded"
          onClick={() => setIsInviteModalOpen(true)}
        >
          Invite Users
        </button>
      </div>

      {/* Event Image */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          Event Image
        </label>
        <button className="mt-2 px-4 py-2 bg-gray-200 text-gray-700 rounded">
          +
        </button>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-end">
        <button
          onClick={() => Navigate("/events")}
          className="mr-2 px-6 py-2 border rounded-lg"
        >
          Cancel
        </button>
        <button className="px-6 py-2 bg-green-500 text-white rounded">
          Create Event
        </button>
      </div>
      <Modal
        isOpen={isAddEventOpen}
        onRequestClose={() => setIsAddEventOpen(false)}
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg w-[600px] max-h-[80vh] overflow-y-auto" // Add max-height and overflow-y-auto
        overlayClassName="fixed inset-0 bg-black/50"
      >
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-4">Add Event</h2>
          <button
            onClick={() => setIsAddEventOpen(false)}
            className="text-gray-400 hover:text-gray-600 absolute top-4 right-4"
          >
            ✕
          </button>

          {/* Event Name */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Event Name
            </label>
            <input
              type="text"
              className="mt-1 p-2 border rounded-md w-full"
              placeholder="Enter event name"
            />
          </div>

          {/* Location and Time */}
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Location
              </label>
              <input
                type="text"
                className="mt-1 p-2 border rounded-md w-full"
                placeholder="Enter location"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Time
              </label>
              <input
                type="time"
                className="mt-1 p-2 border rounded-md w-full"
                placeholder="Enter time"
              />
            </div>
          </div>

          {/* Event Description */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Event Description
            </label>
            <textarea
              className="mt-1 p-2 border rounded-md w-full"
              rows="4"
              placeholder="Enter event description"
            ></textarea>
          </div>

          {/* Audience Type and Price */}
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Audience Type
              </label>
              <select className="mt-1 p-2 border rounded-md w-full">
                <option value="">Select audience type</option>
                <option value="public">Public</option>
                <option value="private">Private</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Price
              </label>
              <input
                type="number"
                className="mt-1 p-2 border rounded-md w-full"
                placeholder="Enter price"
              />
            </div>
          </div>

          {/* No of Tickets */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              No of Tickets
            </label>
            <input
              type="number"
              className="mt-1 p-2 border rounded-md w-full"
              placeholder="Enter number of tickets"
            />
          </div>

          {/* Attending members */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Attending members
            </label>
            <button className="mt-2 px-4 py-2 bg-blue-500 text-white rounded">
              Invite Users
            </button>
          </div>

          {/* Event Image */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Event Image
            </label>
            <button className="mt-2 px-4 py-2 bg-gray-200 text-gray-700 rounded">
              +
            </button>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end">
            <button
              onClick={() => setIsAddEventOpen(false)}
              className="mr-2 px-6 py-2 border rounded-lg"
            >
              Cancel
            </button>
            <button className="px-6 py-2 bg-green-500 text-white rounded">
              Create Event
            </button>
          </div>
        </div>
      </Modal>

      <Modal
        isOpen={isInviteModalOpen}
        onRequestClose={() => setIsInviteModalOpen(false)}
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-xl shadow-lg w-[500px]"
        overlayClassName="fixed inset-0 bg-black/50"
        contentLabel="Invite New Users"
      >
        <InviteUsers
          setIsInviteModalOpen={setIsInviteModalOpen}
          setInviteEmail={setInviteEmail}
          inviteEmail={inviteEmail}
        />
      </Modal>
    </div>
  );
};

export default AddEvent;
