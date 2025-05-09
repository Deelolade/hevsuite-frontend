"use client"

const AllAskDetails = ({ setOpenDetails, selectedAsk }) => {
  if (!selectedAsk) return null

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Ask Details</h2>
        <button onClick={() => setOpenDetails(false)} className="text-gray-500 hover:text-gray-700">
          <x size={20} />
        </button>
      </div>

      <div className="space-y-4">
        <div>
          <h3 className="text-sm font-medium text-gray-500">Title</h3>
          <p className="mt-1">{selectedAsk.title}</p>
        </div>

        <div>
          <h3 className="text-sm font-medium text-gray-500">Description</h3>
          <p className="mt-1">{selectedAsk.description}</p>
        </div>

        <div>
          <h3 className="text-sm font-medium text-gray-500">Status</h3>
          <p className="mt-1 capitalize">{selectedAsk.status}</p>
        </div>

        <div>
          <h3 className="text-sm font-medium text-gray-500">Created By</h3>
          <p className="mt-1">{`${selectedAsk.createdBy?.forename || ""} ${selectedAsk.createdBy?.surname || ""}`}</p>
        </div>

        {selectedAsk.claimedBy && (
          <div>
            <h3 className="text-sm font-medium text-gray-500">Claimed By</h3>
            <p className="mt-1">{`${selectedAsk.claimedBy?.forename || ""} ${selectedAsk.claimedBy?.surname || ""}`}</p>
          </div>
        )}

        <div>
          <h3 className="text-sm font-medium text-gray-500">Created At</h3>
          <p className="mt-1">{new Date(selectedAsk.createdAt).toLocaleString()}</p>
        </div>

        {selectedAsk.deadline && (
          <div>
            <h3 className="text-sm font-medium text-gray-500">Deadline</h3>
            <p className="mt-1">{new Date(selectedAsk.deadline).toLocaleString()}</p>
          </div>
        )}

        {selectedAsk.isUrgent && (
          <div className="mt-2">
            <span className="bg-red-100 text-red-800 text-xs font-medium px-2.5 py-0.5 rounded">Urgent</span>
          </div>
        )}
      </div>

      <div className="mt-6 flex justify-end">
        <button
          onClick={() => setOpenDetails(false)}
          className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300"
        >
          Close
        </button>
      </div>
    </div>
  )
}

export default AllAskDetails
