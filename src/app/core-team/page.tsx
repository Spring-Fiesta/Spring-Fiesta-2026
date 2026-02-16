'use client'

import { useState, useEffect } from 'react'
import { motion, useScroll, useMotionValueEvent } from 'framer-motion'
import Card from '@/components/Card'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

interface TeamMember {
  _id: string
  name: string
  designation: string
  imageUrl: string
  department: string
  order: number
}

// Helper to generate rotation values dynamically
const getRotation = (index: number) => {
  const base = -40 + (index * 2) % 80 // Simple rotation spread
  return base
}

export default function CoreTeamPage() {
  const { scrollY } = useScroll()
  const [scrollYValue, setScrollYValue] = useState(0)
  const [isPacked, setIsPacked] = useState(false)
  const [members, setMembers] = useState<TeamMember[]>([])
  const [loading, setLoading] = useState(true)

  // Motion states
  const [finalMotion, setFinalMotion] = useState<{ multiplier: number; x: number; y: number }[]>([])
  const [threshold, setThreshold] = useState(250)

  // Fetch Data
  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch('/api/team')
        if (!res.ok) throw new Error('Failed to fetch')
        const data = await res.json()
        // Sort by order
        const sorted = Array.isArray(data) ? data.sort((a: TeamMember, b: TeamMember) => (a.order || 0) - (b.order || 0)) : []
        setMembers(sorted)
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  // Calculate motion positions whenever members or screen size changes
  useEffect(() => {
    if (members.length === 0) return

    const calculatePositions = () => {
      let alignArray: number[] = []
      let thresholdVal = 250
      let columns = 3
      let xOffset = 0

      if (window.innerWidth > 1150) {
        alignArray = [-350, 0, 350]
        thresholdVal = 250
        columns = 3
      } else if (window.innerWidth > 550) {
        alignArray = [-130, 130] // Tablet align
        thresholdVal = 100
        columns = 2
        xOffset = -40
      } else {
        alignArray = [-50] // Mobile align
        thresholdVal = 25
        columns = 1
      }

      setThreshold(thresholdVal)

      const newMotion = []
      
      // First card special case (if needed, mimicking original)
      if (window.innerWidth > 550) {
         newMotion.push({ multiplier: 1, x: columns === 2 ? -30 : 0, y: 50 })
      } else {
         newMotion.push({ multiplier: 1, x: -50, y: 0 })
      }

      // Generate for rest
      for (let index = 0; index < members.length - 1; index++) {
        // Safe access to alignArray using modulo
        const xPos = columns === 1 ? -50 : (alignArray[index % columns] + (columns === 2 ? xOffset : 0))
        
        // Y Position logic matching original
        let yPos = 0
        if (columns === 3) {
            yPos = 400 * Math.floor(index / 3) + 450
        } else if (columns === 2) {
            yPos = 350 * Math.floor(index / 2) + 360
        } else {
            yPos = 350 * index + 350
        }

        newMotion.push({
          multiplier: Math.floor(Math.random() * 21) - 10,
          x: xPos,
          y: yPos,
        })
      }
      
      setFinalMotion(newMotion)
    }

    calculatePositions()
    window.addEventListener('resize', calculatePositions)
    return () => window.removeEventListener('resize', calculatePositions)
  }, [members]) // Re-run when members load

  useMotionValueEvent(scrollY, 'change', (latest: number) => {
    setScrollYValue(latest)
    if (latest >= threshold && !isPacked) {
      setIsPacked(true)
    } else if (latest < threshold && isPacked) {
      setIsPacked(false)
    }
  })

  // Calculate container height
  const lastCardY = finalMotion.length > 0 ? finalMotion[finalMotion.length - 1].y : 0
  const containerHeight = lastCardY + 600

  // Rotation array generation (mimicking static list)
  const rotateArr = members.map((_, i) => {
      // Generate a spread of rotations centered around 0
      // Original was -39 to 43 with step 2
      const start = -40
      return start + (i * 2) 
  })

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center bg-black text-white">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-[#FF204E] border-t-transparent"></div>
        </div>
      </>
    )
  }

  return (
    <>
      <Navbar />
      <motion.div
        className="heading"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ ease: 'easeOut', duration: 1 }}
      >
        <h1>Meet The Team</h1>
      </motion.div>

      <motion.div
        className="bg-wrapper"
        style={{ minHeight: containerHeight }}
        initial={{ y: 400 }}
        animate={{ y: 0 }}
        transition={{ ease: 'easeOut', duration: 1 }}
      >
        <div className="card-bg" style={isPacked ? { border: 'none' } : {}} />

        <div className="card-wrapper">
          {members.map((member, i) => (
            <Card
              key={member._id || i}
              multiply={isPacked ? finalMotion[i]?.multiplier || 0 : rotateArr[i] / 4}
              scrollYValue={scrollYValue}
              x={finalMotion[i]?.x || 0}
              y={finalMotion[i]?.y || 0}
              photo={member.imageUrl} // Use imageUrl from DB
              name={member.name}
              designation={member.designation}
              isPacked={isPacked}
            />
          ))}
        </div>
      </motion.div>

      <div className="dept" style={{ marginTop: 100 }}>
        <Footer />
      </div>
    </>
  )
}
