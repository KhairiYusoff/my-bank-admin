'use client'

import { useState, useEffect } from 'react'
import { userService } from '@/lib/api/userService'
import { User } from '@/types'
import Button from '@/components/ui/Button'
import Card from '@/components/ui/Card'
import Table from '@/components/ui/Table'

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedRole, setSelectedRole] = useState('')
  const [selectedStatus, setSelectedStatus] = useState('')

  useEffect(() => {
    fetchUsers()
  }, [currentPage, selectedRole, selectedStatus])

  const fetchUsers = async () => {
    setIsLoading(true)
    try {
      // In a real implementation, we would use the actual API
      // For now, we'll simulate with mock data
      // const response = await userService.getAllUsers(currentPage, 10)
      
      // Mock data for demonstration
      setTimeout(() => {
        const mockUsers = [
          {
            _id: '1',
            name: 'John Doe',
            email: 'john.doe@example.com',
            role: 'admin',
            status: 'active',
            createdAt: '2023-01-15T08:30:00Z',
            updatedAt: '2023-06-10T14:20:00Z'
          },
          {
            _id: '2',
            name: 'Jane Smith',
            email: 'jane.smith@example.com',
            role: 'banker',
            status: 'active',
            createdAt: '2023-02-20T10:15:00Z',
            updatedAt: '2023-06-12T09:45:00Z'
          },
          {
            _id: '3',
            name: 'Robert Johnson',
            email: 'robert.j@example.com',
            role: 'customer',
            status: 'pending',
            createdAt: '2023-06-01T16:40:00Z',
            updatedAt: '2023-06-01T16:40:00Z'
          },
          {
            _id: '4',
            name: 'Emily Davis',
            email: 'emily.davis@example.com',
            role: 'customer',
            status: 'active',
            createdAt: '2023-05-12T11:20:00Z',
            updatedAt: '2023-06-14T08:10:00Z'
          },
          {
            _id: '5',
            name: 'Michael Wilson',
            email: 'michael.w@example.com',
            role: 'banker',
            status: 'suspended',
            createdAt: '2023-03-05T09:30:00Z',
            updatedAt: '2023-06-08T15:25:00Z'
          }
        ]

        // Filter by role if selected
        let filteredUsers = mockUsers
        if (selectedRole) {
          filteredUsers = filteredUsers.filter(user => user.role === selectedRole)
        }
        
        // Filter by status if selected
        if (selectedStatus) {
          filteredUsers = filteredUsers.filter(user => user.status === selectedStatus)
        }
        
        // Filter by search term if provided
        if (searchTerm) {
          const term = searchTerm.toLowerCase()
          filteredUsers = filteredUsers.filter(
            user => 
              user.name.toLowerCase().includes(term) || 
              user.email.toLowerCase().includes(term)
          )
        }

        setUsers(filteredUsers)
        setTotalPages(Math.ceil(filteredUsers.length / 10))
        setIsLoading(false)
      }, 800)
    } catch (error) {
      console.error('Error fetching users:', error)
      setIsLoading(false)
    }
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    setCurrentPage(1)
    fetchUsers()
  }

  const handleUpdateStatus = async (userId: string, newStatus: string) => {
    try {
      // In a real implementation, we would call the API
      // await userService.updateUserStatus(userId, newStatus)
      
      // For now, update the local state
      setUsers(users.map(user => 
        user._id === userId ? { ...user, status: newStatus } : user
      ))
    } catch (error) {
      console.error('Error updating user status:', error)
    }
  }

  const handleUpdateRole = async (userId: string, newRole: string) => {
    try {
      // In a real implementation, we would call the API
      // await userService.updateUserRole(userId, newRole)
      
      // For now, update the local state
      setUsers(users.map(user => 
        user._id === userId ? { ...user, role: newRole } : user
      ))
    } catch (error) {
      console.error('Error updating user role:', error)
    }
  }

  const columns = [
    { 
      header: 'Name', 
      accessor: (user: User) => (
        <div>
          <div className="font-medium text-gray-900">{user.name}</div>
          <div className="text-sm text-gray-500">{user.email}</div>
        </div>
      )
    },
    { 
      header: 'Role', 
      accessor: (user: User) => (
        <select
          value={user.role}
          onChange={(e) => handleUpdateRole(user._id, e.target.value)}
          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
        >
          <option value="admin">Admin</option>
          <option value="banker">Banker</option>
          <option value="customer">Customer</option>
        </select>
      )
    },
    { 
      header: 'Status', 
      accessor: (user: User) => (
        <select
          value={user.status}
          onChange={(e) => handleUpdateStatus(user._id, e.target.value)}
          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
        >
          <option value="active">Active</option>
          <option value="pending">Pending</option>
          <option value="suspended">Suspended</option>
        </select>
      )
    },
    { 
      header: 'Created', 
      accessor: (user: User) => new Date(user.createdAt).toLocaleDateString()
    },
    { 
      header: 'Actions', 
      accessor: (user: User) => (
        <div className="flex space-x-2">
          <Button 
            variant="primary" 
            size="sm"
            onClick={() => alert(`View details for ${user.name}`)}
          >
            View
          </Button>
          <Button 
            variant="danger" 
            size="sm"
            onClick={() => {
              if (confirm(`Are you sure you want to delete ${user.name}?`)) {
                alert(`Delete user: ${user.name}`)
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
        <h2 className="text-2xl font-semibold">User Management</h2>
        <Button variant="success" onClick={() => alert('Create new user')}>
          Add New User
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
              placeholder="Search by name or email"
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
            />
          </div>
          
          <div className="w-40">
            <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-1">
              Role
            </label>
            <select
              id="role"
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value)}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
            >
              <option value="">All Roles</option>
              <option value="admin">Admin</option>
              <option value="banker">Banker</option>
              <option value="customer">Customer</option>
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
              <option value="pending">Pending</option>
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
        data={users}
        keyExtractor={(user) => user._id}
        isLoading={isLoading}
        emptyMessage="No users found"
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
