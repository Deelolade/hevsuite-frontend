import React, { useState } from "react";
import { BiSearch } from "react-icons/bi";
import Modal from "react-modal";

const Permissions = () => {
  const [isCreateRoleOpen, setIsCreateRoleOpen] = useState(false);
  const [newRolePermissions, setNewRolePermissions] = useState([]);
  const [isDeleteRoleOpen, setIsDeleteRoleOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState("");
  const roles = [
    "Super Admin",
    "Marketing Manager",
    "Customer Support",
    "Sales Representative",
  ];

  const permissions = [
    { name: "Dashboard", id: 1 },
    { name: "User Management", id: 2 },
    { name: "Approve & Decline Verification", id: 3 },
    { name: "Edit & Delete Admins", id: 4 },
    { name: "Add Payment Processor", id: 5 },
    { name: "Newsrooms", id: 6 },
    { name: "Events Management", id: 7 },
  ];

  const [permissionsMap, setPermissionsMap] = useState({
    "Super Admin": [1, 2, 3, 4, 5, 6, 7],
    "Marketing Manager": [1, 2, 3, 4],
    "Customer Support": [1, 2, 3, 4],
    "Sales Representative": [1, 2],
  });

  const togglePermission = (role, permissionId) => {
    setPermissionsMap((prev) => ({
      ...prev,
      [role]: prev[role].includes(permissionId)
        ? prev[role].filter((id) => id !== permissionId)
        : [...prev[role], permissionId],
    }));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl">8 Admin Users</h2>
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
            className="px-6 py-2 bg-primary text-white rounded-lg"
            onClick={() => setIsCreateRoleOpen(true)}
          >
            Create New Role
          </button>
          <button
            className="px-6 py-2 bg-primary text-white rounded-lg"
            onClick={() => setIsDeleteRoleOpen(true)}
          >
            Delete Role
          </button>
        </div>
      </div>

      {/* Permissions Table */}
      <div className="bg-white rounded-lg border">
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="text-left py-4 px-6">Permission</th>
              {roles.map((role) => (
                <th key={role} className="text-center py-4 px-6">
                  {role}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {permissions.map((permission) => (
              <tr key={permission.id} className="border-b">
                <td className="py-4 px-6">{permission.name}</td>
                {roles.map((role) => (
                  <td
                    key={`${role}-${permission.id}`}
                    className="text-center py-4 px-6"
                  >
                    <label className="inline-flex items-center justify-center">
                      <input
                        type="checkbox"
                        checked={permissionsMap[role]?.includes(permission.id)}
                        onChange={() => togglePermission(role, permission.id)}
                        className="hidden peer"
                      />
                      <div className="w-5 h-5 border border-gray-300 rounded flex items-center justify-center peer-checked:bg-primary peer-checked:border-primary">
                        {permissionsMap[role]?.includes(permission.id) && (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-3.5 w-3.5 text-white"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                        )}
                      </div>
                    </label>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Modal
        isOpen={isCreateRoleOpen}
        onRequestClose={() => setIsCreateRoleOpen(false)}
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg w-[500px]"
        overlayClassName="fixed inset-0 bg-black/50"
      >
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl">Create Role</h2>
            <button
              onClick={() => setIsCreateRoleOpen(false)}
              className="text-gray-400 hover:text-gray-600"
            >
              ✕
            </button>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block mb-2">Role Name</label>
              <input
                type="text"
                placeholder="Backend Engineer"
                className="w-full px-4 py-2 border rounded-lg"
              />
            </div>

            <div className="grid grid-cols-3 gap-4">
              <label className="flex items-start gap-2">
                <input
                  type="checkbox"
                  className="mt-1 rounded border-gray-300"
                  onChange={(e) => {
                    if (e.target.checked) {
                      setNewRolePermissions([...newRolePermissions, 1]);
                    } else {
                      setNewRolePermissions(
                        newRolePermissions.filter((id) => id !== 1)
                      );
                    }
                  }}
                />
                <span>Dashboard</span>
              </label>

              <label className="flex items-start gap-2">
                <input
                  type="checkbox"
                  className="mt-1 rounded border-gray-300"
                />
                <span>UsersManagement</span>
              </label>

              <label className="flex items-start gap-2">
                <input
                  type="checkbox"
                  className="mt-1 rounded border-gray-300"
                />
                <span>Edit/Delete Admins</span>
              </label>

              <label className="flex items-start gap-2">
                <input
                  type="checkbox"
                  className="mt-1 rounded border-gray-300"
                />
                <span>Verification</span>
              </label>

              <label className="flex items-start gap-2">
                <input
                  type="checkbox"
                  className="mt-1 rounded border-gray-300"
                />
                <span>Add Payment Processor</span>
              </label>

              <label className="flex items-start gap-2">
                <input
                  type="checkbox"
                  className="mt-1 rounded border-gray-300"
                />
                <span>Newsrooms</span>
              </label>

              <label className="flex items-start gap-2">
                <input
                  type="checkbox"
                  className="mt-1 rounded border-gray-300"
                />
                <span>Events Management</span>
              </label>
            </div>

            <div className="flex justify-end gap-3 pt-4">
              <button
                onClick={() => setIsCreateRoleOpen(false)}
                className="px-6 py-2 border rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90">
                Create Role
              </button>
            </div>
          </div>
        </div>
      </Modal>

      <Modal
        isOpen={isDeleteRoleOpen}
        onRequestClose={() => setIsDeleteRoleOpen(false)}
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg w-[500px]"
        overlayClassName="fixed inset-0 bg-black/50"
      >
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl">Remove Role</h2>
            <button
              onClick={() => setIsDeleteRoleOpen(false)}
              className="text-gray-400 hover:text-gray-600"
            >
              ✕
            </button>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block mb-2">Select Role Name</label>
              <select
                className="w-full px-4 py-2 border rounded-lg"
                value={selectedRole}
                onChange={(e) => setSelectedRole(e.target.value)}
              >
                <option value="">Backend Engineer</option>
                {roles.map((role) => (
                  <option key={role} value={role}>
                    {role}
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <label className="flex items-start gap-2">
                <input
                  type="checkbox"
                  className="mt-1 rounded border-gray-300"
                  checked={true}
                  disabled
                />
                <span>Dashboard</span>
              </label>

              <label className="flex items-start gap-2">
                <input
                  type="checkbox"
                  className="mt-1 rounded border-gray-300"
                  checked={true}
                  disabled
                />
                <span>Verification</span>
              </label>

              <label className="flex items-start gap-2">
                <input
                  type="checkbox"
                  className="mt-1 rounded border-gray-300"
                  checked={true}
                  disabled
                />
                <span>Edit/Delete Admins</span>
              </label>

              <label className="flex items-start gap-2">
                <input
                  type="checkbox"
                  className="mt-1 rounded border-gray-300"
                  checked={true}
                  disabled
                />
                <span>Add Payment Processor</span>
              </label>

              <label className="flex items-start gap-2">
                <input
                  type="checkbox"
                  className="mt-1 rounded border-gray-300"
                  checked={true}
                  disabled
                />
                <span>Newsrooms</span>
              </label>

              <label className="flex items-start gap-2">
                <input
                  type="checkbox"
                  className="mt-1 rounded border-gray-300"
                  checked={true}
                  disabled
                />
                <span>Events Management</span>
              </label>
            </div>

            <div className="flex justify-end gap-3 pt-4">
              <button
                onClick={() => setIsDeleteRoleOpen(false)}
                className="px-6 py-2 border rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90">
                Remove Role
              </button>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Permissions;
