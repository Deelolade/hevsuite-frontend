import React, { useState, useEffect } from "react";
import { BiChevronDown } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { fetchTransactions, updateStatus } from "../../store/transactions/transactionSlice"
import avatar from "../../assets/user.avif";

const History = () => {
  const dispatch = useDispatch();
  const {
    transactions = [],
    currentPage,
    totalPages,
    totalItems,
    loading,
    error,
  } = useSelector((state) => state.transactions);

  const [selectedRows, setSelectedRows] = useState([]);
  const [localCurrentPage, setLocalCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [expandedRows, setExpandedRows] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  useEffect(() => {
    dispatch(fetchTransactions({ 
      page: localCurrentPage, 
      limit: rowsPerPage,
      search: searchQuery,
      filter: statusFilter
    }));
  }, [dispatch, localCurrentPage, rowsPerPage, searchQuery, statusFilter]);

  const toggleRow = (id) => {
    setExpandedRows((prev) =>
      prev.includes(id) ? prev.filter((rowId) => rowId !== id) : [...prev, id]
    );
  };

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedRows(transactions.map((t) => t._id));
    } else {
      setSelectedRows([]);
    }
  };

  const handleSelectRow = (id) => {
    setSelectedRows((prev) =>
      prev.includes(id) ? prev.filter((rowId) => rowId !== id) : [...prev, id]
    );
  };

  const handleStatusUpdate = (transactionId, status) => {
    dispatch(updateStatus({ transactionId, status }));
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setLocalCurrentPage(newPage);
    }
  };

  if (loading && !transactions.length) {
    return <div className="text-center py-8">Loading transactions...</div>;
  }

  if (error) {
    return <div className="text-center py-8 text-red-500">Error: {error}</div>;
  }

  return (
    <div className="space-y-6">
      {/* Search and Filter Controls */}
      <div className="flex flex-col md:flex-row justify-between gap-4">
        <div className="flex-1">
          <input
            type="text"
            placeholder="Search transactions..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="border rounded-lg px-4 py-2 w-full"
          />
        </div>
        <div className="flex gap-4">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="border rounded-lg px-4 py-2"
          >
            <option value="">All Statuses</option>
            <option value="pending">Pending</option>
            <option value="succeeded">Completed</option>
            <option value="failed">Failed</option>
            <option value="refunded">Refunded</option>
          </select>
          <button className="px-4 py-2 bg-primary text-white rounded-lg">
            + Export {selectedRows.length}
          </button>
        </div>
      </div>

      {/* Transactions Table */}
      <div className="md:w-full w-[90vw] overflow-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b text-gray-600">
              <th className="py-4 px-4 text-left">
                <input
                  type="checkbox"
                  onChange={handleSelectAll}
                  checked={selectedRows.length === transactions.length && transactions.length > 0}
                  className="rounded border-gray-300"
                />
              </th>
              <th className="py-4 text-left">User</th>
              <th className="py-4 text-left">Payment Type</th>
              <th className="py-4 text-left">Amount Paid</th>
              <th className="py-4 text-left">Transaction Date</th>
              <th className="py-4 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction) => (
              <React.Fragment key={transaction._id}>
                <tr className="border-b">
                  <td className="py-4 px-4">
                    <input
                      type="checkbox"
                      checked={selectedRows.includes(transaction._id)}
                      onChange={() => handleSelectRow(transaction._id)}
                      className="rounded border-gray-300"
                    />
                  </td>
                  <td className="py-4 flex items-center gap-3">
                    <img
                      src={transaction.user?.profilePhoto || avatar}
                      alt={transaction.user?.forename || 'User'}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <span>{transaction.user?.forename} {transaction.user?.surname}</span>
                  </td>
                  <td className="py-4 capitalize">{transaction.paymentType}</td>
                  <td className="py-4">
                    {transaction.currency} {transaction.amount?.toFixed(2)}
                  </td>
                  <td className="py-4">
                    {new Date(transaction.createdAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
                  </td>
                  <td className="py-4">
                    <button
                      className="p-2 hover:bg-gray-100 rounded-lg"
                      onClick={() => toggleRow(transaction._id)}
                    >
                      <BiChevronDown
                        size={20}
                        className={`transform transition-transform ${
                          expandedRows.includes(transaction._id) ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                  </td>
                </tr>
                {expandedRows.includes(transaction._id) && (
                  <tr className="bg-gray-50">
                    <td colSpan="8" className="p-4">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <label className="text-sm text-gray-500">Event Title</label>
                          <p>{transaction.eventId?.title || 'N/A'}</p>
                        </div>
                        <div>
                          <label className="text-sm text-gray-500">Date</label>
                          <p>{transaction?.createdAt ? new Date(transaction.createdAt).toLocaleDateString('en-GB') : 'N/A'}</p>
                        </div>
                        <div>
                          <label className="text-sm text-gray-500">Time</label>
                          <p>{transaction.eventId?.time || 'N/A'}</p>
                        </div>
                        <div>
                          <label className="text-sm text-gray-500">Price</label>
                          <p>{transaction.eventId?.price ? `${transaction.currency} ${transaction.eventId.price.toFixed(2)}` : transaction.metadata?.price ? `${transaction.currency} ${transaction.metadata.price.toFixed(2)}` : 'N/A'}</p>
                        </div>
                        {transaction.metadata && Object.entries(transaction.metadata).map(([key, value]) => (
                          <div key={key}>
                            <label className="text-sm text-gray-500 capitalize">{key}</label>
                            <p>{JSON.stringify(value)}</p>
                          </div>
                        ))}
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {transactions.length > 0 && (
        <div className="flex justify-between items-center">
          <div className="text-gray-500">
            Showing {(localCurrentPage - 1) * rowsPerPage + 1} to{' '}
            {Math.min(localCurrentPage * rowsPerPage, totalItems)} of {totalItems} transactions
          </div>
          <div className="flex items-center gap-2">
            <button
              className="p-2 disabled:text-gray-300"
              onClick={() => handlePageChange(localCurrentPage - 1)}
              disabled={localCurrentPage === 1}
            >
              ←
            </button>
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              let pageNum;
              if (totalPages <= 5) {
                pageNum = i + 1;
              } else if (localCurrentPage <= 3) {
                pageNum = i + 1;
              } else if (localCurrentPage >= totalPages - 2) {
                pageNum = totalPages - 4 + i;
              } else {
                pageNum = localCurrentPage - 2 + i;
              }
              
              return (
                <button
                  key={pageNum}
                  className={`w-8 h-8 flex items-center justify-center ${
                    localCurrentPage === pageNum ? 'bg-primary text-white rounded-lg' : ''
                  }`}
                  onClick={() => handlePageChange(pageNum)}
                >
                  {pageNum}
                </button>
              );
            })}
            {totalPages > 5 && localCurrentPage < totalPages - 2 && <span>...</span>}
            {totalPages > 5 && localCurrentPage < totalPages - 2 && (
              <button
                className="w-8 h-8 flex items-center justify-center"
                onClick={() => handlePageChange(totalPages)}
              >
                {totalPages}
              </button>
            )}
            <button
              className="p-2 disabled:text-gray-300"
              onClick={() => handlePageChange(localCurrentPage + 1)}
              disabled={localCurrentPage === totalPages}
            >
              →
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default History;