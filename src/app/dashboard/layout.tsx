'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [isClient, setIsClient] = useState(false)
  const router = useRouter()

  useEffect(() => {
    setIsClient(true)
    // Check if user is authenticated
    const token = localStorage.getItem('token')
    if (!token) {
      router.push('/login')
    }
  }, [router])

  // Only render the dashboard if we're on the client
  if (!isClient) {
    return null
  }

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-primary-800 text-white">
        <div className="p-4">
          <h2 className="text-2xl font-bold">My Bank Admin</h2>
        </div>
        <nav className="mt-6">
          <ul>
            <li>
              <Link 
                href="/dashboard" 
                className="block py-2.5 px-4 rounded transition duration-200 hover:bg-primary-700"
              >
                Dashboard
              </Link>
            </li>
            <li>
              <Link 
                href="/dashboard/users" 
                className="block py-2.5 px-4 rounded transition duration-200 hover:bg-primary-700"
              >
                Users
              </Link>
            </li>
            <li>
              <Link 
                href="/dashboard/accounts" 
                className="block py-2.5 px-4 rounded transition duration-200 hover:bg-primary-700"
              >
                Accounts
              </Link>
            </li>
            <li>
              <Link 
                href="/dashboard/transactions" 
                className="block py-2.5 px-4 rounded transition duration-200 hover:bg-primary-700"
              >
                Transactions
              </Link>
            </li>
            <li>
              <Link 
                href="/dashboard/settings" 
                className="block py-2.5 px-4 rounded transition duration-200 hover:bg-primary-700"
              >
                Settings
              </Link>
            </li>
          </ul>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        {/* Header */}
        <header className="bg-white shadow">
          <div className="flex justify-between items-center px-6 py-4">
            <h1 className="text-2xl font-semibold text-gray-900">Admin Dashboard</h1>
            <button 
              onClick={() => {
                localStorage.removeItem('token')
                router.push('/login')
              }}
              className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
            >
              Logout
            </button>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  )
}
