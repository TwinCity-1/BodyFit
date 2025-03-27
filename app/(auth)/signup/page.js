'use client'

import { useForm } from 'react-hook-form'
import { useAuth } from '../../hooks/use-auth'
import Link from 'next/link'

export default function SignupPage() {
  const { register, handleSubmit, formState: { errors } } = useForm()
  const { signup } = useAuth()

  const onSubmit = (data) => {
    signup(data.email, data.password, data.name)
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-[#F8F8F8] text-[#1A1A1A]">
      <div className="max-w-md w-full p-6 bg-white rounded-2xl shadow-xl">
        <h2 className="text-2xl font-bold mb-6 text-center text-[#1A1A1A]">Sign Up</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-[#555]">Name</label>
            <input
              id="name"
              type="text"
              {...register('name', { required: 'Name is required' })}
              className="mt-1 block w-full p-3 border border-gray-300 rounded-xl bg-gray-100 text-[#1A1A1A] focus:outline-none focus:ring-[#A4D037] focus:border-[#A4D037]"
            />
            {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>}
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-[#555]">Email</label>
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
              className="mt-1 block w-full p-3 border border-gray-300 rounded-xl bg-gray-100 text-[#1A1A1A] focus:outline-none focus:ring-[#A4D037] focus:border-[#A4D037]"
            />
            {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>}
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-[#555]">Password</label>
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
              className="mt-1 block w-full p-3 border border-gray-300 rounded-xl bg-gray-100 text-[#1A1A1A] focus:outline-none focus:ring-[#A4D037] focus:border-[#A4D037]"
            />
            {errors.password && <p className="mt-1 text-sm text-red-500">{errors.password.message}</p>}
          </div>

          <button
            type="submit"
            className="w-full p-3 bg-[#1A1A1A] hover:bg-[#333] text-white rounded-xl transition"
          >
            Sign Up
          </button>
        </form>

        <div className="mt-4 text-center">
          <p className="text-sm text-[#555]">
            Already have an account?{' '}
            <Link href="/login" className="text-[#A4D037] hover:underline">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
