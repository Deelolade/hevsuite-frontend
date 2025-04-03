import React, { useState } from "react";
import { BiChevronDown } from "react-icons/bi";
import avatar from "../../assets/user.avif";

const History = () => {
  const [selectedRows, setSelectedRows] = useState([]);
  const [currentPage, setCurrentPage] = useState(2);
  const [rowsPerPage, setRowsPerPage] = useState(6);
  const [expandedRows, setExpandedRows] = useState([]);

  const toggleRow = (id) => {
    setExpandedRows((prev) =>
      prev.includes(id) ? prev.filter((rowId) => rowId !== id) : [...prev, id]
    );
  };

  const transactions = [
    {
      id: 1,
      user: {
        name: "Andrew Bojangles",
        avatar: avatar,
      },
      paymentType: "Membership Fee",
      amount: "£120.00",
      date: "23 January, 2025",
      event: {
        title: "The bout to lions",
        date: "23 January, 2025",
        time: "10:00pm",
        price: "£120.00",
      },
    },
    // Duplicate this object 7 more times for the list
  ];

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedRows(transactions.map((t) => t.id));
    } else {
      setSelectedRows([]);
    }
  };

  const handleSelectRow = (id) => {
    setSelectedRows((prev) =>
      prev.includes(id) ? prev.filter((rowId) => rowId !== id) : [...prev, id]
    );
  };

  return (
    <div className="space-y-6 ">
      <div className="flex justify-end">
        <button className="px-4 py-2 bg-primary text-white rounded-lg items-center gap-2 flex-end mr-12">
          + Export 1
        </button>
      </div>
      <div className="md:w-full w-[90vw] overflow-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b text-gray-600">
              <th className="py-4 px-4 text-left">
                <input
                  type="checkbox"
                  onChange={handleSelectAll}
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
              <React.Fragment key={transaction.id}>
                <tr className="border-b">
                  <td className="py-4 px-4">
                    <input
                      type="checkbox"
                      checked={selectedRows.includes(transaction.id)}
                      onChange={() => handleSelectRow(transaction.id)}
                      className="rounded border-gray-300"
                    />
                  </td>
                  <td className="py-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={transaction.user.avatar}
                        alt={transaction.user.name}
                        className="w-8 h-8 rounded-full"
                      />
                      <span className="font-primary w-32 md:w-fit text-[#323C47]">
                        {transaction.user.name}
                      </span>
                    </div>
                  </td>
                  <td className="py-4">
                    <p className="py-4 w-32 md:w-fit">
                      {transaction.paymentType}
                    </p>
                  </td>
                  <td className="py-4">
                    <p className="py-4 w-32 md:w-fit">{transaction.amount}</p>
                  </td>
                  <td className="py-4">
                    <p className="py-4 w-32 md:w-fit">{transaction.date}</p>
                  </td>

                  <td className="py-4">
                    <button
                      className="p-2 hover:bg-gray-100 rounded-lg"
                      onClick={() => toggleRow(transaction.id)}
                    >
                      <BiChevronDown
                        size={20}
                        className={`transform transition-transform ${
                          expandedRows.includes(transaction.id)
                            ? "rotate-180"
                            : ""
                        }`}
                      />
                    </button>
                  </td>
                </tr>
                {expandedRows.includes(transaction.id) && (
                  <tr className="bg-gray-50">
                    <td colSpan="6" className="p-4">
                      <div className="grid grid-cols-4 gap-4">
                        <div>
                          <label className="text-sm text-gray-500">
                            Event Title
                          </label>
                          <p>{transaction.event.title}</p>
                        </div>
                        <div>
                          <label className="text-sm text-gray-500">Date</label>
                          <p>{transaction.event.date}</p>
                        </div>
                        <div>
                          <label className="text-sm text-gray-500">Time</label>
                          <p>{transaction.event.time}</p>
                        </div>
                        <div>
                          <label className="text-sm text-gray-500">Price</label>
                          <p>{transaction.event.price}</p>
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
      <div className="flex justify-between w-[90vw] overflow-auto md:w-full items-center">
        <div className="flex items-center gap-2">
          <span className="text-gray-500">Show result:</span>
          <select
            value={rowsPerPage}
            onChange={(e) => setRowsPerPage(Number(e.target.value))}
            className="border rounded-lg px-2 py-1"
          >
            <option value={6}>6</option>
            <option value={12}>12</option>
            <option value={24}>24</option>
          </select>
        </div>
        <div className="flex items-center gap-2">
          <button className="p-2 text-gray-400">←</button>
          <button className="w-8 h-8 flex items-center justify-center">
            1
          </button>
          <button className="w-8 h-8 flex items-center justify-center bg-green-800 text-white rounded-lg">
            2
          </button>
          <button className="w-8 h-8 flex items-center justify-center">
            3
          </button>
          <button className="w-8 h-8 flex items-center justify-center">
            4
          </button>
          <span>...</span>
          <button className="w-8 h-8 flex items-center justify-center">
            20
          </button>
          <button className="p-2 text-gray-400">→</button>
        </div>
      </div>
    </div>
  );
};

export default History;
