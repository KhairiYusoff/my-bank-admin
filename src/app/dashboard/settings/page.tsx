'use client'

import { useState } from 'react'
import Button from '@/components/ui/Button'
import Card from '@/components/ui/Card'

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('profile')
  const [profileForm, setProfileForm] = useState({
    name: 'Admin User',
    email: 'admin@mybank.com',
    phone: '+1 (555) 123-4567'
  })
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  })
  const [notificationSettings, setNotificationSettings] = useState({
    emailAlerts: true,
    loginAlerts: true,
    transactionAlerts: false,
    marketingEmails: false
  })
  const [systemSettings, setSystemSettings] = useState({
    maintenanceMode: false,
    allowNewRegistrations: true,
    requireEmailVerification: true,
    sessionTimeout: 30
  })

  const handleProfileSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real implementation, we would call the API to update the profile
    alert('Profile updated successfully!')
  }

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      alert('New passwords do not match!')
      return
    }
    // In a real implementation, we would call the API to update the password
    alert('Password updated successfully!')
    setPasswordForm({
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    })
  }

  const handleNotificationSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real implementation, we would call the API to update notification settings
    alert('Notification settings updated successfully!')
  }

  const handleSystemSettingsSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real implementation, we would call the API to update system settings
    alert('System settings updated successfully!')
  }

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-6">Settings</h2>

      <div className="flex mb-6">
        <div className="w-64 mr-6">
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="p-4 font-medium text-gray-700 border-b">
              Settings Menu
            </div>
            <nav className="p-2">
              <button
                onClick={() => setActiveTab('profile')}
                className={`block w-full text-left px-4 py-2 rounded ${
                  activeTab === 'profile' ? 'bg-primary-100 text-primary-700' : 'hover:bg-gray-100'
                }`}
              >
                Profile Settings
              </button>
              <button
                onClick={() => setActiveTab('password')}
                className={`block w-full text-left px-4 py-2 rounded ${
                  activeTab === 'password' ? 'bg-primary-100 text-primary-700' : 'hover:bg-gray-100'
                }`}
              >
                Change Password
              </button>
              <button
                onClick={() => setActiveTab('notifications')}
                className={`block w-full text-left px-4 py-2 rounded ${
                  activeTab === 'notifications' ? 'bg-primary-100 text-primary-700' : 'hover:bg-gray-100'
                }`}
              >
                Notification Settings
              </button>
              <button
                onClick={() => setActiveTab('system')}
                className={`block w-full text-left px-4 py-2 rounded ${
                  activeTab === 'system' ? 'bg-primary-100 text-primary-700' : 'hover:bg-gray-100'
                }`}
              >
                System Settings
              </button>
            </nav>
          </div>
        </div>

        <div className="flex-1">
          {activeTab === 'profile' && (
            <Card title="Profile Settings">
              <form onSubmit={handleProfileSubmit}>
                <div className="mb-4">
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={profileForm.name}
                    onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={profileForm.email}
                    onChange={(e) => setProfileForm({ ...profileForm, email: e.target.value })}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    value={profileForm.phone}
                    onChange={(e) => setProfileForm({ ...profileForm, phone: e.target.value })}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                  />
                </div>
                <div className="mt-6">
                  <Button type="submit" variant="primary">
                    Save Profile
                  </Button>
                </div>
              </form>
            </Card>
          )}

          {activeTab === 'password' && (
            <Card title="Change Password">
              <form onSubmit={handlePasswordSubmit}>
                <div className="mb-4">
                  <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700 mb-1">
                    Current Password
                  </label>
                  <input
                    type="password"
                    id="currentPassword"
                    value={passwordForm.currentPassword}
                    onChange={(e) => setPasswordForm({ ...passwordForm, currentPassword: e.target.value })}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 mb-1">
                    New Password
                  </label>
                  <input
                    type="password"
                    id="newPassword"
                    value={passwordForm.newPassword}
                    onChange={(e) => setPasswordForm({ ...passwordForm, newPassword: e.target.value })}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                    Confirm New Password
                  </label>
                  <input
                    type="password"
                    id="confirmPassword"
                    value={passwordForm.confirmPassword}
                    onChange={(e) => setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                  />
                </div>
                <div className="mt-6">
                  <Button type="submit" variant="primary">
                    Update Password
                  </Button>
                </div>
              </form>
            </Card>
          )}

          {activeTab === 'notifications' && (
            <Card title="Notification Settings">
              <form onSubmit={handleNotificationSubmit}>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <input
                      id="emailAlerts"
                      type="checkbox"
                      checked={notificationSettings.emailAlerts}
                      onChange={(e) => setNotificationSettings({ ...notificationSettings, emailAlerts: e.target.checked })}
                      className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                    />
                    <label htmlFor="emailAlerts" className="ml-3 block text-sm font-medium text-gray-700">
                      Email Alerts
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      id="loginAlerts"
                      type="checkbox"
                      checked={notificationSettings.loginAlerts}
                      onChange={(e) => setNotificationSettings({ ...notificationSettings, loginAlerts: e.target.checked })}
                      className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                    />
                    <label htmlFor="loginAlerts" className="ml-3 block text-sm font-medium text-gray-700">
                      Login Alerts
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      id="transactionAlerts"
                      type="checkbox"
                      checked={notificationSettings.transactionAlerts}
                      onChange={(e) => setNotificationSettings({ ...notificationSettings, transactionAlerts: e.target.checked })}
                      className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                    />
                    <label htmlFor="transactionAlerts" className="ml-3 block text-sm font-medium text-gray-700">
                      Transaction Alerts
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      id="marketingEmails"
                      type="checkbox"
                      checked={notificationSettings.marketingEmails}
                      onChange={(e) => setNotificationSettings({ ...notificationSettings, marketingEmails: e.target.checked })}
                      className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                    />
                    <label htmlFor="marketingEmails" className="ml-3 block text-sm font-medium text-gray-700">
                      Marketing Emails
                    </label>
                  </div>
                </div>
                <div className="mt-6">
                  <Button type="submit" variant="primary">
                    Save Notification Settings
                  </Button>
                </div>
              </form>
            </Card>
          )}

          {activeTab === 'system' && (
            <Card title="System Settings">
              <form onSubmit={handleSystemSettingsSubmit}>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <input
                      id="maintenanceMode"
                      type="checkbox"
                      checked={systemSettings.maintenanceMode}
                      onChange={(e) => setSystemSettings({ ...systemSettings, maintenanceMode: e.target.checked })}
                      className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                    />
                    <label htmlFor="maintenanceMode" className="ml-3 block text-sm font-medium text-gray-700">
                      Maintenance Mode
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      id="allowNewRegistrations"
                      type="checkbox"
                      checked={systemSettings.allowNewRegistrations}
                      onChange={(e) => setSystemSettings({ ...systemSettings, allowNewRegistrations: e.target.checked })}
                      className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                    />
                    <label htmlFor="allowNewRegistrations" className="ml-3 block text-sm font-medium text-gray-700">
                      Allow New Registrations
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      id="requireEmailVerification"
                      type="checkbox"
                      checked={systemSettings.requireEmailVerification}
                      onChange={(e) => setSystemSettings({ ...systemSettings, requireEmailVerification: e.target.checked })}
                      className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                    />
                    <label htmlFor="requireEmailVerification" className="ml-3 block text-sm font-medium text-gray-700">
                      Require Email Verification
                    </label>
                  </div>
                  <div>
                    <label htmlFor="sessionTimeout" className="block text-sm font-medium text-gray-700 mb-1">
                      Session Timeout (minutes)
                    </label>
                    <input
                      type="number"
                      id="sessionTimeout"
                      value={systemSettings.sessionTimeout}
                      onChange={(e) => setSystemSettings({ ...systemSettings, sessionTimeout: parseInt(e.target.value) || 0 })}
                      min="5"
                      max="120"
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                    />
                  </div>
                </div>
                <div className="mt-6">
                  <Button type="submit" variant="primary">
                    Save System Settings
                  </Button>
                </div>
              </form>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
