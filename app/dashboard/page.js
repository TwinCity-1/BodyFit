'use client'

import { useEffect, useState, useRef } from 'react'
import { useAuth } from '../hooks/use-auth'
import { checkApiStatus } from '../lib/api'
import Link from 'next/link'

export default function Dashboard() {
  const { user } = useAuth()
  const [apiStatus, setApiStatus] = useState(null)
  const [loading, setLoading] = useState(true)
  const [profilePic, setProfilePic] = useState(null)
  const fileInputRef = useRef(null)

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

    // Load profile pic from localStorage if exists
    const savedPic = localStorage.getItem('profilePic')
    if (savedPic) {
      setProfilePic(savedPic)
    }
  }, [])

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        const base64String = reader.result
        setProfilePic(base64String)
        localStorage.setItem('profilePic', base64String)
      }
      reader.readAsDataURL(file)
    }
  }

  const getMotivationalMessage = () => {
    const count = user?.savedExercises?.length || 0
    if (count >= 7) return "Wow, you're on a roll! 🚀"
    if (count >= 4) return "Keep it up! 💪"
    if (count >= 1) return "Congratulations, you started an effort! 👏"
    return "Start saving exercises to see your progress!"
  }

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
        {/* Enhanced User Status Card */}
        <div className="border border-[#D9D9D9] rounded-lg p-6 shadow-sm bg-[#C6F560] text-[#1A1A1A] relative">
          {/* Profile Picture Section */}
          <div className="flex items-start mb-4">
            <div className="relative group">
              <div
                className="w-16 h-16 rounded-full bg-gray-300 overflow-hidden border-2 border-[#1A1A1A] cursor-pointer"
                onClick={() => fileInputRef.current.click()}
              >
                {profilePic ? (
                  <img
                    src={profilePic}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-[#1A1A1A]">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                )}
              </div>
              <div className="absolute bottom-0 right-0 bg-[#1A1A1A] text-white rounded-full p-1 group-hover:opacity-100 opacity-0 transition-opacity">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
            </div>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept="image/*"
              className="hidden"
            />
          </div>

          {/* User Info Section */}
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold">Account</h3>
              <p>{user.email}</p>
            </div>
            <div>
              <h3 className="font-semibold">Saved Exercises</h3>
              <p className="text-xl font-bold">{user.savedExercises.length} exercises</p>
              {user.savedExercises.length > 0 && (
                <Link href="#saved" className="text-[#1A1A1A] hover:underline text-sm">
                  View all
                </Link>
              )}
            </div>

            {/* Motivational Message */}
            <div className="mt-4 p-3  bg-opacity-10 rounded-lg">
              <p className="font-medium">{getMotivationalMessage()}</p>
            </div>
          </div>
        </div>

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