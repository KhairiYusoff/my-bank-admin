'use client'

import { useState, useEffect } from 'react'
import { transactionService } from '@/lib/api/transactionService'
import { Transaction } from '@/types'
import Button from '@/components/ui/Button'
import Card from '@/components/ui/Card'
import Table from '@/components/ui/Table'

export default function TransactionsPage() {
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedType, setSelectedType] = useState('')
  const [selectedStatus, setSelectedStatus] = useState('')
  const [dateFrom, setDateFrom] = useState('')
  const [dateTo, setDateTo] = useState('')

  useEffect(() => {
    fetchTransactions()
  }, [currentPage, selectedType, selectedStatus])

  const fetchTransactions = async () => {
    setIsLoading(true)
    try {
      // In a real implementation, we would use the actual API
      // For now, we'll simulate with mock data
      // const response = await transactionService.getAllTransactions(currentPage, 10)
      
      // Mock data for demonstration
      setTimeout(() => {
        const mockTransactions = [
          {
            _id: '1',
            transactionType: 'deposit',
            amount: 1000,
            toAccount: '1001-2345-6789',
            description: 'Salary deposit',
            status: 'completed',
            createdAt: '2023-06-15T08:30:00Z',
            updatedAt: '2023-06-15T08:30:00Z'
          },
          {
            _id: '2',
            transactionType: 'withdrawal',
            amount: 500,
            fromAccount: '1001-2345-6789',
            description: 'ATM withdrawal',
            status: 'completed',
            createdAt: '2023-06-14T14:20:00Z',
            updatedAt: '2023-06-14T14:20:00Z'
          },
          {
            _id: '3',
            transactionType: 'transfer',
            amount: 750,
            fromAccount: '1001-2345-6789',
            toAccount: '1001-3456-7890',
            description: 'Monthly rent',
            status: 'completed',
            createdAt: '2023-06-13T10:15:00Z',
            updatedAt: '2023-06-13T10:15:00Z'
          },
          {
            _id: '4',
            transactionType: 'deposit',
            amount: 2500,
            toAccount: '1001-4567-8901',
            description: 'Business income',
            status: 'pending',
            createdAt: '2023-06-12T16:40:00Z',
            updatedAt: '2023-06-12T16:40:00Z'
          },
          {
            _id: '5',
            transactionType: 'withdrawal',
            amount: 300,
            fromAccount: '1001-3456-7890',
            description: 'Online purchase',
            status: 'completed',
            createdAt: '2023-06-11T09:30:00Z',
            updatedAt: '2023-06-11T09:30:00Z'
          }
        ]

        // Filter by transaction type if selected
        let filteredTransactions = mockTransactions
        if (selectedType) {
          filteredTransactions = filteredTransactions.filter(transaction => transaction.transactionType === selectedType)
        }
        
        // Filter by status if selected
        if (selectedStatus) {
          filteredTransactions = filteredTransactions.filter(transaction => transaction.status === selectedStatus)
        }
        
        // Filter by date range if provided
        if (dateFrom) {
          const fromDate = new Date(dateFrom)
          filteredTransactions = filteredTransactions.filter(
            transaction => new Date(transaction.createdAt) >= fromDate
          )
        }
        
        if (dateTo) {
          const toDate = new Date(dateTo)
          toDate.setHours(23, 59, 59, 999) // End of the day
          filteredTransactions = filteredTransactions.filter(
            transaction => new Date(transaction.createdAt) <= toDate
          )
        }
        
        // Filter by search term if provided
        if (searchTerm) {
          const term = searchTerm.toLowerCase()
          filteredTransactions = filteredTransactions.filter(
            transaction => 
              (transaction.fromAccount && transaction.fromAccount.toLowerCase().includes(term)) || 
              (transaction.toAccount && transaction.toAccount.toLowerCase().includes(term)) ||
              transaction.description.toLowerCase().includes(term)
          )
        }

        setTransactions(filteredTransactions)
        setTotalPages(Math.ceil(filteredTransactions.length / 10))
        setIsLoading(false)
      }, 800)
    } catch (error) {
      console.error('Error fetching transactions:', error)
      setIsLoading(false)
    }
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    setCurrentPage(1)
    fetchTransactions()
  }

  const handleUpdateStatus = async (transactionId: string, newStatus: string) => {
    try {
      // In a real implementation, we would call the API
      // await transactionService.updateTransactionStatus(transactionId, newStatus)
      
      // For now, update the local state
      setTransactions(transactions.map(transaction => 
        transaction._id === transactionId ? { ...transaction, status: newStatus } : transaction
      ))
    } catch (error) {
      console.error('Error updating transaction status:', error)
    }
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount)
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date)
  }

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800'
      case 'pending':
        return 'bg-yellow-100 text-yellow-800'
      case 'failed':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const columns = [
    { 
      header: 'Transaction ID', 
      accessor: (transaction: Transaction) => (
        <span className="font-mono text-xs">{transaction._id}</span>
      )
    },
    { 
      header: 'Type', 
      accessor: (transaction: Transaction) => (
        <span className="capitalize">{transaction.transactionType}</span>
      )
    },
    { 
      header: 'Amount', 
      accessor: (transaction: Transaction) => formatCurrency(transaction.amount)
    },
    { 
      header: 'From/To', 
      accessor: (transaction: Transaction) => (
        <div>
          {transaction.fromAccount && (
            <div className="text-sm">
              <span className="text-gray-500">From:</span> {transaction.fromAccount}
            </div>
          )}
          {transaction.toAccount && (
            <div className="text-sm">
              <span className="text-gray-500">To:</span> {transaction.toAccount}
            </div>
          )}
        </div>
      )
    },
    { 
      header: 'Description', 
      accessor: 'description'
    },
    { 
      header: 'Date', 
      accessor: (transaction: Transaction) => formatDate(transaction.createdAt)
    },
    { 
      header: 'Status', 
      accessor: (transaction: Transaction) => (
        <select
          value={transaction.status}
          onChange={(e) => handleUpdateStatus(transaction._id, e.target.value)}
          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
        >
          <option value="completed">Completed</option>
          <option value="pending">Pending</option>
          <option value="failed">Failed</option>
        </select>
      )
    },
    { 
      header: 'Actions', 
      accessor: (transaction: Transaction) => (
        <div className="flex space-x-2">
          <Button 
            variant="primary" 
            size="sm"
            onClick={() => alert(`View details for transaction ${transaction._id}`)}
          >
            View
          </Button>
        </div>
      )
    }
  ]

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Transaction Management</h2>
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
              placeholder="Search by account or description"
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
            />
          </div>
          
          <div className="w-40">
            <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-1">
              Type
            </label>
            <select
              id="type"
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
            >
              <option value="">All Types</option>
              <option value="deposit">Deposit</option>
              <option value="withdrawal">Withdrawal</option>
              <option value="transfer">Transfer</option>
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
              <option value="completed">Completed</option>
              <option value="pending">Pending</option>
              <option value="failed">Failed</option>
            </select>
          </div>
          
          <div className="w-40">
            <label htmlFor="dateFrom" className="block text-sm font-medium text-gray-700 mb-1">
              Date From
            </label>
            <input
              type="date"
              id="dateFrom"
              value={dateFrom}
              onChange={(e) => setDateFrom(e.target.value)}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
            />
          </div>
          
          <div className="w-40">
            <label htmlFor="dateTo" className="block text-sm font-medium text-gray-700 mb-1">
              Date To
            </label>
            <input
              type="date"
              id="dateTo"
              value={dateTo}
              onChange={(e) => setDateTo(e.target.value)}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
            />
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
        data={transactions}
        keyExtractor={(transaction) => transaction._id}
        isLoading={isLoading}
        emptyMessage="No transactions found"
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
