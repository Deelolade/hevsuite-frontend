import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAffiliates, updateAffiliate, updateAffiliateStatus, deleteAffiliate, getAffiliateStatistics } from '../../store/affiliate/affiliateSlice';
import Modal from 'react-modal';
import { BsCheckCircleFill, BsXCircleFill, BsChevronDown, BsChevronUp, BsTrash } from 'react-icons/bs';
import { FaRegCalendarCheck, FaTicketAlt, FaRegClock, FaPlayCircle, FaMoneyBillWave, FaEdit, FaSave, FaTimes } from 'react-icons/fa';
import { FiDownload } from 'react-icons/fi';

Modal.setAppElement('#root');

const isImage = (url) => /\.(jpg|jpeg|png|gif|webp)$/i.test(url);

const AffiliatePartners = () => {
  const dispatch = useDispatch();
  const { affiliates = [], isLoading, isError, message, affiliateStatistics = {} } = useSelector((state) => state.affiliate || {});
  const [previewUrl, setPreviewUrl] = useState(null);
  const [actionLoading, setActionLoading] = useState({});
  const [expanded, setExpanded] = useState({});
  const [deleteLoading, setDeleteLoading] = useState({});
  const [editingCommission, setEditingCommission] = useState({});
  const [commissionInput, setCommissionInput] = useState({});
  const [commissionLoading, setCommissionLoading] = useState({});
  const [selectedAffiliate, setSelectedAffiliate] = useState(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);

  useEffect(() => {
    dispatch(getAffiliates());
  }, [dispatch]);

  const handleStatusChange = async (affiliateId, newStatus) => {
    setActionLoading((prev) => ({ ...prev, [affiliateId]: true }));
    try {
      await dispatch(updateAffiliateStatus({ id: affiliateId, status: newStatus })).unwrap();
    } catch (err) {
      // Optionally show error toast
    } finally {
      setActionLoading((prev) => ({ ...prev, [affiliateId]: false }));
    }
  };

  const handleDelete = async (affiliateId) => {
    setDeleteLoading((prev) => ({ ...prev, [affiliateId]: true }));
    try {
      await dispatch(deleteAffiliate(affiliateId)).unwrap();
    } catch (err) {
      // Optionally show error toast
    } finally {
      setDeleteLoading((prev) => ({ ...prev, [affiliateId]: false }));
    }
  };

  const toggleExpand = (affiliateId) => {
    setExpanded((prev) => {
      const next = { ...prev, [affiliateId]: !prev[affiliateId] };
      // Fetch stats if expanding and not already loaded
      if (!prev[affiliateId] && !affiliateStatistics[affiliateId]?.data && !affiliateStatistics[affiliateId]?.isLoading) {
        dispatch(getAffiliateStatistics(affiliateId));
      }
      return next;
    });
  };

  const handleEditCommission = (affiliateId, currentValue) => {
    setEditingCommission((prev) => ({ ...prev, [affiliateId]: true }));
    setCommissionInput((prev) => ({ ...prev, [affiliateId]: currentValue }));
  };

  const handleCancelCommission = (affiliateId) => {
    setEditingCommission((prev) => ({ ...prev, [affiliateId]: false }));
    setCommissionInput((prev) => ({ ...prev, [affiliateId]: '' }));
  };

  const handleSaveCommission = async (affiliate) => {
    setCommissionLoading((prev) => ({ ...prev, [affiliate._id]: true }));
    try {
      await dispatch(updateAffiliate({ id: affiliate._id, data: { commissionFee: commissionInput[affiliate._id] } })).unwrap();
      setEditingCommission((prev) => ({ ...prev, [affiliate._id]: false }));
    } catch (err) {
      // Optionally show error toast
    } finally {
      setCommissionLoading((prev) => ({ ...prev, [affiliate._id]: false }));
    }
  };

  const handlePartnerNameClick = (affiliate) => {
    setSelectedAffiliate(affiliate);
    setIsDetailsModalOpen(true);
  };

  return (
    <div className="p-4 md:p-8">
      <h1 className="text-2xl font-bold mb-6">Affiliate Partners</h1>
      <div className="bg-white w-full overflow-x-auto rounded-lg shadow-sm">
        {isLoading ? (
          <div className="flex justify-center items-center h-40">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        ) : isError ? (
          <div className="flex justify-center items-center h-40 text-red-500">
            {message || 'An error occurred while fetching affiliates'}
          </div>
        ) : (
          <table className="min-w-[700px] w-full">
            <thead>
              <tr className="border-b">
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">No</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Partner Name</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Proof of Business</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Rep name</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Commission</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Status</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Action</th>
              </tr>
            </thead>
            <tbody>
              {affiliates && affiliates.length > 0 ? (
                affiliates.map((affiliate, idx) => (
                  <React.Fragment key={affiliate._id || idx}>
                    <tr className="border-b hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm text-gray-600">{idx + 1}</td>
                      <td className="px-6 py-4 text-sm text-gray-700">
                        <button
                          onClick={() => handlePartnerNameClick(affiliate)}
                          className="text-primary hover:text-primary-dark hover:underline cursor-pointer font-medium"
                        >
                          {affiliate.businessName}
                        </button>
                      </td>
                      <td className="px-6 py-4 text-sm">
                        {affiliate.businessProof ? (
                          isImage(affiliate.businessProof) ? (
                            <>
                              <img
                                src={affiliate.businessProof}
                                alt="Proof of Business"
                                className="w-12 h-12 object-cover rounded cursor-pointer border"
                                onClick={() => setPreviewUrl(affiliate.businessProof)}
                              />
                              <Modal
                                isOpen={!!previewUrl}
                                onRequestClose={() => setPreviewUrl(null)}
                                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg w-auto max-w-[90vw] max-h-[90vh] p-4 flex flex-col items-center"
                                overlayClassName="fixed inset-0 bg-black/50"
                              >
                                <button
                                  onClick={() => setPreviewUrl(null)}
                                  className="self-end mb-2 text-gray-400 hover:text-gray-600 text-2xl"
                                >
                                  ✕
                                </button>
                                <img
                                  src={previewUrl}
                                  alt="Proof Preview"
                                  className="max-w-[80vw] max-h-[70vh] rounded shadow-lg"
                                />
                              </Modal>
                            </>
                          ) : (
                            <a href={affiliate.businessProof} target="_blank" rel="noopener noreferrer" className="text-primary underline">View File</a>
                          )
                        ) : (
                          <span className="text-gray-400">N/A</span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-700">{affiliate.repName}</td>
                      <td className="px-6 py-4 text-sm text-gray-700">
                        {editingCommission[affiliate._id] ? (
                          <div className="flex items-center gap-2">
                            <input
                              type="text"
                              className="border rounded px-2 py-1 w-20 text-sm"
                              value={commissionInput[affiliate._id]}
                              onChange={e => setCommissionInput(prev => ({ ...prev, [affiliate._id]: e.target.value }))}
                              disabled={commissionLoading[affiliate._id]}
                            />
                            <button
                              className="text-green-600 hover:text-green-800 disabled:opacity-50"
                              onClick={() => handleSaveCommission(affiliate)}
                              disabled={commissionLoading[affiliate._id]}
                            >
                              <FaSave />
                            </button>
                            <button
                              className="text-gray-500 hover:text-red-500"
                              onClick={() => handleCancelCommission(affiliate._id)}
                              disabled={commissionLoading[affiliate._id]}
                            >
                              <FaTimes />
                            </button>
                          </div>
                        ) : (
                          <div className="flex items-center gap-2">
                            <span>{affiliate.commissionFee || 'N/A'}</span>
                            <button
                              className="text-blue-600 hover:text-blue-800"
                              onClick={() => handleEditCommission(affiliate._id, affiliate.commissionFee)}
                            >
                              <FaEdit />
                            </button>
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4 text-sm">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          affiliate.status === 'Approved'
                            ? 'bg-green-100 text-green-700'
                            : affiliate.status === 'Declined'
                            ? 'bg-red-100 text-red-700'
                            : 'bg-yellow-100 text-yellow-700'
                        }`}>
                          {affiliate.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm">
                        {affiliate.status === 'Pending' ? (
                          <div className="flex gap-3">
                            <button
                              className="text-green-600 hover:text-green-800 disabled:opacity-50"
                              title="Approve"
                              disabled={actionLoading[affiliate._id]}
                              onClick={() => handleStatusChange(affiliate._id, 'Approved')}
                            >
                              <BsCheckCircleFill size={22} />
                            </button>
                            <button
                              className="text-red-600 hover:text-red-800 disabled:opacity-50"
                              title="Decline"
                              disabled={actionLoading[affiliate._id]}
                              onClick={() => handleStatusChange(affiliate._id, 'Declined')}
                            >
                              <BsXCircleFill size={22} />
                            </button>
                          </div>
                        ) : affiliate.status === 'Approved' ? (
                          <div className="flex gap-3 items-center">
                            <button
                              className="text-red-600 hover:text-red-800 disabled:opacity-50"
                              title="Delete"
                              disabled={deleteLoading[affiliate._id]}
                              onClick={() => handleDelete(affiliate._id)}
                            >
                              <BsTrash size={20} />
                            </button>
                            <button
                              className="text-gray-500 hover:text-primary"
                              title={expanded[affiliate._id] ? 'Collapse' : 'Expand'}
                              onClick={() => toggleExpand(affiliate._id)}
                            >
                              {expanded[affiliate._id] ? <BsChevronUp size={20} /> : <BsChevronDown size={20} />}
                            </button>
                          </div>
                        ) : (
                          <span className="text-gray-400">-</span>
                        )}
                      </td>
                    </tr>
                    {/* Collapsible row for more details */}
                    {expanded[affiliate._id] && affiliate.status === 'Approved' && (
                      <tr className="bg-gray-50">
                        <td colSpan={7} className="px-8 py-6">
                          {(() => {
                            const stats = affiliateStatistics[affiliate._id];
                            if (!stats || stats.isLoading) {
                              return (
                                <div className="flex justify-center items-center h-32">
                                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                                </div>
                              );
                            }
                            if (stats.isError) {
                              return (
                                <div className="text-center text-red-500">{stats.message || 'Failed to load statistics'}</div>
                              );
                            }
                            const { completedEvents, ticketsSold, outstandingEvents, ongoingEvents, lifetimeEarnings, invoices } = stats.data || {};
                            const cardStyle = "flex flex-col items-center justify-center p-4 bg-white rounded-lg shadow border mx-2 my-1 min-w-[140px] min-h-[120px]";
                            const iconSize = 28;
                            return (
                              <div className="flex flex-wrap justify-center gap-4">
                                {/* Completed Events */}
                                <div className={cardStyle + " border-green-200"}>
                                  <FaRegCalendarCheck className="text-green-500 mb-2" size={iconSize} />
                                  <span className="text-xs text-gray-500 mb-1">Completed Events</span>
                                  <span className="text-2xl font-bold text-green-700">{completedEvents ?? '-'}</span>
                                </div>
                                {/* Life Time Ticket Sold */}
                                <div className={cardStyle + " border-blue-200"}>
                                  <FaTicketAlt className="text-blue-500 mb-2" size={iconSize} />
                                  <span className="text-xs text-gray-500 mb-1">Life Time Ticket Sold</span>
                                  <span className="text-2xl font-bold text-blue-700">{ticketsSold ?? '-'}</span>
                                </div>
                                {/* Outstanding Events */}
                                <div className={cardStyle + " border-yellow-200"}>
                                  <FaRegClock className="text-yellow-500 mb-2" size={iconSize} />
                                  <span className="text-xs text-gray-500 mb-1">Outstanding Events</span>
                                  <span className="text-2xl font-bold text-yellow-700">{outstandingEvents ?? '-'}</span>
                                </div>
                                {/* Ongoing Events */}
                                <div className={cardStyle + " border-purple-200"}>
                                  <FaPlayCircle className="text-purple-500 mb-2" size={iconSize} />
                                  <span className="text-xs text-gray-500 mb-1">Ongoing Events</span>
                                  <span className="text-2xl font-bold text-purple-700">{ongoingEvents ?? '-'}</span>
                                </div>
                                {/* Lifetime Earnings */}
                                <div className={cardStyle + " border-emerald-200"}>
                                  <FaMoneyBillWave className="text-emerald-500 mb-2" size={iconSize} />
                                  <span className="text-xs text-gray-500 mb-1">Lifetime Earnings</span>
                                  <span className="text-2xl font-bold text-emerald-700">{lifetimeEarnings != null ? `£${lifetimeEarnings.toLocaleString()}` : '-'}</span>
                                </div>
                                {/* All Invoice */}
                                <div className={cardStyle + " border-gray-200"}>
                                  <FiDownload className="text-gray-500 mb-2" size={iconSize} />
                                  <span className="text-xs text-gray-500 mb-1">All Invoice</span>
                                  {invoices && invoices.length > 0 ? (
                                    <select className="border rounded px-2 py-1 text-sm mt-1" onChange={e => { if (e.target.value) window.open(e.target.value, '_blank'); }} defaultValue="">
                                      <option value="" disabled>Select Invoice</option>
                                      {invoices.map((inv, i) => (
                                        <option key={inv.url || i} value={inv.url}>{inv.name || `Invoice #${i + 1}`}</option>
                                      ))}
                                    </select>
                                  ) : (
                                    <span className="text-gray-400 mt-2">No invoices</span>
                                  )}
                                </div>
                              </div>
                            );
                          })()}
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-gray-500">
                    No affiliates found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>

      {/* Affiliate Details Modal */}
      <Modal
        isOpen={isDetailsModalOpen}
        onRequestClose={() => setIsDetailsModalOpen(false)}
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg w-[90vw] max-w-3xl max-h-[90vh] overflow-y-auto "
        overlayClassName="fixed inset-0 bg-black/50"
      >
        {selectedAffiliate && (
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">Affiliate Partner Details</h2>
              <button
                onClick={() => setIsDetailsModalOpen(false)}
                className="text-gray-400 hover:text-gray-600 text-2xl"
              >
                ✕
              </button>
            </div>

            <div className="space-y-6">
              {/* Affiliate ID */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-lg font-semibold mb-2">Affiliate Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-600">Affiliate ID</label>
                    <p className="text-sm text-gray-800 font-mono bg-white p-2 rounded border">{selectedAffiliate._id}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-600">Status</label>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      selectedAffiliate.status === 'Approved'
                        ? 'bg-green-100 text-green-700'
                        : selectedAffiliate.status === 'Declined'
                        ? 'bg-red-100 text-red-700'
                        : 'bg-yellow-100 text-yellow-700'
                    }`}>
                      {selectedAffiliate.status}
                    </span>
                  </div>
                </div>
              </div>

              {/* Business Information */}
              <div className="bg-white border rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-4 text-gray-800">Business Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-600">Business Name</label>
                    <p className="text-sm text-gray-800">{selectedAffiliate.businessName || 'N/A'}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-600">Business Email</label>
                    <p className="text-sm text-gray-800">{selectedAffiliate.businessEmail || 'N/A'}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-600">Business Phone</label>
                    <p className="text-sm text-gray-800">{selectedAffiliate.businessPhoneCode} {selectedAffiliate.businessPhone || 'N/A'}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-600">Commission Fee</label>
                    <p className="text-sm text-gray-800">{selectedAffiliate.commissionFee || 'N/A'}</p>
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-600">Business Address</label>
                    <p className="text-sm text-gray-800">
                      {selectedAffiliate.businessAddressLine1 || 'N/A'}<br />
                      {selectedAffiliate.businessCity && `${selectedAffiliate.businessCity}, `}
                      {selectedAffiliate.businessState && `${selectedAffiliate.businessState}, `}
                      {selectedAffiliate.businessCountry || 'N/A'}<br />
                      {selectedAffiliate.businessPostcode && `Postcode: ${selectedAffiliate.businessPostcode}`}
                    </p>
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-600">Business Proof</label>
                    {selectedAffiliate.businessProof ? (
                      <div className="mt-2">
                        {isImage(selectedAffiliate.businessProof) ? (
                          <img
                            src={selectedAffiliate.businessProof}
                            alt="Business Proof"
                            className="w-32 h-32 object-cover rounded border cursor-pointer"
                            onClick={() => setPreviewUrl(selectedAffiliate.businessProof)}
                          />
                        ) : (
                          <a 
                            href={selectedAffiliate.businessProof} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="text-primary underline hover:text-primary-dark"
                          >
                            View Business Proof Document
                          </a>
                        )}
                      </div>
                    ) : (
                      <p className="text-sm text-gray-500">No business proof provided</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Representative Information */}
              <div className="bg-white border rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-4 text-gray-800">Representative Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-600">Representative Name</label>
                    <p className="text-sm text-gray-800">{selectedAffiliate.repName || 'N/A'}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-600">Relationship</label>
                    <p className="text-sm text-gray-800">
                      {selectedAffiliate.repRelationship || 'N/A'}
                      {selectedAffiliate.repOtherRole && ` - ${selectedAffiliate.repOtherRole}`}
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-600">Representative Email</label>
                    <p className="text-sm text-gray-800">{selectedAffiliate.repEmail || 'N/A'}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-600">Representative Phone</label>
                    <p className="text-sm text-gray-800">{selectedAffiliate.repPhoneCode} {selectedAffiliate.repPhone || 'N/A'}</p>
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-600">Representative Address</label>
                    <p className="text-sm text-gray-800">
                      {selectedAffiliate.repAddressLine1 || 'N/A'}<br />
                      {selectedAffiliate.repCity && `${selectedAffiliate.repCity}, `}
                      {selectedAffiliate.repState && `${selectedAffiliate.repState}, `}
                      {selectedAffiliate.repCountry || 'N/A'}<br />
                      {selectedAffiliate.repPostcode && `Postcode: ${selectedAffiliate.repPostcode}`}
                    </p>
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-600">Representative ID Proof</label>
                    {selectedAffiliate.repProofId ? (
                      <div className="mt-2">
                        {isImage(selectedAffiliate.repProofId) ? (
                          <img
                            src={selectedAffiliate.repProofId}
                            alt="ID Proof"
                            className="w-32 h-32 object-cover rounded border cursor-pointer"
                            onClick={() => setPreviewUrl(selectedAffiliate.repProofId)}
                          />
                        ) : (
                          <a 
                            href={selectedAffiliate.repProofId} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="text-primary underline hover:text-primary-dark"
                          >
                            View ID Proof Document
                          </a>
                        )}
                      </div>
                    ) : (
                      <p className="text-sm text-gray-500">No ID proof provided</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Banking Information */}
              <div className="bg-white border rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-4 text-gray-800">Banking Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-600">Bank Name</label>
                    <p className="text-sm text-gray-800">{selectedAffiliate.bankName || 'N/A'}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-600">Account Number</label>
                    <p className="text-sm text-gray-800 font-mono">{selectedAffiliate.accountNumber || 'N/A'}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-600">Sort Code</label>
                    <p className="text-sm text-gray-800">{selectedAffiliate.sortCode || 'N/A'}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-600">Routing Number</label>
                    <p className="text-sm text-gray-800">{selectedAffiliate.routingNumber || 'N/A'}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-600">SWIFT/BIC</label>
                    <p className="text-sm text-gray-800">{selectedAffiliate.swiftBic || 'N/A'}</p>
                  </div>
                </div>
              </div>

              {/* Additional Information */}
              <div className="bg-white border rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-4 text-gray-800">Additional Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-600">Created At</label>
                    <p className="text-sm text-gray-800">
                      {selectedAffiliate.createdAt ? new Date(selectedAffiliate.createdAt).toLocaleDateString() : 'N/A'}
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-600">Last Updated</label>
                    <p className="text-sm text-gray-800">
                      {selectedAffiliate.updatedAt ? new Date(selectedAffiliate.updatedAt).toLocaleDateString() : 'N/A'}
                    </p>
                  </div>
                  {selectedAffiliate.isDissolved && (
                    <>
                      <div>
                        <label className="block text-sm font-medium text-gray-600">Dissolved At</label>
                        <p className="text-sm text-gray-800">
                          {selectedAffiliate.dissolvedAt ? new Date(selectedAffiliate.dissolvedAt).toLocaleDateString() : 'N/A'}
                        </p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-600">Deletion Date</label>
                        <p className="text-sm text-gray-800">
                          {selectedAffiliate.deletionDate ? new Date(selectedAffiliate.deletionDate).toLocaleDateString() : 'N/A'}
                        </p>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default AffiliatePartners; 