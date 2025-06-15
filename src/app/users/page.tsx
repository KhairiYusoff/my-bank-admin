'use client'

import { useState } from 'react'
import { useCustomers, useUpdateUserStatus, useUpdateUserRole, User } from '@/lib/hooks'

export default function UsersPage() {
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const [statusModalOpen, setStatusModalOpen] = useState(false)
  const [roleModalOpen, setRoleModalOpen] = useState(false)
  const [newStatus, setNewStatus] = useState('')
  const [newRole, setNewRole] = useState('')

  // Use React Query hooks
  const { data: customers, isLoading, error } = useCustomers()
  const updateUserStatus = useUpdateUserStatus()
  const updateUserRole = useUpdateUserRole()

  // Handle status update
  const handleStatusUpdate = () => {
    if (selectedUser && newStatus) {
      updateUserStatus.mutate(
        { userId: selectedUser.id, status: newStatus },
        {
          onSuccess: () => {
            setStatusModalOpen(false)
            setSelectedUser(null)
            setNewStatus('')
          }
        }
      )
    }
  }

  // Handle role update
  const handleRoleUpdate = () => {
    if (selectedUser && newRole) {
      updateUserRole.mutate(
        { userId: selectedUser.id, role: newRole },
        {
          onSuccess: () => {
            setRoleModalOpen(false)
            setSelectedUser(null)
            setNewRole('')
          }
        }
      )
    }
  }

  // Open status modal
  const openStatusModal = (user: User) => {
    setSelectedUser(user)
    setNewStatus(user.status)
    setStatusModalOpen(true)
  }

  // Open role modal
  const openRoleModal = (user: User) => {
    setSelectedUser(user)
    setNewRole(user.role)
    setRoleModalOpen(true)
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-lg">Loading users...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
        <span className="block sm:inline">Error loading users: {(error as Error).message}</span>
      </div>
    )
  }

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-6">User Management</h2>
      
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Email
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Role
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {Array.isArray(customers) && customers.map((user) => (
              <tr key={user.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{user.name}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">{user.email}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{user.role}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    user.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {user.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button 
                    onClick={() => openStatusModal(user)}
                    className="text-indigo-600 hover:text-indigo-900 mr-4"
                  >
                    Update Status
                  </button>
                  <button 
                    onClick={() => openRoleModal(user)}
                    className="text-indigo-600 hover:text-indigo-900"
                  >
                    Update Role
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Status Update Modal */}
      {statusModalOpen && selectedUser && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h3 className="text-lg font-medium mb-4">Update User Status</h3>
            <p className="mb-4">Updating status for: {selectedUser.name}</p>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
              <select
                value={newStatus}
                onChange={(e) => setNewStatus(e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2"
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="suspended">Suspended</option>
              </select>
            </div>
            
            <div className="flex justify-end">
              <button
                onClick={() => setStatusModalOpen(false)}
                className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md mr-2"
              >
                Cancel
              </button>
              <button
                onClick={handleStatusUpdate}
                disabled={updateUserStatus.isPending}
                className="bg-primary-600 text-white px-4 py-2 rounded-md"
              >
                {updateUserStatus.isPending ? 'Updating...' : 'Update Status'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Role Update Modal */}
      {roleModalOpen && selectedUser && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h3 className="text-lg font-medium mb-4">Update User Role</h3>
            <p className="mb-4">Updating role for: {selectedUser.name}</p>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Role</label>
              <select
                value={newRole}
                onChange={(e) => setNewRole(e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2"
              >
                <option value="customer">Customer</option>
                <option value="banker">Banker</option>
                <option value="admin">Admin</option>
              </select>
            </div>
            
            <div className="flex justify-end">
              <button
                onClick={() => setRoleModalOpen(false)}
                className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md mr-2"
              >
                Cancel
              </button>
              <button
                onClick={handleRoleUpdate}
                disabled={updateUserRole.isPending}
                className="bg-primary-600 text-white px-4 py-2 rounded-md"
              >
                {updateUserRole.isPending ? 'Updating...' : 'Update Role'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
