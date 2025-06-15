'use client'

import { useState } from 'react'
import { usePendingApplications, useApproveApplication, PendingApplication } from '@/lib/hooks'

export default function ApplicationsPage() {
  const [selectedApplication, setSelectedApplication] = useState<PendingApplication | null>(null)
  const [confirmModalOpen, setConfirmModalOpen] = useState(false)

  // Use React Query hooks
  const { data: applications, isLoading, error } = usePendingApplications()
  const approveApplication = useApproveApplication()

  // Handle application approval
  const handleApproveApplication = () => {
    if (selectedApplication) {
      approveApplication.mutate(
        selectedApplication.userId,
        {
          onSuccess: () => {
            setConfirmModalOpen(false)
            setSelectedApplication(null)
          }
        }
      )
    }
  }

  // Open confirm modal
  const openConfirmModal = (application: PendingApplication) => {
    setSelectedApplication(application)
    setConfirmModalOpen(true)
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-lg">Loading applications...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
        <span className="block sm:inline">Error loading applications: {(error as Error).message}</span>
      </div>
    )
  }

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-6">Pending Applications</h2>
      
      {Array.isArray(applications) && applications.length === 0 ? (
        <div className="bg-white rounded-lg shadow p-6 text-center">
          <p className="text-gray-500">No pending applications found.</p>
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
                  Submitted At
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {Array.isArray(applications) && applications.map((application) => (
                <tr key={application.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{application.name}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{application.email}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      application.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 
                      application.status === 'approved' ? 'bg-green-100 text-green-800' : 
                      'bg-red-100 text-red-800'
                    }`}>
                      {application.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">
                      {new Date(application.submittedAt).toLocaleString()}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    {application.status === 'pending' && (
                      <button 
                        onClick={() => openConfirmModal(application)}
                        className="text-indigo-600 hover:text-indigo-900"
                      >
                        Approve Application
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Confirm Modal */}
      {confirmModalOpen && selectedApplication && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h3 className="text-lg font-medium mb-4">Approve Application</h3>
            <p className="mb-4">Are you sure you want to approve the application for {selectedApplication.name}?</p>
            
            <div className="flex justify-end">
              <button
                onClick={() => setConfirmModalOpen(false)}
                className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md mr-2"
              >
                Cancel
              </button>
              <button
                onClick={handleApproveApplication}
                disabled={approveApplication.isPending}
                className="bg-primary-600 text-white px-4 py-2 rounded-md"
              >
                {approveApplication.isPending ? 'Processing...' : 'Approve'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
