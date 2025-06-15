'use client'

import { useState } from 'react'
import { useAllAccounts, useAirdropFunds, Account } from '@/lib/hooks'

export default function AccountsPage() {
  const [selectedAccount, setSelectedAccount] = useState<Account | null>(null)
  const [airdropModalOpen, setAirdropModalOpen] = useState(false)
  const [airdropAmount, setAirdropAmount] = useState<number>(0)

  // Use React Query hooks
  const { data: accounts, isLoading, error } = useAllAccounts()
  const airdropFunds = useAirdropFunds()

  // Handle airdrop
  const handleAirdrop = () => {
    if (selectedAccount && airdropAmount > 0) {
      airdropFunds.mutate(
        { userId: selectedAccount.userId, amount: airdropAmount },
        {
          onSuccess: () => {
            setAirdropModalOpen(false)
            setSelectedAccount(null)
            setAirdropAmount(0)
          }
        }
      )
    }
  }

  // Open airdrop modal
  const openAirdropModal = (account: Account) => {
    setSelectedAccount(account)
    setAirdropModalOpen(true)
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-lg">Loading accounts...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
        <span className="block sm:inline">Error loading accounts: {(error as Error).message}</span>
      </div>
    )
  }

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-6">Account Management</h2>
      
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Account Number
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                User ID
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Type
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Balance
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
            {Array.isArray(accounts) && accounts.map((account) => (
              <tr key={account.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{account.accountNumber}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">{account.userId}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{account.accountType}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">
                    {account.currency} {account.balance.toFixed(2)}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    account.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {account.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button 
                    onClick={() => openAirdropModal(account)}
                    className="text-indigo-600 hover:text-indigo-900"
                  >
                    Airdrop Funds
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Airdrop Modal */}
      {airdropModalOpen && selectedAccount && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h3 className="text-lg font-medium mb-4">Airdrop Funds</h3>
            <p className="mb-4">Airdrop to account: {selectedAccount.accountNumber}</p>
            <p className="mb-4">Current balance: {selectedAccount.currency} {selectedAccount.balance.toFixed(2)}</p>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Amount</label>
              <input
                type="number"
                min="0"
                step="0.01"
                value={airdropAmount}
                onChange={(e) => setAirdropAmount(parseFloat(e.target.value))}
                className="w-full border border-gray-300 rounded-md px-3 py-2"
              />
            </div>
            
            <div className="flex justify-end">
              <button
                onClick={() => setAirdropModalOpen(false)}
                className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md mr-2"
              >
                Cancel
              </button>
              <button
                onClick={handleAirdrop}
                disabled={airdropFunds.isPending || airdropAmount <= 0}
                className="bg-primary-600 text-white px-4 py-2 rounded-md"
              >
                {airdropFunds.isPending ? 'Processing...' : 'Airdrop Funds'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
