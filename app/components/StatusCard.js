'use client'

import Link from 'next/link'

export default function StatusCard({ user, apiStatus, loading }) {
  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <h2 className="text-xl font-bold text-primary-dark mb-4">Your Status</h2>

      <div className="space-y-4">

        <div>
          <h3 className="font-semibold text-gray-700">Account</h3>
          <p className="text-gray-600">{user?.email}</p>
        </div>

        <div>
          <h3 className="font-semibold text-gray-700">Saved Exercises</h3>
          <p className="text-gray-600">
            {user?.savedExercises?.length || 0} exercises
            {user?.savedExercises?.length > 0 && (
              <Link
                href="#saved"
                className="ml-2 text-primary-pink hover:text-primary-dark text-sm"
              >
                View all
              </Link>
            )}
          </p>
        </div>

        <div>
          <h3 className="font-semibold text-gray-700">API Status</h3>
          {loading ? (
            <p className="text-gray-600">Checking...</p>
          ) : apiStatus ? (
            <p className="text-green-600">API is operational</p>
          ) : (
            <p className="text-red-600">API is not responding</p>
          )}
        </div>
      </div>
    </div>
  )
}