import React, { useState, useEffect, useRef, useCallback } from "react";
import { BiChevronDown } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { getTransactions, updateTransactionStatus } from "../../store/finance/financeSlice"
import avatar from "../../assets/defualtuser.webp";

const History = () => {
  const dispatch = useDispatch();
  const {
    transactions: { data: transactions = [], currentPage, totalPages, totalItems },
    isLoading: loading,
    isError: error,
  } = useSelector((state) => state.finance);

  const [selectedRows, setSelectedRows] = useState([]);
  const [localCurrentPage, setLocalCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [expandedRows, setExpandedRows] = useState([]);
  const [searchQuery, setSearchQuery] = useState(() => {
    const savedQuery = sessionStorage.getItem('financeSearchQuery');
    return savedQuery || '';
  });
  const [statusFilter, setStatusFilter] = useState(() => {
    const savedFilter = sessionStorage.getItem('financeStatusFilter');
    return savedFilter || '';
  });
  const searchTimeoutRef = useRef(null);
  const searchInputRef = useRef(null);
  const isInitialMount = useRef(true);

  // Memoized search function
  const performSearch = useCallback((value) => {
    dispatch(getTransactions({ 
      page: localCurrentPage, 
      limit: rowsPerPage,
      search: value.trim(),
      filter: statusFilter,
      sortBy: "createdAt"
    }));
  }, [dispatch, localCurrentPage, rowsPerPage, statusFilter]);

  // Handle browser back/forward navigation
  useEffect(() => {
    const handlePopState = () => {
      const savedQuery = sessionStorage.getItem('financeSearchQuery');
      const savedFilter = sessionStorage.getItem('financeStatusFilter');
      
      if (savedQuery !== searchQuery) {
        setSearchQuery(savedQuery || '');
      }
      if (savedFilter !== statusFilter) {
        setStatusFilter(savedFilter || '');
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [searchQuery, statusFilter]);

  // Debounced search function
  const debouncedSearch = useCallback((value) => {
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }

    searchTimeoutRef.current = setTimeout(() => {
      performSearch(value);
    }, 500);
  }, [performSearch]);

  // Handle search input change
  const handleSearchChange = useCallback((e) => {
    const value = e.target.value;
    setSearchQuery(value);
    sessionStorage.setItem('financeSearchQuery', value);
    debouncedSearch(value);
  }, [debouncedSearch]);

  // Handle status filter change
  const handleStatusFilterChange = useCallback((e) => {
    const value = e.target.value;
    setStatusFilter(value);
    sessionStorage.setItem('financeStatusFilter', value);
    performSearch(searchQuery);
  }, [performSearch, searchQuery]);

  // Initial fetch and handle filter changes
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      performSearch(searchQuery);
    }
  }, [performSearch, searchQuery]);

  // Cleanup timeout on component unmount
  useEffect(() => {
    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
    };
  }, []);

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
    dispatch(updateTransactionStatus({ id: transactionId, status }));
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
            ref={searchInputRef}
            type="text"
            placeholder="Search transactions..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="border rounded-lg px-4 py-2 w-full"
          />
        </div>
        <div className="flex gap-4">
          <select
            value={statusFilter}
            onChange={handleStatusFilterChange}
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
                  <td className="py-4 capitalize">{transaction.provider}</td>
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
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <div>
                          <label className="text-sm text-gray-500">Event Title</label>
                          <p>{transaction.purpose || 'N/A'}</p>
                        </div>
                        <div>
                          <label className="text-sm text-gray-500">Date</label>
                          <p>{transaction?.createdAt ? new Date(transaction.createdAt).toLocaleDateString('en-GB') : 'N/A'}</p>
                        </div>
                        <div>
                          <label className="text-sm text-gray-500">UserType</label>
                          <p>{transaction.metadata?.userType || 'N/A'}</p>
                        </div>
                        <div>
                          <label className="text-sm text-gray-500">Time</label>
                          <p>{transaction?.createdAt ? new Date(transaction.createdAt).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', hour12: true }) : 'N/A'}</p>
                        </div>
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