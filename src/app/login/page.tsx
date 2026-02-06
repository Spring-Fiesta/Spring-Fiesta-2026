'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { LoadingButton } from '@mui/lab'

export default function LoginPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [credentials, setCredentials] = useState({
    name: '',
    password: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    })
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const res = await fetch('/api/teams/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials),
      })

      if (res.ok) {
        alert('Login Success')
        localStorage.setItem('token', 'true')
        router.push('/corporate-crime')
      } else {
        alert('Invalid Credentials')
        localStorage.removeItem('token')
      }
    } catch (error) {
      console.error('Login error:', error)
      alert('Login failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="main-div min-h-screen flex items-center justify-center bg-gradient-to-br from-[#1a1a2e] to-[#0f0f1a]">
      <div className="logreg-main flex flex-col md:flex-row bg-[#2D2B50] rounded-2xl overflow-hidden shadow-2xl max-w-4xl w-full mx-4">
        <div className="logreg-out-left hidden md:flex items-center justify-center p-8 bg-gradient-to-b from-[#FF204E] to-[#A0153E]">
          <Image
            src="/images/Spring.png"
            alt="Spring Fiesta"
            width={200}
            height={200}
            className="object-contain"
          />
        </div>
        
        <div className="credentials-div flex flex-col justify-center p-8 md:p-12 space-y-6">
          <h2 className="text-white text-3xl font-bold font-unbounded">Login</h2>
          
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="text-white text-sm mb-1 block">Team Name</label>
              <input
                type="text"
                name="name"
                value={credentials.name}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white focus:outline-none focus:border-[#FF204E] transition-colors"
                placeholder="Enter team name"
                required
              />
            </div>
            
            <div>
              <label className="text-white text-sm mb-1 block">Password</label>
              <input
                type="password"
                name="password"
                value={credentials.password}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white focus:outline-none focus:border-[#FF204E] transition-colors"
                placeholder="Enter password"
                required
              />
            </div>
            
            <LoadingButton
              type="submit"
              variant="contained"
              loading={loading}
              fullWidth
              sx={{
                backgroundColor: '#FF204E',
                '&:hover': { backgroundColor: '#A0153E' },
                padding: '12px',
                fontSize: '1rem',
                fontWeight: 'bold',
              }}
            >
              Login
            </LoadingButton>
          </form>
        </div>
      </div>
    </div>
  )
}
