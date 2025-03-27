import Link from 'next/link'

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#F8F8F8] text-[#1A1A1A] text-center p-6">
      <h1 className="text-5xl font-extrabold mb-6 drop-shadow-lg text-[#22252A]">Welcome to BodyFit</h1>
      <p className="text-xl max-w-2xl mb-8 opacity-90 text-[#22252A]">
        Browse over 1,300 exercises with detailed information and animations to perfect your form.
      </p>
      <div className="flex space-x-6">
        <Link
          href="/login"
          className="bg-[#1A1A1A] text-white px-8 py-3 rounded-full shadow-md font-bold text-lg hover:bg-[#333] transition-transform transform hover:scale-105"
        >
          Login
        </Link>
        <Link
          href="/signup"
          className="bg-[#C6F560] text-[#1A1A1A] px-8 py-3 rounded-full shadow-md font-bold text-lg hover:bg-[#B8E100] transition-transform transform hover:scale-105"
        >
          Sign Up
        </Link>
      </div>
    </div>
  )
}