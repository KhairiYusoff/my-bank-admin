'use client'

import { useState } from 'react'
import { useCustomers, useVerifyCustomer, User } from '@/lib/hooks'

export default function VerificationPage() {
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const [confirmModalOpen, setConfirmModalOpen] = useState(false)

  // Use React Query hooks
  const { data: customers, isLoading, error } = useCustomers()
  const verifyCustomer = useVerifyCustomer()

  // Handle customer verification
  const handleVerifyCustomer = () => {
    if (selectedUser) {
      verifyCustomer.mutate(
        selectedUser.id,
        {
          onSuccess: () => {
            setConfirmModalOpen(false)
            setSelectedUser(null)
          }
        }
      )
    }
  }

  // Open confirm modal
  const openConfirmModal = (user: User) => {
    setSelectedUser(user)
    setConfirmModalOpen(true)
  }

  // Filter unverified customers
  const unverifiedCustomers = Array.isArray(customers) 
    ? customers.filter(user => user.role === 'customer' && !user.isVerified)
    : []

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-lg">Loading customers...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
        <span className="block sm:inline">Error loading customers: {(error as Error).message}</span>
      </div>
    )
  }

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-6">Customer Verification</h2>
      
      {unverifiedCustomers.length === 0 ? (
        <div className="bg-white rounded-lg shadow p-6 text-center">
          <p className="text-gray-500">No unverified customers found.</p>
        </div>
      ) : (
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
                  Status
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Verification Status
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {unverifiedCustomers.map((user) => (
                <tr key={user.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{user.name}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{user.email}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      user.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {user.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                      Unverified
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button 
                      onClick={() => openConfirmModal(user)}
                      className="text-indigo-600 hover:text-indigo-900"
                    >
                      Verify Customer
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Confirm Modal */}
      {confirmModalOpen && selectedUser && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h3 className="text-lg font-medium mb-4">Verify Customer</h3>
            <p className="mb-4">Are you sure you want to verify {selectedUser.name}?</p>
            
            <div className="flex justify-end">
              <button
                onClick={() => setConfirmModalOpen(false)}
                className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md mr-2"
              >
                Cancel
              </button>
              <button
                onClick={handleVerifyCustomer}
                disabled={verifyCustomer.isPending}
                className="bg-primary-600 text-white px-4 py-2 rounded-md"
              >
                {verifyCustomer.isPending ? 'Processing...' : 'Verify'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
