import type { Metadata } from 'next'
import './globals.css'
import { QueryProvider } from '../lib/react-query/QueryProvider'

export const metadata: Metadata = {
  title: 'My Bank Admin Portal',
  description: 'Administrative dashboard for My Bank banking system',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-gray-50">
        <QueryProvider>
          {children}
        </QueryProvider>
      </body>
    </html>
  )
}
