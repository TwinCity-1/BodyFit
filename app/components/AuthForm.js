'use client'

import { useForm } from 'react-hook-form'
import { useAuth } from '../hooks/use-auth'
import Link from 'next/link'

export default function AuthForm({ type }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const { login, signup } = useAuth()


  const onSubmit = (data) => {
    if (type === 'login') {
      login(data.email, data.password)
    } else {
      signup(data.email, data.password, data.name)
    }
  }

  return (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl p-6">
      <h2 className="text-2xl font-bold text-primary-dark mb-6 text-center">
        {type === 'login' ? 'Login' : 'Sign Up'}
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {type === 'signup' && (
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              id="name"
              type="text"
              {...register('name', { required: 'Name is required' })}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-pink focus:border-primary-pink"
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
            )}
          </div>
        )}

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            id="email"
            type="email"
            {...register('email', {
              required: 'Email is required',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Invalid email address'
              }
            })}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-pink focus:border-primary-pink"
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <input
            id="password"
            type="password"
            {...register('password', {
              required: 'Password is required',
              minLength: {
                value: 6,
                message: 'Password must be at least 6 characters'
              }
            })}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-pink focus:border-primary-pink"
          />
          {errors.password && (
            <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
          )}
        </div>

        <div>
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-pink hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-pink"
          >
            {type === 'login' ? 'Login' : 'Sign Up'}
          </button>
        </div>
      </form>

      <div className="mt-4 text-center">
        {type === 'login' ? (
          <p className="text-sm text-gray-600">
            Don't have an account?{' '}
            <Link href="/signup" className="font-medium text-primary-pink hover:text-primary-dark">
              Sign up
            </Link>
          </p>
        ) : (
          <p className="text-sm text-gray-600">
            Already have an account?{' '}
            <Link href="/login" className="font-medium text-primary-pink hover:text-primary-dark">
              Login
            </Link>
          </p>
        )}
      </div>
    </div>
  )
}