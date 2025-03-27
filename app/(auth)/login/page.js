'use client'

import { useForm } from 'react-hook-form'
import { useAuth } from '../../hooks/use-auth'
import Link from 'next/link'
import { ToastContainer } from 'react-toastify'

export default function LoginPage() {
  const { register, handleSubmit, formState: { errors } } = useForm()
  const { login } = useAuth()

  const onSubmit = (data) => {
    login(data.email, data.password)
  }
  return (
    <>
      <ToastContainer />
      <div className="min-h-screen flex items-center justify-center p-4 bg-[#F8F8F8]">
        <div className="max-w-md w-full p-6 border border-[#A4D037] rounded-lg shadow-md bg-white">
          <h2 className="text-2xl font-bold mb-6 text-center text-[#1A1A1A]">Login</h2>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-[#1A1A1A]">Email</label>
              <input
                id="email"
                type="email"
                {...register('email', { required: 'Email is required' })}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md bg-[#F0F0F0] focus:outline-none focus:ring-[#A4D037] focus:border-[#A4D037]"
              />
              {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>}
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-[#1A1A1A]">Password</label>
              <input
                id="password"
                type="password"
                {...register('password', { required: 'Password is required' })}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md bg-[#F0F0F0] focus:outline-none focus:ring-[#A4D037] focus:border-[#A4D037]"
              />
              {errors.password && <p className="mt-1 text-sm text-red-500">{errors.password.message}</p>}
            </div>

            <button
              type="submit"
              className="w-full p-2 bg-[#1A1A1A] text-white rounded-md hover:bg-[#333333]"
            >
              Login
            </button>
          </form>

          <div className="mt-4 text-center">
            <p className="text-sm text-[#1A1A1A]">
              Don't have an account?{' '}
              <Link href="/signup" className="text-[#A4D037] hover:underline">
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  )
}