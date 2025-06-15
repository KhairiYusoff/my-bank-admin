'use client'

import { useState } from 'react'
import { useCreateStaff } from '@/lib/hooks'

interface StaffFormData {
  name: string;
  email: string;
  password: string;
  role: 'admin' | 'banker';
}

export default function CreateStaffPage() {
  const [formData, setFormData] = useState<StaffFormData>({
    name: '',
    email: '',
    password: '',
    role: 'banker'
  })
  const [successMessage, setSuccessMessage] = useState<string | null>(null)

  // Use React Query hook
  const createStaff = useCreateStaff()

  // Handle form input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    createStaff.mutate(formData, {
      onSuccess: () => {
        setSuccessMessage(`Staff member ${formData.name} created successfully!`)
        setFormData({
          name: '',
          email: '',
          password: '',
          role: 'banker'
        })
        
        // Clear success message after 5 seconds
        setTimeout(() => {
          setSuccessMessage(null)
        }, 5000)
      }
    })
  }

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-6">Create Staff Member</h2>
      
      {successMessage && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4" role="alert">
          <span className="block sm:inline">{successMessage}</span>
        </div>
      )}
      
      {createStaff.error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
          <span className="block sm:inline">Error creating staff: {(createStaff.error as Error).message}</span>
        </div>
      )}
      
      <div className="bg-white rounded-lg shadow p-6">
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
              Full Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-md px-3 py-2"
              placeholder="John Doe"
            />
          </div>
          
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-md px-3 py-2"
              placeholder="john.doe@example.com"
            />
          </div>
          
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-md px-3 py-2"
              placeholder="••••••••"
              minLength={8}
            />
            <p className="mt-1 text-xs text-gray-500">Password must be at least 8 characters long</p>
          </div>
          
          <div className="mb-6">
            <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-2">
              Role
            </label>
            <select
              id="role"
              name="role"
              value={formData.role}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-md px-3 py-2"
            >
              <option value="banker">Banker</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={createStaff.isPending}
              className="bg-primary-600 text-white px-4 py-2 rounded-md"
            >
              {createStaff.isPending ? 'Creating...' : 'Create Staff Member'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
