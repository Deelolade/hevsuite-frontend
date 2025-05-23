"use client"

import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { BiSearch } from "react-icons/bi"
import Modal from "react-modal"
import { getAllRoles, createRole, updateRole, deleteRole } from "../../store/permission/permissionSlice"
import { toast } from "react-toastify"
import { Loader } from "lucide-react"
import LoadingSpinner from '../../components/Spinner';

// Set app element for accessibility
Modal.setAppElement("#root")

const Permissions = () => {
  const dispatch = useDispatch()
  const { roles, loading } = useSelector((state) => state.permissions)

  const [searchQuery, setSearchQuery] = useState("")
  const [isCreateRoleOpen, setIsCreateRoleOpen] = useState(false)
  const [isDeleteRoleOpen, setIsDeleteRoleOpen] = useState(false)
  const [isConfirmDeleteOpen, setIsConfirmDeleteOpen] = useState(false)

  const [newRole, setNewRole] = useState({
    role: "",
    permissions: [],
  })

  const [selectedRole, setSelectedRole] = useState(null)

  // Available permissions
  const availablePermissions = [
    { name: "Dashboard", id: "Dashboard" },
    { name: "User Management", id: "User Management" },
    { name: "Approve & Decline Verification", id: "Approve & Decline Verification" },
    { name: "Edit & Delete Admins", id: "Edit & Delete Admins" },
    { name: "Add Payment Processor", id: "Add Payment Processor" },
    { name: "Newsrooms", id: "Newsrooms" },
    { name: "Events Management", id: "Events Management" },
  ]

  useEffect(() => {
    dispatch(getAllRoles())
  }, [dispatch])

  // Filter roles based on search query
  const filteredRoles = roles.filter((role) => role.role.toLowerCase().includes(searchQuery.toLowerCase()))

  const handleCreateRole = async () => {
    if (!newRole.role) {
      toast.error("Role name is required")
      return
    }

    try {
      await dispatch(createRole(newRole)).unwrap()
      setIsCreateRoleOpen(false)
      setNewRole({ role: "", permissions: [] })
      toast.success("Role created successfully")
    } catch (error) {
      toast.error(error.message || "Failed to create role")
    }
  }

  // Fix the handleUpdatePermissions function to correctly update permissions
  const handleUpdatePermissions = async (role, permissionId) => {
    const updatedPermissions = [...role.permissions]

    if (updatedPermissions.includes(permissionId)) {
      // Remove permission
      const index = updatedPermissions.indexOf(permissionId)
      updatedPermissions.splice(index, 1)
    } else {
      // Add permission
      updatedPermissions.push(permissionId)
    }

    try {
      await dispatch(
        updateRole({
          id: role._id,
          data: { permissions: updatedPermissions },
        }),
      ).unwrap()
      toast.success("Permissions updated successfully")
    } catch (error) {
      toast.error(error.message || "Failed to update permissions")
    }
  }

  const handleDeleteRole = async () => {
    if (!selectedRole) return

    try {
      await dispatch(deleteRole(selectedRole._id)).unwrap()
      setIsConfirmDeleteOpen(false)
      setIsDeleteRoleOpen(false)
      toast.success("Role deleted successfully")
    } catch (error) {
      toast.error(error.message || "Failed to delete role")
    }
  }

  const togglePermission = (permissionId) => {
    setNewRole((prev) => {
      const updatedPermissions = [...prev.permissions]

      if (updatedPermissions.includes(permissionId)) {
        // Remove permission
        const index = updatedPermissions.indexOf(permissionId)
        updatedPermissions.splice(index, 1)
      } else {
        // Add permission
        updatedPermissions.push(permissionId)
      }

      return { ...prev, permissions: updatedPermissions }
    })
  }

  if (loading && roles.length === 0) {
    return (
      <div className="flex justify-center items-center h-64">
        <LoadingSpinner className="animate-spin h-8 w-8 text-primary" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="md:flex justify-between items-center mb-6">
        <h2 className="text-xl">{filteredRoles.length} Roles</h2>
        <div className="md:flex grid grid-cols-2 items-center gap-4">
          <div className="relative md:mt-0 mt-4 col-span-2">
            <BiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search"
              className="pl-10 pr-4 py-2 border rounded-lg w-[300px]"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <button className="px-6 py-2 bg-primary text-white rounded-lg" onClick={() => setIsCreateRoleOpen(true)}>
            Create New Role
          </button>
          <button className="px-6 py-2 bg-primary text-white rounded-lg" onClick={() => setIsDeleteRoleOpen(true)}>
            Delete Role
          </button>
        </div>
      </div>

      {/* Permissions Table */}
      <div className="bg-white rounded-lg border w-[90vw] md:w-full overflow-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="text-left py-4 px-6">Permission</th>
              {filteredRoles.map((role) => (
                <th key={role._id} className="text-center py-4 px-6">
                  {role.role}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {availablePermissions.map((permission) => (
              <tr key={permission.id} className="border-b">
                <td className="py-4 px-6">{permission.name}</td>
                {filteredRoles.map((role) => (
                  <td key={`${role._id}-${permission.id}`} className="text-center py-4 px-6">
                    <label className="inline-flex items-center justify-center">
                      <input
                        type="checkbox"
                        checked={role.permissions.includes(permission.id)}
                        onChange={() => handleUpdatePermissions(role, permission.id)}
                        className="hidden peer"
                      />
                      <div className="w-5 h-5 border border-gray-300 rounded flex items-center justify-center peer-checked:bg-primary peer-checked:border-primary cursor-pointer">
                        {role.permissions.includes(permission.id) && (
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

      {/* Create Role Modal */}
      <Modal
        isOpen={isCreateRoleOpen}
        onRequestClose={() => setIsCreateRoleOpen(false)}
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg md:w-[500px] w-[95vw]"
        overlayClassName="fixed inset-0 bg-black/50"
      >
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl">Create Role</h2>
            <button onClick={() => setIsCreateRoleOpen(false)} className="text-gray-400 hover:text-gray-600">
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
                value={newRole.role}
                onChange={(e) => setNewRole({ ...newRole, role: e.target.value })}
              />
            </div>

            <div className="grid grid-cols-3 gap-4">
              {availablePermissions.map((permission) => (
                <label key={permission.id} className="flex items-start gap-2">
                  <input
                    type="checkbox"
                    className="mt-1 rounded border-gray-300"
                    checked={newRole.permissions.includes(permission.id)}
                    onChange={() => togglePermission(permission.id)}
                  />
                  <span>{permission.name}</span>
                </label>
              ))}
            </div>

            <div className="flex justify-end gap-3 pt-4">
              <button
                onClick={() => setIsCreateRoleOpen(false)}
                className="px-6 py-2 border rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90"
                onClick={handleCreateRole}
                disabled={loading}
              >
                {loading ? "Creating..." : "Create Role"}
              </button>
            </div>
          </div>
        </div>
      </Modal>

      {/* Delete Role Modal */}
      <Modal
        isOpen={isDeleteRoleOpen}
        onRequestClose={() => setIsDeleteRoleOpen(false)}
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg md:w-[500px] w-[95vw]"
        overlayClassName="fixed inset-0 bg-black/50"
      >
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl">Remove Role</h2>
            <button onClick={() => setIsDeleteRoleOpen(false)} className="text-gray-400 hover:text-gray-600">
              ✕
            </button>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block mb-2">Select Role Name</label>
              <select
                className="w-full px-4 py-2 border rounded-lg"
                value={selectedRole?._id || ""}
                onChange={(e) => {
                  const role = roles.find((r) => r._id === e.target.value)
                  setSelectedRole(role || null)
                }}
              >
                <option value="">Select a role</option>
                {roles.map((role) => (
                  <option key={role._id} value={role._id}>
                    {role.role}
                  </option>
                ))}
              </select>
            </div>

            {selectedRole && (
              <div className="grid grid-cols-3 gap-4">
                {availablePermissions.map((permission) => (
                  <label key={permission.id} className="flex items-start gap-2">
                    <input
                      type="checkbox"
                      className="mt-1 rounded border-gray-300"
                      checked={selectedRole.permissions.includes(permission.id)}
                      disabled
                    />
                    <span>{permission.name}</span>
                  </label>
                ))}
              </div>
            )}

            <div className="flex justify-end gap-3 pt-4">
              <button
                onClick={() => setIsDeleteRoleOpen(false)}
                className="px-6 py-2 border rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90"
                onClick={() => setIsConfirmDeleteOpen(true)}
                disabled={!selectedRole}
              >
                Remove Role
              </button>
            </div>
          </div>
        </div>
      </Modal>

      {/* Confirm Delete Modal */}
      <Modal
        isOpen={isConfirmDeleteOpen}
        onRequestClose={() => setIsConfirmDeleteOpen(false)}
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg md:w-[500px] w-[95vw]"
        overlayClassName="fixed inset-0 bg-black/50"
      >
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <span className="text-red-500">⚠</span>
              Remove Role
            </h2>
            <button onClick={() => setIsConfirmDeleteOpen(false)} className="text-gray-400 hover:text-gray-600">
              ✕
            </button>
          </div>
          <div className="space-y-6">
            <p className="text-gray-600">
              Are you sure you want to remove the role "{selectedRole?.role}"? This action cannot be undone.
            </p>
            <div className="flex justify-end gap-3">
              <button onClick={() => setIsConfirmDeleteOpen(false)} className="px-6 py-2 border rounded-lg text-sm">
                Cancel
              </button>
              <button
                onClick={handleDeleteRole}
                className="px-6 py-2 bg-primary text-white rounded-lg text-sm"
                disabled={loading}
              >
                {loading ? "Removing..." : "Remove"}
              </button>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  )
}

export default Permissions
