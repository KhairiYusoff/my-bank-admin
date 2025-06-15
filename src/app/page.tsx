import Link from 'next/link'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm">
        <h1 className="text-4xl font-bold mb-8 text-center">My Bank Admin Portal</h1>
        
        <div className="bg-white p-8 rounded-lg shadow-md">
          <p className="text-lg mb-6 text-center">
            Welcome to the administrative dashboard for My Bank banking system.
          </p>
          
          <div className="flex justify-center">
            <Link 
              href="/login" 
              className="px-6 py-3 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors"
            >
              Login to Dashboard
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}
