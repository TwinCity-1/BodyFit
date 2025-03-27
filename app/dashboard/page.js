'use client'

import { useEffect, useState } from 'react'
import { useAuth } from '../hooks/use-auth'
import { checkApiStatus } from '../lib/api'
import Link from 'next/link'

export default function Dashboard() {
  const { user } = useAuth()
  const [apiStatus, setApiStatus] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const status = await checkApiStatus()
        setApiStatus(status)
      } catch (error) {
        console.error('Failed to fetch API status:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchStatus()
  }, [])

  if (!user) {
    return (
      <div className="text-center py-10">
        <h2 className="text-2xl font-bold mb-4">Please login to view dashboard</h2>
        <Link href="/login" className="text-blue-600 hover:underline">Go to Login</Link>
      </div>
    )
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-8">Welcome, {user.name}!</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* User Status Card */}
        <div className="border border-[#D9D9D9] rounded-lg p-6 shadow-sm bg-[#C6F560] text-[#1A1A1A]">
          <h2 className="text-xl font-bold mb-4">Your Status</h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold">Account</h3>
              <p>{user.email}</p>
            </div>
            <div>
              <h3 className="font-semibold">Saved Exercises</h3>
              <p>{user.savedExercises.length} exercises</p>
              {user.savedExercises.length > 0 && (
                <Link href="#saved" className="text-[#1A1A1A]  hover:underline text-sm ">
                  View all
                </Link>
              )}
            </div>
          </div>
        </div>


        {/* API Info Card */}
        {/* API Info Card */}
        <div className="border border-[#D9D9D9] rounded-lg p-6 shadow-sm bg-[#22252A] text-[#FFFFFF]">
          <h2 className="text-xl font-bold mb-4">ExerciseDB API</h2>
          <p className="mb-4 text-[#EAEAEA]">
            Access over 1,300 exercises with animations and detailed information.
          </p>
          <div className="mb-4">
            <h3 className="font-semibold">API Status</h3>
            {loading ? (
              <p className="text-[#C6F560]">Checking...</p>
            ) : apiStatus ? (
              <p className="text-[#C6F560]">Operational</p>
            ) : (
              <p className="text-red-600">Not Responding</p>
            )}
          </div>
          <Link
            href="/dashboard/exercises"
            className="inline-block bg-[#B8E100] text-[#1A1A1A] px-4 py-2 rounded hover:bg-[#C6F560]"
          >
            Browse Exercises
          </Link>
        </div>
      </div>
    </div>
  )
}