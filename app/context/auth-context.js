'use client'

import { createContext, useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'react-toastify'

export const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const router = useRouter()

  useEffect(() => {
    const storedUser = localStorage.getItem('exerciseUser')
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
  }, [])

  const login = (email, password) => {
    const mockUser = {
      id: '1',
      email,
      name: email.split('@')[0],
      savedExercises: [],
    }
    setUser(mockUser)
    localStorage.setItem('exerciseUser', JSON.stringify(mockUser))
    toast.success('Login successful!')
    router.push('/dashboard')
  }

  const signup = (email, password, name) => {
    const newUser = {
      id: Date.now().toString(),
      email,
      name,
      savedExercises: [],
    }
    setUser(newUser)
    localStorage.setItem('exerciseUser', JSON.stringify(newUser))
    toast.success('Account created successfully!')
    router.push('/dashboard')
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('exerciseUser')
    toast.success('Logged out successfully!')
    router.push('/login')
  }

  // Add these two functions
  const saveExercise = (exercise) => {
    if (!user) {
      toast.error('You must be logged in to save exercises')
      return
    }

    const updatedUser = {
      ...user,
      savedExercises: [...user.savedExercises, exercise],
    }
    setUser(updatedUser)
    localStorage.setItem('exerciseUser', JSON.stringify(updatedUser))
    toast.success('Exercise saved!')
  }

  const removeExercise = (exerciseId) => {
    if (!user) {
      toast.error('You must be logged in to remove exercises')
      return
    }

    const updatedUser = {
      ...user,
      savedExercises: user.savedExercises.filter(ex => ex.id !== exerciseId),
    }
    setUser(updatedUser)
    localStorage.setItem('exerciseUser', JSON.stringify(updatedUser))
    toast.success('Exercise removed!')
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        signup,
        logout,
        saveExercise, // Now included
        removeExercise // Now included
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}