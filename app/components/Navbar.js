'use client'

import Link from 'next/link'
import { useAuth } from '../hooks/use-auth'

export default function Navbar() {
  const { user, logout } = useAuth()

  return (
    <nav className="bg-[#22252A] text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-2xl font-extrabold text-white hover:text-[#C6F560] transition-colors">
          BodyFit
        </Link>

        <div className="flex space-x-6">
          {user ? (
            <>
              <Link href="/dashboard" className="font-medium text-[#EAEAEA] hover:text-[#C6F560] transition-colors">
                Dashboard
              </Link>
              <button
                onClick={logout}
                className="font-medium text-[#EAEAEA] hover:text-[#C6F560] transition-colors"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="bg-white text-[#1A1A1A] px-6 py-2 rounded-full font-bold text-lg hover:bg-[#EAEAEA] transition-transform transform hover:scale-105"
              >
                Login
              </Link>
              <Link
                href="/signup"
                className="bg-[#C6F560] text-[#1A1A1A] px-6 py-2 rounded-full font-bold text-lg hover:bg-[#B8E100] transition-transform transform hover:scale-105"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}
