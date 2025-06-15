'use client'

import { useEffect, useState } from 'react'

interface DashboardStats {
  totalUsers: number;
  totalAccounts: number;
  totalTransactions: number;
  activeUsers: number;
}

export default function Dashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    totalUsers: 0,
    totalAccounts: 0,
    totalTransactions: 0,
    activeUsers: 0
  })
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // This would be replaced with actual API calls to your backend
    // Simulating API call with timeout
    const fetchDashboardData = async () => {
      try {
        // In a real implementation, you would fetch data from your API
        // const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/dashboard`, {
        //   headers: {
        //     'Authorization': `Bearer ${localStorage.getItem('token')}`
        //   }
        // })
        // const data = await response.json()
        
        // For now, we'll use mock data
        setTimeout(() => {
          setStats({
            totalUsers: 156,
            totalAccounts: 243,
            totalTransactions: 1892,
            activeUsers: 87
          })
          setIsLoading(false)
        }, 1000)
      } catch (error) {
        console.error('Error fetching dashboard data:', error)
        setIsLoading(false)
      }
    }

    fetchDashboardData()
  }, [])

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-lg">Loading dashboard data...</div>
      </div>
    )
  }

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-6">Dashboard Overview</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Total Users Card */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-blue-100 text-blue-500">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </div>
            <div className="ml-4">
              <h3 className="text-gray-500 text-sm">Total Users</h3>
              <p className="text-2xl font-semibold">{stats.totalUsers}</p>
            </div>
          </div>
        </div>

        {/* Total Accounts Card */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-green-100 text-green-500">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
              </svg>
            </div>
            <div className="ml-4">
              <h3 className="text-gray-500 text-sm">Total Accounts</h3>
              <p className="text-2xl font-semibold">{stats.totalAccounts}</p>
            </div>
          </div>
        </div>

        {/* Total Transactions Card */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-yellow-100 text-yellow-500">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
              </svg>
            </div>
            <div className="ml-4">
              <h3 className="text-gray-500 text-sm">Total Transactions</h3>
              <p className="text-2xl font-semibold">{stats.totalTransactions}</p>
            </div>
          </div>
        </div>

        {/* Active Users Card */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-purple-100 text-purple-500">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="ml-4">
              <h3 className="text-gray-500 text-sm">Active Users</h3>
              <p className="text-2xl font-semibold">{stats.activeUsers}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity Section */}
      <div className="mt-8">
        <h3 className="text-xl font-semibold mb-4">Recent Activity</h3>
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  User
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Action
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Time
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              <tr>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">John Doe</div>
                  <div className="text-sm text-gray-500">john.doe@example.com</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">Login</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">5 minutes ago</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                    Success
                  </span>
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">Jane Smith</div>
                  <div className="text-sm text-gray-500">jane.smith@example.com</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">Deposit</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">15 minutes ago</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                    Success
                  </span>
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">Robert Johnson</div>
                  <div className="text-sm text-gray-500">robert.j@example.com</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">Account Creation</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">1 hour ago</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                    Success
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
