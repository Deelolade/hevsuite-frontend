import React, { useState, useEffect } from "react";
import { BsCalendar } from "react-icons/bs";
import { FiSettings } from "react-icons/fi";
import Modal from "react-modal";
import { useDispatch, useSelector } from "react-redux";
import { getAllAsks, deleteAsk } from "../../store/ask/askSlice";
import AllAskDetails from "../../components/modals/ask/AllAskDetails";
import AllAskRemove from "../../components/modals/ask/AllAskRemove";
import avatar from "../../assets/defualtuser.webp";
import toast from "react-hot-toast";
// import Pagination from "../../components/common/Pagination";
import Pagination from "../../components/Pagination"
import Loader from "../../components/Spinner";

const AllAsks = () => {
  const dispatch = useDispatch();
  const { asks, isLoading, isError, message } = useSelector((state) => state.ask);
  
  // State management
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(6);
  const [filter, setFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [openSettingsId, setOpenSettingsId] = useState(null);
  const [openDetails, setOpenDetails] = useState(false);
  const [selectedAsk, setSelectedAsk] = useState(null);
  const [isRemoveModalOpen, setIsRemoveModalOpen] = useState(false);

  // Fetch asks when component mounts or filter/search changes
  useEffect(() => {
    dispatch(getAllAsks({ filter, search: searchQuery }));
  }, [dispatch, filter, searchQuery]);

  // Handle errors
  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
  }, [isError, message]);

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = asks?.slice(indexOfFirstItem, indexOfLastItem) || [];
  const totalPages = Math.ceil(asks?.length / itemsPerPage) || 1;

  const handleEdit = (ask) => {
    setSelectedAsk(ask);
    setOpenDetails(true);
    setOpenSettingsId(null);
  };

  const handleRemove = (ask) => {
    setSelectedAsk(ask);
    setIsRemoveModalOpen(true);
    setOpenSettingsId(null);
  };

  const confirmRemove = () => {
    dispatch(deleteAsk({ id: selectedAsk._id }))
      .unwrap()
      .then(() => {
        toast.success("Ask deleted successfully");
        setIsRemoveModalOpen(false);
      })
      .catch((error) => {
        toast.error(error || "Failed to delete ask");
      });
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleItemsPerPageChange = (e) => {
    setItemsPerPage(Number(e.target.value));
    setCurrentPage(1); // Reset to first page when items per page changes
  };

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
    setCurrentPage(1); // Reset to first page when filter changes
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1); // Reset to first page when search changes
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="space-y-6">
      {/* Filter and Search */}
      <div className="flex flex-col md:flex-row justify-between gap-4">
        <div className="relative flex-grow max-w-md">
          <input
            type="text"
            placeholder="Search asks..."
            className="w-full px-4 py-2 border rounded-lg pl-10"
            value={searchQuery}
            onChange={handleSearch}
          />
          <svg
            className="absolute left-3 top-3 h-4 w-4 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            ></path>
          </svg>
        </div>
        
        <select 
          className="px-4 py-2 border rounded-lg text-gray-600 min-w-[200px]"
          value={filter}
          onChange={handleFilterChange}
        >
          <option value="all">All Asks</option>
          <option value="open">Current Ask</option>
          <option value="claimed">Claimed Ask</option>
        </select>
      </div>

      {/* Table */}
      <div className="bg-white p-0 rounded-lg shadow-sm">
        {currentItems.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            No asks found matching your criteria
          </div>
        ) : (
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="w-12 py-4 px-6 text-left">
                  <input type="checkbox" className="rounded" />
                </th>
                <th className="text-left py-4 px-6">Title</th>
                <th className="text-left py-4 px-6">User</th>
                {/* <th className="text-left py-4 px-6">Status</th> */}
                <th className="text-left py-4 px-6">Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((ask) => (
                <tr key={ask._id} className="border-b hover:bg-gray-50">
                  <td className="py-4 px-6">
                    <input type="checkbox" className="rounded" />
                  </td>
                  <td className="py-4 px-6 font-medium">{ask.title}</td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-2">
                      {/* Debug: {ask} */}
                      <img
                          src={ask.createdBy?.profilePhoto || "/placeholder-avatar.png"}
                          alt={`${ask.createdBy?.forename || ""} ${ask.createdBy?.surname || ""}`}
                          className="w-8 h-8 rounded-full object-cover"
                        />
                      <span>{`${ask.createdBy?.forename || ""} ${ask.createdBy?.surname || ""}`}</span>
                    </div>
                  </td>
                  {/* <td className="py-4 px-6">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      ask.status === 'claimed' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-blue-100 text-blue-800'
                    }`}>
                      {ask.status || 'current'}
                    </span>
                  </td> */}
                  <td className="py-4 px-6 relative">
                    <button
                      className="p-1 hover:bg-gray-100 rounded"
                      onClick={() => {
                        setOpenSettingsId(
                          openSettingsId === ask._id ? null : ask._id
                        );
                      }}
                    >
                      <FiSettings size={20} />
                    </button>
                    {openSettingsId === ask._id && (
                      <div className="absolute right-6 mt-2 w-32 bg-white rounded-lg shadow-lg border py-1 z-10">
                        <button
                          className="w-full px-4 py-2 text-left font-primary font-medium text-sm hover:bg-gray-50"
                          onClick={() => handleEdit(ask)}
                        >
                          Detail
                        </button>
                        <button
                          className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 text-red-500"
                          onClick={() => handleRemove(ask)}
                        >
                          Remove
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Pagination */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <span>Show:</span>
          <select
            className="px-2 py-1 border rounded"
            value={itemsPerPage}
            onChange={handleItemsPerPageChange}
          >
            <option value={6}>6</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
          </select>
          <span>items per page</span>
        </div>
        
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>

      {/* Modals */}
      <Modal
        isOpen={openDetails}
        onRequestClose={() => setOpenDetails(false)}
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg md:w-[450px] w-[96vw] max-h-[90vh] overflow-y-auto"
        overlayClassName="fixed inset-0 bg-black/50 z-50"
        ariaHideApp={false}
      >
        <AllAskDetails
          setOpenDetails={setOpenDetails}
          selectedAsk={selectedAsk}
        />
      </Modal>
      <Modal
        isOpen={isRemoveModalOpen}
        onRequestClose={() => setIsRemoveModalOpen(false)}
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg md:w-[450px] w-[96vw]"
        overlayClassName="fixed inset-0 bg-black/50 z-50"
        ariaHideApp={false}
      >
        <AllAskRemove 
          onCancel={() => setIsRemoveModalOpen(false)}
          onConfirm={confirmRemove}
          isLoading={isLoading}
        />
      </Modal>
    </div>
  );
};

export default AllAsks;