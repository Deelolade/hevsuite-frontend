"use client"

const ReportDetails = ({ setOpenDetails, setIsBanModalOpen, selectedReport }) => {
  if (!selectedReport) return null

  const handleBanUser = () => {
    setIsBanModalOpen(true)
    setOpenDetails(false)
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Report Details</h2>
        <button onClick={() => setOpenDetails(false)} className="text-gray-500 hover:text-gray-700">
          <x size={20} />
        </button>
      </div>

      <div className="space-y-4">
        <div>
          <h3 className="text-sm font-medium text-gray-500">Ask Title</h3>
          <p className="mt-1">{selectedReport.ask?.title || "N/A"}</p>
        </div>

        <div>
          <h3 className="text-sm font-medium text-gray-500">Report Type</h3>
          <p className="mt-1">{selectedReport.reason}</p>
        </div>

        <div>
          <h3 className="text-sm font-medium text-gray-500">Reported By</h3>
          <p className="mt-1">{`${selectedReport.reportedBy?.forename || ""} ${selectedReport.reportedBy?.surname || ""}`}</p>
        </div>

        <div>
          <h3 className="text-sm font-medium text-gray-500">Reported At</h3>
          <p className="mt-1">{new Date(selectedReport.reportedAt).toLocaleString()}</p>
        </div>

        {selectedReport.description && (
          <div>
            <h3 className="text-sm font-medium text-gray-500">Description</h3>
            <p className="mt-1">{selectedReport.description}</p>
          </div>
        )}
      </div>

      <div className="mt-6 flex justify-between">
        <button onClick={handleBanUser} className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700">
          Ban User
        </button>
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

export default ReportDetails
