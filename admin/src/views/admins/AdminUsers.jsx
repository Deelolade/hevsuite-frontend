"use client"

import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { BiSearch } from "react-icons/bi"
import { BsPencil, BsTrash, BsEyeSlash, BsEye } from "react-icons/bs"
import Modal from "react-modal"
import ExportButton from "../ExportButton";
import { getAllAdmins, createAdmin, updateAdmin, deleteAdmin } from "../../store/admins/adminSlice"
import { toast } from "react-toastify"
import avatar from "../../assets/user.avif";
// import { Loader } from "lucide-react"
import LoadingSpinner from '../../components/Spinner';

// Set app element for accessibility
Modal.setAppElement("#root")

const AdminUsers = () => {
  const dispatch = useDispatch()
  const { admins, loading } = useSelector((state) => state.admins)

  const [selectedRows, setSelectedRows] = useState([])
  const [rowsPerPage, setRowsPerPage] = useState(6)
  const [currentPage, setCurrentPage] = useState(1)
  const [searchQuery, setSearchQuery] = useState("")
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [selectedAdmin, setSelectedAdmin] = useState(null)

  const [newAdmin, setNewAdmin] = useState({
    forename: "",
    surname: "",
    primaryEmail: "",
    role: "admin",
    password: "",
  })

  useEffect(() => {
    dispatch(getAllAdmins())
  }, [dispatch])

  // Filter admins based on search query
  const filteredAdmins = admins.filter(
    (admin) =>
      `${admin.forename} ${admin.surname}`.toLowerCase().includes(searchQuery.toLowerCase()) ||
      admin.primaryEmail.toLowerCase().includes(searchQuery.toLowerCase()) ||
      admin.role.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  // Pagination
  const indexOfLastAdmin = currentPage * rowsPerPage
  const indexOfFirstAdmin = indexOfLastAdmin - rowsPerPage
  const currentAdmins = filteredAdmins.slice(indexOfFirstAdmin, indexOfLastAdmin)
  const totalPages = Math.ceil(filteredAdmins.length / rowsPerPage)

  const handleNewAdminChange = (e) => {
    setNewAdmin({
      ...newAdmin,
      [e.target.name]: e.target.value,
    })
  }

  const handleSelectRow = (id) => {
    setSelectedRows((prev) => (prev.includes(id) ? prev.filter((rowId) => rowId !== id) : [...prev, id]))
  }

  const handleEditClick = (admin) => {
    setSelectedAdmin(admin)
    setIsEditModalOpen(true)
  }

  const handleDeleteClick = (admin) => {
    setSelectedAdmin(admin)
    setIsDeleteModalOpen(true)
  }

  const handleAddAdmin = async () => {
    if (!newAdmin.forename || !newAdmin.surname || !newAdmin.primaryEmail || !newAdmin.password) {
      toast.error("Please fill all required fields")
      return
    }

    try {
      await dispatch(createAdmin(newAdmin)).unwrap()
      setIsAddModalOpen(false)
      setNewAdmin({
        forename: "",
        surname: "",
        primaryEmail: "",
        role: "admin",
        password: "",
      })
      toast.success("Admin created successfully")
    } catch (error) {
      toast.error(error.message || "Failed to create admin")
    }
  }

  const handleUpdateAdmin = async () => {
    if (!selectedAdmin) return

    try {
      await dispatch(
        updateAdmin({
          id: selectedAdmin._id,
          data: {
            forename: selectedAdmin.forename,
            surname: selectedAdmin.surname,
            primaryEmail: selectedAdmin.primaryEmail,
            role: selectedAdmin.role,
            password: selectedAdmin.password || undefined,
          },
        }),
      ).unwrap()
      setIsEditModalOpen(false)
      toast.success("Admin updated successfully")
    } catch (error) {
      toast.error(error.message || "Failed to update admin")
    }
  }

  const handleDeleteAdmin = async () => {
    if (!selectedAdmin) return

    try {
      await dispatch(deleteAdmin(selectedAdmin._id)).unwrap()
      setIsDeleteModalOpen(false)
      toast.success("Admin deleted successfully")
    } catch (error) {
      toast.error(error.message || "Failed to delete admin")
    }
  }

  // Prepare data for export
  const exportData = admins.map((admin) => ({
    Name: `${admin.forename} ${admin.surname}`,
    Email: admin.primaryEmail,
    Role: admin.roleName || admin.role,
    Status: admin.isDeactivated ? "Inactive" : "Active",
    CreatedAt: new Date(admin.createdAt).toLocaleDateString(),
  }))

  if (loading) {
    return <LoadingSpinner />;
  }


  return (
    <div className="pb-4">
      {/* Header */}
      <div className="md:flex justify-between items-center pb-8">
        <div className="flex items-center gap-2">
          <h2 className="text-xl">{filteredAdmins.length} Admin Users</h2>
        </div>
        <div className="md:flex grid grid-cols-2 items-center gap-4">
          <div className="relative mt-4 md:mt-0 col-span-2">
            <BiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search"
              className="pl-10 pr-4 py-2 border rounded-lg w-[300px]"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <button className="px-6 py-2 bg-primary text-white rounded-lg" onClick={() => setIsAddModalOpen(true)}>
            Add Admin User
          </button>
          <ExportButton data={exportData} fileName="admin_users" />
        </div>
      </div>

      {/* Admin Grid */}
      <div className="md:grid md:grid-cols-5 flex w-[90vw] md:w-full overflow-auto gap-8 mb-8 h-56">
        {currentAdmins.slice(0, 5).map((admin) => (
          <div key={admin._id} className="border rounded-lg p-4 flex flex-col items-center relative">
            <div className="flex justify-between mb-4">
              <img
                src={admin.profilePhoto || avatar}
                alt={`${admin.forename} ${admin.surname}`}
                className="w-20 h-20 rounded-full object-cover"
              />
              <button
                className="absolute right-2 top-2 text-gray-400 hover:text-gray-600"
                onClick={() => handleDeleteClick(admin)}
              >
                ✕
              </button>
            </div>
            <h3 className="font-medium">{`${admin?.forename} ${admin?.surname}`}</h3>
            <p className="text-gray-500">{admin?.role}</p>
          </div>
        ))}
      </div>

      {/* Admin Table */}
      <div className="w-[90vw] overflow-auto md:w-full">
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="py-4 px-4 text-left">
                <input
                  type="checkbox"
                  className="rounded border-gray-300"
                  onChange={() => {
                    if (selectedRows.length === currentAdmins.length) {
                      setSelectedRows([])
                    } else {
                      setSelectedRows(currentAdmins.map((admin) => admin._id))
                    }
                  }}
                  checked={selectedRows.length === currentAdmins.length && currentAdmins.length > 0}
                />
              </th>
              <th className="py-4 text-left">User</th>
              <th className="py-4 text-left">Status</th>
              <th className="py-4 text-left">Email</th>
              <th className="py-4 text-left">Role</th>
              <th className="py-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentAdmins.length > 0 ? (
              currentAdmins.map((admin) => (
                <tr key={admin._id} className="border-b">
                  <td className="py-4 px-4">
                    <input
                      type="checkbox"
                      checked={selectedRows.includes(admin._id)}
                      onChange={() => handleSelectRow(admin._id)}
                      className="rounded border-gray-300"
                    />
                  </td>
                  <td className="py-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={admin.profilePhoto || avatar}
                        alt="Profile"
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <span className="w-32 md:w-full">{`${admin.forename} ${admin.surname}`}</span>
                    </div>
                  </td>
                  <td className="py-4">
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${admin.isDeactivated ? "bg-red-100 text-red-800" : "bg-green-100 text-green-800"}`}
                    >
                      {admin.isDeactivated ? "Inactive" : "Active"}
                    </span>
                  </td>
                  <td className="py-4">
                    <p className="w-44 md:w-fit text-wrap">{admin.primaryEmail}</p>
                  </td>
                  <td className="py-4">
                    <p className="w-32 md:w-fit">{admin.role || admin.role}</p>
                  </td>
                  <td className="py-4">
                    <div className="flex items-center gap-2">
                      <button className="text-primary" onClick={() => handleEditClick(admin)}>
                        <BsPencil size={18} />
                      </button>
                      <button className="text-primary" onClick={() => handleDeleteClick(admin)}>
                        <BsTrash size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="py-8 text-center text-gray-500">
                  No admin users found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {filteredAdmins.length > 0 && (
        <div className="flex w-[90vw] overflow-auto md:w-full justify-between items-center mt-4">
          <div className="flex items-center gap-2">
            <span className="text-gray-500">Show result:</span>
            <select
              value={rowsPerPage}
              onChange={(e) => {
                setRowsPerPage(Number(e.target.value))
                setCurrentPage(1)
              }}
              className="border rounded-lg px-2 py-1"
            >
              <option value={6}>6</option>
              <option value={12}>12</option>
              <option value={24}>24</option>
            </select>
          </div>
          <div className="flex items-center gap-2">
            <button
              className="p-2 text-gray-400"
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              ←
            </button>
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              const pageNum = i + 1
              return (
                <button
                  key={pageNum}
                  className={`w-8 h-8 flex items-center justify-center ${currentPage === pageNum ? "bg-primary text-white rounded-lg" : ""
                    }`}
                  onClick={() => setCurrentPage(pageNum)}
                >
                  {pageNum}
                </button>
              )
            })}
            {totalPages > 5 && <span>...</span>}
            {totalPages > 5 && (
              <button
                className={`w-8 h-8 flex items-center justify-center ${currentPage === totalPages ? "bg-primary text-white rounded-lg" : ""
                  }`}
                onClick={() => setCurrentPage(totalPages)}
              >
                {totalPages}
              </button>
            )}
            <button
              className="p-2 text-gray-400"
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
            >
              →
            </button>
          </div>
        </div>
      )}

      {/* Add Admin Modal */}
      <Modal
        isOpen={isAddModalOpen}
        onRequestClose={() => setIsAddModalOpen(false)}
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg md:w-[500px] w-[95vw]"
        overlayClassName="fixed inset-0 bg-black/50"
      >
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl">Add New Admin user</h2>
            <button onClick={() => setIsAddModalOpen(false)} className="text-gray-400 hover:text-gray-600">
              ✕
            </button>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block mb-2">First Name</label>
              <input
                type="text"
                name="forename"
                placeholder="First Name"
                value={newAdmin.forename}
                onChange={handleNewAdminChange}
                className="w-full px-4 py-2 border rounded-lg"
              />
            </div>

            <div>
              <label className="block mb-2">Last Name</label>
              <input
                type="text"
                name="surname"
                placeholder="Last Name"
                value={newAdmin.surname}
                onChange={handleNewAdminChange}
                className="w-full px-4 py-2 border rounded-lg"
              />
            </div>

            <div>
              <label className="block mb-2">Email</label>
              <input
                type="email"
                name="primaryEmail"
                placeholder="name@gmail.com"
                value={newAdmin.primaryEmail}
                onChange={handleNewAdminChange}
                className="w-full px-4 py-2 border rounded-lg"
              />
            </div>

            <div>
              <label className="block mb-2">Role</label>
              <select
                name="role"
                value={newAdmin.role}
                onChange={handleNewAdminChange}
                className="w-full px-4 py-2 border rounded-lg text-gray-600"
              >
                <option value="admin">Admin</option>
                <option value="superadmin">Super Admin</option>
              </select>
            </div>

            <div>
              <label className="block mb-2">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="********"
                  value={newAdmin.password}
                  onChange={handleNewAdminChange}
                  className="w-full px-4 py-2 border rounded-lg pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                >
                  {showPassword ? <BsEyeSlash size={20} /> : <BsEye size={20} />}
                </button>
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-4">
              <button onClick={() => setIsAddModalOpen(false)} className="px-6 py-2 border rounded-lg hover:bg-gray-50">
                Cancel
              </button>
              <button
                className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90"
                onClick={handleAddAdmin}
                disabled={loading}
              >
                {loading ? "Adding..." : "Add Admin"}
              </button>
            </div>
          </div>
        </div>
      </Modal>

      {/* Edit Admin Modal */}
      <Modal
        isOpen={isEditModalOpen}
        onRequestClose={() => setIsEditModalOpen(false)}
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg md:w-[500px] w-[95vw]"
        overlayClassName="fixed inset-0 bg-black/50"
      >
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl">Edit Admin User</h2>
            <button onClick={() => setIsEditModalOpen(false)} className="text-gray-400 hover:text-gray-600">
              ✕
            </button>
          </div>

          {selectedAdmin && (
            <div className="space-y-4">
              <div>
                <label className="block mb-2">First Name</label>
                <input
                  type="text"
                  value={selectedAdmin.forename}
                  onChange={(e) => setSelectedAdmin({ ...selectedAdmin, forename: e.target.value })}
                  className="w-full px-4 py-2 border rounded-lg"
                />
              </div>

              <div>
                <label className="block mb-2">Last Name</label>
                <input
                  type="text"
                  value={selectedAdmin.surname}
                  onChange={(e) => setSelectedAdmin({ ...selectedAdmin, surname: e.target.value })}
                  className="w-full px-4 py-2 border rounded-lg"
                />
              </div>

              <div>
                <label className="block mb-2">Email</label>
                <input
                  type="email"
                  value={selectedAdmin.primaryEmail}
                  onChange={(e) => setSelectedAdmin({ ...selectedAdmin, primaryEmail: e.target.value })}
                  className="w-full px-4 py-2 border rounded-lg"
                />
              </div>

              <div>
                <label className="block mb-2">Role</label>
                <select
                  className="w-full px-4 py-2 border rounded-lg text-gray-600"
                  value={selectedAdmin.role}
                  onChange={(e) => setSelectedAdmin({ ...selectedAdmin, role: e.target.value })}
                >
                  <option value="admin">Admin</option>
                  <option value="superadmin">Super Admin</option>
                </select>
              </div>

              <div>
                <label className="block mb-2">Update Password (leave blank to keep current)</label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="********"
                    value={selectedAdmin.password || ""}
                    onChange={(e) => setSelectedAdmin({ ...selectedAdmin, password: e.target.value })}
                    className="w-full px-4 py-2 border rounded-lg pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                  >
                    {showPassword ? <BsEyeSlash size={20} /> : <BsEye size={20} />}
                  </button>
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <button
                  onClick={() => setIsEditModalOpen(false)}
                  className="px-6 py-2 border rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90"
                  onClick={handleUpdateAdmin}
                  disabled={loading}
                >
                  {loading ? "Updating..." : "Update Changes"}
                </button>
              </div>
            </div>
          )}
        </div>
      </Modal>

      {/* Delete Admin Modal */}
      <Modal
        isOpen={isDeleteModalOpen}
        onRequestClose={() => setIsDeleteModalOpen(false)}
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg md:w-[500px] w-[95vw]"
        overlayClassName="fixed inset-0 bg-black/50"
      >
        <div className="p-6">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center">
              <span className="text-red-500 text-xl">⚠</span>
            </div>
            <h2 className="text-xl">Delete Admin User</h2>
            <button onClick={() => setIsDeleteModalOpen(false)} className="text-gray-400 hover:text-gray-600 ml-auto">
              ✕
            </button>
          </div>

          <p className="text-gray-600 mb-8">
            Are you sure you want to delete this admin user? Deleting this user will permanently erase it from the
            system.
          </p>

          <div className="flex justify-end gap-3">
            <button
              onClick={() => setIsDeleteModalOpen(false)}
              className="px-6 py-2 border rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90"
              onClick={handleDeleteAdmin}
              disabled={loading}
            >
              {loading ? "Deleting..." : "Delete"}
            </button>
          </div>
        </div>
      </Modal>
    </div>
  )
}

export default AdminUsers
