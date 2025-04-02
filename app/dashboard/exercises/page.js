'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '../../hooks/use-auth'
import { fetchExercises } from '../../lib/api'
import Link from 'next/link'
import { ToastContainer } from 'react-toastify'

export default function ExercisesPage() {
  const { user, saveExercise, removeExercise } = useAuth()
  const [allExercises, setAllExercises] = useState([]) // Store all exercises
  const [filteredExercises, setFilteredExercises] = useState([]) // Store filtered exercises
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [searchTerm, setSearchTerm] = useState('')
  const itemsPerPage = 10

  useEffect(() => {
    const loadExercises = async () => {
      try {
        setLoading(true)
        setError(null)
        const data = await fetchExercises(1, 100) // Fetch more exercises for searching
        setAllExercises(data)
        setFilteredExercises(data.slice(0, itemsPerPage)) // Initial page
      } catch (err) {
        console.error('API Error:', err)
        setError('Failed to load exercises')
      } finally {
        setLoading(false)
      }
    }
    loadExercises()
  }, [])

  // Search functionality
  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredExercises(allExercises.slice(0, itemsPerPage))
      setCurrentPage(1)
    } else {
      const filtered = allExercises.filter(exercise =>
        exercise.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        exercise.bodyPart.toLowerCase().includes(searchTerm.toLowerCase()) ||
        exercise.target.toLowerCase().includes(searchTerm.toLowerCase())
      )
      setFilteredExercises(filtered.slice(0, itemsPerPage))
      setCurrentPage(1)
    }
  }, [searchTerm, allExercises])

  // Pagination
  useEffect(() => {
    const start = (currentPage - 1) * itemsPerPage
    const end = start + itemsPerPage
    setFilteredExercises(
      searchTerm.trim() === ''
        ? allExercises.slice(start, end)
        : allExercises
          .filter(exercise =>
            exercise.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            exercise.bodyPart.toLowerCase().includes(searchTerm.toLowerCase()) ||
            exercise.target.toLowerCase().includes(searchTerm.toLowerCase())
          )
          .slice(start, end)
    )
  }, [currentPage, allExercises, searchTerm])

  const handleSaveExercise = (exercise) => {
    if (typeof saveExercise === 'function') {
      saveExercise(exercise)
    } else {
      console.error('saveExercise is not available')
    }
  }

  if (!user) {
    <ToastContainer />
    return (
      <div className="p-6 text-center">
        <h2 className="text-xl mb-4 text-black">Please login to view exercises</h2>
        <Link href="/login" className="text-lime-500 hover:underline">
          Go to Login
        </Link>
      </div>
    )
  }

  return (
    <>
      <ToastContainer />
      <div className="p-6 min-h-screen bg-offwhite">
        <h1 className="text-3xl font-bold mb-8 text-darkblue">Exercises</h1>

        {/* Search Bar */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="Search exercises by name, body part, or target..."
            className="w-full p-3 border border-softgray rounded-lg focus:outline-none focus:ring-2 focus:ring-lime-400 bg-white text-black"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {error ? (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        ) : loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-lime-500"></div>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredExercises.map(exercise => (
                <div key={exercise.id} className="border border-softgray rounded-lg p-4 shadow-sm bg-white">
                  <h3 className="font-bold text-lg mb-2 text-black">{exercise.name}</h3>
                  <p className="text-darkgray mb-1"><span className="font-semibold">Body Part:</span> {exercise.bodyPart}</p>
                  <p className="text-darkgray mb-2"><span className="font-semibold">Target:</span> {exercise.target}</p>
                  <div className="flex justify-between">
                    <button
                      onClick={() => handleSaveExercise(exercise)}
                      className="px-3 py-1 bg-black text-white rounded hover:bg-darkblue"
                    >
                      Save
                    </button>
                    <Link
                      href={exercise.gifUrl}
                      target="_blank"
                      className="px-3 py-1 text-lime-500 hover:underline"
                    >
                      View Demo
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </>
  )
}