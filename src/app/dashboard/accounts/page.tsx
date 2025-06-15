'use client'

import { useState, useEffect } from 'react'
import { accountService } from '@/lib/api/accountService'
import { Account } from '@/types'
import Button from '@/components/ui/Button'
import Card from '@/components/ui/Card'
import Table from '@/components/ui/Table'

export default function AccountsPage() {
  const [accounts, setAccounts] = useState<Account[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedType, setSelectedType] = useState('')
  const [selectedStatus, setSelectedStatus] = useState('')

  useEffect(() => {
    fetchAccounts()
  }, [currentPage, selectedType, selectedStatus])

  const fetchAccounts = async () => {
    setIsLoading(true)
    try {
      // In a real implementation, we would use the actual API
      // For now, we'll simulate with mock data
      // const response = await accountService.getAllAccounts(currentPage, 10)
      
      // Mock data for demonstration
      setTimeout(() => {
        const mockAccounts = [
          {
            _id: '1',
            accountNumber: '1001-2345-6789',
            userId: 'user1',
            balance: 5000.75,
            accountType: 'savings',
            currency: 'USD',
            status: 'active',
            createdAt: '2023-01-15T08:30:00Z',
            updatedAt: '2023-06-10T14:20:00Z'
          },
          {
            _id: '2',
            accountNumber: '1001-3456-7890',
            userId: 'user2',
            balance: 12500.50,
            accountType: 'checking',
            currency: 'USD',
            status: 'active',
            createdAt: '2023-02-20T10:15:00Z',
            updatedAt: '2023-06-12T09:45:00Z'
          },
          {
            _id: '3',
            accountNumber: '1001-4567-8901',
            userId: 'user3',
            balance: 0,
            accountType: 'savings',
            currency: 'USD',
            status: 'inactive',
            createdAt: '2023-03-05T09:30:00Z',
            updatedAt: '2023-06-08T15:25:00Z'
          },
          {
            _id: '4',
            accountNumber: '1001-5678-9012',
            userId: 'user4',
            balance: 7800.25,
            accountType: 'checking',
            currency: 'USD',
            status: 'active',
            createdAt: '2023-05-12T11:20:00Z',
            updatedAt: '2023-06-14T08:10:00Z'
          },
          {
            _id: '5',
            accountNumber: '1001-6789-0123',
            userId: 'user5',
            balance: 25000,
            accountType: 'investment',
            currency: 'USD',
            status: 'active',
            createdAt: '2023-04-18T14:45:00Z',
            updatedAt: '2023-06-15T10:30:00Z'
          }
        ]

        // Filter by account type if selected
        let filteredAccounts = mockAccounts
        if (selectedType) {
          filteredAccounts = filteredAccounts.filter(account => account.accountType === selectedType)
        }
        
        // Filter by status if selected
        if (selectedStatus) {
          filteredAccounts = filteredAccounts.filter(account => account.status === selectedStatus)
        }
        
        // Filter by search term if provided
        if (searchTerm) {
          const term = searchTerm.toLowerCase()
          filteredAccounts = filteredAccounts.filter(
            account => account.accountNumber.toLowerCase().includes(term)
          )
        }

        setAccounts(filteredAccounts)
        setTotalPages(Math.ceil(filteredAccounts.length / 10))
        setIsLoading(false)
      }, 800)
    } catch (error) {
      console.error('Error fetching accounts:', error)
      setIsLoading(false)
    }
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    setCurrentPage(1)
    fetchAccounts()
  }

  const handleUpdateStatus = async (accountId: string, newStatus: string) => {
    try {
      // In a real implementation, we would call the API
      // await accountService.updateAccountStatus(accountId, newStatus)
      
      // For now, update the local state
      setAccounts(accounts.map(account => 
        account._id === accountId ? { ...account, status: newStatus } : account
      ))
    } catch (error) {
      console.error('Error updating account status:', error)
    }
  }

  const formatCurrency = (amount: number, currency: string) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency
    }).format(amount)
  }

  const columns = [
    { 
      header: 'Account Number', 
      accessor: 'accountNumber'
    },
    { 
      header: 'Type', 
      accessor: (account: Account) => (
        <span className="capitalize">{account.accountType}</span>
      )
    },
    { 
      header: 'Balance', 
      accessor: (account: Account) => formatCurrency(account.balance, account.currency)
    },
    { 
      header: 'Status', 
      accessor: (account: Account) => (
        <select
          value={account.status}
          onChange={(e) => handleUpdateStatus(account._id, e.target.value)}
          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
        >
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
          <option value="suspended">Suspended</option>
        </select>
      )
    },
    { 
      header: 'Created', 
      accessor: (account: Account) => new Date(account.createdAt).toLocaleDateString()
    },
    { 
      header: 'Actions', 
      accessor: (account: Account) => (
        <div className="flex space-x-2">
          <Button 
            variant="primary" 
            size="sm"
            onClick={() => alert(`View details for account ${account.accountNumber}`)}
          >
            View
          </Button>
          <Button 
            variant="success" 
            size="sm"
            onClick={() => alert(`Deposit to account ${account.accountNumber}`)}
          >
            Deposit
          </Button>
          <Button 
            variant="warning" 
            size="sm"
            onClick={() => alert(`Withdraw from account ${account.accountNumber}`)}
          >
            Withdraw
          </Button>
          <Button 
            variant="danger" 
            size="sm"
            onClick={() => {
              if (confirm(`Are you sure you want to delete account ${account.accountNumber}?`)) {
                alert(`Delete account: ${account.accountNumber}`)
              }
            }}
          >
            Delete
          </Button>
        </div>
      )
    }
  ]

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Account Management</h2>
        <Button variant="success" onClick={() => alert('Create new account')}>
          Create New Account
        </Button>
      </div>

      <Card className="mb-6">
        <form onSubmit={handleSearch} className="flex flex-wrap gap-4">
          <div className="flex-1 min-w-[200px]">
            <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">
              Search
            </label>
            <input
              type="text"
              id="search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by account number"
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
            />
          </div>
          
          <div className="w-40">
            <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-1">
              Account Type
            </label>
            <select
              id="type"
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
            >
              <option value="">All Types</option>
              <option value="savings">Savings</option>
              <option value="checking">Checking</option>
              <option value="investment">Investment</option>
            </select>
          </div>
          
          <div className="w-40">
            <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
              Status
            </label>
            <select
              id="status"
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
            >
              <option value="">All Statuses</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="suspended">Suspended</option>
            </select>
          </div>
          
          <div className="flex items-end">
            <Button type="submit" variant="primary">
              Search
            </Button>
          </div>
        </form>
      </Card>

      <Table
        columns={columns}
        data={accounts}
        keyExtractor={(account) => account._id}
        isLoading={isLoading}
        emptyMessage="No accounts found"
      />

      {totalPages > 1 && (
        <div className="mt-6 flex justify-between items-center">
          <div className="text-sm text-gray-700">
            Page {currentPage} of {totalPages}
          </div>
          <div className="flex space-x-2">
            <Button
              variant="secondary"
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              Previous
            </Button>
            <Button
              variant="secondary"
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
            >
              Next
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
