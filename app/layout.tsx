import './globals.css'
import { Inter } from 'next/font/google'
import { AuthProvider } from './context/auth-context'
import Navbar from './components/Navbar'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'BodyFit App',
  description: 'Browse exercises from ExerciseDB API',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-grow p-4">
              {children}
            </main>
          </div>
        </AuthProvider>
      </body>
    </html>
  )
}