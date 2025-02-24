import React, { useState } from "react";
import { BiSearch } from "react-icons/bi";
import { BsPencil, BsTrash, BsEyeSlash, BsEye } from "react-icons/bs";
import Modal from "react-modal";

const AdminUsers = () => {
  const [selectedRows, setSelectedRows] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(6);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedAdmin, setSelectedAdmin] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const admins = [
    {
      id: 1,
      name: "Andrew Bojangles",
      email: "someone@gmail.com",
      role: "Super Admin",
      status: "Active",
      avatar: "/path/to/avatar.jpg",
    },
    // Duplicate for other rows
  ];

  const handleSelectRow = (id) => {
    setSelectedRows((prev) =>
      prev.includes(id) ? prev.filter((rowId) => rowId !== id) : [...prev, id]
    );
  };

  const handleEditClick = (admin) => {
    setSelectedAdmin(admin);
    setIsEditModalOpen(true);
  };

  const handleDeleteClick = (admin) => {
    setSelectedAdmin(admin);
    setIsDeleteModalOpen(true);
  };

  return (
    <div>
      {/* Header */}
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <h2 className="text-xl">8 Admin Users</h2>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative">
            <BiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search"
              className="pl-10 pr-4 py-2 border rounded-lg w-[300px]"
            />
          </div>
          <button
            className="px-6 py-2 bg-[#540A26] text-white rounded-lg"
            onClick={() => setIsAddModalOpen(true)}
          >
            Add Admin User
          </button>
          <button className="px-6 py-2 bg-[#540A26] text-white rounded-lg flex items-center gap-2">
            Export ↑
          </button>
        </div>
      </div>

      {/* Admin Grid */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="border rounded-lg p-6 flex items-center justify-center">
          <button className="text-[#540A26]">+ Add admin</button>
        </div>
        <div className="border rounded-lg p-4">
          <div className="flex justify-between mb-4">
            <img
              src="/path/to/avatar.jpg"
              alt="John"
              className="w-12 h-12 rounded-full"
            />
            <button className="text-gray-400">✕</button>
          </div>
          <h3 className="font-medium">John Johnsnon</h3>
          <p className="text-gray-500">CEO</p>
        </div>
        <div className="border rounded-lg p-4">
          <div className="flex justify-between mb-4">
            <img
              src="/path/to/avatar.jpg"
              alt="Jane"
              className="w-12 h-12 rounded-full"
            />
            <button className="text-gray-400">✕</button>
          </div>
          <h3 className="font-medium">Jane Cooper</h3>
          <p className="text-gray-500">Design Lead</p>
        </div>
      </div>

      {/* Admin Table */}
      <table className="w-full">
        <thead>
          <tr className="border-b">
            <th className="py-4 px-4 text-left">
              <input type="checkbox" className="rounded border-gray-300" />
            </th>
            <th className="py-4 text-left">User</th>
            <th className="py-4 text-left">Status</th>
            <th className="py-4 text-left">Email</th>
            <th className="py-4 text-left">Role</th>
            <th className="py-4 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {admins.map((admin) => (
            <tr key={admin.id} className="border-b">
              <td className="py-4 px-4">
                <input
                  type="checkbox"
                  checked={selectedRows.includes(admin.id)}
                  onChange={() => handleSelectRow(admin.id)}
                  className="rounded border-gray-300"
                />
              </td>
              <td className="py-4">
                <div className="flex items-center gap-3">
                  <img
                    src={admin.avatar}
                    alt={admin.name}
                    className="w-8 h-8 rounded-full"
                  />
                  <span>{admin.name}</span>
                </div>
              </td>
              <td className="py-4">
                <span className="text-green-500">{admin.status}</span>
              </td>
              <td className="py-4">{admin.email}</td>
              <td className="py-4">{admin.role}</td>
              <td className="py-4">
                <div className="flex items-center gap-2">
                  <button
                    className="text-[#540A26]"
                    onClick={() => handleEditClick(admin)}
                  >
                    <BsPencil size={18} />
                  </button>
                  <button
                    className="text-[#540A26]"
                    onClick={() => handleDeleteClick(admin)}
                  >
                    <BsTrash size={18} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="flex justify-between items-center">
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

      <Modal
        isOpen={isAddModalOpen}
        onRequestClose={() => setIsAddModalOpen(false)}
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg w-[500px]"
        overlayClassName="fixed inset-0 bg-black/50"
      >
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl">Add New Admin user</h2>
            <button
              onClick={() => setIsAddModalOpen(false)}
              className="text-gray-400 hover:text-gray-600"
            >
              ✕
            </button>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block mb-2">Full Name</label>
              <input
                type="text"
                placeholder="Name"
                className="w-full px-4 py-2 border rounded-lg"
              />
            </div>

            <div>
              <label className="block mb-2">Email</label>
              <input
                type="email"
                placeholder="name@gmail.com"
                className="w-full px-4 py-2 border rounded-lg"
              />
            </div>

            <div>
              <label className="block mb-2">Role</label>
              <select className="w-full px-4 py-2 border rounded-lg text-gray-600">
                <option value="">Select role</option>
                <option value="admin">Admin</option>
                <option value="super_admin">Super Admin</option>
              </select>
            </div>

            <div>
              <label className="block mb-2">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="********"
                  className="w-full px-4 py-2 border rounded-lg pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                >
                  {showPassword ? (
                    <BsEyeSlash size={20} />
                  ) : (
                    <BsEye size={20} />
                  )}
                </button>
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-4">
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="px-6 py-2 border rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button className="px-6 py-2 bg-[#540A26] text-white rounded-lg hover:bg-[#540A26]/90">
                Add Admin
              </button>
            </div>
          </div>
        </div>
      </Modal>

      <Modal
        isOpen={isEditModalOpen}
        onRequestClose={() => setIsEditModalOpen(false)}
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg w-[500px]"
        overlayClassName="fixed inset-0 bg-black/50"
      >
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl">Edit Admin User</h2>
            <button
              onClick={() => setIsEditModalOpen(false)}
              className="text-gray-400 hover:text-gray-600"
            >
              ✕
            </button>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block mb-2">Full Name</label>
              <input
                type="text"
                defaultValue={selectedAdmin?.name || "Moshood Adam"}
                className="w-full px-4 py-2 border rounded-lg"
              />
            </div>

            <div>
              <label className="block mb-2">Email</label>
              <input
                type="email"
                defaultValue={selectedAdmin?.email || "moshood@gmail.com"}
                className="w-full px-4 py-2 border rounded-lg"
              />
            </div>

            <div>
              <label className="block mb-2">Role</label>
              <select
                className="w-full px-4 py-2 border rounded-lg text-gray-600"
                defaultValue={selectedAdmin?.role || "Super Admin"}
              >
                <option value="Super Admin">Super Admin</option>
                <option value="Admin">Admin</option>
              </select>
            </div>

            <div>
              <label className="block mb-2">Update Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="********"
                  className="w-full px-4 py-2 border rounded-lg pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                >
                  {showPassword ? (
                    <BsEyeSlash size={20} />
                  ) : (
                    <BsEye size={20} />
                  )}
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
              <button className="px-6 py-2 bg-[#540A26] text-white rounded-lg hover:bg-[#540A26]/90">
                Update Changes
              </button>
            </div>
          </div>
        </div>
      </Modal>

      <Modal
        isOpen={isDeleteModalOpen}
        onRequestClose={() => setIsDeleteModalOpen(false)}
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg w-[500px]"
        overlayClassName="fixed inset-0 bg-black/50"
      >
        <div className="p-6">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center">
              <span className="text-red-500 text-xl">⚠</span>
            </div>
            <h2 className="text-xl">Delete Admin User</h2>
            <button
              onClick={() => setIsDeleteModalOpen(false)}
              className="text-gray-400 hover:text-gray-600 ml-auto"
            >
              ✕
            </button>
          </div>

          <p className="text-gray-600 mb-8">
            Are you sure you want to delete this admin user? Deleting this user
            will permanently erase it from the system.
          </p>

          <div className="flex justify-end gap-3">
            <button
              onClick={() => setIsDeleteModalOpen(false)}
              className="px-6 py-2 border rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>
            <button className="px-6 py-2 bg-[#540A26] text-white rounded-lg hover:bg-[#540A26]/90">
              Delete
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default AdminUsers;
