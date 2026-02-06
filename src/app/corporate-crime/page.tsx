'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { TextField, Button } from '@mui/material'
import Link from 'next/link'

interface TeamStatus {
  authenticated: boolean
  name?: string
  score?: number
  currentQuestion?: number
}

interface Question {
  sequenceNumber: number
  questionText: string
  destinationPic: string
  points: number
  completed?: boolean
}

interface LeaderboardEntry {
  rank: number
  teamId: { name: string }
  score: number
  timestamp: string
}

export default function CorporateCrimePage() {
  const router = useRouter()
  const [status, setStatus] = useState<TeamStatus>({ authenticated: false })
  const [question, setQuestion] = useState<Question | null>(null)
  const [answer, setAnswer] = useState('')
  const [showLeaderboard, setShowLeaderboard] = useState(false)
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([])
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    checkAuth()
  }, [])

  const checkAuth = async () => {
    try {
      const res = await fetch('/api/teams/check')
      const data = await res.json()
      setStatus(data)
      if (data.authenticated) {
        fetchQuestion()
      }
    } catch (error) {
      console.error('Auth check failed:', error)
    } finally {
      setLoading(false)
    }
  }

  const fetchQuestion = async () => {
    try {
      const res = await fetch('/api/questions')
      const data = await res.json()
      setQuestion(data)
    } catch (error) {
      console.error('Failed to fetch question:', error)
    }
  }

  const fetchLeaderboard = async () => {
    try {
      const res = await fetch('/api/leaderboard')
      const data = await res.json()
      setLeaderboard(data)
    } catch (error) {
      console.error('Failed to fetch leaderboard:', error)
    }
  }

  const handleSubmit = async () => {
    if (!question || !answer.trim()) return
    
    setSubmitting(true)
    try {
      const res = await fetch('/api/questions/check-answer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userAnswer: answer.toLowerCase(),
          questionId: question.sequenceNumber,
        }),
      })
      const data = await res.json()
      
      if (data.correct) {
        alert(data.message)
        setAnswer('')
        fetchQuestion()
      } else {
        alert(data.message || 'Wrong Answer! Try Again.')
      }
    } catch (error) {
      console.error('Submit failed:', error)
    } finally {
      setSubmitting(false)
    }
  }

  const handleLogout = async () => {
    await fetch('/api/teams/logout')
    localStorage.removeItem('token')
    router.push('/')
  }

  const toggleView = () => {
    if (!showLeaderboard) {
      fetchLeaderboard()
    }
    setShowLeaderboard(!showLeaderboard)
  }

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp)
    const hours = Math.floor(date.getTime() / (1000 * 60 * 60))
    const minutes = Math.floor((date.getTime() / (1000 * 60)) % 60)
    const seconds = Math.floor((date.getTime() / 1000) % 60)
    return `${hours}h ${minutes}m ${seconds}s`
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="animate-spin rounded-full h-16 w-16 border-4 border-red-600 border-t-transparent"></div>
      </div>
    )
  }

  return (
    <div className="relative min-h-screen bg-black text-white overflow-hidden">
      {/* Navbar */}
      <div className="flex justify-between items-center p-4 w-full z-50 relative">
        <Link
          href="/"
          className="px-4 py-2 sm:px-6 sm:py-3 bg-red-900 text-white font-bold rounded hover:bg-red-700 transition-colors duration-300 shadow-lg text-sm sm:text-base"
        >
          Home
        </Link>

        {status.authenticated && (
          <button
            onClick={toggleView}
            className="px-4 py-2 sm:px-6 sm:py-3 bg-red-900 text-white font-bold rounded hover:bg-red-700 transition-colors duration-300 shadow-lg text-sm sm:text-base"
          >
            {showLeaderboard ? 'Questions' : 'Leaderboard'}
          </button>
        )}

        {status.authenticated && (
          <button
            className="px-4 py-2 sm:px-6 sm:py-3 bg-red-900 text-white font-bold rounded hover:bg-red-700 transition-colors duration-300 shadow-lg text-sm sm:text-base"
            onClick={handleLogout}
          >
            Logout
          </button>
        )}
      </div>

      {/* Blood drips animation */}
      {[...Array(6)].map((_, i) => (
        <div
          key={`drip-${i}`}
          className="absolute top-0 bg-gradient-to-b from-red-800 to-red-950 rounded-b-full opacity-80 animate-pulse hidden sm:block"
          style={{
            left: `${i * 16 + Math.random() * 8}%`,
            height: `${Math.random() * 120 + 80}px`,
            width: `${Math.random() * 15 + 5}px`,
          }}
        />
      ))}

      {/* Main content */}
      <div className="flex flex-col items-center min-h-[80vh] relative z-10 px-4 py-8">
        {showLeaderboard ? (
          <div className="bg-black/70 p-4 sm:p-10 rounded-lg border border-red-900 shadow-lg shadow-red-900/50 w-full max-w-4xl">
            <h1 className="text-2xl sm:text-4xl font-bold mb-4 text-red-600 text-center">
              Leaderboard
            </h1>
            <div className="overflow-x-auto">
              <table className="w-full text-sm sm:text-lg">
                <thead>
                  <tr className="border-b border-red-800">
                    <th className="py-2 px-1 sm:px-4 text-left">Rank</th>
                    <th className="py-2 px-1 sm:px-4 text-left">Team</th>
                    <th className="py-2 px-1 sm:px-4 text-right">Score</th>
                    <th className="py-2 px-1 sm:px-4 text-right">Time</th>
                  </tr>
                </thead>
                <tbody>
                  {leaderboard.map((entry, index) => (
                    <tr key={index} className="border-b border-red-900/30 hover:bg-red-900/20">
                      <td className="py-2 px-1 sm:px-4">{index + 1}</td>
                      <td className="py-2 px-1 sm:px-4">{entry.teamId?.name}</td>
                      <td className="py-2 px-1 sm:px-4 text-right">{entry.score}</td>
                      <td className="py-2 px-1 sm:px-4 text-right">{formatTime(entry.timestamp)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="bg-black/70 p-4 sm:p-10 rounded-lg border border-red-900 shadow-lg shadow-red-900/50 w-full max-w-4xl">
            {!status.authenticated ? (
              <div className="text-center">
                <h1 className="text-2xl sm:text-4xl font-bold mb-4 text-red-600">
                  Please Login First
                </h1>
                <Button
                  variant="outlined"
                  color="error"
                  onClick={() => router.push('/login')}
                >
                  Login
                </Button>
              </div>
            ) : question?.completed ? (
              <div className="text-center">
                <h1 className="text-2xl sm:text-4xl font-bold text-green-500">
                  Completed! 🎉
                </h1>
                <p className="mt-4 text-lg">You have answered all questions!</p>
              </div>
            ) : question ? (
              <div className="w-full flex flex-col items-center">
                <p className="text-lg mb-4">
                  Question {question.sequenceNumber}
                </p>
                {question.destinationPic && (
                  <Image
                    src={question.destinationPic}
                    alt="Question"
                    width={500}
                    height={300}
                    className="mb-6 rounded-lg max-w-full"
                  />
                )}
                <div className="w-full max-w-md space-y-4">
                  <TextField
                    fullWidth
                    label="Your Answer"
                    variant="outlined"
                    value={answer}
                    onChange={(e) => setAnswer(e.target.value)}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        color: 'red',
                        '& fieldset': { borderColor: '#dc2626' },
                        '&:hover fieldset': { borderColor: '#cc0000' },
                        '&.Mui-focused fieldset': { borderColor: '#ff0000' },
                      },
                      '& .MuiInputLabel-root': { color: '#dc2626' },
                    }}
                  />
                  <Button
                    fullWidth
                    variant="outlined"
                    color="error"
                    onClick={handleSubmit}
                    disabled={submitting}
                  >
                    {submitting ? 'Checking...' : 'Submit Answer'}
                  </Button>
                </div>
              </div>
            ) : (
              <p className="text-center text-lg">Competition is yet to begin!</p>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
