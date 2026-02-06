'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Loader from '@/components/Loader'

export default function Home() {
  const router = useRouter()
  const [client, setClient] = useState(false)
  const [screenLoading, setScreenLoading] = useState(false)

  useEffect(() => {
    const clientWidth = document.documentElement.clientWidth
    console.log(clientWidth)
    
    if (clientWidth < 1000) {
      setClient(true)
      setTimeout(() => {
        router.push('/events')
      }, 2000)
    } else {
      setScreenLoading(true)
      setTimeout(() => {
        setScreenLoading(false)
        router.push('/events')
      }, 2000)
    }
  }, [router])

  // Fallback UI when on desktop
  const FallbackHome = () => (
    <div
      style={{
        backgroundColor: '#0a0a0a',
        width: '100vw',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
      }}
    >
      <Loader />
      <h2 style={{ color: 'whitesmoke', marginTop: '20px', textAlign: 'center', fontFamily: 'Unbounded' }}>
        Welcome!
      </h2>
      <h4 style={{ color: '#aaa', marginTop: '10px', fontFamily: 'Unbounded' }}>
        Redirecting to events...
      </h4>
    </div>
  )

  return (
    <div>
      {screenLoading && (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            margin: '22% 0% 0% 0%',
            color: 'whitesmoke',
            fontFamily: 'Unbounded',
          }}
        >
          Please wait... awesome things take time.
        </div>
      )}
      {!client ? (
        <FallbackHome />
      ) : (
        <div
          style={{
            backgroundColor: 'grey',
            width: '100vw',
            height: '60vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
          }}
        >
          <Loader />
          <h3 style={{ marginTop: '10px', textAlign: 'center', fontFamily: 'Unbounded' }}>
            Use your PC for better experience
          </h3>
          <h3 style={{ fontFamily: 'Unbounded' }}>Redirecting...</h3>
        </div>
      )}
    </div>
  )
}
